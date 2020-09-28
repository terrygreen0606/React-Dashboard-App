import React, { useState, useEffect }from 'react';
import { NavLink } from 'react-router-dom'
import { FormGroup, Col, Label, Input, Button, Card, CardHeader} from 'reactstrap';
import { Control, Errors, LocalForm, actions } from 'react-redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { addUpdateCoupon } from '../../../services/investment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select"; 
import { required } from '../../../utilities/regex';
import Message from '../../../utilities/message';
import {STYLE} from '../../../utilities/constants';
import BackButton from '../../CommonComponents/BackButton';
import { getInvestment } from '../../../services/investment';
import { formatDate, getDateFormat } from "../../CommonComponents/methods";

let myFormRef = React.createRef();
export default ({ history, match }) => {     
    const [state, setState] = useState({ Start_Date: null, btnType: '' });       
    const dispatch = useDispatch();
    const { investment, loader } = useSelector(stateData => stateData); 
    const data = investment.coupons.find(row => row.Coupon_ID.toString() === investment.edit_row_id.toString()) || {};
    useEffect(() => {
        if(match.path === '/edit-coupon' && !investment.edit_row_id){
            history.goBack();
        }
        if(investment.list.length < 16)
        {
        dispatch(getInvestment({}));
        }
    }, []) 
    useEffect(() => {
        if(!state.btnType){
            setData();  
        }             
    }, [data, investment.list]);   
    
     /************ Set data for edit ****/
    const setData = () => {
            const obj = { ...data };
            const _investment = investment.list.find(row => row.Bond_ID === obj.Bond_ID) || {}
            obj.Bond_ID = obj.Bond_ID ? { value:  obj.Bond_ID, label:  _investment.Cusip } : ""
            Object.keys(obj).forEach(key => {
            myFormRef.dispatch(actions.change(`coupon.${key}`, obj[key]));
            });
        if (obj.Start_Date) {
            setState({
                ...state,
                Start_Date: obj.Start_Date ? new Date(formatDate(obj, 'Start_Date')) : null,
            })
        }
    }
    /************** Reset form values ************/
    const resetForm = () => {
        ['coupon.Bond_ID', 'coupon.Rate','coupon.Start_Date'].map(key =>
           myFormRef.dispatch(actions.change(key, ''))
       );
    };
    /************ Handle date change **********/
    const handleDateChange = (date,key) => {
        setState({ ...state, [key]: date });
    };
   /************ Handle date update **********/
    const handleSubmit = (values) => {
        let payload = {
                "Bond_ID":values.Bond_ID.value,
                "Rate": values.Rate,
                "Start_Date": getDateFormat(state.Start_Date)
         };
         if(match.path === "/edit-coupon"){
             payload = {
                 "Coupon_ID": data.Coupon_ID,
                 ...payload
             }
        }
        dispatch(addUpdateCoupon(payload)).then(() => {
            if(state.btnType === 'new') {
                resetForm();
                setState({...state, btnType: ''});
            } else {
                history.push('/investments-security')
            }        
        });
     };
    
    return (
        <Card>
         <CardHeader>
            <BackButton backUrl='/investments-security' history={history} text={match.path === "/edit-coupon" ? "Edit Coupon" : "Add Coupon"} />
            </CardHeader> 
            <FormGroup row className="col-md-12">
            </FormGroup>
            <LocalForm
                onSubmit={(values) => handleSubmit(values)}
                model="coupon"
                className="form-horizontal"
                ref={(el) => myFormRef = el}
            >    
              <FormGroup row className="col-md-12">    
                <Col className="col-md-2"> <NavLink strict to="#" className={match.path === '/coupons' || match.path === '/edit-coupon' ? "btn btn-default" : "btn btn-primary"} onClick={()=>history.push('/coupons')}  >{match.path === '/edit-coupon' ? 'EDIT COUPON' : 'NEW COUPON'}</NavLink></Col>
                <Col className="col-md-3"> <NavLink strict to="/historical-coupon" className="btn btn-primary" >HISTORICAL COUPON</NavLink></Col> 
                </FormGroup>
                            
                <hr />
                <FormGroup row className="col-md-12">                
                    <Col className="col-md-3">
                    <Label htmlFor="text-input">Coupon Rate*:</Label>
                    <Control
                        model=".Rate"
                        component={props => <Input {...props} type="number" id="text-input" name="text-input" placeholder="Coupon Rate" />}
                        validators={{ required }}
                        />
                        <Errors
                            model=".Rate"
                            show={(field) => field.touched && !field.focus}
                            className="error"
                            messages={{
                                required: Message.required
                            }}
                        />
                    </Col>                   
                <Col className="col-md-3">
                    <Label htmlFor="text-input">Start Date*:</Label>
                    <br />
                    <Control
                        model=".Start_Date"
                        className="form-control"
                        onChange={(date) => handleDateChange(date, 'Start_Date')}
                        selected={state.Start_Date}
                        component={props => <DatePicker  {...props} placeholderText="Start Date" />}
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
                    <Col className="col-md-4" style={{marginTop:'15px'}}>
                        { match.path === "/edit-coupon" ?
                            <>
                            <Button type="submit" size="sm" color="primary" disabled={loader.isLoading} style={{ marginRight: STYLE.marginRight25}}>{loader.isLoading ? 'Loading...' : 'UPDATE'}</Button>
                            <Button type="button" size="sm" color="primary" onClick={() =>history.push('/historical-coupon')}>Close</Button>
                            </>
                            :
                            <>
                            <Button type="submit" size="sm" color="primary" disabled={loader.isLoading} style={{ marginRight: STYLE.marginRight25 }} onClick={() => setState({...state, btnType: 'new'})}>{loader.isLoading ? 'Loading...' : 'SAVE & NEW'}</Button>
                            <Button type="submit" size="sm" color="primary" disabled={loader.isLoading} style={{ marginRight: STYLE.marginRight25 }} >{loader.isLoading ? 'Loading...' : 'SAVE & CLOSE'}</Button>
                            <Button type="button" size="sm" color="primary" onClick={() => resetForm()}>RESET</Button>
                            </>
                        }
                 </Col>                    
                </FormGroup>
                <FormGroup row className="col-md-12">
                <Col className="col-md-3">
                    <Label htmlFor="text-input">Cusip*:</Label>
                    <Control
                        model=".Bond_ID"
                        component={props => <Select
                            {...props}
                         options={investment.list.map(row => ({ value: row.Bond_ID, label: row.Cusip }))}
                        />}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Bond_ID"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                    </Col>         
            </FormGroup>
            
           </LocalForm>
        </Card>
    )
}
