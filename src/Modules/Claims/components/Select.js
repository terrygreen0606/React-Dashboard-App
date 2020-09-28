 import React from 'react';
import { Input } from 'reactstrap';

export const Select = ({value, onChange, options, multiple, required, name, noEmpty}) => (
    <Input onChange={onChange} value={value} type="select" multiple={multiple} required={required} name={name}>
        { !multiple && !noEmpty ? <option value="">Select...</option> : null }
        { Object.keys(options).map(key => 
            <option key={key} value={key}>{options[key]}</option>
        )}
    </Input>
)
