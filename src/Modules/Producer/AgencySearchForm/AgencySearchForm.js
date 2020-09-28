import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Http from '../../../Http';
import ProducerService from '../../../services/Producer';
import * as action from '../../../store/actions/producer';

import {
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ModalFooter,
  Col,
  Collapse,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  CustomInput,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
  Dropdown,
  Nav, NavItem,
  NavLink,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';


class AgencySearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isSaving: false,
      agencyId: this.props.agencyId,
      //
      clientId: "",
      zip: "",
      principalName: "",
      lastOrg: "",
      county: "",
      managerName: "",
      feinNumber: "",
      state: "",
      dbaName: "",
      city: "",
      license: "",

    };
    this.options = {
      sortIndicator: true,
      // hideSizePerPage: true,
      sizePerPageTemp: 10,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    }
    //rest api endpoint
    this.api = process.env.REACT_APP_API_URL+'/api/v1/agency';
  }

  componentDidMount() {
    this.setState({isLoading: false});
    const {
      agencyId
    } = this.state;
  }

  modalSwitch = () => {
    var modalFlag = false;
    this.props.switchSearchAgencyModal(modalFlag);
  }

  searchAgency = () => {
    this.setState({ isLoading: true });
    const { agencyId } = this.props;
    const url = `${this.api}/${agencyId}/searchAgency`;
    const filterData = {
      clientId: this.state.clientId,
      zip: this.state.zip,
      principalName: this.state.principalName,
      lastOrg: this.state.lastOrg,
      county: this.state.county,
      managerName: this.state.managerName,
      feinNumber: this.state.feinNumber,
      state: this.state.state,
      dbaName: this.state.dbaName,
      city: this.state.city,
      license: this.state.license,
    }

    this.props.searchAgencyRequest(url, filterData)
    .then(() => {
      this.setState({ isLoading: false});
    })
    .catch((err) => {
      this.setState({ isLoading: false });
    });
  }

  getAgencyDetail = (n_PersonInfoId_PK) => {

    this.props.loadAgency(n_PersonInfoId_PK);
    // .then(() => {
    //   this.setState({ isLoading: false});
    // })
    // .catch((err) => {
    //   this.setState({ isLoading: false });
    // });
    this.modalSwitch();
  }

  handleChange =(e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleClear =(e) => {
    const {name, value} = e.target;
    this.setState({
      clientId: "",
      zip: "",
      principalName: "",
      lastOrg: "",
      county: "",
      managerName: "",
      feinNumber: "",
      state: "",
      dbaName: "",
      city: "",
      license: ""
    });
  }

  agencyLink = (cell, row, enumObject, rowIndex) => {
    return (
      <NavLink href="#" style={{ padding: "0px" }} onClick={() => this.getAgencyDetail(row.n_PersonInfoId_PK)}>
          {row.s_PersonUniqueId}
      </NavLink>
    );
  }


  render() {
    const {
      isLoading,
      isSaving,
      clientId,
      zip,
      principalName,
      lastOrg,
      county,
      managerName,
      feinNumber,
      state,
      dbaName,
      city,
      license,
    } = this.state;
    const {
      agencyData_arr,
      agencySearchModalState
    } = this.props;
    return (
      <div className="animated fadeIn">

        <Modal size='xl' isOpen={agencySearchModalState} toggle={this.modalSwitch} backdrop="static">
          <ModalHeader toggle={this.modalSwitch}>
            Agency Visit Reviews
          </ModalHeader>
            <ModalBody>
              <div>
                <Row>
                  <Col md="3">
                    <Label className="mb-0" size="sm" htmlFor="clientId">Agency Code</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      id="clientId"
                      name="clientId"
                      value={clientId}
                      className="input-sm"
                      placeholder=""
                      onChange={this.handleChange}
                    />
                  </Col>
                  <Col md="3">
                    <Label className="mb-0" size="sm" htmlFor="lastOrg">Agency Name</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      id="lastOrg"
                      name="lastOrg"
                      value={lastOrg}
                      className="input-sm"
                      placeholder=""
                      onChange={this.handleChange}
                    />
                  </Col>
                  <Col md="3">
                    <Label className="mb-0" size="sm" htmlFor="feinNumber">FEIN Number</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      id="feinNumber"
                      name="feinNumber"
                      value={feinNumber}
                      className="input-sm"
                      placeholder=""
                      onChange={this.handleChange}
                    />
                  </Col>
                  <Col md="3">
                    <Label className="mb-0" size="sm" htmlFor="dbaName" >DBA Name</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      id="dbaName"
                      name="dbaName"
                      value={dbaName}
                      className="input-sm"
                      placeholder=""
                      onChange={this.handleChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <Label className="mb-0" size="sm" htmlFor="zip" >Zip</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      id="zip"
                      name="zip"
                      value={zip}
                      className="input-sm"
                      placeholder=""
                      onChange={this.handleChange}
                    />
                  </Col>
                  <Col md="3">
                    <Label className="mb-0" size="sm" htmlFor="county">County</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      id="county"
                      name="county"
                      value={county}
                      className="input-sm"
                      placeholder=""
                      onChange={this.handleChange}
                    />
                  </Col>
                  <Col md="3">
                    <Label className="mb-0" size="sm" htmlFor="state">State</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      id="state"
                      name="state"
                      value={state}
                      className="input-sm"
                      placeholder=""
                      onChange={this.handleChange}
                    />
                  </Col>
                  <Col md="3">
                    <Label className="mb-0" size="sm" htmlFor="city">City</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      id="city"
                      name="city"
                      value={city}
                      className="input-sm"
                      placeholder=""
                      onChange={this.handleChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <Label className="mb-0" size="sm" htmlFor="principalName">Principal Name</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      id="principalName"
                      name="principalName"
                      value={principalName}
                      className="input-sm"
                      placeholder=""
                      onChange={this.handleChange}
                    />
                  </Col>
                  <Col md="3">
                    <Label className="mb-0" size="sm" htmlFor="managerName">Manager Name</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      id="managerName"
                      name="managerName"
                      value={managerName}
                      className="input-sm"
                      placeholder=""
                      onChange={this.handleChange}
                    />
                  </Col>
                  <Col md="3">
                    <Label className="mb-0" size="sm" htmlFor="license">License #</Label>
                    <Input
                      bsSize="sm"
                      type="text"
                      id="license"
                      name="license"
                      value={license}
                      className="input-sm"
                      placeholder=""
                      onChange={this.handleChange}
                    />
                  </Col>
                </Row>
                <Row >
                  <Col className="offset-xl-10 offset-md-7 py-1 pull-right">
                    <Button
                      // type="submit"
                      size="sm"
                      color="primary"
                      disabled={isSaving}
                      onClick={this.searchAgency}
                    >
                      <i className="fa fa-dot-circle-o"></i> Search
                    </Button>
                    <Button
                      type="reset"
                      size="sm"
                      color="danger"
                      disabled={isSaving}
                      className="ml-3"
                      onClick={this.handleClear}
                    >
                      <i className="fa fa-ban"></i> Clear
                    </Button>
                  </Col>
                </Row>
              </div>
              <div>
                {isLoading?
                  <div className="sk-double-bounce">
                    <div className="sk-child sk-double-bounce1"></div>
                    <div className="sk-child sk-double-bounce2"></div>
                  </div>
                :

                  <BootstrapTable data={agencyData_arr} version="4" striped hover pagination tabIndexCell >
                    <TableHeaderColumn isKey dataField="s_PersonUniqueId" dataSort  dataFormat={this.agencyLink}>AGENCY CODE</TableHeaderColumn>
                    <TableHeaderColumn dataField="s_FullLegalName" dataSort>NAME</TableHeaderColumn>
                    <TableHeaderColumn dataField="s_CityCode" dataFormat={this.accViewLink} dataSort >CITY</TableHeaderColumn>
                    <TableHeaderColumn dataField="s_StateCode" dataSort >STATE</TableHeaderColumn>
                    <TableHeaderColumn dataField="s_PostalCode" dataSort>ZIP</TableHeaderColumn>
                    <TableHeaderColumn dataField="s_CountyCode" dataSort>COUNTY</TableHeaderColumn>
                    <TableHeaderColumn dataField="s_ContactName" dataSort>PRINCIPAL</TableHeaderColumn>
                  </BootstrapTable>
                }
              </div>
            </ModalBody>
            <ModalFooter>

            </ModalFooter>
        </Modal>

      </div>
    );
  }
}

AgencySearchForm.defaultProps = {
  agencyData_arr:[],
};

AgencySearchForm.propTypes = {

};

const mapStateToProps = state => ({
  agencyData_arr: state.Producer.agencyData_arr,
  agencySearchModalState: state.Producer.agencySearchModalState
})

const mapDispatchToProps = dispatch => ({
    searchAgencyRequest: (url, filterData) => dispatch(ProducerService.searchAgencyRequest(url, filterData)),//Origin
    loadAgency: (n_PersonInfoId_PK) => dispatch(action.loadAgency(n_PersonInfoId_PK)),//Origin
    switchSearchAgencyModal: (modalFlag) => dispatch(action.switchSearchAgencyModal(modalFlag))

});

export default connect(mapStateToProps, mapDispatchToProps)(AgencySearchForm)
