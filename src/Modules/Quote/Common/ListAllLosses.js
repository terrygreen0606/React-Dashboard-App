import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { convertDateMMDDYYYY, convertAmount } from '../../../services/commanServices';
import PriorLossesInfo from './PriorLossesInfo';
import SweetAlert from 'react-bootstrap-sweetalert';
import * as QuoteEntryService from '../../../services/quoteEntryService';

import {
    Card, CardHeader, CardBody, Collapse, Input, Button,
} from 'reactstrap';

const ListAllLosses = props => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [priorLossesList, setPriorLossesList] = useState([]);
    const [editData, setEditData] = useState(null);
    const [editRowIndex, setEditRowIndex] = useState(null);
    const [deleteAlert, setDeleteAlert] = useState(null);
    const [isSetSavedData, setIsSetSavedData] = useState(false);

    useEffect(()=>{
        if(props.quoteSavedData != null && !isSetSavedData){
            setAllSavedData()
        }
    });

    const setAllSavedData = () => {
        var lossesData = props.quoteSavedData.getPriorLossData;
        setPriorLossesList(
            lossesData.map((data, i)=>{
                return { 
                    lossDate: data.d_LossDate,
                    lossType: data.s_LossType,
                    lossDesc: data.s_LossDescription,
                    lossCatNo: data.s_LossCatNo,
                    amout: data.n_LossAmount,
                    priorLossHistoryPK: data.n_PoRiskLossHistory_PK
                };
            })
        );
        setIsSetSavedData(true);
    }

    const addPriorLossesList = (params) => {
        var tempArray = [...priorLossesList];
        if (editRowIndex != null) {
            tempArray.splice(editRowIndex, 1)
        }
        tempArray.push(params)
        setPriorLossesList(tempArray);
        setEditRowIndex(null)
    }

    const dateFormat = (cell) => {
        return convertDateMMDDYYYY(cell, 'MM-DD-YYYY');
    }

    const currencyFormat = (cell) => {
        return convertAmount(cell);
    }

    const actionsButton = (cell, row, enumObject, rowIndex) => {
        var links = (
            <React.Fragment>
                <a href="#" style={{ padding: "0px" }} onClick={(e) => { e.preventDefault(); if(!props.mainState.isBind){editLossHistoryDetail(row, rowIndex)} }}>
                    Edit
                    </a>
                    &nbsp;|&nbsp;
                <a href="#" style={{ padding: "0px", color: "red" }} onClick={(e) => { e.preventDefault(); if(!props.mainState.isBind){deleteLossHistoryData(row, rowIndex)} }}>
                    Delete
                    </a>
            </React.Fragment>
        );
        if (props.mainState.mode != 'Edit') {
            links = (
                <React.Fragment>
                    <a href="#" style={{ padding: "0px", color: "red" }} onClick={(e) => { e.preventDefault(); if(!props.mainState.isBind){deleteLossHistoryData(row, rowIndex)} }}>
                        Delete
                        </a>
                </React.Fragment>
            );
        }
        return links;
    }

    const editLossHistoryDetail = (rowData, rowIndex) => {
        setEditData(rowData)
        setEditRowIndex(rowIndex)
        setIsModalOpen(true);
    }

    const deleteLossHistoryData = (rowData, rowIndex) => {
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
        if (rowData.priorLossHistoryPK != null || rowData.priorLossHistoryPK != '') {
            props.dispatch(QuoteEntryService.deleteInformations(rowData.priorLossHistoryPK, 'PRIORLOSS'))
                .then((res) => {
                    setDeleteAlert(null);
                });
        }
        var tempArray = [...priorLossesList];
        tempArray.splice(rowIndex, 1)
        setPriorLossesList(tempArray);
    }

    const options = {
        sizePerPage: 5,  // which size per page you want to locate as default
        paginationShowsTotal: true,  // Accept bool or function
    };

    return (
        <React.Fragment>
            <Card className="mb-0 borderNN">
                <CardHeader className="p-1">
                    <span className="text-value-sm">LIST ALL LOSSES IN THE LAST 5 YEARS FOR ALL MEMBERS OF THE HOUSEHOLD AT ANY LOCATION</span>
                    <Button type="button" size="sm" color="success" className="pull-right" onClick={() => setIsModalOpen(true)} disabled={props.mainState.isBind}><i className="fa fa-plus"></i>&nbsp;&nbsp;Add Row</Button>
                </CardHeader>
                <Collapse isOpen={true} id="collapseEight">
                    <CardBody>
                        <BootstrapTable size="sm" data={priorLossesList} striped hover options={options} >
                            <TableHeaderColumn isKey dataField="lossDate" dataFormat={dateFormat}>Loss Date</TableHeaderColumn>
                            <TableHeaderColumn dataField="lossType" >Loss Type</TableHeaderColumn>
                            <TableHeaderColumn dataField="lossDesc" >Loss Desc.</TableHeaderColumn>
                            <TableHeaderColumn dataField="lossCatNo" >Cat No.</TableHeaderColumn>
                            <TableHeaderColumn dataField="amout" dataFormat={currencyFormat}>Amount</TableHeaderColumn>
                            <TableHeaderColumn dataField="" dataFormat={actionsButton}>Action</TableHeaderColumn>
                        </BootstrapTable>
                    </CardBody>
                </Collapse>
            </Card>
            <PriorLossesInfo mainState={props.mainState} isModalOpen={isModalOpen} setIsModalOpen={() => setIsModalOpen(false)} addPriorLossesList={(params) => addPriorLossesList(params)} editData={editData} />
            {deleteAlert}
            {
                priorLossesList.map((data, i) => {
                    return (
                        <React.Fragment key={i}>
                            <Input type='hidden' name={"data[TbPriorrisklosshistory]["+i+"][lossDate]"} value={data.lossDate} />
                            <Input type='hidden' name={"data[TbPriorrisklosshistory]["+i+"][lossType]"} value={data.lossType} />
                            <Input type='hidden' name={"data[TbPriorrisklosshistory]["+i+"][lossDesc]"} value={data.lossDesc} />
                            <Input type='hidden' name={"data[TbPriorrisklosshistory]["+i+"][lossCatNo]"} value={data.lossCatNo} />
                            <Input type='hidden' name={"data[TbPriorrisklosshistory]["+i+"][amout]"} value={data.amout} />
                            <Input type='hidden' name={"data[TbPriorrisklosshistory]["+i+"][priorLossHistoryPK]"} value={data.priorLossHistoryPK} />
                        </React.Fragment>
                    )
                })
            }
        </React.Fragment>
    );
}


const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(ListAllLosses);