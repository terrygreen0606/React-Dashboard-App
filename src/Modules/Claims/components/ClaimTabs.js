import React, {useState} from 'react';
import classnames from 'classnames';
import {Card, CardBody, CardFooter, Col, Nav, NavItem, NavLink, Row, Button, TabContent, TabPane} from 'reactstrap';
import {ClaimView} from "./ClaimView"
import {ClaimReviews} from "./ClaimReviews"
import {ClaimLogs} from "./ClaimLogs"
import {ClaimReserves} from "./ClaimReserves"
import {ClaimQuestionnaire} from "./ClaimQuestionnaire"

export const ClaimTabs = ({claim, setClaim, editMode, isUpdating, setEditMode, setAddMode, updateClaim}) => {

    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }
    return (
    <Card>
        <CardBody>
            <Row>
                <Col md="12">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggle('1'); }}
                            >
                                Claim View
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggle('2'); }}
                            >
                                Status Reviews
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '3' })}
                                onClick={() => { toggle('3'); }}
                            >
                                Status Logs
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '4' })}
                                onClick={() => { toggle('4'); }}
                            >
                                Resv./Payments
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '5' })}
                                onClick={() => { toggle('5'); }}
                            >
                                Questionnaire
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <ClaimView 
                                claim={claim}
                                setClaim={setClaim}
                                editMode={editMode}
                            />
                        </TabPane>
                        <TabPane tabId="2">
                            <ClaimReviews claim={claim}/>
                        </TabPane>
                        <TabPane tabId="3">
                            <ClaimLogs claim={claim}/>
                        </TabPane>
                        <TabPane tabId="4">
                            <ClaimReserves claim={claim}/>
                        </TabPane>
                        <TabPane tabId="5">
                            <ClaimQuestionnaire
                                claim={claim}
                                setClaim={setClaim}
                                editMode={editMode}
                            />
                        </TabPane>
                    </TabContent>

                </Col>
            </Row>
        </CardBody>

        <CardFooter>
        { editMode ? 
            <center>
            <Button type="button" size="md" color="success" onClick={updateClaim}>
                {claim.ClaimId_PK ? 'Update ' : 'Add New '} Claim
            </Button>
                &nbsp;&nbsp;
            <Button onClick={()=>setEditMode(false)} type="button" size="md" color="success">
                Cancel
            </Button>
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
                <Button disabled={isUpdating} onClick={()=>setAddMode(true)} type="button" size="md" color="success">
                    Add new Claim
                </Button>
            </center>
        }
        </CardFooter>
    </Card>
)}
