import React from 'react';
import { Col, Row, Input, Button, Table } from 'reactstrap';
import { AppSwitch } from '@coreui/react';

import {AssignClaimModal} from '../modals/AssignClaimModal';

const ClaimViewTab = (prop) => {
    const [claimAssign, setClaimAssign] = React.useState(false);
    return <>
        <Row className="">
            <Col xs="12" sm="12" lg="6" className=" ">
                <div className="d-flex select-location-div " >
                    <div className="d-flex flex-column justify-content-around w-33"  >
                        <div>Select Location: </div>
                        <div>Primary phone number :</div>
                        <div>Secondary phone number: </div>
                        <div>Email: </div>
                    </div>
                    <div className="d-flex flex-column persona-data-inputs w-67 ml-3" >
                        <div>
                            <Input type='select' size="sm">
                                <option value=''>Select</option>
                            </Input>
                        </div>
                        <div className="d-flex mt-1 justify-content-between">
                            <Input size="sm" color="primary" style={{ flex: 1 }} />
                            <div className="switch-intake justify-content-around d-flex" style={{ flex: 1 }}>Accept SMS:<AppSwitch className={'mx-1'} size="sm" variant={'pill'} color={'success'} checked /></div></div>
                        <div className="mt-1">
                            <Input size="sm" color="primary" />
                        </div>
                        <div className="mt-1">
                            <Input type="email" size="sm" color="primary" />
                        </div>
                    </div>
                </div>
            </Col>
            <Col xs="12" sm="12" lg="6" className="pl-1">
                <div className="bg-primary rounded">
                    <Table borderless responsive size="sm">
                        <tbody>
                            <tr>
                                <td>Claim Type</td>
                                <td>
                                    <Input type='select' size="sm">
                                        <option value=''>Select</option>
                                    </Input>
                                </td>
                                <td>Type of Loss</td>
                                <td>
                                    <Input type='select' size="sm">
                                        <option value=''>Select</option>
                                    </Input>
                                </td>
                            </tr>
                            <tr>
                                <td>Date of Loss</td>
                                <td><Input type='date' size='sm' /></td>
                                <td>Service Rep</td>
                                <td>
                                    <Input type='select' size="sm">
                                        <option value=''>Select</option>
                                    </Input>
                                </td>
                            </tr>
                            <tr>
                                <td>Catastrophe Loss</td>
                                <td>No<AppSwitch className={'mx-1'} size="sm" variant={'pill'} color={'success'} checked />Yes</td>
                                <td>Event Name</td>
                                <td>
                                    <Input type='select' size="sm">
                                        <option value=''>Select</option>
                                    </Input>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </Col>
        </Row>
        <Row className="mt-1">
            <Col lg="12" xl="3" className="">
                <div className="bg-primary rounded d-flex flex-column justify-content-around" style={{ height: '100%' }}>
                    <div className="d-flex "><div className="w-75 fw-700 pl-3">PA Involved</div><div className="w-25 text-center switch-intake d-flex align-items-center"><AppSwitch className={'mx-1'} size="sm" variant={'pill'} color={'success'} checked /></div></div>
                    <div className="d-flex "><div className="w-75 fw-700 pl-3">Attorney Involved</div><div className="w-25 text-center switch-intake d-flex align-items-center"><AppSwitch className={'mx-1'} size="sm" variant={'pill'} color={'success'} /></div></div>
                    <div className="d-flex "><div className="w-75 fw-700 pl-3 ">AOB Involved</div><div className="w-25 text-center switch-intake d-flex align-items-center"><AppSwitch className={'mx-1'} size="sm" variant={'pill'} color={'success'} /></div></div>
                </div>
            </Col>
            <Col lg="12" xl="9">
                <div className="bg-primary rounded d-flex p-2">
                    <div className="d-flex w-33 ">
                        <div className="d-flex flex-column justify-content-around mr-3">
                            <label className="fw-700">Name: </label>
                            <label className="fw-700">Phone:</label>
                            <label className="fw-700">Fax: </label>
                            <label className="fw-700">Email: </label>
                        </div>
                        <div className="d-flex flex-column justify-content-around">
                            <Input size="sm" color="primary" />
                            <Input size="sm" color="primary" />
                            <Input size="sm" color="primary" />
                            <Input size="sm" color="primary" />
                        </div>
                    </div>
                    <div className="d-flex w-67 flex-column ">
                        <div className="d-flex  persona-data-inputs justify-content-center address-inputs mt-2">
                            <label className="fw-700">Address:</label>
                            <div className="d-flex flex-column ad-input">
                                <Input size="sm" color="primary" style={{ width: "90px" }} />
                                <small>House No</small>
                            </div>
                            <div className="d-flex flex-column ad-input">
                                <Input type="select" size="sm" color="primary">
                                    <option>Select</option>
                                </Input>
                                <small>Direction</small>
                            </div>
                            <div className="d-flex flex-column ad-input">
                                <Input size="sm" color="primary" type="text" style={{ width: "90px" }} />
                                <small>Street Name</small>
                            </div>
                            <div className="d-flex flex-column ad-input">
                                <Input type="select" size="sm" color="primary">
                                    <option>Select</option>
                                </Input>
                                <small>Type</small>
                            </div>
                            <div className="d-flex flex-column  ad-input" >
                                <Input type="select" size="sm" color="primary">
                                    <option>Select</option>
                                </Input>
                                <small>Direction</small>
                            </div>
                        </div>
                        <div className="d-flex flex-column persona-data-inputs  mt-2 small-input" >
                            <div className="d-flex justify-content-center ">
                                <div className="d-flex">
                                    <label className="fw-700">
                                        City:&nbsp;
                              </label>
                                    <Input size="sm" color="primary" className="gray-input" />
                                </div>
                                <div className="d-flex ml-2">
                                    <label className="fw-700">
                                        State:&nbsp;
                              </label>
                                    <Input size="sm" color="primary" className="gray-input" />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mt-2" >
                                <div className="d-flex">
                                    <label className="fw-700">
                                        Zip:&nbsp;
                              </label>
                                    <Input size="sm" color="primary" />
                                </div>
                                <div className="d-flex ml-2">
                                    <label className="fw-700">
                                        Country:&nbsp;
                              </label>
                                    <Input size="sm" color="primary" className="gray-input" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Col>
        </Row>
        <Row className="">
            <Col xs="12" sm="12" lg="12" className="" >
                <div className="d-flex justify-content-between align-items-center p-2 mt-1 rounded" style={{ backgroundColor: "#6A888C", color: "white", fontWeight: "700" }}>
                    <div>
                        <p className="mb-0 fw-700">Description of Loss </p>
                    </div>

                    <div className="d-flex align-items-center">
                        <p className="mb-0 fw-700" style={{ width: "230px" }}>Claim reported by: </p>
                        <Input type="select" size="sm" color="primary">
                            <option>Select</option>
                        </Input>
                    </div>
                </div>
            </Col>
        </Row>
        <Row className="">
            <Col xs="12" sm="12" lg="12" className="">
                <div className="empty-space mt-2">
                    <textarea className="w-100 p-2"></textarea>
                </div>
            </Col>
        </Row>
        <Row className="mt-1 mb-1">
            <Col xs="12" sm="12" lg="12" className="change-border-input" >
                <div className="d-flex justify-content-around claim-info pt-1 pb-1">
                    <div className="d-flex">
                        <p className="mb-0 fw-700">Claim allocated to: </p>
                        <div className="d-flex">
                            <i className="cui-map icons font-2xl ml-2"></i>
                            <i onClick={() => setClaimAssign(true)} className="cui-note icons font-2xl ml-2"></i>
                        </div>
                    </div>
                    <div className="d-flex">
                        <p className="mb-0 mr-1 fw-700" style= {{whiteSpace: "nowrap"}}>Claim Allocated on:</p>
                        <Input type="date" size="sm" color="primary" />
                    </div>
                    <div className="d-flex">
                        <p className="mb-0 fw-700" style={{ width: '200px' }}>Claim manager: </p>
                        <Input type="select" size="sm" color="primary">
                            <option>Select</option>
                        </Input>
                    </div>
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm="12" lg="12" className=" change-border-input">
                <div className="d-flex justify-content-around p-3 rounded bg-primary">
                    <div className="d-flex flex-column justify-content-around ">
                        <div className="font-weight-bold">Primary Attourney Assigned</div>
                        <div className="font-weight-bold">Assigned date </div>
                    </div>
                    <div className="d-flex flex-column justify-content-around  persona-data-inputs">
                        <div>
                            <Input type="select" size="sm" color="primary">
                                <option>Select</option>
                            </Input>
                        </div>
                        <div className="d-flex mt-1 justify-content-between pr-3">
                            <Input type="date" size="sm" />
                        </div>
                    </div>
                    <div className="d-flex flex-column justify-content-around">
                        <div className="font-weight-bold">Co-Attourney Assigned</div>
                        <div className="font-weight-bold">Select Assigned date</div>

                    </div>
                    <div className="d-flex flex-column justify-content-around pr-3 persona-data-inputs">
                        <div>
                            <Input type="select" size="sm" color="primary">
                                <option>Select</option>
                            </Input>
                        </div>
                        <div className="d-flex mt-1 justify-content-between ">
                            <Input type="date" size="sm" />
                        </div>
                    </div>
                    <div className="d-flex flex-column justify-content-around">
                        <div className="fs-15 fw-700">In House Counsel </div>
                        <div className="fs-15 fw-700">DFS Complaint/AOB/Legal</div>
                    </div>
                    <div className="d-flex flex-column  justify-content-around persona-data-inputs">
                        <div>
                            <Input type="select" size="sm" color="primary">
                                <option>Select</option>
                            </Input>
                        </div>
                        <div className="mt-1 switch-intake d-flex align-items-center pl-2">No<AppSwitch className={'mx-1'} size="sm" variant={'pill'} color={'success'} checked />Yes</div>
                    </div>
                </div>
            </Col>
        </Row>
        <Row className="mt-2">
            <Col xs="12" sm="12" lg="4" className=" ">
                <div className="d-flex reserve-amoutn p-2 justify-content-around bg-primary rounded" >
                    <div className="d-flex flex-column justify-content-around " >
                        <div className="fs-15 fw-700">Reserve Amount: </div>
                        <div className="fs-15 fw-700">Total paid ammount: </div>
                    </div>
                    <div className="d-flex flex-column  persona-data-inputs ">
                        <div className="fs-15 fw-700">
                            $0.00
                  </div>
                        <div className="mt-1 switch-intake d-flex align-items-center fs-15 fw-700">$0.00</div>
                    </div>
                </div>
            </Col>

            <Col xs="12" sm="12" lg="4" className="d-flex justify-content-between pl-0" style={{ fontWeight: "700" }}>
                <div className="claim-setting">
                    <div className="d-flex flex-column justify-content-around">
                        <span>Claim Review Status </span>
                        <span>Claim Status Open</span>
                    </div>
                    <div className="d-flex flex-column  justify-content-around">
                        <div>
                            <Input type="select" size="sm" color="primary">
                                <option>Select</option>
                            </Input>
                        </div>
                        <div>
                            <Input type="select" size="sm" color="primary">
                                <option>Select</option>
                            </Input>
                        </div>
                    </div>
                </div>
            </Col>
            <Col xs="12" sm="12" lg="4" className="d-flex justify-content-between pl-0" style={{ fontWeight: "700" }}>
                <div className="claim-setting">
                    <div className="d-flex flex-column  justify-content-around">
                        <span>Claim Review Sub-Status </span>
                        <span>Claim Sub-Status </span>
                    </div>
                    <div className="d-flex flex-column  justify-content-around">
                        <div>
                            <Input type="select" size="sm" color="primary">
                                <option>Select</option>
                            </Input>
                        </div>
                        <div>
                            <Input type="select" size="sm" color="primary">
                                <option>Select</option>
                            </Input>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm="12" lg="12" className="mt-3">
                <div className="d-flex justify-content-between fw-700 fs-15 pl-3 pr-5 mr-3">
                    <div>
                        Claim Approved: <input type="radio" className="ml-1 mr-1" name="yes" value={"yes"} />Yes<input type="radio" className="ml-1 mr-1" name="yes" value={"yes"} />No
              </div>
                    <div>
                        Total Loss: <input className="ml-1 mr-1" type="radio" name="" />
                    </div>
                    <div>
                        Right to Repair: <input className="ml-1 mr-1" type="radio" name="" />
                    </div>
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm="12" lg="12" >
                <div className="text-center mt-2" >
                    <Button color="primary" size="sm">SAVE CLAIM</Button>
                    <Button color="primary" size="sm" className="ml-3">CLEAR</Button>
                </div>
            </Col>
        </Row>
        <AssignClaimModal
            isOpen={claimAssign}
            toggle={() => setClaimAssign(false)}
        />
    </>;
}

export default ClaimViewTab;