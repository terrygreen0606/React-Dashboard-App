import React from 'react';
import { LocalForm, Control, Errors } from 'react-redux-form';
import {
    Button,
    CardBody,
    CardFooter,
    Col,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { required } from '../../../utilities/regex';
import Message from '../../../utilities/message';
import {STYLE} from '../../../utilities/constants';

/*************** Class component is required for Take print  **************/
export default class ReconcileForm extends React.Component {
    render() {
        const { handleSubmit, account, loader, resetForm, myFormRef, accounting, date, handleDateChange, handleAccountChange, balance } = this.props;
             return <LocalForm
            onSubmit={(values) => handleSubmit(values)}
            model="banking"
            className="form-horizontal"
            ref={myFormRef}
        >
            <CardBody>
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="select">Account:*</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <Control
                            model=".Account_ID"
                            onChange={(e) => handleAccountChange(e)}
                            component={props => <Input {...props} type={account.status ? "hidden" : "select"} name="Account_ID" id="select">
                                <option value="" key="empty">Select Account</option>
                                {accounting.bankingList.map((row, index) =>
                                    <option key={index} value={row.Account_ID}>{row.Account_Name}</option>)
                                }
                            </Input>}
                            validators={{ required }}
                        />
                        <Input type={account.status ? "text" : "hidden"} value={account.value} />
                        <Errors
                            model=".Account_ID"
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
                        <Label htmlFor="text-input">Statement Date:</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <Control
                            model=".endDate"
                            className="form-control"
                            onChange={(edate) => handleDateChange(edate)}
                            selected={date}
                            component={props => <DatePicker  {...props} />}

                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="select">Begining Balance:</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <span style={{ color: "red" }}>{balance}</span>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="text-input">Ending Balance:</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <Control
                            model=".endingBalance"
                            component={props => <Input {...props} min="0" type="number" id="text-input" name="text-input" placeholder="Amount" />}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="text-input">Service Charge:</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <Control
                            model=".service_charge"
                            component={props => <Input {...props} type="number" id="text-input" name="text-input" placeholder="Service charge" min="0"/>}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="text-input">Interest Income:</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <Control
                            model=".interest_income"
                            component={props => <Input {...props} min="0" type="number" id="text-input" name="text-input" placeholder="Interest Income" />}
                        />
                    </Col>
                </FormGroup>
            </CardBody>
            {!account.status &&
                <CardFooter>
                    <Button type="submit" disabled={loader.isLoading} size="sm" color="primary" style={{marginRight:STYLE.marginRight10}}><i className="fa fa-dot-circle-o"></i> {loader.isLoading ? 'processing...' : 'Next'}</Button>
                    <Button type="reset" size="sm" color="danger" onClick={() => resetForm()}><i className="fa fa-ban"></i> Reset</Button>
                </CardFooter>
            }
        </LocalForm>
    }
}