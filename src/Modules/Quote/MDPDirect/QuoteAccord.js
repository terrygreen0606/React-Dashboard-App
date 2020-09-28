import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppSwitch } from '@coreui/react';
import ApplicantInfo from './ApplicantInfo';
import MaillingAddr from '../Common/MaillingAddr';
import PropertyDetails from './PropertyDetails';
import PriorAddress from '../Common/PriorAddress';
import BasicCvg from './BasicCvg';
import EndorsmentCvg from './EndorsmentCvg';
import Deductible from '../Common/Deductible';
import Discount from './Discount';
import WindMitigation from './WindMitigation';
import ListAllLosses from '../Common/ListAllLosses'
import { TextMask, InputAdapter } from 'react-text-mask-hoc';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Collapse,
  Row,
  Input,
  FormGroup, Label,
} from 'reactstrap';

class QuoteAccord extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.state = {
      collapse: false,
      accordion: [true, false, false, false, false, false, false, false, false,],
      fadeIn: true,
      timeout: 300,
      maillingAddrHidden: true,
      isPriorAddr: true,
      isListAllLosses: false,
      hiddenCheckedEndor: [],
      insuredLivingData: ''
    };

  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
  }

  showMaillingAddr = (val) => {
    this.setState({ maillingAddrHidden: val });
    this.toggleAccordion(1)
  }

  showPriorAddr = (val) => {
    this.setState({ isPriorAddr: !val });
    this.toggleAccordion(3)
  }

  showListAllLosses = (e) => {
    this.setState({ isListAllLosses: e.target.checked })
  }

  updateEndorsChecked = (checkedArray) => {
    this.setState({ hiddenCheckedEndor: checkedArray })
  }

  handleChange = (e) => {
    this.state.insuredLivingData = e.target.value;
  }

  render() {

    if(this.props.quoteSavedData != null){
      if(this.props.quoteSavedData.applicantData.getPersonData.s_IsMailAddDiff == 'Yes'){
        this.state.maillingAddrHidden = true;
      }
      if(this.props.quoteSavedData.applicantData.getPersonData.s_IsNewPurchase == 'Yes'){
        this.state.isPriorAddr = false;
      }
      if(this.props.quoteSavedData.getPriorLossData.length > 0){
        this.state.isListAllLosses = true;
      }
      this.state.insuredLivingData = this.props.quoteSavedData.policyData.d_InsuredLivingDate;
    }

    return (
      <div id="accordion" className="p-0">
        <Card className="m-0 borderNN">
          <CardHeader id="headingOne" className="p-1">
            <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(0)} aria-expanded={this.state.accordion[0]} aria-controls="collapseOne">
              <span className="text-value-sm">Applicant Information</span>{<i className={this.state.accordion[0] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
            </Button>
          </CardHeader>
          <Collapse isOpen={this.state.accordion[0]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
            <CardBody>
              <ApplicantInfo showMaillingAddr={this.showMaillingAddr} quoteSavedData={this.props.quoteSavedData} mainState={this.props.mainState}/>
            </CardBody>
          </Collapse>
        </Card>
        <Card className="mb-0 borderNN" hidden={this.state.maillingAddrHidden}>
          <CardHeader id="headingTwo" className="p-1">
            <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(1)} aria-expanded={this.state.accordion[1]} aria-controls="collapseTwo">
              <span className="text-value-sm">Mailing Address</span>{<i className={this.state.accordion[1] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
            </Button>
          </CardHeader>
          <Collapse isOpen={this.state.accordion[1]} data-parent="#accordion" id="collapseTwo">
            <CardBody>
              <MaillingAddr quoteSavedData={this.props.quoteSavedData} mainState={this.props.mainState}/>
            </CardBody>
          </Collapse>
        </Card>
        <Card className="mb-0 borderNN">
          <CardHeader id="headingThree" className="p-1">
            <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(2)} aria-expanded={this.state.accordion[2]} aria-controls="collapseThree">
              <span className="text-value-sm">Property Details</span>{<i className={this.state.accordion[2] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
            </Button>
          </CardHeader>
          <Collapse isOpen={this.state.accordion[2]} data-parent="#accordion" id="collapseThree">
            <CardBody>
              <PropertyDetails showPriorAddr={this.showPriorAddr} quoteSavedData={this.props.quoteSavedData} mainState={this.props.mainState}/>
            </CardBody>
          </Collapse>
        </Card>
        <Card className="mb-0 borderNN" hidden={this.state.isPriorAddr}>
          <CardHeader id="headingFour" className="p-1">
            <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(3)} aria-expanded={this.state.accordion[3]} aria-controls="collapseFour">
              <span className="text-value-sm">Prior or Current Address</span>{<i className={this.state.accordion[3] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
            </Button>
          </CardHeader>
          <Collapse isOpen={this.state.accordion[3]} data-parent="#accordion" id="collapseFour">
            <CardBody>
              <PriorAddress quoteSavedData={this.props.quoteSavedData} mainState={this.props.mainState}/>
            </CardBody>
          </Collapse>
        </Card>
        <Card className="mb-0 borderNN">
          <CardHeader id="headingFive" className="p-1">
            <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(4)} aria-expanded={this.state.accordion[4]} aria-controls="collapseFive">
              <span className="text-value-sm">Coverages</span>{<i className={this.state.accordion[4] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
            </Button>
          </CardHeader>
          <Collapse isOpen={this.state.accordion[4]} data-parent="#accordion" id="collapseFive">
            <CardBody>
              <Row className="pr-2">
                <Col sm="4">
                  <Card className="m-0">
                    <CardHeader className="p-1">
                      <strong>Basic Coverages</strong>
                    </CardHeader>
                    <CardBody>
                      <BasicCvg quoteSavedData={this.props.quoteSavedData} mainState={this.props.mainState}/>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm="5">
                  <Card className="m-0">
                    <CardHeader className="p-1">
                      <strong>Endorsment(Optional) Coverages</strong>
                    </CardHeader>
                    <CardBody style={{ overflowY: 'auto', maxHeight: '250px' }}>
                      <EndorsmentCvg  mainState={this.props.mainState} updateEndorsChecked={this.updateEndorsChecked} quoteSavedData={this.props.quoteSavedData} />
                      <Input type="hidden" name="hdnService_EndovCVG" value={this.state.hiddenCheckedEndor.join('|')} />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Collapse>
        </Card>
        <Card className="mb-0 borderNN">
          <CardHeader id="headingSix" className="p-1">
            <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(5)} aria-expanded={this.state.accordion[5]} aria-controls="collapseSix">
              <span className="text-value-sm">Deductible</span>{<i className={this.state.accordion[5] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
            </Button>
          </CardHeader>
          <Collapse isOpen={this.state.accordion[5]} data-parent="#accordion" id="collapseSix">
            <CardBody>
              <Deductible mainState={this.props.mainState} quoteSavedData={this.props.quoteSavedData}/>
            </CardBody>
          </Collapse>
        </Card>
        <Card className="mb-0 borderNN">
          <CardHeader id="headingSeven" className="p-1">
            <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(6)} aria-expanded={this.state.accordion[6]} aria-controls="collapseSix">
              <span className="text-value-sm">Discounts</span>{<i className={this.state.accordion[6] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
            </Button>
          </CardHeader>
          <Collapse isOpen={this.state.accordion[6]} data-parent="#accordion" id="collapseSix">
            <CardBody>
              <Row>
                <Col sm="3"><Discount quoteSavedData={this.props.quoteSavedData} mainState={this.props.mainState}/></Col>
                <Col sm="9" hidden={true}><WindMitigation quoteSavedData={this.props.quoteSavedData} mainState={this.props.mainState}/></Col>
              </Row>
            </CardBody>
          </Collapse>
        </Card>
        <Card className="mb-0 borderNN">
          <CardHeader id="headingEight" className="p-1">
            <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(7)} aria-expanded={this.state.accordion[7]} aria-controls="collapseEight">
              <span className="text-value-sm">Claim Question</span>{<i className={this.state.accordion[7] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
            </Button>
          </CardHeader>
          <Collapse isOpen={this.state.accordion[7]} data-parent="#accordion" id="collapseEight">
            <CardBody>
              <Row>
                <Col md="10" className=''>
                  <strong>Month & Year the property to be insured was purchased by the applicant.</strong>
                </Col>
                <Col md="2" className=''>
                  <FormGroup check inline>
                    <TextMask
                      mask={[/[1-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                      Component={InputAdapter}
                      className="form-control form-control-sm"
                      type="text"
                      name="data[TbPolicy][d_InsuredLivingDate]"
                      style={{ width: '80px' }}
                      value={this.state.insuredLivingData}
                      onChange={this.handleChange}
                      disabled={this.props.mainState.isBind}
                    />&nbsp;&nbsp;
                    <strong>(YYYY-MM)</strong>
                  </FormGroup>
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col md="10" >
                  <strong>Do you have any losses occured in last 5 years?</strong>
                </Col>
                <Col md="1" >
                  <FormGroup check inline className="text-center">
                    <Label className="form-check-label" check htmlFor="inline-radio1">No</Label>&nbsp;&nbsp;
                    <AppSwitch size="sm" className={'mt-2'} variant={'pill'} color={'success'} name="listalllosses" checked={this.state.isListAllLosses} onChange={this.showListAllLosses} value={this.state.isListAllLosses ? 'Yes' : ''} disabled={this.props.mainState.isBind} />&nbsp;&nbsp;
                    <Label className="form-check-label" check htmlFor="inline-radio2">Yes</Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col md="12">{this.state.isListAllLosses ? <ListAllLosses mainState={this.props.mainState} quoteSavedData={this.props.quoteSavedData}/> : null}</Col>
              </Row>
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  baseData: state.QuoteEntry.baseData,
});

export default connect(mapStateToProps)(QuoteAccord);