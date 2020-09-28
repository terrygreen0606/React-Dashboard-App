import React, {Component} from "react";
import {Card, CardBody, CardHeader, Col, Collapse, FormGroup, Row} from "reactstrap";
import {connect} from "react-redux";
import {updateQuoteParam} from "../../../../store/actions/policy";
import {policyService} from "../../../../services/policyService";
import Button from "reactstrap/es/Button";

class CalcPremium extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.getInitData = this.getInitData.bind(this);
    this.quoteEntry = this.quoteEntry.bind(this);
    this.apiService = new policyService();
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

  componentDidMount() {
  }

  async getInitData() {
  }

  async quoteEntry(){
    const params = this.props.quoteParams;
    const result = await this.apiService.quoteEntry(params);
    console.log(result);
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
          <Button color="primary" onClick={this.quoteEntry} size={'lg'}
                  className="mx-auto card-header-action btn btn-minimize text-white">Rate</Button>
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
              <Col xs="12" md="4" className="offset-md-4">
                <FormGroup>
                  <h1 className="font-weight-bold">Premium: </h1>
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
)(CalcPremium);
