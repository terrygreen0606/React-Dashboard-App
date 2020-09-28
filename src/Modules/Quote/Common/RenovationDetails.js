import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppSwitch } from '@coreui/react';

import {
  Col,
  Row,
  Table,
  Input
} from 'reactstrap';

const RenovationDetails = props => {
  const [eleAppSwitch, setEleAppSwitch] = useState(false);
  const [heatingAppSwitch, setHeatingAppSwitch] = useState(false);
  const [hotWaterAppSwitch, setHotWaterAppSwitch] = useState(false);
  const [plumbingAppSwitch, setPlumbingAppSwitch] = useState(false);
  const [roofingAppSwitch, setRoofingAppSwitch] = useState(false);
  const [eleSelect, setEleSelect] = useState('');
  const [heatingSelect, setHeatingSelect] = useState('');
  const [hotWaterSelect, setHotWaterSelect] = useState('');
  const [plumbingSelect, setPlumbingSelect] = useState('');
  const [roofingSelect, setRoofingSelect] = useState('');
  const [eleYear, setEleYear] = useState('');
  const [heatingYear, setHeatingYear] = useState('');
  const [hotWaterYear, setHotWaterYear] = useState('');
  const [plumbingYear, setPlumbingYear] = useState('');
  const [roofingYear, setRoofingYear] = useState('');
  const [isSetSavedData, setIsSetSavedData] = useState(false);

  useEffect(() => {
    if (props.quoteSavedData != null && !isSetSavedData) {
      setAllSavedData()
    }
  });

  const setAllSavedData = () => {
    var renovationData = props.quoteSavedData.getRenovationData;
    if (renovationData.getEletricData != null) {
      setEleAppSwitch(true);
      setEleSelect(renovationData.getEletricData.s_RenovationTypeCode);
      setEleYear(renovationData.getEletricData.s_RenovationYear);
    }
    if (renovationData.getHeatData != null) {
      setHeatingAppSwitch(true);
      setHeatingSelect(renovationData.getHeatData.s_RenovationTypeCode);
      setHeatingYear(renovationData.getHeatData.s_RenovationYear);
    }
    if (renovationData.getWaterHeatData != null) {
      setHotWaterAppSwitch(true);
      setHotWaterSelect(renovationData.getWaterHeatData.s_RenovationTypeCode);
      setHotWaterYear(renovationData.getWaterHeatData.s_RenovationYear);
    }
    if (renovationData.getPlumbingData != null) {
      setPlumbingAppSwitch(true);
      setPlumbingSelect(renovationData.getPlumbingData.s_RenovationTypeCode);
      setPlumbingYear(renovationData.getPlumbingData.s_RenovationYear);
    }
    if (renovationData.getRoofData != null) {
      setRoofingAppSwitch(true);
      setRoofingSelect(renovationData.getRoofData.s_RenovationTypeCode);
      setRoofingYear(renovationData.getRoofData.s_RenovationYear);
    }
    setIsSetSavedData(true);
  }

  return (
    <React.Fragment>
      <Row>
        <Col md="6" className="pb-0">
          <Table size="sm" responsive striped className="m-0">
            <thead>
              <tr className="m-0">
                <th></th>
                <th>Renovations</th>
                <th>Type</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><AppSwitch className={'mx-1'} size="sm" variant={'pill'} color={'success'} name="data[TbPoriskrenovationtype][0][s_RenovationCode]" checked={eleAppSwitch} onChange={(e) => setEleAppSwitch(e.target.checked)} value={eleAppSwitch ? 'RVELECTRIC' : ''} disabled={props.mainState.isBind}/></td>
                <td>Electrical</td>
                <td>
                  <Input type="select" bsSize="sm" name="data[TbPoriskrenovationtype][0][s_RenovationTypeCode]" id="TbPoriskrenovationtype0SRenovationTypeCode" value={eleSelect} onChange={(e) => setEleSelect(e.target.value)} disabled={props.mainState.isBind}>
                    <option value=''>--Select--</option>
                    {props.baseData != null ? props.baseData.RENOVTYPE.map((comp, i) => {
                      return (
                        <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
                      );
                    }) : null}
                  </Input>
                </td>
                <td>
                  <Input type="text" bsSize="sm" name="data[TbPoriskrenovationtype][0][s_RenovationYear]" id="s_RenovationYear" style={{ width: "100px" }} value={eleYear} onChange={(e) => setEleYear(e.target.value)} disabled={props.mainState.isBind} />
                </td>
              </tr>
              <tr>
                <td><AppSwitch className={'mx-1'} size="sm" variant={'pill'} color={'success'} name="data[TbPoriskrenovationtype][1][s_RenovationCode]" checked={heatingAppSwitch} onChange={(e) => setHeatingAppSwitch(e.target.checked)} value={heatingAppSwitch ? 'RVHEAT' : ''} disabled={props.mainState.isBind} /></td>
                <td>Heating</td>
                <td>
                  <Input type="select" bsSize="sm" name="data[TbPoriskrenovationtype][1][s_RenovationTypeCode]" id="TbPoriskrenovationtype1SRenovationTypeCode" value={heatingSelect} onChange={(e) => setHeatingSelect(e.target.value)} disabled={props.mainState.isBind}>
                    <option value=''>--Select--</option>
                    {props.baseData != null ? props.baseData.RENOVTYPE.map((comp, i) => {
                      return (
                        <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
                      );
                    }) : null}
                  </Input>
                </td>
                <td>
                  <Input type="text" bsSize="sm" name="data[TbPoriskrenovationtype][1][s_RenovationYear]" id="s_RenovationYear" style={{ width: "100px" }} value={heatingYear} onChange={(e) => setHeatingYear(e.target.value)} disabled={props.mainState.isBind} />
                </td>
              </tr>
              <tr>
                <td><AppSwitch className={'mx-1'} size="sm" variant={'pill'} color={'success'} name="data[TbPoriskrenovationtype][2][s_RenovationCode]" checked={hotWaterAppSwitch} onChange={(e) => setHotWaterAppSwitch(e.target.checked)} value={hotWaterAppSwitch ? 'RVHWHEAT' : ''} disabled={props.mainState.isBind} /></td>
                <td>Hotwater Heat</td>
                <td>
                  <Input type="select" bsSize="sm" name="data[TbPoriskrenovationtype][2][s_RenovationTypeCode]" id="TbPoriskrenovationtype2SRenovationTypeCode" value={hotWaterSelect} onChange={(e) => setHotWaterSelect(e.target.value)} disabled={props.mainState.isBind}>
                    <option value=''>--Select--</option>
                    {props.baseData != null ? props.baseData.RENOVTYPE.map((comp, i) => {
                      return (
                        <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
                      );
                    }) : null}
                  </Input>
                </td>
                <td>
                  <Input type="text" bsSize="sm" name="data[TbPoriskrenovationtype][2][s_RenovationYear]" id="s_RenovationYear" style={{ width: "100px" }} value={hotWaterYear} onChange={(e) => setHotWaterYear(e.target.value)} disabled={props.mainState.isBind} />
                </td>
              </tr>
              <tr>
                <td><AppSwitch className={'mx-1'} size="sm" variant={'pill'} color={'success'} name="data[TbPoriskrenovationtype][3][s_RenovationCode]" checked={plumbingAppSwitch} onChange={(e) => setPlumbingAppSwitch(e.target.checked)} value={plumbingAppSwitch ? 'RVPLUMB' : ''} disabled={props.mainState.isBind} /></td>
                <td>Plumbing</td>
                <td>
                  <Input type="select" bsSize="sm" name="data[TbPoriskrenovationtype][3][s_RenovationTypeCode]" id="data[TbPoriskrenovationtype][3][s_RenovationCode]" value={plumbingSelect} onChange={(e) => setPlumbingSelect(e.target.value)} disabled={props.mainState.isBind}>
                    <option value=''>--Select--</option>
                    {props.baseData != null ? props.baseData.RENOVTYPE.map((comp, i) => {
                      return (
                        <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
                      );
                    }) : null}
                  </Input>
                </td>
                <td>
                  <Input type="text" bsSize="sm" name="data[TbPoriskrenovationtype][3][s_RenovationYear]" id="s_RenovationYear" style={{ width: "100px" }} value={plumbingYear} onChange={(e) => setPlumbingYear(e.target.value)} disabled={props.mainState.isBind} />
                </td>
              </tr>
              <tr>
                <td><AppSwitch className={'mx-1'} size="sm" variant={'pill'} color={'success'} name="data[TbPoriskrenovationtype][4][s_RenovationCode]" checked={roofingAppSwitch} onChange={(e) => setRoofingAppSwitch(e.target.checked)} value={roofingAppSwitch ? 'RVROOF' : ''} disabled={props.mainState.isBind} /></td>
                <td>Roofing</td>
                <td>
                  <Input type="select" bsSize="sm" name="data[TbPoriskrenovationtype][4][s_RenovationTypeCode]" id="TbPoriskrenovationtype4SRenovationTypeCode" value={roofingSelect} onChange={(e) => setRoofingSelect(e.target.value)} disabled={props.mainState.isBind}>
                    <option value=''>--Select--</option>
                    {props.baseData != null ? props.baseData.RENOVTYPE.map((comp, i) => {
                      return (
                        <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
                      );
                    }) : null}
                  </Input>
                </td>
                <td>
                  <Input type="text" bsSize="sm" name="data[TbPoriskrenovationtype][4][s_RenovationYear]" id="s_RenovationYear" style={{ width: "100px" }} value={roofingYear} onChange={(e) => setRoofingYear(e.target.value)} disabled={props.mainState.isBind} />
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  baseData: state.QuoteEntry.baseData,
});

export default connect(mapStateToProps)(RenovationDetails);