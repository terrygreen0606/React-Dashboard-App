import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as QuoteEntryService from '../../../services/quoteEntryService';
import ZipDetailsView from './ZipDetailsView';
import { toastAction } from '../../../store/actions/toast-actions';

import {
  Col,
  Row,
  Input,
  InputGroup,
  FormGroup, Label,
  Modal, ModalBody, ModalHeader,
} from 'reactstrap';

const MaillingAddr = props => {
  const [houseNo, setHouseNo] = useState('');
  const [direction1, setDirection1] = useState('');
  const [streetName, setStreetName] = useState('');
  const [houseType, setHousetype] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [zipCodePK, setZipCodePK] = useState('');
  const [city, setCity] = useState('');
  const [cityFK, setCityFK] = useState('');
  const [state, setState] = useState('');
  const [stateFK, setStateFK] = useState('');
  const [direction2, setdirection2] = useState('');
  const [county, setCounty] = useState('');
  const [countyFK, setCountyFK] = useState('');
  const [countryFK, setCountryFK] = useState('');
  const [isModalOpen, setToggleModal] = useState(false);
  const [multipleCity, setMultiplecity] = useState('');
  const [isSetSavedData, setSavedData] = useState(false);


  useEffect(() => {
    if(props.quoteSavedData != null && !isSetSavedData){
      selAllSavedData();
    }
  });

  const selAllSavedData = () => {
    var mailingData = props.quoteSavedData.applicantData.getMailingAddr;
    if(mailingData != null){
      setHouseNo(mailingData.s_HouseNo)
      setStreetName(mailingData.s_StreetName)
      setCounty(mailingData.s_CountyName)
      setCountyFK(mailingData.n_CountyId_FK)
      setCountryFK(mailingData.n_CountryId_FK)
      setState(mailingData.s_StateName)
      setStateFK(mailingData.n_StateId_FK)
      setCity(mailingData.s_CityName)
      setCityFK(mailingData.n_CityId_FK)
      setZipCode(mailingData.s_PostalCode)
      setZipCodePK(mailingData.n_Zipcodes_FK)
    }
    setSavedData(true);
  }

  const getDataFromZip = (zipCodeVal) => {
    props.dispatch(QuoteEntryService.getZipDetails(props.mainState.product, zipCodeVal, 'MAILING'))
      .then((res) => {
        if (res.status == 'N') {
          toastAction(false, res.errorMsg);
          setZipCode('')
          return false;
        } else {
          if (res.count > 1) {
            showMultipleCityModal(res.zipData);
          } else {
            setZipDetailsData(res.zipData[0]);
          }
        }
      });
  }

  const showMultipleCityModal = (zipData) => {
    setMultiplecity(<ZipDetailsView zipData={zipData} setZipDetailsData={setZipDetailsData}/>)
    setToggleModal(true);
  }

  const setZipDetailsData = (zipData) => {
    setCounty(zipData.s_ZipCounty.toUpperCase())
    setCountyFK(zipData.n_CountyId_FK)
    setState(zipData.s_StateCode.toUpperCase())
    setStateFK(zipData.n_StateId_PK)
    setCity(zipData.s_CityName.toUpperCase())
    setCityFK(zipData.n_CityId_PK)
    setCountryFK(zipData.n_CountryId_FK)
    setZipCodePK(zipData.n_Zipcodes_PK);
    setToggleModal(false);
  }

  return (
    <React.Fragment>
      <Row className="p-0 m-0">
      <Col md="1" className="p-1">
          <FormGroup className="m-0">
            <InputGroup className="input-prepend">
              <Label id='s_HouseNo' className="mb-0">House No.</Label>
            </InputGroup>
            <Input type="text" bsSize="sm" name="data[TbPersonaddressMail][s_HouseNo]" id="s_HouseNo" placeholder="House No" value={houseNo} onChange={(e)=>setHouseNo(e.target.value)} disabled={props.mainState.isBind}/>
          </FormGroup>
        </Col>
        <Col md="1" className="p-1">
          <FormGroup className="m-0">
            <Label id='s_HouseDirection1' className="mb-0">Direction</Label>
            <Input type="select" bsSize="sm" name="data[TbPersonaddressMail][s_HouseDirection1]" value={direction1} onChange={(e)=>setDirection1(e.target.value)} disabled={props.mainState.isBind}>
              <option key="" value="">Select</option>
              {props.baseData != null?props.baseData.HOMEADDRESSDIRECTION.map((comp, i) => {
                return (
                  <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
                );
              }):null}
            </Input>
          </FormGroup>
        </Col>
        <Col md="2" className="p-1">
          <FormGroup className="m-0">
            <Label id='s_StreetName' className="mb-0">Street Name</Label>
            <Input type="text" bsSize="sm" name="data[TbPersonaddressMail][s_StreetName]" id="s_StreetName" placeholder="Enter Street Name" value={streetName} onChange={(e)=>setStreetName(e.target.value.toUpperCase())} disabled={props.mainState.isBind}/>
          </FormGroup>
        </Col>
        <Col md="1" className="p-1">
          <FormGroup className="m-0">
            <Label id='s_HouseType' className="mb-0">Type</Label>
            <Input type="select" bsSize="sm" name="data[TbPersonaddressMail][s_HouseType]" value={houseType} onChange={(e)=>setHousetype(e.target.value)} disabled={props.mainState.isBind}>
              <option key="" value="">Select</option>
              {props.baseData != null?props.baseData.HOMEADDRESSTYPE.map((comp, i) => {
                return (
                  <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
                );
              }):null}
            </Input>
          </FormGroup>
        </Col>
        <Col md="1" className="p-1">
          <FormGroup className="m-0">
            <Label id='StreetName' className="mb-0">Zip</Label>
            <Input type="text" bsSize="sm" name="data[TbPersonaddressMail][s_PostalCode]" id="s_PostalCode" placeholder="Enter Zip Code" value={zipCode} onChange={(e)=>setZipCode(e.target.value)} onBlur={(e) => getDataFromZip(e.target.value)} disabled={props.mainState.isBind}/>
            <Input type="hidden" name="data[TbPersonaddressMail][n_Zipcodes_PK]" id="n_Zipcodes_PK" value={zipCodePK} disabled={props.mainState.isBind} />
          </FormGroup>
        </Col>
        <Col md="1" className="p-1">
          <FormGroup className="m-0">
            <Label id='StreetName' className="mb-0">City</Label>
            <Input type="text" bsSize="sm" name="n_CityId_FKName1" id="n_CityId_FKName1" placeholder="Enter City" value={city} readOnly disabled={props.mainState.isBind}/>
            <Input type="hidden" name="data[TbPersonaddressMail][n_CityId_FK]" id="n_CityId_FK" value={cityFK} disabled={props.mainState.isBind} />
          </FormGroup>
        </Col>
        <Col md="2" className="p-1">
          <FormGroup className="m-0">
            <Label id='n_StateId_FKName' className="mb-0">State</Label>
            <Input type="text" bsSize="sm" name="n_StateId_FKName1" id="n_StateId_FKName1" placeholder="Enter State" value={state} readOnly disabled={props.mainState.isBind}/>
            <Input type="hidden" name="data[TbPersonaddressMail][n_StateId_FK]" id="n_StateId_FK" value={stateFK} disabled={props.mainState.isBind} />
          </FormGroup>
        </Col>
        <Col md="1" className="p-1">
          <FormGroup className="m-0">
            <Label id='s_HouseDirection2' className="mb-0">Direction</Label>
            <Input type="select" bsSize="sm" name="data[TbPersonaddressMail][s_HouseDirection2]" value={direction2} onChange={(e)=>setdirection2(e.target.value)} disabled={props.mainState.isBind}>
              <option key="" value="">Select</option>
              {props.baseData != null?props.baseData.HOMEADDRESSDIRECTION.map((comp, i) => {
                return (
                  <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
                );
              }):null}
            </Input>
          </FormGroup>
        </Col>
        <Col md="2" className="p-1">
          <FormGroup className="m-0">
            <Label id='n_CountyId_FKName' className="mb-0">County</Label>
            <Input type="text" bsSize="sm" name="n_CountyId_FKName1" id="n_CountyId_FKName1" placeholder="County" value={county} readOnly disabled={props.mainState.isBind}/>
            <Input type="hidden" name="data[TbPersonaddressMail][n_CountyId_FK]" id="n_CountyId_FK" value={countyFK} disabled={props.mainState.isBind} />
            <Input type="hidden" name="data[TbPersonaddressMail][n_CountryId_FK]" id="n_CountryId_FK" value={countryFK} disabled={props.mainState.isBind} />
          </FormGroup>
        </Col>
      </Row>
      <Modal isOpen={isModalOpen} className={'modal-sm'}>
        <ModalHeader className="p-2 mt-3">Select City</ModalHeader>
        <ModalBody>
          {multipleCity}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  baseData: state.QuoteEntry.baseData,
});

export default connect(mapStateToProps)(MaillingAddr);