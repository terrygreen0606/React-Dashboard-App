import React from 'react';
import {Card, CardBody, CardHeader, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Button} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {claimStatusCodeOptions} from '../../../../services/claimService';
import {ClaimTypesSelect} from "./../ClaimTypesSelect"
import {Select} from "./../Select"

export const PolicySearchPanel = props => (
    <>
        <Row>
            <Col xs="12" sm="12" lg="12" className=" input-search-fields mt-4">
                <div className="d-flex justify-content-around align-items-center  ">
                    <InputGroup className="ml-4">
                        <label >Policy No :&nbsp;</label>
                        <Input onChange={props.filterHandler} value={props.filter.Risk_Id} color="primary" size="sm" type="text" name="Risk_Id" placeholder="Policy No"/>
                    </InputGroup>                    
                    <InputGroup className="ml-4">
                        <label >Last Name :&nbsp;</label>
                        <Input onChange={props.filterHandler} value={props.filter.s_LastOrganizationName} color="primary" size="sm" type="text" name="s_LastOrganizationName" placeholder="Last Name"/>
                    </InputGroup>
                    <InputGroup className="ml-4">
                        <label >First Name :&nbsp;</label>
                        <Input onChange={props.filterHandler} value={props.filter.s_FirstName} color="primary" size="sm" type="text" name="s_FirstName" placeholder="First Name"/>
                    </InputGroup>
                </div>                
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm="12" lg="12" className=" input-search-fields">
                <div className="icons  d-flex justify-content-center" style={{height:"100px"}}>
                    <NavLink to="#" onClick={props.doSearch} className={"mr-2 icons-search text-center"}>
                        <i className="cui-magnifying-glass icons font-4xl d-block mt-4 no-underline icons-search"></i>
                        <p className="pt-2" style={{fontSize:"10px"}}>Search</p>
                    </NavLink>                    
                </div>
            </Col>
        </Row>
    </>
);