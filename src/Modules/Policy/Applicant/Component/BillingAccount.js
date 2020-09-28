import React, {Component} from 'react';
import BsRow from './BsRow';
import { Table, Card, CardHeader, CardBody } from 'reactstrap';
import { formatMoney } from '../../../../services/commanServices';
import { policyService } from "../../../../services/policyService";

class BillingAccount extends Component {
  constructor (props) {
    super(props)
    this.apiService = new policyService();
    this.state = {
      tableacc: -1,
      accDetailArray : [],
    }
  }

  async tableAccordion(index,n_PATransactionMaster_PK) {
    let accDetailData = await this.apiService.getAccDetailData(n_PATransactionMaster_PK);
    this.setState({
      accDetailArray : accDetailData.data,
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
          <td>{rowData.d_AccountingDate}</td>
          <td>{rowData.s_TransTypeCode.toUpperCase()}</td>
          <td><a href="javascript:void(0)" onClick={() => this.tableAccordion(index,rowData.n_PATransactionMaster_PK)}><b>{rowData.s_TransRefNo}</b></a></td>
          <td>{rowData.s_ScreenName.toUpperCase()}</td>
          <td>{formatMoney(rowData.Unallocatedamount)}</td>
          <td>{formatMoney(rowData.Amount)}</td>
          <td>{formatMoney(rowData.credit)}</td>
          <td>{formatMoney(rowData.runningbalance)}</td>
          <td>{rowData.d_CreatedDate}</td>
        </tr>
      </>
    )
  }

  render() {
    const { BillingAccViewInfo } = this.props;
    const { tableacc,accDetailArray } = this.state;
    return (
      <div className="table">
        <Card>
          <CardHeader>Policy Transaction</CardHeader>
          <CardBody>
            <Table size="sm" responsive>
              <thead>
                <tr className="main-row-table" style={{ backgroundColor: "#A2EEE7" }}>
                  <th style={{ borderTop: "none" }}>ACCOUNTING DT. </th>
                  <th style={{ borderTop: "none" }}>TRANS TYPE </th>
                  <th style={{ borderTop: "none" }}>TRANS REF </th>
                  <th style={{ borderTop: "none" }}>USER ID </th>
                  <th style={{ borderTop: "none" }}>UNALLOCATED </th>
                  <th style={{ borderTop: "none" }}>DEBIT </th>
                  <th style={{ borderTop: "none" }}>CREDIT </th>
                  <th style={{ borderTop: "none" }}>BALANCE </th>
                  <th style={{ borderTop: "none" }}>SYSTEM DT</th>
                </tr>
              </thead>
              <tbody>
                {
                  BillingAccViewInfo.map((item, index) => {
                    return this.renderTableRow(item, index)
                  })
                }
              </tbody>
            </Table>
          </CardBody>
        </Card>
        {tableacc > -1 ? <Card>
          <CardHeader>Policy Transaction Detail</CardHeader>
          <CardBody>
            <Table size="sm" responsive className="mt-2">
              <thead>
                <tr className="main-row-table" style={{ backgroundColor: "#A2EEE7" }}>
                  <th style={{ borderTop: "none" }}>TRANS-SUB-TYPE</th>
                  <th style={{ borderTop: "none" }}>UNALLOCATED</th>
                  <th style={{ borderTop: "none" }}>DEBIT</th>
                  <th style={{ borderTop: "none" }}>CREDIT</th>
                  <th style={{ borderTop: "none" }}>CONTRA ACCOUNT</th>
                </tr>
              </thead>
              <tbody>
              {
                tableacc > -1 && accDetailArray && accDetailArray.map((item) => {
                  return <BsRow data={item} />
                })
              }
              </tbody>
            </Table>
          </CardBody>
        </Card> : ''}
      </div>
    )
  }
}

export default BillingAccount;