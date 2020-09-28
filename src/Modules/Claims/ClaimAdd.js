import React, {useState, useEffect} from 'react';
import Moment from 'react-moment';
import {Link } from 'react-router-dom';
import {Card, CardHeader, CardBody, Col, Row} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {useHttp} from '../../services/claimService';
import {PolicySearchPanel} from './components/ClaimIntakeComponents/PolicySearchPanel';
import Dailyclaimcount from "./components/ClaimSearchComponents/DailyClaimCount";
import ClaimStatusDoughnut from "./components/ClaimSearchComponents/ClaimStatusDoughnut";
import ClaimStatusDoughnutConfig from "./components/ClaimSearchComponents/ClaimStatusDoughnutConfig";

const ClaimAdd = props => {

  const [filter, setFilter] = useState({
    Risk_Id: '',
    s_LastOrganizationName: '',
    s_FirstName:''
  });
  const [searchID, setSearchID] = useState(0);

  const filterHandler = event => {
    const newFilter = {...filter};
    newFilter[event.target.name] = event.target.value;
    setFilter(newFilter);
  }


  var searchCriteria = "search_criteria=ADD_CLAIM";
  if(filter.Risk_Id){
    searchCriteria += "&policy_no="+filter.Risk_Id;
  }

  if(filter.s_FirstName){
    searchCriteria += "&first_name="+filter.s_FirstName;
  }

  if(filter.s_LastOrganizationName){
    searchCriteria += "&last_name="+filter.s_LastOrganizationName;
  }
  
  const [isLoading, fetchedData] = useHttp(process.env.REACT_APP_API_URL+'/api/v1/searchClaim?'+searchCriteria, [searchID]);
  const claims = searchID && fetchedData ? fetchedData.data : [];

  const options = {
    noDataText: (<i>No data</i>),
    clearSearch: true,
    alwaysShowAllBtns: false,
    withFirstAndLast: false
  }

  const policyFormat = (cell, row) => {
    return <Link to={`/claims/intake/${row.Policy_No}`}>{cell}</Link>
  }

  let content = <><CardBody><i className="fa fa-spinner fa-spin"></i><span style={{paddingLeft:'15px'}}>Loading data...</span></CardBody></>;

  if (!isLoading && claims ) {
    content = (
      <BootstrapTable data={claims} version="4" borderless striped hover pagination search_ options={options} className="table-sm">
          <TableHeaderColumn dataField="Policy_No" isKey={true} dataSort={true} dataFormat={policyFormat} >POLICY NO</TableHeaderColumn>
          <TableHeaderColumn dataField="s_PolicyStatusCode" dataSort={true}>STATUS</TableHeaderColumn>
          <TableHeaderColumn dataField="s_FirstName" dataSort={true}>FIRST NAME</TableHeaderColumn>
          <TableHeaderColumn dataField="s_LastOrganizationName" dataSort={true}>LAST NAME</TableHeaderColumn>
          <TableHeaderColumn dataField="s_ProductName" dataSort={true}>PRODUCT</TableHeaderColumn>
      </BootstrapTable>
    )
  } else if ( !isLoading ) {
    content = <p>Could not fetch any data.</p>;
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl={12}>
          <PolicySearchPanel 
            filter={filter} 
            filterHandler={filterHandler} 
            doSearch={()=>setSearchID(searchID+1)}
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12" lg="12" className=" input-search-fields mt-4">
          <div className="datatable">
            <Card className="border-0">
              <CardHeader className="last-trans rounded">
                <h4 className="ml-2">Search results</h4>
              </CardHeader>              
              {content}              
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ClaimAdd;