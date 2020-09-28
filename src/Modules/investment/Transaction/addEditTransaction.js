import React, { useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom'
import { FormGroup, Card, CardHeader } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { TRANSACTION,STYLE } from '../../../utilities/constants';
import BackButton from '../../CommonComponents/BackButton';
import BuySell from './BuySell';
import InterestPaydown from './InterestPaydown';
import Dividend from './Dividend';
import SymbolChange from './SymbolChange';
import StockSplit from './StockSplit';
import BatchTransaction from './BatchTransaction';
import TransactionHistory from './TransactionHistory';
import { getBrokerageAccount,getBrokers, getInvestment} from '../../../services/investment';
import { getCountry } from '../../../services/territory';


export default (props) => {
          const [type, setType] = useState(TRANSACTION.buy);
          const dispatch = useDispatch();
          const { investment, territory , loader} = useSelector(state => state);
          const { edit_row_id, transactionData,brokerageData ,brokers } = investment;
          const data = transactionData.find(row => row.ID === edit_row_id);  
          const { countries } = territory;
      useEffect(() => { 
      dispatch(getInvestment({}));
      dispatch(getCountry({}));
      dispatch(getBrokerageAccount({}));
      dispatch(getBrokers({}));
       if (!edit_row_id && props.match.path === "/edit-transaction") {
          return props.history.push('/transaction');
    } 
        if (data)
    {
       setType(data.Action);
      }
    },[]);
    /*********** Get from by type selection **************/
              const getForm = () => {
             switch (type) {
               case TRANSACTION.buy:
               case  TRANSACTION.sell:  
                   return <BuySell   
                     {...props}      
                      data={data}
                      loader={loader}
                      dispatch={dispatch}
                      list={investment.list}
                      brokerageData={brokerageData}
                      brokers={brokers}
                      countries={countries}
                      type={type}
                  />
                  case TRANSACTION.interest:
                  case  TRANSACTION.paydown:
                    return <InterestPaydown   
                       {...props}                 
                       loader={loader}
                       list={investment.list}
                       data={data}
                       dispatch={dispatch}
                       brokerageData={brokerageData}
                       type={type}
                  />
                  case TRANSACTION.dividend:
                    return <Dividend   
                       {...props}   
                      data={data}              
                      loader={loader}
                      dispatch={dispatch}
                      list={investment.list}
                      brokerageData={brokerageData}
                      type={type}
                  />
                  case TRANSACTION.symbolChange:
                    return <SymbolChange   
                       {...props} 
                      loader={loader}
                      data={investment.transactionData}
                      list={investment.list}   
                      dispatch={dispatch}
                     //   countries={countries}
                       type={type}
                     />
                     case TRANSACTION.stockSplit:
                        return <StockSplit   
                           {...props} 
                            loader={loader}
                            data={investment.transactionData}
                            list={investment.list}    
                            dispatch={dispatch}
                           type={type}
                  />
                  case TRANSACTION.batchTransaction:
                    return <BatchTransaction   
                       {...props}
                      brokerageData={brokerageData}
                      loader={loader}
                      dispatch={dispatch}
                      type={type}
                  />
                  case TRANSACTION.transactionHistory:
                    return <TransactionHistory   
                       {...props}                 
                       loader={loader}
                       type={type}
                       list={investment.list}
                       brokerageData={brokerageData}
                     />
              }
              }

    return (
        <div className="animated">   
        <Card>     
           <CardHeader>
                <BackButton history={props.history} backUrl="/transaction" text={props.match.path === "/add-transaction" ? "Add Transaction" : "Edit Transaction"} />
            </CardHeader>  <br/>
                <FormGroup >
                    {(type === TRANSACTION.buy || type === TRANSACTION.sell || props.match.path === "/add-transaction") &&  <NavLink strict to="#" className={`btn btn-${type === TRANSACTION.buy ? 'default' : 'primary'}`}  style={{ marginRight: STYLE.marginRight10 }} onClick={() => setType(TRANSACTION.buy)} >BUY/SELL</NavLink> }
                    {(type === TRANSACTION.interest || type === TRANSACTION.paydown || props.match.path === "/add-transaction") && <NavLink strict to="#" className={`btn btn-${type === TRANSACTION.interest ? 'default' : 'primary'}`} style={{ marginRight:STYLE.marginRight10  }} onClick={() => setType(TRANSACTION.interest)}>INTEREST/PAYDOWN</NavLink> }
                    {(type === TRANSACTION.dividend || props.match.path === "/add-transaction") &&  <NavLink strict to="#" className={`btn btn-${type === TRANSACTION.dividend ? 'default' : 'primary'}`} style={{ marginRight: STYLE.marginRight10 }} onClick={() => setType(TRANSACTION.dividend)}>DIVIDEND</NavLink> }   
                    {(type === TRANSACTION.symbolChange || props.match.path === "/add-transaction") && <NavLink strict to="#" className={`btn btn-${type === TRANSACTION.symbolChange ? 'default' : 'primary'}`} style={{ marginRight: STYLE.marginRight10 }}  onClick={() => setType(TRANSACTION.symbolChange)}>SYMBOL CHANGE</NavLink> }   
                    {(type === TRANSACTION.stockSplit || props.match.path === "/add-transaction") &&  <NavLink strict to="#" className={`btn btn-${type === TRANSACTION.stockSplit ? 'default' : 'primary'}`} style={{ marginRight: STYLE.marginRight10 }} onClick={() => setType(TRANSACTION.stockSplit)}>STOCK SPLIT</NavLink> }
                    {(type === TRANSACTION.batchTransaction || props.match.path === "/add-transaction") &&  <NavLink strict to="#" className={`btn btn-${type === TRANSACTION.batchTransaction ? 'default' : 'primary'}`} style={{ marginRight: STYLE.marginRight10 }} onClick={() => setType(TRANSACTION.batchTransaction)}>BATCH TRANSACTION</NavLink> }
                    {(type === TRANSACTION.transactionHistory || props.match.path === "/add-transaction") &&  <NavLink strict to="#" className={`btn btn-${type === TRANSACTION.transactionHistory ? 'default' : 'primary'}`}  onClick={() => setType(TRANSACTION.transactionHistory)}>TRANSACTION HISTORY</NavLink> }
                </FormGroup>
                    <hr />
                     {getForm()}
                </Card>
        </div >
    )
}