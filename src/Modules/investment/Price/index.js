import React, { useState, useEffect }from 'react';
import { NavLink } from 'react-router-dom'
import { FormGroup, Col, Label, Input, Button, Card, CardHeader,Table} from 'reactstrap';
import { Control, Errors, LocalForm, actions } from 'react-redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { addUpdatePrice, getPricesData } from '../../../services/investment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select"; 
import { required } from '../../../utilities/regex';
import Message from '../../../utilities/message';
import BackButton from '../../CommonComponents/BackButton';
import { formatDate, getDateFormat } from "../../CommonComponents/methods";
import { getBrokerageAccount} from '../../../services/investment';
   
let myFormRef = React.createRef();
export default ({ history, match }) => {     
    const [state, setState] = useState({ from: null });
    const dispatch = useDispatch();
    const { investment, loader } = useSelector(state => state); 
    useEffect(() => {
        dispatch(getBrokerageAccount({}));
        if (match.path === '/edit-price' && investment.edit_row_id) {
            dispatch(getPricesData({ date: investment.edit_row_id }));
            setState({ from: new Date(formatDate({ date: investment.edit_row_id }, 'date'))});            
           }
     if (match.path === '/view-price' && investment.edit_row_id) {
            dispatch(getPricesData({ date: investment.edit_row_id }));
            setState({ from: new Date(formatDate({ date: investment.edit_row_id }, 'date'))});            
           }
    }, []);   
   
    /************** Reset form values ************/
    const resetForm = () => {
        ['prices.Brokerage_Account'].map(key =>
           myFormRef.dispatch(actions.change(key, ''))
       );
        setState({
            ...state,
            from: null,
        })
    };
     /************ Handle date change **********/
     const handleDateChange = (date,key) => {
        setState({ ...state, [key]: date });
         };
   /************ Handle date update **********/
    const handleSubmit = (values) => {
        if(values && values.price){
            const payload = Object.values(values.price);                
            dispatch(addUpdatePrice(payload)).then(() => {
                history.push('/price')
            });
        }        
     };
    
    return (
        <Card>
        <CardHeader>
        {match.path === '/view-price' ?
        <BackButton history={history} backUrl='/investments-security' text={"View Price"} /> :
            <BackButton history={history} backUrl='/investments-security' text={match.path === "/edit-price" ? "Edit Price" : "Add Price"} />}
            </CardHeader> 
            <FormGroup row className="col-md-12">
            </FormGroup>
        <LocalForm
        onSubmit={(values) => handleSubmit(values)}
        model="prices"
        className="form-horizontal"
        ref={(el) => myFormRef = el}
         >           
            <FormGroup row className="col-md-12">   
            {match.path === '/view-price' ?
            <Col className="col-md-2"> <NavLink strict to="#" className="btn btn-default"  > VIEW PRICE</NavLink></Col> 
            :
            <Col className="col-md-2"> <NavLink strict to="#" className={match.path === '/add-price' || match.path === '/edit-price'  ? "btn btn-default" : "btn btn-primary"} onClick={()=>history.push('/add-price')}  >{match.path === '/edit-price' ? 'EDIT PRICE' : 'ADD PRICE'}</NavLink></Col>}
            <Col className="col-md-3"> <NavLink strict to="/historical-price" className="btn btn-primary" >TRANSACTION HISTORY</NavLink></Col> 
            </FormGroup>
                <hr />
                {match.path === '/view-price' ? "" :
                <FormGroup row className="col-md-12">
                    <Col className="col-md-2">
                    <Label htmlFor="text-input">Posting Date*:</Label>
                    <br />
                    <Control
                        model=".from"
                        className="form-control"
                            onChange={(date) => {
                                handleDateChange(date, 'from')
                                dispatch(getPricesData({ date:getDateFormat(date)}));
                            }}
                        selected={state.from}
                        component={props => <DatePicker  {...props} />}
                        validators={{ required }}
                        />
                        <Errors
                            model=".from"
                            show={(field) => field.touched && !field.focus}
                            className="error"
                            messages={{
                                required: Message.required
                            }}
                        />
                        </Col>
                        <Col className="col-md-3">
                    <Label htmlFor="text-input">Brokerage Account*:</Label>
                    <Control
                        model=".Brokerage_Account"
                        component={brokerageProps => <Select
                            {...brokerageProps}
                            options={investment.brokerageData.map(row => ({ value: row.Account_ID, label: row.Account_Name }))} />}
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
                    <Col className="col-md-3" style={{marginTop:'15px'}}>
                        { match.path === "/edit-price" ?
                            <>
                            <Button type="submit" size="sm" disabled={loader.isLoading} color="primary" style={{ marginTop: '8px' }}>Update</Button>
                            <Button type="button" size="sm" color="primary" style={{ marginTop: '8px', marginLeft: '10px' }} onClick={() =>history.goBack() }>Close</Button>
                            </>
                            :
                            <>
                            <Button type="submit" size="sm" disabled={loader.isLoading} color="primary" style={{ marginTop: '8px', marginLeft: '10px' }} >Save</Button>
                            <Button type="button" size="sm" color="primary" style={{ marginTop: '8px', marginLeft: '10px' }} onClick={() => resetForm()}>Reset</Button>
                            </>
                        }
                 </Col>
                    
                    </FormGroup>}
                    <FormGroup row className="col-md-12">
                    <Col>
                    {loader.isLoading && <div className="animated fadeIn pt-1 text-center table-loader" />}
                                        <Table bordered striped>
                                            <thead>
                                                <tr>
                                                    <th>Cusip</th>
                                                    <th>Description</th>
                                                    <th>Price</th>
                                                    <th align="center">Source</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                 investment.pricesData.map((row, index) =>
                                                 {
                                                    myFormRef && myFormRef.dispatch(actions.change(`prices.price[${index}].bond_price`, row.Unitprice))
                                                    return <tr>
                                                    <td>
                                                     {row.cusip}
                                                     <Control
                                                           model={`.price[${index}].price_server`}
                                                           component={props => <Input {...props} type="hidden" name="price_server"/>}
                                                           defaultValue={row.cusip} 
                                                        />
                                                        <Control
                                                           model={`.price[${index}].Bond_ID`}
                                                           component={props => <Input {...props} type="hidden" name="Bond_ID"/>}
                                                           defaultValue={row.Bond_ID} 
                                                        />
                                                        <Control
                                                           model={`.price[${index}].date`}
                                                           component={props => <Input {...props} type="hidden" name="date"/>}
                                                           defaultValue={getDateFormat(state.from)}  
                                                        />
                                                    </td>
                                                    <td>
                                                    {row.description}
                                                    </td>
                                                    <td width='200px'>
                                                 {match.path === '/view-price' ? <span>{row.Unitprice}</span>:
                                                        <Control
                                                           model={`.price[${index}].bond_price`}
                                                           component={props => <Input {...props} type="number" id="text-input" name="text-input" placeholder="Price"/>}
                                                        />}
                                                    </td>
                                                    <td align="center">
                                                    {row.Pricesource}
                                                    <Control
                                                           model={`.price[${index}].bond_price_hd`}
                                                           component={props => <Input {...props} type="hidden" name="bond_price_hd"/>}
                                                           defaultValue={row.Unitprice}  
                                                       />
                                                    </td>
                                                 </tr>
                                                 }
                                                        
                                    )}
                            </tbody>     
                                        </Table>

                                    </Col>
                </FormGroup>
            </LocalForm>
            </Card>
    )

}