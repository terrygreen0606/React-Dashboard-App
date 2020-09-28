import React, {Component} from "react";
import {Col,Row, Button} from 'reactstrap';
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as ClaimService from '../../../../services/claimService';
import Message from '../../../../utilities/message';
import Moment from 'react-moment';

const ClaimBasicInfo = (props) => {

    const policyDetails = props.policyDetails;
    const claimDetailsForEdit = props.claimDetailsForEdit;

    let isEdit = false;
    if(props.claimId){
        isEdit = true; 
    }
    /* Policy Details */

    let policyNo = "";
    if (policyDetails) {
        policyNo = policyDetails.Policy_No;
    }

    /* Policy Details */    

    /* Insured Person Details */
    let insuredName = "";
    if(policyDetails.insuredPerson_info) {
        insuredName = policyDetails.insuredPerson_info.s_FullLegalName;
    }

    let insuredPersonAddress = "";
    if(policyDetails.insuredPerson_info) {
        if(policyDetails.insuredPerson_info.addresses) {
            let location = policyDetails.insuredPerson_info.addresses.find(ele => {return (ele.s_AddressTypeCode.toLowerCase() === 'location');});
            if (typeof location != 'undefined') {
                insuredPersonAddress = (location.s_AddressLine1 ? location.s_AddressLine1 : "") + (location.s_AddressLine2 ? ", "+location.s_AddressLine2 : "") + (location.cityName ? ", "+location.cityName.s_CityName : "") + (location.countyName ? ", "+location.countyName.s_CountyName : "") + (location.stateName ? ", "+location.stateName.s_StateName : "") + (location.s_PostalCode ? ", "+location.s_PostalCode : "") ;    
            }            
        }
    }

    let insuredPersonMailingAddress = "";
    if(policyDetails.insuredPerson_info) {
        if(policyDetails.insuredPerson_info.addresses) {
            let location = policyDetails.insuredPerson_info.addresses.find(ele => {return (ele.s_AddressTypeCode.toLowerCase() === 'mailing');});
            if (typeof location != 'undefined') {
                insuredPersonMailingAddress = (location.s_AddressLine1 ? location.s_AddressLine1 : "") + (location.s_AddressLine2 ? ", "+location.s_AddressLine2 : "") + (location.cityName ? ", "+location.cityName.s_CityName : "") + (location.countyName ? ", "+location.countyName.s_CountyName : "") + (location.stateName ? ", "+location.stateName.s_StateName : "") + (location.s_PostalCode ? ", "+location.s_PostalCode : "") ;    
            }            
        }
    }

    let insuredPersonPhoneInfo = "";
    if(policyDetails.insuredPerson_info) {
        if(policyDetails.insuredPerson_info.phone_info) {
            if (claimDetailsForEdit) {
                insuredPersonPhoneInfo = policyDetails.insuredPerson_info.phone_info.find(ele => ele.s_CommunicationUseCode === 'Primary' && ele.n_SourceFK === claimDetailsForEdit.ClaimId_PK && ele.s_SourceTable === 'tb_claim' && ele.s_PhoneTypeCode === 'Phone');
            } else {
                insuredPersonPhoneInfo = policyDetails.insuredPerson_info.phone_info.find(ele => (ele.s_CommunicationUseCode === 'Primary' && ele.s_PhoneTypeCode.toLowerCase() === 'phone'));
            }
        }
    }
    /* Insured Person Details */

    /* Agency Details */

    let agencyName = "";
    if(policyDetails.agency) {
        agencyName = policyDetails.agency.s_FullLegalName;
    }

    let agencyAddress = "";
    if(policyDetails.agency) {
        if(policyDetails.agency.addresses) {
            let location = policyDetails.agency.addresses.find((ele) => { return (ele.s_AddressTypeCode.toLowerCase() === 'location');});
            if(typeof location != "undefined") {
                agencyAddress = (location.s_AddressLine1 ? location.s_AddressLine1 : "") + (location.s_AddressLine2 ? ", "+location.s_AddressLine2 : "") + (location.cityName ? ", "+location.cityName.s_CityName : "") + (location.countyName ? ", "+location.countyName.s_CountyName : "") + (location.stateName ? ", "+location.stateName.s_StateName : "") + (location.s_PostalCode ? ", "+location.s_PostalCode : "") ;    
            }            
        }
    }

    let agencyPhoneInfo = "";
    if(policyDetails.agency) {
        if(policyDetails.agency.phone_info) {
            agencyPhoneInfo = policyDetails.agency.phone_info.find(ele => ele.s_CommunicationUseCode == 'Primary');
        }
    }
    /* Agency Details */

    /* Product INfo */
    let policyFormName = "";
    if(policyDetails.product_info) {
        policyFormName = policyDetails.product_info.s_ProductName;
    }
    /* Product INfo */

    /* Claim Entered and updated details */

    const claim_entered_by_name = claimDetailsForEdit ? claimDetailsForEdit.insertedBy.s_ScreenName : "";
    const claim_updated_by_name = claimDetailsForEdit ? claimDetailsForEdit.updatedBy.s_ScreenName : "";
    const claim_inserted_on = claimDetailsForEdit ? claimDetailsForEdit.Inserted_Date_formatted : "";
    const claim_updated_on = claimDetailsForEdit ? claimDetailsForEdit.Updated_Date_formatted : "";

    /* Claim Entered and updated details */

    /* Service Rep */
    const serviceRep = claimDetailsForEdit ? ( claimDetailsForEdit.serviceRepresentative ? claimDetailsForEdit.serviceRepresentative.s_ScreenName : "" ) : "";
    /* Service Rep */

    /* Allocated */
    const fieldAdjuster = claimDetailsForEdit ? ( claimDetailsForEdit.allocatedTo ? claimDetailsForEdit.allocatedTo.s_ScreenName : "" ) : "";
    /* Allocated */

    /* No. days reported */
    const noOfDays = claimDetailsForEdit ? (<Moment date={claimDetailsForEdit.Date_Allocated} durationFromNow unit="days"/>) : ''
    /* No. days reported */
    const claimStatusCode = (claimDetailsForEdit) ? claimDetailsForEdit.Claim_Status_Code : "";

    return(
        <>
        <div className="claim-view-main d-flex justify-content-between align-items-end">
            <h3 className="font-italic">
                { policyNo }/1/{ insuredName }<br/>
                { insuredPersonAddress }
            </h3>
            <div className="mb-2" style={{ 'max-width':'405px','max-height':'100px','overflow':'auto'}}>
                {
                    (policyDetails.claims_ids) ? policyDetails.claims_ids.map(claim => (
                        <Link key={claim.id} to={`/claims/${claim.id}`}>
                            <Button key={claim.id} className="mr-2" color={ claim.id == props.claimId ? "primary" : "secondary"} type="button">
                                { claim.Claim_No }
                            </Button>
                        </Link>
                    ))
                    :""
                }
            </div>
        </div>
        <div className="blue-back pl-2 pb-1 pr-2 pt-1 mailing-adress bg-primary">
            <i>
            <span >
                <b>Mailing Address: { insuredPersonMailingAddress }</b>
            </span>
            <span className="ml-5">
                <b>Phone Number: { (typeof insuredPersonPhoneInfo != "undefined") ? insuredPersonPhoneInfo.s_PhoneNumber : "" }</b>
            </span>
            </i>
        </div>        
        <div style={{'display':(isEdit ? '': 'none')}}>
            <div className="mb-1 mt-! d-flex align-items-end justify-content-end claim-enter op-7" >
                <div>
                    <span style={{opacity: "0.7"}}>Claim Entered by</span>
                    <b> { claim_entered_by_name } </b> 
                    <span style={{opacity: "0.7"}}>on </span>
                    <b>{ claim_inserted_on }</b>
                    <span style={{opacity: "0.7"}}> | Updated by&nbsp;<b>{ claim_updated_by_name }</b> on <b>{ claim_updated_on }</b>
                    </span>
                </div>
            </div>
        </div>

        <div style={{'display':(isEdit ? 'none': '')}}>
            &nbsp;
        </div>

        <div style={{'display':(isEdit ? '': 'none')}} className={"blue-back w-100 flex-column pl-2 pb-1 pr-2 pt-1 letter-spacing-1 bg-primary "+(isEdit ? 'd-flex': '')}>
            <div className="w-100 d-flex">
                <div className="d-flex third-block" style={{width:"33%"}}><p className="m-0 w-75">No. of days since reported: </p><span>{ noOfDays }</span></div>
                <div className="d-flex third-block" style={{width:"26%"}}><p className="m-0 w-50">Service Rep: </p> <span>{ serviceRep }</span></div>
                <div className="d-flex third-block" style={{width:"40%"}}><p className="m-0 w-75">Loss reported since inception: </p> <span>&nbsp;</span></div>
            </div>
            <div className="w-100 d-flex">
                <div className="d-flex third-block" style={{width:"33%"}}><p className="m-0 w-75">Claim status:</p>  <span>{ claimStatusCode }</span></div>
                <div className="d-flex third-block" style={{width:"26%"}}><p className="m-0 w-50">Field adjuster:</p> <span>{ fieldAdjuster }</span></div>
                <div className="d-flex third-block" style={{width:"40%"}}><p className="m-0 "  style={{width:"62%"}}>Policy Form: </p><span> { policyFormName } </span></div>
            </div>
        </div>

        <div style={{'display':(isEdit ? 'none': '')}} className="blue-back  w-100 d-flex flex-column pl-2 pb-1 pr-2 pt-1 letter-spacing-1 bg-primary">            
            <div className="w-100 d-flex">                
                <div className="d-flex third-block" style={{width:"40%"}}><p className="m-0 "  style={{width:"62%"}}>Policy Form: </p><span>{ policyFormName } </span></div>
            </div>
        </div>

        <Row className="mb-1 mt-2">
            <Col xs="12" sm="12" lg="12" className="">
                <div className="d-flex COLEMAN-INSURANCE p-2 pr-5 justify-content-between border border-primary rounded">
                    <p className="mb-0 ">{ agencyName }</p>
                    <p className="mb-0 ">
                        <span className="pr-4">Address: { agencyAddress }</span>
                        <span className="pr-4">Phone number: { (typeof agency != 'undefined') ? agencyPhoneInfo.s_PhoneNumber : "" }</span>
                        <span className="">Agent Name:  { agencyName } </span>
                    </p>
                </div>
            </Col>
        </Row>
        </>
    )
    
}
export default ClaimBasicInfo;