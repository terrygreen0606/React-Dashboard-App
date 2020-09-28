import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';

class MortPolicyInfo extends Component {
  constructor(props) {
    super(props);

    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 10,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
  }
  }

  render() {

    return (
      <div className="animated">
              <BootstrapTable data={this.props.policyData} version="4" striped hover pagination search options={this.options}>
                          <TableHeaderColumn isKey dataField="Policy_No"  dataFormat={this.nameFormat} >Policy No</TableHeaderColumn>
                          <TableHeaderColumn dataField="s_FullLegalName" >Insured Name</TableHeaderColumn>
                      </BootstrapTable>
        </div>
    );
  }
}
MortPolicyInfo.propTypes = {
    policyData : PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  policyData: state.Client.policyData,
});

export default connect(mapStateToProps)(MortPolicyInfo);
