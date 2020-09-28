import React, { useState, useEffect }  from 'react';
import { FormGroup, Col, Label, Button} from 'reactstrap';
import { Control} from 'react-redux-form';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Select from "react-select"; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { editRow } from '../../../../store/actions/common';
import * as Services from '../../../../services/investment';

const List = props => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState({ sortName: undefined, sortOrder: undefined });
    //let myFormRef = React.createRef();
    const {brokerageData, transaction, isLoading} = props;
    const actionList = ['CMPND / "Z" Interest','INTEREST','IO Amortization','PAYDOWN'];
    
   useEffect(() => {
        props.getList({ page });
        props.editRow({ id: '' });
    }, []);
    
    useEffect(() => {
        setData();       
    }, []);    
    
    /************ Set data for edit ****/
    const setData = () => {
        // const obj = { ...data };
        // const country = countries.find(row => row.n_CountryId_PK === data.Country_ID);
        // const category = categories.find(row => row.Bond_Category_ID === data.Bond_Category_ID);
        // const subcategory = subcategories.find(row => row.Bond_Category_ID === data.Bond_SubCategory_ID);
        // obj.Bond_Category_ID = { value: data.Bond_Category_ID, label: category ? category.Category_Name : null }
        // obj.Bond_SubCategory_ID = { value: data.Bond_SubCategory_ID, label: subcategory ? subcategory.Category_Name : null }
        // obj.Country_ID = { value: data.Country_ID, label: country ? country.s_CountryName : null }
        // Object.keys(obj).forEach(key => {
        //     myFormRef.dispatch(actions.change(`security.${key}`, obj[key]));
        // });
     
    }
      /************ Handle date change **********/
    //   const handleDateChange = (date,key) => {
    //       setState({ ...state, [key]: date });
    // };
    
     /************** Reset form values ************/
     const resetForm = () => {
        // ['security.Cusip', 'security.NAIC_Designation', 'security.Redemption_Value', 'security.Description', 'security.Bond_Category_ID','security.Bond_SubCategory_ID','security.Coupon','security.Coupon_Delay','security.Payment_Frequency','security.Accrual','security.Amortization_Method'].map(key =>
        //     myFormRef.dispatch(actions.change(key, ''))
        //  );
        //  setState({ taxExempt: "", Issue_Date: null , Coupon_Date:null, Maturity_Date:null, Call_Date:null, Put_Date:null, Start_Date:null});
    };
/************* Handle page change **************/
  const handlePageChange = (pageNumber) => {
    props.getList({
        page:pageNumber, search, sortTo: sort.sortName,
        sortBy: sort.sortOrder
    });
      setPage(page);
      
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
        props.getList({});
        setPage(undefined);
    };

    // Customization Function 
    const rowClassNameFormat = (row, rowIdx) => {
        return { backgroundColor: rowIdx % 2 === 0 ? '#A2EFE8' : '#DCEFF1', color: "#000000" };
    };
    //Display Table Action Field
    const actionData = () =>{
       return(<Select {...props}
         options={actionList.map(row => ({ value: row, label: row }))} 
         />)
        } 
    // //Display Table Sub-Action Field
    // const actionData = () =>{
    //     return(<Select {...props}
    //       options={brokerageData.map(row => ({ value: row.Account_ID, label: row.Account_Name }))} 
    //       />)
    //      } 
   
    const options = {
        sortIndicator: true,
        page,
        onPageChange: handlePageChange,
        hideSizePerPage: true,
        paginationSize: 10,
        hidePageListOnlyOnePage: true,
        clearSearch: true,
        alwaysShowAllBtns: false,
        withFirstAndLast: false,
        sizePerPage: props.size,
        onSortChange: sortMethod,
        sortName: sort.sortName,
        sortOrder: sort.sortOrder,
        pageStartIndex: 1
    };

    return (
       <div>
            <FormGroup row className="col-md-12">
             <Col className="col-md-3">
                    <Label htmlFor="text-input">Brokerage Account*:</Label>
                    <Control
                        model=".Brokerage_Account"
                        onChange={(e)=>setSearch(e.value)}
                        component={brokerageProps => <Select
                            {...brokerageProps}
                            options={brokerageData.map(row => ({ value: row.Account_ID, label: row.Account_Name }))} />}
                           />
                 </Col> 
                <Col className="col-md-3"></Col>
                <Col className="col-md-5">
                    <Button type="submit" size="md" color="primary"  style={{ marginRight: '20px' }}>  SAVE {'&'} NEW </Button>
                    <Button type="reset" size="md" color="primary" style={{ marginRight: '20px' }} onClick={() => props.history.push('/transaction')}> SAVE {'&'} CLOSE </Button>
                     <Button type="reset" size="md" color="primary" onClick={() => resetForm()}> RESET</Button>
                </Col>
        </FormGroup>
        <FormGroup check row>
        <Col md="12">
            <Label check></Label>
            <NavLink strict to="#" className="view-all" onClick={() => getAllList()}> View All </NavLink>
        </Col>
    </FormGroup>
    {isLoading && <div className="animated fadeIn pt-1 text-center table-loader" />}
    <BootstrapTable
        data={transaction}
        version="4"
        remote
        condensed
        hover pagination
        options={{ ...options, page }}
        fetchInfo={{ dataTotalSize: props.total_rows }}
        trStyle={rowClassNameFormat}
    >
        <TableHeaderColumn isKey dataField="Cusip" dataSort>Date</TableHeaderColumn>
        <TableHeaderColumn dataField="Cusip" dataSort>Cusip</TableHeaderColumn>
        <TableHeaderColumn dataField="Description">Descripon</TableHeaderColumn>
        <TableHeaderColumn dataField="" dataFormat={actionData}>Action</TableHeaderColumn>
        <TableHeaderColumn dataField="" >Sub Action</TableHeaderColumn>
        <TableHeaderColumn dataField="Price" dataSort>Price</TableHeaderColumn>
        <TableHeaderColumn dataField="Quantity" dataSort>Quanty</TableHeaderColumn>
        <TableHeaderColumn dataField="AccruedInterest" dataSort>Interest </TableHeaderColumn>
        
    </BootstrapTable>

</div >
);
};

List.propTypes = {
getList: PropTypes.func.isRequired,
transaction: PropTypes.array.isRequired,
total_rows: PropTypes.number.isRequired,
size: PropTypes.number.isRequired,
isLoading: PropTypes.bool.isRequired,
editRow: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
transaction: state.investment.transactionData,
total_rows: state.investment.total_rows,
size: state.investment.size,
isLoading: state.loader.isLoading
});

const mapDispatchToProps = dispatch => ({
getList: bindActionCreators(Services.getTransaction, dispatch),
editRow: bindActionCreators(editRow, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(List);

      
