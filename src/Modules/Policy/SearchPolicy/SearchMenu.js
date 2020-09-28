import React, { Component } from 'react';
import { policyService } from "../../../services/policyService";
import Userinnermenu from './Userinnermenu'
import { Card, CardBody, CardHeader, Col, Form, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import Quickquote from "../Components/Quickquote";
import ApplicationInfo from "../Components/ApplicationInfo";
import Bindpolicy from "../Components/Bindpolicy";
import { connect } from "react-redux";
import { setPolicyBaseData, setSessionData } from "../../../store/actions/policy";

class Epcic extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.disabledAllFields = this.disabledAllFields.bind(this);
    this.setPolicyBaseData = this.setPolicyBaseData.bind(this);
    this.setSessionData = this.setSessionData.bind(this);
    this.apiService = new policyService();
    this.state = {
      activeTab: new Array(4).fill('1'),
    };
  }

  async componentDidMount() {
    const policyData = await this.apiService.getPolicyBaseData()
      .catch(e => console.log(e));
    this.setPolicyBaseData({ data: policyData.data });
    const sessionData = await this.apiService.getUserSessionData()
      .catch(e => console.log(e));
    this.setSessionData({ data: sessionData.data });
    const ratePermission = await this.apiService.checkPermission(
      {
        "Module": "POLICY",
        "SubModule": "RATE_POLICY"
      }
    )
      .catch((err) => console.log(err));
  }

  setPolicyBaseData = (data) => {
    this.props.setPolicyBaseData(data);
  };
  setSessionData = (data) => {
    this.props.setSessionData(data);
  }
  disabledAllFields() {

    return 'hello world';

  }

  toggle(tabPane, tab) {

    const newArray = this.state.activeTab.slice();

    newArray[tabPane] = tab;

    this.setState({
      activeTab: newArray,
    });

  }

  getFinalPremiumContent() {
    return (
      <>
        {
          (!this.state.BinderDate || (this.state.BinderDate === '0000-00-00 00:00:00')) ?
            (
              this.state.ratePermission !== 'Denied' &&
              <input type={'submit'} className={'btn blue left medium'} id={'Ratesubmit'}
                value={'Rate'} style={{ width: 100 + 'px' }} />
            ) : this.disabledAllFields()
        }
      </>
    );
    if (!this.state.BinderDate || (this.state.BinderDate === '0000-00-00 00:00:00')) {
      let elem;
      if (this.state.ratePermission !== 'Denied') {
        elem += <input type={'submit'} className={'btn blue left medium'} id={'Ratesubmit'}
          value={'Rate'} style={{ width: 100 + 'px' }} />;
      }
      return (elem);
    }
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          <Quickquote />
        </TabPane>
        <TabPane tabId="2">
          <ApplicationInfo />
        </TabPane>
        <TabPane tabId="3">
          <Bindpolicy />
        </TabPane>
        <TabPane tabId="4">
        </TabPane>
        <TabPane tabId="5">
        </TabPane>
      </>
    );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg="12" xl="8" className={"offset-xl-2"}>
            <Card>
              <CardHeader>
                <h3>Policy</h3>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12">
                    <Form action="" method="post">
                      {/*<Userinnermenu data={this.state.data}/>*/}
                      <div className="animated fadeIn">
                        <Row>
                          <Col xs="12" className="mb-4">
                            <Nav tabs>
                              <NavItem>
                                <NavLink
                                  active={this.state.activeTab[0] === '1'}
                                  onClick={() => {
                                    this.toggle(0, '1');
                                  }}
                                >
                                  Quote
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                  active={this.state.activeTab[0] === '2'}
                                  onClick={() => {
                                    this.toggle(0, '2');
                                  }}
                                >
                                  Application
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                  active={this.state.activeTab[0] === '3'}
                                  onClick={() => {
                                    this.toggle(0, '3');
                                  }}
                                >
                                  Submit
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                  active={this.state.activeTab[0] === '4'}
                                  onClick={() => {
                                    this.toggle(0, '4');
                                  }}
                                >
                                  Activity Log
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                  active={this.state.activeTab[0] === '5'}
                                  onClick={() => {
                                    this.toggle(0, '5');
                                  }}
                                >
                                  Billing
                                </NavLink>
                              </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab[0]}>
                              {this.tabPane()}
                              {/*{this.getFinalPremiumContent()}*/}
                            </TabContent>
                          </Col>
                        </Row>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    policyData: state.Policy
  }
};
export default connect(mapStateToProps, { setPolicyBaseData, setSessionData }
)(Epcic);
