import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import * as action from '../../../store/actions/producer';
import ProducerService from '../../../services/Producer';

import {Badge, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';

import ProducerMain from '../ProducerMain';
import Agency from '../Agency';
import AUsers from '../AUsers';
import Documents from '../Documents';
import Commission from '../Commission';
import Logs from '../Logs';
import ULogs from '../ULogs';
import AVReview from '../AVReview';
import Association from '../Association';

class ProducerNavs extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle(tab) {
    this.props.selectTab(tab);
  }

  tabPane() {
    return (
      <React.Fragment>
        <TabPane tabId="1">
          <Agency
            handleSwitchNew = {this.props.handleSwitchNew}
            agencyId = {this.props.agencyId}
            saveState = { this.props.saveState }
          />
        </TabPane>
        <TabPane tabId="2">
          <AUsers
            agencyId = {this.props.agencyId}
          />
        </TabPane>
        <TabPane tabId="3">
          <Documents
            agencyId = {this.props.agencyId}
          />
        </TabPane>
        <TabPane tabId="4">
          <Commission
            agencyId = {this.props.agencyId}
          />
        </TabPane>
        <TabPane tabId="5">
          <Logs
            agencyId = {this.props.agencyId}
          />
        </TabPane>
        <TabPane tabId="6">
          <ULogs
            agencyId = {this.props.agencyId}
          />
        </TabPane>
        <TabPane tabId="7">
          <AVReview
            agencyId = {this.props.agencyId}
          />
        </TabPane>
        <TabPane tabId="8">
          <Association
            agencyId = {this.props.agencyId}
          />
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
                  active={this.props.tabId === '1'}
                  onClick={() => { this.toggle('1'); }}
                >
                  Agency
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.props.tabId === '2'}
                  disabled = {this.props.agencyId === 0 ? true : false}
                  onClick={() => { this.toggle('2'); }}
                >
                  Agency Users
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.props.tabId === '3'}
                  disabled = {this.props.agencyId === 0 ? true : false}
                  onClick={() => { this.toggle('3'); }}
                >
                  Documents
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.props.tabId === '4'}
                  disabled = {this.props.agencyId === 0 ? true : false}
                  onClick={() => { this.toggle('4'); }}
                >
                  Commission
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.props.tabId === '5'}
                  disabled = {this.props.agencyId === 0 ? true : false}
                  onClick={() => { this.toggle('5'); }}
                >
                  Logs
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.props.tabId === '6'}
                  disabled = {this.props.agencyId === 0 ? true : false}
                  onClick={() => { this.toggle('6'); }}
                >
                  Updated Logs
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.props.tabId === '7'}
                  disabled = {this.props.agencyId === 0 ? true : false}
                  onClick={() => { this.toggle('7'); }}
                >
                  Agency Visit Review
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.props.tabId === '8'}
                  disabled = {this.props.agencyId === 0 ? true : false}
                  onClick={() => { this.toggle('8'); }}
                >
                  Association
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.props.tabId}>
              {this.tabPane()}
            </TabContent>
          </Col>

        </Row>
      </div>
    );
  }
}

ProducerNavs.defaultProps = {
  tabId: '1'
};

ProducerNavs.propTypes = {
  tabId: PropTypes.string.isRequired,
};

// export default ProducerNavs;
const mapStateToProps = state => ({
  agencyId: state.Producer.agencyId,
  tabId: state.Producer.tabId
})

const mapDispatchToProps = dispatch => ({
  selectTab: (tabId) => dispatch(action.selectTab(tabId)),//Origin
})

export default connect(mapStateToProps, mapDispatchToProps)(ProducerNavs)