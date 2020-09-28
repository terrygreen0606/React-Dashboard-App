import React from "react";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import DataTablePagination from "./DataTablePagination";

const PolicyExpenses = ({
  processed,
  methodTransactions,
  statusTransactions,
}) => {
  const processes = [
    {
      title: "Processed Credit Card Premiums",
      key: "credit",
      color: "callout-info",
    },
    {
      title: "Processed Direct Deposit Premiums",
      key: "direct",
      color: "callout-danger",
    },
    {
      title: "Processed Check Premiums",
      key: "check",
      color: "callout-warning",
    },
    {
      title: "Collected Deductible Transactions",
      key: "deductible",
      color: "callout-success",
    },
  ].map((process) => ({ ...process, value: processed[process.key] }));

  return (
    <Col>
      <Card>
        <CardHeader>Policy Holder Expenses</CardHeader>
        <CardBody>
          <Row>
            {processes.map((process, i) => (
              <Col xs="12" md="6" xl="3" key={i}>
                <div className={"callout " + process.color}>
                  <small className="text-muted">{process.title}</small>
                  <br />
                  <strong className="h4">{process.value}</strong>
                </div>
              </Col>
            ))}
          </Row>
          <br />

          <DataTablePagination data={methodTransactions} identifier={4} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>Underwriting Transactions</CardHeader>
        <CardBody>
          <DataTablePagination data={statusTransactions} identifier={4} />
        </CardBody>
      </Card>
    </Col>
  );
};

export default PolicyExpenses;
