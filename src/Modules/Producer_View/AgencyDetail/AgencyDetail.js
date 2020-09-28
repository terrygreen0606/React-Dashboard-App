import React, { Component } from 'react';
import {
  Table,
  Label,
  Input,
} from 'reactstrap';
import { TextMask, InputAdapter } from 'react-text-mask-hoc';
import Select from 'react-select';
//import 'react-select/dist/react-select.min.css';

class AgencyDetail extends Component {
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
            <td>
              <Input
                type="text"
                id="web_s_WebsiteURL"
                name="web_s_WebsiteURL"
                value={this.props.agencyInfo.web_s_WebsiteURL}
                className="input-sm"
                placeholder=""
                onChange={this.props.handleChange}
                onBlur={this.handleBlur}
                required
              />
            </td>
            <td>Phone</td>
            <td>
              <TextMask
                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                Component={InputAdapter}
                className="form-control"
                type="text"
                id="phone_s_PhoneNumber"
                name="phone_s_PhoneNumber"
                value={this.props.agencyInfo.phone_s_PhoneNumber}
                placeholder=""
                onChange={this.props.handleChange}
                onBlur={(e) => this.props.validateFields(e)}
                required
              />
            </td>
            <td className="text-right">Fax</td>
            <td>
              <TextMask
                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                Component={InputAdapter}
                className="form-control"
                type="text"
                id="fax_s_FaxNumber"
                name="fax_s_FaxNumber"
                value={this.props.agencyInfo.fax_s_FaxNumber}
                placeholder=""
                onChange={this.props.handleChange}
                onBlur={(e) => this.props.validateFields(e)}
                required
              />
            </td>
            <td >Direct Deposit</td>
            <td>
              <Input
                type="select"
                name="acc_n_AccountCode1"
                id="acc_n_AccountCode1"

                value={this.props.agencyInfo.acc_n_AccountCode1}
                onChange={this.props.handleChange}
                onBlur={this.handleBlur}
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
            <td>
              <Input
                type="text"
                id="manager_s_FirstName"
                name="manager_s_FirstName"
                value={this.props.agencyInfo.manager_s_FirstName}
                className="input-sm"
                placeholder=""
                onChange={this.props.handleChange}
                onBlur={this.handleBlur}
                required
              />
            </td>
            <td colSpan="2" className="font-weight-bold text-right">Manager Phone</td>
            <td>
              <TextMask
                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                Component={InputAdapter}
                className="form-control"
                type="text"
                id="manager_s_PhoneNumber"
                name="manager_s_PhoneNumber"
                value={this.props.agencyInfo.manager_s_PhoneNumber}
                placeholder=""
                onChange={this.props.handleChange}
                onBlur={(e) => this.props.validateFields(e)}
                required
              />
            </td>
            <td colSpan="2" className="font-weight-bold text-right">Manager Email</td>
            <td>
              <Input

                type="text"
                id="manager_s_EmailAddress"
                name="manager_s_EmailAddress"
                value={this.props.agencyInfo.manager_s_EmailAddress}
                className="input-sm"
                placeholder=""
                onChange={this.props.handleChange}
                onBlur={(e) => this.props.validateFields(e)}
                required
              />
            </td>
          </tr>
          <tr>
            <td className="font-weight-bold">Principal</td>
            <td>
              <Input

                type="text"
                id="contact_s_ContactName"
                name="contact_s_ContactName"
                value={this.props.agencyInfo.contact_s_ContactName}
                className="input-sm"
                placeholder=""
                onChange={this.props.handleChange}
                onBlur={this.handleBlur}
                required
              />
            </td>
            <td colSpan="2" className="font-weight-bold text-right">Principal phone</td>
            <td>
              <TextMask
                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                Component={InputAdapter}
                className="form-control"
                type="text"
                id="contact_s_PhoneNumber"
                name="contact_s_PhoneNumber"
                value={this.props.agencyInfo.contact_s_PhoneNumber}
                placeholder=""
                onChange={this.props.handleChange}
                onBlur={(e) => this.props.validateFields(e)}
                required
              />
            </td>
            <td colSpan="2" className="font-weight-bold text-right">Principal Email</td>
            <td>
              <Input

                type="text"
                id="contact_s_Email"
                name="contact_s_Email"
                value={this.props.agencyInfo.contact_s_Email}
                className="input-sm"
                placeholder=""
                onChange={this.props.handleChange}
                onBlur={(e) => this.props.validateFields(e)}
                required
              />
            </td>
          </tr>
          <tr hidden={this.props.agencyInfo.acc_n_AccountCode1 == 'DIRDEPOT' ? false : this.props.showBankDetail}>
          <td className="font-weight-bold">Bank Account No</td>
            <td>
              <Input
                type="text"
                id="acc_s_BankAccountNO"
                name="acc_s_BankAccountNO"
                value={this.props.agencyInfo.acc_s_BankAccountNO}
                className="input-sm"
                placeholder=""
                onChange={this.props.handleChange}
                onBlur={this.handleBlur}
                required
              />
            </td>
            <td colSpan="2" className="font-weight-bold text-right">Bank Name</td>
            <td>
              <Input
                type="text"
                id="acc_s_BankName"
                name="acc_s_BankName"
                value={this.props.agencyInfo.acc_s_BankName}
                className="input-sm"
                placeholder=""
                onChange={this.props.handleChange}
                onBlur={this.handleBlur}
                required
              />
            </td>
            <td colSpan="2" className="font-weight-bold text-right">Routing No</td>
            <td>
              <Input
                type="text"
                id="acc_s_RoutingNO"
                name="acc_s_RoutingNO"
                value={this.props.agencyInfo.acc_s_RoutingNO}
                className="input-sm"
                placeholder=""
                onChange={this.props.handleChange}
                onBlur={this.handleBlur}
                required
              />
            </td>
          </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default AgencyDetail;
