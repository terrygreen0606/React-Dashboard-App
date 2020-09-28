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
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { AppSwitch } from "@coreui/react";
import { showDataTableTotalText } from "../../../services/commanServices";
import * as docUploaderServicesObj from "../../../services/documentUploaderServices";


class DocumentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTemp: this.props.pageTemp_DocumentDataTable,
      sizePerPageTemp: this.props.sizePerPageTemp_DocumentDataTable,
      searchKey: "",
      DataSet: [],
      totalCount_DataSet: 0,      
      forceReloadDocumentDataTable: this.props.forceReloadDocumentDataTable,
    };
    //-----------
    this.loadDataTable = this.loadDataTable.bind(this);
    this.onKeyUpSearchHandler = this.onKeyUpSearchHandler.bind(this);
    this.onClickClearSearchHandler = this.onClickClearSearchHandler.bind(this);
    this.searchBlock = this.searchBlock.bind(this);
    this.handleChangeOfInputs = this.handleChangeOfInputs.bind(this);
    this.timeout = 0; //Mandatory for Searching in Datatable

    
  }

  loadDataTable() {
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

    this.props.dispatch(
      docUploaderServicesObj.loadDocumentDataTableServices(params)
    );
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
          name={`DoctypeRowId[${row.DocInfo_PK}]`}
          id={`DoctypeRowId[${row.DocInfo_PK}]`}
          onChange={(e) => this.getSelectedRowDetails(e, row)}
        />
      </div>
    );
  };

  displayFileName = (cell, row, enumObject, rowIndex) => {
    return (
      <div>
        <NavLink href="#" style={{ padding: "0px", color: "#1454a8" }}>
          {row.Doc_OriginalName}
        </NavLink>
      </div>
    );
  };

  getSelectedRowDetails = (e, row) => {
    //console.log(e.target.checked+"inside click Finsh "+row.DocInfo_PK);
    const arrayVariable = {
      actionTaken: e.target.checked,
      itemSelected: row.DocInfo_PK,
    };
    this.props.dispatch(
      //docHandlerServicesObjdocHandlerServicesObj.getSelectedDocumentID_Services(arrayVariable)
    );
  };

  

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.forceReloadDocumentDataTable !==
      prevState.forceReloadDocumentDataTable
    ) {
      return {
        forceReloadDocumentDataTable: nextProps.forceReloadDocumentDataTable,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.DataSet_DocumentDataTable !==
      this.props.DataSet_DocumentDataTable
    ) {
      this.setState(
        {
          DataSet: this.props.DataSet_DocumentDataTable,
          //searchKey:''
        } /*,() => {this.loadDataTable();}*/
      );
    }
    if (
      prevProps.totalCount_DataSet_DocumentDataTable !==
      this.props.totalCount_DataSet_DocumentDataTable
    ) {
      this.setState({
        totalCount_DataSet: this.props.totalCount_DataSet_DocumentDataTable,
      });
    }
    if (
      prevProps.sizePerPageTemp_DocumentDataTable !==
      this.props.sizePerPageTemp_DocumentDataTable
    ) {
      this.setState({
        sizePerPageTemp: this.props.sizePerPageTemp_DocumentDataTable,
      });
    }
    if (
      prevProps.pageTemp_DocumentDataTable !==
      this.props.pageTemp_DocumentDataTable
    ) {
      this.setState({
        pageTemp: this.props.pageTemp_DocumentDataTable,
      });
    }

    if (
      prevProps.forceReloadDocumentDataTable !==
      this.props.forceReloadDocumentDataTable
    ) {
      this.setState(
        {
          forceReloadDocumentDataTable: this.props.forceReloadDocumentDataTable,
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
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="icon-menu"></i>Document List            
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
                pagination
                search
                remote
                fetchInfo={{ dataTotalSize: this.state.totalCount_DataSet }}
                options={options}
                containerStyle={{ height: "100% !important" }}
                bodyContainerClass={
                  "react-bs-container-body-dochandler-documentlist"
                }
              >
                {/* <TableHeaderColumn
                dataField="n_PRDocListPK"                
                isKey={true}
                dataFormat={this.textToCheckBox.bind(this)}
                width="15%"
              >
              </TableHeaderColumn> */}
                <TableHeaderColumn
                  isKey={true}
                  dataField="s_UserModuleName"
                  width="30%"
                >
                  Module Name
                </TableHeaderColumn>
                <TableHeaderColumn dataField="s_AppCodeNameForDisplay" width="20%">
                  Doc Type
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="Doc_OriginalName"
                  width="30%"
                  dataFormat={this.displayFileName.bind(this)}
                >
                  File Name
                </TableHeaderColumn>
                <TableHeaderColumn dataField="UploadDate" width="20%">
                  Upload Date
                </TableHeaderColumn>
              </BootstrapTable>
            </Form>
          </CardBody>
        </Card>

        {/* Part of Model body       */}
        {/* <DocumentlistAddnew /> */}
      </div>
    );
  }
}

DocumentList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  pageTemp_DocumentDataTable:
    state.docHandlerProcess.pageTemp_DocumentDataTable,
  sizePerPageTemp_DocumentDataTable:
    state.docHandlerProcess.sizePerPageTemp_DocumentDataTable,
  DataSet_DocumentDataTable: state.docHandlerProcess.DataSet_DocumentDataTable,
  totalCount_DataSet_DocumentDataTable:
    state.docHandlerProcess.totalCount_DataSet_DocumentDataTable,
  forceReloadDocumentDataTable:
    state.docHandlerProcess.forceReloadDocumentDataTable,
});

export default connect(mapStateToProps)(DocumentList);
