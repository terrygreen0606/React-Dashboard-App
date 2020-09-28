import React from "react";
import { Col, Card, CardBody } from "reactstrap";

const MetricsCard = ({ card }) => {
  return (
    <Col xs="12" sm="6" lg="3">
      <Card className={`text-white bg-${card.color} text-center`}>
        <CardBody>
          <blockquote className="card-bodyquote">
            <p>{card.title}</p>
            <footer>{card.value}</footer>
          </blockquote>
        </CardBody>
      </Card>
    </Col>
  );
};

export default MetricsCard;
