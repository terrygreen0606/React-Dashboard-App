import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import AuthService from "../../../services";
import * as actions from "../../../store/actions";

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from "@coreui/react";
// sidebar nav config
import navigation from "../../../_nav";
import navigationAdmin from "../../../_navAdmin";
import navigationPolicy from "../../../_navPolicy";
import navigationClient from "../../../_navClient";
import navigationClaim from "../../../_navClaim";
import navigationProducer from "../../../_navProducer";
import navigationAccount from "../../../_navAccoiunting";
import navigationCRM from "../../../_navCRM";
// routes config
import routes from "../../../routes";
// util to check admin user
import { checkAdmin } from "../../../utilities/dashboard";

const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));
const isAuthenticated = true; //{ isAuthenticated } = this.props;

const dashboards = {
  name: "Dashboards",
  icon: "icon-user",
  children: [
    {
      name: "Claim",
      url: "/dashboard/claimDashboard",
      icon: "icon-puzzle",
    },
    {
      name: "Customer",
      url: "/dashboard/customerDashboard",
      icon: "icon-puzzle",
    },
    {
      name: "Accounting",
      url: "/dashboard/accountingDashboard",
      icon: "icon-puzzle",
    },
    {
      name: "Underwriting",
      url: "/dashboard/underwritingDashboard",
      icon: "icon-puzzle",
    },
    {
      name: "Legal",
      url: "/dashboard/legalDashboard",
      icon: "icon-puzzle",
    },
  ],
};
class DefaultLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navigation,
      session: JSON.parse(sessionStorage.getItem("user")),
    };
  }

  componentDidMount() {
    if (
      this.state.session &&
      checkAdmin(this.state.session.AccessRights.SubLevelName) &&
      navigation.items.find((item) => item.name !== "Dashboards")
    ) {
      navigation.items.unshift(dashboards);
      this.setState((prev) => ({
        ...prev,
        navigation,
      }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.session &&
      prevState.session !== this.state.session &&
      checkAdmin(this.state.session.AccessRights.SubLevelName) &&
      navigation.items.find((item) => item.name !== "Dashboards")
    ) {
      navigation.items.unshift(dashboards);
      this.setState((prev) => ({
        ...prev,
        navigation,
      }));
    }
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  );

  signOut(e) {
    e.preventDefault();
    this.props.history.push("/login");
    this.props.dispatch(actions.checkPermissionClear());
    this.props.dispatch(actions.authLogout());
  }
  /*loadNavigation(e) {
    e.preventDefault();
    this.props.history.push("/administration");
    this.props.dispatch(actions.loadLeftNavigation());
  }*/

  removeASidebar() {
    document.body.classList.remove("aside-menu-lg-show");
  }

  render() {
    // If user is already authenticated we redirect to dashboard.
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" replace />;
    }

    //@HP
    let defaultNavigation = (
      <AppSidebarNav navConfig={this.state.navigation} {...this.props} />
    );
    const AdminModuleArray = [
      "administration",
      "UserProfile",
      "territory",
      "createTerritory",
      "rule",
      "rule:id",
      "createRule",
      "ruleGroup",
      "createRuleGroup",
    ];
    const PolModuleArray = ["quoteEntry", "policy", "ComplexManagementView"];
    const ClientModuleArray = ["/searchClient", "/addClient"];
    const ClaimModuleArray = [
      "claims",
      "claimintake",
      "claimview",
      "claimsearch",
    ];
    const ProducerModuleArray = ["/producer", "/producer_view"];
    const AccountModuleArray = [
      "/AccountDashboard",
      "/batchTransEntry",
      "/generateCommission",
      "/manage-account-type",
      "/manage-account",
      "/manage-vendor",
      "/banking-center",
      "/investments-security",
      "/lockBoxImportBOA",
      "/ClaimInvoice",
      "/addActionAccounting",
      "/defineRuleAccounting",
    ];

    if (AdminModuleArray.includes(this.props.location.pathname.split("/")[1])) {
      defaultNavigation = (
        <AppSidebarNav navConfig={navigationAdmin} {...this.props} />
      );
    }
    if (PolModuleArray.includes(this.props.location.pathname.split("/")[1])) {
      defaultNavigation = (
        <AppSidebarNav navConfig={navigationPolicy} {...this.props} />
      );
    }
    if (ClientModuleArray.includes(this.props.location.pathname)) {
      defaultNavigation = (
        <AppSidebarNav navConfig={navigationClient} {...this.props} />
      );
    }
    if (ClaimModuleArray.includes(this.props.location.pathname.split("/")[1])) {
      defaultNavigation = (
        <AppSidebarNav navConfig={navigationClaim} {...this.props} />
      );
    }
    if (ProducerModuleArray.includes(this.props.location.pathname)) {
      defaultNavigation = (
        <AppSidebarNav navConfig={navigationProducer} {...this.props} />
      );
    }
    if (AccountModuleArray.includes(this.props.location.pathname)) {
      defaultNavigation = (
        <AppSidebarNav navConfig={navigationAccount} {...this.props} />
      );
    }
    if (this.props.location.pathname.includes("crm")) {
      // Left Navigation for CRM
      defaultNavigation = (
        <AppSidebarNav navConfig={navigationCRM} {...this.props} />
      );
    }

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={(e) => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              {/* <AppSidebarNav navConfig={navigation} {...this.props} /> */}
              {defaultNavigation}
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            {/* <AppBreadcrumb appRoutes={routes} /> */}
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch onChange={this.removeASidebar}>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => <route.component {...props} />}
                      />
                    ) : null;
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

DefaultLayout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(DefaultLayout);
// export default DefaultLayout;
