import React, {Component} from 'react';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';
import {connect} from "react-redux";
import {policyCommonService, policyService} from "../../../services/policyService";
import {toast} from "react-toastify";
import {updateQuoteParam} from "../../../store/actions/policy";

class Userinnermenu extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.optionMaker = this.optionMaker.bind(this);
    this.ChangeProduct = this.ChangeProduct.bind(this);
    this.makeUppercase = this.makeUppercase.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.onAgencyChange = this.onAgencyChange.bind(this);
    this.commonService = new policyCommonService;
    this.apiService = new policyService();

    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      data: {},
      policyData: {},
      agencySelectDisabled: false,
      agentSelectDisabled: false,
      modal: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
    this.setState({policyData: nextProps.policyData.data})
  }


  toggle() {
    this.setState({collapse: !this.state.collapse});
  }

  toggleFade() {
    this.setState((prevState) => {
      return {fadeIn: !prevState}
    });
  }

  inputChangedHandler = (event) => {
    const updatedKeyword = event.target.value;
    // May be call for search result
    console.log(updatedKeyword)
  };

  toggleModal() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  optionMaker(data, condition) {
    let optionData = data.data;
    let options = [<option value="0" key={-1}>Please select</option>];
    if (optionData) {
      for (let i = 0; i < optionData.length; i++) {
        let option;
        if (condition) {
          option = <option value={optionData[i][condition.key]}
                           key={optionData[i][condition.key]}>{optionData[i][condition.text]}</option>
        } else {
          option = <option value={optionData[i].value}
                           key={optionData[i].value}>{optionData[i].text}</option>
        }
        options.push(option)
      }
    }
    return options;
  }

  ChangeProduct(obj) {
    const value = obj.target.value;
    if (!value) toast.warn("Please Select Product");
    else toast.warn("Product change not allowed.");
    window.open(this.commonService.siteURLJs() + "/Policymanagement/QuotePage", '_blank');
  }

  makeUppercase(obj) {

  }

  async onAgencyChange(event) {

    const agencyId = event.target.value;
    let data = await this.apiService.getUserDetailsByAgency({agencyId: agencyId});
    data = data.data;
    let agentDropdown = data['agentDropDown'];

    try {
      agentDropdown = agentDropdown.data;
    } catch (e) {
      agentDropdown = {};
    }
    let agentOptions = '<option value="0">Please select</option>';

    Object.keys(agentDropdown).forEach((value) => {
      agentOptions += `<option value="${agentDropdown[value].value}">${agentDropdown[value].text}</option>`
    });

    document.getElementById('AgentDropDown').innerHTML = agentOptions;

    let marketingRep = data['marketingRep'];
    try {
      marketingRep = marketingRep.rep;
      document.getElementById('marketingRepText').innerText = marketingRep;
    } catch (e) {
      console.log(e);
    }

    const agencyPhone = data['agencyPhone'];
    document.getElementById('agencyPhoneText').innerText = agencyPhone;
    try {

      const agencyAddress = data['agencyAddress'][0]['AgencyAddress'];
      document.getElementById('agencyAddrText').innerText = agencyAddress;

    } catch (e) {
      console.log(e);
    }
    const agencyEmailQ = data['agencyEmail'];
    document.getElementById('agencyEmailText').innerText = agencyEmailQ;
  }

  render() {

    let userAccess, agencyElem, agencySearchElem = [], agentElem, productElem, agencyAddrElem = [], uwAppElem = [],
      elemForEmployee = [];

    if (this.state.policyData) {
      const accessRights = this.state.policyData.accessRights;
      userAccess = accessRights ? accessRights.LevelName : '';

      if (userAccess === 'PRODUCER' || userAccess === 'PRINCIPLE' || userAccess === 'AGENT') {
        this.state.agencySelectDisabled = true;
      }

      if (userAccess === 'PRODUCER') this.state.agencySelectDisabled = true;

      if (userAccess === 'EMPLOYEE') {

        agencySearchElem = <Col xs="12" md="1">
          <Button color="primary" style={{marginTop: '30px'}} onClick={this.toggleModal}>
            <i className="fa fa-search"></i>
          </Button>
        </Col>;

        const addr = this.state.policyData.agencyAddress[0]["AgencyAddress"];

        agencyAddrElem =
          <Col xs="12" md="12">
            <FormGroup>
              <Label htmlFor="marketing_rep">Agency Address : <span id="agencyAddrText">{addr}</span></Label>
            </FormGroup>
          </Col>;
        elemForEmployee =
          <>
            <Col xs="12" md="4">
              <FormGroup>
                <Label htmlFor="marketing_rep">Marketing Rep : <span
                  id="marketingRepText">{this.state.policyData.marketingRep.rep}</span></Label>
              </FormGroup>
            </Col>
            <Col xs="12" md="4">
              <FormGroup>
                <Label htmlFor="agency_text">Principal Email: <span
                  id="agencyEmailText">{this.state.policyData.agencyEmail}</span></Label>
              </FormGroup>
            </Col>
            <Col xs="12" md="4">
              <FormGroup>
                <Label htmlFor="agency_text">Agency Phone: <span
                  id="agencyPhoneText">{this.state.policyData.agencyPhone}</span></Label>
              </FormGroup>
            </Col>
          </>

      }

      if (this.state.policyData.AgencyDropDown) {

        const options = this.optionMaker(this.state.policyData.AgencyDropDown);
        let selectedOptionId;

        selectedOptionId = this.state.policyData.AgencyDropDown.selectedAgency;
        agencyElem =
          <Input type="select" defaultValue={selectedOptionId} name="AgencyDropDown" id="AgencyDropDown"
                 disabled={this.state.agencySelectDisabled}
                 onChange={e => this.props.updateQuoteParam('AgencyDropDown',e.target.value)}>
            {options}
          </Input>

      }

      if (this.state.policyData.AgentDropDown) {

        const options = this.optionMaker(this.state.policyData.AgentDropDown);
        let selectedOptionId;
        selectedOptionId = this.state.policyData.AgentDropDown.selectedAgent;

        agentElem =
          <Input type="select" defaultValue={selectedOptionId} name="AgentDropDown" id="AgentDropDown"
                 onChange={e => this.props.updateQuoteParam('AgentDropDown',e.target.value)}
                 disabled={this.state.agentSelectDisabled}>
            {options}
          </Input>
      }
      if (this.state.policyData.GetProductDD) {

        const options = this.optionMaker({data: this.state.policyData.GetProductDD}, {
          key: 'n_ProductId_PK',
          text: 's_ProductName'
        });

        productElem =
          <Input type="select" name="GetProductDD" id="GetProductDD"
                 defaultValue={this.state.policyData.ProductSelected}
                 onChange={e => this.props.updateQuoteParam('GetProductDD',e.target.value)}>
            {options}
          </Input>
      }
      if (this.state.policyData.dropdownData) {
        const uwData = this.state.policyData.dropdownData.UWAPPSTATUS;
        const defaultValue = this.state.policyData.poappData ? this.state.policyData.poappData.s_UWAppStatusTypeCode : 'UWOPEN';
        let options = [];
        for (let item of uwData) {
          options.push(<option key={item.s_AppCodeName}
                               value={item.s_AppCodeName}>{item.s_AppCodeNameForDisplay}</option>)
        }
        uwAppElem = <Input type="select" name="s_UWAppStatusTypeCode1" id="s_UWAppStatusTypeCode1"
                           onChange={(event) => this.ChangeProduct(event)} defaultValue={defaultValue} disabled>
          {options}
        </Input>

      }
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}
                       className={'modal-lg ' + this.props.className}>
                  <ModalHeader toggle={this.toggleModal}>Agency Search</ModalHeader>
                  <ModalBody>
                    <Card>
                      <CardBody>
                        <Form action="" method="post" className="form-horizontal">
                          <Row>
                            <Col xs="12" md="4">
                              <FormGroup row>
                                <Col md="4"><Label htmlFor="clientid">Agency Code</Label></Col>
                                <Col md="8"><Input name="clientid" id="clientid" type="text"/></Col>
                              </FormGroup>
                            </Col>
                            <Col xs="12" md="4">
                              <FormGroup row>
                                <Col md="4"><Label htmlFor="ZipSearch">Zip</Label></Col>
                                <Col md="8"><Input id="ZipSearch" name="ZipSearch" type="text"/></Col>
                              </FormGroup>
                            </Col>
                            <Col xs="12" md="4">
                              <FormGroup row>
                                <Col md="4"><Label htmlFor="PrincipalNameSearch">Principal Name</Label></Col>
                                <Col md="8"><Input id="PrincipalNameSearch" name="PrincipalNameSearch"
                                                   type="text"/></Col>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs="12" md="4">
                              <FormGroup row>
                                <Col md="4"><Label htmlFor="countySearch">Agency Name</Label></Col>
                                <Col md="8"><Input name="countySearch" id="countySearch" type="text"/></Col>
                              </FormGroup>
                            </Col>
                            <Col xs="12" md="4">
                              <FormGroup row>
                                <Col md="4"><Label htmlFor="ManagerNameSearch">Manager Name</Label></Col>
                                <Col md="8"><Input id="ManagerNameSearch" name="ManagerNameSearch" type="text"/></Col>
                              </FormGroup>
                            </Col>
                            <Col xs="12" md="4">
                              <FormGroup row>
                                <Col md="4"><Label htmlFor="PrincipalNameSearch">Principal Name</Label></Col>
                                <Col md="8"><Input id="PrincipalNameSearch" type="text"/></Col>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs="12" md="4">
                              <FormGroup row>
                                <Col md="4"><Label htmlFor="FeinNumber_Search">FEIN Number</Label></Col>
                                <Col md="8"><Input name="FeinNumber_Search" id="FeinNumber_Search" type="text"/></Col>
                              </FormGroup>
                            </Col>
                            <Col xs="12" md="4">
                              <FormGroup row>
                                <Col md="4"><Label htmlFor="stateSearch">State</Label></Col>
                                <Col md="8"><Input id="stateSearch" name="stateSearch" type="text"/></Col>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs="12" md="4">
                              <FormGroup row>
                                <Col md="4"><Label htmlFor="dbaName">DBA Name</Label></Col>
                                <Col md="8"><Input name="dbaName" id="dbaName" type="text"/></Col>
                              </FormGroup>
                            </Col>
                            <Col xs="12" md="4">
                              <FormGroup row>
                                <Col md="4"><Label htmlFor="citySearch">City</Label></Col>
                                <Col md="8"><Input id="citySearch" name="citySearch" type="text"/></Col>
                              </FormGroup>
                            </Col>
                          </Row>
                        </Form>
                      </CardBody>
                      <CardFooter>
                        <Button type="reset" size="sm" color="danger" className="ml-3 pull-right"><i
                          className="fa fa-ban"></i> Reset</Button>
                        <Button type="submit" size="sm" color="primary" className="ml-3 pull-right"><i
                          className="fa fa-dot-circle-o"></i> Submit</Button>
                      </CardFooter>
                    </Card>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.toggleModal}>Exit</Button>
                  </ModalFooter>
                </Modal>
                <Row>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label htmlFor="effective-from">Effective From</Label>
                      <Input type="date" id="effective-from" name="effective-from" placeholder="date"
                             value={this.state.policyData.terms ? this.commonService.formatDate(this.state.policyData.terms.TermStartDate) : ''}
                             onChange={(event) => this.props.updateQuoteParam('data.TbPotermmaster.d_TermStartDate',event.target.value)}/>
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label htmlFor="effective-to">Effective To</Label>
                      <Input type="date" id="effective-to" name="effective-to" placeholder="date"
                             value={this.state.policyData.terms ? this.commonService.formatDate(this.state.policyData.terms.TermEndDate) : ''}
                             onChange={(event) => this.props.updateQuoteParam('data.TbPotermmaster.d_TermEndDate',event.target.value)} readOnly={true}/>
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label htmlFor="binder-date">Binder Date</Label>
                      <Input type="date" id="binder-date" name="binder-date" placeholder="date"
                             value={this.state.policyData.terms ? this.commonService.formatDate(this.state.policyData.BinderDate) : ''}
                             onChange={(event) => this.props.updateQuoteParam('BinderDate',event.target.value)} readOnly={true}/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" md="3">
                    <FormGroup>
                      <Label htmlFor="AgencyDropDown">Select Agency</Label>
                      {agencyElem}
                    </FormGroup>
                  </Col>
                  {agencySearchElem}
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label htmlFor="AgentDropDown">Select Agent</Label>
                      {agentElem}
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label htmlFor="binder-date">Select Product</Label>
                      {productElem}
                    </FormGroup>
                  </Col>
                  {agencyAddrElem}
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label htmlFor="binder-date">Policy No</Label>
                      <Input type="text" name="Policy_No_Header" id="Policy_No_Header" readOnly
                             value={this.state.policyData ? this.state.policyData.Policy_No_Header : ''}>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label htmlFor="binder-date">Estm Prem</Label>
                      <Input type="text" name="FinalPremium" id="FinalPremium" readOnly
                             value={this.state.policyData ? this.state.policyData.estimatePremium : ''}>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label htmlFor="s_UWAppStatusTypeCode1">UW. App. Status</Label>
                      {uwAppElem}
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="3">
                    <FormGroup>
                      <Label htmlFor="Policy_No_Header_SimpleSolve">Citz. Policy No# </Label>
                      <Input type="text" name="Policy_No_Header_SimpleSolve" id="Policy_No_Header_SimpleSolve"
                             onBlur={(event) => this.commonService.makeUppercase(event)}
                             defaultValue={this.state.policyData.Policy_No_SimpleSolve}>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="1">
                    <Button color="primary" style={{marginTop: '30px'}}>
                      GET
                    </Button>
                  </Col>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label htmlFor="InceptionDate_SimspleSolve">Citz. Incep. Date</Label>
                      <Input type="text" name="InceptionDate_SimspleSolve" id="InceptionDate_SimspleSolve"
                             defaultValue={this.state.policyData.InceptionDate_SimpleSolve}>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label htmlFor="Citizen_Total_Premium">Citz. Tot. Prem. </Label>
                      <Input type="text" name="Citizen_Total_Premium" id="Citizen_Total_Premium"
                             defaultValue={this.state.policyData.n_CitizenTotalPremium}>
                      </Input>
                    </FormGroup>
                  </Col>
                  {elemForEmployee}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {policyData, quoteParams} = state.Policy;
  return {policyData, quoteParams}

};
const mapDispatchToProps = {updateQuoteParam};
export default connect(mapStateToProps, mapDispatchToProps
)(Userinnermenu);
