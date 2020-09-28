import React, { Component } from 'react';
import PolicyHeader from './PolicyHeader';
import TabContain from './TabContain';
//import '../../views/Forms/FormStyle/customStyle.css';

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


class CreatQuote extends Component {
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
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card className="">
              <CardHeader>
                <Row>
                  <Col xs="12" sm="5">
                    <h3><i class="nav-icon icon-note"></i> Policy </h3>
                    {/*<small>Policy Details</small>*/}
                  </Col>
                  <Col xs="12" sm="6">
                    <InputGroup className="input-prepend pull-right">
                      <InputGroupAddon addonType="prepend" className=''>
                        <InputGroupText id='BinderDate' className="">Citz. Incep. Date</InputGroupText>
                        <InputGroupText id='BinderDate' className="">02/13/2020</InputGroupText>&nbsp;&nbsp;
                        <InputGroupText id='CitzTotPrem' className="">Citz. Tot. Prem.</InputGroupText>
                        <InputGroupText id='CitzTotPrem' className="">1111</InputGroupText>&nbsp;&nbsp;
                        <InputGroupText id='BinderDate' className="">Binder Date</InputGroupText>
                        <InputGroupText id='BinderDate' className="">02/14/2020</InputGroupText>&nbsp;&nbsp;
                        <InputGroupText id='CitzTotPrem' className="">Estimate Premium</InputGroupText>
                        <InputGroupText id='CitzTotPrem' className="">1111</InputGroupText>
                      </InputGroupAddon>
                      <strong></strong>
                      {/*<Input type="date" id="InceptionDate_SimspleSolve" name="InceptionDate_SimspleSolve" placeholder="Citz Incep Date" />*/}
                    </InputGroup>
                  </Col>
                  <Col md="1" className='mt-1'>
                    {/*<Label htmlFor="ccnumber">EPIC Policy&nbsp;&nbsp;</Label>*/}
                    <Button type="submit" size="sm" color="warning" className="pull-right"><i className="fa fa-search"></i> Epic Policy</Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <PolicyHeader />
                <TabContain />
                <Row>
                  <Col xs="12" sm="5">
                  </Col>
                  <Col xs="12" sm="1">
                    <Button color="info" xl className="btn-brand text-value-sm"><i className="fa fa-check"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rate</Button>
                  </Col>
                  <Col xs="12" sm="2">
                    <InputGroup className="input-prepend">
                      <InputGroupAddon addonType="prepend" className=''>
                        <InputGroupText id='FinalPremium_Temp'><strong>PREMIUM:</strong></InputGroupText>
                        <InputGroupText id='FinalPremium_Temp'><strong>1111</strong></InputGroupText>
                      </InputGroupAddon>
                      {/* <Input type="text" id="FinalPremium_Temp" name="FinalPremium_Temp" placeholder="1111" /> */}
                    </InputGroup>
                  </Col>
                  <Col md="1">
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}































export default CreatQuote;
