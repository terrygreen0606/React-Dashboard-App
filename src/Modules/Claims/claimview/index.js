import React, { Component } from 'react';
import {Col,Row,Table} from 'reactstrap';
import Basicinfo from "./viewdetails";
import Tabs from "./infotabs";
import Log from "../log";

class Claimview extends Component {
    render() {

        return (
            <div className="animated fadeIn claimviewdiff">
                <Row>
                    <Col xs="12" sm="6" lg="8" className="pr-2">
                        <Basicinfo/>
                        <Tabs/>
                    </Col>
                    <Col xs="12" sm="6" lg="4" className="pl-0 pr-2">
                        <Log/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Claimview;
