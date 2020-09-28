import React, { Component } from 'react';
import BillingPriorCvg from '../Common/BillingPriorCvg';
import Mortgagees from '../Common/Mortgagees';
import AddiTionalInterest from '../Common/AddiTionalInterest';
import RenovationDetails from '../Common/RenovationDetails';
import HouseHoldMembers from '../Common/HouseHoldMembers'
import GeneralQuestion from './GeneralQuestions';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Collapse,
  Row
} from 'reactstrap';

class ApplicationAccord extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.state = {
      collapse: false,
      accordion: [true, false, false, false, false, false, false, false, false,],
      timeout: 300,
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

  render() {
    return (
      <div id="accordion">
        <Card className="mb-0 borderNN">
          <CardHeader id="headingOne" className="p-1">
            <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(0)} aria-expanded={this.state.accordion[0]} aria-controls="collapseOne">
              <span className="text-value-sm">Billing & Prior Coverage Info</span>{<i className={this.state.accordion[0] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
            </Button>
          </CardHeader>
          <Collapse isOpen={this.state.accordion[0]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
            <CardBody>
              <BillingPriorCvg quoteSavedData={this.props.quoteSavedData}  mainState={this.props.mainState}/>
            </CardBody>
          </Collapse>
        </Card>
        <Card className="mb-0 borderNN">
          <CardHeader id="headingTwo" className="p-1">
            <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(1)} aria-expanded={this.state.accordion[1]} aria-controls="collapseTwo">
              <span className="text-value-sm">Mortgagees</span>{<i className={this.state.accordion[1] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
            </Button>
          </CardHeader>
          <Collapse isOpen={this.state.accordion[1]} data-parent="#accordion" id="collapseTwo">
            <CardBody>
              <Row>
                <Mortgagees mainState={this.props.mainState} quoteSavedData={this.props.quoteSavedData} />
              </Row>
            </CardBody>
          </Collapse>
        </Card>
        <Card className="mb-0 borderNN">
          <CardHeader id="headingThree" className="p-1">
            <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(2)} aria-expanded={this.state.accordion[2]} aria-controls="collapseThree">
              <span className="text-value-sm">Additional Interest</span>{<i className={this.state.accordion[2] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
            </Button>
          </CardHeader>
          <Collapse isOpen={this.state.accordion[2]} data-parent="#accordion" id="collapseThree">
            <CardBody>
              <Row>
                <AddiTionalInterest mainState={this.props.mainState} quoteSavedData={this.props.quoteSavedData} />
              </Row>
            </CardBody>
          </Collapse>
        </Card>
        <Card className="mb-0 borderNN">
          <CardHeader id="headingFour" className="p-1">
            <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(3)} aria-expanded={this.state.accordion[3]} aria-controls="collapseFour">
              <span className="text-value-sm">Household Members</span>{<i className={this.state.accordion[3] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
            </Button>
          </CardHeader>
          <Collapse isOpen={this.state.accordion[3]} data-parent="#accordion" id="collapseFour">
            <CardBody>
              <HouseHoldMembers mainState={this.props.mainState} quoteSavedData={this.props.quoteSavedData} />
            </CardBody>
          </Collapse>
        </Card>
        <Card className="mb-0 borderNN">
          <CardHeader id="headingFour" className="p-1">
            <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(4)} aria-expanded={this.state.accordion[4]} aria-controls="collapseFour">
              <span className="text-value-sm">Renovation Details</span>{<i className={this.state.accordion[4] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
            </Button>
          </CardHeader>
          <Collapse isOpen={this.state.accordion[4]} data-parent="#accordion" id="collapseFour">
            <CardBody>
              <RenovationDetails mainState={this.props.mainState} quoteSavedData={this.props.quoteSavedData} />
            </CardBody>
          </Collapse>
        </Card>
        <Card className="mb-0 borderNN">
          <CardHeader id="headingFive" className="p-1">
            <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(5)} aria-expanded={this.state.accordion[5]} aria-controls="collapseFive">
              <span className="text-value-sm">General Questions</span>{<i className={this.state.accordion[5] ? 'fa fa-minus' : 'fa fa-plus'} style={{ float: "right" }}></i>}
            </Button>
          </CardHeader>
          <Collapse isOpen={this.state.accordion[5]} data-parent="#accordion" id="collapseFive">
            <CardBody>
              <GeneralQuestion quoteSavedData={this.props.quoteSavedData}  mainState={this.props.mainState}/>
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default ApplicationAccord;