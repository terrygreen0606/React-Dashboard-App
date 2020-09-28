import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import MortgageesSearch from './MortgageesSearch';
import * as QuoteEntryService from '../../../services/quoteEntryService';

import {
  Modal, ModalHeader, ModalBody, Row, Col, Label, Input, Button
} from 'reactstrap';

const MortgageesForm = props => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [loanNo, setLoadNo] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isSearchModal, setSearchModal] = useState(false);
  const [mortgageePersonPK, setMortgageePersonPK] = useState('');
  const [mortgageeAddressPK, setMortgageeAddressPK] = useState('');
  const [poRiskMortgageePK, setPoRiskMortgageePK] = useState('');
  const [address, setAddress] = useState('');
  const [clientID, setClientID] = useState('');
  const [isSetData, setIsSetData] = useState(false);

  useEffect(()=>{
    if(props.editData != null && !isSetData){
      setAllSavedData();
    }
  })

  const setAllSavedData = () => {
    setClientID(props.editData.clientID);
    setName(props.editData.name);
    setAddress(props.editData.address);
    setType(props.editData.type);
    setLoadNo(props.editData.loanNo);
    setMortgageePersonPK(props.editData.mortgageePersonPK);
    setMortgageeAddressPK(props.editData.mortgageeAddressPK);
    setPoRiskMortgageePK(props.editData.poRiskMortgageePK);
    setIsSetData(true);
  }

  const addData = () => {
    const params = {
      name, type, loanNo, address, mortgageePersonPK, mortgageeAddressPK, poRiskMortgageePK,
      poTransPK: props.mainState.poTransPK, poRiskMasterPK: props.mainState.poRiskMasterPK
    }
    setLoading(true)
      props.dispatch(QuoteEntryService.saveMortgageeData(params))
          .then((res) => {
            const params = {clientID ,name, type, loanNo, address, mortgageePersonPK, mortgageeAddressPK, poRiskMortgageePK: res.poRiskMortgageePK}
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
  }

  return (
    <React.Fragment>
      <Modal isOpen={props.isModalOpen} style={{ "width": "700px" }}>
        <ModalHeader className="p-2 mt-2" >Mortgagees Infos</ModalHeader>
        <ModalBody className="p-2">
          <Row className="mt-3">
            <Col sm='4' className='pr-0'><Label>Mortgagees Name:</Label></Col>
            <Col sm='5'className='pl-0 pr-0'><Input type='text' bsSize='sm' value={name} readOnly/></Col>
            <Col sm='3'className='pl-1'><Button type='button' size='sm' color='info' disabled={isLoading} onClick={()=>setSearchModal(true)}><i className="fa fa-search"></i>&nbsp;&nbsp;Search</Button></Col>
          </Row>
          <Row className="mt-1">
            <Col sm='4' className='pr-0'><Label>Type:</Label></Col>
            <Col sm='3'className='pl-0 pr-0'>
              <Input type='select' bsSize='sm' value={type} onChange={(e)=>setType(e.target.value)} disabled={isLoading}>
                <option key="" value="">Select</option>
                {props.baseData != null ? props.baseData.MORTGAGEETYPE.map((comp, i) => {
                  return (
                    <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
                  );
                }) : null}
              </Input>
            </Col>
          </Row>
          <Row className="mt-1">
            <Col sm='4' className='pr-0'><Label>Loan No:</Label></Col>
            <Col sm='3'className='pl-0 pr-0'><Input type='text' bsSize='sm' value={loanNo} onChange={(e)=>setLoadNo(e.target.value)} disabled={isLoading}/></Col>
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