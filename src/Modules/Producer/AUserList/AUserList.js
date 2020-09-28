import React, { Component } from 'react';
import { connect } from 'react-redux'
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
import {BootstrapTable, TableHeaderColumn, TableDataSet} from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';

class AUserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      AUserData_arr:[]
    };
    //rest api endpoint
    this.api = process.env.REACT_APP_API_URL+'/api/v1/agency';

  }

  // getAUserDetailsData = (n_PersonInfoId_FK) => {

  //   const {agencyId} = this.props;
  //   var url = `${this.api}/${agencyId}/showAUserDetails/${n_PersonInfoId_FK}`;
  //   this.props.handleDetailLoadingState(true);
  //   this.props.showAUserDetailsRequest(url)
  //   .then(() => {
  //     this.props.handleDetailLoadingState(false);
  //   })
  //   .catch((err) => {
  //     this.props.handleDetailLoadingState(false);
  //   });
  // }
  componentDidMount(){
    //this.props.setClick(this.reloadAUserTable);
    this.setState({
      AUserData_arr: this.props.AUserData_arr
    });
  }

  static getDerivedStateFromProps(nextProps, prevState){
    // this.props.setClick(this.reloadAUserTable);
    if(nextProps.AUserData_arr !== prevState.AUserData_arr){
      return { AUserData_arr: nextProps.AUserData_arr };
    }else{
      return null;
    }
  }

  //from AUsers
  reloadAUserTable = () => {
    this.setState({
      AUserData_arr: this.props.AUserData_arr
    });
  }
  // just an example
  productLink = (cell, row, enumObject, rowIndex) => {
    return (
      <NavLink href="#" style={{ padding: "0px" }} onClick={() => this.props.getAUserDetailsData(row.n_PersonInfoId_FK)}>
          {row.Username}
      </NavLink>
    );
  }
  screenNameFormatter = (cell, row) => {
    return (
      <span>
        {row.s_ScreenName}
      </span>
    );
  }
  appCodeNameFormatter = (cell, row) => {
    return (
      <span>
        {row.s_AppCodeName}
      </span>
    );
  }
  userLevelFormatter = (cell, row) => {
    return (
      <span>
        {row.UserLevel_Name}
      </span>
    );
  }
  render() {
    const {
      AUserData_arr,
    } = this.state;
    return (
      <div>
        <Card>
          <CardBody>
            {AUserData_arr  &&
              <BootstrapTable data={AUserData_arr} version="4" striped hover pagination search tabIndexCell >
                <TableHeaderColumn isKey  dataField="Username" dataFormat={this.productLink} dataSort >USER ID</TableHeaderColumn>
                <TableHeaderColumn dataField="s_ScreenName" dataFormat={this.screenNameFormatter} dataSort >SCREEN NAME</TableHeaderColumn>
                <TableHeaderColumn width="10%" dataField="s_AppCodeName" dataFormat={this.appCodeNameFormatter} dataSort >STATUS</TableHeaderColumn>{/*s_FileName*/}
                <TableHeaderColumn dataField="UserLevel_Name" dataFormat={this.userLevelFormatter} dataSort>LEVEL</TableHeaderColumn>
              </BootstrapTable>
            }
          </CardBody>
        </Card>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   // AUserData_arr: state.Producer.AUserData_arr,
//   agencyId: state.Producer.agencyId,
// })

// const mapDispatchToProps = dispatch => ({
//     // handleDetailLoadingState: (url) => dispatch(ProducerService.handleDetailLoadingState(url)),//Origin
//     // showAUserDetailsRequest: (url) => dispatch(ProducerService.showAUserDetailsRequest(url))//Origin
// });

export default AUserList;
