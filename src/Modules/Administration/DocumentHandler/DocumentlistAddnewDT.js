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
  NavLink,
  Button,
  CardFooter,
} from "reactstrap";
import { AppSwitch } from "@coreui/react";

import { showDataTableTotalText } from "../../../services/commanServices";
import * as docHandlerServicesObj from "../../../services/documentHandlerServices";
import { toastAction } from "../../../store/actions/toast-actions";

class DocumentlistAddnew extends Component {
  constructor(props) {
    super(props);
    const SessionData = JSON.parse(sessionStorage.getItem("user"));
    this.state = {
      pageTemp: this.props.pageTemp_DocumentAddnewDataTable,
      sizePerPageTemp: this.props.sizePerPageTemp_DocumentAddnewDataTable,
      searchKey: "",
      DataSet: [],
      totalCount_DataSet: 0,
      selected_ProductPK: this.props.selected_ProductPK,
      selected_DoctypePK: this.props.selected_DoctypePK,

      modal: false,
      primary: this.props.doHideShowAddnewdocDilogStatus,
      doHideShowAddnewdocDilogStatus: this.props.doHideShowAddnewdocDilogStatus,
      selected_DocumentAddnewPK: this.props.selected_DocumentAddnewPK,
      Admin_ID: SessionData.Admin_ID,
      forceReloadDocumentAddnewDataTable: this.props
        .forceReloadDocumentAddnewDataTable,
    };
    //-----------
    this.loadDataTable = this.loadDataTable.bind(this);
    this.onKeyUpSearchHandler = this.onKeyUpSearchHandler.bind(this);
    this.onClickClearSearchHandler = this.onClickClearSearchHandler.bind(this);
    this.searchBlock = this.searchBlock.bind(this);
    this.handleChangeOfInputs = this.handleChangeOfInputs.bind(this);
    this.timeout = 0; //Mandatory for Searching in Datatable

    //this.toggle = this.toggle.bind(this); //for model dilogue
    //this.togglePrimary = this.togglePrimary.bind(this); //for model dilogue
    //this.toggleAddNewDocModel = this.toggleAddNewDocModel.bind(this);
  }

  //   toggle() {
  //     this.setState({
  //       modal: !this.state.modal,
  //     });
  //   }
  //   togglePrimary() {
  //     this.setState({
  //       primary: !this.state.primary,
  //     });
  //   }

  loadDataTable() {
    const {
      pageTemp,
      sizePerPageTemp,
      searchKey,
      selected_ProductPK,
      selected_DoctypePK,
    } = this.state;
    const params = {
      pageTemp,
      sizePerPageTemp,
      searchKey,
      selected_ProductPK,
      selected_DoctypePK,
    };

    this.props.dispatch(
      docHandlerServicesObj.loadDocHandlerDocumentAddnewDataTable(params)
    );
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
  onKeyUpSearchHandler = (e) => {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.loadDataTable();
    }, 500);
  };
  onClickClearSearchHandler = () => {
    this.setState({ searchKey: "" }, (resp) => {
      this.loadDataTable();
    });
  };
  handleChangeOfInputs = (e) => {
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
          onChange={(e) => this.handleChangeOfInputs(e)}
          onKeyUp={(e) => this.onKeyUpSearchHandler(e)}
        />
      </div>
    );
  };
  textToCheckBox = (cell, row, enumObject, rowIndex) => {
    return (
      <div>
        <AppSwitch
          className={"mx-1"}
          variant={"3d"}
          outline={"alt"}
          color={"success"}
          label
          dataOn={"\u2713"}
          dataOff={"\u2715"}
          name={`DocAddnewRowId_${row.n_PRDocListPK}`}
          id={`DocAddnewRowId_${row.n_PRDocListPK}`}
          onChange={(e) => this.handleCheckbox_Multi(e, row)}
        />
      </div>
    );
  };
  displayFileName = (cell, row, enumObject, rowIndex) => {
    return (
      <div>
        <NavLink href="#" style={{ padding: "0px", color: "#1454a8" }}>
          {row.FileNameOnly}
        </NavLink>
      </div>
    );
  };
  handleCheckbox_Multi = (e, row) => {
    //console.log(e.target.checked+"inside click Finsh "+row.s_PrFormID);
    const arrayVariable = {
      actionTaken: e.target.checked,
      itemSelected: row.n_PRDocListPK,
    };
    this.props.dispatch(
      docHandlerServicesObj.getSelectedDocumentAddnewIDServices(arrayVariable)
    );
  };
  toggleAddNewDocModel = (e) => {
    const NewTogleStatus = false; //this.state.doHideShowAddnewdocDilogStatus === true ? false : true;
    this.props.dispatch(
      docHandlerServicesObj.doHideShowAddnewdocDilogServices(NewTogleStatus)
    );
  };
  addSelectedDocumentToList = (e) => {
    const {
      selected_ProductPK,
      selected_DoctypePK,
      selected_DocumentAddnewPK,
      Admin_ID,
    } = this.state;
    const params = {
      selected_ProductPK,
      selected_DoctypePK,
      selected_DocumentAddnewPK,
      Admin_ID,
    };
    if (selected_DocumentAddnewPK.length == 0) {
      toastAction(false, "Please Select Documents to complete the process!");
      return false;
    }

    this.props.dispatch(
      docHandlerServicesObj.addSelectedDocumentToList(params)
    );
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selected_ProductPK !== prevState.selected_ProductPK) {
      return { selected_ProductPK: nextProps.selected_ProductPK };
    } else if (nextProps.selected_DoctypePK !== prevState.selected_DoctypePK) {
      return { selected_DoctypePK: nextProps.selected_DoctypePK };
    } else if (
      nextProps.doHideShowAddnewdocDilogStatus !==
      prevState.doHideShowAddnewdocDilogStatus
    ) {
      return {
        doHideShowAddnewdocDilogStatus:
          nextProps.doHideShowAddnewdocDilogStatus,
      };
    } else if (
      nextProps.selected_DocumentAddnewPK !==
      prevState.selected_DocumentAddnewPK
    ) {
      return {
        selected_DocumentAddnewPK: nextProps.selected_DocumentAddnewPK,
      };
    } else if (
      nextProps.forceReloadDocumentAddnewDataTable !==
      prevState.forceReloadDocumentAddnewDataTable
    ) {
      return {
        forceReloadDocumentAddnewDataTable:
          nextProps.forceReloadDocumentAddnewDataTable,
      };
    } else return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.DataSet_DocumentAddnewDataTable !==
      this.props.DataSet_DocumentAddnewDataTable
    ) {
      this.setState(
        {
          DataSet: this.props.DataSet_DocumentAddnewDataTable,
          //searchKey:''
        } /*,() => {this.loadDataTable();}*/
      );
    }
    if (
      prevProps.totalCount_DataSet_DocumentAddnewDataTable !==
      this.props.totalCount_DataSet_DocumentAddnewDataTable
    ) {
      this.setState({
        totalCount_DataSet: this.props
          .totalCount_DataSet_DocumentAddnewDataTable,
      });
    }
    if (
      prevProps.sizePerPageTemp_DocumentAddnewDataTable !==
      this.props.sizePerPageTemp_DocumentAddnewDataTable
    ) {
      this.setState({
        sizePerPageTemp: this.props.sizePerPageTemp_DocumentAddnewDataTable,
      });
    }
    if (
      prevProps.pageTemp_DocumentAddnewDataTable !==
      this.props.pageTemp_DocumentAddnewDataTable
    ) {
      this.setState({
        pageTemp: this.props.pageTemp_DocumentAddnewDataTable,
      });
    }
    if (
      prevProps.doHideShowAddnewdocDilogStatus !==
      this.props.doHideShowAddnewdocDilogStatus
    ) {
      this.setState({
        primary: this.props.doHideShowAddnewdocDilogStatus,
        doHideShowAddnewdocDilogStatus: this.props
          .doHideShowAddnewdocDilogStatus,
      });
    }
    if (
      prevProps.selected_DocumentAddnewPK !==
      this.props.selected_DocumentAddnewPK
    ) {
      this.setState({
        selected_DocumentAddnewPK: this.props.selected_DocumentAddnewPK,
      });
    }

    if (
      prevProps.forceReloadDocumentAddnewDataTable !==
      this.props.forceReloadDocumentAddnewDataTable
    ) {
      this.setState(
        {
          forceReloadDocumentAddnewDataTable: this.props
            .forceReloadDocumentAddnewDataTable,
        },
        () => {
          this.loadDataTable();
        }
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
        { text: "All", value: this.state.totalCount_DataSet },
      ],
      sizePerPage: this.state.sizePerPageTemp,
      pageStartIndex: 1,
      //paginationSize: 5,
      paginationShowsTotal: this.renderShowsTotal,
      alwaysShowAllBtns: true,
      onPageChange: this.onPageChange.bind(this),
      onSizePerPageList: this.sizePerPageListChange.bind(this),
      clearSearch: false,
      searchField: this.searchBlock,
    };

    return (
      <Card>
        <CardHeader>
          <Button
            color="primary"
            className="btn-info bg-light-blue btn-brand mr-1 mb-1 float-right"
            onClick={this.addSelectedDocumentToList}
          >
            <i className="fa fa-plus"></i>
            <span>Add Selected Document to the List</span>
          </Button>

          <Button
            color="warning"
            onClick={this.props.togglePrimary}
            className="btn-brand mr-1 mb-1 float-left"
          >
            Cancel
          </Button>
        </CardHeader>
        <CardBody>
          <Form
            id="formToSubmitDocumentAddNewList"
            ref="formToSubmitDocumentAddNewList"
          >
            <BootstrapTable
              data={this.state.DataSet}
              version="4"
              //   striped
              hover
              condensed
              pagination
              search
              remote
              fetchInfo={{ dataTotalSize: this.state.totalCount_DataSet }}
              options={options}
              containerStyle={{ height: "100% !important" }}
              bodyContainerClass={
                "react-bs-container-body-dochandler-documentlistaddnew"
              }
            >
              <TableHeaderColumn
                dataField="n_PRDocListPK"
                isKey={true}
                dataFormat={this.textToCheckBox.bind(this)}
                width="15%"
              ></TableHeaderColumn>

              <TableHeaderColumn dataField="s_PRFormName" width="30%">
                Form Name
              </TableHeaderColumn>
              <TableHeaderColumn dataField="s_FormGroupCode" width="20%">
                Form Group Code
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="s_PRDocFileName"
                width="30%"
                dataFormat={this.displayFileName.bind(this)}
              >
                File Name
              </TableHeaderColumn>
              <TableHeaderColumn dataField="s_DocFileType" width="20%">
                File Type
              </TableHeaderColumn>
            </BootstrapTable>
          </Form>
        </CardBody>
        <CardFooter>
          <Button
            color="primary"
            className="btn-info bg-light-blue btn-brand mr-1 mb-1 float-right"
            onClick={this.addSelectedDocumentToList}
          >
            <i className="fa fa-plus"></i>
            <span>Add Selected Document to the List</span>
          </Button>

          <Button
            color="warning"
            onClick={this.props.togglePrimary}
            className="btn-brand mr-1 mb-1 float-left"
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    );
  }
}

DocumentlistAddnew.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  pageTemp_DocumentAddnewDataTable:
    state.docHandlerProcess.pageTemp_DocumentAddnewDataTable,
  sizePerPageTemp_DocumentAddnewDataTable:
    state.docHandlerProcess.sizePerPageTemp_DocumentAddnewDataTable,
  DataSet_DocumentAddnewDataTable:
    state.docHandlerProcess.DataSet_DocumentAddnewDataTable,
  totalCount_DataSet_DocumentAddnewDataTable:
    state.docHandlerProcess.totalCount_DataSet_DocumentAddnewDataTable,
  selected_ProductPK: state.docHandlerProcess.selected_ProductPK,
  /*JSON.stringify(state.docHandlerProcess.selected_ProductPK)*/

  selected_DoctypePK: state.docHandlerProcess.selected_DoctypePK,
  /*JSON.stringify(state.docHandlerProcess.selected_DoctypePK)*/

  doHideShowAddnewdocDilogStatus:
    state.docHandlerProcess.doHideShowAddnewdocDilogStatus,
  selected_DocumentAddnewPK: state.docHandlerProcess.selected_DocumentAddnewPK,
  forceReloadDocumentAddnewDataTable:
    state.docHandlerProcess.forceReloadDocumentAddnewDataTable,
});

export default connect(mapStateToProps)(DocumentlistAddnew);
