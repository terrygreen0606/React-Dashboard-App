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
export default ({history, match, dispatch, loader, data, list, brokerageData}) => {
    const [state, setState] = useState({ taxExempt: "", Received_Date: null});
    const [btnType, setBtnType] = useState('');
    const discriptionValue = state.discription ? list.find(row =>row.Bond_ID === state.discription): {Description:"Discription"};
  
    useEffect(() => {
        setData();       
    }, [data]);    
    
    /************ Set data for edit ****/
    const setData = () => {
        if (data) {
           const obj = { ...data };
        Object.keys(obj).forEach(key => {
            myFormRef.dispatch(actions.change(`dividend.${key}`, obj[key]));
        });
        setState({
            //taxExempt: data.Tax_Exempt,
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
        ['dividend.Brokerage_Account', 'dividend.Transaction_Type', 'dividend.Symbol', 'dividend.Description', 'dividend.Dividend_Type','dividend.Dividend_Received'].map(key =>
            myFormRef.dispatch(actions.change(key, ''))
         );
         setState({ taxExempt: "", Received_Date: null});
    };
    /************* Handle submit  *******/
    const handleSubmit = (values) => {
        let payload = {
            "Brokerage_Account":typeof values.Brokerage_Account === "object" ? values.Brokerage_Account.value : values.Brokerage_Account,
            "transaction_option": values.Transaction_Type,
            "symbol": typeof values.Symbol === "object" ? values.Symbol.value.toString() : values.Symbol.toString(),
            "Trade_Date": getDateFormat(state.Received_Date),
            "Price": values.Price || '',
            "Quantity": values.Quantity || '',
            "Face_Value": values.Face_value || '',
            "Factor": values.Factor || '',
            "Commission": values.Commission || '',
            //extra field//
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
        }
        if(match.path === "/edit-transaction"){
            payload = {
                "ID": values.ID,
                ...payload
            }
        }
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
        model="dividend"
        className="form-horizontal"
        ref={(el) => myFormRef = el}
        >
            <FormGroup row className="col-md-12">
            <Col className="col-md-3">
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
                <Button type="submit" size="md" color="primary"  style={{ marginRight:STYLE.marginRight20 }}  onClick={() => setBtnType('new')} disabled={loader.isLoading}> {loader.isLoading ? 'LOADING...' : 'SAVE & NEW'}</Button>
                    <Button type="submit" size="md" color="primary" style={{ marginRight:STYLE.marginRight20 }}  disabled={loader.isLoading} >  {loader.isLoading ? 'LOADING...' : 'SAVE & CLOSE '}</Button>
                     <Button type="reset" size="md" color="primary" onClick={() => resetForm()}> RESET</Button>
                </Col>
            </FormGroup>
            <FormGroup row className="col-md-12">
            <Col className="col-md-3">
            <Label htmlFor="text-input">Transaction Type*:</Label>
                    <Control
                        model=".Transaction_Type"
                        //onChange={(e) => dispatch(getCategoryData({id: e.value}))}
                        component={props => <Input {...props} type="select" name="Transaction_Type" id="Transaction_Type">
                        <option value="" key="empty">Select Transaction Type</option>
                         <option value="Bond" key="1">Bond</option>
                        <option value="Stock" key="2">Stock</option>
                        <option value="Option" key="3">Option</option>
                        <option value="Mutual Fund" key="4">Mutual Fund</option>
                    </Input>}
                     //validators={{ required }}
                    />
                                        
                 </Col>
                <Col className="col-md-3">
                    <Label htmlFor="text-input">Symbol*:</Label>
                    <Control
                        model=".Symbol"
                        onChange={(e)=>setState({'discription':e.value})}
                        component={props => <Select
                            {...props}
                         options={list.map(row => ({ value: row.Bond_ID, label: row.Cusip }))}
                        
                        />}
                    />
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
                        component={props => <DatePicker  {...props} placeholder="Received Date"/>}
                        validators={{ required }}
                    />
                    <Errors
                        model=".TradeDate"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-4">
                    <Label htmlFor="text-input">Dividend Type*:</Label>
                    <Control
                        model=".Dividend_Type"
                        //onChange={(e) => dispatch(getCategoryData({id: e.value}))}
                        component={props => <Input {...props} type="select" name="Transaction_Type" id="Transaction_Type    ">
                        <option value="" key="empty">Select Dividend Type</option>
                         <option value="Cash_Dividend" key="1">Cash Dividend</option>
                        <option value="Stock_Dividend" key="2">Stock Dividend</option>
                    </Input>}
                     //validators={{ required }}
                    />
                    <Errors
                        model=".Dividend_Type"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
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
                    <Label htmlFor="text-input">Dividend Received:</Label>
                    <Control
                        model=".Dividend_Received"
                        component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="Dividend Received" />}
             />
                    <br />
                
                </Col>
                </FormGroup>
                <FormGroup col className="col-md-2" >
                <Col >
                
                        </Col>
                </FormGroup>
                
                <FormGroup row className="col-md-5 border" style={{ borderRadius: STYLE.borderRadius20 }}>
                
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
                            
                            Lot 1 : quantity: {data ? data.lot :"XXXXX"}
                             <br/>
                            Lot 2 : quantity: XXXXX
                        </Col>

                    </FormGroup>
                    </FormGroup>
                </FormGroup>
      </LocalForm>
    )
}