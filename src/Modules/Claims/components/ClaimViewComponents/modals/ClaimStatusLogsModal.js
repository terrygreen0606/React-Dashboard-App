import React, { useState } from 'react';
import { Row, Col, Modal, ModalBody, ModalFooter, Button, Input, Card, CardHeader, CardBody, CardFooter, InputGroup, Label, Table } from "reactstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export const ClaimStatusLogsModal = (props) => {

    const options = {
        noDataText: (<i>No data</i>),
        clearSearch: true,
        alwaysShowAllBtns: false,
        withFirstAndLast: false
    }

    const createdByFormat = (cell, row) => {
        return row.created_by.s_ScreenName;
    }

    const udatedByFormat = (cell, row) => {
        return row.created_by.s_ScreenName;
    }

    const statusDateFormat = (cell, row) => {
        return row.Tran_Date1;
    }

    const statusInsertedDateFormat = (cell, row) => {
        return row.Inserted_Date1;
    }

    const claimStatusFormat = (cell, row) => {
        return row.Tran_Type_Code;
    };

    const claimSubStatusFormat = (cell, row) => {
        return row.Tran_SubType_Code_Text;
    };

    const indexN = (cell, row, enumObject, index) => {
        return (<div>{index+1}</div>) 
    };

	return(
		<Modal isOpen={props.isOpen} toggle={props.toggle} className="modal-xl">
	        <ModalBody>
	          	<Card>
		            <CardHeader>
	              		Claim Status Logs
		            </CardHeader>
		            <CardBody>
                        <BootstrapTable data={props.claim.status_logs} version="4" borderless striped hover pagination search_ options={options} className="table-sm">
                            <TableHeaderColumn isKey={true} dataField="any" dataFormat={indexN}>#</TableHeaderColumn>
                            <TableHeaderColumn dataField="Tran_Type_Code" dataSort={true} dataFormat={claimStatusFormat} >CLAIM STATUS</TableHeaderColumn>
                            <TableHeaderColumn dataField="Tran_SubType_Code_Text" dataSort={true} dataFormat={claimSubStatusFormat} >CLAIM SUB STATUS</TableHeaderColumn>
                            <TableHeaderColumn dataField="Tran_Date1" dataSort={true} dataFormat={statusDateFormat} >CLAIM STATUS DATE</TableHeaderColumn>
                            <TableHeaderColumn dataField="created_by" dataSort={true} dataFormat={udatedByFormat} >UPDATED BY</TableHeaderColumn>
                            <TableHeaderColumn dataField="Inserted_Date1" dataSort={true} dataFormat={statusInsertedDateFormat} >UPDATED ON</TableHeaderColumn>
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