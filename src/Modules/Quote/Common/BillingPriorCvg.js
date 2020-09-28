import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  Col,
  Row,
  Input,
  InputGroup,
  Label,
  Card, CardHeader, CardBody, FormGroup
} from 'reactstrap';

const BillingPriorCvg = props => {
  const [billto, setBillTo] = useState('MORTGAGE');
  const [payPlan, setPayPlan] = useState('FULLPAY');
  const [amtApp, setAmtIncApp] = useState('');
  const [priorCarrier, setPriorCarrier] = useState('');
  const [priorPolicyNo, setPriorPolicyNo] = useState('');
  const [priorExp, setPriorExp] = useState('');
  const [isSetSavedData, setIsSetSavedData] = useState(false);

  useEffect(()=>{
    if(props.quoteSavedData != null && !isSetSavedData){
      setAllSavedData()
    }
  });

  const setAllSavedData = () => {
    var billingData = props.quoteSavedData.acctMasterData;
    setBillTo(billingData.s_BillToType);
    setPayPlan(billingData.s_PayPlanCode);
    setAmtIncApp(props.quoteSavedData.poAppMasterData.n_AmountIncludedApp != null ? props.quoteSavedData.poAppMasterData.n_AmountIncludedApp : '');
    var priorCvgData = props.quoteSavedData.getPriorCvgData;
    if(priorCvgData != null){
      setPriorCarrier(priorCvgData.s_PriorCarrierName);
      setPriorPolicyNo(priorCvgData.s_PriorPolicyNo);
      setPriorExp(priorCvgData.d_PolicyExpirationDate);
    }
    setIsSetSavedData(true);
  }

  return (
    <React.Fragment>
      <Row>
        <Col sm="6">
          <Card className="m-0">
            <CardHeader className="p-1">
              <strong>Billing</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md="4" >
                  <FormGroup className="m-0">
                    <Label className="mb-0">Bill To</Label>
                    <Input type="select" bsSize="sm" name="data[TbAccountmaster][s_BillToType]" id="billTo" value={billto} onChange={(e)=>setBillTo(e.target.value)} disabled={props.mainState.isBind}>
                      <option value="">--Select--</option>
                      {props.baseData != null?props.baseData.BILLTO.map((comp, i) => {
                        return (
                          <option key={i} value={comp.s_AppCodeName}>{comp.s_AppCodeNameForDisplay}</option>
                        );
                      }):null}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="4" >
                  <FormGroup  className="m-0">
                    <Label className="mb-0">Pay Plan</Label>
                    <Input type="select" bsSize="sm" name="data[TbAccountmaster][s_PayPlanCode]" id="payPlan" value={payPlan} onChange={(e)=>setPayPlan(e.target.value)} disabled={props.mainState.isBind}>
                      <option key="" value="">Select</option>
                      {props.baseData != null?props.baseData.GetAllPayPlan.map((comp, i) => {
                        return (
                          <option key={i} value={comp.s_PayPlanCode}>{comp.s_PayPlanScreenName}</option>
                        );
                      }):null}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="4" >
                  <FormGroup  className="m-0">
                    <Label className="mb-0">Amt Included with App.</Label>
                    <Input type="text" bsSize="sm" name="data[TbPoappsmaster][n_AmountIncludedApp]" id="n_AmountIncludedApp" placeholder="Amt Included with App" value={amtApp} onChange={(e)=>setAmtIncApp(e.target.value)} disabled={props.mainState.isBind}/>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col sm="6">
          <Card className="m-0">
            <CardHeader className="p-1">
              <strong>Prior Coverage Info</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md="4" >
                  <FormGroup  className="m-0">
                    <Label className="mb-0">Prior Carrier :</Label>
                    <Input type="text" bsSize="sm" name="data[TbPopriorcoveragedetail][s_PriorCarrierName]" id="s_PriorCarrierName" placeholder="Prior Carrier" value={priorCarrier} onChange={(e)=>setPriorCarrier(e.target.value)} disabled={props.mainState.isBind}/>
                  </FormGroup>
                </Col>
                <Col md="4" >
                  <FormGroup  className="m-0">
                    <Label className="mb-0">Prior Policy No :</Label>
                    <Input type="text" bsSize="sm" name="data[TbPopriorcoveragedetail][s_PriorPolicyNo]" id="s_PriorPolicyNo" placeholder="Prior Policy No" value={priorPolicyNo} onChange={(e)=>setPriorPolicyNo(e.target.value)} disabled={props.mainState.isBind}/>
                  </FormGroup>
                </Col>
                <Col md="4" >
                  <FormGroup  className="m-0">
                    <InputGroup className="input-prepend">
                      <Label className="mb-0">Policy Expiration Dt :</Label>
                    </InputGroup>
                    <Input type="date" bsSize="sm" id="d_PolicyExpirationDate" name="data[TbPopriorcoveragedetail][d_PolicyExpirationDate]" placeholder="Date of Birth" value={priorExp} onChange={(e)=>setPriorExp(e.target.value)} disabled={props.mainState.isBind}/>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  baseData: state.QuoteEntry.baseData,
});

export default connect(mapStateToProps)(BillingPriorCvg);