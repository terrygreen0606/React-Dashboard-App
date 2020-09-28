import React, { Component } from "react";
import ReactQuill from "react-quill";
import { toastAction } from "../../../store/actions/toast-actions";
import "quill/dist/quill.snow.css";
import "../crmcss.css";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  FormFeedback,
} from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { emailService } from "../../../services/crm/emailService";
import { split } from "lodash";

const validationSchema = function (values) {
  return Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!"),
    content: Yup.string().required("Content is required"),
  });
};

const validate = (getValidationSchema) => {
  return (values) => {
    const validationSchema = getValidationSchema(values);
    try {
      validationSchema.validateSync(values, { abortEarly: false });
      return {};
    } catch (error) {
      return getErrorsFromValidationError(error);
    }
  };
};

const getErrorsFromValidationError = (validationError) => {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    };
  }, {});
};

let initialValues = {
  email: "",
  subject: "",
  content: "",
  activityType: 0,
  activityCode: "",
  scheduleDate: "",
  documentTypes: [],
  sendType: 1,
};

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],
    ["clean"], // remove formatting button
  ],
};

class Compose extends Component {
  constructor(props) {
    super(props);

    this.apiService = new emailService();

    this.state = {
      activityTypes: [],
      loading: true,
      documentTypes: [],
      sendTypes: [
        { type: 1, text: "Email" },
        { type: 2, text: "Message" },
        { type: 3, text: "Save as Email Draft" },
        { type: 4, text: "Save as Message Draft" },
      ],
    };
    this.fileInput = React.createRef();
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true });

      if (this.props.match.params.id) {
        // Fetch Drafts with the id and set the initialValues
        const single = await this.apiService.getOne(this.props.match.params.id);
        initialValues = {
          email: single[0].to_user_name,
          subject: single[0].subject,
          content: single[0].content,
          activityType: single[0].activity_type_id,
          activityCode: single[0].source_code,
          scheduleDate: single[0].schedule_date.split(" ")[0],
          documentTypes: single[0].doc_type_ids,
          sendType: 1,
        };
      }
      const activityRes = await this.apiService.getActivityTypes();
      const activityTypes = activityRes.map((type) => ({
        id: type.n_AppCodeId_PK,
        label: type.s_AppCodeNameForDisplay,
        codeLabel: `${type.s_AppCodeNameForDisplay} Code`,
      }));
      this.setState({ activityTypes });

      const docTypeRes = await this.apiService.getDocumentTypes();
      const documentTypes = docTypeRes.map((type) => ({
        id: type.n_AppCodeId_PK,
        label: type.s_AppCodeNameForDisplay,
      }));
      this.setState({ documentTypes });

      this.setState({ loading: false });
    } catch (err) {
      toastAction(false, err);
    }
  }

  onSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    const formData = new FormData();
    if (this.fileInput.current.files.length) {
      formData.append("file", this.fileInput.current.files[0]);
    }
    // 1: Email, 2: Message, 3: Email Draft, 4: Message Draft
    // Type 1: Email, Type 2: Message
    // Status 1: Sent, Status 2: Draft
    [1, 3].includes(parseInt(values.sendType))
      ? formData.append("type", 1)
      : formData.append("type", 2);
    [1, 2].includes(parseInt(values.sendType))
      ? formData.append("status", 1)
      : formData.append("status", 2);

    formData.append("email", values.email);
    formData.append("subject", values.subject);
    formData.append("content", values.content);
    formData.append("activity_type", values.activityType);
    formData.append("schedule_date", values.scheduleDate);
    formData.append(
      "document_types",
      JSON.stringify(values.documentTypes.filter((type) => type))
    );
    formData.append("source_code", values.activityCode);
    const headers = { "Content-Type": "multipart/form-data" };
    try {
      const response = await this.apiService.sendEmail(formData, headers);
      toastAction(response.success, response.message);
      resetForm();
    } catch (err) {
      toastAction(false, "Something unexpected happened.");
    }
    setSubmitting(false);
  };

  render() {
    const loading = (
      <div className="animated fadeIn pt-1 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
      </div>
    );

    const { id } = this.props.match.params;
    return (
      <div className="animated fadeIn" style={{ width: "100%" }}>
        <main>
          {this.state.loading ? (
            loading
          ) : (
            <>
              <p className="text-center">
                {id ? "Edit" : "New"} Email / Message
              </p>
              <Formik
                initialValues={initialValues}
                validate={validate(validationSchema)}
                onSubmit={this.onSubmit}
                render={({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  setFieldTouched,
                  isSubmitting,
                  isValid,
                }) =>
                  this.state.activityTypes && (
                    <Form onSubmit={handleSubmit} noValidate name="emailForm">
                      {/* TO */}
                      <FormGroup row className="mb-3 align-items-center">
                        <Label htmlFor="email-to" xs={2} sm={1}>
                          To
                        </Label>
                        <Col xs={10} sm={11}>
                          <Input
                            type="email"
                            name="email"
                            id="email-to"
                            placeholder="Email *"
                            autoComplete="email"
                            valid={!errors.email}
                            invalid={touched.email && !!errors.email}
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          <FormFeedback>{errors.email}</FormFeedback>
                        </Col>
                      </FormGroup>

                      {/* Subject */}
                      <FormGroup row className="mb-3 align-items-center">
                        <Label htmlFor="email-subject" xs={2} sm={1}>
                          Subject
                        </Label>
                        <Col xs={10} sm={11}>
                          <Input
                            id="email-subject"
                            name="subject"
                            placeholder="Subject"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.subject}
                          />
                        </Col>
                      </FormGroup>

                      {/* Activity Type */}
                      <FormGroup row className="mb-3 align-items-center">
                        <Label htmlFor="activityType" xs={2} sm={1}>
                          Activity Type
                        </Label>
                        <Col xs={10} sm={11}>
                          <Input
                            type="select"
                            name="activityType"
                            id="activityType"
                            onChange={(e) =>
                              setFieldValue("activityType", e.target.value)
                            }
                            value={values.activityType}
                          >
                            <option value={0}>Select Activity Type</option>
                            {this.state.activityTypes.map((type) => (
                              <option key={type.id} value={type.id}>
                                {type.label}
                              </option>
                            ))}
                          </Input>
                        </Col>
                      </FormGroup>

                      {/* Activity Code */}
                      {this.state.activityTypes.find(
                        (type) => type.id === parseInt(values.activityType)
                      ) && (
                        <FormGroup row className="mb-3 align-items-center">
                          <Label htmlFor="activityCode" xs={2} sm={1}>
                            {
                              this.state.activityTypes.find(
                                (type) =>
                                  type.id === parseInt(values.activityType)
                              ).codeLabel
                            }
                          </Label>
                          <Col xs={10} sm={11}>
                            <Input
                              id="activityCode"
                              name="activityCode"
                              placeholder={
                                this.state.activityTypes.find(
                                  (type) =>
                                    type.id === parseInt(values.activityType)
                                ).codeLabel
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.activityCode}
                            />
                          </Col>
                        </FormGroup>
                      )}

                      {/* Schedule Date */}
                      <FormGroup row className="mb-3 align-items-center">
                        <Label htmlFor="scheduleDate" xs={2} sm={1}>
                          Schedule Date
                        </Label>
                        <Col xs={10} sm={11}>
                          <Input
                            type="date"
                            id="scheduleDate"
                            name="scheduleDate"
                            placeholder="Schedule Date"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.scheduleDate}
                          />
                        </Col>
                      </FormGroup>

                      {/* Document Type */}
                      <FormGroup row className="mb-3 align-items-center">
                        <Label htmlFor="documentType" xs={2} sm={1}>
                          Document Types
                        </Label>
                        <Col xs={10} sm={11}>
                          <Row>
                            {this.state.documentTypes.map((type, index) => (
                              <Col sm={3} key={type.id}>
                                <FormGroup check inline>
                                  <Input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`documentType-${type.id}`}
                                    name="documentTypes"
                                    onChange={(e) => {
                                      const value = e.target.checked
                                        ? type.id
                                        : null;
                                      setFieldValue(
                                        `documentTypes.${index}`,
                                        value
                                      );
                                    }}
                                    checked={values.documentTypes.includes(
                                      type.id
                                    )}
                                  />
                                  <Label
                                    className="form-check-label"
                                    check
                                    htmlFor={`documentType-${type.id}`}
                                  >
                                    {type.label}
                                  </Label>
                                </FormGroup>
                              </Col>
                            ))}
                          </Row>
                        </Col>
                      </FormGroup>

                      {/* Content */}
                      <FormGroup row className="mb-3 align-items-center">
                        <Label htmlFor="content" xs={2} sm={1}>
                          Content
                        </Label>
                        <Col xs={10} sm={11}>
                          <ReactQuill
                            name="content"
                            id="content"
                            placeholder="Content *"
                            valid={!errors.content}
                            invalid={touched.content && !!errors.content}
                            required
                            onChange={(event) =>
                              setFieldValue("content", event)
                            }
                            onBlur={() => setFieldTouched("content", true)}
                            value={values.content}
                            modules={modules}
                          />
                          <FormFeedback>{errors.content}</FormFeedback>
                        </Col>
                      </FormGroup>

                      {/* File Input */}
                      <FormGroup row className="mb-3 align-items-center">
                        <Label htmlFor="file" xs={2} sm={1}>
                          File
                        </Label>
                        <Col xs={10} sm={11}>
                          <input type="file" ref={this.fileInput} />
                        </Col>
                      </FormGroup>

                      {/* Send Type */}
                      <FormGroup row className="mb-3 align-items-center">
                        <Label htmlFor="activityType" xs={2} sm={1}>
                          Send As
                        </Label>
                        <Col xs={10} sm={11}>
                          <Input
                            type="select"
                            name="sendType"
                            id="sendType"
                            onChange={(e) =>
                              setFieldValue("sendType", e.target.value)
                            }
                            value={values.sendType}
                          >
                            {this.state.sendTypes.map((type) => (
                              <option key={type.type} value={type.type}>
                                {type.text}
                              </option>
                            ))}
                          </Input>
                        </Col>
                      </FormGroup>

                      {/* Submit Button */}
                      <FormGroup className="crm-buttons">
                        <Button
                          type="submit"
                          color="success"
                          disabled={isSubmitting || !isValid}
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                      </FormGroup>
                    </Form>
                  )
                }
              />
            </>
          )}
        </main>
      </div>
    );
  }
}

export default Compose;
