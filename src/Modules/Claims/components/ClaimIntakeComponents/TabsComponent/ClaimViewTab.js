import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Row, Input, Button, Table,Modal, ModalBody, ModalHeader } from 'reactstrap';
import { LocalForm, Control, Errors, actions, Fieldset } from 'react-redux-form';
import { AppSwitch } from '@coreui/react';

import {AssignClaimModal} from '../modals/AssignClaimModal';
import AssignClaimAllocaedToUsingMapModal from '../modals/AssignClaimAllocaedToUsingMapModal';
import ZipDetailsView from '../ZipDetailsView';

import { useDispatch, useSelector } from 'react-redux';
import * as ClaimService from '../../../../../services/claimService';

import { required,validateEmail } from '../../../../../utilities/regex';
import Message from '../../../../../utilities/message';
import * as action from '../../../../../store/actions/claim';
import Moment from 'moment';
import SweetAlert from 'react-bootstrap-sweetalert';

const ClaimViewTab = (prop) => {
    const history = useHistory();
    const [claimAssign, setClaimAssign] = React.useState(false);
    const [claimAssignFromMap, setClaimAssignFromMap] = React.useState(false);
    const [claimAllocatedTo, setClaimAllocatedTo] = React.useState("");
    const [currentClaimAllocatedTo, setCurrentClaimAllocatedTo] = React.useState("");
    const [claimReportedBy, setClaimReportedBy] = React.useState("");
    const [claimManager, setClaimManager] = React.useState("");
    const [checkingForAdjusterClaim, setCheckingForAdjusterClaim] = React.useState(false);
    const [claimInspectionStatus, setClaimInspectionStatus] = React.useState(false);
    const [claimInspectionData, setClaimInspectionData] = React.useState( {inspection_status:'',
                                                                            insp_info_id_pk : ''} );
    const [claimInspAlert, setClaimInspAlert] = React.useState(null);

    const [claimReportedByCityName, setClaimReportedByCityName] = React.useState("");    
    const [claimReportedByStateName, setClaimReportedByStateName] = React.useState("");
    const [claimReportedByCountryName, setClaimReportedByCountryName] = React.useState("");

    const [isCityModalOpen, setIsCityModalOpen] = React.useState(false);
    const [multipleCity, setMultipleCity] = React.useState("");
    const [claimApprovedCode, setClaimApprovedCode] = React.useState("N");

    const dispatch = useDispatch();
    const { claim, loader } = useSelector(state => state);
    const [claimTotalLoss, setClaimTotalLoss] = React.useState("N");
    const [claimRightToRepair, setClaimRightToRepair] = React.useState("N");
    const [claimReviewCode, setClaimReviewCode] = React.useState("");
    const [claimStatusCode, setClaimStatusCode] = React.useState("");
    const [claimPoTransactionFk, setclaimPoTransactionFk] = React.useState("");
    
    let myFormRef = React.createRef();

    let maxDateOfLoss = new Date().toJSON().slice(0,10);//YYYY-MM-DD
    let minDateOfLoss = Moment().subtract(3, 'months').format('YYYY-MM-DD');
    
    let claimDetailsForEdit;
    if(claim.claimId){
        claimDetailsForEdit = claim.claimDetailsForEdit[`claim_${claim.claimId}`];        
    }

    const checkPrPhoneNum = ({PrPhoneNum, acceptSms})=> {
            if(acceptSms == 'Yes'){
                return PrPhoneNum && PrPhoneNum.toString().trim().length;
            }
            return true;
    };

    const checkReportedBy = ({TbPersoninfo, TbEmailinfo, TbPhoneinfo, relationType_txt})=> {
        let errors = [];
        if(relationType_txt == "ATTORNEY" || relationType_txt == 3 || relationType_txt == 4){
            
            if(!TbPhoneinfo.s_PhoneNumber || !TbPhoneinfo.s_PhoneNumber.toString().trim().length){
                errors.push("Phone Number is required");
            }

            if(!TbEmailinfo.s_EmailAddress || !TbEmailinfo.s_EmailAddress.toString().trim().length){
                errors.push("Email is required");
            }

            if(!TbPersoninfo.s_FirstName || !TbPersoninfo.s_FirstName.toString().trim().length){
                errors.push("First Name is required");
            }
            
            return (!errors.length ? true : false);
        }
        return true;
    };

    const checkEventName = ({Event_Name, Catastrophe})=> {
        if(Catastrophe == 'Yes'){
            return Event_Name && Event_Name.toString().trim().length;
        }
        return true;
    };

    const checkStatus = ({status_txt}) => {
        if(data.status_txt == status_txt){ return true; }

        if(!claim.claimId && status_txt != "Open"){
            return false;    
        }

        if(claim.claimId && data.status_txt == "Open" && status_txt == "Re-Open"){
            return false;    
        }

        if(claim.claimId && data.status_txt == "Re-Open" && status_txt == "Open"){
            return false;    
        }

        if(claim.claimId && data.status_txt == "Close" && status_txt == "Open"){
            return false;    
        }

        return true;
    }

    useEffect(() => {
        setSwitchState({...switchState, ...{
                PAInvolved: data.PAInvolved,
                AttorneyInvolved: data.AttorneyInvolved,
                Catastrophe: data.Catastrophe,
                DFSComplain: data.DFSComplain,
                AOBInvolved: data.AOBInvolved,
                acceptSms: data.acceptSms
            }
        });

        if(data.claim_allocated_to_user) {
            setCurrentClaimAllocatedTo(data.claim_allocated_to_user);
        }

        setClaimReportedBy(data.relationType_txt);

        setClaimReportedByCityName(data.TbPersonaddress.s_CityName);
        setClaimReportedByStateName(data.TbPersonaddress.s_StateName);
        setClaimReportedByCountryName(data.TbPersonaddress.s_CountyName); //s_CountyCode


        if(data.status_txt){
            dispatch(ClaimService.getSubStatus({
                    mainType: data.status_txt,
                    policy_no: claim.policyId
                }));
        }

        if(data.claim_review_status){
            dispatch(ClaimService.getReviewSubStatus({
                mainType: data.claim_review_status,
                policy_no: claim.policyId
            }));
        }

        if(data.relationType_txt == 3){
            setSwitchStateDisable({...switchStateDisable, PAInvolved:true});
        }

        if(data.relationType_txt == "ATTORNEY"){
            setSwitchStateDisable({...switchStateDisable, AttorneyInvolved:true});
        }

        setClaimApprovedCode(data.claim_approved_code);
        setClaimTotalLoss(data.totalLoss);
        setClaimRightToRepair(data.rightToRepair);
        setClaimManager(data.ClaimManager);
        setclaimPoTransactionFk(data.n_potransaction_FK);
    },[]);
    
    let totalClaims = claim.policyDetails.claims_ids.length;

    let reportedByRelation = "";
    let reportedByRelationCondition = false;
    let claimReportedByFromDB = "";
    let Reported_TbPersoninfo = { 's_FirstName': "", 's_MiddleName': "", 's_LastOrganizationName': ''};
    let Reported_TbPhoneinfo = { 's_PhoneNumber': "", 's_FaxNo': ""};
    let Reported_TbEmailinfo = { 's_EmailAddress': "" };
    let Reported_TbPersonaddress = {
        "s_HouseNo": "",
        "s_HouseDirection1": "",
        "s_StreetName": "",
        "s_HouseType": "",
        "s_HouseDirection2": "",
        "n_CityId_FK": "",
        "s_CityName": "",
        "n_StateId_FK": "",
        "s_StateName": "",
        "n_CountyId_FK": "",
        "n_CountryId_FK": "",
        "s_CountyName": "","s_PostalCode" : ""
    };
    let claimPersonAddressPK =- ""; let claimPersonAddressPhonePK = ""; let claimPersonAddressFaxPK = ""; let claimPersonAddressEmailPK = "";

    var data = {}
    data.ClaimId_PK = "";
    data.Risk_Id = claim.policyDetails.Policy_No;
    data.n_PolicyNoId_FK = claim.policyDetails.n_PolicyNoId_PK;
    data.Owner_Client_FK = claim.policyDetails.n_OwnerId_FK;
    data.n_AgencyPersoninfoId_FK = (claim.policyDetails.agency) ? claim.policyDetails.agency.n_PersonInfoId_PK : "";
    data.n_AgencyAccount_FK = claim.policyDetails.n_AgencyAccount_FK;
    data.Sub_Agent_Client_FK = claim.policyDetails.n_SubAgentPersoninfo_FK;
    data.TbPersoninfo = Reported_TbPersoninfo;
    data.PAInvolved = "No";
    data.AttorneyInvolved = "No";
    data.Catastrophe = "No";
    data.DFSComplain = "No";
    data.AOBInvolved = "No";
    data.acceptSms = "No";
    data.remarks_txt = "";
    data.PORiskMaster_PK = "";
    data.n_PORiskMasterFK = "";
    data.ClaimType_txt = "";
    data.TypeofLoss = "";
    data.date_of_loss = "";
    data.ServiceRep = "";
    data.Event_Name = "";
    data.TbPhoneinfo = Reported_TbPhoneinfo;
    data.TbEmailinfo = Reported_TbEmailinfo;
    data.TbPersonaddress = Reported_TbPersonaddress;
    data.remarks_txt = "";
    data.claim_allocated_on_date = "";
    data.ClaimManager = "";
    data.PrimaryAttorney_PK = "";
    data.PrimaryAttorney_AssignDate = "";
    data.CoAttorney_PK = "";
    data.CoAttorney_AssignDate = "";
    data.In_House_Counsel = "";
    data.claimReportedPersonPK = "";
    data.relationType_txt = reportedByRelation;
    data.status_txt = "Open";
    data.substatus_txt = "";
    data.claim_review_status = "";
    data.claim_review_sub_status = [];
    data.claim_allocated_to_user = "";
    data.claim_approved_code = "N";
    data.totalLoss = "N";
    data.rightToRepair = "N";
    data.addressIdPk_hidden = "";
    data.n_potransaction_FK = "";
    data.allocatedTo={};

    const [switchState, setSwitchState] = React.useState({
            PAInvolved: data.PAInvolved,
            AttorneyInvolved: data.AttorneyInvolved,
            Catastrophe: data.Catastrophe,
            DFSComplain: data.DFSComplain,
            AOBInvolved: data.AOBInvolved,
            acceptSms: data.acceptSms
        });

    const [switchStateDisable, setSwitchStateDisable] = React.useState({
            PAInvolved: false,
            AttorneyInvolved: false
        });

    const getClaimReviewStatusAndSubStatus = (reviews) => {
        let claimReviewStatusSelected = "";
        let claimReviewSubStatusSelectedArray = [];

        /* Select Max transaction no from array */
        let maxTranNo = 0;
        reviews.forEach(ele => {
            if (ele.n_TransNo > maxTranNo) {
                maxTranNo = ele.n_TransNo;
            }
        });
        /* Record with n_TransNo max */
        let resultReviewData = reviews.filter(ele => ele.n_TransNo === maxTranNo);
        if (resultReviewData.length) {
            claimReviewStatusSelected = resultReviewData[0].s_ReviewMainCode;
            resultReviewData.map((ele) => {
                claimReviewSubStatusSelectedArray.push(ele.s_ReviewSubCode);
            });
        }

        return [claimReviewStatusSelected, claimReviewSubStatusSelectedArray];
    };

    //SET EDIT DATA
    if(claimDetailsForEdit ) {
        /* Reported by */
        reportedByRelation = claimDetailsForEdit.Reported_By_Relation_Code;
        reportedByRelationCondition = (reportedByRelation === '3' || reportedByRelation === '5' || reportedByRelation === 'ATTORNEY');
        claimReportedByFromDB = claimDetailsForEdit.reportedBy ? claimDetailsForEdit.reportedBy : "";
        if (claimReportedByFromDB) {
            /* Phone info */
            if (reportedByRelationCondition && claimReportedByFromDB.phone_info) {
                let primary_phone_info = claimReportedByFromDB.phone_info.find(ele => (ele.s_PhoneTypeCode === 'Phone' && (ele.s_CommunicationUseCode === 'Primary' || ele.s_IsDefault === 'Y')));
                if (primary_phone_info != undefined) {                    
                    claimPersonAddressPhonePK = primary_phone_info.n_PhoneInfoId_PK;
                    Reported_TbPhoneinfo.s_PhoneNumber = (typeof primary_phone_info != "undefined") ? primary_phone_info.s_PhoneNumber : "";    
                }                

                let primary_fax_info = claimReportedByFromDB.phone_info.find(ele => (ele.s_PhoneTypeCode === 'Fax' && (ele.s_CommunicationUseCode === 'Primary' || ele.s_IsDefault === 'Y')));

                if(primary_fax_info != undefined) {
                    claimPersonAddressFaxPK = primary_fax_info.n_PhoneInfoId_PK;
                    Reported_TbPhoneinfo.s_FaxNo = (typeof primary_fax_info != "undefined") ? primary_fax_info.s_PhoneNumber : "";    
                }                
            }
            /* Email Info */
            if (reportedByRelationCondition && claimReportedByFromDB.email_info) {
                let primary_email_info = claimReportedByFromDB.email_info.find(ele => (ele.s_CommunicationUseCode === 'Primary' && ele.s_IsDefault === 'Y'));
                if (primary_email_info != undefined) {
                    claimPersonAddressEmailPK = primary_email_info.n_EmailInfoId_PK;
                    Reported_TbEmailinfo.s_PhoneNumber = (typeof primary_email_info != "undefined") ? primary_email_info.s_EmailAddress : "";
                }
            }
            /* Person Info */
            if (reportedByRelationCondition && claimReportedByFromDB) {
                Reported_TbPersoninfo.s_FirstName = claimReportedByFromDB.s_FirstName;
                Reported_TbPersoninfo.s_MiddleName = claimReportedByFromDB.s_MiddleName;
                Reported_TbPersoninfo.s_LastOrganizationName = claimReportedByFromDB.s_LastOrganizationName;
            }
            /* Address Info */
            if (reportedByRelation && (Array.isArray(claimDetailsForEdit.reportedBy.addresses) && claimDetailsForEdit.reportedBy.addresses.length)) {
                let location = claimDetailsForEdit.reportedBy.addresses.find(ele => ele.s_IsDefaultAddress === 'Y');
                if(location != undefined) {
                    claimPersonAddressPK = location.n_PersonAddressesId_PK;
                    Reported_TbPersonaddress.s_HouseNo = location.s_HouseNo;
                    Reported_TbPersonaddress.s_HouseDirection1 = location.s_HouseDirection1;
                    Reported_TbPersonaddress.s_StreetName = location.s_StreetName;
                    Reported_TbPersonaddress.s_HouseType = location.s_HouseType;
                    Reported_TbPersonaddress.s_HouseDirection2 = location.s_HouseDirection2;
                    Reported_TbPersonaddress.s_CityName = location.cityName.s_CityName;
                    Reported_TbPersonaddress.n_CityId_FK = location.cityName.n_CityId_PK;
                    Reported_TbPersonaddress.s_CountyName = location.countyName.s_CountyName;
                    Reported_TbPersonaddress.n_CountyId_FK = location.countyName.n_CountyId_PK;
                    Reported_TbPersonaddress.s_StateName = location.stateName.s_StateName;
                    Reported_TbPersonaddress.n_StateId_FK = location.stateName.n_StateId_PK;
                    Reported_TbPersonaddress.s_CountryName = location.countryName.s_CountryName;
                    Reported_TbPersonaddress.n_CountryId_FK = location.countryName.n_CountryId_PK;
                    Reported_TbPersonaddress.s_PostalCode = location.s_PostalCode;

                    /* Phone info from PersonAddress */
                    if (location.phone_info) {
                        let primary_phone_info = location.phone_info.find(ele => (ele.s_PhoneTypeCode === 'Phone' && (ele.s_CommunicationUseCode === 'Primary' || ele.s_IsDefault === 'Y')));
                        if (primary_phone_info != undefined) {
                            claimPersonAddressPhonePK = primary_phone_info.n_PhoneInfoId_PK;
                            Reported_TbPhoneinfo.s_PhoneNumber = (typeof primary_phone_info != "undefined") ? primary_phone_info.s_PhoneNumber : "";
                        }
                        let primary_fax_info = location.phone_info.find(ele => (ele.s_PhoneTypeCode === 'Fax' && (ele.s_CommunicationUseCode === 'Primary' || ele.s_IsDefault === 'Y')));
                        if(primary_fax_info != undefined) {
                            claimPersonAddressFaxPK = primary_fax_info.n_PhoneInfoId_PK;
                            Reported_TbPhoneinfo.s_FaxNo = (typeof primary_fax_info != "undefined") ? primary_fax_info.s_PhoneNumber : "";
                        }
                    }
                    /* Email info from PersonAddress */
                    if (location.email_info) {
                        let primary_email_info = location.email_info.find(ele => ( ele.s_IsDefault === 'Y' ));
                        if (primary_email_info != undefined) {
                            claimPersonAddressEmailPK = primary_email_info.n_EmailInfoId_PK;
                            Reported_TbEmailinfo.s_EmailAddress = (typeof primary_email_info != "undefined") ? primary_email_info.s_EmailAddress : "";
                        }
                    }
                }
            } 
        }
        /* Reported by */

        /* Claim Status */
        /* Total-Loss and Right-to-repair */
        if(Object.keys(claimDetailsForEdit.addInfo).length > 0) {
            if (claimDetailsForEdit.addInfo.s_TotalLoss === 'Yes') {
                data.totalLoss = 'Y';
            } else {
                data.totalLoss = 'N';
            }
            if (claimDetailsForEdit.addInfo.s_RightToRepair === 'Yes') {
                data.rightToRepair = "Y";
            } else {
                data.rightToRepair = "N";
            }
        }
        /* Total-Loss and Right-to-repair */

        /* Claim Review */
        let claimReviewStatusSelected = "";
        let claimReviewSubStatusSelectedArray = [];

        if (Array.isArray(claimDetailsForEdit.reviews) && claimDetailsForEdit.reviews.length) {
            [claimReviewStatusSelected, claimReviewSubStatusSelectedArray] = getClaimReviewStatusAndSubStatus(claimDetailsForEdit.reviews);
        }
        /* Claim Review */       
        data.ClaimId_PK = claimDetailsForEdit.ClaimId_PK;        
        data.TbPersoninfo = Reported_TbPersoninfo;
        data.PAInvolved = claimDetailsForEdit.PA_Involved_YN === 'Y' ? "Yes" : "No";
        data.AttorneyInvolved = claimDetailsForEdit.Attorney_Involved_YN === 'Y' ? "Yes" : "No";
        data.Catastrophe = claimDetailsForEdit.Catastrophe_YN == 'Y' ? "Yes" : "No";
        data.DFSComplain = claimDetailsForEdit.DFS_Complain_YN == 'Y' ? "Yes" : "No";
        data.AOBInvolved = claimDetailsForEdit.addInfo.s_IsAOBInvolved_YN === 'Y' ? "Yes" : "No";
        data.remarks_txt = claimDetailsForEdit.Remarks ? claimDetailsForEdit.Remarks : "";
        data.PORiskMaster_PK = claimDetailsForEdit.n_PORiskMasterFK != "" ? claimDetailsForEdit.n_PORiskMasterFK : "";
        data.n_PORiskMasterFK = claimDetailsForEdit.n_PORiskMasterFK != "" ? claimDetailsForEdit.n_PORiskMasterFK : "";
        data.ClaimType_txt = claimDetailsForEdit.ClaimTypeId_FK != "" ? claimDetailsForEdit.ClaimTypeId_FK : "";
        data.TypeofLoss = claimDetailsForEdit.Loss_Type_Code != "" ? claimDetailsForEdit.Loss_Type_Code : "";
        data.date_of_loss = claimDetailsForEdit.Date_Of_Loss != "" ? claimDetailsForEdit.Date_Of_Loss : "";
        data.ServiceRep = claimDetailsForEdit.Service_Repre_UserId_FK > 0 ? claimDetailsForEdit.Service_Repre_UserId_FK : "";
        data.Event_Name = claimDetailsForEdit.Event_Name != "" ? claimDetailsForEdit.Event_Name : "";
        data.TbPhoneinfo = Reported_TbPhoneinfo;
        data.TbEmailinfo = Reported_TbEmailinfo;
        data.TbPersonaddress = Reported_TbPersonaddress;
        data.remarks_txt = claimDetailsForEdit.Remarks ? claimDetailsForEdit.Remarks : "";
        data.claim_allocated_on_date = claimDetailsForEdit.Date_Allocated ? claimDetailsForEdit.Date_Allocated : "";
        data.ClaimManager = (Array.isArray(claimDetailsForEdit.claim_manager) && claimDetailsForEdit.claim_manager.length) ? claimDetailsForEdit.claim_manager[0].Admin_ID : "";
        data.PrimaryAttorney_PK = claimDetailsForEdit.n_PrimaryAttorneyPersonId_FK > 0 ? claimDetailsForEdit.n_PrimaryAttorneyPersonId_FK : "";
        data.PrimaryAttorney_AssignDate = claimDetailsForEdit.d_PrimaryAttoryAssignDate != "0000-00-00 00:00:00" ? claimDetailsForEdit.PrimaryAttoryAssignDate_formatted : "";
        data.CoAttorney_PK = claimDetailsForEdit.n_CoAttorneyPersonId_FK > 0 ? claimDetailsForEdit.n_CoAttorneyPersonId_FK : "";
        data.CoAttorney_AssignDate = claimDetailsForEdit.d_CoAttoryAssignDate != "0000-00-00 00:00:00" ? claimDetailsForEdit.CoAttoryAssignDate_formatted : "";
        data.In_House_Counsel = claimDetailsForEdit.InHouseCounsel_Person_FK > 0 ? claimDetailsForEdit.InHouseCounsel_Person_FK : "";
        data.claimReportedPersonPK = claimDetailsForEdit.Reported_By_PersonId_FK > 0 ? claimDetailsForEdit.Reported_By_PersonId_FK : "";
        data.relationType_txt = reportedByRelation;
        data.status_txt = claimDetailsForEdit.Claim_Status_Code ? claimDetailsForEdit.Claim_Status_Code : "";
        data.substatus_txt = claimDetailsForEdit.Claim_SubStatus_Code ? claimDetailsForEdit.Claim_SubStatus_Code : "";
        
        data.claimPersonAddressPK = claimPersonAddressPK;
        data.claimPersonAddressPhonePK = claimPersonAddressPhonePK;
        data.claimPersonAddressFaxPK = claimPersonAddressFaxPK;
        data.claimPersonAddressEmailPK = claimPersonAddressEmailPK;
        data.old_status = claimDetailsForEdit.Claim_Status_Code != "" ? claimDetailsForEdit.Claim_Status_Code : "";
        data.date_of_loss_1 = claimDetailsForEdit.Date_Of_Loss != "" ? claimDetailsForEdit.Date_Of_Loss : "";
        data.ClaimManager_1 = (Array.isArray(claimDetailsForEdit.claim_manager) && claimDetailsForEdit.claim_manager.length) ? claimDetailsForEdit.claim_manager[0].Admin_ID : "";
        data.ServiceRep_1 = claimDetailsForEdit.Service_Repre_UserId_FK != "" ? claimDetailsForEdit.Service_Repre_UserId_FK : "";
        data.claim_allocated_to_user_1 = claimDetailsForEdit.Allocated_To_UserId_FK ? claimDetailsForEdit.Allocated_To_UserId_FK : "";
        data.claim_allocated_to_user = claimDetailsForEdit.Allocated_To_UserId_FK ? claimDetailsForEdit.Allocated_To_UserId_FK : "";
        data.ClaimType_txt_1 = claimDetailsForEdit.ClaimTypeId_FK ? claimDetailsForEdit.ClaimTypeId_FK : "";

        data.claim_review_status = claimReviewStatusSelected;
        data.claim_review_sub_status = claimReviewSubStatusSelectedArray;
        data.totalLossVal_hidden = claimTotalLoss;
        data.claimAddInfoIdPk_hidden = claimDetailsForEdit.addInfo ? claimDetailsForEdit.addInfo.id : "";
        data.claim_approved_code = claimDetailsForEdit.Approval_Status_Code ? claimDetailsForEdit.Approval_Status_Code : "";
        /* n_potransaction_FK */
        data.n_potransaction_FK = claimDetailsForEdit ? claimDetailsForEdit.n_potransaction_FK : "";
        data.allocatedTo = claimDetailsForEdit ? claimDetailsForEdit.allocatedTo : {};
    }
    
    const handleSubmit = (values) => {
        const object = {
          ...values
        };
        if(values.ClaimId_PK == '') {
            dispatch(ClaimService.saveClaimDetails(object))
            .then(() => {
            });
        } else {
            if(claim.claimId){
                dispatch(ClaimService.checkInHouseVendorStatus({claimPK :claim.claimId}))
                .then((res) => {
                    if(res.data.inHouseVendorPopup == 'Y'){
                        setClaimInspAlert(getClaimInspAlert("warning", "WARNING!", data.res.inHouseVendorPopupMsg));
                    }
                });
            }

            dispatch(ClaimService.updateClaimDetails(object))
            .then(() => {history.push("/claims/"+claim.claimId);});
        }        
    };

    const handleChange = (values) => {
        
    };

    const selectAllocateTo = (e) => {
        setClaimAllocatedTo(e.target.value);
    }

    const updateAllocateToRefDd = () => {
        updateAllocateToRef(claimAllocatedTo);
    }

    const checkAdjusterClaimAndSetClaimAssignFromMap = () => {
        checkAdjusterClaim();
        setClaimAssignFromMap(true);
    }

    const checkAdjusterClaimAndSetClaimAssignFromDd = () => {
        checkAdjusterClaim();
        setClaimAssign(true);
    }

    const selectAllocateToFromMap = (adjusterId, addressIdPk) => {
        myFormRef.dispatch(
            actions.change(
                "claimDetails.addressIdPk_hidden",
                addressIdPk));
        setClaimAllocatedTo(adjusterId);        
        updateAllocateToRef(adjusterId);
    }

    const updateAllocateToRef = (adjusterId) => {
        setCurrentClaimAllocatedTo(adjusterId);
        myFormRef.dispatch(
            actions.change(
                "claimDetails.claim_allocated_to_user",
                adjusterId));
        updateClaimManager(adjusterId);

        //CREATE INSPECTION
        if(claim.claimId && adjusterId) {
            if(claimInspectionData.inspection_status=='OPEN' || claimInspectionData.inspection_status=='PENDING'){
                if(!claimInspectionData.adjuster_name){
                    setCheckingForAdjusterClaim(true);                    
                    updateInspBatchDetails(adjusterId);
                }else {
                    setClaimAssign(false);
                    setClaimAssignFromMap(false);
                }
            } else if(claimInspectionData.inspection_status=='CLOSE') {
                setCheckingForAdjusterClaim(true);
                newClaimInsp(adjusterId);
            } else if(claimInspectionData.inspection_status=='NEW') {                
                setCheckingForAdjusterClaim(true);
                newClaimInsp(adjusterId);   
            }
        } else {
            setClaimAssign(false);
            setClaimAssignFromMap(false);
        }
    }

    const checkAdjusterClaim = () => {
        setCheckingForAdjusterClaim(false);                
        if(claim.claimId && currentClaimAllocatedTo) {
            setCheckingForAdjusterClaim(true);
            dispatch(ClaimService.checkAdjusterClaim({
                claimPK: claim.claimId,
                allocatedToUser: currentClaimAllocatedTo
            })).then((res) => {
                let dataToSetClaimInspection = {
                    inspection_status:'',
                    adjuster_name: '',
                    inspection_batch_details_id: '',
                    insp_info_id_pk : ''
                };

                dataToSetClaimInspection.inspection_status = res.data.value;

                if(res.data.AdjusterName){
                    dataToSetClaimInspection.adjuster_name = res.data.AdjusterName;
                }

                if(res.data.inspBDID){
                    dataToSetClaimInspection.inspection_batch_details_id = res.data.inspBDID;
                }

                if(res.data.inspInfoIdPK){
                    dataToSetClaimInspection.insp_info_id_pk = res.data.inspInfoIdPK;
                }

                setClaimInspectionData(dataToSetClaimInspection);
                setCheckingForAdjusterClaim(false);
            });
        }
    }

    const newClaimInsp = (adjusterId) => {
        let params = {claimPK:claim.claimId, poTransactionPk: claimPoTransactionFk, 
                        policyNoId:claim.policyDetails.n_PolicyNoId_PK,
                        selectedAdjuster:adjusterId};
        dispatch(ClaimService.claimInspectionOperation(params, 'NEW'))
        .then((res) => {
            //SUCCESS
            setCheckingForAdjusterClaim(false);
            setClaimAssign(false);
            setClaimAssignFromMap(false);
            let msgToDisplay = res.data.message + (res.data.GCMmsg ? ', '+res.data.GCMmsg : '');

            if(res.data.policyNoId){
                setClaimInspAlert(getClaimInspAlert("success", "CLAIM CREATED!", msgToDisplay));
            } else {
                setClaimInspAlert(getClaimInspAlert("error", "ERROR!", msgToDisplay));
            }

        });
    }

    const updateInspBatchDetails = (adjusterId) => {
        let params = {claimPK:claim.claimId, inspectionBatchDetailsId: claimInspectionData.inspection_batch_details_id, 
                        policyNoId:claim.policyDetails.n_PolicyNoId_PK,
                        selectedAdjuster:adjusterId};   
        dispatch(ClaimService.claimInspectionOperation(params, 'UPDATE'))
        .then((res) => {
            setCheckingForAdjusterClaim(false);
            setClaimAssign(false);
            setClaimAssignFromMap(false);
            if(res.data.statusInspBD === 'Y' && res.data.statusTbClaim === 'Y'){
                //SUCCESS
                let msgToDisplay = 'Adjuster assign successfully. '+res.data.GCMmsg;
                setClaimInspAlert(getClaimInspAlert("success", "CLAIM UPDATED!", msgToDisplay));
            }else{
                //ERROR
                let msgToDisplay = "Something went wrong!";
                setClaimInspAlert(getClaimInspAlert("error", "ERROR!", msgToDisplay));
            }
        });
    }

    const reopenClaimInspection = () => {
        let params = {claimPK:claim.claimId, inspStatus: "CLOSE", 
                        inspInfoIdPK:claimInspectionData.insp_info_id_pk};
        dispatch(ClaimService.claimInspectionOperation(params, 'REOPEN'))
        .then((res) => {
            setCheckingForAdjusterClaim(false);
            setClaimAssign(false);
            setClaimAssignFromMap(false);
            if(res.data.status == 'Y'){
                //SUCCESS
                let msgToDisplay = 'Claim Inspection now Reopen.';
                setClaimInspAlert(getClaimInspAlert("success", "CLAIM REOPENED!", msgToDisplay));
            } else {
                //ERROR
                let msgToDisplay = "Something went wrong!";
                setClaimInspAlert(getClaimInspAlert("error", "ERROR!", msgToDisplay));
            }
        });
    }

    const attachDispatch = (_dispatch) => {
        _dispatch(actions.change(data));
    };

    const handleSwitchChange = (e) => {
        var valueToSet = e.target.getAttribute('aria-checked') == "true" ? "No" : "Yes";
        myFormRef.dispatch(actions.change(
            e.target.name,
            valueToSet
        ));

        switch(e.target.name){
            case 'claimDetails.PAInvolved':
                setSwitchState({...switchState, PAInvolved:valueToSet})
                break;
            case 'claimDetails.AttorneyInvolved':
                setSwitchState({...switchState, AttorneyInvolved:valueToSet})                
                break;
            case 'claimDetails.Catastrophe':
                setSwitchState({...switchState, Catastrophe:valueToSet})                
                break;
            case 'claimDetails.DFSComplain':
                setSwitchState({...switchState, DFSComplain:valueToSet})                
                break;
            case 'claimDetails.AOBInvolved':
                setSwitchState({...switchState, AOBInvolved:valueToSet})                
                break;
            case 'claimDetails.acceptSms':
                setSwitchState({...switchState, acceptSms:valueToSet})
                break;
        }
    }

    const setClaimReported = (e) => {
        setClaimReportedBy(e.target.value);

        myFormRef.dispatch(actions.change('claimDetails.PAInvolved', 'No'));
        myFormRef.dispatch(actions.change('claimDetails.AttorneyInvolved', 'No'));
        setSwitchState({...switchState, ...{PAInvolved:'No', AttorneyInvolved:'No'}});        
        setSwitchStateDisable({...switchStateDisable, ...{PAInvolved:false, AttorneyInvolved:false}});
        myFormRef.dispatch(actions.change('claimDetails.claimReportedPersonPK',""));
        switch(e.target.value){
            case "1"://Insured. SET FORM VALUE
                myFormRef.dispatch(actions.change('claimDetails.claimReportedPersonPK',claim.policyDetails.n_OwnerId_FK));
                break;            
            case "3"://PUBLIC ADJUSTER. ENABLE CHECKBOX "PA Involved" and DISABLED
                myFormRef.dispatch(actions.change('claimDetails.PAInvolved', 'Yes'));
                setSwitchState({...switchState, PAInvolved:'Yes'})
                setSwitchStateDisable({...switchStateDisable, PAInvolved:true});
                break;
            case "5"://AGENT. SET FORM VALUE
                myFormRef.dispatch(actions.change('claimDetails.claimReportedPersonPK',claim.policyDetails.n_SubAgentPersoninfo_FK));
                break;
            case "ATTORNEY"://ATTORNEY. ENABLE CHECKBOX "Attorney Involved" and DISABLED
                myFormRef.dispatch(actions.change('claimDetails.AttorneyInvolved', 'Yes'));
                setSwitchState({...switchState, AttorneyInvolved:'Yes'})
                setSwitchStateDisable({...switchStateDisable, AttorneyInvolved:true});
                break;
            default:
                //DO NOTHING
        }
    }

    const setManager = (e) => {
        setClaimManager(e.target.value);
    }

    const getSubStatus = (e) => {
        dispatch(ClaimService.getSubStatus({
                mainType: e.target.value,
                policy_no: claim.policyId
            }));
    }

    const getReviewSubStatus = (e) => {
        dispatch(ClaimService.getReviewSubStatus({
                mainType: e.target.value,
                policy_no: claim.policyId
            }));
    }

    const setZipDetailsData = (data,_myFormRef) => {
        setIsCityModalOpen(false);
        setClaimReportedByCityName(data.s_CityName);
        setClaimReportedByStateName(data.s_StateCode);
        setClaimReportedByCountryName(data.s_ZipCounty); //s_CountyCode
        _myFormRef.dispatch(actions.change("claimDetails.TbPersonaddress.n_CityId_FK",data.n_CityId_PK));
        _myFormRef.dispatch(actions.change("claimDetails.TbPersonaddress.n_CountyId_FK",data.n_CountyId_FK));
        _myFormRef.dispatch(actions.change("claimDetails.TbPersonaddress.n_CountryId_FK",data.n_CountryId_FK));
        _myFormRef.dispatch(actions.change("claimDetails.TbPersonaddress.n_StateId_FK",data.n_StateId_PK));
    }

    const getDataFromZip = (e) => {
        let _myFormRef = myFormRef;
        dispatch(ClaimService.getZipDetails({
                zipCode: e.target.value,
                productId: claim.policyDetails.n_ProductId_FK
        })).then((res) => { 
            if(res.count == 1){
                setZipDetailsData(res.zipData[0], _myFormRef);
            } else if(res.count > 1){
                setIsCityModalOpen(true);
                setMultipleCity(<ZipDetailsView zipData={res.zipData} setZipDetailsData={setZipDetailsData} myFormRef={_myFormRef}/>);
            }
        });        
    }

    const setCoInsured = (e) => {
        myFormRef.dispatch(actions.change('claimDetails.claimReportedPersonPK',e.target.value));   
    }

    const updateClaimManager = (claimAllocatedTo) => {
        let _myFormRef = myFormRef;
        
        dispatch(ClaimService.getClaimMangers({
                claimAdjusterId: claimAllocatedTo,
                relationship: 'CLAIMMANAGER',
                selectedClaimManager:claimManager
        })).then((res) => {
            if(res.data.claimManagerId){
                _myFormRef.dispatch(actions.change('claimDetails.ClaimManager',res.data.claimManagerId));   
            }
        });
    }

    const resetForm = (e) => {
        e.preventDefault();
        myFormRef.dispatch(actions.reset('claimDetails'));
        setSwitchState({PAInvolved: data.PAInvolved,
            AttorneyInvolved: data.AttorneyInvolved,
            Catastrophe: data.Catastrophe,
            DFSComplain: data.DFSComplain,
            AOBInvolved: data.AOBInvolved,
            acceptSms: data.acceptSms});

        setSwitchStateDisable({
            PAInvolved: false,
            AttorneyInvolved: false
        });

        setClaimReportedBy("");
        setClaimReportedByCityName("");
        setClaimReportedByStateName("");
        setClaimReportedByCountryName("");

        setIsCityModalOpen(false);
        setMultipleCity("");
        setClaimApprovedCode("");

        dispatch(action.getSubStatusValues({ claimSubStatus: [] }));

        dispatch(action.getReviewSubStatusValues({ claimReviewSubStatus: [] }));
    };

    /* Insured Person Details */

    let secondaryPhonoInfo = "";
    if(claim.policyDetails.insuredPerson_info) {
        data.SePhoneNum = '';
        if (claimDetailsForEdit) {
            secondaryPhonoInfo = claim.policyDetails.insuredPerson_info.phone_info.find(ele => (ele.s_CommunicationUseCode=="Secondary" && ele.n_SourceFK === claimDetailsForEdit.ClaimId_PK && ele.s_SourceTable === 'tb_claim'));
            data.SePhoneNum = (typeof secondaryPhonoInfo != 'undefined') ? secondaryPhonoInfo.s_PhoneNumber : "";
        } else {
            secondaryPhonoInfo = claim.policyDetails.insuredPerson_info.phone_info.find(ele => (ele.s_CommunicationUseCode=="Secondary" && ele.s_PhoneTypeCode.toLowerCase() === 'phone' && ele.s_IsDefault === 'Y'));
            data.SePhoneNum = (typeof secondaryPhonoInfo != 'undefined') ? secondaryPhonoInfo.s_PhoneNumber : "";
        }
    }

    let primaryPhoneInfo = "";
    if(claim.policyDetails.insuredPerson_info) {
        data.PrPhoneNum = '';
        data.acceptSms = "No";
        primaryPhoneInfo = {};
        if (claimDetailsForEdit) {
            primaryPhoneInfo = claim.policyDetails.insuredPerson_info.phone_info.find(ele => (ele.s_CommunicationUseCode=="Primary" && ele.n_SourceFK === claimDetailsForEdit.ClaimId_PK && ele.s_SourceTable === 'tb_claim'));
            data.PrPhoneNum = (typeof primaryPhoneInfo != 'undefined') ? primaryPhoneInfo.s_PhoneNumber : "";
            data.acceptSms = (typeof primaryPhoneInfo != 'undefined') ? (primaryPhoneInfo.s_Text_YN == 'Y') ? "Yes" : "No" : "No";
        } else {
            primaryPhoneInfo = claim.policyDetails.insuredPerson_info.phone_info.find(ele => (ele.s_CommunicationUseCode=="Primary" && ele.s_PhoneTypeCode.toLowerCase() === 'phone'));
            data.PrPhoneNum = (typeof primaryPhoneInfo != 'undefined') ? primaryPhoneInfo.s_PhoneNumber : "";
            data.acceptSms = (typeof primaryPhoneInfo != 'undefined') ? (primaryPhoneInfo.s_Text_YN == 'Y') ? "Yes" : "No" : "No";
        }
    }

    let emailInfo = "";
    if(claim.policyDetails.insuredPerson_info) {
        data.emailAddress = '';
        emailInfo = {};
        if (claimDetailsForEdit) {
            emailInfo = claim.policyDetails.insuredPerson_info.email_info.find(ele => ele.n_SourceFK === claimDetailsForEdit.ClaimId_PK && ele.s_SourceTable === 'tb_claim');
            data.emailAddress = (typeof emailInfo != 'undefined') ? emailInfo.s_EmailAddress : "";
        }
    }

    let insuredName = "";
    if(claim.policyDetails.insuredPerson_info) {
        insuredName = claim.policyDetails.insuredPerson_info.s_FullLegalName;
        data.InsuredName = insuredName;
    }

    /* Insured Person Details */

    /* Agency Details */

    let agencyName = "";
    if(claim.policyDetails.agency) {
        agencyName = claim.policyDetails.agency.s_FullLegalName;
        data.Agency_Name = agencyName;
    }

    /* Agency Details */

    /* Policy Risk master info */

    let poRiskmasterId_Pk = "";
    if(claim.policyDetails.policy_risk_master_info) {
        poRiskmasterId_Pk = claim.policyDetails.policy_risk_master_info.n_PORiskMaster_PK;
    }

    let poRiskAddresses = "";
    if(claim.policyDetails.policy_risk_master_info.addresses) {
        poRiskAddresses = claim.policyDetails.policy_risk_master_info.addresses;

    }

    const addressSelectData = [];
    if(poRiskmasterId_Pk != "") {
        if(poRiskAddresses.length) {
            poRiskAddresses.map((ele, index) => {
                addressSelectData[poRiskmasterId_Pk] = ( (ele.s_AddressLine1) ? ele.s_AddressLine1 : "" ) + ( (ele.cityName) ? ", "+ele.cityName.s_CityName : "" ) + ( (ele.countyName) ? ", "+ele.countyName.s_CountyName : "" ) + ( (ele.stateName) ? ", "+ele.stateName.s_StateName : "" ) + ( (ele.s_PostalCode) ? ", "+ele.s_PostalCode : "" ) ;
            });
        }        
    }

    const onCancelClaimInspAlert = () => {
        setClaimInspAlert(null);
    }

    const onConfirmClaimInspAlert = () => {
        setClaimInspAlert(null);
    }

    const getClaimInspAlert = (alertType, title, msg) => (
        <SweetAlert {...alertType} title={title} onConfirm={onConfirmClaimInspAlert} onCancel={onCancelClaimInspAlert}>
        {msg}
        </SweetAlert>);

    /* Policy Risk master info */
    
    return <>
        {claimInspAlert}
        <LocalForm
              onSubmit={(values) => handleSubmit(values)}
              onChange={(values) => handleChange(values)}
              model="claimDetails"
              className="form-horizontal"
              initialState={{ ...data }}
              getDispatch={(_dispatch) => attachDispatch(_dispatch)}
              ref={(el) => myFormRef = el}
              validators={{
                '': {
                    checkPrPhoneNum,
                    checkReportedBy,
                    checkEventName,
                    checkStatus
                },
              }}
            >
        <Row className="">
            <Col xs="12" sm="12" lg="6" className=" ">
                { claimDetailsForEdit ?
                    <>
                    <Control
                        model=".date_of_loss_1"
                        component={props => <Input {...props} type="hidden" name="date_of_loss_1" id="date_of_loss_1" size="sm"></Input>}/>
                    <Control
                        model=".ClaimType_txt_1"
                        component={props => <Input {...props} type="hidden" name="ClaimType_txt_1" id="ClaimType_txt_1" size="sm"></Input>}/>
                    <Control
                        model=".ServiceRep_1"
                        component={props => <Input {...props} type="hidden" name="ServiceRep_1" id="ServiceRep_1" size="sm"></Input>}/>
                    <Control
                        model=".ClaimManager_1"
                        component={props => <Input {...props} type="hidden" name="ClaimManager_1" id="ClaimManager_1" size="sm"></Input>}/>
                    <Control
                        model=".claim_allocated_to_user_1"
                        component={props => <Input {...props} type="hidden" name="claim_allocated_to_user_1" id="claim_allocated_to_user_1" size="sm"></Input>}/>
                    <Control
                        model=".totalLossVal_hidden"
                        component={props => <Input {...props} type="hidden" name="totalLossVal_hidden" id="totalLossVal_hidden" size="sm"></Input>}/>
                    <Control
                        model=".claimAddInfoIdPk_hidden"
                        component={props => <Input {...props} type="hidden" name="claimAddInfoIdPk_hidden" id="claimAddInfoIdPk_hidden" size="sm"></Input>}/>
                    <Control
                        model=".n_potransaction_FK"
                        component={props => <Input {...props} type="hidden" name="n_potransaction_FK" id="n_potransaction_FK" size="sm"></Input>}/>
                    </>
                : "" }
                <Control
                    model=".addressIdPk_hidden"
                    component={props => <Input {...props} type="hidden" name="addressIdPk_hidden" id="addressIdPk_hidden" size="sm"></Input>}/>
                {/* claim id */}
                <Control
                    model=".ClaimId_PK"
                    component={props => <Input {...props} type="hidden" name="ClaimId_PK" id="ClaimId_PK" size="sm"></Input>}/>
                {/* n_PORiskMasterFK */}
                <Control
                    model=".n_PORiskMasterFK"
                    component={props => <Input {...props} type="hidden" name="n_PORiskMasterFK" id="n_PORiskMasterFK" size="sm"></Input>}/>
                {/* claimReportedPersonPK */}
                <Control
                    model=".claimReportedPersonPK"
                    component={props => <Input {...props} type="hidden" name="claimReportedPersonPK" id="claimReportedPersonPK" size="sm"></Input>}/>
                {/* claimPersonAddressPK */}
                <Control
                    model=".claimPersonAddressPK"
                    component={props => <Input {...props} type="hidden" name="claimPersonAddressPK" id="claimPersonAddressPK" size="sm"></Input>}/>
                {/* claimPersonAddressPhonePK */}
                <Control
                    model=".claimPersonAddressPhonePK"
                    component={props => <Input {...props} type="hidden" name="claimPersonAddressPhonePK" id="claimPersonAddressPhonePK" size="sm"></Input>}/>
                {/* claimPersonAddressFaxPK */}
                <Control
                    model=".claimPersonAddressFaxPK"
                    component={props => <Input {...props} type="hidden" name="claimPersonAddressFaxPK" id="claimPersonAddressFaxPK" size="sm"></Input>}/>
                {/* claimPersonAddressEmailPK */}
                <Control
                    model=".claimPersonAddressEmailPK"
                    component={props => <Input {...props} type="hidden" name="claimPersonAddressEmailPK" id="claimPersonAddressEmailPK" size="sm"></Input>}/>
                {/* AllocatedTo */}
                <Control
                    model=".claim_allocated_to_user"
                    component={props => <Input {...props} type="hidden" name="claim_allocated_to_user" id="claim_allocated_to_user" size="sm"></Input>}/>
                {/* Policy No */}
                <Control
                    model=".Risk_Id"
                    component={props => <Input {...props} type="hidden" name="Risk_Id" id="Risk_Id" size="sm"></Input>}/>
                {/* PolicyID */}
                <Control
                    model=".n_PolicyNoId_FK"
                    component={props => <Input {...props} type="hidden" name="n_PolicyNoId_FK" id="n_PolicyNoId_FK" size="sm"></Input>}/>
                {/* Owner ID */}
                <Control
                    model=".Owner_Client_FK"
                    component={props => <Input {...props} type="hidden" name="Owner_Client_FK" id="Owner_Client_FK" size="sm"></Input>}/>
                {/* Agency Person info id */ }
                <Control
                    model=".n_AgencyPersoninfoId_FK"
                    component={props => <Input {...props} type="hidden" name="n_AgencyPersoninfoId_FK" id="n_AgencyPersoninfoId_FK" size="sm"></Input>}/>
                {/* Agency Account ID */}
                <Control
                    model=".n_AgencyAccount_FK"
                    component={props => <Input {...props} type="hidden" name="n_AgencyAccount_FK" id="n_AgencyAccount_FK" size="sm"></Input>}/>
                {/* Sub agent person info id */}
                <Control
                    model=".Sub_Agent_Client_FK"
                    component={props => <Input {...props} type="hidden" name="Sub_Agent_Client_FK" id="Sub_Agent_Client_FK" size="sm"></Input>}/>
                {/* Insured Name */}
                <Control
                    model=".InsuredName"
                    component={props => <Input {...props} type="hidden" name="InsuredName" id="InsuredName" size="sm"></Input>}/>
                {/* Agency Name */}
                <Control
                    model=".Agency_Name"
                    component={props => <Input {...props} type="hidden" name="Agency_Name" id="Agency_Name" size="sm"></Input>}/>
                <div className="d-flex select-location-div " >
                    <div className="d-flex flex-column justify-content-around w-33"  >
                        <div>Select Location: </div>
                        <div>Primary phone number :</div>
                        <div>Secondary phone number: </div>
                        <div>Email: </div>
                    </div>
                    <div className="d-flex flex-column persona-data-inputs w-67 ml-3" >
                        <div>
                            <Control
                                model=".PORiskMaster_PK"
                                component={props => <Input {...props} type="select" name="PORiskMaster_PK" id="PORiskMaster_PK" size="sm">
                                    <option value="" key="empty">Select Location</option>
                                    { (addressSelectData.length) ? addressSelectData.map( (ele, index) => 
                                        <option key={index} value={index}>{ ele }</option>
                                    ) : "" }
                                    </Input>}
                                validators={{ required }}
                                />
                            <Errors
                                      model=".PORiskMaster_PK"
                                      show={(field) => field.touched && !field.focus}
                                      className="error"
                                      messages={{
                                        required: Message.required
                                      }}
                                    />

                        </div>
                        <div className="d-flex mt-1 justify-content-between">
                            <Control
                              model=".PrPhoneNum"
                              component={props => <Input {...props} type="text" name="PrPhoneNum" id="PrPhoneNum" size="sm" color="primary" style={{ flex: 1 }}  />}                                                            
                            />                            
                            <div className="switch-intake justify-content-around d-flex" style={{ flex: 1 }}>
                                Accept SMS:&nbsp;<Control
                                    model=".acceptSms"
                                    checked={ switchState.acceptSms=='Yes' ? true : false}
                                    aria-checked={ switchState.acceptSms=='Yes' ? true : false}
                                    component={props => <AppSwitch {...props} className={'mx-1'} size="sm" variant={'pill'} color={'success'} onChange={(e) => handleSwitchChange(e)} defaultValue={switchState.acceptSms}>                                            
                                </AppSwitch>}/>
                            </div>
                        </div>
                        <Errors
                              model="claimDetails"                              
                              className="error"
                              messages={{
                                checkPrPhoneNum: Message.required
                              }}
                            />
                        <div className="mt-1">
                            <Control
                              model=".SePhoneNum"
                              component={props => <Input {...props} type="text" name="SePhoneNum" id="SePhoneNum" size="sm" color="primary" style={{ flex: 1 }} />}
                            />
                        </div>
                        <div className="mt-1">
                            <Control
                              model=".emailAddress"
                              component={props => <Input {...props} type="text" name="emailAddress" id="emailAddress" size="sm" color="primary" style={{ flex: 1 }}/>}
                              validators={{ required, validateEmail }}
                            />
                            <Errors
                              model=".emailAddress"
                              show={(field) => field.touched && !field.focus}
                              className="error"
                              messages={{
                                required: Message.required,
                                validateEmail: "Not a valid Email"
                              }}
                            />
                        </div>
                    </div>
                </div>
            </Col>
            <Col xs="12" sm="12" lg="6" className="pl-1">
                <div className="bg-primary rounded">
                    <Table borderless responsive size="sm">
                        <tbody>
                            <tr>
                                <td>Claim Type</td>
                                <td>
                                    <Control
                                        model=".ClaimType_txt"
                                        component={props => <Input {...props} type="select" name="ClaimType_txt" id="ClaimType_txt" size="sm">
                                            <option value="" key="empty">Select Client Type</option>
                                            {claim.claimTypes.map((row, index) =>
                                              <option key={index} value={row.ClaimTypeId_PK}>{row.Description}</option>)
                                            }
                                    </Input>}
                                    validators={{ required }}
                                    />
                                    <Errors
                                      model=".ClaimType_txt"
                                      show={(field) => field.touched && !field.focus}
                                      className="error"
                                      messages={{
                                        required: Message.required
                                      }}
                                    />
                                </td>
                                <td>Type of Loss</td>
                                <td>
                                    <Control
                                        model=".TypeofLoss"
                                        component={props => <Input {...props} type="select" name="TypeofLoss" id="TypeofLoss" size="sm">
                                            <option value="" key="empty">Select Type Of Loss</option>
                                            {claim.typeOfLoss.map((row, index) =>
                                              <option key={index} value={row.s_AppCodeName}>{row.s_AppCodeNameForDisplay}</option>)
                                            }
                                        </Input>}
                                        validators = {{ required }}
                                    />
                                    <Errors
                                      model=".TypeofLoss"
                                      show={(field) => field.touched && !field.focus}
                                      className="error"
                                      messages={{
                                        required: Message.required
                                      }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Date of Loss</td>
                                <td>
                                    <Control
                                        model = ".date_of_loss"
                                        component = { props => <Input {...props} type='date' size='sm' max={maxDateOfLoss} min={ claim.claimId ? "" : minDateOfLoss }/> }
                                        validators={{ required }}/>
                                    <Errors
                                      model=".date_of_loss"
                                      show={(field) => field.touched && !field.focus}
                                      className="error"
                                      messages={{
                                        required: Message.required
                                      }}
                                    />
                                </td>
                                <td>Service Rep</td>
                                <td>
                                    <Control
                                        model=".ServiceRep"
                                        component={props => <Input {...props} type="select" name="ServiceRep" id="ServiceRep" size="sm">
                                            <option value="" key="empty">Select Service Rep</option>
                                            {claim.serviceRep.map((row, index) =>
                                              <option key={index} value={row.Admin_ID}>{row.s_ScreenName}</option>)
                                            }
                                    </Input>}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Catastrophe Loss</td>
                                <td>No<Control
                                    model=".Catastrophe"
                                    checked={ switchState.Catastrophe=='Yes' ? true : false}
                                    aria-checked={ switchState.Catastrophe=='Yes' ? true : false}
                                    component={props => <AppSwitch {...props} className={'mx-1'} size="sm" variant={'pill'} color={'success'} onChange={(e) => handleSwitchChange(e)} defaultValue={switchState.Catastrophe}>                                            
                                </AppSwitch>}/>Yes</td>
                                <td>Event Name</td>
                                <td>
                                    <Control
                                        model=".Event_Name"
                                        component={props => <Input {...props} type="select" name="Event_Name" id="Event_Name" size="sm" disabled={ switchState.Catastrophe=='No' ? true : false }>
                                            <option value="" key="empty">Select Events</option>
                                            {claim.events.map((row, index) =>
                                              <option key={index} value={row.s_ClaimEventCode}>{row.s_ClaimEventName}</option>)
                                            }
                                    </Input>}/>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <Errors
                                      model="claimDetails"
                                      className="error"
                                      messages={{
                                        checkEventName: Message.required
                                      }}
                                    />                                    
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </Col>
        </Row>
        <Row className="mt-1">
            <Col lg="12" xl="3" className="">
                <div className="bg-primary rounded d-flex flex-column justify-content-around" style={{ height: '100%' }}>
                    <div className="d-flex ">
                        <div className="w-75 fw-700 pl-3">
                            PA Involved
                        </div>
                        <div className="w-25 text-center switch-intake d-flex align-items-center">
                            
                            <Control
                                model=".PAInvolved"
                                checked={ switchState.PAInvolved=='Yes' ? true : false}
                                aria-checked={ switchState.PAInvolved=='Yes' ? true : false}
                                aria-disabled={ switchStateDisable.PAInvolved}
                                component={props => <AppSwitch {...props} className={'mx-1'} size="sm" variant={'pill'} color={'success'}  onChange={(e) => handleSwitchChange(e)} defaultValue={switchState.PAInvolved} disabled={ switchStateDisable.PAInvolved}>
                            </AppSwitch>}/>
                        </div>
                    </div>
                    <div className="d-flex ">
                        <div className="w-75 fw-700 pl-3">
                            Attorney Involved
                        </div>
                        <div className="w-25 text-center switch-intake d-flex align-items-center">
                            <Control
                                model=".AttorneyInvolved"
                                checked={ switchState.AttorneyInvolved=='Yes' ? true : false}
                                aria-checked={ switchState.AttorneyInvolved=='Yes' ? true : false}
                                aria-disabled={ switchStateDisable.AttorneyInvolved}
                                component={props => <AppSwitch {...props} className={'mx-1'} size="sm" variant={'pill'} color={'success'}  onChange={(e) => handleSwitchChange(e)} defaultValue={switchState.AttorneyInvolved} disabled={ switchStateDisable.AttorneyInvolved}>                                            
                            </AppSwitch>}/>
                        </div>
                    </div>
                    <div className="d-flex ">
                        <div className="w-75 fw-700 pl-3 ">
                            AOB Involved
                        </div>
                        <div className="w-25 text-center switch-intake d-flex align-items-center">
                            <Control
                                model=".AOBInvolved"
                                checked={ switchState.AOBInvolved=='Yes' ? true : false}
                                aria-checked={ switchState.AOBInvolved=='Yes' ? true : false}
                                component={props => <AppSwitch {...props} className={'mx-1'} size="sm" variant={'pill'} color={'success'}  onChange={(e) => handleSwitchChange(e)} defaultValue={switchState.AOBInvolved}>                                            
                            </AppSwitch>}/>
                        </div>
                    </div>
                </div>
            </Col>
            <Col lg="12" xl="9">
                <div className={"bg-primary rounded p-2 " + (claimReportedBy == 2 ? 'd-flex' : '')}
                style={{display: (claimReportedBy == 2) ? 'block' : 'none'}}>
                    <div className="d-flex w-100 ">
                        <div className="d-flex flex-column justify-content-around mr-3">
                            <label className="fw-700">Co-Insured: </label>
                        </div>

                        <div className="d-flex flex-column justify-content-around">
                            <Control model=".Co_Insured"
                                onChange = { (e) => setCoInsured(e)}
                                component={props => <Input {...props} type="select" name="Co_Insured" id="Co_Insured" size="sm">
                                    <option value="" key="empty">Select Co-Insured</option>
                                    {(Array.isArray(claim.claimCoinsuredMaster) && claim.claimCoinsuredMaster.length) ? claim.claimCoinsuredMaster.map((row, index) =>
                                        <option key={index} value={row.Admin_ID}>{row.s_ScreenName}</option>)
                                    : ""}
                                </Input>}/>
                        </div>                          
                    </div>
                </div>

                <div className={"bg-primary rounded p-2 " + (claimReportedBy == "ATTORNEY" || claimReportedBy == 3 || claimReportedBy == 4 ? 'd-flex' : '')}
                style={{display: (claimReportedBy == "ATTORNEY" || claimReportedBy == 3 || claimReportedBy == 4) ? 'block' : 'none'}}>
                    <div className="d-flex w-33 ">
                        <div className="d-flex flex-column justify-content-around mr-3">
                            <label className="fw-700">Name: </label>
                            <label className="fw-700">Phone:</label>
                            <label className="fw-700">Fax: </label>
                            <label className="fw-700">Email: </label>
                        </div>
                        <div className="d-flex flex-column justify-content-around">
                            <Fieldset model=".TbPersoninfo">
                                <Control model=".s_FirstName" component = { props => <Input {...props} type="text" size="sm" color="primary"/> }/>
                                <Control model=".s_MiddleName" component = { props => <Input {...props} type="hidden"/> }/>
                                <Control model=".s_LastOrganizationName" component = { props => <Input {...props} type="hidden"/> }/>
                            </Fieldset>
                            <Fieldset model=".TbPhoneinfo">
                                <Control model=".s_PhoneNumber" component = { props => <Input {...props} type="text" size="sm" color="primary"/> }/>
                                <Control model=".s_FaxNo" component = { props => <Input {...props} type="text" size="sm" color="primary"/> }/>
                            </Fieldset>
                            <Fieldset model=".TbEmailinfo">
                                <Control model=".s_EmailAddress" component = { props => <Input {...props} type="text" size="sm" color="primary"/> }/>
                            </Fieldset>
                        </div>
                    </div>
                    <div className="d-flex w-67 flex-column ">
                        <div className="d-flex  persona-data-inputs justify-content-center address-inputs mt-2">
                            <label className="fw-700">Address:</label>
                            <div className="d-flex flex-column ad-input">
                                <Fieldset model=".TbPersonaddress">
                                    <Control model=".s_HouseNo" component = { props => <Input {...props} type="text" size="sm" color="primary" style={{ width: "90px" }}/> }/>
                                </Fieldset>
                                <small>House No</small>
                            </div>
                            <div className="d-flex flex-column ad-input">
                                <Fieldset model=".TbPersonaddress">
                                    <Control model=".s_HouseDirection1"
                                        component={props => <Input {...props} type="select" name="add_direction" id="add_direction" size="sm">
                                            <option value="" key="empty">Select Direction</option>
                                            {claim.claimHomeAddressDirection.map((row, index) =>
                                                <option key={index} value={row.s_AppCodeName}>{row.s_AppCodeNameForDisplay}</option>)
                                            }
                                        </Input>}/>
                                </Fieldset>
                                <small>Direction</small>
                            </div>
                            <div className="d-flex flex-column ad-input">
                                <Fieldset model=".TbPersonaddress">
                                    <Control model=".s_StreetName" component = { props => <Input {...props} type="text" size="sm" color="primary" style={{ width: "90px" }}/> }/>
                                </Fieldset>
                                <small>Street Name</small>
                            </div>
                            <div className="d-flex flex-column ad-input">
                                <Fieldset model=".TbPersonaddress">
                                    <Control model=".s_HouseType"
                                        component={props => <Input {...props} type="select" name="add_type" id="add_type" size="sm">
                                            <option value="" key="empty">Select Type</option>
                                            {claim.claimHomeAddressType.map((row, index) =>
                                                <option key={index} value={row.s_AppCodeName}>{row.s_AppCodeNameForDisplay}</option>)
                                            }
                                        </Input>}/>
                                </Fieldset>
                                <small>Type</small>
                            </div>
                            <div className="d-flex flex-column  ad-input" >
                                <Fieldset model=".TbPersonaddress">
                                    <Control model=".s_HouseDirection2"
                                        component={props => <Input {...props} type="select" name="add_direction_2" id="add_direction_2" size="sm">
                                            <option value="" key="empty">Select Type</option>
                                            {claim.claimHomeAddressDirection.map((row, index) =>
                                                <option key={index} value={row.s_AppCodeName}>{row.s_AppCodeNameForDisplay}</option>)
                                            }
                                        </Input>}/>
                                </Fieldset>
                                <small>Direction</small>
                            </div>
                        </div>
                        <div className="d-flex flex-column persona-data-inputs  mt-2 small-input" >
                            <div className="d-flex justify-content-center ">
                                <div className="d-flex">
                                    <label className="fw-700">
                                        City:&nbsp;
                              </label>
                                    <Fieldset model=".TbPersonaddress">
                                        <Control model=".n_CityId_FK" component = { props => <Input {...props} type="hidden"/> }/>
                                        <Control model=".s_CityName" component = { props => <Input {...props} type="text" className="gray-input" size="sm" color="primary" value={claimReportedByCityName}/> }/>
                                    </Fieldset>
                                </div>
                                <div className="d-flex ml-2">
                                    <label className="fw-700">
                                        State:&nbsp;
                              </label>
                                    <Fieldset model=".TbPersonaddress">
                                        <Control model=".n_StateId_FK" component = { props => <Input {...props} type="hidden"/> }/>
                                        <Control model=".s_StateName" component = { props => <Input {...props} type="text" className="gray-input" size="sm" color="primary" value={claimReportedByStateName}/> }/>
                                    </Fieldset>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mt-2" >
                                <div className="d-flex">
                                    <label className="fw-700">
                                        Zip:&nbsp;
                              </label>
                              <Fieldset model=".TbPersonaddress">
                                <Control
                                    onBlur={(e) => getDataFromZip(e)}
                                    model=".s_PostalCode"
                                    component={props => <Input {...props} type="text" name="zip" id="zip" size="sm" color="primary">                                    
                                </Input>}/>
                              </Fieldset>                          
                                </div>
                                <div className="d-flex ml-2">
                                    <label className="fw-700">
                                        Country:&nbsp;
                              </label>
                                    <Fieldset model=".TbPersonaddress">
                                        <Control model=".n_CountyId_FK" component = { props => <Input {...props} type="hidden"/> }/>
                                        <Control model=".n_CountryId_FK" component = { props => <Input {...props} type="hidden"/> }/>
                                        <Control model=".s_CountyName" component = { props => <Input {...props} type="text" className="gray-input" size="sm" color="primary" value={claimReportedByCountryName}/> }/>
                                    </Fieldset>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="rounded"
                style={{display: (claimReportedBy == "ATTORNEY" || claimReportedBy == 3 || claimReportedBy == 4) ? 'block' : 'none'}}>
                    <Errors
                        model="claimDetails"                              
                        className="error"
                        messages={{
                            checkReportedBy: "Name/Email/Phone is missing"
                        }}
                    />

                </div>
            </Col>

        </Row>
        <Row className="">
            <Col xs="12" sm="12" lg="12" className="" >
                <div className="d-flex justify-content-between align-items-center p-2 mt-1 rounded" style={{ backgroundColor: "#6A888C", color: "white", fontWeight: "700" }}>                
                    <div>
                        <p className="mb-0 fw-700">Description of Loss </p>
                    </div>

                    <div className="d-flex align-items-center">
                        <p className="mb-0 fw-700" style={{ width: "230px" }}>Claim reported by: </p>
                        <Control
                            model=".relationType_txt"
                            onChange = {(e) => setClaimReported(e)}
                            component={props => <Input {...props} type="select" name="relationType_txt" id="relationType_txt" size="sm">
                            <option value="" key="empty">Select Reported By</option>
                            {claim.claimReportedByRelation.map((row, index) =>
                                <option key={index} value={row.s_AppCodeName}>{row.s_AppCodeNameForDisplay}</option>)
                            }
                        </Input>}
                            validators={{ required }}
                        />
                    </div>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mt-1 rounded">
                    <div>
                        <p className="mb-0 fw-700">&nbsp;</p>
                    </div>

                    <div className="d-flex align-items-center">
                        <Errors
                            model=".relationType_txt"
                            show={(field) => field.touched && !field.focus}
                            className="error"
                            messages={{
                                required: Message.required
                            }}
                        />
                    </div>
                </div>
            </Col>
        </Row>
        <Row className="">
            <Col xs="12" sm="12" lg="12" className="">
                <div className="empty-space mt-2">
                    <Control.textarea
                        model=".remarks_txt" className="w-100 p-2"/>
                </div>
            </Col>
        </Row>
        <Row className="mt-1 mb-1">
            <Col xs="12" sm="12" lg="12" className="change-border-input" >
                <div className="d-flex justify-content-around claim-info pt-1 pb-1">
                    <div className="d-flex">
                        <p className="mb-0 fw-700">Claim Allocated To: <span style={{"font-weight":"normal"}}>{data.allocatedTo.s_ScreenName ? data.allocatedTo.s_ScreenName : ""}</span></p>
                        <div className="d-flex">                        
                            <i onClick={() => checkAdjusterClaimAndSetClaimAssignFromMap()} className="cui-map icons font-2xl ml-2" style={{ cursor: 'pointer'}}></i>
                            <i onClick={() => checkAdjusterClaimAndSetClaimAssignFromDd()} className="cui-note icons font-2xl ml-2" style={{ cursor: 'pointer'}}></i>
                        </div>
                    </div>
                    <div className="d-flex">
                        <p className="mb-0 mr-1 fw-700" style= {{whiteSpace: "nowrap"}}>Claim Allocated on:</p>
                        <Control
                                model = ".claim_allocated_on_date"
                                component = { props => <Input {...props} type="date" size="sm" name="claim_allocated_on_date" id="claim_allocated_on_date" color="primary" /> } ></Control>
                    </div>
                    <div className="d-flex">
                        <p className="mb-0 fw-700" style={{ width: '200px' }}>Claim manager: </p>
                        <Control
                            model=".ClaimManager"
                            onChange = {(e) => setManager(e)}
                            component={props => <Input {...props} type="select" name="ClaimManager" id="ClaimManager" size="sm" disabled={claim.selectingClaimManager}>
                            <option value="" key="empty">Select Claim Manager</option>
                            {claim.claimManager.map((row, index) =>
                                <option key={index} value={row.Admin_ID}>{row.s_ScreenName}</option>)
                            }
                        </Input>}/>
                    </div>
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm="12" lg="12" className=" change-border-input">
                <div className="d-flex justify-content-around p-3 rounded bg-primary">
                    <div className="d-flex flex-column justify-content-around ">
                        <div className="font-weight-bold">Primary Attorney Assigned</div>
                        <div className="font-weight-bold">Assigned date </div>
                    </div>
                    <div className="d-flex flex-column justify-content-around  persona-data-inputs">
                        <div>
                            <Control
                                model=".PrimaryAttorney_PK"
                                component={props => <Input {...props} type="select" name="PrimaryAttorney_PK" id="PrimaryAttorney_PK" size="sm">
                                <option value="" key="empty">Select Primary Attorney</option>
                                {claim.primaryAttorney.map((row, index) =>
                                    <option key={index} value={row.n_PersonInfoId_PK}>{row.s_FullLegalName}</option>)
                                }
                            </Input>}/>
                        </div>
                        <div className="d-flex mt-1 justify-content-between pr-3">
                            <Control
                                model = ".PrimaryAttorney_AssignDate"
                                component = { props => <Input {...props} type="date" size="sm" name="PrimaryAttorney_AssignDate" id="PrimaryAttorney_AssignDate" /> } ></Control>
                        </div>
                    </div>
                    <div className="d-flex flex-column justify-content-around">
                        <div className="font-weight-bold">Co-Attorney Assigned</div>
                        <div className="font-weight-bold">Select Assigned date</div>

                    </div>
                    <div className="d-flex flex-column justify-content-around pr-3 persona-data-inputs">
                        <div>
                            <Control
                                model=".CoAttorney_PK"
                                component={props => <Input {...props} type="select" name="CoAttorney_PK" id="CoAttorney_PK" size="sm">
                                <option value="" key="empty">Select Co Attorney</option>
                                {claim.coAttorney.map((row, index) =>
                                    <option key={index} value={row.n_PersonInfoId_PK}>{row.s_FullLegalName}</option>)
                                }
                            </Input>}/>                            
                        </div>
                        <div className="d-flex mt-1 justify-content-between ">
                            <Control
                                model = ".CoAttorney_AssignDate"
                                component = { props => <Input {...props} type="date" size="sm" name="CoAttorney_AssignDate" id="CoAttorney_AssignDate" /> } ></Control>
                        </div>
                    </div>
                    <div className="d-flex flex-column justify-content-around">
                        <div className="fs-15 fw-700">In House Counsel </div>
                        <div className="fs-15 fw-700">DFS Complaint/AOB/Legal</div>
                    </div>
                    <div className="d-flex flex-column  justify-content-around persona-data-inputs">
                        <div>
                            <Control
                                model=".In_House_Counsel"
                                component={props => <Input {...props} type="select" name="In_House_Counsel" id="In_House_Counsel" size="sm">
                                <option value="" key="empty">Select In House Counsel</option>
                                {claim.inhouseCounsel.map((row, index) =>
                                    <option key={index} value={row.n_PersonInfoId_PK}>{row.s_FullLegalName}</option>)
                                }
                            </Input>}/> 
                        </div>
                        <div className="mt-1 switch-intake d-flex align-items-center pl-2">
                        No&nbsp;<Control
                            model=".DFSComplain"
                            checked={ switchState.DFSComplain=='Yes' ? true : false}
                            aria-checked={ switchState.DFSComplain=='Yes' ? true : false}
                            component={props => <AppSwitch {...props} className={'mx-1'} size="sm" variant={'pill'} color={'success'}  onChange={(e) => handleSwitchChange(e)} value={switchState.DFSComplain}>                                            
                        </AppSwitch>}/>&nbsp;Yes
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
        <Row className="mt-2">
            <Col xs="12" sm="12" lg="4" className=" ">
                <div className="d-flex reserve-amoutn p-2 justify-content-around bg-primary rounded" >
                    <div className="d-flex flex-column justify-content-around " >
                        <div className="fs-15 fw-700">Demand Amount: </div>
                        <div className="fs-15 fw-700">Reserve Amount: </div>
                        <div className="fs-15 fw-700">Total Paid Amount: </div>
                    </div>
                    <div className="d-flex flex-column  persona-data-inputs ">
                        <div className="fs-15 fw-700">
                            $0.00
                  </div>
                        <div className="mt-1 switch-intake d-flex align-items-center fs-15 fw-700">$0.00</div>
                        <div className="mt-1 switch-intake d-flex align-items-center fs-15 fw-700">$0.00</div>
                    </div>
                </div>
            </Col>

            <Col xs="12" sm="12" lg="4" className="d-flex justify-content-between pl-0" style={{ fontWeight: "700" }}>
                <div className="claim-setting">
                    <div className="d-flex flex-column justify-content-around">
                        <span>Claim Review Status </span>
                        <span>Claim Status Open</span>
                    </div>
                    <div className="d-flex flex-column  justify-content-around">
                        <div>
                            <Control
                                onChange = { (e) => getReviewSubStatus(e)}
                                model=".claim_review_status"
                                component={props => <Input {...props} type="select" name="claim_review_status" id="claim_review_status" size="sm">
                                <option value="" key="empty">Select Claim Review Status</option>
                                {claim.claimReviewStatus.map((row, index) =>
                                    <option key={index} value={row.s_AppCodeName}>{row.s_AppCodeNameForDisplay}</option>)
                                }
                            </Input>}/>
                        </div>
                        <div>
                            <Control                                
                                onChange = { (e) => getSubStatus(e)}
                                model=".status_txt"
                                disabled={!claim.claimId ? true : false}
                                component={props => <Input {...props} type="select" name="status_txt" id="status_txt" size="sm">
                                <option value="" key="empty">Select Claim Status</option>
                                {claim.claimStatus.map((row, index) =>
                                    <option key={index} value={row.s_AppCodeName}>{row.s_AppCodeNameForDisplay}</option>)
                                }
                            </Input>}
                                validators={{ required }}
                            />
                            <Errors
                                model=".status_txt"
                                show={(field) => field.touched && !field.focus}
                                className="error"
                                style={{ fontWeight: "100" }}
                                messages={{
                                    required: Message.required,
                                }}
                            />

                            <Errors
                                model="claimDetails"                                
                                className="error"     
                                style={{ fontWeight: "100" }}                           
                                messages={{
                                    checkStatus: "Invalid status"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </Col>
            <Col xs="12" sm="12" lg="4" className="d-flex justify-content-between pl-0" style={{ fontWeight: "700" }}>
                <div className="claim-setting">
                    <div className="d-flex flex-column  justify-content-around">
                        <span>Claim Review Sub-Status </span>
                        <span>Claim Sub-Status </span>
                    </div>
                    <div className="d-flex flex-column  justify-content-around">
                        <div>
                            <Control
                                model=".claim_review_sub_status"
                                component={props => <Input {...props} type="select" name="claim_review_sub_status" id="claim_review_sub_status" size="sm" multiple disabled={claim.loadingReviewSubStatus}>
                                
                                {claim.claimReviewSubStatus.map((row, index) =>
                                    <option key={index} value={row.s_AppCodeName}>{row.s_AppCodeNameForDisplay}</option>)
                                }
                            </Input>}/>
                        </div>
                        <div>
                            <Control
                                model=".substatus_txt"
                                component={props => <Input {...props} type="select" name="substatus_txt" id="substatus_txt" size="sm" disabled={claim.loadingSubStatus}>
                                <option value="" key="empty">Select Claim Status</option>
                                {claim.claimSubStatus.map((row, index) =>
                                    <option key={index} value={row.s_AppCodeName}>{row.s_AppCodeNameForDisplay}</option>)
                                }
                            </Input>}
                                validators={{ required }}
                            />

                            <Errors
                                model=".substatus_txt"
                                show={(field) => field.touched && !field.focus}
                                style={{ fontWeight: "100" }}
                                className="error"
                                messages={{
                                    required: Message.required
                                }}
                            />
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm="12" lg="12" className="mt-3">
                <div className="d-flex justify-content-between fw-700 fs-15 pl-3 pr-5 mr-3">
                    <div>
                        Claim Approved: <Control
                                model = ".claim_approved_code"
                                onChange = { () => setClaimApprovedCode('Y') }
                                component = { props => <Input {...props} type="radio" name="claim_approved" className="ml-1 mr-1" style={{position:'inherit'}} value="Y" checked={ claimApprovedCode === 'Y' }/> }
                                ></Control>Yes
                            <Control
                                model = ".claim_approved_code"
                                onChange = { () => setClaimApprovedCode('N') }
                                component = { props => <Input {...props} type="radio" name="claim_approved" className="ml-1 mr-1" style={{position:'inherit'}} value="N"  checked={ claimApprovedCode === 'N' } /> }
                                ></Control>No
              </div>
                    <div>
                        Total Loss: <Control
                                        model = ".totalLoss"
                                        onChange = { () => setClaimTotalLoss('Y') }
                                        component = { props => <Input {...props} type="radio" name="totalLoss" id="totalLoss" className="ml-1 mr-1" value="Y" checked={claimTotalLoss === 'Y'} style={{position:'inherit'}}/> } />
                    </div>
                    <div>
                        Right to Repair: <Control
                                        model = ".rightToRepair"
                                        onChange = { () => setClaimRightToRepair('Y') }
                                        component = { props => <Input {...props} type="radio" name="rightToRepair" id="rightToRepair" className="ml-1 mr-1" value="Y" checked={claimRightToRepair === 'Y'} style={{position:'inherit'}}/> } />
                    </div>
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm="12" lg="12" >
                <div className="text-center mt-2" >
                    { !claimDetailsForEdit ? 
                        <>
                        <Button color="primary" size="sm">SAVE CLAIM</Button>
                        <Button color="primary" size="sm" className="ml-3" onClick={(e) => resetForm(e)}>CLEAR</Button>
                        </>
                    :
                        <>
                        <Button color="primary" size="sm">UPDATE CLAIM</Button>
                        <Button color="primary" size="sm" className="ml-3">CANCEL</Button>
                        </>
                    }
                    
                </div>
            </Col>
        </Row>
        </LocalForm>
        <Modal isOpen={isCityModalOpen} className={'modal-sm'}>
            <ModalHeader className="p-2 mt-3">Select City</ModalHeader>
            <ModalBody>
                {multipleCity}
            </ModalBody>
        </Modal>
        <AssignClaimModal
            fieldAdjusters = { claim.claimFieldAdjuster }
            isOpen={claimAssign}
            checkingForAdjusterClaim = {checkingForAdjusterClaim}
            selectAllocateTo = {(e)=>selectAllocateTo(e)}
            updateAllocateToRefDd = { ()=>updateAllocateToRefDd()}
            currentClaimAllocatedTo = {currentClaimAllocatedTo}
            claimInspectionData = {claimInspectionData}
            reopenClaimInspection = {reopenClaimInspection}
            toggle={() => setClaimAssign(false)}
        />
        <AssignClaimAllocaedToUsingMapModal
            fieldAdjusters = { claim.adjusterDataForMap }
            mapCenter = {{lat: claim.mapCenterLat*1, lng: claim.mapCenterLng*1}}
            isOpen={claimAssignFromMap}
            selectAllocateToFromMap = {selectAllocateToFromMap}            
            currentClaimAllocatedTo = {currentClaimAllocatedTo}
            claimInspectionData = {claimInspectionData}
            reopenClaimInspection = {reopenClaimInspection}            
            toggle={() => setClaimAssignFromMap(false)}
        />
        
    </>;
}

export default ClaimViewTab;
