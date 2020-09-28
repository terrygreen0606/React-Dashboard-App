import React, {Component} from 'react';
import { Modal, ModalBody, Card, CardHeader, CardBody, Button, Form, Row, Col, InputGroup, Label, Input } from "reactstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import {attachment_data} from '../TestData/AttachmentData';
import { makeDataTableActionLink } from "../../../../services/commanServices";

class AttachmentModal extends Component {

  constructor (props) {
    super(props);
    this.actionsButtons = this.actionsButtons.bind(this);
    this.toggleUploadForm = this.toggleUploadForm.bind(this);
    this.state = {
      showForm: false
    }
  }
  actionsButtons(cell, row) {
    return makeDataTableActionLink(cell, row);
  }
  toggleUploadForm(e) {
    this.setState({
      showForm: !this.state.showForm
    })
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
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="modal-xl">
        <ModalBody>
          <Card>
            <CardHeader>
              Attachments
              <Button size="sm" color="primary" className="pull-right" onClick={this.toggleUploadForm}><i className="cui-cloud-upload icons"></i></Button>
            </CardHeader>
            <CardBody>
              {
                this.state.showForm && (
                  <>
                    <Row>
                      <Col>
                        <InputGroup>
                          <Label className="mr-2">Authorization</Label>
                          <Input type="select" name="documentAuthorisation">
                            <option>Internal</option>
                            <option>External</option>
                          </Input>
                        </InputGroup>
                      </Col>
                      <Col>
                        <InputGroup>
                          <Label className="mr-2">Document Type</Label>
                          <Input type="select" name="DocAttachmentType[]" multiple>
                            <option>Inspection Report</option>
                            <option>Police Report</option>
                            <option>Letter Of Arknowledgement</option>
                            <option>Signed Application</option>
                            <option>Four Point Inspection</option>
                          </Input>
                        </InputGroup>
                      </Col>
                      <Col>
                        <Input type="file" multiple />
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col className="text-center">
                        <Button size="sm" color="primary">Attach Documents</Button>
                        <p className="text-left text-danger">(Please note this attachment will NOT send notice underwriting for processing. Underwriting requests must be may in the Activity Log with the recipient being your assigned underwriter. Feel to contact us if you need assistance. Thank you for your support!)</p>
                      </Col>
                    </Row>
                  </>
                )
              }
              
              <BootstrapTable data={attachment_data} striped hover options={options}>
                <TableHeaderColumn isKey dataField="sl_no" dataSort>SL NO</TableHeaderColumn>
                <TableHeaderColumn dataField="filename" dataSort dataFormat={this.actionsButtons}>FILE NAME</TableHeaderColumn>
                <TableHeaderColumn dataField="source" dataSort>SOURCE</TableHeaderColumn>
                <TableHeaderColumn dataField="inserted_by" dataSort>INSERTED BY</TableHeaderColumn>
                <TableHeaderColumn dataField="doc_type" dataSort>DOC TYPE</TableHeaderColumn>
                <TableHeaderColumn dataField="inserted_date" dataSort>INSERTED DATE</TableHeaderColumn>
              </BootstrapTable>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    );
  }
}

export default AttachmentModal;