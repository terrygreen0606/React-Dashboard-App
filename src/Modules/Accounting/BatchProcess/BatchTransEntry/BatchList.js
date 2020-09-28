import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as BatchProcessService from '../../../../services/batchProcessService';
import { convertDateMMDDYYYY, convertAmount } from '../../../../services/commanServices';
import { NavLink, Card, CardHeader, CardBody, Row, Col, Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import BatchListInner from './BatchListInner';
import PostBatchAcctDate from './PostBatchAcctDate';

class BatchList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            batchNo: '',
            fromDate: '',
            toDate: '',
            batchStatus: 'PENDING',
            tempBatchStatus: 'PENDING',
            pageTemp: 1,
            sizePerPageTemp: 10,
            calledApi: false,
            actionType: '',
            BDApiCalled: false,
            alert: null,
        };
        this.batchDetailsData = [];
        this.batchDetailsTotalCount = 0;
    }

    componentWillMount() {
        const { batchNo, fromDate, toDate, batchStatus, pageTemp, sizePerPageTemp } = this.state;

        const params = {
            batchNo, fromDate, toDate, batchStatus, pageTemp, sizePerPageTemp
        }
        this.filterTable(params);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { batchNo, fromDate, toDate, batchStatus, pageTemp, sizePerPageTemp } = this.state;

        const params = {
            batchNo, fromDate, toDate, batchStatus, pageTemp, sizePerPageTemp
        }
        this.filterTable(params);
    }

    filterTable(params) {
        this.state.tempBatchStatus = this.state.batchStatus;
        this.setState({ calledApi: true }, () => {
            this.props.dispatch(BatchProcessService.getBatchMaster(params))
                .then((res) => {
                    this.setState({ calledApi: false });
                });
        });
    }

    dateFormatter(cell, row) {
        return convertDateMMDDYYYY(cell, 'MM-DD-YYYY') // Converting Date into MM/DD/YYYY
    }

    convertAmt(cell, row) {
        return convertAmount(cell);
    }

    getBatchDetails(row, action) {
        this.setState({ actionType: action });
        this.setState({ BDApiCalled: true }, () => {
            this.props.dispatch(BatchProcessService.getBatchDetails(row.n_PABatchMaster_PK))
                .then((res) => {
                    // Batch Details Data
                    if(res.returnObject != null){
                        this.batchDetailsData = res.returnObject;
                        this.batchDetailsTotalCount = res.returnCount;
                    }
                    this.setState({ BDApiCalled: false });
                });
        });
    }

    batchNoLink(cell, row, enumObject, rowIndex) {
        return (
            <NavLink href="#" style={{ padding: "0px" }} onClick={() => this.getBatchDetails(row, 'DATA')}>
                {row.s_PABatchNo}
            </NavLink >
        )
    }

    // Creating Action Links
    actionsButtons(cell, row) {
        let linkBtn = null;
        if(this.state.tempBatchStatus != 'POSTED'){
            linkBtn = (
                <React.Fragment>
                    <a href="#" style={{ padding: "0px" }} onClick={(e) => { e.preventDefault(); this.getPostBatchAcctDate(row) }}>
                        Post
                    </a>
                    &nbsp;|&nbsp;
                    <a href="#" style={{ padding: "0px" }} onClick={(e) => { e.preventDefault(); this.props.batchListActionLink(row, 'EDIT') }}>
                        Edit
                    </a>
                    &nbsp;|&nbsp;
                    <a href="#" style={{ padding: "0px" }} onClick={(e) => { e.preventDefault(); this.getBatchDetails(row, 'VERIFY') }}>
                        VerifyView
                    </a>
                </React.Fragment>
            );
        }else{
            linkBtn = (
                <React.Fragment>
                    <a href="#" style={{ padding: "0px" }} onClick={(e) => { e.preventDefault(); /*this.getPostBatchAcctDate(row)*/ }}>
                        Print
                    </a>
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                {linkBtn}
            </React.Fragment>
        )
    }

    closePostBatchAlert = (isPosted) => {
        if (isPosted) {
            const { batchNo, fromDate, toDate, batchStatus, pageTemp, sizePerPageTemp } = this.state;

            const params = {
                batchNo, fromDate, toDate, batchStatus, pageTemp, sizePerPageTemp
            }
            this.filterTable(params);
        }
        this.setState({ alert: null });
    }

    getPostBatchAcctDate(rowData) {
        const getPostBatchAlert = () => (
            <PostBatchAcctDate batchMasterPK={rowData.n_PABatchMaster_PK} closePostAlert={this.closePostBatchAlert} NBtoggleFun={() => this.props.NBtoggleFun} />
        )
        this.setState({ alert: getPostBatchAlert() });
    }

    // setting state on change size per page
    sizePerPageListChange(sizePerPage) {
        this.setState({ sizePerPageTemp: sizePerPage }, () => {
            const { batchNo, fromDate, toDate, batchStatus, pageTemp } = this.state;
            const sizePerPageTemp = this.state.sizePerPageTemp;
            const params = {
                batchNo, fromDate, toDate, batchStatus, pageTemp, sizePerPageTemp
            }
            this.filterTable(params);
        });
    }

    onPageChange(page, sizePerPage) {
        this.setState({ pageTemp: page }, () => {
            const { batchNo, fromDate, toDate, batchStatus, sizePerPageTemp } = this.state;
            const pageTemp = this.state.pageTemp;
            const params = {
                batchNo, fromDate, toDate, batchStatus, pageTemp, sizePerPageTemp
            }
            this.filterTable(params);
        });
    }

    render() {
        // Batch Master Data
        this.tableData = this.props.batchMasterData;
        this.totalSize = this.props.totalCount;

        const options = {
            page: this.state.pageTemp,  // which page you want to show as default
            sizePerPageList: [
                { text: '10', value: 10 },
                { text: '20', value: 20 },
                { text: 'All', value: 0 }
            ], // you can change the dropdown list for size per page
            sizePerPage: this.state.sizePerPageTemp,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            //paginationSize: 5,  // the pagination bar size.
            //prePage: 'Prev', // Previous page button text
            //nextPage: 'Next', // Next page button text
            paginationShowsTotal: true,  // Accept bool or function
            //paginationPosition: 'top'  // default is bottom, top and both is all available
            // hideSizePerPage: true > You can hide the dropdown for sizePerPage
            // alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
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
                <BootstrapTable data={this.tableData} remote={true} striped hover options={options} pagination={true} fetchInfo={{ dataTotalSize: this.totalSize }}>
                    <TableHeaderColumn isKey dataField="s_PABatchNo" dataSort width="130" dataFormat={this.batchNoLink.bind(this)}>Batch No</TableHeaderColumn>
                    <TableHeaderColumn dataField="s_CompanyName" tdStyle={{ whiteSpace: 'normal' }} width="200">Issue Co.</TableHeaderColumn>
                    <TableHeaderColumn dataField="s_BatchTranTypeCode" dataSort>Tran. Type</TableHeaderColumn>
                    <TableHeaderColumn dataField="s_BatchTranSubTypeCode" dataSort>Sub Type</TableHeaderColumn>
                    <TableHeaderColumn dataField="d_BatchAccountingDate" dataFormat={this.dateFormatter} dataSort>Acct. DT</TableHeaderColumn>
                    <TableHeaderColumn dataField="NoofEntries" dataSort width="90">Entries</TableHeaderColumn>
                    <TableHeaderColumn dataField="TotalAmt" dataFormat={this.convertAmt} headerAlign='left' dataAlign='right' dataSort>Amount</TableHeaderColumn>
                    <TableHeaderColumn dataField="s_BatchStatusCode" dataSort>Status</TableHeaderColumn>
                    <TableHeaderColumn dataField="d_BatchStatusDate" dataFormat={this.dateFormatter} dataSort>STatus DT</TableHeaderColumn>
                    <TableHeaderColumn dataField="" dataSort>Bank Name</TableHeaderColumn>
                    <TableHeaderColumn dataFormat={this.actionsButtons.bind(this)} tdStyle={{ whiteSpace: 'normal' }}>Actions</TableHeaderColumn>
                </BootstrapTable>
            );
        }

        // Batch Details DataTable
        var bdTable;
        if (this.state.BDApiCalled == true) {
            bdTable = (
                <div className="sk-three-bounce">
                    <div className="sk-child sk-bounce1"></div>
                    <div className="sk-child sk-bounce2"></div>
                    <div className="sk-child sk-bounce3"></div>
                    <h4>Laoding</h4>
                </div>
            );
        } else {
            bdTable = (
                <BatchListInner actionType={this.state.actionType} batchDetailsData={this.batchDetailsData} batchDetailsTotalCount={this.batchDetailsTotalCount} />
            );
        }

        return (
            <React.Fragment>
                <Card body>
                    <Form method="POST" onSubmit={this.handleSubmit}>
                        <Row>
                            <Col md="3">
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>Batch No.</InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" id="batchNo" name="batchNo" placeholder="Enter Batch number" onChange={this.handleChange} />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>From Date</InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="date" id="fromDate" name="fromDate" onChange={this.handleChange} />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>To Date</InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="date" id="toDate" name="toDate" onChange={this.handleChange} />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>Batch Status</InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="select" name="batchStatus" id="batchStatus" onChange={this.handleChange}>
                                            <option value="PENDING">Pending</option>
                                            <option value="POSTED">Posted</option>
                                        </Input>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12" className="text-center">
                                <Button type="submit" size="md" color="primary"><i className="fa fa-search"></i> Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <Card className="card-accent-primary">
                    <CardHeader>
                        <strong>Batches</strong>
                    </CardHeader>
                    <CardBody>
                        {table}
                    </CardBody>
                </Card>
                <Card className="card-accent-primary">
                    <CardHeader>
                        <strong>Batche Details</strong>
                    </CardHeader>
                    <CardBody>
                        {bdTable}
                    </CardBody>
                </Card>
                {this.state.alert}
            </React.Fragment>
        )
    }
}

BatchList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    batchMasterData: PropTypes.array.isRequired,
    totalCount: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
    batchMasterData: state.BatchProcess.batchMasterData,
    totalCount: state.BatchProcess.totalCount,
});

export default connect(mapStateToProps)(BatchList);