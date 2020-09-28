import React, { useState, useEffect } from 'react';

import {
    Col,Row,Input,FormGroup,Label
  } from 'reactstrap';

const PropertyZone = props => {
    var isChecked = {}
    isChecked['checked'] = true;
    
    return (
        <React.Fragment>
            <Label htmlFor="name" className="mb-0">Please Select Note</Label>
            {
                props.zoneData != null ?
                props.zoneData.map((data, i)=>{
                    if(props.selectedPropZone != ''){
                        isChecked['checked'] = false;
                        if(props.selectedPropZone == data.s_Territory){
                            isChecked['checked'] = true;
                        }
                    }
                    return (
                        <li key={i} className="ml-4">
                            <FormGroup check inline>
                                <Input type="radio" name="Propertyzone" value={data.s_Territory} {...isChecked} onChange={(e)=>{}} disabled={props.disabled}/>&nbsp;&nbsp;{data.s_Notes}
                            </FormGroup>
                        </li>
                    )
                })
                : null
            }
        </React.Fragment>
    );
}

export default PropertyZone;