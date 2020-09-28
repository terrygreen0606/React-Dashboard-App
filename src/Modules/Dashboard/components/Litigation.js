import React from "react";
import { Col, Card, CardHeader, CardBody } from "reactstrap";

import DataTablePagination from "./DataTablePagination";

const Litigation = ({ litigationHealths, generalLegal }) => {
  return (
    <Col>
      <Card>
        <CardHeader>Litigation Health</CardHeader>
        <CardBody>
          <DataTablePagination data={litigationHealths} identifier={5} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader>General Legal Files</CardHeader>
        <CardBody>
          <DataTablePagination data={generalLegal} identifier={6} />
        </CardBody>
      </Card>
    </Col>
  );
};

export default Litigation;
