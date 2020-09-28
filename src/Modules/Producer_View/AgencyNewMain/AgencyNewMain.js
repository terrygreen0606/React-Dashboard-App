import React, { Component } from 'react';
import {
  Col,
  Row,
  InputGroup,
  Input,
  Label
} from 'reactstrap';

import { AppSwitch } from '@coreui/react';

class AgencyNewMain extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row className="float-center">
          <Col className="pr-1">
            <h4 className="font-italic font-weight-bold">
              <InputGroup>
                <Label className="mr-2" for="s_PersonUniqueId">Agency Name:</Label>
                <Input size="sm" type="text" name="s_LastOrganizationName" id="s_LastOrganizationName" />
              </InputGroup>
            </h4>
          </Col>
          <Col className="pr-1">
            <h4 className="font-italic font-weight-bold">
              <InputGroup>
                <Label className="mr-2" for="s_PersonUniqueId">Agency Code:</Label>
                <Input size="sm" type="text" name="s_PersonUniqueId" id="s_PersonUniqueId" className="gray-input" />
              </InputGroup>
            </h4>
          </Col>
          <Col className="pr-1">
            <h4 className="font-weight-bold">
              <InputGroup>
                <Label className="mr-2" for="doc_n_docgroupId_FK">Select group:</Label>
                <Input 
                  type="select" 
                  name="doc_n_docgroupId_FK" 
                  id="doc_n_docgroupId_FK" 
                  bsSize="sm" 
                  defaultValue=""
                >
                  <option value="">Select Group</option>
                  {this.props.docGroup_arr.map((docGroup, index) => (
                    <option key={index} value={docGroup.n_docgroupname_PK}>
                      {docGroup.s_docgroupname}
                    </option>
                  ))}
                </Input>
              </InputGroup>
            </h4>
          </Col>
          <Col className="pr-1">
            <h4 className="font-weight-bold">
              <InputGroup>
                <Label className="mr-2" for="uw_assign">U/W Assign:</Label>
                <Input 
                  type="select" 
                  name="role_n_UWAssigned" 
                  id="role_n_UWAssigned" 
                  bsSize="sm" 
                  value=""
                >
                  <option value="">Select U/W</option>
                  {this.props.employee_arr.map((employee, index) => (
                    <option key={index} value={employee.Admin_ID}>
                      {employee.s_ScreenName}
                    </option>
                  ))}
                </Input>
              </InputGroup>
            </h4>
          </Col>
        </Row>
        <Row className="float-center">
          <Col className="pr-1">
            <h4 className="font-italic font-weight-bold">
              <InputGroup>
                <Label className="mr-2" for="s_PayeeName">EFT Payee name:</Label>
                <Input size="sm" type="text" name="s_PayeeName" id="s_PayeeName" />
              </InputGroup>
            </h4>
          </Col>
          <Col className="pr-1"></Col>
          <Col className="pr-1"></Col>
          <Col className="pr-1"></Col>
        </Row>
        <Row className="float-center">
          <Col className="pr-1">
            <h4 className="font-italic font-weight-bold">
            <InputGroup>
                <Label className="mr-2" for="s_DBAName">DBA:</Label>
                <Input size="sm" type="text" name="s_DBAName" id="s_DBAName" />
              </InputGroup>
            </h4>
          </Col>
          <Col className="pr-1">
          </Col>
          <Col className="pr-1">
            <h4 className="font-weight-bold">
              <InputGroup>
                <Label className="mr-2" for="s_SSNNo">FEIN Number:</Label>
                <Input 
                  bsSize="sm" 
                  type="text" 
                  id="s_SSNNo" 
                  name="s_SSNNo" 
                  value=""
                  className="input-sm" 
                  placeholder="" 
                  required 
                />
              </InputGroup>
            </h4>
          </Col>
          <Col className="pr-1">
            <h4 className="font-weight-bold">
              <InputGroup>
                <Label className="mr-2" for="service_rep">Service Rep:</Label>
                <Input 
                  type="select" 
                  name="role_n_ServiceRep" 
                  id="role_n_ServiceRep" 
                  bsSize="sm" 
                  value=""
                >
                  <option value="">Select Service Rep</option>
                  {this.props.employee_arr.map((employee, index) => (
                    <option key={index} value={employee.Admin_ID}>
                      {employee.s_ScreenName}
                    </option>
                  ))}
                </Input>
              </InputGroup>
            </h4>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AgencyNewMain;
