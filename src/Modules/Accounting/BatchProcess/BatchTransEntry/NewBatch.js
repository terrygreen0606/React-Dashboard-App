import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as BatchProcessService from '../../../../services/batchProcessService';
import { Label, Row, Col, Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';
import NewBatchInner from './NewBatchInner';
import { toastAction } from '../../../../store/actions/toast-actions';

class NewBatch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            batchMasterPK: this.props.selectedBatchMaster,
            issueComp: '',
            transType: '',
            transSubtype: '',
            acctDate: '',
            noOfRows: 0,
            calledApi: false
        };
    }

    componentWillMount() {
        this.getData(); // before mounting get dropdown data ( along with batch master data if pk exist )
    }

    getData() {
        this.setState({ calledApi: true }, () => {
            this.props.dispatch(BatchProcessService.editBatchDetails(this.state.batchMasterPK))
                .then((res) => {
                    if(res.length != 0){
                        if(res.bdCount != 0){ // setting dropdown
                            const {n_CompanyId_FK,s_BatchTranTypeCode,s_BatchTranSubTypeCode,d_BatchAccountingDate} = res.returnObject[0];
                            this.setState({ noOfRows: res.bdCount,issueComp:n_CompanyId_FK,transType:s_BatchTranTypeCode,transSubtype:s_BatchTranSubTypeCode,acctDate:d_BatchAccountingDate,calledApi: false });
                        }
                    }else{
                        this.setState({calledApi: false});
                    }
                });
        });
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => {
            if (name == "transType") {
                this.getSubTransType(value);
            }
        });
    }

    handleSubmit = (e) => { // Saving New Batch Details
        e.preventDefault();

        const childState = this.NewBatchInner.state.rows; // get all child state
        const {batchMasterPK,issueComp,transType,transSubtype,acctDate,noOfRows} = this.state; // local state

        const params = { // marge together as params
            batchMasterPK,issueComp,transType,transSubtype,acctDate,childState,noOfRows
        }
        //console.log(params);return false;
        this.setState({ calledApi: true }, () => {
            this.props.dispatch(BatchProcessService.saveNewBatch(params))
                .then((res) => {
                    if(res.result.ResponseFlag == 'Y'){
                        toastAction(true,res.result.message); // Shown Success messages
                    }
                    this.setState({ calledApi: false });
                    this.props.NBtoggleFun() // Go to Batch List Tab
                });
        });
    }

    getSubTransType(selectedTransType) { // get trans sub-types
        this.setState({ calledApi: true }, () => {
            this.props.dispatch(BatchProcessService.getTransSubType(selectedTransType))
                .then((res) => {
                    this.setState({ calledApi: false });
                });
        });
    }

    // called this function from NewBatchInner to update noOfRows
    updateNoOfRows = (updatedNoOfRows, data) => {
        if(data == 'withData'){ // if existing data delete
            this.setState({ noOfRows: 0 });
            this.getData(); // called to get updated records
        }else{
            this.setState({ noOfRows: updatedNoOfRows }); // setting updated noOfRows
        }
    }

    render() {

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
                <NewBatchInner onRef={ref => (this.NewBatchInner = ref)} batchDetailsTransData={this.props.batchDetailsTransData} payeeTypeDD={this.props.payeeTypeDD} noOfRows={this.state.noOfRows} transType={this.state.transType} updateNoOfRows={this.updateNoOfRows} selectedBatchMaster={this.props.selectedBatchMaster}/>
            );
        }

        return (
            <React.Fragment>
                <Form method="POST" onSubmit={this.handleSubmit}>
                    <Row>
                        <Col md="3">
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Issue Comp.</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="select" name="issueComp" id="issueComp" onChange={this.handleChange} value={this.state.issueComp} disabled={this.state.calledApi}>
                                        <option key="" value="">Select Company</option>
                                        {this.compDD = this.props.compDD.map((comp, i) => {
                                            return (
                                                <option key={i} value={comp.n_CompanyId_PK}>{comp.s_CompanyName}</option>
                                            );
                                        })}
                                    </Input>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Trans. Type</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="select" name="transType" id="transType" onChange={this.handleChange} value={this.state.transType} disabled={this.state.calledApi}>
                                        <option key="" value="">Select Trans Type</option>
                                        {this.compDD = this.props.paTransType.map((patt, i) => {
                                            return (
                                                <option key={i} value={patt.s_PATranTypeCode}>{patt.s_TranTypeScreenName}</option>
                                            );
                                        })}
                                    </Input>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Trans Sub-Type</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="select" name="transSubtype" id="transSubtype" onChange={this.handleChange} value={this.state.transSubtype} disabled={this.state.calledApi}>
                                        <option key="" value="">Select Trans Sub-Type</option>
                                        {this.transSubType = this.props.paTransSubType.map((subType, i) => {
                                            return (
                                                <option key={i} value={subType.s_PATranSubTypeCode}>{subType.s_SubtypeScreenName}</option>
                                            );
                                        })}
                                    </Input>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Account DT</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="date" id="acctDate" name="acctDate" onChange={this.handleChange} value={this.state.acctDate} disabled={this.state.calledApi}/>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-sm-12 col-md-2 offset-md-5">
                            <InputGroup>
                                <Input type="text" className="form-control-sm" id="noOfRows" name="noOfRows" placeholder="No of Rows" value={this.state.noOfRows} onChange={this.handleChange} disabled={this.state.calledApi}/>
                                &nbsp;&nbsp;<Label>No. of Rows</Label>
                            </InputGroup>
                        </Col>
                    </Row>
                    <hr />
                    {table}
                    <hr />
                    <Row>
                        <Col md="12" className="text-right">
                            <Button type="button" size="md" color="danger" disabled={this.state.calledApi} onClick={()=>{this.props.NBtoggleFun()}}>Exit</Button>&nbsp;&nbsp;
                            <Button type="submit" size="md" color="primary" disabled={this.state.calledApi}>Save</Button>
                        </Col>
                    </Row>
                </Form>
            </React.Fragment>
        )
    }
}

NewBatch.propTypes = {
    dispatch: PropTypes.func.isRequired,
    compDD: PropTypes.array.isRequired,
    paTransType: PropTypes.array.isRequired,
    paTransSubType: PropTypes.array.isRequired,
    payeeTypeDD: PropTypes.array.isRequired,
    batchDetailsTransData: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    compDD: state.BatchProcess.compDD,
    paTransType: state.BatchProcess.paTransType,
    batchDetailsTransData: state.BatchProcess.batchDetailsTransData,
    paTransSubType: state.BatchProcess.paTransSubType,
    payeeTypeDD: state.BatchProcess.payeeTypeDD,
});

export default connect(mapStateToProps)(NewBatch);
