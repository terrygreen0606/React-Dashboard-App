import React, { useState } from 'react';
import { Row, Col, Modal, ModalBody, ModalFooter, Button, Input, Card, CardHeader, CardBody, CardFooter, InputGroup, Label, Table } from "reactstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export const ClaimReviewLogsModal = (props) => {

    const options = {
        noDataText: (<i>No data</i>),
        clearSearch: true,
        alwaysShowAllBtns: false,
        withFirstAndLast: false
    }

    const indexN = (cell, row, enumObject, index) => {
        return (<div>{index+1}</div>) 
    };

	return(
		<Modal isOpen={props.isOpen} toggle={props.toggle} className="modal-xl">
	        <ModalBody>
	          	<Card>
		            <CardHeader>
	              		Claim Review Status Logs
		            </CardHeader>
		            <CardBody>
                        <BootstrapTable data={props.claim.reviewsLog} version="4" borderless striped hover pagination search_ options={options} className="table-sm">
                            <TableHeaderColumn isKey={true} dataField="any" dataFormat={indexN}>#</TableHeaderColumn>
                            <TableHeaderColumn dataField="main_s_AppCodeNameForDisplay">REVIEW STATUS</TableHeaderColumn>
                            <TableHeaderColumn dataField="sub_s_AppCodeNameForDisplay">REVIEW SUB STATUS</TableHeaderColumn>
                            <TableHeaderColumn dataField="d_ReviewedDate">REVIEW DATE</TableHeaderColumn>
                        </BootstrapTable>
		            </CardBody>
            	</Card>
            </ModalBody>
            <ModalFooter>
            <Button size="sm" color="primary" className="float-right" onClick={ props.toggle }>Close</Button>
            </ModalFooter>
       	</Modal>
	)
}