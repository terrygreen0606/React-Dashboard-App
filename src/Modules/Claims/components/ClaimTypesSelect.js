import React, {useState, useEffect} from 'react';
import { useHttp } from '../../../services/claimService';
import { Input } from 'reactstrap';

export const ClaimTypesSelect = props => {

  const [claimTypes, setClaimTypes] = useState([]);
  
  const [isLoadingClaimTypes, fetchedClaimTypes] = useHttp(process.env.REACT_APP_API_URL+'/api/v1/claim_types');

  useEffect(() => {
    if (!isLoadingClaimTypes && fetchedClaimTypes && fetchedClaimTypes.data) {
      setClaimTypes(fetchedClaimTypes.data);
    }
  },[isLoadingClaimTypes, fetchedClaimTypes]);
  return (
    <Input onChange={props.onChange} value={props.value} multiple={props.multiple} name="ClaimTypeId_FK" type="select">
      { !props.multiple ? <option value="">Select...</option> : null }
      {
        !isLoadingClaimTypes && fetchedClaimTypes && fetchedClaimTypes.data ?
          claimTypes.map( ct =>
            <option key={ct.ClaimTypeId_PK} value={ct.ClaimTypeId_PK}>{ct.Description}</option>
          )
        :
          props.initOptions ? props.initOptions.map( ct =>
            <option key={ct.ClaimTypeId_PK} value={ct.ClaimTypeId_PK}>{ct.Description}</option>
          ) : null
      }
    </Input>
)}
