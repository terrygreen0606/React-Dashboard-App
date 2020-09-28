import React, { Component } from 'react';
import {
  Table,
  Label,
  Input
} from 'reactstrap';

class AgencyNewDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="animated fadeIn mt-2">
        <Table className="agency_detail" responsive>
          <tbody>
            <tr>
              <td>Web</td>
              <td><Input size="sm" name="web_s_WebsiteURL" id="web_s_WebsiteURL" /></td>
              <td>Phone</td>
              <td><Input size="sm" name="phone_s_PhoneNumber" id="phone_s_PhoneNumber" /></td>
              <td className="text-right">Fax</td>
              <td><Input size="sm" name="fax_s_FaxNumber" id="fax_s_FaxNumber" /></td>
              <td><Label htmlFor="acc_n_AccountCode1">Direct Deposit</Label></td>
              <td>
                <Input 
                  type="select" 
                  name="acc_n_AccountCode1" 
                  id="acc_n_AccountCode1"
                  size="sm" 
                  value=""
                >
                  <option value="">Select Direct Deposit</option>
                  {this.props.deposit_arr.map((deposit, index) => (
                    <option key={index} value={deposit.s_DepositKey}>
                      {deposit.s_DepositName}
                    </option>
                  ))}
                </Input>
              </td>
            </tr>
            <tr>
              <td className="font-weight-bold">Manager</td>
              <td><Input size="sm" name="manager_s_FirstName" id="manager_s_FirstName" /></td>
              <td colSpan="2" className="font-weight-bold text-right">Manager Phone</td>
              <td><Input size="sm" name="manager_s_PhoneNumber" id="manager_s_PhoneNumber" /></td>
              <td colSpan="2" className="font-weight-bold text-right">Manager Email</td>
              <td><Input size="sm" name="manager_s_EmailAddress" id="manager_s_EmailAddress" /></td>
            </tr>
            <tr>
              <td className="font-weight-bold">Principal</td>
              <td><Input size="sm" name="contact_s_ContactName" id="contact_s_ContactName" /></td>
              <td colSpan="2" className="font-weight-bold text-right">Principal phone</td>
              <td><Input size="sm" name="contact_s_PhoneNumber" id="contact_s_PhoneNumber" /></td>
              <td colSpan="2" className="font-weight-bold text-right">Principal Email</td>
              <td><Input size="sm" name="contact_s_Email" id="contact_s_Email" /></td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default AgencyNewDetail;
