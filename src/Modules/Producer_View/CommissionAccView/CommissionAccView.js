import React, { Component } from 'react';
import { connect } from 'react-redux'
import Http from '../../../Http';
import ProducerService from '../../../services/Producer';

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
  Dropdown,
  Nav, NavItem,
  NavLink,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';

import CommissionAccViewDetail from '../CommissionAccViewDetail';

class CommissionAccView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDetailLoading: false,
      agencyId: this.props.agencyId,
    };
    //
    this.options = {
      sortIndicator: true,
      // hideSizePerPage: true,
      sizePerPageTemp: 10,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    }
    //rest api endpoint
    this.api = process.env.REACT_APP_API_URL+'/api/v1/agency';
  }

  getAccViewDetails = (n_PATransactionMaster_PK, action) => {

    const {agencyId} = this.state;
    var url = `${this.api}/${agencyId}/showCommAccDetails/${n_PATransactionMaster_PK}`;
    this.setState({isDetailLoading:true});
    // dispatch(ProducerService.showCommAccViewRequest({pageNumber, url}))
    this.props.showCommAccDetailsRequest(url)
    .then(() => {
      this.setState({ isDetailLoading: false});
    })
    .catch((err) => {
      this.setState({ isDetailLoading: false });
    });
  }


  // just an example
  accViewLink = (cell, row, enumObject, rowIndex) => {
    return (
      <NavLink href="#" style={{ padding: "0px" }} onClick={() => this.getAccViewDetails(row.n_PATransactionMaster_PK, 'DATA')}>
          {row.s_TransRefNo}
      </NavLink>
    );
  }

  // format currency (ex:$3,300.33)
  currencyFormat(amount) {
    return new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                  maximumFractionDigits: 2,
                                }).format(amount);

  };

  unPriceFormatter(cell, row, enumObject, rowIndex) {
    return (
        <div
          style={{color: cell < 0 ? 'red' : ''}}
        >
            {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                  maximumFractionDigits: 2,
                                }).format(Math.abs(cell < 0 ? cell : 0))}
        </div>
    )
  }
  debitPriceFormatter(cell, row, enumObject, rowIndex) {
    return (
        <div>
            {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                  maximumFractionDigits: 2,
                                }).format(Math.abs(cell > 0 ? cell : 0))}
        </div>
    )
  }
  creditPriceFormatter(cell, row, enumObject, rowIndex) {
    return (
        <div
          style={{color: cell < 0 ? 'red' : ''}}
        >
            {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                  maximumFractionDigits: 2,
                                }).format(Math.abs(cell < 0 ? cell : 0))}
        </div>
    )
  }

  balancePriceFormatter(cell, row, enumObject, rowIndex) {
    return (
        <div
          style={{color: cell < 0 ? 'red' : ''}}
        >
            {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                  maximumFractionDigits: 2,
                                }).format(Math.abs(cell < 0 ? cell : 0))}
        </div>
    )
  }

  dateFormatter1 = (cell) => {
    var dt = new Date(cell);
    return (
      <span>
        {(
          dt.getMonth()+1).toString().padStart(2, '0')}-{
        dt.getDate().toString().padStart(2, '0')}-{
        dt.getFullYear().toString().padStart(4, '0')}
      </span>
    );
  }
  dateFormatter2 = (cell) => {
    var dt = new Date(cell);
    return (
      <span>
        {(
          dt.getMonth()+1).toString().padStart(2, '0')}-{
        dt.getDate().toString().padStart(2, '0')}-{
        dt.getFullYear().toString().padStart(4, '0')} {
        dt.getHours().toString().padStart(2, '0')}:{
        dt.getMinutes().toString().padStart(2, '0')}:{
        dt.getSeconds().toString().padStart(2, '0')}
      </span>
    );
  }
  render() {
    const {
      accView_arr,
      isLoading,
    } = this.props;

    return (
      <div className="animated fadeIn">
        {isLoading?
          <div className="sk-double-bounce">
            <div className="sk-child sk-double-bounce1"></div>
            <div className="sk-child sk-double-bounce2"></div>
          </div>
        :
          accView_arr &&
          <>
            <BootstrapTable isKey={false} data={accView_arr} version="4" striped hover pagination search tabIndexCell >
              <TableHeaderColumn width="10%" dataField="d_AccountingDate" dataSort dataFormat={this.dateFormatter1} >ACC DT.</TableHeaderColumn>
              <TableHeaderColumn width="15%" dataField="OriginalTranType">TRAN TYPE</TableHeaderColumn>
              <TableHeaderColumn width="15%" isKey dataField="s_TransRefNo" dataFormat={this.accViewLink} >TRAN REF</TableHeaderColumn>
              <TableHeaderColumn dataField="n_Unallocatedamount" dataFormat={this.unPriceFormatter} >UNALLOCATED</TableHeaderColumn>
              <TableHeaderColumn dataField="n_Amount" dataFormat={this.debitPriceFormatter} >DEBIT</TableHeaderColumn>
              <TableHeaderColumn dataField="n_Amount" dataFormat={this.creditPriceFormatter} >CREDIT</TableHeaderColumn>
              <TableHeaderColumn dataField="n_Amount" dataFormat={this.creditPriceFormatter} >BALANCE</TableHeaderColumn>
              <TableHeaderColumn width="20%" dataField="d_CreatedDate" dataFormat={this.dateFormatter2} tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>SYSTEM DT.</TableHeaderColumn>
              {/*<TableHeaderColumn dataField="" dataFormat={this.priceFormatter}>Action</TableHeaderColumn>*/}
            </BootstrapTable>
            <CommissionAccViewDetail
              isDetailLoading = {this.state.isDetailLoading}
            />
          </>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accView_arr: state.Producer.commData_arr.accMaster
})

const mapDispatchToProps = dispatch => ({//accountledger
    showCommAccDetailsRequest: (url) => dispatch(ProducerService.showCommAccDetailsRequest(url))//Origin
});

export default connect(mapStateToProps, mapDispatchToProps)(CommissionAccView)
