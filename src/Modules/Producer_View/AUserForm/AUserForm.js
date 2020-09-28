import React, { Component }from 'react';
import { connect } from 'react-redux';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Input,
  Label,
  Row,
  Button,Modal, ModalHeader, ModalBody,Container,CustomInput,Alert,CardFooter
} from 'reactstrap';
import {InputAdapter, TextMask} from "react-text-mask-hoc";
import { isEmptyObject } from 'jquery';

class AUserForm extends Component {
  constructor(props) {
    super(props);
    this.convertPassword = this.convertPassword.bind(this);
    this.setVisible = this.setVisible.bind(this);
    this.state = {
      modal : false,
      password : '',
      isCheck : false,
      msg : '',
      visible : false,
      isDisable : true,
      visibleMain : false,
      firstName : '',
      middleName : '',
      lastName : '',
    };
  }

  handleBlur = () => {

  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.msg !== prevProps.msg) {
      this.setState({
        msg : this.props.msg
      });
    }
    if (this.props.agentData.First_Name !== prevProps.agentData.First_Name) {
      this.setState({
        firstName : this.props.agentData.First_Name
      });
    }
    if (this.props.agentData.s_MiddleName !== prevProps.agentData.s_MiddleName) {
      this.setState({
        middleName : this.props.agentData.s_MiddleName
      });
    }
    if (this.props.agentData.Last_Name !== prevProps.agentData.Last_Name) {
      this.setState({
        lastName : this.props.agentData.Last_Name
      });
    }
  }

  modalSwitch = (addType) => {
    this.setState({
      modal: !this.state.modal,
      password: '',
      isCheck : false,
      isDisable : true
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      password : value
    });
  }

  convertPassword = () => {
    var randomstring = require("randomstring");
    let newPassword = randomstring.generate({
      length:6,
      charset: '0123456789bcdfghjnmkpqrtsvxwyza'
    });
    this.setState({
      password : newPassword
    });
  }

  handleCheckStatus = (e) => {
    if(this.state.password == ''){
      this.setState({
        visible : true,
        msg : 'Please Generate Password'
      })
    }else{
      this.setState({
        isCheck : !this.state.isCheck,
        isDisable : false
      })
    }
  }

  resetPassword = () => {
    this.props.setNewPassword(this.state.password);
    let msg = this.props.msg;
    this.setState({
      msg : msg,
      password: '',
      isCheck : false,
      isDisable : true
    });
    this.setVisibleMain(true);
    this.modalSwitch();
  }

  setVisible = (value) => {
    this.setState({
      visible : value
    });
  }

  setVisibleMain = (value) => {
    this.setState({
      visibleMain : value
    });
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
              <Alert color="danger" isOpen={this.state.visibleMain} toggle={() => this.setVisibleMain(false)}>
                  {this.state.msg}
              </Alert>
              <Container>
                <Modal size='md' isOpen={this.state.modal} toggle={this.modalSwitch}>
                  <ModalBody>
                    <Card>
                    <Alert color="danger" isOpen={this.state.visible} toggle={() => this.setVisible(false)}>
                        {this.state.msg}
                    </Alert>
                      <CardHeader>
                        <i className="fa fa-align-justify"></i><strong>Password Generator</strong>
                      </CardHeader>
                      <CardBody>
                      <Row>
                        <Col xs="12" md="9">
                            <Input
                              type="text"
                              id="Password"
                              name="Password"
                              className="input-sm"
                              placeholder=""
                              value={this.state.password}
                              onChange={this.handleChange}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="12" md="9">
                            <Button color="info" className="btn-xing btn-brand mr-1 mb-1 mt-2" onClick={this.convertPassword}>
                              <span>Password Generate</span>
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                          <CustomInput
                            type="checkbox"
                            key = '1'
                            id='copy'
                            name='copy'
                            label='I have copied this password in a safe place.'
                            checked = {this.state.isCheck}
                            onChange={(e) => this.handleCheckStatus(e)}
                            required
                          >
                          </CustomInput>
                          </Col>
                        </Row>
                      </CardBody>
                      <CardFooter>
                          <Button color="red" className="btn-xing btn-brand float-right ml-2" onClick={this.modalSwitch}>
                            <span>Cancel</span>
                          </Button>
                          <Button color="info" className="btn-xing btn-brand float-right" onClick={this.resetPassword} disabled={this.state.isDisable}>
                            <span>Reset Password</span>
                          </Button>
                      </CardFooter>
                    </Card>
                  </ModalBody>
                </Modal>
              </Container>
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
                    <Label htmlFor="s_ScreenName" className="pr-1">Screen Name</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="s_ScreenName"
                      name="s_ScreenName"
                      value={this.props.s_ScreenName}
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
                  <Col xs="12" md="4">
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
                  <Col md="1" >
                    <Label htmlFor="d_ExpiryDate" className="pr-1">Eff To</Label>
                  </Col>
                  <Col xs="12" md="4">
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
                {this.props.agentId != 0 ? 
                <Row>
                  <Col md="3">
                    <Label htmlFor="Level" className="pr-1">Password</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Button color="info" className="btn-xing btn-brand mr-1 mb-1" onClick={this.modalSwitch}>
                      <span>Password Generator</span>
                    </Button>
                  </Col>
                </Row> : ''}
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
