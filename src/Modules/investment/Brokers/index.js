import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
import { FormGroup, Button, Col, Input, Label, Card, CardHeader, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import * as Services from '../../../services/investment';
import { editRow } from '../../../store/actions/common';
import ActionButttons from "../../CommonComponents/ActionButtons";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import BackButton from "../../CommonComponents/BackButton";

const List = props => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState({ sortName: undefined, sortOrder: undefined });
    useEffect(() => {
        props.getList({ page });
        props.editRow({ id: '' });
    }, []);

    /************* Handle page change **************/
    const handlePageChange = (pageNumber) => {
        props.getList({
            page:pageNumber, search, sortTo: sort.sortName,
            sortBy: sort.sortOrder
        });
        setPage(pageNumber);
    }

    /**************Search account name or number ***************/
    const handleSearch = () => {
        if (search.trim().length) {
            props.getList({ page: 1, search });
            setPage(1);
            setSort({ sortName: undefined, sortOrder: undefined });
        }
    }

    /************** Reset Search ***************/
    const handleResetSearch = () => {
        props.getList({ page: 1 });
        setPage(1);
        setSearch("")
        setSort({ sortName: undefined, sortOrder: undefined });
    }
      /*********** delete account ***********/
      const handleDelete = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (<div className='custom-ui'>
                    <h1>Are you sure?</h1>
                    <p>You want to delete this account type.</p>
                    <button className="badge badge-blue" onClick={onClose}>No</button>
                    <button className="badge badge-red" onClick={() => {
                        props.brokerDelete(id).then(() => props.getList({ page }));
                        onClose();
                    }}>
                        Yes, Delete it!
                    </button>
                </div>);
            }
        });
    };
    /*********** Sorting Function ************/
    const sortMethod = (sortTo, sortBy) => {
        const pageNumber = page ? 1 : undefined;
        setSort({ sortName: sortTo, sortOrder: sortBy })
        props.getList({ page: pageNumber, sortTo, sortBy });
        setPage(pageNumber);
    }
    /******************* Get all list  *************/
    const getAllList = () => {
        props.getList({});
        setPage(undefined);
    };

    // Customization Function 
    const rowClassNameFormat = (row, rowIdx) => {
        return { backgroundColor: rowIdx % 2 === 0 ? '#A2EFE8' : '#DCEFF1', color: "#000000" };
    };

    /*********** Action buttons ************/
    const actions = (cell, row) => {
        const url = `/edit-broker`;
        const searchUrl = `/view-broker`
        return <ActionButttons id={row.Broker_ID} url={url} history={props.history} handleDelete={(ID) => handleDelete(ID)} editRow={props.editRow} searchUrl={searchUrl} isSearch={false} />;
    };
    const options = {
        sortIndicator: true,
        page,
        onPageChange: handlePageChange,
        hideSizePerPage: true,
        paginationSize: 10,
        hidePageListOnlyOnePage: true,
        clearSearch: true,
        alwaysShowAllBtns: false,
        withFirstAndLast: false,
        sizePerPage: props.size,
        onSortChange: sortMethod,
        sortName: sort.sortName,
        sortOrder: sort.sortOrder,
        pageStartIndex: 1
    };

    return (
        <div className="animated">
            <Card>
                <CardHeader>
          <BackButton history={props.history} backUrl= '/investments-security' text={"Brokers"} />
                    </CardHeader>
                <CardBody>
                    <FormGroup row>
                    <Col md="8">
                            <h6>Look for Broker name or Company</h6>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3"><Input type="text" name="search" id="search" value={search} placeholder="Look for Broker name or Company" onChange={e => setSearch(e.target.value)} /></Col>
                        <Col md="1"> <Button type="button" size="sm" color="primary" onClick={() => handleSearch()} disabled={props.isLoading}>Search</Button> </Col>
                        <Col md="4 "> <Button type="button" size="sm" color="primary" onClick={() => handleResetSearch()}>Reset</Button> </Col>
                        <Col className="col-md-2" > <Button type="button" size="sm" color="primary" style={{marginLeft:88}} onClick={()=>props.history.push('/add-broker')} >Add New<br /> Broker</Button> </Col>
                        <Col className="col-md-2"> <Button type="button" size="sm" color="primary"  style={{height:45}} onClick={() => props.history.goBack()}>      Close  <br />     </Button> </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col md="12">
                            <Label check></Label>
                            <NavLink strict to="#" className="view-all" onClick={() => getAllList()}> View All </NavLink>
                        </Col>
                    </FormGroup>
                    {props.isLoading && <div className="animated fadeIn pt-1 text-center table-loader" />}
                    <BootstrapTable
                        data={props.brokers}
                        version="4"
                        remote
                        condensed
                        hover pagination
                        options={{ ...options, page }}
                        fetchInfo={{ dataTotalSize: props.total_rows }}
                        trStyle={rowClassNameFormat}
                    >
                        <TableHeaderColumn isKey dataField="Broker_Company" >Company</TableHeaderColumn>
                        <TableHeaderColumn dataField="Broker_Name" >Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="Broker_Email">Email</TableHeaderColumn>
                        <TableHeaderColumn dataField="" dataFormat={actions}>Action</TableHeaderColumn>
                    </BootstrapTable>
                </CardBody>
            </Card>
        </div >
    );
};

List.propTypes = {
    getList: PropTypes.func.isRequired,
    brokers: PropTypes.array.isRequired,
    total_rows: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    editRow: PropTypes.func.isRequired,
    brokerDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    brokers: state.investment.brokers,
    total_rows: state.investment.total_rows,
    size: state.investment.size,
    isLoading: state.loader.isLoading
});

const mapDispatchToProps = dispatch => ({
    getList: bindActionCreators(Services.getBrokers, dispatch),
    editRow: bindActionCreators(editRow, dispatch),
    brokerDelete: bindActionCreators(Services.brokerDelete, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(List);
