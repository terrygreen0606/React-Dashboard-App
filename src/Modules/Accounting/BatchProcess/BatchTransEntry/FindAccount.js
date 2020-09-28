import React, { Component } from 'react'
import { Row, Col, Input, Button, FormGroup, InputGroup, InputGroupAddon, InputGroupText, NavLink } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class FindAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            address: '',
            pageTemp: 1,
            sizePerPage: 10,
            calledApi: false
        };
    }

    componentWillReceiveProps(){
        if(this.props.searchAccountData != []){
            this.state.calledApi = false;
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    searchAccount = () => {
        const { firstName, lastName, address, pageTemp, sizePerPage } = this.state;
        const params = {
            firstName, lastName, address, pageTemp, sizePerPage
        }
        this.setState({calledApi: true},()=>{
            this.props.getAccountFunc(params);
        });
    }

    // setting state on change size per page
    sizePerPageListChange(sizePerPage) {
        this.setState({ sizePerPage: sizePerPage }, () => {
            const { firstName, lastName, address, pageTemp } = this.state;
            const params = {
                firstName, lastName, address, pageTemp, sizePerPage
            }
            this.setState({calledApi: true},()=>{
                this.props.getAccountFunc(params);
            });
        });
    }

    onPageChange(page, PageSize) {
        this.setState({ pageTemp: page }, () => {
            const { firstName, lastName, address, sizePerPage } = this.state;
            const pageTemp = this.state.pageTemp;
            const params = {
                firstName, lastName, address, pageTemp, sizePerPage
            }
            this.setState({calledApi: true},()=>{
                this.props.getAccountFunc(params);
            });
        });
    }

    policyNoLink(cell, row, enumObject, rowIndex) {
        // s_SourceUniqueId,s_FullLegalName
        return (
            <NavLink href="#" style={{padding:"0px"}} onClick={() => this.props.setAcctNoName(row.s_SourceUniqueId,row.s_FullLegalName)}>
                {row.s_SourceUniqueId}
            </NavLink >
        )
    }

    // Close opened modal
    closeModal = () => {
        this.props.toggle();
    }

    render() {
        const options = {
            page: this.state.pageTemp,
            sizePerPage: this.state.sizePerPage,  // which size per page you want to locate as default
            paginationShowsTotal: true,  // Accept bool or function
            onPageChange: this.onPageChange.bind(this),
            onSizePerPageList: this.sizePerPageListChange.bind(this)
        };

        var table;
        if (this.state.calledApi == true) {
            table = (
                <div className="sk-three-bounce">
                    <div className="sk-child sk-bounce1"></div>
                    <div className="sk-child sk-bounce2"></div>
                    <div className="sk-child sk-bounce3"></div>
                    <h4>Laoding</h4>
                </div>
            );
        } else {
            table = (
                <BootstrapTable data={this.props.searchAccountData} remote={true} striped hover options={options} pagination={true} fetchInfo={{ dataTotalSize: this.props.totalCount }}>
                    <TableHeaderColumn isKey dataField="s_SourceUniqueId" width="130" dataFormat={this.policyNoLink.bind(this)} dataSort>POLICY NO</TableHeaderColumn>
                    <TableHeaderColumn dataField="s_FullLegalName" >NAME</TableHeaderColumn>
                    <TableHeaderColumn dataField="s_CityCode" dataSort>CITY</TableHeaderColumn>
                    <TableHeaderColumn dataField="s_StateCode" dataSort>STATE</TableHeaderColumn>
                    <TableHeaderColumn dataField="s_PostalCode" dataSort>ZIP</TableHeaderColumn>
                    <TableHeaderColumn dataField="s_CountyCode" dataSort>COUNTY</TableHeaderColumn>
                    <TableHeaderColumn dataField="s_PolicyStatusCode" dataSort>STATUS</TableHeaderColumn>
                </BootstrapTable>
            );
        }

        return (
            <React.Fragment>
                <Row>
                    <Col md='12' className="pull-right"><i className="fa fa-times" onClick={this.closeModal}></i></Col>
                </Row>
                <h4 className="text-center" style={{ width: "100%" }}>Find Account</h4>
                <hr />
                <Row>
                    <Col md="4">
                        <FormGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>First Name</InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" id="firstName" name="firstName" placeholder="Enter First Name" onChange={this.handleChange} disabled={this.state.calledApi}/>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="4">
                        <FormGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Last Name</InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" id="lastName" name="lastName" placeholder="Enter Last Name" onChange={this.handleChange} disabled={this.state.calledApi}/>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md="4">
                        <FormGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Address</InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" id="address" name="address" placeholder="Enter Address" onChange={this.handleChange} disabled={this.state.calledApi}/>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="12" className="text-center">
                        <Button type="button" color="primary" className="btn-sm" onClick={this.searchAccount} disabled={this.state.calledApi}><i className="fa fa-search"></i>&nbsp;&nbsp;Search</Button>
                    </Col>
                </Row><br/>
                {table}
            </React.Fragment>
        )
    }
}

export default FindAccount;