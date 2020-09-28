import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import MortgageesSearch from './MortgageesSearch';
import * as QuoteEntryService from '../../../../services/quoteEntryService';

import {
  Modal, ModalHeader, ModalBody, Row, Col, Label, Input, Button
} from 'reactstrap';

const MortgageesForm = props => {
  const [s_FullLegalName, setName] = useState('');
  const [s_PoMortgageeTypeCode, setType] = useState('');
  const [s_LoanNumber, setLoadNo] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isSearchModal, setSearchModal] = useState(false);
  const [mortgageePersonPK, setMortgageePersonPK] = useState('');
  const [mortgageeAddressPK, setMortgageeAddressPK] = useState('');
  const [poRiskMortgageePK, setPoRiskMortgageePK] = useState('');
  const [address, setAddress] = useState('');
  const [s_PersonUniqueId, setClientID] = useState('');
  const [isSetData, setIsSetData] = useState(false);
  const [s_AddressLine1, setAddrLine] = useState('');
  const [s_CityName, setCity] = useState('');
  const [s_CountyName, setCounty] = useState('');
  const [s_StateCode, setStateCode] = useState('');
  const [s_PostalCode, setZip] = useState('');
  const [name, setNameParam] = useState('');
  const [type, setTypeParam] = useState('');
  const [loanNo, setLoadNoParam] = useState('');
  const [clientID, setClientIDParam] = useState('');

  useEffect(()=>{
    if(props.editData != null && !isSetData){
      setAllSavedData();
    }
  })

  const setAllSavedData = () => {
    setClientID(props.editData.s_PersonUniqueId);
    setName(props.editData.s_FullLegalName);
    setAddress(props.editData.s_AddressLine1  + props.editData.s_CityName + props.editData.s_StateCode + props.editData.s_PostalCode);
    setType(props.editData.s_PoMortgageeTypeCode);
    setLoadNo(props.editData.s_LoanNumber);
    setMortgageePersonPK(props.editData.n_POMortgageePerson_Fk);
    setMortgageeAddressPK(props.editData.n_POAddress_Fk);
    setPoRiskMortgageePK(props.editData.n_PORiskMortgagee_Pk);
    setIsSetData(true);
    setAddrLine(props.editData.s_AddressLine1);
    setCity(props.editData.s_CityName);
    setCounty(props.editData.s_CountyName);
    setStateCode(props.editData.s_StateCode);
    setZip(props.editData.s_PostalCode);
    setClientIDParam(props.editData.s_PersonUniqueId);
    setNameParam(props.editData.s_FullLegalName);
    setTypeParam(props.editData.s_PoMortgageeTypeCode);
    setLoadNoParam(props.editData.s_LoanNumber);
  }

  const addData = () => {
    const params = {
      name:s_FullLegalName, type:s_PoMortgageeTypeCode, loanNo:s_LoanNumber, address, mortgageePersonPK, mortgageeAddressPK, poRiskMortgageePK,
      poTransPK: props.poTransaction_PK, poRiskMasterPK: props.n_PORiskMaster_PK,
    }
    setLoading(true)
      props.dispatch(QuoteEntryService.saveMortgageeData(params))
          .then((res) => {
            const params = {s_PersonUniqueId ,s_FullLegalName, s_PoMortgageeTypeCode, s_LoanNumber, address, mortgageePersonPK, mortgageeAddressPK, poRiskMortgageePK: res.poRiskMortgageePK,s_AddressLine1,s_CityName,s_CountyName,s_StateCode,s_PostalCode}
            props.createGridObject(params)
            setLoading(false)
        });
  }
  
  const setMortgageesData = (rowData) => {
    var location = rowData.s_AddressLine1+','+rowData.s_CityName+','+rowData.s_StateCode+','+rowData.s_PostalCode;
    setAddress(location);
    setName(rowData.s_FullLegalName);
    setClientID(rowData.s_PersonUniqueId);
    setMortgageePersonPK(rowData.n_PersonInfoId_PK);
    setMortgageeAddressPK(rowData.n_PersonAddressesId_PK);
    setSearchModal(false);
    setAddrLine(rowData.s_AddressLine1);
    setCity(rowData.s_CityName);
    setCounty(rowData.s_CountyName);
    setStateCode(rowData.s_StateCode);
    setZip(rowData.s_PostalCode);
  }

  return (
    <React.Fragment>
      <Modal isOpen={props.isModalOpen} style={{ "width": "700px" }}>
        <ModalHeader className="p-2 mt-2" >Mortgagees Infos</ModalHeader>
        <ModalBody className="p-2">
          <Row className="mt-3">
            <Col sm='4' className='pr-0'><Label>Mortgagees Name:</Label></Col>
            <Col sm='5'className='pl-0 pr-0'><Input type='text' bsSize='sm' value={s_FullLegalName} readOnly/></Col>
            <Col sm='3'className='pl-1'><Button type='button' size='sm' color='info' disabled={isLoading} onClick={()=>setSearchModal(true)}><i className="fa fa-search"></i>&nbsp;&nbsp;Search</Button></Col>
          </Row>
          <Row className="mt-1">
            <Col sm='4' className='pr-0'><Label>Type:</Label></Col>
            <Col sm='3'className='pl-0 pr-0'>
              <Input type='select' bsSize='sm' value={s_PoMortgageeTypeCode} onChange={(e)=>setType(e.target.value)} disabled={isLoading}>
                <option key="" value="">Select</option>
                {props.MORTGAGEETYPE != null ? props.MORTGAGEETYPE.map((comp, i) => {
                  return (
                    <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
                  );
                }) : null}
              </Input>
            </Col>
          </Row>
          <Row className="mt-1">
            <Col sm='4' className='pr-0'><Label>Loan No:</Label></Col>
            <Col sm='3'className='pl-0 pr-0'><Input type='text' bsSize='sm' value={s_LoanNumber} onChange={(e)=>setLoadNo(e.target.value)} disabled={isLoading}/></Col>
          </Row>
          <Row className="mt-3">
            <Col sm="12" className="text-center">
              <Button type="button" size="sm" color="info" onClick={() => addData()} disabled={isLoading}><i className="fa fa-plus"></i>&nbsp;&nbsp;Add</Button>
              &nbsp;&nbsp;
              <Button type="button" size="sm" color="danger" onClick={() => {setIsSetData(false); props.clearedSetData();}} disabled={isLoading}><i className="fa fa-times"></i>&nbsp;&nbsp;Cancel</Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      <MortgageesSearch isSearchModal={isSearchModal} setSearchModal={()=>setSearchModal(false)} setMortgageesData={(data)=>setMortgageesData(data)}/>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  baseData: state.QuoteEntry.baseData,
});

export default connect(mapStateToProps)(MortgageesForm);