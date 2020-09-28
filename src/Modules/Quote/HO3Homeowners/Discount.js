import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppSwitch } from '@coreui/react';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Label,
} from 'reactstrap';

const Discount = props => {
  const [fireAlarm, setFireAlarm] = useState(false);
  const [burgAlarm, setBurgAlarm] = useState(false);
  const [getComm, setGetComm] = useState(false);
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
    setGetComm(discountData.s_GatedCommunityCode == 'YES'?true:false);
    setIsSetSavedData(true);
  }

  return (
    <Card className="mb-0">
      <CardHeader className="p-1">
        <strong>Discounts</strong>
      </CardHeader>
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
          <Col sm="8"><Label id='HOGATEDCOMM' className="mb-0">Gated Community</Label></Col>
          <Col sm="4">
            <AppSwitch className="react-switch"  size="sm" variant={'pill'} color={'success'} name="data[HOGATEDCOMM]" checked={getComm} value={getComm?'YES':''} onChange={(e)=>setGetComm(e.target.checked)} disabled={props.mainState.isBind}/>
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