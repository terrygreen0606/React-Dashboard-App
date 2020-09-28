import React, { useState } from 'react';
import { Row, Col, Modal, ModalBody, Button, Input, Card, CardHeader, CardBody, CardFooter, InputGroup, Label, Table } from "reactstrap";

export const AssignClaimModal = (props) => {

	const fieldAdjusters = props.fieldAdjusters;
	let dataHtml = "";
	
	
	if(!props.checkingForAdjusterClaim){
		const inspectionStatus = props.claimInspectionData.inspection_status;

		return(
			<Modal isOpen={props.isOpen} toggle={props.toggle} className="modal-md">
		        <ModalBody>
		          	<Card>
			            <CardHeader>
		              		Claim Allocate To Adjuster 
			            </CardHeader>
			            <CardBody>
			            	<Table>
			            		<tbody>
			            			{ (inspectionStatus == 'OPEN' || inspectionStatus == 'PENDING') &&
			            				<tr>
				            				<td colspan='2'>
				            					Claim Inspection is already created.&nbsp;Inspection Last Status :{inspectionStatus} 

				            					{props.claimInspectionData.adjuster_name && 
				            						<><br/>Claim allocated to <b>{props.claimInspectionData.adjuster_name}</b></>
				            					}

				            					{!props.claimInspectionData.adjuster_name && 
				            						<><br/>But Adjuster is not assign, Do you want to assign?<br/><br/></>
				            					}
				            				</td>
			            				</tr>
			            			}

			            			{ inspectionStatus == 'CLOSE' && 
			            				<tr>
				            				<td colspan='2'>
					            				Claim Inspection is closed. Do you want to Reopen?&nbsp;
					            				<Button size="sm" color="primary" onClick={() => props.reopenClaimInspection()}>Reopen</Button>
					            				<br/>Do you want to create new?<br/>
					            			</td>
			            				</tr>
			            			}


			            			{ !((inspectionStatus == 'OPEN' || inspectionStatus == 'PENDING') && props.claimInspectionData.adjuster_name) && 
				            			<tr>
				            				<td>
				            					Allocate Claim:
				            				</td>
				            				<td>
				            					<Input type="select" size="sm" onChange={(e) => props.selectAllocateTo(e)} defaultValue={props.currentClaimAllocatedTo}>
				            						<option value="select">Select Adjuster</option>
				            						{
				            							fieldAdjusters.map((ele, index) => <option key={index} value={ ele.Admin_ID }>{ ele.s_ScreenName }</option>)
				            						}
				            					</Input>
				            				</td>
				            			</tr>
			            			}
				            		
			            		</tbody>
			            	</Table>
			            </CardBody>
			            <CardFooter>
			            	{ !((inspectionStatus == 'OPEN' || inspectionStatus == 'PENDING') && props.claimInspectionData.adjuster_name) && 
				            	<>
					            	<Button size="sm" color="primary" className="float-right" onClick={() => props.updateAllocateToRefDd()}>Assign</Button>
								</>					            	
							}
							<Button size="sm" color="primary" className="float-right" onClick={() => props.toggle()}>Cancel</Button>
			            </CardFooter>
	            	</Card>
	            </ModalBody>
	       	</Modal>
		)
	} else {
		return(
			<Modal isOpen={props.isOpen} toggle={props.toggle} className="modal-md">
		        <ModalBody>
					<div className="sk-wave">
						<div className="sk-rect sk-rect1"></div>&nbsp;
			            <div className="sk-rect sk-rect2"></div>&nbsp;
			            <div className="sk-rect sk-rect3"></div>&nbsp;
						<div className="sk-rect sk-rect4"></div>&nbsp;
			            <div className="sk-rect sk-rect5"></div>
					</div>
		        </ModalBody>
		    </Modal>
		    )
	}
}