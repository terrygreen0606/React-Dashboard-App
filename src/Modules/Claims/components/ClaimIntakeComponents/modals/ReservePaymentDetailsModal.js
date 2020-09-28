import React, { useState } from 'react';
import { Row, Col, Modal, ModalBody, Button, Input, Card, CardHeader, CardBody, CardFooter, InputGroup, Label, Table } from "reactstrap";

export const ReservePaymentDetailsModal = (props) => {
	if(!props.isLoading) {
		return(
			<>
			<Modal isOpen={props.isOpen} toggle={props.toggle} className="modal-md">
				<ModalBody>
			    	<Card>
				    	<CardHeader>
			            	Reserves And Payment Details
						</CardHeader>
				        <CardBody>
				        	<Table>
				            	<tbody>
				            		<tr>
				            			<td colspan="2" style={{'border':'none'}}><h5>{props.data.Tran_Type_Code}</h5></td>
				            		</tr>

				            		{
	              						props.data.map((item, index) => (
	              							<tr>
						            			<td style={{'border':'none'}}>{item.CoverageName}</td>
						            			{item.Tran_Type_Code == "Loss Payment" && (<td style={{'color':'red', 'border':'none'}}>${item.n_Amount}</td>)}
						            			{item.Tran_Type_Code != "Loss Payment" && (<td style={{'border':'none'}}>${item.n_Amount}</td>)}
					            			</tr>
										))
				            		}

				            		<tr>
				            			<td><b>Total Reserve:</b></td>
				            			{props.totalReservedata.Tran_Type_Code == "Loss Payment" && (<td style={{'color':'red'}}><b>${props.totalReservedata.TotalReserveAmount}</b></td>)}
				            			{props.totalReservedata.Tran_Type_Code != "Loss Payment" && (<td><b>${props.totalReservedata.TotalReserveAmount}</b></td>)}
				            		</tr>
				            	</tbody>
				            </Table>
				        </CardBody>
				        <CardFooter>			            	
							<Button size="sm" color="primary" className="float-right" onClick={() => props.toggle()}>Close</Button>
			            </CardFooter>
					</Card>
				</ModalBody>
			</Modal></>)
	} else {
		return(
			<><Modal isOpen={props.isOpen} toggle={props.toggle} className="modal-md">
		        <ModalBody>
		        	<Card>
				    	<CardHeader>
				    		Reserves And Payment Details
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
						<CardFooter>			            	
							<Button size="sm" color="primary" className="float-right" onClick={() => props.toggle()}>Close</Button>
			            </CardFooter>
					</Card>
		        </ModalBody>
		    </Modal></>)
	}
};