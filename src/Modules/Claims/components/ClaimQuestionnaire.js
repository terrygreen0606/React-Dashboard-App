import React, {useState, useEffect} from 'react';
import {Container, Label, FormGroup, Col, Row, Card, CardBody, CardFooter, Input, Button} from 'reactstrap';

const AnswersList = ({answers}) => 
    answers && answers.reduce((r, c, i, a) => {
        if (i == 0 || !a[i-1].next_question_index || a[i-1].next_question_index==c.question_index) {
            r.push(c);
        }
        return r;
    }, []).map(q => (
    <li key={q.question_index}>
        {q.question_index}
        {'. '}
        {q.question_text}
        {' => '}
        {q.answer_text}
    </li>
))

export const ClaimQuestionnaire = ({claim, setClaim, editMode}) => {

    const emptyClaimQuestionnare = {answers:[]};
    const [runQuestionnaire, setRunQuestionnaire] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [claimQuestionnaire, setClaimQuestionnaire] = useState(emptyClaimQuestionnare);
    const [newClaimQuestionnaire, setNewClaimQuestionnaire] = useState(emptyClaimQuestionnare);

    const setNextQuestion = () => {
        const current_index = currentQuestion.question_index;

        const next_index = currentQuestion.next_question_index ? 
            currentQuestion.next_question_index : currentQuestion.question_index + 1;
        
        const nextQuestion = newClaimQuestionnaire.answers.find(a => a.question_index==next_index);
        setNewClaimQuestionnaire({...newClaimQuestionnaire,
            answers: newClaimQuestionnaire.answers.map(a => 
                current_index == a.question_index ? {...a, next_question_index: nextQuestion ? next_index : null } :
                next_index == a.question_index ? {...a, prev_question_index: current_index } : a
            )
        });
        if (nextQuestion) {
            setCurrentQuestion({...nextQuestion, prev_question_index: current_index});
        }
    }

    const setPrevQuestion = () => {
        const prev_index = currentQuestion.prev_question_index;
        const prevQuestion = newClaimQuestionnaire.answers.find(a => a.question_index==prev_index);
        if (prevQuestion) {
            setCurrentQuestion(prevQuestion);
        }
    }

    const setFinish = () => {
        setClaim({...claim, newClaimQuestionnaire})
        setRunQuestionnaire(false);
    }

    useEffect(() => {
        const curentClaimQuestionnaire = claim.claim_questionnaire && claim.claim_questionnaire.length > 0 ? 
                claim.claim_questionnaire[0] : emptyClaimQuestionnare;
        setClaimQuestionnaire(curentClaimQuestionnaire);
        
        if (!claim.newClaimQuestionnaire) {
            if (claim.claim_type && claim.claim_type.questionnaire) {
                const questions = claim.claim_type.questionnaire.questions;
                setNewClaimQuestionnaire({...emptyClaimQuestionnare, 
                    questionnaire_id: claim.claim_type.questionnaire.id,
                    answers: questions ? questions.map(q => {
                        const answer = claim.claim_type.questionnaire.id == curentClaimQuestionnaire.questionnaire_id ?
                            curentClaimQuestionnaire.answers.find(a => a.question_index==q.question_index) : null;
                        return {
                            question_index: q.question_index,
                            question_type: q.question_type,
                            question_text: q.question_text,
                            options: q.options,
                            option_index: answer ? answer.option_index : null,
                            answer_text: answer ? answer.answer_text : '',
                            prev_question_index: answer ? answer.prev_question_index : null,
                            next_question_index: answer ? answer.next_question_index : null
                        }
                    }) : []
                });
                if (questions && questions.length>0) {
                    setCurrentQuestion({...questions[0], 
                        prev_question_index: null,
                        next_question_index: questions.length>1 ? 1 : null
                    });
                }
            } 
        }
    }, [claim]);

    useEffect(() => {
        if (runQuestionnaire) {
            setNewClaimQuestionnaire({...newClaimQuestionnaire, started: true});
        }
    }, [runQuestionnaire]);

    useEffect(() => {
        if (currentQuestion && newClaimQuestionnaire && newClaimQuestionnaire.answers) {
            const answeredQuestion = newClaimQuestionnaire.answers.find(a => 
                a.question_index==currentQuestion.question_index
            )
            if (answeredQuestion) {
                setCurrentQuestion(answeredQuestion);
            }
        }
    }, [newClaimQuestionnaire]);
    
    return (
    <Container fluid={false}>
        <Row>
            <Col md="12">
                { editMode && !runQuestionnaire ? 
                    <Button className="pull-right" color="primary" size="sm" onClick={()=>setRunQuestionnaire(true)}>
                        <i className='fa fa-play'/> Start Questionnaire
                    </Button> : ''
                }
            </Col>
        </Row>
        <Row>
            <Col md="12">
                <ul>
                {
                    editMode && runQuestionnaire && currentQuestion ? 
                    <Card>
                        <CardBody>
                            <Label><b>{currentQuestion.question_index} - {currentQuestion.question_text}</b></Label>
                            {currentQuestion.question_type==="simple" ? 
                                <Input type="textarea" rows="2"
                                    placeholder="Answer here ..."
                                    onChange={(e)=>setNewClaimQuestionnaire({...newClaimQuestionnaire,
                                        answers: newClaimQuestionnaire.answers.map(a => ({...a,
                                            answer_text: a.question_index==currentQuestion.question_index 
                                                ? e.target.value : a.answer_text
                                        }))
                                    })}
                                    value={currentQuestion.answer_text || ''}
                                /> 
                                : 
                                currentQuestion.options.map(o => (
                                    <FormGroup check key={o.option_index}>
                                        <Label check>
                                            <Input 
                                                type="radio" 
                                                onChange={(e)=>
                                                    setNewClaimQuestionnaire({...newClaimQuestionnaire,
                                                        answers: newClaimQuestionnaire.answers.map(a => ({...a,
                                                            option_index: a.question_index==currentQuestion.question_index ?
                                                                o.option_index==e.target.value && e.target.checked ? o.option_index : null
                                                            : a.option_index,
                                                            answer_text: a.question_index==currentQuestion.question_index &&
                                                                o.option_index==e.target.value && e.target.checked ? o.option_text
                                                            : a.answer_text,
                                                            next_question_index: a.question_index==currentQuestion.question_index &&
                                                                o.option_index==e.target.value && e.target.checked ? o.next_question_index
                                                            : a.next_question_index
                                                        }))
                                                    })
                                                }
                                                value={o.option_index} checked={o.option_index==currentQuestion.option_index} />{' '}
                                            {o.option_text}
                                        </Label>
                                    </FormGroup>
                                ))
                            }
                        </CardBody>
                        <CardFooter>
                            {currentQuestion.prev_question_index ? 
                            <Button className="pull-left" color="primary" size="sm" onClick={setPrevQuestion}>
                                <i className='fa fa-previous'/> Previous
                            </Button> : ''
                            }
                            {currentQuestion.question_index < newClaimQuestionnaire.answers.length ? 
                            <Button className="pull-right" color="primary" size="sm" onClick={setNextQuestion}>
                                <i className='fa fa-next'/> Next
                            </Button>
                            :
                            <Button className="pull-right" color="primary" size="sm" onClick={setFinish}>
                                <i className='fa fa-next'/> Finish
                            </Button>
                            }
                        </CardFooter>
                    </Card> : ''
                }       
                </ul>
            </Col>
        </Row>
        <Row>
            <Col md="12">
                {
                    !(runQuestionnaire) && !(newClaimQuestionnaire && newClaimQuestionnaire.started) && 
                        <AnswersList
                            answers={claimQuestionnaire.answers}
                        />
                }
                {
                    !(runQuestionnaire) && newClaimQuestionnaire && newClaimQuestionnaire.started && 
                    <AnswersList
                        answers={newClaimQuestionnaire.answers}
                    />
                }
            </Col>
        </Row>
    </Container>
)}