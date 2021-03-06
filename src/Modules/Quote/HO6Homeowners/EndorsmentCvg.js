import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppSwitch } from '@coreui/react';
import ReactDOM from "react-dom";

import {
  Col,
  Row,
  Input,
  Label,
} from 'reactstrap';

const EndorsmentCvg = props => {
  const [hdnEndorsCvg, sethdnEndorsCvg] = useState([38, 12]);
  const [unCheckedCvg, setunCheckedCvg] = useState([]);
  const [HOBLDORDLAW, setHOBLDORDLAW] = useState('78');
  const [HOMOLDCVG, setHOMOLDCVG] = useState('3');
  const [HOSEWERDRAIN, setHOSEWERDRAIN] = useState('');
  const [HOSCREENAREAS, setHOSCREENAREAS] = useState('');
  const [HOIDTHEFT, setHOIDTHEFT] = useState('');
  const [HOINHOMEBIZC, setHOINHOMEBIZC] = useState('');
  const [HOMCVGU, setHOMCVGU] = useState('');
  const [HOFIREDEPT, setHOFIREDEPT] = useState('');
  const [isSetBaseData, setIsSetBaseData] = useState(false);
  const [isSetSavedData, setIsSetSavedData] = useState(false);

  useEffect(()=>{
    if (!isSetBaseData) {
      props.updateEndorsChecked(hdnEndorsCvg);
      setIsSetBaseData(true);
    }
    if(props.quoteSavedData != null && !isSetSavedData){
      setSelectedDDVal();
    }
  });

  // Set All Saved Value to the respection element
  const setSelectedDDVal = () => {
    // Selected Checked Array
    const savedArray = [];
    for (const [i, val] of props.quoteSavedData.getCvgData.entries()) {
      if (val.n_InsuredValueCoveredRate != 0 && !([1, 2, 3, 4, 5, 6, 7, 37].indexOf(val.n_PCCoverageID_PK) > -1)) {
        savedArray.push(parseInt(val.n_PCCoverageID_PK))
      }
    }
    sethdnEndorsCvg(savedArray); // Set Updated State
    props.updateEndorsChecked(savedArray); // Update State of QuoteAccord.js
    // Set Respection element Dropdown value
    for (const [i, val] of props.quoteSavedData.getCvgData.entries()) {
      if (val.n_InsuredValueCoveredRate != 0 && !([1, 2, 3, 4, 5, 6, 7, 37].indexOf(val.n_PCCoverageID_PK) > -1)) {
        if (val.s_CoverageCode == 'HOBLDORDLAW') {
          setHOBLDORDLAW(String(val.n_PRLimitFK));
        } else if (val.s_CoverageCode == 'HOMOLDCVG') {
          setHOMOLDCVG(String(val.n_PRLimitFK));
        } else if (val.s_CoverageCode == 'HOSCREENAREAS') {
          setHOSCREENAREAS(String(val.n_PRLimitFK));
        } else if (val.s_CoverageCode == 'HOSEWERDRAIN') {
          setHOSEWERDRAIN(String(val.n_PRLimitFK));
        } else if (val.s_CoverageCode == 'HOIDTHEFT') {
          setHOIDTHEFT(String(val.n_PRLimitFK));
        } else if (val.s_CoverageCode == 'HOINHOMEBIZC') {
          setHOINHOMEBIZC(String(val.n_PRLimitFK));
        } else if (val.s_CoverageCode == 'HOMCVGU') {
          setHOMCVGU(String(val.n_InsuredValue));
        } else if (val.s_CoverageCode == 'HOFIREDEPT') {
          setHOFIREDEPT(String(val.n_InsuredValue));
        }
      }
    }
    setIsSetSavedData(true);
  }

  // Update Checked and Unchacked array
  const updateEndorsCvgArray = (cvgPK) => {
    const prevSelectedArray = [...hdnEndorsCvg]
    if (prevSelectedArray.indexOf(parseInt(cvgPK)) > -1) {
      prevSelectedArray.splice(prevSelectedArray.indexOf(parseInt(cvgPK)), 1);

      if (props.mainState.mode == 'Edit') {
        const unCheckedSelectedArray = unCheckedCvg;
        if (!unCheckedSelectedArray.indexOf(parseInt(cvgPK)) > -1) {
          unCheckedSelectedArray.push(parseInt(cvgPK));
        }
        setunCheckedCvg(unCheckedSelectedArray);
      }

    } else {
      prevSelectedArray.push(parseInt(cvgPK));
    }
    sethdnEndorsCvg(prevSelectedArray);
    props.updateEndorsChecked(prevSelectedArray);
  }

  // set OnChanged Dropdown value
  const onChangedSelectedDDValue = (e) => {
    if (e.currentTarget.id == 'HOBLDORDLAW') {
      setHOBLDORDLAW(e.currentTarget.value);
    } else if (e.currentTarget.id == 'HOMOLDCVG') {
      setHOMOLDCVG(e.currentTarget.value);
    } else if (e.currentTarget.id == 'HOSCREENAREAS') {
      setHOSCREENAREAS(e.currentTarget.value);
    } else if (e.currentTarget.id == 'HOSEWERDRAIN') {
      setHOSEWERDRAIN(e.currentTarget.value);
    } else if (e.currentTarget.id == 'HOIDTHEFT') {
      setHOIDTHEFT(e.currentTarget.value);
    } else if (e.currentTarget.id == 'HOINHOMEBIZC') {
      setHOINHOMEBIZC(e.currentTarget.value);
    }
  }

  const setInputText = (e) => {
    if (e.currentTarget.id == 'HOMCVGU') {
      setHOMCVGU(e.currentTarget.value);
    } else if (e.currentTarget.id == 'HOFIREDEPT') {
      setHOFIREDEPT(e.currentTarget.value);
    }
  }

  /**
   * On Input change check whether is empty or not and class respectively
   * @param {current changed element} e 
   * @author Kiran Ivalekar
   */
  const onInputChange = (e) => {
    const cvgPK = e.currentTarget.name.split('_')[1];
    if ((hdnEndorsCvg.indexOf(parseInt(cvgPK)) > -1) && e.currentTarget.value == '') {
      ReactDOM.findDOMNode(e.currentTarget).classList.add('is-invalid');
    } else {
      ReactDOM.findDOMNode(e.currentTarget).classList.remove('is-invalid');
    }
  }

  return (
    <React.Fragment>
      {props.baseData != null ?
        props.baseData.all_endorsement_Coverage.map((cvg, i) => {
          var fieldsPart = null;
          if (cvg.s_LimitCodeType == 'NOEDIT') {
            fieldsPart = (
              <React.Fragment>
                <Col md="5"><Input type="hidden" bsSize="sm" name={"txtCvgLimitAmt_" + cvg.n_PCCoverageID_PK} id={"txtCvgLimitAmt_" + cvg.n_PCCoverageID_PK} disabled /></Col>
              </React.Fragment>
            );
          } else if (cvg.s_LimitCodeType == 'NUMBER') {
            var defaultSelected = {};
            if (cvg.s_CoverageCode == 'HOMCVGU') {
              defaultSelected['value'] = HOMCVGU;
            } else if (cvg.s_CoverageCode == 'HOFIREDEPT') {
              defaultSelected['value'] = HOFIREDEPT;
            }
            fieldsPart = (
              <Col md="5"><Input type="text" bsSize="sm" name={"txtCvgLimitAmt_" + cvg.n_PCCoverageID_PK} id={cvg.s_CoverageCode} {...defaultSelected} onChange={(e) => setInputText(e)} disabled={props.mainState.isBind}/></Col>
            );
          } else if (cvg.s_LimitCodeType == 'SUPPFORM') {
            var formLink = null;
            if (cvg.n_PCCoverageID_PK == 22) {
              formLink = (<a href="#" style={{ padding: "0px" }} onClick={(e) => { e.preventDefault(); }} disabled={props.mainState.isBind}>Form</a>)
            }
            if (cvg.n_PCCoverageID_PK == 50) {
              formLink = (<a href="#" style={{ padding: "0px" }} onClick={(e) => { e.preventDefault(); }} disabled={props.mainState.isBind}>Form</a>)
            }
            fieldsPart = (
              <React.Fragment>
                <Col md="3">
                  <Input type="text" bsSize="sm" name={"txtCvgLimitAmt_" + cvg.n_PCCoverageID_PK} id={"txtCvgLimitAmt_" + cvg.n_PCCoverageID_PK} disabled={props.mainState.isBind} />
                </Col>
                <Col md="2">{formLink}</Col>
              </React.Fragment>
            );
          } else {
            var defaultSelected = {};
            if (cvg.s_CoverageCode == 'HOBLDORDLAW') {
              defaultSelected['value'] = HOBLDORDLAW;
            } else if (cvg.s_CoverageCode == 'HOMOLDCVG') {
              defaultSelected['value'] = HOMOLDCVG;
            } else if (cvg.s_CoverageCode == 'HOSCREENAREAS') {
              defaultSelected['value'] = HOSCREENAREAS;
            } else if (cvg.s_CoverageCode == 'HOSEWERDRAIN') {
              defaultSelected['value'] = HOSEWERDRAIN;
            } else if (cvg.s_CoverageCode == 'HOIDTHEFT') {
              defaultSelected['value'] = HOIDTHEFT;
            } else if (cvg.s_CoverageCode == 'HOINHOMEBIZC') {
              defaultSelected['value'] = HOINHOMEBIZC;
            }

            var optionPart = cvg.dropDown.map((dd, i) => {
              return <option key={i} value={dd.n_PCLimitId_PK}>{dd.s_LimitScreenName}</option>
            })

            fieldsPart = (
              <Col md="5">
                <Input type="select" bsSize="sm" name={"ddCvgLimitAmt_" + cvg.n_PCCoverageID_PK} id={cvg.s_CoverageCode} {...defaultSelected} onChange={(e) => onChangedSelectedDDValue(e)} onInput={(e) => onInputChange(e)} disabled={props.mainState.isBind}>
                  <option value="">--Select--</option>
                  {optionPart}
                </Input>
              </Col>
            );
          }

          // Default Auto Selected Checked
          var isAutoSelect = false;
          if (cvg.s_isAutoSelected == 'Yes') {
            isAutoSelect = true;
          }

          // Set Saved Data Selected Checked
          if (hdnEndorsCvg.indexOf(parseInt(cvg.n_PCCoverageID_PK)) > -1) {
            isAutoSelect = true;
          } else (
            isAutoSelect = false
          )

          return (
            <Row key={i} className="mt-1">
              <Col md="2"><AppSwitch className="react-switch" size="sm" variant={'pill'} color={'success'} name={"chkEndorse_" + cvg.n_PCCoverageID_PK} id={cvg.n_PCCoverageID_PK} checked={isAutoSelect} onChange={(e) => updateEndorsCvgArray(e.currentTarget.id)} disabled={props.mainState.isBind} /></Col>
              <Col md="5" className="pl-0"><Label className="mb-0">{cvg.s_ScreenName}</Label></Col>
              {fieldsPart}
            </Row>
          )
        }) : null
      }
      <Input type="hidden" name="deletedSelectedCvg" value={unCheckedCvg.join('|')} disabled={props.mainState.isBind} />
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  baseData: state.QuoteEntry.baseData,
});

export default connect(mapStateToProps)(EndorsmentCvg);