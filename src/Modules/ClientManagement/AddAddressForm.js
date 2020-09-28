import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import ReeValidate from "ree-validate";
import * as actions from "../../store/actions";
import * as QuoteEntryService from "../../services/quoteEntryService";
import ZipDetailsView from "./ZipDetailsView";
import { toastAction } from "../../store/actions/toast-actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  ModalHeader,
} from "reactstrap";

class AddAddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      n_PersonAddressesId_PK: "",
      s_AddressTypeCode: "",
      s_IsDefaultAddress: "",
      s_AddressLine1: "",
      s_PostalCode: "",
      s_CityName: "",
      s_StateName: "",
      s_CountryName: "",
      d_EffectiveDateFrom: "",
      d_EffectiveDateTo: "",
      errors: {},
      response: {
        error: false,
        message: "",
      },
      FormData: [],
      rowIndex: null,
      Default_RowIndex: "N",
      isModalOpen: false,
      multipleCity: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      n_PersonAddressesId_PK,
      s_AddressTypeCode,
      s_IsDefaultAddress,
      s_AddressLine1,
      s_PostalCode,
      s_CityName,
      s_StateName,
      s_CountryName,
      d_EffectiveDateFrom,
      d_EffectiveDateTo,
      rowIndex,
      Default_RowIndex,
    } = this.state;
    const credentials = [
      {
        n_PersonAddressesId_PK,
        s_AddressTypeCode,
        s_IsDefaultAddress,
        s_AddressLine1,
        s_PostalCode,
        s_CityName,
        s_StateName,
        s_CountryName,
        d_EffectiveDateFrom,
        d_EffectiveDateTo,
        rowIndex,
        Default_RowIndex,
      },
    ];
    if (this.props.isEdit == "N") {
      if (this.props.is_Default_present == "Y") {
        if (s_IsDefaultAddress == "Y") {
          if (this.props.Default_RowIndex == "Y") {
            this.setState({ response: { error: false, message: "" } });
            this.props.dispatch(actions.saveAddress(credentials));
          } else {
            this.error("Default Address Present");
          }
        } else {
          if (
            this.props.Edit_FormData.s_IsDefaultAddress == "Y" &&
            s_IsDefaultAddress == "N"
          ) {
            this.props.checkDefaultAddressPresent("N");
          }
          this.setState({ response: { error: false, message: "" } });
          this.props.dispatch(actions.saveAddress(credentials));
        }
      } else {
        if (s_IsDefaultAddress == "Y") {
          this.props.checkDefaultAddressPresent("Y");
        }

        this.setState({ response: { error: false, message: "" } });
        this.props.dispatch(actions.saveAddress(credentials));
      }
    } else {
      if (s_IsDefaultAddress == "Y") {
        if (this.props.is_Default_present == "Y") {
          this.error("Default Address Present");
        } else {
            this.props.checkDefaultAddressPresent("Y");
          this.setState({ response: { error: false, message: "" } });
          this.props.dispatch(actions.saveAddress(credentials));
        }
      } else {
        if (
            this.props.Edit_FormData.s_IsDefaultAddress == "Y" &&
            s_IsDefaultAddress == "N"
          ) {
            this.props.checkDefaultAddressPresent("N");
          } 
        this.setState({ response: { error: false, message: "" } });
        this.props.dispatch(actions.saveAddress(credentials));
      }
    }
    {
      this.props.formSubmit();
    }
  };

  getDataFromZip = (zipCodeVal) => {
    this.props
      .dispatch(QuoteEntryService.getZipDetails(1, zipCodeVal, "ClientAddress"))
      .then((res) => {
        if (res.count == 0) {
          toastAction(false, "Invalid Zip Code!");
          return false;
        } else {
          if (res.count > 1) {
            this.showMultipleCityModal(res.zipData);
          } else {
            this.setZipDetailsData(res.zipData[0]);
          }
        }
      });
  };

  showMultipleCityModal = (zipData) => {
    this.setState({
      multipleCity: (
        <ZipDetailsView
          zipData={zipData}
          setZipDetailsData={this.setZipDetailsData}
        />
      ),
      isModalOpen: true,
    });
  };

  setZipDetailsData = (zipData) => {
    this.setState({
      s_CityName: zipData.s_CityName,
      s_CountryName: zipData.s_ZipCounty,
      s_StateName: zipData.s_StateCode,
      isModalOpen: false,
    });
  };

  componentDidMount() {
    this.setState({
      n_PersonAddressesId_PK: this.props.Edit_FormData.n_PersonAddressesId_PK,
      s_AddressTypeCode: this.props.Edit_FormData.s_AddressTypeCode,
      s_IsDefaultAddress: this.props.Edit_FormData.s_IsDefaultAddress,
      s_AddressLine1: this.props.Edit_FormData.s_AddressLine1,
      s_PostalCode: this.props.Edit_FormData.s_PostalCode,
      s_CityName: this.props.Edit_FormData.s_CityName,
      s_StateName: this.props.Edit_FormData.s_StateName,
      s_CountryName: this.props.Edit_FormData.s_CountryName,
      d_EffectiveDateFrom: this.props.Edit_FormData.d_EffectiveDateFrom,
      d_EffectiveDateTo: this.props.Edit_FormData.d_EffectiveDateTo,
      rowIndex: this.props.rowIndex,
      Default_RowIndex: this.props.Default_RowIndex,
    });
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

  render() {
    const containerStyle = {
      zIndex: 1999,
    };
    let ADDRESSTYPE = this.props.ADDRESSTYPE;
    let Address_options =
      ADDRESSTYPE.length > 0 &&
      ADDRESSTYPE.map((item, i) => {
        return (
          <option key={i} value={item.s_AppCodeName}>
            {item.s_AppCodeNameForDisplay}
          </option>
        );
      }, this);
    const { Edit_FormData } = this.props.Edit_FormData;
    return (
      <div className="animated fadeIn">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          style={containerStyle}
        />
        <Form
          method="POST"
          onSubmit={this.handleSubmit}
          className="form-horizontal"
        >
          <Row>
            <Col md="6">
              <Row>
                <Col xs="12" md="4">
                  <Label size="sm" htmlFor="s_AddressTypeCode">
                    Addr Type:
                  </Label>
                </Col>
                <Col xs="12" md="8">
                  <Input
                    type="select"
                    name="s_AddressTypeCode"
                    id="s_AddressTypeCode"
                    bsSize="sm"
                    onChange={this.handleChange}
                    value={this.state.s_AddressTypeCode}
                    required
                  >
                    <option value="">Select Addr Type</option>
                    {Address_options}
                  </Input>
                </Col>
              </Row>
            </Col>
            <Col md="6">
              <Row>
                <Col xs="12" md="4">
                  <Label size="sm" htmlFor="s_IsDefaultAddress">
                    Default:
                  </Label>
                </Col>
                <Col xs="12" md="8">
                  <Input
                    type="select"
                    name="s_IsDefaultAddress"
                    id="s_IsDefaultAddress"
                    bsSize="sm"
                    onChange={this.handleChange}
                    value={this.state.s_IsDefaultAddress}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Y">YES</option>
                    <option value="N">NO</option>
                  </Input>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md="12" mb="2">
              <Row>
                <Col xs="12" md="2">
                  <Label size="sm" htmlFor="s_AddressLine1">
                    Address:
                  </Label>
                </Col>
                <Col xs="12" md="10">
                  <textarea
                    name="s_AddressLine1"
                    id="s_AddressLine1"
                    rows="2"
                    placeholder="Content..."
                    class="form-control"
                    onChange={this.handleChange}
                    value={this.state.s_AddressLine1}
                    required
                  ></textarea>
                </Col>
              </Row>
              <Row>
                <Label />
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Row>
                <Col xs="12" md="4">
                  <Label size="sm" htmlFor="s_PostalCode">
                    Zip:
                  </Label>
                </Col>
                <Col xs="12" md="8">
                  <Input
                    bsSize="sm"
                    type="text"
                    id="s_PostalCode"
                    name="s_PostalCode"
                    className="input-sm"
                    placeholder=""
                    required
                    onChange={this.handleChange}
                    value={this.state.s_PostalCode}
                    onBlur={(e) => this.getDataFromZip(e.target.value)}
                  />
                </Col>
              </Row>
            </Col>
            <Col md="6">
              <Row>
                <Col xs="12" md="4">
                  <Label size="sm" htmlFor="s_CityName">
                    City:
                  </Label>
                </Col>
                <Col xs="12" md="8">
                  <Input
                    bsSize="sm"
                    type="text"
                    id="s_CityName"
                    name="s_CityName"
                    className="input-sm"
                    placeholder=""
                    required
                    onChange={this.handleChange}
                    value={this.state.s_CityName}
                    readOnly={true}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Row>
                <Col xs="12" md="4">
                  <Label size="sm" htmlFor="s_StateName">
                    State:
                  </Label>
                </Col>
                <Col xs="12" md="8">
                  <Input
                    bsSize="sm"
                    type="text"
                    id="s_StateName"
                    name="s_StateName"
                    className="input-sm"
                    placeholder=""
                    required
                    onChange={this.handleChange}
                    value={this.state.s_StateName}
                    readOnly={true}
                  />
                </Col>
              </Row>
            </Col>
            <Col md="6">
              <Row>
                <Col xs="12" md="4">
                  <Label size="sm" htmlFor="s_CountryName">
                    County:
                  </Label>
                </Col>
                <Col xs="12" md="8">
                  <Input
                    bsSize="sm"
                    type="text"
                    id="s_CountryName"
                    name="s_CountryName"
                    className="input-sm"
                    placeholder=""
                    required
                    onChange={this.handleChange}
                    value={this.state.s_CountryName}
                    readOnly={true}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Row>
                <Col xs="12" md="4">
                  <Label size="sm" htmlFor="d_EffectiveDateFrom">
                    Eff. From:
                  </Label>
                </Col>
                <Col xs="12" md="8">
                  <Input
                    bsSize="sm"
                    type="date"
                    id="d_EffectiveDateFrom"
                    name="d_EffectiveDateFrom"
                    className="input-sm"
                    placeholder=""
                    required
                    onChange={this.handleChange}
                    value={this.state.d_EffectiveDateFrom}
                  />
                </Col>
              </Row>
            </Col>
            <Col md="6">
              <Row>
                <Col xs="12" md="4">
                  <Label size="sm" htmlFor="d_EffectiveDateTo">
                    Eff. To:
                  </Label>
                </Col>
                <Col xs="12" md="8">
                  <Input
                    bsSize="sm"
                    type="date"
                    id="d_EffectiveDateTo"
                    name="d_EffectiveDateTo"
                    className="input-sm"
                    placeholder=""
                    required
                    onChange={this.handleChange}
                    value={this.state.d_EffectiveDateTo}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Input
            bsSize="sm"
            type="hidden"
            id="n_PersonAddressesId_PK"
            name="n_PersonAddressesId_PK"
            className="input-sm"
            placeholder=""
            required
            onChange={this.handleChange}
            value={this.state.n_PersonAddressesId_PK}
          />
          <div xs="12" className="text-center">
            <Button type="submit" size="md" color="primary">
              Save
            </Button>
          </div>
        </Form>
        <Modal isOpen={this.state.isModalOpen} className={"modal-sm"}>
          <ModalHeader className="p-2 mt-3">Select City</ModalHeader>
          <ModalBody>{this.state.multipleCity}</ModalBody>
        </Modal>
      </div>
    );
  }
}

AddAddressForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  AddrFormData1: PropTypes.array.isRequired,
  Default_Addr_RowIndex: PropTypes.string.isRequired,
  ClientPk: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  AddrFormData1: state.Client.AddrFormData1,
  Default_Addr_RowIndex: state.Client.Default_Addr_RowIndex,
  ClientPk: state.Client.ClientPk,
});

export default connect(mapStateToProps)(AddAddressForm);
