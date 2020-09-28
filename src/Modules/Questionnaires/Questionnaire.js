import React, {useState, useEffect} from 'react';
import {useHttp} from '../../services/claimService';
import {Col, Row } from 'reactstrap';
import {QuestionnaireView} from "./QuestionnaireView"

const Questionnaire = props => {
  
  const questionnaireInital = {
    id: '',
    description: '',
    claimTypes: [],
    questions: [],
  };

  const questionnaireId = Number(props.match.params.id);
  const [questionnaire, setQuestionnaire] = useState({...questionnaireInital, id: questionnaireId||''});
  const [editMode, setEditMode] = useState(false);
  const [update, setUpdate] = useState(0);
  const [remove, setRemove] = useState(0);

  const [isLoading, fetchedData] = useHttp(process.env.REACT_APP_API_URL+'/api/v1/questionnaires/'+questionnaireId, [questionnaireId || null]);
  const [isUpdating, updatedData] = useHttp(process.env.REACT_APP_API_URL+'/api/v1/questionnaires'+ (questionnaire.id ? '/'+questionnaire.id:'') , [update], questionnaire, questionnaire.id ? 'PUT':'POST');
  const [isRemoving, removingReport] = useHttp(process.env.REACT_APP_API_URL+'/api/v1/questionnaires/'+questionnaire.id, [remove], questionnaire, 'DELETE');

  let content = <><i className="fa fa-spinner fa-spin"></i><span style={{paddingLeft:'15px'}}>Loading questionnaire details...</span></>;

  const setAddMode = () => {
    setQuestionnaire({...questionnaire, ...questionnaireInital, description: 'New Questionnnaire'});
    setEditMode(true);
  }

  useEffect(() => {
    setEditMode(false);
    if (!isUpdating && updatedData && updatedData.data) {
      setQuestionnaire(updatedData.data);
    }
  },[isUpdating, updatedData]);

  useEffect(() => {
    if (isRemoving) {
        window.location.href = '/questionnaires';
    }
  },[isRemoving, removingReport]);

  useEffect(() => {
    if (questionnaireId===0) {
      setEditMode(true); //adding a new item
    }
    if (!isLoading && fetchedData && fetchedData.data) {
      setQuestionnaire(fetchedData.data);
    }
  },[fetchedData]);

  if ((!isLoading && fetchedData && fetchedData.data && questionnaire)||(questionnaireId===0)) {

    content = (
    <>
      <QuestionnaireView
        questionnaire={questionnaire}
        setQuestionnaire={setQuestionnaire}
        editMode={editMode}
        isUpdating={isUpdating}
        setEditMode={setEditMode}
        setAddMode={setAddMode}
        updateQuestionnaire={()=>setUpdate(update+1)}
        removeQuestionnaire={()=>setRemove(1)}
      />
    </>
    )
  } else if ( !isLoading ) {
    content = <p>Could not fetch any data.</p>;
  }
      
  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg={12}>
          {content}
        </Col>
      </Row>
    </div>
  )
}

export default Questionnaire;
