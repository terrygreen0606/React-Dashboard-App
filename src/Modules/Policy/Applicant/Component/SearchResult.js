import React, { Component } from 'react';

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

import SearchResultData from '../TestData/SearchResultData';
import { convertDateMMDDYYYY, makeDataTableActionLink, showDataTableTotalText } from "../../../../services/commanServices";

class SearchResult extends Component {
  constructor (props) {
    super(props);
    this.actionsButtons = this.actionsButtons.bind(this);
    this.state = {
      pageTemp: 1,
      sizePerPageTemp: 10,
      isDataFetched: true
    }
  }

  _setTableOption() {
    if (this.state.isDataFetched) {
      return "No policies found";
    } else {
      return (
        <div className="animated fadeIn pt-1 text-center">Loading...</div>
      );
    }
  }

  actionsButtons(cell, row) {
    return makeDataTableActionLink(cell, row);
  }

  renderShowsTotal(start, to, total) {
    return showDataTableTotalText(start, to, total);
  }

  sizePerPageListChange(sizePerPage) {
    this.setState({ sizePerPageTemp: sizePerPage }, () => {
      const params = this.getSearchParams();
      this.filterTable(params);
    });
  }


  onPageChange(page, sizePerPage) {
    this.setState({ pageTemp: page, sizePerPage }, () => {
      const params = this.getSearchParams();
      this.filterTable(params);
    });
  }

  render () {
    const options = {
      page: this.state.pageTemp,  // which page you want to show as default
      sizePerPageList: [
        { text: '10', value: 10 },
        { text: '20', value: 20 },
        { text: '25', value: 25 },
        { text: '30', value: 30 },
        { text: '50', value: 50 }
      ], // you can change the dropdown list for size per page
      sizePerPage: this.state.sizePerPageTemp,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      onPageChange: this.onPageChange.bind(this),
      onSizePerPageList: this.sizePerPageListChange.bind(this),
      noDataText: this._setTableOption(),
    };
    return (
      <BootstrapTable data={SearchResultData} remote={true} striped hover options={options} pagination={true} fetchInfo={{ dataTotalSize: SearchResultData.length }}>
        <TableHeaderColumn isKey dataField="d_DateSubmitted" dataSort>Submit Dt.</TableHeaderColumn>
        <TableHeaderColumn dataField="s_ProductName" dataSort={true}>Policy Type</TableHeaderColumn>
        <TableHeaderColumn dataField="s_POAppNo" dataSort dataFormat={this.actionsButtons}>Policy No</TableHeaderColumn>
        <TableHeaderColumn dataField="InsuredName" dataSort>Insured Name</TableHeaderColumn>
        <TableHeaderColumn dataField="s_AppStatus" dataSort width="90">Status</TableHeaderColumn>
        <TableHeaderColumn dataField="s_AppCodeNameForDisplay" headerAlign='left' dataAlign='right' dataSort>Remark</TableHeaderColumn>
        <TableHeaderColumn dataField="AgentName" dataSort>Agent</TableHeaderColumn>
        <TableHeaderColumn dataField="AgencyName" dataSort>Agency</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

export default SearchResult;