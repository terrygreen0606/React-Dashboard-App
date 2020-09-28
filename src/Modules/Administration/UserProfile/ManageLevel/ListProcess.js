import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import { NavLink, Card, CardBody, CardHeader } from "reactstrap";
import { showDataTableTotalText } from "../../../../services/commanServices";
import * as levelManageServicesObj from "../../../../services/levelManageServices";
import { loadingLayerLevelAdd } from "../../../../store/actions/administrationAction";

class ListProcess extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageTemp: this.props.pageTemp,
      sizePerPageTemp: this.props.sizePerPageTemp,
      error: this.props.error,
      searchKey: "",
      reloadLevelmngLevelList: this.props.reloadLevelmngLevelList,
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
    this.props.dispatch(levelManageServicesObj.loadLevelDataTable(params));
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
      //const { pageTemp, sizePerPageTemp } = this.state;
      //const sizePerPageTemp = this.state.sizePerPageTemp;
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
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
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

  getSelectedRowDetails = (row) => {
    this.props.dispatch(loadingLayerLevelAdd(true));
    this.props
      .dispatch(levelManageServicesObj.populateLevelAddEditForm1(row))
      .then(res => {
        //  console.log("inside click Finsh ");
      });
  };
  textToLink = (cell, row, enumObject, rowIndex) => {
    return (
      <NavLink
        href="#"
        style={{ padding: "0px", color: "darkblue" }}
        onClick={() => this.getSelectedRowDetails(row)}
      >
        {row.UserLevel_Name}
      </NavLink>
    );
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.reloadLevelmngLevelList !== prevState.reloadLevelmngLevelList) {
      return { reloadLevelmngLevelList: nextProps.reloadLevelmngLevelList };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.reloadLevelmngLevelList !== this.props.reloadLevelmngLevelList) {
      this.setState(
        {
          reloadLevelmngLevelList: this.props.reloadLevelmngLevelList,
          searchKey: ''
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
            <i className="icon-menu"></i>Level List
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
              remote
              fetchInfo={{ dataTotalSize: this.totalSize_levelList }}
              options={options}
            >
              <TableHeaderColumn
                dataField="UserLevel_Name"
                dataSort
                dataFormat={this.textToLink.bind(this)}
              >
                Level Name
              </TableHeaderColumn>
              <TableHeaderColumn isKey dataField="s_UserLevelCode">
                Level Code
              </TableHeaderColumn>
              <TableHeaderColumn dataField="s_UserLevelMainCode" dataSort>
                Main Code
              </TableHeaderColumn>
            </BootstrapTable>
          </CardBody>
        </Card>
      </div>
    );
  }
}

ListProcess.propTypes = {
  dispatch: PropTypes.func.isRequired,
  levelDataSet: PropTypes.array.isRequired,
  totalCount_levelDataSet: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  //isLoading: state.levelManageProcess.isLoading,//not used
  pageTemp: state.levelManageProcess.pageTemp,
  sizePerPageTemp: state.levelManageProcess.sizePerPageTemp,
  error: state.levelManageProcess.error,
  levelDataSet: state.levelManageProcess.levelDataSet,
  totalCount_levelDataSet: state.levelManageProcess.totalCount_levelDataSet,
  reloadLevelmngLevelList: state.levelManageProcess.reloadLevelmngLevelList
});

export default connect(mapStateToProps)(ListProcess);
