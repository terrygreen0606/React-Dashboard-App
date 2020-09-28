import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as QuoteEntryService from '../../../services/quoteEntryService';

import {
    Button,
    Col,
    Row,
    Table
} from 'reactstrap';


const SubmitAccord = props => {
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
        var missingAttach = props.quoteSavedData.getMissingDocList;
        setGridData(
            missingAttach.map((data, i)=>{
                return {
                    docName: data.s_SourceName,
                    isAttach: data.s_IsAttached,
                    fileName: data.Doc_OriginalName,
                    docIntex: data.DocIndex_PK,
                    docTrackTransPK: data.n_PoDocumenttrackTrans_PK
                }
            })
        );
        setIsSetSavedData(true);
    }

    const showIsAttach = (cell, row, enumObject, rowIndex) => {
        return row.isAttach == 'Y' ? <i style={{'color':'green'}} className='fa fa-check'></i> : <i style={{'color':'red'}} className='fa fa-times'></i>
    }

    const actionsButton = (cell, row, enumObject, rowIndex) => {
        return (
            <React.Fragment>
                <a href="#" onClick={(e) => { e.preventDefault(); }}>
                    Upload
            </a>
            </React.Fragment>
        );
    }

    const options = {
        sizePerPage: 5,  // which size per page you want to locate as default
        paginationShowsTotal: true,  // Accept bool or function
    };

    return (
        <React.Fragment>
            <Row className="p-0 m-0">
                <Col sm="12">
                    <BootstrapTable trClassName="p-1" data={gridData} striped hover options={options} >
                        <TableHeaderColumn isKey dataField="docName" >Document Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="" dataFormat={showIsAttach}>Attached</TableHeaderColumn>
                        <TableHeaderColumn dataField="fileName" >File Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="" dataFormat={actionsButton}>Action</TableHeaderColumn>
                    </BootstrapTable>
                </Col>
            </Row>
            <Row className="mt-2 mb-2">
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    {
                        props.mainState.bindDate == '' ? 
                            <React.Fragment>
                                <Button type="submit" name='PrintBinder' color="success" className="pull-left" onClick={(e)=>props.setWhichButton(e)}><i className="fa fa-print"></i>&nbsp;&nbsp; Submit Bound</Button>
                                <Button type="button" color="success" className="pull-right"><i className="fa fa-print"></i>&nbsp;&nbsp; Submit UnBound</Button> 
                            </React.Fragment>
                        : null
                    }
                </Col>
            </Row>
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    baseData: state.QuoteEntry.baseData,
});

export default connect(mapStateToProps)(SubmitAccord);