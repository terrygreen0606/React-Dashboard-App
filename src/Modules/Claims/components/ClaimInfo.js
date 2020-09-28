import React from 'react';
import {Link} from "react-router-dom";
import Moment from 'react-moment';

import {Card, CardBody, CardHeader, Col, Row, Button} from 'reactstrap';

export const ClaimInfo = ({claim}) => (
    <Card>
        <CardHeader>
            <strong>{claim.Claim_No}</strong>
        </CardHeader>
        <CardBody>
            <Row>
                <Col md="2">
                    Other Claims
                </Col>
                <Col md="4">
                {claim.policyClaims ? claim.policyClaims.map(c=>(
                    <Link key={c.ClaimId_PK} to={`/claims/${c.ClaimId_PK}`}>
                    <Button key={c.ClaimId_PK} type="button" size="sm" color={c.ClaimId_PK===claim.ClaimId_PK?"primary":"secondary"}>
                        {c.Claim_No}
                    </Button>
                    </Link>
                )): ''}
                </Col>
                <Col md="2">
                    Service Representative
                </Col>
                <Col md="4">
                    {claim.serviceRepresentative ? claim.serviceRepresentative.s_ScreenName : ''}
                </Col>
            </Row>

            <Row>
                <Col md="2">
                    Claim Status
                </Col>
                <Col md="4">
                {
                    claim.Claim_Status_Code
                }
                </Col>

                <Col md="2">
                    Field Adjuster
                </Col>
                
                <Col md="4">
                </Col>
            </Row>

            <Row>
                <Col md="2">
                No of Days Since Reported
                </Col>

                <Col md="4">
                    {claim.Date_Allocated ? <Moment date={claim.Date_Allocated} durationFromNow unit="days"/> : ''}
                </Col>

                <Col md="2">
                    Loss Reported Since Inception
                </Col>

                <Col md="4">
                </Col>
            </Row>
            <Row>
                <Col md="2">
                    Policy Number
                </Col>

                <Col md="4">
                    {claim.Risk_Id}
                </Col>

                <Col md="2">
                    Policy Form
                </Col>

                <Col md="4">
                </Col>

            </Row>
        </CardBody>
    </Card>
)
