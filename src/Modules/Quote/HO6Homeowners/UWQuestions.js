import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppSwitch } from '@coreui/react';

import {
  Col,
  Row,
  Input,
  Label,
  FormGroup
} from 'reactstrap';

const UWQuestions = props => {
  const [uwQuestion, setUWQuestion] = useState([12984362]);
  const [isSetBaseData, setIsSetBaseData] = useState(false);
  const [isSetSavedData, setIsSetSavedData] = useState(false);

  useEffect(() => {
    if (props.baseData != null && !isSetBaseData) {
      props.updateUWquestion(uwQuestion); // update State of QuoteAccord.js
      setIsSetBaseData(true);
    }
    // check if quoteSavedData not null and  isSetSavedData not true
    if (props.quoteSavedData != null && !isSetSavedData) {
      setSelectedVal();
    }
  });

  // Called on Change App Switch (Checked/Unchecked)
  const updateUWQuestionArray = (questionPK) => {
    const tempUwQuestion = [...uwQuestion] // copy state to temp variable
    if (tempUwQuestion.indexOf(parseInt(questionPK)) > -1) {
      tempUwQuestion.splice(tempUwQuestion.indexOf(parseInt(questionPK)), 1); // removed from array if already in on unchecked
    } else {
      tempUwQuestion.push(parseInt(questionPK)); // pushed value in array
    }
    setUWQuestion(tempUwQuestion) // set temp array into state
    props.updateUWquestion(tempUwQuestion); // update State of QuoteAccord.js
  }

  // Call From useEffect to check App Switch from savedData
  const setSelectedVal = () => {
    // Selected Checked Array
    const savedArray = [];
    for (const [i, val] of props.quoteSavedData.getUWQesAns.entries()) {
      var uwQuesPK = [12983758, 12983759, 12983760, 12983761, 12983772, 12983774, 12983781, 12983803, 12983808, 12983757, 12983810, 12983819];
      if (val.s_PoAdditionalStatsAnswer == 'Yes' && (uwQuesPK.indexOf(val.n_PRPolicyAddStatQuestions_FK) > -1)) {
        savedArray.push(parseInt(val.n_PRPolicyAddStatQuestions_FK)) // Pushed into array is ans 'Yes' and qus pk from [12983758, 12983759, 12983760, 12983761, 12983772, 12983774, 12983781, 12983803, 12983808, 12983757, 12983810, 12983819]
      }
    }
    setUWQuestion(savedArray) // Set Updated State
    props.updateUWquestion(savedArray); // Update State of QuoteAccord.js
    setIsSetSavedData(true); // 
  }

  return (
    <React.Fragment>
      <Row>
        <Col md="12" className=''>
          <strong>Please answer all questions in this section</strong>
        </Col>
      </Row>
      {props.baseData != null ? props.baseData.GetQuestion.map((question, i) => {
        var isChecked = false;
        // Set Saved Data Selected Checked
        if (uwQuestion.indexOf(parseInt(question.n_PRPolicyAddStatQuestions_Pk)) > -1) {
          isChecked = true;
        } else (
          isChecked = false
        )

        return (
          <Row key={i} className="mt-1">
            <Col md="11">
              <Label className="m-0">{question.s_PRQuestionDesc.replace(/&nbsp;/g, '\u00A0\u00A0')}</Label>
            </Col>
            <Col md="1">
              <FormGroup check inline className="text-center">
                <Label className="form-check-label" check htmlFor="inline-radio1">No</Label>&nbsp;&nbsp;
                    <AppSwitch size="sm" className={'mt-2'} variant={'pill'} color={'success'} id={question.n_PRPolicyAddStatQuestions_Pk} checked={isChecked} onChange={(e) => updateUWQuestionArray(e.currentTarget.id)} disabled={props.mainState.isBind} />&nbsp;&nbsp;
                    <Label className="form-check-label" check htmlFor="inline-radio2">Yes</Label>
              </FormGroup>
            </Col>
          </Row>
        );
      }) : null}
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  baseData: state.QuoteEntry.baseData,
});

export default connect(mapStateToProps)(UWQuestions);