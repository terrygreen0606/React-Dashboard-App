import React from 'react';
import Moment from 'react-moment';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {currencyFormat} from "../components/Helper"

export const ClaimReserves = ({claim}) => (
      <BootstrapTable data={claim.reserves} version="4" striped hover pagination className="table-sm">
            <TableHeaderColumn dataField="ClaimReserveId_PK" isKey={true} dataSort={true} >ID</TableHeaderColumn>
            <TableHeaderColumn dataField="Inserted_Date" dataFormat={d=><Moment date={d} format="MM/DD/YYYY hh:mm:ss"/>} dataSort={true} >Date</TableHeaderColumn>
            <TableHeaderColumn dataField="Tran_Type_Code" dataSort={true} >Trans Type</TableHeaderColumn>
            <TableHeaderColumn dataField="Tran_SubType_Code" dataSort={true} >Trans SubType</TableHeaderColumn>
            <TableHeaderColumn dataField="Amount" dataSort={true} dataFormat={currencyFormat} dataAlign="right" >Amount</TableHeaderColumn>
      </BootstrapTable>
)