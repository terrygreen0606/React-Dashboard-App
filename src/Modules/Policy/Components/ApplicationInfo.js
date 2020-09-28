import React, { Component } from "react";
import { Row, Col, Container, Collapse, Card, CardHeader, CardBody, Button, Input, Label, FormGroup } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

import { basic_coverage, opitional_coverage, discount_coverage, basic_property } from './data/info';

import NewTransaction from '../Applicant/Component/NewTransaction';

class ApplicationInfo extends Component {

  constructor(props) {
    super(props);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleNewTransaction = this.toggleNewTransaction.bind(this);
    this.state = {
      accordion: [false, false, false, false],
      isOpen: false,
      isNewTransOpen: false,
    }
  }
  toggleAccordion(tab) {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);
    this.setState({
      accordion: state,
    });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleNewTransaction () {
    this.setState({
      isNewTransOpen: !this.state.isNewTransOpen
    });
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

  _setTableOption() {
    if (this.state.isDataFetched) {
      return "No policies found";
    } else {
      return (
        <div className="animated fadeIn pt-1 text-center">Loading...</div>
      );
    }
  }

  render() {
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
      pageStartIndex: 1, // where to start counting the pages
      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      onPageChange: this.onPageChange.bind(this),
      onSizePerPageList: this.sizePerPageListChange.bind(this),
      noDataText: this._setTableOption(),
    };

    

    return (
      <Container fluid>
        <Row>
          <Col md="9" sm="12">
            <div className="title">
              <h4 className="font-italic font-weight-bold">VH30020414/3/ANALIA CABRAL & RICHARD M PULIDO QUINTAS</h4>
              <h4 className="font-italic font-weight-bold">915 BASILICA LN KISSIMMEE, POLK, FL, 34759</h4>
            </div>
            <div className="applicant">
              <div className="header bb-1-green">
                <h4 className="font-weight-bold">Applicant</h4>
                <h6 className="pl-5">Renew Indicator: <a href="#">BATCH RENEWAL</a></h6>
              </div>
              <Container fluid>
                <Row className="striped py-1">
                  <Col md="4">
                    <Row>
                      <Col>Term Start Date</Col>
                      <Col>05-31-2019</Col>
                    </Row>
                    <Row>
                      <Col>Term End Date</Col>
                      <Col>05-31-2019</Col>
                    </Row>
                  </Col>
                  <Col md="4">
                    <Row>
                      <Col>Transaction Eff. Dt.</Col>
                      <Col>05-31-2019</Col>
                    </Row>
                    <Row>
                      <Col>Transaction Exp. Dt.</Col>
                      <Col>05-31-2019</Col>
                    </Row>
                  </Col>
                  <Col md="4">
                    <Row>
                      <Col>Transaction Type</Col>
                      <Col>Renewal - Ann. Ren</Col>
                    </Row>
                    <Row>
                      <Col>last Updated By</Col>
                      <Col>Jair Robles</Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="striped">
                  <Col>
                    <h5 className="my-2">Total Claim</h5>
                  </Col>
                  <Col>
                    <h5 className="text-danger my-2">2</h5>
                  </Col>
                  <Col>
                    <a href="#"><h5 className="my-2">PolicyHolder Copy</h5></a>
                  </Col>
                  <Col>
                    <a href="#"><h5 className="my-2">Agent Copy</h5></a>
                  </Col>
                  <Col></Col>
                </Row>
                <Row className="striped">
                  <Col md="4">
                    <Row>
                      <Col>Premium</Col>
                      <Col>$656.00</Col>
                    </Row>
                    <Row>
                      <Col>Premium Change</Col>
                      <Col>$656.00</Col>
                    </Row>
                    <Row>
                      <Col>Total Premium</Col>
                      <Col>$683.00</Col>
                    </Row>
                  </Col>
                  <Col md="4">
                    <Row>
                      <Col>Bill To</Col>
                      <Col>MORTGAGE</Col>
                    </Row>
                    <Row>
                      <Col>Payment Plan</Col>
                      <Col>Full Pay</Col>
                    </Row>
                    <Row>
                      <Col>Equity day</Col>
                      <Col>05-31-2019</Col>
                    </Row>
                  </Col>
                  <Col md="4">
                    <Row>
                      <Col>Serv Rep</Col>
                      <Col>Patricia MCKenzie</Col>
                    </Row>
                    <Row>
                      <Col>U/writer</Col>
                      <Col>Patricia MCKenzie</Col>
                    </Row>
                    <Row>
                      <Col>Product Name</Col>
                      <Col>HO3 Diamond</Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
              <div id="accordion">
                <Card className="mb-0">
                  <CardHeader id="headingOne">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(0)} aria-expanded={this.state.accordion[0]} aria-controls="collapseOne">
                      <h5 className="m-0 p-0 font-weight-bold">Coverage</h5>
                    </Button>
                  </CardHeader>
                  <Collapse isOpen={this.state.accordion[0]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                    <CardBody>
                      <BootstrapTable data={basic_coverage} striped hover options={options}>
                        <TableHeaderColumn isKey dataField="basic_coverage" dataSort>BASIC COVERAGE</TableHeaderColumn>
                        <TableHeaderColumn dataField="limit" dataSort>LIMIT</TableHeaderColumn>
                        <TableHeaderColumn dataField="premium" dataSort>PREMIUM</TableHeaderColumn>
                        <TableHeaderColumn dataField="action" dataSort>ACTION</TableHeaderColumn>
                      </BootstrapTable>
                      <BootstrapTable data={opitional_coverage} striped hover options={options}>
                        <TableHeaderColumn isKey dataField="opitional_coverage" dataSort>OPTIONAL COVERAGE</TableHeaderColumn>
                        <TableHeaderColumn dataField="limit" dataSort>LIMIT</TableHeaderColumn>
                        <TableHeaderColumn dataField="premium" dataSort>PREMIUM</TableHeaderColumn>
                        <TableHeaderColumn dataField="action" dataSort>ACTION</TableHeaderColumn>
                      </BootstrapTable>
                      <BootstrapTable data={discount_coverage} striped hover options={options}>
                        <TableHeaderColumn isKey dataField="discount_coverage" dataSort>DISCOUNT/SURCHANGE NAME</TableHeaderColumn>
                        <TableHeaderColumn dataField="effect_from" dataSort>EFFECTIVE FROM</TableHeaderColumn>
                        <TableHeaderColumn dataField="effect_to" dataSort>EFFECTIVE TO</TableHeaderColumn>
                        <TableHeaderColumn dataField="action" dataSort>ACTION</TableHeaderColumn>
                      </BootstrapTable>
                    </CardBody>
                  </Collapse>
                </Card>
                <Card className="mb-0">
                  <CardHeader id="headingTwo">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(1)} aria-expanded={this.state.accordion[1]} aria-controls="collapseTwo">
                      <h5 className="m-0 p-0 font-weight-bold">Property Info</h5>
                    </Button>
                  </CardHeader>
                  <Collapse isOpen={this.state.accordion[1]} data-parent="#accordion" id="collapseTwo">
                    <CardBody>
                    <Container fluid>
                      <Row className="striped py-1">
                        <Col md="4">
                          <Row>
                            <Col>Year Built:</Col>
                            <Col>{basic_property.year_built}</Col>
                          </Row>
                          <Row>
                            <Col>No. of Stories</Col>
                            <Col>{basic_property.no_of_stories}</Col>
                          </Row>
                        </Col>
                        <Col md="4">
                          <Row>
                            <Col>No. of Familes</Col>
                            <Col>{basic_property.no_of_families}</Col>
                          </Row>
                          <Row>
                            <Col>No. of Residents</Col>
                            <Col>{basic_property.no_of_residents}</Col>
                          </Row>
                        </Col>
                        <Col md="4">
                          <Row>
                            <Col>Construction Type</Col>
                            <Col>{basic_property.construction_type}</Col>
                          </Row>
                          <Row>
                            <Col>Replacement Value</Col>
                            <Col>{basic_property.replacement_value}</Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="striped">
                        <Col md="4">
                          <Row>
                            <Col>structure_type:</Col>
                            <Col>{basic_property.structure_type}</Col>
                          </Row>
                        </Col>
                        <Col md="4">
                          <Row>
                            <Col>terrain</Col>
                            <Col>{basic_property.terrain}</Col>
                          </Row>
                        </Col>
                        <Col md="4">
                          <Row>
                            <Col>ppc</Col>
                            <Col>{basic_property.ppc}</Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="striped">
                        <Col md="4">
                          <Row>
                            <Col>valuation_id</Col>
                            <Col>{basic_property.valuation_id}</Col>
                          </Row>
                        </Col>
                        <Col md="4">
                          <Row>
                            <Col>bceg</Col>
                            <Col>{basic_property.bceg}</Col>
                          </Row>
                        </Col>
                        <Col md="4">
                          <Row>
                            <Col>police_code</Col>
                            <Col>{basic_property.replacement_value}</Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="striped">
                        <Col md="4">
                          <Row>
                            <Col>roof_type</Col>
                            <Col>{basic_property.roof_type}</Col>
                          </Row>
                        </Col>
                        <Col md="4">
                          <Row>
                            <Col>fire_code</Col>
                            <Col>{basic_property.fire_code}</Col>
                          </Row>
                        </Col>
                        <Col md="4">
                          <Row>
                            <Col>roof_sub_type</Col>
                            <Col>{basic_property.roof_sub_type}</Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="striped">
                        <Col md="4">
                          <Row>
                            <Col>roof_type</Col>
                            <Col>{basic_property.roof_type}</Col>
                          </Row>
                        </Col>
                        <Col md="4">
                          <Row>
                            <Col>fire_code</Col>
                            <Col>{basic_property.fire_code}</Col>
                          </Row>
                        </Col>
                        <Col md="4">
                          <Row>
                            <Col>roof_sub_type</Col>
                            <Col>{basic_property.roof_sub_type}</Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="striped">
                        <Col md="4">
                          <Row>
                            <Col>distance_from_fire_station</Col>
                            <Col>{basic_property.distance_from_fire_station}</Col>
                          </Row>
                        </Col>
                        <Col md="4">
                          <Row>
                            <Col>distance_from_fire_hydrant</Col>
                            <Col>{basic_property.distance_from_fire_hydrant}</Col>
                          </Row>
                        </Col>
                        <Col md="4">
                          <Row>
                            <Col>occupancy_type</Col>
                            <Col>{basic_property.occupancy_type}</Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="striped">
                        <Col md="4">
                          <Row>
                            <Col>area_sft</Col>
                            <Col>{basic_property.area_sft}</Col>
                          </Row>
                        </Col>
                        <Col md="4">
                          <Row>
                            <Col>wind_pool_eligibiliy</Col>
                            <Col>{basic_property.wind_pool_eligibiliy}</Col>
                          </Row>
                        </Col>
                        <Col md="4">
                          <Row>
                            <Col>swimming_pool</Col>
                            <Col>{basic_property.swimming_pool}</Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="striped">
                        <Col md="4">
                          <Row>
                            <Col>usage</Col>
                            <Col>{basic_property.usage}</Col>
                          </Row>
                        </Col>
                        <Col md="4">
                          <Row>
                            <Col>prior_insureance</Col>
                            <Col>{basic_property.prior_insureance}</Col>
                          </Row>
                        </Col>
                        <Col md="4">
                          <Row>
                            <Col>purchase_date</Col>
                            <Col>{basic_property.purchase_date}</Col>
                          </Row>
                        </Col>
                      </Row>
                    </Container>
                    </CardBody>
                  </Collapse>
                </Card>
                <Card className="mb-0">
                  <CardHeader id="headingThree">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(2)} aria-expanded={this.state.accordion[2]} aria-controls="collapseThree">
                      <h5 className="m-0 p-0 font-weight-bold">Addiontal info</h5>
                    </Button>
                  </CardHeader>
                  <Collapse isOpen={this.state.accordion[2]} data-parent="#accordion" id="collapseThree">
                    <CardBody>
                      3. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non
                      cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                      on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
                      nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                      beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                    </CardBody>
                  </Collapse>
                </Card>
                <Card className="mb-0">
                  <CardHeader id="headingThree">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(3)} aria-expanded={this.state.accordion[2]} aria-controls="collapseThree">
                      <h5 className="m-0 p-0 font-weight-bold">Billing</h5>
                    </Button>
                  </CardHeader>
                  <Collapse isOpen={this.state.accordion[3]} data-parent="#accordion" id="collapseThree">
                    <CardBody>
                      3. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non
                      cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                      on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
                      nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                      beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                    </CardBody>
                  </Collapse>
                </Card>
              </div>
              <div className="by-1-green py-2">
                <Button color="primary">Transaction History</Button>
                <Button color="secondary" className="ml-4">Invoicing</Button>
                <Button color="primary" className="float-right" onClick={this.toggleNewTransaction}>PAY ONLINE</Button>
                <NewTransaction isOpen={this.state.isNewTransOpen} toggle = {this.toggleNewTransaction} />
                {/* <BootstrapTable data={this.tableData} remote={true} striped hover options={options} pagination={true} fetchInfo={{ dataTotalSize: this.totalSize }}>
                  <TableHeaderColumn isKey dataField="d_DateSubmitted" dataSort width="100" dataFormat={this.dateFormatter}>ACCOUNTING DT.</TableHeaderColumn>
                  <TableHeaderColumn dataField="s_ProductName" dataSort={true}>TRANS TYPE</TableHeaderColumn>
                  <TableHeaderColumn dataField="s_POAppNo" dataSort dateFormat={this.actionsButtons}>USER ID</TableHeaderColumn>
                  <TableHeaderColumn dataField="InsuredName" dataSort>UNALLOCATED</TableHeaderColumn>
                  <TableHeaderColumn dataField="s_AppStatus" dataSort width="90">DEBIT</TableHeaderColumn>
                  <TableHeaderColumn dataField="s_AppCodeNameForDisplay" headerAlign='left' dataAlign='right' dataSort>CREDIT</TableHeaderColumn>
                  <TableHeaderColumn dataField="AgentName" dataSort>BALANCE</TableHeaderColumn>
                  <TableHeaderColumn dataField="AgencyName" dataSort>SYSTEM DT.</TableHeaderColumn>
                </BootstrapTable> */}
              </div>
            </div>
          </Col>
          <Col md="3" sm="12">
            <div className="d-flex justify-content-between">
              <Button outline size="sm" color="primary" className="font-weight-bold">FHCF Rate Sheet</Button>
              <Button outline size="sm" color="primary" className="font-weight-bold">Rt. History</Button>
              <Button outline size="sm" color="primary" className="font-weight-bold">Rate Sheet</Button>
              <Button outline size="sm" color="primary" className="font-weight-bold">New transaction +</Button>
            </div>
            <Row>
              <Col md={{ size: 8, offset: 2 }} sm="12" >
                <div>

                </div>
                <div>
                  <FormGroup>
                    <Label for="term-select">Term Selection:</Label>
                    <Input type="select" name="termselect" id="term-select">
                      <option>05-31-2019 / 05-31-2020</option>
                      <option>05-31-2019 / 05-31-2021</option>
                      <option>05-31-2019 / 05-31-2022</option>
                      <option>05-31-2019 / 05-31-2023</option>
                      <option>05-31-2019 / 05-31-2024</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="transaction-select">Transaction Selection:</Label>
                    <Input type="select" name="termselect" id="transaction-select">
                      <option>RENEW ISSUED</option>
                      <option>RENEW ISSUED</option>
                      <option>RENEW ISSUED</option>
                      <option>RENEW ISSUED</option>
                    </Input>
                  </FormGroup>
                </div>
              </Col>
            </Row>
            
            <div className="text-box">
                <div className="text-box-header">
                  Last transaction
                </div>
                <div className="text-box-body">
                  <p>Renewal - Ann. Renewal by Jair Robles</p>
                  <p>Trasnaction date: 04-03-2019 at 11:34:24</p>
                  <p>Transaction Eff. Dt. 05-31-2019</p>
                </div>
            </div>
            <div className="text-box">
                <div className="text-box-header">
                  Transaction Note
                </div>
                <div className="text-box-body">
                  
                </div>
            </div>
            <div className="text-box">
                <div className="text-box-header">
                  Agency Info
                </div>
                <div className="text-box-body">
                  <p>COLEMAN INSURANCE AGENCY INC</p>
                  <p>Agency Phone # (727) 441-9911</p>
                  <p>Agency Fax # (727) 441-9911</p>
                  <p>CHRIS@COLEMANAGENCYFL.COM</p>
                </div>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ApplicationInfo;
