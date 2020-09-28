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

class CommissionAccViewDetail extends Component {
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
      accViewDetail_arr,
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
          accViewDetail_arr &&
          <BootstrapTable data={accViewDetail_arr} version="4" striped hover pagination search tabIndexCell >
            <TableHeaderColumn width="15%" dataField="s_SubtypeScreenName" dataSort >TRANS SUB TYPE</TableHeaderColumn>
            <TableHeaderColumn dataField="n_Unallocatedamount">UNALLOCATED</TableHeaderColumn>
            <TableHeaderColumn isKey dataField="n_Amount">DEBIT</TableHeaderColumn>
            <TableHeaderColumn dataField="n_Amount">CREDIT</TableHeaderColumn>
            <TableHeaderColumn dataField="s_AccountID">CONTRA ACCOUNT</TableHeaderColumn>
          </BootstrapTable>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accViewDetail_arr: state.Producer.commAccDetail_arr
})


export default connect(mapStateToProps)(CommissionAccViewDetail)