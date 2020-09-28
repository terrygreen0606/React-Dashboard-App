import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as QuoteEntryService from '../../../services/quoteEntryService';
import MortgageesForm from './MortgageesForm';
import SweetAlert from 'react-bootstrap-sweetalert';

import {
  Col,
  Row,
  Button, Table,
  Card, CardHeader, CardBody
} from 'reactstrap';

const Mortgagees = props => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gridData, setGridData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [deleteAlert, setDeleteAlert] = useState(null);
  const [isSetSavedData, setIsSetSavedData] = useState(false);


  useEffect(() => {
    if (props.quoteSavedData != null && !isSetSavedData) {
      setAllSavedData();
    }
  });

  const setAllSavedData = () => {
    var mortgageeData = props.quoteSavedData.getMortgageeData;
    setGridData(
      mortgageeData.map((data, i) => {
        return {
          clientID: data.s_PersonUniqueId,
          name: data.s_FullLegalName,
          type: data.s_PoMortgageeTypeCode,
          loanNo: data.s_LoanNumber,
          address: data.s_AddressLine1 + ',' + data.s_CityName + ',' + data.s_StateCode + ',' + data.s_PostalCode,
          mortgageePersonPK: data.n_POMortgageePerson_Fk,
          mortgageeAddressPK: data.n_POAddress_Fk,
          poRiskMortgageePK: data.n_PORiskMortgagee_Pk
        }
      })
    );
    setIsSetSavedData(true);
  }

  const createGridObject = (girdData) => {
    var tempArray = [...gridData];
    if (editRowIndex != null) {
      tempArray.splice(editRowIndex, 1)
    }
    tempArray.push(girdData)
    setGridData(tempArray);
    clearedSetData();
  }

  const actionsButton = (cell, row, enumObject, rowIndex) => {
    return (
      <React.Fragment>
        {props.mainState.mode == 'Edit' ?
          <React.Fragment>
            <a href="#" style={{ padding: "0px" }} onClick={(e) => { e.preventDefault(); if(!props.mainState.isBind){editGridData(row, rowIndex)} }} disabled={props.mainState.isBind}>Edit</a>
            &nbsp;|&nbsp;
          </React.Fragment>
          : null}
        <a href="#" style={{ padding: "0px", color: "red" }} onClick={(e) => { e.preventDefault(); if(!props.mainState.isBind){deleteGridData(row, rowIndex)} }} disabled={props.mainState.isBind}>
          Delete
        </a>
      </React.Fragment>
    );
  }

  const editGridData = (rowData, rowIndex) => {
    setEditData(rowData)
    setEditRowIndex(rowIndex)
    setIsModalOpen(true);
  }

  const clearedSetData = () => {
    setEditData(null);
    setEditRowIndex(null)
    setIsModalOpen(false);
  }

  const deleteGridData = (rowData, rowIndex) => {
    const getAlert = () => (
      <SweetAlert warning title="Delete Confirmation" showCancel confirmBtnText="Yes, delete it!" confirmBtnBsStyle="danger" cancelBtnBsStyle="info"
        onConfirm={() => deleteExisingData(rowData, rowIndex)}
        onCancel={() => setDeleteAlert(null)}
        focusCancelBtn
        btnSize="sm"
      >
        Do you really want to delete the selected row?
      </SweetAlert>);
    setDeleteAlert(getAlert());
  }

  const deleteExisingData = (rowData, rowIndex) => {
    props.dispatch(QuoteEntryService.deleteInformations(rowData.priorLossHistoryPK, 'MORTGAGEE'))
      .then((res) => {
        var tempArray = [...gridData];
        tempArray.splice(rowIndex, 1)
        setGridData(tempArray);
        setDeleteAlert(null);
      });
  }

  const options = {
    sizePerPage: 5,  // which size per page you want to locate as default
    paginationShowsTotal: true,  // Accept bool or function
  };

  return (
    <React.Fragment>
      <Col sm='12'>
        <Button type="button" size="sm" color="success" className="pl-1 pr-1 pull-right" onClick={() => setIsModalOpen(true)} disabled={props.mainState.isBind}>Add Row</Button>
      </Col>
      <Col sm="12">
        <div className='overflow-auto' style={{ maxHeight: "250px" }}>
          <BootstrapTable trClassName="p-1" data={gridData} striped hover options={options} >
            <TableHeaderColumn isKey dataField="type" width="100">Type</TableHeaderColumn>
            <TableHeaderColumn dataField="clientID" width="150">Client ID</TableHeaderColumn>
            <TableHeaderColumn dataField="name" >Mortgagees Name</TableHeaderColumn>
            <TableHeaderColumn dataField="address" >Mortgagees Address</TableHeaderColumn>
            <TableHeaderColumn dataField="loanNo" width="100">Loan#</TableHeaderColumn>
            <TableHeaderColumn dataField="" dataFormat={actionsButton} width="120">Action</TableHeaderColumn>
          </BootstrapTable>
        </div>
        <MortgageesForm mainState={props.mainState} createGridObject={(data) => createGridObject(data)} isModalOpen={isModalOpen} clearedSetData={() => clearedSetData()} editData={editData} />
      </Col>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  baseData: state.QuoteEntry.baseData,
});

export default connect(mapStateToProps)(Mortgagees);