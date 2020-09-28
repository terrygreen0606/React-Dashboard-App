import React, {useState, useEffect} from 'react';
import { useHttp } from '../../../services/claimService';
import { Input } from 'reactstrap';

export const UsersSelect = props => {

  const [users, setUsers] = useState([]);
  
  const [isLoadingUsers, fetchedUsers] = useHttp(process.env.REACT_APP_API_URL+'/api/v1/usersWithRole/'+props.roleType);

  useEffect(() => {
    if (!isLoadingUsers && fetchedUsers && fetchedUsers.data) {
      setUsers(fetchedUsers.data);
    }
  },[isLoadingUsers, fetchedUsers]);

  return (
    <Input onChange={(e)=>props.onChange(users.find(u=>u.Admin_ID==e.target.value))} value={props.value} name={props.name} type="select">
    <option value="">Select...</option>
    {
      !isLoadingUsers && fetchedUsers && fetchedUsers.data ?
        ( users.map( u => <option key={u.Admin_ID} value={u.Admin_ID}>{u.s_ScreenName}</option> )) : 
        props.initOptions ? (props.initOptions.map( u => <option key={u.Admin_ID} value={u.Admin_ID}>{u.s_ScreenName}</option> )) : null
    }
  </Input>
)}
