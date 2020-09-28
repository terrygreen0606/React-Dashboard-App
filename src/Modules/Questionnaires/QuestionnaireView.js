import React from 'react';
import {Link} from "react-router-dom";
import {Card, CardBody, CardFooter, Col, Container, Label, Row, Button, Input} from 'reactstrap';
import {ClaimTypesSelect} from "../Claims/components/ClaimTypesSelect";
import {QuestionsView} from "./QuestionsView";

export const QuestionnaireView = ({
    questionnaire, 
    setQuestionnaire, 
    editMode, 
    isUpdating, 
    setEditMode, 
    setAddMode, 
    updateQuestionnaire,
    removeQuestionnaire
}) => (
    <Card>
        <CardBody>
            <Container fluid={false}>
                <Row>
                    <Col md="6">
                    <Label>Questionnaire Description</Label><br/>
                    {editMode ? (
                        <Input type="textarea" rows="2"
                            placeholder="Description of Questionnaire ..."
                            onChange={(e)=>setQuestionnaire({...questionnaire, description: e.target.value})} 
                            value={questionnaire.description}
                        />
                        ):(
                        <b>{questionnaire.description}</b>
                    )}
                    </Col>
                    <Col md="6">
                        <Label>Assigned Claim Types</Label><br/>
                        {editMode ? (
                            <ClaimTypesSelect 
                                onChange={(e)=>setQuestionnaire({...questionnaire, 
                                    claimTypes: [...e.target.options].filter(o=>o.selected).map(o=>({
                                        ClaimTypeId_PK: o.value,
                                        Description: o.text
                                    }))
                                })}
                                initOptions={questionnaire.claimTypes}
                                value={questionnaire.claimTypes.map(ct => ct.ClaimTypeId_PK)}
                                multiple={true}
                            />
                        ):(
                            questionnaire.claimTypes.length>0 ? 
                            <>
                                <ul>
                                { questionnaire.claimTypes.map(ct => (
                                    <li key={ct.ClaimTypeId_PK}>{ct.Description}</li>
                                ))}    
                                </ul>
                            </>
                            : null
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <QuestionsView
                            questionnaire={questionnaire}
                            setQuestionnaire={setQuestionnaire}
                            editMode={editMode}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                    </Col>
                </Row>
            </Container>
        </CardBody>

        <CardFooter>
        { editMode ?
            <center>
            <Button type="button" size="md" color="success" onClick={updateQuestionnaire}>
                {Number(questionnaire.id) ? 'Save ' : 'Add '}
            </Button>
            {'  '}
            { Number(questionnaire.id) ?
            <>
            <Button onClick={removeQuestionnaire} type="button" size="md" color="success">
                Delete
            </Button>
                &nbsp;&nbsp;
            <Button onClick={()=>setEditMode(false)} type="button" size="md" color="success">
                Cancel
            </Button>
            </> 
            :
            <Link to={`/questionnaires`}>
            <Button type="button" size="md" color="success">
                Cancel
            </Button>
            </Link>
            }
            </center>
            :
            <center>
                <Button disabled={isUpdating} onClick={()=>setEditMode(true)} type="button" size="md" color="success">
                    { isUpdating ? 
                        <><i className="fa fa-spinner fa-spin"></i> Updating</> :
                        'Set To Edit'
                    }
                </Button>
                    &nbsp;&nbsp;
                <Link to={`/questionnaires`}>
                <Button type="button" size="md" color="success">
                    Questionnaires List
                </Button>
                </Link>
                    &nbsp;&nbsp;
                <Button disabled={isUpdating} onClick={()=>setAddMode(true)} type="button" size="md" color="success">
                    Add new Questionnaire
                </Button>
            </center>
        }
        </CardFooter>
    </Card>
)