import React, { Component } from "react";
import { connect } from "react-redux";
import {CardBody, Button, Input} from 'reactstrap';
import FormPolicy from './FormPolicy';
import { policyService } from "../../../../services/policyService";

class Forms extends Component {
  constructor (props) {
    super(props);
    this.apiService = new policyService();
    this.state = {
      activeView: 0,
      PolicyFormData:[],
      AgentFormData:[],
      CompFormData:[],
      MortFormData:[],
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
    
    if(view == 1){
      let printFor = 'COMP';
      const param = {
        Policy_Number_PK,
        Policy_Number,
        Selected_Term_PK,
        Selected_Transaction_PK,
        printFor
      } 
      let PolicyFormDataArray = await this.apiService.getFormData(param);
      let PolicyFormData = PolicyFormDataArray.data;
      PolicyFormData = PolicyFormData['Forms'];
      this.setState({
        CompFormData : PolicyFormData,
      });
    }else if(view == 2){
      let printFor = 'AGENT';
      const param = {
        Policy_Number_PK,
        Policy_Number,
        Selected_Term_PK,
        Selected_Transaction_PK,
        printFor
      } 
      let PolicyFormDataArray = await this.apiService.getFormData(param);
      let PolicyFormData = PolicyFormDataArray.data;
      PolicyFormData = PolicyFormData['Forms'];
      this.setState({
        AgentFormData : PolicyFormData,
      });
    }else if(view == 3){
      let printFor = 'MORT';
      const param = {
        Policy_Number_PK,
        Policy_Number,
        Selected_Term_PK,
        Selected_Transaction_PK,
        printFor
      } 
      let PolicyFormDataArray = await this.apiService.getFormData(param);
      let PolicyFormData = PolicyFormDataArray.data;
      PolicyFormData = PolicyFormData['Forms'];
      this.setState({
        MortFormData : PolicyFormData,
      });
    }
  }

  render () {
    const { PolicyformsData,MortCount } = this.props;
    const { activeView,CompFormData,AgentFormData,MortFormData } = this.state;
    return (
      <div className="height-300 overflow-y-auto overflow-x-hidden">
      <CardBody>
        <div className="no-padding-table  d-flex justify-content-between py-1 by-1-green">
          
          <div className="button new-place" style={{marginLeft:'30%'}}>
            <Button type="button" size="sm" className="mr-1 font-weight-bold" color="success" outline={`${activeView == 0 ? "" : "outline"}`} onClick={() => this.setActiveView(0)}><i className={`${activeView == 0 ? 'cui-envelope-letter icons font-2xl' : 'cui-envelope-closed icons font-2xl'}`}></i>&nbsp;&nbsp;Policy Holder Copy</Button>
            <Button type="button" size="sm" className="mr-1 font-weight-bold" color="success" outline={`${activeView == 1 ? "" : "outline"}`} onClick={() => this.setActiveView(1)}><i className={`${activeView == 1 ? 'cui-envelope-letter icons font-2xl' : 'cui-envelope-closed icons font-2xl'}`}></i>&nbsp;&nbsp;Company Copy</Button>
            <Button type="button" size="sm" className="mr-1 font-weight-bold" color="success" outline={`${activeView == 2 ? "" : "outline"}`} onClick={() => this.setActiveView(2)}><i className={`${activeView == 2 ? 'cui-envelope-letter icons font-2xl' : 'cui-envelope-closed icons font-2xl'}`}></i>&nbsp;&nbsp;Agent Copy</Button>
            {MortCount > 0 ? <Button type="button" size="sm" className="mr-1 font-weight-bold" color="success" outline={`${activeView == 3 ? "" : "outline"}`} onClick={() => this.setActiveView(3)}><i className={`${activeView == 3 ? 'cui-envelope-letter icons font-2xl' : 'cui-envelope-closed icons font-2xl'}`}></i>&nbsp;&nbsp;Mortgagee Copy</Button> : '' }
          </div>
          
        </div>
        {
          activeView == 0 &&
          <FormPolicy 
          PolicyformsData = {PolicyformsData}
          />
        }
        {
          activeView == 1 &&
          <FormPolicy 
          PolicyformsData = {CompFormData} 
          />
        }
        {
          activeView == 2 &&
          <FormPolicy 
          PolicyformsData = {AgentFormData} 
          />
        }
        {
          activeView == 3 &&
          <FormPolicy 
          PolicyformsData = {MortFormData} 
          />
        }
      </CardBody>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  policy_No : state.Policy.policy_No,
  n_POPolicyMasterFK : state.Policy.n_POPolicyMasterFK,
  SelTermMasterPK :state.Policy.TermMasterPK,
  SelPotransaction_PK : state.Policy.n_potransaction_PK,
});

export default connect(mapStateToProps)(Forms);
