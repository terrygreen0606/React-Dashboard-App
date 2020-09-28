import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist//react-bootstrap-table-all.min.css";
import { Form, Button, Input, Card, CardHeader, CardBody } from "reactstrap";
import { showDataTableTotalText } from "../../../../services/commanServices";
import * as aclManageServicesObj from "../../../../services/aclManageServices";

class SubmoduleDatatable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTemp: this.props.pageTemp,
      sizePerPageTemp: 50 /*//this.props.sizePerPageTemp,*/,
      searchKey: "",
      DataSet: [],
      totalCount_DataSet: 0,
      userLevelID: this.props.levelDDSelected,
      selectedModule: this.props.selectedModule,
      isChecked: false,
      requestModule: `acl_submodulelist`,
      checkedItems: this.props.checked_AclSubmodules
    };
    this.loadDataTable = this.loadDataTable.bind(this);
    this.onKeyUpSearchHandler = this.onKeyUpSearchHandler.bind(this);
    this.onClickClearSearchHandler = this.onClickClearSearchHandler.bind(this);
    this.searchBlock = this.searchBlock.bind(this);
    this.handleChangeOfInputs = this.handleChangeOfInputs.bind(this);
    this.timeout = 0;
    this.handleChange_CheckBox = this.handleChange_CheckBox.bind(this);
    this.onClickBtnFormSubmitHandle = this.onClickBtnFormSubmitHandle.bind(
      this
    );
  }

  loadDataTable() {
    const {
      pageTemp,
      sizePerPageTemp,
      searchKey,
      userLevelID,
      selectedModule,
      requestModule
    } = this.state;
    const params = {
      pageTemp,
      sizePerPageTemp,
      searchKey,
      userLevelID,
      selectedModule,
      requestModule
    };
    this.props.dispatch(aclManageServicesObj.loadSubModuleDataTable(params));
  }
  componentDidMount() {
    this.loadDataTable();
  }
  renderShowsTotal(start, to, total) {
    return showDataTableTotalText(start, to, total);
  }
  sizePerPageListChange(sizePerPage) {
    this.setState({ sizePerPageTemp: sizePerPage }, () => {
      //this.loadDataTable();
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
          className="form-check-input AclSubModuleCheckBox"
          type="checkbox"
          name={`AclSubModule[${row.n_UserSubModule_PK}]`}
          id={`AclSubModule[${row.n_UserSubModule_PK}]`}
          value={row.n_UserSubModule_PK}
          checked={this.state.checkedItems.find(
            ch => ch.n_UserSubModule_PK === row.n_UserSubModule_PK
          )}
          onChange={e => this.handleChange_CheckBox(e, row)}
        />
      </div>
    );
  };

  handleChange_CheckBox = (e, s) => {
    const checkedItems = [...this.state.checkedItems];
    if (e.target.checked) {
      checkedItems.push(s);
    } else {
      const index = checkedItems.findIndex(
        ch => ch.n_UserSubModule_PK === s.n_UserSubModule_PK
      );
      checkedItems.splice(index, 1);
    }
    this.setState({ checkedItems });
  };

  onClickBtnFormSubmitHandle(e) {
    e.preventDefault();
    const SessionData = JSON.parse(sessionStorage.getItem("user"));
    let formSubmitedData = new FormData(e.target);
    formSubmitedData.append("Admin_ID", SessionData.Admin_ID);
    formSubmitedData.append("userLevelID", this.state.userLevelID);
    formSubmitedData.append("selectedModule", this.state.selectedModule);
    this.props
      .dispatch(
        aclManageServicesObj.aclSaveSubmoduleSettingForModule(formSubmitedData)
      )
      .then(() => {});
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.levelDDSelected !== prevState.levelDDSelected) {
      return { userLevelID: nextProps.levelDDSelected };
    } else if (nextProps.selectedModule !== prevState.selectedModule) {
      return { selectedModule: nextProps.selectedModule };
    } else if (nextProps.checked_AclSubmodules !== prevState.checkedItems) {
      return { checked_AclSubmodules: nextProps.checked_AclSubmodules };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.levelDDSelected !== this.props.levelDDSelected) {
      this.setState(
        {
          userLevelID: this.props.levelDDSelected,
          searchKey: "",
          selectedModule: 0
        },
        () => {
          this.loadDataTable();
        }
      );
    }

    if (prevProps.selectedModule !== this.props.selectedModule) {
      this.setState(
        {
          selectedModule: this.props.selectedModule,
          searchKey: ""
        },
        () => {
          this.loadDataTable();
        }
      );
    }

    if (prevProps.totalCount_DataSet !== this.props.totalCount_DataSet) {
      this.setState({
        totalCount_DataSet: this.props.totalCount_DataSet
      });
    }

    if (prevProps.DataSet !== this.props.DataSet) {
      this.setState({
        DataSet: this.props.DataSet
      });
    }

    if (
      prevProps.forceReload_AppliedAndDeniedDataTable !==
      this.props.forceReload_AppliedAndDeniedDataTable
    ) {
      this.setState(
        {
          userLevelID: this.props.levelDDSelected,
          searchKey: "",
          selectedModule: 0
        },
        () => {
          this.loadDataTable();
        }
      );
    }

    if (prevProps.checked_AclSubmodules !== this.props.checked_AclSubmodules) {
      this.setState({
        checkedItems: this.props.checked_AclSubmodules
      });
    }
  }

  render() {
    const {
      DataSet,
      totalCount_DataSet,
      pageTemp,
      sizePerPageTemp
    } = this.state;

    const options = {
      sortIndicator: true,
      clearSearch: false,
      searchField: this.searchBlock,
      noDataText: "No Data Available !"
    };

    return (
      <div className="animated">
        <Card>
          <CardHeader>
            <i className="icon-menu"></i>Sub Module List
            <Button
              type="submit"
              form="formToSubmit_AclSubModule"
              className="btn-info bg-light-blue btn-brand mr-1 mb-1 float-right"
            >
              <i className="fa fa-save"></i>
              <span>Save Changes</span>
            </Button>
          </CardHeader>
          <CardBody>
            <Form
              id="formToSubmit_AclSubModule"
              ref="formToSubmit_AclSubModule"
              onSubmit={this.onClickBtnFormSubmitHandle}
              method="post"
              inline
            >
              <BootstrapTable
                data={DataSet}
                version="4"
                striped
                hover
                condensed
                //pagination
                search
                remote
                fetchInfo={{ dataTotalSize: totalCount_DataSet }}
                options={options}
              >
                <TableHeaderColumn
                  dataField="n_UserSubModule_PK"
                  isKey={true}
                  dataFormat={this.textToCheckBox.bind(this)}
                  width="5%"
                >
                  &nbsp;
                </TableHeaderColumn>

                <TableHeaderColumn dataField="s_UserSubModuleName" width="95%">
                  Sub Module Name
                </TableHeaderColumn>
              </BootstrapTable>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

SubmoduleDatatable.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.aclManageProcess.isLoading,
  pageTemp: state.aclManageProcess.pageTemp,
  sizePerPageTemp: state.aclManageProcess.sizePerPageTemp,
  DataSet: state.aclManageProcess.DataSet_Submodule,
  totalCount_DataSet: state.aclManageProcess.totalCount_DataSet_Submodule,

  forceReload_AppliedDataTable:
    state.aclManageProcess.forceReload_AppliedDataTable,
  forceReload_AppliedAndDeniedDataTable:
    state.aclManageProcess.forceReload_AppliedAndDeniedDataTable,

  levelDDSelected: state.aclManageProcess.levelDDSelected,
  selectedModule: state.aclManageProcess.selectedModule,
  checked_AclSubmodules: state.aclManageProcess.checked_AclSubmodules
});

export default connect(mapStateToProps)(SubmoduleDatatable);
