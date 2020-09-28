import React from 'react';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { Col } from "reactstrap";

export default ({data, options,rowClassNameFormat })=>
{
        return (
        <Col className="col-md-10">
         <BootstrapTable
           data={data.slice((options.page-1)*options.sizePerPage,options.page*options.sizePerPage)}
           version="4"
           remote
           condensed
           scrollTop={ 'Bottom' }
           hover pagination
           alwaysShowAllBtns
           options={{ ...options}}
           fetchInfo={{ dataTotalSize: data.length }}
           trStyle={rowClassNameFormat}
            >
                        <TableHeaderColumn isKey dataField="id" width='110px'>Security Symbol</TableHeaderColumn>
                        <TableHeaderColumn dataField="" width='120px'>Brokrage Account</TableHeaderColumn>
                        <TableHeaderColumn dataField="Description" width='100px'>Description</TableHeaderColumn>
                        <TableHeaderColumn dataField="" width='100px'>	Purchase Date</TableHeaderColumn>
                        <TableHeaderColumn dataField="" width='100px'>Sales Date</TableHeaderColumn>
                        <TableHeaderColumn dataField="" width='100px'>Quantity</TableHeaderColumn>
                        <TableHeaderColumn dataField="" width='100px'>Adjusted Costs</TableHeaderColumn>
                        <TableHeaderColumn dataField="" >Proceeds</TableHeaderColumn>
                        <TableHeaderColumn dataField=""  width='150px'>Short-Term Gain/Loss</TableHeaderColumn>
                      </BootstrapTable> 
          </Col>
    )
}