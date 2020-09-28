import React from 'react';
import {Card, CardBody, CardHeader, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Button} from 'reactstrap';
import {claimStatusCodeOptions} from '../../../services/claimService';
import {ClaimTypesSelect} from "./ClaimTypesSelect"
import {Select} from "./Select"

export const ClaimsSearchPanel = props => (
    <Card>
        <CardHeader>
            <strong>Company</strong>
            <small> Form</small>
        </CardHeader>
        <CardBody>
            <Row>
                <Col md="3">
                <InputGroup className="input-prepend">
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText>Policy Number</InputGroupText>
                    </InputGroupAddon>
                    <Input onChange={props.filterHandler} value={props.filter.Risk_Id} size="16" type="text" name="Risk_Id" placeholder="Policy No"/>
                </InputGroup>
                </Col>
                <Col md="3">
                <InputGroup className="input-prepend">
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText>Last Name</InputGroupText>
                    </InputGroupAddon>
                    <Input onChange={props.filterHandler} value={props.filter.s_LastOrganizationName} size="16" type="text" name="s_LastOrganizationName" placeholder="Last Name"/>
                </InputGroup>
                </Col>
                <Col md="3">
                <InputGroup className="input-prepend">
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText>First Name</InputGroupText>
                    </InputGroupAddon>
                    <Input onChange={props.filterHandler} value={props.filter.s_FirstName} size="16" type="text" name="s_FirstName" placeholder="First Name"/>
                </InputGroup>
                </Col>
                <Col md="3">
                <InputGroup className="input-prepend">
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText>Status</InputGroupText>
                    </InputGroupAddon>
                    <Select 
                    onChange={props.filterHandler} 
                    value={props.filter.Claim_Status_Code} 
                    options={claimStatusCodeOptions}
                    name="Claim_Status_Code"
                    />
                </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col md="3">
                <InputGroup className="input-prepend">
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText>Claim Number</InputGroupText>
                    </InputGroupAddon>
                    <Input onChange={props.filterHandler} value={props.filter.Claim_No} type="text" name="Claim_No" placeholder="Claim No"/>
                </InputGroup>
                </Col>
                <Col md="3">
                <InputGroup className="input-prepend">
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText>Agency Name</InputGroupText>
                    </InputGroupAddon>
                    <Input onChange={props.filterHandler} value={props.filter.Agency_Name} type="text" name="Agency_Name" placeholder="Agency Name"/>
                </InputGroup>
                </Col>
                <Col md="3">
                <InputGroup className="input-prepend">
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText>Claim Type</InputGroupText>
                    </InputGroupAddon>
                    <ClaimTypesSelect onChange={props.filterHandler} value={props.filter.ClaimTypeId_FK} name="ClaimTypeId_FK" />
                </InputGroup>
                </Col>
                <Col md="3" className="pull-right">
                    <Button color="primary" onClick={props.doSearch}>Search</Button>
                </Col>
            </Row>
        </CardBody>
    </Card>
);
  