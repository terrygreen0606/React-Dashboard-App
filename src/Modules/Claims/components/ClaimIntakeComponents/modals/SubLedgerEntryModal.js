import React, { useState } from 'react';
import { Row, Col, Modal, ModalBody, Button, Input, Card, CardHeader, CardBody, CardFooter, InputGroup, Label, Table } from "reactstrap";

export const SubLedgerEntryModal = (props) => {
	if(!props.isLoading) {
		return(<Modal isOpen={props.isOpen} toggle={props.toggle} className="modal-xl">
			<ModalBody>
		    	<Card>
			    	<CardHeader>
		            	View Sub Ledger Entry
					</CardHeader>
			        <CardBody>
			        	<Table>
				            <tbody>
				            	<tr>
				            		<td style={{'border':'none'}}><b>TRANS#</b></td>
				            		<td style={{'border':'none'}}><b>ACCOUNTING DATE</b></td>
				            		<td style={{'border':'none','width':'16%'}}><b>SUBACCOUNT NAME</b></td>
				            		<td style={{'border':'none'}}><b>DEBIT</b></td>
				            		<td style={{'border':'none'}}><b>CREDIT</b></td>
				            		<td style={{'border':'none'}}><b>POSTED STATUS</b></td>
				            		<td style={{'border':'none'}}><b>POSTED DATE</b></td>
				            		<td style={{'border':'none'}}><b>POSTED BY</b></td>
				            		<td style={{'border':'none'}}><b>POLICYNO</b></td>
				            		<td style={{'border':'none'}}><b>TRANSREFNO</b></td>
				            	</tr>
				            	{
              						props.data.map((item, index) => (
              							<tr>              							
				            				<td style={{'border':'none'}}>{item.Transaction_Number}</td>				            				
				            				<td style={{'border':'none'}}>{item.Accounting_Date}</td>
				            				<td style={{'border':'none'}}>{item.SubAccount_Name}</td>
				            				<td style={{'border':'none'}}>${item.Debit_Amount}</td>
				            				<td style={{'border':'none'}}>${item.Credit_Amount}</td>
				            				<td style={{'border':'none'}}>{item.s_PostedStatus}</td>
				            				<td style={{'border':'none'}}>{item.d_PostedDate}</td>
				            				<td style={{'border':'none'}}>{item.s_ScreenName}</td>
				            				<td style={{'border':'none'}}>{item.Policy_No}</td>
				            				<td style={{'border':'none'}}>{item.s_TransRefNo}</td>
				            			</tr>
              						))
              					}
				        	</tbody>
						</Table>
			        </CardBody>
			        <CardFooter>			            	
						<Button size="sm" color="primary" className="float-right" onClick={() => props.toggle()}>Close</Button>
					</CardFooter>
				</Card>
			</ModalBody>
		</Modal>)
	} else {
		return(
			<Modal isOpen={props.isOpen} toggle={props.toggle} className="modal-md">
		        <ModalBody>
		        	<Card>
				    	<CardHeader>
			            	View Sub Ledger Entry
						</CardHeader>
				        <CardBody>
							<div className="sk-wave">
								<div className="sk-rect sk-rect1"></div>&nbsp;
					            <div className="sk-rect sk-rect2"></div>&nbsp;
					            <div className="sk-rect sk-rect3"></div>&nbsp;
								<div className="sk-rect sk-rect4"></div>&nbsp;
					            <div className="sk-rect sk-rect5"></div>
							</div>
						</CardBody>
					</Card>
		        </ModalBody>
		        <CardFooter>			            	
					<Button size="sm" color="primary" className="float-right" onClick={() => props.toggle()}>Close</Button>
				</CardFooter>
		    </Modal>)
	}
};