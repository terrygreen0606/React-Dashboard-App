import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Input, Button, Modal, ModalBody } from 'reactstrap';
import FindAccount from './FindAccount';
import * as BatchProcessService from '../../../../services/batchProcessService';
import { toastAction } from '../../../../store/actions/toast-actions';

class NewBatchTableFields extends Component {
    constructor(props) {
        super(props)

        this.state = { modal: false, rows: this.props.pState };
        this.noOfRows = this.props.noOfRows;
        this.i = this.props.rowNo;
        this.toggle = this.toggle.bind(this);
    }

    // setting this state to parent state in mount
    componentWillMount() {
        this.props.parentState(this.i, this.state);
    }
    // setting this state to parent state on update
    componentDidUpdate() {
        this.props.parentState(this.i, this.state);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        let obj = this.state.rows;
        obj[name] = value;
        this.setState({rows: obj});
    }

    // for checkbox to setState true or false
    checkBoxClick = (e) => {
        let obj = this.state.rows;
        obj['split'] = e.target.checked;
        this.setState({rows: obj});
    }

    setAcctNoName = (acctNo, acctName) => {
        this.toggle() // for closing search account modal
        let obj = this.state.rows;
        obj['acctNo'] = acctNo;
        this.setState({rows: obj},()=>{
            this.getAcctPerData(acctNo)
        });
    }

    getAccountData = (params) => {
        this.props.dispatch(BatchProcessService.searchAccount(params))
            .then((res) => {
            });
    }

    getAcctPerData = (e) => {
        var paramsAcctNo;

        if (e.target === undefined) {
            paramsAcctNo = e; // e as acctNo passed from setAcctNoName function
        } else {
            paramsAcctNo = e.target.value; // from blur function called from targeted element
        }
        // calling API to get Acct Bal and Term
        this.props.dispatch(BatchProcessService.getAcctPerData(paramsAcctNo))
            .then((res) => {
                if (res.result.ResponseFlag == 'Y') {
                    // setting acctNo into State rows
                    this.termDD = res.result.TermDD.map((data) => {
                        return data;
                    });

                    let obj = this.state.rows;
                    obj['acctNo'] = paramsAcctNo;
                    obj['acctName'] = res.result.AccountName;
                    obj['acctBal'] = res.result.AcctBal;
                    obj['termDD'] = this.termDD;

                    // if termDD only one value
                    obj['term'] = this.termDD[0]['termMasterPK'];
                    if(this.termDD.length === 1){
                        obj['term'] = this.termDD[0]['termMasterPK'];
                    }
                    this.setState({rows: obj}); // setting result data
                } else {
                    toastAction(false, res.result.message); 
                }
            });
    }

    setEntAmt = (e) => {
        const { name, value } = e.target;
        let obj = this.state.rows;
        obj['entAmt'] = value;
        this.setState({rows: obj});
    }

    render() {
        const { batchDetailsPK,split, refNo, refDate, transAmt, entAmt, invNo, acctNo, acctName, acctBal, termDD,term } = this.state.rows;

        var selectOption = '';
        if (termDD != []) {
            selectOption = termDD.map((data) => {
                return <option key={data.termMasterPK} value={data.termMasterPK}>{data.period}</option>
            })
        }

        var payeeTypeOp = '';
        payeeTypeOp = this.props.payeeTypeDD.map((data, i) => {
            return <option key={i} value={data.s_AppCodeName}>{data.s_AppCodeNameForDisplay}</option>
        });

        return (
            <React.Fragment>
                <tr id={this.i} onClick={this.props.rowFunClick}>
                    <td><Input type="checkbox" name="split" id="split" checked={split} onChange={this.checkBoxClick} /></td>
                    <td><Input type="text" name="refNo" id="refNo" className="form-control-sm" value={refNo||''} onChange={this.handleChange} /></td>
                    <td><Input type="date" id="refDate" name="refDate" className="form-control-sm" value={refDate||''} onChange={this.handleChange} /></td> 
                    <td><Input type="text" name="transAmt" id="transAmt" className="form-control-sm" value={transAmt||''} onChange={this.handleChange} onBlur={this.setEntAmt}/></td>
                    <td><Input type="text" name="entAmt" id="entAmt" className="form-control-sm" value={entAmt||''} onChange={this.handleChange} /></td>
                    <td><Input type="text" name="invNo" id="invNo" className="form-control-sm" value={invNo||''} onChange={this.handleChange} /></td>
                    <td><Row><Col md="6"><Input type="text" name="acctNo" id="acctNo" className="form-control-sm" style={{ width: '70px' }} value={acctNo||''} onChange={this.handleChange} onBlur={this.getAcctPerData} /></Col><Col md="6"><Button type="button" className="btn-sm" onClick={this.toggle}>Find</Button></Col></Row></td>
                    <td><Input type="text" name="acctName" id="acctName" className="form-control-sm" disabled value={acctName||''} /></td>
                    <td><Input type="text" name="acctBal" id="acctBal" className="form-control-sm" disabled value={acctBal||0} /></td>
                    <td>
                        <Input type="select" name="term" id="term" className="form-control-sm" value={term||''} onChange={this.handleChange}>
                            {selectOption}
                        </Input>
                    </td>
                    {this.props.transType == 'REFUND'?<td><Input type="select" name="payeeType" id="payeeType" className="form-control-sm" onChange={this.handleChange} required><option value="">Select Payee</option>{payeeTypeOp}</Input></td>:null}
                    <td><Button onClick={this.props.delFun} id={this.i} value={batchDetailsPK} color="danger" className="btn-sm"><i className="fa fa-times" id={this.i} value={batchDetailsPK}></i></Button></td>
                </tr>
                <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop='static' className={'modal-lg'}>
                    <ModalBody>
                        <FindAccount setAcctNoName={this.setAcctNoName} getAccountFunc={this.getAccountData} searchAccountData={this.props.searchAccountData} totalCount={this.props.totalCount} toggle={()=> this.toggle()}/>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

NewBatchTableFields.propTypes = {
    dispatch: PropTypes.func.isRequired,
    totalCount: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
    searchAccountData: state.BatchProcess.searchAccountData,
    totalCount: state.BatchProcess.totalCount
});

export default connect(mapStateToProps)(NewBatchTableFields);