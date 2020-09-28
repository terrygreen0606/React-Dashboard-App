import React, {Component} from "react";
import {Card, CardBody, CardHeader, Col, Collapse, FormGroup, Input, Label, Row} from "reactstrap";
import {connect} from "react-redux";
import {updateQuoteParam} from "../../../../store/actions/policy";

class WindMitigationCredits extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.writeValueHOROOFCOVER = this.writeValueHOROOFCOVER.bind(this);
    this.writeValueHOROOFDECKATT = this.writeValueHOROOFDECKATT.bind(this);
    this.writeValueHOROOFWALLCONN = this.writeValueHOROOFWALLCONN.bind(this);
    this.writeValueHOWINDOWPROTECT = this.writeValueHOWINDOWPROTECT.bind(this);
    this.writeValuePLROOFSHAPE = this.writeValuePLROOFSHAPE.bind(this);
    this.writeValuessecwaterresistcode = this.writeValuessecwaterresistcode.bind(this);
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

  writeValueHOROOFCOVER(event) {
    this.props.updateQuoteParam('TbPoriskadditionalinfo', 's_roofcovercode', event.target.value)
  }

  writeValueHOROOFDECKATT(event) {
    this.props.updateQuoteParam('TbPoriskadditionalinfo', 's_roofdeckattachcode', event.target.value)
  }

  writeValueHOROOFWALLCONN(event) {
    this.props.updateQuoteParam('TbPoriskadditionalinfo', 's_roof_wallconnectcode', event.target.value)
  }

  writeValuePLROOFSHAPE(event) {
    this.props.updateQuoteParam('TbPoriskadditionalinfo', 's_RoofShapeCode', event.target.value)
  }

  writeValueHOWINDOWPROTECT(event) {
    this.props.updateQuoteParam('TbPoriskadditionalinfo', 's_windowprotectcode', event.target.value)
  }

  writeValuessecwaterresistcode(event) {
    this.props.updateQuoteParam('TbPoriskadditionalinfo', 's_secwaterresistcode', event.target.value)
  }

  render() {
    let roofCoverOptions = [], roofDeckOptions = [], roofWallOptions = [], roofShapeOptions = [],
      windowProtectOptions = [], secWaterResistOptions = [], terrainOptions = [], windSpeedOptions = [];
    if (this.state.policyData) {
      const dropdownData = this.state.policyData.dropdownData;
      if (dropdownData) {
        for (let item of dropdownData.HOROOFCOVER) {
          roofCoverOptions.push(
            <option value={item.s_AppCodeName} key={item.s_AppCodeName}>{item.s_AppCodeNameForDisplay}</option>
          );
        }
        for (let item of dropdownData.HOROOFDECKATT) {
          roofDeckOptions.push(
            <option value={item.s_AppCodeName} key={item.s_AppCodeName}>{item.s_AppCodeNameForDisplay}</option>
          );
        }
        for (let item of dropdownData.HOROOFWALLCONN) {
          roofWallOptions.push(
            <option value={item.s_AppCodeName} key={item.s_AppCodeName}>{item.s_AppCodeNameForDisplay}</option>
          );
        }
        for (let item of dropdownData.PLROOFSHAPE) {
          roofShapeOptions.push(
            <option value={item.s_AppCodeName} key={item.s_AppCodeName}>{item.s_AppCodeNameForDisplay}</option>
          );
        }
        for (let item of dropdownData.HOWINDOWPROTECT) {
          if (item.s_AppCodeNameForDisplay === 'None') item.s_AppCodeNameForDisplay = 'Other';
          windowProtectOptions.push(
            <option value={item.s_AppCodeName} key={item.s_AppCodeName}>{item.s_AppCodeNameForDisplay}</option>
          );
        }
        for (let item of dropdownData.HOWATERRESIST) {
          secWaterResistOptions.push(
            <option value={item.s_AppCodeName} key={item.s_AppCodeName}>{item.s_AppCodeNameForDisplay}</option>
          );
        }

        Object.keys(dropdownData.TERRAINDD).forEach((value)=>{
          terrainOptions.push(
            <option value={value} key={value}>{dropdownData.TERRAINDD[value]}</option>
          );
        });
        Object.keys(dropdownData.FBCWINDSPEED).forEach((value)=>{
          windSpeedOptions.push(
            <option value={value} key={value}>{dropdownData.FBCWINDSPEED[value]}</option>
          );
        });
      }
    }

    return (
      <Card>
        <CardHeader>
          Wind Mitigation Credits
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
                  <Label htmlFor="HOROOFCOVER">Roof Cover(FBC)</Label>
                  <Input id="HOROOFCOVER" type="select"
                         onChange={(e) => this.writeValueHOROOFCOVER(e)}>
                    <option value="">--Select--</option>
                    {roofCoverOptions}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label htmlFor="HOROOFDECKATT">Roof Deck Attachment</Label>
                  <Input id="HOROOFDECKATT" type="select"
                         onChange={(e) => this.writeValueHOROOFCOVER(e)}>
                    <option value="">--Select--</option>
                    {roofDeckOptions}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label htmlFor="HOROOFWALLCONN">Roof-Wall Connection</Label>
                  <Input id="HOROOFWALLCONN" type="select"
                         onChange={(e) => this.writeValueHOROOFWALLCONN(e)}>
                    <option value="">--Select--</option>
                    {roofWallOptions}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label htmlFor="PLROOFSHAPE">Roof Shape</Label>
                  <Input id="PLROOFSHAPE" type="select"
                         onChange={(e) => this.writeValuePLROOFSHAPE(e)}>
                    <option value="">--Select--</option>
                    {roofShapeOptions}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label htmlFor="HOWINDOWPROTECT">Opening Protection</Label>
                  <Input id="HOWINDOWPROTECT" type="select"
                         onChange={(e) => this.writeValueHOWINDOWPROTECT(e)}>
                    <option value="">--Select--</option>
                    {windowProtectOptions}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label htmlFor="s_secwaterresistcode">Secondary Water Resistance</Label>
                  <Input id="s_secwaterresistcode" type="select"
                         onChange={(e) => this.writeValuessecwaterresistcode(e)}>
                    <option value="">--Select--</option>
                    {secWaterResistOptions}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label htmlFor="s_terrainexposurecode">Terrain</Label>
                  <Input id="s_terrainexposurecode" type="select"
                         onChange={(e) => this.props.updateQuoteParam('TbPoriskadditionalinfo', 's_terrainexposurecode', e.target.value)}>
                    <option value="">--Select--</option>
                    {terrainOptions}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label htmlFor="s_FBCwindspeedcode">Wind Speed</Label>
                  <Input id="s_FBCwindspeedcode" type="select"
                         onChange={(e) => this.props.updateQuoteParam('TbPoriskadditionalinfo', 's_FBCwindspeedcode', e.target.value)}>
                    <option value="">--Select--</option>
                    {windSpeedOptions}
                  </Input>
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
)(WindMitigationCredits);
