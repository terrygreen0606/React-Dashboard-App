import React, { Component } from 'react';
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

class QuoteAccord extends Component {

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
            accordion: [true, false, false, false, false, false, false, false,],
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
                        <Card>
                            {/*<CardHeader>
                <i className="fa fa-align-justify"></i> Collapse <small>accordion</small>
                <div className="card-header-actions">
                  <Badge>NEW</Badge>
                </div>
              </CardHeader>*/}

                            <div id="accordion">
                                <Card className="mb-0">
                                    <CardHeader id="headingOne">
                                        <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(0)} aria-expanded={this.state.accordion[0]} aria-controls="collapseOne">
                                            <strong className="m-0 p-0">Applicant Information</strong>
                                        </Button>
                                    </CardHeader>
                                    <Collapse isOpen={this.state.accordion[0]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                                        <CardBody>
                                            <Row>
                                                <Col md="3" className=''>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='FirstName' className="accordbtnwdth">First Name</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="s_FirstName" id="s_FirstName" placeholder="Enter First Name" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className=''>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='MiddleName' className="accordbtnwdth">Middle Name</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="s_MiddleName" id="s_MiddleName" placeholder="Enter Middle Name" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className=''>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='MiddleName' className="accordbtnwdth">Last Name</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="s_LastOrganizationName" id="s_LastOrganizationName" placeholder="Enter Last Name" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className=''>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='MiddleName' className="accordbtnwdth">Name(s) on Dec</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="s_FullLegalName" id="s_FullLegalName" placeholder="Enter Name(s) on Dec" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='MiddleName' className="accordbtnwdth">House No</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="s_HouseNo" id="s_HouseNo" placeholder="Enter House No" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText className="accordbtnwdth">Direction</InputGroupText>
                                                        </InputGroupAddon>
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
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='StreetName' className="accordbtnwdth">Street Name</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="s_StreetName" id="s_StreetName" placeholder="Enter Street Name" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText className="accordbtnwdth">Type</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="select" name="s_HouseType" id="s_HouseType">
                                                            <option value="">Select Agency</option>
                                                            <option value="77727">AVZ1001 - ZWIRZ &amp; COMPANY, P.A.</option>
                                                        </Input>
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText className="accordbtnwdth">Direction</InputGroupText>
                                                        </InputGroupAddon>
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
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='EffectiveTo' className="accordbtnwdth">Zip</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="s_PostalCode" id="s_PostalCode" placeholder="Enter Zip Code" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='EffectiveTo' className="accordbtnwdth">City</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="n_CityId_FKName" id="n_CityId_FKName" placeholder="Enter City" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='EffectiveTo' className="accordbtnwdth">State</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="n_StateId_FKName" id="n_StateId_FKName" placeholder="Enter State" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='EffectiveTo' className="accordbtnwdth">County</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="n_CountyId_FKName" id="n_CountyId_FKName" placeholder="County" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='BinderDate' className="accordbtnwdth">DOB</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="date" id="d_BirthDate" name="d_BirthDate" placeholder="Date of Birth" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='BinderDate' className="accordbtnwdth">Phone No.</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="date" id="s_PhoneNumber" name="s_PhoneNumber" placeholder="Phone Number" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='BinderDate' className="accordbtnwdth">Email Address</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="date" id="s_EmailAddress" name="s_EmailAddress" placeholder="Email Address" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="5" className='mt-2'>
                                                    <FormGroup row>
                                                        <Col md="7">
                                                            <Label>Is Mailing address same as Location address:</Label>
                                                        </Col>
                                                        <Col md="3">
                                                            <FormGroup check inline>
                                                                <Input className="form-check-input" type="radio" id="s_IsMailAddDiff" name="s_IsMailAddDiff" value="option1" />
                                                                <Label className="form-check-label" check htmlFor="inline-radio1">Yes</Label>
                                                            </FormGroup>
                                                            <FormGroup check inline>
                                                                <Input className="form-check-input" type="radio" id="s_IsMailAddDiff" name="s_IsMailAddDiff" value="option2" />
                                                                <Label className="form-check-label" check htmlFor="inline-radio2">No</Label>
                                                            </FormGroup>
                                                        </Col>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Collapse>
                                </Card>
                                <Card className="mb-0">
                                    <CardHeader id="headingTwo">
                                        <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(1)} aria-expanded={this.state.accordion[1]} aria-controls="collapseTwo">
                                            <strong className="m-0 p-0">Mailing Address</strong>
                                        </Button>
                                    </CardHeader>
                                    <Collapse isOpen={this.state.accordion[1]} data-parent="#accordion" id="collapseTwo">
                                        <CardBody>
                                            <Row>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='MiddleName' className="accordbtnwdth">House No</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="s_HouseNo" id="s_HouseNo" placeholder="Enter House No" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText className="accordbtnwdth">Direction</InputGroupText>
                                                        </InputGroupAddon>
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
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='StreetName' className="accordbtnwdth">Street Name</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="s_StreetName" id="s_StreetName" placeholder="Enter Street Name" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText className="accordbtnwdth">Type</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="select" name="s_HouseType" id="s_HouseType">
                                                            <option value="">Select Agency</option>
                                                            <option value="77727">AVZ1001 - ZWIRZ &amp; COMPANY, P.A.</option>
                                                        </Input>
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText className="accordbtnwdth">Direction</InputGroupText>
                                                        </InputGroupAddon>
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
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='EffectiveTo' className="accordbtnwdth">Zip</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="s_PostalCode" id="s_PostalCode" placeholder="Enter Zip Code" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='EffectiveTo' className="accordbtnwdth">City</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="n_CityId_FKName" id="n_CityId_FKName" placeholder="Enter City" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='EffectiveTo' className="accordbtnwdth">State</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="n_StateId_FKName" id="n_StateId_FKName" placeholder="Enter State" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='EffectiveTo' className="accordbtnwdth">County</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="n_CountyId_FKName" id="n_CountyId_FKName" placeholder="County" />
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Collapse>
                                </Card>
                                <Card className="mb-0">
                                    <CardHeader id="headingThree">
                                        <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(2)} aria-expanded={this.state.accordion[2]} aria-controls="collapseThree">
                                            <strong className="m-0 p-0">Property Details</strong>
                                        </Button>
                                    </CardHeader>
                                    <Collapse isOpen={this.state.accordion[2]} data-parent="#accordion" id="collapseThree">
                                        <CardBody>
                                            <Row>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='MiddleName'>ISO RCV</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="n_ReplacementCost" id="n_ReplacementCost" placeholder="" />
                                                        <Button type="" size="sm" color="info">Get RCV</Button>
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='MiddleName'>No. of residents</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="n_NoOfResidents" id="n_NoOfResidents" placeholder="" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='MiddleName'>No. of stories</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="n_NoOfStories" id="n_NoOfStories" placeholder="" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>PPC</InputGroupText>
                                                        </InputGroupAddon>
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
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>BCEG</InputGroupText>
                                                        </InputGroupAddon>
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
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='MiddleName'>Year Built</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="data[yearbuilt]" id="data[yearbuilt]" placeholder="" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='StreetName'>Area SqFt</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="n_HomeSqft" id="n_HomeSqft" placeholder="Enter Street Name" />
                                                        <Button type="" size="sm" color="info">i</Button>
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>Structure Type</InputGroupText>
                                                        </InputGroupAddon>
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
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>Roof Type</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="select" name="data[ROOFTYPE]" id="data[ROOFTYPE]">
                                                            <option value="" selected="selected">--Select--</option>
                                                            <option value="COMPOSITION">Composition</option>
                                                            <option value="OTHER">Other</option>
                                                            <option value="ROOFMETAL">Metal Roof</option>
                                                            <option value="TILE">Tile</option>
                                                            <option value="WOODSHAKE">Wood Shake</option>
                                                        </Input>
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='EffectiveTo'>Distance To Water (miles)</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="s_DistanceFromWate" id="s_DistanceFromWate" placeholder="" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='EffectiveTo'>Distance To Fire Stn (miles)</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="n_DistanceFireStation" id="n_DistanceFireStation" placeholder="" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='EffectiveTo'>Distance To Hydrant (feet)</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="n_DistanceHydrant" id="n_DistanceHydrant" placeholder="" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>Usage</InputGroupText>
                                                        </InputGroupAddon>
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
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='EffectiveTo'>City</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="n_CityId_FKName" id="n_CityId_FKName" placeholder="Enter City" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='EffectiveTo'>State</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="n_StateId_FKName" id="n_StateId_FKName" placeholder="Enter State" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='EffectiveTo'>County</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="n_CountyId_FKName" id="n_CountyId_FKName" placeholder="County" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <FormGroup row>
                                                        <Col md="6">
                                                            <Label>Is this a new purchase?</Label>
                                                        </Col>
                                                        <Col md="6">
                                                            <FormGroup check inline>
                                                                <Input className="form-check-input" type="radio" id="s_IsNewPurchase" name="s_IsNewPurchase" value="option1" />
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
                                <Card className="mb-0">
                                    <CardHeader id="headingFour">
                                        <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(3)} aria-expanded={this.state.accordion[3]} aria-controls="collapseFour">
                                            <strong className="m-0 p-0">Prior or Current Address</strong>
                                        </Button>
                                    </CardHeader>
                                    <Collapse isOpen={this.state.accordion[3]} data-parent="#accordion" id="collapseFour">
                                        <CardBody>
                                            <Row>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='MiddleName'>House No</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="s_HouseNo" id="s_HouseNo" placeholder="Enter House No" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>Direction</InputGroupText>
                                                        </InputGroupAddon>
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
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='StreetName'>Street Name</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="s_StreetName" id="s_StreetName" placeholder="Enter Street Name" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>Type</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="select" name="s_HouseType" id="s_HouseType">
                                                            <option value="">Select Agency</option>
                                                            <option value="77727">AVZ1001 - ZWIRZ &amp; COMPANY, P.A.</option>
                                                        </Input>
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>Direction</InputGroupText>
                                                        </InputGroupAddon>
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
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='EffectiveTo'>Zip</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="s_PostalCode" id="s_PostalCode" placeholder="Enter Zip Code" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='EffectiveTo'>City</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="n_CityId_FKName" id="n_CityId_FKName" placeholder="Enter City" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='EffectiveTo'>State</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="n_StateId_FKName" id="n_StateId_FKName" placeholder="Enter State" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3" className='mt-2'>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='EffectiveTo'>County</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="text" name="n_CountyId_FKName" id="n_CountyId_FKName" placeholder="County" />
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Collapse>
                                </Card>

                                <Card className="mb-0">
                                    <CardHeader id="headingFive">
                                        <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(4)} aria-expanded={this.state.accordion[4]} aria-controls="collapseFive">
                                            <strong className="m-0 p-0">Basic Coverage's</strong>
                                        </Button>
                                    </CardHeader>
                                    <Collapse isOpen={this.state.accordion[4]} data-parent="#accordion" id="collapseFive">
                                        <CardBody>
                                            <Row>
                                                <Col md="4" className=''>
                                                    <Row>
                                                        <Col md="12" className='mt-2'>
                                                            <InputGroup className="input-prepend">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText id='MiddleName' style={{ width: "200px" }}>A-Dwelling</InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input type="text" name="txt_basicCVG_1" id="txt_basicCVG_1" placeholder="" />
                                                            </InputGroup>
                                                        </Col>
                                                        <Col md="12" className='mt-2'>
                                                            <InputGroup className="input-prepend">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText id='MiddleName' style={{ width: "200px" }}>B-Other Structures</InputGroupText>
                                                                </InputGroupAddon>
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
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText id='MiddleName' style={{ width: "200px" }}>C-Personal Property</InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input type="select" name="txt_basicCVGSelectedValue_3" id="txt_basicCVGSelectedValue_3">
                                                                    <option value="0">0%</option>
                                                                    <option value="1">1%</option>
                                                                    <option value="2">2%</option>
                                                                    <option value="3">3%</option>
                                                                    <option value="4">4%</option>
                                                                    <option value="5">5%</option>
                                                                    <option value="6">6%</option>
                                                                    <option value="7">7%</option>
                                                                    <option value="8">8%</option>
                                                                    <option value="9">9%</option>
                                                                    <option value="10">10%</option>
                                                                    <option value="11">11%</option>
                                                                    <option value="12">12%</option>
                                                                    <option value="13">13%</option>
                                                                    <option value="14">14%</option>
                                                                    <option value="15">15%</option>
                                                                    <option value="16">16%</option>
                                                                    <option value="17">17%</option>
                                                                    <option value="18">18%</option>
                                                                    <option value="19">19%</option>
                                                                    <option value="20">20%</option>
                                                                    <option value="21">21%</option>
                                                                    <option value="22">22%</option>
                                                                    <option value="23">23%</option>
                                                                    <option value="24">24%</option>
                                                                    <option value="25">25%</option>
                                                                    <option value="26">26%</option>
                                                                    <option value="27">27%</option>
                                                                    <option value="28">28%</option>
                                                                    <option value="29">29%</option>
                                                                    <option value="30">30%</option>
                                                                    <option value="31">31%</option>
                                                                    <option value="32">32%</option>
                                                                    <option value="33">33%</option>
                                                                    <option value="34">34%</option>
                                                                    <option value="35">35%</option>
                                                                    <option value="36">36%</option>
                                                                    <option value="37">37%</option>
                                                                    <option value="38">38%</option>
                                                                    <option value="39">39%</option>
                                                                    <option value="40">40%</option>
                                                                    <option value="41">41%</option>
                                                                    <option value="42">42%</option>
                                                                    <option value="43">43%</option>
                                                                    <option value="44">44%</option>
                                                                    <option value="45">45%</option>
                                                                    <option value="46">46%</option>
                                                                    <option value="47">47%</option>
                                                                    <option value="48">48%</option>
                                                                    <option value="49">49%</option>
                                                                    <option value="50" selected="">50%</option>
                                                                    <option value="51">51%</option>
                                                                    <option value="52">52%</option>
                                                                    <option value="53">53%</option>
                                                                    <option value="54">54%</option>
                                                                    <option value="55">55%</option>
                                                                    <option value="56">56%</option>
                                                                    <option value="57">57%</option>
                                                                    <option value="58">58%</option>
                                                                    <option value="59">59%</option>
                                                                    <option value="60">60%</option>
                                                                    <option value="61">61%</option>
                                                                    <option value="62">62%</option>
                                                                    <option value="63">63%</option>
                                                                    <option value="64">64%</option>
                                                                    <option value="65">65%</option>
                                                                    <option value="66">66%</option>
                                                                    <option value="67">67%</option>
                                                                    <option value="68">68%</option>
                                                                    <option value="69">69%</option>
                                                                    <option value="70">70%</option>
                                                                    <option value="71">71%</option>
                                                                    <option value="72">72%</option>
                                                                    <option value="73">73%</option>
                                                                    <option value="74">74%</option>
                                                                    <option value="75">75%</option>
                                                                </Input>
                                                                <Input type="text" name="txt_basicCVG_3" id="txt_basicCVG_3" placeholder="" />
                                                            </InputGroup>
                                                        </Col>
                                                        <Col md="12" className='mt-2'>
                                                            <InputGroup className="input-prepend">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText id='MiddleName' style={{ width: "200px" }}>D-Loss of Use</InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input type="select" name="txt_basicCVGSelectedValue_4" id="txt_basicCVGSelectedValue_4">
                                                                    <option value="10" selected="">10%</option>
                                                                    <option value="20">20%</option>
                                                                </Input>
                                                                <Input type="text" name="txt_basicCVG_4" id="txt_basicCVG_4" placeholder="" />
                                                            </InputGroup>
                                                        </Col>
                                                        <Col md="12" className='mt-2'>
                                                            <InputGroup className="input-prepend">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText id='MiddleName' style={{ width: "200px" }}>E-Personal Liability</InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input type="select" name="dd_basicCVG_5" id="dd_basicCVG_5">
                                                                    <option value="">--Select--</option>
                                                                    <option value="2" selected="">$100,000</option><option value="7">$300,000   </option><option value="10">$500,000</option>
                                                                </Input>
                                                            </InputGroup>
                                                        </Col>
                                                        <Col md="12" className='mt-2'>
                                                            <InputGroup className="input-prepend">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText id='MiddleName' style={{ width: "200px" }}>F-Medical Payments</InputGroupText>
                                                                </InputGroupAddon>
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
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='MiddleName' style={{ width: "200px" }}>Occupancy Type</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="select" name="OCCUPYTYPE" id="OCCUPYTYPE">
                                                            <option value="">--Select--</option>
                                                            <option value="OWNER" selected="selected">Owner</option>
                                                            <option value="TENANT">Tenant</option>
                                                            <option value="UNOCC">Unocc</option>
                                                            <option value="VACANT">Vacant</option>
                                                        </Input>
                                                    </InputGroup>
                                                </Col>
                                                <Col md="4" className=''>
                                                    <Row>
                                                        <Col md="12" className=''>
                                                            <InputGroup className="input-prepend">
                                                                <FormGroup check className="checkbox">
                                                                    <Input className="form-check-input" type="checkbox" id="chkEndorse_23" name="chkEndorse_23" value="option1" />
                                                                    <InputGroupAddon addonType="prepend">
                                                                        <InputGroupText id='MiddleName' style={{ width: "200px" }}>Wind Coverage Exclusion:</InputGroupText>
                                                                    </InputGroupAddon>
                                                                </FormGroup>
                                                            </InputGroup>
                                                        </Col>
                                                        <Col md="12" className='mt-2'>
                                                            <InputGroup className="input-prepend">
                                                                <FormGroup check className="checkbox">
                                                                    <Input className="form-check-input" type="checkbox" id="chkEndorse_10" name="chkEndorse_10" value="option2" />
                                                                    <InputGroupAddon addonType="prepend">
                                                                        <InputGroupText id='MiddleName' style={{ width: "200px" }}>Pers Prop Repl Cost:</InputGroupText>
                                                                    </InputGroupAddon>
                                                                </FormGroup>
                                                            </InputGroup>
                                                        </Col>
                                                        <Col md="12" className='mt-2'>
                                                            <InputGroup className="input-prepend">
                                                                <FormGroup check className="checkbox">
                                                                    <Input className="form-check-input" type="checkbox" id="chkEndorse_23" name="chkEndorse_23" value="option1" />
                                                                </FormGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText id='EffectiveTo' style={{ width: "200px" }}>Scheduled Pers Prop:</InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input type="text" name="txtCvgLimitAmt_22" id="txtCvgLimitAmt_22" placeholder="0" style={{ width: "70px" }} />
                                                                <Button type="" size="sm" color="info" id="HOSCHEDPERPROP_Link">Form</Button>
                                                            </InputGroup>
                                                        </Col>
                                                        <Col md="12" className='mt-2'>
                                                            <InputGroup className="input-prepend">
                                                                <FormGroup check className="checkbox">
                                                                    <Input className="form-check-input" type="checkbox" id="chkEndorse_11" name="chkEndorse_11" value="option1" />
                                                                </FormGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText id='EffectiveTo' style={{ width: "200px" }}>Ordinance or Law:</InputGroupText>
                                                                </InputGroupAddon>
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
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText id='EffectiveTo' style={{ width: "200px" }}>Mold/Fungi Cvg Endt:</InputGroupText>
                                                                </InputGroupAddon>
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
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText id='EffectiveTo' style={{ width: "200px" }}>Screened Enclosures:</InputGroupText>
                                                                </InputGroupAddon>
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
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText id='EffectiveTo' style={{ width: "200px" }}>Water Back up:</InputGroupText>
                                                                </InputGroupAddon>
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
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText id='EffectiveTo' style={{ width: "200px" }}>Special Computer Coverage:</InputGroupText>
                                                                </InputGroupAddon>
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
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText id='EffectiveTo' style={{ width: "250px" }}>Permitted Incidental Occupancies:</InputGroupText>
                                                                </InputGroupAddon>
                                                            </InputGroup>
                                                        </Col>
                                                        <Col md="12" className='mt-2'>
                                                            <InputGroup className="input-prepend">
                                                                <FormGroup check className="checkbox">
                                                                    <Input className="form-check-input" type="checkbox" id="chkEndorse_101" name="chkEndorse_101" value="option1" />
                                                                </FormGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText id='EffectiveTo' style={{ width: "200px" }}>Business Property:</InputGroupText>
                                                                </InputGroupAddon>
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
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText id='EffectiveTo' style={{ width: "250px" }}>Golf Cart Physical Damage & Liability:</InputGroupText>
                                                                </InputGroupAddon>
                                                            </InputGroup>
                                                        </Col>
                                                        <Col md="12" className='mt-2'>
                                                            <InputGroup className="input-prepend">
                                                                <FormGroup check className="checkbox">
                                                                    <Input className="form-check-input" type="checkbox" id="chkEndorse_103" name="chkEndorse_103" value="option1" />
                                                                </FormGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText id='EffectiveTo' style={{ width: "200px" }}>Personal Injury:</InputGroupText>
                                                                </InputGroupAddon>
                                                            </InputGroup>
                                                        </Col>
                                                        <Col md="12" className='mt-2'>
                                                            <InputGroup className="input-prepend">
                                                                <FormGroup check className="checkbox">
                                                                    <Input className="form-check-input" type="checkbox" id="chkEndorse_39" name="chkEndorse_39" value="option1" />
                                                                </FormGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText id='EffectiveTo' style={{ width: "200px" }}>Sink Hole Coverage:</InputGroupText>
                                                                </InputGroupAddon>
                                                            </InputGroup>
                                                        </Col>
                                                        <Col md="12" className='mt-2'>
                                                            <InputGroup className="input-prepend">
                                                                <FormGroup check className="checkbox">
                                                                    <Input className="form-check-input" type="checkbox" id="chkEndorse_104" name="chkEndorse_104" value="option1" />
                                                                </FormGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText id='EffectiveTo' style={{ width: "200px" }}>Animal Liability:</InputGroupText>
                                                                </InputGroupAddon>
                                                            </InputGroup>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Collapse>
                                </Card>

                                <Card className="mb-0">
                                    <CardHeader id="headingSix">
                                        <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(5)} aria-expanded={this.state.accordion[5]} aria-controls="collapseSix">
                                            <strong className="m-0 p-0">Deductible</strong>
                                        </Button>
                                    </CardHeader>
                                    <Collapse isOpen={this.state.accordion[5]} data-parent="#accordion" id="collapseSix">
                                        <CardBody>
                                            <Row>
                                                <Col md="4" className=''>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='MiddleName' style={{ width: "200px" }}>Non Hurricane</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="select" name="ddDeductNonHurricane" id="ddDeductNonHurricane">
                                                            <option value="">--Select--</option>
                                                            <option value="DED1000" selected="">$1000 Deductible</option><option value="DED2500">$2500 Deductible</option>
                                                        </Input>
                                                    </InputGroup>
                                                </Col>
                                                <Col md="4" className=''>
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText id='MiddleName' style={{ width: "200px" }}>Hurricane</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input type="select" name="ddDeductHurricane" id="ddDeductHurricane">
                                                            <option value="">--Select--</option>
                                                            <option value="HURRA02P" selected="">2% Ded</option><option value="HURRA05P">5% Ded</option><option value="HURRA10P">10% Ded</option>
                                                        </Input>
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Collapse>
                                </Card>


                                <Card className="mb-0">
                                    <CardHeader id="headingSeven">
                                        <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(6)} aria-expanded={this.state.accordion[6]} aria-controls="collapseSix">
                                            <strong className="m-0 p-0">Discounts & Wind Mitigation Credits</strong>
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
                                                                            <InputGroupAddon addonType="prepend">
                                                                                <InputGroupText id='MiddleName' style={{ width: "200px" }}>Pers Prop Repl Cost:</InputGroupText>
                                                                            </InputGroupAddon>
                                                                            <FormGroup check className="checkbox ml-2">
                                                                                <Input className="form-check-input" type="checkbox" id="data[HOFIREALARM]" name="data[HOFIREALARM]" value="option2" />
                                                                            </FormGroup>
                                                                        </InputGroup>
                                                                    </Col>
                                                                    <Col md="12" className='mt-2'>
                                                                        <InputGroup className="input-prepend">
                                                                            <InputGroupAddon addonType="prepend">
                                                                                <InputGroupText id='MiddleName' style={{ width: "200px" }}>Central Burglar Alarm</InputGroupText>
                                                                            </InputGroupAddon>
                                                                            <FormGroup check className="checkbox ml-2">
                                                                                <Input className="form-check-input" type="checkbox" id="data[HOBURGALARM]" name="data[HOBURGALARM]" value="option2" />
                                                                            </FormGroup>
                                                                        </InputGroup>
                                                                    </Col>
                                                                    <Col md="12" className='mt-2'>
                                                                        <InputGroup className="input-prepend">
                                                                            <InputGroupAddon addonType="prepend">
                                                                                <InputGroupText id='MiddleName' style={{ width: "200px" }}>Gated Community</InputGroupText>
                                                                            </InputGroupAddon>
                                                                            <FormGroup check className="checkbox ml-2">
                                                                                <Input className="form-check-input" type="checkbox" id="data[HOGATEDCOMM]" name="data[HOGATEDCOMM]" value="option2" />
                                                                            </FormGroup>
                                                                        </InputGroup>
                                                                    </Col>
                                                                    <Col md="12" className='mt-2'>
                                                                        <InputGroup className="input-prepend">
                                                                            <InputGroupAddon addonType="prepend">
                                                                                <InputGroupText id='MiddleName' style={{ width: "200px" }}>Automatic Sprinklers</InputGroupText>
                                                                            </InputGroupAddon>
                                                                            <Input type="select" name="data[SPRINKLER]" id="data[SPRINKLER]">
                                                                                <option value="" selected="selected">--Select--</option>
                                                                                <option value="CLASSA">Sprinkler Class A</option>
                                                                                <option value="CLASSB">Sprinkler Class B</option>
                                                                            </Input>
                                                                        </InputGroup>
                                                                    </Col>
                                                                    <Col md="12" className='mt-2'>
                                                                        <InputGroup className="input-prepend">
                                                                            <InputGroupAddon addonType="prepend">
                                                                                <InputGroupText id='MiddleName' style={{ width: "200px" }}>Smoker Surcharge</InputGroupText>
                                                                            </InputGroupAddon>
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
                                                                        <InputGroupAddon addonType="prepend">
                                                                            <InputGroupText id='MiddleName' style={{ width: "200px" }}>Roof Cover(FBC)</InputGroupText>
                                                                        </InputGroupAddon>
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
                                                                        <InputGroupAddon addonType="prepend">
                                                                            <InputGroupText id='MiddleName' style={{ width: "200px" }}>Roof Deck Attachment</InputGroupText>
                                                                        </InputGroupAddon>
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
                                                                        <InputGroupAddon addonType="prepend">
                                                                            <InputGroupText id='MiddleName' style={{ width: "200px" }}>Roof-Wall Connection</InputGroupText>
                                                                        </InputGroupAddon>
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
                                                                        <InputGroupAddon addonType="prepend">
                                                                            <InputGroupText id='MiddleName' style={{ width: "200px" }}>Roof Shape</InputGroupText>
                                                                        </InputGroupAddon>
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
                                                                        <InputGroupAddon addonType="prepend">
                                                                            <InputGroupText id='MiddleName' style={{ width: "200px" }}>Opening Protection</InputGroupText>
                                                                        </InputGroupAddon>
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
                                                                        <InputGroupAddon addonType="prepend">
                                                                            <InputGroupText id='MiddleName' style={{ width: "200px" }}>Secondary Water Resistance</InputGroupText>
                                                                        </InputGroupAddon>
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
                                                                        <InputGroupAddon addonType="prepend">
                                                                            <InputGroupText id='MiddleName' style={{ width: "200px" }}>Terrain</InputGroupText>
                                                                        </InputGroupAddon>
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
                                                                        <InputGroupAddon addonType="prepend">
                                                                            <InputGroupText id='MiddleName' style={{ width: "200px" }}>Wind Speed</InputGroupText>
                                                                        </InputGroupAddon>
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
                                <Card className="mb-0">
                                    <CardHeader id="headingEight">
                                        <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(7)} aria-expanded={this.state.accordion[7]} aria-controls="collapseEight">
                                            <strong className="m-0 p-0">Claim Question</strong>
                                        </Button>
                                    </CardHeader>
                                    <Collapse isOpen={this.state.accordion[7]} data-parent="#accordion" id="collapseEight">
                                        <CardBody>
                                            <Row>
                                                <Col md="7" className=''>
                                                    <strong>Month & Year the property to be insured was purchased by the applicant.</strong>
                                                </Col>
                                                <Col md="2" className=''>
                                                    <FormGroup check inline>
                                                        <Input type="text" name="d_InsuredLivingDate" id="d_InsuredLivingDate" placeholder="" />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="2" className=''>
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

                                <Card className="mb-0">
                                    <CardHeader id="headingNine">
                                        <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(8)} aria-expanded={this.state.accordion[8]} aria-controls="collapseNine">
                                            <strong className="m-0 p-0">Underwriting Questions</strong>
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

export default QuoteAccord;
