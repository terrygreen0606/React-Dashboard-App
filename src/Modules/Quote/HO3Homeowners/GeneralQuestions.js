import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  Col,
  Row,
  Input,
  Label,
  FormGroup
} from 'reactstrap';

const GeneralQuestion = props => {
  const [isSetSavedData, setIsSetSavedData] = useState(false);
  const [selectedYes, setSelectedYes] = useState([]);
  const [selectedNo, setSelectedNo] = useState([]);

  useEffect(() => {
    if (props.quoteSavedData != null && !isSetSavedData) {
      setAllSavedData()
    }
    setSelectedYes(selectedYes)
    setSelectedNo(selectedNo)
  });

  const setAllSavedData = () => {
    const selectedYesArray = [...selectedYes];
    const selectedNoArray = [...selectedNo];

    for (const [i, val] of props.quoteSavedData.getUWQesAns.entries()) {
      if (val.s_PoAdditionalStatsAnswer == 'Yes') {
        selectedYesArray.push(parseInt(val.n_PRPolicyAddStatQuestions_FK));
      } else {
        selectedNoArray.push(parseInt(val.n_PRPolicyAddStatQuestions_FK));
      }
    }
    setSelectedYes(selectedYesArray);
    setSelectedNo(selectedNoArray);
    setIsSetSavedData(true);
  }

  const onClickYesRadio = (qPK) => {
    const tempArray = [...selectedYes];
    if (!(tempArray.indexOf(parseInt(qPK)) > -1)) {
      const selectedNoArray = [...selectedNo];
      if (selectedNoArray.indexOf(parseInt(qPK)) > -1) {
        selectedNoArray.splice(selectedNoArray.indexOf(parseInt(qPK)), 1);
        setSelectedNo(selectedNoArray);
      }
      tempArray.push(parseInt(qPK));
      setSelectedYes(tempArray);
    }
  }

  const onClickNoRadio = (qPK) => {
    const tempArray = [...selectedNo];
    if (!(tempArray.indexOf(parseInt(qPK)) > -1)) {
      const selectedYesArray = [...selectedYes];
      if (selectedYesArray.indexOf(parseInt(qPK)) > -1) {
        selectedYesArray.splice(selectedYesArray.indexOf(parseInt(qPK)), 1);
        setSelectedYes(selectedYesArray);
      }
      tempArray.push(parseInt(qPK));
      setSelectedNo(tempArray);
    }
  }

  const selectAllYes = () => {
    if(props.baseData != null){
      const tempArray = [...selectedYes];
      for(const [i, val] of props.baseData.GetQuestionForgeneralTab.entries()){
        if (val.n_PRResponseTypeCode == 'TEXT') {
          tempArray.push(parseInt(val.n_PRPolicyAddStatQuestions_Pk));
        }
      }
      setSelectedYes(tempArray);
      setSelectedNo([]);
    }
  }

  const selectAllNo = () => {
    if(props.baseData != null){
      const tempArray = [...selectedNo];
      for(const [i, val] of props.baseData.GetQuestionForgeneralTab.entries()){
        if (val.n_PRResponseTypeCode == 'TEXT') {
          tempArray.push(parseInt(val.n_PRPolicyAddStatQuestions_Pk));
        }
      }
      setSelectedNo(tempArray);
      setSelectedYes([]);
    }
  }

  return (
    <React.Fragment>
      <Row>
        <Col md='1'>
          <a href='#' onClick={(e) => { e.preventDefault(); if(!props.mainState.isBind){ selectAllYes() } }}><strong>YES</strong></a>
        </Col>
        <Col md='1'>
          <a href='#' onClick={(e) => { e.preventDefault(); if(!props.mainState.isBind){ selectAllNo() } }}><strong>NO</strong></a>
        </Col>
        <Col md="8" className='text-center'>
          <strong>Question</strong>
        </Col>
        <Col md="2" className='text-center'>
          <FormGroup check inline>
            <strong>Answer</strong>
          </FormGroup>
        </Col>
      </Row>
      {props.baseData != null ?
        props.baseData.GetQuestionForgeneralTab.map((question, i) => {
          if (question.s_PRQuestionSection == 'HEADER') {
            return (
              <Row key={i} className="mt-2">
                <Col sm="2"></Col>
                <Col sm="8"><strong><Label className="m-0">{question.s_PRQuestionDesc}</Label></strong></Col>
              </Row>
            );
          } else {
            var fieldsPart = null;
            if (question.n_PRResponseTypeCode == 'TEXT') {
              var textValue = '';
              if (props.quoteSavedData != null) {
                for (const [i, val] of props.quoteSavedData.getUWQesAns.entries()) {
                  if (question.n_PRPolicyAddStatQuestions_Pk == val.n_PRPolicyAddStatQuestions_FK) {
                    if (val.s_PoAdditionalStatsAnswer != null || val.s_PoAdditionalStatsAnswer != '') {
                      textValue = val.s_PoAdditionalStatsAnswer;
                    }
                  }
                }
              }
              fieldsPart = (
                <Col md="2">
                  <FormGroup check inline>
                    <Input bsSize="sm" type="text" id={"text_" + question.n_PRPolicyAddStatQuestions_Pk} name={"text_" + question.n_PRPolicyAddStatQuestions_Pk} value={textValue} onChange={(e) => { }} disabled={props.mainState.isBind} />
                  </FormGroup>
                </Col>
              );
            }

            var yesRadio = {}, noRadio = {};

            // Set Selected Radio
            yesRadio['checked'] = selectedYes.indexOf(parseInt(question.n_PRPolicyAddStatQuestions_Pk)) > -1;
            noRadio['checked'] = selectedNo.indexOf(parseInt(question.n_PRPolicyAddStatQuestions_Pk)) > -1;

            return (
              <Row key={i} className="mt-1">
                <Col md="1">
                  <FormGroup check inline>
                    <Input type="radio" id={question.n_PRPolicyAddStatQuestions_Pk} name={"radio_" + question.n_PRPolicyAddStatQuestions_Pk} value="Yes" {...yesRadio} onChange={(e) => onClickYesRadio(e.currentTarget.id)} disabled={props.mainState.isBind} />Yes
                    </FormGroup>
                </Col>
                <Col md="1">
                  <FormGroup check inline>
                    <Input type="radio" id={question.n_PRPolicyAddStatQuestions_Pk} name={"radio_" + question.n_PRPolicyAddStatQuestions_Pk} value="No" {...noRadio} onChange={(e) => onClickNoRadio(e.currentTarget.id)} disabled={props.mainState.isBind} />No
                  </FormGroup>
                </Col>
                <Col md="8">
                  <Label className="m-0">{question.s_PRQuestionDesc.replace(/&nbsp;/g, '\u00A0\u00A0')}</Label>
                </Col>
                {fieldsPart}
              </Row>
            );
          }
        }) : null}
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  baseData: state.QuoteEntry.baseData,
});

export default connect(mapStateToProps)(GeneralQuestion);