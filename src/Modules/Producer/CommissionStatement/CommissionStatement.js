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

import CommissionStatementDetail from '../CommissionStatementDetail';

class CommissionStatement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agencyId: this.props.agencyId,
      isDetailLoading: false,
    };
    //rest api endpoint
    this.api = process.env.REACT_APP_API_URL+'/api/v1/agency';
  }

  getStmtDetails = (n_PAAgentStatementMaster_PK, action) => {
      
    const {agencyId} = this.state;
    var url = `${this.api}/${agencyId}/showCommStmtDetails/${n_PAAgentStatementMaster_PK}`;
    this.setState({isDetailLoading:true});
    // dispatch(ProducerService.showCommAccViewRequest({pageNumber, url}))
    this.props.showCommStmtDetailsRequest(url)
    .then(() => {
      this.setState({ isDetailLoading: false});  
    })
    .catch((err) => {
      this.setState({ isDetailLoading: false });
    });
  }


  // just an example
  getStmtLink = (cell, row, enumObject, rowIndex) => {
    return (
      <NavLink href="#" style={{ padding: "0px" }} onClick={() => this.getStmtDetails(row.n_PAAgentStatementMaster_PK, 'DATA')}>
          {row.s_StatementNo}
      </NavLink>
    );
  }

  balancePriceFormatter(cell) {
    return (
        <div
          style={{color: 'red'}}
        >
          {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                                maximumFractionDigits: 2,
                              }).format(cell)}
        </div>
    )
  }

  pdfStringFormatter(cell) {
    return (
      <NavLink href="#" style={{ padding: "0px", color: "blue" }} >
          STATEMENT
      </NavLink>
    )
  }

  
  render() {
    const {
      commStmt_arr,
      isLoading,
    } = this.props;
    
    return (
      <div className="animated fadeIn">
        {isLoading 
        ?
          <div className="sk-double-bounce">
            <div className="sk-child sk-double-bounce1"></div>
            <div className="sk-child sk-double-bounce2"></div>
          </div>
        :
          commStmt_arr &&
          <>
            <BootstrapTable data={commStmt_arr} version="4" striped hover pagination search tabIndexCell >
              <TableHeaderColumn width="15%" dataField="d_StatementDate" >STATEMENT DATE</TableHeaderColumn>
              <TableHeaderColumn isKey dataField="s_StatementNo" dataFormat={this.getStmtLink}>STATEMENT NO</TableHeaderColumn>
              <TableHeaderColumn dataField="n_StatementCommAmt" dataFormat={this.amtPriceFormatter}>TOTAL AMOUNT</TableHeaderColumn>
              <TableHeaderColumn dataField="" dataFormat={this.pdfStringFormatter}>PDF</TableHeaderColumn>
            </BootstrapTable>
            <CommissionStatementDetail
              isDetailLoading = {this.state.isDetailLoading}
            />
          </>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  commStmt_arr: state.Producer.commData_arr.stmtArr
})

const mapDispatchToProps = dispatch => ({//accountledger
    showCommStmtDetailsRequest: (url) => dispatch(ProducerService.showCommStmtDetailsRequest(url))//Origin
});


export default connect(mapStateToProps, mapDispatchToProps)(CommissionStatement)