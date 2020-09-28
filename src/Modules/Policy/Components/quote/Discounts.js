import React, {Component} from "react";
import {Card, CardBody, CardHeader, Col, Collapse, FormGroup, Input, Label, Row} from "reactstrap";
import {connect} from "react-redux";
import {updateQuoteParam} from "../../../../store/actions/policy";

class Discounts extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      data: {},
      policyData: {},
      quoteParams: {},
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
    this.setState({policyData: nextProps.policyData.data});
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
    let ProductSelected = '', sprinklersSelect = [], sprinklersOptions = [], gratedOptions = [];
    if (this.state.policyData) {
      ProductSelected = this.state.policyData.ProductSelected;
      const dropdownData = this.state.policyData.dropdownData;
      if (dropdownData) {
        if (ProductSelected == 3 || ProductSelected == 4 || ProductSelected == 5 || ProductSelected == 6 || ProductSelected == 13) {
          for (let item of dropdownData.MHSPRINKLER) {
            sprinklersOptions.push(<option value={item.s_AppCodeName}
                                           key={item.s_AppCodeName}>{item.s_AppCodeNameForDisplay}</option>);
          }
          sprinklersSelect = (
            <Col md="12">
              <FormGroup row>
                <Col md="5">
                  <Label>Automatic Sprinklers</Label>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Input type="select" id="SPRINKLER"
                           onChange={(e) => this.props.updateQuoteParam('SPRINKLER', null, e.target.value)}>
                      <option value="">--Select--</option>
                      {sprinklersOptions}
                    </Input>
                  </FormGroup>
                </Col>
              </FormGroup>
            </Col>
          );
        }
      }
    }

    return (
      <Card>
        <CardHeader>
          Discounts
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
              <Col md="12">
                <FormGroup row>
                  <Col md="9">
                    <Label>Central Fire Alarm</Label>
                  </Col>
                  <Col md="3">
                    <FormGroup check inline>
                      <Input type="checkbox" id="HOFIREALARM"
                             onChange={(e) => this.props.updateQuoteParam('HOFIREALARM', null, e.target.value)}/>
                    </FormGroup>
                  </Col>
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup row>
                  <Col md="9">
                    <Label>Central Burglar Alarm</Label>
                  </Col>
                  <Col md="3">
                    <FormGroup check inline>
                      <Input className="form-check-input" type="checkbox" id="HOBURGALARM"
                             onChange={(e) => this.props.updateQuoteParam('HOBURGALARM', null, e.target.value)}/>
                    </FormGroup>
                  </Col>
                </FormGroup>
              </Col>
              {(ProductSelected != 3 && ProductSelected != 4 && ProductSelected != 5 && ProductSelected != 6) &&
              <Col md="12">
                <FormGroup row>
                  <Col md="9">
                    <Label>Gated Community</Label>
                  </Col>
                  <Col md="3">
                    <FormGroup check inline>
                      <Input className="form-check-input" type="checkbox" id="HOGATEDCOMM"
                             onChange={(e) => this.props.updateQuoteParam('HOGATEDCOMM', null, e.target.value)}/>
                    </FormGroup>
                  </Col>
                </FormGroup>
              </Col>
              }
              {sprinklersSelect}
              <Col md="12">
                <FormGroup row>
                  <Col md="9">
                    <Label>Smoker Surcharge</Label>
                  </Col>
                  <Col md="3">
                    <FormGroup check inline>
                      <Input className="form-check-input" type="checkbox" id="s_Smoker" value="Yes"
                             onChange={(e) => this.props.updateQuoteParam('TbPoriskadditionalinfo', 's_Smoker', e.target.value)}/>
                    </FormGroup>
                  </Col>
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
  const {policyData, quoteParams} = state.Policy;
  return {policyData, quoteParams}
};
const mapDispatchToProps = {updateQuoteParam};
export default connect(mapStateToProps, mapDispatchToProps
)(Discounts);
