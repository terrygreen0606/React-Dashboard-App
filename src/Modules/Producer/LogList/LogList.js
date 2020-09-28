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

class LogList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading:false,
      agencyId: this.props.agencyId,
      collapse: true,
      fadeIn: true,
      timeout: 300,
      Log_arr: [],
      filter: "",
    };

    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: false,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    }
    // this.searchRef = React.createRef();
    //rest api endpoint
    this.api = process.env.REACT_APP_API_URL+'/api/v1/agency';
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.tabId !== prevProps.tabId) {
      if(this.props.tabId == '5'){
        this.getLogData();
      }
    }
  }

  getLogData = () => {
    const { dispatch } = this.props;
    var pageNumber  = 1;
    const {agencyId} = this.state;
    var url = `${this.api}/${agencyId}/showLogs/AGENCYLOG,AGENCYCLOSELOG`;
    this.setState({isLoading:true});
    dispatch(ProducerService.showLogsRequest({pageNumber, url}))
    .then(() => {

      this.setState({ isLoading: false});
    })
    .catch((err) => {

      this.setState({ isLoading: false });
    });
  }

  handleSearchText = (e) => {
    var filter = e.target.value;
    console.log(filter);
    this.setState({
      filter,
    });
  }

  handleSearch = () => {
    var {filter} = this.state;
    if( filter == ""){
      return;
    }else{

    }
  }

  render() {
    const {
      isLoading,
      filter,
    } = this.state;
    const {
      Log_arr,
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
        <>
          <Row>
            <CardBody>
              <BootstrapTable data={Log_arr.filter((Log) => Log.s_PaActivityLogNotes.indexOf(filter) >= 0 || filter == "")} version="4" striped hover pagination search tabIndexCell options={this.options}>
                <TableHeaderColumn width="20%" dataField="d_PaActivityLogDate" dataSort dataFormat={this.nameFormat} >DATE</TableHeaderColumn>
                <TableHeaderColumn isKey dataField="s_PaActivityLogNotes">DESCRIPTION</TableHeaderColumn>
                <TableHeaderColumn width="10%" dataField="s_ScreenName" dataSort>INSERTED BY</TableHeaderColumn>
              </BootstrapTable>
            </CardBody>
          </Row>
        </>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  agencyId: state.Producer.agencyId,
  tabId: state.Producer.tabId,
  Log_arr: state.Producer.data
})

export default connect(mapStateToProps)(LogList)

