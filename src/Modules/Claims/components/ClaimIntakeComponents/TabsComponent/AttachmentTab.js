import React, { useState } from 'react';
import {Col,Row, Input, Button, Table, Card, CardHeader, CardFooter, CardBody} from 'reactstrap';

const AttachmentTab = (props) => {
  return (
    <>
      <Card>
        <CardHeader className="rounded">
          Add Attachment
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <Table size="sm" borderless>
                <tbody>
                  <tr>
                    <td>File Name</td>
                    <td><Input size="sm" /></td>
                  </tr>
                  <tr>
                    <td>Authorisation</td>
                    <td>
                      <Input type="select" size="sm">
                        <option value="" selected="selected">Select</option>
                        <option value="Internal">Internal</option>
                        <option value="External">External</option>
                      </Input>
                    </td>
                  </tr>
                  <tr>
                    <td>Attachment Type</td>
                    <td>
                      <Input type="select" size="sm">
                        <option value="" selected="selected">Select</option>
                        <option value="SINGLE">Single File</option>
                        <option value="MULTIPLE">Multiple Files</option>
                      </Input>
                    </td>
                  </tr>
                  <tr>
                    <td>Document Type</td>
                    <td>
                      <Input type="select" size="sm" className="height-500" multiple>
                        <option value="1">Acknowledge form</option>
                        <option value="ASSIGNMENTOFBENEFIT">Assignment Of benefit</option>
                        <option value="ATTORNEYLETTER">Attorney Letter</option>
                        <option value="CIVILREMEDYNOTICE">Civil Remedy Notice</option>
                        <option value="6">Claim Notification</option>
                        <option value="DENIAL">Denial</option>
                        <option value="DFSCOMPLAINT">DFS Complaint</option>
                        <option value="ENGINEERREPORT">Engineer Report</option>
                        <option value="ESTIMATES">Estimates</option>
                        <option value="INITIALCONTACTLETTER">Initial Contact Letter</option>
                        <option value="4">Inspection Report</option>
                        <option value="INVOICE">Invoice</option>
                        <option value="LAWSUIT">Law Suit</option>
                        <option value="LEGALPAYMENT">Legal Payment</option>
                        <option value="LORPLAINTIFFCOUNSEL">LOR Plaintiff Counsel</option>
                        <option value="LORPUBLICADJUSTER">LOR Public Adjuster</option>
                        <option value="2">Loss Report</option>
                        <option value="MOLD_REMED">Mold Remediation Protocol</option>
                        <option value="NEWASSIGNMENTTODEFENSECOUNSEL">New Assignment to Defense Counsel</option>
                        <option value="7">Photos</option>
                        <option value="3">Police Report</option>
                        <option value="POLICYDECLARATIONS">Policy Declarations</option>
                        <option value="PROPERTY_APPRAISAL">Property Appraisal</option>
                        <option value="RECORDEDSTATEMENT">Recorded Statement</option>
                        <option value="5">Repair Estimate</option>
                        <option value="ROR">ROR</option>
                        <option value="RTROFFER">RTR offer</option>
                        <option value="SCOPE_OF_LOSS">Scope of Loss</option>
                        <option value="SETTLEMENTLETTER">Settlement Letter</option>
                        <option value="SETTLEMENTPAYMENT">Settlement Payment</option>
                        <option value="SETTLEMENTTOVENDOR">Settlement To Vendor</option>
                        <option value="SSPOLWITHFORMS">SSPOL with forms</option>
                        <option value="SUBROGATIONDOCS">Subrogation Docs</option>
                        <option value="SUMMONS&amp;COMPLAINT">Summons &amp; Complaint</option>
                        <option value="WITHDRAWREQUEST">Withdraw Request</option>
                      </Input>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col>
              <Table size="sm" borderless>
                <tbody>
                  <tr>
                    <td>Description</td>
                  </tr>
                  <tr>
                    <td>
                      <Input type="textarea" rows="8" />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col>
              <Table size="sm" borderless>
                <tbody>
                  <tr>
                    <td>Document Attach</td>
                  </tr>
                  <tr>
                    <td>
                      <Input type="file" size="sm" multiple />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
        <CardFooter className="text-center">
          <Button size="sm" color="primary" className="mr-2">Add Attachments</Button>
          <Button type="reset" size="sm" color="primary">Clear</Button>
        </CardFooter>
      </Card>
      <Table size="sm" striped borderless responsive>
        <thead>
          <tr>
            <th>ATTC. TYPE</th>
            <th>FILE NAME</th>
            <th>DOC. NAME</th>
            <th>DOC. TYPE</th>
            <th>AUTH</th>
            <th>DESCRIPTION</th>
            <th>USER</th>
            <th>DATE</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>SINGLE</td>
            <td>Under deductible letter</td>
            <td>20190393 Under Deductible.pdf</td>
            <td>Claim Notification</td>
            <td>Internal</td>
            <td>Under deductible letter with estimate</td>
            <td>Adam Hunt</td>
            <td>02-12-2019</td>
            <td><a href="#">Delete</a></td>
          </tr>
          <tr>
            <td>SINGLE</td>
            <td>Recorded Statement</td>
            <td>New Recording 14.m4a</td>
            <td>Recorded Statement</td>
            <td>Internal</td>
            <td>Recorded statement from FA</td>
            <td>Adam Hunt</td>
            <td>02-12-2019</td>
            <td><a href="#">Delete</a></td>
          </tr>
          <tr>
            <td>SINGLE</td>
            <td>NI Estimate</td>
            <td>Estimate - 1619 sw 23rd street .pdf</td>
            <td>Repair Estimate</td>
            <td>Internal</td>
            <td>Estimate submitted by NI</td>
            <td>Adam Hunt</td>
            <td>02-12-2019</td>
            <td><a href="#">Delete</a></td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default AttachmentTab;