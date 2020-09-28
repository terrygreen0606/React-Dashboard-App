import React, {Component} from 'react';
import BsRow from './BsRow';
import { Table } from 'reactstrap';
import { formatMoney } from '../../../../services/commanServices';

class BillingSubLedger extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  tableAccordion(index) {
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
      <tr >
        <td>{rowData.Accounting_Date}</td>
        <td>{rowData.Action_Code}</td>
        <td>{rowData.s_TransRefNo}</td>
        <td>{formatMoney(rowData.Debit_Amount)}</td>
        <td>{formatMoney(rowData.Credit_Amount)}</td>
        <td>{rowData.SubAccount_Name}</td>
        <td>{rowData.d_CreatedDate}</td>
      </tr>
    )
  }

  render() {
    const { billing,BillingSubLedgInfo } = this.props;
    return (
      <div className="table">
        <Table size="sm" responsive>
          <thead>
            <tr className="main-row-table" style={{ backgroundColor: "#A2EEE7" }}>
              <th style={{ borderTop: "none" }}>ACCOUNTING DT.</th>
              <th style={{ borderTop: "none" }}>TRANS TYPE</th>
              <th style={{ borderTop: "none" }}>TRANS REF</th>
              <th style={{ borderTop: "none" }}>DEBIT</th>
              <th style={{ borderTop: "none" }}>CREDIT</th>
              <th style={{ borderTop: "none" }}>SUB-LEDGER</th>
              <th style={{ borderTop: "none" }}>SYSTEM DATE</th>
            </tr>
          </thead>
          <tbody>
            {
              BillingSubLedgInfo.map((item, index) => {
                return this.renderTableRow(item, index)
              })
            }
          </tbody>
        </Table>
      </div>
    )
  }
}

export default BillingSubLedger;