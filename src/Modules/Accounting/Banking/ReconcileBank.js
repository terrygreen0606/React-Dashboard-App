import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Col, Input, Label, Card, CardHeader, CardBody, CardFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import * as AccountService from '../../../services/accounting/banking';
import BackButton from '../../CommonComponents/BackButton';
import { formatDate } from '../../CommonComponents/methods';
import {STYLE} from '../../../utilities/constants';

const BankingList = props => {
    const { accounting, bankingList, isLoading } = props;
    const [check, setCheck] = useState({ payment: false, deposit: false, ids: [] });
    const [status, setStatus] = useState(true);
    const serviceCharge = { Transaction_No: '', Transaction_Date: '', Check_no: '', memo: 'Service Charge', debit_amount: Number(accounting.Common['service_charge'] || 0) };
    const totalPayments = [...accounting.payment, serviceCharge].reduce((total, payment) => {
        if (check.payment || check.ids.includes(payment.Transaction_ID)) {
            total += Number(payment.debit_amount);
        }
        return total;
    }, 0);
    const totalDeposit = accounting.deposit.reduce((total, deposit) => {
        if (check.deposit || check.ids.includes(deposit.Transaction_ID)) {
            total += Number(deposit.debit_amount);
        }
        return total;
    }, 0);

    /************* Handle active/inactive status *************/
    const handleChangeStatus = () => {
        const accountStatus = !status;
        setStatus(accountStatus);
    }
    // Customization Function 
    const rowClassNameFormat = (row, rowIdx) => {
        return { backgroundColor: rowIdx % 2 === 0 ? '#A2EFE8' : '#DCEFF1', color: "#000000" };
    }
    /************* Handle checkbox status ************/
    const handleCheckBoxStatus = (Transaction_ID) => {
        const index = check.ids.findIndex(id => id === Transaction_ID);
        if (index === -1) {
            check.ids.push(Transaction_ID);
            setCheck({ ...check, ids: check.ids });
        } else {
            check.ids.splice(index, 1)
            setCheck({ ...check, ids: check.ids });
        }
    }
    /********** get checkbox list *************/
    const getCheckBox = (row, name) => {
        return <Input
            type="checkbox"
            checked={check[name] || check.ids.includes(row.Transaction_ID)}
            className="form-check-input-custome"
            onChange={() => handleCheckBoxStatus(row.Transaction_ID)}
        />
    }
    /********** Save Reconcile data *************/
    const saveReconcile = () => {
        const _account = bankingList.find(row => row.Account_ID.toString() === accounting.Common['Account_ID']);
        const minusPayment = accounting.deposit.reduce((obj, row) => {
            return ({ ...obj, [row.Transaction_ID]: `minus_${row.Transaction_ID}_${row.debit_amount}` });
        }, {});
        const object = {
            "miscdata": {
                "open_balance": accounting.Common['openingBalance'] || "0",
                "open_balance_flag": (totalDeposit + (Number(accounting.Common['openingBalance']) || 0) - totalPayments).toString(),
                "end_balance": accounting.Common['endingBalance'] || "0",
                "service_charge": accounting.Common['service_charge'] || "0",
                "interest_income": accounting.Common['interest_income'] || "0",
                "ending_date": accounting.Common['date'],
                "pending": "yes"
            },
            "ids": {
                "000C": "plus_000C_" + (accounting.Common['service_charge'] || "0"),
                ...minusPayment,
                "000D": "minus_000D_" + (accounting.Common['interest_income'] || "0")
            },
            "Transaction_Date": accounting.Common['date'],
            "Account_ID": accounting.Common['Account_ID'] || '',
            "AccountNumber": _account ? _account.Account_No : ''
        };
        props.saveReconcile(object).then(() => {
            props.history.push("/banking-center");
        });
    }

    const options = {
        sortIndicator: true,
        clearSearch: true,
        alwaysShowAllBtns: false,
        withFirstAndLast: false
    };

    return (
        <div className="animated">
            <Card>
                <CardHeader>
                    <BackButton history={props.history} />
                </CardHeader>
                <CardBody>
                    <FormGroup row className="col-md-12">
                        <Col className="col-md-8"> For Period:- {formatDate(accounting.Common, 'date')} </Col>
                        <Col className="col-md-4">
                            <Label check>
                                <Input type="checkbox" onChange={() => handleChangeStatus()} />{' '}
                                Hide transaction's after the end date
                            </Label>
                        </Col>
                    </FormGroup>
                    {isLoading ? <div className="animated fadeIn pt-1 text-center">Loading...</div> :
                        <FormGroup row className="col-md-12">
                            <Col className="col-md-6">
                                <BootstrapTable
                                    data={[...accounting.payment, serviceCharge]}
                                    version="4"
                                    remote
                                    condensed
                                    striped hover
                                    options={{ ...options }}
                                    //fetchInfo={{ dataTotalSize: props.total_rows }}
                                    trStyle={rowClassNameFormat}
                                >
                                    <TableHeaderColumn dataField="" dataFormat={(cell, row) => getCheckBox(row, 'payment')} >
                                        <Input type="checkbox" checked={check.payment} onClick={() => setCheck({ ...check, payment: !check.payment })} className="form-check-input-custome" />
                                    </TableHeaderColumn>
                                    <TableHeaderColumn isKey dataField="Transaction_No" >Number</TableHeaderColumn>
                                    <TableHeaderColumn dataField="Transaction_Date" >Date</TableHeaderColumn>
                                    <TableHeaderColumn dataField="Check_no">CHK#</TableHeaderColumn>
                                    <TableHeaderColumn dataField="memo">Payee</TableHeaderColumn>
                                    <TableHeaderColumn dataField="debit_amount">Amount</TableHeaderColumn>
                                </BootstrapTable>
                            </Col>
                            <Col className="col-md-6">
                                <BootstrapTable
                                    data={accounting.deposit}
                                    version="4"
                                    remote
                                    condensed
                                    striped hover
                                    options={{ ...options }}
                                    //fetchInfo={{ dataTotalSize: props.total_rows }}
                                    trStyle={rowClassNameFormat}
                                >
                                    <TableHeaderColumn dataField="" dataFormat={(cell, row) => getCheckBox(row, 'deposit')} >
                                        <Input type="checkbox" checked={check.deposit} onClick={() => setCheck({ ...check, deposit: !check.deposit })} className="form-check-input-custome" />
                                    </TableHeaderColumn>
                                    <TableHeaderColumn isKey dataField="Transaction_No">Number</TableHeaderColumn>
                                    <TableHeaderColumn dataField="Transaction_Date">Date</TableHeaderColumn>
                                    <TableHeaderColumn dataField="memo">Payee</TableHeaderColumn>
                                    <TableHeaderColumn dataField="debit_amount">Amount</TableHeaderColumn>
                                </BootstrapTable>
                            </Col>
                            <Col className="col-md-7 offset-md-5">
                                <FormGroup row>
                                    <Button type="button" size="sm" color="primary" onClick={() => setCheck({ ...check, payment: true, deposit: true })} style={{marginRight:STYLE.marginRight10}}><i className="fa fa-dot-circle-o"></i> Mark All</Button>
                                    <Button type="reset" size="sm" color="primary" onClick={() => setCheck({ ...check, ids: [], payment: false, deposit: false })}><i className="fa fa-dot-circle-o"></i> Unmark All</Button>
                                </FormGroup>

                            </Col>
                            <Col className="col-md-7">
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="select">Begining Balance:</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <span>{accounting.Common['openingBalance'] || 0}</span>
                                    </Col>
                                </FormGroup>
                                <span>Items you have marked closed</span>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="select">Deposite and other credits:</Label>
                                    </Col>
                                    <Col xs="12" md="8">
                                        <span>{totalDeposit}</span>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="select">Checks and payments:</Label>
                                    </Col>
                                    <Col xs="12" md="8">
                                        <span>{totalPayments}</span>
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col className="col-md-5">
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="select">Service Charge:</Label><span> {accounting.Common['service_charge'] || 0}</span>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="select">Interest Earned:</Label><span> {accounting.Common['interest_income'] || 0}</span>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="select">Ending Balance:</Label><span> {accounting.Common['endingBalance'] || 0}</span>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="select">Cleared Balance:</Label><span> {totalDeposit + (Number(accounting.Common['openingBalance']) || 0) - totalPayments}</span>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="select">Difference:</Label><span> {(totalDeposit + (Number(accounting.Common['openingBalance']) || 0) - totalPayments) - (accounting.Common['endingBalance'] || 0)}</span>
                                    </Col>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    }
                </CardBody>
                <CardFooter>
                    <Button type="button" size="sm" color="primary" onClick={() => saveReconcile()} style={{marginRight:STYLE.marginRight10}}><i className="fa fa-dot-circle-o"></i> {'Reconcile Now'}</Button>
                    <Button type="reset" size="sm" color="danger" onClick={() => props.history.goBack()}><i className="fa fa-ban"></i> Leave</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

BankingList.propTypes = {
    saveReconcile: PropTypes.func.isRequired,
    accounting: PropTypes.object.isRequired,
    bankingList: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    accounting: state.accounting.reconcileBank,
    bankingList: state.accounting.bankingList,
    isLoading: state.loader.isLoading
});

const mapDispatchToProps = dispatch => ({
    saveReconcile: bindActionCreators(AccountService.saveReconcileTransactions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(BankingList);
