import React, {Component} from "react";
import {Button, Card, CardBody, CardHeader, Col, Collapse, FormGroup, Input, Label, Row} from "reactstrap";
import {connect} from "react-redux";
import {InputAdapter, TextMask} from "react-text-mask-hoc";
import {updateQuoteParam} from "../../../../store/actions/policy";

class PropertyDetails extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.onChangeStucType = this.onChangeStucType.bind(this);
    this.state = {
      data: {},
      policyData: {},
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
    this.setState({policyData: nextProps.policyData.data})
  }

  toggle() {
    this.setState({collapse: !this.state.collapse});
  }

  toggleFade() {
    this.setState((prevState) => {
      return {fadeIn: !prevState}
    });
  }

  onChangeStucType(event) {
    console.log(event);
  }

  render() {
    let addressInMapDiv = [], userAccess = '',
      siteUrl = 'http://127.0.0.1', isShowRCVBtn = true,
      ppcOptions = [], bcegOptions = [], structureOptions = [], constructionOptions = [], roofOptions = [],
      usageOptions = [];
    if (this.state.policyData) {
      const accessRights = this.state.policyData.accessRights;
      userAccess = accessRights ? accessRights.LevelName : '';

      if (userAccess === 'EMPLOYEE') {
        addressInMapDiv.push(
          <Col xs="12" md="12" key="ViewAddressMap">
            <FormGroup>
              <a href="#" id="ViewAddressMap">
                <i className="icon-map"></i>
              </a>
            </FormGroup>
          </Col>
        )
      }
      const dropdown = this.state.policyData.dropdownData;
      if (dropdown) {
        // 0: {s_AppCodeName: "N", s_AppCodeNameForDisplay: "N"}
        Object.keys(dropdown.PROTECTIONCLS).forEach((item) => {
          ppcOptions.push(
            <option key={dropdown.PROTECTIONCLS[item].s_AppCodeName}
                    value={dropdown.PROTECTIONCLS[item].s_AppCodeName}>
              {dropdown.PROTECTIONCLS[item].s_AppCodeNameForDisplay}
            </option>
          )
        });
        Object.keys(dropdown.HOBCEGCODE).forEach((item) => {
          bcegOptions.push(
            <option key={dropdown.HOBCEGCODE[item].s_AppCodeName}
                    value={dropdown.HOBCEGCODE[item].s_AppCodeName}>
              {dropdown.HOBCEGCODE[item].s_AppCodeNameForDisplay}
            </option>
          )
        });
        Object.keys(dropdown.STRUCTYPE).forEach((item) => {
          structureOptions.push(
            <option key={dropdown.STRUCTYPE[item].s_AppCodeName}
                    value={dropdown.STRUCTYPE[item].s_AppCodeName}>
              {dropdown.STRUCTYPE[item].s_AppCodeNameForDisplay}
            </option>
          )
        });
        Object.keys(dropdown.CONSTRTYPE).forEach((item) => {
          constructionOptions.push(
            <option key={dropdown.CONSTRTYPE[item].s_AppCodeName}
                    value={dropdown.CONSTRTYPE[item].s_AppCodeName}>
              {dropdown.CONSTRTYPE[item].s_AppCodeNameForDisplay}
            </option>
          )
        });
        Object.keys(dropdown.ROOFTYPE).forEach((item) => {
          roofOptions.push(
            <option key={dropdown.ROOFTYPE[item].s_AppCodeName}
                    value={dropdown.ROOFTYPE[item].s_AppCodeName}>
              {dropdown.ROOFTYPE[item].s_AppCodeNameForDisplay}
            </option>
          )
        });
        Object.keys(dropdown.HOUSAGETYPE).forEach((item) => {
          usageOptions.push(
            <option key={dropdown.HOUSAGETYPE[item].s_AppCodeName}
                    value={dropdown.HOUSAGETYPE[item].s_AppCodeName}>
              {dropdown.HOUSAGETYPE[item].s_AppCodeNameForDisplay}
            </option>
          )
        });
      }
    }

    return (
      <Card>
        <CardHeader>
          Property Details
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
                <FormGroup inline>
                  <Label htmlFor="n_ReplacementCost">ISO RCV</Label>
                  <Input name="data[TbPoriskadditionalinfo][n_ReplacementCost]" id="n_ReplacementCost" type="text"/>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup inline>
                  {isShowRCVBtn &&
                  <Button type="submit" size="sm" color="primary" className="mt-md-3 mb-md-n5">
                    <i className="fa fa-dot-circle-o"></i> Get RCV
                  </Button>
                  }
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="n_NoOfResidents">No. of residents</Label>
                  <Input name="data[TbPoriskadditionalinfo][n_NoOfResidents]" id="n_NoOfResidents" type="text"/>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="n_NoOfStories">No. of stories</Label>
                  <Input name="data[TbPoriskadditionalinfo][n_NoOfStories]" id="n_NoOfStories" type="text"/>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="PROTECTIONCLS">PPC</Label>
                  <Input name="data[TbPoriskadditionalinfo][PROTECTIONCLS]" id="PROTECTIONCLS"
                         type="select">
                    <option>--Select--</option>
                    {ppcOptions}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="HOBCEGCODE">BCEG</Label>
                  <Input name="data[TbPoriskadditionalinfo][s_BCEGCode]" id="HOBCEGCODE" type="select" value="">
                    <option value="">--Select--</option>
                    {bcegOptions}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="yearbuilt">Year Built</Label>
                  <TextMask mask={[/\d/, /\d/, /\d/, /\d/]}
                            Component={InputAdapter}
                            className="form-control" id="yearbuilt"
                            onChange={(e) => this.props.updateQuoteParam('yearbuilt', null, e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup inline className="row">
                  <Label htmlFor="n_HomeSqft" className="col-12">Area SqFt</Label>
                  <Input name="data[TbPoriskadditionalinfo][n_HomeSqft]" id="n_HomeSqft" type="number" maxLength="4"
                         className="col-md-8 ml-md-3"/>
                  <Button type="button" size="md" color="primary" className="ml-md-3"><i
                    className="fa fa-info"></i></Button>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="STRUCTYPE ">Structure Type</Label>
                  <Input name="data[TbPoriskadditionalinfo][s_StructureTypeCode]" id="STRUCTYPE"
                         onChange={e => this.onChangeStucType(e)}
                         type="select">
                    <option value="" selected="selected">--Select--</option>
                    {structureOptions}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="CONSTRTYPE">Construction Type</Label>
                  <Input type="select" name="data[TbPoriskadditionalinfo][s_ConstrTypeCode]" id="CONSTRTYPE">
                    <option value="">--Select--</option>
                    {constructionOptions}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="ROOFTYPE">Roof Type</Label>
                  <Input type="select" name="data[TbPoriskadditionalinfo][s_RoofTypeCode]" id="ROOFTYPE">
                    <option value="">--Select--</option>
                    {roofOptions}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" md="3" hidden="hidden">
                <FormGroup>
                  <Label htmlFor="ROOFSUBTYPE">Roof Sub-Type</Label>
                  <Input type="select" name="data[TbPoriskadditionalinfo][s_RoofCondition]" id="ROOFSUBTYPE">
                    <option value="-1">----</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="s_DistanceFromWater">Distance To Water (miles)</Label>
                  <Input type="text" name="data[TbPoriskadditionalinfo][s_DistanceFromWater]" id="s_DistanceFromWater"
                         disabled>
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="n_DistanceFireStation">Distance To Fire Stn (miles)</Label>
                  <Input type="text" name="data[TbPoriskadditionalinfo][n_DistanceFireStation]"
                         id="n_DistanceFireStation"/>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="s_DistanceFromWater">Distance To Hydrant (feet)</Label>
                  <Input type="text" name="data[TbPoriskadditionalinfo][n_DistanceHydrant]" id="n_DistanceHydrant"/>
                </FormGroup>
              </Col>
              <Col xs="12" md="3">
                <FormGroup>
                  <Label htmlFor="s_UsageTypeCode">Usage</Label>
                  <Input type="select" name="data[TbPoriskadditionalinfo][s_UsageTypeCode]" id="s_UsageTypeCode">
                    <option value="">--Select--</option>
                    {usageOptions}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" md="6">
                <p>Is this a new purchase?</p>
                <FormGroup check className="radio" inline>
                  <Input className="form-check-input" type="radio" id="mailcheckYes"
                         name="data[TbPersoninfo][s_IsMailAddDiff]" value="Yes"
                         onChange={() => this.props.onTogglePriorAddress(true)}/>
                  <Label check className="form-check-label" htmlFor="mailcheckYes">Yes</Label>
                </FormGroup>
                <FormGroup check className="radio" inline>
                  <Input className="form-check-input" type="radio" id="mailcheckNo"
                         name="data[TbPersoninfo][s_IsMailAddDiff]" value="No"
                         onChange={() => this.props.onTogglePriorAddress(false)}/>
                  <Label check className="form-check-label" htmlFor="mailcheckNo" onChange={() => {
                    this.props.onTogglePriorAddress(false)
                  }}>No</Label>
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
)(PropertyDetails);
