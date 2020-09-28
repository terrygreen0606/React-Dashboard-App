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
import * as commissionRuleServiceObj from "../../../../services/commissionRuleService";

class ViewRule extends Component {
  constructor (props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.ruleAction = this.ruleAction.bind(this);
    this.loadRuleData = this.loadRuleData.bind(this);
    this.state = {
      isOpenModal: false,
      ruleId: -1,
      changedFlag: false,
    }
  }
  toggleModal(change = false) {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
      changedFlag: change
    });
  }
  loadRuleData() {
    this.props.dispatch(commissionRuleServiceObj.loadDataTable());
    this.props.dispatch(commissionRuleServiceObj.loadOptions());
  }
  ruleAction(index) {
    this.setState({ruleId: index});
    this.toggleModal();
  }
  componentDidMount() {
    this.loadRuleData();
  }
  componentWillUpdate(nextProps, nextState) {
    if(nextState.changedFlag == true && this.state.changedFlag == false) {
      this.loadRuleData();
    }
  }
  render() {
    const {rule_list, commBaseTypeOpts, lobListOpts, productOpts, territoryOpts} = this.props;
    return (
      <Card>
        <CardHeader>
          <span className="h5">
            Manage Rules
          </span>
          <Button color="primary" size="sm" className="float-right"><a href={`createRule`} >Add Rule</a></Button>
        </CardHeader>
        <CardBody>
          {
            this.props.isLoading || this.props.isLoadingOptions ? <LoadingDiv /> : 
            <Table hover responsive striped size='sm'>
              <thead>
                <tr>
                  <th>Rule Name</th>
                  <th>Comm. Base Type</th>
                  <th>LOB</th>
                  <th>Product</th>
                  <th>Territory</th>
                  <th>Frq. Paymeny</th>
                  <th>Comm. Calc Type</th>
                  <th>Action</th>
                  <th>Rate of Comm.</th>
                  <th>Status</th>
                  <th>Eff. From</th>
                  <th>Eff. To</th>
                </tr>
              </thead>
              <tbody>
                {
                  rule_list.map((item, index) => (
                    <tr key={index}>
                      <td><a href={`/rule/${item.n_RuleId_PK}`} >{item.s_RuleName}</a></td>
                      <td>{commBaseTypeOpts[item.n_CommBaseTypeId_FK]}</td>
                      <td>{lobListOpts[item.n_LineOfBusinessId_PK]}</td>
                      <td>{productOpts[item.n_ProductId_FK]}</td>
                      <td>{territoryOpts[item.n_TerritoryId_FK]}</td>
                      <td>{item.s_FrequencyOfPaymentCode}</td>
                      <td>{item.s_PolicyAction}</td>
                      <td>{item.s_CommissionCalculationCode}</td>
                      <td>{( item.n_RateOfCommission ? item.n_RateOfCommission : '' )}</td>
                      <td>{item.s_RuleStatusCode}</td>
                      <td>{item.d_EffectiveFromDate}</td>
                      <td>{item.d_EffectiveToDate}</td>
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

ViewRule.propTypes = {
  dispatch: PropTypes.func.isRequired,  
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  isLoading: state.ruleManageProcess.isLoading,
  isLoadingOptions: state.ruleManageProcess.isLoadingOptions,
  rule_list: state.ruleManageProcess.ruleDataSet,
  error: state.ruleManageProcess.error,
  commBaseTypeOpts: state.ruleManageProcess.commBaseTypeOpts,
  lobListOpts: state.ruleManageProcess.lobListOpts,
  policyActionListOpts: state.ruleManageProcess.policyActionListOpts,
  territoryOpts: state.ruleManageProcess.territoryOpts,
  productOpts: state.ruleManageProcess.productOpts,
});

export default connect(mapStateToProps)(ViewRule);