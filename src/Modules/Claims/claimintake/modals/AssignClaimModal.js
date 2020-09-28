import React, { useState } from 'react';
import { Row, Col, Modal, ModalBody, Button, Input, Card, CardHeader, CardBody, CardFooter, InputGroup, Label, Table } from "reactstrap";

export const AssignClaimModal = (props) => {
	return(
		<Modal isOpen={props.isOpen} toggle={props.toggle} className="modal-xl">
	        <ModalBody>
	          	<Card>
		            <CardHeader>
	              		Claim Allocate To Adjuster
		            </CardHeader>
		            <CardBody>
		            	<Table>
		            		<tbody>
		            			<tr>
		            				<td>
		            					Allocate Claim:
		            				</td>
		            				<td>
		            					<Input type="select" size="sm">
		            						<option value="select">Select Adjuster</option>
		            						<option value="12532">Shyam Garud</option>
		            						<option value="12794">Dragan Jovanov</option>
		            						<option value="13446">Pablo Alvarez</option>
		            						<option value="13458">LUPU IONUT</option>
		            						<option value="13497">Michael Burdier </option>
		            						<option value="13543">Jeff Cook</option>
		            						<option value="13613">Anthony Brando</option>
		            						<option value="13639">Juan Gonzalez </option>
		            						<option value="13820">Possan Yosef</option>
		            						<option value="13847">Tim Ingersoll</option>
		            						<option value="13853">Rafael Figueroa</option>
		            						<option value="13892">Kevin Stiles</option>
		            						<option value="13895">RIGO</option>
		            						<option value="13903">Hollman Matos</option>
		            						<option value="13924">Vance Eskesen</option>
		            						<option value="13936">Arnold Novak</option>
		            						<option value="14061">Gerardo Morabito</option>
		            						<option value="14377">Robert Quaintance</option>
		            						<option value="15106">Geo Cabrol</option>
		            						<option value="15130">Chris McDowell</option>
		            						<option value="15389">columbia</option>
		            						<option value="15393">COLOMBIA TEST CLAIMFIELDADJUSTER</option>
		            					</Input>
		            				</td>
		            			</tr>
		            		</tbody>
		            	</Table>
		            </CardBody>
		            <CardFooter>
		            	<Button size="sm" color="primary" className="float-right">Assign</Button>
		            	<Button size="sm" color="primary" className="float-right">Cancel</Button>
		            </CardFooter>
            	</Card>
            </ModalBody>
       	</Modal>
	)
}