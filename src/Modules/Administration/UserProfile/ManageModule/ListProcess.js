import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import {NavLink, Card, CardBody, CardHeader } from "reactstrap";
import { showDataTableTotalText } from "../../../../services/commanServices";
import * as moduleManageServicesObj from "../../../../services/moduleManageServices";
import { loadingLayerModuleAdd } from "../../../../store/actions/administrationAction";


class ListProcess extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageTemp: this.props.pageTemp,
      sizePerPageTemp: this.props.sizePerPageTemp,
      searchKey: "", //this.props.searchKey,
      error: this.props.error,
      reloadModulemngModuleList:this.props.reloadModulemngModuleList,
    };
    this.levelList_DataTable = [];
    this.totalSize_levelList = 0;
    //-----------
    this.loadDataTable = this.loadDataTable.bind(this);
    this.onKeyUpSearchHandler = this.onKeyUpSearchHandler.bind(this);
    this.onClickClearSearchHandler = this.onClickClearSearchHandler.bind(this);
    this.searchBlock = this.searchBlock.bind(this);
    this.handleChangeOfInputs = this.handleChangeOfInputs.bind(this);
    this.timeout = 0;
  }

  loadDataTable(params) {    
    this.props.dispatch(moduleManageServicesObj.loadDataTable(params));
  }
  componentDidMount() {
    const { pageTemp, sizePerPageTemp, searchKey } = this.state;
    const params = {
      pageTemp,
      sizePerPageTemp,
      searchKey
    };
    this.loadDataTable(params);
  }
  renderShowsTotal(start, to, total) {
    return showDataTableTotalText(start, to, total);
  }
  sizePerPageListChange(sizePerPage) {
    this.setState({ sizePerPageTemp: sizePerPage }, () => {
      const { pageTemp, sizePerPageTemp, searchKey } = this.state;
      const params = {
        pageTemp,
        sizePerPageTemp,
        searchKey
      };
      this.loadDataTable(params);
    });
  }
  onPageChange(page, sizePerPage) {
    this.setState({ pageTemp: page }, () => {
      const { pageTemp, sizePerPageTemp, searchKey } = this.state;
      const params = {
        pageTemp,
        sizePerPageTemp,
        searchKey
      };
      this.loadDataTable(params);
    });
  }

  onKeyUpSearchHandler = e => {
    //let searchValue = e.target.value;
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      //search function
      const { pageTemp, sizePerPageTemp, searchKey } = this.state;
      const params = {
        pageTemp,
        sizePerPageTemp,
        searchKey
      };
      this.loadDataTable(params);
    }, 500);
  };

  onClickClearSearchHandler = () => {
    this.setState({ searchKey: "" }, resp => {
      const { pageTemp, sizePerPageTemp, searchKey } = this.state;
      const params = {
        pageTemp,
        sizePerPageTemp,
        searchKey
      };
      this.loadDataTable(params);
    });    
  };
  handleChangeOfInputs = e => {
    this.setState({ searchKey: e.target.value });
  };

  searchBlock = () => {    
    return (
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search Text"
          aria-label="Search Text"
          aria-describedby="basic-addon2"
          name={this.props.searchFieldName}
          value={this.state.searchKey}          
          onChange={e => this.handleChangeOfInputs(e)}
          onKeyUp={e => this.onKeyUpSearchHandler(e)}
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-warning"
            type="button"
            name="commonClearButton"
            onClick={() => this.onClickClearSearchHandler()}
          >
            Clear Search
          </button>
        </div>
      </div>
    );
  };

  getSelectedRowDetails = (row, action) => {
    this.props.dispatch(loadingLayerModuleAdd(true));    
    this.props
      .dispatch(moduleManageServicesObj.populateModuleAddEditForm1(row))
      .then(res => {
        //this.setState({ moduleDD: this.props.moduleDD }, ()=>{
        //console.log("inside click Finsh ");
        //})
      });
  };

  textToLink = (cell, row, enumObject, rowIndex) => {
    return (
      <NavLink
        href="#"
        style={{ padding: "0px", color:"#1454a8" }}        
        onClick={() => this.getSelectedRowDetails(row, "DATA")}
      >
        {row.s_UserModuleName}
      </NavLink>
    );
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.reloadModulemngModuleList !== prevState.reloadModulemngModuleList) {
      return { reloadModulemngModuleList: nextProps.reloadModulemngModuleList };
    }  else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.reloadModulemngModuleList !== this.props.reloadModulemngModuleList) {
      this.setState(
        {
          reloadModulemngModuleList: this.props.reloadModulemngModuleList,
          searchKey:''
        },
        () => {
          const {
            pageTemp,
            sizePerPageTemp,
            searchKey
          } = this.state;
          const params = {
            pageTemp,
            sizePerPageTemp,
            searchKey
          };
          this.loadDataTable(params);
        }
      );
    }
    
  }

  render() {
    this.levelList_DataTable = this.props.levelDataSet;
    this.totalSize_levelList = this.props.totalCount_levelDataSet;
    const options = {
      sortIndicator: true,
      page: this.state.pageTemp,
      hideSizePerPage: false,
      hidePageListOnlyOnePage: true,
      sizePerPageList: [
        { text: "10", value: 10 },
        { text: "50", value: 50 },
        { text: "100", value: 100 },
        { text: "All", value: this.totalSize_levelList }        
      ],
      sizePerPage: this.state.sizePerPageTemp,
      pageStartIndex: 1,
      //paginationSize: 5,
      paginationShowsTotal: this.renderShowsTotal,
      //paginationPosition: 'top',  // default is bottom, top and both is all available
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
            <i className="icon-menu"></i>Module List
          </CardHeader>
          <CardBody>
            <BootstrapTable
              data={this.levelList_DataTable}
              version="4"
              striped
              hover
              condensed
              pagination
              search
              //multiColumnSearch
              remote
              fetchInfo={{ dataTotalSize: this.totalSize_levelList }}
              options={options}
            >
              <TableHeaderColumn dataField="s_UserModuleName" dataSort dataFormat={this.textToLink.bind(this)}>
                Module Name
              </TableHeaderColumn>
              <TableHeaderColumn isKey dataField="s_UserModuleCode">
                Module Code
              </TableHeaderColumn>
              <TableHeaderColumn dataField="">Action</TableHeaderColumn>
            </BootstrapTable>
          </CardBody>
        </Card>
      </div>
    );
  }
}

ListProcess.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  pageTemp: state.moduleManageProcess.pageTemp,
  sizePerPageTemp: state.moduleManageProcess.sizePerPageTemp,
  error: state.moduleManageProcess.error,
  levelDataSet: state.moduleManageProcess.levelDataSet,
  totalCount_levelDataSet: state.moduleManageProcess.totalCount_levelDataSet,
  reloadModulemngModuleList:state.moduleManageProcess.reloadModulemngModuleList,
});

export default connect(mapStateToProps)(ListProcess);
