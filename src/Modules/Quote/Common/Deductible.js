import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  Col,
  Row,
  Input,
  Label,
} from 'reactstrap';

const Deductible = props => {
  var nh = '', h = 'HURRA02P';
  var productArray = [13,1,2]
  if (productArray.indexOf(props.mainState.product) > -1) {
    nh = 'DED1000';
    h = 'HURRA02P';
  } else if (props.mainState.product == 15) {
    nh = 'DED2500';
  } else if (props.mainState.product == 16) {
    nh = 'DED1000';
  } else if(props.mainState.product == 6){
    nh = '';
    h = '';
  }
  const [nonHuricane, setNonHurricane] = useState(nh);
  const [hurricane, setHurricane] = useState(h);
  const [isSetSavedData, setIsSavedData] = useState(false);

  useEffect(() => {
    if (props.quoteSavedData != null && !isSetSavedData) {
      setAllSavedData();
    }
  });

  const setAllSavedData = () => {
    var deductibleData = props.quoteSavedData.getDeductibleData;
    setNonHurricane(deductibleData.s_PrDiscountCode||'');
    setHurricane(deductibleData.s_PrDiscount2Code||'')
    setIsSavedData(true);
  }

  return (
    <React.Fragment>
      <Row className="p-0 m-0">
        <Col md="2" className='p-1'>
          <Label id='ddDeductNonHurricane' className="mb-0">Non Hurricane</Label>
          <Input type="select" bsSize="sm" name="ddDeductNonHurricane" value={nonHuricane} onChange={(e) => setNonHurricane(e.target.value)} disabled={props.mainState.isBind}>
            <option value="">Select</option>
            {props.baseData != null?props.baseData.deductibleDisc.nonHurricaneDD.map((data, i) => {
              return (
                <option key={i} value={data.value}>{data.label}</option>
              );
            }):null}
          </Input>
        </Col>
        <Col md="2" className='p-1'>
          <Label id='ddDeductHurricane' className="mb-0">Hurricane</Label>
          <Input type="select" bsSize="sm" name="ddDeductHurricane" value={hurricane} onChange={(e) => setHurricane(e.target.value)} disabled={props.mainState.isBind}>
            <option value="">Select</option>
            {props.baseData != null?props.baseData.deductibleDisc.hurricaneDD.map((data, i) => {
              return (
                <option key={i} value={data.value}>{data.label}</option>
              );
            }):null}
          </Input>
        </Col>
      </Row>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  baseData: state.QuoteEntry.baseData,
});

export default connect(mapStateToProps)(Deductible);