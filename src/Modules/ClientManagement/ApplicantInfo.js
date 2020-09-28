import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import LoadingSpinner from "./loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TextMask, InputAdapter } from "react-text-mask-hoc";
import Moment from "moment";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
  Dropdown,
  Nav,
  NavItem,
  NavLink,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

class ApplicantInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      readOnly: false,
      lable: "Last Name:",
      n_PersonInfoId_PK: "",
      n_EmailInfoId_PK: "",
      n_FaxInfo_PK: "",
      n_PhoneInfoId_PK: "",
      n_WebInfoIdNo_PK: "",
      s_EntityType: "",
      ClientID: "",
      s_FirstName: "",
      s_MiddleName: "",
      s_LastOrganizationName: "",
      s_DBAName: "",
      s_PrefixTitle: "",
      s_SuffixName: "",
      d_BirthDate: new Date(),
      s_SSNNo: "",
      n_BusinessType: "",
      s_1099Flag: "",
      s_FullLegalName: "",
      s_LegacyId: "",
      s_PhoneNumber: "",
      s_FaxNo: "",
      s_EmailAddress: "",
      s_Website: "",
      s_Note: "",
      s_Status: "",
    };
  }

  handleChange = (e) => {
    if (e.target.name == "s_EntityType") {
      if (e.target.value == "ORGANISATION") {
        this.setState({
          readOnly: true,
          lable: "Org Name:",
        });
      } else {
        this.setState({
          readOnly: false,
          lable: "Last Name:",
        });
      }
    }
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  toInputUppercase = (e) => {
    e.target.value =
      "" + e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
  };

  handleChangeDate = (date) => {
    this.setState({ d_BirthDate: date });
  };

  componentWillReceiveProps(props) {
    if (props.loading == true) {
      if (props.PersonInfo.length > 0) {
        if (props.PhoneInfo.length > 0) {
          this.setState({
            s_PhoneNumber: props.PhoneInfo[0]["s_PhoneNumber"],
            n_PhoneInfoId_PK: props.PhoneInfo[0]["n_PhoneInfoId_PK"],
          });
        }
        if (props.FaxInfo.length > 0) {
          this.setState({
            n_FaxInfo_PK: props.FaxInfo[0]["n_PhoneInfoId_PK"],
            s_FaxNo: props.FaxInfo[0]["s_PhoneNumber"],
          });
        }
        if (props.EmailINfo.length > 0) {
          this.setState({
            n_EmailInfoId_PK: props.EmailINfo[0]["n_EmailInfoId_PK"],
            s_EmailAddress: props.EmailINfo[0]["s_EmailAddress"],
          });
        }
        if (props.WebInfo.length > 0) {
          this.setState({
            s_Website: props.WebInfo[0]["s_WebsiteURL"],
            n_WebInfoIdNo_PK: props.WebInfo[0]["n_WebInfoIdNo_PK"],
          });
        }
        var BirthDate = "";
        if (
          props.PersonInfo[0]["d_BirthDate"] != "" &&
          props.PersonInfo[0]["d_BirthDate"] != null && 
          props.PersonInfo[0]["d_BirthDate"] != '0000-00-00'
        ) {
          BirthDate = new Date(Moment(props.PersonInfo[0]["d_BirthDate"]));
        }

        if (this.props.isEdit == "Y") {
          this.setState({ readOnly: true });
        }

        this.setState({
          n_PersonInfoId_PK: props.PersonInfo[0]["n_PersonInfoId_PK"],
          s_EntityType: props.PersonInfo[0]["s_EntityType"],
          ClientID: props.PersonInfo[0]["s_PersonUniqueId"],
          s_FirstName: props.PersonInfo[0]["s_FirstName"],
          s_MiddleName: props.PersonInfo[0]["s_MiddleName"],
          s_LastOrganizationName: props.PersonInfo[0]["s_LastOrganizationName"],
          s_DBAName: props.PersonInfo[0]["s_DBAName"],
          s_PrefixTitle: props.PersonInfo[0]["s_PrefixTitle"],
          s_SuffixName: props.PersonInfo[0]["s_SuffixName"],
          d_BirthDate: BirthDate,
          s_SSNNo: props.PersonInfo[0]["s_SSNNo"],
          n_BusinessType: props.PersonInfo[0]["n_BusinessType"],
          s_1099Flag: props.PersonInfo[0]["s_1099Flag"],
          s_FullLegalName: props.PersonInfo[0]["s_FullLegalName"],
          s_LegacyId: props.PersonInfo[0]["s_LegacyId"],
          s_Note: props.PersonInfo[0]["s_Note"],
          s_Status: props.PersonInfo[0]["s_PersonStatusCode"],
        });
      } else {
        this.setState({
          n_PersonInfoId_PK: "",
          n_EmailInfoId_PK: "",
          n_FaxInfo_PK: "",
          n_PhoneInfoId_PK: "",
          n_WebInfoIdNo_PK: "",
          s_EntityType: "",
          ClientID: "",
          s_FirstName: "",
          s_MiddleName: "",
          s_LastOrganizationName: "",
          s_DBAName: "",
          s_PrefixTitle: "",
          s_SuffixName: "",
          d_BirthDate: "",
          s_SSNNo: "",
          n_BusinessType: "",
          s_1099Flag: "",
          s_FullLegalName: "",
          s_LegacyId: "",
          s_PhoneNumber: "",
          s_FaxNo: "",
          s_EmailAddress: "",
          s_Website: "",
          s_Note: "",
          s_Status: "",
        });
      }
    }
  }

  render() {
    const loading = this.props.loading;
    let Entity_Type = this.props.Entity_Type;
    let BUSINESSTYPE = this.props.BUSINESSTYPE;
    let s_1099 = this.props.s_1099;
    let Entity_options =
      Entity_Type.length > 0 &&
      Entity_Type.map((item, i) => {
        return (
          <option key={i} value={item.code}>
            {item.value}
          </option>
        );
      }, this);
    let Business_options =
      BUSINESSTYPE.length > 0 &&
      BUSINESSTYPE.map((item, i) => {
        return (
          <option key={i} value={item.s_AppCodeName}>
            {item.s_AppCodeNameForDisplay}
          </option>
        );
      }, this);
    let s1099_options =
      s_1099.length > 0 &&
      s_1099.map((item, i) => {
        return (
          <option key={i} value={item.code}>
            {item.value}
          </option>
        );
      }, this);
    return (
      <div className="animated fadeIn">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Form
            method="POST"
            onSubmit={this.handleSubmit}
            className="form-horizontal"
          >
            <Row className="mb-2">
              <Col md="2">
                <Label style={{ fontSize: "0.95rem" }} htmlFor="s_EntityType">
                <span className="text-danger"><b>*</b></span>Entity Type:
                </Label>
              </Col>
              <Col xs="8" md="3">
                <Input
                  type="select"
                  name="s_EntityType"
                  id="s_EntityType"
                  bsSize="sm"
                  onChange={this.handleChange}
                  value={this.state.s_EntityType}
                >
                  <option value="">Select Entity Type</option>
                  {Entity_options}
                </Input>
              </Col>
              <Col md="1">
                <Label></Label>
              </Col>
              <Col md="2">
                <Label style={{ fontSize: "0.95rem" }} htmlFor="ClientID">
                  Client ID:
                </Label>
              </Col>
              <Col xs="1" md="3">
                <Input
                  bsSize="sm"
                  type="text"
                  id="ClientID"
                  name="ClientID"
                  className="input-sm"
                  placeholder=""
                  onChange={this.handleChange}
                  value={this.state.ClientID}
                  readOnly={true}
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">
                <Label style={{ fontSize: "0.95rem" }} htmlFor="s_FirstName">
                <span className="text-danger"><b>*</b></span>First Name:
                </Label>
              </Col>
              <Col xs="8" md="3">
                <Input
                  bsSize="sm"
                  type="text"
                  id="s_FirstName"
                  name="s_FirstName"
                  className="input-sm"
                  placeholder=""
                  onChange={this.handleChange}
                  onInput={this.toInputUppercase}
                  value={this.state.s_FirstName}
                  readOnly={this.state.readOnly}
                />
              </Col>
              <Col md="1">
                <Label></Label>
              </Col>
              <Col md="2">
                <Label
                  style={{ fontSize: "0.95rem" }}
                  htmlFor="s_LastOrganizationName"
                ><span className="text-danger"><b>*</b></span>
                  {this.state.lable}
                </Label>
              </Col>
              <Col xs="8" md="3">
                <Input
                  bsSize="sm"
                  type="text"
                  id="s_LastOrganizationName"
                  name="s_LastOrganizationName"
                  className="input-sm"
                  placeholder=""
                  onChange={this.handleChange}
                  onInput={this.toInputUppercase}
                  value={this.state.s_LastOrganizationName}
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">
                <Label style={{ fontSize: "0.95rem" }} htmlFor="s_MiddleName">
                  Middle Name:
                </Label>
              </Col>
              <Col xs="1" md="3">
                <Input
                  bsSize="sm"
                  type="text"
                  id="s_MiddleName"
                  name="s_MiddleName"
                  className="input-sm"
                  placeholder=""
                  onChange={this.handleChange}
                  onInput={this.toInputUppercase}
                  value={this.state.s_MiddleName}
                  readOnly={this.state.readOnly}
                />
              </Col>

              <Col md="1">
                <Label></Label>
              </Col>
              <Col md="2">
                <Label style={{ fontSize: "0.95rem" }} htmlFor="s_DBAName">
                  DBA/Legal Name:
                </Label>
              </Col>
              <Col xs="1" md="3">
                <Input
                  bsSize="sm"
                  type="text"
                  id="s_DBAName"
                  name="s_DBAName"
                  className="input-sm"
                  placeholder=""
                  onChange={this.handleChange}
                  onInput={this.toInputUppercase}
                  value={this.state.s_DBAName}
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">
                <Label style={{ fontSize: "0.95rem" }} htmlFor="s_PrefixTitle">
                  Title:
                </Label>
              </Col>
              <Col xs="8" md="3">
                <Input
                  bsSize="sm"
                  type="text"
                  id="s_PrefixTitle"
                  name="s_PrefixTitle"
                  className="input-sm"
                  placeholder=""
                  onChange={this.handleChange}
                  onInput={this.toInputUppercase}
                  value={this.state.s_PrefixTitle}
                  readOnly={this.state.readOnly}
                />
              </Col>
              <Col md="1">
                <Label></Label>
              </Col>
              <Col md="2">
                <Label style={{ fontSize: "0.95rem" }} htmlFor="s_SuffixName">
                  Suffix:{" "}
                </Label>
              </Col>
              <Col xs="1" md="3">
                <Input
                  bsSize="sm"
                  type="text"
                  id="s_SuffixName"
                  name="s_SuffixName"
                  className="input-sm"
                  placeholder=""
                  onChange={this.handleChange}
                  onInput={this.toInputUppercase}
                  value={this.state.s_SuffixName}
                  readOnly={this.state.readOnly}
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">
                <Label style={{ fontSize: "0.95rem" }} htmlFor="d_BirthDate">
                  DOB/Inc:
                </Label>
              </Col>
              <Col xs="8" md="3">
                <DatePicker
                  style={{ width: "280px" }}
                  className="form-control form-control-sm"
                  selected={this.state.d_BirthDate}
                  onChange={(date) => this.handleChangeDate(date)}
                  name="d_BirthDate"
                  dateFormat="MM/dd/yyyy"
                  placeholderText="mm/dd/yyyy"
                  maxDate={new Date()}
                  value={this.state.d_BirthDate}
                />
              </Col>
              <Col md="1">
                <Label></Label>
              </Col>
              <Col md="2">
                <Label style={{ fontSize: "0.95rem" }} htmlFor="s_SSNNo">
                  SSN
                </Label>
              </Col>
              <Col xs="2" md="3">
                <TextMask
                  mask={[
                    /\d/,
                    /\d/,
                    /\d/,
                    "-",
                    /\d/,
                    /\d/,
                    "-",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  style={{ height: 28.3833 }}
                  Component={InputAdapter}
                  className="form-control"
                  id="s_SSNNo"
                  name="s_SSNNo"
                  placeholder=""
                  onChange={this.handleChange}
                  value={this.state.s_SSNNo}
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">
                <Label style={{ fontSize: "0.95rem" }} htmlFor="n_BusinessType">
                  Bus Type:
                </Label>
              </Col>
              <Col xs="8" md="3">
                <Input
                  type="select"
                  name="n_BusinessType"
                  id="n_BusinessType"
                  bsSize="sm"
                  onChange={this.handleChange}
                  value={this.state.n_BusinessType}
                >
                  <option value="">Select Buisness Type</option>
                  {Business_options}
                </Input>
              </Col>
              <Col md="1">
                <Label></Label>
              </Col>
              <Col md="2">
                <Label style={{ fontSize: "0.95rem" }} htmlFor="s_1099Flag">
                  1099 Flag:
                </Label>
              </Col>
              <Col xs="2" md="3">
                <Input
                  type="select"
                  name="s_1099Flag"
                  id="s_1099Flag"
                  bsSize="sm"
                  onChange={this.handleChange}
                  value={this.state.s_1099Flag}
                >
                  <option value="">Select</option>
                  {s1099_options}
                </Input>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">
                <Label
                  style={{ fontSize: "0.95rem" }}
                  htmlFor="s_FullLegalName"
                >
                  Scr Name:
                </Label>
              </Col>
              <Col xs="8" md="3">
                <Input
                  bsSize="sm"
                  type="text"
                  id="s_FullLegalName"
                  name="s_FullLegalName"
                  className="input-sm"
                  placeholder=""
                  onChange={this.handleChange}
                  onInput={this.toInputUppercase}
                  value={this.state.s_FullLegalName}
                />
              </Col>
              <Col md="1">
                <Label></Label>
              </Col>
              <Col md="2">
                <Label style={{ fontSize: "0.95rem" }} htmlFor="s_LegacyId">
                  Legacy Id:
                </Label>
              </Col>
              <Col xs="2" md="3">
                <Input
                  bsSize="sm"
                  type="text"
                  id="s_LegacyId"
                  name="s_LegacyId"
                  className="input-sm"
                  placeholder=""
                  onChange={this.handleChange}
                  value={this.state.s_LegacyId}
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">
                <Label style={{ fontSize: "0.95rem" }} htmlFor="s_PhoneNumber">
                <span className="text-danger"><b>*</b></span>Phone No:
                </Label>
              </Col>
              <Col xs="8" md="3">
                <TextMask
                  mask={[
                    "(",
                    /[1-9]/,
                    /\d/,
                    /\d/,
                    ")",
                    " ",
                    /\d/,
                    /\d/,
                    /\d/,
                    "-",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  style={{ height: 28.3833 }}
                  Component={InputAdapter}
                  className="form-control"
                  id="s_PhoneNumber"
                  name="s_PhoneNumber"
                  placeholder=""
                  onChange={this.handleChange}
                  value={this.state.s_PhoneNumber}
                />
              </Col>
              <Col md="1">
                <Label></Label>
              </Col>
              <Col md="2">
                <Label style={{ fontSize: "0.95rem" }} htmlFor="s_FaxNo">
                  Fax No:
                </Label>
              </Col>
              <Col xs="2" md="3">
                <TextMask
                  mask={[
                    "(",
                    /[1-9]/,
                    /\d/,
                    /\d/,
                    ")",
                    " ",
                    /\d/,
                    /\d/,
                    /\d/,
                    "-",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  style={{ height: 28.3833 }}
                  Component={InputAdapter}
                  className="form-control"
                  id="s_FaxNo"
                  name="s_FaxNo"
                  placeholder=""
                  onChange={this.handleChange}
                  value={this.state.s_FaxNo}
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">
                <Label style={{ fontSize: "0.95rem" }} htmlFor="s_EmailAddress">
                <span className="text-danger"><b>*</b></span>Email Address:
                </Label>
              </Col>
              <Col xs="8" md="3">
                <Input
                  bsSize="sm"
                  type="email"
                  id="s_EmailAddress"
                  name="s_EmailAddress"
                  className="input-sm"
                  placeholder=""
                  onChange={this.handleChange}
                  value={this.state.s_EmailAddress}
                />
              </Col>
              <Col md="1">
                <Label></Label>
              </Col>
              <Col md="2">
                <Label style={{ fontSize: "0.95rem" }} htmlFor="s_Website">
                  Website:
                </Label>
              </Col>
              <Col xs="2" md="3">
                <Input
                  bsSize="sm"
                  type="text"
                  id="s_Website"
                  name="s_Website"
                  className="input-sm"
                  placeholder=""
                  onChange={this.handleChange}
                  value={this.state.s_Website}
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md="2">
                <Label style={{ fontSize: "0.95rem" }} htmlFor="s_Note">
                  Note:{" "}
                </Label>
              </Col>
              <Col xs="8" md="3">
                <textarea
                  name="s_Note"
                  id="s_Note"
                  rows="3"
                  placeholder="Content..."
                  class="form-control"
                  onChange={this.handleChange}
                  onInput={this.toInputUppercase}
                  value={this.state.s_Note}
                ></textarea>
              </Col>
              <Col md="1">
                <Label></Label>
              </Col>
              <Col md="2">
                <Label style={{ fontSize: "0.95rem" }} htmlFor="s_Status">
                  Status:
                </Label>
              </Col>
              <Col xs="2" md="3">
                <Input
                  type="select"
                  name="s_Status"
                  id="s_Status"
                  bsSize="sm"
                  onChange={this.handleChange}
                  value={this.state.s_Status}
                >
                  <option value="">Select</option>
                  <option value="ACTIVE">Active</option>
                  <option value="DEACTIVE">Deactive</option>
                </Input>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Input
                  bsSize="sm"
                  type="hidden"
                  id="n_PersonInfoId_PK"
                  name="n_PersonInfoId_PK"
                  className="input-sm"
                  placeholder=""
                  onChange={this.handleChange}
                  value={this.state.n_PersonInfoId_PK}
                />
                <Input
                  bsSize="sm"
                  type="hidden"
                  id="n_EmailInfoId_PK"
                  name="n_EmailInfoId_PK"
                  className="input-sm"
                  placeholder=""
                  onChange={this.handleChange}
                  value={this.state.n_EmailInfoId_PK}
                />
                <Input
                  bsSize="sm"
                  type="hidden"
                  id="n_PhoneInfoId_PK"
                  name="n_PhoneInfoId_PK"
                  className="input-sm"
                  placeholder=""
                  onChange={this.handleChange}
                  value={this.state.n_PhoneInfoId_PK}
                />
                <Input
                  bsSize="sm"
                  type="hidden"
                  id="n_WebInfoIdNo_PK"
                  name="n_WebInfoIdNo_PK"
                  className="input-sm"
                  placeholder=""
                  onChange={this.handleChange}
                  value={this.state.n_WebInfoIdNo_PK}
                />
                <Input
                  bsSize="sm"
                  type="hidden"
                  id="n_FaxInfo_PK"
                  name="n_FaxInfo_PK"
                  className="input-sm"
                  placeholder=""
                  onChange={this.handleChange}
                  value={this.state.n_FaxInfo_PK}
                />
              </Col>
            </Row>
          </Form>
        )}
      </div>
    );
  }
}

export default ApplicantInfo;
