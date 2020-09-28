import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment';
import { TextMask, InputAdapter } from 'react-text-mask-hoc';
import * as QuoteEntryService from '../../../services/quoteEntryService';

import {
  Col,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
} from 'reactstrap';


const QuoteEntryHeader = props => {
  var currentDate = new Date();
  const [isSetData, isSetDataFun] = useState(false);
  const [d_TermStartDate, setTermStartDate] = useState(new Date(Moment(currentDate).add(1, 'day')));
  const [d_TermEndDate, setTermEndDate] = useState(new Date(Moment(d_TermStartDate).add(1, 'year')));
  const [binderDate, setBinderDate] = useState('');
  const [uwAppStatus, changeUWAppStatus] = useState(props.uwAppStatus);
  const [selectedAgency, changeAgency] = useState("");
  const [selectedAgent, changeAgent] = useState("");
  const [agencyDDData, setAgencyDD] = useState({});
  const [agentDDData, setAgentDD] = useState({});
  const [agencyAddr, setAgencyAddr] = useState('');
  const [agencyPhone, setAgencyPhone] = useState('');
  const [agencyEmail, setAgencyEmail] = useState('');
  const [isSetSavedData, isSetSavedDataFun] = useState(false);


  const setAllData = () => {
    setAgencyDD(props.baseData.AgencyDropDown.data);
    setAgentDD(props.baseData.AgentDropDown.data)
    changeAgency(props.baseData.AgencyDropDown.selectedAgency);
    changeAgent(props.baseData.AgentDropDown.selectedAgent);
    setAgencyAddr(props.baseData.agencyAddress);
    setAgencyPhone(props.baseData.agencyPhone);
    setAgencyEmail(props.baseData.agencyEmail);
    isSetDataFun(true);
  }

  useEffect(()=>{
    if(props.baseData != null && !isSetData){
      setAllData()
    }
    if(props.quoteSavedData != null && !isSetSavedData){
      setAllSavedData()
    }
  });

  const setAllSavedData = () => {
    setTermStartDate(new Date(Moment(props.quoteSavedData.poTermMasterData.d_TermStartDate)));
    setTermEndDate(new Date(Moment(props.quoteSavedData.poTermMasterData.d_TermEndDate)));
    setAgencyDD(props.quoteSavedData.agencyDropDown.data);
    setAgentDD(props.quoteSavedData.agentDropDown.data);
    changeAgency(props.quoteSavedData.agencyDropDown.selectedAgency);
    changeAgent(props.quoteSavedData.agentDropDown.selectedAgent);
    setAgencyAddr(props.quoteSavedData.agencyAddress);
    setAgencyPhone(props.quoteSavedData.agencyPhone);
    setAgencyEmail(props.quoteSavedData.agencyEmail);
    isSetSavedDataFun(true);
  }

  const filterData = (inputValue, which) => {
    if (props.baseData != null) {
      if (which == 'agency') {
        return agencyDDData.filter(i =>
          i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
      }
      if (which == 'agent') {
        return agentDDData.filter(i =>
          i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
      }
    }
    return [];
  };

  const getFilterData = (resultData, inputValue, which) => {
    if (props.baseData != null) {
      if (which == 'agency') {
        console.log(resultData)
        return resultData.filter(i =>
          i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
      }
      if (which == 'agent') {
        return resultData.filter(i =>
          i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
      }
    }
    return [];
  };

  const agencyLoadOptions = (inputValue, callback) => {
    if(inputValue.length > 3){
      const params = { searchParams: inputValue }
      props.dispatch(QuoteEntryService.getSearchAgency(params))
        .then((res) => {
          setAgencyDD(res)
          callback(getFilterData(res, inputValue, 'agency'));
        });
    }else{
      callback(filterData(inputValue, 'agency'));
    }
  };

  const agentLoadOptions = (inputValue, callback) => {
    callback(filterData(inputValue, 'agent'));
  };

  const onchangeTermStartDate = (date) => {
    setTermStartDate(date);
    const getTermEndDate = Moment(date).add(1, 'year');
    setTermEndDate(new Date(getTermEndDate));
  }

  const handleAgencyChange = (newValue) => {
    props.dispatch(QuoteEntryService.getAgencyAgent(newValue.value))
      .then((res) => {
        setAgentDD(res.getAgent)
        changeAgent(res.getAgent[0]);
        setAgencyAddr(res.getAgencyaddr);
        setAgencyPhone(res.getAgencyPhone);
        setAgencyEmail(res.getAgencyEmail);
      });
    changeAgency(newValue);
    return newValue;
  };

  const handleAgrntChange = (newValue) => {
    changeAgent(newValue);
    return newValue;
  };

  return (
    <React.Fragment>
      <Row className="p-0 m-0">
        <Col md="2">
          <FormGroup className="m-0">
            <InputGroup className="input-prepend">
              <Label id='QuoteNo' className="mb-0"><i className="cui-home icons"></i>&nbsp;Quote No.</Label>
            </InputGroup>
            <Input type="text" bsSize="sm" name="QuoteNo" id="s_HouseNo" placeholder="Quote No" value={props.policyNumber} readOnly/>
          </FormGroup>
        </Col>
        <Col md="2">
          <FormGroup className="m-0">
            <InputGroup className="input-prepend">
              <Label id='d_TermStartDate' className="mb-0"><i className="cui-calendar"></i>&nbsp;Effictive From</Label>
            </InputGroup>
            <DatePicker 
              customInput={
                <TextMask mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]} Component={InputAdapter}
                />
              }
              className="form-control form-control-sm" name="data[TbPotermmaster][d_TermStartDate]" selected={d_TermStartDate} onChange={(date) => onchangeTermStartDate(date)} />
          </FormGroup>
        </Col>
        <Col md="2">
          <FormGroup className="m-0">
            <InputGroup className="input-prepend">
              <Label id='d_TermStartDate' className="mb-0"><i className="cui-calendar"></i>&nbsp;Effictive To</Label>
            </InputGroup>
            <DatePicker className="form-control form-control-sm" name="data[TbPotermmaster][d_TermEndDate]" selected={d_TermEndDate} readOnly />
          </FormGroup>
        </Col>
        <Col md="2">
          <FormGroup className="m-0">
            <InputGroup className="input-prepend">
              <Label id='d_DateBound' className="mb-0"><i className="cui-calendar"></i>&nbsp;Binder Date</Label>
            </InputGroup>
            <DatePicker className="form-control form-control-sm" name="BinderDate" placeholderText="MM/DD/YYYY" selected={binderDate} readOnly />
          </FormGroup>
        </Col>
        <Col md="2">
          <FormGroup className="m-0">
            <InputGroup className="input-prepend">
              <Label id='FinalPremium' className="mb-0">Estm Prem</Label>
            </InputGroup>
            <Input type="text" bsSize="sm" name="FinalPremium" id="FinalPremium" placeholder="Estm Prem" readOnly/>
          </FormGroup>
        </Col>
        <Col md="2" className=''>
          <FormGroup className="m-0">
            <Label id='s_UWAppStatusTypeCode1' className="mb-0">UW. App. Status</Label>
            <Select
              name="data[TbPoappsmaster][s_UWAppStatusTypeCode]"
              value={uwAppStatus}
              options={props.baseData != null ? props.baseData.UWAPPSTATUS : ''}
              getOptionLabel={(option) => option.s_AppCodeNameForDisplay}
              getOptionValue={(option) => option.s_AppCodeName}
              onChange={(value) => changeUWAppStatus(value)}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row className="p-0 m-0">
        <Col md="4">
          <FormGroup className="m-0">
            <InputGroup className="input-prepend">
              <Label id='AgencyName' className="mb-0"><i className="cui-home icons"></i>&nbsp;Agency Name</Label>
            </InputGroup>
            <AsyncSelect 
              name="AgencyDropDown"
              cacheOptions
              loadOptions={agencyLoadOptions}
              defaultOptions={agencyLoadOptions}
              value={selectedAgency}
              onChange={handleAgencyChange}
            />
          </FormGroup>
        </Col>
        <Col md="4">
          <FormGroup className="m-0">
            <InputGroup className="input-prepend">
              <Label id='ProducerName' className="mb-0"><i className="cui-user icons"></i>&nbsp;Producer Name</Label>
            </InputGroup>
            <AsyncSelect 
              name="AgentDropDown"
              cacheOptions
              loadOptions={agentLoadOptions}
              defaultOptions={{agentLoadOptions}}
              value={selectedAgent}
              onChange={handleAgrntChange}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row className="p-0 m-0 mt-2">
        <Col sm="4">
          <Label><b>Email Address : {agencyEmail}</b></Label>
        </Col>
        <Col sm="5">
          <Label><b> Agency Address : {agencyAddr}</b></Label>
        </Col>
        <Col sm="3">
          <Label><b> Phone No. : {agencyPhone}</b></Label>
        </Col>
      </Row>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  baseData: state.QuoteEntry.baseData,
  uwAppStatus: state.QuoteEntry.uwAppStatus,
});

export default connect(mapStateToProps)(QuoteEntryHeader);