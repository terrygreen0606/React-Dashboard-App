import React, {Component}  from "react";
import {Col,Row, Button} from 'reactstrap';
import { AppSwitch } from '@coreui/react'

class tabs extends Component{


    render(){
        return(
            <>
            <h4 className="text-center">Status Updated Log</h4>
            <div style={{border: "1px solid #7FD2DF", borderRadius: "17px"}}>
                <div className="text area empty d-flex flex-column m-2">
                                <textarea name="" id="" cols="30" rows="10" style={{
                                    borderRadius: "11px",
                                    background: "rgb(245, 245, 245)",
                                    border: "1px solid #80808099",
                                    padding: "10px",
                                    resize: "none",
                                    height:"120px"
                                }}>
                                </textarea>
                    <div className="mt-2">
                        <Button color="primary" size="sm" className="rounded"> Add log</Button>
                    </div>
                </div>
                <div className="table">
                    <div className="header d-flex fw-700" style={{fontSize:"12px"}}>
                        <div className="w-25 pt-2 pb-2 pl-2 pr-2 d-flex align-items-end">DATE</div>
                        <div className="w-50 pt-2 pb-2 d-flex align-items-end">DESCRIPTION</div>
                        <div className="w-25 pr-2 pt-2 pb-2 d-flex align-items-end">INSERTED BY</div>
                    </div>
                    <hr style={{    height: "1px",
                        borderTop: "2px solid #707070",
                        margin: "0px 3px 0px 3px"}}/>
                    <div className="table-rows">
                        <div className="body d-flex" style={{fontSize:"10px",fontWeight:"700"}}>
                            <div className="date w-25 p-2 d-flex align-items-center" ></div>
                            <div className="description w-50 pt-2 pr-2"> </div>
                            <div className="insertedby w-25 pr-2 pt-2 d-flex align-items-center"></div>
                        </div>
                        <div className="body d-flex" style={{fontSize:"10px",fontWeight:"700"}}>
                            <div className="date w-25 p-2 align-items-center">11-24-2019        21:32:41 </div>
                            <div className="description w-50 pt-2 pr-2">SOUTHERN ROOFING : Work Completed </div>
                            <div className="insertedby w-25 pr-2 pt-2 d-flex align-items-center">SOUTHERN ROOFING11</div>
                        </div>
                        <div className="body d-flex" style={{fontSize:"10px",fontWeight:"700"}}>
                            <div className="date w-25 p-2 pr-2  d-flex align-items-center">11-24-2019        21:32:41 </div>
                            <div className="description w-50 pt-2">SOUTHERN SAFE CONSTRUCTION LLC : Invoice Upload
                            </div>
                            <div className="insertedby w-25 pr-2 pt-2 d-flex align-items-center">SOUTHERN ROOFING11</div>
                        </div>
                        <div className="body d-flex" style={{fontSize:"10px",fontWeight:"700"}}>
                            <div className="date w-25 p-2 pr-2 d-flex align-items-center">11-24-2019        21:32:41 </div>
                            <div className="description w-50 pt-2">SOUTHERN SAFE CONSTRUCTION LLC : Invoice Upload
                            </div>
                            <div className="insertedby w-25 pr-2 pt-2 d-flex align-items-center">SOUTHERN ROOFING11</div>
                        </div>
                        <div className="body d-flex" style={{fontSize:"10px",fontWeight:"700"}}>
                            <div className="date w-25 p-2  d-flexalign-items-center">11-24-2019        21:32:41 </div>
                            <div className="description w-50 pt-2 pr-2" >SOUTHERN SAFE CONSTRUCTION LLC : Assigned to contractor for Estimamtes </div>
                            <div className="insertedby w-25 pr-2 pt-2 d-flex align-items-center">Deiby Callejas</div>
                        </div>
                        <div className="body d-flex" style={{fontSize:"10px",fontWeight:"700"}}>
                            <div className="date w-25 p-2 d-flex align-items-center">11-24-2019        21:32:41 </div>
                            <div className="description w-50 pt-2 pr-2"> Reviewing inspection report for coverage  </div>
                            <div className="insertedby w-25 pr-2 pt-2 d-flex align-items-center">SOUTHERN ROOFING11</div>
                        </div>
                        <div className="body d-flex" style={{fontSize:"10px",fontWeight:"700"}}>
                            <div className="date w-25 p-2 d-flex  align-items-center">11-24-2019        21:32:41 </div>
                            <div className="description w-50 pt-2 pr-2">3-Way call between Noel Smith from Claims department, Cristian Rios from Dispatch department, and Vance Eskessen from Field Adjusters. It couldn't be determined if the claim is compensable or not during the call. Based on the loss report, Claim Manager suggested running estimates.
                            </div>
                            <div className="insertedby w-25 pr-2 pt-2 d-flex align-items-center">María Diazgranados
                            </div>
                        </div>
                        <div className="body d-flex" style={{fontSize:"10px",fontWeight:"700"}}>
                            <div className="date w-25 p-2 d-flex align-items-center">11-24-2019        21:32:41 </div>
                            <div className="description w-50 pt-2 pr-2">SOUTHERN ROOFING : Work Completed </div>
                            <div className="insertedby w-25 pr-2 pt-2 d-flex align-items-center">María Diazgranados
                            </div>
                        </div>
                        <div className="body d-flex" style={{fontSize:"10px",fontWeight:"700"}}>
                            <div className="date w-25 p-2 d-flex align-items-center ">11-24-2019        21:32:41 </div>
                            <div className="description w-50 pt-2 pr-2">Spoke with Leo the PA, field adjuster visit and roof inspection scheduled for Oct 31st at 10.00. Vance is already aware of the appointment, since I called Him. Roof Inspector Assigned Felipe Rivelles
                            </div>
                            <div className="insertedby w-25 pr-2 pt-2 d-flex align-items-center">María Diazgranados
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            </>
        )
    }

}


export default tabs;



