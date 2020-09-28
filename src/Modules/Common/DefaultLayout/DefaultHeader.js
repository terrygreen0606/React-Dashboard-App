import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import PropTypes from "prop-types";

import {
  AppAsideToggler,
  AppNavbarBrand,
  AppSidebarToggler,
} from "@coreui/react";
import DefaultHeaderDropdown from "./DefaultHeaderDropdown";
import logo from "../../../assets/img/brand/logo.png";
import sygnet from "../../../assets/img/brand/sygnet.svg";

// Added Dropdown -- Santosh
import DefaultPolicyDropdown from "./DefaultPolicyDropdown";
import ClientServiceDropdown from "./ClientServiceDropdown";
import ClaimServiceDropdown from "./ClaimServiceDropdown";
import AccountingDropdown from "./AccountingDropdown";
import ProducerDropdown from "./ProducerDropdown";

//style Santosh
import "../../../Modules/Centauri/customStyleTwo.css";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const userData = JSON.parse(sessionStorage.getItem("user"));

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 100, alt: "Avatar Insurance Logo" }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: "CoreUI Logo" }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link trbg nav-bt">
              Dashboard
            </NavLink>
          </NavItem>
          <NavItem className="px-3">
            {/*<DefaultPolicyDropdown />*/}
            <NavLink to="/policy/search" className="nav-link nav-bt">
              Policy
            </NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="/searchClient" className="nav-link nav-bt">
              Client Service
            </NavLink>
            {/*<ClientServiceDropdown />*/}
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="/claims" className="nav-link nav-bt">
              Claim
            </NavLink>
            {/*<ClaimServiceDropdown />*/}
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="/producer_view" className="nav-link nav-bt">
              Producer
            </NavLink>
            {/*<ProducerDropdown />*/}
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="/AccountDashboard" className="nav-link nav-bt">
              Accounting
            </NavLink>
            {/*<AccountingDropdown />*/}
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" className="nav-link nav-bt">
              Report
            </NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="/crm" className="nav-link nav-bt">
              CRM&nbsp;<sup className="bg-danger"></sup>
            </NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="/administration" className="nav-link nav-bt">
              Administration
            </NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <DefaultHeaderDropdown notif />
          <strong>{"Welcome, " + userData.s_ScreenName}</strong>
          <DefaultHeaderDropdown onLogout={this.props.onLogout} accnt />
        </Nav>
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
