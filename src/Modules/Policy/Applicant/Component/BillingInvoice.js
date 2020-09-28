import React, {Component} from 'react';
import IDetailRow from './IDetailRow';
import IFeeDetailRow from './IFeeDetailRow';
import { Table, Row, Col, CardHeader, Card, CardBody } from 'reactstrap';
import { formatMoney } from '../../../../services/commanServices';
import { policyService } from "../../../../services/policyService";

class BillingInvoice extends Component {
  constructor (props) {
    super(props)
    this.apiService = new policyService();
    this.state = {
      tableacc: -1,
      dt_headers: {
        TransDate: 'TRANS DT.',
        PolicyNo: 'POLICY NO.',
        TransType: 'TRANS TYPE',
        TransAmt: 'TRANS AMT.',
        BilledAmt: 'BILLED AMT.',
      },
      fee_headers: {
        ChargName: 'CHARG NAME',
        AmountPercent: 'AMOUNT%',
        Value: 'VALUE',
        ChargesAmt: 'CHARGES AMT.',
      },
      invDetailArray : [],
      Premium_Charges:[],
      Premium_Details:[],
    }
  }

  async tableAccordion(index,n_PAInvoiceMaster_PK) {
    let invDetailData = await this.apiService.getInvDetailData(n_PAInvoiceMaster_PK);
    let DetailData = invDetailData.data;
    let invDetail = DetailData.Premium_Details;
    let chgDetail = DetailData.Premium_Charges;
    this.setState({
      invDetailArray : invDetailData.data,
      Premium_Charges : chgDetail,
      Premium_Details : invDetail,
    });
    if (this.state.tableacc == index) {
      this.setState({
        tableacc: -1
      });
    } else {
      this.setState({
        tableacc: index,
      });
    }
  }

  renderTableRow(rowData, index) {
    return (
      <>
      <tr >
        <td style={{width:'8%'}}>{rowData.d_InvoiceDate}</td>
        <td style={{width:'8%'}}><a href="javascript:void(0)" onClick={() => this.tableAccordion(index,rowData.n_PAInvoiceMaster_PK)}><b>{rowData.s_InvoiceNo}</b></a></td>
        <td style={{width:'6%'}}>{rowData.Done}</td>
        <td style={{width:'10%'}}>{formatMoney(rowData.n_InvoicePremAmt)}</td>
        <td style={{width:'10%'}}>{formatMoney(rowData.n_InvoiceOtherCharge)}</td>
        <td style={{width:'10%'}}>{formatMoney(rowData.DueAmount)}</td>
        <td style={{width:'10%'}}>{formatMoney(rowData.n_PreviousInvoiceBalance)}</td>
        <td style={{width:'10%'}}>{formatMoney(rowData.Pmts_Adjust_amt)}</td>
        <td style={{width:'10%'}}>{formatMoney(rowData.n_FinalInvoiceAmount)}</td>
        <td style={{width:'8%'}}>{rowData.d_InvoiceDueDate}</td>
        <td style={{width:'10%'}}>
          <a href="#"><b>Print&nbsp;&nbsp;</b></a>|<a href="#"><b>&nbsp;&nbsp;Email</b></a>
        </td>
      </tr>
      </>
    )
  }

  render() {
    const { billing,BillingInvInfo } = this.props;
    const { tableacc,Premium_Charges,Premium_Details} = this.state;
    return (
      <div>
        <Card>
          <CardHeader>Policy Transaction</CardHeader>
          <CardBody>
            <Table size="sm" responsive>
              <thead>
                <tr className="main-row-table" style={{ backgroundColor: "#A2EEE7" }}>
                  <th style={{ borderTop: "none" }}>INVOICE DT.</th>
                  <th style={{ borderTop: "none" }}>INVOICE NO.</th>
                  <th style={{ borderTop: "none" }}>STATUS</th>
                  <th style={{ borderTop: "none" }}>PREMIUM</th>
                  <th style={{ borderTop: "none" }}>OTH. CHARGES</th>
                  <th style={{ borderTop: "none" }}>DUE AMT.</th>
                  <th style={{ borderTop: "none" }}>PREV BAL.</th>
                  <th style={{ borderTop: "none" }}>PMTS/ADJUST</th>
                  <th style={{ borderTop: "none" }}>INVOICE AMT.</th>
                  <th style={{ borderTop: "none" }}>DUE DT.</th>
                  <th style={{ borderTop: "none" }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {
                  BillingInvInfo.map((item, index) => {
                    return this.renderTableRow(item, index)
                  })
                }
              </tbody>
            </Table>
          </CardBody>
        </Card>
        {tableacc > -1 ? <Row>
          <Col md="6">
            <Card>
              <CardHeader>
                Invoice Details
              </CardHeader>
              <CardBody>
                <Table responsive size="sm">
                  <thead>
                    <tr className="main-row-table" style={{ backgroundColor: "#A2EEE7" }}>
                      <th style={{ borderTop: "none" }}>TRANS DT.</th>
                      <th style={{ borderTop: "none" }}>POLICY NO.</th>
                      <th style={{ borderTop: "none" }}>TRANS TYPE</th>
                      <th style={{ borderTop: "none" }}>TRANS AMT.</th>
                      <th style={{ borderTop: "none" }}>BILLED AMT.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      tableacc > -1 && Premium_Details &&  Premium_Details.map((item) => {
                        return <IDetailRow data={item} />
                      })
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardHeader>Invoice Fee Detail</CardHeader>
              <CardBody>
                <Table responsive size="sm">
                  <thead>
                    <tr className="main-row-table" style={{ backgroundColor: "#A2EEE7" }}>
                      <th style={{ borderTop: "none" }}>CHARG NAME</th>
                      <th style={{ borderTop: "none" }}>AMOUNT%</th>
                      <th style={{ borderTop: "none" }}>VALUE</th>
                      <th style={{ borderTop: "none" }}>CHARGES AMT.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      tableacc > -1 && Premium_Charges && Premium_Charges.map((item) => {
                        return <IFeeDetailRow data={item}  />
                      })
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row> : ''}
      </div>
    )
  }
}

export default BillingInvoice;