import React, { Component } from "react";
import { connect } from 'react-redux';
import {Row, Col, Card, CardBody, CardHeader, Collapse, Button} from 'reactstrap';
import Coverage from "./Coverage";
import PropertyInfo from "./PropertyInfo";
import AdditionalInfo from "./AdditionalInfo";
import Billing from './Billing';
import { policyService } from "../../../../services/policyService";
import { isEmpty } from "lodash";
import Forms from './Forms';

class MoreInfo extends Component {
  constructor (props) {
    super(props);
    this.apiService = new policyService();
    this.state = {
      accordion: [false, false, false, false,false],
      BasicCovragesArray : [],
      OptionalCovragesArray : [],
      CovrageDiscountArray : [],
      PropertyData : {},
      AdditionalInfo : {},
      MortInfo : [],
      HouseHoldInfo : [],
      AddIntrestInfo : [],
      LossHistoryInfo : [],
      BillingAccViewInfo : [],
      PolicyformsData:[],
      MortCount:0,
    };
  }
  async toggleAccordion(tab) {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);
    this.setState({
      accordion: state,
    });
    let Policy_Number_PK = this.props.n_POPolicyMasterFK;
    let Policy_Number = this.props.policy_No;
    let Selected_Term_PK = this.props.TermMasterPK;
    let transPkByTerm = '';
    if(Policy_Number_PK != '' && Selected_Term_PK == ''){
      let PolicyPK = Policy_Number_PK;
      const param = {
        PolicyPK
      }
      let termDDData = await this.apiService.getTermDropDown(param);
      let termDD = termDDData.data;
      let TermMasterPKArray = termDD[0];
      const{n_TermMaster_PK:TermMasterPK} = TermMasterPKArray;
      Selected_Term_PK = TermMasterPK;
      const param1 = {
        TermMasterPK
      }
      let TransDDData = await this.apiService.getTransDropDown(param1);
      let TransDD = TransDDData.data;
      let TransPKArray = TransDD[0];
      const{n_potransaction_PK:TransPK} = TransPKArray;
      transPkByTerm = TransPK;
    }
    let Selected_Transaction_PK = this.props.n_potransaction_PK;
    if(Selected_Transaction_PK == ''){
      Selected_Transaction_PK = transPkByTerm;
    }
    let printFor = 'POLICY';
    const param = {
      Policy_Number_PK,
      Policy_Number,
      Selected_Term_PK,
      Selected_Transaction_PK,
      printFor
    }  

    if(state[0] == true){
      let BasicCovrages = await this.apiService.getBasicCoverages(param);
      this.setState({
        BasicCovragesArray: BasicCovrages.data,
      });
      let OptionalCovrages = await this.apiService.getOptionalCoverages(param);
      this.setState({
        OptionalCovragesArray : OptionalCovrages.data,
      });
      let CovrageDiscount = await this.apiService.getCoverageDiscount(param);
      this.setState({
        CovrageDiscountArray : CovrageDiscount.data,
      });
    }else if(state[1] == true){
      let PropertyData = await this.apiService.getPropertyData(param);
      if(isEmpty(this.state.PropertyData)){
        this.setState({
          PropertyData: PropertyData.data,
        });
      }
    }else if(state[2] == true){
      let AdditionalData = await this.apiService.getAdditionalData(param);
      this.setState({
        AdditionalInfo : AdditionalData.data,
      });
      let MortgageeData = await this.apiService.getMortgageeData(param);
      this.setState({
        MortInfo : MortgageeData.data,
      });
      let HouseHoldData = await this.apiService.getHouseHoldData(param);
      this.setState({
        HouseHoldInfo : HouseHoldData.data,
      });
      let AddInerestData = await this.apiService.getAddInerestData(param);
      this.setState({
        AddIntrestInfo :AddInerestData.data,
      });
      let LossHistoryData = await this.apiService.getLossHistoryData(param);
      this.setState({
        LossHistoryInfo : LossHistoryData.data,
      });
    }else if(state[3] == true){
      let BillingAccViewData = await this.apiService.getBillingAccViewData(param);
      this.setState({
        BillingAccViewInfo : BillingAccViewData.data,
      });
    }else if(state[4] == true){
      let PolicyFormDataArray = await this.apiService.getFormData(param);
      let PolicyFormData = PolicyFormDataArray.data;
      PolicyFormData = PolicyFormData['Forms'];
      let MortCount = PolicyFormData['MortCount'];
      this.setState({
        PolicyformsData : PolicyFormData,
        MortCount:MortCount
      });
    }
  }
  
  render() {
    return (
      <div>
        <Row className="mt-2">
          <Col xs="12" sm="12" lg="12" className="policy-view">
            <Card className="mb-0 no-border">
              <CardHeader className="headingOne">
                <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(0)} aria-expanded={this.state.accordion[0]} aria-controls="collapseOne">
                  <h5 className="m-0 p-0 d-inline-block">Coverage</h5>{<i className={this.state.accordion[0] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
                </Button>
              </CardHeader>
              <Collapse isOpen={this.state.accordion[0]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                <CardBody>
                  <Coverage isEdit={this.props.isEdit} BasicCovragesArray={this.state.BasicCovragesArray} OptionalCovragesArray={this.state.OptionalCovragesArray} CovrageDiscountArray={this.state.CovrageDiscountArray}/>
                </CardBody>
              </Collapse>
            </Card>
          </Col>
          <Col xs="12" sm="12" lg="12" className=" policy-view">
            <Card className="mb-0 no-border">
              <CardHeader className="headingOne">
                <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(1)} aria-expanded={this.state.accordion[1]} aria-controls="collapseTwo">
                  <h5 className="m-0 p-0 d-inline-block">Property Info</h5>{<i className={this.state.accordion[1] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
                </Button>
              </CardHeader>
              <Collapse isOpen={this.state.accordion[1]} data-parent="#accordion" id="collapseTwo" aria-labelledby="headingTwo">
                <CardBody>
                  <PropertyInfo isEdit={this.props.isEdit} PropertyData={this.state.PropertyData} inputChangedHandler={this.props.inputChangedHandler} inputChangedHandlerRR={this.props.inputChangedHandlerRR}/>
                </CardBody>
              </Collapse>
            </Card>
          </Col>
          <Col xs="12" sm="12" lg="12" className="policy-view">
            <Card className="mb-0 no-border">
              <CardHeader className="headingOne">
                <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(2)} aria-expanded={this.state.accordion[2]} aria-controls="collapseThree">
                  <h5 className="m-0 p-0 d-inline-block">Additional info </h5>{<i className={this.state.accordion[2] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
                </Button>
              </CardHeader>
              <Collapse isOpen={this.state.accordion[2]} data-parent="#accordion" id="collapseThree" aria-labelledby="headingThree">
                <CardBody>
                  <AdditionalInfo AdditionalInfo={this.state.AdditionalInfo} MortInfo={this.state.MortInfo} HouseHoldInfo={this.state.HouseHoldInfo} AddIntrestInfo={this.state.AddIntrestInfo} LossHistoryInfo={this.state.LossHistoryInfo} isEdit={this.props.isEdit} poTransaction_PK={this.props.n_potransaction_PK}/>
                </CardBody>
              </Collapse>
            </Card>
          </Col>
          <Col xs="12" sm="12" lg="12" className=" policy-view">
            <Card className="mb-0 no-border">
              <CardHeader className="headingOne">
                <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(3)} aria-expanded={this.state.accordion[3]} aria-controls="collapseFour">
                  <h5 className="m-0 p-0 d-inline-block">Billing</h5>{<i className={this.state.accordion[3] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
                </Button>
              </CardHeader>
              <Collapse isOpen={this.state.accordion[3]} data-parent="#accordion" id="collapseFour" aria-labelledby="headingFour">
                <Billing 
                   BillingAccViewInfo = {this.state.BillingAccViewInfo}
                />
              </Collapse>
            </Card>
          </Col>
          <Col xs="12" sm="12" lg="12" className=" policy-view">
            <Card className="mb-0 no-border">
              <CardHeader className="headingOne">
                <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(4)} aria-expanded={this.state.accordion[4]} aria-controls="collapseFive">
                  <h5 className="m-0 p-0 d-inline-block">Forms</h5>{<i className={this.state.accordion[4] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
                </Button>
              </CardHeader>
              <Collapse isOpen={this.state.accordion[4]} data-parent="#accordion" id="collapseFive" aria-labelledby="headingFive">
                <Forms PolicyformsData={this.state.PolicyformsData} MortCount={this.state.MortCount}/>
              </Collapse>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  policy_No : state.Policy.policy_No,
  n_POPolicyMasterFK : state.Policy.n_POPolicyMasterFK,
  TermMasterPK : state.Policy.TermMasterPK,
  n_potransaction_PK : state.Policy.n_potransaction_PK,
});
export default connect(mapStateToProps)(MoreInfo);
