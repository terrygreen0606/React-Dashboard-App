import React, {Component} from "react";
import {Card, CardBody, CardHeader, Col, Collapse, FormGroup, Input, Label, Row} from "reactstrap";
import {connect} from "react-redux";
import {updateQuoteParam} from "../../../../store/actions/policy";

class MailingAddress extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      data: {},
      policyData: {},
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
    let homeDirection = [], homeAddrType=[];
    if (this.state.policyData) {

      const dropdown = this.state.policyData.dropdownData;
      console.log(this.state.policyData,'policyData')
      if (dropdown) {
        // 0: {s_AppCodeName: "N", s_AppCodeNameForDisplay: "N"}
        Object.keys(dropdown.HOMEADDRESSDIRECTION).forEach((item) => {
          homeDirection.push(
            <option key={dropdown.HOMEADDRESSDIRECTION[item].s_AppCodeName}
                    value={dropdown.HOMEADDRESSDIRECTION[item].s_AppCodeName}>
              {dropdown.HOMEADDRESSDIRECTION[item].s_AppCodeNameForDisplay}
            </option>
          )
        });
        Object.keys(dropdown.HOMEADDRESSTYPE).forEach((item) => {
          homeAddrType.push(
            <option key={dropdown.HOMEADDRESSTYPE[item].s_AppCodeName}
                    value={dropdown.HOMEADDRESSTYPE[item].s_AppCodeName}>
              {dropdown.HOMEADDRESSTYPE[item].s_AppCodeNameForDisplay}
            </option>
          )
        });
      }
    }
    return (
      <Card>
        <CardHeader>
          Mailing Address
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
                  <Label htmlFor="s_HouseNo_Mail">House No</Label>
                  <Input id="s_HouseNo_Mail" type="text"
                         onChange={(e) => this.props.updateQuoteParam('TbPersonaddressMail', 's_HouseNo', e.target.value)}/>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="s_HouseDirection1_Mail">Direction</Label>
                  <Input id="s_HouseDirection1_Mail" type="select"
                         onChange={(e) => this.props.updateQuoteParam('TbPersonaddressMail', 's_HouseDirection1', e.target.value)}>
                    <option value="">Select</option>
                    {homeDirection}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="s_StreetName">Street Name</Label>
                  <Input id="s_StreetName" type="text"
                         onChange={(e) => this.props.updateQuoteParam('TbPersoninfo', 's_StreetName', e.target.value)}/>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="s_StreetName_Mail">Type</Label>
                  <Input id="s_StreetName_Mail" type="select"
                         onChange={(e) => this.props.updateQuoteParam('s_StreetName_Mail', null, e.target.value)}>
                    <option value="">Select</option>
                    {homeAddrType}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="s_PostalCode1">Zip</Label>
                  <Input id="s_PostalCode1" maxLength="10" type="text"
                         onChange={(e) => this.props.updateQuoteParam('TbPersonaddressMail', 's_PostalCode', e.target.value)}/>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="n_CityId_FKName1">City</Label>
                  <Input name="n_CityId_FKName1" id="n_CityId_FKName1" type="text" readOnly tabIndex="-1"
                         onChange={(e) => this.props.updateQuoteParam('n_CityId_FKName1', null, e.target.value)}/>
                  <Input name="data[TbPersonaddressMail][n_CityId_FK]" id="n_CityId_FK1" type="hidden"/>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="n_StateId_FKName1">State</Label>
                  <Input type="text" name="n_StateId_FKName1" id="n_StateId_FKName1" readOnly tabIndex="-1"
                         onChange={(e) => this.props.updateQuoteParam('n_StateId_FKName1', null, e.target.value)}/>
                  <Input type="hidden" name="data[TbPersonaddressMail][n_StateId_FK]" id="n_StateId_FK1" tabIndex="-1"/>
                  <Input type="hidden" name="data[TbPersonaddressMail][n_CountryId_FK]" id="n_CountryId_FK1"
                         tabIndex="-1"/>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="s_HouseDirection1">Direction</Label>
                  <Input type="select" name="data[TbPersonaddress][s_HouseDirection2]" id="s_HouseDirection2"
                         onChange={(e) => this.props.updateQuoteParam('TbPersonaddress', 's_HouseDirection2', e.target.value)}>
                    <option value="">Select</option>
                    {homeDirection}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
              </Col>
              <Col xs="12" md="3">
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="n_CountyId_FKName1">County</Label>
                  <Input type="text" name="n_CountyId_FKName1" id="n_CountyId_FKName1" readOnly tabIndex="-1"
                         onChange={(e) => this.props.updateQuoteParam('n_CountyId_FKName1', null, e.target.value)}/>
                  <Input type="hidden" name="data[TbPersonaddressMail][n_CountyId_FK]" id="n_CountyId_FK1" readOnly/>
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
  const {policyData} = state.Policy;
  return {policyData}
};
const mapDispatchToProps = {updateQuoteParam};
export default connect(mapStateToProps, mapDispatchToProps
)(MailingAddress);
