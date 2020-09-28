import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Col, Input, CardFooter, Card, CardHeader, CardBody, Button, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Switch from "react-switch";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as VendorService from '../../../services/accounting/VendorService';
import * as BankingService from '../../../services/accounting/banking';
import BackButton from '../../CommonComponents/BackButton';
import { formatDate, getDateFormat, getNumberFormat } from '../../CommonComponents/methods';
import { toastAction } from '../../../store/actions/toast-actions';
import Message from '../../../utilities/message';
import {STYLE} from '../../../utilities/constants';

const AccountTypeList = props => {
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState({ sortName: undefined, sortOrder: undefined });
    const [search, setSearch] = useState("all");
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [dueDate, setDueDate] = useState(new Date());
    const [PrintedDate, setDate] = useState(new Date());
    const [method, setMethod] = useState("ACH");
    const [methodValue, setMethodValue] = useState("");
    const [endingBalance, setEndingBalance] = useState(0);
    const [creditAmount, setCreditAmount] = useState({ status: false, credits: [], credit: 0 });
    const [modal, setModal] = useState(false);
    const [accountId, setAccountId] = useState('');
    useEffect(() => {
        props.getBankingList({ type: 'bank' }).then(() => props.invoiceList({ page }));
    }, []);
    const totalCredit = creditAmount.credits.reduce((total, val) => {
        total += val.credit_amount;
        return total;
    }, 0);
    /************* Toggle button **************/
    const toggle = () => setModal(!modal);
    const creditToggle = (value) => {
        const price = Number(value);
        if (price <= totalCredit) {
            setCreditAmount({ ...creditAmount, credit: value });
        } else {
            setCreditAmount({ ...creditAmount, credit: 0 });
            toastAction(false, Message.creditIncorrect);
        }
        setModal(!modal);
    }
    /************* Handle page change **************/
    const handlePageChange = (pageNumber, sizePerPage) => {
        //this.fetchData(page, sizePerPage);
        props.invoiceList({ page:pageNumber, date: search === "all" ? "" : getDateFormat(dueDate), sortTo: sort.sortName,
        sortBy: sort.sortOrder });
        setPage(pageNumber);
    }
    /*********** Action buttons ************/
    const selectActions = (cell, row) => {
        return <label>
            <Switch onColor="#080" offColor="#888" onChange={() => handleChange(row)} checked={selectedRecords.findIndex(s => s.inv_no === row.inv_no) > -1} height={15} width={30} />
        </label>
    };
    const handleChange = (row) => {
        const index = selectedRecords.findIndex(s => s.inv_no === row.inv_no);
        if (index === -1) {
            setSelectedRecords([row]);
            // selectedRecords.push(row);
            // setSelectedRecords(selectedRecords);
        } else {
            // selectedRecords.splice(index, 1);
            // setSelectedRecords(selectedRecords);
            setSelectedRecords([]);
        }

    }
    /**************Search account name or number ***************/
    const handleSearch = (event) => {
        if (event.target.id === "all") {
            props.invoiceList({ page });
        }
        setSearch(event.target.id);
    }
    /********* Handle payment ************/
    const handlePay = () => {
        const _vender = selectedRecords.find(row => row);
        if (_vender) {
            if (accountId || methodValue ) {
                const data = selectedRecords.reduce((acc, row) => {
                    const paid_amt = Number(row.balance) - creditAmount.credit;
                    acc.list.push({
                        "vender_id" : row.vender_id,
                        "inv_id": row.inv_id,
                        "paid_amt": paid_amt,
                        "Inv_Date": row.Inv_Date,
                        "PaymentMode": method,
                        "Check_no": methodValue || "0",
                        "inv_no": row.inv_no,
                        "Cash_Account": accountId,
                        "PrintedDate": new Date(PrintedDate).toISOString()
                    });
                    acc.total += paid_amt;
                    return acc;
                }, { total: 0, list: [] });
                const payload = {
                    "invoice": data.list
                };
                if (data.total <= endingBalance) {
                    props.payInvoice(payload).then(() => {
                        setSelectedRecords([]);
                        setDate(new Date());
                        setMethod("ACH");
                        setMethodValue("");
                        setEndingBalance(0);
                        setCreditAmount({ status: false, credits: [], credit: 0 });
                        props.history.push("/print-check");
                    });
                } else {
                    toastAction(false, Message.totalBalance)
                }               
            } else {
                toastAction(false, Message.accountId);
            }

        } else {
            toastAction(false, Message.selectVendor);
        }
    }
    /************ Check credit ***************/
    const _checkCredit = () => {
        const _vender = selectedRecords.find(row => row);
        if (_vender) {
            props.checkCredit({ vender_id: _vender ? _vender['vender_id'] : null }).then(res => {
                if (res && res.length) {
                    setCreditAmount({ ...creditAmount, credits: res });
                    toastAction(true, Message.setCrdit);
                }
            });
        } else {
            toastAction(false, Message.selectVendor);
        }
    }
    /************ Handle date change **************/
    const handleDateChange = (date, name = null) => {
        if (name === "dueDate" || search === "date") {
            props.invoiceList({ page, date: getDateFormat(date) });
            setDueDate(date);
        } else {
            setDate(date);
        }
    };
      /*********** Sorting Function ************/
    const sortMethod = (sortTo, sortBy) => {
        const pageNumber = page ? 1 : undefined;
        setSort({ sortName: sortTo, sortOrder: sortBy })
        props.invoiceList({ page: pageNumber, sortTo, sortBy });
        setPage(pageNumber);
    }
    /************ Handle method change **********/
    const onMethodChange = event => {
        setMethod(event.target.id);
        setEndingBalance(0);
    }
    // Customization Function 
    const rowClassNameFormat = (row, rowIdx) => {
        return { backgroundColor: rowIdx % 2 === 0 ? '#A2EFE8' : '#DCEFF1', color: "#000000" };
    }
    const handleAccountChange = (e) => {
        setAccountId(e.target.value);
        props.getEndingBalance({ id: e.target.value }, res => {
            if (res) {
                setEndingBalance(res[0].balance);
            }
        });
    };
    const { accounting, isLoading } = props;
    const options = {
        sortIndicator: true,
        page,
        onPageChange: handlePageChange,
        onSortChange: sortMethod,
        hideSizePerPage: true,
        paginationSize: 10,
        hidePageListOnlyOnePage: true,
        clearSearch: true,
        alwaysShowAllBtns: false,
        withFirstAndLast: false,
        sizePerPage: props.size
    };

    return (
        <div className="animated">
            <Card>
                <CardHeader>
                    <BackButton history={props.history} text={"Select bill to be paid"} />
                </CardHeader>
                <CardBody>
                    <FormGroup row>
                        <div className="search-invoice">
                            <Label htmlFor="select">Show bills:*</Label><br />
                            <>
                                <Label check>
                                 <Input type="radio" name="bill" id="date" checked={search === "date"} onChange={handleSearch} />{' '}
                                    Due on or before
                            </Label>
                                <DatePicker className="form-control" selected={dueDate} onChange={(date) => handleDateChange(date, 'dueDate')} />
                            </>
                            <br />
                            <Label check>
                                <Input type="radio" name="bill" id="all" checked={search === "all"} onChange={handleSearch} />{' '}
                                Show all bills
                            </Label></div>
                    </FormGroup>
                    {/* <FormGroup check>
                        <Label check>
                            <Input type="checkbox" onChange={() => handleChangeStatus()} />{' '}
                            Show inactive accounts
                        </Label>
                    </FormGroup> */}
                    {isLoading && (accounting && accounting.length === 0) ? <div className="animated fadeIn pt-1 text-center">Loading...</div> :
                        <BootstrapTable
                            data={accounting}
                            version="4"
                            remote
                            condensed
                            striped hover pagination
                            options={{ ...options, page }}
                            fetchInfo={{ dataTotalSize: props.total_rows }}
                            trStyle={rowClassNameFormat}
                        >
                            <TableHeaderColumn dataField="" dataFormat={selectActions}>Action</TableHeaderColumn>
                            <TableHeaderColumn isKey dataField="Inv_Due_Date" dataFormat={(cell, row) => formatDate(row, 'Inv_Due_Date') } dataSort>Due Date</TableHeaderColumn>
                            <TableHeaderColumn dataField="vend_name" dataSort>Vendor</TableHeaderColumn>
                            <TableHeaderColumn dataField="inv_no" dataSort>Invoice Number</TableHeaderColumn>
                            {/* <TableHeaderColumn dataField="" dataSort>Ref. No.</TableHeaderColumn> */}
                            <TableHeaderColumn dataField="balance" dataAlign='right'  dataFormat={(cell, row) => '$'+getNumberFormat(row.balance)} headerAlign="center" dataSort>Amt. Due</TableHeaderColumn>
                            <TableHeaderColumn dataField="credit_amount" dataAlign='right'  dataFormat={(cell, row) => '$'+getNumberFormat(row.credit_amount)} headerAlign="center" dataSort>Credits Used</TableHeaderColumn>
                            <TableHeaderColumn dataField="inv_amt" dataAlign='right'  dataFormat={(cell, row) => '$'+getNumberFormat(row.inv_amt)} headerAlign="center" dataSort>Amt. to Pay</TableHeaderColumn>
                        </BootstrapTable>
                    }
                </CardBody>
                <CardFooter>
                    <FormGroup row>
                        <Col md="4">
                            <Label htmlFor="select">CREDIT INFORMATION FOR HIGHLIGHTED BILL</Label><br />
                            <p><span>Number of Credits: {creditAmount.credits.length}</span></p>
                            <p><span>Total Credits Available: {totalCredit}</span></p>
                            <Button
                                type="button"
                                size="sm"
                                color="primary"
                                onClick={toggle}
                            >Set Credits</Button>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="4">
                            <Label htmlFor="select">Payment Date:*</Label><br />
                            <DatePicker className="form-control" selected={PrintedDate} onChange={(date) => handleDateChange(date)} />
                        </Col>
                        <Col md="4">
                            <Label htmlFor="select">Method:*</Label><br />
                            <Label check>
                                <Input type="radio" name="method" id="ACH" checked={method === "ACH"} onChange={onMethodChange} />{' '}
                                ACH
                            </Label>
                            <br />
                            <Label check>
                                <Input type="radio" name="method" id="CHECK" checked={method === "CHECK"} onChange={onMethodChange} />{' '}
                                Assign Check Number
                            </Label>
                        </Col>
                        <Col md="4">
                            {method === "ACH" ?
                                <>
                                    <Label htmlFor="select">Cash Account:*</Label>
                                    <Input type="select" name="account" id="select" onChange={e => handleAccountChange(e)}>
                                        <option value="" key="empty">Select Account Type</option>
                                        {props.bankingList.map((row, index) =>
                                            <option key={index} value={row.Account_ID}>{row.Account_Name}</option>)
                                        }
                                    </Input>
                                    <Label htmlFor="select">Ending Balance: <span style={{ color: 'red' }}>{endingBalance}</span></Label>

                                </>
                                :
                                <>
                                    <Label htmlFor="select">Check Number:*</Label>
                                    <Input type="text" name="checkNumber" id="checkNumber" value={methodValue} placeholder="Enter check no." onChange={e => setMethodValue(e.target.value)} />
                                </>
                            }
                        </Col>
                    </FormGroup>
                    <div className="pay-button">
                        <Button
                            type="button"
                            size="sm"
                            color="primary"
                            onClick={() => _checkCredit()}
                            style={{marginRight:STYLE.marginRight10}}
                        ><i className="fa fa-dot-circle-o"></i> Check Credit</Button>
                        <Button
                            type="button"
                            size="sm"
                            color="primary"
                            onClick={() => handlePay()}
                            style={{marginRight:STYLE.marginRight10}}
                        ><i className="fa fa-dot-circle-o"></i> {isLoading ? 'Pay selected bill...' : 'Pay selected bill'}</Button>
                        <Button type="reset" size="sm" color="danger" className="btn btn-cancel" onClick={() => props.history.goBack()}><i className="fa fa-ban"></i> Cancel</Button>
                    </div>
                    {/* <Button
                        type="button"
                        size="sm"
                        color="primary"
                        onClick={() => handlePay()}
                    ><i className="fa fa-dot-circle-o"></i> {isLoading ? 'Pay selected bill...' : 'Pay selected bill'}</Button>
                    <Button
                        id="reset"
                        model="account"
                        className="btn btn-cancel"
                    ><Button type="reset" size="sm" color="danger" className="btn btn-cancel"><i className="fa fa-ban"></i> Cancel</Button>
                    </Button> */}
                </CardFooter>
            </Card>
            <Modal isOpen={modal} toggle={toggle} className="modal-content">
                <ModalHeader toggle={toggle}>Set Credit</ModalHeader>
                <ModalBody>
                    <span>Total Credit amount is: {totalCredit}</span>
                    <Input type="number" name="credit" step="0.01" min="0" max={totalCredit} onChange={(e) => setCreditAmount({ ...creditAmount, credit: e.target.value })} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => creditToggle(creditAmount.credit)}>Set</Button>{' '}
                    <Button color="secondary" onClick={() => creditToggle(0)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

AccountTypeList.propTypes = {
    invoiceList: PropTypes.func.isRequired,
    accounting: PropTypes.array.isRequired,
    bankingList: PropTypes.array.isRequired,
    total_rows: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    vendorDelete: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    payInvoice: PropTypes.func.isRequired,
    getEndingBalance: PropTypes.func.isRequired,
    getBankingList: PropTypes.func.isRequired,
    checkCredit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    accounting: state.accounting.invoices,
    bankingList: state.accounting.bankingList,
    total_rows: state.accounting.total_rows,
    size: state.accounting.size,
    isLoading: state.loader.isLoading
});

const mapDispatchToProps = dispatch => ({
    invoiceList: bindActionCreators(VendorService.invoiceList, dispatch),
    vendorDelete: bindActionCreators(VendorService.vendorDelete, dispatch),
    payInvoice: bindActionCreators(VendorService.payInvoice, dispatch),
    getEndingBalance: bindActionCreators(BankingService.getEndingBalance, dispatch),
    getBankingList: bindActionCreators(BankingService.bankingList, dispatch),
    checkCredit: bindActionCreators(VendorService.checkCredit, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountTypeList);
