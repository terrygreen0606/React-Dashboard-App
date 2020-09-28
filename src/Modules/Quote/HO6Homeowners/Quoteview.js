import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuoteHeader from '../Common/QuoteEntryHeader';
import TabContain from './TabContain';
//import '../../views/Forms/FormStyle/customStyle.css';
// include Loader
import { LoadingOverlay, Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";
import * as QuoteEntryService from '../../../services/quoteEntryService';
import ShowErrorMsgs from '../Common/showError';
import { validate } from '../Common/QuoteValidation';
import ReactDOM from "react-dom";
import Helmet from 'react-helmet';

import {
  Button,
  Col,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Alert,
  Row,
  Input,
} from 'reactstrap';


class Quoteview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      whichButton: '',
      policyNo: '',
      policyID: '',
      personIdPK: '',
      locationAddrPK: '',
      maillingAddrPK: '',
      priorAddrPK: '',
      phoneInfoPK: '',
      emailInfoPK: '',
      acctMasterPK: '',
      poAppMasterPK: '',
      termMasterPK: '',
      poTransPK: '',
      poRiskMasterPK: '',
      poRiskAddiInfoPK: '',
      poCvgSchedulePK: '',
      poPriorCvgPK: '',
      mode: '',
      finalPrem: '',
      visible: false,
      successMsg: '',
      showError: null, errorLogs: [],
      quoteSavedData: null,
      bindDate: '',
      product: 2,
      isBind: false
    };

    this.formElements = {}
  }

  async componentWillMount() {
    if (this.props.baseData == null) {
      await this.getBaseData(); // get Base Data
    } else if (this.state.product != this.props.baseData.ProductSelected) {
      await this.getBaseData(); // get Base Data if product missmatched
    }
    // Call below if poTransPK included with URL
    if (Object.keys(this.props.match.params).length > 0) {
      await this.getSavedData();
    }
  }

  getBaseData = () => {
    this.props.dispatch(QuoteEntryService.getQuoteBaseDD(this.state.product))
      .then((res) => {

      });
  }

  getSavedData = () => {
    var poTransPK = this.props.match.params.poTransPK;
    this.props.dispatch(QuoteEntryService.getQuoteSavedData(poTransPK, this.state.product))
      .then((res) => {
        this.setState({
          policyID: res.poTransData.n_PolicyMaster_FK,
          personIdPK: res.applicantData.getPersonData.n_PersonInfoId_PK,
          locationAddrPK: res.applicantData.getLocationAddr.n_PersonAddressesId_PK,
          maillingAddrPK: res.applicantData.getMailingAddr != null ? res.applicantData.getMailingAddr.n_PersonAddressesId_PK : '',
          priorAddrPK: res.applicantData.getPriorAddr != null ? res.applicantData.getPriorAddr.n_PersonAddressesId_PK : '',
          phoneInfoPK: res.applicantData.getPhoneData[0].n_PhoneInfoId_PK || '',
          emailInfoPK: res.applicantData.getEmailData[0].n_EmailInfoId_PK || '',
          termMasterPK: res.poTransData.n_TermMaster_FK || '',
          poTransPK: poTransPK,
          poAppMasterPK: res.poAppMasterData.n_POAppsMaster_PK || '',
          poRiskMasterPK: res.getPoRiskMasterData.n_PORiskMaster_PK || '',
          poRiskAddiInfoPK: res.getPoRiskAddiData.n_PORiskAdditionalInfo_PK || '',
          poCvgSchedulePK: res.getDiscountData.n_PoCoverageScheduleFK || '',
          policyNo: res.policyData.Policy_No,
          acctMasterPK: res.policyData.n_BillAccountMaster_FK,
          quoteSavedData: res,
          bindDate: res.poAppMasterData.d_DateBound != null ? res.poAppMasterData.d_DateBound : '',
          finalPrem: '$' + res.finalPremium || 0,
          mode: 'Edit',
          isBind: res.poAppMasterData.d_DateBound != null ? true : false,
        });
      });
  }

  setWhichButton = (e) => {
    this.setState({ whichButton: e.currentTarget.name, visible: false, successMsg: '', showError: null, errorLogs: [] });
  }

  saveQuoteEntryData = (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    const result = validate(params, this.state.product);
    if (result.status) {
      this.props.dispatch(QuoteEntryService.saveQuoteEntryData(params, this.state.product))
        .then((res) => {
          this.state.policyID = res.Policy_ID;
          this.state.personIdPK = res.personIdPK;
          this.state.locationAddrPK = res.locationAddressPK;
          this.state.maillingAddrPK = res.mailingAddressPK;
          this.state.priorAddrPK = res.priorAddressPK;
          this.state.phoneInfoPK = res.PhoneinfoPK;
          this.state.emailInfoPK = res.EmailinfoPK;
          this.state.termMasterPK = res.TermMasterPK;
          this.state.poTransPK = res.PotransactionPK;
          this.state.poAppMasterPK = res.PoappsmasterPK;
          this.state.poRiskMasterPK = res.PoriskmasterPK;
          this.state.poRiskAddiInfoPK = res.PoriskadditionalinfoPK;
          this.state.poCvgSchedulePK = res.PocoverageschedulePK_Basis;
          this.state.policyNo = res.Policy_No;
          this.state.acctMasterPK = res.AccountmasterPK;
          this.state.poPriorCvgPK = res.POPriorCoverage_PK;
          this.state.mode = 'Edit';
          this.state.whichButton = '';
          if (res.Status == 'Y') {
            this.setState({
              finalPrem: '$' + res.finalPrem,
              visible: true, successMsg: res.Msg, bindDate: res.bindDate,
              isBind: (res.bindDate != '') ? true : false
            });
          }
          if (res.ErrorArray != null) {
            this.setState({ errorLogs: res.ErrorArray, showError: <ShowErrorMsgs errorMsgs={res.ErrorArray} onClickFun={() => this.toggleModal()} /> });
          }
        });
    } else {
      this.props.dispatch(QuoteEntryService.getErrorMsg(result.errorMsg))
        .then((errorMsg) => {
          var errorMsg = [...errorMsg, ...result.customError];
          this.setState({ errorLogs: errorMsg, showError: <ShowErrorMsgs errorMsgs={errorMsg} onClickFun={() => this.toggleModal()} /> });
          // to show specific error field
          if (result.errorFields.length > 0) {
            // all form elements
            this.formElements.forEach(element => {
              if (result.errorFields.some(field => element.name === field)) {
                ReactDOM.findDOMNode(element).classList.add('is-invalid'); // add is-invalid class to error field
              } else {
                ReactDOM.findDOMNode(element).classList.remove('is-invalid'); // removed if previously added
              }
            });
          }
        });
    }
  }

  openRateSheet = () => {
    if (this.state.poTransPK != '') {
      this.props.dispatch(QuoteEntryService.printRateSheet(this.state.poTransPK))
        .then((res) => {
          if (res.status == 'Y') {
            window.open(res.docUrl);
          }
        });
    }
  }

  // Toggle Error Model
  toggleModal = () => this.setState({showError: null});

  // Show previously validation errors
  openErrorLogModal = () => {
    this.setState({ showError: <ShowErrorMsgs errorMsgs={this.state.errorLogs} onClickFun={() => this.toggleModal()}/> });
  }

  // to get form elements from recactDom to show error fields
  componentDidMount(){
    this.formElements = ReactDOM.findDOMNode(this).childNodes[0];
  }

  render() {
    return (
      <LoadingOverlay>
        <Helmet>
          <title>Avatar Insurance - Quote HO6 Homeowners</title>
        </Helmet>
        <Loader loading={this.props.isLoading} />
        <Form method="post" onSubmit={this.saveQuoteEntryData} onKeyDown={(e) => { if (e.keyCode === 13) { e.preventDefault(); return false; } }} className="animated fadeIn mt-1">
          <Row>
            <Col xs="12">
              <strong><span className="badge badge-success"><h5><i className="fa fa-home"></i>&nbsp;&nbsp;HO6 Homeowners</h5></span></strong>
              <Button type="submit" size="sm" color="success" name="Ratesubmit" className="pull-right mr-1" onClick={this.setWhichButton} hidden={this.state.isBind}><i className="fa fa-check"></i>&nbsp;&nbsp; Rate</Button>&nbsp;&nbsp;
              {this.state.poTransPK != '' ? <Button type="button" size="sm" color="success" name="RateSheet" className="pull-right mr-1" onClick={this.openRateSheet}><i className="fa fa-check"></i>&nbsp;&nbsp; Rate Sheet</Button> : null}
              {this.state.errorLogs.length > 0 ? <Button type="button" size="sm" color="success" name="ErrorLogs" className="pull-right mr-1" onClick={this.openErrorLogModal}><i className="fa fa-bug"></i>&nbsp;&nbsp; Error Logs</Button> : null}
              <Button type="submit" color="info" name="Ratesubmit" className="ratebt" onClick={this.setWhichButton} disabled={this.props.isLoading} hidden={this.state.isBind}><i className="fa fa-check"></i>&nbsp;&nbsp;&nbsp;Rate</Button>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col xs="12">
              <QuoteHeader policyNumber={this.state.policyNo} estmPrem={this.state.finalPrem} quoteSavedData={this.state.quoteSavedData} bindDate={this.state.bindDate} isBind={this.state.isBind} />
              <hr className="mt-0" />
              <Alert color="success" isOpen={this.state.visible} >
                {this.state.successMsg}
              </Alert>
              <TabContain mainState={this.state} quoteSavedData={this.state.quoteSavedData} setWhichButton={(data) => this.setWhichButton(data)} />
            </Col>
          </Row>
          <Row className="mb-1">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Row>
                <Col sm="5">
                  <Button type="submit" color="primary" name="Ratesubmit" className="pull-right" onClick={this.setWhichButton} hidden={this.state.isBind}><i className="fa fa-check"></i>&nbsp;&nbsp;Rate</Button>
                </Col>
                <Col sm="7">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Premium :</InputGroupText>
                      <InputGroupText>{this.state.finalPrem}</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </Row>
            </Col>
          </Row>
          {this.state.showError}
          <Input type="hidden" name="ProductPK" value={this.state.product} disabled={this.state.isBind} />
          <Input type="hidden" name="SimpleSolveTerm_Sequence" value="" disabled={this.state.isBind} />
          <Input type="hidden" name="Policy_No_Header_SimpleSolve" value={this.state.policyNo} disabled={this.state.isBind} />
          <Input type="hidden" name="Citizen_Total_Premium_Renewal" value="" disabled={this.state.isBind} />
          <Input type="hidden" name="mode" value={this.state.mode} disabled={this.state.isBind} />
          <Input type="hidden" name="data[TbPersoninfo][n_PersonInfoId_PK]" value={this.state.personIdPK} disabled={this.state.isBind} />
          <Input type="hidden" name="data[TbPersoninfo][s_EntityType]" value="PERSON" disabled={this.state.isBind} />
          <Input type="hidden" name="data[TbPersoninfo][s_PersonStatusCode]" value="Active" disabled={this.state.isBind} />
          <Input type="hidden" name="data[TbPersonaddress][n_PersonAddressesId_PK]" value={this.state.locationAddrPK} disabled={this.state.isBind} />
          <Input type="hidden" name="data[TbPersonaddress][s_IsDefaultAddress]" value="Y" disabled={this.state.isBind} />
          <Input type="hidden" name="data[TbPersonaddressMail][n_PersonAddressesId_PK]" value={this.state.maillingAddrPK} disabled={this.state.isBind} />
          <Input type="hidden" name="data[TbPersonaddressPrior][n_PersonAddressesId_PK]" value={this.state.priorAddrPK} disabled={this.state.isBind} />
          <Input type="hidden" name="data[TbPhoneinfo][n_PhoneInfoId_PK]" value={this.state.phoneInfoPK} disabled={this.state.isBind} />
          <Input type="hidden" name="data[TbEmailinfo][n_EmailInfoId_PK]" value={this.state.emailInfoPK} disabled={this.state.isBind} />

          <Input type="hidden" name="data[TbAccountmaster][n_AgencyAddlInfoId_PK]" value={this.state.acctMasterPK} disabled={this.state.isBind} />
          <Input type="hidden" name="data[TbPolicy][n_PolicyNoId_PK]" value={this.state.policyID} disabled={this.state.isBind} />
          <Input type="hidden" name="data[TbPotermmaster][n_TermMaster_PK]" value={this.state.termMasterPK} disabled={this.state.isBind} />
          <Input type="hidden" name="data[TbPotransaction][n_potransaction_PK]" value={this.state.poTransPK} disabled={this.state.isBind} />
          <Input type="hidden" name="data[TbPoappsmaster][n_POAppsMaster_PK]" value={this.state.poAppMasterPK} disabled={this.state.isBind} />
          <Input type="hidden" name="data[TbPoriskmaster][n_PORiskMaster_PK]" value={this.state.poRiskMasterPK} disabled={this.state.isBind} />
          <Input type="hidden" name="data[TbPoriskadditionalinfo][n_PORiskAdditionalInfo_PK]" value={this.state.poRiskAddiInfoPK} disabled={this.state.isBind} />

          <Input type="hidden" name="data[TbPotermmaster][n_TermSequence]" value="" disabled={this.state.isBind} />
          <Input type="hidden" name="data[TbPopriorcoveragedetail][n_POPriorCoverage_PK]" value={this.state.poPriorCvgPK} disabled={this.state.isBind} />

          <Input type="hidden" name="WhichButton" value={this.state.whichButton} disabled={this.state.isBind} />
        </Form>
      </LoadingOverlay>
    );
  }
}

Quoteview.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.QuoteEntry.isLoading,
  baseData: state.QuoteEntry.baseData,
  finalPrem: state.QuoteEntry.finalPrem
});

export default connect(mapStateToProps)(Quoteview);
