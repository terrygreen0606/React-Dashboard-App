import React, { Component } from "react";
import { connect } from "react-redux";
import AddProcess from "./AddProcess";
import { Card, CardBody, Col, Row } from "reactstrap";
import ListProcess from "./ListProcess";
import OverloadingBlockHp from "../ManageLevel/OverloadingBlockHp";

class ManageModule extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      error: false
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <Row>
              <Col xs="12">
              <OverloadingBlockHp
                  loadingStateKey={'loadingModuleAddProcss'}
                  centerContent={
                    <AddProcess />
                  }
                />                
              </Col>
            </Row>
            <Row>
              <Col xs="12">
              <OverloadingBlockHp
                  loadingStateKey={'loadingModuleListProcss'}
                  centerContent={
                    <ListProcess />
                  }
                />                
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

// export default Agency;

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated
  // user: state.Auth.user,
});

export default connect(mapStateToProps)(ManageModule);
