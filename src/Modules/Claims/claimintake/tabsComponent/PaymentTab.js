import React, { useState } from 'react';
import {Label, Input, Button, Table, Card, CardHeader, CardFooter} from 'reactstrap';

const data = [
  {
    date: '11-08-2018',
    transType: 'Loss Reserves',
    transSubType: 'Claim Expense',
    in: '$2,600.00',
    out: '$0.00',
    runningBal: '$2,600.00',
    inserted: 'System'
  },
  {
    date: '11-08-2018',
    transType: 'Loss Reserves',
    transSubType: 'OAE',
    in: '$300.00',
    out: '$0.00',
    runningBal: '$2,900.00',
    inserted: 'System'
  },
  {
    date: '11-08-2018',
    transType: 'Loss Reserves',
    transSubType: 'OAE',
    in: '$0.00',
    out: '$125.00',
    runningBal: '$2,775.00',
    inserted: 'System'
  }
];
const filterKeys = ['', 'Claim Expense', 'OAE', 'Legal Expense', 'Mitigation', 'Other Legal', 'Subrogation', 'Excess / Deductible'];

const PaymentTab = (prop) => {

  const [transType, setTransType] = useState('');
  const [transSubType, setTransSubType] = useState('');
  const [activeTable, setActiveTable] = useState(0);
  const [filteredData, setFilteredData] = useState(data);

  const handleTransType = (e) => {
    setTransType(e.target.value)
  }
  const handleTransSubType = (e) => {
    setTransSubType(e.target.value)
  }
  const filterData = (index) => {
    const filterKey = filterKeys[index];
    if (filterKey) {
      setFilteredData(data.filter((item) => { return item.transSubType == filterKey}))
    } else {
      setFilteredData(data);
    }
    setActiveTable(index);
  }
  return (
  <>
    <Card>
      <CardHeader>
        Add Reserves/Payment
        </CardHeader>
      <Table borderless size="sm">
        <tbody>
          <tr>
            <td className="align-middle"><Label className="mb-0">Date</Label></td>
            <td><Input type="date" color="primary" size="sm" /></td>
            <td></td>
            <td className="align-middle"><Label className="mb-0">Transaction Type</Label></td>
            <td colSpan="3">
              <Input type="select" color="primary" size="sm" value={transType} onChange={handleTransType}>
                <option value="" selected="selected">Select</option>
                <option value="Loss Reserves">Loss Reserves</option>
                <option value="Loss Payment">Loss Payment</option>
                <option value="Reset Reserves">Reset Reserves</option>
              </Input>
            </td>
          </tr>
          <tr>
            <td className="align-middle"><Label className="mb-0">Transaction Sub Type</Label></td>
            <td>
              <Input type="select" color="primary" size="sm" value={transSubType} onChange={handleTransSubType}>
                <option value="">Select</option>
                <option value="Claim Expense">Claim Expense</option>
                <option value="OAE">OAE</option>
                <option value="Legal Expense">Legal Expense</option>
                <option value="Mitigation">Mitigation</option>
                <option value="Other Legal">Other Legal</option>
                <option value="Subrogation">Subrogation</option>
                <option value="Excess Deductible">Excess / Deductible</option>
              </Input>
            </td>
            <td></td>
            <td className="align-middle"><Label className="mb-0">Amount</Label></td>
            <td colSpan="3"><Input color="primary" size="sm" disabled className="gray-input" /></td>
          </tr>
          {
            transType == 'Loss Payment' && (
              <>
                <tr>
                  <td className="align-middle">Payee</td>
                  <td><Input disabled size="sm" /></td>
                  <td><Button size="sm" color="primary">Select Payee</Button></td>
                  <td className="align-middle">Address</td>
                  <td rowSpan="2" colSpan="2">
                    <Input type="textarea" size="sm" disabled />
                  </td>
                </tr>
                <tr>
                  <td className="align-middle">Name on Check</td>
                  <td><Input size="sm" /></td>
                  <td colSpan="2"></td>
                </tr>
                <tr>
                  <td className="align-middle">Invoice Date</td>
                  <td><Input type="date" size="sm" /></td>
                  <td></td>
                  <td className="align-middle">Invoice Due Date</td>
                  <td><Input type="date" size="sm" /></td>
                </tr>
                <tr>
                  <td className="align-middle">Invoice#</td>
                  <td><Input size="sm" /></td>
                  <td></td>
                  <td className="align-middle">Memo On Check</td>
                  <td><Input size="sm" /></td>
                </tr>
                <tr>
                  <td colSpan="6">
                    <hr />
                  </td>
                </tr>
                <tr>
                  <td className="align-middle">File Name</td>
                  <td><Input size="sm"/></td>
                  <td></td>
                  <td className="align-middle">Authorization</td>
                  <td>
                    <Input type="select" size="sm">
                      <option value="" selected="selected">Select</option>
                      <option value="Internal">Internal</option>
                      <option value="External">External</option>
                    </Input>
                  </td>
                </tr>
                <tr>
                  <td>Attachment Type</td>
                  <td>
                    <Input type="select" size="sm">
                      <option value="" selected="selected">Select</option>
                      <option value="SINGLE">Single File</option>
                      <option value="MULTIPLE">Multiple Files</option>
                    </Input>
                  </td>
                  <td></td>
                  <td className="align-middle">Document Type</td>
                  <td className="align-middle">
                    <Input type="select" size="sm" multiple>
                      <option value="5">Repair Estimate</option>
                      <option value="INVOICE">Invoice</option>
                      <option value="SETTLEMENTPAYMENT">Settlement Payment</option>
                      <option value="SETTLEMENTTOVENDOR">Settlement To Vendor</option>
                      <option value="LEGALPAYMENT">Legal Payment</option>
                    </Input>
                  </td>
                </tr>
              </>
            )
            
          }
          <tr>
            {
              transType == 'Loss Payment' ? (
                <>
                  <td>Document Attach</td>
                  <td colSpan="2">
                    <Input type="file" />
                  </td>
                </>
              ) : (
                <td colSpan="3"></td>
              )
            }
            <td className="align-middle"><Label className="mb-0">Description</Label></td>
            <td colSpan="3"><Input type="textarea" rows="5" color="primary" size="sm" /></td>
          </tr>
          <tr>
            <td colSpan="3"></td>
            <td className="align-bottom">Refund</td>
            <td><Input type="checkbox" color="primary" size="sm" /></td>
            <td className="align-bottom">Refund Check</td>
            <td><Input type="checkbox" color="primary" size="sm" /></td>
          </tr>
        </tbody>
      </Table>
      <CardFooter>
        <Button color="primary" size="sm" className="float-left">Claim Deductible Payment</Button>
        <Button color="danger" size="sm" className="float-left ml-3">Unposted</Button>
        <Input disabled size="sm" color="primary" className="gray-input float-left ml-3" style={{ width: '100px' }} />
        <Button type="reset" color="primary" size="sm" className="float-right ml-3">Clear</Button>
        <Button color="primary" size="sm" className="float-right">Add Reserves/Payment</Button>
      </CardFooter>
    </Card>
    {transSubType != '' && (
      <Table borderless responsive size="sm">
        <thead>
          <tr>
            <th>COVERAGE NAME</th>
            <th>TRANS. SUB TYPE</th>
            <th>RESERVE CREATED</th>
            <th>PAYMENT CREATED</th>
            <th>BALANCE</th>
            <th>PAYMENT ALLOCATION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A-Dwelling</td>
            <td>{transSubType}</td>
            <td>$0.00</td>
            <td>$0.00</td>
            <td>$0.00</td>
            <td><Input size="sm" /></td>
          </tr>
        </tbody>
      </Table>
    )}
    <Card>
      <CardHeader className="text-right">
        <Button size="sm" color={activeTable == 0 ? 'primary' : 'secondary'} className="mr-1" onClick={() => filterData(0)}>Ledger</Button>
        <Button size="sm" color={activeTable == 1 ? 'primary' : 'secondary'} className="mr-1" onClick={() => filterData(1)}>Claim Expense</Button>
        <Button size="sm" color={activeTable == 2 ? 'primary' : 'secondary'} className="mr-1" onClick={() => filterData(2)}>OAE</Button>
        <Button size="sm" color={activeTable == 3 ? 'primary' : 'secondary'} className="mr-1" onClick={() => filterData(3)}>Legal Expense</Button>
        <Button size="sm" color={activeTable == 4 ? 'primary' : 'secondary'} className="mr-1" onClick={() => filterData(4)}>Mitigation</Button>
        <Button size="sm" color={activeTable == 5 ? 'primary' : 'secondary'} className="mr-1" onClick={() => filterData(5)}>Other Legal</Button>
        <Button size="sm" color={activeTable == 6 ? 'primary' : 'secondary'} className="mr-1" onClick={() => filterData(6)}>Subrogation</Button>
        <Button size="sm" color={activeTable == 7 ? 'primary' : 'secondary'}  onClick={() => filterData(7)}>Excess / Deductible</Button>
      </CardHeader>
      <Table size="sm" striped borderless responsive>
        <thead>
          <tr>
            <th>DATE</th>
            <th>TRANS TYPE</th>
            <th>TRANS SUB TYPE</th>
            <th>(+)</th>
            <th>(-)</th>
            <th>RUNNING BALANCE</th>
            <th>INSERTED USER</th>
            <th>DETAILS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.transType}</td>
                <td>{item.transSubType}</td>
                <td>{item.in}</td>
                <td>{item.out}</td>
                <td>{item.runningBal}</td>
                <td>{item.inserted}</td>
                <td>Show Details</td>
                <td>View Entry</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </Card>
  </>);
}

export default PaymentTab;