import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as QuoteEntryService from '../../../services/quoteEntryService';
import AddiInterestHhmForm from './AddiInterestHhmForm';
import SweetAlert from 'react-bootstrap-sweetalert';

import {
  Col, Card, CardHeader, CardBody, Input, Button,
} from 'reactstrap';

const AddiTionalInterest = props => {
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
    var addiIntData = props.quoteSavedData.getAddiIntData;
    setGridData(
      addiIntData.map((data, i) => {
        return {
          relation: '', houseHoldType: '', interestType: data.s_PartyInterestCode, firstName: data.s_FirstName, middleName: data.s_MiddleName, lastName: data.s_LastOrganizationName,
          houseNo: data.s_HouseNo, direction1: data.s_HouseDirection1, streetName: data.s_StreetName, direction2: data.s_HouseDirection2, type: data.s_HouseType, city: data.s_CityName, cityFK: data.n_CityId_FK,
          state: data.s_StateName, stateFK: data.n_StateId_PK, county: data.s_CountyName, countyFK: data.n_CountyId_PK, countryFK: data.n_CountryId_FK, zip: data.s_PostalCode, zipCodesPK: data.n_Zipcodes_FK,
          personInfoPK: data.n_PersonInfoId_PK, personAddressPK: data.n_PersonAddressesId_PK, poApplicantPK: '',
          personRolePK: '', poAppOtherPartiesPK: data.n_POAppsOtherParties_Pk,
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

  const interestName = (cell, row, enumObject, rowIndex) => {
    return row.firstName + ' ' + row.lastName;
  }

  const actionsButton = (cell, row, enumObject, rowIndex) => {
    return (
      <React.Fragment>
        {props.mainState.mode == 'Edit' ?
          <React.Fragment>
            <a href="#" style={{ padding: "0px" }} onClick={(e) => { e.preventDefault(); if(!props.mainState.isBind){editGridData(row, rowIndex)} }}>Edit</a>
            &nbsp;|&nbsp;
          </React.Fragment>
          : null}
        <a href="#" style={{ padding: "0px", color: "red" }} onClick={(e) => { e.preventDefault(); if(!props.mainState.isBind){deleteGridData(row, rowIndex)} }}>
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
    props.dispatch(QuoteEntryService.deleteInformations(rowData.priorLossHistoryPK, 'ADDIINTEREST'))
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
      <Col md="12">
        <div className='overflow-auto' style={{ maxHeight: "250px" }}>
          <BootstrapTable trClassName="p-1" data={gridData} striped hover options={options} >
            <TableHeaderColumn isKey dataField="interestType" >INTEREST</TableHeaderColumn>
            <TableHeaderColumn dataField='' dataFormat={interestName}>INTEREST NAME</TableHeaderColumn>
            <TableHeaderColumn dataField="" dataFormat={actionsButton}>Action</TableHeaderColumn>
          </BootstrapTable>
        </div>
        <AddiInterestHhmForm viewFrom="ADDIINTEREST" mainState={props.mainState} createGridObject={(data) => createGridObject(data)} isModalOpen={isModalOpen} clearedSetData={() => clearedSetData()} editData={editData} />
      </Col>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  baseData: state.QuoteEntry.baseData,
});

export default connect(mapStateToProps)(AddiTionalInterest);