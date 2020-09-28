import React, { Component } from 'react';

import { Input, InputGroup, Label } from "reactstrap";

import { AppSwitch } from '@coreui/react';

class AgencyNewLocationAddress extends Component {
  render() {
    return (
      <div className="animated fadeIn d-flex">
        <span className="h5 pr-1" style={{width: '160px'}}>Location Address</span>
        <span className="font-weight-bold pr-3">
          <Input size="sm" type="text" name="loc_s_AddressLine1" id="loc_s_AddressLine1" />
        </span>
        <span className="pr-3" style={{flex:1}}>
          <InputGroup>
            <Label for="loc_s_PostalCode" className="pr-1">Zip Code:</Label>
            <Input size="sm" name="loc_s_PostalCode" id="loc_s_PostalCode"/>
          </InputGroup>
        </span>
        <span className="pr-3" style={{flex:1}}>
          <InputGroup>
            <Label for="loc_s_CityName" className="pr-1">City:</Label>
            <Input size="sm" name="loc_s_CityName" id="loc_s_CityName" className="gray-input"/>
          </InputGroup>
        </span>
        <span className="pr-3" style={{flex:1}}>
          <InputGroup>
            <Label for="loc_s_StateName" className="pr-1">State:</Label>
            <Input size="sm" name="loc_s_StateName" id="loc_s_StateName" className="gray-input"/>
          </InputGroup>
        </span>
        <span className="pr-3" style={{flex:1}}>
          <InputGroup>
            <Label for="loc_s_CountyName" className="pr-1">County:</Label>
            <Input size="sm" name="loc_s_CountyName" id="loc_s_CountyName" className="gray-input"/>
          </InputGroup>
        </span>
      </div>
    );
  }
}

export default AgencyNewLocationAddress;
