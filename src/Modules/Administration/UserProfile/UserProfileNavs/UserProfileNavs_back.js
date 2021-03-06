import React, { Component } from "react";
import {
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from "reactstrap";
import ManageLevel from "../ManageLevel";
import ManageModule from "../ManageModule/ManageModule";
import ManageSubModule from "../ManageSubModule/ManageSubModule";
import ManageAcl from "../ManageAcl/ManageAcl";

class UserProfileNavs extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(1).fill("1")
    };
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray
    });
  }

  tabPane() {
    return (
      <React.Fragment>
         <TabPane tabId="1">
          <ManageLevel />
        </TabPane>
        <TabPane tabId="2">
          <ManageModule />
        </TabPane>
        <TabPane tabId="3">
          <ManageSubModule />
        </TabPane>    
        <TabPane tabId="4">
          <ManageAcl />
        </TabPane>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" className="mb-4">
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "1"}
                  onClick={() => {
                    this.toggle(0, "1");
                  }}
                >
                  Manage Level
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "2"}
                  onClick={() => {
                    this.toggle(0, "2");
                  }}
                >
                  Manage Module
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "3"}
                  onClick={() => {
                    this.toggle(0, "3");
                  }}
                >
                  Manage Sub Module
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "4"}
                  onClick={() => {
                    this.toggle(0, "4");
                  }}
                >
                  Access Level Rights
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
            </TabContent>
          </Col>
        </Row>
      </div>
    );
  }
}

export default UserProfileNavs;
