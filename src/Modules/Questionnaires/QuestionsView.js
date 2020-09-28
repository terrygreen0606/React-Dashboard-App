import React, {useState} from 'react';
import {Col, Label, Row, Button, Input} from 'reactstrap';
import DragSortableList from 'react-drag-sortable';
import {QuestionModal} from "./QuestionModal";
import './css/questionnaire.css';

export const QuestionsView = ({questionnaire, setQuestionnaire, editMode}) => {

    const [editQuestion, setEditQuestion] = useState(0);
    
    const onSort = (sorted) => {
        setQuestionnaire({...questionnaire, questions: sorted.map(d => {
            d.question.question_index = d.rank+1;
            return d.question;
        },null)});
    };

    return (
    <>
    <br/>
    <Label>Questions List</Label>
    {editMode ? (
        <>
        <Button className="pull-right" color="primary" size="sm" onClick={()=>setEditQuestion(-1)}>
            <i className='fa fa-plus'/> Add Question
        </Button>
        <br/>
        <br/>
        <>
        <DragSortableList 
            items={questionnaire.questions.map(q =>({
                content:(
                    <Row>
                        <Col xs="10">
                            {q.question_text}
                        </Col>
                        <Col xs="2" className="question-buttons text-right text-xs-center">
                            <Button color="primary" onClick={()=>setEditQuestion(q.question_index)}>
                                <i className='fa fa-edit'/>
                            </Button>
                            <Button color="primary">
                                <i className='fa fa-trash'/>
                            </Button>
                        </Col>
                    </Row>
                ),
                question: q,
                classes:[ q.question_type==='simple' ? 'simple-question' : 'options-question']
            }))}
            onSort={onSort} 
            dropBackTransitionDuration={0.3} 
            type="vertical"
        />
        </>
        </>
    ):(
        questionnaire.questions.length>0 ? 
        <>
            <br/>
            <ul>
            { questionnaire.questions.map(q => (
                <li key={q.question_index}>
                    {q.question_type === 'options' ? <i className="fa fa-check" style={{background:'yellow'}} aria-hidden="true"> </i> : ''}
                    {q.question_text}
                </li>
            ))}    
            </ul>
        </>
        : 
        <>
            <br/>
            <Label>Empty</Label>
        </>
    )}
    <QuestionModal 
        isOpen = {editQuestion!==0}
        toggle = {()=>setEditQuestion(0)}
        questionnaire = {questionnaire}
        question = {questionnaire.questions.find( _ => _.question_index===editQuestion)}
        onSave = {(r) => {
            if (r.question_index) {
                const questions = questionnaire.questions.map(q=>q.question_index===r.question_index ? r : q);
                setQuestionnaire({...questionnaire, questions: questions});
            } else {
                r.question_index = 1 + questionnaire.questions.length;
                setQuestionnaire({...questionnaire, questions: [...questionnaire.questions, r]});
            }
            setEditQuestion(0);
        }}
    />
    </>
)}