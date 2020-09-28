import React, { Component } from 'react';
import { connect } from 'react-redux'
import Http from '../../../Http';
import ProducerService from '../../../services/Producer';
import {
  Card,
  CardBody,
} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';

class ULogs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      ULog_arr: [],
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
    //rest api endpoint
    this.api = process.env.REACT_APP_API_URL+'/api/v1/agency';
  }
  
  componentDidUpdate(prevProps, prevState){
    if (this.props.tabId !== prevProps.tabId) {
      if(this.props.tabId == '6'){
        this.getULogData();
      }
    }
  }

  getULogData = () => {
    this.setState({isLoading: true});
    const {
      agencyId
    } = this.props;

    Http.get(`${this.api}/${agencyId}/showUpdatedLogs`)
    .then((response) => {
      const { data } = response.data;
      this.setState({
        isLoading: false,
        ULog_arr: data.ULog_arr,
        error: false,
      });
    })
    .catch(() => {
      this.setState({
        isLoading: false,
        error: 'Unable to fetch data.',
      });
    });
  }

  indexN = (cell, row, enumObject, index) => {
    return (<div>{index+1}</div>) 
  }

  render() {
    const {
      isLoading, 
      ULog_arr,
    } = this.state;
    return (
      <div className="animated fadeIn">
        {isLoading 
        ?
          <div className="sk-double-bounce">
            <div className="sk-child sk-double-bounce1"></div>
            <div className="sk-child sk-double-bounce2"></div>
          </div>
        :      
          <Card>
            <CardBody>
              <BootstrapTable size="sm" data={ULog_arr} version="4" striped hover pagination search tabIndexCell options={this.options}>
                <TableHeaderColumn width="10%" dataSort dataFormat={this.indexN} >No</TableHeaderColumn>
                <TableHeaderColumn dataField="s_ChangesData" dataSort dataFormat={this.nameFormat} >CHANGES DATA</TableHeaderColumn>
                <TableHeaderColumn isKey width="10%" dataField="UpdateUser">UPDATE USER</TableHeaderColumn>
                <TableHeaderColumn width="15%" dataField="d_UpdatedDate" dataSort>UPDATED DATED</TableHeaderColumn>
              </BootstrapTable>
            </CardBody>
          </Card>
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

export default connect(mapStateToProps)(ULogs);