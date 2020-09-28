import React, {Component} from "react";
import {Col,Row ,Nav, NavItem, NavLink,TabContent} from 'reactstrap';
class infotabs extends Component{
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: new Array(1).fill('1'),
        };
    }

    lorem() {
        return <>
        <Row className="mt-2">
            <Col xs="12" sm="12" lg="5" className="pr-0 ">
                <div className="d-flex blue-back bg-primary rounded"  style={{    fontSize: "11px", fontWeight: "700",padding: "11px 8px", borderRadius:"7px"}}>
                    <div className="d-flex flex-column" >
                        <span>Select Location: </span>
                        <span>Primary phone number :</span>
                        <span>Secondary phone number: </span>
                        <span>Email: Acrpq@gmail.com</span>
                    </div>
                    <div className="d-flex flex-column" >
                        <span>915 Basilica LN, Kissimmee</span>
                        <span>(801) xxx xxxx Aceept SMS : YES</span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </Col>
            <Col xs="12" sm="12" lg="7" className="pl-1"  style={{ fontSize: "13px", fontWeight: "700"}}>
                <div className="d-flex blue-back bg-primary" style={{ padding: "14px 10px",borderRadius:"6px"}}>
                    <div className="d-flex flex-column w-25">
                        <span>Claim Type </span>
                        <span>Date of Loss</span>
                        <span>Catastrophe Loss </span>

                    </div>
                    <div className="d-flex flex-column w-25">
                        <span>Roof Leak - Stain</span>
                        <span>09-10-2017</span>
                        <span>Yes</span>

                    </div>
                    <div className="d-flex flex-column w-25">
                        <span>Type of Loss  </span>
                        <span>Service Rep</span>
                        <span>Event Name  </span>

                    </div>
                    <div className="d-flex flex-column w-25">
                        <span>Property</span>
                        <span></span>
                        <span>IRMA</span>

                    </div>
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm="12" lg="12" className="mt-1">
                <div style={{background:"#D9F1F5",padding:"10px 0px" ,borderRadius:"6px"}} className="d-inline-flez">
                    <div className="d-flex justify-content-between pl-2 pr-5">
                        <p className="mb-0 fw-700 fs-13">Name : FLORIDA CLAIMS ADJUSTERS, INC.</p>
                        <p className="mb-0 fw-700 fs-13">Address: 7971 rivera Blvd,Miramar, Broward</p>
                    </div>
                    <div className="d-flex justify-content-between pl-2 pr-5">
                        <p className="mb-0 fw-700 fs-13">Phone: (305) xxx xx-xx</p>
                        <p className="mb-0 fw-700 fs-13">Fax: (954) xxx xx-xx</p>
                        <p className="mb-0 fw-700 fs-13">Email: Romanconsul@noemail.com </p>
                    </div>
                </div>
            </Col>
        </Row>
        <Row className="mt-1">
            <Col xs="12" sm="12" lg="12">
                <div className="rounded" style={{backgroundColor:"#6A888C" }}>
                    <h6 className="text-center text-white  mb-0 pt-1 pb-1 " style={{ fontWeight:"700", fontSize:"15px"}}>Description of Loss</h6>
                </div>
                <div>
                    <p className="pt-2 pb-3" style={{ fontSize: "12px" }}>
                        (Coverage confirmed on the IPX) Talked to Sherill (305) 783-9497 from Florida claims adjusters (3-tab shingle - one-story property - no tarp over the roof) She stated there´s wind damage to the roof, some of
                        the shingles are loose, she doesn't know if this caused leaks inside the property, she doesn't know if the NI has contacted a 3rd party company, she stated this was al the information provided to her on the
                        report, she didn't have any other details. Sherill advised that Francisco Rodriguez (305) 783-9497 is the PA in charge of the claim, any further documentation should be with him. No more details provided by
                        Sherill. What are you doing to mitigate the damages? Didn´t know. Did you contact a 3rd party company? Didn´t know. Have you taken any measures to prevent further damages? Didn´t know. Why did it take
                        so long to report? Didn´t know. PA/Attorney agreed to the RTR speech, if compensable. Unable to set up the inspection with the field adjuster since Sherill was not aware of the availability of their adjuster, she
                        advised that we needed to contact Francisco Rodriguez (305) 783-9497 romaconsultingfirm@gmail.com to set up the inspection. Assigned Vance Eskesen so he can contact Mr. Rodriguez and set up the
                        inspection as soon as possible.
                    </p>
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm="12" lg="12" >
                <div className="blue-back bg-primary" style={{ fontWeight:"700",
                    fontSize: "11px",
                    padding: "5px",
                    display: "flex",
                    justifyContent: "space-between",borderRadius:"7px"
                }}>
                    <span>Claim alocated to: Vance Eskesen (863) xxx-xx xx On 10-25-2019 </span>
                    <span>Date first visited: 10-30-2019 </span>
                    <span>Claim manager: Noel Smith </span>
                    <span>Claim number: 20193315</span>
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm="12" lg="12">
                <div className="d-flex  mt-1 mb-1" style={{background:"rgb(217, 241, 245)",
                    fontWeight:"700",
                    fontSize: "11px",
                    padding: "4px 4px",
                    display: "flex",
                    justifyContent: "space-evenly",borderRadius:"7px"}}>
                    <span>Primary Attorney:  </span>
                    <span>Co- Attourney Assigned  </span>
                    <span>Assigned 00-00-000 </span>
                    <span>In house counsil:</span>
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm="12" lg="12"  >
                <div className="blue-back bg-primary" style={{ fontWeight:"700",
                    fontSize: "11px",
                    padding: "4px 4px",
                    display: "flex",
                    justifyContent: "space-evenly",borderRadius:"7px"
                }}>
                    <span>Reserve Amount: $9,941.92  </span>
                    <span>Total paid ammount: <span style={{color:"red"}}>$(2,391.92)</span> </span>
                    <span>Claim Approved : </span>
                </div>

            </Col>
        </Row>
        <Row className=" mt-2">
            <Col xs="12" sm="12" lg="8" className="d-flex pr-1 " style={{fontWeight:"700"}}>
                <div style={{ justifyContent: "space-between",width:"100%",display:'flex',
                    fontSize: "13px",border: "1px solid #7FD2DF",
                    borderRadius: "5px",
                    padding: "7px 10px"}}>
                    <div className="d-flex flex-column">
                        <span>Claim Review Status</span>
                        <span>Claim Status Open</span>
                    </div>
                    <div className="d-flex flex-column">
                        <span style={{color:"blue"}}>   [View All Review] </span>
                        <span style={{color:"blue"}}>  [View All Status] </span>
                    </div>
                    <div className="d-flex flex-column">
                        <span > Claim Review Sub-Status:  </span>
                        <span > Claim Sub-Status</span>
                    </div>
                    <div className="d-flex flex-column">
                        <span style={{color:"blue"}}> [View All Review]    </span>
                        <span style={{color:"blue"}}> [View All Review]  </span>
                    </div>
                </div>
            </Col>
            <Col xs="12" sm="12" lg="4" className="d-flex justify-content-between pl-0" style={{fontWeight:"700"}}>
                <div  style={{ justifyContent: "space-between",width:"100%",display:'flex',
                    fontSize: "13px",border: "1px solid #7FD2DF",
                    borderRadius: "5px",
                    padding: "7px 10px"}}>
                    <div className="d-flex flex-column">
                        <span>Total Loss </span>
                        <span>Right to Repair</span>
                    </div>
                    <div className="d-flex flex-column">
                        <span>  NO</span>
                        <span>  NO</span>
                    </div>
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm="12" lg="12">
                <div className="text-center mt-2" >
                    <button className="btn btn-secondary mr-1" style={{fontWeight:"700", fontSize:"12px", padding: "4px 21px"}}>EDIT</button>
                    <button className="btn btn-secondary ml-1" style={{fontWeight:"700",fontSize:"12px",padding: "4px 21px"}}>ADD NEW</button>
                </div>
            </Col>
        </Row>
        </>
    }

    toggle(tabPane, tab) {
        const newArray = this.state.activeTab.slice()
        newArray[tabPane] = tab
        this.setState({
            activeTab: newArray,
        });
    }



    render(){
        return(
            <>
            <Row>
                <Col  xs="12" sm="12" lg="12" className="d-flex justify-content-between flex-column claimview-tabs ">
                    <Nav tabs>
                        <NavItem>
                            <NavLink className="btn"
                                     active={this.state.activeTab[0] === '1'}
                                     onClick={() => { this.toggle(0, '1'); }}
                            >
                                Claim view
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="btn"
                                     active={this.state.activeTab[0] === '2'}
                                     onClick={() => { this.toggle(0, '2'); }}
                            >
                                Payments
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="btn"  active={this.state.activeTab[0] === '3'}
                                     onClick={() => { this.toggle(0, '3'); }}
                            >
                                Attachments
                            </NavLink>
                        </NavItem>
                    <NavItem>
                            <NavLink className="btn"  active={this.state.activeTab[0] === '4'}
                                     onClick={() => { this.toggle(0, '4'); }}
                            >
                                Asso. Party
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="btn"  active={this.state.activeTab[0] === '5'}
                                     onClick={() => { this.toggle(0, '5'); }}
                            >
                                Add. Info
                            </NavLink>
                        </NavItem>
                            <NavItem>
                                    <NavLink className="btn"  active={this.state.activeTab[0] === '6'}
                                             onClick={() => { this.toggle(0, '6'); }}
                                    >
                                        Roof Sketch
                                    </NavLink>
                             </NavItem>
                            <NavItem>
                            <NavLink className="btn"  active={this.state.activeTab[0] === '7'}
                                     onClick={() => { this.toggle(0, '7'); }}
                                    >
                                Assign Work
                            </NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink className="btn"  active={this.state.activeTab[0] === '8'}
                                     onClick={() => { this.toggle(0, '8'); }}
                            >
                                Complaint LOG
                            </NavLink>
                                </NavItem>
                        </Nav>
                    <TabContent activeTab={this.state.activeTab[0]} className="border-0">
                        {this.lorem()}
                    </TabContent>


                </Col>
            </Row>
            </>
        )
    }
}
export default infotabs;