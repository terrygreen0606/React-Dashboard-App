import React from 'react';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { Col } from "reactstrap";
import { NavLink } from 'react-router-dom';
import { formatDate, getNumberFormat  } from "../../CommonComponents/methods";

export default ({data, options, rowClassNameFormat, getAllList, viewAll })=>
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
                        <TableHeaderColumn isKey dataField="Transaction_ID"  width='80px'>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="Settle_Date" dataFormat={(cell, row) => (formatDate(row, 'Settle_Date'))} width='100px'>Settle Date</TableHeaderColumn>
                        <TableHeaderColumn dataField="Action_name" width='150px'>Action</TableHeaderColumn>
                        <TableHeaderColumn dataField="Purchase_Interest" dataFormat={(cell, row) =>row.Purchase_Interest ? getNumberFormat(parseInt(row.Purchase_Interest)):"00.0"} width='130px'>	Purchase Interest</TableHeaderColumn>
                        <TableHeaderColumn dataField="Sold_Interest" dataFormat={(cell, row) =>row.Sold_Interest ? getNumberFormat(parseInt(row.Sold_Interest)):"00.0"}width='100px' >Sold Interest</TableHeaderColumn>
                        <TableHeaderColumn dataField="Interest_Received" dataFormat={(cell, row) =>row.Interest_Received ? getNumberFormat(row.Interest_Received) :"00.0"} width='130px'>Interest Received</TableHeaderColumn>
                        <TableHeaderColumn dataField="Earned_Int_Posting" dataFormat={(cell, row) =>row.Earned_Int_Posting ? getNumberFormat(parseInt(row.Earned_Int_Posting)) :"00.0"} width='140px'>Earned Interest</TableHeaderColumn>
                        <TableHeaderColumn dataField="Display_Ending_Accrued" dataFormat={(cell, row) =>row.Display_Ending_Accrued ? getNumberFormat(row.Display_Ending_Accrued):"00.0"} width='100px'>Ending Accrued</TableHeaderColumn>
                    </BootstrapTable> 
          </Col>
          </>
    )
}