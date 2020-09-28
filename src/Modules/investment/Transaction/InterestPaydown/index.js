import React, { useState, useEffect }  from 'react';
import { FormGroup, Col, Input, Label, Button ,CardHeader} from 'reactstrap';
import { Control, Errors ,LocalForm, actions } from 'react-redux-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Switch from "react-switch";
import Select from "react-select"; 
import { required } from '../../../../utilities/regex';
import Message from '../../../../utilities/message';
import { STYLE } from '../../../../utilities/constants';
import { formatDate, getDateFormat } from "../../../CommonComponents/methods";
import { addUpdateTransaction } from '../../../../services/investment';

let myFormRef = React.createRef();
export default ({history, match, list, dispatch, data, loader, brokerageData }) => {
    const [state, setState] = useState({ taxExempt: "", Received_Date: null });
    const [btnType, setBtnType] = useState('');
    const discriptionValue = state.discription ? list.find(row =>row.Bond_ID === state.discription): {Description:"Discription"};
    useEffect(() => {
        setData();       
    }, []);    
    
    /************ Set data for edit ****/
    const setData = () => {
        const obj = { ...data };
        if (data) {
         Object.keys(obj).forEach(key => {
            myFormRef.dispatch(actions.change(`interestPaydown.${key}`, obj[key]));
        });
         setState({ 
            Received_Date: data.TradeDate ? new Date(formatDate(data, 'TradeDate')) : null,
        })
    }
    }
      /************ Handle date change **********/
      const handleDateChange = (date,key) => {
          setState({ ...state, [key]: date });
    };
    
     /************** Reset form values ************/
     const resetForm = () => {
        ['interestPaydown.Brokerage_Account', 'interestPaydown.Transaction_Type', 'interestPaydown.Symbol', 'interestPaydown.Description', 'interestPaydown.Action','interestPaydown.Price','interestPaydown.InterestReceived','interestPaydown.Quantity'].map(key =>
            myFormRef.dispatch(actions.change(key, ''))
         );
         setState({ taxExempt: "", Received_Date: null });
    };
    /************* Handle submit  *******/
    const handleSubmit = (values) => {
           let payload = {
            "Brokerage_Account":typeof values.Brokerage_Account === "object" ? values.Brokerage_Account.value : values.Brokerage_Account,   
            "transaction_option": values.Transaction_Type,
            "cuip": typeof values.Cusip === "object" ? values.Cusip.value.toString() : values.Cusip,
            "Description": values.Description,  
            "Trade_Date": getDateFormat(state.Received_Date),
            "Action": values.Action,
            "SubAction":"",
            "Price": values.Price,
            "Quantity": values.Quantity,
            "InterestReceived": values.InterestReceived,
            //extra field
            "Commission":"",
            "State_Tax": "",
            "Miscellaneous": "",
            "SEC_Fee": "",
            "Memo": "",
            "Reconcile": "",
            "IPO_exclusion": "",
            "SpecialDeposits": "",
            "StateCode": "",
            "Currency_transaction": "",
            "Currency_transaction_rate": "",
            "Action_ID": "",
            "symbol":""
        }
        if(match.path === "/edit-transaction"){
            payload = {
                "ID": values.ID,
                ...payload
            }
        }
    //console.log('=====', payload);
       dispatch(addUpdateTransaction(payload)).then(() => {
        if(btnType === 'new') {
          resetForm();
          setBtnType('')
        } else {
          history.push('/transaction')
        }          
      });
    };
    return (
        <LocalForm
        onSubmit={(values) => handleSubmit(values)}
        model="interestPaydown"
        className="form-horizontal"
        ref={(el) => myFormRef = el}
        >
            <FormGroup row className="col-md-12">
            <Col className="col-md-4">
                    <Label htmlFor="text-input">Brokerage Account*:</Label>
                     <Control
                        model=".Brokerage_Account"
                        component={props => <Select
                            {...props}
                            options={brokerageData.map(row => ({ value: row.Account_ID, label: row.Account_Name }))} />}
                    validators={{ required }}
                    />
                    <Errors
                        model=".Brokerage_Account"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-2">
                    </Col>
                <Col className="col-md-6">
                    <Button type="submit" size="md" color="primary"  style={{ marginRight: '20px' }} onClick={() => setBtnType('new')} disabled={loader.isLoading}> {loader.isLoading ? 'LOADING...' : 'SAVE & NEW'}</Button>
                    <Button type="submit" size="md" color="primary" style={{ marginRight: '20px' }}  disabled={loader.isLoading} >  {loader.isLoading ? 'LOADING...' : 'SAVE & CLOSE '}</Button>
                     <Button type="reset" size="md" color="primary" onClick={() => resetForm()}> RESET</Button>
                </Col>
            </FormGroup>
            <FormGroup row className="col-md-12">
            <Col className="col-md-3">
            <Label htmlFor="text-input">Transaction Type*:</Label>
                    <Control
                        model=".Transaction_Type"
                        //onChange={(e) => dispatch(getCategoryData({id: e.value}))}
                        component={props => <Input {...props} type="select" name="Transaction_Type" id="Transaction_Type    ">
                        <option value="" key="empty">Select Transaction Type</option>
                         <option value="Bond" key="1">Bond</option>
                        <option value="Stock" key="2">Stock</option>
                        <option value="Option" key="3">Option</option>
                        <option value="Mutual Fund" key="4">Mutual Fund</option>
                    </Input>}
                     validators={{ required }}
                    />
                    <Errors
                        model=".Transaction_Type"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                        />
                </Col>
                <Col className="col-md-3">
                    <Label htmlFor="text-input">Cusip*:</Label>
                    <Control
                        model=".Cusip"
                        onChange={(e)=>setState({'discription':e.value})}
                        component={props => <Select
                            {...props}
                         options={list.map(row => ({ value: row.Bond_ID, label: row.Cusip }))}
                        
                        />} />
                    <Errors
                        model=".Symbol"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-2">
                    <Label htmlFor="text-input">Description:</Label>
                    <Control
                        model=".Description"
                        component={props => <><Input {...props} type="text" id="text-input" name="text-input" value={discriptionValue.Description}  /> </>}
                    />
                    </Col>
            </FormGroup>
            <FormGroup row className="col-md-12">
                <Col className="col-md-2">
                    <Label htmlFor="text-input">Received Date*:</Label>
                    <br />
                    <Control
                        model=".TradeDate"
                        className="form-control"
                        onChange={(date) => handleDateChange(date, 'Received_Date')}
                        selected={state.Received_Date}
                        component={props => <DatePicker  {...props} placeholderText="Received Date"/>}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Received_Date"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-4">
                <Label htmlFor="text-input">Action*:</Label>
                    <Control
                        model=".Action"
                        //onChange={(e) => dispatch(getCategoryData({id: e.value}))}
                        component={props => <Input {...props} type="select" name="Action" id="Action">
                            <option value="" key="empty">Select Action</option>
                            <option value="CMPND" key="1">CMPND / "Z" Interest</option>
                            <option value="INTEREST" key="2">INTEREST</option>
                            <option value="Amortization" key="2">IO Amortization</option>
                            <option value="PAYDOWN" key="2">PAYDOWN</option>
                        </Input>}
                     validators={{ required }}
                    />
                    <Errors
                        model=".Action"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-4">
                    <Label htmlFor="text-input">Sub Action:</Label>
                    <Control
                        model=".Sub_Action"
                        //onChange={(e) => dispatch(getCategoryData({id: e.value}))}
                        component={props => <Select
                            {...props}
                            />}
                    />
                </Col>
            </FormGroup>
            <CardHeader>
                <i className="icon-minus"></i>Information
                    </CardHeader>
            <br/>
                    <FormGroup row className="col-md-13">
                <FormGroup col className="col-md-2" >
                <Col>
                    <Label htmlFor="text-input">Price*:</Label>
                    <Control
                        model=".Price"
                        component={props => <><Input {...props} type="number" id="text-input" name="text-input" placeholder="Price" /> </>}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Price"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                        /><br />
                        <Label htmlFor="text-input">Interest Received:</Label>
                    <Control
                        model=".InterestReceived"
                        component={props => <><Input {...props} type="number" id="text-input" name="text-input" placeholder="Interest Received" /> </>}
                     />
                </Col>
                </FormGroup>
                <FormGroup col className="col-md-2" >
                <Col >
                    <Label htmlFor="text-input">Quantity*:</Label>
                    <Control
                        model=".Quantity"
                        component={props => <><Input {...props} type="number" id="text-input" name="text-input" placeholder="Quantity" /> </>}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Quantity"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                        />
                        </Col>
                </FormGroup>
                <FormGroup row className="col-md-2"></FormGroup>
                <FormGroup row className="col-md-6 border" style={{ borderRadius: STYLE.borderRadius20 }}>
                    <FormGroup col className="col-md-3.1">
                        <br/>
                        <Col>LOT <br/>INFORMATION</Col>
                    </FormGroup>
                    <FormGroup col className="col-md-3.5">
                        <br/>
                    <Col >
                    <Switch onColor="#080" offColor="#888" checked={state.taxExempt === 'FEDERAL_TAX_EXCEMPT'} onChange={() => setState({ ...state, taxExempt: 'FEDERAL_TAX_EXCEMPT' })} height={15} width={30} />
                    <Label htmlFor="text-input" style={{ marginLeft: '20px' }}>Apply proporonally to all lots</Label>
                        </Col>
                        <Col>
                            Lot 1 : quantity:{data ? data.Lot :"XXXXX"}
                             <br/>
                            Lot 2 : quantity: XXXXX
                        </Col>

                    </FormGroup>
                    </FormGroup>
                </FormGroup>
        </LocalForm>
    )
}