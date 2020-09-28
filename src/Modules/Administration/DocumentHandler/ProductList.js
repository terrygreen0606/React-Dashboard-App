import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "../../../scss/react-bootstrap-table-custom.css";
import {
    Form,
    Card,
    CardHeader,
    CardBody
  } from "reactstrap";
import { AppSwitch } from '@coreui/react'


import { showDataTableTotalText } from "../../../services/commanServices";
import * as docHandlerServicesObj from "../../../services/documentHandlerServices";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {

      pageTemp: this.props.pageTemp_ProductDataTable,
      sizePerPageTemp: this.props.sizePerPageTemp_ProductDataTable,
      searchKey: "",
      DataSet: [],
      totalCount_DataSet: 0,
      
      productSelectedID: [],//can be multiple selection
      checkedBoxes: '',
    };
    //-----------
    this.loadDataTable = this.loadDataTable.bind(this);
    this.onKeyUpSearchHandler = this.onKeyUpSearchHandler.bind(this);
    this.onClickClearSearchHandler = this.onClickClearSearchHandler.bind(this);
    this.searchBlock = this.searchBlock.bind(this);
    this.handleChangeOfInputs = this.handleChangeOfInputs.bind(this);
    this.timeout = 0;    //Mandatory for Searching in Datatable
  }
  loadDataTable() {
    const {
        pageTemp,
        sizePerPageTemp,
        searchKey,
      } = this.state;
      const params = {
        pageTemp,
        sizePerPageTemp,
        searchKey,
      };

    this.props.dispatch(docHandlerServicesObj.loadDocHandlerProductDataTable(params));
  }
  componentDidMount() {    
    this.loadDataTable();
  }  
  renderShowsTotal(start, to, total) {
    return showDataTableTotalText(start, to, total);
  }
  sizePerPageListChange(sizePerPage) {
    this.setState({ sizePerPageTemp: sizePerPage }, () => {
      this.loadDataTable();
    });
  }
  onPageChange(page, sizePerPage) {
    this.setState({ pageTemp: page }, () => {
        this.loadDataTable();
    });
  }
  onKeyUpSearchHandler = e => {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.loadDataTable();
    }, 500);
  };
  onClickClearSearchHandler = () => {
    this.setState({ searchKey: "" }, resp => {
      this.loadDataTable();
    });
  };
  handleChangeOfInputs = e => {
    this.setState({ searchKey: e.target.value });
  };
  searchBlock = () => {
    return (
      <div className="input-group mb-6">
        <input
          type="text"
          className="form-control"
          placeholder="Search Text"
          aria-label="Search Text"
          aria-describedby="basic-addon2"
          name={this.props.searchFieldName}
          value={this.state.searchKey}
          onChange={e => this.handleChangeOfInputs(e)}
          onKeyUp={e => this.onKeyUpSearchHandler(e)}
        />        
      </div>
    );
  };
  
  textToCheckBox = (cell, row, enumObject, rowIndex) => {
     return (
      <div>
        <AppSwitch className={'mx-1 ProductRowIdCustomClass'} variant={'3d'} outline={'alt'} color={'success'} label dataOn={'\u2713'} dataOff={'\u2715'} 
            name={`ProductRowId_${row.n_ProductId_PK}`}
            id={`ProductRowId_${row.n_ProductId_PK}`}
            onChange={(e)=>this.handleCheckbox_Single(e,row)}
        />   
      </div>
    );
  };
  handleCheckbox_Multi = (e,row) => {
    const arrayVariable = {actionTaken: e.target.checked, itemSelected: row.n_ProductId_PK}
    this.props.dispatch(docHandlerServicesObj.getSelectedProductID_Services(arrayVariable));
  };

  handleCheckbox_Single = (e, row) => {
    
    if(e.target.checked) {
       this.setState({ checkedBoxes: row.n_ProductId_PK }, () => {
          const arrayVariable = {actionTaken: true, itemSelected: row.n_ProductId_PK,requestSource: 'ProductList'}
          this.props.dispatch(docHandlerServicesObj.getSelectedProductID_Services(arrayVariable));
      });
    }else{
      this.setState({ checkedBoxes: ''}, () => {
          const arrayVariable = {actionTaken: false, itemSelected: row.n_ProductId_PK,requestSource: 'ProductList'}
          this.props.dispatch(docHandlerServicesObj.getSelectedProductID_Services(arrayVariable));
      });
    }
}

  

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.DataSet_ProductDataTable !== this.props.DataSet_ProductDataTable) {
      this.setState(
        {
          DataSet: this.props.DataSet_ProductDataTable,
          //searchKey:''
        }/*,() => {this.loadDataTable();}*/
      );
    }
    if (prevProps.totalCount_DataSet_ProductDataTable !== this.props.totalCount_DataSet_ProductDataTable) {
        this.setState(
          {
            totalCount_DataSet: this.props.totalCount_DataSet_ProductDataTable,            
          }
        );
      }
      if (prevProps.sizePerPageTemp_ProductDataTable !== this.props.sizePerPageTemp_ProductDataTable) {
        this.setState(
          {
            sizePerPageTemp: this.props.sizePerPageTemp_ProductDataTable,            
          }
        );
      }
      if (prevProps.pageTemp_ProductDataTable !== this.props.pageTemp_ProductDataTable) {
        this.setState(
          {
            pageTemp: this.props.pageTemp_ProductDataTable,            
          }
        );
      }
    
  }

  
  render() {
    const options = {
      sortIndicator: true,
      page: this.state.pageTemp,
      hideSizePerPage: false,
      hidePageListOnlyOnePage: true,
      sizePerPageList: [
        { text: "10", value: 10 },
        { text: "50", value: 50 },
        { text: "100", value: 100 },
        { text: "All", value: this.state.totalCount_DataSet }
      ],
      sizePerPage: this.state.sizePerPageTemp,
      pageStartIndex: 1,
      //paginationSize: 5,
      paginationShowsTotal: this.renderShowsTotal,
      alwaysShowAllBtns: true,
      onPageChange: this.onPageChange.bind(this),
      onSizePerPageList: this.sizePerPageListChange.bind(this),
      clearSearch: false,
      searchField: this.searchBlock      
    };

    return (
      <div className="animated">
        <Card>
          <CardHeader>
            <i className="icon-menu"></i>Product List
          </CardHeader>
          <CardBody>
          <Form
              id="formToSubmit_AppliedModule"
              ref="formToSubmit_AppliedModule"              
            >
            <BootstrapTable
              data={this.state.DataSet}
              version="4"
            //   striped
              hover
              condensed
              //pagination
              search
              remote
              fetchInfo={{ dataTotalSize: this.state.totalCount_DataSet }}
              options={options}
              containerStyle={ { height:'100% !important' } }
              bodyContainerClass={'react-bs-container-body-dochandler'}
            >
              <TableHeaderColumn
                dataField="n_ProductId_PK"                
                isKey={true}
                dataFormat={this.textToCheckBox.bind(this)}
                width="15%"
              >
              </TableHeaderColumn>

              <TableHeaderColumn dataField="s_ProductName" width="60%">
                Product Name
              </TableHeaderColumn>              
              <TableHeaderColumn dataField="s_ProductCode" width="25%">
                Product Code
              </TableHeaderColumn>              

            </BootstrapTable>
            </Form>
          </CardBody>
        </Card>        
      </div>
    );
  }
}

ProductList.propTypes = {
  dispatch: PropTypes.func.isRequired,  
};
const mapStateToProps = state => ({  
    isAuthenticated: state.Auth.isAuthenticated,
    pageTemp_ProductDataTable:state.docHandlerProcess.pageTemp_ProductDataTable,    
    sizePerPageTemp_ProductDataTable: state.docHandlerProcess.sizePerPageTemp_ProductDataTable,
    DataSet_ProductDataTable:state.docHandlerProcess.DataSet_ProductDataTable,
    totalCount_DataSet_ProductDataTable:state.docHandlerProcess.totalCount_DataSet_ProductDataTable,
});

export default connect(mapStateToProps)(ProductList);

