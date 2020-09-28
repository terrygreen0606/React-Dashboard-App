import React, {Component} from "react";
import {Col,Row, Button} from 'reactstrap';
class basicinfo extends Component{
    render(){
        return(
            <>
            <div className="claim-view-main">
                <h3 className="font-italic">
                    VH30020414/3/ANALIA CABRAL & RICHARD M PULIDO QUINTAS<br/>
                    915 BASILICA LN KISSIMMEE, POLK, FL, 34759
                </h3>
            </div>
            <div className="blue-back pl-2 pb-1 pr-2 pt-1 mailing-adress bg-primary">
                <i>
                    <span >
                        Mailing Addres: 915 BASILICA LN KISSIMMEE FL, 34759
                    </span>
                    <span className="ml-5">
                        <b> Phone Number: (407) xxx-xxxx</b>
                    </span>
                </i>
            </div>
            <div>
                <div className="mb-2 mt-2 d-flex align-items-end justify-content-between" >
                    <div>
                        <Button className="fw-700" color="secondary" size="sm" style={{opacity:"0.7"}} >20193314</Button>
                        <Button size="sm" color="primary" className="fw-700">20193315</Button>
                    </div>
                    <div className="claim-enter"><span style={{opacity: "0.7"}}>Claim Entered by
                                </span><b> Jair Robles </b> <span style={{opacity: "0.7"}}>on </span> <b>10-25-2019</b><span style={{opacity: "0.7"}}> | Updated by on - </span>
                    </div>
                </div>
            </div>
            <div className="blue-back  w-100 d-flex flex-column pl-2 pb-1 pr-2 pt-1 bg-primary">
                <div className="w-100 d-flex">
                    <div className="d-flex third-block" style={{width:"33%"}}><p className="m-0 w-75">No. of days since reported: </p><span>87</span></div>
                    <div className="d-flex third-block" style={{width:"26%"}}><p className="m-0 w-50">Service Rap: </p> <span></span></div>
                    <div className="d-flex third-block" style={{width:"40%"}}><p className="m-0 w-75">Loss reported since inception: </p> <span></span></div>
                </div>
                <div className="w-100 d-flex">
                    <div className="d-flex third-block" style={{width:"33%"}}><p className="m-0 w-75">Claim status:</p>  <span>Open</span></div>
                    <div className="d-flex third-block" style={{width:"26%"}}><p className="m-0 w-50">Field adjuster:</p> <span>Vance Eskesen</span></div>
                    <div className="d-flex third-block" style={{width:"40%"}}><p className="m-0 "  style={{width:"62%"}}>Policy From: </p><span>HO3 Diamond </span></div>
                </div>
            </div>
            <hr style={{    height: "1px",
                borderTop: "1px solid #A5E65A",
                margin: "7px 0px"}}/>
            <Row className="ml-0">
                <Col xs="12" sm="6" lg="4" >
                    <div className="row justify-content-around" style={{
                        background: "#6A888C",
                        color: "white",
                        fontWeight: "700",borderRadius:"6px"
                    }}>
                        <div>Deductible</div>
                        <div>Ammount</div>
                        <div>Limit</div>
                    </div>
                    <div className="row justify-content-around" style={{
                        background:"#A3EEE7",
                        fontWeight: "700",
                        fontSize:"9px",
                        padding: "5px 0px"

                    }}>
                        <div>Hurricaine Deductible</div>
                        <div style={{marginRight: "18px"}}>$3,000.00</div>
                        <div>2% Deb</div>
                    </div>
                    <div className="row justify-content-around" style={{
                        background:"#D9F2F6",
                        fontWeight: "700",
                        fontSize:"9px",
                        padding: "5px 0px"
                    }}>
                        <div>All other peril Deductible </div>
                        <div style={{marginRight: "18px"}}>$2,500.00</div>
                        <div>$2,500.00</div>
                    </div>
                    <div className="row text-center justify-content-center" style={{
                        background:"#A5E65A",
                        fontSize:"9px",
                        fontWeight: "700",
                        padding: "5px 0px"
                        ,borderRadius:"6px"
                    }}>
                        Click to view inspection images
                    </div>
                </Col>
                <Col xs="12" sm="6" lg="4" className="pl-2 pr-2">
                    <div style={{background:"#D9F1F5",fontWeight:"700",fontSize:"15px", padding: "13px 0px",borderRadius:"6px"}}>
                        <div className="d-flex "><div className="w-75 pl-3">PA Involved</div><div className="w-25 text-center">Yes</div></div>
                        <div className="d-flex "><div className="w-75 pl-3">Attorney Involved</div><div className="w-25 text-center">No</div></div>
                        <div className="d-flex "><div className="w-75 pl-3">AOB Involved</div><div className="w-25 text-center">No</div></div>
                    </div>
                </Col>
                <Col xs="12" sm="6" lg="4" className="pl-0">
                    <div style={{border:"1px solid #A5E65A", padding: "9px 0px",borderRadius:"6px"}}>
                        <h6 className="text-center">COLEMAN INSURANCE AGENCY INC</h6>
                        <p className="mb-0" style={{
                            fontSize: "11px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            fontWeight: "700"
                        }}>
                            <span>Address: 4831 Ruen Dr PALM HARBOR,  FL 34685</span>
                            <span>Phone number: (801) xxx-xxxx</span>
                            <span>Agent Name:  Christopher Coleman </span>
                        </p>
                    </div>
                </Col>
            </Row>
            <hr style={{    height: "1px",
                borderTop: "1px solid #A5E65A",
                margin: "7px 0px"}}/>
            </>
        )
    }
}

export default basicinfo;