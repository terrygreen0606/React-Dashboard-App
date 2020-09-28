import React, { useState, useEffect } from 'react';
import {Label, Input, Button, Table, Card, CardHeader, CardBody, CardFooter} from 'reactstrap';
import { LocalForm, Control, Errors, actions, Fieldset } from 'react-redux-form';

import { useDispatch, useSelector } from 'react-redux';
import * as ClaimService from '../../../../../services/claimService';
import { required,validateEmail } from '../../../../../utilities/regex';
import Message from '../../../../../utilities/message';
import {ReservePaymentDetailsModal} from '../modals/ReservePaymentDetailsModal';
import {SubLedgerEntryModal} from '../modals/SubLedgerEntryModal';
import {ReserveDetailsModal} from '../modals/ReserveDetailsModal';
import {PayeeModal} from '../modals/PayeeModal';
import {UnpostedAmount} from '../modals/UnpostedAmount';

import Moment from 'moment';

const filterKeys = ['', 'Claim Expense', 'OAE', 'Legal Expense', 'Mitigation', 'Other Legal', 'Subrogation', 'Excess / Deductible'];

const PaymentTab = (prop) => {
  const [transType, setTransType] = useState('');
  const [transSubType, setTransSubType] = useState('');
  const [claimReservePaymentDetails, setClaimReservePaymentDetails] = useState([]);
  const [activeTable, setActiveTable] = useState(0);  
  const [filteredData, setFilteredData] = useState(claimReservePaymentDetails);
  const [loadingTab, setLoadingTab] = useState(true);

  const [subLedgerEntryOpen, setSubLedgerEntryOpen] = useState(false);
  const [subLedgerEntryLoading, setSubLedgerEntryLoading] = useState(false);
  const [subLedgerEntryData, setSubLedgerEntryData] = useState([]);

  const [viewReserveDetailsOpen, setViewReserveDetailsOpen] = useState(false);
  const [viewReserveDetailsLoading, setViewReserveDetailsLoading] = useState(false);
  const [viewReserveDetailsData, setViewReserveDetailsData] = useState({});

  const [reservePaymentDetailsOpen, setReservePaymentDetailsOpen] = useState(false);
  const [reservePaymentDetailsLoading, setReservePaymentDetailsLoading] = useState(false);
  const [reservePaymentDetailsData, setReservePaymentDetailsData] = useState([]);
  const [totalReservePaymentDetailsData, setTotalReservePaymentDetailsData] = useState({});  

  const [viewUnpostedTransactionOpen, setViewUnpostedTransactionOpen] = useState(false);
  const [viewUnpostedTransactionLoading, setViewUnpostedTransactionLoading] = useState(false);
  const [viewUnpostedTransactionData, setViewUnpostedTransactionData] = useState([]);

  const [transSubTypeList, setTransSubTypeList] = useState([]);
  const [transTypeList, setTransTypeList] = useState([]);
  const [paymentReasonList, setPaymentReasonList] = useState([]);
  
  const [subTypeListDisabled, setSubTypeListDisabled] = useState(true);

  const [refundCheckDisabled, setRefundCheckDisabled] = useState(true);

  const [cvgLimitList, setCvgLimitList] = useState([]);
  const [cvgLimitListLoading, setCvgLimitListLoading] = useState(false);

  const [allocationData, setAllocationData] = useState([]);
  const [unpostedAmount, setUnpostedAmount] = useState([]);

  const [payeeModalOpen, setPayeeModalOpen] = useState(false);

  const dispatch = useDispatch();

  let myFormRef = React.createRef();

  let maxDateOfReserve = new Date().toJSON().slice(0,10);//YYYY-MM-DD

  let data = {}

  data.riskId = prop.policyId;
  data.claimId = prop.claimId;
  data.claimNo = prop.claimDetailsForEdit.Claim_No;
  data.n_PolicyMaster_FK = prop.policyDetails.n_PolicyNoId_PK;
  data.n_TermMaster_FK = prop.claimDetailsForEdit.n_TermMaster_FK;
  data.n_potransaction_PK = prop.claimDetailsForEdit.n_potransaction_FK;
  data.dateReserves = "";
  data.amount = 0 ;
  data.description = "" ;
  data.refund = "No";  
  data.n_PoCoverageSubMaster_PK = "" ;
  data.claimReserveId = "" ;
  data.dateReserves = Moment().format('YYYY-MM-DD');
  data.InvoiceDate = Moment().format('YYYY-MM-DD');
  data.InvoiceDueDate = Moment().format('YYYY-MM-DD');

  let item = prop.policyDetails.insuredPerson_info
  data.Personinfo_PK = item.n_PersonInfoId_PK;
  data.PayeeNameReadOnly = item.s_FullLegalName;
  data.PayeeName = item.s_FullLegalName;
  data.UnpostedAmount = unpostedAmount;

  if(item.addresses){
    for(let i of item.addresses){
      if(i.s_AddressTypeCode == "Mailing"){
        data.PersonAddressesId_PK = i.n_PersonAddressesId_PK;
        data.PersonAddress = i.s_AddressLine1+","+i.cityName.s_CityName;
      }
    }
  }
  const getTransStyle = (voidTransactions) => {
    if(voidTransactions) { return {'background':'yellow'}; }

    return {};
  }
  const handleTransType = (e) => {    
    if(!e.target.value){
      setSubTypeListDisabled(true);      
    }else{
      setSubTypeListDisabled(false);
    }
    setTransType(e.target.value);
    setTransSubType("");

    myFormRef.dispatch(
            actions.change(
                "reservePayment.tranSubTypeCode",
                ""));

    setRefundCheckDisabled(true);
    if(e.target.value && e.target.value!="Loss Reserves" && e.target.value!="Reset Reserves"){
      setRefundCheckDisabled(false);
    }
  }

  const getCvgLimitList = (tranSubTypeCode) => {
    let params = {};
    params.claimId = prop.claimId;
    params.tranSubTypeCode = tranSubTypeCode;
    setCvgLimitListLoading(true);

    if(transType == "Loss Reserves"){
      dispatch(ClaimService.getCvgLimitList(params))
            .then((res) => {
              setCvgLimitList(res.data);
              setCvgLimitListLoading(false);
            });
    } else {
      dispatch(ClaimService.getCvgLimitListPayment(params))
            .then((res) => {
              setCvgLimitList(res.data.cvgLimitData);
              setCvgLimitListLoading(false);
            });
    }
  }

  const handleTransSubType = (e) => {
    setTransSubType(e.target.value);
    setCvgLimitList([]);
    if(e.target.value){
      getCvgLimitList(e.target.value);
    }
  }

  const filterData = (index) => {
    const filterKey = filterKeys[index];
    if (index) {
      setFilteredData(claimReservePaymentDetails.filter((item) => { return item.transSubType == filterKey}))
    } else {
      setFilteredData(claimReservePaymentDetails);
    }
    setActiveTable(index);
  }

  const getUnpostedAmount = () => {
    let params = {};
    params.claimId = prop.claimId;

    let _myFormRef = myFormRef;

    dispatch(ClaimService.unpostedTransactionAmount(params))
          .then((res) => {
            if(res.status == "Y" && res.unpostedAmount){
                setUnpostedAmount(res.unpostedAmount);
            }
          });
  }

  const getClaimReservePaymentDetails = (tranSubTypeCode='') => {
    let params = {};
    params.claimId = prop.claimId;

    params.tranSubTypeCode = "";
    if(tranSubTypeCode){
      params.tranSubTypeCode = tranSubTypeCode;
    }
    dispatch(ClaimService.getClaimReservePaymentDetails(params))
          .then((res) => {
              let claimReservePaymentDetails = [];
              
              for(let i of res.data){
                let dataToDisplay = {};
                dataToDisplay.reserveId = i.ClaimReserveId_PK;
                dataToDisplay.date = i.Reserve_Date;
                dataToDisplay.transType = i.Tran_Type_Code;
                dataToDisplay.transSubType = i.Tran_SubType_Code;
                dataToDisplay.in = ( i.Tran_Type_Code=="Loss Reserves" ? "$"+i.AmountDisplay : "$0.00");
                dataToDisplay.out = ( i.Tran_Type_Code=="Loss Payment" || i.Tran_Type_Code=="Reset Reserves" ? "$("+(i.AmountDisplay)+")" : "$0.00");
                if(i.Tran_Type_Code=="Loss Payment" && Math.sign(i.Amount)==1) {
                  dataToDisplay.in = "$"+i.AmountDisplay;
                  dataToDisplay.out = "$0.00";
                }
                dataToDisplay.voidTransactions = i.voidTransactions

                dataToDisplay.runningBal = "$"+i.RunningBalance;
                dataToDisplay.inserted = (i.inserted_by.Admin_ID==1 ? "System" : i.inserted_by.s_ScreenName);

                claimReservePaymentDetails.push(dataToDisplay);
              }
              setFilteredData(claimReservePaymentDetails);
              setClaimReservePaymentDetails(claimReservePaymentDetails);
              setLoadingTab(false);
          });
  }

  const showReservePaymentDetails = (reserveId) => {
    setReservePaymentDetailsOpen(true);
    setReservePaymentDetailsLoading(true);    
    let params = {reserveId};

    dispatch(ClaimService.showReservePaymentDetails(params))
          .then((res) => {
            let items = [];

            for(let i of res.data){              
              i.n_Amount = Math.abs(i.n_Amount);
              i.TotalReserveAmount = Math.abs(i.TotalReserveAmount);
              items.push(i);
            }
            let totalReserve = {'Tran_Type_Code':'', 'TotalReserveAmount':''};

            totalReserve.Tran_Type_Code = items[0].Tran_Type_Code;
            totalReserve.TotalReserveAmount = items[0].TotalReserveAmount;

            setReservePaymentDetailsData(items);
            setTotalReservePaymentDetailsData(totalReserve);
            setReservePaymentDetailsLoading(false);            
          });
  }

  const viewSubLedgerEntry = (reserveId) => {
    setSubLedgerEntryOpen(true);
    setSubLedgerEntryLoading(true);    
    let params = {reserveId};

    dispatch(ClaimService.viewSubLedgerEntry(params))
          .then((res) => {
            setSubLedgerEntryData(res.data);
            setSubLedgerEntryLoading(false);
          });
  }

  const viewReserveDetails = (reserveId) => {
    setViewReserveDetailsOpen(true);
    setViewReserveDetailsLoading(true);
    let params = {'claimReserveID': reserveId, 'status':''};    
    
    dispatch(ClaimService.viewReserveDetails(params))
          .then((res) => {
            setViewReserveDetailsData(res.data);
            setViewReserveDetailsLoading(false);
          });
  }

  const viewUnpostedTransaction = () => {    
    setViewUnpostedTransactionOpen(true);
    setViewUnpostedTransactionLoading(true);
    let params = {'claimId': prop.claimId};

    dispatch(ClaimService.unpostedTransaction(params))
          .then((res) => {
            setViewUnpostedTransactionData(res.data);
            setViewUnpostedTransactionLoading(false);
          });    
  }

  const changedAmount = (e) => {
    let newAmount = e.target.value;
    if(!newAmount || Number.isNaN(newAmount)){
      return;
    }

    newAmount = newAmount*1;
    let PCCoverageID = e.target.getAttribute('data-index');

    let totalAmount = 0;
    let newCvgData = true;
    let allocationDataTmp = []
    allocationDataTmp = allocationData;

    for(let i in allocationDataTmp){
      if(allocationDataTmp[i].n_PCCoverageID_PK == PCCoverageID){
        allocationDataTmp[i].amount = newAmount;
        newCvgData = false;
      }
      totalAmount += allocationDataTmp[i].amount *1;
    }
    
    if(newCvgData){
      allocationDataTmp = allocationData;
      allocationDataTmp.push({
        'n_PCCoverageID_PK' : PCCoverageID,
        'amount' : newAmount,
      });
      totalAmount += newAmount;
    }

    myFormRef.dispatch(
            actions.change(
                "reservePayment.amount",
                totalAmount));
    setAllocationData(allocationDataTmp);
  }

  const setPayeeData = (item) => {
    myFormRef.dispatch(actions.change("reservePayment.Personinfo_PK",item.Personinfo_PK));    
    myFormRef.dispatch(actions.change("reservePayment.PayeeNameReadOnly",item.s_FullLegalName));
    myFormRef.dispatch(actions.change("reservePayment.PayeeName",item.s_FullLegalName));
    myFormRef.dispatch(actions.change("reservePayment.PersonAddressesId_PK",item.n_PersonAddressesId_PK));
    myFormRef.dispatch(actions.change("reservePayment.PersonAddress",item.s_AddressLine1+","+item.s_CityName));
    
    setPayeeModalOpen(false)
  }

  const voidPayment = (reserveId, voidReason) => {
    let params = {'claimReserveId': reserveId, 'reasonForVoid':voidReason, 'checkPrintFlag':'N' }

    dispatch(ClaimService.voidPayment(params));
    setViewReserveDetailsOpen(false);
  }

  useEffect(() => {
    if(prop.activeTab=='payment'){
      setLoadingTab(true);
      let masterParams = {};
      masterParams.conditions = ['MNG_TRANSTYPE', 'MNG_TRANSUBTYPE', 'VOID_PAYMENT_REASON' ];
      masterParams.key = "s_AppCodeName";
      dispatch(ClaimService.getMasterData(masterParams))
          .then((res) => {              
              let i = "";
              let temp = [];

              for(i of res.data.MNG_TRANSTYPE){
                temp[i.s_AppCodeName] = i.s_AppCodeNameForDisplay;
              }
              setTransTypeList(temp);

              temp = [];
              for(i of res.data.MNG_TRANSUBTYPE){
                temp[i.s_AppCodeName] = i.s_AppCodeNameForDisplay;
              }
              setTransSubTypeList(temp);

              temp = [];
              for(i of res.data.VOID_PAYMENT_REASON){
                temp[i.s_AppCodeName] = i.s_AppCodeNameForDisplay;
              }
              setPaymentReasonList(temp);

              getUnpostedAmount();
              getClaimReservePaymentDetails();              
          });      
    }
  },[prop.activeTab]);

  const handleSubmit = (values) => {
    let valuesToPass = {...values};
    setLoadingTab(true);
    if(valuesToPass.tranTypeCode == "Loss Reserves"){
      valuesToPass.refund = "No";  
      valuesToPass.n_PoCoverageSubMaster_PK = "" ;
      valuesToPass.claimReserveId = "" ;
      valuesToPass.allocationData = allocationData;
    }

    let _myFormRef = myFormRef;
    dispatch(ClaimService.addClaimReservePayment(valuesToPass))
            .then(() => {
              getClaimReservePaymentDetails();
              resetForm(_myFormRef);
              setLoadingTab(false);
            });
  };

  const handleChange = (values) => {
        
  };

  const attachDispatch = (_dispatch) => {
    _dispatch(actions.change(data));
  };

  const resetForm = (_myFormRef='') => {
    setTransType('');
    setTransSubType('');
    setRefundCheckDisabled(true);
    if(_myFormRef) { myFormRef = _myFormRef; }
    myFormRef.dispatch(actions.reset('reservePayment'));
  };

  if(loadingTab){
    return (<>
      <div className="sk-wave">
        <div className="sk-rect sk-rect1"></div>&nbsp;
        <div className="sk-rect sk-rect2"></div>&nbsp;
        <div className="sk-rect sk-rect3"></div>&nbsp;
        <div className="sk-rect sk-rect4"></div>&nbsp;
        <div className="sk-rect sk-rect5"></div>
      </div>
    </>);
  } else {
    return (
    <>
      <LocalForm
              onSubmit={(values) => handleSubmit(values)}
              onChange={(values) => handleChange(values)}
              model="reservePayment"
              initialState={{ ...data }}
              getDispatch={(_dispatch) => attachDispatch(_dispatch)}
              ref={(el) => myFormRef = el}              
            >
        <Card>        
          <CardHeader>
            Add Reserves/Payment
          </CardHeader>
          <CardBody>
              <Control
                model=".riskId"
                component={props => <Input {...props} type="hidden" name="riskId" id="riskId" size="sm"></Input>}/>
              
              <Control
                model=".claimId"
                component={props => <Input {...props} type="hidden" name="claimId" id="claimId" size="sm"></Input>}/>
              
              <Control
                model=".claimNo"
                component={props => <Input {...props} type="hidden" name="claimNo" id="claimNo" size="sm"></Input>}/>

              <Control
                model=".n_PolicyMaster_FK"
                component={props => <Input {...props} type="hidden" name="n_PolicyMaster_FK" id="n_PolicyMaster_FK" size="sm"></Input>}/>

              <Control
                model=".n_TermMaster_FK"
                component={props => <Input {...props} type="hidden" name="n_TermMaster_FK" id="n_TermMaster_FK" size="sm"></Input>}/>

              <Control
                model=".n_potransaction_PK"
                component={props => <Input {...props} type="hidden" name="n_potransaction_PK" id="n_potransaction_PK" size="sm"></Input>}/>

              <Control
                model=".Personinfo_PK"
                component={props => <Input {...props} type="hidden" name="Personinfo_PK" id="Personinfo_PK" size="sm"></Input>}/>

                <Control
                  model=".PersonAddressesId_PK"
                  component={props => <Input {...props} type="hidden" name="PersonAddressesId_PK" id="PersonAddressesId_PK" size="sm"></Input>}/>

              <Table borderless size="sm">
                <tbody>
                  <tr>
                    <td className="align-middle"><Label className="mb-0">Date</Label></td>
                    <td>
                      <Control
                        model = ".dateReserves"
                        component = { props => <Input {...props} type='date' size='sm' max = {transType == 'Loss Payment' ? maxDateOfReserve : ""} /> }
                        validators={{ required }}
                      />

                      <Errors
                          model=".dateReserves"
                          show={(field) => field.touched && !field.focus}
                          className="error"
                          messages={{
                            required: Message.required
                          }}
                        />
                    </td>
                    <td></td>
                    <td className="align-middle"><Label className="mb-0">Transaction Type</Label></td>
                    <td colSpan="3">
                      <Control
                        model=".tranTypeCode"
                        onChange={handleTransType}
                        component={props => <Input {...props} type="select" name="tranTypeCode" id="tranTypeCode" size="sm">
                                    <option value="" selected="selected">Select</option>
                                    <option value="Loss Reserves">Loss Reserves</option>
                                    <option value="Loss Payment">Loss Payment</option>
                                    <option value="Reset Reserves">Reset Reserves</option>
                          </Input>}
                        validators={{ required }}
                          />

                        <Errors
                          model=".tranTypeCode"
                          show={(field) => field.touched && !field.focus}
                          className="error"
                          messages={{
                            required: Message.required
                          }}
                        />
                    </td>
                  </tr>
                  
                  <tr>
                    <td className="align-middle"><Label className="mb-0">Transaction Sub Type</Label></td>
                    <td>
                    <Control
                      model=".tranSubTypeCode"
                      onChange={handleTransSubType}
                      disabled={subTypeListDisabled}
                      component={props => <Input {...props} type="select" name="tranSubTypeCode" id="tranSubTypeCode" size="sm">
                                  <option value="" selected="selected">Select</option>
                                  <option value="Claim Expense">Claim Expense</option>
                                  <option value="OAE">OAE</option>
                                  <option value="Legal Expense">Legal Expense</option>
                                  <option value="Mitigation">Mitigation</option>
                                  <option value="Other Legal">Other Legal</option>
                                  <option value="Subrogation">Subrogation</option>
                                  <option value="Excess Deductible">Excess / Deductible</option>
                        </Input>}
                      validators={{ required }}
                        /> 

                      <Errors
                        model=".tranSubTypeCode"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                          required: Message.required
                        }}
                      />
                    </td>
                    <td></td>
                    <td className="align-middle"><Label className="mb-0">Amount</Label></td>
                    <td colSpan="3">
                    <Control
                        model = ".amount"
                        component = { props => <Input {...props} type='text' size='sm' color="primary" disabled className="gray-input" name='amount' id='amount'/> }
                        validators={{ required }}
                        />

                        <Errors
                        model=".amount"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                          required: Message.required
                        }}
                      />
                    </td>
                  </tr>
                  {
                    transType == 'Loss Payment' && (
                      <>
                        <tr>
                          <td className="align-middle">Payee</td>
                          <td>
                            <Control
                              model = ".PayeeNameReadOnly"
                              component = { props => <Input {...props} type='text' size='sm' color="primary" disabled className="gray-input" name='PayeeNameReadOnly' id='PayeeNameReadOnly'/> }/>
                          </td>
                          <td>
                            <Button size="sm" onClick={()=>setPayeeModalOpen(true)} color="primary">Select Payee</Button>
                          </td>
                          <td className="align-middle">Address</td>
                          <td rowSpan="2" colSpan="2">
                            <Control
                              model = ".PersonAddress"
                              component = { props => <Input {...props} type='textarea' name='PersonAddress' id='PersonAddress' size='sm' disabled/> }/>
                          </td>
                        </tr>
                        <tr>
                          <td className="align-middle">Name on Check</td>
                          <td>
                            <Control
                              model = ".PayeeName"
                              component = { props => <Input {...props} type='text' size='sm' color="primary" name='PayeeName' id='PayeeName'/> }/>
                          </td>
                          <td colSpan="2"></td>
                        </tr>
                        <tr>
                          <td className="align-middle">Invoice Date</td>
                          <td>
                            <Control
                              model = ".InvoiceDate"
                              component = { props => <Input {...props} type='date' size='sm' color="primary" name='InvoiceDate' id='InvoiceDate'/> }
                              validators = {{ required }}
                              />
                            <Errors
                              model=".InvoiceDate"
                              show={(field) => field.touched && !field.focus}
                              className="error"
                              messages={{
                                required: Message.required
                              }}
                            />
                          </td>
                          <td></td>
                          <td className="align-middle">Invoice Due Date</td>
                          <td>
                            <Control
                              model = ".InvoiceDueDate"
                              component = { props => <Input {...props} type='date' size='sm' color="primary" name='InvoiceDueDate' id='InvoiceDueDate'/> }
                              validators = {{ required }}
                              />
                            <Errors
                              model=".InvoiceDueDate"
                              show={(field) => field.touched && !field.focus}
                              className="error"
                              messages={{
                                required: Message.required
                              }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="align-middle">Invoice#</td>
                          <td>
                            <Control
                              model = ".InvoiceNo"
                              component = { props => <Input {...props} type='text' size='sm' color="primary" name='InvoiceNo' id='InvoiceNo'/> }
                              validators = {{ required }}
                              />
                            <Errors
                              model=".InvoiceNo"
                              show={(field) => field.touched && !field.focus}
                              className="error"
                              messages={{
                                required: Message.required
                              }}
                            />
                          </td>
                          <td></td>
                          <td className="align-middle">Memo On Check</td>
                          <td>
                            <Control
                              model = ".MemoOnCheck"
                              component = { props => <Input {...props} type='text' size='sm' color="primary" name='MemoOnCheck' id='MemoOnCheck'/> }
                              validators = {{ required }}
                              />
                            <Errors
                              model=".MemoOnCheck"
                              show={(field) => field.touched && !field.focus}
                              className="error"
                              messages={{
                                required: Message.required
                              }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="6">
                            <hr />
                          </td>
                        </tr>
                        <tr>
                          <td className="align-middle"><strike>File Name</strike></td>
                          <td><Input size="sm" name="docFileName"/></td>
                          <td></td>
                          <td className="align-middle"><strike>Authorization</strike></td>
                          <td>
                            <Input type="select" size="sm" name="documentAuthorisation">
                              <option value="" selected="selected">Select</option>
                              <option value="Internal">Internal</option>
                              <option value="External">External</option>
                            </Input>
                          </td>
                        </tr>
                        <tr>
                          <td><strike>Attachment Type</strike></td>
                          <td>
                            <Input type="select" size="sm">
                              <option value="" selected="selected">Select</option>
                              <option value="SINGLE">Single File</option>
                              <option value="MULTIPLE">Multiple Files</option>
                            </Input>
                          </td>
                          <td></td>
                          <td className="align-middle"><strike>Document Type</strike></td>
                          <td className="align-middle">
                            <Input type="select" size="sm" multiple name="documentAttachType">
                              <option value="5">Repair Estimate</option>
                              <option value="INVOICE">Invoice</option>
                              <option value="SETTLEMENTPAYMENT">Settlement Payment</option>
                              <option value="SETTLEMENTTOVENDOR">Settlement To Vendor</option>
                              <option value="LEGALPAYMENT">Legal Payment</option>
                            </Input>
                          </td>
                        </tr>
                      </>
                    )
                    
                  }
                  <tr>
                    {
                      transType == 'Loss Payment' ? (
                        <>
                          <td><strike>Document Attach</strike></td>
                          <td colSpan="2">
                            <Input type="file" />
                          </td>
                        </>
                      ) : (
                        <td colSpan="3"></td>
                      )
                    }
                    <td className="align-middle"><Label className="mb-0">Description</Label></td>
                    <td colSpan="3">
                      <Control
                        model = ".description"
                        component = { props => <Input {...props} type='textarea' name='description' id='description' size='sm' rows="5"/> }
                        validators = {{ required }}
                        />

                        <Errors
                          model=".description"
                          show={(field) => field.touched && !field.focus}
                          className="error"
                          messages={{
                            required: Message.required
                          }}
                        />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4"></td>
                    <td colSpan="3" className="align-bottom">
                    <Control
                        model = ".refund"
                        disabled={refundCheckDisabled}
                        component = { props => <Input {...props} id="refund" name="refund" type="checkbox" color="primary" size="sm"/> }/>
                      Refund
                    <Control
                        model = ".refundCheck"
                        disabled={refundCheckDisabled}
                        component = { props => <Input {...props} id="refundCheck" name="refundCheck" type="checkbox" color="primary" size="sm"/> }/>
                      Refund Check
                    </td>
                  </tr>
                </tbody>
              </Table>          
          </CardBody>
          <CardFooter>
            <Button color="primary" disabled size="sm" className="float-left">Claim Deductible Payment</Button>
            <Button color="danger" size="sm" className="float-left ml-3" onClick={() => viewUnpostedTransaction()}>Unposted</Button>
            <Control
                model = ".UnpostedAmount"
                component = { props => <Input {...props} disabled size="sm" color="primary" className="gray-input float-left ml-3" style={{ width: '100px' }} name="UnpostedAmount" id="UnpostedAmount"/> }/>            
            <Button type="reset" color="primary" size="sm" className="float-right ml-3" onClick={() => resetForm()}>Clear</Button>
            <Button color="primary" size="sm" className="float-right">Add Reserves/Payment</Button>
          </CardFooter>        
        </Card>
      </LocalForm>
      {transSubType != '' && cvgLimitListLoading && (
        <div className="sk-wave" id='cvgLimitLoadingBox'>
          <div className="sk-rect sk-rect1"></div>&nbsp;
          <div className="sk-rect sk-rect2"></div>&nbsp;
          <div className="sk-rect sk-rect3"></div>&nbsp;
          <div className="sk-rect sk-rect4"></div>&nbsp;
          <div className="sk-rect sk-rect5"></div>
        </div>
      )}
      {transSubType != '' && transType == 'Loss Reserves' && !cvgLimitListLoading && (
        <Table borderless responsive size="sm">
          <thead>
            <tr>
              <th>COVERAGE NAME</th>
              <th>TRANS. SUB TYPE</th>
              <th>INSURED LIMIT</th>
              <th>RESERVE ALLOCATION</th>
              <th>RESERVE CREATED</th>              
              <th>BALANCE</th>              
            </tr>
          </thead>
          <tbody>
          {
            cvgLimitList.map((item, index) => (
              <tr>
                <td>{item.s_ScreenName}</td>
                <td>{item.Tran_SubType_Code}</td>
                <td style={{'text-align':'right', 'padding-right':'10px !important'}}>${item.n_InsuredValue}</td>
                <td>
                  <Control
                        model = ".amount[]"                        
                        onBlur = {(e) => changedAmount(e)}
                        component = { props => <Input {...props} data-index={index+1} type='text' size='sm' /> }/>
                </td>
                <td style={{'text-align':'right', 'padding-right':'10px !important'}}>${item.ReserveSum}</td>                
                <td style={{'text-align':'right', 'padding-right':'10px !important'}}>${item.Balance}</td>                
              </tr>
            ))
          }
          </tbody>
        </Table>
      )}
      {transSubType != '' && (transType == 'Loss Payment' || transType == 'Reset Reserves') && !cvgLimitListLoading && (
        <Table borderless responsive size="sm">
          <thead>
            <tr>
              <th>COVERAGE NAME</th>
              <th>TRANS. SUB TYPE</th>
              <th>RESERVE CREATED</th>
              <th>PAYMENT CREATED</th>
              <th>BALANCE</th>              
              <th>PAYMENT ALLOCATION</th>
            </tr>
          </thead>
          <tbody>
          {
            cvgLimitList.map((item, index) => (
              <tr>
                <td>{item.s_ScreenName}</td>
                <td>{item.Tran_SubType_Code}</td>
                <td style={{'text-align':'right', 'padding-right':'10px !important'}}>${item.n_Reserves}</td>                
                <td style={{'text-align':'right', 'padding-right':'10px !important'}}>${item.n_Paid}</td>                
                <td style={{'text-align':'right', 'padding-right':'10px !important'}}>${item.Balance}</td>                
                <td>
                  <Control
                        model = ".amount[]"                        
                        onBlur = {(e) => changedAmount(e)}
                        component = { props => <Input {...props} data-index={index+1} type='text' size='sm' /> }/>
                </td>
              </tr>
            ))
          }
          </tbody>
        </Table>
      )}
      <Card>
        <CardHeader className="text-right">
          <Button size="sm" color={activeTable == 0 ? 'primary' : 'secondary'} className="mr-1" onClick={() => filterData(0)}>Ledger</Button>
          <Button size="sm" color={activeTable == 1 ? 'primary' : 'secondary'} className="mr-1" onClick={() => filterData(1)}>Claim Expense</Button>
          <Button size="sm" color={activeTable == 2 ? 'primary' : 'secondary'} className="mr-1" onClick={() => filterData(2)}>OAE</Button>
          <Button size="sm" color={activeTable == 3 ? 'primary' : 'secondary'} className="mr-1" onClick={() => filterData(3)}>Legal Expense</Button>
          <Button size="sm" color={activeTable == 4 ? 'primary' : 'secondary'} className="mr-1" onClick={() => filterData(4)}>Mitigation</Button>
          <Button size="sm" color={activeTable == 5 ? 'primary' : 'secondary'} className="mr-1" onClick={() => filterData(5)}>Other Legal</Button>
          <Button size="sm" color={activeTable == 6 ? 'primary' : 'secondary'} className="mr-1" onClick={() => filterData(6)}>Subrogation</Button>
          <Button size="sm" color={activeTable == 7 ? 'primary' : 'secondary'}  onClick={() => filterData(7)}>Excess / Deductible</Button>
        </CardHeader>
        <Table size="sm" striped borderless responsive style={{'font-size':'13px'}}>
          <thead>
            <tr style={{'text-align':'center'}}>
              <th>DATE</th>
              <th>TRANS TYPE</th>
              <th>TRANS SUB TYPE</th>
              <th>(+)</th>
              <th>(-)</th>
              <th>RUNNING BALANCE</th>
              <th>INSERTED USER</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredData.map((item, index) => (
                <tr key={index} style={getTransStyle(item.voidTransactions)}>
                  <td>{item.date}</td>
                  {item.transType != "Loss Payment" && (<td>{item.transType}</td>)}
                  {item.transType == "Loss Payment" && (<td><a href="javascript:void(0);" onClick={() => viewReserveDetails(item.reserveId)}>{item.transType}</a></td>)}
                  <td>{item.transSubType}</td>
                  <td style={{'text-align':'right'}}>{item.in}&nbsp;&nbsp;</td>
                  {item.out!="$0.00" && (<td style={{'color': 'red','text-align':'right'}}>{item.out}&nbsp;&nbsp;</td>)}
                  {item.out=="$0.00" && (<td style={{'text-align':'right'}}>{item.out}&nbsp;&nbsp;</td>)}
                  <td style={{'text-align':'right'}}>{item.runningBal}&nbsp;&nbsp;</td>
                  <td>{item.inserted}</td>
                  <td>
                    <a href="javascript:void(0);" title="Show Details" onClick={() => showReservePaymentDetails(item.reserveId)}><i class="nav-icon icon-notebook"></i></a>&nbsp;&nbsp;
                    <a href="javascript:void(0);" title="Show Entry" onClick={() => viewSubLedgerEntry(item.reserveId)}><i class="nav-icon icon-screen-desktop"></i></a>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        <SubLedgerEntryModal            
            isOpen={subLedgerEntryOpen}
            data={subLedgerEntryData}
            toggle={() => setSubLedgerEntryOpen(false)}
            isLoading = {subLedgerEntryLoading}            
        />
        <ReservePaymentDetailsModal            
              isOpen={reservePaymentDetailsOpen}
              data={reservePaymentDetailsData}
              totalReservedata={totalReservePaymentDetailsData}
              toggle={() => setReservePaymentDetailsOpen(false)}
              isLoading = {reservePaymentDetailsLoading}
        />
        <ReserveDetailsModal            
              isOpen={viewReserveDetailsOpen}
              data={viewReserveDetailsData}              
              toggle={() => setViewReserveDetailsOpen(false)}
              paymentReasons = {paymentReasonList}
              voidPayment = {voidPayment}
              isLoading = {viewReserveDetailsLoading}
        />
        <PayeeModal            
              isOpen={payeeModalOpen}              
              toggle={() => setPayeeModalOpen(false)}
              setPayeeData={setPayeeData}
        />
        <UnpostedAmount            
              isOpen={viewUnpostedTransactionOpen}              
              toggle={() => setViewUnpostedTransactionOpen(false)}              
              data={viewUnpostedTransactionData}               
              isLoading = {viewUnpostedTransactionLoading}
        />
        
      </Card>      
    </>);
  }
}

export default PaymentTab;