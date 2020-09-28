import React, { useState, useEffect }  from 'react';
import { FormGroup, Col, Input, Label, Button ,CardHeader} from 'reactstrap';
import { Control, Errors ,LocalForm, actions } from 'react-redux-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { required } from '../../../../utilities/regex';
import Message from '../../../../utilities/message';
import { STYLE } from '../../../../utilities/constants';
import { formatDate, getDateFormat } from "../../../CommonComponents/methods";
import { addUpdateTransaction } from '../../../../services/investment';


let myFormRef = React.createRef();
export default ({ history, match, dispatch, loader, data, list, countries , brokerageData, brokers}) => {
    const [state, setState] = useState({ Trade_Date: null, Settle_Date: null });
    const [btnType, setBtnType] = useState('');
    const discriptionValue = state.discription ? list.find(row =>row.Bond_ID === state.discription): {Description:"Discription"};
    useEffect(() => {
        setData();       
    }, [data]);    
    
    /************ Set data for edit ****/
    const setData = () => {
        const obj = { ...data };
        if (data) {
            Object.keys(obj).forEach(key => {
                myFormRef.dispatch(actions.change(`buySell.${key}`, obj[key]));
            });
            setState({
                Trade_Date: data.TradeDate ? new Date(formatDate(data, 'TradeDate')) : null,
                Settle_Date: data.SettleDate ? new Date(formatDate(data, 'SettleDate')) : null,
            })
        }
    }
      /************ Handle date change **********/
      const handleDateChange = (date,key) => {
          setState({ ...state, [key]: date });
    };
    
     /************** Reset form values ************/
     const resetForm = () => {
        ['buySell.Brokerage_Account', 'buySell.Broker', 'buySell.Transaction_Type', 'buySell.Symbol', 'buySell.Description','buySell.Action','buySell.Coupon','buySell.Price','buySell.Commission','buySell.Quantity','buySell.Face_value','buySell.Accrued_Interest ','buySell.Factor','buySell.NetAmount'].map(key =>
            myFormRef.dispatch(actions.change(key, ''))
         );
         setState({  Trade_Date: null , Settle_Date:null});
    };
   
/************* Handle submit  *******/
    const handleSubmit = (values) => {
        let payload = {
            "transaction_option": values.Transaction_Type,
            "symbol": typeof values.Symbol === "object" ? values.Symbol.value.toString() : values.Symbol.toString(),
            "Broker_ID": typeof values.Broker === "object" ? values.Broker.value : values.Broker,
            "Trade_Date": getDateFormat(state.Trade_Date),
            "Settle_Date":  getDateFormat(state.Settle_Date),
            "Price": values.Price,
            "Quantity": values.Quantity,
            "Face_Value": values.Face_value,
            "Factor": values.Factor,
            "Commission": values.Commission,
            //extra field//
            "Country_ID": typeof values.Country_ID === "object" ? values.Country_ID.value : values.Country_ID,
            "Brokerage_Account":typeof values.Brokerage_Account === "object" ? values.Brokerage_Account.value : values.Brokerage_Account,
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
        model="buySell"
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
                <Col className="col-md-3">
                    <Label htmlFor="text-input">Broker*:</Label>
                    <Control
                        model=".Broker"
                        component={props => <Select
                         {...props}
                         options={brokers.map(row => ({ value: row.Broker_ID, label: row.Broker_Name }))} />}
                         validators={{ required }}
                    />
                    <Errors
                        model=".Broker"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-1"></Col>
                
                <Col className="col-md-5">
                    <Button type="submit" size="md" color="primary"  style={{ marginRight:STYLE.marginRight20 }}  onClick={() => setBtnType('new')} disabled={loader.isLoading}> {loader.isLoading ? 'LOADING...' : 'SAVE & NEW'}</Button>
                    <Button type="submit" size="md" color="primary" style={{ marginRight:STYLE.marginRight20 }}  disabled={loader.isLoading} >  {loader.isLoading ? 'LOADING...' : 'SAVE & CLOSE '}</Button>
                     <Button type="reset" size="md" color="primary" onClick={() => resetForm()}> RESET</Button>
                </Col>
            </FormGroup>
            <FormGroup row className="col-md-13">
                <FormGroup col className="col-md-2" >
                    <Col >
                    <Label htmlFor="text-input">Transaction Type*:</Label>
                    <Control
                        model=".Transaction_Type"
                        //onChange={(e) => dispatch(getCategoryData({id: e.value}))}
                        component={props => <Input {...props} type="select" name="Transaction_Type" id="Transaction_Type">
                        <option value="" key="empty">Select Trade Type</option>
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
                        <br/>
                        <Label htmlFor="text-input">Trade Date*:</Label>
                    <br />
                    <Control
                        model=".Trade_Date"
                        className="form-control"
                        onChange={(date) => handleDateChange(date, 'Trade_Date')}
                        selected={state.Trade_Date}
                        component={props => <DatePicker  {...props} placeholderText="Trade Date"/>}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Trade_Date"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                    </Col>
                </FormGroup>
                <FormGroup col className="col-md-3" >
                <Col>
                    <Label htmlFor="text-input">Symbol*:</Label>
                    <Control
                        model=".Symbol"
                        onChange={(e)=>setState({'discription':e.value})}
                        component={props => <Select
                        {...props}
                         options={list.map(row => ({ value: row.Bond_ID, label: row.Cusip }))}
                        />}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Symbol"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                        />
                        <br />
                        <Label htmlFor="text-input">Settle Date*:</Label>
                    <br />
                    <Control
                        model=".Settle_Date"
                        className="form-control"
                        onChange={(date) => handleDateChange(date , 'Settle_Date')}
                        selected={state.Settle_Date}
                        component={props => <DatePicker  {...props} placeholderText="Settle Date" />}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Settle_Date"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                </FormGroup>
                <FormGroup col className="col-md-2" >
                <Col>
                    <Label htmlFor="text-input">Description:</Label>
                    <Control
                        model=".Description"
                        component={props => <><Input {...props} type="text" id="text-input" name="text-input" value={discriptionValue.Description}  /> </>}
                  />
                        <br />
                        <Label htmlFor="text-input">Action*:</Label>
                    <Control
                        model=".Action"
                        //onChange={(e) => dispatch(getCategoryData({id: e.value}))}
                        component={props => <Input {...props} type="select" name="Action" id="Action">
                            <option value="" key="empty">Select Action</option>
                            <option value="BUY" key="1">Buy</option>
                            <option value="SELL" key="2">Sell</option>
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
                </FormGroup>
                <FormGroup row className="col-md-4 border" style={{ borderRadius: STYLE.borderRadius20 }}>
                <FormGroup col className="col-md-2">
                    </FormGroup>
                    <FormGroup col className="col-md-8">
                        <Col>
                            <br/>
                            <br />
                            Lot 1 :quantity: {data ? data.Lot : "XXXXX"}
                              <br/> Lot 2 :quantity: XXXXX
                        </Col>
                </FormGroup>
                </FormGroup>
                </FormGroup>
            <CardHeader>
                <i className="icon-minus"></i>Cost Information
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
                        <Label htmlFor="text-input">Commission:</Label>
                    <Control
                        model=".Commission"
                        component={props => <><Input {...props} type="number" id="text-input" name="text-input" placeholder="Commission" /> </>}
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
                    <FormGroup col className="col-md-3.5">
                        <br/>
                        <Col>BOND ONLY </Col>
                    </FormGroup>
                    <FormGroup col className="col-md-3.5">
                        <Col>
                    <Label htmlFor="text-input">Face Value(Bond*):</Label>
                    <Control
                        model=".Face_value"
                        component={props => <><Input {...props} type="number" id="text-input" name="text-input" placeholder="Face Value" /> </>}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Face_value"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                        /><br />
                        <Label htmlFor="text-input">Accrued Interest (bond*): </Label>
                    <Control
                        model=".Accrued_Interest "
                        component={props => <><Input {...props} type="number" id="text-input" name="text-input" placeholder="Accrued Interest " /> </>}
                       //validators={{ required }}
                            />
                       <Errors
                        model=".Accrued_Interest "
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                        />
                    </Col>
                    </FormGroup>
                    <FormGroup col className="col-md-3.5">
                        <Col>
                    <Label htmlFor="text-input">Factor (bond*):</Label>
                    <Control
                        model=".Factor"
                        component={props => <><Input {...props} type="text" id="text-input" name="text-input" placeholder="Factor" /> </>}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Factor"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                        /><br />
                      <span>
                          <br/>     <br/>   Calculate</span>
                </Col>
                    </FormGroup>
                    </FormGroup>
                </FormGroup>
            <FormGroup row className="col-md-12">
            <Col className="col-md-3">
                    <Label htmlFor="text-input">Total Cost:</Label>
                    <Control
                        model=".NetAmount"
                        component={props => <><Input {...props} type="number" id="text-input" name="text-input" placeholder="Total Cost" /> </>}
                     />
                </Col>  
            </FormGroup>
            <CardHeader>
                <i className="icon-minus"></i>Other Information
                    </CardHeader>
            
                    <FormGroup row className="col-md-12">
            <Col className="col-md-4">
                    <Label htmlFor="text-input">Country*:</Label>
                    <Control
                        model=".Country_ID"
                        component={props => <Select
                            {...props}
                            options={countries.map(row => ({ value: row.n_CountryId_PK, label: row.s_CountryName }))} />}
                            validators={{ required }}
                    />
                    <Errors
                        model=".Country_ID"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                </FormGroup>
        </LocalForm>
    )
}