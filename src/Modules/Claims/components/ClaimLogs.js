import React from 'react';
import Moment from 'react-moment';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export const ClaimLogs = ({claim}) => (
      <BootstrapTable data={claim.logs} version="4" striped hover pagination className="table-sm">
            <TableHeaderColumn dataField="ClaimLogId_PK" isKey={true} dataSort={true} >ID</TableHeaderColumn>
            <TableHeaderColumn dataField="Inserted_Date" dataFormat={d=><Moment date={d} format="MM/DD/YYYY hh:mm:ss"/>} dataSort={true} >Date</TableHeaderColumn>
            <TableHeaderColumn dataField="Claim_Activity_Log" dataSort={true} >Activity</TableHeaderColumn>
            <TableHeaderColumn dataField="InsertedBy_Flag" dataSort={true} >Inserted By</TableHeaderColumn>
      </BootstrapTable>
)