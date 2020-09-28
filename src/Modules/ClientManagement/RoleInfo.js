import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import {Button} from 'reactstrap';

class RoleInfo extends Component {
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

  cellButton(cell, row, enumObject, rowIndex) {
    return (
        <Button 
           type="button"
           size="sm" 
           color="primary"
           onClick={() => 
           this.props.onEdit(row,rowIndex)}
        >
        Edit
        </Button>
     )
  }

  render() {

    this.table = this.props.RoleInfo;

    return (
      <div className="animated">
              <BootstrapTable data={this.props.RoleFormData1} version="4" striped hover pagination options={this.options}>
                          <TableHeaderColumn isKey dataField="n_PersonRoleId_PK" dataSort dataFormat={this.nameFormat} >Role Id</TableHeaderColumn>
                          <TableHeaderColumn dataField="s_PersonRoleType" dataSort>Role Type</TableHeaderColumn>
                          <TableHeaderColumn dataField="s_isActiveYN" dataSort>Is Active</TableHeaderColumn>
                          <TableHeaderColumn dataField="edit" dataFormat={this.cellButton.bind(this)}>Action</TableHeaderColumn>
                      </BootstrapTable>
        </div>
    );
  }
}
RoleInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
  RoleFormData1 : PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  RoleFormData1: state.Client.RoleFormData1,
});

export default connect(mapStateToProps)(RoleInfo);
