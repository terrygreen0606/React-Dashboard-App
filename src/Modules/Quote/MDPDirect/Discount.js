import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppSwitch } from '@coreui/react';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Input,
  InputGroup,
  Label,
  FormGroup
} from 'reactstrap';

const Discount = props => {
  const [fireAlarm, setFireAlarm] = useState(false);
  const [burgAlarm, setBurgAlarm] = useState(false);
  const [autoSprink, setAutoSprink] = useState('');
  const [isSetSavedData, setIsSetSavedData] = useState(false);

  useEffect(()=>{
    if(props.quoteSavedData != null && !isSetSavedData){
      setAllSavedData()
    }
  });

  const setAllSavedData = () => {
    var discountData = props.quoteSavedData.getPoRiskAddiData;
    setFireAlarm(discountData.s_FireAlarmCode == 'CENTRAL'?true:false);
    setBurgAlarm(discountData.s_BurglarAlarmCode == 'CENTRAL'?true:false);
    setAutoSprink(discountData.s_SprinklerCode != null ? discountData.s_SprinklerCode : '');
    setIsSetSavedData(true);
  }

  return (
    <Card className="mb-0">
      <CardBody>
        <Row>
          <Col sm="8"><Label id='HOFIREALARM' className="mb-0">Central Fire Alarm</Label></Col>
          <Col sm="4">
            <AppSwitch className="react-switch"  size="sm" variant={'pill'} color={'success'} name="data[HOFIREALARM]" checked={fireAlarm} value={fireAlarm?'CENTRAL':''} onChange={(e)=>setFireAlarm(e.target.checked)} disabled={props.mainState.isBind}/>
          </Col>
        </Row>
        <Row>
          <Col sm="8"><Label id='HOBURGALARM' className="mb-0">Central Burglar Alarm</Label></Col>
          <Col sm="4">
            <AppSwitch className="react-switch"  size="sm" variant={'pill'} color={'success'} name="data[HOBURGALARM]" checked={burgAlarm} value={burgAlarm?'CENTRAL':''} onChange={(e)=>setBurgAlarm(e.target.checked)} disabled={props.mainState.isBind}/>
          </Col>
        </Row>
        <Row>
          <Col sm="7"><Label id='SPRINKLER' className="mb-0">Automatic Sprinklers</Label></Col>
          <Col sm="5">
            <Input type="select" bsSize="sm" name="data[SPRINKLER]" value={autoSprink} onChange={(e)=>setAutoSprink(e.target.value)} disabled={props.mainState.isBind}>
              <option key="" value="">Select</option>
              {props.baseData != null?props.baseData.MHSPRINKLER.map((comp, i) => {
                return (
                  <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
                );
              }):null}
            </Input>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

const mapStateToProps = state => ({
  baseData: state.QuoteEntry.baseData,
});

export default connect(mapStateToProps)(Discount);