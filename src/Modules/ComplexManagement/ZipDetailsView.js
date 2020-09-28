import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  Table
} from 'reactstrap';

const ZipDetailsView = props => {
  var tableBody = props.zipData.map((data, i)=>{
    console.log(data);
    return (
      <tr key={i}>
        <td><a href='#' onClick={(e)=>{e.preventDefault(); props.setZipDetailsData(data)}}>{data.s_CityName}</a></td>
        <td>{data.s_ZipCounty}</td>
      </tr>
    )
  })

  return (
    <React.Fragment>
      <Table className="p-0 m-0" size="sm" responsive striped>
        <thead>
          <tr>
            <th>City</th>
            <th>County</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </Table>
    </React.Fragment>
  );
}


export default ZipDetailsView;