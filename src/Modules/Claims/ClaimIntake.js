import React, {useState, useEffect} from 'react';
import {useHttp} from '../../services/claimService';
import {Col, Row } from 'reactstrap';
import { Helmet } from 'react-helmet';

import ClaimBasicInfo from "./components/ClaimIntakeComponents/ClaimBasicInfo";
import ClaimTabs from "./components/ClaimIntakeComponents/ClaimTabs";
import Log from "./log";
import { connect } from 'react-redux';

import { useDispatch, useSelector } from 'react-redux';
import * as ClaimService from '../../services/claimService';

const ClaimIntake = props => {
        const policyId = props.match.params.id;
        const claimId = props.match.params.claimId || 0;

        const { claim, loader } = useSelector(state => state);
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(ClaimService.getPolicyAndClaimDetailForIntake(
                    { policy_no: policyId, claimId: claimId}
                ));
            dispatch(ClaimService.masterValuesDropDown(
                    { policy_no: policyId }
                ));
            dispatch(ClaimService.getDataForAdjusterMap(
                    { policy_no: policyId, claimId: claimId, dataForMapType: 'ADJUSTER' }
                ));

            if(claimId){
                dispatch(ClaimService.getClaimDetails(
                        { policy_no: policyId, claimId: claimId}
                    ));
            }
        }, []);

        /* Policy Details */
        let policyDetails = "";
        if (claim.policyDetails) {
            policyDetails = claim.policyDetails;
        }

        /* Policy Details */

        /* Claim details for edit */
        let claimDetailsForEdit;
        if(claim.claimId){
            claimDetailsForEdit = claim.claimDetailsForEdit[`claim_${claim.claimId}`];
        }
        /* Claim details for edit */

        if(claim.policyNo && claimId == claim.claimId){
    		return (
                <>
                    <Helmet>
                        <title>Avatar Insurance - Claim Add</title>                
                    </Helmet>            
                    <div className="animated fadeIn claimintakediff">
                        <Row>
                            <Col lg="12" xl="9" className="">
                                <ClaimBasicInfo claimId={claimId} policyId={policyId} policyDetails = { policyDetails } claimDetailsForEdit = { claimDetailsForEdit }/>
                                <ClaimTabs claimId={claimId} policyId={policyId} policyDetails = { policyDetails } claimDetailsForEdit = { claimDetailsForEdit }/>
                            </Col>
                            <Col lg="12" xl="3" className="pl-0 pr-2">
                                <Log/>                        
                            </Col>
                        </Row>
                    </div>
                </>
            );
        } else {
            return (
                <div className="sk-wave">
                    <div className="sk-rect sk-rect1"></div>&nbsp;
                    <div className="sk-rect sk-rect2"></div>&nbsp;
                    <div className="sk-rect sk-rect3"></div>&nbsp;
                    <div className="sk-rect sk-rect4"></div>&nbsp;
                    <div className="sk-rect sk-rect5"></div>
                </div>
            );
        }
}

ClaimIntake.propTypes = {
    //getDetail: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({

});

const mapStateToProps = state => ({
    //getList: bindActionCreators(AccountService.accountsList, dispatch),

});

export default connect(mapStateToProps, mapDispatchToProps)(ClaimIntake);