import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Button
} from 'reactstrap';
import LoadingDiv from "./LoadingDiv";
import * as commissionTerritoryServiceObj from "../../../../services/commissionTerritoryService";

class ViewTerritory extends Component {
  constructor (props) {
    super(props);
    this.loadTerritoryData = this.loadTerritoryData.bind(this);
    this.state = {
      isOpenModal: false,
      territoryId: -1,
      changedFlag: false,
    }
  }
  loadTerritoryData() {
    this.props.dispatch(commissionTerritoryServiceObj.loadDataTable());
  }
  componentDidMount() {
    this.loadTerritoryData();
  }
  render() {
    const {territory_list} = this.props;
    return (
      <Card>
        <CardHeader>
          <span className="h5">
            Manage Territories
          </span>
          <Button color="primary" size="sm" className="float-right"><a href={`createTerritory`}>Add Territory</a></Button>
        </CardHeader>
        <CardBody>
          {
            this.props.isLoading ? <LoadingDiv /> : 
            <Table hover responsive striped size='sm'>
              <thead>
                <tr>
                  <th>Territory Code</th>
                  <th>Territory Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  territory_list.map((item, index) => (
                    <tr key={index}>
                      <td>{item.s_TerritoryCode}</td>
                      <td>{item.s_TerritoryName}</td>
                      <td><a href={`territory/${item.n_TerritoryId_PK}`}>View</a></td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          }
        </CardBody>
      </Card>
    )
  }
}

ViewTerritory.propTypes = {
  dispatch: PropTypes.func.isRequired,  
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  isLoading: state.territoryManageProcess.isLoading,
  territory_list: state.territoryManageProcess.territoryDataSet,
  error: state.territoryManageProcess.error,
});

export default connect(mapStateToProps)(ViewTerritory);