import React, { useEffect, useState } from 'react';
import { LocalForm, Control, Errors, actions } from 'react-redux-form';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
    Table
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillPlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as VendorService from '../../../services/accounting/VendorService';
import * as BankingService from '../../../services/accounting/banking';
import { required } from '../../../utilities/regex';
import Message from '../../../utilities/message';
import BackButton from '../../CommonComponents/BackButton';
import { getDateFormat } from '../../CommonComponents/methods';
import {STYLE} from '../../../utilities/constants';

let myFormRef = React.createRef();
export default ({ history }) => {
    const dispatch = useDispatch();
    const { accounting, loader } = useSelector(state => state);
    const [date, setDate] = useState(null);
    const [vendorAddress , setVendorAddress] = useState('');
    const [buttonStatus, setButtonStatus] = useState(true);
    const [expenses, setExpenses] = useState([{}]);
    const [endingBalance, setEndingBalance] = useState(null);
    useEffect(() => {
        dispatch(VendorService.vendorList({sortTo: 'vend_name', sortBy: 'asc'}));
        dispatch(BankingService.bankingList({ type: 'bank', sortTo: 'Account_Name', sortBy: 'asc' })).then(() => dispatch(BankingService.bankingList({ type: 'expense', sortTo: 'Account_Name', sortBy: 'asc' })));
         }, [resetForm]);

    const removefromExpenses = index => {
        expenses.splice(index, 1);
        setExpenses([...expenses]);
    };

    const handleDateChange = (dateTime) => {
        setDate(dateTime);
    };
    /********** Handle form submit ************/
    const handleSubmit = (values) => {
        const expensesValues = Object.values(values.expenses);
        const object = {
            ...values,
            date: getDateFormat(values.date),
            amount: expensesValues.reduce((total, val) => { return total + Number(val.Amount) }, 0),
            expenses: expensesValues
        };
        dispatch(BankingService.writeCheck(object)).then(() => {
            if (buttonStatus) {
                history.push("/banking-center");
            } else {
                resetForm();
            }
        });

    };

    const handleAccountChange = (e) => {
        dispatch(BankingService.getEndingBalance({ id: e.target.value }, res => {
            if (res) {
                setEndingBalance(res[0].balance);
            }
        }));
    };
    /************** Reset form values ************/
    const resetForm = () => {
        myFormRef &&  ['banking.account_id', 'banking.address', 'banking.vendor_id', 'banking.memo'].map(key =>
           myFormRef.dispatch(actions.change(key, ''))
        );
        setVendorAddress('');
        setDate(null);
        setEndingBalance(null);
    };
    /***Address Display****/
    const getAddress = (e) => {
        let vendor = '';
        accounting.vendors.map((row, index) =>{if(row.vend_id == e.target.value){ vendor = `${row.vend_address}, ${row.vend_city || '-'}, ${row.vend_state || ''}-${row.vend_zip || '-'}, ${row.vend_Country || '-'}`;} });
         setVendorAddress(vendor);
          }
    return (
        <div className="animated fadeIn">
            <Row>
                <Col xs="12">
                    <Card>
                        <CardHeader>
                            <BackButton history={history} />
                        </CardHeader>
                        <LocalForm
                            onSubmit={(values) => handleSubmit(values)}
                            model="banking"
                            className="form-horizontal"
                            ref={(el) => myFormRef = el}
                        >

                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="select">Bank Account:*</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Control
                                            model=".account_id"
                                            onChange={e => handleAccountChange(e)}
                                            component={props => <Input {...props} type="select" name="Account_Type_ID" id="select">
                                                <option value="" key="empty">Select Account</option>
                                                {accounting.bankingList.map((row, index) =>
                                                    <option key={index} value={`${row.Account_ID}`}>{row.Account_Name}</option>)
                                                }
                                            </Input>}
                                            validators={{ required }}
                                        />
                                        <Errors
                                            model=".account_id"
                                            show={(field) => field.touched && !field.focus}
                                            className="error"
                                            messages={{
                                                required: Message.required
                                            }}
                                        />
                                    </Col>
                                </FormGroup>
                                {endingBalance &&
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="select">Ending Balance:</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <span style={{ color: 'red' }}>-{endingBalance}</span>
                                        </Col>
                                    </FormGroup>
                                }
                                
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="select">Pay to the order of:*</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Control
                                            model=".vendor_id"
                                            onChange={(e)=>getAddress(e)}
                                            component={props => <Input {...props} type="select" name="vendor_id" id="select">
                                                <option value="" key="empty">Select Vendor</option>
                                                {accounting.vendors.map((row, index) =>
                                                    <option key={index} value={`${row.vend_id}`}>{row.vend_name}</option>)
                                                }
                                            </Input>}
                                            validators={{ required }}
                                        />
                                        <Errors
                                            model=".vendor_id"
                                            show={(field) => field.touched && !field.focus}
                                            className="error"
                                            messages={{
                                                required: Message.required
                                            }}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">Address:</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Control
                                            model=".address"
                                            component={props => <Input {...props} type="textarea" id="text-input" name="text-input" placeholder="Address" value={vendorAddress} />}

                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">Memo:</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Control
                                            model=".memo"
                                            component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="Memo" />}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">Date*:</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Control
                                            model=".date"
                                            className="form-control"
                                            onChange={(edate) => handleDateChange(edate)}
                                            selected={date}
                                            component={props => <DatePicker  {...props} />}
                                            validators={{ required }}
                                            />
                                            <Errors
                                                model=".date"
                                                show={(field) => field.touched && !field.focus}
                                                className="error"
                                                messages={{
                                                    required: Message.required
                                                }}
                                            />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col xs="12">
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>Account</th>
                                                    <th>Amount</th>
                                                    <th>Memo</th>
                                                    <th>Customer Job</th>
                                                    <th>Billable</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    expenses.map((row, index) =>
                                                        <tr>
                                                            <td>
                                                                <Control
                                                                    model={`.expenses[${index}].Account_ID`}
                                                                    component={props => <Input {...props} type="select" name="Account_Type_ID" id="select">
                                                                        <option value="" key="empty">Select Account</option>
                                                                        {accounting.expenseBank.map((accountsRow, accountsIndex) =>
                                                                            <option key={accountsIndex} value={accountsRow.Account_ID}>{accountsRow.Account_Name}</option>)
                                                                        }
                                                                    </Input>}
                                                                />
                                                            </td>
                                                            <td>
                                                                <Control
                                                                    model={`.expenses[${index}].Amount`}
                                                                    component={props => <Input {...props} type="number" id="text-input" name="text-input" placeholder="Amount" />}

                                                                />
                                                            </td>
                                                            <td>
                                                                <Control
                                                                    model={`.expenses[${index}].memo`}
                                                                    component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="Memo" />}

                                                                />
                                                            </td>
                                                            <td>
                                                                <Control
                                                                    model={`.expenses[${index}].customer_job`}
                                                                    component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="Customer Job" />}

                                                                />
                                                            </td>
                                                            <td>
                                                                <Control
                                                                    model={`.expenses[${index}].billable`}
                                                                    component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="Billable" />}

                                                                />
                                                            </td>
                                                            <td>
                                                                <IconContext.Provider value={{ color: "red", size: "2em", className: "search-account" }}>
                                                                    <div onClick={() => removefromExpenses(index)}>
                                                                        <AiOutlineMinusCircle />
                                                                    </div>
                                                                </IconContext.Provider>
                                                            </td>
                                                        </tr>
                                                    )}

                                            </tbody>
                                            <IconContext.Provider value={{ color: "green", size: "2em", className: "search-account" }}>
                                                <div onClick={() => setExpenses([...expenses, {}])}>
                                                    <AiFillPlusCircle />
                                                </div>
                                            </IconContext.Provider>
                                        </Table>

                                    </Col>
                                </FormGroup>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" disabled={loader.isLoading} size="sm" color="primary" onClick={() => setButtonStatus(true)} style={{marginRight:STYLE.marginRight10}}> <i className="fa fa-dot-circle-o"></i> {loader.isLoading ? 'Saving...' : 'Save & Close'}</Button>
                                <Button type="submit" disabled={loader.isLoading} size="sm" color="primary" onClick={() => setButtonStatus(false)} style={{marginRight:STYLE.marginRight10}}> <i className="fa fa-dot-circle-o"></i> {loader.isLoading ? 'Saving...' : 'Save & New'}</Button>
                                <Button type="reset" id="resetbtn" size="sm" color="danger" onClick={() => resetForm()}><i className="fa fa-ban"></i> Reset</Button>
                            </CardFooter>
                        </LocalForm>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}