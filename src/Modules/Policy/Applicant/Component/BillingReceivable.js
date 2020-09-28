import React, {Component} from 'react';
import BsRow from './BsRow';
import { Table } from 'reactstrap';
import { formatMoney } from '../../../../services/commanServices';

class BillingReceivable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableacc: 0,
      headers: {
        TransSubType: 'TRANS-SUB-TYPE',
        TransRef: 'TRANS REF',
        EffDate: 'EFF. DT.',
        Debit: 'DEBIT',
        Credit: 'CREDIT',
        RunningBal: 'RUNNIG BAL.'
      },
      runBal : 0,
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

  setRunBal(index){
    let amt = parseInt(this.props.BillingRecViewInfo[0].n_premiumamount);
    if(index != 0){
      for(let i=index;i>0;i--){
        amt = amt + parseInt(this.props.BillingRecViewInfo[i].n_premiumamount);
      }
      return amt;
    }
    return amt;
  }

  renderTableRow(rowData, index) {
    return (
      <tr >
        <td>{rowData.order1}</td>
        <td>{rowData.s_TranTypeScreenName}</td>
        <td>{rowData.s_TranSubtypeScreenName}</td>
        <td>{rowData.Policy_No}</td>
        <td>{rowData.d_TransEffectiveFrom}</td>
        <td>{formatMoney(rowData.n_premiumamount)}</td>
        <td>{formatMoney(rowData.Credit)}</td>
        <td>{formatMoney(this.setRunBal(index))}</td>
      </tr>
    )
  }

  render() {
    const { billing,BillingRecViewInfo } = this.props;
    console.log(this.state.runBal);
    return (
      <div className="table">
        <Table size="sm" responsive>
          <thead>
            <tr className="main-row-table" style={{ backgroundColor: "#A2EEE7" }}>
              <th style={{ borderTop: "none" }}>ACCOUNTING DT.</th>
              <th style={{ borderTop: "none" }}>TRANS TYPE</th>
              <th style={{ borderTop: "none" }}>TRANS-SUB-TYPE</th>
              <th style={{ borderTop: "none" }}>TRANS REF</th>
              <th style={{ borderTop: "none" }}>EFF DT.</th>
              <th style={{ borderTop: "none" }}>DEBIT</th>
              <th style={{ borderTop: "none" }}>CREDIT</th>
              <th style={{ borderTop: "none" }}>RUNNING BAL</th>
            </tr>
          </thead>
          <tbody>
            {
              BillingRecViewInfo.map((item, index) => {
                return this.renderTableRow(item, index)
              })
            }
          </tbody>
        </Table>
      </div>
    )
  }
}

export default BillingReceivable;