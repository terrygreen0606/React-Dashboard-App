import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Input, Label } from 'reactstrap';
import * as BatchProcessService from '../../../../services/batchProcessService';
import SweetAlert from 'react-bootstrap-sweetalert';
import { toastAction } from '../../../../store/actions/toast-actions';

class PostBatchAcctDate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            batchMasterFK: this.props.batchMasterPK,
            batchNo: '',
            accDate: '',
            transType: '',
            transSubType: '',
            sumAmount: '',
            noofEntries: '',
            vamt: '',
            vNoOfEntries: '',
            calledApi: false
        }
    }

    // executed before mount
    componentWillMount() {
        this.setState({ calledApi: true }, () => {
            this.props.dispatch(BatchProcessService.getPostBatchAcctDate(this.state.batchMasterFK))
                .then((res) => {
                    this.setState({ batchNo: res.getBatchMasterData.s_PABatchNo, accDate: res.acctDate, transType: res.getBatchMasterData.s_BatchTranTypeCode, transSubType: res.getBatchMasterData.s_BatchTranSubTypeCode, sumAmount: Math.trunc(res.sumAmount), noofEntries: res.noOfEntries, calledApi: false });
                });
        });
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    savePostBatchAcct() {
        const {batchMasterFK,accDate,transType,transSubType,sumAmount,noofEntries,vamt,vNoOfEntries} = this.state;
        if(vamt != sumAmount){
            toastAction(false,'Batch validation failed, Amount is not correct!');
        }else if(vNoOfEntries != noofEntries){
            toastAction(false,'Batch validation failed, No of entries is not correct!');
        }else{
            const params = {
                batchMasterFK,accDate,transType,transSubType,sumAmount,noofEntries,vamt,vNoOfEntries
            }

            this.setState({ calledApi: true }, () => {
                this.props.dispatch(BatchProcessService.savePostBatchAcct(params))
                    .then((res) => {
                        if(res.result.status == 'Y'){
                            toastAction(true,res.result.message);
                        }
                        this.props.closePostAlert(true);
                    });
            });
        }
    }

    render() {
        var view;
        if (this.state.calledApi == true) {
            view = (
                <div className="sk-three-bounce">
                    <div className="sk-child sk-bounce1"></div>
                    <div className="sk-child sk-bounce2"></div>
                    <div className="sk-child sk-bounce3"></div>
                    <h4>Laoding</h4>
                </div>
            );
        } else {
            view = (
                <Row>
                    <Col sm="12" md={{ size: 8, offset: 2 }}>
                        <Row>
                            <Col ms="5" className="text-left">Batch No:</Col>
                            <Col md="7" className="text-left">{this.state.batchNo}</Col>
                        </Row>
                        <Row>
                            <Col ms="5" className="text-left">Trans Type:</Col>
                            <Col md="7" className="text-left">{this.state.transType}</Col>
                        </Row>
                        <Row>
                            <Col ms="5" className="text-left">Trans Sub-Type:</Col>
                            <Col md="7" className="text-left">{this.state.transSubType}</Col>
                        </Row>
                        <Row>
                            <Col ms="5" className="text-left">Accounting Date:</Col>
                            <Col md="7" className="text-left"><Input type="date" bsSize="sm" id="accDate" name="accDate" value={this.state.accDate} onChange={this.handleChange} /></Col>
                        </Row>
                        <Row><Col md="12"><Label><b>Validate Batch</b></Label></Col></Row>
                        <Row>
                            <Col ms="5" className="text-left">Amount:</Col>
                            <Col md="7" className="text-left"><Input type="text" bsSize="sm" id="vamt" name="vamt" value={this.state.vamt} onChange={this.handleChange} /></Col>
                        </Row>
                        <Row>
                            <Col ms="5" className="text-left">No.Of.Entries:</Col>
                            <Col md="7" className="text-left"><Input type="text" bsSize="sm" id="vNoOfEntries" name="vNoOfEntries" value={this.state.vNoOfEntries} onChange={this.handleChange} /></Col>
                        </Row>
                    </Col>
                </Row>
            );
        }

        return (
            <SweetAlert closeOnClickOutside={false} custom title="Accounting Date" showCancel confirmBtnText="Save & Post" cancelBtnText="Cancel"
                confirmBtnBsStyle="primary" cancelBtnBsStyle="default" onConfirm={() => this.state.calledApi==true?null:this.savePostBatchAcct()} onCancel={() => this.props.closePostAlert(false)}
                btnSize="sm"
            >
                { view }
            </SweetAlert>
        )
    }
}

PostBatchAcctDate.propTypes = {
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({

});


export default connect(mapStateToProps)(PostBatchAcctDate);