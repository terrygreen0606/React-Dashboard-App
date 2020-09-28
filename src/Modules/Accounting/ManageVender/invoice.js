import React, { useEffect, useState, useCallback, useRef } from 'react';
import { actions } from 'react-redux-form';
import {
    Button,
    Card,
    CardHeader,
    Col,
    Row
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaPrint } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import ReactToPrint from 'react-to-print';
import * as BankingService from '../../../services/accounting/banking';
import Account from '../../../services/accounting';
import * as AccountService from '../../../services/accounting/VendorService';
import BackButton from '../../CommonComponents/BackButton';
import { formatDate, getDateFormat } from '../../CommonComponents/methods';
import InvoiceForm from './InvoiceForm';

export default ({ history }) => {
    let myFormRef, componentRef = useRef();
    const dispatch = useDispatch();
    const { accounting, loader } = useSelector(state => state);
    let data = accounting.invoices ? accounting.invoices.find(invoice => invoice.inv_id === accounting.edit_row_id) : {};
    let vender = data && Object.keys(data).length ? accounting.vendors.find(vendorRow => vendorRow.vend_id.toString() === data['vender_id'].toString()) : {};
    data = vender && Object.keys(vender).length ? { ...data, address: vender['vend_address'], vendor_id: data['vend_name'] } : data;
    const [address, setAddress] = useState(vender ? vender['vend_address'] : "");
    const [date, setDate] = useState(data && data['Inv_Date'] ? new Date(formatDate(data, 'Inv_Date')) : null);
    const [dueDate, setDueDate] = useState(data && data['Inv_Due_Date'] ? new Date(formatDate(data, 'Inv_Due_Date')) : null);
    const [expenses, setExpenses] = useState([{}]);
    const [vendor, setVendor] = useState({ status: false, value: '' });
    const [endingBalance, setEndingBalance] = useState({});
    const [vendorId, setVendorId] = useState(data ? data['vender_id'] : '');
    const [btn, setBtn] = useState(true);
    useEffect(() => {
        dispatch(AccountService.vendorList({ page: 1, search: accounting.edit_row_id ? data['vend_name'] : '' }));
        dispatch(Account.accountsList({ type: 'expenses' }));
    }, []);

    useEffect(() => {
        resetFormData();
    }, [accounting.vendors]);

    useEffect(() => {
        myFormRef.dispatch(actions.change(`invoice.vendor_id`, vendorId));
    }, [vendorId])
    /******** Reset form values **********/
    const resetFormData = useCallback(() => {
        if (data && Object.keys(data).length) {
            vender = accounting.vendors.find(vendorData => vendorData.vend_id.toString() === data['vender_id'].toString()) || {};
            data = { ...data, address: vender['vend_address'], vendor_id: `${vender['vend_id'] || ''},${vender['vend_address'] || ''}`, Inv_Date: new Date(formatDate(data, 'Inv_Date')), Inv_Due_Date: new Date(formatDate(data, 'Inv_Due_Date')) };
            Object.keys(data).forEach(key => {
                myFormRef.dispatch(actions.change(`invoice.${key}`, data[key]));
            });
        }
    }, [accounting.vendors]);

    const removefromExpenses = index => {
        expenses.splice(index, 1);
        setExpenses([...expenses]);
    };

    const handleDateChange = (name, dateTime) => {
        if (name === "date") {
            var newdate = new Date(dateTime);
            newdate.setDate(newdate.getDate() + 10);
            var dd = newdate.getDate();
            var mm = newdate.getMonth() + 1;
            var y = newdate.getFullYear();
            var dueDate = mm + '/' + dd + '/' + y;
            setDate(dateTime);
            setDueDate(new Date(dueDate));
        }
    };
    /********** Handle form submit ************/
    const handleSubmit = (values) => {
           if (accounting.edit_row_id) {
            const object = {
                "inv_no": values.inv_no,
                "vendor_id": vendorId,
                "Inv_Date": getDateFormat(values.Inv_Date),
                "Inv_Due_Date": getDateFormat(values.Inv_Due_Date),
                "inv_amt": values.inv_amt,
                "inv_memo": values.inv_memo,
                "balance": 0
            };
            dispatch(AccountService.updateInvoice({ ...object, inv_id: accounting.edit_row_id })).then(() => {
                history.push("/invoice")
            });
        } else {
            const object = {
                invoice: {
                    ...values,
                    balance: "0",
                    vendor_id: vendorId,
                    Inv_Date: getDateFormat(values.Inv_Date),
                    Inv_Due_Date: getDateFormat(values.Inv_Due_Date)
                },
                expenses: Object.values(values.expenses).map(row => ({ ...row, Transaction_Date: getDateFormat(values.Inv_Date), Invoice_No: values.inv_no }))
            };
            delete object.invoice.expenses;
            delete object.invoice.address;
            dispatch(AccountService.saveInvoice(object)).then(() => {
                if(btn){
                history.push("/invoice")
                }else{
                    resetForm();
                }
            });
        }
    };
    /************** Reset form values ************/
    const resetForm = () => {
        console.log(myFormRef);
        dispatch && ['invoice.vend_name','invoice.vendor_id', 'invoice.address', 'invoice.terms', 'invoice.inv_memo', 'invoice.inv_no', 'invoice.inv_amt'].map(key =>
            myFormRef.dispatch(actions.change(key, ''))
        );
        setDate(null);
        setDueDate(null);
    };
    const handleAccountChange = (e, key) => {
        dispatch(BankingService.getEndingBalance({ id: e.target.value }, res => {
            if (res) {
                setEndingBalance({ ...endingBalance, [key]: res[0].balance });
            }
        }));
    };

    const searhVendors = useCallback(
        (searchData) => {
            dispatch(AccountService.vendorList({ page: 1, search: searchData }));
        }, []);
    const buttonName = accounting.edit_row_id ? "Update & Close" : "Save & Close";
    return (
        <div className="animated fadeIn">
            <Row>
                <Col xs="12" md="8">
                    <Card>
                        <CardHeader>
                            <BackButton history={history} text={<ReactToPrint
                                trigger={() => <Button type="button" color="secondary" size="sm" active><FaPrint /></Button>}
                                content={() => componentRef.current}
                                onBeforeGetContent={() => setVendor({ ...vendor, status: true })}
                                onAfterPrint={() => setVendor({ ...vendor, status: false })}
                            />} />

                        </CardHeader>
                        <InvoiceForm
                            ref={componentRef}
                            myFormRef={e => myFormRef = e}
                            data={data}
                            accounting={accounting}
                            setAddress={setAddress}
                            address={address}
                            date={date}
                            handleSubmit={handleSubmit}
                            handleDateChange={handleDateChange}
                            dueDate={dueDate}
                            setExpenses={setExpenses}
                            expenses={expenses}
                            removefromExpenses={removefromExpenses}
                            loader={loader}
                            buttonName={buttonName}
                            resetForm={resetForm}
                            history={history}
                            setVendor={setVendor}
                            vendor={vendor}
                            handleAccountChange={handleAccountChange}
                            endingBalance={endingBalance}
                            searhVendors={val => searhVendors(val)}
                            setVendorId={setVendorId}
                            btn={btn}
                            setBtn={setBtn}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}