import React, { useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom'
import { FormGroup, Card, CardHeader } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import Amortization from './Amortization';
import EarnedIntrest from './EarnedIntrest';
import HistoricalPosting from './HistoricalPosting';
import { MONTHLY_POSTING ,STYLE } from '../../../utilities/constants';
import BackButton from '../../CommonComponents/BackButton';
import { getMonthlyPosting } from '../../../store/actions/investment';


export default (props) => {
    const dispatch = useDispatch();
    const { investment} = useSelector(state => state); 
    const [type, setType] = useState(MONTHLY_POSTING.historicalPosting);
        useEffect(() => {  
            if (props.match.path === '/edit-posting' && investment.edit_row_id) {
                dispatch(getMonthlyPosting({ date: investment.edit_row_id }));
                }
                const data = investment.historicalPosting.find(row => row.Settle_Date === investment.edit_row_id); 
               if(data)
                {
                 setType(data.posting);
                } 
               },[]);
    /*********** Get from by type selection **************/
    const getForm = () => {
        // eslint-disable-next-line default-case
        switch (type) {
            case MONTHLY_POSTING.amortization:
                return <Amortization   
                    {...props} 
                    data={investment.historicalPosting}
                    type={type}
                />
            case MONTHLY_POSTING.earnedInterest:
                return <EarnedIntrest
                       {...props}
                       data={investment.historicalPosting}
                       type={type}
                       />
            case MONTHLY_POSTING.historicalPosting:
                return <HistoricalPosting
                data={investment.historicalPosting}
                {...props}
                type={type}
                setType={setType}
                />
                
        }
    }

    return (
        <div className="animated">   
        <Card>     
           <CardHeader>
                <BackButton history={props.history} backUrl='/investments-security' text={"Monthly Posting"} />
            </CardHeader>  <br/>
                <FormGroup row className="col-md-12">
                    <NavLink strict to="#" className={`btn btn-${type === MONTHLY_POSTING.amortization ? 'default' : 'primary'}`}  style={{ marginRight: STYLE.marginRight25 }} onClick={() => setType(MONTHLY_POSTING.amortization)} >AMORTIZATION </NavLink> 
                    <NavLink strict to="#" className={`btn btn-${type === MONTHLY_POSTING.earnedInterest? 'default' : 'primary'}`} style={{ marginRight: STYLE.marginRight25 }} onClick={() => setType(MONTHLY_POSTING.earnedInterest)}>EARNED INTEREST </NavLink> 
                    <NavLink strict to="#" className={`btn btn-${type === MONTHLY_POSTING.historicalPosting ? 'default' : 'primary'}`} style={{ marginRight: STYLE.marginRight25 }} onClick={() => setType(MONTHLY_POSTING.historicalPosting)}>HISTORICAL POSTING</NavLink>    
                    </FormGroup>
                 {getForm()}
                </Card>
        </div > 
    )
}