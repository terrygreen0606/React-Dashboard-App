import React, { useState, useEffect }from 'react';
import { FormGroup, Card, Col, Input, Label, Button, CardHeader} from 'reactstrap';
import { Control, Errors, LocalForm, actions } from 'react-redux-form';
import { required } from '../../../utilities/regex';
import Message from '../../../utilities/message';
import { useDispatch, useSelector } from 'react-redux';
import { addUpdateBroker } from '../../../services/investment';
import BackButton from '../../CommonComponents/BackButton';

let myFormRef = React.createRef();
export default ({ history, match }) => {    
    const dispatch = useDispatch();
    const [btnType, setBtnType] = useState('');
    const { investment, loader } = useSelector(state => state);
    const data = investment.brokers.find(row => row.Broker_ID.toString() === investment.edit_row_id.toString()) || {};
      
    useEffect(() => {
        if(!btnType){
            setData();
        }       
    }, [data]) 
     /************ Set data for edit ****/
    const setData = () => {        
        Object.keys(data).forEach(key => {
            myFormRef.dispatch(actions.change(`broker.${key}`, data[key]));
        });
    }
    /************** Reset form values ************/
    const resetForm = () => {
       ['broker.Broker_Company', 'broker.Broker_Name','broker.Broker_Email', 'broker.Broker_Phone','broker.Broker_Address','broker.Broker_City','broker.Broker_State','broker.Broker_Zip'].map(key =>
           myFormRef.dispatch(actions.change(key, ''))
       );
    };
       /************* Handle submit  *******/
       const handleSubmit = (values) => {
           let payload = {
            ...values
        };
        if(match.path === "/edit-broker"){
            payload = {
                "Broker_ID": data.Broker_ID,
                ...payload
            }
        }
        dispatch(addUpdateBroker(payload)).then(() => {
          if(btnType === 'new') {
            resetForm();
            setBtnType('')
          } else {
            history.push('/brokers')
          }          
        });
    };

      /************ Phone number formatting *********/
  const formatPhoneText = (value) => {
    value = value.trim().replace(/-/g, "");
    if(isNaN(value)) 
    {
      value = value.slice(0, value.length-1)  
    }
    if (value.length > 3 && value.length <= 6)
      value = value.slice(0, 3) + "-" + value.slice(3);
    else if (value.length > 6)
      value = value.slice(0, 3) + "-" + value.slice(3, 6) + "-" + value.slice(6);
    if (value.length > 12)
      value = value.slice(0, 12);
    myFormRef.dispatch(actions.change(`broker.Broker_Phone`, value));
     
  }
    return (
        <Card>
            <CardHeader>
                <BackButton history={history} text={match.path === "/add-broker" ? "Add New Broker" : "Edit Broker"} />
            </CardHeader>        
        <LocalForm
        onSubmit={(values) => handleSubmit(values)}
        model="broker"
        className="form-horizontal"
        ref={(el) => myFormRef = el}
        > 
             <br/>
            <FormGroup row className="col-md-12">
                <Col className="col-md-3">
                    <Label htmlFor="text-input">Company*:</Label>
                    <Control
                        model=".Broker_Company"
                        component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="Company" />}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Broker_Company"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-2">
                    <Label htmlFor="text-input">Broker Name*:</Label>
                    <Control
                        model=".Broker_Name"
                        component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="Broker Name" />}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Broker_Name"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-7" style={{paddingLeft:'170px'}}>
                    {match.path === '/edit-broker' ? 
                        <>
                        <Button type="submitt" className="col-md-1.7" size="md" color="primary" style={{ marginRight: '20px' }} disabled={loader.isLoading}> {loader.isLoading ? 'UPDATING...' : 'UPDATE'}</Button>{""}
                        <Button type="button" className="col-md-1.7" size="md" color="primary" style={{ marginRight: '20px' }} onClick={()=>history.goBack()}>  CLOSE</Button>{""}
                       </>
                        :
                        <><Button type="submitt" className="col-md-1.7" size="md" color="primary" style={{ marginRight: '20px' }} onClick={() => setBtnType('new')} disabled={loader.isLoading}>  {loader.isLoading ? 'SAVING...' : 'SAVE & NEW'}</Button>{""}
                        <Button type="submitt" className="col-md-1.7"size="md" color="primary" style={{ marginRight: '20px' }} disabled={loader.isLoading}> {loader.isLoading ? 'SAVING...' : 'SAVE & CLOSE'}</Button>{""}
                        <Button type="reset" className="col-md-1.7" size="md" color="primary" style={{ marginRight: '20px' }} onClick={() => resetForm()}> RESET</Button> </>
                }
                
                </Col>
            </FormGroup>
            <FormGroup row className="col-md-12">
                <Col className="col-md-3">
                    <Label htmlFor="text-input">Broker Email*:</Label>
                    <Control
                        model=".Broker_Email"
                        component={props => <Input {...props} type="email" name="BrokerEmail" placeholder="Broker Email"/>}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Broker_Email"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-3">
                    <Label htmlFor="text-input">Phone No*:</Label>
                    <Control
                        model=".Broker_Phone"
                        onKeyUp={(e) => formatPhoneText(e.target.value)}
                        component={props => <Input {...props} type="text" name="Broker_Phone" placeholder="XXX-XXX-XXXX" />}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Broker_Phone"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
            </FormGroup>
            <CardHeader>
                <i className="icon-minus"></i>Additional Information
                    </CardHeader>
            <FormGroup row className="col-md-12">
                <Col className="col-md-4">
                    <Label htmlFor="text-input">Address:</Label>
                    <Control
                        model=".Broker_Address"
                        component={props => <><Input {...props} type="text" id="text-input" name="text-input" placeholder="Address" /> </>}
                    />
                </Col>
                <Col className="col-md-2">
                    <Label htmlFor="text-input">City:</Label>
                    <Control
                        model=".Broker_City"
                        component={props => <><Input {...props} type="text" id="text-input" name="text-input" placeholder="City" /> </>}
                    />
                </Col>
                <Col className="col-md-2">
                    <Label htmlFor="text-input">State*:</Label>
                    <Control
                        model=".Broker_State"
                        component={props => <Input {...props} type="text" name="State" id="state" placeholder="State">
                        </Input>}
                    />
                </Col>
                <Col className="col-md-2">
                    <Label htmlFor="text-input">Zip:</Label>
                    <Control
                        model=".Broker_Zip"
                        component={props => <><Input {...props} type="text" id="text-input" name="text-input" placeholder="Zip Code" /> </>}
                     />
                </Col>
            </FormGroup>
        </LocalForm>
        </Card>
    )
}