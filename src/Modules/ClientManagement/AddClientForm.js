import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import ReeValidate from "ree-validate";
import { addClient, saveClientForm } from "../../services/clientService";
import Http from "../../Http";
import ApplicantInfo from "./ApplicantInfo";
import AddressInfo from "./AddressInfo";
import RoleInfo from "./RoleInfo";
import LoadingSpinner from "./loading";
import AddAddressForm from "./AddAddressForm";
import AddRoleForm from "./AddRoleForm";
import * as actions from "../../store/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validate } from "./Common/fieldValidate";
import ReactDOM from "react-dom";
import ShowErrorMsgs from "./Common/showErrors";


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
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const initialState = {
  modal: false,
  modalRole: false,
  loading: false,
  BUSINESSTYPE: [],
  ADDRESSTYPE: [],
  SYSTEMROLE: [],
  Entity_Type: [],
  s_1099: [],
  data: [],
  errors: {},
  response: {
    error: false,
    message: "",
  },
  ClientPk: "",
  s_AddressTypeCode: "",
  s_IsDefaultAddress: "",
  s_AddressLine1: "",
  s_PostalCode: "",
  s_CityName: "",
  s_StateName: "",
  s_CountryName: "",
  d_EffectiveDateFrom: "",
  d_EffectiveDateTo: "",
  Edit_FormData: {},
  whichAction: "",
  rowIndex: null,
  Default_RowIndex: "N",
  Edit_RoleFormData: {},
  roleRowIndex: null,
  isEdit: "N",
  isChange: "N",
  showError: null,
  errorLogs: [],
  is_Default_present: "N",
};
class AddClientForm extends Component {
  ClientformRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = initialState;

    this.formElements = {};

    this.toggle = this.toggle.bind(this);
    this.toggleRole = this.toggleRole.bind(this);
    this.addAddress = this.addAddress.bind(this);
    this.addRole = this.addRole.bind(this);
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
  }

  success(msg) {
    return toast.success(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }

  error(msg) {
    return toast.error(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleRole() {
    this.setState({
      modalRole: !this.state.modalRole,
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    this.toggle();
    this.setState({ isChange: "Y" });
  };

  handleSubmitRole = (e) => {
    this.toggleRole();
  };

  onClickProductSelected(row, rowIndex) {
     if (row.s_IsDefaultAddress == "Y") {
      this.setState({ Default_RowIndex: "Y" });
    } else {
      this.setState({ Default_RowIndex: "N" });
    }
    let { Edit_FormData } = row;
    this.setState({ rowIndex: rowIndex, Edit_FormData: row, whichAction: "EDIT" });
    this.toggle();
  }

  onClickRoleSelected(row, rowIndex) {
    let { Edit_RoleFormData } = row;
    this.setState({ roleRowIndex: rowIndex, Edit_RoleFormData: row });
    this.toggleRole();
  }

  addAddress = (e) => {
    this.setState({ whichAction: "ADD" });
    const { Edit_FormData } = {};
    this.setState({ Edit_FormData: {}, Default_RowIndex: "N", rowIndex: "" });
    this.toggle();
  };

  addRole() {
    this.setState({ Edit_RoleFormData: {},  roleRowIndex: "" });
    this.toggleRole();
  }

  checkDefaultAddressPresent = (value) => {
    this.setState({ is_Default_present: value });
  };

  saveApplicantInfo = () => {
    const form = this.ClientformRef.current;
    const ApplicantFormData = form.state;
    const AddressFormData = this.props.AddrFormData1;
    const RoleFormData = this.props.RoleFormData1;
    const user = JSON.parse(localStorage.getItem("user"));
    const credentials = {
      ApplicantFormData,
      AddressFormData,
      RoleFormData,
      user,
    };
    const result = validate(credentials);
    if (result.status == false) {
      var errorMsg = result.errorMsg;
      this.setState({
        errorLogs: errorMsg,
        showError: (
          <ShowErrorMsgs
            errorMsgs={errorMsg}
            onClickFun={() => this.toggleModal()}
          />
        ),
      });
      if (result.errorFields.length > 0) {
        // all form elements
        // console.log("Hello");
      }
      return false;
    } else {
      const { Default_RowIndex, isEdit, is_Default_present, isChange } = this.state;
      if (isEdit == "N") {
        if (is_Default_present == "N") {
          this.error("Default Address is Compulsory");
        } else {
          if (this.props.isMortgagee == "Y" && this.props.isMailing == "N") {
            this.error("For Mortgagee Role Mailing Address is Complusory");
          } else {
            this.setState({ loading: true, isEdit: "N" });
            this.props
              .dispatch(saveClientForm(credentials))
              .then((res) => {
                this.success("Client Saved Successfully");
                this.setState(initialState)
              })
              .catch((err) => {
                const errors = Object.values(err.errors);
                errors.join(" ");
                const response = {
                  error: true,
                  message: errors,
                };
                this.setState({ response });
              });
          }
        }
      }else{
        if (is_Default_present == "N") {
          this.error("Default Address is Compulsory");
        } else {
          if (this.props.isMortgagee == "Y" && this.props.isMailing == "N") {
            this.error("For Mortgagee Role Mailing Address is Complusory");
          } else {
            this.setState({ loading: true, isEdit: "N"});
            this.props
              .dispatch(saveClientForm(credentials))
              .then((res) => {
                this.success("Client Saved Successfully");
                this.setState(initialState);
              })
              .catch((err) => {
                const errors = Object.values(err.errors);
                errors.join(" ");
                const response = {
                  error: true,
                  message: errors,
                };
                this.setState({ response });
              });
          }
        }
      }
    }
  };
  toggleModal = () => this.setState({ showError: null });

  // Show previously validation errors
  openErrorLogModal = () => {
    this.setState({
      showError: (
        <ShowErrorMsgs
          errorMsgs={this.state.errorLogs}
          onClickFun={() => this.toggleModal()}
        />
      ),
    });
  };
  componentDidMount() {
    this.setState({ loading: true });
    const ClientPk = this.props.ClientPk;
    if (ClientPk != "") {
      this.setState({ isEdit: "Y" });
    }
    const credentials = {
      ClientPk,
    };

    this.props
      .dispatch(addClient(credentials))
      .then((res) => {
        this.setState({ loading: false });
      })
      .catch((err) => {
        const errors = Object.values(err.errors);
        errors.join(" ");
        const response = {
          error: true,
          message: errors,
        };
        this.setState({ response });
      });
  }

  componentWillReceiveProps(props){
    if(props.AddrFormData1.length > 0){
      if(props.AddrFormData1.some(data => data.s_IsDefaultAddress === 'Y')){
        this.setState({is_Default_present: 'Y'})
      }
    }
  }

  render() {
    const containerStyle = {
      zIndex: 1999,
    };
    const { Edit_FormData, Edit_RoleFormData, rowIndex, Default_RowIndex, roleRowIndex, loading, isEdit, is_Default_present } = this.state;
    return (
      <div className="animated fadeIn">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          style={containerStyle}
        />
        <Form
          method="post"
          ref={(el) => {
            this.agencyForm = el;
          }}
        >
          <Row>
            <Col xs="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i>
                  <strong>Applicant Information</strong>
                </CardHeader>
                <CardBody>
                  <ApplicantInfo
                    ref={this.ClientformRef}
                    loading={loading}
                    WebInfo={this.props.WebInfo}
                    PhoneInfo={this.props.PhoneInfo}
                    FaxInfo={this.props.FaxInfo}
                    PersonInfo={this.props.PersonInfo}
                    EmailINfo={this.props.EmailINfo}
                    Entity_Type={this.props.Entity_Type}
                    BUSINESSTYPE={this.props.BUSINESSTYPE}
                    s_1099={this.props.s_1099}
                    isEdit={isEdit}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i>
                  <strong>Address Information</strong>
                  <Button
                    style={{
                      height: "21px",
                      width: "66px",
                      padding: "initial",
                    }}
                    className="btn-linkedin btn-brand mr-1 float-right"
                    onClick={(e) => this.addAddress(e)}
                  >
                    <span>Add Row</span>
                  </Button>
                  <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={"modal-lg " + this.props.className}
                  >
                    <ModalHeader className="p-2 mt-3">
                      Address Info &nbsp;&nbsp;
                      <i className="fa fa-times" onClick={this.toggle}></i>
                    </ModalHeader>
                    <ModalBody>
                      <AddAddressForm
                        ADDRESSTYPE={this.props.ADDRESSTYPE}
                        formSubmit={(e) => this.handleSubmit(e)}
                        Edit_FormData={Edit_FormData}
                        rowIndex={rowIndex}
                        Default_RowIndex={Default_RowIndex}
                        isEdit={isEdit}
                        is_Default_present={is_Default_present}
                        checkDefaultAddressPresent={
                          this.checkDefaultAddressPresent
                        }
                      />
                    </ModalBody>
                  </Modal>
                </CardHeader>
                <CardBody>
                  {loading ? (
                    <LoadingSpinner />
                  ) : (
                    <AddressInfo
                      AddressInfo={this.props.AddrFormData1.length}
                      onEdit={(row, rowIndex) =>
                        this.onClickProductSelected(row, rowIndex)
                      }   
                    />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i>
                  <strong>Role Information</strong>
                  <Button
                    style={{
                      height: "21px",
                      width: "66px",
                      padding: "initial",
                    }}
                    className="btn-linkedin btn-brand mr-1 float-right"
                    onClick={this.addRole}
                  >
                    <span>Add Row</span>
                  </Button>
                  <Modal
                    isOpen={this.state.modalRole}
                    toggle={this.toggleRole}
                    className={"modal-lg " + this.props.className}
                  >
                    <ModalHeader className="p-2 mt-3">
                      Role Info &nbsp;&nbsp;
                      <i className="fa fa-times" onClick={this.toggleRole}></i>
                    </ModalHeader>
                    <ModalBody>
                      <AddRoleForm
                        SYSTEMROLE={this.props.SYSTEMROLE}
                        formSubmitRole={(e) => this.handleSubmitRole(e)}
                        Edit_RoleFormData={Edit_RoleFormData}
                        rowIndex={roleRowIndex}
                        isEdit={isEdit}
                      />
                    </ModalBody>
                  </Modal>
                </CardHeader>
                <CardBody>
                  {loading ? (
                    <LoadingSpinner />
                  ) : (
                    <RoleInfo
                      RoleInfo={this.props.RoleFormData1.length}
                      onEdit={(row, rowIndex) =>
                        this.onClickRoleSelected(row, rowIndex)
                      }
                    />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>

          <div xs="12" className="text-center">
            <Button
              type="button"
              size="md"
              color="primary"
              onClick={this.saveApplicantInfo}
            >
              Save
            </Button>
          </div>
          {this.state.showError}
        </Form>
      </div>
    );
  }
}

AddClientForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  Entity_Type: PropTypes.array.isRequired,
  BUSINESSTYPE: PropTypes.array.isRequired,
  s_1099: PropTypes.array.isRequired,
  AddressInfo: PropTypes.array.isRequired,
  RoleInfo: PropTypes.array.isRequired,
  ADDRESSTYPE: PropTypes.array.isRequired,
  AddrFormData1: PropTypes.array.isRequired,
  SYSTEMROLE: PropTypes.array.isRequired,
  RoleFormData1: PropTypes.array.isRequired,
  ClientPk: PropTypes.string.isRequired,
  PersonInfo: PropTypes.array.isRequired,
  EmailINfo: PropTypes.array.isRequired,
  FaxInfo: PropTypes.array.isRequired,
  PhoneInfo: PropTypes.array.isRequired,
  WebInfo: PropTypes.array.isRequired,
  isMortgagee: PropTypes.string.isRequired,
  isMailing: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  Entity_Type: state.Client.Entity_Type,
  BUSINESSTYPE: state.Client.BUSINESSTYPE,
  s_1099: state.Client.s_1099,
  AddressInfo: state.Client.AddressInfo,
  RoleInfo: state.Client.RoleInfo,
  ADDRESSTYPE: state.Client.ADDRESSTYPE,
  AddrFormData1: state.Client.AddrFormData1,
  SYSTEMROLE: state.Client.SYSTEMROLE,
  RoleFormData1: state.Client.RoleFormData1,
  ClientPk: state.Client.ClientPk,
  PersonInfo: state.Client.PersonInfo,
  EmailINfo: state.Client.EmailINfo,
  FaxInfo: state.Client.FaxInfo,
  PhoneInfo: state.Client.PhoneInfo,
  WebInfo: state.Client.WebInfo,
  isMortgagee: state.Client.isMortgagee,
  isMailing: state.Client.isMailing,
});

export default connect(mapStateToProps)(AddClientForm);
