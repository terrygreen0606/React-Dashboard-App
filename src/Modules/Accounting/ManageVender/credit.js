import React, { useEffect, useState, useCallback } from 'react';
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiFillPlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import Account from '../../../services/accounting';
import * as AccountService from '../../../services/accounting/VendorService';
import { required } from '../../../utilities/regex';
import Message from '../../../utilities/message';
import BackButton from '../../CommonComponents/BackButton';
import {STYLE} from '../../../utilities/constants';
import { getDateFormat } from '../../CommonComponents/methods';
import AutoComplete from '../../../views/FormComponents/AutoComplete/AutoComplete';


let myFormRef = React.createRef();
export default ({ history }) => {
    const dispatch = useDispatch();
    const { accounting, loader } = useSelector(state => state);
    const [date, setDate] = useState(null);
    let data = accounting.invoices ? accounting.invoices.find(invoice => invoice.inv_id === accounting.edit_row_id) : {};
    let vender = data && Object.keys(data).length ? accounting.vendors.find(vendorRow => vendorRow.vend_id.toString() === data['vender_id'].toString()) : {};
    data = vender && Object.keys(vender).length ? { ...data,  vendor_id: data['vend_name'] } : data;
    const [vendorId, setVendorId] = useState(data ? data['vender_id'] : '');
    const [expenses, setExpenses] = useState([{}])
    const [btn, setBtn] = useState(true);
    useEffect(() => {
        dispatch(AccountService.vendorList());
        dispatch(Account.accountsList({ type: 'expenses' }));
    }, []);

    useEffect(() => {
        myFormRef.dispatch(actions.change(`credit.vendor_id`, vendorId));
    }, [vendorId])

    const removefromExpenses = index => {
        expenses.splice(index, 1);
        setExpenses([...expenses]);
    };
    const handleDateChange = (dateTime) => {
        setDate(dateTime);
    };
    /********** Handle form submit ************/
    const handleSubmit = (values) => {
        const object = {
            credit: {
                ...values,
                vendor_id: vendorId,
                credit_date: values.credit_date && getDateFormat(values.credit_date)
            },
            expenses: values.expenses && Object.values(values.expenses)
        };
        delete object.credit.expenses;
        dispatch(AccountService.saveCredit(object)).then(() => {
            console.log(btn)
            if(btn){
                history.push("/manage-vendor")
            } else {
                resetForm();
            }
            
        });
    };
    /************** Reset form values ************/
    const resetForm = () => {
        ['credit.vendor_id', 'credit.credit_memo', 'credit.ref_no', 'credit.credit_amount'].map(key =>
            myFormRef.dispatch(actions.change(key, ''))
        );
        setDate(null);
    };

    const searhVendors = useCallback(
        (searchData) => {
            dispatch(AccountService.vendorList({ page: 1, search: searchData }));
        }, []);
        
    const buttonName = "Submit";
    return (
        <div className="animated fadeIn">
            <Row>
                <Col xs="12" md="8">
                    <Card>
                        <LocalForm
                            onSubmit={(values) => handleSubmit(values)}
                            model="credit"
                            className="form-horizontal"
                            ref={(el) => myFormRef = el}
                        >
                            <CardHeader>
                                <BackButton history={history} text={"Credit"} />
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="select">Vendor:*</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                         <AutoComplete
                                            name="vend_name"
                                            options={accounting.vendors}
                                            search={val => searhVendors(val)}
                                            selection={(_vendor) => {;
                                                setVendorId(_vendor.vend_id)
                                            }}
                                            value={data ? data.vendor_id : ''}
                                            placeholder="Select Vendor"
                                            link="/add-vendor"
                                            linkText="Add Vendor"
                                        />
                                        <Control
                                            type="hidden"
                                            model=".vendor_id"
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
                                        <Label htmlFor="text-input">Memo:</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Control
                                            model=".credit_memo"
                                            component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="Memo" />}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">Date:</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Control
                                            model=".credit_date"
                                            className="form-control"
                                            onChange={(edate) => handleDateChange(edate)}
                                            selected={date}
                                            component={props => <DatePicker  {...props} />}

                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">Ref No.:</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Control
                                            model=".ref_no"
                                            component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="Ref No." />}

                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">Credit Amount:</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Control
                                            model=".credit_amount"
                                            component={props => <Input {...props} type="number" id="text-input" name="text-input" placeholder="Amount Due" />}

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
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    expenses.map((row, index) =>
                                                        <tr key={index}>
                                                            <td>
                                                                <Control
                                                                    model={`.expenses[${index}].Account_ID`}
                                                                    component={props => <Input {...props} type="select" name="Account_Type_ID" id="select">
                                                                        <option value="" key="empty">Select Account</option>
                                                                        {accounting.accounts.map((accountRow, accountIndex) =>
                                                                            <option key={accountIndex} value={accountRow.Account_ID}>{accountRow.Account_Name}</option>)
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
                                                                { index > 0 &&
                                                                <IconContext.Provider value={{ color: "red", size: "2em", className: "search-account" }}>
                                                                    <div onClick={() => removefromExpenses(index)}>
                                                                        <AiOutlineMinusCircle />
                                                                    </div>
                                                                </IconContext.Provider>}
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
                                <Button type="submit" disabled={loader.isLoading} size="sm" color="primary" style={{marginRight:STYLE.marginRight10}}  onClick={()=>setBtn(false)}><i className="fa fa-dot-circle-o"  ></i> {loader.isLoading ? `Save & New...` :`Save & New` }</Button>
                                <Button type="submit" disabled={loader.isLoading} size="sm" color="primary" style={{marginRight:STYLE.marginRight10}}  onClick={()=>setBtn(true)}><i className="fa fa-dot-circle-o"  ></i> {loader.isLoading ? `Save & Close...` :`Save & Close` }</Button>
                                <Button type="reset" size="sm" color="danger" onClick={() => resetForm()}><i className="fa fa-ban"></i> Reset</Button>
                            </CardFooter>
                        </LocalForm>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}