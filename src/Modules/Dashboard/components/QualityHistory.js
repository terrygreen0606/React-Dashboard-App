import React from "react";
import { Row, Col, Card, CardHeader, CardBody, Alert } from "reactstrap";

import DataTablePagination from "./DataTablePagination";

const QualityHistory = ({ history, historyData, notifications }) => {
  const histories = [
    { title: "This Week", key: "thisWeek", color: "callout-info" },
    { title: "Last Week", key: "lastWeek", color: "callout-danger" },
    { title: "This Month", key: "thisMonth", color: "callout-warning" },
    { title: "This Quarter", key: "thisQuarter", color: "callout-success" },
  ].map((el) => ({ ...el, value: history[el.key] }));

  return (
    <Col>
      <Card>
        <CardHeader>Quality History</CardHeader>
        <CardBody>
          <Row>
            {histories.map((history, i) => (
              <Col xs="12" md="6" xl="3" key={i}>
                <div className={"callout " + history.color}>
                  <small className="text-muted">{history.title}</small>
                  <br />
                  <strong className="h4">{history.value}</strong>
                </div>
              </Col>
            ))}
          </Row>
          <br />

          <DataTablePagination data={historyData} identifier={7} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>Notifications</CardHeader>
        <CardBody>
          <Row>
            {notifications.map((notification, i) => (
              <Col xs="12" md="6" xl="4" key={i}>
                <Alert color="success">{notification}</Alert>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default QualityHistory;
