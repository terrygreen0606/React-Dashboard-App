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
import * as commissionGroupServiceObj from "../../../../services/commissionGroupService";

class ViewGroup extends Component {
  constructor (props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.groupAction = this.groupAction.bind(this);
    this.loadGroupData = this.loadGroupData.bind(this);
    this.state = {
      isOpenModal: false,
      groupId: -1,
      changedFlag: false,
    }
  }
  toggleModal(change = false) {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
      changedFlag: change
    });
  }
  loadGroupData() {
    this.props.dispatch(commissionGroupServiceObj.loadProducts());
    this.props.dispatch(commissionGroupServiceObj.loadDataTable());
  }
  groupAction(index) {
    this.setState({groupId: index});
    this.toggleModal();
  }
  componentDidMount() {
    this.loadGroupData();
  }
  componentWillUpdate(nextProps, nextState) {
    if(nextState.changedFlag == false && this.state.changedFlag == true) {
      this.loadGroupData();
    }
  }
  render() {
    const {group_list, products} = this.props;
    return (
      <Card>
        <CardHeader>
          <span className="h5">
            Manage Group
          </span>
          <Button color="primary" size="sm" className="float-right"><a href={`createRuleGroup`} >Add Group</a></Button>
        </CardHeader>
        <CardBody>
          {
            this.props.isLoading || this.props.isLoadingOpts ? <LoadingDiv /> : 
            <Table hover responsive striped size='sm'>
              <thead>
                <tr>
                  <th>Rule Code</th>
                  <th>Rule Name</th>
                  <th>Product Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  products.length > 0 &&
                  group_list.map((item, index) => (
                    <tr key={index}>
                      <td>{item.s_RuleCode}</td>
                      <td>{item.s_RuleDesc}</td>
                      <td>{products[item.n_Product_FK - 1].s_ProductName}</td>
                      <td><a href={`/ruleGroup/${item.n_CommRuleGroupMasters_PK}`} >Edit</a></td>
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

ViewGroup.propTypes = {
  dispatch: PropTypes.func.isRequired,  
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  isLoading: state.groupManageProcess.isLoading,
  isLoadingOpts: state.groupManageProcess.isLoadingOptions,
  group_list: state.groupManageProcess.groupDataSet,
  products: state.groupManageProcess.products,
  error: state.groupManageProcess.error,
});

export default connect(mapStateToProps)(ViewGroup);