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
    CardBody,    
  } from "reactstrap";
import { AppSwitch } from '@coreui/react'


import { showDataTableTotalText } from "../../../services/commanServices";
import * as docHandlerServicesObj from "../../../services/documentHandlerServices";

class FormnameList extends Component {
  constructor(props) {
    super(props);
    this.state = {

      pageTemp: this.props.pageTemp_FormnameDataTable,
      sizePerPageTemp: this.props.sizePerPageTemp_FormnameDataTable,
      searchKey: "",
      DataSet: [],
      totalCount_DataSet: 0,
      selected_ProductPK:this.props.selected_ProductPK,
      selected_DoctypePK:this.props.selected_DoctypePK,      
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
        selected_ProductPK,
        selected_DoctypePK
      } = this.state;
      const params = {
        pageTemp,
        sizePerPageTemp,
        searchKey,
        selected_ProductPK,
        selected_DoctypePK
      };

    this.props.dispatch(docHandlerServicesObj.loadDocHandlerFormnameDataTable(params));
  }
  componentDidMount() {    
    //this.loadDataTable();
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
        {/* <div class="input-group-append">
          <button
            class="btn btn-outline-warning"
            type="button"
            name="commonClearButton"
            onClick={() => this.onClickClearSearchHandler()}
          >
            Clear Search
          </button>
        </div> */}
      </div>
    );
  };
  textToCheckBox = (cell, row, enumObject, rowIndex) => {
    return (
      <div>
        {/* <Input
          className=""
          type="checkbox"
          name={`ProductRowId[${row.n_ProductId_PK}]`}
          id={`ProductRowId[${row.n_ProductId_PK}]`}
          value={row.n_ProductId_PK}
          // onChange={(e)=>this.handleChange_CheckBox(e)}
        /> */}
        {/* <AppSwitch className={'mx-1'} color={'secondary'} 
            name={`ProductRowId[${row.n_ProductId_PK}]`}
            id={`ProductRowId[${row.n_ProductId_PK}]`}
            value={row.n_ProductId_PK}  
            checked /> */}
        <AppSwitch className={'mx-1'} variant={'3d'} outline={'alt'} color={'success'} label dataOn={'\u2713'} dataOff={'\u2715'}
            name={`DoctypeRowId[${row.s_PrFormID}]`}
            id={`DoctypeRowId[${row.s_PrFormID}]`}
            //value={row.s_DocCode}  
            onChange={(e)=>this.getSelectedRowDetails(e,row)}
        />    
      </div>
    );
  };

  getSelectedRowDetails = (e,row) => {
    //console.log(e.target.checked+"inside click Finsh "+row.s_PrFormID);
    const arrayVariable = {actionTaken: e.target.checked, itemSelected: row.s_PrFormID}
    this.props.dispatch(docHandlerServicesObj.getSelectedFormnameID_Services(arrayVariable));
  };  

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selected_ProductPK !== prevState.selected_ProductPK) {
      return { selected_ProductPK: nextProps.selected_ProductPK };
    }else if (nextProps.selected_DoctypePK !== prevState.selected_DoctypePK) {
      return { selected_DoctypePK: nextProps.selected_DoctypePK };
    }
    else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.DataSet_FormnameDataTable !== this.props.DataSet_FormnameDataTable) {
      this.setState(
        {
          DataSet: this.props.DataSet_FormnameDataTable,
          //searchKey:''
        }/*,() => {this.loadDataTable();}*/
      );
    }
    if (prevProps.totalCount_DataSet_FormnameDataTable !== this.props.totalCount_DataSet_FormnameDataTable) {
        this.setState(
          {
            totalCount_DataSet: this.props.totalCount_DataSet_FormnameDataTable,            
          }
        );
      }
      if (prevProps.sizePerPageTemp_FormnameDataTable !== this.props.sizePerPageTemp_FormnameDataTable) {
        this.setState(
          {
            sizePerPageTemp: this.props.sizePerPageTemp_FormnameDataTable,            
          }
        );
      }
      if (prevProps.pageTemp_FormnameDataTable !== this.props.pageTemp_FormnameDataTable) {
        this.setState(
          {
            pageTemp: this.props.pageTemp_FormnameDataTable,            
          }
        );
      }
      if (prevProps.selected_ProductPK !== this.props.selected_ProductPK) {        
        this.setState(
          {
            selected_ProductPK: this.props.selected_ProductPK,            
          },() => {this.loadDataTable();}
        );
      }
      if (prevProps.selected_DoctypePK !== this.props.selected_DoctypePK) {
        this.setState(
          {
            selected_DoctypePK: this.props.selected_DoctypePK,            
          },() => {this.loadDataTable();}
        );
      }
    
  }

  
  render() {
    // this.List_DataTable = this.props.levelDataSet;
    // this.totalSize = this.props.totalCount_levelDataSet;

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
            <i className="icon-menu"></i>Form Name List
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
                dataField="s_PrFormID"                
                isKey={true}
                dataFormat={this.textToCheckBox.bind(this)}
                width="15%"
              >
              </TableHeaderColumn>

              <TableHeaderColumn dataField="s_PRFormName" width="60%">
                Form Name
              </TableHeaderColumn>              
              <TableHeaderColumn dataField="s_PrFormID" width="25%">
                Form Code
              </TableHeaderColumn>              

            </BootstrapTable>
            </Form>
          </CardBody>
        </Card>        
      </div>
    );
  }
}

FormnameList.propTypes = {
  dispatch: PropTypes.func.isRequired,  
};

const mapStateToProps = state => ({  
    isAuthenticated: state.Auth.isAuthenticated,
    pageTemp_FormnameDataTable:state.docHandlerProcess.pageTemp_FormnameDataTable,    
    sizePerPageTemp_FormnameDataTable: state.docHandlerProcess.sizePerPageTemp_FormnameDataTable,
    DataSet_FormnameDataTable:state.docHandlerProcess.DataSet_FormnameDataTable,
    totalCount_DataSet_FormnameDataTable:state.docHandlerProcess.totalCount_DataSet_FormnameDataTable,
    selected_ProductPK:JSON.stringify(state.docHandlerProcess.selected_ProductPK),
    selected_DoctypePK:JSON.stringify(state.docHandlerProcess.selected_DoctypePK),    
});

export default connect(mapStateToProps)(FormnameList);
