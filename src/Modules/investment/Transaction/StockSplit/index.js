import React, { useState, useEffect }  from 'react';
import { FormGroup, Col, Input, Label, Button } from 'reactstrap';
import { Control, Errors ,LocalForm, actions } from 'react-redux-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select"; 
import { required } from '../../../../utilities/regex';
import Message from '../../../../utilities/message';
import { formatDate, getDateFormat } from "../../../CommonComponents/methods";
// import { getCountry } from '../../../../services/territory';
import { addUpdateTransaction } from '../../../../services/investment';

let myFormRef = React.createRef();
export default ({history, list, loader, match, dispatch}) => {
    const [state, setState] = useState({stock_Date:null});
    const [btnType, setBtnType] = useState('');
    const discriptionValue = state.discription ? list.find(row =>row.Bond_ID === state.discription): {Description:"Discription"};

    
    useEffect(() => {
        setData();       
    }, []);    
    
    /************ Set data for edit ****/
    const setData = () => {
        // const obj = { ...data };
        // const country = countries.find(row => row.n_CountryId_PK === data.Country_ID);
        // const category = categories.find(row => row.Bond_Category_ID === data.Bond_Category_ID);
        // const subcategory = subcategories.find(row => row.Bond_Category_ID === data.Bond_SubCategory_ID);
        // obj.Bond_Category_ID = { value: data.Bond_Category_ID, label: category ? category.Category_Name : null }
        // obj.Bond_SubCategory_ID = { value: data.Bond_SubCategory_ID, label: subcategory ? subcategory.Category_Name : null }
        // obj.Country_ID = { value: data.Country_ID, label: country ? country.s_CountryName : null }
        // Object.keys(obj).forEach(key => {
        //     myFormRef.dispatch(actions.change(`security.${key}`, obj[key]));
        // });
        setState({
            // taxExempt: data.Tax_Exempt,
            // Issue_Date: data.Issue_Date ? new Date(formatDate(data, 'Issue_Date')) : null,
            // Coupon_Date: data.Coupon_Date ? new Date(formatDate(data, 'Coupon_Date')) : null,
            // Maturity_Date: data.Maturity_Date ? new Date(formatDate(data, 'Maturity_Date')) : null,
            // Call_Date: data.Call_Date ? new Date(formatDate(data, 'Call_Date')) : null,
            // Put_Date: data.Put_Date ? new Date(formatDate(data, 'Put_Date')) : null
        })
    }
      /************ Handle date change **********/
      const handleDateChange = (date,key) => {
          setState({ ...state, [key]: date });
    };
    
     /************** Reset form values ************/
     const resetForm = () => {
        ['security.Transaction_Type', 'security.Current_Symbol', 'security.Description', 'security.Current_Quantity'].map(key =>
            myFormRef.dispatch(actions.change(key, ''))
         );
         setState({ taxExempt: "", Issue_Date: null , Coupon_Date:null, Maturity_Date:null, Call_Date:null, Put_Date:null, Start_Date:null});
    };
    /************* Handle submit  *******/
    const handleSubmit = (values) => {
        let payload = {
            "Brokerage_Account": '',
            "transaction_option": values.Transaction_Type,
            "symbol": typeof values.Current_Symbol === "object" ? values.Current_Symbol.value.toString() : values.Symbol.toString(),
            "Trade_Date": getDateFormat(state.stock_Date),
            "Price": '',
            "Quantity": values.New_Quantity || '',
            "Face_Value": '',
            "Factor": '',
            "Commission": '',
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
    //const button = match.path === "/" ? 'UPDATE' : 'SAVE';
    return (
        <LocalForm
        onSubmit={(values) => handleSubmit(values)}
        model="security"
        className="form-horizontal"
        ref={(el) => myFormRef = el}
        >
            <FormGroup row className="col-md-12">
            <Col className="col-md-2">
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
                     //validators={{ required }}
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
                    <Label htmlFor="text-input">Current Symbol*:</Label>
                    <Control
                        model=".Current_Symbol"
                        onChange={(e)=>setState({'discription':e.value})}
                        component={props => <Select
                            {...props}
                         options={list.map(row => ({ value: row.Bond_ID, label: row.Cusip }))}
                        
                        />}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Current_Symbol"
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
                <Col className="col-md-5">
                    <Button type="submit" size="md" color="primary"  style={{ marginRight: '20px' }}>  SAVE {'&'} NEW </Button>
                    <Button type="reset" size="md" color="primary" style={{ marginRight: '20px' }} onClick={() => history.push('/transaction')}> SAVE {'&'} CLOSE </Button>
                     <Button type="reset" size="md" color="primary" onClick={() => resetForm()}> RESET</Button>
                </Col>
            </FormGroup>
            <FormGroup row className="col-md-12">
                <Col className="col-md-2">
                    <Label htmlFor="text-input">Stock Split Date*:</Label>
                    <br />
                    <Control
                        model=".Stock_Split_Date"
                        className="form-control"
                        onChange={(date) => handleDateChange(date, 'stock_Date')}
                        selected={state.stock_Date}
                        component={props => <DatePicker  {...props} />}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Stock_Split_Date"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-3">
                    <Label htmlFor="text-input">Current Quantity:</Label>
                    <Control
                        model=".Current_Quantity"
                        component={props => <><Input {...props} type="number" id="text-input" name="text-input" placeholder="Current Quantity" /> </>}
                    />
                    </Col>
                    <Col className="col-md-3">
                    <Label htmlFor="text-input">New Quantity*:</Label>
                    <Control
                        model=".New_Quantity"
                        component={props => <><Input {...props} type="number" id="text-input" name="text-input" placeholder="New Quantity" /> </>}
                        validators={{ required }}
                    />
                    <Errors
                        model=".New_Quantity"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-3">
                    <Label htmlFor="text-input">Total Quantity:</Label>
                    <Control
                        model=".Total_Quantity"
                        component={props => <><Input {...props} type="number" id="text-input" name="text-input" placeholder="Total Quantity" /> </>}
                  />
                </Col>
            </FormGroup>
                 </LocalForm>
    )
}