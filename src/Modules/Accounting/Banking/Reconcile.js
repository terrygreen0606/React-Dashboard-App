import React, { useEffect, useState, useRef } from 'react';
import { actions } from 'react-redux-form';
import {
    Button,
    Card,
    CardHeader,
    Col,
    Row
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import { FaPrint } from "react-icons/fa";
import ReactToPrint from 'react-to-print';
import * as AccountService from '../../../services/accounting/banking';
import BackButton from '../../CommonComponents/BackButton';
import { getDateFormat } from '../../CommonComponents/methods';
import ReconcileForm from './ReconcileForm';

export default ({ history }) => {
    let myFormRef, componentRef = useRef();
    const dispatch = useDispatch();
    const { accounting, loader } = useSelector(state => state);
    const [date, setDate] = useState(null);
    const [balance, setBalance] = useState(0);
    const [account, setAccount] = useState({ status: false, value: '' });
    useEffect(() => {
        dispatch(AccountService.bankingList({ type: 'bank', sortTo: 'Account_Name', sortBy: 'asc' }));
    }, []);

    const handleDateChange = (dateTime) => {
        setDate(dateTime);
    };
    /********** Handle form submit ************/
    const handleSubmit = (values) => {
        const dateValues = { ...values };
        const endDate = dateValues.endDate;
        delete dateValues.endDate;
        dispatch(AccountService.getTransactionDetails({
            ...dateValues,
            date: getDateFormat(endDate),
            openingBalance: balance
        })).then(() => {
            history.push("/reconcile-bank");
        });
    };
    /*********** Handle account change *******/
    const handleAccountChange = e => {
        dispatch(AccountService.getReconcileOpeningBalance({ id: e.target.value }, res => {
            if (res) {
                setBalance(res[0].open_balance || 0);
            }
        }));
        const _account = accounting.bankingList.find(row => row.Account_ID.toString() === e.target.value.toString());
        setAccount({ ...account, value: _account['Account_Name'] || "" });
    }
    /************** Reset form values ************/
    const resetForm = () => {
        ['banking.Account_ID', 'banking.endingBalance', 'banking.service_charge', 'banking.interest_income'].map(key =>
            myFormRef.dispatch(actions.change(key, ''))
        );
        setDate(null);
        setBalance(0);
    };

    return (
        <div className="animated fadeIn">
            <Row>
                <Col xs="12" md="8">
                    <Card>
                        <CardHeader>
                            <BackButton history={history} text={<ReactToPrint
                                trigger={() => <Button type="button" color="secondary" size="sm" active><FaPrint /></Button>}
                                content={() => componentRef.current}
                                onBeforeGetContent={() => setAccount({ ...account, status: true })}
                                onAfterPrint={() => setAccount({ ...account, status: false })}
                            />} />
                        </CardHeader>
                        <ReconcileForm
                            ref={componentRef}
                            handleSubmit={handleSubmit}
                            myFormRef={e => myFormRef = e}
                            accounting={accounting}
                            date={date}
                            handleDateChange={handleDateChange}
                            loader={loader}
                            resetForm={resetForm}
                            handleAccountChange={handleAccountChange}
                            balance={balance}
                            account={account}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}