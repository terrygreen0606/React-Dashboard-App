import React from 'react';
import { Row, Button, Table, Card, CardHeader, Col, CardBody, Input, CardFooter } from 'reactstrap';

const ClaimLogTab = (props) => {
  return (
    <>
      <Card>
        <CardHeader className="rounded">
          Complaint Management
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <Table size="sm" borderless>
                <tbody>
                  <tr>
                    <td>Case Name</td>
                    <td>
                      <Input type="select" size="sm">
                        <option value="">Select</option>
                        <option value="LAWSUIT"></option>
                        <option value="DFSCOMPLAINT">DFS Complaint</option>
                        <option value="ASSIGNMENTOFBENEFIT">Lawsuit - AOB</option>
                        <option value="CRNGENERAL">CRN - General</option>
                        <option value="CRNAOB">CRN - AOB</option>
                        <option value="BBBCOMPLAINT">BBB Complaint</option>
                      </Input>
                    </td>
                  </tr>
                  <tr>
                    <td>Case Number</td>
                    <td>
                      <Input size="sm" />
                    </td>
                  </tr>
                  <tr>
                    <td>Reference Number</td>
                    <td>
                      <Input size="sm" />
                    </td>
                  </tr>
                  <tr>
                    <td>Document Type</td>
                    <td>
                      <Input type="select" size="sm">
                        <option value="">Select</option>
                        <option value="COMPLAINT">Complaint</option>
                        <option value="MOTION">Motion</option>
                        <option value="OTHERPLEADINGS">Other Pleadings</option>
                        <option value="DISCOVERY">Discovery</option>
                        <option value="STATUSREPORT">Status Report</option>
                        <option value="SETTLEMENT">Settlement</option>
                        <option value="CORRESPONDENCEFORMDC">Correspondence from DC</option>
                        <option value="CORRESPONDENCEFORMOC">Correspondence from OC</option>
                        <option value="RELEASE">Release</option>
                        <option value="DEMAND">Demand</option>
                        <option value="DOCUMENTSRECEIVED">Documents Received</option>
                        <option value="EXPERTREPORT">Expert Report</option>
                        <option value="LEGALCOSTSINVOICE">Legal Costs/Invoices</option>
                        <option value="DFS">DFS</option>
                        <option value="CRN">CRN</option>
                      </Input>
                    </td>
                  </tr>
                  <tr>
                    <td>Assigned To</td>
                    <td>
                      <Input type="select" size="sm">
                        <option value="" selected="selected">Select</option>
                        <option value="24812">FULL NAME</option>
                        <option value="64598">FULL NAME</option>
                        <option value="68382">FULL NAME</option>
                        <option value="68383">FULL NAME</option>
                        <option value="428232">FULL NAME</option>
                        <option value="488501">FULL NAME</option>
                        <option value="418882">FULL NAME</option>
                      </Input>
                    </td>
                  </tr>
                  <tr>
                    <td>Opposing Counsel</td>
                    <td>
                      <Input type="select" size="sm">
                        <option value="" selected="selected">Select</option>
                        <option value="975623">FULL NAME</option>
                        <option value="976513">FULL NAME</option>
                        <option value="957379">FULL NAME</option>
                        <option value="816891">FULL NAME</option>
                        <option value="981816">FULL NAME</option>
                        <option value="417472">FULL NAME</option>
                        <option value="556473">FULL NAME</option>
                        <option value="436977">FULL NAME</option>
                        <option value="939662">FULL NAME</option>
                        <option value="1016173">FULL NAME</option>
                        <option value="1023088">FULL NAME</option>
                      </Input>
                    </td>
                  </tr>
                  <tr>
                    <td>Received Date</td>
                    <td>
                      <Input type="date" size="sm" />
                    </td>
                  </tr>
                  <tr>
                    <td>Demand Amount</td>
                    <td>
                      <Input size="sm" />
                    </td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>
                      <Input type="select" size="sm">
                        <option value="" selected="selected">Select</option>
                        <option value="OPEN">Open</option>
                        <option value="CLOSE">Close</option>
                      </Input>
                    </td>
                  </tr>
                  <tr>
                    <td>Sub Status</td>
                    <td>
                      <Input type="select" size="sm">
                        <option value="CASERECEIVED">Case Received </option>
                        <option value="20DAYRESPCOMPLET">20 Days Response Completed</option>
                        <option value="PENDING">Pending</option>
                        <option value="SETTLE">Settle</option>
                        <option value="WAITFORRELEASE">Waiting For Release</option>
                        <option value="SETTLE_WAITCLOSE">Settle, Waiting For Case Close</option>
                        <option value="INNEGOTIATION">In-negotiation</option>
                        <option value="MEDIATION">Mediation</option>
                        <option value="INHCINNEGO">In House Counsel - In Negotiation</option>
                        <option value="INHCSETTLGRPEN">In House Counsel - Settled GR Pending</option>
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
                    <td>General description of complaint</td>
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
          <Button size="sm" color="primary" className="mr-2">Add Complaint Log</Button>
          <Button size="sm" color="primary" type="reset">Clear</Button>
        </CardFooter>
      </Card>
      <Table size="sm" striped borderless responsive>
        <thead>
          <tr>
            <th>DOC. NAME</th>
            <th>CASE TYPE</th>
            <th>CASE #</th>
            <th>ASSIGNED TO</th>
            <th>RECEIVED DATE</th>
            <th>STATUS</th>
            <th>DESCRIPTION</th>
            <th>ACTION</th>
          </tr>
        </thead>
      </Table>
    </>
  );
}

export default ClaimLogTab;