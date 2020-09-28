import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
import { Table, FormGroup, Button, Col, Input, Label, Card, CardBody } from 'reactstrap';
import { Control, LocalForm, actions } from 'react-redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Services from '../../../../services/investment';
import { editRow } from '../../../../store/actions/common';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { formatDate, getDateFormat } from "../../../CommonComponents/methods";
import {STYLE} from '../../../../utilities/constants';

let myFormRef = React.createRef();
const List = props => {
    const dateObj = props.edit_row_id ? new Date(formatDate({Settle_Date: props.edit_row_id}, 'Settle_Date')) : '';
    //const currentDate = dateObj.getDay()+'-'+(dateObj.getMonth()+1)+'-'+dateObj.getFullYear();
    const [state, setState] = useState({ btnType: '' }); 
    const [page, setPage] = useState(1);
    const [date, setDate] = useState(dateObj);
    const [sort, setSort] = useState({ sortName: undefined, sortOrder: undefined });
    useEffect(() => {
        if(props.edit_row_id){
            props.getList({date: props.edit_row_id, page});
        }
   }, []);
    /************* Handle page change **************/
    const handlePageChange = (pageNumber) => {
        props.getList({
            date:getDateFormat(date), page: pageNumber, sortTo: sort.sortName,
            sortBy: sort.sortOrder
        });
        setPage(page);
    }
      /**************Search according date***************/
    const handleSearch = (Date) => {
         if (Date) {
             setDate(Date) 
            props.getList({ date:getDateFormat(Date) , page:1  });
            setPage(1);
            setSort({ sortName: undefined, sortOrder: undefined });
       }
    }

    /*********** Sorting Function ************/
    const sortMethod = (sortTo, sortBy) => {
        const pageNumber = page ? 1 : undefined;
        setSort({ sortName: sortTo, sortOrder: sortBy })
        props.getList({ page: pageNumber, sortTo, sortBy });
        setPage(pageNumber);
    }
    /******************* Get all list  *************/
    const getAllList = () => {
        props.getList({date:"",page:''});
        setPage(undefined);
    };

/******************* Handle Submit  *************/
    const handleSubmit = values => {
        if(values && values.posting_data){
            const posting_data = Object.values(values.posting_data);                
            props.addUpdatePosting('addUpdateInterestPosting', {toDate: getDateFormat(date), posting_data}).then(() => {
                //history.push('/price')
            });
        }
    };
    return (
        <div className="animated">
            <Card>
                <CardBody>
                <LocalForm
                    onSubmit={(values) => handleSubmit(values)}
                    model="posting"
                    className="form-horizontal"
                    ref={(el) => myFormRef = el}
                > 
                <FormGroup row>
                     <Col className="col-md-4" style={{marginTop:'15px'}}>
                      <Control
                        model=""
                        className="form-control"
                        onChange={(edate) => handleSearch(edate)}
                        selected={date}
                        component={dateProps => <DatePicker  {...dateProps} placeholderText="Date"/>}
                     />
                      </Col>
                      <Col className="col-md-4" style={{marginTop:'15px'}}>
                          </Col>
                     <Col className="col-md-4" >
                            <Button type="submit" size="sm" color="primary" style={{ marginRight: STYLE.marginRight25 }} onClick={() => setState({...state, btnType: 'new'})}>POST & NEW</Button>
                            {/* <Button type="submit" size="sm" color="primary"  style={{ marginRight: STYLE.marginRight25 }} >POST & CLOSE</Button> */}
                            <Button type="button" size="sm" color="primary" onClick={()=>props.history.push('/investments-security')}>Close</Button>
                            </Col>
                    </FormGroup>
                  
                    {props.isLoading && <div className="animated fadeIn pt-1 text-center table-loader" />}
                    {
                        props.monthlyPosting != "" ? 
                        <>
                          <FormGroup check row>
                        <Col md="12">
                            <Label check></Label>
                            <NavLink strict to="#" className="view-all" onClick={() => getAllList()}> View All </NavLink>
                        </Col>
                    </FormGroup>
                    <Table bordered striped>
                                            <thead>
                                                <tr>
                                                    <th>Cusip</th>
                                                    <th>Description</th>
                                                    <th>Lot</th>
                                                    <th>Brokerage Account</th>
                                                    <th>Accrual method</th>
                                                    <th>Earned Interest</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                 props.earnedPosting.map((row, index) =>
                                                 {
                                                    myFormRef && myFormRef.dispatch(actions.change(`posting.posting_data[${index}].value`, row.Interest_value))
                                                    return <tr>
                                                    <td>
                                                     {row.Cusip}
                                                    </td>
                                                    <td>
                                                    {row.description || ""}
                                                    </td>
                                                    <td>
                                                    {row.Lot}
                                                    </td>
                                                    <td>
                                                    {row.Account_Name}
                                                    </td>
                                                    <td>
                                                    {row.Amorization_method}
                                                    </td>
                                                    <td>
                                                    <Control
                                                        model={`.posting_data[${index}].value`}
                                                        component={valueProps => <Input {...valueProps} type="text" name="Interest_value"/>}
                                                    />
                                                    <Control
                                                        model={`.posting_data[${index}].Brokerage_Account_ID`}
                                                        component={brokerageProps => <Input {...brokerageProps} type="hidden" name="Brokerage_Account_ID"/>}
                                                        defaultValue={row.Account_ID} 
                                                    />
                                                    <Control
                                                        model={`.posting_data[${index}].Security_ID`}
                                                        component={securityProps => <Input {...securityProps} type="hidden" name="Security_ID"/>}
                                                        defaultValue={row.SecurityID} 
                                                    />
                                                    <Control
                                                        model={`.posting_data[${index}].Lot`}
                                                        component={lotProps => <Input {...lotProps} type="hidden" name="Lot"/>}
                                                        defaultValue={row.Lot} 
                                                    />
                                                    <Control
                                                        model={`.posting_data[${index}].transaction_id`}
                                                        component={transactionProps => <Input {...transactionProps} type="hidden" name="transaction_id"/>}
                                                        defaultValue={row.Transaction_ID} 
                                                    />
                                                    </td>
                                                 </tr>
                                                }
                                                        
                                    )}
                                    </tbody>     
                            </Table>
                        </>
                    :""}
                </LocalForm>
                </CardBody>
            </Card>
        </div >
    );
};

List.propTypes = {
    getList: PropTypes.func.isRequired,
    earnedPosting: PropTypes.array.isRequired,
    total_rows: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    editRow: PropTypes.func.isRequired,
    edit_row_id: PropTypes.string.isRequired
  };

const mapStateToProps = state => ({
    earnedPosting: state.investment.earnedPosting,
    total_rows: state.investment.total_rows,
    size: state.investment.size,
    isLoading: state.loader.isLoading,
    edit_row_id: state.investment.edit_row_id
});

const mapDispatchToProps = dispatch => ({
    getList: bindActionCreators(Services.getEarnedPostingData, dispatch),
    editRow: bindActionCreators(editRow, dispatch),
    addUpdatePosting: bindActionCreators(Services.addUpdatePosting, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(List);
