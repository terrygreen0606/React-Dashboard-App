import React, { useState } from 'react';
import { Row, Col, Modal, ModalBody, Button, Input, Card, CardHeader, CardBody, CardFooter, InputGroup, Label, Table, InputGroupAddon, InputGroupText } from "reactstrap";
import { Control } from 'react-redux-form';
import { useDispatch, useSelector } from 'react-redux';
import * as ClaimService from '../../../../../services/claimService';

export const PayeeModal = (props) => {
	const [filter, setFilter] = useState({
    	LastName: '',
    	Claim_No: '',
    	City: '',
    	ClientName: '',
    	State: '',
    	Role: '',
    	Page: 1,
  	});

  	const [isLoading, setIsLoading] = useState(false);
  	const [searchData, setSearchData] = useState([]);
  	const [page, setPage] = useState(1);
  	const [prevDisabled, setPrevDisabled] = useState(true);
  	const [nextDisabled, setNextDisabled] = useState(true);


  	const dispatch = useDispatch();

  	const filterHandler = event => {
    	const newFilter = {...filter};
    	newFilter[event.target.name] = event.target.value;
    	setFilter(newFilter);
  	}

  	const doNewSearch = () => {
  		const newFilter = {...filter};
  		newFilter["Page"] = 1;
  		setFilter(newFilter);
  		doSearch();
  	}

  	const doSearch = () => {
  		setIsLoading(true);
  		setPrevDisabled(true);
  		setNextDisabled(true);
  		dispatch(ClaimService.getPayee(filter))
            .then((res) => {
              	setIsLoading(false);
              	if(res.data.records.length){	              	
	              	if(res.data.page*1 > 1){
	              		setPrevDisabled(false);
	              	}

	              	if(res.data.records.length*1 == 15){
	              		setNextDisabled(false);
	              	}

	              	setSearchData(res.data.records);
	              	setPage(res.data.page);
				}
            });
  	}

  	const showPrevPage = () => {
  		const newFilter = {...filter};
  		if(newFilter.Page*1 > 1){
  			newFilter["Page"] = newFilter.Page*1-1;
    		setFilter(newFilter);
    		doSearch();
    	}
  	}

  	const showNextPage = () => {
  		const newFilter = {...filter};
  		newFilter["Page"] = newFilter.Page*1+1;
		setFilter(newFilter);
    	doSearch();
  	}


	return(
		<Modal isOpen={props.isOpen} toggle={props.toggle} className="modal-xl">
			<ModalBody>
		    	<Card>
			    	<CardHeader>
		            	Find Payee
					</CardHeader>
			        <CardBody>
						<Row>
            				<Col md="4">
				                <InputGroup className="input-prepend">
				                    <InputGroupAddon addonType="prepend">
				                    <InputGroupText>Last/Org :</InputGroupText>
				                    </InputGroupAddon>
				                    <Input onChange={filterHandler} value={filter.LastName} size="16" type="text" name="LastName" placeholder="Last Name"/>
				                </InputGroup>
			                </Col>

			                <Col md="4">
				                <InputGroup className="input-prepend">
				                    <InputGroupAddon addonType="prepend">
				                    <InputGroupText>Client Id :</InputGroupText>
				                    </InputGroupAddon>
				                    <Input onChange={filterHandler} value={filter.ClientID} size="16" type="text" name="ClientID" placeholder="Client ID"/>
				                </InputGroup>
			                </Col>

			                <Col md="4">
				                <InputGroup className="input-prepend">
				                    <InputGroupAddon addonType="prepend">
				                    <InputGroupText>City :</InputGroupText>
				                    </InputGroupAddon>
				                    <Input onChange={filterHandler} value={filter.City} size="16" type="text" name="City" placeholder="City"/>
				                </InputGroup>
			                </Col>
						</Row>
						<Row><Col md="12">&nbsp;</Col></Row>
						<Row>
            				<Col md="4">
				                <InputGroup className="input-prepend">
				                    <InputGroupAddon addonType="prepend">
				                    <InputGroupText>First Name :</InputGroupText>
				                    </InputGroupAddon>
				                    <Input onChange={filterHandler} value={filter.ClientName} size="16" type="text" name="ClientName" placeholder="First Name"/>
				                </InputGroup>
			                </Col>

			                <Col md="4">
				                <InputGroup className="input-prepend">
				                    <InputGroupAddon addonType="prepend">
				                    <InputGroupText>State :</InputGroupText>
				                    </InputGroupAddon>
				                    <Input onChange={filterHandler} value={filter.State} size="16" type="text" name="State" placeholder="State"/>
				                </InputGroup>
			                </Col>

			                <Col md="4">
				                <InputGroup className="input-prepend">
				                    <InputGroupAddon addonType="prepend">
				                    <InputGroupText>Role :</InputGroupText>
				                    </InputGroupAddon>
				                    <Input onChange={filterHandler} value={filter.Role} size="16" type="text" name="Role" placeholder="Role"/>
				                </InputGroup>
			                </Col>
						</Row>
						<Row><Col md="12">&nbsp;</Col></Row>
						<Row>
							<Col md="12" className="text-center">
                    			<Button color="primary" onClick={doNewSearch}>Search</Button>
                			</Col>
                		</Row>

                		<Row><Col md="12">&nbsp;</Col></Row>
                		<Table>
                			<tbody>
                				<tr>
                					<th>CLIENT ID</th>
                					<th>ROLE TYPE</th>
                					<th>TYPE</th>
                					<th>LEGAL FULL NAME</th>
                					<th>ADDRESS</th>
                					<th>CITY</th>
                					<th>STATE</th>
                				</tr>

                				{isLoading && (<tr>
                					<td colspan="7">
                						<div className="sk-wave">
											<div className="sk-rect sk-rect1"></div>&nbsp;
					            			<div className="sk-rect sk-rect2"></div>&nbsp;
					            			<div className="sk-rect sk-rect3"></div>&nbsp;
											<div className="sk-rect sk-rect4"></div>&nbsp;
					            			<div className="sk-rect sk-rect5"></div>
										</div>
                					</td>
                				</tr>)}

                				{!isLoading && searchData.length>=1 && (                						
                						searchData.map((item, index) => (
                							<tr>
                								<td><a href="javascript:void(0);" onClick={() => props.setPayeeData(item)}>{item.s_PersonUniqueId}</a></td>
                								<td>{item.s_PersonRoleType}</td>
                								<td>{item.s_EntityType}</td>
                								<td>{item.s_FullLegalName}</td>
                								<td>{item.s_AddressLine1}</td>
                								<td>{item.s_CityName}</td>
                								<td>{item.s_StateCode}</td>
                							</tr>
                						))
                				)}

                				{!isLoading && searchData.length>=1 && (<tr>
                					<td colspan="7" className="text-center">
                						<Button disabled={prevDisabled} onClick={() => showPrevPage()} color="primary">Prev</Button>&nbsp;&nbsp;
                						<Button disabled={nextDisabled} onClick={() => showNextPage()} color="primary">Next</Button>
									</td>
                				</tr>)}

                				{!isLoading && searchData.length==0 && (<tr>
                					<td colspan="7" className="text-center">No Data Found!</td>
                				</tr>)}
                			</tbody>
                		</Table>
                			
					</CardBody>			            
					<CardFooter>
						<Row>
							<Col md="12" className="text-center">
								<Button size="sm" color="primary" className="float-right" onClick={() => props.toggle()}>Close</Button>
							</Col>
						</Row>
					</CardFooter>
				</Card>
			</ModalBody>
		</Modal>
	);
}