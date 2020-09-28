import React from 'react';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { Col } from "reactstrap";
import { NavLink } from 'react-router-dom';
import { formatDate, getNumberFormat  } from "../../CommonComponents/methods";

export default ({data, options,rowClassNameFormat, getAllList, viewAll })=>
{
        return (
            <>
            <Col className="col-md-10">
                  <NavLink strict to="#" className="view-all" onClick={() => getAllList()}> View All </NavLink>
                </Col>
        <Col className="col-md-10">
                     <BootstrapTable
                           data={viewAll ?  data : data.slice((options.page-1)*options.sizePerPage,options.page*options.sizePerPage)}
                        version="4"
                        remote
                        condensed
                        scrollTop={ 'Bottom' }
                        hover 
                        pagination ={viewAll ? false : true}
                        alwaysShowAllBtns
                        options={{ ...options}}
                        fetchInfo={{ dataTotalSize: data.length }}
                        trStyle={rowClassNameFormat}
                         >
                        <TableHeaderColumn isKey dataField="Transaction_ID" width='60px'>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="Settle_Date" dataFormat={(cell, row) => (formatDate(row, 'Settle_Date'))} width='100px' dataSort>Settle Date</TableHeaderColumn>
                        <TableHeaderColumn dataField="Quantity" dataFormat={(cell, row) =>row.Quantity ? getNumberFormat(parseInt(row.Quantity)):"00.0"} width='100px'>	Quantity</TableHeaderColumn>
                        <TableHeaderColumn dataField="Balancepercusip" dataFormat={(cell, row) =>row.Balancepercusip ? getNumberFormat(parseInt(row.Balancepercusip)):"00.0"} width='130px'>Balance Quantity</TableHeaderColumn>
                        <TableHeaderColumn dataField="Action_name" width='150px'>Action</TableHeaderColumn>
                        <TableHeaderColumn dataField="Amortization_Posting" dataFormat={(cell, row) =>row.Amortization_Posting ? `$${getNumberFormat(row.Amortization_Posting)}` :"$00.0"} width='100px'>Amortization</TableHeaderColumn>
                        <TableHeaderColumn dataField="Adjusted_Unit_Cost" dataFormat={(cell, row) =>row.Adjusted_Unit_Cost ? getNumberFormat(parseInt(row.Adjusted_Unit_Cost)) :"00.0"} width='100px'>Adj Unit Cost</TableHeaderColumn>
                        <TableHeaderColumn dataField="Adjusted_Cost" dataFormat={(cell, row) =>row.Adjusted_Cost ? `$${getNumberFormat(parseInt(row.Adjusted_Cost))}` :"$00.0"} width='130px'>Adjusted Total Cost</TableHeaderColumn>
                        <TableHeaderColumn dataField="Price" dataFormat={(cell, row) =>row.Price ? `$${getNumberFormat(row.Price)}` :"$00.0"} width="100px">Price</TableHeaderColumn>
                        <TableHeaderColumn dataField="MarketValue" dataFormat={(cell, row) =>row.MarketValue ? `$${getNumberFormat(row.MarketValue)}` :"$00.0"} width='100px' >Market Value</TableHeaderColumn>
                    </BootstrapTable>     
          </Col>
          </>
    )
}