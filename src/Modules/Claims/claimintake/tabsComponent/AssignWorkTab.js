import React from 'react';
import {Button, Table, Card, CardHeader} from 'reactstrap';

const AssignWorkTab = () => {
  return (
    <>
      <Card>
        <CardHeader className="rounded">
          Estimation Details
          <Button size="sm" color="primary" className="float-right">Add</Button>
        </CardHeader>
        <Table size="sm" bordered striped responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>INFORMATION1</th>
              <th>INFORMATION2</th>
              <th>INFORMATION3</th>
              <th>QUANTITY</th>
              <th>CRAFT</th>
              <th>HOURS</th>
              <th>UNIT</th>
              <th>MATERIAL</th>
              <th>LABOR</th>
              <th>EQUIPMENT</th>
              <th>TOTAL</th>
              <th>ACTION</th>
              <th>ASSIGNED USER</th>
            </tr>
          </thead>
        </Table>
      </Card>
    </>
  );
}

export default AssignWorkTab;