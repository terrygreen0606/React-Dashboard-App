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
  componentDidMount() {
    this.getLogData();
  }
  componentDidUpdate(prevProps, prevState){
    if (this.props.agencyId !== prevProps.agencyId) {
      this.getLogData();
    }
  }

  getLogData = () => {
    const { dispatch } = this.props;
    var pageNumber  = 1;
    const {agencyId} = this.props;
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

  dateFormatter = (cell, row) => {
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

  setNotes = (cell, row) => {
    return cell == '' ? '' : cell;
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
                  <TableHeaderColumn width="15%" dataField="d_PaActivityLogDate" dataSort dataFormat={this.dateFormatter} >DATE</TableHeaderColumn>
                  <TableHeaderColumn isKey dataField="s_PaActivityLogNotes" tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} dataFormat={this.setNotes}>DESCRIPTION</TableHeaderColumn>
                  <TableHeaderColumn width="11%" dataField="s_ScreenName" dataSort>INSERTED BY</TableHeaderColumn>
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

