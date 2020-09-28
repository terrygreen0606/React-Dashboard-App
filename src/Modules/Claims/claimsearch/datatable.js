import React, { Component } from 'react';

import { Card, CardBody, CardHeader, Col,Row} from 'reactstrap';
import data from './dummbydata';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


class datatable extends Component {
    constructor(props) {
        super(props);
        this.table = data.rows;
        this.options = {
            sortIndicator: true,
            hideSizePerPage: true,
            paginationSize: 3,
            hidePageListOnlyOnePage: true,
            clearSearch: true,
            alwaysShowAllBtns: false,
            withFirstAndLast: false
        }
    }
    nameFormat(cell, row) {
        const id = `/users/${row.id}`
        return (
            <a> {cell} </a>
        );
    };



    render() {
        return (
            <Row>
                <Col xs="12" sm="12" lg="12" className=" input-search-fields mt-4">
                    <div className="datatable">
                        <Card className="border-0">
                            <CardHeader className="last-trans rounded">
                                <h4 className="ml-2">Search results</h4>
                            </CardHeader>
                            <BootstrapTable data={this.table} borderless striped version="4"   options={this.options}>
                                <TableHeaderColumn dataField="policyno" className="header-table-color" dataSort dataFormat={this.nameFormat} >POLICY NO</TableHeaderColumn>
                                <TableHeaderColumn className="header-table-color" isKey dataField="insuredname">INSUREDNAME</TableHeaderColumn>
                                <TableHeaderColumn className="header-table-color" dataField="claimno" dataSort>CLAIM NO</TableHeaderColumn>
                                <TableHeaderColumn className="header-table-color" dataField="status" dataSort>STATUS</TableHeaderColumn>
                                <TableHeaderColumn className="header-table-color" dataField="losstype" dataSort>LOSS TYPE</TableHeaderColumn>
                                <TableHeaderColumn className="header-table-color" dataField="dayspending" dataSort>DAYS PENDING</TableHeaderColumn>
                            </BootstrapTable>
                        </Card>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default datatable;
