import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppSwitch } from '@coreui/react';
import { validateYearBuild, onInputChange } from '../Common/QuoteValidation';
import CreateTooltips from '../../../utilities/CreateTooltips.js';

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
  const [noOfResidents, setNoOfResidents] = useState('');
  const [areaSqft, setAreaSqft] = useState('');
  const [noOfStories, setNoOfStories] = useState('');
  const [protection, setProtection] = useState('');
  const [bceg, setBceg] = useState('');
  const [noOfUnits, setNoOfUnits] = useState('');
  const [yearBuild, setYearBuild] = useState('');
  const [constructType, setConstructType] = useState('');
  const [roofType, setRoofType] = useState('');
  const [dtw, setDTW] = useState('');
  const [dtfs, setDTFS] = useState('');
  const [dth, setDTH] = useState('');
  const [occupancyType, setOccupancyType] = useState('');
  const [isPriorAddr, setIsPriorAddr] = useState(false);
  const [isSetSavedData, setIsSetSavedData] = useState(false);


  useEffect(()=>{
    if(props.quoteSavedData != null && !isSetSavedData){
      setAllSavedData();
    }
  });

  const setAllSavedData  = () => {
    var propertyData = props.quoteSavedData.getPoRiskAddiData;
    setRcv(propertyData.n_ReplacementCost||'');
    setStrucType(propertyData.s_StructureTypeCode||'');
    setNoOfResidents(propertyData.n_NoOfResidents||'');
    setAreaSqft(propertyData.n_HomeSqft||'');
    setNoOfStories(propertyData.n_NoOfStories||'');
    setProtection(propertyData.s_ProtectionClass||'');
    setBceg(propertyData.s_BCEGCode||'');
    setNoOfUnits(propertyData.n_NoOfFamilies||'');
    setYearBuild(propertyData.n_YearBuilt||'');
    setConstructType(propertyData.s_ConstrTypeCode||'');
    setRoofType(propertyData.s_RoofTypeCode||'');
    setDTW(propertyData.s_DistanceFromWater||'');
    setDTFS(propertyData.n_DistanceFireStation||'');
    setDTH(propertyData.n_DistanceHydrant||'');
    setOccupancyType(propertyData.s_OccupancyTypeCode||'');
    if(props.quoteSavedData.applicantData.getPersonData.s_IsNewPurchase == 'Yes'){
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
            <Input type="text" bsSize="sm" name="data[TbPoriskadditionalinfo][n_ReplacementCost]" id="n_ReplacementCost" placeholder="" value={rcv} onChange={(e)=>setRcv(e.target.value)} disabled={props.mainState.isBind}/>
            <Button type="" size="sm" color="warning" disabled={props.mainState.isBind}>Get RCV</Button>
            <Input type="hidden" name="val_id" value="" />
          </InputGroup>
        </Col>
        <Col md="2" className="p-1">
          <Label className="mb-0" id='STRUCTYPE'>Structure Type</Label>
          <Input type="select" bsSize="sm" name="data[STRUCTYPE]" id="data[STRUCTYPE]" value={strucType} onChange={(e) => setStrucType(e.target.value)} disabled={props.mainState.isBind}>
            <option key="" value="">Select</option>
            {props.baseData != null?props.baseData.STRUCTYPE.map((comp, i) => {
              return (
                <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
              );
            }):null}
          </Input>
        </Col>
        <Col md="1" className="p-1">
          <InputGroup className="input-prepend">
            <Label className="mb-0" id='n_NoOfResidents'>NoR. {CreateTooltips('n_NoOfResidents', 'No. of Residents')}</Label>
          </InputGroup>
          <Input type="text" bsSize="sm" name="data[TbPoriskadditionalinfo][n_NoOfResidents]" value={noOfResidents} onChange={(e) => setNoOfResidents(e.target.value)} disabled={props.mainState.isBind} />
        </Col>
        <Col md="1" className="p-1">
          <Label className="mb-0" id='n_HomeSqft'>Area SqFt</Label>
          <InputGroup className="input-prepend">
            <Input type="text" bsSize="sm" name="data[TbPoriskadditionalinfo][n_HomeSqft]" value={areaSqft} onChange={(e) => setAreaSqft(e.target.value)} disabled={props.mainState.isBind} />
          </InputGroup>
        </Col>
        <Col md="1" className="p-1">
          <Label className="mb-0" id='n_NoOfStories'>No. of stories</Label>
          <Input type="text" bsSize="sm" name="data[TbPoriskadditionalinfo][n_NoOfStories]" value={noOfStories} onChange={(e) => setNoOfStories(e.target.value)} disabled={props.mainState.isBind} />
        </Col>
        <Col md="1" className="p-1">
          <Label className="mb-0" id='PROTECTIONCLS'>PPC</Label>
          <Input type="select" bsSize="sm" name="data[PROTECTIONCLS]" value={protection} onChange={(e) => setProtection(e.target.value)} disabled={props.mainState.isBind}>
            <option key="" value="">Select</option>
            {props.baseData != null?props.baseData.PROTECTIONCLS.map((comp, i) => {
              return (
                <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
              );
            }):null}
          </Input>
        </Col>
        <Col md="1" className="p-1">
          <Label className="mb-0" id='HOBCEGCODE'>BCEG</Label>
          <Input type="select" bsSize="sm" name="data[HOBCEGCODE]" value={bceg} onChange={(e) => setBceg(e.target.value)} disabled={props.mainState.isBind}>
            <option key="" value="">Select</option>
            {props.baseData != null?props.baseData.HOBCEGCODE.map((comp, i) => {
              return (
                <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
              );
            }):null}
          </Input>
        </Col>
        <Col md="1" className="p-1">
          <Label className="mb-0" id='yearbuilt'>Year Built</Label>
          <Input type="text" bsSize="sm" name="data[yearbuilt]" value={yearBuild} onChange={(e) => setYearBuild(e.target.value)} disabled={props.mainState.isBind} />
        </Col>
        <Col md="2" className="p-1">
          <Label className="mb-0" id='NOOFFAMILY'>No. of Units</Label>
          <Input type="select" bsSize="sm" name="data[NOOFFAMILY]" value={noOfUnits} onChange={(e) => setNoOfUnits(e.target.value)} disabled={props.mainState.isBind}>
            <option key="" value="">Select</option>
            {props.baseData != null?props.baseData.NOOFFAMILY.map((comp, i) => {
              return (
                <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
              );
            }):null}
          </Input>
        </Col>
      </Row>
      <Row className="p-0 m-0">
        <Col md="2" className='p-1'>
          <Label className="mb-0" id='data[CONSTRTYPE]'>Construction Type</Label>
          <Input type="select" bsSize="sm" name="data[CONSTRTYPE]" value={constructType} onChange={(e) => setConstructType(e.target.value)} disabled={props.mainState.isBind}>
            <option key="" value="">Select</option>
            {props.baseData != null?props.baseData.CONSTRTYPE.map((comp, i) => {
              return (
                <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
              );
            }):null}
          </Input>
        </Col>
        <Col md="2" className='p-1'>
          <Label className="mb-0" id='ROOFTYPE'>Roof Type</Label>
          <Input type="select" bsSize="sm" name="data[ROOFTYPE]" value={roofType} onChange={(e) => setRoofType(e.target.value)} disabled={props.mainState.isBind}>
            <option key="" value="">Select</option>
            {props.baseData != null?props.baseData.ROOFTYPE.map((comp, i) => {
              return (
                <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
              );
            }):null}
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
            {props.baseData != null?props.baseData.OCCUPYTYPE.map((comp, i) => {
              return (
                <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
              );
            }):null}
          </Input>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col md="3" >
          <Label className="mb-0"><strong>Is this a new purchase?</strong></Label>&nbsp;&nbsp;&nbsp;
            <AppSwitch size="sm" className={'mt-2'} variant={'pill'} color={'success'} name="data[TbPersoninfo][s_IsNewPurchase]" checked={isPriorAddr} onChange={(e) => showPriorAddr(e.target.checked)} value={isPriorAddr?'Yes':'No'} disabled={props.mainState.isBind}/>
        </Col>
      </Row>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  baseData: state.QuoteEntry.baseData,
});

export default connect(mapStateToProps)(PropertyDetails);