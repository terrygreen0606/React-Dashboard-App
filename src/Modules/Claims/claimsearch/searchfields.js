import React, { Component } from 'react';
import {  Col, InputGroup, Input, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Searchfields extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: new Array(6).fill(false),
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
            <>
                <Row>
                    <Col xs="12" sm="12" lg="12" className=" input-search-fields mt-4">
                        <div className="d-flex justify-content-around align-items-center  ">
                            <InputGroup>
                                <label >Last Name :&nbsp;</label>
                                <Input color="primary" size="sm" />
                            </InputGroup>
                            <InputGroup className="ml-3">
                                <label >First Name :&nbsp;</label>
                                <Input color="primary" size="sm" />
                            </InputGroup>
                            <InputGroup className="ml-3">
                                <label >Policy No :&nbsp;</label>
                                <Input color="primary" size="sm" />
                            </InputGroup>
                            <InputGroup className="ml-3">
                                <label >Status :&nbsp;</label>
                                <Input type="select" color="primary" size="sm">
                                    <option>Select</option>
                                </Input>
                            </InputGroup>
                        </div>
                        <div className="d-flex w-50 mx-auto justify-content-center align-items-center mt-3">
                            <InputGroup>
                                <label >Claim No :&nbsp;</label>
                                <Input color="primary" size="sm" />
                            </InputGroup>
                            <InputGroup className="ml-3">
                                <label >Claim Type :&nbsp;</label>
                                <Input type="select" color="primary" size="sm">
                                    <option>Select</option>
                                </Input>
                            </InputGroup>
                        </div>

                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" lg="12" className=" input-search-fields mt-4">
                        <div className="icons  d-flex justify-content-center" style={{height:"100px"}}>
                            <NavLink to="#" className={"mr-2 icons-search text-center"}>
                                <i className="cui-magnifying-glass icons font-4xl d-block mt-4 no-underline icons-search"></i>
                                <p className="pt-2" style={{fontSize:"10px"}}>Search</p>
                            </NavLink>
                            <NavLink to="/claimintake" className={"ml-2 no-underline icons-search text-center"}>
                                <i className="icon-plus icons font-4xl d-block mt-4 no-underline icons-search"></i>
                                <p className="pt-2" style={{fontSize:"10px"}}>
                                    Add Claim
                                </p>
                            </NavLink>
                        </div>
                    </Col>
                </Row>
            </>
        );
    }
}

export default Searchfields;
