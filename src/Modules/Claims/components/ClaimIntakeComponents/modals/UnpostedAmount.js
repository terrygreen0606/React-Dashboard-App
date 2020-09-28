import React, { useState } from 'react';
import { Row, Col, Modal, ModalBody, Button, Input, Card, CardHeader, CardBody, CardFooter, InputGroup, Label, Table } from "reactstrap";

export const UnpostedAmount = (props) => {
	if(!props.isLoading) {
		return(<Modal isOpen={props.isOpen} toggle={props.toggle} className="modal-md">
			<ModalBody>
		    	<Card>
			    	<CardHeader>
		            	Unposted Transactions
					</CardHeader>
			        <CardBody>
			        	<Table>
				            <tbody>
				            	<tr>
				            		<td style={{'border':'none'}}><b>BATCH TYPE</b></td>
				            		<td style={{'border':'none'}}><b>BATCH NO</b></td>
				            		<td style={{'border':'none'}}><b>AMOUNT</b></td>
				            		<td style={{'border':'none'}}><b>REF. NO</b></td>
				            	</tr>
				            	{
              						props.data.map((item, index) => (
              							<tr>              							
				            				<td style={{'border':'none'}}>{item.s_PABatchNo}</td>
				            				<td style={{'border':'none'}}>{item.s_BatchTranTypeCode}</td>
				            				<td style={{'border':'none','text-align':'right'}}>${item.n_FullAmount}</td>
				            				<td style={{'border':'none'}}>{item.s_TranRefNo}</td>
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
			            	Unposted Transactions
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