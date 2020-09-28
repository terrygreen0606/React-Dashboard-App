import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Progress,
  Button,
  ButtonToolbar,
  ButtonGroup,
  CardFooter,
} from "reactstrap";
import { Line } from "react-chartjs-2";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import {
  getStyle,
  hexToRgba,
} from "@coreui/coreui-pro/dist/js/coreui-utilities";

import DataTablePagination from "./DataTablePagination";
import { ACCOUNTING, matchMetrics } from "../../../utilities/dashboard";
import { DashboardService } from "../../../services/dashboard/dashboardService";
import { toastAction } from "../../../store/actions/toast-actions";

const Metrics = ({ title, data, roleTemplate }) => {
  const metrics = matchMetrics(roleTemplate);
  // Rearrange closures for period
  const metricTypes = metrics.types.map((type) => ({
    title: type.title,
    value: data.type[type.key],
    color: type.color,
  }));

  // States
  const [radio, setRadio] = useState(7);
  const [refetching, setRefetching] = useState(false);
  const [updatedData, setUpdatedData] = useState(data);
  const apiService = new DashboardService();

  // Loading Template
  const loading = (
    <div className="animated fadeIn">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  );

  // Main Chart
  const brandInfo = getStyle("--info");

  const mainChart = {
    labels: updatedData.graph.map((item) => item.date),
    datasets: [
      {
        label: "Closure",
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: "#fff",
        borderWidth: 2,
        data: updatedData.graph.map((item) => item.value),
      },
    ],
  };

  const mainChartOpts = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: "index",
      position: "nearest",
      callbacks: {
        labelColor: function (tooltipItem, chart) {
          return {
            backgroundColor:
              chart.data.datasets[tooltipItem.datasetIndex].borderColor,
          };
        },
      },
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            stepSize: Math.ceil(250 / 5),
            max: 250,
          },
        },
      ],
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
  };

  // Funcs
  const refetchMetrics = async (date) => {
    setRadio(date);
    setRefetching(true);
    try {
      const response = await apiService.refetchMetrics(metrics.url, date);
      setUpdatedData(response.closure);
      setRefetching(false);
    } catch (error) {
      toastAction(false, error.message);
    }
  };

  return (
    <Col>
      <Card>
        <CardBody>
          {roleTemplate === ACCOUNTING.roleTemplate ? (
            <DataTablePagination data={data.graph} identifier={3} />
          ) : (
            <>
              <Row>
                <Col sm="5">
                  <CardTitle className="mb-0">{title}</CardTitle>
                </Col>
                <Col sm="7" className="d-none d-sm-inline-block">
                  {/* <Button color="primary" className="float-right">
                <i className="icon-cloud-download"></i>
              </Button> */}
                  <ButtonToolbar
                    className="float-right"
                    aria-label="Toolbar with button groups"
                  >
                    <ButtonGroup className="mr-3" aria-label="First group">
                      <Button
                        color="outline-secondary"
                        onClick={() => refetchMetrics(7)}
                        active={radio === 7}
                      >
                        Day
                      </Button>
                      <Button
                        color="outline-secondary"
                        onClick={() => refetchMetrics(30)}
                        active={radio === 30}
                      >
                        Month
                      </Button>
                      <Button
                        color="outline-secondary"
                        onClick={() => refetchMetrics(365)}
                        active={radio === 365}
                      >
                        Year
                      </Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                </Col>
              </Row>
              <div
                className="chart-wrapper"
                style={{ height: 300 + "px", marginTop: 40 + "px" }}
              >
                {refetching ? (
                  loading
                ) : (
                  <Line data={mainChart} options={mainChartOpts} height={300} />
                )}
              </div>
            </>
          )}
        </CardBody>
        <CardFooter>
          <Row className="text-center">
            {metricTypes.map((metricType, i) => (
              <Col sm={12} md className="mb-sm-2 mb-0" key={i}>
                <div className="text-muted">{metricType.title}</div>
                <strong>{metricType.value}</strong>
                {/* <Progress
                  className="progress-xs mt-2"
                  color={metricType.color}
                  value={metricType.percent}
                /> */}
              </Col>
            ))}
          </Row>
        </CardFooter>
      </Card>
    </Col>
  );
};

export default Metrics;
