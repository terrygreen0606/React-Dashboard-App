import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
import { FormGroup, Col, Input, Label, Card, CardHeader, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AccountService from '../../../services/accounting/banking';
import { editRow } from '../../../store/actions/accounting';
import List from './List';

const Banking = props => {
    let componentRef = useRef();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState(true);
    const [sort, setSort] = useState({ sortName: undefined, sortOrder: undefined });

    useEffect(() => {
        props.getList({ page, type: 'bank' });
        props.editRow({ id: '' });
    }, []);

    /************* Handle page change **************/
    const handlePageChange = (pageNumber) => {
        props.getList({
            type: 'bank',
            page: pageNumber, search, status: status ? undefined : "Inactive", sortTo: sort.sortName,
            sortBy: sort.sortOrder
        });
        setPage(pageNumber);
    }

    /**************Search account name or number ***************/
    const handleSearch = () => {
        if (search.trim().length) {
            props.getList({ page: 1, type: 'bank', search, status: status ? undefined : "Inactive" });
            setPage(1);
            setSort({ sortName: undefined, sortOrder: undefined });
        }
    }

    /************** Reset Search ***************/
    const handleResetSearch = () => {
        props.getList({ page: 1, type: 'bank' });
        setPage(1);
        setSearch("")
        setSort({ sortName: undefined, sortOrder: undefined });
    }

    /************* Handle active/inactive status *************/
    const handleChangeStatus = () => {
        const accountStatus = !status;
        if (accountStatus) {
            props.getList({ page: 1, type: 'bank', status: undefined, search });
            setPage(1);
        } else {
            props.getList({ page: 1, type: 'bank', status: "Inactive", search });
            setPage(1);
        }
        setStatus(accountStatus);
        setSort({ sortName: undefined, sortOrder: undefined });
    }

    /*********** Sorting Function ************/
    const sortMethod = (sortTo, sortBy) => {
        const pageNumber = page ? 1 : undefined;
        setSort({ sortName: sortTo, sortOrder: sortBy })
        props.getList({ page: pageNumber, type: 'bank', sortTo, sortBy });
        setPage(pageNumber);
    }
    /******************* Get all list  *************/
    const getAllList = () => {
        props.getList({type: 'bank'});
        setPage(undefined);
    }
    const { accounting, isLoading } = props;
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
        sortOrder: sort.sortOrder
    };

    return (
        <div className="animated">
            <Card>
                <CardHeader>
                    <i className="icon-menu"></i>Banking Center{' '}
                </CardHeader>
                <CardBody>
                    <FormGroup row className="col-md-12">
                        <Col className="col-md-2"> <NavLink strict to="/reconcile" className="btn btn-success">Reconcile</NavLink> </Col>
                        <Col className="col-md-2"> <NavLink strict to="/write-check" className="btn btn-success">Write Check</NavLink> </Col>
                        <Col className="col-md-2"> <NavLink strict to="/make-deposits" className="btn btn-success">Make Deposit</NavLink> </Col>
                        <Col className="col-md-2"> <NavLink strict to="/transfer-funds" className="btn btn-success">Transfer</NavLink> </Col>
                        <Col className="col-md-2"> <NavLink strict to="/print-check" className="btn btn-success">Print Check</NavLink> </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3"><Input type="text" name="search" id="search" value={search} placeholder="Look for account type name" onChange={e => setSearch(e.target.value)} /></Col>
                        <Col md="1"> <NavLink to="#" className="btn btn-success" onClick={() => handleSearch()} disabled={isLoading}>Search</NavLink> </Col>
                        <Col md="2"> <NavLink to="#" className="btn btn-primary" onClick={() => handleResetSearch()}>Reset</NavLink> </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col md="12">
                            <Label check>
                                <Input type="checkbox" onChange={() => handleChangeStatus()} />{' '}
                                Show inactive accounts
                        </Label>
                            <NavLink strict to="#" className="view-all" onClick={() => getAllList()}> View All </NavLink>
                        </Col>
                    </FormGroup>
                    {isLoading ? <div className="animated fadeIn pt-1 text-center">Loading...</div> :
                        <List
                            {...props}
                            ref={componentRef}
                            accounting={accounting}
                            options={options}
                            page={page}
                        />
                    }
                </CardBody>
            </Card>
        </div>
    );
};

Banking.propTypes = {
    getList: PropTypes.func.isRequired,
    accounting: PropTypes.array.isRequired,
    total_rows: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    editRow: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    accounting: state.accounting.bankingList,
    total_rows: state.accounting.total_rows,
    size: state.accounting.size,
    isLoading: state.loader.isLoading
});

const mapDispatchToProps = dispatch => ({
    getList: bindActionCreators(AccountService.bankingList, dispatch),
    editRow: bindActionCreators(editRow, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Banking);
