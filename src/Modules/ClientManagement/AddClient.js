import React, { Component } from 'react';
import { Badge, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddClientFrom from './AddClientForm';
import MortPolicyInfo from './MortPolicyInfo';
import {Helmet} from 'react-helmet';


class AddClient extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      showMortTab: false
    };
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }


  tabPane() {
    return (
      <React.Fragment>
        <TabPane tabId="1">
          <AddClientFrom />
        </TabPane>
        <TabPane tabId="2">
          <MortPolicyInfo />
        </TabPane>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Helmet>
          <title>Avatar Insurance - Add Client</title>
        </Helmet>
        <Row>
          <Col xs="12" className="mb-4">
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => { this.toggle(0, '1'); }}
                >
                  <strong>
                    Demographics
                    </strong>
                </NavLink>
              </NavItem>
              { this.props.showMortTab ? 
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => { this.toggle(0, '2'); }}
                >
                  <strong>
                    Mortgagee Policy
                  </strong>
                </NavLink>
              </NavItem> : null }
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

AddClient.propTypes = {
  showMortTab: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  showMortTab: state.Client.showMortTab,
});

export default connect(mapStateToProps)(AddClient);
