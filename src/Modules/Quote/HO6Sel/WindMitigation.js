import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Input,
  Label,
} from 'reactstrap';

const WindMitigation = props => {
  const [isSetData, isSetDataFun] = useState(false);
  const [roofCover, setRoofcover] = useState('');
  const [roofDeck, setRoofDeck] = useState('');
  const [roofWall, setRoofWall] = useState('');
  const [roofShape, setRoofShape] = useState('');
  const [openProt, setOpenProt] = useState('');
  const [secWater, setSecWater] = useState('');
  const [terrain, setTerrain] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [isSetSavedData, setIsSetSavedData] = useState(false);
  const [wbdr, setWbdr] = useState('');
  const [roofDeckCode, setRoofDeckCode] = useState('');

  const setAllData = () => {
    setRoofcover('NONFBC');
    setRoofDeck('LEVELA');
    setRoofWall('TOENAIL');
    setRoofShape('GABLE');
    setOpenProt('OTHER');
    setSecWater('NONE');
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
    var windMitigationData = props.quoteSavedData.getPoRiskAddiData;
    setRoofcover(windMitigationData.s_roofcovercode);
    setRoofDeck(windMitigationData.s_roofdeckattachcode);
    setRoofWall(windMitigationData.s_roof_wallconnectcode);
    setRoofShape(windMitigationData.s_RoofShapeCode);
    setOpenProt(windMitigationData.s_windowprotectcode);
    setSecWater(windMitigationData.s_secwaterresistcode);
    setTerrain(windMitigationData.s_terrainexposurecode);
    setWindSpeed(windMitigationData.s_FBCwindspeedcode);
    setWbdr(windMitigationData.s_WBDRcode||'');
    setRoofDeckCode(windMitigationData.s_roofdeckcode||'');
    setIsSetSavedData(true);
  }

  return (
    <Card className="mb-0">
      <CardHeader className="p-1">
        <strong>Wind Mitigation Credits</strong>
      </CardHeader>
      <CardBody>
        <Row className="p-0 m-0">
          <Col md="3">

            <Label id='HOROOFCOVER' className="mb-0">Roof Cover(FBC)</Label>
            <Input type="select" bsSize="sm" className="pull-left" name="data[TbPoriskadditionalinfo][s_roofcovercode]" value={roofCover} onChange={(e)=>setRoofcover(e.target.value)} disabled={props.mainState.isBind}>
              <option value="">--Select--</option>
              {props.baseData != null?props.baseData.HOROOFCOVER.map((comp, i) => {
                return (
                  <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
                );
              }):null}
            </Input>

          </Col>
          <Col md="3">

            <Label id='HOROOFDECKATT' className="mb-0">Roof Deck Attachment</Label>
            <Input type="select" bsSize="sm" name="data[TbPoriskadditionalinfo][s_roofdeckattachcode]" value={roofDeck} onChange={(e)=>setRoofDeck(e.target.value)} disabled={props.mainState.isBind}>
              <option value="">--Select--</option>
              {props.baseData != null?props.baseData.HOROOFDECKATT.map((comp, i) => {
                return (
                  <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
                );
              }):null}
            </Input>

          </Col>
          <Col md="3">

            <Label id='HOROOFWALLCONN' className="mb-0">Roof-Wall Connection</Label>
            <Input type="select" bsSize="sm" name="data[TbPoriskadditionalinfo][s_roof_wallconnectcode]"  value={roofWall} onChange={(e)=>setRoofWall(e.target.value)} disabled={props.mainState.isBind}>
              <option value="">--Select--</option>
              {props.baseData != null?props.baseData.HOROOFWALLCONN.map((comp, i) => {
                return (
                  <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
                );
              }):null}
            </Input>

          </Col>
          <Col md="3">

            <Label id='PLROOFSHAPE' className="mb-0">Roof Shape</Label>
            <Input type="select" bsSize="sm" name="data[TbPoriskadditionalinfo][s_RoofShapeCode]"  value={roofShape} onChange={(e)=>setRoofShape(e.target.value)} disabled={props.mainState.isBind}>
              <option value="">--Select--</option>
              {props.baseData != null?props.baseData.PLROOFSHAPE.map((comp, i) => {
                return (
                  <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
                );
              }):null}
            </Input>

          </Col>
        </Row>
        <Row className="p-0 m-0 mt-2">
          <Col md="3">

            <Label id='HOWINDOWPROTECT' className="mb-0">Opening Protection</Label>
            <Input type="select" bsSize="sm" name="data[TbPoriskadditionalinfo][s_windowprotectcode]"  value={openProt} onChange={(e)=>setOpenProt(e.target.value)} disabled={props.mainState.isBind}>
              <option value="">--Select--</option>
              {props.baseData != null?props.baseData.HOWINDOWPROTECT.map((comp, i) => {
                return (
                  <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
                );
              }):null}
            </Input>

          </Col>
          <Col md="3">

            <Label id='s_secwaterresistcode' className="mb-0">Secondary Water Resistance</Label>
            <Input type="select" bsSize="sm" name="data[TbPoriskadditionalinfo][s_secwaterresistcode]"  value={secWater} onChange={(e)=>setSecWater(e.target.value)} disabled={props.mainState.isBind}>
              <option value="">--Select--</option>
              {props.baseData != null?props.baseData.HOWATERRESIST.map((comp, i) => {
                return (
                  <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
                );
              }):null}
            </Input>

          </Col>
          <Col md="3">

            <Label id='s_terrainexposurecode' className="mb-0">Terrain</Label>
            <Input type="select" bsSize="sm" name="data[TbPoriskadditionalinfo][s_terrainexposurecode]"  value={terrain} onChange={(e)=>setTerrain(e.target.value)} disabled={props.mainState.isBind}>
              <option value="">--Select--</option>
              {props.baseData != null?props.baseData.TERRAINDD.map((comp, i) => {
                return (
                  <option key={i} value={comp.value}>{comp.label}</option>
                );
              }):null}
            </Input>

          </Col>
          <Col md="3">

            <Label id='s_terrainexposurecode' className="mb-0">Wind Speed</Label>
            <Input type="select" bsSize="sm" name="data[TbPoriskadditionalinfo][s_FBCwindspeedcode]"  value={windSpeed} onChange={(e)=>setWindSpeed(e.target.value)} disabled={props.mainState.isBind}>
              <option value="">--Select--</option>
              {props.baseData != null?props.baseData.FBCWINDSPEED.map((comp, i) => {
                return (
                  <option key={i} value={comp.value}>{comp.label}</option>
                );
              }):null}
            </Input>

          </Col>
        </Row>
        <Input type="hidden" name="data[TbPoriskadditionalinfo][s_WBDRcode]" value={wbdr} disabled={props.mainState.isBind}/>
        <Input type="hidden" name="data[TbPoriskadditionalinfo][s_WatercraftHPEngine]" value="" disabled={props.mainState.isBind}/>
        <Input type="hidden" name="data[TbPoriskadditionalinfo][s_WatercraftLength]" value="" disabled={props.mainState.isBind}/>
        <Input type="hidden" name="data[TbPoriskadditionalinfo][s_roofdeckcode]" value={roofDeckCode} disabled={props.mainState.isBind}/>
      </CardBody>
    </Card>
  );
}

const mapStateToProps = state => ({
  baseData: state.QuoteEntry.baseData,
});

export default connect(mapStateToProps)(WindMitigation);