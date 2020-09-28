import React, {useEffect} from 'react';
import { FormGroup, Col, Input, Label, Button,CardHeader } from 'reactstrap';
import { Control, Errors, LocalForm, actions } from 'react-redux-form';
import Select from "react-select";
import { required } from '../../../../utilities/regex';
import Message from '../../../../utilities/message';
import { getCountry } from '../../../../services/territory';

export default ({ history, match, data={}, type=null, loader, categories, dispatch, countries ,editSecurity }) => {
    let myFormRef = React.createRef();
    useEffect(() => {
        dispatch(getCountry({}));
    }, []);  
    useEffect(() => {
        setData();
    }, [data, countries]); 
     /************ Set data for edit ****/
     const setData = () => {
        const obj = { ...data };
        const category = categories.find(row => row.Bond_Category_ID === data.Bond_Category_ID);
        const country = countries.find(row => row.n_CountryId_PK === data.Country_ID);
        obj.Bond_Category_ID = { value: data.Bond_Category_ID, label: category ? category.Category_Name : null }
        obj.Country_ID = { value: data.Country_ID ? data.Country_ID : '1', label: country ? country.s_CountryName : 'USA' }
        Object.keys(obj).forEach(key => {
            myFormRef.dispatch(actions.change(`security.${key}`, obj[key]));
        });
    }
     /************** Reset form values ************/
     const resetForm = () => {
        ['security.symbol', 'security.Bond_Category_ID', 'security.Description', 'security.Country_ID'].map(key =>
            myFormRef.dispatch(actions.change(key, ''))
         );
        };

     /************* Handle submit  *******/
    const handleSubmit = (values) => {
        let payload =   {
        "Security_type": type,
        "Cusip": values.symbol,
        "Description": values.Description,
        "Bond_Category_ID": typeof values.Bond_Category_ID === "object" ? values.Bond_Category_ID.value : values.Bond_Category_ID,
        "Country_ID": typeof values.Country_ID === "object" ? values.Country_ID.value : values.Country_ID,
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
                    <Label htmlFor="text-input">Symbol *:</Label>
                    <Control
                        model=".symbol"
                        component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="Symbol" />}
                        validators={{ required }}
                    />
                    <Errors
                        model=".symbol"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-3">
                    <Label htmlFor="text-input">Category*:</Label>
                    <Control
                         model=".Bond_Category_ID"
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
                <Col className="col-md-2">
                    </Col>
                <Col className="col-md-4">
                    <Button type="submit" disabled={loader.isLoading} size="md" color="primary" style={{ marginRight: '30px' }}> {loader.isLoading ? 'processing...' : button}</Button>
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
                        component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="Description" />}
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
            </FormGroup>
            <CardHeader>
                <i className="icon-minus"></i>Other Information
                    </CardHeader>
            <FormGroup row className="col-md-12">
                <Col className="col-md-4">
                    <Label htmlFor="text-input">Country*:</Label>
                    <Control
                        model=".Country_ID"
                        //onChange={(e) => handleAccountChange(e)}
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