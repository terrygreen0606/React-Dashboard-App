import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import {Button} from "reactstrap";


class AddressInfo extends Component {
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
    const AddressInfo = this.props.AddressInfo;
    return (
      <div className="animated">
              <BootstrapTable data={this.props.AddrFormData1} version="4" striped hover pagination options={this.options}>
                          <TableHeaderColumn isKey dataField="s_IsDefaultAddress" dataSort dataFormat={this.nameFormat} >Default</TableHeaderColumn>
                          <TableHeaderColumn dataField="s_AddressTypeCode" dataSort>Type</TableHeaderColumn>
                          <TableHeaderColumn dataField="s_AddressLine1" dataSort>Address</TableHeaderColumn>
                          <TableHeaderColumn dataField="d_EffectiveDateFrom" dataSort>Eff.From</TableHeaderColumn>
                          <TableHeaderColumn dataField="d_EffectiveDateTo" dataSort dataFormat={this.nameFormat} >Eff.To</TableHeaderColumn>
                          <TableHeaderColumn dataField="edit" dataFormat={this.cellButton.bind(this)}>Action</TableHeaderColumn>
              </BootstrapTable>
        </div>
    );
  }
}

AddressInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
  AddrFormData1 : PropTypes.array.isRequired,
  is_Default_present : PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  AddrFormData1: state.Client.AddrFormData1,
  is_Default_present: state.Client.is_Default_present,
});

export default connect(mapStateToProps)(AddressInfo);

