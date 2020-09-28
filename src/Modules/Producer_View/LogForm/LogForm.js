import React, { Component } from 'react';
import Http from '../../../Http';
import { connect } from 'react-redux'
import ProducerService from '../../../services/Producer';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CustomInput,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';

class LogForm extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      isSaving: false,
      collapse: true,
      fadeIn: true,
      timeout: 300,
      s_Authorization: "Internal",
      s_PaActivityLogNotes: "",
    };
    //rest api endpoint
    this.api = process.env.REACT_APP_API_URL+'/api/v1/agency';
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  handleSubmit = (el) => {
    el.preventDefault();
    const { s_Authorization, s_PaActivityLogNotes } = this.state;

    const params = {
      s_Authorization,
      s_PaActivityLogNotes,
    };

    this.saveLog(params);
  }

  reset = (el) => {
    // this.logForm.reset();
    el.preventDefault();
    this.setState({
      s_Authorization: "Internal",
      s_PaActivityLogNotes:"",
    });
  }

  saveLog = (params) => {
    const {agencyId} = this.props;
    var url = `${this.api}/${agencyId}/saveLog`;
    this.setState({ isSaving: true});
    this.props.dispatch(ProducerService.saveLogRequest({params, url}))
      .then((res) => {
        this.setState({
          isSaving: false,
          s_Authorization: "",
          s_PaActivityLogNotes:"",
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isSaving: false });
      });
  }

  handleTypeChange = (e) => {
    var { name, value} = e.target;
    this.setState({ [name]: value });

  }

  handleContentChange = (e) => {
    var { name, value} = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const {
      isSaving
    } = this.state;
    return (
      <>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Add Log Detail</strong>
          </CardHeader>
          <CardBody>
            <Form action="" method="post" onSubmit={this.handleSubmit} ref={(el) => { this.logForm = el; }}>
              <Row>
                <Col md="2">
                  <Label>Log Type</Label>
                </Col>
                <Col md="10">
                  <FormGroup check inline>
                    <CustomInput
                      type="radio"
                      id="internal"
                      name="s_Authorization"
                      value="Internal"
                      label="Internal"
                      className="pr-5"
                      onChange={(e) => this.handleTypeChange(e)}
                      disabled={isSaving}
                      defaultChecked
                      required
                    >
                    </CustomInput>
                    <CustomInput
                      type="radio"
                      id="external"
                      name="s_Authorization"
                      value="External"
                      label="External"
                      onChange={(e) => this.handleTypeChange(e)}
                      disabled={isSaving}
                      required
                    >
                    </CustomInput>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="2">
                  <Label htmlFor="s_PaActivityLogNotes" className="pr-1">Description</Label>
                </Col>
                <Col xs="12" md="10">
                  <Input
                    type="textarea"
                    name="s_PaActivityLogNotes"
                    id="s_PaActivityLogNotes"
                    rows="9"
                    style={{borderRadius:'!important'}}
                    value={this.state.s_PaActivityLogNotes}
                    placeholder="  Content..."
                    onChange={(e) => this.handleContentChange(e)}
                    disabled={isSaving}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col style={{marginTop:'10px'}}></Col>
              </Row>
              <Row>
                <Col md="4">
                  <Button
                    type="submit"
                    size="sm"
                    color="primary"
                    disabled={isSaving}
                  >
                    <i className="fa fa-dot-circle-o"></i> Add Log
                  </Button>
                  <Button
                    type="reset"
                    style={{ marginLeft: "25px" }}
                    size="sm" color="danger"
                    disabled={isSaving}
                    onClick={this.reset}
                  >
                    <i className="fa fa-ban"></i> Clear
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </>
    );
  }
}

export default connect()(LogForm)
