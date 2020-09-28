import React from 'react';
import {Card, CardBody, CardHeader, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Button} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {claimStatusCodeOptions} from '../../../../services/claimService';
import {ClaimTypesSelect} from "./../ClaimTypesSelect"
import {Select} from "./../Select"

export const ClaimsSearchPanel = props => (
    <>
        <Row>
            <Col xs="12" sm="12" lg="12" className=" input-search-fields mt-4">
                <div className="d-flex justify-content-around align-items-center  ">
                    <InputGroup>
                        <label >Last Name :&nbsp;</label>
                        <Input onChange={props.filterHandler} value={props.filter.s_LastOrganizationName} color="primary" size="sm" type="text" name="s_LastOrganizationName" placeholder="Last Name"/>
                    </InputGroup>
                    <InputGroup className="ml-3">
                        <label >First Name :&nbsp;</label>
                        <Input onChange={props.filterHandler} value={props.filter.s_FirstName} color="primary" size="sm" type="text" name="s_FirstName" placeholder="First Name"/>
                    </InputGroup>
                    <InputGroup className="ml-3">
                        <label >Policy No :&nbsp;</label>
                        <Input onChange={props.filterHandler} value={props.filter.Risk_Id} color="primary" size="sm" type="text" name="Risk_Id" placeholder="Policy No"/>
                    </InputGroup>
                    <InputGroup className="ml-3">
                        <label >Status :&nbsp;</label>
                        <Select
                            color="primary" size="sm" 
                            onChange={props.filterHandler} 
                            value={props.filter.Claim_Status_Code} 
                            options={claimStatusCodeOptions}
                            name="Claim_Status_Code"
                        />
                    </InputGroup>
                </div>
                <div className="d-flex w-50 mx-auto justify-content-center align-items-center mt-3">
                    <InputGroup>
                        <label >Claim No :&nbsp;</label>                        
                        <Input onChange={props.filterHandler} value={props.filter.Claim_No} color="primary" size="sm" type="text" name="Claim_No" placeholder="Claim No"/>
                    </InputGroup>
                    <InputGroup className="ml-3">
                        <label >Claim Type :&nbsp;</label>
                        <ClaimTypesSelect color="primary" size="sm" onChange={props.filterHandler} value={props.filter.ClaimTypeId_FK} name="ClaimTypeId_FK" />
                    </InputGroup>
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm="12" lg="12" className=" input-search-fields mt-4">
                <div className="icons  d-flex justify-content-center" style={{height:"100px"}}>
                    <NavLink to="#" onClick={props.doSearch} className={"mr-2 icons-search text-center"}>
                        <i className="cui-magnifying-glass icons font-4xl d-block mt-4 no-underline icons-search"></i>
                        <p className="pt-2" style={{fontSize:"10px"}}>Search</p>
                    </NavLink>
                    <NavLink to="/claim-intake" className={"ml-2 no-underline icons-search text-center"}>
                        <i className="icon-plus icons font-4xl d-block mt-4 no-underline icons-search"></i>
                        <p className="pt-2" style={{fontSize:"10px"}}>
                            Add Claim
                        </p>
                    </NavLink>
                </div>
            </Col>
        </Row>
    </>
);
