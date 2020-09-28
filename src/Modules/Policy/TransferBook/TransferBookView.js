import React, { Component } from 'react';

import TransferBookHeader from './TransferBookHeader';
import TransferBookTable from './TransferBookTable';
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
class TransferBookView extends Component {
   
    render() {
        return (
            <div className="animated fadeIn">
                <Card>
                    <CardHeader><h1>Administration</h1></CardHeader>
                    <CardBody>
                        <TransferBookHeader />
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default TransferBookView;
