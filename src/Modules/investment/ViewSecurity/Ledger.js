import React from 'react';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { Col } from "reactstrap";
import { NavLink } from 'react-router-dom';
import { formatDate , getNumberFormat} from "../../CommonComponents/methods";

export default ({ data, rowClassNameFormat, options, getAllList, viewAll })=>
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
                        <TableHeaderColumn isKey={true} dataField="Transaction_ID" >ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="Settle_Date" dataFormat={(cell, row) => (formatDate(row, 'Settle_Date'))} dataSort width="100px">Settle Date</TableHeaderColumn>
                        <TableHeaderColumn dataField="Account_ID" width='100px' >	Account Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="Lot" >Lot</TableHeaderColumn>
                        <TableHeaderColumn dataField="Action_ID" dataSort width='150px'>Action</TableHeaderColumn>
                        <TableHeaderColumn dataField="Price"  dataFormat={(cell, row) =>row.Price ? `$${getNumberFormat(row.Price)}` :""} >Price</TableHeaderColumn>
                        <TableHeaderColumn dataField="Bought"  dataFormat={(cell, row) =>row.Bought ? getNumberFormat(row.Bought):""}>Bought</TableHeaderColumn>
                        <TableHeaderColumn dataField="Sold"  dataFormat={(cell, row) =>row.Sold ? getNumberFormat(parseInt(row.Sold)) :""}  >Sold</TableHeaderColumn>
                        <TableHeaderColumn dataField="Balance"  dataFormat={(cell, row) =>row.Balance ? getNumberFormat(parseInt(row.Balance)) :"0.00"} width='120px' >Balance Shares</TableHeaderColumn>
                        <TableHeaderColumn dataField="Income" dataFormat={(cell, row) =>row.Income ? `$${getNumberFormat(row.Income)}` :""} >Income</TableHeaderColumn>
                    </BootstrapTable>    
          </Col>
          </>
    )
}