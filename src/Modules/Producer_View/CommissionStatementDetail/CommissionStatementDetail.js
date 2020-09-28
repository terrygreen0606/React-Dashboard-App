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

class CommissionStatementDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
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

  amtPriceFormatter(cell) {
    return (
      <div
          style={{color: cell < 0 ? 'red' : ''}}
        >
            {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                  maximumFractionDigits: 2,
                                }).format(Math.abs(cell < 0 ? cell : cell))}
        </div>
    )
  }

  render() {
    const {
      stmtDetail_arr,
      isDetailLoading,
    } = this.props;

    return (
      <div className="animated fadeIn">
        {isDetailLoading?
          <div className="sk-double-bounce">
            <div className="sk-child sk-double-bounce1"></div>
            <div className="sk-child sk-double-bounce2"></div>
          </div>
        :
          stmtDetail_arr &&
          <BootstrapTable data={stmtDetail_arr} version="4" striped hover pagination search tabIndexCell >
            <TableHeaderColumn width="15%" dataField="AccountNo" >ACCT NO.</TableHeaderColumn>
              <TableHeaderColumn isKey dataField="PolicyNo" dataFormat={this.getStmtLink}>POLICY NO</TableHeaderColumn>
              <TableHeaderColumn dataField="s_StatementDetailCode">TRANSACTION</TableHeaderColumn>
              <TableHeaderColumn dataField="n_CommissionRate">COMM %</TableHeaderColumn>
              <TableHeaderColumn dataField="n_PostedCommAmount" dataFormat={this.amtPriceFormatter}>COMM AMT</TableHeaderColumn>
              <TableHeaderColumn dataField="n_CommBaseAmt" dataFormat={this.amtPriceFormatter}>PREM/WRITTEN</TableHeaderColumn>
          </BootstrapTable>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stmtDetail_arr: state.Producer.commStmtDetail_arr
})


export default connect(mapStateToProps)(CommissionStatementDetail)
