import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as BatchProcessService from '../../../../services/batchProcessService';
import { Table } from 'reactstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import NewBatchTableFields from './NewBatchTableFields';
import { toastAction } from '../../../../store/actions/toast-actions';

class NewBatchInner extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            rows: [],
            onRowClick: '',
            alert: null
        };

        this.tableFields = [];
        this.noOfRows = this.props.noOfRows;
        this.stateRowCount = 0;
        this.i = 0;
        this.tempState = [];
    }

    // executed before mount
    componentWillMount() {
        this.props.onRef(this)
    }

    // executed before component update
    componentWillUpdate(){
        if(this.props.transType == 'REFUND'){ // if trans type changed to REFUND make all empty
            this.i = 0;
            this.stateRowCount = 0;
            this.tableFields = [];
            this.state.rows = [];
        }

        if(typeof this.props.batchDetailsTransData != 'undefined'){ // if batch details trans data not empty then
            if(this.props.batchDetailsTransData.length != 0){
                this.i = 0;
                this.stateRowCount = 0;
                this.tableFields = [];
                this.state.rows = [];
            }
        }
    }

    deleteRow(e) {
        var rowId = e.currentTarget.id; // deleted row id
        var batchDetailsPK = e.currentTarget.value; // deleted batch details pk

        if(batchDetailsPK != ''){ // deleting existing data and updating
            const getAlert = () => (
            <SweetAlert warning title="Delete Confirmation" showCancel confirmBtnText="Yes, delete it!" confirmBtnBsStyle="danger"
            onConfirm={() => this.deleteExisingData(batchDetailsPK)}
            onCancel={() => this.setState({alert: null})}
            focusCancelBtn
            >
                Do you really want to delete the selected item?
            </SweetAlert>);
            this.setState({alert: getAlert()});            
        }else{
            // updating state while deleting row
            var stateArray = [...this.state.rows];
            stateArray.splice(rowId,1);
            this.setState({rows: stateArray});

        
            var tableFields = [...this.tableFields]; // make copy
            tableFields.splice(rowId, 1); // deleted selected row
            this.tableFields = tableFields; // updated tableFields
            this.i = this.i - 1; // updateing for loop value
            this.noOfRows = this.props.noOfRows - 1; // updating noOdRows value
            this.props.updateNoOfRows(this.noOfRows,'withOutData'); // calling NewBatch Function to update noOfRows (Parent Function)
        }
    }

    deleteExisingData(batchDetailsPK){
        this.setState({ calledApi: true }, () => {
            this.props.dispatch(BatchProcessService.deleteBatchDetails(batchDetailsPK))
                .then((res)=>{
                    if(res.result.status){
                        toastAction(false, res.result.msg); // showing result message
                    }
                });
        });

        this.setState({rows: []}); // making empty local state
        this.tableFields = []; // local props empty
        this.props.updateNoOfRows(this.noOfRows,'withData');
    }

    getClickedRow = (e) => {
        // set clicked Row ID for setting Account_No and Account_Name
        this.setState({ onRowClick: e.currentTarget.id });
    }

    updateParentState = (rowID,childState) =>{
        this.state.rows[rowID] = childState.rows;// setting acctNo into State rows
    }

    render() {

        if (this.props.noOfRows != '' || this.props.noOfRows.length != 0) {
            this.noOfRows = this.props.noOfRows; // assigned updated value
            
            for (this.i; this.i < this.noOfRows; this.i++) { // creating table row
                // init state
                this.tempState = { batchDetailsPK: null, split: false, refNo: "", refDate: "", transAmt: "", entAmt: "", invNo: "", acctNo: "", acctName: "", acctBal: "", termDD: "", term: "", payeeType: "", claimFK: "" };
                if(this.props.batchDetailsTransData.length != 0 && this.props.batchDetailsTransData.length>this.i){
                    const {n_PABatchDetail_PK, s_SplitTran,s_TranRefNo,d_TranRefDate,n_FullAmount,n_TranAmount,s_InvoiceNumber,s_AccountNo,n_TermMaster_FK,s_PayeeTypeCode,s_FullLegalName,n_CurrentClosingBalance,termDD,claimFK} = this.props.batchDetailsTransData[this.i];
                    var tempSplit = false;
                    if(s_SplitTran == 'Y'){
                        tempSplit = true;
                    }
                    // init state with data
                    if(this.props.selectedBatchMaster != ''){
                        this.tempState = { batchDetailsPK: n_PABatchDetail_PK, split: tempSplit, refNo: s_TranRefNo, refDate: d_TranRefDate, transAmt: n_TranAmount, entAmt: n_FullAmount, invNo: s_InvoiceNumber, acctNo: s_AccountNo, acctName: s_FullLegalName, acctBal: n_CurrentClosingBalance, termDD: termDD, term: n_TermMaster_FK, payeeType: s_PayeeTypeCode, claimFK: claimFK };
                    }
                }

                this.tableFields.push(
                    <NewBatchTableFields payeeTypeDD={this.props.payeeTypeDD} transType={this.props.transType} pState={this.tempState} key={this.i} rowNo={this.i} tableFields={this.tableFields} noOfRows={this.noOfRows} delFun={this.deleteRow.bind(this)} rowFunClick={this.getClickedRow} parentState={this.updateParentState}/>
                )
            }
        }

        return (
            <React.Fragment>
                <Table style={{ textAlign: 'center' }} size="sm" responsive striped>
                    <thead>
                        <tr>
                            <th>Split</th>
                            <th>Refr No.</th>
                            <th>Refr dt.</th>
                            <th>Tra. Amt.</th>
                            <th>Ent. Amt.</th>
                            <th>{this.props.transType != 'REFUND'?'Inv. No.':'Memo On Check'}</th>
                            <th>Acct No.</th>
                            <th>Acct Name</th>
                            <th>Acct Bal</th>
                            <th>Term</th>
                            {this.props.transType != 'REFUND'?null:<th>PayeeType</th>}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tableFields}
                    </tbody>
                </Table>
                {this.state.alert}
            </React.Fragment>
        )
    }
}

NewBatchInner.propTypes = {
    dispatch: PropTypes.func.isRequired,
    totalCount: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
    searchAccountData: state.BatchProcess.searchAccountData,
    totalCount: state.BatchProcess.totalCount
});

export default connect(mapStateToProps)(NewBatchInner);