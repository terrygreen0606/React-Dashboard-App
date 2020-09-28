import React, { Component } from 'react';
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import QuoteAccord from './QuoteAccord';
import ApplicationAccord from './ApplicationAccord';
import SubmitAccord from './SubmitAccord';
import { toastAction } from '../../../store/actions/toast-actions';

class TabContain extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
    };
  }

  lorem() {
    return 'Data Not Available.'
  }

  toggle(tabPane, tab) {
    /*if(this.props.mainState.mode != 'Edit'){
      if(tab == '2' || tab == '3' || tab == '4' || tab == '5'){
        toastAction(false, 'Please Save Application First.');
      }
    }else{*/
      const newArray = this.state.activeTab.slice()
      newArray[tabPane] = tab
      this.setState({
        activeTab: newArray,
      });
    //}
  }

  tabPane() {
    return (
      <React.Fragment>
        <TabPane tabId="1" className="p-0">
          <QuoteAccord mainState={this.props.mainState} quoteSavedData={this.props.quoteSavedData}/>
        </TabPane>
        <TabPane tabId="2" className="p-0">
          <ApplicationAccord mainState={this.props.mainState} quoteSavedData={this.props.quoteSavedData}/>
        </TabPane>
        <TabPane tabId="3" className="p-0">
          <SubmitAccord mainState={this.props.mainState} quoteSavedData={this.props.quoteSavedData} setWhichButton={(data)=>this.props.setWhichButton(data)} />
        </TabPane>
        <TabPane tabId="4" className="p-0">
          {`4. ${this.lorem()}`}
        </TabPane>
        <TabPane tabId="5" className="p-0">
          {`5. ${this.lorem()}`}
        </TabPane>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" className="mb-2">
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => { this.toggle(0, '1'); }}
                >
                  Quote
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => { this.toggle(0, '2'); }}
                >
                  Application
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '3'}
                  onClick={() => { this.toggle(0, '3'); }}
                >
                  Submit
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '4'}
                  onClick={() => { this.toggle(0, '4'); }}
                >
                  Activity Log
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '5'}
                  onClick={() => { this.toggle(0, '5'); }}
                >
                  Billing
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]} className="m-0">
              {this.tabPane()}
            </TabContent>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TabContain;