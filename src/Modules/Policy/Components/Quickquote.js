import React, {Component} from "react";
import {connect} from "react-redux";
import ApplicantInfo from "./quote/Applicantinfo"
import MailingAddress from "./quote/MailingAddress";
import PropertyDetails from "./quote/PropertyDetails";
import PriorCurrentAddress from "./quote/PriorCurrentAddress";
import BasicCoverage from "./quote/BasicCoverage";
import Deductible from "./quote/Deductible";
import Discounts from "./quote/Discounts";
import WindMitigationCredits from "./quote/WindMitigationCredits";
import Col from "reactstrap/es/Col";
import Row from "reactstrap/es/Row";
import ClaimQuestion from "./quote/ClaimQuestion";
import PriorLossList from "./quote/PriorLossList";
import UnderwritingQuestions from "./quote/UnderwritingQuestions";
import CalcPremium from "./quote/CalcPremium";

class Quickquote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      policyData: {},
      isShowPriorLossList: false,
      isShowMailing: false,
      isShowPriorAddress: false,
      toggleMailing: this.toggleMailing.bind(this),
      togglePriorAddress: this.togglePriorAddress.bind(this),
      togglePriorLossList: this.togglePriorLossList.bind(this),
    };
  }

  toggleMailing(value) {
    this.setState({isShowMailing: value})
  }

  togglePriorAddress(value) {
    this.setState({isShowPriorAddress: value})
  }

  togglePriorLossList(value) {
    this.setState({isShowPriorLossList: value})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
    this.setState({policyData: nextProps.policyData.data})
  }


  render() {
    let policyData = this.state.policyData;
    return (
      <>
        <ApplicantInfo onToggleMailing={this.state.toggleMailing}/>
        {this.state.isShowMailing &&
        <MailingAddress/>
        }
        <PropertyDetails onTogglePriorAddress={this.state.togglePriorAddress}/>
        {this.state.isShowPriorAddress &&
        <PriorCurrentAddress/>
        }
        <BasicCoverage/>
        <Deductible/>
        <Row>
          <Col xs="12" md="4">
            <Discounts/>
          </Col>
          {policyData.ProductSelected != 3 && policyData.ProductSelected != 4 &&
          policyData.ProductSelected != 5 && policyData.ProductSelected != 6 &&
          <Col xs="12" md="8">
            <WindMitigationCredits/>
          </Col>
          }
        </Row>
        {(policyData.ProductSelected == 1 || policyData.ProductSelected == 2 ||
          policyData.ProductSelected == 7 || policyData.ProductSelected == 8 ||
          policyData.ProductSelected == 9 || policyData.ProductSelected == 13) &&
        <ClaimQuestion onTogglePriorLossList={this.state.togglePriorLossList}/>
        }
        {this.state.isShowPriorLossList &&
        <PriorLossList/>
        }
        <UnderwritingQuestions/>
        <CalcPremium/>
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {policyData} = state.Policy;
  return {policyData}
};
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps
)(Quickquote);
