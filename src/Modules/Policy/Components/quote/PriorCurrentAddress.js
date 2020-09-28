import React, {Component} from "react";
import {Card, CardBody, CardHeader, Col, Collapse, FormGroup, Input, Label, Row} from "reactstrap";
import {connect} from "react-redux";
import {updateQuoteParam} from "../../../../store/actions/policy";

class PriorCurrentAddress extends Component {
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

  componentDidMount() {
    this.setState({data: this.props.data});
    this.setState({policyData: this.props.policyData.data});
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
    let homeDirection = [], addressDirection = [], homeaddressType = [];
    if (this.state.policyData) {
      const dropdownData = this.state.policyData.dropdownData;
      if (dropdownData) {
        for (let item of dropdownData.HOMEADDRESSDIRECTION) {
          homeDirection.push(
            <option value={item.s_AppCodeName} key={item.s_AppCodeName}>{item.s_AppCodeNameForDisplay}</option>
          );
        }
        for (let item of dropdownData.HOMEADDRESSTYPE) {
          homeaddressType.push(
            <option value={item.s_AppCodeName} key={item.s_AppCodeName}>{item.s_AppCodeNameForDisplay}</option>
          );
        }
        for (let item of dropdownData.HOMEADDRESSDIRECTION) {
          addressDirection.push(
            <option value={item.s_AppCodeName} key={item.s_AppCodeName}>{item.s_AppCodeNameForDisplay}</option>
          );
        }
      }
    }

    return (
      <Card>
        <CardHeader>
          Prior or Current Address
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
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="s_HouseNo_Prior">House No</Label>
                  <Input id="s_HouseNo_Prior" type="text"
                         onChange={(e) => this.props.updateQuoteParam('TbPersonaddressPrior', 's_HouseNo', e.target.value)}/>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="s_HouseNo_Prior">Direction</Label>
                  <Input id="s_HouseNo_Prior" type="select"
                         onChange={(e) => this.props.updateQuoteParam('TbPersonaddressPrior', 's_HouseDirection1', e.target.value)}>
                    <option value="" selected="selected">Select</option>
                    {homeDirection}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="s_StreetName_Prior">Street Name</Label>
                  <Input id="s_StreetName_Prior" type="text"
                         onChange={(e) => this.props.updateQuoteParam('TbPersonaddressPrior', 's_StreetName', e.target.value)}/>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="s_HouseNo_Prior">Type</Label>
                  <Input id="s_HouseNo_Prior" type="select"
                         onChange={(e) => this.props.updateQuoteParam('TbPersonaddressPrior', 's_HouseType', e.target.value)}>
                    <option value="" selected="selected">Select</option>
                    {homeaddressType}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="s_PostalCode2">Zip</Label>
                  <Input id="s_PostalCode2" type="text" maxLength="10"
                         onChange={(e) => this.props.updateQuoteParam('TbPersonaddressPrior', 's_PostalCode', e.target.value)}/>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="n_CityId_FK2">City</Label>
                  <Input id="n_CityId_FK2" type="text" readOnly
                         onChange={(e) => this.props.updateQuoteParam('TbPersonaddressPrior', 'n_CityId_FK', e.target.value)}/>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="n_StateId_FK2">State</Label>
                  <Input id="n_StateId_FK2" type="text" readOnly
                         onChange={(e) => this.props.updateQuoteParam('TbPersonaddressPrior', 'n_StateId_FK', e.target.value)}/>
                  <Input id="n_CountryId_FK2" type="hidden" readOnly
                         onChange={(e) => this.props.updateQuoteParam('TbPersonaddressPrior', 'n_CountryId_FK', e.target.value)}/>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="s_HouseDirection2_Prior">Direction</Label>
                  <Input id="s_HouseDirection2_Prior" type="select"
                         onChange={(e) => this.props.updateQuoteParam('TbPersonaddressPrior', 's_HouseDirection2', e.target.value)}>
                    <option value="" selected="selected">Select</option>
                    {addressDirection}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" md="3"/>
              <Col xs="12" md="3"/>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="n_CountyId_FKName2">County</Label>
                  <Input id="n_CountyId_FKName2" type="text" readOnly
                         onChange={(e) => this.props.updateQuoteParam('TbPersonaddressPrior', 'n_CountyId_FK', e.target.value)}/>
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
)(PriorCurrentAddress);
