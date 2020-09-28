import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Row,
  Col,
  InputGroup,
  Label,
  Form,
  Table,
  Button,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';

import { connect } from 'react-redux';
import LoadingDiv from "./LoadingDiv";
import * as commissionRuleServiceObj from "../../../../services/commissionRuleService";

class RuleModal extends Component {
  constructor(props) {
    super(props);
    this.submitFormHandle = this.submitFormHandle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.handleRemoveSpecificRow = this.handleRemoveSpecificRow.bind(this);
    this.state = {
      index: -1,
      isEdit: false,
      s_RuleName: '',
      s_Description: '',
      n_CommBaseTypeId_FK: null,
      n_LineOfBusinessId_PK: null,
      n_ProductId_FK: null,
      n_TerritoryId_FK: null,
      s_FrequencyOfPaymentCode: '',
      s_PolicyAction: '',
      s_CommissionCalculationCode: 'FIXEDRATE',
      n_RateOfCommission: '',
      d_EffectiveFromDate: '',
      d_EffectiveToDate: '',
      s_RuleStatusCode: '',
      ranges: [
        {
          n_RangeSetNumber: '',
          n_RangeSetName: '',
          n_SequenceNumber: '',
          s_RangeTypeCode: '',
          n_RangeTypeMin: '',
          n_RangeTypeMax: '',
          n_RateOfCommission: ''
        }
      ]
    }
  }
  componentDidMount() {
    this.props.dispatch(commissionRuleServiceObj.loadOptions());
    this.setState({
      index: this.props.match.params.id != null ? this.props.match.params.id : -1
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.index != prevState.index && this.state.index != -1) {
      this.setState({
        isEdit: true,
        isLoading: true,
      });
      this.props.dispatch(commissionRuleServiceObj.loadRuleData(this.state.index));
    }
    if (prevProps.individual.n_RuleId_PK !== this.props.individual.n_RuleId_PK) {
      const individual = this.props.individual;
      this.setState({
        isLoading: false,
        s_RuleName: individual.s_RuleName,
        s_Description: individual.s_Description,
        n_CommBaseTypeId_FK: individual.n_CommBaseTypeId_FK,
        n_LineOfBusinessId_PK: individual.n_LineOfBusinessId_PK,
        n_ProductId_FK: individual.n_ProductId_FK,
        n_TerritoryId_FK: individual.n_TerritoryId_FK,
        s_FrequencyOfPaymentCode: individual.s_FrequencyOfPaymentCode,
        s_PolicyAction: individual.s_PolicyAction,
        s_CommissionCalculationCode: individual.s_CommissionCalculationCode,
        n_RateOfCommission: individual.n_RateOfCommission,
        d_EffectiveFromDate: individual.d_EffectiveFromDate,
        d_EffectiveToDate: individual.d_EffectiveToDate,
        s_RuleStatusCode: individual.s_RuleStatusCode,
        ranges: individual.ranges.length > 0 ? individual.ranges : [
          {
            n_RangeSetNumber: '',
            n_RangeSetName: '',
            n_SequenceNumber: '',
            s_RangeTypeCode: '',
            n_RangeTypeMin: '',
            n_RangeTypeMax: '',
            n_RateOfCommission: ''
          }
        ]
      });
    }
  }
  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    if (!value) {
      alert(`The value can not blank!`);
    }

    this.setState({
      [name]: value
    });
  }
  handleRemoveSpecificRow(e, idx) {
    e.preventDefault();
    const ranges = [...this.state.ranges];
    ranges.splice(idx, 1);
    this.setState({ ranges });
  }
  handleAdd(e) {
    e.preventDefault();
    this.setState({
      ranges: [
        ...this.state.ranges,
        {
          n_RangeSetNumber: '',
          n_RangeSetName: '',
          n_SequenceNumber: '',
          s_RangeTypeCode: '',
          n_RangeTypeMin: '',
          n_RangeTypeMax: '',
          n_RateOfCommission: ''
        }
      ]
    });
  }
  handleRangeChange(index, key, value) {
    this.setState({
      ranges: [
        ...this.state.ranges.filter((item, id) => id < index),
        {
          ...this.state.ranges[index],
          [key]: value
        },
        ...this.state.ranges.filter((item, id) => id > index)
      ]
    })
  }
  submitFormHandle = (e) => {
    e.preventDefault();
    let formSubmitedData = new FormData(e.target);
    if (this.state.isEdit) {
      this.props.dispatch(commissionRuleServiceObj.updateRecord(this.state.index, formSubmitedData))
      .then(() => {
        alert('Successfully Updated');
      }).catch((error) => {
        alert(error);
      })
    } else {
      this.props.dispatch(commissionRuleServiceObj.addNewRecord(formSubmitedData))
      .then(() => {
        alert('Successfully Created');
      }).catch((error) => {
        alert(error);
      })
    }
  }
  render() {
    const { 
      isLoadingAddBtn, 
      commBaseTypeOpts, 
      frqPaymentOpts, 
      commCalcTypeOpts, 
      commRuleStatusOpts, 
      policyActionListOpts,
      rangeTypeListOpts,
      lobListOpts,
      territoryOpts,
      productOpts
    } = this.props;
    const { 
      isEdit,
      s_RuleName,
      s_Description,
      n_CommBaseTypeId_FK,
      n_LineOfBusinessId_PK,
      n_ProductId_FK,
      n_TerritoryId_FK,
      s_FrequencyOfPaymentCode,
      s_PolicyAction,
      s_CommissionCalculationCode,
      n_RateOfCommission,
      d_EffectiveFromDate,
      d_EffectiveToDate,
      s_RuleStatusCode,
      ranges,
      isLoading
    } = this.state;
    return (
      <div className="animated fadeIn mt-3">
        <Card>
          <CardHeader>
            {
              isEdit == true ? 'Update Rule' : 'Add Rule'
            }
          </CardHeader>
          <CardBody>
            {
              isLoading == true ? (
                <LoadingDiv />
              ) : (
                  <Form method='post' id='ruleForm' ref='ruleForm' onSubmit={this.submitFormHandle}>
                    {
                      isEdit == true &&
                      <Input type='hidden' value='PUT' name='_method' />
                    }
                    <Row>
                      <Col md={{size: 6, offset: 3}}>
                        <Row>
                          <Col sm="5">
                            <Label for='s_RuleName' className="pr-2">Rule Name</Label>
                          </Col>
                          <Col sm="7">
                            <Input id='s_RuleName' name='s_RuleName' value={s_RuleName} onChange={this.handleInputChange} bsSize='sm' required />
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="5"><Label for='s_Description' className="pr-2">Rule Description</Label></Col>
                          <Col sm="7"><Input id='s_Description' name='s_Description' value={s_Description} onChange={this.handleInputChange} bsSize='sm' required /></Col>
                        </Row>
                        <Row>
                          <Col sm="5"><Label for='s_RuleStatusCode' className="pr-2">Rule Status</Label></Col>
                          <Col sm="7">
                            <Input type='select' id='s_RuleStatusCode' name='s_RuleStatusCode' value={s_RuleStatusCode} onChange={this.handleInputChange} bsSize='sm'>
                              <option value="">Select</option>
                              {
                                Object.keys(commRuleStatusOpts).map((key, index) => (
                                  <option key={index} value={key}>{commRuleStatusOpts[key]}</option>
                                ))
                              }
                            </Input>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="5"><Label for='d_EffectiveFromDate' className="pr-2">Effective From</Label></Col>
                          <Col sm="7"><Input type='date' id='d_EffectiveFromDate' name='d_EffectiveFromDate' value={d_EffectiveFromDate} onChange={this.handleInputChange} bsSize='sm' /></Col>
                        </Row>
                        <Row>
                          <Col sm="5"><Label for='d_EffectiveToDate' className="pr-2">Effective To</Label></Col>
                          <Col sm="7"><Input type='date' id='d_EffectiveToDate' name='d_EffectiveToDate' value={d_EffectiveToDate} onChange={this.handleInputChange} bsSize='sm' /></Col>
                        </Row>
                        <Row>
                          <Col sm="5"><Label for='n_CommBaseTypeId_FK' className="pr-2">Commission Base Type</Label></Col>
                          <Col sm="7">
                            <Input type='select' id='n_CommBaseTypeId_FK' name='n_CommBaseTypeId_FK' value={n_CommBaseTypeId_FK} onChange={this.handleInputChange} bsSize='sm' >
                              <option value="">Select</option>
                              {
                                Object.keys(commBaseTypeOpts).map((key, index) => (
                                  <option key={index} value={key}>{commBaseTypeOpts[key]}</option>
                                ))
                              }
                            </Input>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="5"><Label for='n_LineOfBusinessId_PK' className="pr-2">Line Of Business</Label></Col>
                          <Col sm="7">
                            <Input type='select' id='n_LineOfBusinessId_PK' name='n_LineOfBusinessId_PK' value={n_LineOfBusinessId_PK} onChange={this.handleInputChange} bsSize='sm' >
                              <option value="">Select</option>
                              {
                                Object.keys(lobListOpts).map((key, index) => (
                                  <option key={index} value={key}>{lobListOpts[key]}</option>
                                ))
                              }
                            </Input>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="5"><Label for='n_ProductId_FK' className="pr-2">Product</Label></Col>
                          <Col sm="7">
                            <Input type='select' id='n_ProductId_FK' name='n_ProductId_FK' value={n_ProductId_FK} onChange={this.handleInputChange} bsSize='sm' >
                              <option value="">Select</option>
                              <option value="0">All</option>
                              {
                                Object.keys(productOpts).map((key, index) => (
                                  <option key={index} value={key}>{productOpts[key]}</option>
                                ))
                              }
                            </Input>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="5"><Label for='n_TerritoryId_FK' className="pr-2">Territory</Label></Col>
                          <Col sm="7">
                            <Input type='select' id='n_TerritoryId_FK' name='n_TerritoryId_FK' value={n_TerritoryId_FK} onChange={this.handleInputChange} bsSize='sm'>
                              <option value="">Select</option>
                              {
                                Object.keys(territoryOpts).map((key, index) => (
                                  <option key={index} value={key}>{territoryOpts[key]}</option>
                                ))
                              }
                            </Input>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="5"><Label for='s_FrequencyOfPaymentCode' className="pr-2">Frequency of Payment</Label></Col>
                          <Col sm="7">
                            <Input type='select' id='s_FrequencyOfPaymentCode' name='s_FrequencyOfPaymentCode' value={s_FrequencyOfPaymentCode} onChange={this.handleInputChange} bsSize='sm' >
                              <option value="">Select</option>
                              {
                                Object.keys(frqPaymentOpts).map((key, index) => (
                                  <option key={index} value={key}>{frqPaymentOpts[key]}</option>
                                ))
                              }
                            </Input>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="5"><Label for='s_PolicyAction' className="pr-2">Policy Action</Label></Col>
                          <Col sm="7">
                            <Input type='select' id='s_PolicyAction' name='s_PolicyAction' value={s_PolicyAction} onChange={this.handleInputChange} bsSize='sm' >
                              <option value="">Select</option>
                              <option value="ALL">All</option>
                              {
                                Object.keys(policyActionListOpts).map((key, index) => (
                                  <option key={index} value={key}>{policyActionListOpts[key]}</option>
                                ))
                              }
                            </Input>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="5"><Label for='s_CommissionCalculationCode' className="pr-2">Commission Calculation Type</Label></Col>
                          <Col sm="7">
                            <Input type='select' id='s_CommissionCalculationCode' name='s_CommissionCalculationCode' value={s_CommissionCalculationCode} onChange={this.handleInputChange} bsSize='sm' >
                              <option value="">Select</option>
                              {
                                Object.keys(commCalcTypeOpts).map((key, index) => (
                                  <option key={index} value={key}>{commCalcTypeOpts[key]}</option>
                                ))
                              }
                            </Input>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    {
                      s_CommissionCalculationCode === 'FIXEDRATE' && (
                        <Row>
                          <Col md={{size: 6, offset: 3}}>
                            <Row>
                              <Col sm="5"><Label for='n_RateOfCommission' className="pr-2">Rate of Commission in Percent</Label></Col>
                              <Col sm="7">
                                <InputGroup>
                                  <Input id='n_RateOfCommission' name='n_RateOfCommission' value={n_RateOfCommission} onChange={this.handleInputChange} bsSize='sm' />&nbsp;&nbsp;%
                                </InputGroup>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      ) 
                    }
                    {
                      s_CommissionCalculationCode ==='RANGE' && (
                        <Row>
                          <Col md="12">
                            <Table borderless responsive>
                              <thead>
                                <tr>
                                  <th>Set No</th>
                                  <th>Set Name</th>
                                  <th>Seq. No</th>
                                  <th>Range Type</th>
                                  <th>Range Min</th>
                                  <th>Range Max</th>
                                  <th>Comm. Rate %</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  ranges.map((item, index) =>(
                                    <tr key={index}>
                                      <td><Input bsSize='sm' type="text" name={`ranges[${index}][n_RangeSetNumber]`} value={item.n_RangeSetNumber} onChange={(e) => this.handleRangeChange(index, 'n_RangeSetNumber', e.target.value) } /></td>
                                      <td><Input bsSize='sm' type="text" name={`ranges[${index}][n_RangeSetName]`} value={item.n_RangeSetName} onChange={(e) => this.handleRangeChange(index, 'n_RangeSetName', e.target.value) } /></td>
                                      <td><Input bsSize='sm' type="text" name={`ranges[${index}][n_SequenceNumber]`} value={item.n_SequenceNumber} onChange={(e) => this.handleRangeChange(index, 'n_SequenceNumber', e.target.value) } /></td>
                                      <td>
                                        <Input bsSize='sm' type='select' name={`ranges[${index}][s_RangeTypeCode]`} value={item.s_RangeTypeCode} onChange={(e) => this.handleRangeChange(index, 's_RangeTypeCode', e.target.value) } >
                                          <option value="">Select</option>
                                          {
                                            Object.keys(rangeTypeListOpts).map((key, listIndex) => (
                                              <option key={listIndex} value={key}>{rangeTypeListOpts[key]}</option>
                                            ))
                                          }
                                        </Input>
                                      </td>
                                      <td><Input bsSize='sm' type="text" name={`ranges[${index}][n_RangeTypeMin]`} value={item.n_RangeTypeMin} onChange={(e) => this.handleRangeChange(index, 'n_RangeTypeMin', e.target.value) } /></td>
                                      <td><Input bsSize='sm' type="text" name={`ranges[${index}][n_RangeTypeMax]`} value={item.n_RangeTypeMax} onChange={(e) => this.handleRangeChange(index, 'n_RangeTypeMax', e.target.value) } /></td>
                                      <td><Input bsSize='sm' type="text" name={`ranges[${index}][n_RateOfCommission]`} value={item.n_RateOfCommission} onChange={(e) => this.handleRangeChange(index, 'n_RateOfCommission', e.target.value) } /></td>
                                      <td>
                                        <Button 
                                          size="sm" 
                                          color="danger" 
                                          className="btn-pill"
                                          onClick={(e) => this.handleRemoveSpecificRow(e, index)}
                                        >
                                          <i className="icon-close icons d-block pt-1"></i>
                                        </Button>
                                      </td>
                                    </tr>
                                  ))
                                }
                              </tbody>
                            </Table>
                            <Button className="float-left" size="sm" color="primary" onClick={this.handleAdd}>Add</Button>
                          </Col>
                        </Row>
                      )
                    }
                    <Row className="mt-3">
                      <Col>
                        <Button
                          type="submit"
                          size="sm"
                          color="primary"
                          className="float-right"
                          form="ruleForm"
                          disabled={isLoadingAddBtn ? true : false}
                        >
                          <i className="fa fa-dot-circle-o"></i>
                          {isLoadingAddBtn ? " Saving..." : " Submit"}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )
            }
          </CardBody>
        </Card>
      </div>
    )
  }
}

RuleModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


const mapStateToProp = (state) => ({
  individual: state.ruleManageProcess.individual,
  isLoadingIndividual: state.ruleManageProcess.isLoadingIndividual,
  isLoadingAddBtn: state.ruleManageProcess.isLoadingAddBtn,
  commBaseTypeOpts: state.ruleManageProcess.commBaseTypeOpts,
  frqPaymentOpts: state.ruleManageProcess.frqPaymentOpts,
  commCalcTypeOpts: state.ruleManageProcess.commCalcTypeOpts,
  rangeTypeListOpts: state.ruleManageProcess.rangeTypeListOpts,
  commRuleStatusOpts: state.ruleManageProcess.commRuleStatusOpts,
  lobListOpts: state.ruleManageProcess.lobListOpts,
  policyActionListOpts: state.ruleManageProcess.policyActionListOpts,
  territoryOpts: state.ruleManageProcess.territoryOpts,
  productOpts: state.ruleManageProcess.productOpts
});

export default connect(mapStateToProp)(RuleModal);
