import React, { Component } from 'react';
import { policyService } from "../../../services/policyService";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup, Input, Label,
  Row,
  Table
} from 'reactstrap';
import { connect } from "react-redux";
import { setPolicyFilteredData, setParamForIssuedScr } from "../../../store/actions/policy";
import CardFooter from "reactstrap/es/CardFooter";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { convertDateMMDDYYYY, makeDataTableActionLink, showDataTableTotalText } from "../../../services/commanServices";
import PropTypes from "prop-types";

class Index extends Component {
  constructor(props) {
    super(props);
    this.apiService = new policyService();
    this.inputChangedHandler = this.inputChangedHandler.bind(this);
    this.getSearchParams = this.getSearchParams.bind(this);
    this.cellClicked = this.cellClicked.bind(this);
    this.state = {
      sessionData: {},
      productsData: [],
      searchParams: {
        AppStatus: ''
      },
      pageTemp: 1,
      sizePerPageTemp: 10,
      isDataFetched: true
    };
    this.tableData = [];
  }

  async componentDidMount() {
    let productsData = await this.apiService.getProductDropDown();

    this.setState({
      productsData: productsData.data
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const params = this.getSearchParams();
    this.filterTable(params);
  };

  _setTableOption() {
    if (this.state.isDataFetched) {
      return "No policies found";
    } else {
      return (
        <div className="animated fadeIn pt-1 text-center">Loading...</div>
      );
    }
  }

  filterTable(params) {
    this.setState({ isDataFetched: false }, async () => {
      let response = await this.apiService.searchPolicy(params);
      response = response.data;
      this.props.setPolicyFilteredData(response);
      this.setState({ isDataFetched: true })
    });
  }

  dateFormatter(cell, row) {
    return convertDateMMDDYYYY(cell, 'YYYY-MM-DD') // Converting Date into MM/DD/YYYY
  }

  actionsButtons(cell, row) {
    return makeDataTableActionLink(row);
  }

  renderShowsTotal(start, to, total) {
    return showDataTableTotalText(start, to, total);
  }

  sizePerPageListChange(sizePerPage) {
    this.setState({ sizePerPageTemp: sizePerPage }, () => {
      const params = this.getSearchParams();
      this.filterTable(params);
    });
  }


  onPageChange(page, sizePerPage) {

    this.setState({ pageTemp: page, sizePerPage }, () => {
      const params = this.getSearchParams();
      this.filterTable(params);
    });
  }

  getSearchParams() {
    const {
      AppStatus, Last_Name, First_Name, Policy_No_Ss, Policy_No, Agency_Name, Agency_Code,
      SubmitedBy, Address_Search, GetProductDD, taxid, loan_no
    } = this.state.searchParams;
    const { pageTemp } = this.state;
    const sizePerPageTemp = this.state.sizePerPageTemp;
    return {
      AppStatus,
      Last_Name,
      First_Name,
      Policy_No_Ss,
      Policy_No,
      Agency_Name,
      Agency_Code,
      SubmitedBy,
      Address_Search,
      GetProductDD,
      taxid,
      loan_no, pageTemp,
      sizePerPageTemp
    };
  }

  inputChangedHandler(e, key) {
    const value = e.target.value;
    const { searchParams } = this.state;
    searchParams[key] = value;
    this.setState({ searchParams });
  }

  cellButton(cell, row, enumObject, rowIndex) {
    return (
      <a href="#"
        onClick={() =>
          this.cellClicked(cell, row, rowIndex)}
      >
        {cell}
      </a>
    )
  }

  cellClicked = (cell, row, rowIndex) => {
    const accessRights = JSON.parse(sessionStorage.getItem('user'))['AccessRights'];
    const n_POPolicyMasterFK = row.n_POPolicyMasterFK;
    const policy_No = row.s_POAppNo;
    const TermMasterPK = '';
    const n_potransaction_PK = '';
    const params = {
      n_POPolicyMasterFK,
      policy_No,
      TermMasterPK,
      n_potransaction_PK
    };
    var path = '';
    if (row.s_AppStatus == 'CLOSED' && row.s_AppCodeNameForDisplay == 'Issued Policy') {
      this.props.setParamForIssuedScr(params);
      path = "/policy/applicant/" + row.s_POAppNo;
    } else if (accessRights.LevelName != 'EMPLOYEE' && row.s_AppStatus == 'PENDING') {
      path = this.getRedirectPath(row.n_PrProduct_Fk, row.n_POTransactionFK);
    } else if (accessRights.LevelName == 'EMPLOYEE' && row.s_AppStatus == 'PENDING') {
      this.props.setParamForIssuedScr(params);
      path = "/policy/applicant/" + row.s_POAppNo;
    } else {
      path = this.getRedirectPath(row.n_PrProduct_Fk, row.n_POTransactionFK);
    }
    this.props.history.push(path);
  };

  getRedirectPath(product, poTransPK) {
    switch (product) {
      case 13:
        return '/quoteEntry/ho3Daimond/' + poTransPK;
      case 15:
        return '/quoteEntry/epicH03Sel/' + poTransPK;
      case 16:
        return '/quoteEntry/epicH06Sel/' + poTransPK;
      case 5:
        return '/quoteEntry/mhoDirect/' + poTransPK;
      case 6:
        return '/quoteEntry/mdpDirect/' + poTransPK;
      case 1:
        return '/quoteEntry/ho3Homeowners/' + poTransPK;
      case 2:
        return '/quoteEntry/ho6Homeowners/' + poTransPK;
      default:
        return '/quoteEntry/ho3Daimond/' + poTransPK;
    }
  }

  render() {
    this.tableData = this.props.filteredPolicyData;
    this.totalSize = this.props.totalCount;

    const options = {
      page: this.state.pageTemp,  // which page you want to show as default
      sizePerPageList: [
        { text: '10', value: 10 },
        { text: '20', value: 20 },
        { text: '25', value: 25 },
        { text: '30', value: 30 },
        { text: '50', value: 50 }
      ], // you can change the dropdown list for size per page
      sizePerPage: this.state.sizePerPageTemp,  // which size per page you want to locate as default
      pageStartIndex: 1,
      paginationShowsTotal: this.renderShowsTotal,
      onPageChange: this.onPageChange.bind(this),
      onSizePerPageList: this.sizePerPageListChange.bind(this),
      noDataText: this._setTableOption(),
    };
    return (
      <React.Fragment>
        <div className="animated fadeIn">
          <Row>
            <Col lg="12">
              <Form method="POST" onSubmit={this.handleSubmit}>
                <Card>
                  <CardHeader>
                    <h5>Search Policy</h5>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col md="3">
                        <FormGroup>
                          <Label htmlFor="First_Name" className="mb-0">First Name</Label>
                          <Input type="text" id="First_Name" name="First_Name" onChange={(event) => this.inputChangedHandler(event, 'First_Name')} />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label htmlFor="Last_Name" className="mb-0">Last Name</Label>
                          <Input type="text" id="Last_Name" name="Last_Name" onChange={(event) => this.inputChangedHandler(event, 'Last_Name')} />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label htmlFor="AppStatus" className="mb-0">App. Status</Label>
                          <Input type="select" id="AppStatus" name="AppStatus"
                            onChange={(event) => this.inputChangedHandler(event, 'AppStatus')}
                            value={this.state.searchParams.AppStatus}>
                            <option value={''}>Select</option>
                            <option value={'OPEN'}>OPEN</option>
                            <option value={'PENDING'}>PENDING</option>
                            <option value={'CLOSED'}>CLOSED</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label htmlFor="Policy_No_Ss" className="mb-0">SS Policy No</Label>
                          <Input type="text" id="Policy_No_Ss" name="Policy_No_Ss" onChange={(event) => this.inputChangedHandler(event, 'Policy_No_Ss')} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="3">
                        <FormGroup>
                          <Label htmlFor="Policy_No" className="mb-0">Policy No</Label>
                          <Input type="text" id="Policy_No" name="Policy_No" onChange={(event) => this.inputChangedHandler(event, 'Policy_No')} autoFocus/>
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label htmlFor="Agency_Name" className="mb-0">Agency Name</Label>
                          <Input type="text" id="Agency_Name" name="Agency_Name" onChange={(event) => this.inputChangedHandler(event, 'Agency_Name')} />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label htmlFor="Agency_Code" className="mb-0">Agency Code</Label>
                          <Input type="text" id="Agency_Code" name="Agency_Code" onChange={(event) => this.inputChangedHandler(event, 'Agency_Code')} />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label htmlFor="SubmitedBy" className="mb-0">Submitted By</Label>
                          <Input type="text" id="SubmitedBy" name="SubmitedBy" onChange={(event) => this.inputChangedHandler(event, 'SubmitedBy')} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="3">
                        <FormGroup>
                          <Label htmlFor="Address_Search" className="mb-0">Propty Addr.</Label>
                          <Input type="text" id="Address_Search" name="Address_Search" onChange={(event) => this.inputChangedHandler(event, 'Address_Search')} />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label htmlFor="GetProductDD" className="mb-0">Product</Label>
                          <Input type="select" id="GetProductDD" name="GetProductDD"
                            onChange={(event) => this.inputChangedHandler(event, 'GetProductDD')}>
                            <option key='' value=''>Select Product</option>
                            {this.state.productsData.map((product) => {
                              return (
                                <option key={product.n_ProductId_PK} value={product.n_ProductId_PK}>{product.s_ProductName}</option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label htmlFor="taxid" className="mb-0">Tax ID</Label>
                          <Input type="text" id="taxid" name="taxid" onChange={(event) => this.inputChangedHandler(event, 'taxid')} />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label htmlFor="loan_no" className="mb-0">Loan No</Label>
                          <Input type="loan_no" id="loan_no" name="taxid" onChange={(event) => this.inputChangedHandler(event, 'loan_no')} />
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <Row className="align-items-center">
                      <Col col="6" sm="4" md="12" xl className="mb-3 mb-xl-0">
                        <Button color="primary" className="pull-right" id="Search_Policy_PolicyForm"
                          name="Search_Policy_PolicyForm">Search</Button>
                        <Input type="hidden" name="SubModule" value="SEARCH_POLICY" />
                      </Col>
                    </Row>
                  </CardFooter>
                </Card>
              </Form>
              <Card style={{ marginBottom: '100px' }}>
                <CardHeader>
                  <h5>Search Result</h5>
                </CardHeader>
                <BootstrapTable data={this.tableData} remote={true} striped hover options={options} pagination={true} fetchInfo={{ dataTotalSize: this.totalSize }}>
                  <TableHeaderColumn isKey dataField="d_DateSubmitted" dataSort width="8%" dataFormat={this.dateFormatter} tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Submit Date</TableHeaderColumn>
                  <TableHeaderColumn dataField="s_ProductName" dataSort={true} width="13%">Policy Type</TableHeaderColumn>
                  <TableHeaderColumn dataField="s_POAppNo" dataSort dataFormat={this.cellButton.bind(this)} width="10%">Policy No</TableHeaderColumn>
                  <TableHeaderColumn dataField="InsuredName" dataSort width="17%">Insured Name</TableHeaderColumn>
                  <TableHeaderColumn dataField="s_AppStatus" dataSort width="8%">Status</TableHeaderColumn>
                  <TableHeaderColumn dataField="s_AppCodeNameForDisplay" dataSort width="8%">Remark</TableHeaderColumn>
                  <TableHeaderColumn dataField="AgentName" dataSor width="8%">Agent</TableHeaderColumn>
                  <TableHeaderColumn dataField="AgencyName" dataSort width="17%">Agency</TableHeaderColumn>
                </BootstrapTable>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

Index.propTypes = {
  totalCount: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  const { sessionData, filteredCount, filteredPolicyData } = state.Policy;
  let totalCount = filteredCount;
  return { sessionData, totalCount, filteredPolicyData }
};
export default connect(mapStateToProps, { setPolicyFilteredData, setParamForIssuedScr })(Index);
