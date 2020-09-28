import React, { useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom'
import { FormGroup, Card, CardHeader } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import Bond from './Bond';
import CommonStock from './CommonStock';
import Option from './Option';
import ShortTermSecurity from './ShortTermSecurity';
import Currency from './Currency';
import { SECURITY,STYLE } from '../../../utilities/constants';
import { getSecurityData, getCategoryData, editSecurity } from '../../../services/investment';
import BackButton from '../../CommonComponents/BackButton';

export default (props) => {
    const [type, setType] = useState(SECURITY.bond);
    const dispatch = useDispatch();
    const { investment, loader , territory } = useSelector(state => state);
    const { edit_row_id, list, categories, subcategories } = investment;
    const { countries } = territory;
    useEffect(() => {        
        if (!edit_row_id && props.match.path === "/edit-security") {
            return props.history.push('/investments-security');
        }
        const data = list.find(row => row.Bond_ID === edit_row_id); 
        if(data){
            dispatch(getSecurityData({ type: data.Security_type, Bond_ID: edit_row_id }));
            setType(data.Security_type);
        }   
        dispatch(getCategoryData({}));         
    },[]);
    /*********** Get from by type selection **************/
    const getForm = () => {
        // eslint-disable-next-line default-case
        switch (type) {
            case SECURITY.bond:
                return <Bond   
                    {...props}                 
                    data={investment.securityData}
                    loader={loader}
                    dispatch={dispatch}
                    categories={categories}
                    subcategories={subcategories}
                    countries={countries}
                    type={type}
                    editSecurity={editSecurity}
                    getCategoryData={getCategoryData}
                />;
            case SECURITY.commonStock:
                return <CommonStock
                   {...props}
                    data={investment.securityData}
                    loader={loader}
                    dispatch={dispatch}
                    categories={categories}
                    subcategories={subcategories}
                    countries={countries}
                    type={type}
                    editSecurity={editSecurity}
                />
            case SECURITY.option:
                return <Option
                {...props}
                data={investment.securityData}
                loader={loader}
                dispatch={dispatch}
                categories={categories}
                countries={countries}
                type={type}
                editSecurity={editSecurity}
                />
                case SECURITY.shortTermSecurity:
                    return <ShortTermSecurity
                    {...props}
                    data={investment.securityData}
                    loader={loader}
                    dispatch={dispatch}
                    categories={categories}
                    countries={countries}
                    type={type}
                    editSecurity={editSecurity}
                />
                case SECURITY.currency:
                    return <Currency
                    {...props}
                    data={investment.securityData}
                    loader={loader}
                    dispatch={dispatch}
                    categories={categories}
                    countries={countries}
                    type={type}
                    editSecurity={editSecurity}
                    />
        }
    }

    return (
        <div className="animated">   
        <Card>     
           <CardHeader>
                <BackButton history={props.history} backUrl='/investments-security' text={props.match.path === "/add-security" ? "Add Security" : "Edit Security"} />
            </CardHeader>  <br/>
                <FormGroup row className="col-md-12">
                    {(type === SECURITY.bond || props.match.path === "/add-security") &&  <NavLink strict to="#" className={`btn btn-${type === SECURITY.bond ? 'default' : 'primary'}`}  style={{ marginRight: STYLE.marginRight25 }} onClick={() => setType(SECURITY.bond)} >BOND</NavLink> }
                    {(type === SECURITY.commonStock || props.match.path === "/add-security") && <NavLink strict to="#" className={`btn btn-${type === SECURITY.commonStock ? 'default' : 'primary'}`} style={{ marginRight: STYLE.marginRight25 }} onClick={() => setType(SECURITY.commonStock)}>COMMON STOCK</NavLink> }
                    {(type === SECURITY.option || props.match.path === "/add-security") &&  <NavLink strict to="#" className={`btn btn-${type === SECURITY.option ? 'default' : 'primary'}`} style={{ marginRight: STYLE.marginRight25 }} onClick={() => setType(SECURITY.option)}>OPTION</NavLink> }   
                    {(type === SECURITY.opshortTermSecuritytion || props.match.path === "/add-security") && <NavLink strict to="#" className={`btn btn-${type === SECURITY.shortTermSecurity ? 'default' : 'primary'}`} style={{ marginRight: STYLE.marginRight25 }}  onClick={() => setType(SECURITY.shortTermSecurity)}>SHORT TERM SECURITY</NavLink> }   
                    {(type === SECURITY.currency || props.match.path === "/add-security") &&  <NavLink strict to="#" className={`btn btn-${type === SECURITY.currency ? 'default' : 'primary'}`} style={{ marginRight: STYLE.marginRight25 }} onClick={() => setType(SECURITY.currency)}>CURRENCY</NavLink> }
                    </FormGroup>
                    <hr />
                     {getForm()}
                </Card>
        </div >
    )
}