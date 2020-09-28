import React from "react";
import { Col, Card, CardBody } from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";

// Line Chart
const chartDataOpt = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent",
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent",
        },
      },
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          // maxTicksLimit: 3,
          // min: Math.min.apply(Math, chartData.datasets[0].data) - 5,
          // max: Math.max.apply(Math, chartData.datasets[0].data) + 5,
        },
      },
    ],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Bar Chart
const barChartOpt = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
    yAxes: [
      {
        display: false,
        // ticks: {
        //   maxTicksLimit: 3,
        // },
      },
    ],
  },
};

const CardChart = ({ card }) => {
  const labels = [];
  const datasets = [];

  if (card.data) {
    // If performance score chart
    if (card.id === 1) {
      labels.push(...card.data.department.map((item) => item.date));
      datasets.push(
        {
          label: "Overall",
          backgroundColor: "transparent",
          borderColor: "rgba(255,255,255,.55)",
          data: card.data.department.map((item) =>
            parseFloat(item.value).toFixed(2)
          ),
        },
        {
          label: "User Dependent",
          backgroundColor: "transparent",
          borderColor: "rgba(37,44,45,.3)",
          data: card.data.user.map((item) => parseFloat(item.value).toFixed(2)),
        }
      );
      // datasets.push({
      //   label: card.title,
      //   backgroundColor: "transparent",
      //   borderColor: "rgba(255,255,255,.55)",
      //   data: card.data.map((item) => item.value.toFixed(2)),
      // });
    } else {
      labels.push(...card.data.map((item) => item.date));
      datasets.push({
        label: card.title,
        backgroundColor: card.id === 4 ? "rgba(255,255,255,.3)" : "transparent",
        borderColor: card.id === 4 ? "transparent" : "rgba(255,255,255,.55)",
        data: card.data.map((item) => parseFloat(item.value).toFixed(2)),
        barPercentage: 0.6,
      });
    }
  }

  return (
    <Col xs="12" sm="6" lg="3">
      <Card className={`text-white bg-${card.color}`}>
        <CardBody className="pb-0">
          <div>{card.title}</div>
          <div className="chart-wrapper mt-3" style={{ height: "120px" }}>
            <card.component
              data={{ labels, datasets }}
              options={card.id === 4 ? barChartOpt : chartDataOpt}
              height={120}
            />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CardChart;
