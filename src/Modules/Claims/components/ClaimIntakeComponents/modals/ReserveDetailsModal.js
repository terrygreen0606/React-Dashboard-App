import React, { useState } from 'react';
import { Row, Col, Modal, ModalBody, Button, Input, Card, CardHeader, CardBody, CardFooter, InputGroup, Label, Table } from "reactstrap";
import {Control } from 'react-redux-form';

export const ReserveDetailsModal = (props) => {
	const [voidSelectedReason, setVoidSelectedReason] = useState('');

	const voidReasonChange = (e) =>{
		setVoidSelectedReason(e.target.value);
	}

	const voidPaymentOptions = [];
	voidPaymentOptions.push(<option value="">Select Reason</option>);
	for(let i in props.paymentReasons){
		voidPaymentOptions.push(<option value={i}>{props.paymentReasons[i]}</option>);
	}
	

	if(!props.isLoading && props.data.claimReserveData) {
		return(<Modal isOpen={props.isOpen} toggle={props.toggle} className="modal-md">
			<ModalBody>
		    	<Card>
			    	<CardHeader>
		            	Reserve Information
					</CardHeader>
			        <CardBody>
			        	<Table>
				            <tbody>
				            	<tr>
				            		<td style={{'border':'none'}}><b>Reference No:&nbsp;</b></td>
				            		<td style={{'border':'none'}}>{props.data.claimReserveData.Claim_No}</td>
				            	</tr>

				            	<tr>
				            		<td style={{'border':'none'}}><b>Date:&nbsp;</b></td>
				            		<td style={{'border':'none'}}>{props.data.claimReserveData.Reserve_Date1}</td>
				            	</tr>

				            	<tr>
				            		<td style={{'border':'none'}}><b>Transaction Type:&nbsp;</b></td>
				            		<td style={{'border':'none'}}>{props.data.claimReserveData.Tran_Type_Code}</td>
				            	</tr>

				            	<tr>
				            		<td style={{'border':'none'}}><b>Transaction Sub Type:&nbsp;</b></td>
				            		<td style={{'border':'none'}}>{props.data.claimReserveData.Tran_SubType_Code}</td>
				            	</tr>

				            	<tr>
				            		<td style={{'border':'none'}}><b>Description:&nbsp;</b></td>
				            		<td style={{'border':'none'}}>{props.data.claimReserveData.Reserve_Description}</td>
				            	</tr>

				            	<tr>
				            		<td style={{'border':'none'}}><b>Memo On Check:&nbsp;</b></td>
				            		<td style={{'border':'none'}}>{props.data.claimReserveData.s_Memo}</td>
				            	</tr>

				            	<tr>
				            		<td style={{'border':'none'}}><b>Payee Name:&nbsp;</b></td>
				            		<td style={{'border':'none'}}>{props.data.claimReserveData.Payee_Name}</td>
				            	</tr>

				            	<tr>
				            		<td style={{'border':'none'}}><b>Check Number:&nbsp;</b></td>
				            		<td style={{'border':'none'}}>{props.data.claimReserveData.Check_No}</td>
				            	</tr>

				            	<tr>
				            		<td style={{'border':'none'}}><b>Printed:&nbsp;</b></td>
				            		<td style={{'border':'none'}}>{props.data.claimReserveData.Printed_YN}</td>
				            	</tr>

				            	<tr>
				            		<td style={{'border':'none'}}><b>Printed Date:&nbsp;</b></td>
				            		<td style={{'border':'none'}}>{props.data.claimReserveData.Printed_Date1}</td>
				            	</tr>

				            	<tr>
				            		<td style={{'border':'none'}}><b>Printed By:&nbsp;</b></td>
				            		<td style={{'border':'none'}}>{props.data.claimReserveData.s_ScreenName}</td>
				            	</tr>

				            	<tr>
				            		<td style={{'border':'none'}}><b>Payment Status:&nbsp;</b></td>
				            		{props.data.claimReserveData.PaymentApproved=="Approved" && (<td style={{'border':'none', 'color':'green'}}>{props.data.claimReserveData.PaymentApproved}</td>)}
				            		{props.data.claimReserveData.PaymentApproved!="Approved" && (<td style={{'border':'none', 'color':'red'}}>{props.data.claimReserveData.PaymentApproved}</td>)}
				            	</tr>

				            	{ props.data.claimReserveData.status == 'VOID' && (
				            		<tr>
								        <td style={{'border':'none'}}><b>Reason For Void:</b></td>
								        <td style={{'border':'none','color':'red'}}>{props.data.claimReserveData.VoidReason}</td>
								    </tr>
								)}

				            	{(props.data.claimReserveData.PaymentApproved=="Approved" || props.data.claimReserveData.PaymentApproved=="Unapproved") && (<><tr>
				            		<td style={{'border':'none'}}><b>Approved By:&nbsp;</b></td>
				            		<td style={{'border':'none'}}>{props.data.claimReserveData.s_FullLegalName}</td>
				            	</tr>

				            	<tr>
				            		<td style={{'border':'none'}}><b>Approved Date:&nbsp;</b></td>
				            		<td style={{'border':'none'}}>{props.data.claimReserveData.ApprovedDate}</td>
				            	</tr>
				            	</>)}

				            	{props.data.showVoidButton && (<><tr><td colSpan="2">&nbsp;</td></tr>
				            		<tr>
					            		<td style={{'border':'none'}} colSpan="2">
											<Input type="select" style={{'float':'left', 'width':'175px'}}name="voidReason" onChange={(e) => voidReasonChange(e)} id="voidReason" size="sm">
	                        						{voidPaymentOptions}
	                        				</Input>
					            			&nbsp;&nbsp;<Button size="sm" color="primary" onClick={() => props.voidPayment(props.data.claimReserveId,voidSelectedReason)}>Void This Payment</Button>
					            		</td>
				            	</tr></>)}

				            	{props.data.voidMessage && (<><tr>
				            		<td style={{'border':'none'}} colspan="2">
										<center><span style={{'color':'red'}}>{props.data.voidMessage}:&nbsp;<b>{props.data.voidReason}</b></span></center>
				            		</td>
				            	</tr></>)}

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
			            	Reserve Information
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