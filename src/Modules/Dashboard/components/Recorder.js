import React from "react";
import { Col, Card, CardHeader, CardBody, Row, Progress } from "reactstrap";

import DataTablePagination from "./DataTablePagination";

const Recorder = ({ data, callData, identifier }) => {
  // Calculate Total Amount of Each Item
  const statistics = callData.reduce((total, current) => ({
    answered: total.answered + current.answered,
    missed: total.missed + current.missed,
    voiceMails: total.voiceMails + current.voiceMails,
    outBoundCalls: total.outBoundCalls + current.outBoundCalls,
  }));

  // Calculate Percentage of Each Day in a Week
  const arranged = callData.map((call) => {
    const total = call.answered + call.missed;
    const answeredPercent = total ? (call.answered / total) * 100 : 0;
    const missedPercent = total ? 100 - answeredPercent : 0;
    return { ...call, answeredPercent, missedPercent };
  });

  return (
    <Col>
      <Card>
        <CardHeader>Call Data Recorder</CardHeader>
        <CardBody>
          <Row>
            <Col xs="12" md="6" xl="6">
              <Row>
                <Col sm="6">
                  <div className="callout callout-info">
                    <small className="text-muted">Answered</small>
                    <br />
                    <strong className="h4">{statistics.answered}</strong>
                  </div>
                </Col>
                <Col sm="6">
                  <div className="callout callout-danger">
                    <small className="text-muted">Missed</small>
                    <br />
                    <strong className="h4">{statistics.missed}</strong>
                  </div>
                </Col>
              </Row>
              <hr className="mt-0" />
              {arranged.map((call, i) => (
                <div className="progress-group mb-4" key={i}>
                  <div className="progress-group-prepend">
                    <span className="progress-group-text">{call.date}</span>
                  </div>
                  <div className="progress-group-bars">
                    <Progress
                      className="progress-xs"
                      color="info"
                      value={call.answeredPercent}
                    />
                    <Progress
                      className="progress-xs"
                      color="danger"
                      value={call.missedPercent}
                    />
                  </div>
                </div>
              ))}
            </Col>
            <Col xs="12" md="6" xl="6">
              <Row>
                <Col sm="6">
                  <div className="callout callout-warning">
                    <small className="text-muted">Voicemails</small>
                    <br />
                    <strong className="h4">{statistics.voiceMails}</strong>
                  </div>
                </Col>
                <Col sm="6">
                  <div className="callout callout-success">
                    <small className="text-muted">Outbound Calls</small>
                    <br />
                    <strong className="h4">{statistics.outBoundCalls}</strong>
                  </div>
                </Col>
              </Row>
              <hr className="mt-0" />
              {/* <ul>
                {callData.voicemails.map((voicemail, i) => (
                  <div className="progress-group" key={i}>
                    <div className="progress-group-header">
                      <span className="title">{voicemail.type}</span>
                      <span className="ml-auto font-weight-bold">
                        {voicemail.value}%
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress
                        className="progress-xs"
                        color="warning"
                        value={voicemail.value}
                      />
                    </div>
                  </div>
                ))}
                <br className="mb-5" />
                {callData.outbounds.map((outbound, i) => (
                  <div className="progress-group" key={i}>
                    <div className="progress-group-header">
                      <span className="title">{outbound.type}</span>
                      <span className="ml-auto font-weight-bold">
                        {outbound.value}
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <Progress
                        className="progress-xs"
                        color="success"
                        value={outbound.percent}
                      />
                    </div>
                  </div>
                ))}
              </ul> */}
            </Col>
          </Row>
        </CardBody>
      </Card>

      <DataTablePagination data={data} identifier={identifier} />
    </Col>
  );
};

export default Recorder;
