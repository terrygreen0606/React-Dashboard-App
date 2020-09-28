import React, { Component } from "react";
import { Row } from "reactstrap";

// Actions
import { toastAction } from "../../store/actions/toast-actions";

// Utilities
import {
  matchRole,
  matchCards,
  NEWCLAIM,
  CUSTOMER,
  ACCOUNTING,
  UNDERWRITING,
  LEGAL,
  matchUrl,
  checkAdmin,
} from "../../utilities/dashboard";

// Services
import { DashboardService } from "../../services/dashboard/dashboardService";

// Components
import CardChart from "./components/CardChart";
import MetricsCard from "./components/MetricsCard";
import Metrics from "./components/Metrics";
import QualityHistory from "./components/QualityHistory";
import PolicyExpenses from "./components/PolicyExpenses";
import Litigation from "./components/Litigation";
import Recorder from "./components/Recorder";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.apiService = new DashboardService();

    this.state = {
      loading: true,
      roleTemplate: 1,
      mainCards: [],
      callData: [],
      metrics: [],
      recorderData: [],
      customerMetrics: [],
      history: [],
      historyData: [],
      notifications: [],
      processed: [],
      methodTransactions: [],
      statusTransactions: [],
      litigationHealths: [],
      generalLegal: [],
    };
  }

  componentDidMount() {
    // Get the loggedin user's role
    let role = matchRole(
      JSON.parse(sessionStorage.getItem("user")).AccessRights.SubLevelName
    );

    // If the path includes customerDashboard, accountingDashboard, legalDashboard...
    if (!this.props.location.pathname.endsWith("/dashboard")) {
      // If admin, get other role's url and roleTemplate number, else redirect to /dashboard
      if (checkAdmin(role.role)) {
        role = matchUrl(this.props.location.pathname.split("/")[2]);
      } else {
        this.props.history.push("/dashboard");
      }
    }

    this.fetchData(role.url, role.roleTemplate);
  }

  componentDidUpdate(prevProps) {
    // If the path changes
    if (this.props.location.pathname !== prevProps.location.pathname) {
      // Get the loggedin user's role
      let role = matchRole(
        JSON.parse(sessionStorage.getItem("user")).AccessRights.SubLevelName
      );

      // If admin, get other role's url and roleTemplate number, else redirect to /dashboard
      if (checkAdmin(role.role)) {
        role = matchUrl(this.props.location.pathname.split("/")[2]);
      } else {
        this.props.history.push("/dashboard");
      }

      this.fetchData(role.url, role.roleTemplate);
    }
  }

  fetchData = async (url, roleTemplate) => {
    this.setState((prev) => ({ ...prev, loading: true }));

    try {
      const response = await this.apiService.fetchAll(url);

      // Set states according to logged in user's role
      const data =
        roleTemplate === NEWCLAIM.roleTemplate
          ? {
              recorderData: response.claimsHealth,
              mainCards: matchCards(roleTemplate).map((card) => ({
                ...card,
                data: response[card.key],
              })),
              metrics: response.closure,
              callData: response.call,
            }
          : roleTemplate === CUSTOMER.roleTemplate
          ? {
              mainCards: matchCards(roleTemplate).map((card) => ({
                ...card,
                value: response[card.key],
              })),
              metrics: response.pending,
              histories: response.histories,
              historyData: response.historyData,
              notifications: response.notifications,
            }
          : roleTemplate === ACCOUNTING.roleTemplate
          ? {
              mainCards: matchCards(roleTemplate).map((card) => ({
                ...card,
                value: response[card.key],
              })),
              metrics: response.pending,
              processed: response.processed,
              methodTransactions: response.methodTransactions,
              statusTransactions: response.statusTransactions,
            }
          : roleTemplate === UNDERWRITING.roleTemplate
          ? {
              recorderData: response.recorderData,
              mainCards: matchCards(roleTemplate).map((card) => ({
                ...card,
                data: response[card.key],
              })),
              metrics: response.pending,
            }
          : roleTemplate === LEGAL.roleTemplate
          ? {
              mainCards: matchCards(roleTemplate).map((card) => ({
                ...card,
                data: response[card.key],
              })),
              metrics: response.closure,
              litigationHealths: response.litigation,
              generalLegal: response.generalLegal,
            }
          : {};

      this.setState((prev) => ({
        ...prev,
        ...data,
        roleTemplate,
        loading: false,
      }));
    } catch (error) {
      toastAction(false, error.message);
    }
  };

  renderingStuff = (roleTemplate) => {
    const claims = (
      <>
        <Row className="mt-3">
          {this.state.mainCards.map((card) => (
            <CardChart key={card.id} card={card} />
          ))}
        </Row>
        <Row>
          <Metrics
            title="Closures"
            data={this.state.metrics}
            roleTemplate={NEWCLAIM.roleTemplate}
          />
        </Row>
        <Row>
          <Recorder
            data={this.state.recorderData}
            callData={this.state.callData}
            identifier={1}
          />
        </Row>
      </>
    );

    const customer = (
      <>
        <Row className="mt-3">
          {this.state.mainCards.map((card, i) => (
            <MetricsCard key={i} card={card} />
          ))}
        </Row>
        <Row>
          <Metrics
            title="My Metrics"
            data={this.state.metrics}
            roleTemplate={CUSTOMER.roleTemplate}
          />
        </Row>
        <Row>
          <QualityHistory
            history={this.state.history}
            historyData={this.state.historyData}
            notifications={this.state.notifications}
          />
        </Row>
      </>
    );

    const accounting = (
      <>
        <Row className="mt-3">
          {this.state.mainCards.map((card, i) => (
            <MetricsCard key={i} card={card} />
          ))}
        </Row>
        <Row>
          <Metrics
            title="Claim Payments"
            data={this.state.metrics}
            roleTemplate={ACCOUNTING.roleTemplate}
          />
        </Row>
        <Row>
          <PolicyExpenses
            processed={this.state.processed}
            methodTransactions={this.state.methodTransactions}
            statusTransactions={this.state.statusTransactions}
          />
        </Row>
      </>
    );

    const underwriting = (
      <>
        <Row className="mt-3">
          {this.state.mainCards.map((card) => (
            <CardChart key={card.id} card={card} />
          ))}
        </Row>
        <Row>
          <Metrics
            title="Issued Transactions"
            data={this.state.metrics}
            roleTemplate={UNDERWRITING.roleTemplate}
          />
        </Row>
        <Row>
          <Recorder
            data={this.state.recorderData}
            callData={this.state.callData}
            identifier={2}
          />
        </Row>
      </>
    );

    const legal = (
      <>
        <Row className="mt-3">
          {this.state.mainCards.map((card) => (
            <CardChart key={card.id} card={card} />
          ))}
        </Row>
        <Row>
          <Metrics
            title="Closures"
            data={this.state.metrics}
            roleTemplate={LEGAL.roleTemplate}
          />
        </Row>
        <Row>
          <Litigation
            litigationHealths={this.state.litigationHealths}
            generalLegal={this.state.generalLegal}
          />
        </Row>
      </>
    );
    switch (roleTemplate) {
      case NEWCLAIM.roleTemplate:
        return claims;
      case CUSTOMER.roleTemplate:
        return customer;
      case ACCOUNTING.roleTemplate:
        return accounting;
      case UNDERWRITING.roleTemplate:
        return underwriting;
      case LEGAL.roleTemplate:
        return legal;
      default:
        return claims;
    }
  };

  render() {
    const loading = (
      <div className="animated fadeIn">
        <div className="sk-spinner sk-spinner-pulse"></div>
      </div>
    );
    return this.state.loading ? (
      loading
    ) : (
      <div className="animated fadeIn">
        {this.renderingStuff(this.state.roleTemplate)}
      </div>
    );
  }
}

export default Dashboard;
