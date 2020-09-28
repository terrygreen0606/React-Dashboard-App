import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { onInputChange } from '../Common/QuoteValidation';

import {
  Col,
  Row,
  Input,
  Label,
} from 'reactstrap';
import { setLocale } from 'yup';

const BasicCvg = props => {
  const [HOMCVGCTxt, setHOMCVGCTxt] = useState('');
  const [HOMCVGDSel, setHOMCVGDSel] = useState('');
  const [HOMCVGDTxt, setHOMCVGDTxt] = useState('');
  const [eCvg, setECvg] = useState('');
  const [fCvg, setFCvg] = useState('');
  const [isSetData, setIsSetData] = useState(false);
  const [isSetSavedData, setIsSetSavedData] = useState(false);

  const setAllBaseData = () => {
    setHOMCVGCTxt(0);
    setHOMCVGDSel(10);
    setHOMCVGDTxt(0);
    setECvg(2);
    setFCvg(50);
    setIsSetData(true);
  }

  const setAllValues = () => {
    setHOMCVGDTxt(HOMCVGCTxt * (HOMCVGDSel / 100))
  }

  const setValueOnchangeSel = (e) => {
    if (e.currentTarget.id == 'HOMCVGD') {
      setHOMCVGDSel(Number(e.currentTarget.value));
    }
    setAllValues()
  }

  useEffect(() => {
    if (props.baseData != null && !isSetData) {
      setAllBaseData();
    }
    if (props.quoteSavedData != null && !isSetSavedData) {
      setAllSavedData()
    }
    setAllValues()
  });

  const setAllSavedData = () => {
    var basicData = props.quoteSavedData.getCvgData;
    for (const [i, val] of basicData.entries()) {
      if (val.n_PCCoverageID_PK == 37) {
        setHOMCVGCTxt(Number(val.n_InsuredValue));
      }
      if (val.n_PCCoverageID_PK == 4) {
        setHOMCVGDSel(Number(val.n_InsuredValueCoveredRate));
        setHOMCVGDTxt(Number(val.n_InsuredValue));
      }
      if(val.n_PCCoverageID_PK == 5){
        setECvg(val.n_PRLimitFK);
      }
      if(val.n_PCCoverageID_PK == 6){
        setFCvg(val.n_PRLimitFK);
      }
    }
    setIsSetSavedData(true);
  }

  const onChangeHandler = (e) => {
    if(e.currentTarget.id == 5){
      setECvg(e.currentTarget.value);
    }
    if(e.currentTarget.id == 6){
      setFCvg(e.currentTarget.value);
    }
  }

  var hdnBasicCvg = [];
  return (
    <React.Fragment>
      {props.baseData != null ?
        props.baseData.all_basic_Coverage.map((cvg, i) => {
          var basic = i + 1;
          hdnBasicCvg.push(cvg.n_PCCoverageID_PK);
          var fieldsPart = null;
          if (cvg.s_LimitCodeType == 'NUMBER') {
            fieldsPart = (
              <Col md="7">
                <NumberFormat displayType={'input'} className="form-control form-control-sm text-right" allowNegative={false} thousandSeparator={true} prefix={'$'} name={"txt_basicCVG_" + basic} id={"txt_basicCVG_" + basic} value={HOMCVGCTxt} onValueChange={(values) => setHOMCVGCTxt(values.floatValue)} onBlur={() => setAllValues()} onInput={(e) => onInputChange(e)} disabled={props.mainState.isBind} />
              </Col>
            );
          } else if (cvg.s_LimitCodeType == 'NOEDIT') {
            var optionPart = null;
            var defaultSelected = '';
            var defaultText = 0;
            if (cvg.s_CoverageCode == 'HOMCVGD') {
              defaultSelected = HOMCVGDSel;
              defaultText = HOMCVGDTxt;
              optionPart = (<React.Fragment><option value="10">{"10%"}</option><option value="20">{"20%"}</option></React.Fragment>);
            }

            fieldsPart = (
              <React.Fragment>
                <Col md="3" className="pr-0">
                  <Input type="select" bsSize="sm" id={cvg.s_CoverageCode} name={"txt_basicCVGSelectedValue_" + basic} value={defaultSelected} onChange={(e) => setValueOnchangeSel(e)} onInput={(e) => onInputChange(e)} disabled={props.mainState.isBind}>
                    <option value="">--Select--</option>
                    {optionPart}
                  </Input>
                </Col>
                <Col md="4" className="pl-0">
                  <NumberFormat displayType={'input'} className="form-control form-control-sm text-right" allowNegative={false} thousandSeparator={true} prefix={'$'} name={"txt_basicCVG_" + basic} id={"txt_basicCVG_" + basic} value={defaultText} readOnly disabled={props.mainState.isBind} />
                </Col>
              </React.Fragment>
            );
          } else if (cvg.s_LimitCodeType == 'DROPDOWN') {
            var defaultSelected = {};
            if (cvg.s_CoverageCode == 'HOMCVGE') {
              defaultSelected['value'] = eCvg;
            } else if (cvg.s_CoverageCode == 'HOMCVGF') {
              defaultSelected['value'] = fCvg;
            }
            var optionPart = cvg.dropDown.map((dd, i) => {
              return <option key={i} value={dd.n_PCLimitId_PK}>{dd.s_LimitScreenName}</option>
            })

            fieldsPart = (
              <Col md="7">
                <Input type="select" bsSize="sm" name={"dd_basicCVG_" + basic} id={cvg.n_PCCoverageID_PK} {...defaultSelected} onChange={(e)=>onChangeHandler(e)} onInput={(e) => onInputChange(e)} disabled={props.mainState.isBind}>
                  <option value="">--Select--</option>
                  {optionPart}
                </Input>
              </Col>
            );
          }

          return (
            <Row key={i} className="mt-1">
              <Col md="5">
                <Label className="m-0">{cvg.s_ScreenName}</Label>
              </Col>
              {fieldsPart}
            </Row>
          );
        }) : null
      }
      <Input type="hidden" name="hdnService_BasciCVG" value={hdnBasicCvg.join('|')} disabled={props.mainState.isBind} />
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  baseData: state.QuoteEntry.baseData,
});

export default connect(mapStateToProps)(BasicCvg);