import React, { useState } from 'react';
import {Input, Button, Table, Card, CardHeader} from 'reactstrap';

const AssoPartyTab = (props) => {
  return (
    <>
      <Card>
        <CardHeader className="rounded">
          Claim Associate Party List
          <Button size="sm" color="primary" className="float-right">Assign Contractor From Map</Button>
          <Button size="sm" color="primary" className="float-right mr-2">Add Row</Button>
        </CardHeader>
        <Table size="sm" striped borderless responsive>
          <thead>
            <tr>
              <th>PARTY TYPE</th>
              <th>PARTY NAME</th>
              <th>ADDRESS</th>
              <th>PHONE</th>
              <th>EMAIL</th>
              <th>ACTIVITY</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>In-House Vendor</td>
              <td>Full Name</td>
              <td>8730 ARROWHEAD DR LAKE WORTH FL 33467</td>
              <td>(111) 111-1111</td>
              <td>a@b.com</td>
              <td>
                <Input type="select" size="sm">
                  <option value="" selected="selected">Select</option>
                  <option value="ASSIGNCONTFORESTM">Assigned to contractor for Estimate</option>
                  <option value="CONTRACTORVISITED">Contractor Visited</option>
                  <option value="WAITINGFOREBSTIMATE">Waiting for Estimate</option>
                  <option value="ASSIGNCONTRACTORWORK">Assigned to contractor for Work</option>
                  <option value="WORKCOMPLETED">Work Completed</option>
                  <option value="VENDORREASSIGN">Vendor to be re-assign</option>
                  <option value="ASSIGNCONTFORINSP">Assigned to contractor for Inspection</option>
                </Input>
              </td>
              <td>
                <a href="#">View/Edit Notes</a>
              </td>
            </tr>
            <tr>
              <td>In-House Vendor</td>
              <td>Full Name</td>
              <td>	439 LYTLE DRIVE 33405</td>
              <td>(111) 111-1111</td>
              <td>a@b.com</td>
              <td>
                <Input type="select" size="sm">
                  <option value="" selected="selected">Select</option>
                  <option value="ASSIGNCONTFORESTM">Assigned to contractor for Estimate</option>
                  <option value="CONTRACTORVISITED">Contractor Visited</option>
                  <option value="WAITINGFOREBSTIMATE">Waiting for Estimate</option>
                  <option value="ASSIGNCONTRACTORWORK">Assigned to contractor for Work</option>
                  <option value="WORKCOMPLETED">Work Completed</option>
                  <option value="VENDORREASSIGN">Vendor to be re-assign</option>
                  <option value="ASSIGNCONTFORINSP">Assigned to contractor for Inspection</option>
                </Input>
              </td>
              <td>
                <a href="#">View/Edit Notes</a>
              </td>
            </tr>
            <tr>
              <td>Claims Manager</td>
              <td>FULL NAME</td>
              <td>1101 E CUMBERLAND AVE TAMPA FL 33602</td>
              <td>(111) 111-1111</td>
              <td>marial@avatarins.com</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </>
  )
}

export default AssoPartyTab;