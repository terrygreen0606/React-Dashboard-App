import React, {Component} from "react";
import {Card, CardBody, CardHeader, Col, Collapse, FormGroup, Input, Label, Row} from "reactstrap";
import {connect} from "react-redux";
import {updateQuoteParam} from "../../../../store/actions/policy";
import {policyService} from "../../../../services/policyService";
import {InputAdapter, TextMask} from "react-text-mask-hoc";

class ClaimQuestion extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.getInitData = this.getInitData.bind(this);
    this.state = {
      data: {},
      policyData: {},
      quoteParams: {},
      collapse: true,
      fadeIn: true,
      timeout: 300,
      deductNonHurricaneData: {},
      deductHurricaneData: {}
    };
  }

  async componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
    this.setState({policyData: nextProps.policyData.data});
    this.setState({sessionData: nextProps.sessionData.data});
    const n = setInterval(() => {
      if (this.state.sessionData && this.state.policyData) {
        clearInterval(n);
        this.getInitData();
      }
    })
  }

  async getInitData() {
  }

  toggle() {
    this.setState({collapse: !this.state.collapse});
  }

  toggleFade() {
    this.setState((prevState) => {
      return {fadeIn: !prevState}
    });
  }

  render() {
    return (
      <Card>
        <CardHeader>
          Claim Question
          <div className="card-header-actions">
            {/*eslint-disable-next-line*/}
            <a className="card-header-action btn btn-minimize" data-target="#collapseExample"
               onClick={this.toggle}><i className="icon-arrow-up"></i></a>
            {/*eslint-disable-next-line*/}
            <a className="card-header-action btn btn-close" onClick={this.toggleFade}>
              <i className="icon-close"></i>
            </a>
          </div>
        </CardHeader>
        <Collapse isOpen={this.state.collapse} id="collapseExample">
          <CardBody>
            <Row>
              <Col xs="12" md="8">
                <FormGroup>
                  <p className="font-weight-bold">MONTH & YEAR THE PROPERTY TO BE INSURED WAS PURCHASED BY THE
                    APPLICANT.</p>
                </FormGroup>
              </Col>
              <Col xs="12" md="4">
                <FormGroup check inline>
                  <TextMask mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]} Component={InputAdapter}
                            className="form-control" id="d_InsuredLivingDate"
                            onChange={(e) => this.props.updateQuoteParam('TbPolicy', 'd_InsuredLivingDate', e.target.value)}
                  />
                  <Label htmlFor="d_InsuredLivingDate" className="ml-3">(YYYY-MM)</Label>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="8">
                <FormGroup>
                  <p className="font-weight-bold">Do you have any losses occured in last 5 years?</p>
                </FormGroup>
              </Col>
              <Col xs="12" md="4">
                <FormGroup check inline>
                  <Input className="form-check-input" type="radio" id="listalllossesRadioYes" name="listalllossesRadio"
                         value="Yes" onChange={()=>{this.props.onTogglePriorLossList(true)}}/>
                  <Label className="form-check-label" check htmlFor="listalllossesRadioYes">Yes</Label>
                </FormGroup>
                <FormGroup check inline>
                  <Input className="form-check-input" type="radio" id="listalllossesRadioYes" name="listalllossesRadio"
                         value="No" onChange={()=>{this.props.onTogglePriorLossList(false)}}/>
                  <Label className="form-check-label" check htmlFor="listalllossesRadioYes">No</Label>
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Collapse>
      </Card>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {policyData, quoteParams, sessionData} = state.Policy;
  return {policyData, quoteParams, sessionData}
};
const mapDispatchToProps = {updateQuoteParam};
export default connect(mapStateToProps, mapDispatchToProps
)(ClaimQuestion);
