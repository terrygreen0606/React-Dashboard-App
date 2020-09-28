import React, {useState, useEffect} from 'react';
import Moment from 'react-moment';
import {Link } from 'react-router-dom';
import {Card, CardHeader, CardBody, Col, Row} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {useHttp} from '../../services/claimService';
import {ClaimsSearchPanel} from './components/ClaimSearchComponents/ClaimsSearchPanel';
import Dailyclaimcount from "./components/ClaimSearchComponents/DailyClaimCount";
import ClaimStatusDoughnut from "./components/ClaimSearchComponents/ClaimStatusDoughnut";
import ClaimStatusDoughnutConfig from "./components/ClaimSearchComponents/ClaimStatusDoughnutConfig";

const Claims = props => {

  const [filter, setFilter] = useState({
    Risk_Id: '',
    Claim_No: '',
    Agency_Name: '',
    s_FirstName: '',
    s_LastOrganizationName: '',
    ClaimTypeId_FK:''
  });
  const [searchID, setSearchID] = useState(0);

  const filterHandler = event => {
    const newFilter = {...filter};
    newFilter[event.target.name] = event.target.value;
    setFilter(newFilter);
  }

  /* Daily Claim Count */
  const [claimCountData, setClaimCountData] = useState({claimCount: 0, claimList: null});
  const [isLoadingCount, fetchedClaimCountData] = useHttp(process.env.REACT_APP_API_URL+'/api/v1/todays_claims');

  useEffect(() => {
    if (!isLoadingCount && fetchedClaimCountData && fetchedClaimCountData.data) {
        setClaimCountData({
            claimCount: fetchedClaimCountData.data.totalCount,
            claimList: fetchedClaimCountData.data.claims
        });
    }
  },[fetchedClaimCountData]);
  /* Daily Claim Count */
  
  /* Doughnut chart */
  const [doughnutData, setDoughnutData] = useState(ClaimStatusDoughnutConfig);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoadingDoughnutCount, fetchedDoughnutData] = useHttp(process.env.REACT_APP_API_URL+'/api/v1/claim_status_count_group_wise');
  useEffect(() => {
    if (!isLoadingDoughnutCount && fetchedDoughnutData && fetchedDoughnutData.data) {
      let countData = fetchedDoughnutData.data.count;
      setDoughnutData({
        datasets: [
          {
            data: countData
          }
        ],
        labels: fetchedDoughnutData.data.labels
      });
      setTotalCount(fetchedDoughnutData.data.totalCount);
    }
  },[fetchedDoughnutData]); 
  /* Doughtnut chart */


  const [isLoading, fetchedData] = useHttp(process.env.REACT_APP_API_URL+'/api/v1/claims?filter='+JSON.stringify(filter), [searchID]);
  const claims = searchID && fetchedData ? fetchedData.data : [];

  const options = {
    noDataText: (<i>No data</i>),
    clearSearch: true,
    alwaysShowAllBtns: false,
    withFirstAndLast: false
  }

  const claimFormat = (cell, row) => {
    return <Link to={`/claims/${row.ClaimId_PK}`}>{cell}</Link>
  }

  const claimTypeFormat = (cell, row) => {
    return row.claim_type.Description;
  }

  const policyFormat = (cell, row) => {
    //return <Link to={`/policy/${row.n_PolicyNoId_FK}`}>{cell}</Link>
    return <Link to={`/claims/${row.ClaimId_PK}`}>{cell}</Link>
  }

  const insuredPersonFormat = (cell, row) => {
    return row.insured_person.s_FirstName + " " + row.insured_person.s_LastOrganizationName;
  }

  const daysPendingFormat = (cell, row) => {
    return <Moment date={row.Inserted_Date} durationFromNow unit="days"/>
  }

  let content = <><CardBody><i className="fa fa-spinner fa-spin"></i><span style={{paddingLeft:'15px'}}>Loading data...</span></CardBody></>;

  if (!isLoading && claims ) {
    content = (
      <BootstrapTable data={claims} version="4" borderless striped hover pagination search_ options={options} className="table-sm">
          <TableHeaderColumn dataField="Risk_Id" dataSort={true} dataFormat={policyFormat} >POLICY NO</TableHeaderColumn>
          <TableHeaderColumn dataField="insured_person" dataSort={true} dataFormat={insuredPersonFormat}>INSUREDNAME</TableHeaderColumn>
          <TableHeaderColumn dataField="Claim_No" isKey={true} dataSort={true} dataFormat={claimFormat} >CLAIM NO</TableHeaderColumn>
          <TableHeaderColumn dataField="Claim_Status_Code" dataSort={true}>STATUS</TableHeaderColumn>
          {/* <TableHeaderColumn dataField="Agency_Name" dataSort={true}>Agency Name</TableHeaderColumn> */}
          <TableHeaderColumn dataField="claim_type" dataSort={true} dataFormat={claimTypeFormat}>LOSS TYPE</TableHeaderColumn>
          <TableHeaderColumn dataSort={true} dataFormat={daysPendingFormat} dataAlign="center">DAYS PENDING</TableHeaderColumn>
      </BootstrapTable>
    )
  } else if ( !isLoading ) {
    content = <p>Could not fetch any data.</p>;
  }

  //let claimCountDataContent = <><i className="fa fa-spinner fa-spin"></i><span style={{paddingLeft:'15px'}}>Loading data...</span></>;
  let claimCountDataContent = <></>
  /* Daily claim count */
  if(!isLoadingCount && claimCountData) {
    claimCountDataContent = (<>
          <Dailyclaimcount
            fetchedClaims = { claimCountData }
            loadingContent = { isLoadingCount }/>
    </>);
  }
  /* Daily claim count */
  
  /* Doughtnut chart */
  //let doughnutDataContent = <><i className="fa fa-spinner fa-spin"></i><span style={{paddingLeft:'15px'}}>Loading data...</span></>;
  let doughnutDataContent = <></>
  if(!isLoadingDoughnutCount && doughnutData) {
    doughnutDataContent = (<>
          <ClaimStatusDoughnut
            doughnut = { doughnutData }
            totalCount= { totalCount }/>
    </>);
  }
  /* Doughtnut chart */

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl={12}>
          <ClaimsSearchPanel 
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
      
      <Row>
        { claimCountDataContent }
        { doughnutDataContent}
      </Row>
    </div>
  )
}

export default Claims;