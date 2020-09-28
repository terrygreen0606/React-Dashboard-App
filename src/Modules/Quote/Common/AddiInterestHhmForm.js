import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as QuoteEntryService from '../../../services/quoteEntryService';
import ZipDetailsView from './ZipDetailsView';
import { toastAction } from '../../../store/actions/toast-actions';
import SweetAlert from 'react-bootstrap-sweetalert';

import {
  Modal, ModalHeader, ModalBody, Row, Col, Label, Input, Button
} from 'reactstrap';

const AddiInterestHhmForm = props => {
  const [relation, setRelation] = useState('');
  const [houseHoldType, setHouseHoldType] = useState('');
  const [interestType, setIntType] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [direction1, setDirection1] = useState('');
  const [direction2, setDirection2] = useState('');
  const [streetName, setStreetName] = useState('');
  const [type, setType] = useState('');
  const [city, setCity] = useState('');
  const [cityFK, setCityFK] = useState('');
  const [state, setState] = useState('');
  const [stateFK, setStateFK] = useState('');
  const [zip, setZip] = useState('');
  const [zipCodesPK, setZipFK] = useState('');
  const [county, setCounty] = useState('');
  const [countyFK, setCountyFK] = useState('');
  const [countryFK, setCountryFK] = useState('');
  const [isModalOpen, setToggleModal] = useState(false);
  const [multipleCity, setMultiplecity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [personInfoPK, setPersonInfoPK] = useState('');
  const [personAddressPK, setPersonAddressPK] = useState('');
  const [poApplicantPK, setPoApplicant] = useState('');
  const [personRolePK, setPersonRolePK] = useState('');
  const [poAppOtherPartiesPK, setPoAppOtherParties] = useState('');
  const [isSetData, isSetDataFun] = useState(false);

  const setAllData = () => {
    setRelation(props.editData.relation);
    setHouseHoldType(props.editData.houseHoldType);
    setIntType(props.editData.interestType);
    setFirstName(props.editData.firstName);
    setMiddleName(props.editData.middleName);
    setLastName(props.editData.lastName);
    setHouseNo(props.editData.houseNo);
    setDirection1(props.editData.direction1);
    setDirection2(props.editData.direction2);
    setStreetName(props.editData.streetName);
    setType(props.editData.type);
    setCity(props.editData.city);
    setCityFK(props.editData.cityFK);
    setState(props.editData.state);
    setStateFK(props.editData.stateFK);
    setZip(props.editData.zip);
    setZipFK(props.editData.zipCodesPK);
    setCounty(props.editData.county);
    setCountyFK(props.editData.countyFK);
    setCountryFK(props.editData.countryFK);
    setPersonInfoPK(props.editData.personInfoPK);
    setPersonAddressPK(props.editData.personAddressPK);
    setPoApplicant(props.editData.poApplicantPK);
    setPersonRolePK(props.editData.personRolePK);
    setPoAppOtherParties(props.editData.poAppOtherPartiesPK);
    isSetDataFun(true);
  }

  useEffect(() => {
      if (props.editData != null && !isSetData) {
          setAllData();
      }
  });

  const getZipDetails = (zip) => {
    if(zip != ''){
      props.dispatch(QuoteEntryService.getZipDetails(zip))
      .then((res) => {
        if (res.count == 0) {
          toastAction(false, 'Invalid Zip Code!');
          setZip('')
          return false;
        } else {
          if (res.count > 1) {
            showMultipleCityModal(res.zipData);
          } else {
            setZipDetailsData(res.zipData[0]);
          }
        }
      });
    }else{
      toastAction(false, 'Please enter zip code to get city and county!');
      setZip('')
    }
  }

  const showMultipleCityModal = (zipData) => {
    setMultiplecity(<ZipDetailsView zipData={zipData} setZipDetailsData={setZipDetailsData} />)
    setToggleModal(true);
  }

  const setZipDetailsData = (zipData) => {
    setCounty(zipData.s_ZipCounty)
    setCountyFK(zipData.n_CountyId_FK)
    setState(zipData.s_StateCode)
    setStateFK(zipData.n_StateId_PK)
    setCity(zipData.s_CityName)
    setCityFK(zipData.n_CityId_PK)
    setCountryFK(zipData.n_CountryId_FK)
    setZipFK(zipData.n_Zipcodes_PK);
    setToggleModal(false);
  }

  const addData = () => {
    var msg = '';
    if (props.viewFrom == 'HHM') {
      if (relation == '') {
        msg = 'Please select house hold member ralation!\n';
      }
      if (houseHoldType == '') {
        msg += 'Please select house hold relation type!\n';
      }
    } else {
      if (interestType == '') {
        msg = 'Please select house hold member ralation!\n';
      }
    }
    if (firstName == '') {
      msg += 'Please enter first name!\n';
    }
    if (lastName == '') {
      msg += 'Please enter last name!\n';
    }
    if (zip == '') {
      msg += 'Please enter zip code!\n';
    }
    if (msg != '') {
      toastAction(false, msg);
      return false;
    } else {
      const params = {
        relation, houseHoldType, interestType, firstName, middleName, lastName,
        houseNo, direction1, streetName, direction2, type, city, cityFK,
        state, stateFK, county, countyFK, countryFK, zip, zipCodesPK,
        personInfoPK, personAddressPK, poApplicantPK, personRolePK, poAppOtherPartiesPK,
        policyID: props.mainState.policyID, policyNo: props.mainState.policyNo,
        poAppMasterPK: props.mainState.poAppMasterPK, poRiskMasterPK: props.mainState.poRiskMasterPK, poTransPK: props.mainState.poTransPK,
        mode: props.mainState.mode, from: props.viewFrom
      }
      setIsLoading(true)
      props.dispatch(QuoteEntryService.saveAddiInterestHhmData(params))
          .then((res) => {
            const params = {
              relation, houseHoldType, interestType, firstName, middleName, lastName,
              houseNo, direction1, streetName, direction2, type, city, cityFK,
              state, stateFK, county, countyFK, countryFK, zip, zipCodesPK,
              personInfoPK: res.personIdPK, personAddressPK: res.personAddressIdPK, poApplicantPK: res.poAppApplicantPK,
              personRolePK: res.personRolePK, poAppOtherPartiesPK: res.poAppOtherPartiesPK,
            }
          props.createGridObject(params)
          setIsLoading(false)
        });
    }
  }

  var hearding = '';
  var dropdowns = null;
  if (props.viewFrom == 'HHM') {
    hearding = "Member Info";
    dropdowns = (
      <React.Fragment>
        <Col md="4" className="">
          <Label className="mb-0">Relation:</Label>
          <Input type="select" bsSize="sm" value={relation} onChange={(e) => setRelation(e.target.value)} readOnly={isLoading}>
            <option value=''>--Select--</option>
            {props.baseData != null ? props.baseData.RELTOAPPL.map((comp, i) => {
              return (
                <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
              );
            }) : null}
          </Input>
        </Col>
        <Col md="4">
          <Label className="mb-0">Household Type:</Label>
          <Input type="select" bsSize="sm" value={houseHoldType} onChange={(e) => setHouseHoldType(e.target.value)} readOnly={isLoading}>
            <option value=''>--Select--</option>
            {props.baseData != null ? props.baseData.HOUSEHOLDTYPE.map((comp, i) => {
              return (
                <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
              );
            }) : null}
          </Input>
        </Col>
      </React.Fragment>
    );
  }
  if (props.viewFrom == 'ADDIINT') {
    hearding = "Interest Info";
    dropdowns = (
      <React.Fragment>
        <Col md="4" className="">
          <Label className="mb-0">Type:</Label>
          <Input type="select" bsSize="sm" value={interestType} onChange={(e) => setIntType(e.target.value)} readOnly={isLoading}>
            <option>Select</option>
          </Input>
        </Col>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Modal isOpen={props.isModalOpen} style={{ "width": "700px" }}>
        <ModalHeader className="p-2 mt-2" >{hearding}</ModalHeader>
        <ModalBody className="p-2">
          <Row className="mt-2">
            {dropdowns}
          </Row>
          <Row className="mt-2">
            <Col><Label className="mb-0"><strong>Name:</strong></Label></Col>
          </Row>
          <Row className="mt-1">
            <Col md="4">
              <Input type="text" bsSize="sm" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value.toUpperCase())} readOnly={isLoading} />
            </Col>
            <Col md="4">
              <Input type="text" bsSize="sm" placeholder="Middel Name" value={middleName} onChange={(e) => setMiddleName(e.target.value.toUpperCase())} readOnly={isLoading} />
            </Col>
            <Col md="4">
              <Input type="text" bsSize="sm" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value.toUpperCase())} readOnly={isLoading} />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md="12"><Label className="mb-0"><strong>Address:</strong></Label></Col>
          </Row>
          <Row>
            <Col md="3" className="pr-1">
              <Label className="mb-0">House No</Label>
              <Input type="text" bsSize="sm" value={houseNo} onChange={(e) => setHouseNo(e.target.value)} readOnly={isLoading} />
            </Col>
            <Col md="2" className="pl-1 pr-1">
              <Label className="mb-0">Direction</Label>
              <Input type="select" bsSize="sm" value={direction1} onChange={(e) => setDirection1(e.target.value)} readOnly={isLoading} >
                <option key="" value="">Select</option>
                {props.baseData != null ? props.baseData.HOMEADDRESSDIRECTION.map((comp, i) => {
                  return (
                    <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
                  );
                }) : null}
              </Input>
            </Col>
            <Col md="3" className="pl-1 pr-1">
              <Label className="mb-0">Street Name</Label>
              <Input type="text" bsSize="sm" value={streetName} onChange={(e) => setStreetName(e.target.value.toUpperCase())} readOnly={isLoading} />
            </Col>
            <Col md="2" className="pl-1 pr-1">
              <Label className="mb-0">Type</Label>
              <Input type="select" bsSize="sm" value={type} onChange={(e) => setType(e.target.value)} readOnly={isLoading} >
                <option key="" value="">Select</option>
                {props.baseData != null ? props.baseData.HOMEADDRESSTYPE.map((comp, i) => {
                  return (
                    <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
                  );
                }) : null}
              </Input>
            </Col>
            <Col md="2" className="pl-1">
              <Label className="mb-0">Direction</Label>
              <Input type="select" bsSize="sm" value={direction2} onChange={(e) => setDirection2(e.target.value)} readOnly={isLoading} >
                <option key="" value="">Select</option>
                {props.baseData != null ? props.baseData.HOMEADDRESSDIRECTION.map((comp, i) => {
                  return (
                    <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
                  );
                }) : null}
              </Input>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md="3">
              <Label className="mb-0">City</Label>
              <Input type="text" bsSize="sm" value={city} readOnly />
              <Input type="hidden" value={cityFK} />
            </Col>
            <Col md="3">
              <Label className="mb-0">State</Label>
              <Input type="text" bsSize="sm" value={state} readOnly />
              <Input type="hidden" value={stateFK} />
            </Col>
            <Col md="3">
              <Label className="mb-0">Zip</Label>
              <Input type="text" bsSize="sm" value={zip} onChange={(e) => setZip(e.target.value)} onBlur={(e) => getZipDetails(e.target.value)} readOnly={isLoading} />
            </Col>
            <Col md="3">
              <Label className="mb-0">County</Label>
              <Input type="text" bsSize="sm" value={county} readOnly />
              <Input type="hidden" value={countyFK} />
              <Input type="hidden" value={countryFK} />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md="12" className="text-center">
              <Button type="button" size="sm" color="info" onClick={() => addData()} disabled={isLoading}><i className="fa fa-plus"></i>&nbsp;&nbsp;Add</Button>
              &nbsp;&nbsp;
              <Button type="button" size="sm" color="danger" onClick={() => {isSetDataFun(false);props.clearedSetData();}} disabled={isLoading}><i className="fa fa-times"></i>&nbsp;&nbsp;Cancel</Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
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

export default connect(mapStateToProps)(AddiInterestHhmForm);