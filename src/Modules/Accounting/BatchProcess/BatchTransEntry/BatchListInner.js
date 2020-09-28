import React, { Component } from 'react';
import { convertDateMMDDYYYY,convertAmount } from '../../../../services/commanServices';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class BatchListInner extends Component {
    constructor(props) {
        super(props);

    }

    dateFormatter(cell, row) {
        return convertDateMMDDYYYY(cell,'MM-DD-YYYY') // Converting Date into MM/DD/YYYY
    }

    // formate data with respected formate
    termDateFormate(cell, row){
        if(row.d_TermStartDate != null || row.d_TermEndDate != null){
            return convertDateMMDDYYYY(row.d_TermStartDate,'MM-DD-YYYY')+' / '+convertDateMMDDYYYY(row.d_TermEndDate,'MM-DD-YYYY');
        }
        return null;
    }

    // converting amount
    convertAmt(cell, row){
        return convertAmount(cell);
    }

    renderTableData() {
        const options = {
            sizePerPage: 10,  // which size per page you want to locate as default
            paginationShowsTotal: true,  // Accept bool or function
        };

        let tableFields = null;
        if (this.props.batchDetailsData.length != 0) {
            if (this.props.batchDetailsData[0].s_BatchTranTypeCode == 'REFUND') {
                tableFields = (
                    <BootstrapTable data={this.props.batchDetailsData} striped hover options={options} pagination={true} fetchInfo={{ dataTotalSize: this.props.batchDetailsTotalCount }}>
                        <TableHeaderColumn isKey dataField="s_SplitTran" dataSort width="50" dataFormat={this.batchNoLink}>Split</TableHeaderColumn>
                        <TableHeaderColumn dataField="s_TranRefNo" tdStyle={{ whiteSpace: 'normal' }} width="170">Refr No.</TableHeaderColumn>
                        <TableHeaderColumn dataField="d_TranRefDate" tdStyle={{ whiteSpace: 'normal' }} dataFormat={this.dateFormatter} dataSort>Refr DT</TableHeaderColumn>
                        <TableHeaderColumn dataField="n_TranAmount" dataFormat={this.convertAmt} tdStyle={{ whiteSpace: 'normal' }} headerAlign='left' dataAlign='right' dataSort>Trans Amt.</TableHeaderColumn>
                        <TableHeaderColumn dataField="n_FullAmount" dataFormat={this.convertAmt} tdStyle={{ whiteSpace: 'normal' }} headerAlign='left' dataAlign='right' dataSort>Entry Amt.</TableHeaderColumn>
                        <TableHeaderColumn dataField="s_InvoiceNumber" tdStyle={{ whiteSpace: 'normal' }} dataSort>Memo</TableHeaderColumn>
                        <TableHeaderColumn dataField="s_AccountNo" tdStyle={{ whiteSpace: 'normal' }} dataSort>Acct. No.</TableHeaderColumn>
                        <TableHeaderColumn dataField="acctName" tdStyle={{ whiteSpace: 'normal' }} dataSort>Acct. Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="remark" tdStyle={{ whiteSpace: 'normal' }} width="200">Payee</TableHeaderColumn>
                    </BootstrapTable>
                );
            } else if (this.props.batchDetailsData[0].s_BatchTranTypeCode == 'PAYMENT') {
                if(this.props.actionType == 'VERIFY'){
                    tableFields = (
                        <BootstrapTable data={this.props.batchDetailsData} striped hover options={options} pagination={true} fetchInfo={{ dataTotalSize: this.props.batchDetailsTotalCount }}>
                            <TableHeaderColumn isKey dataField="s_SplitTran" dataSort width="50" dataSort dataFormat={this.batchNoLink}>Split</TableHeaderColumn>
                            <TableHeaderColumn dataField="s_TranRefNo" tdStyle={{ whiteSpace: 'normal' }} width="120">Refr No.</TableHeaderColumn>
                            <TableHeaderColumn dataField="d_TranRefDate" tdStyle={{ whiteSpace: 'normal' }} dataFormat={this.dateFormatter} dataSort>Refr DT</TableHeaderColumn>
                            <TableHeaderColumn dataField="n_TranAmount" dataFormat={this.convertAmt} tdStyle={{ whiteSpace: 'normal' }} headerAlign='left' dataAlign='right' dataSort>Trans Amt.</TableHeaderColumn>
                            <TableHeaderColumn dataField="n_FullAmount" dataFormat={this.convertAmt} tdStyle={{ whiteSpace: 'normal' }} headerAlign='left' dataAlign='right' dataSort>Entry Amt.</TableHeaderColumn>
                            <TableHeaderColumn dataField="s_InvoiceNumber" tdStyle={{ whiteSpace: 'normal' }} dataSort>Inv. No.</TableHeaderColumn>
                            <TableHeaderColumn dataField="s_AccountNo" tdStyle={{ whiteSpace: 'normal' }} dataSort>Acct. No.</TableHeaderColumn>
                            <TableHeaderColumn dataField="acctName" tdStyle={{ whiteSpace: 'normal' }} dataSort>Acct. Name</TableHeaderColumn>
                            <TableHeaderColumn dataFormat={this.termDateFormate} tdStyle={{ whiteSpace: 'normal' }} dataSort>Term DT</TableHeaderColumn>
                            <TableHeaderColumn dataField="termBalance" dataFormat={this.convertAmt} tdStyle={{ whiteSpace: 'normal' }} headerAlign='left' dataAlign='right' dataSort>Balance</TableHeaderColumn>
                            <TableHeaderColumn dataField="payPlan" dataSort>PayPlan</TableHeaderColumn>
                            <TableHeaderColumn dataField="runnigBalanceAccountView" dataFormat={this.convertAmt} tdStyle={{ whiteSpace: 'normal' }} headerAlign='left' dataAlign='right' dataSort>ActView</TableHeaderColumn>
                            <TableHeaderColumn dataField="runnigBalance" dataFormat={this.convertAmt} tdStyle={{ whiteSpace: 'normal' }} headerAlign='left' dataAlign='right' dataSort>RecievView</TableHeaderColumn>
                            <TableHeaderColumn dataField="remark" tdStyle={{ whiteSpace: 'normal' }} >Remarks</TableHeaderColumn>
                        </BootstrapTable>
                    );
                }else{
                    tableFields = (
                        <BootstrapTable data={this.props.batchDetailsData} striped hover options={options} pagination={true} fetchInfo={{ dataTotalSize: this.props.batchDetailsTotalCount }}>
                            <TableHeaderColumn isKey dataField="s_SplitTran" dataSort width="50" dataSort dataFormat={this.batchNoLink}>Split</TableHeaderColumn>
                            <TableHeaderColumn dataField="s_TranRefNo" tdStyle={{ whiteSpace: 'normal' }} width="120">Refr No.</TableHeaderColumn>
                            <TableHeaderColumn dataField="d_TranRefDate" tdStyle={{ whiteSpace: 'normal' }} dataFormat={this.dateFormatter} dataSort>Refr DT</TableHeaderColumn>
                            <TableHeaderColumn dataField="n_TranAmount" dataFormat={this.convertAmt} tdStyle={{ whiteSpace: 'normal' }} headerAlign='left' dataAlign='right' dataSort>Trans Amt.</TableHeaderColumn>
                            <TableHeaderColumn dataField="n_FullAmount" dataFormat={this.convertAmt} tdStyle={{ whiteSpace: 'normal' }} headerAlign='left' dataAlign='right' dataSort>Entry Amt.</TableHeaderColumn>
                            <TableHeaderColumn dataField="s_InvoiceNumber" tdStyle={{ whiteSpace: 'normal' }} dataSort>Inv. No.</TableHeaderColumn>
                            <TableHeaderColumn dataField="s_AccountNo" tdStyle={{ whiteSpace: 'normal' }} dataSort>Acct. No.</TableHeaderColumn>
                            <TableHeaderColumn dataField="acctName" tdStyle={{ whiteSpace: 'normal' }} dataSort>Acct. Name</TableHeaderColumn>
                            <TableHeaderColumn dataFormat={this.termDateFormate} tdStyle={{ whiteSpace: 'normal' }} dataSort>Term DT</TableHeaderColumn>
                            <TableHeaderColumn dataField="termBalance" dataFormat={this.convertAmt} tdStyle={{ whiteSpace: 'normal' }} headerAlign='left' dataAlign='right' dataSort>Balance</TableHeaderColumn>
                            <TableHeaderColumn dataField="remark" tdStyle={{ whiteSpace: 'normal' }} >Remarks</TableHeaderColumn>
                        </BootstrapTable>
                    );
                }
            } else {
                tableFields = (
                    <BootstrapTable data={this.props.batchDetailsData} striped hover options={options} pagination={true} fetchInfo={{ dataTotalSize: this.props.batchDetailsTotalCount }}>
                        <TableHeaderColumn isKey dataField="s_SplitTran" dataSort width="50" dataFormat={this.batchNoLink}>Split</TableHeaderColumn>
                        <TableHeaderColumn dataField="s_TranRefNo" tdStyle={{ whiteSpace: 'normal' }} width="170">Refr No.</TableHeaderColumn>
                        <TableHeaderColumn dataField="d_TranRefDate" dataFormat={this.dateFormatter} dataSort>Refr DT</TableHeaderColumn>
                        <TableHeaderColumn dataField="n_TranAmount" dataFormat={this.convertAmt} headerAlign='left' dataAlign='right' dataSort>Trans Amt.</TableHeaderColumn>
                        <TableHeaderColumn dataField="n_FullAmount" dataFormat={this.convertAmt} headerAlign='left' dataAlign='right' dataSort>Entry Amt.</TableHeaderColumn>
                        <TableHeaderColumn dataField="s_InvoiceNumber" dataSort>Inv. No.</TableHeaderColumn>
                        <TableHeaderColumn dataField="s_AccountNo" dataSort>Acct. No.</TableHeaderColumn>
                        <TableHeaderColumn dataField="acctName" dataSort>Acct. Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="remark" tdStyle={{ whiteSpace: 'normal' }} width="150">Remarks</TableHeaderColumn>
                    </BootstrapTable>
                );
            }
        }else{
            tableFields = 'No Data Found';
        }
        return tableFields;
    }

    render() {
        return (
            <React.Fragment>
                {this.renderTableData()}
            </React.Fragment>
        )
    }
}

export default BatchListInner;