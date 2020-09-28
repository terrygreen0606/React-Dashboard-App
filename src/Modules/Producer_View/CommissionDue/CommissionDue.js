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

class CommissionDue extends Component {
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
      <div>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 2,
        }).format(Math.abs(cell > 0 ? cell : 0))}
      </div>
    )
  }

  render() {
    const {
      due_arr,
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
          due_arr &&
          <BootstrapTable data={due_arr} version="4" striped hover pagination search tabIndexCell >
            <TableHeaderColumn isKey width="15%" dataField="Policy_No" dataSort >ACCT NO.</TableHeaderColumn>
            <TableHeaderColumn width="20%" dataField="s_FullLegalName" dataSort tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>INSURED NAME</TableHeaderColumn>
            <TableHeaderColumn width="12%" dataField="d_TermStartDate" dataSort>TERM ST.</TableHeaderColumn>
            <TableHeaderColumn width="12%" dataField="d_TermEndDate" dataSort>TERM END</TableHeaderColumn>
            <TableHeaderColumn width="15%" dataField="s_PRTranTypeCode" dataSort>TRANSACTION</TableHeaderColumn>
            <TableHeaderColumn width="15%" dataField="AgencyName" dataSort tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>AGENCY</TableHeaderColumn>
            <TableHeaderColumn width="10%" dataField="n_CommissionRateOriginal" dataSort>COM.%.</TableHeaderColumn>
            <TableHeaderColumn width="12%" dataField="n_TransactionCommissionDue" dataSort dataFormat={this.amtPriceFormatter}>COM.AMT.</TableHeaderColumn>
          </BootstrapTable>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  due_arr: state.Producer.commData_arr.stmtTempArr
})


export default connect(mapStateToProps)(CommissionDue)
