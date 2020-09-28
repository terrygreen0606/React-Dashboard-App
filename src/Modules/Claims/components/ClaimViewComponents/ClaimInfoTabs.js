import React, {Component, useState} from "react";
import {Col,Row ,Nav, NavItem, NavLink,TabContent} from 'reactstrap';
import {typeOfLossOptions,
    claimStatusCodeOptions,
    claimSubStatusCodeOptions,
    claimReportedByOptions,
    claimEventNameOptions,
    claimReviewStatusCodeOptions,
    claimReviewSubStatusCodeOptions
} from '../../../../services/claimService';
import Moment from 'react-moment';
import {Link } from 'react-router-dom';
import {currencyFormat} from "../../components/Helper";

import {ClaimStatusLogsModal} from './modals/ClaimStatusLogsModal';
import {ClaimReviewLogsModal} from './modals/ClaimReviewLogsModals';

const ClaimInfoTabs = ({claim, masterData, eventMasterData}) => {    

    claim.reviewStatusCodeText = masterData.REVIEW_STATUS[claim.reviewStatusCode];
    claim.Claim_SubStatus_Code = masterData.SUB_STATUS[claim.Claim_SubStatus_Code];

    let reviewSubStatusCodesText = [];
    for (let i of claim.reviewSubStatusCodes){
        if(masterData.REVIEW_SUB_STATUS[i])
            reviewSubStatusCodesText.push(masterData.REVIEW_SUB_STATUS[i]);
    }

    claim.reviewSubStatusCodesText = reviewSubStatusCodesText.join(" ,");

    for(let i in claim.status_logs){
        claim.status_logs[i].Tran_SubType_Code_Text = masterData.SUB_STATUS[claim.status_logs[i].Tran_SubType_Code];
    }
    
    const [statusLogModal, setStatusLogModal] = useState(false);
    const [reviewLogModal, setReviewLogModal] = useState(false);

    const propertyAddress = claim.riskAddresses ? claim.riskAddresses[0] : {} ;
    const mailingAddress = claim.riskAddresses ? claim.riskAddresses[0] : {} ;
    const agencyAddress = claim.agencyAddresses ? claim.agencyAddresses.find(a=>a.s_IsDefaultAddress=='Y') : {} ;
    const policy_no = claim.Risk_Id;
    const claim_allocated_to = claim.allocatedTo ? claim.allocatedTo.s_ScreenName : " ";
    const claim_date_allocated = claim.Date_Allocated_Formatted ? claim.Date_Allocated_Formatted : "";
    const claim_date_first_visited = claim.Date_First_Visited_formatted ? claim.Date_First_Visited_formatted : "";
    const allocated_phone = claim.allocatedTo_phoneInfo ? claim.allocatedTo_phoneInfo.find(ele => ele.s_IsDefault == 'Y') : {};
    const claim_allocated_contact_no = allocated_phone ? allocated_phone.s_PhoneNumber : "";
    const claim_manager = claim.claim_manager ? (claim.claim_manager[0] ? claim.claim_manager[0].s_ScreenName : "-") : "-";

    /* Reported By */
    const reported_by_name = claim.reportedBy ? claim.reportedBy.s_FirstName + " " +claim.reportedBy.s_MiddleName + " " +claim.reportedBy.s_LastOrganizationName : "";
    
    const reported_by_address = claim.reportedBy ? claim.reportedBy.addresses.find(a=>a.s_IsDefaultAddress=='Y') : {} ;
    const addressLine1 = reported_by_address ? reported_by_address.s_AddressLine1+", " : "";
    const cityName = reported_by_address.cityName ? reported_by_address.cityName.s_CityName+", " : "";
    const countyName = reported_by_address.countyName ? reported_by_address.countyName.s_CountyName+", " : "";
    const stateName = reported_by_address.stateName ? reported_by_address.stateName.s_StateName+", " : "";
    const postalCode = reported_by_address ? reported_by_address.s_PostalCode : "";
    const reported_by_address_to_display = addressLine1 + cityName + countyName + stateName + postalCode;

    const reported_by_phone_info = claim.reportedBy ? claim.reportedBy.phone_info.find(ele => (ele.s_PhoneTypeCode == 'Phone' && ele.s_IsDefault == 'Y') ) : {};
    const reported_by_fax_info = claim.reportedBy ? claim.reportedBy.phone_info.find(ele => (ele.s_PhoneTypeCode == 'Fax' && ele.s_IsDefault == 'Y') ) : {};
    const reported_by_email_info = claim.reportedBy ? claim.reportedBy.email_info.find(ele => (ele.s_IsDefault == 'Y') ) : {};


    /* Reported By */

    /* Attorney Info */
    const primary_attorney_name = claim.primaryAttorneyInfo ? claim.primaryAttorneyInfo.s_FullLegalName : "";
    const co_attorney_name = claim.coAttorneyInfo ? claim.coAttorneyInfo.s_FullLegalName : "";

    const primary_attorney_assigned_date = claim.PrimaryAttoryAssignDate_formatted ? claim.PrimaryAttoryAssignDate_formatted : "";
    const co_attorney_assigned_date = claim.CoAttoryAssignDate_formatted ? claim.CoAttoryAssignDate_formatted : "";
    /* Attorney Info */

    /* Insured Person Details */
    let insured_person_property_address = '';
    let insured_person_mailing_address = '';
    let insured_person_primary_phone_number = '';
    let insured_person_secondary_phone_number = '';
    let insured_person_email_address = '';
    if (claim) {
        if (claim.insuredPerson) {
            if (claim.insuredPerson.addresses) {
                insured_person_property_address = claim.insuredPerson.addresses.find(ele => ((ele.s_AddressTypeCode && ele.s_AddressTypeCode.toLowerCase() === "location") && ele.s_IsDefaultAddress === 'Y'));
                insured_person_mailing_address = claim.insuredPerson.addresses.find(ele => (ele.s_AddressTypeCode && ele.s_AddressTypeCode.toLowerCase() === "mailing"));
            }
            if (claim.insuredPerson.phone_info) {
                let insuredPhoneInfoList = claim.insuredPerson.phone_info;
                insured_person_primary_phone_number = insuredPhoneInfoList.find(ele => (ele.n_PersonAddressesId_FK === claim.n_PORiskMasterFK && ele.n_SourceFK === claim.ClaimId_PK && ele.s_PhoneTypeCode === 'Phone' && ele.s_CommunicationUseCode === 'Primary'));
                insured_person_secondary_phone_number = insuredPhoneInfoList.find(ele => (ele.n_PersonAddressesId_FK === claim.n_PORiskMasterFK && ele.n_SourceFK === claim.ClaimId_PK && ele.s_PhoneTypeCode === 'Phone' && ele.s_CommunicationUseCode === 'Secondary'));
            }
        }
    }
    /* Insured Person Details */

    const [activeTab, setActiveTab] = useState(new Array(1).fill('1'));

    const lorem = () =>{
        return <>
        <Row className="mt-2">
            <Col xs="12" sm="12" lg="5" className="pr-0 ">
                <div className="d-flex blue-back bg-primary rounded"  style={{    fontSize: "11px", fontWeight: "700",padding: "11px 8px", borderRadius:"7px"}}>
                    <div className="d-flex flex-column" >
                        <span>Select Location: </span>
                        <span>Primary phone number:</span>
                        <span>Accept SMS:</span>
                        <span>Secondary phone number: </span>
                        <span>Accept SMS:</span>
                        <span>Email:</span>
                    </div>
                    <div className="d-flex flex-column" >
                        {/* <span>{ mailingAddress ? ( mailingAddress.s_AddressLine1 +  ", "+mailingAddress.cityName.s_CityName + ", " + mailingAddress.countyName.s_CountyName + ", " + mailingAddress.stateName.s_StateName +  ", " + mailingAddress.s_PostalCode ) : ""}</span> */}
                        <span>{ mailingAddress ? ( mailingAddress.s_AddressLine1 + ", " + mailingAddress.s_PostalCode ) : ""}</span>
                        
                        <span>{ (insured_person_primary_phone_number && insured_person_primary_phone_number != 'undefined') ? insured_person_primary_phone_number.s_PhoneNumber : " " }</span>
                        <span>{ (insured_person_primary_phone_number && insured_person_primary_phone_number != 'undefined') ? (insured_person_primary_phone_number.s_Text_YN == "Y" ? "Yes" : "No") : " " }</span>
                        <span>{ (insured_person_secondary_phone_number && insured_person_secondary_phone_number != 'undefined') ? insured_person_secondary_phone_number.s_PhoneNumber : "-" }</span>
                        <span>{ (insured_person_secondary_phone_number && insured_person_secondary_phone_number != 'undefined') ? (insured_person_secondary_phone_number.s_Text_YN == "Y" ? "Yes" : "No") : "-" }</span>
                        <span>{ insured_person_email_address }</span>
                    </div>
                </div>
            </Col>
            <Col xs="12" sm="12" lg="7" className="pl-1"  style={{ fontSize: "13px", fontWeight: "700"}}>
                <div className="d-flex blue-back bg-primary" style={{ padding: "14px 10px",borderRadius:"6px"}}>
                    <div className="d-flex flex-column w-25">
                        <span>Claim Type </span>
                        <span>Date of Loss</span>
                        <span>Catastrophe Loss </span>

                    </div>
                    <div className="d-flex flex-column w-25">
                        <span>
                            { claim.claim_type ?  claim.claim_type.Description : ""}
                        </span>
                        <span>
                           {claim.Date_Of_Loss ? <Moment date={claim.Date_Of_Loss} format={'MM/DD/YYYY'}/> : ""} 
                        </span>
                        <span>
                            { claim.Catastrophe_YN=='Y' ? 'Yes' : 'No' }
                        </span>

                    </div>
                    <div className="d-flex flex-column w-25">
                        <span>Type of Loss  </span>
                        <span>Service Rep</span>
                        <span>Event Name</span>
                    </div>
                    <div className="d-flex flex-column w-25">
                        <span>
                            { typeOfLossOptions[claim.Loss_Type_Code] }
                        </span>
                        <span>

                            { claim.serviceRepresentative ? (claim.serviceRepresentative.s_ScreenName ? claim.serviceRepresentative.s_ScreenName : "-") : "-" }
                        </span>
                        <span>
                            { claim.Event_Name ? claimEventNameOptions[claim.Event_Name] : "" }
                        </span>

                    </div>
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm="12" lg="12" className="mt-1">
                <div style={{background:"#D9F1F5",padding:"10px 0px" ,borderRadius:"6px"}} className="d-inline-flez">
                    <div className="d-flex justify-content-between pl-2 pr-5">
                        <p className="mb-0 fw-700 fs-13">Name : { reported_by_name }</p>
                        <p className="mb-0 fw-700 fs-13">Address: { reported_by_address_to_display }</p>
                    </div>
                    <div className="d-flex justify-content-between pl-2 pr-5">
                        <p className="mb-0 fw-700 fs-13">Phone: { reported_by_phone_info ? reported_by_phone_info.s_PhoneNumber : "-" }</p>
                        <p className="mb-0 fw-700 fs-13">Fax: { reported_by_fax_info ? reported_by_fax_info.s_PhoneNumber : "-" }</p>
                        <p className="mb-0 fw-700 fs-13">Email: { reported_by_email_info ? reported_by_email_info.s_EmailAddress : "-" }</p>
                    </div>
                </div>
            </Col>
        </Row>
        <Row className="mt-1">
            <Col xs="12" sm="12" lg="12">
                <div className="rounded" style={{backgroundColor:"#6A888C" }}>
                    <h6 className="text-center text-white  mb-0 pt-1 pb-1 " style={{ fontWeight:"700", fontSize:"15px"}}>Description of Loss</h6>
                </div>
                <div>
                    <p className="pt-2 pb-3" style={{ fontSize: "12px" }}>
                        { claim.Remarks ? claim.Remarks : "" }
                    </p>
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm="12" lg="12" >
                <div className="blue-back bg-primary" style={{ fontWeight:"700",
                    fontSize: "11px",
                    padding: "5px",
                    display: "flex",
                    justifyContent: "space-between",borderRadius:"7px"
                }}>
                    <span>Claim Allocated To: { claim_allocated_to } { claim_allocated_contact_no } On { claim_date_allocated } </span>
                    <span>Date first visited: { claim_date_first_visited } </span>
                    <span>Claim manager: { claim_manager } </span>
                    <span>Claim number: { claim.Claim_No ? claim.Claim_No : "" }</span>
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm="12" lg="12">
                <div className="d-flex  mt-1 mb-1" style={{background:"rgb(217, 241, 245)",
                    fontWeight:"700",
                    fontSize: "11px",
                    padding: "4px 4px",
                    display: "flex",
                    justifyContent: "space-evenly",borderRadius:"7px"}}>
                    <span>Primary Attorney: { primary_attorney_name } </span>
                    <span>Assigned { primary_attorney_assigned_date }</span>
                    <span>Co-Attorney Assigned: { co_attorney_name }  </span>
                    <span>Assigned { co_attorney_assigned_date } </span>
                    <span>In House Counsel:</span>{/* Need to update */}
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm="12" lg="12"  >
                <div className="blue-back bg-primary" style={{ fontWeight:"700",
                    fontSize: "11px",
                    padding: "4px 4px",
                    display: "flex",
                    justifyContent: "space-evenly",borderRadius:"7px"
                }}>
                    <span>
                        Reserve Amount: {claim.reserves ? currencyFormat(claim.reserves.filter(r=>Number(r.Amount)>0).reduce((res, r)=>res+Number(r.Amount), 0)) : ''}
                    </span>
                    <span>Total Paid Amount: 
                        <span style={{color:"red"}}>
                        {claim.reserves ? currencyFormat(claim.reserves.filter(r=>Number(r.Amount)<0)
                                                    .reduce((res, r)=>res+Number(r.Amount), 0)) : ''}
                        </span>
                    </span>
                    <span>Claim Approved : { claim.Approval_Status_Code=='1' ? 'Yes' : 'No' }</span>
                </div>

            </Col>
        </Row>
        <Row className=" mt-2">
            <Col xs="12" sm="12" lg="8" className="d-flex pr-1 " style={{fontWeight:"700"}}>
                <div style={{ justifyContent: "space-between",width:"100%",display:'flex',
                    fontSize: "13px",border: "1px solid #7FD2DF",
                    borderRadius: "5px",
                    padding: "7px 10px"}}>
                    <div className="d-flex flex-column">
                        <span>Claim Review Status: <span style={{ "font-weight":"normal" }}>{ claim.reviewStatusCodeText ? claim.reviewStatusCodeText : "-"}</span></span>
                        <span>Claim Status: <span style={{ "font-weight":"normal" }}>{ claim.Claim_Status_Code ? claim.Claim_Status_Code : ""}</span></span>
                    </div>
                    <div className="d-flex flex-column">
                        {claim.reviews ? <span style={{color:"blue",cursor: "pointer"}} onClick={() => setReviewLogModal(true)}>  [View All Review] </span> : "" }
                        {claim.status_logs ? <span style={{color:"blue",cursor: "pointer"}} onClick={() => setStatusLogModal(true)}> [View All Status]</span> : ""}
                    </div>
                    <div className="d-flex flex-column">
                        <span > Claim Review Sub-Status: <span style={{ "font-weight":"normal" }}>{ claim.reviewSubStatusCodesText ? claim.reviewSubStatusCodesText : "-"}</span></span>
                        <span > Claim Sub-Status: <span style={{ "font-weight":"normal" }}>{claim.Claim_SubStatus_Code ? claim.Claim_SubStatus_Code : ""}</span></span>
                    </div>
                    <div className="d-flex flex-column">
                        {claim.reviews ? <span style={{color:"blue",cursor: "pointer"}} onClick={() => setReviewLogModal(true)}>  [View All Review] </span> : "" }
                        {claim.status_logs ? <span style={{color:"blue",cursor: "pointer"}} onClick={() => setStatusLogModal(true)}> [View All Status]</span> : ""}
                    </div>
                </div>
            </Col>
            <Col xs="12" sm="12" lg="4" className="d-flex justify-content-between pl-0" style={{fontWeight:"700"}}>
                <div  style={{ justifyContent: "space-between",width:"100%",display:'flex',
                    fontSize: "13px",border: "1px solid #7FD2DF",
                    borderRadius: "5px",
                    padding: "7px 10px"}}>
                    <div className="d-flex flex-column">
                        <span>Total Loss </span>
                        <span>Right to Repair</span>
                    </div>
                    <div className="d-flex flex-column">
                        
                        <span>  { claim.addInfo ? ((claim.addInfo.s_TotalLoss==null) ? "No" : "Yes") : "" }</span>{/* Need to Update */}
                        <span>  { claim.addInfo ? ((claim.addInfo.s_RightToRepair==null) ? "No" : "Yes") : "" }</span>{/* Need to Update */}
                    </div>
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm="12" lg="12">
                <div className="text-center mt-2" >
                    <Link to={`/claims/intake/${claim.Risk_Id}/${claim.ClaimId_PK}`} className="btn btn-secondary mr-1" style={{fontWeight:"700", fontSize:"12px", padding: "4px 21px"}}>EDIT</Link>
                    <Link to={`/claims/intake/${claim.Risk_Id}`} className="btn btn-secondary ml-1" style={{fontWeight:"700",fontSize:"12px",padding: "4px 21px"}}>ADD NEW</Link>
                </div>
            </Col>
        </Row>
        </>
    }

    const toggle = (tabPane, tab) => {
        const newArray = activeTab.slice();
        newArray[tabPane] = tab;
        setActiveTab(newArray);
    }

    return(
        <>
        <Row>
            <Col  xs="12" sm="12" lg="12" className="d-flex justify-content-between flex-column claimview-tabs ">
                <Nav tabs>
                    <NavItem>
                        <NavLink className="btn"
                                 active={activeTab[0] === '1'}
                                 onClick={() => { toggle(0, '1'); }}
                        >
                            Claim view
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="btn"
                                 active={activeTab[0] === '2'}
                                 onClick={() => { toggle(0, '2'); }}
                        >
                            Payments
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="btn"  active={activeTab[0] === '3'}
                                 onClick={() => { toggle(0, '3'); }}
                        >
                            Attachments
                        </NavLink>
                    </NavItem>
                <NavItem>
                        <NavLink className="btn"  active={activeTab[0] === '4'}
                                 onClick={() => { toggle(0, '4'); }}
                        >
                            Asso. Party
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="btn"  active={activeTab[0] === '5'}
                                 onClick={() => { toggle(0, '5'); }}
                        >
                            Add. Info
                        </NavLink>
                    </NavItem>
                        <NavItem>
                                <NavLink className="btn"  active={activeTab[0] === '6'}
                                         onClick={() => { toggle(0, '6'); }}
                                >
                                    Roof Sketch
                                </NavLink>
                         </NavItem>
                        <NavItem>
                        <NavLink className="btn"  active={activeTab[0] === '7'}
                                 onClick={() => { toggle(0, '7'); }}
                                >
                            Assign Work
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink className="btn"  active={activeTab[0] === '8'}
                                 onClick={() => { toggle(0, '8'); }}
                        >
                            Complaint LOG
                        </NavLink>
                            </NavItem>
                    </Nav>
                <TabContent activeTab={activeTab[0]} className="border-0">
                    {lorem()}
                </TabContent>


            </Col>
        </Row>
        <ClaimStatusLogsModal
            claim={ claim }
            isOpen={statusLogModal}
            toggle={() => setStatusLogModal(false)}
        />
        <ClaimReviewLogsModal
            claim={ claim }
            isOpen={reviewLogModal}
            toggle={() => setReviewLogModal(false)}
        />
        </>
    )
}
export default ClaimInfoTabs;
