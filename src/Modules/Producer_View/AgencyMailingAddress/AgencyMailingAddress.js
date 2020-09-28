import React, { Component } from 'react';
import {
  Col,
  Input,
  Label,
  InputGroup} from 'reactstrap';

class AgencyMailingAddress extends Component {
  render() {
    return (
      <div className="animated fadeIn d-flex">
        <span className="h5 pr-1" style={{width: '160px'}}>Mailing Address</span>
        <span className="font-weight-bold pr-3">
          <Input
            bsSize="sm"
            type="text"
            id="mail_s_AddressLine1"
            name="mail_s_AddressLine1"
            className="input-sm"
            placeholder=""
            value={this.props.agencyInfo.mail_s_AddressLine1}
            onChange={this.props.handleChange}
            onBlur={this.handleBlur}
            required
          />
        </span>
        <span className="pr-3" style={{flex:1}}>
          <InputGroup>
            <Col md="3">
              <Label size="sm" htmlFor="mail_s_PostalCode">Zip</Label>
            </Col>
            <Col xs="12" md="9">
              <Input
                bsSize="sm"
                type="text"
                id="mail_s_PostalCode"
                name="mail_s_PostalCode"
                className="input-sm"
                placeholder=""
                value={this.props.agencyInfo.mail_s_PostalCode}
                onChange={this.props.handleChange}
                onBlur={ (e) => this.props.getCityInfo(e, 'mail')}
                required
              />
            </Col>
          </InputGroup>
        </span>
        <span className="pr-3" style={{flex:1}}>
          <InputGroup>
            <Col md="3">
              <Label size="sm" htmlFor="mail_s_CityName">City</Label>
            </Col>
            <Col xs="12" md="9">
              <Input
                bsSize="sm"
                type="text"
                id="mail_s_CityName"
                name="mail_s_CityName"
                className="input-sm"
                placeholder=""
                value={this.props.agencyInfo.mail_s_CityName}
                onChange={this.props.handleChange}
                onBlur={this.handleBlur}
                required
                readOnly
              />
            </Col>
          </InputGroup>
        </span>
        <span className="pr-3" style={{flex:1}}>
          <InputGroup>
            <Col md="3">
              <Label size="sm" htmlFor="mail_s_StateName">State</Label>
            </Col>
            <Col xs="12" md="9">
              <Input
                bsSize="sm"
                type="text"
                id="s_Stamail_s_StateNameteName"
                name="mail_s_StateName"
                className="input-sm"
                placeholder=""
                value={this.props.agencyInfo.mail_s_StateName}
                onChange={this.props.handleChange}
                onBlur={this.handleBlur}
                required
                readOnly
              />
            </Col>
          </InputGroup>
        </span>
        <span className="pr-3" style={{flex:1}}>
          <InputGroup>
            <Col md="3">
              <Label size="sm" htmlFor="mail_s_CountyName">County</Label>
            </Col>
            <Col xs="12" md="9">
              <Input
                bsSize="sm"
                type="text"
                id="mail_s_CountyName"
                name="mail_s_CountyName"
                className="input-sm"
                placeholder=""
                value={this.props.agencyInfo.mail_s_CountyName}
                onChange={this.props.handleChange}
                onBlur={this.handleBlur}
                required
                readOnly
              />
            </Col>
          </InputGroup>
        </span>
      </div>
    );
  }
}

export default AgencyMailingAddress;
