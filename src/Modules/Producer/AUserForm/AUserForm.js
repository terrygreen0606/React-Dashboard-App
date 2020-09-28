import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import ReeValidate from 'ree-validate';
import ProducerService from '../../../services/Producer';
import Http from '../../../Http';

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
  Dropdown,
  Nav, NavItem,
  NavLink,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import {InputAdapter, TextMask} from "react-text-mask-hoc";

class AUserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  handleBlur = () => {

  }

  render() {
    const {
      isDetailLoading,
      userLevel_arr,
      agentData
    } = this.props
    return (
      <div className="animated fadeIn">
        {isDetailLoading
        ?
          <div className="sk-double-bounce">
            <div className="sk-child sk-double-bounce1"></div>
            <div className="sk-child sk-double-bounce2"></div>
          </div>
        :
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i><strong>Agency User Form</strong>
            </CardHeader>
            <CardBody>
              <Form action="" method="post" >
                <Row>
                  <Col md="3">
                    <Label htmlFor="Username" className="pr-1">User ID:</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="Username"
                      name="Username"
                      value={agentData.Username}
                      className="input-sm"
                      placeholder=""
                      onChange={this.props.handleChange}
                      onBlur={this.handleBlur}
                      readOnly = {this.props.agentId != 0 ? true:false}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <Label htmlFor="Sub_Agent_ID" className="pr-1">Sub Agent ID:</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="Sub_Agent_ID"
                      name="Sub_Agent_ID"
                      className="input-sm"
                      placeholder=""
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <Label htmlFor="s_ScreenName" className="pr-1">Screen Name</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="s_ScreenName"
                      name="s_ScreenName"
                      value={agentData.s_ScreenName}
                      className="input-sm"
                      placeholder=""
                      onChange={this.props.handleChange}
                      onBlur={this.handleBlur}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <Label htmlFor="First_Name" className="pr-1">F/M/L Name</Label>
                  </Col>
                  <Col xs="4" md="3">
                    <Input
                      type="text"
                      id="First_Name"
                      name="First_Name"
                      value={agentData.First_Name}
                      className="input-sm"
                      placeholder=""
                      onChange={this.props.handleChange}
                      onBlur={this.handleBlur}
                      required
                    />
                  </Col>
                  <Col xs="4" md="3">
                    <Input
                      type="text"
                      id="s_MiddleName"
                      name="s_MiddleName"
                      value={agentData.s_MiddleName}
                      className="input-sm"
                      placeholder=""
                      onChange={this.props.handleChange}
                      onBlur={this.handleBlur}
                      required
                    />
                  </Col>
                  <Col xs="4" md="3">
                    <Input
                      type="text"
                      id="Last_Name"
                      name="Last_Name"
                      value={agentData.Last_Name}
                      className="input-sm"
                      placeholder=""
                      onChange={this.props.handleChange}
                      onBlur={this.handleBlur}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <Label htmlFor="email" className="pr-1">E-Mail</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="Email"
                      name="Email"
                      value={agentData.Email}
                      className="input-sm"
                      placeholder=""
                      onChange={this.props.handleChange}
                      onBlur={this.handleBlur}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <Label htmlFor="s_PhoneNumber" className="pr-1">Phone</Label>
                  </Col>
                  <Col xs="12" md="9">

                    <TextMask
                      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', 'e', 'x', 't', ' ', /\d/, /\d/, /\d/, /\d/, /\d/]}
                      Component={InputAdapter}
                      className="form-control"
                      type="text"
                      className="input-sm"
                      id="s_PhoneNumber"
                      name="s_PhoneNumber"
                      value={agentData.s_PhoneNumber}
                      placeholder=""
                      onChange={this.props.handleChange}
                      onBlur={this.handleBlur}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <Label htmlFor="s_UserStatus" className="pr-1">Status</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="select"
                      name="s_UserStatus"
                      id="s_UserStatus"
                      value={agentData.s_UserStatus}
                      onChange={this.props.handleChange}
                    >
                      <option value="">Select Status</option>
                      <option value="111">Active</option>
                      <option value="112">Closed</option>
                    </Input>
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <Label htmlFor="Level" className="pr-1">User Level</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="select"
                      name="Level"
                      id="Level"
                      value={agentData.Level}
                      onChange={this.props.handleChange}
                    >
                      <option value="" >Select User Level</option>
                      {userLevel_arr.map((userLevel, idx) => (
                        <option key={idx} value={userLevel.UserLevel_ID}>
                          {userLevel.UserLevel_Name}
                        </option>
                      ))}
                    </Input>
                  </Col>
                </Row>
                <Row>
                    <Col md="3">
                      <Label htmlFor="d_EffectiveDate" className="pr-1">Eff From</Label>
                    </Col>
                    <Col xs="12" md="3">
                      <Input
                        type="date"
                        id="d_EffectiveDate"
                        name="d_EffectiveDate"
                        value={agentData.d_EffectiveDate}
                        className="input-sm"
                        placeholder=""
                        onChange={this.props.handleChange}
                        onBlur={this.handleBlur}
                        required
                      />
                    </Col>
                    <Col md="3" >
                      <Label htmlFor="d_ExpiryDate" className="pr-1">Eff To</Label>
                    </Col>
                    <Col xs="12" md="3">
                      <Input
                        type="date"
                        id="d_ExpiryDate"
                        name="d_ExpiryDate"
                        value={agentData.d_ExpiryDate}
                        className="input-sm"
                        placeholder=""
                        onChange={this.props.handleChange}
                        onBlur={this.handleBlur}
                        required
                      />
                    </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        }
      </div>
    );
  }
}
const mapStateToProps = state => ({
  // agentData: state.Producer.agentData,
  // userLevel_arr: state.Producer.userLevel_arr,
})

const mapDispatchToProps = dispatch => ({
    // showPasswordGeneratorModal: (url) => dispatch(ProducerService.showPasswordGeneratorModal(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(AUserForm);
