import React, { Component } from 'react';
import {
  Col,
  Row,
  InputGroup,
  Input,
  Label
} from 'reactstrap';

import { AppSwitch } from '@coreui/react';
import Select from "react-select";
import {InputAdapter, TextMask} from "react-text-mask-hoc";

class AgencyMain extends Component {
  render() {
    const {
      employee_arr,
      docGroup_arr,
      deposit_arr,
    } = this.props;
    return (
      <div className="animated fadeIn">
        <Row className="float-center">
          <Col className="pr-1">
            <h4 className="font-italic font-weight-bold">
              <InputGroup>
                <Label className="mr-2" for="s_PersonUniqueId">Agency Code:</Label>
                <Input
                  type="text"
                  id="s_PersonUniqueId"
                  name="s_PersonUniqueId"
                  value={this.props.agencyInfo.s_PersonUniqueId}
                  className="input-sm"
                  placeholder=""
                  onChange={this.props.handleChange}
                  onBlur={this.handleBlur}
                  required
                  readOnly = {this.props.agencyId != 0 ? true:false}
                />
              </InputGroup>
            </h4>
          </Col>
          <Col className="pr-1">
            <h4 className="font-italic font-weight-bold">
              <InputGroup>
                <Label className="mr-2" for="s_PersonUniqueId">Agency Name:</Label>
                <Input
                  type="text"
                  id="s_LastOrganizationName"
                  name="s_LastOrganizationName"
                  value={this.props.agencyInfo.s_LastOrganizationName}
                  className="input-sm"
                  placeholder=""
                  onChange={this.props.handleChange}
                  onBlur={this.handleBlur}
                  required
                />
              </InputGroup>
            </h4>
          </Col>
          <Col className="pr-1">
            <h4 className="font-weight-bold">
              <InputGroup>
                <Label className="mr-2" for="doc_n_docgroupId_FK">Select Group:</Label>
                <Input
                  type="select"
                  name="doc_n_docgroupId_FK"
                  id="doc_n_docgroupId_FK"
                  onChange={this.props.handleChange}
                  onBlur={this.handleBlur}
                  value={this.props.agencyInfo.doc_n_docgroupId_FK}
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
                  value={this.props.agencyInfo.role_n_UWAssigned}
                  onChange={this.props.handleChange}
                  onBlur={this.handleBlur}
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
                <Label className="mr-2" for="s_PayeeName">EFT Payee Name:</Label>
                <Input
                  type="text"
                  id="s_PayeeName"
                  name="s_PayeeName"
                  value={this.props.agencyInfo.s_PayeeName}
                  className="input-sm"
                  placeholder=""
                  onChange={this.props.handleChange}
                  onBlur={this.handleBlur}
                  required
                />
              </InputGroup>
            </h4>
          </Col>
          <Col className="pr-1">
            <h4 className="font-italic font-weight-bold">
              <InputGroup>
                <Label className="mr-2" for="s_PersonStatusCode">Agency Status:</Label>
                <Input
                  type="select"
                  name="s_PersonStatusCode"
                  id="s_PersonStatusCode"

                  onChange={this.props.handleChange}
                  onBlur={this.handleBlur}
                  value = {this.props.agencyInfo.s_PersonStatusCode}
                  required
                >
                  <option value="">-Select-</option>
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                </Input>
              </InputGroup>
            </h4>
          </Col>
          <Col className="pr-1"></Col>
          <Col className="pr-1"></Col>
        </Row>
        <Row className="float-center">
          <Col className="pr-1">
            <h4 className="font-italic font-weight-bold">
              <InputGroup>
                <Label className="mr-2" for="s_DBAName">DBA Name:</Label>
                <Input
                  type="text"
                  id="s_DBAName"
                  name="s_DBAName"
                  value={this.props.agencyInfo.s_DBAName}
                  className="input-sm"
                  placeholder=""
                  onClick={this.props.handleClick}
                  onChange={this.props.handleChange}
                  onBlur={this.handleBlur}
                  required
                />
              </InputGroup>
            </h4>
          </Col>
          {this.props.agencyInfo.s_PersonStatusCode == "Closed" &&
          <Col className="pr-1">
            <h4 className="font-italic font-weight-bold">
              <InputGroup>
                <Label className="mr-2" for="s_PaActivityLogNotes">Closed Reason:</Label>
                <Input
                  type="text"
                  id="s_PaActivityLogNotes"
                  name="s_PaActivityLogNotes"
                  value={this.props.agencyInfo.s_PaActivityLogNotes}
                  className="input-sm"
                  placeholder=""
                  onChange={this.props.handleChange}
                  required
                />
              </InputGroup>
            </h4>
          </Col>
          }
          <Col className="pr-1">
            <h4 className="font-weight-bold">
              <InputGroup>
                <Label className="mr-2" for="s_SSNNo">FEIN Number:</Label>
              {/*  <Input*/}
              {/*    type="text"*/}
              {/*    id="s_SSNNo"*/}
              {/*    name="s_SSNNo"*/}
              {/*    value=""*/}
              {/*    className="input-sm"*/}
              {/*    placeholder=""*/}
              {/*    required*/}
              {/*  />*/}

                <TextMask
                  mask={[/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                  Component={InputAdapter}
                  className="form-control"
                  type="text"
                  id="s_SSNNo"
                  name="s_SSNNo"
                  value={this.props.agencyInfo.s_SSNNo}
                  placeholder=""
                  onChange={this.props.handleChange}
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
                  value={this.props.agencyInfo.role_n_ServiceRep}
                  onChange={this.props.handleChange}
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

export default AgencyMain;
