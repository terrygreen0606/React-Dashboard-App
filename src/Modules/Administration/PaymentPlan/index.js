import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Table,
  Input,
  Button,
} from 'reactstrap';

import moment from 'moment';

import * as paymentPlanServiceObj from '../../../services/paymentPlanservices';

import LoadingDiv from "./LoadingDiv";


class PaymentPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: -1,
      editIndex: -1,
      editData: null,
      editSchedule: null,
    }
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(paymentPlanServiceObj.loadPaymentPlans());
  }

  componentDidUpdate(prevProp) {
    if(this.props.paymentPlanSchedules != prevProp.paymentPlanSchedules && this.state.editIndex != -1) {
      this.setState({editSchedule: this.props.paymentPlanSchedules.slice(0)});
    }
  }

  setSelectedIndex = (index) => {
    const { selectedIndex, editIndex } = this.state;
    if (index != selectedIndex) {
      if (editIndex == -1 || window.confirm("You will lost your current edit. Are you want to see another plan?")) {
        this.setState({
          selectedIndex: index
        });
        const {dispatch} = this.props;
        const id = this.props.paymentPlans[index].n_PayPlanId_PK;
        console.log(index, id);
        dispatch(paymentPlanServiceObj.loadPaymentPlanSchedules(id));
      }
    }
  }

  setEditIndex = (index) => {
    const { selectedIndex, editIndex } = this.state;
    if (index != editIndex) {
      if (editIndex == -1 || window.confirm("You will lost your current edit. Are you want to edit another plan?")) {
        if (index == selectedIndex) {
          this.setState({
            editIndex: index,
            editData: {...this.props.paymentPlans[index]},
            editSchedule: this.props.paymentPlanSchedules.slice(0)
          });
        } else {
          this.setState({
            editIndex: index,
            selectedIndex: index,
            editData: {...this.props.paymentPlans[index]}
          });
          const {dispatch} = this.props;
          const id = this.props.paymentPlans[index].n_PayPlanId_PK;
          console.log(index, id);
          dispatch(paymentPlanServiceObj.loadPaymentPlanSchedules(id));
        }
      }
    }
  }

  editSchedule = (index, key, value) => {
    let schedule = this.state.editSchedule.slice(0);
    schedule[index][key] = value;
    this.setState({editIndex: schedule});
  }

  cancelUpdate = (e) => {
    e.preventDefault();
    this.setState({
      editIndex: -1,
      editData: null,
      editSchedule: null,
    });
  }

  updatePlan = (e) => {
    const {editSchedule, editData} = this.state;
    const formData = new FormData();
    const id = editData.n_PayPlanId_PK;
    delete editData.n_PayPlanId_PK;
    for (let key in editData) {
      formData.append(key, editData[key]);
    }

    for (let i = 0; i < editSchedule.length; i ++) {
      formData.append('schedule[]', JSON.stringify(editSchedule[i]));
    }
    const {dispatch} = this.props;
    dispatch(paymentPlanServiceObj.updatePaymentPlanSchedule(id, formData));
    this.setState({
      editIndex: -1,
      editData: null,
      editSchedule: null,
      selectedIndex: -1,
    })
  }

  render() {
    const { isLoading, isLoadingSchedules, paymentPlans, paymentPlanSchedules } = this.props;
    const { selectedIndex, editIndex, editData } = this.state;
    return (
      <div className="mt-3">
        <Row>
          <Col sm="12" md="7">
            <Card>
              <CardHeader>
                Payment Plans
              </CardHeader>
              <CardBody>
                {
                  isLoading ? (
                    <LoadingDiv />
                  ) : (
                    <Table borderless striped>
                      <thead>
                        <tr>
                          <th>PLAN CODE</th>
                          <th>PAYMENT PLAN</th>
                          <th>EFF. FROM</th>
                          <th>EFF. TO</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          !isLoading && paymentPlans.length > 0 && (
                            paymentPlans.map((paymentPlan, index) => (
                              <tr key = {index}>
                                <td><a href="#" onClick={e => this.setSelectedIndex(index)} >{paymentPlan.s_PayPlanCode}</a> </td>
                                <td>{paymentPlan.s_PayPlanScreenName}</td>
                                <td>{moment(paymentPlan.d_EffectiveFrom).format("MM-DD-YYYY")}</td>
                                <td>{moment(paymentPlan.d_EffectiveTo).format("MM-DD-YYYY")}</td>
                                <td><a href="#" onClick={e => this.setEditIndex(index)}>Edit</a></td>
                              </tr>
                            ))
                          )
                        }
                      </tbody>
                    </Table>
                  )
                }
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" md="5">
            <Card>
              <CardHeader>
                Plans Description
              </CardHeader>
              <CardBody>
                {
                  editIndex == -1 ? (
                    <Table borderless striped>
                      <tbody>
                        <tr>
                          <td>Plan Description:</td>
                          <td>{ selectedIndex > -1 ? paymentPlans[selectedIndex].s_PayPlanScreenName : "" }</td>
                        </tr>
                        <tr>
                          <td>Plan Code:</td>
                          <td>{ selectedIndex > -1 ? paymentPlans[selectedIndex].s_PayPlanCode : "" }</td>
                        </tr>
                        <tr>
                          <td>Number of Insert:</td>
                          <td>{ selectedIndex > -1 ? paymentPlans[selectedIndex].n_Installments : "" }</td>
                        </tr>
                        <tr>
                          <td>Plan Period in Months:</td>
                          <td>{ selectedIndex > -1 ? paymentPlans[selectedIndex].n_PlanPeriod : "" }</td>
                        </tr>
                        <tr>
                          <td>Day To Pay:</td>
                          <td>{ selectedIndex > -1 ? paymentPlans[selectedIndex].n_DaysToPay : "" }</td>
                        </tr>
                        <tr>
                          <td>Invoice First Part of Each Policy Transaction:</td>
                          <td>{ selectedIndex > -1 ? paymentPlans[selectedIndex].s_InvoiceWhenCode : "" }</td>
                        </tr>
                        <tr>
                          <td>Effective From:</td>
                          <td>{ selectedIndex > -1 ? moment(paymentPlans[selectedIndex].d_EffectiveFrom).format("MM-DD-YYYY") : "" }</td>
                        </tr>
                        <tr>
                          <td>Effective To:</td>
                          <td>{ selectedIndex > -1 ? moment(paymentPlans[selectedIndex].d_EffectiveTo).format("MM-DD-YYYY") : "" }</td>
                        </tr>
                        <tr>
                          <td>Notes:</td>
                          <td></td>
                        </tr>
                      </tbody>
                    </Table>
                  ) : (
                    <Table borderless striped>
                      <tbody>
                        <tr>
                          <td>Plan Description:</td>
                          <td><Input type="text" size="sm" value={editData.s_PayPlanScreenName} onChange={(e) => this.setState({editData: {...editData, s_PayPlanScreenName: e.target.value} })} /></td>
                        </tr>
                        <tr>
                          <td>Plan Code:</td>
                          <td><Input type="text" size="sm" value={editData.s_PayPlanCode} onChange={(e) => this.setState({editData: {...editData, s_PayPlanCode: e.target.value} })} /></td>
                        </tr>
                        <tr>
                          <td>Number of Insert:</td>
                          <td><Input type="text" size="sm" value={editData.n_Installments} onChange={(e) => this.setState({editData: {...editData, n_Installments: e.target.value} })} /></td>
                        </tr>
                        <tr>
                          <td>Plan Period in Months:</td>
                          <td><Input type="text" size="sm" value={editData.n_PlanPeriod} onChange={(e) => this.setState({editData: {...editData, n_PlanPeriod: e.target.value} })} /></td>
                        </tr>
                        <tr>
                          <td>Day To Pay:</td>
                          <td><Input type="text" size="sm" value={editData.n_DaysToPay} onChange={(e) => this.setState({editData: {...editData, n_DaysToPay: e.target.value} })} /></td>
                        </tr>
                        <tr>
                          <td>Invoice First Part of Each Policy Transaction:</td>
                          <td><Input type="text" size="sm" value={editData.s_InvoiceWhenCode} onChange={(e) => this.setState({editData: {...editData, s_InvoiceWhenCode: e.target.value} })} /></td>
                        </tr>
                        <tr>
                          <td>Effective From:</td>
                          <td><Input type="date" size="sm" value={editData.d_EffectiveFrom.split(' ')[0]} onChange={(e) => this.setState({editData: {...editData, d_EffectiveFrom: e.target.value} })} /></td>
                        </tr>
                        <tr>
                          <td>Effective To:</td>
                          <td><Input type="date" size="sm" value={editData.d_EffectiveTo.split(' ')[0]} onChange={(e) => this.setState({editData: {...editData, d_EffectiveTo: e.target.value} })} /></td>
                        </tr>
                        <tr>
                          <td>Notes:</td>
                          <td></td>
                        </tr>
                      </tbody>
                    </Table>
                  )
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Invoice Installments
              </CardHeader>
              <CardBody>
                {
                  isLoadingSchedules ? (
                    <LoadingDiv />
                  ) : (
                    <Table borderless striped>
                      <thead>
                        <tr>
                          <th>INST. NO</th>
                          <th>% OF COVERAGE PREMIUM</th>
                          <th>% OF FEES</th>
                          <th>INST. FEE</th>
                          <th>$/%</th>
                          <th>+/-</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          paymentPlanSchedules && paymentPlanSchedules.length > 0 && selectedIndex != -1 && editIndex == -1 && (
                            paymentPlanSchedules.map((paymentPlanSchedule, index) => (
                              <tr key={`schedule_${index}`}>
                                <td>{paymentPlanSchedule.n_InstallmentNo}</td>
                                <td>{paymentPlanSchedule.n_InstallmentPercent || ""}</td>
                                <td>{paymentPlanSchedule.n_InstallmentPercentFee || ""}</td>
                                <td>{paymentPlanSchedule.n_ChargeValue || "" }</td>
                                <td>{paymentPlanSchedule.s_ChargeAmtPct}</td>
                                <td>{paymentPlanSchedule.s_ChargeSign}</td>
                              </tr>
                            ))
                          )
                        }
                        {
                          this.state.editSchedule && this.state.editSchedule.length > 0 && editIndex != -1 && (
                            this.state.editSchedule.map((paymentPlanSchedule, index) => (
                              <tr key={`schedule_${index}`}>
                                <td>
                                  {paymentPlanSchedule.n_InstallmentNo}
                                </td>
                                <td>
                                  <Input type="text" size="sm" value={paymentPlanSchedule.n_InstallmentPercent} onChange={(e) => this.editSchedule(index, "n_InstallmentPercent", e.target.value)} />
                                </td>
                                <td>
                                  <Input type="text" size="sm" value={paymentPlanSchedule.n_InstallmentPercentFee} onChange={(e) => this.editSchedule(index, "n_InstallmentPercentFee", e.target.value)} />
                                </td>
                                <td>
                                  <Input type="text" size="sm" value={paymentPlanSchedule.n_ChargeValue} onChange={(e) => this.editSchedule(index, "n_ChargeValue", e.target.value)} />
                                </td>
                                <td>
                                  <Input type="text" size="sm" value={paymentPlanSchedule.s_ChargeAmtPct} onChange={(e) => this.editSchedule(index, "s_ChargeAmtPct", e.target.value)} />
                                </td>
                                <td>
                                  <Input type="text" size="sm" value={paymentPlanSchedule.s_ChargeSign} onChange={(e) => this.editSchedule(index, "s_ChargeSign", e.target.value)} />
                                </td>
                              </tr>
                            ))
                          )
                        }
                      </tbody>
                    </Table>
                  )
                }
              </CardBody>
              {
                editIndex != -1 && (
                  <CardFooter className="text-center">
                    <Button className="mr-2" size="sm" color="primary" onClick={this.updatePlan}>Update Plan</Button>
                    <Button className="mr-2" size="sm" color="primary" onClick={this.cancelUpdate}>Cancel</Button>
                  </CardFooter>
                )
              }
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.paymentPlans.isLoading,
  isLoadingSchedules: state.paymentPlans.isLoadingSchedules,
  paymentPlans: state.paymentPlans.paymentPlans,
  paymentPlanSchedules: state.paymentPlans.paymentPlanSchedules,
})

export default connect(mapStateToProps)(PaymentPlan);