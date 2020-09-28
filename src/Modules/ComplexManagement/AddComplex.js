import React, { Component } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  InputGroup,
  Label,
  Col,
  Collapse,
  FormGroup,
  Table,
  Fade,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import PropTypes from "prop-types";
import { saveComplexManagementData } from "../../services/complexService";
import { toastAction } from "../../store/actions/toast-actions";
import { connect } from "react-redux";
import { getZipDetails } from "../../services/complexService";
import ZipDetailsView from "./ZipDetailsView";
import { zip, isEmpty } from "lodash";

class AddComplex extends Component {
  constructor(props) {
    super(props);
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.toggleCustom = this.toggleCustom.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.saveComplexInfo = this.saveComplexInfo.bind(this);
    this.setToggleModal = this.setToggleModal.bind(this);
    this.state = {
      isModalOpen: false,
      collapse: false,
      accordion: [true, false, false],
      custom: [true, false],
      status: "Closed",
      fadeIn: true,
      timeout: 300,
      s_Type: "",
      s_ProjectNumber: "",
      s_CondoName: "",
      s_Street: "",
      s_Zip: "",
      s_City: "",
      s_State: "",
      s_County: "",
      n_Units: "",
      s_PrimaryStatus: "",
      n_FileNumber: "",
      s_ManagingEntityNumber: "",
      s_ManagingEntityName: "",
      s_ManagingEntityStreet: "",
      s_ManagingEntityRoute: "",
      s_ManagingEntityZip: "",
      s_ManagingEntityCity: "",
      s_ManagingEntityState: "",
      s_SecondaryStatus: "",
      s_RowIdentifier: "",
      multipleCity: "",
      isReadOnly:false,
    };
  }

  componentDidMount = () =>{
    if(this.props.isEdit==true)
    {
      this.setState({isReadOnly: true, 
                      s_Type:this.props.Edit_ComplexFormData.s_Type,
                      s_CondoName:this.props.Edit_ComplexFormData.s_CondoName,
                      s_ProjectNumber:this.props.Edit_ComplexFormData.s_ProjectNumber,
                      s_Street:this.props.Edit_ComplexFormData.s_Street,
                      s_Zip:this.props.Edit_ComplexFormData.s_Zip,
                      s_State:this.props.Edit_ComplexFormData.s_State,
                      s_City:this.props.Edit_ComplexFormData.s_City,
                      s_County:this.props.Edit_ComplexFormData.s_County,
                      n_Units:this.props.Edit_ComplexFormData.n_Units,
                      s_PrimaryStatus:this.props.Edit_ComplexFormData.s_PrimaryStatus,
                      n_FileNumber:this.props.Edit_ComplexFormData.n_FileNumber,
                      s_ManagingEntityNumber:this.props.Edit_ComplexFormData.s_ManagingEntityNumber,
                      s_ManagingEntityName:this.props.Edit_ComplexFormData.s_ManagingEntityName,
                      s_ManagingEntityStreet:this.props.Edit_ComplexFormData.s_ManagingEntityStreet,
                      s_ManagingEntityRoute:this.props.Edit_ComplexFormData.s_ManagingEntityRoute,
                      s_ManagingEntityZip:this.props.Edit_ComplexFormData.s_ManagingEntityZip,
                      s_ManagingEntityCity:this.props.Edit_ComplexFormData.s_ManagingEntityCity,
                      s_ManagingEntityState:this.props.Edit_ComplexFormData.s_ManagingEntityState,
                      s_SecondaryStatus:this.props.Edit_ComplexFormData.s_SecondaryStatus,
                      s_RowIdentifier:this.props.Edit_ComplexFormData.s_RowIdentifier,
                    });
    }
    else{
      this.setState({s_Type: "",
      s_ProjectNumber: "",
      s_CondoName: "",
      s_Street: "",
      s_Zip: "",
      s_City: "",
      s_State: "",
      s_County: "",
      n_Units: "",
      s_PrimaryStatus: "",
      n_FileNumber: "",
      s_ManagingEntityNumber: "",
      s_ManagingEntityName: "",
      s_ManagingEntityStreet: "",
      s_ManagingEntityRoute: "",
      s_ManagingEntityZip: "",
      s_ManagingEntityCity: "",
      s_ManagingEntityState: "",
      s_SecondaryStatus: "",
      s_RowIdentifier: "",
      multipleCity: "",
      isReadOnly:false})
    }
  }

  setToggleModal() {
    this.setState({ isModalOpen: true });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onEntering() {
    this.setState({ status: "Opening..." });
  }
  onEntered() {
    this.setState({ status: "Opened" });
  }
  onExiting() {
    this.setState({ status: "Closing..." });
  }
  onExited() {
    this.setState({ status: "Closed" });
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));
    this.setState({
      accordion: state,
    });
  }
  toggleCustom(tab) {
    const prevState = this.state.custom;
    const state = prevState.map((x, index) => (tab === index ? !x : false));
    this.setState({
      custom: state,
    });
  }
  toggleFade() {
    this.setState({ fadeIn: !this.state.fadeIn });
  }

  setZipCode = () => {
    const s_Zip = this.state.s_Zip;
  };

  saveComplexInfo = (e) => {
    e.preventDefault();
    const {
      s_CondoName,
      s_Type,
      s_Zip,
      s_Street,
      s_State,
      s_City,
      s_County,
      s_ProjectNumber,
      n_Units,
      s_PrimaryStatus,
      n_FileNumber,
      s_ManagingEntityNumber,
      s_ManagingEntityName,
      s_ManagingEntityStreet,
      s_ManagingEntityRoute,
      s_ManagingEntityZip,
      s_ManagingEntityCity,
      s_ManagingEntityState,
      s_SecondaryStatus,
      s_RowIdentifier,
    } = this.state;
    const params = {
      s_CondoName,
      s_Type,
      s_Zip,
      s_Street,
      s_State,
      s_City,
      s_County,
      s_ProjectNumber,
      n_Units,
      s_PrimaryStatus,
      n_FileNumber,
      s_ManagingEntityNumber,
      s_ManagingEntityName,
      s_ManagingEntityStreet,
      s_ManagingEntityRoute,
      s_ManagingEntityZip,
      s_ManagingEntityCity,
      s_ManagingEntityState,
      s_SecondaryStatus,
      s_RowIdentifier,
    };
    if (params.s_Type == "") {
      toastAction(false, "Please select atleast one option.");
    } else {
      if (params.s_CondoName == "") {
        toastAction(false, "Please Enter the Complex Name.");
      } else {
        if (params.s_Zip == "") {
          toastAction(false, "Please Enter the Zip Code");
        } else {
          this.setState({ loading: true });
          this.props
            .dispatch(saveComplexManagementData(params))
            .then((res) => {
              if (res.Status == "Y") {
                toastAction(true, "Complex Information Saved Successfully");
                this.props.toggle();
                this.setState({isEdit:!this.props.isEdit})
                this.setState({Edit_ComplexFormData:{}})
                this.props.searchComplex();
              } else {
                toastAction(false, res.ErrorMsg);
              }
            })
            .catch((err) => {
            });
        }
      }
    }
  };
  getDataFromZip = (zipCodeVal) => {
    /**
     * @param {product, zipCode, source}
     */
    this.props.dispatch(getZipDetails(1, zipCodeVal, 'COMPLEX')).then((res) => {
      if (res.count == 0) {
        toastAction(false, "Invalid Zip Code!");
        this.setZipCode("");
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
    });
    this.setToggleModal(true);
  };

  setZipDetailsData = (zipData) => {
    this.setState({ s_City: zipData.s_CityName });
    this.setState({ s_County: zipData.s_CountyCode });
    this.setState({ s_State: zipData.s_StateCode });
    this.setState({isModalOpen: false});
  };
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" className="">
            <Row>
              <Col xs="12" sm="4" className="">
                <InputGroup className="input-prepend">
                  <Label id="QuoteNo" className="">
                    Type
                  </Label>
                </InputGroup>
              </Col>
              <Col xs="12" sm="6" className="">
                <Input
                  type="select"
                  name="s_Type"
                  id="s_Type"
                  onChange={this.handleChange}
                  value={this.state.s_Type}
                >
                  <option value="">-Select One-</option>
                  <option value="CONDO">Condo</option>
                  <option value="TOWNHOUSE">Town House</option>
                </Input>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs="12" sm="4" className="">
                <InputGroup className="input-prepend">
                  <Label id="QuoteNo" className="">
                    Project Number
                  </Label>
                </InputGroup>
              </Col>
              <Col xs="12" sm="6" className="">
                <Input
                  readOnly={this.state.isReadOnly}
                  type="text"
                  name="s_ProjectNumber"
                  id="ProjectNumber"
                  placeholder="Enter your Project Number"
                  onChange={this.handleChange}
                  value={this.state.s_ProjectNumber}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs="12" sm="4" className="">
                <InputGroup className="input-prepend">
                  <Label id="QuoteNo" className="">
                    Complex Name
                  </Label>
                </InputGroup>
              </Col>
              <Col xs="12" sm="6" className="">
                <Input
                  readOnly={this.state.isReadOnly}
                  type="text"
                  name="s_CondoName"
                  id="ComplexName"
                  placeholder="Enter your Complex Name"
                  onChange={this.handleChange}
                  value={this.state.s_CondoName}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs="12" sm="4" className="">
                <InputGroup className="input-prepend">
                  <Label id="QuoteNo" className="">
                    Street
                  </Label>
                </InputGroup>
              </Col>
              <Col xs="12" sm="6" className="">
                <Input
                readOnly={this.state.isReadOnly}
                  type="text"
                  name="s_Street"
                  id="Street"
                  placeholder="Enter Street"
                  onChange={this.handleChange}
                  value={this.state.s_Street}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs="12" sm="4" className="">
                <InputGroup className="input-prepend">
                  <Label id="QuoteNo" className="">
                    Zip
                  </Label>
                </InputGroup>
              </Col>
              <Col xs="12" sm="6" className="">
                <Input
                  type="text"
                  name="s_Zip"
                  id="ZipCode"
                  placeholder="Enter Zip"
                  value={this.state.s_Zip}
                  onChange={this.handleChange}
                  onBlur={(e) => this.getDataFromZip(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs="12" sm="4" className="">
                <InputGroup className="input-prepend">
                  <Label id="n_City" className="">
                    City
                  </Label>
                </InputGroup>
              </Col>
              <Col xs="12" sm="6" className="">
                <Input
                  readOnly
                  type="text"
                  name="s_City"
                  id="n_City"
                  placeholder="Enter City"
                  onChange={this.handleChange}
                  value={this.state.s_City}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs="12" sm="4" className="">
                <InputGroup className="input-prepend">
                  <Label id="n_County" className="">
                    County
                  </Label>
                </InputGroup>
              </Col>
              <Col xs="12" sm="6" className="">
                <Input
                  readOnly
                  type="text"
                  name="s_County"
                  id="n_County"
                  placeholder="Enter County"
                  onChange={this.handleChange}
                  value={this.state.s_County}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs="12" sm="4" className="">
                <InputGroup className="input-prepend">
                  <Label id="n_State" className="">
                    State Name
                  </Label>
                </InputGroup>
              </Col>
              <Col xs="12" sm="6" className="">
                <Input
                  readOnly
                  type="text"
                  name="s_State"
                  id="n_State"
                  placeholder="Enter State"
                  onChange={this.handleChange}
                  value={this.state.s_State}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs="12" sm="4" className="">
                <InputGroup className="input-prepend">
                  <Label id="Units" className="">
                    Units
                  </Label>
                </InputGroup>
              </Col>
              <Col xs="12" sm="6" className="">
                <Input
                readOnly={this.state.isReadOnly}
                  type="text"
                  name="n_Units"
                  id="Units"
                  placeholder="Enter Units"
                  onChange={this.handleChange}
                  value={this.state.n_Units}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs="12" sm="4" className="">
                <InputGroup className="input-prepend">
                  <Label id="PrimaryStatus" className="">
                    Primary Status
                  </Label>
                </InputGroup>
              </Col>
              <Col xs="12" sm="6" className="">
                <Input
                readOnly={this.state.isReadOnly}
                  type="text"
                  name="s_PrimaryStatus"
                  id="PrimaryStatus"
                  placeholder="Enter Primary Status"
                  onChange={this.handleChange}
                  value={this.state.s_PrimaryStatus}
                />
              </Col>
            </Row>
          </Col>
          <Col xs="12" sm="6" className="">
            <Row>
              <Col xs="12" sm="6" className="">
                <InputGroup className="input-prepend">
                  <Label id="QuoteNo" className="">
                    File Number
                  </Label>
                </InputGroup>
              </Col>
              <Col xs="12" sm="6" className="">
                <Input
                readOnly={this.state.isReadOnly}
                  type="text"
                  name="n_FileNumber"
                  id="FileNumber"
                  placeholder="Enter File Number"
                  onChange={this.handleChange}
                  value={this.state.n_FileNumber}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs="12" sm="6" className="">
                <InputGroup className="input-prepend">
                  <Label id="ManagingEntityNumber" className="">
                    Managing Entity Number
                  </Label>
                </InputGroup>
              </Col>
              <Col xs="12" sm="6" className="">
                <Input
                readOnly={this.state.isReadOnly}
                  type="text"
                  name="s_ManagingEntityNumber"
                  id="ManagingEntityNumber"
                  placeholder="Managing Entity Number"
                  onChange={this.handleChange}
                  value={this.state.s_ManagingEntityNumber}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs="12" sm="6" className="">
                <InputGroup className="input-prepend">
                  <Label id="ManagingEntityName" className="">
                    Managing Entity Name
                  </Label>
                </InputGroup>
              </Col>
              <Col xs="12" sm="6" className="">
                <Input
                readOnly={this.state.isReadOnly}
                  type="text"
                  name="s_ManagingEntityName"
                  id="ManagingEntityName"
                  placeholder="Managing Entity Name"
                  onChange={this.handleChange}
                  value={this.state.s_ManagingEntityName}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs="12" sm="6" className="">
                <InputGroup className="input-prepend">
                  <Label id="ManagingEntityStreet" className="">
                    Managing Entity Street
                  </Label>
                </InputGroup>
              </Col>
              <Col xs="12" sm="6" className="">
                <Input
                readOnly={this.state.isReadOnly}
                  type="text"
                  name="s_ManagingEntityStreet"
                  id="ManagingEntityStreet"
                  placeholder="Managing Entity Street"
                  onChange={this.handleChange}
                  value={this.state.s_ManagingEntityStreet}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs="12" sm="6" className="">
                <InputGroup className="input-prepend">
                  <Label id="ManagingEntityRoute" className="">
                    Managing Entity Route
                  </Label>
                </InputGroup>
              </Col>
              <Col xs="12" sm="6" className="">
                <Input
                readOnly={this.state.isReadOnly}
                  type="text"
                  name="s_ManagingEntityRoute"
                  id="ManagingEntityRoute"
                  placeholder="Managing Entity Route"
                  onChange={this.handleChange}
                  value={this.state.s_ManagingEntityRoute}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs="12" sm="6" className="">
                <InputGroup className="input-prepend">
                  <Label id="ManagingEntityZip" className="">
                    Managing Entity Zip
                  </Label>
                </InputGroup>
              </Col>
              <Col xs="12" sm="6" className="">
                <Input
                readOnly={this.state.isReadOnly}
                  type="text"
                  name="s_ManagingEntityZip"
                  id="ManagingEntityZip"
                  placeholder="Managing Entity Zip"
                  onChange={this.handleChange}
                  value={this.state.s_ManagingEntityZip}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs="12" sm="6" className="">
                <InputGroup className="input-prepend">
                  <Label id="ManagingEntityCity" className="">
                    Managing Entity City
                  </Label>
                </InputGroup>
              </Col>
              <Col xs="12" sm="6" className="">
                <Input
                readOnly={this.state.isReadOnly}
                  type="text"
                  name="s_ManagingEntityCity"
                  id="ManagingEntityCity"
                  placeholder="Managing Entity City"
                  onChange={this.handleChange}
                  value={this.state.s_ManagingEntityCity}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs="12" sm="6" className="">
                <InputGroup className="input-prepend">
                  <Label id="ManagingEntityState" className="">
                    Managing Entity State
                  </Label>
                </InputGroup>
              </Col>
              <Col xs="12" sm="6" className="">
                <Input
                readOnly={this.state.isReadOnly}
                  type="text"
                  name="s_ManagingEntityState"
                  id="ManagingEntityState"
                  placeholder="Managing Entity State"
                  onChange={this.handleChange}
                  value={this.state.s_ManagingEntityState}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs="12" sm="6" className="">
                <InputGroup className="input-prepend">
                  <Label id="SecondaryStatus" className="">
                    Secondary Status
                  </Label>
                </InputGroup>
              </Col>
              <Col xs="12" sm="6" className="">
                <Input
                readOnly={this.state.isReadOnly}
                  type="text"
                  name="s_SecondaryStatus"
                  id="SecondaryStatus"
                  placeholder="Enter Secondary Status"
                  onChange={this.handleChange}
                  value={this.state.s_SecondaryStatus}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs="12" sm="6" className="">
                <InputGroup className="input-prepend">
                  <Label id="RowIdentifier" className="">
                    Row Identifier
                  </Label>
                </InputGroup>
              </Col>
              <Col xs="12" sm="6" className="">
                <Input
                readOnly={this.state.isReadOnly}
                  type="text"
                  name="s_RowIdentifier"
                  id="RowIdentifier"
                  placeholder="Enter Row Identifier"
                  onChange={this.handleChange}
                  value={this.state.s_RowIdentifier}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col xs="12" sm="5" className=""></Col>
          <Col xs="12" sm="4" className="">
            <Button
              type="button"
              size=""
              color="success"
              className="pull-left btn-md"
              onClick={this.saveComplexInfo}
            >
              <i className="fa fa-check"></i>&nbsp;Save
            </Button>
          </Col>
        </Row>
        <Modal isOpen={this.state.isModalOpen} className={"modal-sm"}>
          <ModalHeader className="p-2 mt-3">Select City</ModalHeader>
          <ModalBody>{this.state.multipleCity}</ModalBody>
        </Modal>
      </div>
    );
  }
}

AddComplex.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(AddComplex);
