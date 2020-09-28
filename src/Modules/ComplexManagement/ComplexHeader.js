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
class ComplexHeader extends Component {
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
      <Row>
        <Col xs="12" sm="2">
          <InputGroup className="input-prepend">
            <Label id='QuoteNo' className=""><i className="cui-home icons"></i>&nbsp;Zip</Label>
          </InputGroup>
          <Input type="text" name="ZipCode" id="ZipCode" placeholder="Zip Code" />
        </Col>
        <Col xs="12" sm="2">
          <InputGroup className="input-prepend">
            <Label id='QuoteNo' className=""><i className="cui-pin icons"></i>&nbsp;Complex Name</Label>
          </InputGroup>
          <Input type="text" name="ComplexName" id="ComplexName" placeholder="Complex Name" />
        </Col>
        <Col xs="12" sm="1" className='mt-4'>
          <Button type="submit" size="" color="success" className="pull-left btn-md"><i className="fa fa-Search"></i>&nbsp;Search</Button>
        </Col>
      </Row>
    );
  }
}
export default ComplexHeader;