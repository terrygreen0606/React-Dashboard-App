import React, {Component} from "react";
import {Col,Row, Button} from 'reactstrap';
class basicinfo extends Component{
    render(){
        return(
            <>
            <div className="claim-view-main d-flex justify-content-between align-items-end">
                <h3 className="font-italic">
                    VH30020414/3/ANALIA CABRAL & RICHARD M PULIDO QUINTAS<br/>
                    915 BASILICA LN KISSIMMEE, POLK, FL, 34759
                </h3>
                <div className="mb-2">
                    <Button color="primary" outline className="mr-2" >
                        20193314
                    </Button>
                    <Button color="primary" outline >
                        20193315
                    </Button>
                </div>
            </div>
            <div className="blue-back pl-2 pb-1 pr-2 pt-1 mailing-adress bg-primary">
                <i>
                <span >
                    <b>Mailing Addres: 915 BASILICA LN KISSIMMEE FL, 34759</b>
                </span>
                <span className="ml-5">
                    <b>Phone Number: (407) xxx-xxxx</b>
                </span>
                </i>
            </div>
            <div>
                <div className="mb-1 mt-! d-flex align-items-end justify-content-end claim-enter op-7" >
                    <div>
                        <span>Claim Entered by on | Updated by on - </span>
                    </div>
                </div>
            </div>
            <div className="blue-back  w-100 d-flex flex-column pl-2 pb-1 pr-2 pt-1 letter-spacing-1 bg-primary">
                <div className="w-100 d-flex">
                    <div className="d-flex third-block" style={{width:"33%"}}><p className="m-0 w-75">No. of days since reported: </p><span>&nbsp;</span></div>
                    <div className="d-flex third-block" style={{width:"26%"}}><p className="m-0 w-50">Service Rap: </p> <span>&nbsp;</span></div>
                    <div className="d-flex third-block" style={{width:"40%"}}><p className="m-0 w-75">Loss reported since inception: </p> <span>&nbsp;</span></div>
                </div>
                <div className="w-100 d-flex">
                    <div className="d-flex third-block" style={{width:"33%"}}><p className="m-0 w-75">Claim status:</p>  <span>&nbsp;</span></div>
                    <div className="d-flex third-block" style={{width:"26%"}}><p className="m-0 w-50">Field adjuster:</p> <span>&nbsp;</span></div>
                    <div className="d-flex third-block" style={{width:"40%"}}><p className="m-0 "  style={{width:"62%"}}>Policy From: </p><span>HO3 Diamond </span></div>
                </div>
            </div>

            <Row className="mb-1 mt-2">
                <Col xs="12" sm="12" lg="12" className="">
                    <div className="d-flex COLEMAN-INSURANCE p-2 pr-5 justify-content-between border border-primary rounded">
                        <p className="mb-0 ">COLEMAN INSURANCE AGENCY INC</p>
                        <p className="mb-0 ">
                            <span className="pr-4">Address: 4831 Ruen Dr PALM HARBOR,  FL 34685</span>
                            <span className="pr-4">Phone number: (801) xxx-xxxx</span>
                            <span className="">Agent Name:  Christopher Coleman </span>
                        </p>
                    </div>
                </Col>
            </Row>
            </>
        )
    }
}
export default basicinfo;