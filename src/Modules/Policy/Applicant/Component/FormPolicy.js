import React, {Component} from 'react';
import { Table, Card, CardHeader, CardBody } from 'reactstrap';
import { formatMoney } from '../../../../services/commanServices';
import { policyService } from "../../../../services/policyService";

class BillingAccount extends Component {
  constructor (props) {
    super(props)
    this.apiService = new policyService();
    this.state = {
      tableacc: -1,
    }
  }

  renderTableRow(rowData, index) {
    return (
      <>
        <tr >
          <td>{rowData.Document}</td>
          <td>{rowData.FormID}</td>
          <td>{rowData.s_PrintStatus}</td>
          <td>{rowData.d_FirstPrintedDate}</td>
          <td>{rowData.s_FirstPrintedUser}</td>
          <td>{rowData.d_LastPrintDate}</td>
          <td>{rowData.s_LastPrintedUser}</td>
          <td>{rowData.DocFileType}</td>
          {/*<td>{rowData.DocFileType}</td>*/}
        </tr>
      </>
    )
  }

  render() {
    const { PolicyformsData } = this.props;
    return (
      <div className="table">
        <Card style={{marginTop:'5px;'}}>
          <CardBody>
            <Table size="sm">
              <thead>
                <tr className="main-row-table" style={{ backgroundColor: "#A2EEE7" }}>
                  <th style={{ borderTop: "none" }}>FORM NAME. </th>
                  <th style={{ borderTop: "none" }}>FORM ID </th>
                  <th style={{ borderTop: "none" }}>STATUS </th>
                  <th style={{ borderTop: "none" }}>FIRST PRINTED </th>
                  <th style={{ borderTop: "none" }}>FIRST PRINTED BY </th>
                  <th style={{ borderTop: "none" }}>LAST PRINTED </th>
                  <th style={{ borderTop: "none" }}>LAST PRINTED BY </th>
                  <th style={{ borderTop: "none" }}>FORM TYPE </th>
                  {/*<th style={{ borderTop: "none" }}>FORM CONFIG</th>*/}
                </tr>
              </thead>
              <tbody>
                {
                  PolicyformsData != '' ? PolicyformsData.map((item, index) => {
                    return this.renderTableRow(item, index)
                  }) : <b>No Data Available</b>
                }
              </tbody>
            </Table>
          </CardBody>
          </Card>
      </div>
    )
  }
}

export default BillingAccount;
