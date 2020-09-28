import React from 'react';
import {Card, CardBody, CardHeader, Container, Col, Row, Label, Button} from 'reactstrap';
import {currencyFormat} from "../components/Helper"
import {Link} from "react-router-dom";
import Moment from 'react-moment';

export const ClaimHeader = ({claim}) => {
    const propertyAddress = claim.riskAddresses ? claim.riskAddresses[0] : {} ;
    const mailingAddress = claim.riskAddresses ? claim.riskAddresses[0] : {} ;
    
    /* Agency Address */
    const claim_agency_name = claim ? claim.Agency_Name : '';

    const agencyAddress = claim.agency ? claim.agency.addresses.find(a=>a.s_IsDefaultAddress=='Y') : {} ;
    const addressLine1 = agencyAddress ? agencyAddress.s_AddressLine1+", " : "";
    const cityName = agencyAddress.cityName ? agencyAddress.cityName.s_CityName+", " : "";
    const countyName = agencyAddress.countyName ? agencyAddress.countyName.s_CountyName+", " : "";
    const stateName = agencyAddress.stateName ? agencyAddress.stateName.s_StateName+", " : "";
    const postalCode = agencyAddress ? agencyAddress.s_PostalCode : "";
    const agency_address_to_display = addressLine1 + cityName + countyName + stateName + postalCode;
    /* Agency Address */

    const policy_no = claim.Risk_Id;
    const insured_person_name = claim.insuredPerson ? claim.insuredPerson.s_FullLegalName : "";
    const claim_entered_by_name = claim.insertedBy ? claim.insertedBy.s_ScreenName : "";
    const claim_updated_by_name = claim.updatedBy ? claim.updatedBy.s_ScreenName : "";
    const claim_inserted_on = claim.Inserted_Date_formatted ? claim.Inserted_Date_formatted : "";
    const claim_updated_on = claim.Updated_Date_formatted ? claim.Updated_Date_formatted : "";
    const insured_person_phone = (claim) ? (Array.isArray(claim.insured_person_phone) && claim.insured_person_phone.length)  ? claim.insured_person_phone[0].s_PhoneNumber : "" : "";
    const policy_form_name = claim.policy_form ? claim.policy_form[0].s_ProductName : "";

    /* Insured Person details */
    const insured_person_property_address = claim.insuredPerson ? claim.insuredPerson.addresses.find(ele => (ele.s_AddressTypeCode == "Location")) : "";
    const insured_person_mailing_address = claim.insuredPerson ? claim.insuredPerson.addresses.find(ele => (ele.s_AddressTypeCode == "Mailing")) : "";

    /* Insured Person details */
    
    return(
        <>
        <div className="claim-view-main">
            <h3 className="font-italic">
                { policy_no }/3/{ insured_person_name }<br/> {/* Need to Update */}
                { insured_person_property_address != "undefined" ? ( insured_person_property_address.s_AddressLine1 + ( insured_person_property_address.cityName ? ", " + insured_person_property_address.cityName.s_CityName : "") + ( insured_person_property_address.countyName ? ", " +insured_person_property_address.countyName.s_CountyName : " " ) + ( insured_person_property_address.stateName ? ", " + insured_person_property_address.stateName.s_StateName : " ") + " "+ insured_person_property_address.s_PostalCode) : " "}
            </h3>
        </div>
        <div className="blue-back pl-2 pb-1 pr-2 pt-1 mailing-adress bg-primary">
            <i>
                <span >
                    Mailing Address: { insured_person_mailing_address != "undefined" ? ( insured_person_mailing_address.s_AddressLine1 + ( insured_person_mailing_address.cityName ? ", " + insured_person_mailing_address.cityName.s_CityName : "") + ( insured_person_mailing_address.countyName ? ", " +insured_person_mailing_address.countyName.s_CountyName : " " ) + ( insured_person_mailing_address.stateName ? ", " + insured_person_mailing_address.stateName.s_StateName : " ") + " "+ insured_person_mailing_address.s_PostalCode) : " "}
                </span>
                <span className="ml-5">
                    <b> Phone Number: { insured_person_phone }</b>
                </span>
            </i>
        </div>
        <div>
            <div className="mb-2 mt-2 d-flex align-items-end justify-content-between" >
                <div>
                {claim.policyClaims ? claim.policyClaims.map(c=>(
                    <Link key={c.ClaimId_PK} to={`/claims/${c.ClaimId_PK}`}>
                    <Button key={c.ClaimId_PK} type="button" size="sm" color={c.ClaimId_PK===claim.ClaimId_PK?"primary":"secondary"}>
                        {c.Claim_No}
                    </Button>
                    </Link>
                )): ''}
                </div>
                <div className="claim-enter">
                    <span style={{opacity: "0.7"}}>Claim Entered by</span>
                    <b> { claim_entered_by_name } </b> 
                    <span style={{opacity: "0.7"}}>on </span>
                    <b>{ claim_inserted_on }</b>
                    <span style={{opacity: "0.7"}}> | Updated by&nbsp;<b>{ claim_updated_by_name }</b> on <b>{ claim_updated_on }</b>
                    </span>
                </div>
            </div>
        </div>
        <div className="blue-back  w-100 d-flex flex-column pl-2 pb-1 pr-2 pt-1 bg-primary">
            <div className="w-100 d-flex">
                <div className="d-flex third-block" style={{width:"33%"}}>
                    <p className="m-0 w-75">No. of days since reported: </p>
                    <span>
                        {claim.Date_Allocated ? <Moment date={claim.Date_Allocated} durationFromNow unit="days"/> : ''}
                    </span>
                </div>
                <div className="d-flex third-block" style={{width:"26%"}}>
                    <p className="m-0 w-50">Service Rep: </p>
                    <span>
                        {claim.serviceRepresentative ? claim.serviceRepresentative.s_ScreenName : ''}
                    </span>
                </div>
                <div className="d-flex third-block" style={{width:"40%"}}><p className="m-0 w-75">Loss reported since inception: </p> <span></span></div>
            </div>
            <div className="w-100 d-flex">
                <div className="d-flex third-block" style={{width:"33%"}}>
                    <p className="m-0 w-75">Claim status:</p>  <span>{ claim.Claim_Status_Code }</span>
                </div>
                <div className="d-flex third-block" style={{width:"26%"}}>
                    <p className="m-0 w-50">Field adjuster:</p> <span>{ claim.allocatedTo ? claim.allocatedTo.s_ScreenName : "" }</span>
                </div>
                <div className="d-flex third-block" style={{width:"40%"}}>
                    <p className="m-0 "  style={{width:"62%"}}>Policy Form: </p><span>{ policy_form_name } </span>
                </div>
            </div>
        </div>
        <hr style={{    height: "1px",
            borderTop: "1px solid #A5E65A",
            margin: "7px 0px"}}/>
        <Row className="ml-0">
            {claim.deductible && claim.deductible.length ?
            <Col xs="12" sm="6" lg="4" >
                <div className="row justify-content-around" style={{
                    background: "#6A888C",
                    color: "white",
                    fontWeight: "700",borderRadius:"6px"
                }}>
                    <div>Deductible</div>
                    <div>Ammount</div>
                    <div>Limit</div>
                </div>
                <div className="row justify-content-around" style={{
                    background:"#A3EEE7",
                    fontWeight: "700",
                    fontSize:"9px",
                    padding: "5px 0px"

                }}>
                    <div>Hurricaine Deductible</div>
                    <div style={{marginRight: "18px"}}>{currencyFormat(claim.deductible[0].n_Deductible2AmtIncident)}</div>
                    <div>{claim.deductible[0].HurricaneDedutible}</div>
                </div>
                <div className="row justify-content-around" style={{
                    background:"#D9F2F6",
                    fontWeight: "700",
                    fontSize:"9px",
                    padding: "5px 0px"
                }}>
                    <div>All other peril Deductible </div>
                    <div style={{marginRight: "18px"}}>{currencyFormat(claim.deductible[0].n_DeductibleAmtIncident)}</div>
                    <div>{claim.deductible[0].NonHurricaneDedutible}</div>
                </div>
                <div className="row text-center justify-content-center" style={{
                    background:"#A5E65A",
                    fontSize:"9px",
                    fontWeight: "700",
                    padding: "5px 0px"
                    ,borderRadius:"6px"
                }}>
                    Click to view inspection images
                </div>
            </Col>
            : " "}
            <Col xs="12" sm="6" lg="4" className="pl-2 pr-2">
                <div style={{background:"#D9F1F5",fontWeight:"700",fontSize:"15px", padding: "13px 0px",borderRadius:"6px"}}>
                    <div className="d-flex ">
                        <div className="w-75 pl-3">
                            PA Involved
                        </div>
                        <div className="w-25 text-center">
                            { claim.PA_Involved_YN=='Y' ? 'Yes' : 'No' }
                        </div>
                    </div>
                    <div className="d-flex ">
                        <div className="w-75 pl-3">Attorney Involved</div>
                        <div className="w-25 text-center">
                            { claim.Attorney_Involved_YN=='Y' ? 'Yes' : 'No' }
                        </div>
                    </div>
                    <div className="d-flex ">
                        <div className="w-75 pl-3">AOB Involved</div>
                        <div className="w-25 text-center">
                            { claim.addInfo.s_IsAOBInvolved_YN=='Y' ? 'Yes' : 'No' }
                        </div>
                    </div>
                </div>
            </Col>
            <Col xs="12" sm="6" lg="4" className="pl-0">
                <div style={{border:"1px solid #A5E65A", padding: "9px 0px",borderRadius:"6px"}}>
                    <h6 className="text-center">{ claim_agency_name }</h6>
                    <p className="mb-0" style={{
                        fontSize: "11px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        fontWeight: "700"
                    }}>
                        <span>Address: { agency_address_to_display }</span>{/* Need to Update */}
                        <span>Phone number: (801) xxx-xxxx</span>{/* Need to update */}
                        <span>Agent Name:  {claim.agent ? claim.agent.s_FullLegalName : ''} </span>
                    </p>
                </div>
            </Col>
        </Row>
        <hr style={{    height: "1px",
            borderTop: "1px solid #A5E65A",
            margin: "7px 0px"}}/>
        </>
    )


    /* return (
    <Card>

        <CardHeader>
            <strong>Claims</strong>
            <small> Management System</small>
        </CardHeader>

        <CardBody>

            <Row>
                <Col md="2">
                    Insured Name
                </Col>
                <Col md="4">
                    {claim.Insured_Name}
                </Col>
                <Col md="2">
                    Agency Name
                </Col>
                <Col md="4">
                    {claim.agency ? claim.agency.s_LastOrganizationName : ''}
                </Col>
            </Row>

            <Row>
                <Col md="2">
                    Property Address
                </Col>
                <Col md="4">
                    {propertyAddress ? propertyAddress.s_AddressLine1 : ''}
                    {propertyAddress ? propertyAddress.s_PostalCode : ''}
                </Col>
                <Col md="2">
                Agency Address
                </Col>
                <Col md="4">
                    {agencyAddress ? agencyAddress.s_AddressLine1 : ''}
                    {agencyAddress ? agencyAddress.s_PostalCode : ''}
                </Col>
            </Row>

            <Row>
                <Col md="2">
                    Mailing Address
                </Col>
                <Col md="4">
                    {mailingAddress ? mailingAddress.s_AddressLine1 : ''}
                    {mailingAddress ? mailingAddress.s_PostalCode : ''}
                </Col>
                <Col md="2">
                    Agent Name
                </Col>
                <Col md="4">
                    {claim.agent ? claim.agent.s_FullLegalName : ''}
                </Col>
            </Row>

            {claim.deductible && claim.deductible.length ?
            <Container style={{marginTop:"1em"}}>
                <center>
                <Row style={{background:'#4CAF50', color:"white"}}>
                    <Col md="4">
                        <Label>Deductible</Label>
                    </Col>
                    <Col md="4">
                        <Label>Amount</Label>
                    </Col>
                    <Col md="4">
                        <Label>Limit</Label>
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        Hurricane Deductible
                    </Col>
                    <Col md="4">
                        {currencyFormat(claim.deductible[0].n_Deductible2AmtIncident)}
                    </Col>
                    <Col md="4">
                        {claim.deductible[0].HurricaneDedutible}
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                        All other peril Deductible
                    </Col>
                    <Col md="4">
                        {currencyFormat(claim.deductible[0].n_DeductibleAmtIncident)}
                    </Col>
                    <Col md="4">
                        {claim.deductible[0].NonHurricaneDedutible}
                    </Col>
                </Row>
                </center>
            </Container>
            : '' }

        </CardBody>
    </Card>
    ) */
}
