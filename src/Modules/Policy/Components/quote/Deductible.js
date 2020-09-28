import React, {Component} from "react";
import {Card, CardBody, CardHeader, Col, Collapse, FormGroup, Input, Label, Row} from "reactstrap";
import {connect} from "react-redux";
import {updateQuoteParam} from "../../../../store/actions/policy";
import {policyService} from "../../../../services/policyService";

class Deductible extends Component {
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
    },1000)
  }

  async getInitData() {
    const sessionData = this.state.sessionData;
    let Nonhurucanededu, hurucanededu;
    if (!sessionData['PotransactionPK']) {
      Nonhurucanededu = this.state.policyData.Nonhurucanededu;
      hurucanededu = this.state.policyData.hurucanededu;
      if (!Nonhurucanededu) {
        Nonhurucanededu = 'DED1000'
      }
      if (!hurucanededu) {
        hurucanededu = 'HURRA02P'
      }
    }
    const apiService = new policyService();
    const deductNonHurricaneData = await apiService.getDeductibleDiscount(
      {
        Coverage_PK: this.state.policyData.all_Coverage_nhdeduc,
        s_OptionType: 'CVG_DISCOUNT',
        SelectedValue: Nonhurucanededu,
        ProductSelected: 1
      }
    ).catch(e => {
      console.log(e);
    });
    this.setState({'deductNonHurricaneData': deductNonHurricaneData.data});

    const deductHurricaneData = await apiService.getDeductibleDiscount(
      {
        Coverage_PK: this.state.policyData.all_Coverage_hdeduc,
        s_OptionType: 'CVG_DISCOUNT',
        SelectedValue: hurucanededu,
        ProductSelected: 1
      }
    ).catch(e => {
      console.log(e);
    });
    this.setState({'deductHurricaneData': deductHurricaneData.data});
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
    let ddDeductNonHurricane = [], ddDeductHurricane = [], nonHurricaneValue = '', hurricaneValue = '';
    if (this.state.deductNonHurricaneData.length > 0) {

      for (let item of this.state.deductNonHurricaneData) {
        if (item.selected) {
          nonHurricaneValue = item.value;
        }
        if (this.state.policyData.ProductSelected === 13) {

          if (item.value !== 'DED500') {
            ddDeductNonHurricane.push(<option key={item.value} value={item.value}>{item.text}</option>)
          }
        } else {
          ddDeductNonHurricane.push(<option key={item.value} value={item.value}>{item.text}</option>)
        }
      }
    }
    let ddDeductNonHurricaneSelect = (
      <Input name="ddDeductNonHurricane" id="ddDeductNonHurricane" type="select" value={nonHurricaneValue}
             onChange={(e) => this.props.updateQuoteParam('TbNonHurricane', 'TbNonHurricane', e.target.value)}>
        <option value="">--Select--</option>
        {ddDeductNonHurricane}
      </Input>
    );

    if (this.state.deductHurricaneData.length > 0) {
      for (let item of this.state.deductHurricaneData) {
        if (item.selected) {
          hurricaneValue = item.value;
        }
        if (this.state.policyData.ProductSelected === 13) {

          if (item.value !== 'DED500') {
            ddDeductHurricane.push(<option key={item.value} value={item.value}>{item.text}</option>)
          }
        } else {
          ddDeductHurricane.push(<option key={item.value} value={item.value}>{item.text}</option>)
        }
      }
    }
    let ddDeductHurricaneSelect = (
      <Input name="ddDeductHurricane" id="ddDeductHurricane" type="select" value={hurricaneValue}
             onChange={(e) => this.props.updateQuoteParam('TbHurricane', 'TbHurricane', e.target.value)}>
        <option value="">--Select--</option>
        {ddDeductHurricane}
      </Input>
    );
    return (
      <Card>
        <CardHeader>
          Deductible
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
              <Col xs="12" md="6">
                <FormGroup>
                  <Label htmlFor="ddDeductNonHurricane">Non Hurricane</Label>
                  {ddDeductNonHurricaneSelect}
                </FormGroup>
              </Col>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label htmlFor="ddDeductHurricane">Hurricane</Label>
                  {ddDeductHurricaneSelect}
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
)(Deductible);
