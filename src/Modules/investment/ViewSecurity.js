import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
  FormGroup,
  Col,
  Card,
  CardHeader,
  CardBody,
  Input,
  Label,
} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Services from "../../services/investment";
import { STYLE, VIEW_SECURITY } from '../../utilities/constants';
import BackButton from "../CommonComponents/BackButton";
import { getNumberFormat } from "../CommonComponents/methods";
import Ledger from './ViewSecurity/Ledger';
import Amortization from './ViewSecurity/Amortization';
import Income from './ViewSecurity/Income';
import ProfitLoss from './ViewSecurity/ProfitLoss';
import RealizedGainLoss from './ViewSecurity/RealizedGainLoss';
// import UnrealizedGainLoss from "./ViewSecurity/UnrealizedGainLoss";
// import Projections from "./ViewSecurity/Projections";

const List = (props) => {
  const [type, setType] = useState(VIEW_SECURITY.ledger);
  const [lot, setLot] = useState('all')
  const [viewAll, setViewAll] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [sort, setSort] = useState({
    sortName: undefined,
    sortOrder: undefined,
  });
   useEffect(() => {
    if (!props.edit_row_id) {
      return props.history.push('/investments-security');
    }
    if(lot === 'all'){
    props.getList(type, { Bond_ID: props.edit_row_id });}
    else{
      props.getList(type, { Bond_ID: props.edit_row_id, lot:lot });
    }
    setViewAll(false);
  }, [type,lot]);

  /*********** Sorting Function ************/
  const sortMethod = (sortTo, sortBy) => {
    const pageNumber = page ? 1 : undefined;
    setSort({ sortName: sortTo, sortOrder: sortBy });
    props.getList(type, {
      page: pageNumber,
      Bond_ID: props.edit_row_id,
      sortTo,
      sortBy,
    });
    setPage(pageNumber);
  };
  // Customization Function
  const rowClassNameFormat = (row, rowIdx) => {
    return {
      backgroundColor: rowIdx % 2 === 0 ? "#A2EFE8" : "#DCEFF1",
      color: "#000000",
    };
  };

  /******************* Get all list  *************/
  const getAllList = () => {
    setViewAll(true);
    props.getList(type,{Bond_ID: props.edit_row_id });
    setPage(undefined);
};


  
  const { viewList, isLoading, list, edit_row_id } = props;
  const options = {
    sortIndicator: true,
    page,
    onPageChange: (page) => setPage(page),
    hideSizePerPage: true,
    paginationSize: 10,
    hidePageListOnlyOnePage: true,
    clearSearch: true,
    alwaysShowAllBtns: false,
    withFirstAndLast: false,
    sizePerPage: pageSize,
    onSortChange: sortMethod,
    sortName: sort.sortName,
    sortOrder: sort.sortOrder,
    pageStartIndex: 1,
  };    
    let listData = list.find((row) => row.Bond_ID === edit_row_id);
    listData = listData ? listData : {};
    const viewData = viewList ? viewList.find(row => row) : [];
    /******Get Forms******/
    const getForm = () =>
  {
    switch (type) {
      case VIEW_SECURITY.ledger:
          return <Ledger   
              {...props}  
              data={viewList} 
              options={options}
              pageSize={pageSize}    
              type={type}  
              getAllList={getAllList}
              viewAll={viewAll}
              rowClassNameFormat={rowClassNameFormat}       
              />;
    case VIEW_SECURITY.amortization:
           return <Amortization   
              {...props}  
              data={viewList} 
              options={options}  
              page={page}  
              type={type}  
              getAllList={getAllList}
              viewAll={viewAll}
              rowClassNameFormat={rowClassNameFormat}        
             />;
    case VIEW_SECURITY.income:
           return <Income   
              {...props}  
              data={viewList} 
              options={options}    
              type={type}  
              getAllList={getAllList}
              rowClassNameFormat={rowClassNameFormat}        
             />;
    case VIEW_SECURITY.profitLoss:
           return <ProfitLoss   
              {...props}  
              data={viewList} 
              options={options}    
              type={type}  
              getAllList={getAllList}
              rowClassNameFormat={rowClassNameFormat}           
             />;
    case VIEW_SECURITY.realized:
           return <RealizedGainLoss   
              {...props}  
              data={viewList} 
              options={options}    
              type={type}  
              getAllList={getAllList}
              rowClassNameFormat={rowClassNameFormat}           
             />;    
    }
  }
    return (
    <div className="animated">
      <Card>
        <CardHeader>
          <BackButton history={props.history} backUrl= '/investments-security' text={"View Security"} />
        </CardHeader>
        <CardBody>
        <FormGroup row className="col-md-12">
              <NavLink style={{ marginRight: STYLE.marginRight25 }} strict to="#" className={`btn btn-${type === VIEW_SECURITY.ledger ? 'default' : 'primary'}`} onClick={() => setType(VIEW_SECURITY.ledger)}>
                Ledger
              </NavLink>
              <NavLink style={{ marginRight: STYLE.marginRight25 }} strict to="#" className={`btn btn-${type === VIEW_SECURITY.amortization ? 'default' : 'primary'}`} onClick={() => setType(VIEW_SECURITY.amortization)}>
              Amortization
              </NavLink>
              <NavLink style={{ marginRight: STYLE.marginRight25 }} strict to="#" className={`btn btn-${type === VIEW_SECURITY.income ? 'default' : 'primary'}`} onClick={() => setType(VIEW_SECURITY.income)}>
                Income
              </NavLink>
              <NavLink style={{ marginRight: STYLE.marginRight25 }} strict to="#" className={`btn btn-${type === VIEW_SECURITY.profitLoss ? 'default' : 'primary'}`} onClick={() => setType(VIEW_SECURITY.profitLoss)}>
                Profit & Loss
              </NavLink>
              <NavLink style={{ marginRight: STYLE.marginRight25 }} strict to="#" className={`btn btn-${type === VIEW_SECURITY.realized ? 'default' : 'primary'}`} onClick={() => setType(VIEW_SECURITY.realized)}>
              Realized Gain/loss
              </NavLink>
          </FormGroup>
                  {isLoading ?
                      <div className="animated fadeIn pt-1 text-center table-loader" />
                      :
                      <FormGroup row className="col-md-12">
                          
                              {getForm()}
                       
                          <Col className="col-md-2">
                              <Input type="select" name="NAIC" id="select" onChange={(e)=>setLot(e.target.value)}>
                                 <option value="" key="empty">
                                      All Lot
                               </option>
                              <option value="1" key="1">
                                      1
                              </option>
                              <option value="2" key="2">
                                      2
                              </option>
                              <option value="3" key="3">
                                      3
                              </option>
                              <option value="4" key="4">
                                      4
                              </option>
                              <option value="5" key="5">
                                      5
                              </option>
                              </Input>
                      <Label htmlFor="text-input">
                                  Cusip: {listData.Cusip  || "XXXXXXXX"}
                              </Label>
                              <Label htmlFor="text-input">
                                  Name: {listData.Description || "XXXXXXXX"}
                              </Label>
                              <Label htmlFor="text-input">
                                  Current quantity: {listData.Quantity  ? getNumberFormat(listData.Quantity , 3) : "XXXXXXXX"}
                              </Label>
                              <Label htmlFor="text-input">
                                  Current Adjusted Cost:{" "}
                                  {listData.Adjusted_Cost
                                      ? `$${getNumberFormat(listData.Adjusted_Cost)}`
                                      : "$XXXXXXXX"}
                              </Label>
                              <Label htmlFor="text-input">Current Price: {viewData ? `$${viewData.Current_price || viewData.Current_price === 0 ? viewData.Current_price : 'XXXXXXXX'}` : '$XXXXXXXX'}</Label>
                              <Label htmlFor="text-input">Current Coupon: {viewData ? `$${viewData.Current_Coupon || 'XXXXXXXX'}` : '$XXXXXXXX'}</Label>
                          </Col>
                      </FormGroup>
                  }
        </CardBody>
      </Card>
    </div>
  );
};

List.propTypes = {
  getList: PropTypes.func.isRequired,
  viewList: PropTypes.array.isRequired,
  list: PropTypes.array.isRequired,
  total_rows: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  edit_row_id: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => ({
  list: state.investment.list,
  viewList: state.investment.viewSecurity,
  total_rows: state.investment.total_rows,
  size: state.investment.size,
  edit_row_id: state.investment.edit_row_id,
  isLoading: state.loader.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getList: bindActionCreators(Services.getViewSecurity, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
