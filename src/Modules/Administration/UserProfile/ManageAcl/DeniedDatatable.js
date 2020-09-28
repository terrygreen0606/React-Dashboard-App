import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import {
  NavLink,
  Form,
  Button,
  Input,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import { showDataTableTotalText } from "../../../../services/commanServices";
import * as aclManageServicesObj from "../../../../services/aclManageServices";

class DeniedDatatable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTemp: this.props.pageTemp,
      sizePerPageTemp: this.props.sizePerPageTemp,
      error: this.props.error,
      searchKey: "",
      moduleDDSelected: "",
      isAppliedOrDenied: "Denied",
      userLevelID: this.props.levelDDSelected,
      DataSet: [],
      totalCount_DataSet: 0,
      forceReload_DeniedDataTable: this.props.forceReload_DeniedDataTable,
      forceReload_AppliedAndDeniedDataTable: this.props
        .forceReload_AppliedAndDeniedDataTable
    };
    // this.DataSet = [];
    // this.totalCount_DataSet = 0;
    //-----------
    this.loadDataTable = this.loadDataTable.bind(this);
    this.onKeyUpSearchHandler = this.onKeyUpSearchHandler.bind(this);
    this.onClickClearSearchHandler = this.onClickClearSearchHandler.bind(this);
    this.searchBlock = this.searchBlock.bind(this);
    this.handleChangeOfInputs = this.handleChangeOfInputs.bind(this);
    this.timeout = 0;

    this.onClickBtnFormSubmitHandle = this.onClickBtnFormSubmitHandle.bind(
      this
    );
  }

  loadDataTable(params) {
    this.props.dispatch(aclManageServicesObj.loadDataTable(params));
  }

  componentDidMount() {
    const {
      pageTemp,
      sizePerPageTemp,
      searchKey,
      isAppliedOrDenied,
      userLevelID
    } = this.state;
    const params = {
      pageTemp,
      sizePerPageTemp,
      searchKey,
      isAppliedOrDenied,
      userLevelID
    };
    this.loadDataTable(params);
  }
  renderShowsTotal(start, to, total) {
    return showDataTableTotalText(start, to, total);
  }
  sizePerPageListChange(sizePerPage) {}
  onPageChange(page, sizePerPage) {
    this.setState({ pageTemp: page }, () => {
      const {
        pageTemp,
        sizePerPageTemp,
        searchKey,
        isAppliedOrDenied,
        userLevelID
      } = this.state;
      const params = {
        pageTemp,
        sizePerPageTemp,
        searchKey,
        isAppliedOrDenied,
        userLevelID
      };
      this.loadDataTable(params);
    });
  }
  onKeyUpSearchHandler = e => {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const {
        // pageTemp,
        sizePerPageTemp,
        searchKey,
        isAppliedOrDenied,
        userLevelID
      } = this.state;
      const pageTemp = 1;
      const params = {
        pageTemp,
        sizePerPageTemp,
        searchKey,
        isAppliedOrDenied,
        userLevelID
      };
      this.loadDataTable(params);
    }, 500);
  };
  onClickClearSearchHandler = () => {
    this.setState({ searchKey: "" }, resp => {
      const {
        pageTemp,
        sizePerPageTemp,
        searchKey,
        isAppliedOrDenied,
        userLevelID
      } = this.state;
      const params = {
        pageTemp,
        sizePerPageTemp,
        searchKey,
        isAppliedOrDenied,
        userLevelID
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
  getSelectedRowDetails = (row, action) => {};

  textToCheckBox = (cell, row, enumObject, rowIndex) => {
    return (
      <div>
        <Input
          className="form-check-input DeniedModuleCheckBox"
          type="checkbox"
          name={`DeniedModule[${row.n_UserModule_PK}]`}
          id={`DeniedModule[${row.n_UserModule_PK}]`}
          value={row.n_UserModule_PK}
        />
      </div>
    );
  };

  onClickBtnFormSubmitHandle(e) {
    e.preventDefault();
    const SessionData = JSON.parse(sessionStorage.getItem("user"));
    let formSubmitedData = new FormData(e.target);
    formSubmitedData.append("Admin_ID", SessionData.Admin_ID);
    formSubmitedData.append("userLevelID", this.state.userLevelID);
    formSubmitedData.append("actionType", "DoApply");
    this.props
      .dispatch(
        aclManageServicesObj.aclApplyDenyModulesToLevel(formSubmitedData)
      )
      .then(() => {});
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.levelDDSelected !== prevState.levelDDSelected) {
      return { userLevelID: nextProps.levelDDSelected };
    }
    if (
      nextProps.forceReload_AppliedAndDeniedDataTable !==
      prevState.forceReload_AppliedAndDeniedDataTable
    ) {
      return {
        forceReload_AppliedAndDeniedDataTable:
          nextProps.forceReload_AppliedAndDeniedDataTable
      };
    } else return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.levelDDSelected !== this.props.levelDDSelected) {
      this.setState(
        {
          userLevelID: this.props.levelDDSelected,
          searchKey: ""
        },
        () => {
          const {
            pageTemp,
            sizePerPageTemp,
            searchKey,
            isAppliedOrDenied,
            userLevelID
          } = this.state;
          const params = {
            pageTemp,
            sizePerPageTemp,
            searchKey,
            isAppliedOrDenied,
            userLevelID
          };
          this.loadDataTable(params);
        }
      );
    }

    if (
      prevProps.forceReload_AppliedAndDeniedDataTable !==
      this.props.forceReload_AppliedAndDeniedDataTable
    ) {
      this.setState(
        {
          forceReload_AppliedAndDeniedDataTable: this.props
            .forceReload_AppliedAndDeniedDataTable
        },
        () => {
          const {
            pageTemp,
            sizePerPageTemp,
            searchKey,
            isAppliedOrDenied,
            userLevelID
          } = this.state;
          const params = {
            pageTemp,
            sizePerPageTemp,
            searchKey,
            isAppliedOrDenied,
            userLevelID
          };
          this.loadDataTable(params);
        }
      );
    }
  }

  render() {
    this.DataSet = this.props.DataSet;
    this.totalCount_DataSet = this.props.totalCount_DataSet;
    //const { currentPage, data, isLoading } = this.state;
    const {
      DataSet,
      totalCount_DataSet,
      pageTemp,
      sizePerPageTemp
    } = this.state;

    const options = {
      sortIndicator: true,
      page: pageTemp,
      hidePageListOnlyOnePage: true,
      sizePerPageList: [
        { text: "10", value: 10 },
        { text: "50", value: 50 },
        { text: "100", value: 100 },
        { text: "All", value: totalCount_DataSet }
      ],
      sizePerPage: sizePerPageTemp,
      hideSizePerPage: true,
      pageStartIndex: 1,
      paginationShowsTotal: this.renderShowsTotal,
      alwaysShowAllBtns: true,
      onPageChange: this.onPageChange.bind(this),
      clearSearch: false,
      searchField: this.searchBlock,
      noDataText: "No Data Available !"
    };

    return (
      <div className="animated">
        <Card>
          <CardHeader>
            <i className="icon-menu"></i>Denied Modules
            <Button
              type="submit"
              form="formToSubmit_DeniedModule"
              className="bg-vimeo bg-vimeo btn-brand float-right"
            >
              <i className="fa fa-hand-o-left"></i>
              <span>Do Apply</span>
            </Button>
          </CardHeader>
          <CardBody>
            <Form
              id="formToSubmit_DeniedModule"
              ref="formToSubmit_DeniedModule"
              onSubmit={this.onClickBtnFormSubmitHandle}
              method="post"
              inline
            >
              <BootstrapTable
                data={this.DataSet}
                version="4"
                striped
                hover
                condensed
                pagination={true}
                search
                remote
                fetchInfo={{ dataTotalSize: this.totalCount_DataSet }}
                options={options}
              >
                <TableHeaderColumn
                  dataField="n_UserModule_PK"
                  isKey={true}
                  dataFormat={this.textToCheckBox.bind(this)}
                  width="5%"
                >
                  &nbsp;
                </TableHeaderColumn>

                <TableHeaderColumn dataField="s_UserModuleName" width="95%">
                  Module Name
                </TableHeaderColumn>
              </BootstrapTable>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

DeniedDatatable.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.aclManageProcess.isLoading,
  pageTemp: state.aclManageProcess.pageTemp,
  sizePerPageTemp: state.aclManageProcess.sizePerPageTemp,
  DataSet: state.aclManageProcess.DataSet_Denied,
  totalCount_DataSet: state.aclManageProcess.totalCount_DataSet_Denied,

  levelDDSelected: state.aclManageProcess.levelDDSelected,
  forceReload_DeniedDataTable:
    state.aclManageProcess.forceReload_DeniedDataTable,
  forceReload_AppliedAndDeniedDataTable:
    state.aclManageProcess.forceReload_AppliedAndDeniedDataTable
});

export default connect(mapStateToProps)(DeniedDatatable);
