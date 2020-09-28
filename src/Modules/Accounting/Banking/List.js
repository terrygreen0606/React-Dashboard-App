import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import StatusIcon from "../../CommonComponents/StatusIcon";
import ActionButttons from "../../CommonComponents/ActionButtons";
import {getNumberFormat} from "../../CommonComponents/methods";

export default class List extends React.Component {
    // Customization Function 
    rowClassNameFormat(rowIdx){
        return { backgroundColor: rowIdx % 2 === 0 ? '#A2EFE8' : '#DCEFF1', color: "#000000" };
    };
    /************* Set status icon *****************/
    setStatusIcon = (row) => {
        return <StatusIcon status={row.Account_Status === "Active"} />
    }
    /*********** Action buttons ************/
    actions = (row) => {
        const url = `/manage-account-ledger`;
        return <ActionButttons id={row.Account_ID} url={url} history={this.props.history} handleDelete={false} editRow={this.props.editRow} isSearch={false} />;
    };
    /********** Get bank type ************/
    getType = () => {
        return "bank";
    }
    render() {
        const { accounting, options, page, total_rows } = this.props;
        return <BootstrapTable
            data={accounting}
            version="4"
            remote
            condensed
            striped hover pagination
            options={{ ...options, page }}
            fetchInfo={{ dataTotalSize: total_rows }}
            trStyle={(row, index) => this.rowClassNameFormat(index)}
        >
            <TableHeaderColumn isKey dataField="Account_Name" dataSort >Name</TableHeaderColumn>
            <TableHeaderColumn dataField="Account_No" dataSort>Number</TableHeaderColumn>
            <TableHeaderColumn dataField="Account_Type_ID" dataFormat={(cell, row)=>this.getType(row)} dataSort>Type</TableHeaderColumn>
            <TableHeaderColumn dataField="Account_Status" dataSort dataFormat={(cell, row) => this.setStatusIcon(row)}>Status</TableHeaderColumn>
            <TableHeaderColumn dataField="Balance" dataFormat={(cell, row) => '$'+getNumberFormat(row.Balance)} dataAlign={"right"} headerAlign="center">Balance</TableHeaderColumn>
            <TableHeaderColumn dataField="" dataFormat={(cell, row)=>this.actions(row)}>Action</TableHeaderColumn>
        </BootstrapTable>
    }
}