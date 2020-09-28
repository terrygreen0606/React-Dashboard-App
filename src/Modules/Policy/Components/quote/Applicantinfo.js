import React, {Component} from "react";
import {Button, Card, CardBody, CardHeader, Col, Collapse, FormGroup, Input, Label, Row} from "reactstrap";
import {connect} from "react-redux";
import {updateQuoteParam} from "../../../../store/actions/policy";
import {InputAdapter, TextMask} from "react-text-mask-hoc";
import {toast, ToastContainer} from 'react-toastify';
import {policyCommonService, policyService} from "../../../../services/policyService";

class Applicantinfo extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.CopyName = this.CopyName.bind(this);
    this.checkZipCode = this.checkZipCode.bind(this);
    this.trim = this.trim.bind(this);
    this.apiService = new policyService();
    this.commonService = new policyCommonService();
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

  trim(str) {
    const tmp = str.replace(/^\s*/, "");
    return tmp.replace(/\s*$/, "");
  }

  CopyName() {
    if (document.getElementById('s_FullLegalName').value == "") {

      const Name = this.trim(document.getElementById("s_FirstName").value) + ' ' +
        this.trim(document.getElementById("s_MiddleName").value) + ' ' +
        this.trim(document.getElementById("s_LastOrganizationName").value);

      document.getElementById('s_FullLegalName').value = this.trim(Name);
    }
  }

  //BINDING ACTION INTO ZIP FIELD TO SEAR CITY, STATE AND COUNTY

  async checkZipCode(e) {
    const policyData = this.state.policyData;
    if (!policyData) return false;
    const productPK = policyData.ProductSelected;
    if (productPK == 3 || productPK == 4) return false;
    let effectiveDate = document.getElementById('effective-from').value;
    effectiveDate = effectiveDate.split("-");
    effectiveDate = effectiveDate[2] + "-" + effectiveDate[0] + "-" + effectiveDate[1];
    const agencyId = document.getElementById('AgencyDropDown').value;
    const assumptionNumber = policyData.Policy_No_Header_SimpleSolve;
    const params = this.props.quoteParams;
    let houseNumber, streetName, postalCode = e.target.value;
    if (!params) return false;
    try {
      houseNumber = params.TbPersonaddress.s_HouseNo.trim();
      if (!houseNumber) {
        toast.error('Please Enter House Number! ', {
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true
        });
      }
    } catch (e) {
      toast.error('Please Enter House Number! ', {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true
      });
      return false;
    }
    try {
      streetName = params.TbPersonaddress.s_StreetName.trim();
      if (!streetName) {
        toast.error('Please Enter Street Address! ', {
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true
        });
      }
    } catch (e) {
      toast.error('Please Enter Street Address! ', {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true
      });
      return false;
    }
    try {
      postalCode = postalCode.trim()
    } catch (e) {
      toast.error('Please Zip Code! ', {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true
      });
      return false;
    }
    const data = {
      s_PostalCode: postalCode,
      FlagResouce: 'Quote_FirstApp',
      EffectiveDate: effectiveDate,
      selectedProduct: productPK,
      selectedAgency: agencyId,
      assumptionNumber: assumptionNumber
    };
    await this.apiService.checkZipCode(data)
      .catch(e => console.log(e));
  }

  render() {
    let addressInMapDiv = [], userAccess = '', dobCertificateUploader = [], homeAddrDirections = [], homeAddrType = [],
      siteUrl = 'http://127.0.0.1',
      isShowDOBFileUploder = false, isShowVerifyAddressBtn = false;
    if (this.state.policyData) {
      const accessRights = this.state.policyData.accessRights;
      userAccess = accessRights ? accessRights.LevelName : '';

      if (userAccess === 'EMPLOYEE') {
        addressInMapDiv.push(
          <Col xs="12" md="12" key="ViewAddressMap">
            {/*<FormGroup>*/}
            {/*<a href="#" id="ViewAddressMap">*/}
            {/*<i className="icon-map"></i>*/}
            {/*</a>*/}
            {/*</FormGroup>*/}
          </Col>
        )
      }
      let dobCertificateDocUploadDivFileName = [];
      if (this.state.policyData.dobCertificateData) {
        if (this.state.policyData.dobCertificateData['TbDocindex']['Doc_OriginalName']) {
          dobCertificateDocUploadDivFileName.push(
            <a href={siteUrl + '/Common/OpenClaimAttachemntFile_ToSaveDilogue/backresorce:DocIndexAttachemnt/rid:'
            + this.state.policyData.YearBuiltCertificateData.TbDocindex.DocIndex_PK}
               id="ViewAddressMap" className="text-danger">
              {this.state.policyData.YearBuiltCertificateData.TbDocindex.Doc_OriginalName}
            </a>
          )
        } else {
          dobCertificateDocUploadDivFileName.push(
            <Col xs="12" md="3">
              <FormGroup>
                <p className="text text-success" id="YearBuiltCertificateDocUploadSpan">File Uploaded</p>
              </FormGroup>
            </Col>)
        }
      }
      dobCertificateUploader.push(
        <Col xs="12" md="4" key="dobCertificateDocUploadDiv">
          <FormGroup>
            <Input name="dobCertificateDocUploadfile" id="dobCertificateDocUploadfile" type="file"/>
          </FormGroup>
        </Col>
      );
      const dropdown = this.state.policyData.dropdownData;
      if (dropdown) {
        // 0: {s_AppCodeName: "N", s_AppCodeNameForDisplay: "N"}
        Object.keys(dropdown.HOMEADDRESSDIRECTION).forEach((item) => {
          homeAddrDirections.push(
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
        })
      }

    }
    const containerStyle = {
      zIndex: 1999
    };
    return (
      <>
        <ToastContainer position="top-right" autoClose={5000} style={containerStyle}/>
        <Card>
          <CardHeader>
            Applicant Information
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
                    <Label htmlFor="s_FirstName">First Name</Label>
                    <Input id="s_FirstName" type="text" onBlur={(e) => this.commonService.makeUppercase(e)}
                           onChange={(e) => {
                             this.props.updateQuoteParam('TbPersoninfo', 's_FirstName', e.target.value)
                           }}/>
                  </FormGroup>
                </Col>
                <Col xs="12" md="3">
                  <FormGroup>
                    <Label htmlFor="s_MiddleName">Middle Name</Label>
                    <Input onChange={(e) => this.props.updateQuoteParam('TbPersoninfo', 's_MiddleName', e.target.value)}
                           id="s_MiddleName" type="text" onBlur={(e) => this.commonService.makeUppercase(e)}/>
                  </FormGroup>
                </Col>
                <Col xs="12" md="3">
                  <FormGroup>
                    <Label htmlFor="s_LastOrganizationName">Last Name</Label>
                    <Input
                      onChange={(e) => this.props.updateQuoteParam('TbPersoninfo', 's_LastOrganizationName', e.target.value)}
                      id="s_LastOrganizationName" type="text" onBlur={(e) => this.commonService.makeUppercase(e)}/>
                  </FormGroup>
                </Col>
                <Col xs="12" md="3">
                  <FormGroup>
                    <Label htmlFor="s_FullLegalName">Name(s) on Dec</Label>
                    <Input
                      onChange={(e) => this.props.updateQuoteParam('TbPersoninfo', 's_FullLegalName', e.target.value)}
                      id="s_FullLegalName" type="text" onFocus={(e) => this.CopyName(e)}/>
                  </FormGroup>
                </Col>
                <Col xs="12" md="3">
                  <FormGroup>
                    <Label htmlFor="s_HouseNo">House No</Label>
                    <Input onChange={(e) => this.props.updateQuoteParam('TbPersonaddress', 's_HouseNo', e.target.value)}
                           id="s_HouseNo" type="text"/>
                  </FormGroup>
                </Col>
                <Col xs="12" md="3">
                  <FormGroup>
                    <Label htmlFor="s_HouseDirection1">Direction</Label>
                    <Input type="select" id="s_HouseDirection1" disabled
                           onChange={(e) => this.props.updateQuoteParam('TbPersonaddress', 's_HouseDirection1', e.target.value)}>
                      <option value="">--Select--</option>
                      {homeAddrDirections}
                    </Input>
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label htmlFor="s_StreetName">Street Name</Label>
                    <Input id="s_StreetName" type="text"
                           onChange={(e) => this.props.updateQuoteParam('TbPersonaddress', 's_StreetName', e.target.value)}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="3">
                  <FormGroup>
                    <Label htmlFor="s_HouseType">Type</Label>
                    <Input type="select" id="s_HouseType" disabled
                           onChange={(e) => this.props.updateQuoteParam('TbPersonaddress', 's_HouseType', e.target.value)}>
                      <option value="">--Select--</option>
                      {homeAddrType}
                    </Input>
                  </FormGroup>
                </Col>
                <Col xs="12" md="3">
                  <FormGroup>
                    <Label htmlFor="s_HouseDirection2">Direction</Label>
                    <Input type="select" id="s_HouseDirection2" disabled
                           onChange={(e) => this.props.updateQuoteParam('TbPersonaddress', 's_HouseDirection2', e.target.value)}>
                      <option value="">--Select--</option>
                      {homeAddrDirections}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="3">
                  <FormGroup>
                    <Label htmlFor="s_PostalCode">Zip</Label>
                    <Input id="s_PostalCode" type="text" onBlur={(e) => {
                      this.checkZipCode(e)
                    }}
                           onChange={(e) => this.props.updateQuoteParam('TbPersonaddress', 's_PostalCode', e.target.value)}/>
                  </FormGroup>
                </Col>
                <Col xs="12" md="3">
                  <FormGroup>
                    <Label htmlFor="n_CityId_FKName">City</Label>
                    <Input name="n_CityId_FKName" id="n_CityId_FKName" type="text" readOnly
                           onChange={(e) => this.props.updateQuoteParam('TbPersonaddress', 'n_CityId_FK', e.target.value)}/>
                  </FormGroup>
                </Col>
                <Col xs="12" md="3">
                  <FormGroup>
                    <Label htmlFor="n_StateId_FKName">State</Label>
                    <Input name="n_StateId_FKName" id="n_StateId_FKName" type="text" readOnly
                           onChange={(e) => this.props.updateQuoteParam('TbPersonaddress', 'n_StateId_FK', e.target.value)}/>
                    <Input name="data[TbPersonaddress][n_StateId_FK]" id="n_StateId_FK" type="hidden"/>
                    <Input name="data[TbPersonaddress][n_CountryId_FK]" id="n_CountryId_FK" type="hidden"/>
                  </FormGroup>
                </Col>
                <Col xs="12" md="3">
                  <FormGroup>
                    <Label htmlFor="n_CountyId_FK">County</Label>
                    <Input name="data[TbPersonaddress][n_CountyId_FKName]" id="n_CountyId_FKName" type="text"
                           readOnly tabIndex="-1"
                           onChange={(e) => this.props.updateQuoteParam('TbPersonaddress', 'n_CountyId_FK', e.target.value)}/>
                    <Input name="data[TbPersonaddress][n_CountyId_FK]" id="n_CountyId_FK" type="hidden"/>
                    <Input name="Propertyzone" id="Propertyzone" type="hidden" tabIndex="-1"/>
                  </FormGroup>
                </Col>
                {addressInMapDiv}
                <Col xs="12" md="3">
                  <FormGroup>
                    <Label htmlFor="d_BirthDate">DOB</Label>
                    <TextMask mask={[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} Component={InputAdapter}
                              className="form-control" id="d_BirthDate"
                              onChange={(e) => this.props.updateQuoteParam('TbPersoninfo', 'd_BirthDate', e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="3">
                  <FormGroup>
                    <Label htmlFor="s_PhoneNumber">Phone No.</Label>

                    <TextMask mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                              Component={InputAdapter}
                              className="form-control" id="d_BirthDate"
                              onChange={(e) => this.props.updateQuoteParam('TbPhoneinfo', 's_PhoneNumber', e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label htmlFor="s_EmailAddress">Email Address</Label>
                    <Input id="s_EmailAddress" type="text" onBlur={(e) => this.commonService.makeUppercase(e)}
                           onChange={(e) => this.props.updateQuoteParam('TbEmailinfo', 's_EmailAddress', e.target.value)}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row key="dobCertificateUploader">
                {isShowDOBFileUploder &&
                {dobCertificateUploader}
                }
              </Row>
              <Row>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label htmlFor="s_OccupationDesc">Occupation</Label>
                    <Input name="data[TbPersoninfo][s_OccupationDesc]" id="s_OccupationDesc" type="text"/>
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <p>Is Mailing address same as Location address:</p>
                  <FormGroup check className="radio" inline>
                    <Input className="form-check-input" type="radio" id="mailcheckYes"
                           name="data[TbPersoninfo][s_IsMailAddDiff]" value="Yes"
                           onChange={() => this.props.onToggleMailing(true)}/>
                    <Label check className="form-check-label" htmlFor="mailcheckYes">Yes</Label>
                  </FormGroup>
                  <FormGroup check className="radio" inline>
                    <Input className="form-check-input" type="radio" id="mailcheckNo"
                           name="data[TbPersoninfo][s_IsMailAddDiff]" value="No"
                           onChange={() => this.props.onToggleMailing(false)}/>
                    <Label check className="form-check-label" htmlFor="mailcheckNo">No</Label>
                  </FormGroup>
                </Col>
                {this.state.policyData.ProductSelected != 5 && this.state.policyData.ProductSelected != 6 &&
                this.state.policyData.ProductSelected != 1 && this.state.policyData.ProductSelected != 7 &&
                this.state.policyData.ProductSelected != 9 && isShowVerifyAddressBtn &&
                <Col xs="12" md="12">
                  <FormGroup>
                    <Button type="button" size="md" color="primary" id="VerifyAddress" name="VerifyAddress">Verify
                      Address</Button>
                  </FormGroup>
                </Col>
                }
                <Col xs="12" md="12">
                  <div className="widget_body" id="VerifiedAddressDetail">
                    <div className="widget_content" id="VerifiedAddressDetail_Content">
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Collapse>
        </Card>
      </>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const {policyData, quoteParams} = state.Policy;
  return {policyData, quoteParams}
};
const mapDispatchToProps = {updateQuoteParam};
export default connect(mapStateToProps, mapDispatchToProps
)(Applicantinfo);
