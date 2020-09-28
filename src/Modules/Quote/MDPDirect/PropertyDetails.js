import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppSwitch } from '@coreui/react';
import { validateYearBuild, onInputChange } from '../Common/QuoteValidation';

import {
  Col,
  Row,
  Input,
  InputGroup,
  Label,
  Button
} from 'reactstrap';

const PropertyDetails = props => {
  const [rcv, setRcv] = useState('');
  const [strucType, setStrucType] = useState('');
  const [parkFactor, setParkFactor] = useState('');
  const [areaSqft, setAreaSqft] = useState('');
  const [protection, setProtection] = useState('');
  const [bceg, setBceg] = useState('');
  const [usage, setUsage] = useState('');
  const [yearBuild, setYearBuild] = useState('');
  const [constructType, setConstructType] = useState('');
  const [roofType, setRoofType] = useState('');
  const [dtw, setDTW] = useState('');
  const [dtfs, setDTFS] = useState('');
  const [dth, setDTH] = useState('');
  const [occupancyType, setOccupancyType] = useState('');
  const [mhCredit, setMhCredit] = useState('');
  const [mhLength, setMhLength] = useState('');
  const [mhWidth, setMhWidth] = useState('');
  const [mhDesc, setMhDesc] = useState('');
  const [mhParksub, setMhParksub] = useState('');
  const [mhSerial, setMhSerial] = useState('');
  const [extndCvg, setExtndCvg] = useState('Yes');
  const [vmmCvg, setVmmCvg] = useState('Yes');
  const [priorIns, setPriorIns] = useState('');
  const [isPriorAddr, setIsPriorAddr] = useState(false);
  const [isSetSavedData, setIsSetSavedData] = useState(false);


  useEffect(() => {
    if (props.quoteSavedData != null && !isSetSavedData) {
      setAllSavedData();
    }
  });

  const setAllSavedData = () => {
    var propertyData = props.quoteSavedData.getPoRiskAddiData;
    setRcv(propertyData.n_ReplacementCost||'');
    setStrucType(propertyData.s_StructureTypeCode||'');
    setAreaSqft(propertyData.n_HomeSqft||'');
    setProtection(propertyData.s_ProtectionClass||'');
    setBceg(propertyData.s_BCEGCode||'');
    setUsage(propertyData.s_UsageTypeCode||'');
    setYearBuild(propertyData.n_YearBuilt||'');
    setConstructType(propertyData.s_ConstrTypeCode||'');
    setRoofType(propertyData.s_RoofTypeCode||'');
    setDTW(propertyData.s_DistanceFromWater||'');
    setDTFS(propertyData.n_DistanceFireStation||'');
    setDTH(propertyData.n_DistanceHydrant||'');
    setOccupancyType(propertyData.s_OccupancyTypeCode||'');
    setParkFactor(propertyData.s_MhParkFactor||'');
    setMhCredit(propertyData.s_MhANSICredit||'');
    setMhLength(propertyData.n_MHLength||'');
    setMhWidth(propertyData.n_MHWidth||'');
    setMhDesc(propertyData.s_MHManfDesc||'');
    setMhParksub(propertyData.s_MhparkSub||'');
    setMhSerial(propertyData.s_MhSerNo||'');
    setExtndCvg(props.quoteSavedData.policyData.s_ExtendedCoverage||'');
    setVmmCvg(props.quoteSavedData.policyData.s_VmmCoverage||'');
    setPriorIns(propertyData.s_PriorPolicyCarrier||'');
    if (props.quoteSavedData.applicantData.getPersonData.s_IsNewPurchase == 'Yes') {
      setIsPriorAddr(true);
    }
    setIsSetSavedData(true);
  }

  const showPriorAddr = (val) => {
    setIsPriorAddr(val);
    props.showPriorAddr(val);
  }

  return (
    <React.Fragment>
      <Row className="p-0 m-0">
        <Col md="2" className="p-1">
          <Label className="mb-0" id='n_ReplacementCost'>ISO RCV</Label>
          <InputGroup className="input-prepend">
            <Input type="text" bsSize="sm" name="data[TbPoriskadditionalinfo][n_ReplacementCost]" id="n_ReplacementCost" placeholder="" value={rcv} onChange={(e) => setRcv(e.target.value)} disabled={props.mainState.isBind} />
            <Button type="" size="sm" color="warning" disabled={props.mainState.isBind}>Get RCV</Button>
            <Input type="hidden" name="val_id" value="" />
          </InputGroup>
        </Col>
        <Col md="2" className="p-1">
          <Label className="mb-0" id='STRUCTYPE'>Structure Type</Label>
          <Input type="select" bsSize="sm" name="data[STRUCTYPE]" id="data[STRUCTYPE]" value={strucType} onChange={(e) => setStrucType(e.target.value)} disabled={props.mainState.isBind}>
            <option key="" value="">Select</option>
            {props.baseData != null ? props.baseData.STRUCTYPE.map((comp, i) => {
              return (
                <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
              );
            }) : null}
          </Input>
        </Col>
        <Col md="2" className="p-1">
          <Label className="mb-0" id='MHPARKTYPE'>Park Factor</Label>
          <Input type="select" bsSize="sm" name="data[MHPARKTYPE]" value={parkFactor} onChange={(e) => setParkFactor(e.target.value)} disabled={props.mainState.isBind}>
            <option key="" value="">Select</option>
            {props.baseData != null ? props.baseData.MHPARKTYPE.map((comp, i) => {
              return (
                <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
              );
            }) : null}
          </Input>
        </Col>
        <Col md="1" className="p-1">
          <Label className="mb-0" id='n_HomeSqft'>Area SqFt</Label>
          <InputGroup className="input-prepend">
            <Input type="text" bsSize="sm" name="data[TbPoriskadditionalinfo][n_HomeSqft]" value={areaSqft} onChange={(e) => setAreaSqft(e.target.value)} disabled={props.mainState.isBind} />
          </InputGroup>
        </Col>
        <Col md="1" className="p-1">
          <Label className="mb-0" id='PROTECTIONCLS'>PPC</Label>
          <Input type="select" bsSize="sm" name="data[PROTECTIONCLS]" value={protection} onChange={(e) => setProtection(e.target.value)} onInput={(e) => onInputChange(e)} disabled={props.mainState.isBind}>
            <option key="" value="">Select</option>
            {props.baseData != null ? props.baseData.PROTECTIONCLS.map((comp, i) => {
              return (
                <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
              );
            }) : null}
          </Input>
        </Col>
        <Col md="1" className="p-1">
          <Label className="mb-0" id='HOBCEGCODE'>BCEG</Label>
          <Input type="select" bsSize="sm" name="data[HOBCEGCODE]" value={bceg} onChange={(e) => setBceg(e.target.value)} onInput={(e) => onInputChange(e)} disabled={props.mainState.isBind}>
            <option key="" value="">Select</option>
            {props.baseData != null ? props.baseData.HOBCEGCODE.map((comp, i) => {
              return (
                <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
              );
            }) : null}
          </Input>
        </Col>
        <Col md="1" className="p-1">
          <Label className="mb-0" id='yearbuilt'>Year Built</Label>
          <Input type="text" bsSize="sm" name="data[yearbuilt]" value={yearBuild} onChange={(e) => setYearBuild(e.target.value)} onBlur={(e) => validateYearBuild(e)} onInput={(e) => onInputChange(e)} disabled={props.mainState.isBind} />
        </Col>
        <Col md="2" className="p-1">
          <Label className="mb-0" id='s_UsageTypeCode'>Usage</Label>
          <Input type="select" bsSize="sm" name="data[HOUSAGETYPE]" value={usage} onChange={(e) => setUsage(e.target.value)} disabled={props.mainState.isBind}>
            <option key="" value="">Select</option>
            {props.baseData != null ? props.baseData.HOUSAGETYPE.map((comp, i) => {
              return (
                <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
              );
            }) : null}
          </Input>
        </Col>
      </Row>
      <Row className="p-0 m-0">
        <Col md="2" className='p-1'>
          <Label className="mb-0" id='data[CONSTRTYPE]'>Construction Type</Label>
          <Input type="select" bsSize="sm" name="data[CONSTRTYPE]" value={constructType} onChange={(e) => setConstructType(e.target.value)} onInput={(e) => onInputChange(e)} disabled={props.mainState.isBind}>
            <option key="" value="">Select</option>
            {props.baseData != null ? props.baseData.CONSTRTYPE.map((comp, i) => {
              return (
                <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
              );
            }) : null}
          </Input>
        </Col>
        <Col md="2" className='p-1'>
          <Label className="mb-0" id='ROOFTYPE'>Roof Type</Label>
          <Input type="select" bsSize="sm" name="data[ROOFTYPE]" value={roofType} onChange={(e) => setRoofType(e.target.value)} disabled={props.mainState.isBind}>
            <option key="" value="">Select</option>
            {props.baseData != null ? props.baseData.ROOFTYPE.map((comp, i) => {
              return (
                <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
              );
            }) : null}
          </Input>
        </Col>
        <Col md="2" className='p-1'>
          <Label className="mb-0" id='DistanceFromWate'>Distance To Water (miles)</Label>
          <Input type="text" bsSize="sm" name="data[TbPoriskadditionalinfo][s_DistanceFromWater]" value={dtw} onChange={(e) => setDTW(e.target.value)} disabled={props.mainState.isBind} />
        </Col>
        <Col md="2" className='p-1'>
          <Label className="mb-0" id='n_DistanceFireStation'>Distance To Fire Stn (miles)</Label>
          <Input type="text" bsSize="sm" name="data[TbPoriskadditionalinfo][n_DistanceFireStation]" value={dtfs} onChange={(e) => setDTFS(e.target.value)} disabled={props.mainState.isBind} />
        </Col>
        <Col md="2" className='p-1'>
          <Label className="mb-0" id='n_DistanceHydrant'>Distance To Hydrant (feet)</Label>
          <Input type="text" bsSize="sm" name="data[TbPoriskadditionalinfo][n_DistanceHydrant]" value={dth} onChange={(e) => setDTH(e.target.value)} disabled={props.mainState.isBind} />
        </Col>
        <Col md="2" className="p-1">
          <Label className="mb-0" id='data[OCCUPYTYPE]'>Occupancy Type</Label>
          <Input type="select" bsSize="sm" name="data[OCCUPYTYPE]" value={occupancyType} onChange={(e) => setOccupancyType(e.target.value)} disabled={props.mainState.isBind}>
            <option key="" value="">Select</option>
            {props.baseData != null ? props.baseData.OCCUPYTYPE.map((comp, i) => {
              return (
                <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
              );
            }) : null}
          </Input>
        </Col>
      </Row>
      <Row className="p-0 m-0">
        <Col md="2" className='p-1'>
          <Label className="mb-0" id='data[s_MhANSICredit]'>Mhansi Credit</Label>
          <Input type="select" bsSize="sm" name="data[TbPoriskadditionalinfo][s_MhANSICredit]" value={mhCredit} onChange={(e) => setMhCredit(e.target.value)} disabled={props.mainState.isBind}>
            <option key="" value="">Select</option>
            {props.baseData != null ? props.baseData.MhansiCredit.map((val, i) => {
              return (
                <option key={i} value={val.value}>{val.label}</option>
              );
            }) : null}
          </Input>
        </Col>
        <Col md="2" className='p-1'>
          <Label className="mb-0" id='n_DistanceHydrant'>Mh Length</Label>
          <Input type="text" bsSize="sm" name="data[TbPoriskadditionalinfo][n_MHLength]" value={mhLength} onChange={(e) => setMhLength(e.target.value)} disabled={props.mainState.isBind} />
        </Col>
        <Col md="2" className='p-1'>
          <Label className="mb-0" id='n_DistanceHydrant'>Mh Width</Label>
          <Input type="text" bsSize="sm" name="data[TbPoriskadditionalinfo][n_MHWidth]" value={mhWidth} onChange={(e) => setMhWidth(e.target.value)} disabled={props.mainState.isBind} />
        </Col>
        <Col md="2" className='p-1'>
          <Label className="mb-0" id='n_DistanceHydrant'>Mh Manf description</Label>
          <Input type="text" bsSize="sm" name="data[TbPoriskadditionalinfo][s_MHManfDesc]" value={mhDesc} onChange={(e) => setMhDesc(e.target.value)} disabled={props.mainState.isBind} />
        </Col>
        <Col md="2" className='p-1'>
          <Label className="mb-0" id='n_DistanceHydrant'>Mh Parksub</Label>
          <Input type="text" bsSize="sm" name="data[TbPoriskadditionalinfo][s_MhparkSub]" value={mhParksub} onChange={(e) => setMhParksub(e.target.value)} disabled={props.mainState.isBind} />
        </Col>
        <Col md="2" className='p-1'>
          <Label className="mb-0" id='n_DistanceHydrant'>Mh Serial#</Label>
          <Input type="text" bsSize="sm" name="data[TbPoriskadditionalinfo][s_MhSerNo]" value={mhSerial} onChange={(e) => setMhSerial(e.target.value)} disabled={props.mainState.isBind} />
        </Col>
      </Row>
      <Row className="p-0 m-0">
        <Col md="2" className='p-1'>
          <Label className="mb-0" id='data[s_ExtendedCoverage]'>Extended Coverage</Label>
          <Input type="select" bsSize="sm" name="data[s_ExtendedCoverage]" value={extndCvg} onChange={(e) => setExtndCvg(e.target.value)} disabled={props.mainState.isBind}>
            <option key="" value="">Select</option>
            {props.baseData != null ? props.baseData.MhansiCredit.map((val, i) => {
              return (
                <option key={i} value={val.value}>{val.label}</option>
              );
            }) : null}
          </Input>
        </Col>
        <Col md="2" className='p-1'>
          <Label className="mb-0" id='data[s_VmmCoverage]'>Vmm Coverage</Label>
          <Input type="select" bsSize="sm" name="data[s_VmmCoverage]" value={vmmCvg} onChange={(e) => setVmmCvg(e.target.value)} disabled={props.mainState.isBind}>
            <option key="" value="">Select</option>
            {props.baseData != null ? props.baseData.MhansiCredit.map((val, i) => {
              return (
                <option key={i} value={val.value}>{val.label}</option>
              );
            }) : null}
          </Input>
        </Col>
        <Col md="2" className='p-1'>
          <Label className="mb-0">Prior Insurance</Label>
          <Input type="select" bsSize="sm" name="data[TbPoriskadditionalinfo][s_PriorPolicyCarrier]" value={priorIns} onChange={(e) => setPriorIns(e.target.value)} disabled={props.mainState.isBind}>
            <option key="" value="">Select</option>
            {props.baseData != null ? props.baseData.PRIORINSURANCE.map((comp, i) => {
              return (
                <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
              );
            }) : null}
          </Input>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col md="3" >
          <Label className="mb-0"><strong>Is this a new purchase?</strong></Label>&nbsp;&nbsp;&nbsp;
            <AppSwitch size="sm" className={'mt-2'} variant={'pill'} color={'success'} name="data[TbPersoninfo][s_IsNewPurchase]" checked={isPriorAddr} onChange={(e) => showPriorAddr(e.target.checked)} value={isPriorAddr ? 'Yes' : 'No'} disabled={props.mainState.isBind} />
        </Col>
      </Row>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  baseData: state.QuoteEntry.baseData,
});

export default connect(mapStateToProps)(PropertyDetails);