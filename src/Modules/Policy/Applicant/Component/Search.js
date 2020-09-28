import React, {Component} from 'react';
import {Col, Row, Input, Label, InputGroup} from 'reactstrap';


class Search extends Component {
  render () {
    return (
      <Row>
        <Col xs="12" sm="12" lg="12" className=" input-search-fields mt-4">
          <Row>
            <Col lg="3" md="6" sm="12">
              <InputGroup>
                <Label for="Last_Name">Last Name :</Label>
                <Input name="Last_Name" id="Last_Name" size="sm" type="text" />
              </InputGroup>
            </Col>
            <Col lg="3" md="6" sm="12">
              <InputGroup className="row">
                <Label for="First_Name">First Name :</Label>
                <Input name="First_Name" id="First_Name" size="sm" type="text" />
              </InputGroup>
            </Col>
            <Col lg="3" md="6" sm="12">
              <InputGroup className="row">
                <Label for="Policy_No">Policy No :</Label>
                <Input name="Policy_No" id="Policy_No" size="sm" type="text" />
              </InputGroup>
            </Col>
            <Col lg="3" md="6" sm="12">
              <InputGroup className="row">
                <Label for="Address_Search">Propty Addr :</Label>
                <Input name="Address_Search" id="Address_Search" size="sm" type="text" />
              </InputGroup>
            </Col>
          </Row>
        </Col>
      </Row>
    ); 
  }
}

export default Search;