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
            <TableHeaderColumn dataField="s_FullLegalName" dataSort>INSURED NAME</TableHeaderColumn>
            <TableHeaderColumn dataField="d_TermStartDate" dataSort>TERM ST.</TableHeaderColumn>
            <TableHeaderColumn dataField="d_TermEndDate" dataSort>TERM END</TableHeaderColumn>
            <TableHeaderColumn dataField="s_PRTranTypeCode" dataSort>TRANSACTION</TableHeaderColumn>
            <TableHeaderColumn dataField="AgencyName" dataSort>AGENCY</TableHeaderColumn>
            <TableHeaderColumn dataField="n_CommissionRateOriginal" dataSort>COM.%.</TableHeaderColumn>
            <TableHeaderColumn dataField="n_TransactionCommissionDue" dataSort>COM.AMT.</TableHeaderColumn>
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