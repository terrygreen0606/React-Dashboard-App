import React, {Component} from "react";
import {Card, CardBody, CardHeader, Col, Collapse, FormGroup, Input, Label, Row} from "reactstrap";
import {connect} from "react-redux";
import {updateQuoteParam} from "../../../../store/actions/policy";
import {policyService} from "../../../../services/policyService";
import {InputAdapter, TextMask} from "react-text-mask-hoc";

class UnderwritingQuestions extends Component {
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
      timeout: 300
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
          Underwriting Questions
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
                  <p className="font-weight-bold">PLEASE ANSWER ALL QUESTIONS IN THIS SECTION	</p>
                </FormGroup>
              </Col>

              <Col xs="12" md="4">
                <FormGroup check inline>
                  <p className="font-weight-bold">Yes</p>
                </FormGroup>
                <FormGroup check inline>
                  <p className="font-weight-bold">No</p>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="8">
                <FormGroup>
                  <p>Do you have wood burning stove at home?	</p>
                </FormGroup>
              </Col>
              <Col xs="12" md="4">
                <FormGroup check inline>
                  <Input className="form-check-input" type="radio" id="listalllossesRadioYes" name="listalllossesRadio"
                         value="Yes"/>
                  <Label className="form-check-label" check htmlFor="listalllossesRadioYes">Yes</Label>
                </FormGroup>
                <FormGroup check inline>
                  <Input className="form-check-input" type="radio" id="listalllossesRadioYes" name="listalllossesRadio"
                         value="No"/>
                  <Label className="form-check-label" check htmlFor="listalllossesRadioYes">No</Label>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="8">
                <FormGroup>
                  <p>Does the applicant have at least 1 year of current homeowner insurance, unless a first time home buyer?		</p>
                </FormGroup>
              </Col>
              <Col xs="12" md="4">
                <FormGroup check inline>
                  <Input className="form-check-input" type="radio" id="listalllossesRadioYes" name="listalllossesRadio"
                         value="Yes"/>
                  <Label className="form-check-label" check htmlFor="listalllossesRadioYes">Yes</Label>
                </FormGroup>
                <FormGroup check inline>
                  <Input className="form-check-input" type="radio" id="listalllossesRadioYes" name="listalllossesRadio"
                         value="No"/>
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
)(UnderwritingQuestions);
