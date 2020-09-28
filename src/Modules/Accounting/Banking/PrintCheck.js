import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Col, Input, Card, CardHeader, CardBody, Button, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Switch from "react-switch";
import ReactToPrint from 'react-to-print';
import * as AccountService from '../../../services/accounting/VendorService';
import * as BankingService from '../../../services/accounting/banking';
import BackButton from '../../CommonComponents/BackButton';
import { formatDate } from '../../CommonComponents/methods';


const AccountTypeList = props => {
    let componentRef = useRef();
    const [page, setPage] = useState(1);
    const [selectedCounts, setCounts] = useState({ total: 0, amount: 0 });
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [account, setAccount] = useState({ status: false, value: '' });
    const [sort, setSort] = useState({ sortName: undefined, sortOrder: undefined });
    useEffect(() => {
        props.getBankingList({ type: 'bank', sortTo: 'Account_Name', sortBy: 'asc' }).then(() => props.invoiceList({ page }));
    }, []);
    /************* Handle page change **************/
    const handlePageChange = (pageChange) => {
        props.invoiceList({ page: pageChange });
        setPage(pageChange);
    }
    /*********** Action buttons ************/
    const selectActions = (row) => {
        return <label>
            <Switch onColor="#080" offColor="#888" onChange={() => handleChange(row)} checked={selectedRecords.findIndex(s => s.inv_no === row.inv_no || s.inv_no === "all") > -1} height={15} width={30} />
        </label>
    };
    const handleChange = (row) => {
        const index = selectedRecords.findIndex(s => s.inv_no === row.inv_no);
        if (index === -1) {
            selectedRecords.push(row);
            setSelectedRecords(selectedRecords);
        } else {
            selectedRecords.splice(index, 1);
            setSelectedRecords(selectedRecords);
        }
        if (selectedRecords.findIndex(val => val.inv_no === "all") === -1) {
            const counts = selectedRecords.reduce((count, records) => {
                count.total += 1;
                count.amount += Number(records.inv_amt);
                return count;
            }, { total: 0, amount: 0 });
            setCounts(counts);
        } else {
            const counts = accounting.reduce((acc, val) => {
                acc.total += 1;
                acc.amount += Number(val.inv_amt);
                return acc;
            }, { total: 0, amount: 0 });
            setCounts(counts);
        }
        
    }
    // Customization Function 
    const rowClassNameFormat = (rowIdx) => {
        return { backgroundColor: rowIdx % 2 === 0 ? '#A2EFE8' : '#DCEFF1', color: "#000000" };
    }
    const handleAccountChange = (e) => {
        setAccount({ ...account, value: e.target.value });
    };

      /*********** Sorting Function ************/
      const sortMethod = (sortTo, sortBy) => {
        const pageNumber = page ? 1 : undefined;
        setSort({ sortName: sortTo, sortOrder: sortBy })
        props.invoiceList({ page: pageNumber, sortTo, sortBy });
        setPage(pageNumber);
    }
    const { accounting } = props;
    const options = {
        sortIndicator: true,
        page,
        onPageChange: handlePageChange,
        hideSizePerPage: true,
        paginationSize: 10,
        hidePageListOnlyOnePage: true,
        clearSearch: true,
        alwaysShowAllBtns: false,
        withFirstAndLast: false,
        sizePerPage: props.size,
        onSortChange: sortMethod,
        sortName: sort.sortName,
        sortOrder: sort.sortOrder
    };

    return (
        <div className="animated">
            <Card>
                <CardHeader>
                    <BackButton history={props.history} text={"Print Check"} />
                </CardHeader>
                <CardBody>
                    <InvoiceTable
                        ref={componentRef}
                        {...props}
                        accounting={accounting}
                        options={options}
                        page={page}
                        rowClassNameFormat={(row , index)=>rowClassNameFormat(index)}
                        selectActions={(cell, row)=>selectActions(row)}
                        handleChange={handleChange}
                        selectedRecords={selectedRecords}
                        handleAccountChange={handleAccountChange}
                        selectedCounts={selectedCounts}
                        account={account}
                    />
                    <Col md="2" style={{ float: "left" }}>
                        <p>
                            <Button
                                type="button"
                                size="lg"
                                style={{ width: "90%" }}
                                color="primary"
                                onClick={() => handleChange({ inv_no: "all" })}
                            >{selectedRecords.findIndex(s => s.inv_no === "all") > -1 ? "Deselect  All" : "Select All"}</Button>
                        </p>
                        <p>
                            <ReactToPrint
                                trigger={() => <Button type="reset" style={{ width: "90%" }} size="lg" color="primary" className="btn btn-cancel">OK</Button>}
                                content={() => componentRef.current}
                                onBeforeGetContent={() => setAccount({ ...account, status: true })}
                                onAfterPrint={() => setAccount({ ...account, status: false })}
                            />
                        </p>
                    </Col>
                </CardBody>
            </Card>
        </div>
    );
};

class InvoiceTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }
    render() {
        const { accounting, account, options, bankingList, handleAccountChange, selectedCounts, page, total_rows, rowClassNameFormat, selectActions, handleChange, selectedRecords, isLoading } = this.props;
        return <div>
            <FormGroup row>
                <Col md="2">
                    <Label htmlFor="select">Bank Account</Label>
                </Col>
                <Col md="4">
                    <Input type={account.status ? "hidden" : "select"} name="account" id="select" onChange={e => handleAccountChange(e)}>
                        <option value="" key="empty">Select Account Type</option>
                        {bankingList.map((row, index) =>
                            <option key={index} value={row.Account_Name}>{row.Account_Name}</option>)
                        }
                    </Input>
                    <Input type={account.status ? "text" : "hidden"} name="account" value={account.value} />
                </Col>
                <Col md="2">
                    <Label htmlFor="select">First Check Number</Label>
                </Col>
                <Col md="4">
                    <Input type="text" name="check" value={this.state.value} onChange={e => this.setState({ value: e.target.value })} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col md="6">
                    <p>Select Checks to print, then click OK.</p>
                    <p>There are {selectedCounts.total} Checks to print for ${selectedCounts.amount}</p>

                </Col>
            </FormGroup>
            <Col md="10" style={{ float: "left" }}>
                {isLoading ? <div className="animated fadeIn pt-1 text-center">Loading...</div> :
                    <BootstrapTable
                        data={accounting}
                        version="4"
                        remote
                        condensed
                        striped hover pagination
                        options={{ ...options, page }}
                        fetchInfo={{ dataTotalSize: total_rows }}
                        trStyle={rowClassNameFormat}
                    >
                        <TableHeaderColumn dataField="" dataFormat={selectActions}><Switch onColor="#080" offColor="#888" checked={selectedRecords.findIndex(s => s.inv_no === "all") > -1} onChange={() => handleChange({ inv_no: "all" })} height={15} width={30} /></TableHeaderColumn>
                        <TableHeaderColumn isKey dataField="Inv_Due_Date" dataFormat={(cell, row) => formatDate(row, 'Inv_Due_Date')} dataSort>Due Date</TableHeaderColumn>
                        <TableHeaderColumn dataField="vend_name" dataSort>Payee</TableHeaderColumn>
                        <TableHeaderColumn dataField="inv_amt">Amount</TableHeaderColumn>
                    </BootstrapTable>
                }
            </Col>
        </div>
    }
}

AccountTypeList.propTypes = {
    invoiceList: PropTypes.func.isRequired,
    accounting: PropTypes.array.isRequired,
    bankingList: PropTypes.array.isRequired,
    total_rows: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    getBankingList: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    accounting: state.accounting.invoices,
    bankingList: state.accounting.bankingList,
    total_rows: state.accounting.total_rows,
    size: state.accounting.size,
    isLoading: state.loader.isLoading
});

const mapDispatchToProps = dispatch => ({
    invoiceList: bindActionCreators(AccountService.invoiceList, dispatch),
    getBankingList: bindActionCreators(BankingService.bankingList, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountTypeList);
