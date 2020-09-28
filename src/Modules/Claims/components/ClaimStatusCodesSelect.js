import React from 'react';
import { Input } from 'reactstrap';

export const ClaimStatusCodesSelect = props => (
    <Input onChange={props.onChange} value={props.value} type="select" name="Claim_Status_Code">
        <option value="">Select...</option>
        <option value="Open">Open</option>
        <option value="Close">Close</option>
        <option value="Re-Open">Re-Open</option>
    </Input>
)
