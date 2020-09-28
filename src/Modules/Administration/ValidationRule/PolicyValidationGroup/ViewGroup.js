import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { policyValidationRule } from "../../../../services/policyValidationRuleService";
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ViewGroup.css';

class PolicyValidationRuleGroupListing extends Component {
    constructor(props) {
        super(props);
        this.apiService = new policyValidationRule();
        this.state = {
            listData: [],
            filteredData: [],
            isFetching: false,
            error: null
        }
        this.searchFilter = this.searchFilter.bind(this);
        this.error = this.error.bind(this);
    }

    //fetch data to fill table
    componentDidMount() {
        this.renderMyData();
    }

    renderMyData() {
        this.props.dispatch(this.apiService.fetchPolicyValidationRuleGroupListing())
            .then((resp) => {

                this.setState({
                    isFetching: true,
                });

                let filterData = [];
                let getData = this.props.listData.data;
                for (let i = 0; i < getData.length; i++) {
                    filterData.push({
                        ruleCode: getData[i].s_RuleCode,
                        ruleDesc: getData[i].s_RuleDesc,
                        productName: getData[i].product.s_ProductName,
                        edit: getData[i].n_PrValidationRuleGroupMasters_PK
                    });
                }

                this.setState({
                    listData: filterData,
                    filteredData: filterData,
                    isFetching: false,
                });
            }).catch((error) => { // catch
                this.error('Error in fetching validation rule groups.');
            });
    }

    //create edit button with event
    handleClick = id => e => {
        e.preventDefault();
        window.location = '/administration/policy/edit-validation-group/' + id;
    };

    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <a href="#" data-id={cell} onClick={this.handleClick(cell)}>
                EDIT
            </a>
        )
    }

    _setTableOption() {
        if (this.state.isFetching && this.state.filteredData.length == 0) {
            return "No rules found";
        } else {
            return <div className="animated fadeIn pt-1 text-center">Loading...</div>;
        }
    }

    searchFilter(searchText, result) {
        var filtered = [];
        var result = this.state.listData;

        for (var i = 0; i < result.length; i++) {
            for (var key in result[i]) {
                if (result[i][key].toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
                    filtered.push(result[i]);
                }
            }
        }

        if (searchText != '') {
            this.setState({
                filteredData: filtered,
                isFetching: true,
            });
        } else {
            this.setState({
                filteredData: this.state.listData,
                isFetching: false,
            });
        }
    }

    error(msg) {
        return toast.error(msg, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    render() {
        let tableOtions = {
            noDataText: this._setTableOption(),
            sortIndicator: false,
            hideSizePerPage: true,
            pagination: false,
            hidePageListOnlyOnePage: true,
            alwaysShowAllBtns: false,
            withFirstAndLast: false,
            afterSearch: (searchText, result) => {
                this.searchFilter(searchText, result);
            }
        };
        const containerStyle = {
            zIndex: 1999
        };
        return (
            <div className="animated">
                <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
                <Card>
                    <CardHeader>
                        <i className="icon-menu"></i>Data Table{' '}
                        <a href="/administration/policy/create-validation-group" className="btn btn-success">Create Group</a>
                    </CardHeader>
                    <CardBody>
                        <BootstrapTable remote={true} search={true}
                            data={this.state.filteredData}
                            version="4"
                            options={tableOtions}>
                            <TableHeaderColumn dataField='ruleCode' isKey={true}>RULE CODE</TableHeaderColumn>
                            <TableHeaderColumn dataField='ruleDesc'>RULE DESC</TableHeaderColumn>
                            <TableHeaderColumn dataField='productName'>PRODUCT NAME</TableHeaderColumn>
                            <TableHeaderColumn dataField="edit" dataFormat={this.cellButton.bind(this)}>ACTIONS</TableHeaderColumn>
                        </BootstrapTable>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    listData: state.Administration.fetchPolicyValidationRuleGroupListing,
});


export default connect(mapStateToProps)(PolicyValidationRuleGroupListing);
