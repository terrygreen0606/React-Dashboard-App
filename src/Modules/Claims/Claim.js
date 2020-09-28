import React, {useState, useEffect} from 'react';
import {useHttp} from '../../services/claimService';
import {Col, Row } from 'reactstrap';
import {ClaimHeader} from "./components/ClaimHeader"
/* import {ClaimInfo} from "./components/ClaimInfo"
import {ClaimTabs} from "./components/ClaimTabs" */

import ClaimTabs from "./components/ClaimViewComponents/ClaimInfoTabs";
import StatusLogs from "./components/ClaimViewComponents/ClaimStatusLogs";
import * as ClaimService from '../../services/claimService';
import * as action from '../../store/actions/claim';
import { useDispatch, useSelector } from 'react-redux';

const Claim = props => {
  
  const claimInital = {
    ClaimId_PK: '',
    Claim_No: 'Adding a New Claim',
    Claim_Status_Code: 'Open',
    Claim_SubStatus_Code: '',
    Loss_Type_Code: '',
    ClaimTypeId_FK: '',
    Date_Allocated: '',
    Remarks: '',
    PA_Involved_YN: '',
    Attorney_Involved_YN: '',
    addInfo: {
      s_IsAOBInvolved_YN: '',
    },
    Reported_By_Relation_Code: '',
    Date_Of_Loss: '',
    Service_Repre_UserId_FK: '',
    serviceRepresentative: {
      s_ScreenName: ''
    },
    DFS_Complain_YN: '',
    Catastrophe_YN: '',
    Event_Name: '',
    Approval_Status_Code: '',
    reviewStatusCode: '',
    reviewStatusCodeText: '',
    reviewSubStatusCodes: [],
    reviewSubStatusCodesText: '',
    questionnaire: {
      answers: []
    }
  };

  const [claim, setClaim] = useState({...claimInital, ClaimId_PK: props.match.params.id});
  const [editMode, setEditMode] = useState(false);
  const [update, setUpdate] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState({});
  
  const dispatch = useDispatch();

  let masterParams = {};
  masterParams.conditions = ['MNG_TYPEOFLOSS', 
    'CLAIM_REVIEW_STATUS', 'MNG_OPENSUBSTATUS', 'MNG_SUBSTATUS', 'MNG_REOPENSUBSTATUS',
      'READY_TO_CLOSE', 'ASSICONTRACTFORESTIMAT', 'PENDING_ESTIMAT'];
  masterParams.key = "s_AppCodeName";

  const [isLoadingMasterData, setLoadingMasterData] = useState(false);
  const [masterData, setMasterData] = useState({});

  const [isLoadingEventMasterData, setLoadingEventMasterData] = useState(false);
  const [eventMasterData, setEventMasterData] = useState({});

  useEffect(() => {
      setLoadingMasterData(true);
      setIsLoading(true);
      setLoadingEventMasterData(true);

      dispatch(ClaimService.getMasterData(masterParams))
            .then((res) => {
              let i = "";
              let temp = [];
              let masterDataTmp = {"SUB_STATUS":[], "REVIEW_STATUS":[], 
                      "REVIEW_SUB_STATUS":[], "TYPE_OF_LOSS":[]};

              for(i of res.data.MNG_SUBSTATUS){
                temp[i.s_AppCodeName] = i.s_AppCodeNameForDisplay;
              }              

              for(i of res.data.MNG_OPENSUBSTATUS){                
                temp[i.s_AppCodeName] = i.s_AppCodeNameForDisplay;
              }

              for(i of res.data.MNG_REOPENSUBSTATUS){                
                temp[i.s_AppCodeName] = i.s_AppCodeNameForDisplay;
              }
              masterDataTmp.SUB_STATUS = temp;

              temp = [];
              for(i of res.data.CLAIM_REVIEW_STATUS){                
                temp[i.s_AppCodeName] = i.s_AppCodeNameForDisplay;
              }
              masterDataTmp.REVIEW_STATUS = temp;

              temp = [];
              for(i of res.data.ASSICONTRACTFORESTIMAT){                
                temp[i.s_AppCodeName] = i.s_AppCodeNameForDisplay;
              }

              for(i of res.data.PENDING_ESTIMAT){                
                temp[i.s_AppCodeName] = i.s_AppCodeNameForDisplay;
              }

              for(i of res.data.READY_TO_CLOSE){                
                temp[i.s_AppCodeName] = i.s_AppCodeNameForDisplay;
              }
              masterDataTmp.REVIEW_SUB_STATUS = temp;

              temp = [];
              for(i of res.data.MNG_TYPEOFLOSS){                
                temp[i.s_AppCodeName] = i.s_AppCodeNameForDisplay;
              }
              masterDataTmp.TYPE_OF_LOSS = temp;
              
              setMasterData(masterDataTmp);
              setLoadingMasterData(false);              
          });

      dispatch(ClaimService.getClaimEventData())
            .then((res) => {
              let eventMasterDataTmp = [];
              for( let i of res.data){
                eventMasterDataTmp[i.s_ClaimEventCode] = i.s_ClaimEventName 
              }              
              setEventMasterData(eventMasterDataTmp);
              setLoadingEventMasterData(false);
          });

      dispatch(ClaimService.getClaimData({id:props.match.params.id}))
            .then((res) => {
              setFetchedData(res);
              setIsLoading(false);  
              setEditMode(false);
              refreshClaim(res.data);            
          });
  },[]); 

  let content = <>
    <div className="sk-wave">
                    <div className="sk-rect sk-rect1"></div>&nbsp;
                    <div className="sk-rect sk-rect2"></div>&nbsp;
                    <div className="sk-rect sk-rect3"></div>&nbsp;
                    <div className="sk-rect sk-rect4"></div>&nbsp;
                    <div className="sk-rect sk-rect5"></div>
                </div>
  </>;

  const groupBy = (xs, key) => {
    return xs && xs.length ? xs.reduce((rv, x)=>{
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {}) : xs;
  };

  const setAddMode = () => {
    setClaim({...claim, ...claimInital, Claim_No: 'Adding a New Claim'});
    setEditMode(true);
  }

  const refreshClaim = (claimData) => {
    claimData.reviews = groupBy(claimData.reviews, 'n_TransNo');
    claimData.reviewsLog = [];
    const latestTransNo = Object.keys(claimData.reviews).length ? Math.max.apply(Math, Object.keys(claimData.reviews)) : 0; 
    
    if(claimData.reviews && Object.keys(claimData.reviews).length){
      let tempReview = {};
      for(let k in claimData.reviews){
        let i = claimData.reviews[k];
        tempReview = {...i[0]};
        let tempStatus = [];
        for(let j of i){
          tempStatus.push(j.sub_s_AppCodeNameForDisplay);
        }
        tempReview.sub_s_AppCodeNameForDisplay = tempStatus.join(",");
        claimData.reviewsLog.push(tempReview);
      }
    }

    claimData.reviewStatusCode = latestTransNo ? claimData.reviews[latestTransNo][0].s_ReviewMainCode : ''; 
    claimData.reviewSubStatusCodes = latestTransNo ? claimData.reviews[latestTransNo].map(r=>r.s_ReviewSubCode) : [];

    if(claimData.status_logs.length){      
      claimData.Claim_Status_Code = claimData.status_logs[0].Tran_Type_Code;
      claimData.Claim_SubStatus_Code = claimData.status_logs[0].Tran_SubType_Code;
    }

    setClaim(claimData);
   
    dispatch(action.setClaimDetailForEdit({ ...claimData }));
  }
  
  const updateClaim = () => setUpdate(update+1);

  //const history = useHistory();

  if (!isLoading && fetchedData && fetchedData.data && claim && !isLoadingMasterData && !isLoadingEventMasterData) {
    content = (
    <>
      <Col xs="12" sm="6" lg="8" className="pr-2">
        <ClaimHeader claim={claim}/>
        
        <ClaimTabs
          claim={ claim }
          masterData = { masterData}
          eventMasterData = {eventMasterData} />
      </Col>
      <Col xs="12" sm="6" lg="4" className="pl-0 pr-2">
        <StatusLogs
          claim={ claim }/>
      </Col>
    </>
    )
  } else if ( !isLoading ) {
    content = <p>Could not fetch any data.</p>;
  }
      
  return (
    <div className="animated fadeIn">
      <Row>
        
          {content}
        
      </Row>
    </div>
  )
}

export default Claim;
