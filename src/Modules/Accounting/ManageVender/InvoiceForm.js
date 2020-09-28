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
    Table
} from 'reactstrap';
import { AiFillPlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { required } from '../../../utilities/regex';
import Message from '../../../utilities/message';
import {STYLE} from '../../../utilities/constants';
import AutoComplete from '../../../views/FormComponents/AutoComplete/AutoComplete';

/*************** Class component is required for Take print  **************/
export default class InvoiceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelect: false
        };
    }
    render() {
        const { setVendorId, history, handleSubmit, vendor, handleAccountChange, endingBalance, loader, buttonName, resetForm, myFormRef, data, accounting, setAddress, address, date, handleDateChange, dueDate, setExpenses, expenses, removefromExpenses, searhVendors, setBtn } = this.props;
            return <LocalForm
            onSubmit={value => handleSubmit(value)}
            initialState={{ ...data }}
            model="invoice"
            className="form-horizontal"
            ref={myFormRef}
        >
            <CardBody >
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="select">Vendor:*</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <AutoComplete
                            name="vend_name"
                            options={accounting.vendors}
                            search={val => searhVendors(val)}
                            selection={(_vendor) => {
                                setAddress(_vendor.vend_address);
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
                        <Label htmlFor="select">Address:</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <Control
                            model=".address"
                            component={props => <Input {...props} type="textarea" name="textarea-input" id="textarea-input" rows="2"
                                defaultValue={address} disabled={true} />}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="select">Terms </Label>
                    </Col>
                    <Col xs="12" md="9">
                        <Control
                            model=".terms"
                            component={props => <Input {...props} type="select" name="taxfldname" id="select">
                                <option value="" key="empty">Select Term</option>
                                <option value="1" key="1">Term-1</option>
                                <option value="2" key="2">Term-2</option>
                            </Input>}
                        />

                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="text-input">Memo:</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <Control
                            model=".inv_memo"
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
                            model=".Inv_Date"
                            className="form-control"
                            onChange={(edate) => handleDateChange("date", edate)}
                            selected={date}
                            component={props => <DatePicker {...props} />}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="text-input">Ref No.:</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <Control
                            model=".inv_no"
                            component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="Ref No." />}

                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="text-input">Amount Due:</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <Control
                            model=".inv_amt"
                            component={props => <Input {...props} type="number" step="0.1" id="text-input" name="text-input" placeholder="Amount Due"  min="0"/>}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="text-input">Bill Due:</Label>
                    </Col>
                    <Col xs="12" md="9">
                        <Control
                            model=".Inv_Due_Date"
                            className="form-control"
                            selected={dueDate}
                            disabled
                            component={props => <DatePicker  {...props}  />}
                        />
                    </Col>
                </FormGroup>
                {(!accounting.edit_row_id && !vendor.status) &&
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
                                                        onChange={e => handleAccountChange(e, `expenses[${index}].Account_ID`)}
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
                                                        component={props => <Input {...props} type="number" id="text-input" name="text-input" placeholder="Amount" min="0"/>}
                                                        validators={{ balanceError: val => Number(val) <= Number(endingBalance[`expenses[${index}].Account_ID`]) }}
                                                    />
                                                    <Errors
                                                        model={`.expenses[${index}].Amount`}
                                                        show={(field) => field.touched && !field.focus}
                                                        className="error"
                                                        messages={{
                                                            balanceError: Message.balanceError
                                                        }}
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

                                                        <AiOutlineMinusCircle onClick={() => removefromExpenses(index)} />

                                                    </IconContext.Provider>  }
                                                </td>
                                            </tr>
                                        )}
                                </tbody>
                                <IconContext.Provider value={{ color: "green", size: "2em", className: "search-account" }}>
                                    <AiFillPlusCircle onClick={() => setExpenses([...expenses, {}])} />
                                </IconContext.Provider>
                            </Table>
                        </Col>
                    </FormGroup>
                }
            </CardBody>
            {!vendor.status &&
                <CardFooter>
                    <>
                    <Button type="submit" disabled={loader.isLoading} size="sm" color="primary" style={{marginRight:STYLE.marginRight10}} onClick={()=>setBtn(true)}><i className="fa fa-dot-circle-o"></i> {loader.isLoading ? `${buttonName}...` : buttonName}</Button>
                    <Button type="submit" disabled={loader.isLoading} size="sm" color="primary" style={{marginRight:STYLE.marginRight10}} onClick={()=>setBtn(false)}><i className="fa fa-dot-circle-o"></i> {loader.isLoading ? `Save & New...` : `Save & New`}</Button>
                    </>
                    {!accounting.edit_row_id ?
                        <Button type="reset" size="sm" color="danger" onClick={() => resetForm()} style={{marginRight:STYLE.marginRight10}}><i className="fa fa-ban"></i> Reset</Button>:
                        <Button type="reset" size="sm" color="danger" onClick={() => history.goBack()}><i className="fa fa-ban"></i> Close</Button>}
                </CardFooter>
            }
        </LocalForm>
    }
}