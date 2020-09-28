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
} from 'reactstrap';


class PolicyHeader extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState } });
  }

  render() {
    return (

      <Card>
        <CardBody>
          <Row>
            <Col md="2">
              <InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText id='EffectiveFrom' className="accordbtnwdth"><i className="cui-calendar icons d-block "></i>&nbsp;Effective From</InputGroupText>
                </InputGroupAddon>
                <Input type="date" name="d_TermStartDate" id="d_TermStartDate" placeholder="date" />
              </InputGroup>
            </Col>
            <Col md="2">
              <InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText id='EffectiveTo' className="accordbtnwdth"><i className="cui-calendar icons d-block"></i>&nbsp;Effective To</InputGroupText>
                </InputGroupAddon>
                <Input type="date" id="d_TermEndDate" name="d_TermEndDate" placeholder="date" />
              </InputGroup>
            </Col>
            {/*<Col md="3">
              <InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText id='BinderDate' className="accordbtnwdth"><i className="cui-calendar icons d-block"></i>&nbsp;Binder Date</InputGroupText>
                </InputGroupAddon>
                <Input type="date" id="BinderDate" name="BinderDate" placeholder="date" />
              </InputGroup>
              </Col>*/}
              <Col md="2" className=''>
              <InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText className="accordbtnwdth">Select Product</InputGroupText>
                </InputGroupAddon>
                <Input type="select" name="GetProductDD" id="GetProductDD">
                  <option value="">Select Agent</option>
                  <option value="1110918">Juan Camilo Sánchez</option>
                </Input>
              </InputGroup>
            </Col>
            <Col md="2" className=''>
              <InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText id='Policy_No_Header' className="accordbtnwdth">Policy No.</InputGroupText>
                </InputGroupAddon>
                <Input type="text" name="Policy_No_Header" id="Policy_No_Header" placeholder="Enter your policy number" />
              </InputGroup>
            </Col>
            <Col md="2" className=''>
              <InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText id='Policy_No_Header_SimpleSolve' className="">Citz. Policy No.</InputGroupText>
                </InputGroupAddon>
                <Input type="text" id="Policy_No_Header_SimpleSolve" name="Policy_No_Header_SimpleSolve" placeholder="Citz. Policy" />
                <Button type="" size="sm" color="warning">Get</Button>
              </InputGroup>
            </Col>
            <Col md="2" className=''>
              <InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText id='' className="accordbtnwdth">UW. App. Status</InputGroupText>
                </InputGroupAddon>
                <Input type="select" name="s_UWAppStatusTypeCode1" id="s_UWAppStatusTypeCode1">
                  <option value="">Select Status</option>
                </Input>
              </InputGroup>
            </Col>
            <Col md="3" className='mt-2'>
              <InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText className="accordbtnwdth">Select Agency</InputGroupText>
                </InputGroupAddon>
                <Input type="select" name="AgencyDropDown" id="AgencyDropDown">
                  <option value="">Select Agency</option>
                  <option value="77727">AVZ1001 - ZWIRZ &amp; COMPANY, P.A.</option>
                </Input>
              </InputGroup>
            </Col>
            <Col md="3" className='mt-2'>
              <InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText className="accordbtnwdth">Select Agent</InputGroupText>
                </InputGroupAddon>
                <Input type="select" name="AgentDropDown" id="AgentDropDown">
                  <option value="">Select Agent</option>
                  <option value="1110918">Juan Camilo Sánchez</option>
                </Input>
              </InputGroup>
            </Col>
            
            {/* <Col md="3" className='mt-2'>
              <InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText id='EstmPrem' className="accordbtnwdth">Estm Prem</InputGroupText>
                </InputGroupAddon>
                <Input type="text" name="FinalPremium" id="FinalPremium" placeholder="Enter your Estm Prem" />
              </InputGroup>
            </Col>*/}
            <Col md="2" className='mt-2'>
              <InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText id='n_UWAssigned_Agency' className="accordbtnwdth">U/W Assign</InputGroupText>
                </InputGroupAddon>
                <Input type="select" name="data[n_UWAssigned_Agency]" id="n_UWAssigned_Agency">
                  <option value="">Patric Br</option>
                </Input>
              </InputGroup>
            </Col>
            {/*<Col md="3" className='mt-2'>
              <InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText id='BinderDate' className="accordbtnwdth">Citz. Incep. Date</InputGroupText>
                </InputGroupAddon>
                <Input type="date" id="InceptionDate_SimspleSolve" name="InceptionDate_SimspleSolve" placeholder="Citz Incep Date" />
              </InputGroup>
            </Col>
            <Col md="3" className='mt-2'>
              <InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText id='CitzTotPrem' className="accordbtnwdth">Citz. Tot. Prem.</InputGroupText>
                </InputGroupAddon>
                <Input type="text" id="Citizen_Total_Premium" name="Citizen_Total_Premium" placeholder="Citz Tot Prem" />
              </InputGroup>
            </Col>*/}


            {/*<Col md="12" className='mt-2'>
              <center>
                <Label htmlFor="ccnumber">EPIC Policy&nbsp;&nbsp;</Label>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-search"></i> Click Here</Button>
              </center>
          </Col>*/}
          </Row>
        </CardBody>
        <CardFooter style={{ padding: "0px 20px" }}>
          <Row>
            <Col md="3" className='mt-2'>
              <Label htmlFor="ccnumber"><strong>Marketing Rep.	Patrick Brennan</strong></Label>
            </Col>
            <Col md="3" className='mt-2'>
              <Label htmlFor="ccnumber"><strong>Agency Phone:	(813) 514-2308</strong></Label>
            </Col>
            <Col md="3" className='mt-2'>
              <Label htmlFor="ccnumber"><strong>Principal Email: lflores@elementaryagency.com</strong></Label>
            </Col>
          </Row>
        </CardFooter>
      </Card>

    );
  }
}































export default PolicyHeader;
