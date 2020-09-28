import React, {Component} from 'react';
import { Row, Col, Modal, ModalBody, Button, Input, Card, CardHeader, CardBody, InputGroup, Label, Table } from "reactstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';

import {log_data} from '../TestData/LogData';

class LogModal extends Component {
  constructor (props) {
    super(props);
    this.setTab = this.setTab.bind(this);
    this.state = {
      status: 'view_log',
      value: ''
    };
  }

  setTab (tab) {
    this.setState({
      status: tab
    });
  }
  render() {
    const options = {
      page: 1,
      sizePerPageList: [
        { text: '10', value: 10 },
        { text: '20', value: 20 },
        { text: '25', value: 25 },
        { text: '30', value: 30 },
        { text: '50', value: 50 }
      ],
      sizePerPage: 10,
      pageStartIndex: 1,
    };
    const modules = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']                                         // remove formatting button
      ]
    }
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="modal-xl">
        <ModalBody>
          <Card>
            <CardHeader>
              { this.state.status == 'view_log' ? 'Inbox' : 'Add New' }
              <div className="float-right">
                <a href="#" className="text-white" onClick={() => this.setTab('view_log')}>View Log</a>
                &nbsp;|&nbsp;
                <a href="#" className="text-white" onClick={() => this.setTab('add_log')}>Add New</a>
              </div>
            </CardHeader>
            <CardBody>
              {
                this.state.status == 'view_log' ? (
                  <>
                    <Row>
                      <Col md='4' sm='6'>
                        <InputGroup>
                          <Label for="FilterByFlag">Filter By Gen.:</Label>
                          <Input type="select" name="FilterByFlag" id="FilterByFlag" size="sm">
                            <option value="">All</option>
                            <option value="USER">User Generated</option>
                            <option value="SYSTEM">System Generated</option>
                          </Input>
                        </InputGroup>
                      </Col>
                      <Col md='4' sm='6'>
                        <InputGroup>
                          <Label for="FilterByFlagStatus">Filter By Status:</Label>
                          <Input type="select" name="FilterByFlagStatus" id="FilterByFlagStatus" size="sm">
                            <option value="" selected="">All</option>
                            <option value="OPEN">Open</option>
                            <option value="PENDING">Pending</option>
                            <option value="CLOSED">Closed</option>
                          </Input>
                        </InputGroup>
                      </Col>
                      <Col md='4' sm='6'>
                        <InputGroup>
                          <Label for="ReadUnreadFlag">Display:</Label>
                          <Input type="select" name="ReadUnreadFlag" id="ReadUnreadFlag" size="sm">
                            <option value="">All</option>
                            <option value="U">Unread</option>
                            <option value="R">Read</option>
                          </Input>
                        </InputGroup>
                      </Col>
                      <Col md='4' sm='6'>
                        <InputGroup>
                          <Label for="ActionGenerateFlag">Action:</Label>
                          <Input type="select" name="ActionGenerateFlag" id="ActionGenerateFlag" size="sm">
                            <option value="">None</option>
                            <option value="U">Mark as Unread</option>
                            <option value="R">Mark as Read</option>
                          </Input>
                        </InputGroup>
                      </Col>
                      <Col md='4' sm='6'>
                        <InputGroup>
                          <Label for="ScheduledFrom">From:</Label>
                          <Input type="date" name="ScheduledFrom" id="ScheduledFrom" size="sm" />
                        </InputGroup>
                      </Col>
                      <Col md='4' sm='6'>
                        <InputGroup>
                          <Label for="ScheduledTo">To:</Label>
                          <Input type="date" name="ScheduledTo" id="ScheduledTo" size="sm" />
                        </InputGroup>
                      </Col>
                      <Col md='4' sm='6'>
                        <Button size="sm" color="primary">Filter</Button>
                      </Col>
                    </Row>
                    <BootstrapTable data={log_data} striped condensed hover options={options}>
                      <TableHeaderColumn isKey dataField="from" dataSort>FROM</TableHeaderColumn>
                      <TableHeaderColumn dataField="subject" dataSort>SUBJECT</TableHeaderColumn>
                      <TableHeaderColumn dataField="type" dataSort>TYPE</TableHeaderColumn>
                      <TableHeaderColumn dataField="name" dataSort>NAME</TableHeaderColumn>
                      <TableHeaderColumn dataField="source" dataSort>SOURCE</TableHeaderColumn>
                      <TableHeaderColumn dataField="date" dataSort>DATE</TableHeaderColumn>
                      <TableHeaderColumn dataField="scheduled_date" dataSort>SCHEDULED DATE</TableHeaderColumn>
                      <TableHeaderColumn dataField="status" dataSort>STATUS</TableHeaderColumn>
                    </BootstrapTable>
                  </>
                ) : (
                  <>
                    <Table size="sm" borderless responsive>
                      <tbody>
                        <tr>
                          <td width="20%">From</td>
                          <td>
                            <Input name="MessageFromUser" id="MessageFromUser" size="sm" value="Admin" disabled />
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>To</td>
                          <td>
                            <Input name="MessageToUser" id="MessageToUser" size="sm" disabled />
                          </td>
                          <td>
                            <Button size="sm" color="primary">Get Recipient</Button>
                          </td>
                        </tr>
                        <tr>
                          <td>Subject</td>
                          <td>
                            <Input name="MessageSubject" id="MessageSubject" size="sm" />
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Activity Authorization</td>
                          <td className="pl-4">
                            <Label check className="mr-5">
                              <Input type="radio" name="ActivityAuthorisation" class="ActivityAuthorisation" id="ActivityAuthorisationInternal" value="Internal" />
                              {' '}Internal
                            </Label>
                            <Label check>
                              <Input type="radio" checked name="ActivityAuthorisation" class="ActivityAuthorisation" id="ActivityAuthorisationExternal" value="External" />
                              {' '}External{'  '}
                            </Label>
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Scheduled Date</td>
                          <td>
                            <Input type="date" size="sm" name="ScheduledDate" id="ScheduledDate" />
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Document Type</td>
                          <td className="pl-4"  colSpan="2" >
                            <Table size="sm" responsive borderless>
                              <tbody>
                                <tr>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="1" />{' '}
                                      Inspection Report
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="2" />{' '}
                                      Police Report
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="3" />{' '}
                                      Letter of Acknowledgement
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="4" />{' '}
                                      Signed Application
                                    </Label>
                                  </td>
                                </tr>
                                <tr>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="5" />{' '}
                                      Four Point Inspection
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="6" />{' '}
                                      Wind Mitigation Inspection
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="7" />{' '}
                                      Photos
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="8" />{' '}
                                      Avatar Inspection
                                    </Label>
                                  </td>
                                </tr>
                                <tr>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="9" />{' '}
                                      Proof of Prior Insurance
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="10" />{' '}
                                      HUD Statement
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="11" />{' '}
                                      Loss History - lexis Nexis
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="12" />{' '}
                                      Loss History - A plus
                                    </Label>
                                  </td>
                                </tr>
                                <tr>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="13" />{' '}
                                      Fire Alarm certificate
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="14" />{' '}
                                      Burglar Alarm Certificate
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="15" />{' '}
                                      Fire & Burglar Alarm Certificate
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="16" />{' '}
                                      Driver's License
                                    </Label>
                                  </td>
                                </tr>
                                <tr>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="17" />{' '}
                                      Endorsement Request
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="18" />{' '}
                                      Animal Liability Exclusion form Signed
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="19" />{' '}
                                      Sinkhole Coverage Exclusion form signed
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="20" />{' '}
                                      Building Law & Ordination coverage selection form Signed
                                    </Label>
                                  </td>
                                </tr>
                                <tr>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="21" />{' '}
                                      Building Permit records
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="22" />{' '}
                                      Roof permit records
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="23" />{' '}
                                      County Appraisal records
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="30" />{' '}
                                      Return Mail PH
                                    </Label>
                                  </td>
                                </tr>
                                <tr>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="35" />{' '}
                                      Return Mail MTG
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="40" />{' '}
                                      Email from Agent
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="45" />{' '}
                                      Email from PH
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="50" />{' '}
                                      Complaint
                                    </Label>
                                  </td>
                                </tr>
                                <tr>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="55" />{' '}
                                      POP
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="57" />{' '}
                                      Reissue Refund Check Request
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="58" />{' '}
                                      Reissue Claim Check Request
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="59" />{' '}
                                      Reissue Commission Check Request
                                    </Label>
                                  </td>
                                </tr>
                                <tr>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="24" />{' '}
                                      Others
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="56" />{' '}
                                      Property Appraisal
                                    </Label>
                                  </td>
                                  <td width="25%">
                                    <Label check>
                                      <Input type="checkbox" size="sm" name="DocAttachmentType" value="60" />{' '}
                                      Claim Supporting Document
                                    </Label>
                                  </td>
                                  <td width="25%">
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </td>
                        </tr>
                        <tr>
                          <td>Attachment</td>
                          <td colSpan="2">
                            <Input type="file" multiple size="sm" name="documentAttachment" />
                          </td>
                        </tr>
                        <tr>
                          <td>Doc Authorization</td>
                          <td className="pl-4">
                            <Label check className="ml-2 mr-5">
                              <Input type="radio" name="documentAuthorisation" class="documentAuthorisation" id="documentAuthorisationInternal" value="Internal" />
                              {' '}Internal
                            </Label>
                            <Label check>
                              <Input type="radio" checked name="documentAuthorisation" class="documentAuthorisation" id="documentAuthorisationExternal" value="External" />
                              {' '}External{'  '}
                            </Label>
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td colSpan="3" >
                            <ReactQuill value={this.state.value} modules={modules} />  
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td className="text-center">
                            <Button size="sm" color="primary">Save Activity</Button>
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </Table>
                  </>
                )
              }
              
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    );
  }
}

export default LogModal;