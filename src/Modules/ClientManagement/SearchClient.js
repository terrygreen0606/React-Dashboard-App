import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import ReeValidate from "ree-validate";
import getClient from "../../services/clientService";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import LoadingSpinner from "./loading";
import AddClientForm from "./AddClientForm";
import * as actions from "../../store/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Helmet} from 'react-helmet'
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
  NavItem,
  NavLink,
} from "reactstrap";

class SearchClient extends Component {
  constructor(props) {
    super(props);
    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 10,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false,
    };

    this.state = {
      loading: false,
      ClientID: "",
      ClientName: "",
      City: "",
      State: "",
      Role: "",
      errors: {},
      //data:{},
      response: {
        error: false,
        message: "",
      },
    };

    this.cellClicked = this.cellClicked.bind(this);
    this.error = this.error.bind(this);
  }

  error(msg) {
    return toast.error(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { ClientID, ClientName, City, State, Role } = this.state;
    const credentials = {
      ClientID,
      ClientName,
      City,
      State,
      Role,
    };
    this.setState({ response: { error: false, message: "" } });
    this.submit(credentials);
  };

  submit(credentials) {
    let error = "Y";
    if (credentials.ClientID != "") {
      error = "N";
    }
    if (credentials.ClientName != "") {
      error = "N";
    }
    if (credentials.City != "") {
      error = "N";
    }
    if (credentials.Role != "") {
      error = "N";
    }
    if (credentials.State != "") {
      error = "N";
    }
    if (error == "Y") {
      this.error("Please Enter Atleast One Field!.");
    } else {
      this.setState({ loading: true });
      this.props.dispatch(getClient(credentials)).then((res) => {
        this.setState({ loading: false });
      });
    }
  }

  cellButton(cell, row, enumObject, rowIndex) {
    return (
      <a href="#" onClick={() => this.cellClicked(cell, row, rowIndex)}>
        {cell}
      </a>
    );
  }

  cellClicked = (cell, row, rowIndex) => {
    this.props.dispatch(actions.setClientPk(row.n_PersonInfoId_PK));
    this.props.history.push("/addClient");
  };

  clearForm = (e) => {
    this.setState({
      ClientName: "",
      ClientID: "",
      Role: "",
      State: "",
      City: "",
    });
  };

  render() {
    const { clients } = this.props;
    const { loading } = this.state;
    this.table = this.props.clients;
    return (
      <div>
        <Helmet>
          <title>Avatar Insurance - Search Client</title>
        </Helmet>
        <div>
          <Card>
            <CardHeader>
              <strong>Search Client</strong>
            </CardHeader>
            <CardBody>
              <Form
                method="POST"
                onSubmit={this.handleSubmit}
                ref={(el) => {
                  this.loginForm = el;
                }}
                className="form-horizontal"
                id="searchForm"
              >
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>Client Id :</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          id="ClientID"
                          name="ClientID"
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>ClientName :</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          id="ClientName"
                          name="ClientName"
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>City :</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          id="City"
                          name="City"
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>State :</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          id="State"
                          name="State"
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>Role :</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          id="Role"
                          name="Role"
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="text-right">
                    <Button type="submit" size="md" color="primary">
                      <i className="fa fa-search"></i> Search
                    </Button>
                  </Col>
                  <Col md="2" className="text-left">
                    <Button
                      type="reset"
                      size="md"
                      color="primary"
                      onClick={this.clearForm}
                    >
                      Clear
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </div>
        <div className="animated">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <Card>
              <CardHeader>
                <i className="icon-menu"></i>
                <strong>Clients</strong>
              </CardHeader>
              <CardBody>
                <BootstrapTable
                  data={this.table}
                  version="4"
                  striped
                  hover
                  pagination
                  search
                  options={this.options}
                >
                  <TableHeaderColumn
                    isKey
                    dataField="s_PersonUniqueId"
                    dataFormat={this.cellButton.bind(this)}
                    width="15%"
                  >
                    CLIENT ID
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="s_EntityType" width="10%">
                    TYPE
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="s_PersonRoleType" width="13%">
                    ROLE
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="s_FullLegalName"
                    width="17%"
                    tdStyle={{ whiteSpace: "normal", wordWrap: "break-word" }}
                  >
                    FULL LEGAL NAME
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="s_AddressLine1"
                    dataFormat={this.nameFormat}
                    width="20%"
                  >
                    ADDRESS
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="s_CityName" width="10%">
                    CITY
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="s_StateCode" width="6%">
                    STATE
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="s_PostalCode" width="6%">
                    ZIP
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="s_PersonStatusCode"
                    dataFormat={this.nameFormat}
                    width="6%"
                  >
                    STATUS
                  </TableHeaderColumn>
                </BootstrapTable>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    );
  }
}
SearchClient.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  clients: state.Client.clients,
});

export default connect(mapStateToProps)(SearchClient);
