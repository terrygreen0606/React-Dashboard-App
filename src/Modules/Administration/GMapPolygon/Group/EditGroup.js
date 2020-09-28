import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn, buttonFormatter } from 'react-bootstrap-table';
import { loadingLayerModuleAdd } from "../../../../store/actions/administrationAction";
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import { gMapService } from "../../../../services/gMapService";

class EditGroup extends Component {
  constructor(props) {
    super(props);
    this.apiService = new gMapService();
    this.state = {
      data: [],
      isFetching: false,
      error: null
    }
  }


  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.props.dispatch(this.apiService.fetchGroupsListing())
      .then((resp) => {
        this.setState({ isFetching: true });

        if (this.props.groupsData.status == 200) {
          let filterData = [];
          let getData = this.props.groupsData.data;
          for (let i = 0; i < getData.length; i++) {
            filterData.push({
              groupCode: getData[i].s_GroupCode,
              groupDesc: getData[i].s_GroupDesc,
              edit: getData[i].n_MapZoneGroupMaster_PK,
            });
          }

          this.setState({
            data: filterData,
            isFetching: false
          })
        }
      });
  }

  _setTableOption() {
    if (this.state.isFetching && this.state.data.length == 0) {
      return "No groups found";
    } else {
      return <div className="animated fadeIn pt-1 text-center">Loading...</div>;
    }
  }

  handleClick = id => e => {
    e.preventDefault();
    window.location = '/administration/create-group/' + id;
  };

  cellButton(cell, row, enumObject, rowIndex) {
    return (
      <a href="#" data-id={cell} onClick={this.handleClick(cell)}>
        EDIT
      </a>
    )
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
    };
    return (
      <div className="animated">
        <Card>
          <CardHeader>
            <i className="icon-menu"></i>Edit Group{' '}
          </CardHeader>
          <CardBody>
            <BootstrapTable remote={true} search={true}
              data={this.state.data}
              version="4"
              options={tableOtions}>
              <TableHeaderColumn dataField='groupCode' isKey={true}>GROUP CODE</TableHeaderColumn>
              <TableHeaderColumn dataField='groupDesc'>GROUP DESC</TableHeaderColumn>
              <TableHeaderColumn dataField="edit" dataFormat={this.cellButton.bind(this)}>ACTIONS</TableHeaderColumn>
            </BootstrapTable>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  groupsData: state.Administration.fetchGroupsListing,
});

export default connect(mapStateToProps)(EditGroup);
