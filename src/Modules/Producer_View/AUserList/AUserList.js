import React, { Component } from 'react';

import {
  Card,
  CardBody,
  NavLink,
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
    // this.props.setClick(this.reloadAUserTable);
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
              <TableHeaderColumn isKey width="25%" dataField="Username" dataFormat={this.productLink} dataSort >USER ID</TableHeaderColumn>
              <TableHeaderColumn width="30%" dataField="s_ScreenName" dataFormat={this.screenNameFormatter} dataSort tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>SCREEN NAME</TableHeaderColumn>
              <TableHeaderColumn  dataField="s_AppCodeName" dataFormat={this.appCodeNameFormatter} dataSort tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>STATUS</TableHeaderColumn>{/*s_FileName*/}
              <TableHeaderColumn width="25%" dataField="UserLevel_Name" dataFormat={this.userLevelFormatter} dataSort>LEVEL</TableHeaderColumn>
            </BootstrapTable>
            }
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default AUserList;
