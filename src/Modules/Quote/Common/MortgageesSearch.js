import React, { useState } from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as QuoteEntryService from '../../../services/quoteEntryService';

import {
  Modal, ModalHeader, ModalBody, Row, Col, Label, Input, Button
} from 'reactstrap';

const MortgageesSearch = props => {
  const [lastName , setLastName] = useState('');
  const [clientID, setClientID] = useState('');
  const [city, setCity] = useState('');
  const [firstName, setFirstName] = useState('');
  const [state, setState] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [gridData, setGirdData] = useState([]);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalSize, setTotalSize] = useState(0);

    const searchData = () => {
    const params = {lastName,clientID,firstName,city,state,page,sizePerPage}
    filterTable(params);
  }

  const filterTable = (params) => {
    setLoading(true)
      props.dispatch(QuoteEntryService.searchMortgageesData(params))
      .then((res) => {
        setGirdData(res.queryResult);
        setTotalSize(res.totalCount);
        setLoading(false)
      });
  }

  const link = (cell, row, enumObject, rowIndex) => {
    return (
      <React.Fragment>
        <a href="#" onClick={(e) => { e.preventDefault(); props.setMortgageesData(row) }}>
          {cell}
        </a>
      </React.Fragment>
    );
  }

  const onPageChange = (page, sizePerPage) => {
    const params = {lastName,clientID,firstName,city,state,page: page,sizePerPage}
    setPage(page)
    setSizePerPage(sizePerPage);
    filterTable(params);
  }

  const sizePerPageListChange = (sizePerPage) => {
    const params = {lastName,clientID,firstName,city,state,page,sizePerPage: sizePerPage}
    setSizePerPage(sizePerPage);
    filterTable(params);
  }

  const options = {
    page: page,  // which page you want to show as default
    sizePerPageList: [
        { text: '10', value: 10 },
        { text: '20', value: 20 },
        { text: '50', value: 50 },
        { text: 'All', value: 0 }
    ], // you can change the dropdown list for size per page
    sizePerPage: sizePerPage,  // which size per page you want to locate as default
    pageStartIndex: 1, // where to start counting the pages
    paginationShowsTotal: true,  // Accept bool or function
    onPageChange: onPageChange,
    onSizePerPageList: sizePerPageListChange
  };

  return (
    <React.Fragment>
      <Modal isOpen={props.isSearchModal} size='lg'>
        <ModalHeader className="p-2 mt-2" >Find Mortgagees</ModalHeader>
        <ModalBody className="p-2">
          <Row className="mt-3">
            <Col sm='3'>
              <Label className="mb-0">Clienet Id:</Label>
              <Input type='text' bsSize='sm' value={clientID} onChange={(e)=>setClientID(e.target.value)} disabled={isLoading}/>
            </Col>
            <Col sm='3'>
              <Label className="mb-0">First Name:</Label>
              <Input type='text' bsSize='sm' value={firstName} onChange={(e)=>setFirstName(e.target.value)} disabled={isLoading}/>
            </Col>
            <Col sm='3'>
              <Label className="mb-0">Last/Org:</Label>
              <Input type='text' bsSize='sm' value={lastName} onChange={(e)=>setLastName(e.target.value)} disabled={isLoading}/>
            </Col>
            <Col sm='3'>
              <Label className="mb-0">City:</Label>
              <Input type='text' bsSize='sm' value={city} onChange={(e)=>setCity(e.target.value)} disabled={isLoading}/>
            </Col>
          </Row>
          <Row className='mt-1'>
              <Col sm='3'>
                <Label className="mb-0">state:</Label>
                <Input type='text' bsSize='sm' value={state} onChange={(e)=>setState(e.target.value)} disabled={isLoading}/>
              </Col>
          </Row>
          <Row className="mt-3">
            <Col sm="12" className="text-center">
              <Button type="button" size="sm" color="info" onClick={() => searchData()} disabled={isLoading}><i className="fa fa-search"></i>&nbsp;&nbsp;Search</Button>
            </Col>
          </Row>
          <hr />
          <BootstrapTable trClassName="p-1" data={gridData} remote={true} striped hover options={options} pagination={true} fetchInfo={{ dataTotalSize: totalSize }} >
            <TableHeaderColumn isKey dataField="s_PersonUniqueId" dataFormat={link}>Client Id</TableHeaderColumn>
            <TableHeaderColumn dataField="s_FullLegalName" >Legal Full Name</TableHeaderColumn>
            <TableHeaderColumn dataField="s_AddressLine1" >Address</TableHeaderColumn>
            <TableHeaderColumn dataField="s_CityName" >City</TableHeaderColumn>
            <TableHeaderColumn dataField="s_StateCode" width="40">State</TableHeaderColumn>
            <TableHeaderColumn dataField="s_PostalCode" width="70">Zip</TableHeaderColumn>
            <TableHeaderColumn dataField="s_PersonStatusCode" width="70">Status</TableHeaderColumn>
          </BootstrapTable>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  baseData: state.QuoteEntry.baseData,
});

export default connect(mapStateToProps)(MortgageesSearch);