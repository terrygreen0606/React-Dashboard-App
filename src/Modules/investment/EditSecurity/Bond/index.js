import React, { useState, useEffect }  from 'react';
import { FormGroup, Col, Input, Label, Button ,CardHeader} from 'reactstrap';
import { Control, Errors ,LocalForm, actions } from 'react-redux-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Switch from "react-switch";
import Select from "react-select"; 
import { NAICLIST} from '../../../../utilities/constants';
import { required } from '../../../../utilities/regex';
import Message from '../../../../utilities/message';
import { formatDate, getDateFormat } from "../../../CommonComponents/methods";
import { getCountry } from '../../../../services/territory';

export default ({ history, match, data={}, type=null, loader, editSecurity, getCategoryData, categories, dispatch, subcategories, countries }) => {
    const [state, setState] = useState({ taxExempt: "", Issue_Date: null , Coupon_Date:null, Maturity_Date:null, Call_Date:null, Put_Date:null, Start_Date:null});
    let myFormRef = React.createRef();
    useEffect(() => {
        if(subcategories.length === 0 && match.path === "/edit-security"){
            dispatch(getCategoryData({ id: data.Bond_Category_ID })).then(() => dispatch(getCountry({})));
        } else {
            dispatch(getCountry({}));
        }      
     }, [categories]) 
    
    useEffect(() => {
        setData();       
    }, [data, countries]);    
    /************ Set data for edit ****/
    const setData = () => {
        const obj = { ...data };
        const country = countries.find(row => row.n_CountryId_PK === data.Country_ID);
        const category = categories.find(row => row.Bond_Category_ID === data.Bond_Category_ID);
        const subcategory = subcategories.find(row => row.Bond_Category_ID === data.Bond_SubCategory_ID);
        obj.Bond_Category_ID = { value: data.Bond_Category_ID, label: category ? category.Category_Name : null }
        obj.Bond_SubCategory_ID = { value: data.Bond_SubCategory_ID, label: subcategory ? subcategory.Category_Name : null }
        obj.Country_ID = { value: data.Country_ID ? data.Country_ID : '1', label: country ? country.s_CountryName : 'USA' }
        Object.keys(obj).forEach(key => {
            myFormRef.dispatch(actions.change(`security.${key}`, obj[key]));
        });
        setState({
            taxExempt: data.Tax_Exempt,
            Issue_Date: data.Issue_Date ? new Date(formatDate(data, 'Issue_Date')) : null,
            Coupon_Date: data.Coupon_Date ? new Date(formatDate(data, 'Coupon_Date')) : null,
            Maturity_Date: data.Maturity_Date ? new Date(formatDate(data, 'Maturity_Date')) : null,
            Call_Date: data.Call_Date ? new Date(formatDate(data, 'Call_Date')) : null,
            Put_Date: data.Put_Date ? new Date(formatDate(data, 'Put_Date')) : null
        })
    }
      /************ Handle date change **********/
      const handleDateChange = (date,key) => {
          setState({ ...state, [key]: date });
    };
    
     /************** Reset form values ************/  
     const resetForm = () => {
        ['security.Cusip', 'security.NAIC_Designation', 'security.Description', 'security.Bond_Category_ID','security.Bond_SubCategory_ID','security.Coupon','security.Coupon_Delay','security.Payment_Frequency','security.Accrual','security.Amortization_Method'].map(key =>
            myFormRef.dispatch(actions.change(key, ''))
         );
         ['security.Redemption_Value'].map(key =>
            myFormRef.dispatch(actions.change(key, '100'))
         );
         setState({ taxExempt: "", Issue_Date: null , Coupon_Date:null, Maturity_Date:null, Call_Date:null, Put_Date:null, Start_Date:null});
    };
    /************* Handle submit  *******/
    const handleSubmit = (values) => {
            let payload =   {
            "Security_type": type,
            "Cusip": values.Cusip,
            "Description": values.Description,
            "Bond_Category_ID": typeof values.Bond_Category_ID === "object" ? values.Bond_Category_ID.value : values.Bond_Category_ID,
            "Bond_SubCategory_ID":  typeof values.Bond_SubCategory_ID === "object" ? values.Bond_SubCategory_ID.value : values.Bond_SubCategory_ID,
            "Issue_Date": getDateFormat(state.Issue_Date),
            "Coupon_Date": getDateFormat(state.Coupon_Date),
            "Maturity_Date": getDateFormat(state.Maturity_Date),
            "Call_Date": getDateFormat(state.Call_Date),
            "Put_Date": getDateFormat(state.Put_Date),
            "Payment_Frequency": values.Payment_Frequency,
            "Accrual": values.Accrual,
            "Redemption_Value": values.Redemption_Value,
            "Coupon_Delay": values.Coupon_Delay,
            "Amortization_Method":values.Amortization_Method,
            "Tax_Exempt": state.taxExempt ? state.taxExempt : "NON-EXEMPT",
            "Country_ID": typeof values.Country_ID === "object" ? values.Country_ID.value : values.Country_ID,
        /********extra fields ***********/
            "NAIC_Designation": typeof values.NAIC_Designation === "object" ? values.NAIC_Designation.value : values.NAIC_Designation,
            "Start_Date": getDateFormat(state.Start_Date),
            "Tax_Exempt_Account_ID": values.Tax_Exempt_Account_ID
        };
              if(match.path === "/edit-security"){
            payload = {
                "Bond_ID": values.Bond_ID,
                ...payload
            }
        }
       dispatch(editSecurity(payload)).then(() => history.push('/investments-security'))
    };
    const button = match.path === "/edit-security" ? 'UPDATE' : 'SAVE';
    return (
        <LocalForm
        onSubmit={(values) => handleSubmit(values)}
        model="security"
        className="form-horizontal"
        ref={(el) => myFormRef = el}
        >
            <FormGroup row className="col-md-12">
                <Col className="col-md-3">
                    <Label htmlFor="text-input">Cusip*:</Label>
                    <Control
                        model=".Cusip"
                        component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="Cusip" />}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Cusip"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                        
                    />
                </Col>
                <Col className="col-md-3">
                    <Label htmlFor="text-input">NAIC Designation*:</Label>
                    <Control
                        model=".NAIC_Designation"
                        component={props =><Select
                            {...props}
                            options={NAICLIST.map((row,index) => ({ value: index+1 , label: row}))} />}
                            validators={{ required }}
                    />
                      <Errors
                        model=".NAIC_Designation"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-2">
                    <Label htmlFor="text-input">Redemption Value*:</Label>
                    <Control
                        model=".Redemption_Value"
                        component={props => <Input {...props} type="number" id="text-input" name="text-input" defaultValue="100"/>}
                     />
                    <Errors
                        model=".Redemption_Value"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-4">
                    <Button type="submit" size="md" color="primary" disabled={loader.isLoading} style={{ marginRight: '30px' }}>  {loader.isLoading ? 'Processing...' : button}</Button>
                    {match.path === "/edit-security" ? 
                        <Button type="reset" size="md" color="danger" onClick={() => history.push('/investments-security')}> CANCEL</Button>
                    :
                    <Button type="reset" size="md" color="danger" onClick={() => resetForm()}> RESET</Button>
                    }   
                </Col>
            </FormGroup>
            <FormGroup row className="col-md-12">
                <Col className="col-md-4">
                    <Label htmlFor="text-input">Description*:</Label>
                    <Control
                        model=".Description"
                        component={props => <Input {...props} type="text" name="Description" placeholder="Description" />}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Description"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-4">
                    <Label htmlFor="text-input">Category*:</Label>
                    <Control
                        model=".Bond_Category_ID"
                        onChange={(e) => dispatch(getCategoryData({id: e.value}))}
                        component={props => <Select
                            {...props}
                            options={categories.map(row => ({ value: row.Bond_Category_ID, label: row.Category_Name }))} />}
                            validators={{ required }}
                    />
                    <Errors
                        model=".Bond_Category_ID"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-3">
                    <Label htmlFor="text-input">Sub Category:</Label>
                    <Control
                        model=".Bond_SubCategory_ID"
                        component={props => <Select
                            {...props}
                            options={subcategories.map(row => ({ value: row.Bond_SubCategory_ID, label: row.SubCategory_Name }))} />}
                            validators={{ required }}
                    />
                </Col>
            </FormGroup>
            <FormGroup row className="col-md-12">
                <Col className="col-md-2">
                    <Label htmlFor="text-input">Issue Date*:</Label>
                    <br />
                    <Control
                        model=".Issue_Date"
                        className="form-control"
                        onChange={(date) => handleDateChange(date, 'Issue_Date')}
                        selected={state.Issue_Date}
                        component={props => <DatePicker  {...props} placeholderText="Issue Date" />}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Issue_Date"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-2">
                    <Label htmlFor="text-input">First Coupon Date*:</Label>
                    <br />
                    <Control
                        model=".Coupon_Date"
                        className="form-control"
                        onChange={(date) => handleDateChange(date , 'Coupon_Date')}
                        selected={state.Coupon_Date}
                        component={props => <DatePicker  {...props}  placeholderText="First Coupon Date"/>}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Coupon_Date"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-2">
                    <Label htmlFor="text-input">Maturity Date*:</Label>
                    <br />
                    <Control
                        model=".Maturity_Date"
                        className="form-control"
                        onChange={(date) => handleDateChange(date , 'Maturity_Date')}
                        selected={state.Maturity_Date}
                        component={props => <DatePicker  {...props} placeholderText="Maturity Date" />}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Maturity_Date"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-2">
                    <Label htmlFor="text-input">Call Date:</Label>
                    <br />
                    <Control
                        model=".Call_Date"
                        className="form-control"
                        onChange={(date) => handleDateChange(date ,'Call_Date')}
                        selected={state.Call_Date}
                        component={props => <DatePicker  {...props} placeholderText="Call Date" />}
                    />
                </Col>
                <Col className="col-md-3">
                    <Label htmlFor="text-input">Put Date:</Label>
                    <br />
                    <Control
                        model=".Put_Date"
                        className="form-control"
                        onChange={(date) => handleDateChange(date ,'Put_Date')}
                        selected={state.Put_Date}
                        component={props => <DatePicker  {...props} placeholderText="Put Date"/>}
                     />
                    </Col>
            </FormGroup>
            <CardHeader>
                <i className="icon-minus"></i>Bond Details
                    </CardHeader>
            <FormGroup row className="col-md-12">
                <Col className="col-md-3">
                    <Label htmlFor="text-input">Current Coupon Rate*:</Label>
                    <Control
                        model=".Coupon"
                        component={props => <><Input {...props} type="number" id="text-input" name="text-input" placeholder="Coupon Rate" /> </>}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Coupon"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-2">
                    <Label htmlFor="text-input">Start Date*:</Label>
                    <br />
                    <Control
                        model=".Start_Date"
                        className="form-control"
                         onChange={(date) => handleDateChange(date ,'Start_Date')}
                         selected={state.Start_Date}
                        component={props => <DatePicker  {...props}  placeholderText="Start Date"/>}
                        validators={{ required }}
                    />
                      <Errors
                        model=".Start_Date"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-3">
                    <Label htmlFor="text-input">Coupon Delay*:</Label>
                    <Control
                        model=".Coupon_Delay"
                        component={props => <><Input {...props} type="text" id="text-input" name="text-input" placeholder="coupon delay" /> </>}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Coupon_Delay"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-3">
                    <Label htmlFor="text-input">Payment Frequency*:</Label>
                    <Control
                        model=".Payment_Frequency"
                        component={props => <Input {...props} type="select" name="paymentfrequency" id="Payment_Frequency">
                            <option value="" key="empty">Select Frequency</option>
                            <option value="Annual" key="1">Annual</option>
                            <option value="Semi-Annual" key="2">Semi-Annual</option>
                            <option value="Quarter" key="3">Quarter</option>
                            <option value="Month" key="4">Month</option>
                        </Input>}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Payment_Frequency"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
            </FormGroup>
            <FormGroup row className="col-md-12">
                <Col className="col-md-4">
                    <Label htmlFor="text-input">Accrual Calendar*:</Label>
                    <Control
                        model=".Accrual"
                        component={props => <Input {...props} type="select" name="Accrual" id="Accrual">
                            <option value="" key="empty">Select Accrual</option>
                            <option value="30/360" key="1">30/360</option>
                            <option value="30/360E" key="2">30/360E</option>
                            <option value="30/360+" key="3">30/360+</option>
                            <option value="Act/360" key="4">Act/360</option>
                            <option value="Act/365" key="5">Act/365</option>
                            <option value="Act/Act" key="6">Act/Act</option>
                            <option value="ACT/ACT - US Treasury" key="7">ACT/ACT - US Treasury</option>
                        </Input>}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Accrual"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-4">
                    <Label htmlFor="text-input">Amortization Method*:</Label>
                    <Control
                        model=".Amortization_Method"
                        component={props => <Input {...props} type="select" name="Amortization_Method" id="Amortization_Method">
                            <option value="" key="empty">Select Amortization Method</option>
                            <option value="1" key="1">Scientific to Maturity</option>
                            <option value="2" key="2">Straight-Line Method</option>
                            <option value="3" key="3">Bonds Outstanding Method</option>
                            <option value="4" key="4">Scientific to Call Date</option>
                            <option value="5" key="5">Scientific to Put Date</option>
                        </Input>}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Amortization_Method"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
            </FormGroup>
            <CardHeader>
                <i className="icon-minus"></i>Other Information
                    </CardHeader>
            <FormGroup row className="col-md-12" style={{ marginTop: '10px' }}>
                <Col className="col-md-3" >
                    <Switch onColor="#080" offColor="#888" checked={state.taxExempt === 'FEDERAL_TAX_EXCEMPT'} onChange={() => setState({ ...state, taxExempt: 'FEDERAL_TAX_EXCEMPT' })} height={15} width={30} />
                    <Label htmlFor="text-input" style={{ marginLeft: '20px' }}>Federal Tax‐Exempt</Label>
                </Col>
                <Col className="col-md-3" >
                    <Switch onColor="#080" offColor="#888" checked={state.taxExempt === 'FEDERAL_STATE_TAX_EXCEMPT'} onChange={() => setState({ ...state, taxExempt: 'FEDERAL_STATE_TAX_EXCEMPT' })} height={15} width={30} />
                    <Label htmlFor="text-input" style={{ marginLeft: '20px' }}>Federal & State Tax‐</Label>
                </Col>
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