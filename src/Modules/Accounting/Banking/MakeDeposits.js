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
import * as AccountService from '../../../services/accounting/banking';
import * as VendorService from '../../../services/accounting/VendorService';
import { required } from '../../../utilities/regex';
import Message from '../../../utilities/message';
import BackButton from '../../CommonComponents/BackButton';
import { getDateFormat } from '../../CommonComponents/methods';
import {STYLE} from '../../../utilities/constants';
import { toastAction } from '../../../store/actions/toast-actions';

let myFormRef = React.createRef();
export default ({ history }) => {
    const dispatch = useDispatch();
    const { accounting, loader } = useSelector(state => state);
    const [date, setDate] = useState(null);
    const [account, setAccount] = useState(null);
    const [buttonStatus, setButtonStatus] = useState(true);
    const [expenses, setExpenses] = useState([{}]);
    useEffect(() => {
        dispatch(VendorService.vendorList({sortTo:'vend_name', sortBy:'asc'}));
        dispatch(AccountService.bankingList({ type: 'bank', sortTo: 'Account_Name', sortBy: 'asc' }));
    }, []);

    const removefromExpenses = index => {
        expenses.splice(index, 1);
        setExpenses([...expenses]);
    };

    const handleDateChange = (dateTime) => {
        setDate(dateTime);
    };
    /********** Handle form submit ************/
    const handleSubmit = (values) => {
        if(account === null)  
        {
            toastAction(false, Message.Account);
        } else { 
        const deposit = Object.values(values.expenses);
        const object = {
            ...values,
            total_amount: deposit.reduce((total, val) => { return total + Number(val.amount) }, 0),
            date: getDateFormat(values.date),
            deposit
        };
        delete object.expenses;
        dispatch(AccountService.makeDeposit(object)).then(() => {
            if (buttonStatus) {
                history.push("/banking-center");
            } else {
                 resetForm();
            }
        });
      }
    };
    /************** Reset form values ************/
    const resetForm = () => {
        myFormRef && ['banking.deposit_id', 'banking.memo'].map(key =>
            myFormRef.dispatch(actions.change(key, ''))
        );
        setDate(null);
        setExpenses([{}]);
    };
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
                                        <Label htmlFor="select">Deposit To:*</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Control
                                            model=".deposit_id"
                                            component={props => <Input {...props} type="select" name="deposit_id" id="select">
                                                <option value="" key="empty">Select Account</option>
                                                {accounting.bankingList.map((row, index) =>
                                                    <option key={index} value={`${row.Account_ID}`}>{row.Account_Name}</option>)
                                                }
                                            </Input>}
                                            validators={{ required }}
                                        />
                                        <Errors
                                            model=".deposit_id"
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
                                        <Label htmlFor="text-input">Memo:*</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Control
                                            model=".memo"
                                            component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="Memo" />}
                                            validators={{ required }}
                                            />
                                            <Errors
                                                model=".memo"
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
                                        <Label htmlFor="text-input">Date:*</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Control
                                            model=".date"
                                            className="form-control"
                                            onChange={(_date) => handleDateChange(_date)}
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
                                                    <th>Received From</th>
                                                    <th>From Account</th>
                                                    <th>Memo</th>
                                                    <th>CHK No</th>
                                                    <th>PMT Meth</th>
                                                    <th>Amount</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    expenses.map((row, index) =>
                                                        <tr>
                                                            <td style={{width:'200px'}}>
                                                                <Control
                                                                    model={`.expenses[${index}].vendor_id`}
                                                                    component={props => <Input {...props} type="select" name="vendor_id" id="select">
                                                                        <option value="" key="empty">Select Vendor</option>
                                                                        {accounting.vendors.map((_row, _index) =>
                                                                            <option key={_index} value={_row.vend_id}>{_row.vend_name}</option>)
                                                                        }
                                                                    </Input>}
                                                                />
                                                            </td>
                                                            <td>
                                                                <Control
                                                                    model={`.expenses[${index}].account_id`}
                                                                    onChange={(e)=>setAccount(e.target.value)}
                                                                    component={props => <Input {...props} type="select" name="account_id" id="select">
                                                                        <option value="" key="empty">Select Account</option>
                                                                        {accounting.bankingList.map((bankRow, c) =>
                                                                            <option key={bankRow} value={bankRow.Account_ID}>{bankRow.Account_Name}</option>)
                                                                        }
                                                                    </Input>}
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
                                                                    model={`.expenses[${index}].check_no`}
                                                                    component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="Check number" />}

                                                                />
                                                            </td>
                                                            <td>
                                                                <Control
                                                                    model={`.expenses[${index}].pmtmeth`}
                                                                    component={props => <Input {...props} type="select" name="account_id" id="select">
                                                                        <option value="" key="empty">Select PMT METH</option>
                                                                        <option value="check" key="check">Check</option>
                                                                        <option value="wire" key="wire">Wire</option>
                                                                        <option value="eft" key="eft">EFT</option>
                                                                        <option value="cash" key="cash">Cash</option>
                                                                    </Input>}

                                                                />
                                                            </td>
                                                            <td>
                                                                <Control
                                                                    model={`.expenses[${index}].amount`}
                                                                    component={props => <Input {...props} type="number" id="text-input" name="text-input" placeholder="Amount" />}

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
                                <Button type="submit" disabled={loader.isLoading && buttonStatus} size="sm" color="primary" onClick={() => setButtonStatus(true)} style={{marginRight:STYLE.marginRight10}}><i className="fa fa-dot-circle-o"></i> {loader.isLoading ? 'Saving...' : 'Save & Close'}</Button>
                                <Button type="submit" disabled={loader.isLoading && !buttonStatus} size="sm" color="primary" onClick={() => setButtonStatus(false)} style={{marginRight:STYLE.marginRight10}}><i className="fa fa-dot-circle-o"></i> {loader.isLoading ? 'Saving...' : 'Save & New'}</Button>
                                <Button type="reset" size="sm" color="danger" onClick={() => resetForm()}><i className="fa fa-ban"></i> Reset</Button>
                            </CardFooter>
                        </LocalForm>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}