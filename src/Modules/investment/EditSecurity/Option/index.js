import React,{useEffect} from 'react';
import { FormGroup, Col, Input, Label, Button,CardHeader} from 'reactstrap';
import { Control, Errors,LocalForm, actions } from 'react-redux-form';
import { required } from '../../../../utilities/regex';
import Message from '../../../../utilities/message';
import Select from "react-select";
import { getCategoryData } from '../../../../services/investment';
import { getCountry } from '../../../../services/territory';

let myFormRef = React.createRef();
export default ({ history, match, data={}, type=null, loader, categories, dispatch, countries, editSecurity }) => {
    const date = new Date();
    const courrentYear = date.getFullYear();
    const year = [];
    for (let index = courrentYear-20; index <= courrentYear ; index++){
        year.push(index)
        }
 
    useEffect(() => {
        dispatch(getCountry({}));
    }, []) 
    
    useEffect(() => {
        setData();
    }, [data, countries]) 

    /************ Set data for edit ****/
    const setData = () => {
        const obj = { ...data };
        const category = categories.find(row => row.Bond_Category_ID === data.Bond_Category_ID);
        obj.Bond_Category_ID = {value: data.Bond_Category_ID, label: category ? category.Category_Name : null}
        const country = countries.find(row => row.n_CountryId_PK === data.Country_ID);
        obj.Country_ID = { value: data.Country_ID ? data.Country_ID : '1', label: country ? country.s_CountryName : 'USA' }
        Object.keys(obj).forEach(key => {
            myFormRef.dispatch(actions.change(`security.${key}`, obj[key]));
        });
    }
    /************** Reset form values ************/
    const resetForm = () => {
        ['security.symbol', 'security.Security_type','security.stock_Symbol', 'security.Bond_Category_ID','security.Exp_Month', 'security.Exp_Year','security.Strike_Int', 'security.Strike_Fraction','security.Description', 'security.Country_ID'].map(key =>
            myFormRef.dispatch(actions.change(key, ''))
        );
    };
    const handleSubmit = (values) => {
        let payload =  {
            "Security_type": values.Security_type,
            "symbol": values.symbol,
            "Strike_Int":values.Strike_Int,
            "Description": values.Description,
            "Bond_Category_ID": typeof values.Bond_Category_ID === "object" ? values.Bond_Category_ID.value : values.Bond_Category_ID,
            "Exp_Month": values.Exp_Month,
            "Exp_Year": values.Exp_Year,
            "Strike_Fraction": values.Strike_Fraction,
            "Country_ID": typeof values.Country_ID === "object" ? values.Country_ID.value : values.Country_ID,
         /*******extra field ******/
            "stock_Symbol":values.stock_Symbol,
            "Cusip":""
        }
        if(match.path === "/edit-security"){
            payload = {
                "Bond_ID": values.Bond_ID,
                ...payload
            }
        }
        dispatch(editSecurity(payload)).then(() => history.push('/investments-security'))
    
    }
    const button = match.path === "/edit-security" ? 'UPDATE' : 'SAVE';
    return (
        <LocalForm
        onSubmit={(values) => handleSubmit(values)}
        model="security"
        className="form-horizontal"
        ref={(el) => myFormRef = el}
        >
            <FormGroup row className="col-md-12">
                <Col className="col-md-2">
                    <Label htmlFor="text-input">Option Symbol *:</Label>
                    <Control
                        model=".symbol"
                        component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="Option Symbol" />}
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
                <Col className="col-md-2">
                    <Label htmlFor="text-input">Type*:</Label>
                    <Control
                        model=".Security_type"
                        component={props => <Input {...props} type="select" name="Type" id="select">
                            <option value="" key="empty">Select Type</option>
                            <option value="call" key="call">Call</option>
                            <option value="put" key="put">Put</option>
                           </Input>}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Security_type"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-1.5">
                    <Label htmlFor="text-input">Stock Symbol*:</Label>
                    <Control
                        model=".stock_Symbol"
                        component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="Symbol" />}
                        validators={{ required }}
                    />
                    <Errors
                        model=".stock_Symbol"
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
                    <Button type="submit" size="md" color="primary" disabled={loader.isLoading} style={{ marginRight: '30px' }}> {loader.isLoading ? 'Processing...' : button}</Button>
                    {match.path === "/edit-security" ? 
                    <Button type="reset" size="md" color="danger" onClick={() => history.push('/investments-security')}> CANCEL</Button>
                    :
                    <Button type="reset" size="md" color="danger" onClick={() => resetForm()}> RESET</Button>
                    }   
                </Col>
            </FormGroup>
            <FormGroup row className="col-md-12">
                <Col className="col-md-1">
                    <Label htmlFor="text-input">Month*:</Label>
                    <Control
                        model=".Exp_Month"
                        component={props => <Input {...props} type="select" name="Month" id="select">
                            <option value="" key="empty">{data.Exp_Month ? data.Exp_Month : "Month"}</option>
                            {[1,2,3,4,5,6,7,8,9,10,11,12].map((val) =>
                            <option value={val} key={val}>{val}</option>
                            )}
                        </Input>}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Exp_Month"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-1">
                    <Label htmlFor="text-input">Year*:</Label>
                    <Control
                        model=".Exp_Year"
                        component={props => <Input {...props} type="select" name="year" id="select">
                        <option value="" key="empty">{data.Exp_Year ? data.Exp_Year : "Year"}</option>
                        {
                        year.map((key)=> <option value={key} >{key}</option>)
                         } 
                      </Input>}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Exp_Year"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-1">
                    <Label htmlFor="text-input">Strike*:</Label>
                    <Control
                        model=".Strike_Int"
                        component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="Strike" />}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Strike_Int"
                        show={(field) => field.touched && !field.focus}
                        className="error"
                        messages={{
                            required: Message.required
                        }}
                    />
                </Col>
                <Col className="col-md-2">
                    <Label htmlFor="text-input">Strike Fraction.*:</Label>
                    <Control
                        model=".Strike_Fraction"
                        component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="Strike Fraction" />}
                        validators={{ required }}
                    />
                    <Errors
                        model=".Strike_Fraction"
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