import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AppSwitch } from '@coreui/react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toastAction } from '../../../store/actions/toast-actions';
import * as QuoteEntryService from '../../../services/quoteEntryService';
import ZipDetailsView from '../Common/ZipDetailsView';
import { TextMask, InputAdapter } from 'react-text-mask-hoc';
import Moment from 'moment';
import { validateFields, onInputChange } from '../Common/QuoteValidation';

import {
  Col,
  Row,
  Input,
  InputGroup,
  FormGroup, Label,
  Modal, ModalBody, ModalHeader
} from 'reactstrap';

const ApplicantInfo = props => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nameOfDec, setNameOfDec] = useState('');
  const [dob, setDob] = useState('');
  const [occupation, setOccupation] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [streetName, setStreetName] = useState('');
  const [countyName, setCountName] = useState('');
  const [countyFK, setCountyFK] = useState('');
  const [countryFK, setCountryFK] = useState('');
  const [stateName, setStateName] = useState('');
  const [stateFK, setStateFK] = useState('');
  const [cityName, setCityName] = useState('');
  const [cityFK, setCityFK] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [zipCodePK, setZipCodePK] = useState('');
  const [copyMaillingAddr, setCopyMaillingAddr] = useState(true);
  const [isModalOpen, setToggleModal] = useState(false);
  const [multipleCity, setMultiplecity] = useState('');
  const [isSetSavedData, setSavedData] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [territory, setTerritory] = useState('');
  const [windTerritory, setWindTerritory] = useState('');
  const [isZipValid, setIsZipValid] = useState(false);

  useEffect(() => {
    if (props.quoteSavedData != null && !isSetSavedData) {
      selAllSavedData();
    }
  });

  const selAllSavedData = () => {
    var applicantData = props.quoteSavedData.applicantData;
    setFirstName(applicantData.getPersonData.s_FirstName || '');
    setMiddleName(applicantData.getPersonData.s_MiddleName || '');
    setLastName(applicantData.getPersonData.s_LastOrganizationName || '');
    var birthDate = '';
    if (applicantData.getPersonData.d_BirthDate != '' && applicantData.getPersonData.d_BirthDate != null && applicantData.getPersonData.d_BirthDate != '0000-00-00') {
      birthDate = new Date(Moment(applicantData.getPersonData.d_BirthDate))
    }
    setDob(birthDate);
    setOccupation(applicantData.getPersonData.s_OccupationDesc || '');
    setHouseNo(applicantData.getLocationAddr.s_HouseNo || '')
    setStreetName(applicantData.getLocationAddr.s_StreetName || '')
    setCountName(applicantData.getLocationAddr.s_CountyName || '')
    setCountyFK(applicantData.getLocationAddr.n_CountyId_FK || '')
    setCountryFK(applicantData.getLocationAddr.n_CountryId_FK || '')
    setStateName(applicantData.getLocationAddr.s_StateName || '')
    setStateFK(applicantData.getLocationAddr.n_StateId_FK || '')
    setCityName(applicantData.getLocationAddr.s_CityName || '')
    setCityFK(applicantData.getLocationAddr.n_CityId_FK || '')
    setZipCode(applicantData.getLocationAddr.s_PostalCode || '')
    setZipCodePK(applicantData.getLocationAddr.n_Zipcodes_FK || '')
    setEmail(applicantData.getEmailData[0].s_EmailAddress || '');
    setPhone(applicantData.getPhoneData[0].s_PhoneNumber || '');
    setTerritory(props.quoteSavedData.getPoRiskAddiData.s_PremiuimGroup || '');
    setWindTerritory(props.quoteSavedData.getPoRiskAddiData.s_TerritoryCode || '');
    setSavedData(true);
    if (applicantData.getPersonData.s_IsMailAddDiff == 'Yes') {
      setCopyMaillingAddr(false);
    }
    // Set Name Of Dec
    var nod = applicantData.getPersonData.s_FirstName;
    if (applicantData.getPersonData.s_MiddleName != '') {
      nod = nod + ' ' + applicantData.getPersonData.s_MiddleName;
    }
    nod = nod + ' ' + applicantData.getPersonData.s_LastOrganizationName;
    setNameOfDec(nod);
  }

  const getNameOfDec = () => {
    var nod = firstName;
    if (middleName != '') {
      nod = nod + ' ' + middleName;
    }
    nod = nod + ' ' + lastName;
    setNameOfDec(nod);
  }

  const getDataFromZip = (zipCodeVal) => {
    if (houseNo == '') {
      toastAction(false, 'Please Enter House Number!');
      setZipCode('')
      return false;
    }
    if (streetName == '') {
      toastAction(false, 'Please Enter Street Name!');
      setZipCode('')
      return false;
    }
    props.dispatch(QuoteEntryService.getZipDetails(props.mainState.product, zipCodeVal, 'APPLICANT'))
      .then((res) => {
        if (res.status == 'N') {
          toastAction(false, res.errorMsg);
          setZipCode('')
          setIsZipValid(false)
          return false;
        } else {
          setIsZipValid(true)
          if (res.count > 1) {
            showMultipleCityModal(res.zipData);
          } else {
            setZipDetailsData(res.zipData[0]);
          }
        }
      });
  }

  const showMultipleCityModal = (zipData) => {
    setMultiplecity(<ZipDetailsView zipData={zipData} setZipDetailsData={setZipDetailsData} />)
    setToggleModal(true);
  }

  const setZipDetailsData = (zipData) => {
    setCountName(zipData.s_ZipCounty.toUpperCase())
    setCountyFK(zipData.n_CountyId_FK)
    setStateName(zipData.s_StateCode.toUpperCase())
    setStateFK(zipData.n_StateId_PK)
    setCityName(zipData.s_CityName.toUpperCase())
    setCityFK(zipData.n_CityId_PK)
    setCountryFK(zipData.n_CountryId_FK)
    setZipCodePK(zipData.n_Zipcodes_PK);
    setToggleModal(false);
  }

  const showMaillingAddrCard = (val) => {
    setCopyMaillingAddr(val);
    props.showMaillingAddr(val);
  }

  return (
    <React.Fragment>
      <Row className="p-0 m-0">
        <Col md="2" className='p-1'>
            <Label htmlFor="name" className="mb-0">First Name</Label>
            <Input type="text" bsSize="sm" name="data[TbPersoninfo][s_FirstName]" id="s_FirstName" placeholder="Enter First Name" value={firstName} onChange={(e) => setFirstName(e.target.value.toUpperCase())} onInput={(e) => onInputChange(e)} disabled={props.mainState.isBind} />
        </Col>
        <Col md="2" className='p-1'>
            <Label id='s_MiddleName' className="mb-0">Middle Name</Label>
            <Input type="text" bsSize="sm" className="text-upper" name="data[TbPersoninfo][s_MiddleName]" id="s_MiddleName" placeholder="Enter Middle Name" value={middleName} onChange={(e) => setMiddleName(e.target.value.toUpperCase())} disabled={props.mainState.isBind} />
        </Col>
        <Col md="2" className='p-1'>
            <Label id='s_LastOrganizationName' className="mb-0">Last Name</Label>
            <Input type="text" bsSize="sm" name="data[TbPersoninfo][s_LastOrganizationName]" id="s_LastOrganizationName" placeholder="Enter Last Name" value={lastName} onChange={(e) => setLastName(e.target.value.toUpperCase())} onBlur={() => getNameOfDec()} onInput={(e) => onInputChange(e)} disabled={props.mainState.isBind} />
        </Col>
        <Col md="2" className='p-1'>
            <Label id='s_FullLegalName' className="mb-0">Name(s) on Dec</Label>
            <Input type="text" bsSize="sm" name="data[TbPersoninfo][s_FullLegalName]" id="s_FullLegalName" placeholder="Enter Name(s) on Dec" value={nameOfDec} readOnly disabled={props.mainState.isBind} />
        </Col>
        <Col md="1" className='p-1'>
            <InputGroup className="input-prepend">
              <Label id='d_BirthDate' className="mb-0"><i className="cui-calendar"></i>&nbsp;DOB</Label>
            </InputGroup>
            <DatePicker
              customInput={
                <TextMask mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]} Component={InputAdapter}
                />
              }
              className="form-control form-control-sm" id="d_BirthDate" name="data[TbPersoninfo][d_BirthDate]" placeholderText="MM/DD/YYYY" selected={dob} onChange={(date) => setDob(date)} disabled={props.mainState.isBind}
            />
        </Col>
        <Col md="2" className='p-1'>
            <Label id='s_OccupationDes' className="mb-0">Occupation</Label>
            <Input type="text" bsSize="sm" name="data[TbPersoninfo][s_OccupationDesc]" id="s_OccupationDes" placeholder="Occupation" value={occupation} onChange={(e) => setOccupation(e.target.value.toUpperCase())} disabled={props.mainState.isBind} />
        </Col>
      </Row>
      <Row className="p-0 m-0">
        <Col md="1" className='p-1'>
            <InputGroup className="input-prepend">
              <Label id='s_HouseNo' className="mb-0">House No.</Label>
            </InputGroup>
            <Input type="text" bsSize="sm" name="data[TbPersonaddress][s_HouseNo]" id="s_HouseNo" placeholder="House No" value={houseNo} onChange={(e) => setHouseNo(e.target.value)} onInput={(e) => onInputChange(e)} disabled={props.mainState.isBind} />
        </Col>
        <Col md="2" className='p-1'>
            <Label id='s_StreetName' className="mb-0">Street Name</Label>
            <Input type="text" bsSize="sm" name="data[TbPersonaddress][s_StreetName]" id="s_StreetName" placeholder="Enter Street Name" value={streetName} onChange={(e) => setStreetName(e.target.value.toUpperCase())} disabled={props.mainState.isBind} />
        </Col>
        <Col md="1" className='p-1'>          
            <Label id='EffectiveTo' className="mb-0">Zip</Label>
            <Input type="text" bsSize="sm" name="data[TbPersonaddress][s_PostalCode]" id="s_PostalCode" placeholder="Enter Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} onBlur={(e) => getDataFromZip(e.target.value)} onInput={(e) => onInputChange(e)} disabled={props.mainState.isBind} valid={isZipValid} />
            <Input type="hidden" name="data[TbPersonaddress][n_Zipcodes_PK]" id="n_Zipcodes_PK" value={zipCodePK} disabled={props.mainState.isBind} />
        </Col>
        <Col md="2" className='p-1'>          
            <Label id='EffectiveTo' className="mb-0">County</Label>
            <Input type="text" bsSize="sm" name="n_CountyId_FKName" id="n_CountyId_FKName" placeholder="County" value={countyName} readOnly disabled={props.mainState.isBind} />
            <Input type="hidden" name="data[TbPersonaddress][n_CountyId_FK]" id="n_CountyId_FK" value={countyFK} disabled={props.mainState.isBind} />
            <Input type="hidden" name="data[TbPersonaddress][n_CountryId_FK]" id="n_CountryId_FK" value={countryFK} disabled={props.mainState.isBind} />
        </Col>
        <Col md="1" className='p-1'>
            <Label id='EffectiveTo' className="mb-0">State</Label>
            <Input type="text" bsSize="sm" name="n_StateId_FKName" id="n_StateId_FKName" placeholder="Enter State" value={stateName} readOnly disabled={props.mainState.isBind} />
            <Input type="hidden" name="data[TbPersonaddress][n_StateId_FK]" id="n_StateId_FK" value={stateFK} disabled={props.mainState.isBind} />
        </Col>
        <Col md="2" className='p-1'>
            <Label id='EffectiveTo' className="mb-0">City</Label>
            <Input type="text" bsSize="sm" name="n_CityId_FKName" id="n_CityId_FKName" placeholder="Enter City" value={cityName} readOnly disabled={props.mainState.isBind} />
            <Input type="hidden" name="data[TbPersonaddress][n_CityId_FK]" id="n_CityId_FK" value={cityFK} disabled={props.mainState.isBind} />
        </Col>
        <Col md="2" className='p-1'>
            <InputGroup className="input-prepend">
              <Label className="mb-0"><i className="cui-envelope-closed"></i>&nbsp;Email Address</Label>
            </InputGroup>
            <Input type="email" bsSize="sm" id="s_EmailAddress" name="data[TbEmailinfo][s_EmailAddress]" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={(e) => validateFields(e)} disabled={props.mainState.isBind} />
        </Col>
        <Col md="1" className='p-1'>
            <InputGroup className="input-prepend">
              <Label className="mb-0"><i className="fa fa-phone"></i>&nbsp;Phone No.</Label>
            </InputGroup>
            <TextMask
              mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              Component={InputAdapter}
              className="form-control form-control-sm"
              type="text"
              id="s_PhoneNumber"
              name="data[TbPhoneinfo][s_PhoneNumber]"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={(e) => validateFields(e)}
              disabled={props.mainState.isBind}
            />
        </Col>
      </Row>
      <Row className="p-0 m-0">
        <Col md="2" className='p-1'>          
            <InputGroup className="input-prepend">
              <Label className="mb-0">Territory</Label>
            </InputGroup>
            <Input type="text" bsSize="sm" id="Propertyzone" name="Propertyzone" placeholder="Territory" value={territory} onChange={(e) => setTerritory(e.target.value)} onInput={(e) => onInputChange(e)} disabled={props.mainState.isBind} />          
        </Col>
        <Col md="2" className='p-1'>
            <InputGroup className="input-prepend">
              <Label className="mb-0">Wind Territory</Label>
            </InputGroup>
            <Input type="text" bsSize="sm" id="s_TerritoryCode" name="data[TbPoriskadditionalinfo][s_TerritoryCode]" placeholder="Wind Territory" value={windTerritory} onChange={(e) => setWindTerritory(e.target.value)} disabled={props.mainState.isBind} />
        </Col>
      </Row>
      <Row className="p-0 m-0">
        <Col md="3" className='mt-0'>
          <FormGroup className="m-0">
            <Label id='mailingaddress' className=""><b>Copy as mailing Address</b></Label><br />
            <AppSwitch className="react-switch" size="sm" variant={'pill'} color={'success'} name="data[TbPersoninfo][s_IsMailAddDiff]" checked={copyMaillingAddr} onChange={(e) => showMaillingAddrCard(e.target.checked)} value={copyMaillingAddr ? 'No' : 'Yes'} disabled={props.mainState.isBind} />
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

ApplicantInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  baseData: state.QuoteEntry.baseData,
});

export default connect(mapStateToProps)(ApplicantInfo);
