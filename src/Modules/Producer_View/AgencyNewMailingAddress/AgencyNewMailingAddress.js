import React, { Component } from 'react';
import {Input, Label, InputGroup} from 'reactstrap';

class AgencyMailingAddress extends Component {
  render() {
    return (
      <div className="animated fadeIn d-flex">
        <span className="h5 pr-1" style={{width: '160px'}}>Mailing Address</span>
        <span className="font-weight-bold pr-3">
          <Input size="sm" type="text" name="mail_s_AddressLine1" id="mail_s_AddressLine1" />
        </span>
        <span className="pr-3" style={{flex:1}}>
          <InputGroup>
            <Label for="mail_s_PostalCode" className="pr-1">Zip Code:</Label>
            <Input size="sm" name="mail_s_PostalCode" id="mail_s_PostalCode"/>
          </InputGroup>
        </span>
        <span className="pr-3" style={{flex:1}}>
          <InputGroup>
            <Label for="mail_s_CityName" className="pr-1">City:</Label>
            <Input size="sm" name="mail_s_CityName" id="mail_s_CityName" className="gray-input"/>
          </InputGroup>
        </span>
        <span className="pr-3" style={{flex:1}}>
          <InputGroup>
            <Label for="mail_s_StateName" className="pr-1">State:</Label>
            <Input size="sm" name="mail_s_StateName" id="mail_s_StateName" className="gray-input"/>
          </InputGroup>
        </span>
        <span className="pr-3" style={{flex:1}}>
          <InputGroup>
            <Label for="mail_s_CountyName" className="pr-1">County:</Label>
            <Input size="sm" name="mail_s_CountyName" id="mail_s_CountyName" className="gray-input"/>
          </InputGroup>
        </span>
      </div>
    );
  }
}

export default AgencyMailingAddress;
