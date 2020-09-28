import React, { Component } from "react";
import { TabContent, TabPane } from "reactstrap";
import ManageLevel from "../ManageLevel";
import ManageModule from "../ManageModule/ManageModule";
import ManageSubModule from "../ManageSubModule/ManageSubModule";
import ManageAcl from "../ManageAcl/ManageAcl";

class UserProfileTabContents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.activeTab
    };
  }

  tabPane() {
    return <React.Fragment>{this.tabPaneContent()}</React.Fragment>;
  }
  tabPaneContent = () => {
    switch (this.state.activeTab[0]) {
      case "1":
        return (
          <TabPane tabId="1">
            <ManageLevel />
          </TabPane>
        );
      case "2":
        return (
          <TabPane tabId="2">
            <ManageModule />
          </TabPane>
        );
      case "3":
        return (
          <TabPane tabId="3">
            <ManageSubModule />
          </TabPane>
        );

      case "4":
        return (
          <TabPane tabId="4">
            <ManageAcl />
          </TabPane>
        );

      default:
        return (
          <TabPane tabId="1">
            <ManageLevel />
          </TabPane>
        );
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activeTab !== this.props.activeTab) {
      this.setState({ activeTab: this.props.activeTab });
    }
  }
  render() {
    return (
      <div>
        {/* {this.state.activeTab} */}
        <TabContent activeTab={this.state.activeTab[0]}>
          {this.tabPane()}
        </TabContent>
      </div>
    );
  }
}
export default UserProfileTabContents;
