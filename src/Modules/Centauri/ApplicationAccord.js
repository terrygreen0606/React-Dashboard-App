import React, { Component } from 'react';
import { AppSwitch } from '@coreui/react'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  Fade,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText, Form,
  FormGroup, Label,
} from 'reactstrap';

import Greet from './Greet'

class ApplicationAccord extends Component {

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
    this.state = {
      collapse: false,
      accordion: [true, false, false, false, false, false, false, false, false,],
      custom: [true, false],
      status: 'Closed',
      fadeIn: true,
      timeout: 300,
    };

  }

  onEntering() {
    this.setState({ status: 'Opening...' });
  }

  onEntered() {

    this.setState({ status: 'Opened' });

  }

  onExiting() {
    this.setState({ status: 'Closing...' });
  }

  onExited() {
    this.setState({ status: 'Closed' });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleAccordion(tab) {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
  }

  toggleCustom(tab) {

    const prevState = this.state.custom;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      custom: state,
    });
  }

  toggleFade() {
    this.setState({ fadeIn: !this.state.fadeIn });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl="12">
            <Card className="borderNN">
              {/*<Greet />*/}
              <div id="accordion">
                <Card className="mb-0 borderNN">
                <Button color="info" xl className="ratebt btn-brand"><i className="fa fa-check"></i>&nbsp;&nbsp;&nbsp;Rate</Button>
                  <CardHeader id="headingOne">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(0)} aria-expanded={this.state.accordion[0]} aria-controls="collapseOne">
                      <span className="text-value-sm">Applicant Information</span>{<i className={this.state.accordion[0] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
                    </Button>
                  </CardHeader>
                  <Collapse isOpen={this.state.accordion[0]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                    <CardBody>
                      <Row>
                        <Col md="2" className=''>
                          <FormGroup>
                            <Label htmlFor="name">First Name</Label>
                            <Input type="text" name="s_FirstName" id="s_FirstName" placeholder="Enter First Name" required />
                          </FormGroup>
                        </Col>
                        <Col md="2" className=''>
                          <FormGroup>
                            <Label id='s_MiddleName'>Middle Name</Label>
                            <Input type="text" name="s_MiddleName" id="s_MiddleName" placeholder="Enter Middle Name" />
                          </FormGroup>
                        </Col>
                        <Col md="2" className=''>
                          <FormGroup>
                            <Label id='s_LastOrganizationName' className="accordbtnwdth">Last Name</Label>
                            <Input type="text" name="s_LastOrganizationName" id="s_LastOrganizationName" placeholder="Enter Last Name" />
                          </FormGroup>
                        </Col>
                        <Col md="2" className=''>
                          <FormGroup>
                            <Label id='s_FullLegalName' className="accordbtnwdth">Name(s) on Dec</Label>
                            <Input type="text" name="s_FullLegalName" id="s_FullLegalName" placeholder="Enter Name(s) on Dec" />
                          </FormGroup>
                        </Col>
                        <Col md="2" className=''>
                          <FormGroup>
                            <InputGroup className="input-prepend">
                              <Label id='d_BirthDate' className="accordbtnwdth"><i className="cui-calendar"></i>&nbsp;DOB</Label>
                            </InputGroup>
                            <Input type="date" id="d_BirthDate" name="d_BirthDate" placeholder="Date of Birth" />
                          </FormGroup>
                        </Col>
                        <Col md="2" className=''>
                          <FormGroup>
                            <Label className="s_HouseDirection1">Direction</Label>
                            <Input type="select" name="s_HouseDirection1" id="s_HouseDirection1">
                              <option value="" selected="selected">Select</option>
                              <option value="N">N</option>
                              <option value="NE">NE</option>
                              <option value="NW">NW</option>
                              <option value="S">S</option>
                              <option value="SE">SE</option>
                              <option value="SW">SW</option>
                              <option value="E">E</option>
                              <option value="W">W</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md="1" className=''>
                          <FormGroup>
                            <InputGroup className="input-prepend">
                              <Label id='s_HouseNo' className="accordbtnwdth"><i className="cui-home icons"></i>&nbsp;House No.</Label>
                            </InputGroup>
                            <Input type="text" name="s_HouseNo" id="s_HouseNo" placeholder="Enter House No" />
                          </FormGroup>
                        </Col>
                        <Col md="2" className=''>
                          <FormGroup>
                            <Label id='s_StreetName' className="accordbtnwdth">Street Name</Label>
                            <Input type="text" name="s_StreetName" id="s_StreetName" placeholder="Enter Street Name" />
                          </FormGroup>
                        </Col>
                        <Col md="1" className=''>
                          <FormGroup>
                            <Label className="accordbtnwdth">Type</Label>
                            <Input type="select" name="s_HouseType" id="s_HouseType">
                              <option value="" selected="selected">Select</option>
                              <option value="AVE">Ave</option>
                              <option value="BLVD">Blvd</option>
                              <option value="BND ">Bnd </option>
                              <option value="CIR ">Cir </option>
                              <option value="CRES">Cres</option>
                              <option value="CT  ">Ct  </option>
                              <option value="CV  ">Cv  </option>
                              <option value="DR  ">Dr  </option>
                              <option value="GLN ">Gln </option>
                              <option value="HWY ">Hwy </option>
                              <option value="ISLE">Isle</option>
                              <option value="LN  ">Ln  </option>
                              <option value="LNDG">Lndg</option>
                              <option value="LOOP">Loop</option>
                              <option value="MNR ">Mnr </option>
                              <option value="PASS">Pass</option>
                              <option value="PATH">Path</option>
                              <option value="PKWY">Pkwy</option>
                              <option value="PL  ">Pl  </option>
                              <option value="PT  ">Pt  </option>
                              <option value="RD  ">Rd  </option>
                              <option value="ROW ">Row </option>
                              <option value="RUN ">Run </option>
                              <option value="SQ  ">Sq  </option>
                              <option value="ST  ">St  </option>
                              <option value="TER ">Ter </option>
                              <option value="TERR">Terr</option>
                              <option value="TRCE">Trce</option>
                              <option value="TRL ">Trl </option>
                              <option value="WALK">Walk</option>
                              <option value="WAY ">Way </option>
                              <option value="XING">Xing</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md="1" className=''>
                          <FormGroup>
                            <Label className="accordbtnwdth">Direction</Label>
                            <Input type="select" name="s_HouseDirection2" id="s_HouseDirection2">
                              <option value="" selected="selected">Select</option>
                              <option value="N">N</option>
                              <option value="NE">NE</option>
                              <option value="NW">NW</option>
                              <option value="S">S</option>
                              <option value="SE">SE</option>
                              <option value="SW">SW</option>
                              <option value="E">E</option>
                              <option value="W">W</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md="1" className=''>
                          <FormGroup>
                            <Label id='EffectiveTo' className="accordbtnwdth">Zip</Label>
                            <Input type="text" name="s_PostalCode" id="s_PostalCode" placeholder="Enter Zip Code" />
                          </FormGroup>
                        </Col>
                        <Col md="2" className=''>
                          <FormGroup>
                            <Label id='EffectiveTo' className="accordbtnwdth">City</Label>
                            <Input type="text" name="n_CityId_FKName" id="n_CityId_FKName" placeholder="Enter City" />
                          </FormGroup>
                        </Col>
                        <Col md="2" className=''>
                          <FormGroup>
                            <Label id='EffectiveTo' className="accordbtnwdth">State</Label>
                            <Input type="text" name="n_StateId_FKName" id="n_StateId_FKName" placeholder="Enter State" />
                          </FormGroup>
                        </Col>
                        <Col md="2" className=''>
                          <FormGroup>
                            <Label id='EffectiveTo' className="accordbtnwdth">County</Label>
                            <Input type="text" name="n_CountyId_FKName" id="n_CountyId_FKName" placeholder="County" />
                          </FormGroup>
                        </Col>
                        <Col md="2" className=''>
                          <FormGroup>
                            <InputGroup className="input-prepend">
                              <Label id='BinderDate' className="accordbtnwdth"><i class="fa fa-phone"></i>&nbsp;Phone No.</Label>
                            </InputGroup>
                            <Input type="text" id="s_PhoneNumber" name="s_PhoneNumber" placeholder="Phone Number" />
                          </FormGroup>
                        </Col>
                        <Col md="2" className=''>
                          <FormGroup>
                            <InputGroup className="input-prepend">
                              <Label id='BinderDate' className="accordbtnwdth"><i className="cui-envelope-closed"></i>&nbsp;Email Address</Label>
                            </InputGroup>
                            <Input type="text" id="s_EmailAddress" name="s_EmailAddress" placeholder="Email Address" />
                          </FormGroup>
                        </Col>
                        <Col md="4" className='mt-2'>
                          <FormGroup row>
                            <Col md="8">
                              <Label><b>Is Mailing address same as Location address:</b></Label>
                            </Col>
                            <Col md="4">
                              {/*<AppSwitch className={'mx-1'} color={'info'} label yes />*/}
                              <FormGroup check inline>
                                <Input className="form-check-input" type="radio" id="s_IsMailAddDiff" name="s_IsMailAddDiff" value="option1" />
                                <Label className="form-check-label" check htmlFor="inline-radio1">Yes</Label>
                              </FormGroup>
                              <FormGroup check inline>
                                <Input className="form-check-input" type="radio" id="s_IsMailAddDiff" name="s_IsMailAddDiff" value="option2" onClick={() => this.toggleAccordion(1)} aria-expanded={this.state.accordion[1]} aria-controls="collapseTwo" />
                                <Label className="form-check-label" check htmlFor="inline-radio2">No</Label>
                              </FormGroup>
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                  </Collapse>
                </Card>
                <Card className="mb-0 borderNN">
                  <CardHeader id="headingTwo">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(1)} aria-expanded={this.state.accordion[1]} aria-controls="collapseTwo">
                      <span className="text-value-sm">Mailing Address</span>{<i className={this.state.accordion[1] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
                    </Button>
                  </CardHeader>
                  <Collapse isOpen={this.state.accordion[1]} data-parent="#accordion" id="collapseTwo">
                    <CardBody>
                      <Row>
                        <Col md="1" className=''>
                          <FormGroup>
                            <InputGroup className="input-prepend">
                              <Label id='s_HouseNo' className="accordbtnwdth"><i className="cui-home icons"></i>&nbsp;House No.</Label>
                            </InputGroup>
                            <Input type="text" name="s_HouseNo" id="s_HouseNo" placeholder="House No" />
                          </FormGroup>
                        </Col>
                        <Col md="1" className=''>
                          <FormGroup>
                            <Label id='s_HouseDirection1'>Direction</Label>
                            <Input type="select" name="s_HouseDirection1" id="s_HouseDirection1">
                              <option value="" selected="selected">Select</option>
                              <option value="N">N</option>
                              <option value="NE">NE</option>
                              <option value="NW">NW</option>
                              <option value="S">S</option>
                              <option value="SE">SE</option>
                              <option value="SW">SW</option>
                              <option value="E">E</option>
                              <option value="W">W</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md="2" className=''>
                          <FormGroup>
                            <Label id='s_StreetName'>Street Name</Label>
                            <Input type="text" name="s_StreetName" id="s_StreetName" placeholder="Enter Street Name" />
                          </FormGroup>
                        </Col>
                        <Col md="1" className=''>
                          <FormGroup>
                            <Label id='s_HouseType'>Type</Label>
                            <Input type="select" name="s_HouseType" id="s_HouseType">
                            <option value="" selected="selected">Select</option>
                              <option value="AVE">Ave</option>
                              <option value="BLVD">Blvd</option>
                              <option value="BND ">Bnd </option>
                              <option value="CIR ">Cir </option>
                              <option value="CRES">Cres</option>
                              <option value="CT  ">Ct  </option>
                              <option value="CV  ">Cv  </option>
                              <option value="DR  ">Dr  </option>
                              <option value="GLN ">Gln </option>
                              <option value="HWY ">Hwy </option>
                              <option value="ISLE">Isle</option>
                              <option value="LN  ">Ln  </option>
                              <option value="LNDG">Lndg</option>
                              <option value="LOOP">Loop</option>
                              <option value="MNR ">Mnr </option>
                              <option value="PASS">Pass</option>
                              <option value="PATH">Path</option>
                              <option value="PKWY">Pkwy</option>
                              <option value="PL  ">Pl  </option>
                              <option value="PT  ">Pt  </option>
                              <option value="RD  ">Rd  </option>
                              <option value="ROW ">Row </option>
                              <option value="RUN ">Run </option>
                              <option value="SQ  ">Sq  </option>
                              <option value="ST  ">St  </option>
                              <option value="TER ">Ter </option>
                              <option value="TERR">Terr</option>
                              <option value="TRCE">Trce</option>
                              <option value="TRL ">Trl </option>
                              <option value="WALK">Walk</option>
                              <option value="WAY ">Way </option>
                              <option value="XING">Xing</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md="1" className=''>
                          <FormGroup>
                            <Label id='StreetName'>Zip</Label>
                            <Input type="text" name="s_PostalCode" id="s_PostalCode" placeholder="Enter Zip Code" />
                          </FormGroup>
                        </Col>
                        <Col md="1" className=''>
                          <FormGroup>
                            <Label id='StreetName'>City</Label>
                            <Input type="text" name="n_CityId_FKName" id="n_CityId_FKName" placeholder="Enter City" />
                          </FormGroup>
                        </Col>
                        <Col md="2" className=''>
                          <FormGroup>
                            <Label id='n_StateId_FKName'>State</Label>
                            <Input type="text" name="n_StateId_FKName" id="n_StateId_FKName" placeholder="Enter State" />
                          </FormGroup>
                        </Col>
                        <Col md="1" className=''>
                          <FormGroup>
                            <Label id='StreetName'>Direction</Label>
                            <Input type="select" name="s_HouseDirection2" id="s_HouseDirection2">
                              <option value="" selected="selected">Select</option>
                              <option value="N">N</option>
                              <option value="NE">NE</option>
                              <option value="NW">NW</option>
                              <option value="S">S</option>
                              <option value="SE">SE</option>
                              <option value="SW">SW</option>
                              <option value="E">E</option>
                              <option value="W">W</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md="2" className=''>
                          <FormGroup>
                            <Label id='n_CountyId_FKName'>County</Label>
                            <Input type="text" name="n_CountyId_FKName" id="n_CountyId_FKName" placeholder="County" />
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                  </Collapse>
                </Card>
                <Card className="mb-0 borderNN">
                  <CardHeader id="headingThree">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(2)} aria-expanded={this.state.accordion[2]} aria-controls="collapseThree">
                      <span className="text-value-sm">Property Details</span>{<i className={this.state.accordion[2] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
                    </Button>
                  </CardHeader>
                  <Collapse isOpen={this.state.accordion[2]} data-parent="#accordion" id="collapseThree">
                    <CardBody>
                      <Row>
                        <Col md="2" className=''>
                          <Label id='n_ReplacementCost'>ISO RCV</Label>
                          <InputGroup className="input-prepend">
                            <Input type="text" name="n_ReplacementCost" id="n_ReplacementCost" placeholder="" />
                            <Button type="" size="sm" color="warning">Get RCV</Button>
                          </InputGroup>
                        </Col>
                        <Col md="1" className=''>
                          <InputGroup className="input-prepend">
                            <Label id='n_NoOfResidents' className="accordbtnwdth">No. of residents</Label>
                          </InputGroup>
                          <Input type="text" name="n_NoOfResidents" id="n_NoOfResidents" placeholder="" />
                        </Col>
                        <Col md="1" className=''>
                          <Label id='n_NoOfStories'>No. of stories</Label>
                          <Input type="text" name="n_NoOfStories" id="n_NoOfStories" placeholder="" />
                        </Col>
                        <Col md="1" className=''>
                          <Label id='n_NoOfStories'>PPC</Label>
                          <Input type="select" name="data[PROTECTIONCLS]" id="data[PROTECTIONCLS]">
                            <option value="" selected="selected">--Select--</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                          </Input>
                        </Col>
                        <Col md="1" className=''>
                          <Label id='PROTECTIONCLS'>BCEG</Label>
                          <Input type="select" name="data[PROTECTIONCLS]" id="data[PROTECTIONCLS]">
                            <option value="" selected="selected">--Select--</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="8">8</option>
                            <option value="7">7</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="98">98</option>
                            <option value="99">99</option>
                          </Input>
                        </Col>
                        <Col md="1" className=''>
                          <Label id='yearbuilt'>Year Built</Label>
                          <Input type="text" name="data[yearbuilt]" id="data[yearbuilt]" placeholder="" />
                        </Col>
                        <Col md="1" className=''>
                          <Label id='n_HomeSqft'>Area SqFt</Label>
                          <InputGroup className="input-prepend">
                            <Input type="text" name="n_HomeSqft" id="n_HomeSqft" placeholder="Enter Street Name" />
                            <Button type="" size="sm" color="warning">i</Button>
                          </InputGroup>
                        </Col>
                        <Col md="2" className=''>
                          <Label id='STRUCTYPE'>Structure Type</Label>
                          <Input type="select" name="data[STRUCTYPE]" id="data[STRUCTYPE]">
                            <option value="" selected="selected">--Select--</option>
                            <option value="APART">Apart</option>
                            <option value="CO-OP">Co-Op</option>
                            <option value="CONDO">Condo</option>
                            <option value="DWELLING">Dwelling</option>
                            <option value="ROWHOUSE">Row House</option>
                            <option value="TOWNHOUSE">Town House</option>
                            <option value="VILLA">Villa</option>
                            <option value="MFGHOME">MFG Home</option>
                            <option value="MOBILEHOME">Mobile Home</option>
                          </Input>
                        </Col>
                        <Col md="2" className=''>
                          <Label id='ROOFTYPE'>Roof Type</Label>
                          <Input type="select" name="data[ROOFTYPE]" id="data[ROOFTYPE]">
                            <option value="" selected="selected">--Select--</option>
                            <option value="COMPOSITION">Composition</option>
                            <option value="OTHER">Other</option>
                            <option value="ROOFMETAL">Metal Roof</option>
                            <option value="TILE">Tile</option>
                            <option value="WOODSHAKE">Wood Shake</option>
                          </Input>
                        </Col>
                        {/* <Col md="2" className='mt-2'>
                          <Label id='DistanceFromWate'>Distance To Water (miles)</Label>
                          <Input type="text" name="s_DistanceFromWate" id="s_DistanceFromWate" placeholder="" />
                        </Col> */}
                        <Col md="2" className='mt-2'>
                          <Label id='n_DistanceFireStation'>Distance To Fire Stn (miles)</Label>
                          <Input type="text" name="n_DistanceFireStation" id="n_DistanceFireStation" placeholder="" />
                        </Col>
                        <Col md="2" className='mt-2'>
                          <Label id='n_DistanceHydrant'>Distance To Hydrant (feet)</Label>
                          <Input type="text" name="n_DistanceHydrant" id="n_DistanceHydrant" placeholder="" />
                        </Col>
                        <Col md="2" className='mt-2'>
                          <Label id='s_UsageTypeCode'>Usage</Label>
                          <Input type="select" name="s_UsageTypeCode" id="s_UsageTypeCode">
                            <option value="" selected="selected">--Select--</option>
                            <option value="SEASONAL3_6MO">Seasonal (3-6 Months)</option>
                            <option value="UNDERCONST">Under Construction (Builder's Risk)</option>
                            <option value="SEASONAL6MO">Seasonal (&gt;6 Months)</option>
                            <option value="FARM">Farm</option>
                            <option value="PRIMARY">Primary</option>
                            <option value="RENT">Rental</option>
                            <option value="SECONDARY">Secondary</option>
                          </Input>
                        </Col>
                        <Col md="3" className='mt-4'>
                          <FormGroup row>
                            <Col md="6">
                              <Label><strong>Is this a new purchase?</strong></Label>
                            </Col>
                            <Col md="6">
                              <FormGroup check inline>
                                <Input className="form-check-input" type="radio" id="s_IsNewPurchase" name="s_IsNewPurchase" value="option1" onClick={() => this.toggleAccordion(3)} aria-expanded={this.state.accordion[3]} aria-controls="collapseFour" />
                                <Label className="form-check-label" check htmlFor="inline-radio1">Yes</Label>
                              </FormGroup>
                              <FormGroup check inline>
                                <Input className="form-check-input" type="radio" id="s_IsNewPurchase" name="s_IsNewPurchase" value="option2" />
                                <Label className="form-check-label" check htmlFor="inline-radio2">No</Label>
                              </FormGroup>
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                  </Collapse>
                </Card>
                <Card className="mb-0 borderNN">
                  <CardHeader id="headingFour">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(3)} aria-expanded={this.state.accordion[3]} aria-controls="collapseFour">
                      <span className="text-value-sm">Prior or Current Address</span>{<i className={this.state.accordion[3] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
                    </Button>
                  </CardHeader>
                  <Collapse isOpen={this.state.accordion[3]} data-parent="#accordion" id="collapseFour">
                    <CardBody>
                      <Row>
                        <Col md="2" className=''>
                          <Label id='s_HouseNo'>House No</Label>
                          <Input type="text" name="s_HouseNo" id="" placeholder="Enter House No" />
                        </Col>
                        <Col md="2" className=''>
                          <Label id='s_HouseDirection1'>Direction</Label>
                          <Input type="select" name="s_HouseDirection1" id="s_HouseDirection1">
                            <option value="" selected="selected">Select</option>
                            <option value="N">N</option>
                            <option value="NE">NE</option>
                            <option value="NW">NW</option>
                            <option value="S">S</option>
                            <option value="SE">SE</option>
                            <option value="SW">SW</option>
                            <option value="E">E</option>
                            <option value="W">W</option>
                          </Input>
                        </Col>
                        <Col md="2" className=''>
                          <Label id='s_StreetName'>Street Name</Label>
                          <Input type="text" name="s_StreetName" id="s_StreetName" placeholder="Enter Street Name" />
                        </Col>
                        <Col md="2" className=''>
                          <Label id='s_HouseType'>Type</Label>
                          <Input type="select" name="s_HouseType" id="s_HouseType">
                            <option value="">Select Agency</option>
                            <option value="77727">AVZ1001 - ZWIRZ &amp; COMPANY, P.A.</option>
                          </Input>
                        </Col>
                        <Col md="2" className=''>
                          <Label id='s_HouseDirection2'>Type</Label>
                          <Input type="select" name="s_HouseDirection2" id="s_HouseDirection2">
                            <option value="" selected="selected">Select</option>
                            <option value="N">N</option>
                            <option value="NE">NE</option>
                            <option value="NW">NW</option>
                            <option value="S">S</option>
                            <option value="SE">SE</option>
                            <option value="SW">SW</option>
                            <option value="E">E</option>
                            <option value="W">W</option>
                          </Input>
                        </Col>
                        <Col md="2" className=''>
                          <Label id='s_PostalCode'>Zip</Label>
                          <Input type="text" name="s_PostalCode" id="s_PostalCode" placeholder="Enter Zip Code" />
                        </Col>
                        <Col md="2" className='mt-2'>
                          <Label id='n_CityId_FKName'>City</Label>
                          <Input type="text" name="n_CityId_FKName" id="n_CityId_FKName" placeholder="Enter City" />
                        </Col>
                        <Col md="2" className='mt-2'>
                          <Label id='n_CityId_FKName'>State</Label>
                          <Input type="text" name="n_StateId_FKName" id="n_StateId_FKName" placeholder="Enter State" />
                        </Col>
                        <Col md="2" className='mt-2'>
                          <Label id='n_CountyId_FKName'>County</Label>
                          <Input type="text" name="n_CountyId_FKName" id="n_CountyId_FKName" placeholder="County" />
                        </Col>
                      </Row>
                    </CardBody>
                  </Collapse>
                </Card>
                <Card className="mb-0 borderNN">
                  <CardHeader id="headingFive">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(4)} aria-expanded={this.state.accordion[4]} aria-controls="collapseFive">
                      <span className="text-value-sm">Basic Coverage's</span>{<i className={this.state.accordion[4] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
                    </Button>
                  </CardHeader>
                  <Collapse isOpen={this.state.accordion[4]} data-parent="#accordion" id="collapseFive">
                    <CardBody>
                      <Row>
                        <Col md="4" className=''>
                          <Row>
                            <Col md="12" className='mt-2'>
                              <InputGroup className="input-prepend">
                                <Label id='txt_basicCVG_1' className="accordlabel">A-Dwelling &nbsp;</Label>
                                <Input type="text" name="txt_basicCVG_1" id="txt_basicCVG_1" placeholder="" />
                              </InputGroup>
                            </Col>
                            <Col md="12" className='mt-2'>
                              <InputGroup className="input-prepend">
                                <Label id='txt_basicCVGSelectedValue_2' className="accordlabel">B-Other Structures &nbsp;</Label>
                                <Input type="select" name="txt_basicCVGSelectedValue_2" id="txt_basicCVGSelectedValue_2">
                                  <option value="0">0%</option>
                                  <option value="1">1%</option>
                                  <option value="02" selected="">02%</option>
                                  <option value="03">03%</option>
                                  <option value="04">04%</option>
                                  <option value="05">05%</option>
                                  <option value="06">06%</option>
                                  <option value="07">07%</option>
                                  <option value="08">08%</option>
                                  <option value="09">09%</option>
                                  <option value="10">10%</option>
                                  <option value="11">11%</option>
                                  <option value="12">12%</option>
                                  <option value="13">13%</option>
                                  <option value="14">14%</option>
                                  <option value="15">15%</option>
                                </Input>
                                <Input type="text" name="txt_basicCVG_2" id="txt_basicCVG_2" placeholder="" />
                              </InputGroup>
                            </Col>
                            <Col md="12" className='mt-2'>
                              <InputGroup className="input-prepend">
                                <Label id='txt_basicCVGSelectedValue_3' className="accordlabel">C-Personal Property&nbsp;</Label>
                                <Input type="select" name="txt_basicCVGSelectedValue_3" id="txt_basicCVGSelectedValue_3">
                                  <option value="10" selected="">10%</option>
                                  <option value="20">20%</option>
                                </Input>
                                <Input type="text" name="txt_basicCVG_3" id="txt_basicCVG_3" placeholder="" />
                              </InputGroup>
                            </Col>

                            <Col md="12" className='mt-2'>
                              <InputGroup className="input-prepend">
                                <Label id='txt_basicCVGSelectedValue_4' className="accordlabel">D-Loss of Use &nbsp;</Label>
                                <Input type="select" name="txt_basicCVGSelectedValue_4" id="txt_basicCVGSelectedValue_4">
                                  <option value="10" selected="">10%</option>
                                  <option value="20">20%</option>
                                </Input>
                                <Input type="text" name="txt_basicCVG_4" id="txt_basicCVG_4" placeholder="" />
                              </InputGroup>
                            </Col>
                            <Col md="12" className='mt-2'>
                              <InputGroup className="input-prepend">
                                <Label id='dd_basicCVG_5' className="accordlabel">E-Personal Liability &nbsp;</Label>
                                <Input type="select" name="dd_basicCVG_5" id="dd_basicCVG_5">
                                  <option value="">--Select--</option>
                                  <option value="2" selected="">$100,000</option><option value="7">$300,000</option><option value="10">$500,000</option>
                                </Input>
                              </InputGroup>
                            </Col>
                            <Col md="12" className='mt-2'>
                              <InputGroup className="input-prepend">
                                <Label id='dd_basicCVG_6' className="accordlabel">F-Medical Payments &nbsp;</Label>
                                <Input type="select" name="dd_basicCVG_6" id="dd_basicCVG_6">
                                  <option value="">--Select--</option>
                                  <option value="50" selected="">$1,000</option><option value="103">$3,000</option><option value="51">$5,000</option>
                                </Input>
                              </InputGroup>
                            </Col>
                          </Row>
                        </Col>
                        <Col md="3" className='mt-2'>
                          <InputGroup className="input-prepend">
                            <Label id='OCCUPYTYPE' className="accordbtnwdth">Occupancy Type &nbsp;</Label>
                            <Input type="select" name="OCCUPYTYPE" id="OCCUPYTYPE">
                              <option value="">--Select--</option>
                              <option value="OWNER" selected="selected">Owner</option>
                              <option value="TENANT">Tenant</option>
                              <option value="UNOCC">Unocc</option>
                              <option value="VACANT">Vacant</option>
                            </Input>
                          </InputGroup>
                        </Col>
                        <Col md="4" className='overflow-auto' style={{ height: "300px" }}>
                          <Row>
                            <Col md="12" className=''>
                              <InputGroup className="input-prepend">
                                <FormGroup check className="checkbox">
                                  <Input className="form-check-input" type="checkbox" id="chkEndorse_23" name="chkEndorse_23" value="option1" />
                                  <Label id='chkEndorse_23' className="accordlabel">Wind Coverage Exclusion:&nbsp;</Label>
                                </FormGroup>
                              </InputGroup>
                            </Col>
                            <Col md="12" className=''>
                              <InputGroup className="input-prepend">
                                <FormGroup check className="checkbox">
                                  <Input className="form-check-input" type="checkbox" id="chkEndorse_10" name="chkEndorse_10" value="option1" />
                                  <Label id='chkEndorse_10' className="accordlabel">Pers Prop Repl Cost: &nbsp;</Label>
                                </FormGroup>
                              </InputGroup>
                            </Col>
                            <Col md="12" className=''>
                              <InputGroup className="input-prepend">
                                <FormGroup check className="checkbox">
                                  <Input className="form-check-input" type="checkbox" id="txtCvgLimitAmt_22" name="txtCvgLimitAmt_22" value="option1" />
                                </FormGroup>
                                <Label id='txtCvgLimitAmt_22' className="accordlabel">Scheduled Pers Prop: &nbsp;</Label>
                                <Input type="text" name="txtCvgLimitAmt_22" id="txtCvgLimitAmt_22" placeholder="0" style={{ width: "" }} />
                                <Button type="" size="sm" color="warning" id="HOSCHEDPERPROP_Link">Form</Button>
                              </InputGroup>
                            </Col>
                            <Col md="12" className='mt-2'>
                              <InputGroup className="input-prepend">
                                <FormGroup check className="checkbox">
                                  <Input className="form-check-input" type="checkbox" id="chkEndorse_11" name="chkEndorse_11" value="option1" />
                                </FormGroup>
                                <Label id='ddCvgLimitAmt_11' className="accordlabel">Ordinance or Law: &nbsp;</Label>
                                <Input type="select" name="ddCvgLimitAmt_11" id="ddCvgLimitAmt_11">
                                  <option value="">--Select--</option>
                                  <option value="35" selected="">25% Of Cvg A</option><option value="41">50% of Cvg A</option>
                                </Input>
                              </InputGroup>
                            </Col>
                            <Col md="12" className='mt-2'>
                              <InputGroup className="input-prepend">
                                <FormGroup check className="checkbox">
                                  <Input className="form-check-input" type="checkbox" id="chkEndorse_12" name="chkEndorse_12" value="option1" />
                                </FormGroup>
                                <Label id='ddCvgLimitAmt_12' className="accordlabel">Mold/Fungi Cvg Endt:</Label>
                                <Input type="select" name="ddCvgLimitAmt_12" id="ddCvgLimitAmt_12">
                                  <option value="">--Select--</option>
                                  <option value="3" selected="">$10,000</option><option value="5">$25,000</option><option value="11">$50,000</option>
                                </Input>
                              </InputGroup>
                            </Col>
                            <Col md="12" className='mt-2'>
                              <InputGroup className="input-prepend">
                                <FormGroup check className="checkbox">
                                  <Input className="form-check-input" type="checkbox" id="chkEndorse_20" name="chkEndorse_20" value="option1" />
                                </FormGroup>
                                <Label id='ddCvgLimitAmt_20' className="accordlabel">Screened Enclosures:</Label>
                                <Input type="select" name="ddCvgLimitAmt_20" id="ddCvgLimitAmt_20">
                                  <option value="">--Select--</option>
                                  <option value="3" selected="">$10,000</option><option value="5">$25,000</option><option value="11">$50,000</option>
                                </Input>
                              </InputGroup>
                            </Col>
                            <Col md="12" className='mt-2'>
                              <InputGroup className="input-prepend">
                                <FormGroup check className="checkbox">
                                  <Input className="form-check-input" type="checkbox" id="chkEndorse_95" name="chkEndorse_95" value="option1" />
                                </FormGroup>
                                <Label id='ddCvgLimitAmt_95' className="accordlabel">Water Back up:</Label>
                                <Input type="select" name="ddCvgLimitAmt_95" id="ddCvgLimitAmt_95">
                                  <option value="">--Select--</option>
                                  <option value="9">$5,000</option>
                                </Input>
                              </InputGroup>
                            </Col>
                            <Col md="12" className='mt-2'>
                              <InputGroup className="input-prepend">
                                <FormGroup check className="checkbox">
                                  <Input className="form-check-input" type="checkbox" id="chkEndorse_96" name="chkEndorse_96" value="option1" />
                                </FormGroup>
                                <Label id='ddCvgLimitAmt_96' className="accordlabel">Special Computer Coverage:</Label>
                                <Input type="select" name="ddCvgLimitAmt_96" id="ddCvgLimitAmt_96">
                                  <option value="">--Select--</option>
                                  <option value="1">$1,000</option><option value="3">$10,000</option><option value="4">$2,000</option><option value="6">$3,000</option><option value="8">$4,000</option><option value="9">$5,000</option><option value="12">$6,000</option><option value="13">$7,000</option><option value="14">$8,000</option><option value="15">$9,000</option>
                                </Input>
                              </InputGroup>
                            </Col>
                            <Col md="12" className='mt-2'>
                              <InputGroup className="input-prepend">
                                <FormGroup check className="checkbox">
                                  <Input className="form-check-input" type="checkbox" id="chkEndorse_100" name="chkEndorse_100" value="option1" />
                                </FormGroup>
                                <Label id='chkEndorse_100' className="">Permitted Incidental Occupancies:</Label>
                              </InputGroup>
                            </Col>
                            <Col md="12" className='mt-2'>
                              <InputGroup className="input-prepend">
                                <FormGroup check className="checkbox">
                                  <Input className="form-check-input" type="checkbox" id="chkEndorse_101" name="chkEndorse_101" value="option1" />
                                </FormGroup>
                                <Label id='ddCvgLimitAmt_101' className="accordlabel">Business Property:</Label>
                                <Input type="select" name="ddCvgLimitAmt_101" id="ddCvgLimitAmt_101">
                                  <option value="">--Select--</option>
                                  <option value="107">$10,000</option><option value="104">$2,500</option><option value="105">$5,000</option><option value="106">$7,500</option>
                                </Input>
                              </InputGroup>
                            </Col>
                            <Col md="12" className='mt-2'>
                              <InputGroup className="input-prepend">
                                <FormGroup check className="checkbox">
                                  <Input className="form-check-input" type="checkbox" id="chkEndorse_102" name="chkEndorse_102" value="option1" />
                                </FormGroup>
                                <Label id='chkEndorse_102' className="">Golf Cart Physical Damage & Liability:</Label>
                              </InputGroup>
                            </Col>
                            <Col md="12" className='mt-2'>
                              <InputGroup className="input-prepend">
                                <FormGroup check className="checkbox">
                                  <Input className="form-check-input" type="checkbox" id="chkEndorse_103" name="chkEndorse_103" value="option1" />
                                </FormGroup>
                                <Label id='chkEndorse_103' className="accordlabel">Personal Injury:</Label>
                              </InputGroup>
                            </Col>
                            <Col md="12" className='mt-2'>
                              <InputGroup className="input-prepend">
                                <FormGroup check className="checkbox">
                                  <Input className="form-check-input" type="checkbox" id="chkEndorse_39" name="chkEndorse_39" value="option1" />
                                </FormGroup>
                                <Label id='chkEndorse_39' className="accordlabel">Sink Hole Coverage:</Label>
                              </InputGroup>
                            </Col>
                            <Col md="12" className='mt-2'>
                              <InputGroup className="input-prepend">
                                <FormGroup check className="checkbox">
                                  <Input className="form-check-input" type="checkbox" id="chkEndorse_104" name="chkEndorse_104" value="option1" />
                                </FormGroup>
                                <Label id='chkEndorse_104' className="accordlabel">Animal Liability:</Label>
                              </InputGroup>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </CardBody>
                  </Collapse>
                </Card>
                <Card className="mb-0 borderNN">
                  <CardHeader id="headingSix">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(5)} aria-expanded={this.state.accordion[5]} aria-controls="collapseSix">
                      <span className="text-value-sm">Deductible</span>{<i className={this.state.accordion[5] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
                    </Button>
                  </CardHeader>
                  <Collapse isOpen={this.state.accordion[5]} data-parent="#accordion" id="collapseSix">
                    <CardBody>
                      <Row>
                        <Col md="2" className=''>
                          <Label id='ddDeductNonHurricane' className="accordlabel">Non Hurricane</Label>
                          <Input type="select" name="ddDeductNonHurricane" id="ddDeductNonHurricane">
                            <option value="">--Select--</option>
                            <option value="DED1000" selected="">$1000 Deductible</option><option value="DED2500">$2500 Deductible</option>
                          </Input>
                        </Col>
                        <Col md="2" className=''>
                          <Label id='ddDeductHurricane' className="accordlabel">Hurricane</Label>
                          <Input type="select" name="ddDeductHurricane" id="ddDeductHurricane">
                            <option value="">--Select--</option>
                            <option value="HURRA02P" selected="">2% Ded</option><option value="HURRA05P">5% Ded</option><option value="HURRA10P">10% Ded</option>
                          </Input>
                        </Col>
                      </Row>
                    </CardBody>
                  </Collapse>
                </Card>
                <Card className="mb-0 borderNN">
                  <CardHeader id="headingSeven">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(6)} aria-expanded={this.state.accordion[6]} aria-controls="collapseSix">
                      <span className="text-value-sm">Discounts & Wind Mitigation Credits</span>{<i className={this.state.accordion[6] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
                    </Button>
                  </CardHeader>
                  <Collapse isOpen={this.state.accordion[6]} data-parent="#accordion" id="collapseSix">
                    <CardBody>
                      <Row>
                        <Col xs="12" sm="6">
                          <Card>
                            <CardHeader>
                              <strong>Discounts</strong>
                              <small></small>
                            </CardHeader>
                            <CardBody>
                              <Row><Col md="7" className=''>
                                <Row>
                                  <Col md="12" className=''>
                                    <InputGroup className="input-prepend">
                                      <Label id='HOFIREALARM' className="accordlabel">Pers Prop Repl Cost:</Label>
                                      <FormGroup check className="checkbox ml-2">
                                        <Input className="form-check-input" type="checkbox" id="data[HOFIREALARM]" name="data[HOFIREALARM]" value="option2" />
                                      </FormGroup>
                                    </InputGroup>
                                  </Col>
                                  <Col md="12" className='mt-2'>
                                    <InputGroup className="input-prepend">
                                      <Label id='HOBURGALARM' className="accordlabel">Central Burglar Alarm</Label>
                                      <FormGroup check className="checkbox ml-2">
                                        <Input className="form-check-input" type="checkbox" id="data[HOBURGALARM]" name="data[HOBURGALARM]" value="option2" />
                                      </FormGroup>
                                    </InputGroup>
                                  </Col>
                                  <Col md="12" className='mt-2'>
                                    <InputGroup className="input-prepend">
                                      <Label id='HOGATEDCOMM' className="accordlabel">Gated Community</Label>
                                      <FormGroup check className="checkbox ml-2">
                                        <Input className="form-check-input" type="checkbox" id="data[HOGATEDCOMM]" name="data[HOGATEDCOMM]" value="option2" />
                                      </FormGroup>
                                    </InputGroup>
                                  </Col>
                                  <Col md="12" className='mt-2'>
                                    <InputGroup className="input-prepend">
                                      <Label id='SPRINKLER' className="accordlabel">Automatic Sprinklers</Label>
                                      <Input type="select" name="data[SPRINKLER]" id="data[SPRINKLER]">
                                        <option value="" selected="selected">--Select--</option>
                                        <option value="CLASSA">Sprinkler Class A</option>
                                        <option value="CLASSB">Sprinkler Class B</option>
                                      </Input>
                                    </InputGroup>
                                  </Col>
                                  <Col md="12" className='mt-2'>
                                    <InputGroup className="input-prepend">
                                      <Label id='SPRINKLER' className="accordlabel">Smoker Surcharge</Label>
                                      <FormGroup check className="checkbox ml-2">
                                        <Input className="form-check-input" type="checkbox" id="s_Smoker" name="s_Smoker" value="option2" />
                                      </FormGroup>
                                    </InputGroup>
                                  </Col>
                                </Row>
                              </Col>
                              </Row>
                            </CardBody>
                          </Card>
                        </Col>
                        <Col xs="12" sm="6">
                          <Card>
                            <CardHeader>
                              <strong>Wind Mitigation Credits</strong>
                              <small></small>
                            </CardHeader>
                            <CardBody>
                              <Row>
                                <Col md="6" className=''>
                                  <InputGroup className="input-prepend">
                                    <Label id='HOROOFCOVER' className="accordlabel">Roof Cover(FBC)</Label>
                                    <Input type="select" name="data[HOROOFCOVER]" id="data[HOROOFCOVER]">
                                      <option value="" selected="selected">--Select--</option>
                                      <option value="FBC">FBC Equivalent</option>
                                      <option value="NONFBC">Non- FBC Equivalent</option>
                                      <option value="RCRD">Concrete Roof Deck</option>
                                      <option value="OTHER">Other</option>
                                    </Input>
                                  </InputGroup>
                                </Col>
                                <Col md="6" className=''>
                                  <InputGroup className="input-prepend">
                                    <Label id='HOROOFDECKATT' className="accordlabel">Roof Deck Attachment</Label>
                                    <Input type="select" name="data[HOROOFDECKATT]" id="data[HOROOFDECKATT]">
                                      <option value="" selected="selected">--Select--</option>
                                      <option value="LEVELA">Level A</option>
                                      <option value="LEVELB">Level B</option>
                                      <option value="LEVELC">Level C</option>
                                      <option value="LEVELD">Level D</option>
                                    </Input>
                                  </InputGroup>
                                </Col>
                                <Col md="6" className='mt-2'>
                                  <InputGroup className="input-prepend">
                                    <Label id='HOROOFWALLCONN' className="accordlabel">Roof-Wall Connection</Label>
                                    <Input type="select" name="data[HOROOFWALLCONN]" id="data[HOROOFWALLCONN]">
                                      <option value="" selected="selected">--Select--</option>
                                      <option value="TOENAIL">Toe Nails</option>
                                      <option value="CLIP">Clips</option>
                                      <option value="SINGLEWRAP">Single Wraps</option>
                                      <option value="DOUBLEWRAP">Double Wraps</option>
                                    </Input>
                                  </InputGroup>
                                </Col>
                                <Col md="6" className='mt-2'>
                                  <InputGroup className="input-prepend">
                                    <Label id='PLROOFSHAPE' className="accordlabel">Roof Shape</Label>
                                    <Input type="select" name="data[PLROOFSHAPE]" id="data[PLROOFSHAPE]">
                                      <option value="" selected="selected">--Select--</option>
                                      <option value="ARCHED">Arched Roof</option>
                                      <option value="DOME">Dome Shaped</option>
                                      <option value="GABLE">Gable</option>
                                      <option value="HIP">Hip Roof</option>
                                      <option value="SHED">Shed</option>
                                      <option value="COMPLEX">Complex/Custom</option>
                                      <option value="FLAT">Flat Roof</option>
                                      <option value="GAMBREL">Gambrel</option>
                                      <option value="MANSARD">Mansard</option>
                                      <option value="OTHER">Other</option>
                                      <option value="RCRD">Reinforced Concrete Roof Deck</option>
                                    </Input>
                                  </InputGroup>
                                </Col>
                                <Col md="6" className='mt-2'>
                                  <InputGroup className="input-prepend">
                                    <Label id='HOWINDOWPROTECT' className="accordlabel">Opening Protection</Label>
                                    <Input type="select" name="data[HOWINDOWPROTECT]" id="data[HOWINDOWPROTECT]">
                                      <option value="" selected="selected">--Select--</option>
                                      <option value="BASIC">Basic</option>
                                      <option value="HURRICANE">Hurricane</option>
                                      <option value="OTHER">None</option>
                                    </Input>
                                  </InputGroup>
                                </Col>
                                <Col md="6" className='mt-2'>
                                  <InputGroup className="input-prepend">
                                    <Label id='s_secwaterresistcode' className="accordlabel">Secondary Water Resistance</Label>
                                    <Input type="select" name="data[s_secwaterresistcode]" id="data[s_secwaterresistcode]">
                                      <option value="" selected="selected">--Select--</option>
                                      <option value="BITUMENTAPE">Modified Bitumen tape on plywood joints</option>
                                      <option value="FOAMADHESIVE">Foamed polyurethane structural adhesive on plywood joints</option>
                                      <option value="METALDECK">Metal Roof Deck with tar sealant</option>
                                      <option value="NONE">None - No Secondary Water Resistance</option>
                                    </Input>
                                  </InputGroup>
                                </Col>
                                <Col md="6" className='mt-2'>
                                  <InputGroup className="input-prepend">
                                    <Label id='s_terrainexposurecode' className="accordlabel">Terrain</Label>
                                    <Input type="select" name="data[s_terrainexposurecode]" id="data[s_terrainexposurecode]">
                                      <option value="" selected="selected">--Select--</option>
                                      <option value="BITUMENTAPE">Modified Bitumen tape on plywood joints</option>
                                      <option value="FOAMADHESIVE">Foamed polyurethane structural adhesive on plywood joints</option>
                                      <option value="METALDECK">Metal Roof Deck with tar sealant</option>
                                      <option value="NONE">None - No Secondary Water Resistance</option>
                                    </Input>
                                  </InputGroup>
                                </Col>
                                <Col md="6" className='mt-2'>
                                  <InputGroup className="input-prepend">
                                    <Label id='s_terrainexposurecode' className="accordlabel">Wind Speed</Label>
                                    <Input type="select" name="data[s_FBCwindspeedcode]" id="data[s_FBCwindspeedcode]">
                                      <option value="" selected="selected">--Select--</option>
                                      <option value="FBC100">FBC100</option>
                                      <option value="FBC110">FBC110</option>
                                      <option value="FBC120">FBC120</option>
                                      <option value="FBC130">FBC120+</option>
                                    </Input>
                                  </InputGroup>
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </CardBody>
                  </Collapse>
                </Card>
                <Card className="mb-0 borderNN">
                  <CardHeader id="headingEight">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(7)} aria-expanded={this.state.accordion[7]} aria-controls="collapseEight">
                      <span className="text-value-sm">Claim Question</span>{<i className={this.state.accordion[7] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
                    </Button>
                  </CardHeader>
                  <Collapse isOpen={this.state.accordion[7]} data-parent="#accordion" id="collapseEight">
                    <CardBody>
                      <Row>
                        <Col md="7" className=''>
                          <strong>Month & Year the property to be insured was purchased by the applicant.</strong>
                        </Col>
                        <Col md="1" className=''>
                          <FormGroup check inline>
                            <Input type="text" name="d_InsuredLivingDate" id="d_InsuredLivingDate" placeholder="" />
                          </FormGroup>
                        </Col>
                        <Col md="1" className=''>
                          <FormGroup check inline>
                            <strong>(YYYY-MM)</strong>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="7" className='mt-2'>
                          <strong>Do you have any losses occured in last 5 years?</strong>
                        </Col>
                        <Col md="1" className='mt-2'>
                          <FormGroup check inline>
                            <Input className="form-check-input" type="radio" id="listalllossesRadio" name="listalllossesRadio" value="option1" />
                            <Label className="form-check-label" check htmlFor="inline-radio1">Yes</Label>
                          </FormGroup>
                        </Col>
                        <Col md="1" className='mt-2'>
                          <FormGroup check inline>
                            <Input className="form-check-input" type="radio" id="listalllossesRadio" name="listalllossesRadio" value="option2" />
                            <Label className="form-check-label" check htmlFor="inline-radio2">No</Label>
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                  </Collapse>
                </Card>
                <Card className="mb-0 borderNN">
                  <CardHeader id="headingNine">
                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(8)} aria-expanded={this.state.accordion[8]} aria-controls="collapseNine">
                      <span className="text-value-sm">Underwriting Questions</span>{<i className={this.state.accordion[8] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
                    </Button>
                  </CardHeader>
                  <Collapse isOpen={this.state.accordion[8]} data-parent="#accordion" id="collapseNine">
                    <CardBody>
                      <Row>
                        <Col md="7" className=''>
                          <strong>Please answer all questions in this section</strong>
                        </Col>
                        <Col md="1" className=''>
                          <FormGroup check inline>
                            <strong>Yes</strong>
                          </FormGroup>
                        </Col>
                        <Col md="1" className=''>
                          <FormGroup check inline>
                            <strong>No</strong>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="7" className='mt-2'>
                          <strong>Do you have wood burning stove at home?</strong>
                        </Col>
                        <Col md="1" className=''>
                          <FormGroup check inline>
                            <Input className="form-check-input" type="radio" id="radio_12984303" name="radio_12984303" value="option1" />
                          </FormGroup>
                        </Col>
                        <Col md="1" className=''>
                          <FormGroup check inline>
                            <Input className="form-check-input" type="radio" id="radio_12984303" name="radio_12984303" value="option2" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="7" className='mt-2'>
                          <strong>Does the applicant have at least 1 year of current homeowner insurance, unless a first time home buyer?</strong>
                        </Col>
                        <Col md="1" className=''>
                          <FormGroup check inline>
                            <Input className="form-check-input" type="radio" id="radio_12984362" name="radio_12984362" value="option1" />
                          </FormGroup>
                        </Col>
                        <Col md="1" className=''>
                          <FormGroup check inline>
                            <Input className="form-check-input" type="radio" id="radio_12984362" name="radio_12984362" value="option2" />
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                  </Collapse>
                </Card>
              </div>
            </Card>
          </Col>
        </Row>
      </div >
    );
  }
}

export default ApplicationAccord;