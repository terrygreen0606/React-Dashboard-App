import React, { Component } from 'react';
import TransferBookHeader from './TransferBookHeader';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Fade,
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupText,
    Label,
    Row,
    Table,
} from 'reactstrap';
import { TableHeaderColumn } from 'react-bootstrap-table';
class TransferBookTable extends Component {

    render() {
        return (
            <div className="animated fadeIn">
                
                        <Card>
                            <CardHeader><h4>Search Result</h4></CardHeader>
                            <CardBody>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Policy Type</th>
                                            <th>Policy No</th>
                                            <th>Insured Name</th>
                                            <th>Status</th>
                                            <th>Remark</th>
                                            <th>Agent</th>
                                            <th>Agency</th>
                                            <th>SS Policy No</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                                          
                    
            </div>
        );
    }
}

export default TransferBookTable;
