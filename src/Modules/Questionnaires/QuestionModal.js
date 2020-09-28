import React, {useState, useEffect} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Label, Button, Input, Row, Col} from 'reactstrap';
import {Select} from "../Claims/components/Select"

export const QuestionModal = ({isOpen, toggle, question, questionnaire, onSave}) => {

    const emptyQuestion = {
        question_text : "",
        question_type : "simple",
        options : []
    };
    const emptyOption = {
        option_index : 0,
        option_number : "",
        option_text : "",
        next_question_index : 0,
        next_question_id : 0,
    };

    const [currentQuestion, setCurrentQuestion] = useState(emptyQuestion);

    useEffect(() => {
        if (question) {
            setCurrentQuestion(question)
        } else {
            setCurrentQuestion(emptyQuestion)
        }
    },[question]);

    const addOption = () => {
        const options = currentQuestion.options;
        options.push({...emptyOption, option_index: 1+options.length});
        setCurrentQuestion({...currentQuestion, options: options});
    }

    return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-lg">
        <ModalHeader>
            <Label>Question</Label>
        </ModalHeader>
        <ModalBody>
            <Card>
                <CardBody>
                    <Row>
                        <Col xs={2}>
                            <Label><b>Question Type</b></Label>
                        </Col>
                        <Col xs={10}>
                            <Select 
                                onChange={(e)=>setCurrentQuestion({...currentQuestion, question_type: e.target.value})}
                                noEmpty={true}
                                options = {{
                                    simple: "Simple text question", 
                                    options: "Question with options"
                                }}
                                value={currentQuestion.question_type}
                            />
                        </Col>
                    </Row>
                </CardBody>
                <CardBody>
                    <Row>
                        <Col xs={2}>
                            <Label><b>Question</b></Label>
                        </Col>
                        <Col xs={10}>
                            <Input type="textarea" rows="2"
                                placeholder="Question text here ..."
                                onChange={(e)=>setCurrentQuestion({...currentQuestion, question_text: e.target.value})}
                                value={currentQuestion.question_text}
                            />
                        </Col>
                    </Row>
                </CardBody>

                <CardBody>
                    { currentQuestion.question_type==='options' ? 
                        <>
                            <Row>
                                <Col xs={6}>
                                    <Label><b>Options</b></Label>
                                </Col>

                                <Col xs={6}>
                                    <Button className="pull-right" color="primary" size="sm" onClick={addOption}>
                                        <i className='fa fa-plus'/> Add Option
                                    </Button>
                                </Col>
                            </Row>
                            {   
                                currentQuestion.options.length>0 ? 
                                    <Row>
                                        <Col xs={1}>
                                            #
                                        </Col>
                                        <Col xs={7}>
                                            Option text
                                        </Col>
                                        <Col xs={4}>
                                            Next question
                                        </Col>
                                    </Row>
                                :
                                    <Row>
                                        <Col xs={12}>
                                            No options
                                        </Col>
                                    </Row>
                            }
                            {
                                currentQuestion.options.map(o => (
                                    <Row key={o.option_index}>
                                        <Col xs={1} >
                                            {o.option_index}
                                        </Col>
                                        <Col xs={7}>
                                            <Input
                                                placeholder="Option text ..."
                                                onChange={(e)=>setCurrentQuestion({...currentQuestion, 
                                                    options: currentQuestion.options.map( _ => 
                                                        _.option_index===o.option_index ? {..._, option_text: e.target.value} : _
                                                    )
                                                })}
                                                value={o.option_text}
                                            />
                                        </Col>
                                        <Col xs={4}>
                                            <Select 
                                                onChange={(e)=>setCurrentQuestion({...currentQuestion,
                                                    options: currentQuestion.options.map( _ => 
                                                        _.option_index==o.option_index ? {...o, next_question_index: Number(e.target.value)} : _
                                                    )
                                                })}
                                                noEmpty={true}
                                                options = {questionnaire.questions.reduce((map, q) => {
                                                    if (q.question_index>currentQuestion.question_index) {
                                                        map[q.question_index] = q.question_text;
                                                    }
                                                    return map;
                                                }, {})}
                                                value={o.next_question_index ? o.next_question_index : 0}
                                            />
                                        </Col>
                                    </Row>
                                ))
                            } 
                        </>
                        : ''
                    }
                </CardBody>
            </Card>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={()=>{onSave(currentQuestion);setCurrentQuestion(emptyQuestion)}}>Save</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>        
    </Modal>
    );
}

