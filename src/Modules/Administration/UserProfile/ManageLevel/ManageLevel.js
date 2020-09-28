import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AddProcess from "./AddProcess";
import { Card, CardBody, Col, Row } from "reactstrap";
import ListProcess from "./ListProcess";
import OverloadingBlockHp from "./OverloadingBlockHp";

class ManageLevel extends Component {
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
                  loadingStateKey="loadingAddProcss"
                  centerContent={<AddProcess />}
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <OverloadingBlockHp
                  loadingStateKey="loadingListProcss"
                  centerContent={<ListProcess />}
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

ListProcess.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  // user: state.Auth.user,
  loadingAddProcss: state.levelManageProcess.loadingAddProcss, //cnfj
  loadingListProcss: state.levelManageProcess.loadingListProcss //cnfj
});

export default connect(mapStateToProps)(ManageLevel);
