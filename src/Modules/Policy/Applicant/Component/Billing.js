import React, { Component } from "react";
import { connect } from "react-redux";
import {CardBody, Button, Input} from 'reactstrap';

import BillingAccount from './BillingAccount';
import BillingReceivable from './BillingReceivable';
import BillingSubLedger from './BillingSubLedger';
import BillingInvoice from './BillingInvoice';
import { policyService } from "../../../../services/policyService";

class Billing extends Component {
  constructor (props) {
    super(props);
    this.apiService = new policyService();
    this.state = {
      activeView: 0,
      BillingRecViewInfo : [],
      BillingInvInfo : [],
      BillingSubLedgInfo : [],
    };
  }

  async setActiveView(view) {
    this.setState({
      activeView: view
    });
    let Policy_Number_PK = this.props.n_POPolicyMasterFK;
    let Policy_Number = this.props.policy_No;
    let Selected_Term_PK = this.props.SelTermMasterPK;
    let Selected_Transaction_PK = this.props.SelPotransaction_PK;
    const param = {
      Policy_Number_PK,
      Policy_Number,
      Selected_Term_PK,
      Selected_Transaction_PK
    } 
    if(view == 1){
      let BillingRecViewData = await this.apiService.getBillingRecViewData(param);
      this.setState({
        BillingRecViewInfo : BillingRecViewData.data,
      });
    }else if(view == 2){
      let BillingInvData = await this.apiService.getBillingInvData(param);
      this.setState({
        BillingInvInfo : BillingInvData.data,
      });
    }else if(view == 3){
      let BillingSubLedgData = await this.apiService.getBillingSubLedgData(param);
      this.setState({
        BillingSubLedgInfo : BillingSubLedgData.data,
      });
    }
  }

  render () {
    const { billing,BillingAccViewInfo } = this.props;
    const { activeView,BillingRecViewInfo,BillingInvInfo,BillingSubLedgInfo } = this.state;
    return (
      <CardBody>
        <div className="no-padding-table  d-flex justify-content-between py-1 by-1-green">
          <div className="button new-place">
            <button className={`btn btn-sm ${activeView == 0 ? 'btn-primary' : 'btn-secondary'}`} onClick={() => this.setActiveView(0)}>Account View</button>
            <button className={`btn btn-sm ${activeView == 1 ? 'btn-primary' : 'btn-secondary'}`} onClick={() => this.setActiveView(1)}>Receivable View</button>
            <button className={`btn btn-sm ${activeView == 2 ? 'btn-primary' : 'btn-secondary'}`} onClick={() => this.setActiveView(2)}>Invoicing</button>
            <button className={`btn btn-sm ${activeView == 3 ? 'btn-primary' : 'btn-secondary'}`} onClick={() => this.setActiveView(3)}>Sub Leger</button>
          </div>
          <div className="new-place">
            <Input type="input" size="sm" className="mr-1 d-inline-block" style={{width: '200px'}} disabled/>
            <Button color="danger" size="sm" className="mr-1"
            >Unposted</Button>
            <Button color="primary" size="sm"
            >PAY ONLINE</Button>
          </div>
        </div>
        {
          activeView == 0 &&
          <BillingAccount 
          billing={billing.Account} 
          BillingAccViewInfo = {BillingAccViewInfo}
          />
        }
        {
          activeView == 1 &&
          <BillingReceivable 
          billing={billing.Receivable}
          BillingRecViewInfo = {BillingRecViewInfo} 
          />
        }
        {
          activeView == 2 &&
          <BillingInvoice 
          billing={billing.Invoice}
          BillingInvInfo = {BillingInvInfo} 
          />
        }
        {
          activeView == 3 &&
          <BillingSubLedger 
          billing={billing.SubLedger}
          BillingSubLedgInfo = {BillingSubLedgInfo} 
          />
        }
      </CardBody>
    )
  }
}

const mapStateToProps = (state) => ({
  billing: state.Policy.policyData.Billing,
  policy_No : state.Policy.policy_No,
  n_POPolicyMasterFK : state.Policy.n_POPolicyMasterFK,
  SelTermMasterPK :state.Policy.TermMasterPK,
  SelPotransaction_PK : state.Policy.n_potransaction_PK,
});

export default connect(mapStateToProps)(Billing);