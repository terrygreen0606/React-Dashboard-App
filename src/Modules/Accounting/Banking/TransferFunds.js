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
    Row
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as AccountService from '../../../services/accounting/banking';
import { required } from '../../../utilities/regex';
import Message from '../../../utilities/message';
import {STYLE} from '../../../utilities/constants';
import BackButton from '../../CommonComponents/BackButton';
import { getDateFormat } from '../../CommonComponents/methods';

let myFormRef = React.createRef();
export default ({ history }) => {
    const dispatch = useDispatch();
    const { accounting, loader } = useSelector(state => state);
    const [date, setDate] = useState(null);
    const [buttonStatus, setButtonStatus] = useState(true);
    useEffect(() => {
        dispatch(AccountService.bankingList({ type: 'bank' }));
    }, []);

    const handleDateChange = (dateTime) => {
        setDate(dateTime);
    };
    /********** Handle form submit ************/
    const handleSubmit = (values) => {
        dispatch(AccountService.makeTransfer({ ...values, date: getDateFormat(values.date) })).then(() => {
            if (buttonStatus) {
                history.push("/banking-center");
            } else {
                resetForm();
            }
        });
    };
    /************** Reset form values ************/
    const resetForm = () => {
        myFormRef && ['banking.account_from', 'banking.account_to', 'banking.total_amount', 'banking.memo'].map(key =>
            myFormRef.dispatch(actions.change(key, ''))
        );
        setDate(null);
    };
    return (
        <div className="animated fadeIn">
            <Row>
                <Col xs="12" md="8">
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
                                        <Label htmlFor="text-input">Date*:</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Control
                                            model=".date"
                                            className="form-control"
                                            onChange={(edate) => handleDateChange(edate)}
                                            selected={date}
                                            component={props => <DatePicker  {...props} minDate={new Date()} />}
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
                                    <Col md="3">
                                        <Label htmlFor="select">Transfer Fund From:*</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Control
                                            model=".account_from"
                                            component={props => <Input {...props} type="select" name="account_from" id="select">
                                                <option value="" key="empty">Select Account</option>
                                                {accounting.bankingList.map((row, index) =>
                                                    <option key={index} value={`${row.Account_ID}`}>{row.Account_Name}</option>)
                                                }
                                            </Input>}
                                            validators={{ required }}
                                        />
                                        <Errors
                                            model=".account_from"
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
                                        <Label htmlFor="select">Transfer Fund To:*</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Control
                                            model=".account_to"
                                            component={props => <Input {...props} type="select" name="account_to" id="select">
                                                <option value="" key="empty">Select Account</option>
                                                {accounting.bankingList.map((row, index) =>
                                                    <option key={index} value={`${row.Account_ID}`}>{row.Account_Name}</option>)
                                                }
                                            </Input>}
                                            validators={{ required }}
                                        />
                                        <Errors
                                            model=".account_to"
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
                                        <Label htmlFor="text-input">Amount:*</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Control
                                            model=".total_amount"
                                            component={props => <Input {...props} type="number" id="text-input" name="text-input" placeholder="Amount" />}
                                            validators={{ required }}
                                        />
                                        <Errors
                                            model=".account_to"
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
                                        <Label htmlFor="text-input">Memo:</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Control
                                            model=".memo"
                                            component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="Memo" />}

                                        />
                                    </Col>
                                </FormGroup>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" disabled={loader.isLoading} size="sm" color="primary" onClick={() => setButtonStatus(true)} style={{marginRight:STYLE.marginRight10}}><i className="fa fa-dot-circle-o"></i> {loader.isLoading ? 'Saving...' : 'Save & Close'}</Button>
                                <Button type="submit" disabled={loader.isLoading} size="sm" color="primary" onClick={() => setButtonStatus(false)} style={{marginRight:STYLE.marginRight10}}><i className="fa fa-dot-circle-o"></i> {loader.isLoading ? 'Saving...' : 'Save & New'}</Button>
                                <Button type="reset" size="sm" color="danger" onClick={() => resetForm()}><i className="fa fa-ban" ></i> Reset</Button>
                            </CardFooter>
                        </LocalForm>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}