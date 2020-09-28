import React, { Component } from 'react';
import {Col,Row, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';

import Basicinfo from "./basicinfo";
import Tabs from "./tabs";
import Log from "../log";


class Claimview extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: new Array(17).fill(false),
        };
    }

    toggle(i) {
        const newArray = this.state.dropdownOpen.map((element, index) => {
            return (index === i ? !element : false);
        });
        this.setState({
            dropdownOpen: newArray,
        });
    }
    render() {
        return (
            <div className="animated fadeIn claimintakediff">
                <Row>
                    <Col lg="12" xl="9" className="">
                        <Basicinfo/>
                        <Tabs/>
                    </Col>
                    <Col lg="12" xl="3" className="pl-0 pr-2">
                        <Log/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Claimview;
