import React, { Component } from 'react';

import {Input, InputGroup, Label, Col, CustomInput} from "reactstrap";

import { AppSwitch } from '@coreui/react';

class AgencyLocationAddress extends Component {
  render() {
    return (
      <>
        <div className="animated fadeIn d-flex">
          <AppSwitch
            size="sm"
            className={'mx-1'}
            variant={'pill'}
            color={'primary'}
            onChange={(e) => this.props.handleCopyLocFromMail(e.target.checked) }
          />
          <span> Copy as mailing Address</span>
        </div>
        <div className="animated fadeIn d-flex">
          <span className="h5 pr-1" style={{width: '160px'}}>Location Address</span>
          <span className="font-weight-bold pr-3">
            <Input
              bsSize="sm"
              type="text"
              id="loc_s_AddressLine1"
              name="loc_s_AddressLine1"
              className="input-sm"
              placeholder=""
              value={this.props.agencyInfo.loc_s_AddressLine1}
              onChange={this.props.handleChange}
              onBlur={this.handleBlur}
              required
            />
          </span>
          <span className="pr-3" style={{flex:1}}>
            <InputGroup>
              <Col md="3">
                <Label size="sm" htmlFor="loc_s_PostalCode">Zip</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  bsSize="sm"
                  type="text"
                  id="loc_s_PostalCode"
                  name="loc_s_PostalCode"
                  className="input-sm"
                  placeholder=""
                  value={this.props.agencyInfo.loc_s_PostalCode}
                  onChange={this.props.handleChange}
                  onBlur={ (e) => this.props.getCityInfo(e, 'location')}
                  required
                />
              </Col>
            </InputGroup>
          </span>
          <span className="pr-3" style={{flex:1}}>
            <InputGroup>
              <Col md="3">
                <Label size="sm" htmlFor="loc_s_CityName">City</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  bsSize="sm"
                  type="text"
                  id="loc_s_CityName"
                  name="loc_s_CityName"
                  className="input-sm"
                  placeholder=""
                  value={this.props.agencyInfo.loc_s_CityName}
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
                <Label size="sm" htmlFor="loc_s_StateName">State</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  bsSize="sm"
                  type="text"
                  id="loc_s_StateName"
                  name="loc_s_StateName"
                  className="input-sm"
                  placeholder=""
                  value={this.props.agencyInfo.loc_s_StateName}
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
                <Label size="sm" htmlFor="loc_s_CountyName">County</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  bsSize="sm"
                  type="text"
                  id="loc_s_CountyName"
                  name="loc_s_CountyName"
                  className="input-sm"
                  placeholder=""
                  value={this.props.agencyInfo.loc_s_CountyName}
                  onChange={this.props.handleChange}
                  onBlur={this.handleBlur}
                  required
                  readOnly
                />
              </Col>
            </InputGroup>
          </span>
        </div>
      </>
    );
  }
}

export default AgencyLocationAddress;
