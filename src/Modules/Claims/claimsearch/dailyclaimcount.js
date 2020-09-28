import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col} from 'reactstrap';



class dailyclaimcount extends Component {

    render() {
        return (
            <Col xs="12" sm="12" lg="6" className=" input-search-fields d-flex justify-content-center mt-4">
                <div className="last-trans d-flex align-items-center" style={{width:"60%"}}>
                    <Card className="w-100 border-primary" >
                        <CardHeader className="bg-white border-bottom ">
                            <h4 className="text-dark"> Todays claim count</h4>
                        </CardHeader>
                        <CardBody className="d-flex justify-content-around align-items-center">
                            <div>
                                <a href="#">20200135</a><br/>
                                <a href="#">20200135</a><br/>
                                <a href="#">20200135</a><br/>
                                <a href="#">20200135</a><br/>
                                <a href="#">20200135</a><br/>
                                <a href="#">20200135</a><br/>
                                <a href="#">20200135</a><br/>
                                <a href="#">20200135</a><br/>
                            </div>
                            <div>
                                <h1>13</h1>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        );
    }
}

export default dailyclaimcount;
