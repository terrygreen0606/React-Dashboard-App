import React from 'react';
import {Link} from 'react-router-dom';
import {Card, CardBody, Col, Row, Button} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {useHttp} from '../../services/claimService';

const Questionnaires = props => {

  const [isLoading, fetchedData] = useHttp(process.env.REACT_APP_API_URL+'/api/v1/questionnaires');
  const questionnaires = fetchedData ? fetchedData.data : [];

  const options = {
    noDataText: (<i>No data</i>),
    clearSearch: true,
    alwaysShowAllBtns: false,
    withFirstAndLast: false
  }

  const questionnaireFormat = (cell, row) => {
    return <Link to={`/questionnaires/${row.id}`}>{cell}</Link>
  }

  let content = <><i className="fa fa-spinner fa-spin"></i><span style={{paddingLeft:'15px'}}>Loading data...</span></>;

  if (!isLoading && questionnaires ) {
    content = (
      <>
      <Link to={`/questionnaires/0`}>
      <Button type="button" size="md" className="pull-right" color="success" >
          Add new Questionnaire
      </Button>
      </Link>
      <BootstrapTable data={questionnaires} version="4" striped hover pagination search_ options={options} className="table-sm">
          <TableHeaderColumn dataField="description" isKey={true} dataSort={true} dataFormat={questionnaireFormat} >Questionnaire</TableHeaderColumn>
      </BootstrapTable>
      </>
    )
  } else if ( !isLoading ) {
    content = <p>Could not fetch any data.</p>;
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl={12}>
          <Card>
            <CardBody>
              {content}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Questionnaires;