import React from 'react';
import Moment from 'react-moment';
import {Container, Label, CustomInput, Col, Row, Input} from 'reactstrap';
import {ClaimTypesSelect} from "../components/ClaimTypesSelect"
import {UsersSelect} from "../components/UsersSelect"
import {typeOfLossOptions,
    claimStatusCodeOptions,
    claimSubStatusCodeOptions,
    claimReportedByOptions,
    claimEventNameOptions,
    claimReviewStatusCodeOptions,
    claimReviewSubStatusCodeOptions
} from '../../../services/claimService';
import {Select} from "../components/Select"
import {currencyFormat} from "../components/Helper"

export const ClaimView = ({claim, setClaim, editMode}) => {
    
    return (
    <Container fluid={false}>
        <Row>
            <Col md="4">
                PA Involved?
            </Col>
            <Col md="2">
            { editMode ? 
                <CustomInput className="form-check-input" type="checkbox" id="PA_Involved_YN" color="primary"
                    checked = {claim.PA_Involved_YN==='Y'} 
                    onChange = {(e)=>setClaim({...claim, PA_Involved_YN: e.target.checked?'Y':'N'})} 
                /> :
                claim.PA_Involved_YN=='Y' ? 'Yes' : 'No'
            }
            </Col>

            <Col md="2">
                Attorney Involved?
            </Col>
            <Col md="1">
            { editMode ? 
                <CustomInput className="form-check-input" type="checkbox" id="Attorney_Involved_YN" color="primary"
                    checked = {claim.Attorney_Involved_YN=='Y'} 
                    onChange = {(e)=>setClaim({...claim, Attorney_Involved_YN: e.target.checked?'Y':'N'})} 
                /> :
                claim.Attorney_Involved_YN=='Y' ? 'Yes' : 'No'
            }
            </Col>

            <Col md="2">
                AOB Involved
            </Col>
            <Col md="1">
            { editMode ? 
                <CustomInput className="form-check-input" type="checkbox" id="s_IsAOBInvolved_YN" color="primary"
                    checked={claim.addInfo.s_IsAOBInvolved_YN=='Y'} 
                    onChange={(e)=>setClaim({...claim, addInfo: {...claim.addInfo, s_IsAOBInvolved_YN: e.target.checked?'Y':'N'}})} 
                /> :
                claim.addInfo.s_IsAOBInvolved_YN=='Y' ? 'Yes' : 'No'
            }
            </Col>

        </Row>

        <Row style={{background:'#f0f3f5'}}>
            <Col md="2">
                Reported by<br/><br/>
                Claim Type
            </Col>
            <Col md="4">
            { editMode ? 
                (<Select 
                    onChange={(e)=>setClaim({...claim, Reported_By_Relation_Code: e.target.value})}
                    options={claimReportedByOptions}
                    value={claim.Reported_By_Relation_Code}
                />) : 
                <Label>{claimReportedByOptions[claim.Reported_By_Relation_Code]}</Label>
            }<br/>

            { editMode ? 
                <ClaimTypesSelect 
                    onChange={(e)=>setClaim({...claim, ClaimTypeId_FK: e.target.value})}
                    name = 'ClaimTypeId_FK'
                    value={claim.ClaimTypeId_FK}
                    initOptions={[claim.claim_type]}
                /> : 
                claim.claim_type ? <Label>{claim.claim_type.Description}</Label> : ''
            }
            </Col>

            <Col md="2">
                Type of Loss
            </Col>
            <Col md="4">
            { editMode ? 
                (<Select 
                    onChange={(e)=>setClaim({...claim, Loss_Type_Code: e.target.value})}
                    options={typeOfLossOptions}
                    value={claim.Loss_Type_Code}
                />) : 
                <Label>{typeOfLossOptions[claim.Loss_Type_Code]}</Label>
            }
            </Col>

        </Row>

        <Row style={{background:'#f0f3f5'}}>
            <Col md="2">
                Date of Loss
            </Col>
            <Col md="4">
            {editMode ? (
                <Input type="date"
                    onChange={(e)=>setClaim({...claim, Date_Of_Loss: e.target.value})} 
                    value={claim.Date_Of_Loss}
                />
                ):(
                <Moment date={claim.Date_Of_Loss} format={'MM/DD/YYYY'}/>
            )}
            </Col>

            <Col md="2">
                Service Representative
            </Col>
            <Col md="4">
            { editMode ? 
                <UsersSelect
                    onChange={(user)=>setClaim({...claim, Service_Repre_UserId_FK: user.Admin_ID, serviceRepresentative: user})}
                    name = 'Service_Repre_UserId_FK'
                    roleType = 'CLAIMSERVICEREP'
                    value={claim.Service_Repre_UserId_FK}
                    initOptions={claim.serviceRepresentative && claim.serviceRepresentative.Admin_ID ? [claim.serviceRepresentative] : []}
                /> :
                claim.serviceRepresentative ? <Label>{claim.serviceRepresentative.s_ScreenName}</Label> : ''
            }
            </Col>

        </Row>

        <Row>
            <Col md="4">
                Catastrophe Loss
            </Col>
            <Col md="2">
            { editMode ? 
                <CustomInput className="form-check-input" type="checkbox" id="Catastrophe_YN" color="primary"
                    checked = {claim.Catastrophe_YN=='Y'} 
                    onChange = {(e)=>setClaim({...claim, Catastrophe_YN: e.target.checked?'Y':'N'})} 
                /> :
                claim.Catastrophe_YN=='Y' ? 'Yes' : 'No'
            }
            </Col>

            <Col md="2">
                Event Name
            </Col>

            <Col md="4">
            { editMode ? 
                (<Select 
                    onChange={(e)=>setClaim({...claim, Event_Name: e.target.value})}
                    options={claimEventNameOptions}
                    value={claim.Event_Name||''}
                />) : 
                <Label>{claimEventNameOptions[claim.Event_Name]}</Label>
            }
            </Col>

        </Row>

        <Row>
            <Col md="3">
                Description of Loss
            </Col>

            <Col md="9">
            {editMode ? (
                <Input type="textarea" rows="2"
                    placeholder="Description of Loss ..."
                    onChange={(e)=>setClaim({...claim, Remarks: e.target.value})} 
                    value={claim.Remarks}
                />
                ):(
                <Label>{claim.Remarks}</Label>
            )}
            </Col>
        </Row>

        <Row>
            <Col md="2">
                Claim Number
            </Col>
            <Col md="4">
                <Label>{claim.Claim_No}</Label>
            </Col>

            <Col md="4">
                DFS Complaint/AOB/Legal
            </Col>
            <Col md="2">
            { editMode ? 
                <CustomInput className="form-check-input" type="checkbox" id="DFS_Complain_YN" color="primary"
                    checked = {claim.DFS_Complain_YN=='Y'} 
                    onChange = {(e)=>setClaim({...claim, DFS_Complain_YN: e.target.checked?'Y':'N'})} 
                /> :
                claim.DFS_Complain_YN=='Y' ? 'Yes' : 'No'
            }
            </Col>

        </Row>

        <Row>
            <Col md="4">
                Total Reserve Amount
            </Col>
            <Col md="2">
                <Label>
                    {claim.reserves ? 
                        currencyFormat(claim.reserves.filter(r=>Number(r.Amount)>0)
                                                .reduce((res, r)=>res+Number(r.Amount), 0)) 
                    : ''}
                </Label>
            </Col>

            <Col md="4">
                Total Paid Amount
            </Col>
            <Col md="2">
                <Label>
                    {claim.reserves ? 
                        currencyFormat(claim.reserves.filter(r=>Number(r.Amount)<0)
                                                .reduce((res, r)=>res+Number(r.Amount), 0)) 
                    : ''}
                </Label>
            </Col>

        </Row>

        <Row style={{background:'#f0f3f5'}}>
            <Col md="4">
                Claim Approved
            </Col>
            <Col md="2">
            { editMode ? 
                <CustomInput className="form-check-input" type="checkbox" id="Approval_Status_Code" color="primary"
                    checked = {claim.Approval_Status_Code=='1'} 
                    onChange = {(e)=>setClaim({...claim, Approval_Status_Code: e.target.checked?'1':'2'})} 
                /> :
                claim.Approval_Status_Code=='1' ? 'Yes' : 'No'
            }
            </Col>

        </Row>

        <Row>
            <Col md="2">
                Claim Review Status
            </Col>

            <Col md="4">
            { editMode ? 
                <Select 
                    onChange={(e)=>setClaim({...claim, reviewStatusCode : e.target.value})}
                    options={claimReviewStatusCodeOptions}
                    value={claim.reviewStatusCode}
                /> : 
                <Label>{claimReviewStatusCodeOptions[claim.reviewStatusCode]}</Label>
            }
            </Col>

            <Col md="2">
                Claim Review Sub-Status
            </Col>

            <Col md="4">
            { editMode ? 
                (<Select 
                    onChange={(e)=>setClaim({...claim, reviewSubStatusCodes: [...e.target.options].filter(o=>o.selected).map(o=>o.value)})}
                    options={claimReviewSubStatusCodeOptions} multiple={true} required={true}
                    value={claim.reviewSubStatusCodes}
                />) : 
                <Label>{(claim.reviewSubStatusCodes.map(c=>claimReviewSubStatusCodeOptions[c])).join(', ')}</Label>
            }
            </Col>

        </Row>

        <Row>
            <Col md="2">
                Claim Status
            </Col>

            <Col md="4">
            { editMode ? 
                <Select 
                    onChange={(e)=>setClaim({...claim, Claim_Status_Code : e.target.value})}
                    options={claimStatusCodeOptions}
                    value={claim.Claim_Status_Code}
                /> : 
                <Label>{claimStatusCodeOptions[claim.Claim_Status_Code]}</Label>
            }
            </Col>

            <Col md="2">
                Claim Sub-Status
            </Col>

            <Col md="4">
            { editMode ? 
                <Select 
                    onChange={(e)=>setClaim({...claim, Claim_SubStatus_Code : e.target.value})}
                    options={claimSubStatusCodeOptions}
                    value={claim.Claim_SubStatus_Code}
                /> : 
                <Label>{claimSubStatusCodeOptions[claim.Claim_SubStatus_Code]}</Label>
            }
            </Col>

        </Row>

    </Container>
)}