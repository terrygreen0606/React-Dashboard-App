import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  FormGroup,
  Button,
  Input,
  Label,
  Col,
  Row
} from "reactstrap";

import AppliedDatatable from "./AppliedDatatable";
import DeniedDatatable from "./DeniedDatatable";
import OverloadingBlockHp from "../ManageLevel/OverloadingBlockHp";
import AddProcessSelectLevelComp from "./AddProcessSelectLevelComp";
import SubmoduleDatatable from "./SubmoduleDatatable";

class ManageAcl extends Component {
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
            <Form
              id="formToSubmitAclMng"
              ref="formToSubmitAclMng"
              //   onSubmit={this.onClickBtnFormSubmitHandle}
              method="post"
              inline
            >
              <Row>
                <Col xs="12">
                  <FormGroup className="pr-5">
                    <Label htmlFor="exampleInputName2" className="pr-1 ">
                      Select Level{" "}
                    </Label>
                    <OverloadingBlockHp
                      loadingStateKey={"loadingAclmngLevelDD"}
                      centerContent={<AddProcessSelectLevelComp />}
                      //   selectedIndex={
                      //     this.props.addEditFormFieldValues.ModuleDDSelected
                      //   }
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="6">
                  <OverloadingBlockHp
                    loadingStateKey={"loadingAclmngAppliedDetatable"}
                    centerContent={<AppliedDatatable />}
                  />
                </Col>
                <Col xs="6">
                  <OverloadingBlockHp
                    loadingStateKey={"loadingAclmngDeniedDetatable"}
                    centerContent={<DeniedDatatable />}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <OverloadingBlockHp
                    loadingStateKey={"loadingAclmngSubmoduleDetatable"}
                    centerContent={<SubmoduleDatatable />}
                  />
                </Col>
              </Row>
            </Form>
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

export default connect(mapStateToProps)(ManageAcl);
