import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
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
import * as action from '../../../store/actions/accounting';
import Account from '../../../services/accounting'
import { required } from '../../../utilities/regex';
import Message from '../../../utilities/message';
import {STYLE} from '../../../utilities/constants';
import BackButton from '../../CommonComponents/BackButton';
import { getDateFormat, formatDate } from '../../CommonComponents/methods';
import { toastAction } from '../../../store/actions/toast-actions';
import TotalExpensive from './TotalExpensive';

let myFormRef = React.createRef();
export default ({ history }) => {    
    const dispatch = useDispatch();
    const { accounting, loader } = useSelector(state => state);
    const transactions = accounting.edit_row_id ? accounting.transactions.filter(row => row.Transaction_Number.toString() === accounting.edit_row_id.toString()) : [];
    const [date, setDate] = useState(transactions.length && transactions[0].Transaction_Date ? new Date(formatDate(transactions[0], 'Transaction_Date')) : new Date());
    const [btn, setBtn] = useState(true);
    const [expenses, setExpenses] = useState([{},{},{}]);
    let tab = 0;
    useEffect(() => {
        dispatch(action.resetCreditDebit());
        myFormRef && myFormRef.dispatch(actions.change(`general.Transaction_Date`,new Date()));
        dispatch(Account.accountsList({sortTo: 'Account_Name',
            sortBy: 'asc', status: 'Active'})).then(()=> {
                if(accounting.edit_row_id) {
                    const expensesRows = transactions.length > 3 ?
                    transactions.map(() => ({})) : [{}, {}, {}];
                    setExpenses([...expensesRows]);
                    transactions.map((row, index) => {
                        dispatch(action.setCreditDebit({key: 'debit',value:row.Debit,index}));
                        dispatch(action.setCreditDebit({key: 'credit',value:row.Credit,index}));
                    }); 
                } 
            }); 
            return () => { 
                resetForm();
            };          
    }, []);
    useEffect(() => {
        if(accounting.edit_row_id) {
        myFormRef && myFormRef.dispatch(actions.change(`general.Transaction_Date`, date));
        transactions.map((row, index) => ['Account_ID', 'Memo', 'Debit', 'Credit'].map((key, i) => {
                myFormRef && myFormRef.dispatch(actions.change(`general.expenses[${index}].${[key]}`, row[key]));            
            }
        ));
    }},[expenses]);

    const removefromExpenses = index => {
        expenses.splice(index, 1);
        setExpenses([...expenses]);
        dispatch(action.removeCreditDebit(index));
    };
    const handleDateChange = (dateTime) => {
        setDate(dateTime);
    };
    /********** Handle form submit ************/
    const handleSubmit = (values) => {
        const expenses = values.expenses ? Object.values(values.expenses).reduce((acc, row) => {
            acc.Debit+= Number(row['Debit'] ?  row['Debit'] : 0);
            acc.Credit+= Number(row['Credit'] ? row['Credit'] : 0);
            return acc;
        }, {Debit: 0, Credit: 0}) : null;
        const index = Object.values(values.expenses).findIndex(row => (!!row.Debit && row.Debit !== '0.00') && (!!row.Credit && row.Credit !== '0.00'));
        if(Object.values(values.expenses).filter(row => !!(row.Account_ID)).length !== Object.values(values.expenses).length)  
        {
            toastAction(false, Message.expensesError);
        }
        if(index !== -1){
            toastAction(false, `Please Enter Either Debit OR Credit For Transaction ${index+1}`);
        }
        else if(expenses && expenses.Debit !== expenses.Credit && !accounting.edit_row_id){
            toastAction(false, Message.expensesErrorTotal);
        }
        else { 
            if(accounting.edit_row_id){
                if(expenses.Debit !== expenses.Credit){
                    toastAction(false, Message.expensesErrorTotal);
                }else{
                const object = {
                    Transaction_Date: getDateFormat(values.Transaction_Date),
                    "update":"multiple",
                    Transaction_No: transactions.length ? transactions[0].Transaction_Number.toString() : '',
                    data: Object.values(values.expenses).reduce((list, row, i) => { 
                        if(row.Account_ID){
                            list.push({
                                ...row, 
                                Transaction_ID: transactions.length && transactions[i] ? transactions[i].Transaction_ID.toString() : '', 
                                Debit: row['Debit'] || '0',
                                Credit: row['Credit'] || '0',
                                Account_ID: row.Account_ID,
                                Memo: row['Memo'] || '-'
                            })
                        }                        
                        return list;
                    }, [])
                };                
                dispatch(Account.updateSingleTransaction(object)).then(() => {
                    history.push('/search-transaction')
                });
            }
            } else {
                const object = {
                    Transaction_Date: getDateFormat(values.Transaction_Date),
                    data: Object.values(values.expenses).map(row => ({ 
                        ...row, 
                        Debit: row['Debit'] || '0',
                        Credit: row['Credit'] || '0',
                        Account_ID: row.Account_ID,
                        Memo: row['Memo'] || '-'
                    }))
                }; 
               
                dispatch(Account.saveTransaction(object)).then(() => {
                    if(btn === true)
                    {
                        history.push('/search-transaction')
                    } else {
                        resetForm();
                    }
                });
            }  
      
        }
    };
    /************** Reset form values ************/
    const resetForm = () => {
        setDate(null);
        setExpenses([{}, {}, {}]);
        myFormRef && myFormRef.dispatch(actions.change(`general`, {})); 
        dispatch(action.resetCreditDebit());      
    };
    const handleChange = data => {
        dispatch(action.setCreditDebit(data));
        if(data.key === 'credit'){
            myFormRef && myFormRef.dispatch(actions.change(`general.expenses[${data.index}].Credit`, data.value))
        } else{
            myFormRef && myFormRef.dispatch(actions.change(`general.expenses[${data.index}].Debit`, data.value))
        }
    }

    return (
        <div className="animated fadeIn">
            <Row>
                <Col xs="12">
                    <Card>
                        <LocalForm
                            onSubmit={(values) => handleSubmit(values)}
                            model="general"
                            className="form-horizontal"
                            ref={(el) => myFormRef = el}
                        >
                            <CardHeader>
                                <BackButton backUrl="/manage-account" history={history} text={"General Entry"} />
                            </CardHeader>
                            <CardBody>
                            <FormGroup row className="col-md-12">   
                            <Col className="col-md-2"> <NavLink strict to="#" className="btn btn-default"  >Transaction</NavLink></Col>
                             <Col className="col-md-3"> <NavLink strict to="/search-transaction" className="btn btn-primary" >Search</NavLink></Col> 
                             </FormGroup>
                                 <hr />
                                <FormGroup row>
                                    <Col md="1">
                                        <Label htmlFor="text-input">Date:</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Control
                                            model=".Transaction_Date"
                                            className="form-control"
                                            onChange={(edate) => handleDateChange(edate)}
                                            selected={date}
                                            component={props => <DatePicker  {...props} />}
                                            validators={{ required }}
                                        />
                                        <Errors
                                            model=".Transaction_Date"
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
                                        <Table borderless>
                                            <thead>
                                                <tr>
                                                    <th width="400px">Account</th>
                                                    <th>Debit</th>
                                                    <th>Credit</th>
                                                    <th>Memo</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            {accounting.edit_row_id && loader.isLoading ? <div className="animated fadeIn pt-1 text-center table-loader" /> :
                                            <>
                                            <tbody>
                                                {
                                                    expenses.map((row, index) =>{
                                                       return(
                                                        <tr key={index}>
                                                        <td width="400px">
                                                            <Control
                                                                model={`.expenses[${index}].Account_ID`}
                                                                tabIndex={tab, tab++}
                                                                component={props => <Input {...props} type="select" name={`Account[${index}]`} id={`Account[${index}]`} >
                                                                    <option value="" key="empty">Select Account</option>
                                                                    {accounting.accounts.map((accountsRow, accountsIndex) =>
                                                                        <option key={accountsIndex} value={accountsRow.Account_ID}>{accountsRow.Account_Name}</option>)
                                                                    }
                                                                </Input>}
                                                            />
                                                        </td>
                                                        <td >
                                                            <Control
                                                                tabIndex={tab, tab++}
                                                                model={`.expenses[${index}].Debit`}
                                                                onBlur={(e)=> handleChange({key: 'debit',value:e.target.value.replace(/-\D/g,''),index})}
                                                                component={props => <Input {...props} type={`Debit[${index}]`} id={`Debit[${index}]`} name={`Debit[${index}]`} placeholder="Debit"  />}

                                                            />
                                                        </td>
                                                        <td >
                                                            <Control
                                                                tabIndex={tab, tab++} 
                                                                model={`.expenses[${index}].Credit`}
                                                                onBlur={(e)=> handleChange({key: 'credit',value:e.target.value.replace(/-\D/g,''),index})}
                                                                component={props => <Input {...props} type="number" id={`Credit[${index}]`} name={`Credit[${index}]`} placeholder="Credit"   />}
                                                            />
                                                        </td>
                                                        <td  >
                                                            <Control
                                                                tabIndex={tab, tab++} 
                                                                model={`.expenses[${index}].Memo`}
                                                                component={props => <Input {...props} type="text" id={`Memo[${index}]`} name={`Memo[${index}]`} placeholder="Memo" />}
                                                            />
                                                        </td>
                                                        <td >
                                                            <IconContext.Provider value={{ color: "red", size: "2em", className: "search-account" }}>
                                                                <div onClick={() => removefromExpenses(index)}>
                                                                    <AiOutlineMinusCircle />
                                                                </div>
                                                            </IconContext.Provider>
                                                        </td>
                                                    </tr>
                                                       ) 
                                                    }
                                                       
                                                    )}
                                            </tbody>                                            
                                            <IconContext.Provider value={{ color: "green", size: "2em", className: "search-account" }}>
                                                <div onClick={() => setExpenses([...expenses, {}])}>
                                                    <AiFillPlusCircle />
                                                </div>
                                            </IconContext.Provider>
                                            </>
                                            }
                                        </Table>
                                          <TotalExpensive/>  
                                    </Col>
                                </FormGroup>
                            </CardBody>
                            <CardFooter>
                                { accounting.edit_row_id ? 
                                <>
                                <Button type="submit" disabled={loader.isLoading} size="sm" color="primary" style={{marginRight:STYLE.marginRight10}} onClick={()=>setBtn(true)}><i className="fa fa-dot-circle-o"></i> {loader.isLoading ? `Updating...` : 'Update'}</Button>
                                <Button type="reset" size="sm" color="danger" onClick={() => history.goBack()}><i className="fa fa-ban"></i> Cancel</Button>
                                </>
                                :
                                <>
                                <Button type="submit" disabled={loader.isLoading} size="sm" color="primary" style={{marginRight:STYLE.marginRight10}} onClick={() => setBtn(false)}><i className="fa fa-dot-circle-o"></i> {loader.isLoading ? `Save & New...` : 'Save & New'}</Button>
                                <Button type="submit" disabled={loader.isLoading} size="sm" color="primary" style={{marginRight:STYLE.marginRight10}} onClick={()=>setBtn(true)}><i className="fa fa-dot-circle-o"></i> {loader.isLoading ? `Save & Close...` : 'Save & Close'}</Button>
                                <Button type="reset" size="sm" color="danger" onClick={() => resetForm()}><i className="fa fa-ban"></i> Reset</Button>
                                </>
                                }                                
                            </CardFooter>
                        </LocalForm>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}