import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { gMapService } from "../../../../services/gMapService";
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import Moment from 'moment';
import './ViewRule.css';

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.apiService = new gMapService();
    this.state = {
      mapData: [],
      isFetching: false,
      error: null
    }
  }

  componentDidMount() {
    this.renderMyData();
  }

  renderMyData() {
    this.props.dispatch(this.apiService.fetchGmapRules())
      .then((resp) => {

        this.setState({
          isFetching: true,
        });

        Moment.locale('en');
        let filterData = [];
        let getData = this.props.mapData.data;
        for (let i = 0; i < getData.length; i++) {
          filterData.push({
            zoneName: getData[i].s_MapZoneName,
            zoneDesc: getData[i].s_MapZoneDesc,
            effFrom: getData[i].d_EffectiveDateFrom,
            effTo: getData[i].d_EffectiveDateTo,
            edit: getData[i].n_MapZoneMasterId_PK
          });
        }

        this.setState({
          mapData: filterData,
          isFetching: false,
        });
      });
  }


  handleClick = id => e => {
    e.preventDefault();
    window.location = '/administration/gmap-polygon/' + id;
  };

  cellButton(cell, row, enumObject, rowIndex) {
    return (
      <a href="#" data-id={cell} onClick={this.handleClick(cell)}>
        EDIT
      </a>
    )
  }

  _setTableOption() {
    if (this.state.isFetching && this.state.mapData.length == 0) {
      return "No zones found";
    } else {
      return <div className="animated fadeIn pt-1 text-center">Loading...</div>;
    }
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
            <i className="icon-menu"></i>Data Table{' '}
            <a href="/administration/gmap-polygon" className="btn btn-success">Add Zone</a>
          </CardHeader>
          <CardBody>
            <BootstrapTable remote={true} search={true}
              data={this.state.mapData}
              version="4"
              options={tableOtions}>
              <TableHeaderColumn dataField='zoneName' isKey={true}>ZONE NAME</TableHeaderColumn>
              <TableHeaderColumn dataField='zoneDesc'>ZONE DESC</TableHeaderColumn>
              <TableHeaderColumn dataField='effFrom'>EFF. FROM DATE</TableHeaderColumn>
              <TableHeaderColumn dataField='effTo'>EFF. TO DATE</TableHeaderColumn>
              <TableHeaderColumn dataField="edit" dataFormat={this.cellButton.bind(this)}>ACTIONS</TableHeaderColumn>
            </BootstrapTable>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mapData: state.Administration.fetchGmapRules,
});


export default connect(mapStateToProps)(DataTable);
