import React, { Component } from 'react';
import { Row, Col, FormGroup, Label, Button, Input,ButtonDropdown,DropdownItem,DropdownMenu,DropdownToggle } from 'reactstrap';
import { policyService } from "../../../../services/policyService";
import { setParamForIssuedScr } from '../../../../store/actions/policy';
import { formatMoney, convertDateMMDDYYYY } from '../../../../services/commanServices';
import Select from 'react-select';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as QuoteEntryService from '../../../../services/quoteEntryService';

class RightSide extends Component {
  constructor(props) {
    super(props);
    this.apiService = new policyService();
    this.dateFormatter = this.dateFormatter.bind(this);
    this.toggle = this.toggle.bind(this);
    this.openRateSheet = this.openRateSheet.bind(this);
    this.state = {
      term_value: [],
      transaction_value: [],
      termDDData: [],
      TransDDData: [],
      termDD: [],
      PolicyNo_PK: '',
      PolicyNo: '',
      MaxTermMasterPK: '',
      MaxPoTransactionPK: '',
      term_select: '',
      transaction_select: '',
      MaxTransactionEffDate : '',
      MaxTransCreatedBy : '',
      MaxTransDate : '',
      MaxTranTypeScreenName : '' ,
      Note : '',
      AgencyData : {},
      dropdownOpen: new Array(1).fill(false),
    };
  }

  async componentDidMount() {
    let PolicyNo_PK = this.props.PolicyNo_PK;
    let PolicyNo = this.props.PolicyNo;
    let MaxTermMasterPK = this.props.MaxTermMasterPK;
    let MaxPoTransactionPK = this.props.MaxPoTransactionPK;
    const param = {
      PolicyNo_PK,
      PolicyNo,
      MaxTermMasterPK,
      MaxPoTransactionPK
    } 
    let AgencyData = await this.apiService.getAgencyData(param);
    this.setState({
      AgencyData : AgencyData.data.applicantdetails[0],
      termDDData: this.props.termDDData,
      TransDDData: this.props.TransDDData,
      PolicyNo_PK: this.props.PolicyNo_PK,
      PolicyNo: this.props.PolicyNo,
      MaxTermMasterPK: this.props.MaxTermMasterPK,
      MaxPoTransactionPK: this.props.MaxPoTransactionPK,
      term_select: this.props.MaxTermMasterPK,
      transaction_select: this.props.MaxPoTransactionPK,
    });
  }

  componentWillReceiveProps(props) {
    if (props.HeaderPolicyData.length > 0) {
    this.setState({
      Note : props.HeaderPolicyData[0].s_Note,
    });
  }
  }

  dateFormatter(date) {
    return convertDateMMDDYYYY(date, 'MM-DD-YYYY') // Converting Date into MM/DD/YYYY
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  openRateSheet(){
    if (this.state.MaxPoTransactionPK != '') {
      this.props.dispatch(QuoteEntryService.printRateSheet(this.state.MaxPoTransactionPK))
        .then((res) => {
          if (res.status == 'Y') {
            window.open(res.docUrl);
          }
        });
    }
  }

  render() {
    const { openNewTrans, openLog, openAttachment,MaxTransactionEffDate,MaxTranTypeScreenName,MaxTransCreatedBy,MaxTransDate,setToEdit,handleSubmit} = this.props;
    const { termDDData, TransDDData ,MaxPoTransactionPK,Note,AgencyData} = this.state;
    return (
      <>
        {/*<div className="input-search-fields1 d-flex justify-content-around mt-3">
          <Button outline size="sm" color="primary" className="font-weight-bold">FHCF Rate Sheet</Button>
          <Button outline size="sm" color="primary" className="font-weight-bold">Rt. History</Button>
          <Button type="button" size="sm" color="success" name="RateSheet" className="pull-right mr-1" onClick={this.openRateSheet}><i className="fa fa-check"></i>&nbsp;&nbsp; Rate Sheet</Button>
          {this.props.showNewTrans ? <Button outline size="sm" color="primary" className="font-weight-bold" onClick={openNewTrans}>New transaction +</Button> : ''}
        </div>
        <div className="input-search-fields1 d-flex justify-content-around mt-3">
          {this.props.showSetToEdit ? <Button outline size="sm" color="primary" className="font-weight-bold" onClick={setToEdit}>Set To Edit</Button> : ''}
          {/*this.props.showSave ? <Button outline size="sm" color="primary" className="font-weight-bold" onClick={handleSubmit}>Save</Button> : ''*/}
          {/*this.props.showSave ? <ButtonDropdown className="mr-1" isOpen={this.state.dropdownOpen[0]} toggle={() => { this.toggle(0); }}>
          <Button id="caret" color="primary" onClick={handleSubmit}>&nbsp;&nbsp;&nbsp;&nbsp;Save&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                  <DropdownToggle caret color="primary" />
                  <DropdownMenu>
                    <DropdownItem onClick={handleSubmit}>Save and Rate</DropdownItem>
                    <DropdownItem onClick={handleSubmit}>Save and Issue</DropdownItem>
                  </DropdownMenu>
          </ButtonDropdown> : ''
          }
        </div>*/}
        <Row>
          <Col md={{ size: 12, offset: 0 }} sm="12" >
            <Row className="my-4">
              <Col sm="4" className="text-center p-1">
                <Button onClick={openLog} className="p-0">
                  <i className="cui-note icons font-4xl d-block"></i>
                  <p className="mb-0">Log</p>
                </Button>
              </Col>
              <Col sm="4" className="text-center p-1">
                <Button onClick={openAttachment} className="p-0">
                  <i className="cui-paperclip icons font-4xl d-block"></i>
                  <p className="mb-0">Attachment</p>
                </Button>
              </Col>
              <Col sm="4" className="text-center p-1">
                <Button className="p-0">
                  <i className="cui-magnifying-glass icons font-4xl d-block"></i>
                  <p className="mb-0">Claim View</p>
                </Button>
              </Col>
            </Row>
            <div>
              <FormGroup>
                <Label for="term_select">Term Selection:</Label>
                <Input type="select" id="term_select" name="term_select" value={this.state.term_select}
                  onChange={(event) => this.props.OnchangeTermDD(event, 'term_select')}>
                  {termDDData.map((product) => {
                    return (<option key={product.n_TermMaster_PK}
                      value={product.n_TermMaster_PK}>{this.dateFormatter(product.d_TermStartDate)}/{this.dateFormatter(product.d_TermEndDate)}
                    </option>);
                  })}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="transaction_select">Transaction Selection:</Label>
                <Input type="select" id="transaction_select" name="transaction_select" value={this.state.transaction_select}
                  onChange={(event) => this.props.onChangeTransDD(event, 'transaction_select')}>
                  {TransDDData.map((product) => {
                    return (<option key={product.n_potransaction_PK}
                      value={product.n_potransaction_PK}>{product.s_PRTranTypeCode} - {product.s_TransactionCycleCode}
                    </option>);
                  })}
                </Input>
              </FormGroup>
            </div>
          </Col>
        </Row>
        <div className="height-500 overflow-y-auto">
          <div className="text-box">
            <div className="text-box-header font-weight-bold">
              Last transaction
              </div>
            <div className="text-box-body">
                <p className="font-weight-bold">{MaxTranTypeScreenName} by {MaxTransCreatedBy}</p>
                <p className="font-weight-bold">Trasnaction date: {MaxTransDate}</p>
              <p className="font-weight-bold">Transaction Eff. Dt. {MaxTransactionEffDate}</p>
            </div>
          </div>
          <div className="text-box">
            <div className="text-box-header font-weight-bold">
              Transaction Note
              </div>
            <div className="text-box-body">
            <p className="font-weight-bold">{Note}</p>
            </div>
          </div>
          <div className="text-box">
            <div className="text-box-header font-weight-bold">
              Agency Info
              </div>
            <div className="text-box-body">
              <p className="font-weight-bold">{AgencyData.AgeFullLegalName}</p>
              <p className="font-weight-bold">{AgencyData.s_AddressLine1}</p>
                <p className="font-weight-bold">{AgencyData.s_CountyName},{AgencyData.s_CityName},{AgencyData.s_StateCode},{AgencyData.s_PostalCode}</p>
              <p className="font-weight-bold">Agency Phone # {AgencyData.Phone}</p>
              <p className="font-weight-bold">Agency Fax # {AgencyData.Fax}</p>
              <p className="font-weight-bold">{AgencyData.s_Email}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

RightSide.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  MaxTransactionEffDate : state.Policy.MaxTransactionEffDate,
  MaxTranTypeScreenName : state.Policy.MaxTranTypeScreenName,
  MaxTransCreatedBy : state.Policy.MaxTransCreatedBy,
  MaxTransDate : state.Policy.MaxTransDate,
  HeaderPolicyData: state.Policy.HeaderPolicyData,
});

export default connect(mapStateToProps)(RightSide);
