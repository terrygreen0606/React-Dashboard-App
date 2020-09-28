import React, {Component} from 'react';
import { Row, Col, Modal, ModalHeader, ModalBody, Button, Input, FormGroup } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { policyService } from "../../../../services/policyService";
import { DateMMDDYYYY , addDaysToDate , convertDateMMDDYYYY} from '../../../../services/commanServices';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment';
import { TextMask, InputAdapter } from 'react-text-mask-hoc';

class NewTranscation extends Component {
  constructor (props) {
    super(props);
    this.apiService = new policyService();
    this.state = {
      TransTypeDD : [],
      TransSubTypeDD : [],
      ReasoneDD :[],
      ReqByDD :[],
      TermUnit : [] ,
      TermType : [],
      searchParams: {
        s_PRTranReasonCode : 'NONE',
        s_StandardTermUnit : 'MONTH',
        s_TermTypeCode : 'NONCOMMON',
        n_StandardTerm : '12',
        s_RequestedBy : 'INSURED',
        d_AccountingDate : new Date(Moment(new Date())),
        PolicyPK: '',
        Policy_No: '',
        n_TermMaster_PK: '',
        TransPK: '',
      },
      readOnly : false,
    }
  }

  async componentWillReceiveProps(props) {
    if(props.isOpen == true){
    let DropDownData = await this.apiService.getNewTransDDData();
      this.setState({
        TransTypeDD : DropDownData.data.TransactionDropDown,
        ReasoneDD : DropDownData.data.TRANREASONCODE,
        ReqByDD : DropDownData.data.TRANREQBY,
        TermUnit : DropDownData.data.STDTERMUNIT,
        TermType : DropDownData.data.STDTERMTYPE,
      });
    }
    if(props.HeaderPolicyData.length > 0){
      let TransactionEffDate = props.HeaderPolicyData[0].d_TermStartDate;
      let TransactionEftDate = props.HeaderPolicyData[0].d_TermEndDate;
      const { searchParams } = this.state;
      searchParams['d_TransEffectiveFrom'] = new Date(Moment(new Date(TransactionEffDate)));
      searchParams['d_TransEffectiveTo'] = new Date(Moment(new Date(TransactionEftDate)));
      this.setState({
        searchParams,
        PolicyPK: this.props.PolicyNo_PK,
        Policy_No: this.props.PolicyNo,
        n_TermMaster_PK: this.props.MaxTermMasterPK,
        TransPK: this.props.MaxPoTransactionPK,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const params = this.getInputParams();
    this.props.toggle();
    this.props.saveNewTrans(params);
  };

  getInputParams() {
    let {
      s_PRTranTypeCode, s_PRTranSubTypeCode, s_PRTranReasonCode, s_RequestedBy, 
      n_StandardTerm, s_StandardTermUnit, s_TermTypeCode,
      d_TransEffectiveFrom, d_TransEffectiveTo, d_AccountingDate, s_Note
    } = this.state.searchParams;
    let { Policy_No,PolicyPK,n_TermMaster_PK,TransPK } = this.state;
    d_AccountingDate = convertDateMMDDYYYY(d_AccountingDate,'YYYY-MM-DD');
    d_TransEffectiveFrom = convertDateMMDDYYYY(d_TransEffectiveFrom,'YYYY-MM-DD');
    d_TransEffectiveTo = convertDateMMDDYYYY(d_TransEffectiveTo,'YYYY-MM-DD');
    return {
      s_PRTranTypeCode,
      s_PRTranSubTypeCode,
      s_PRTranReasonCode,
      s_RequestedBy,
      n_StandardTerm,
      s_StandardTermUnit,
      s_TermTypeCode,
      d_TransEffectiveFrom,
      d_TransEffectiveTo,
      d_AccountingDate,
      s_Note,
      Policy_No, PolicyPK,
      n_TermMaster_PK,TransPK
    };
  }

  async inputChangedHandler(e, key) {
    const value = e.target.value;
    const param = {
      TransType : value,
    }
    let TransactionEffDate = this.props.HeaderPolicyData[0].d_TermStartDate;
    let TransactionEftDate = this.props.HeaderPolicyData[0].d_TermEndDate;
    if(key == 's_PRTranTypeCode'){
      let DropDownData = await this.apiService.getTransSubTypeDDData(param); 
      if(value == 'RENEW'){
        let EffectiveFrom = new Date(Moment(new Date(TransactionEftDate)));
        let EffectiveTo = new Date(Moment(new Date(TransactionEftDate)).add(1, 'year'));
        const { searchParams } = this.state;
        searchParams['d_TransEffectiveFrom'] = EffectiveFrom;
        searchParams['d_TransEffectiveTo'] = EffectiveTo;
        this.setState({ searchParams ,readOnly:false});
      }else if(value == 'EXPIRE'){
        this.setState({
          readOnly:true,
        });
        const { searchParams } = this.state;
        searchParams['d_TransEffectiveFrom'] = new Date(Moment(new Date(TransactionEffDate)));
        searchParams['d_TransEffectiveTo'] = new Date(Moment(new Date(TransactionEftDate)));
        this.setState({ searchParams });
      }else{
        const { searchParams } = this.state;
        searchParams['d_TransEffectiveFrom'] = new Date(Moment(new Date(TransactionEffDate)));
        searchParams['d_TransEffectiveTo'] = new Date(Moment(new Date(TransactionEftDate)));
        this.setState({ searchParams , readOnly:false});
      }
      this.setState({
        TransSubTypeDD : DropDownData.data.TransactionDropDown,
      });
    }
    
    const { searchParams } = this.state;
    searchParams[key] = value;
    this.setState({ searchParams });
  }

  setDate(date,key){
    const { searchParams } = this.state;
    searchParams[key] = new Date(Moment(new Date(date)));
    this.setState({ searchParams });
  }

  render() {
    const { TransTypeDD, ReasoneDD ,ReqByDD,TermUnit,TermType,TransSubTypeDD,isLoading} = this.state;
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="modal-lg">
        <ModalHeader>
          New Transaction
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="6" sm="12">
              <p>Transaction Type:</p>
            </Col>
            <Col md="6" sm="12">
                <Input type="select" id="s_PRTranTypeCode" name="s_PRTranTypeCode" value={this.state.searchParams.s_PRTranTypeCode}
                onChange={(event) => this.inputChangedHandler(event, 's_PRTranTypeCode')}>
                      <option key='' value=''>Select Transaction Type</option>
                      {TransTypeDD.map((product) => {
                        return (<option key={product.s_AppCodeName}
                          value={product.s_AppCodeName}>{(product.s_AppCodeNameForDisplay)}
                        </option>);
                      })}
                </Input>
            </Col>
            <Col md="6" sm="12">
              <p>Transaction Sub-Type:</p>
            </Col>
            <Col md="6" sm="12">
            <Input type="select" id="s_PRTranSubTypeCode" name="s_PRTranSubTypeCode" value={this.state.searchParams.s_PRTranSubTypeCode}
                onChange={(event) => this.inputChangedHandler(event, 's_PRTranSubTypeCode')}>
                      <option key='' value=''>Select Transaction Sub Type</option>
                      {TransSubTypeDD.map((product) => {
                        return (<option key={product.s_AppCodeName}
                          value={product.s_AppCodeName}>{(product.s_AppCodeNameForDisplay)}
                        </option>);
                      })}
                </Input>
            </Col>
            <Col md="6" sm="12">
              <p>Transaction Reason Code:</p>
            </Col>
            <Col md="6" sm="12">
                <Input type="select" id="s_PRTranReasonCode" name="s_PRTranReasonCode" value={this.state.searchParams.s_PRTranReasonCode}
                onChange={(event) => this.inputChangedHandler(event, 's_PRTranReasonCode')}>
                          <option key='' value=''>Select Reasone</option>
                          {ReasoneDD.map((product) => {
                            return (<option key={product.s_AppCodeName}
                              value={product.s_AppCodeName}>{(product.s_AppCodeNameForDisplay)}
                            </option>);
                          })}
                </Input>
            </Col>
            <Col md="6" sm="12">
              <p>Transaction Req By:</p>
            </Col>
            <Col md="6" sm="12">
                <Input type="select" id="s_RequestedBy" name="s_RequestedBy" value={this.state.searchParams.s_RequestedBy}
                onChange={(event) => this.inputChangedHandler(event, 's_RequestedBy')}>
                          <option key='' value=''>Select</option>
                          {ReqByDD.map((product) => {
                            return (<option key={product.s_AppCodeName}
                              value={product.s_AppCodeName}>{(product.s_AppCodeNameForDisplay)}
                            </option>);
                          })}
                </Input>
            </Col>
            <Col md="6" sm="12">
              <p>Std Term:</p>
            </Col>
            <Col md="6" sm="12">
              <FormGroup row className="mb-0">
                <Col sm="2" className="pr-1">
                  <Input type="text" name="n_StandardTerm" id='n_StandardTerm'value={this.state.searchParams.n_StandardTerm} 
                  onChange={(event) => this.inputChangedHandler(event, 'n_StandardTerm')} readOnly/>
                </Col>
                <Col sm="4" className="px-1">
                  <Input type="select" id="s_StandardTermUnit" name="s_StandardTermUnit" value={this.state.searchParams.s_StandardTermUnit} 
                  onChange={(event) => this.inputChangedHandler(event, 's_StandardTermUnit')} readOnly>
                            <option key='' value=''>Select</option>
                            {TermUnit.map((product) => {
                              return (<option key={product.s_AppCodeName}
                                value={product.s_AppCodeName}>{(product.s_AppCodeNameForDisplay)}
                              </option>);
                            })}
                  </Input>
                </Col>
                <Col sm="6" className="pl-1">
                  <Input type="select" id="s_TermTypeCode" name="s_TermTypeCode" value={this.state.searchParams.s_TermTypeCode} 
                  onChange={(event) => this.inputChangedHandler(event, 's_TermTypeCode')} readOnly>
                            <option key='' value=''>Select</option>
                            {TermType.map((product) => {
                              return (<option key={product.s_AppCodeName}
                                value={product.s_AppCodeName}>{(product.s_AppCodeNameForDisplay)}
                              </option>);
                            })}
                  </Input>
                </Col>
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
              <p>Transaction Eff. From:</p>
            </Col>
            <Col md="6" sm="12">
            <DatePicker 
              customInput={
                <TextMask mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]} Component={InputAdapter}
                />
              }
              className="form-control form-control-lg" name="d_TransEffectiveFrom" selected={this.state.searchParams.d_TransEffectiveFrom} onChange={(date) => this.setDate(date,'d_TransEffectiveFrom')}  readOnly={this.state.readOnly}/>
            </Col>
            <Col md="6" sm="12">
              <p>Transaction Eff. To:</p>
            </Col>
            <Col md="6" sm="12">
              
            <DatePicker 
              customInput={
                <TextMask mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]} Component={InputAdapter}
                />
              }
              className="form-control form-control-lg" name="d_TransEffectiveTo" selected={this.state.searchParams.d_TransEffectiveTo} onChange={(date) => this.setDate(date,'d_TransEffectiveTo')}  readOnly/>
            </Col>
            <Col md="6" sm="12">
              <p>Transaction Dt.:</p>
            </Col>
            <Col md="6" sm="12">
            <DatePicker 
              customInput={
                <TextMask mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]} Component={InputAdapter}
                />
              }
              className="form-control form-control-lg" name="d_AccountingDate" selected={this.state.searchParams.d_AccountingDate} onChange={(date) => this.setDate(date,'d_AccountingDate')} readOnly/>
            </Col>
            <Col md="12">
              <p>Transaction Note:</p>
            </Col>
            <Col md="12">
              <Input type="textarea" name="s_Note" rows="4" onChange={(event) => this.inputChangedHandler(event, 's_Note')} value={this.state.searchParams.s_Note}/>
            </Col>
            <Col md={{size: 6, offset: 3}} sm="12" className="mt-2 text-center">
              <Button color="primary" onClick={this.handleSubmit}>Save & Close</Button>
              <Button color="primary" className="ml-4" onClick={this.props.toggle}>Exit</Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      
    );
  }
}

const mapStateToProps = (state) => ({
  HeaderPolicyData: state.Policy.HeaderPolicyData,
});
export default connect(mapStateToProps)(NewTranscation);
