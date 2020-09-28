import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import * as action from '../../../store/actions/producer';
import ProducerService from '../../../services/Producer';

import { 
  Button,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
} from 'reactstrap';


import ProducerNavs from '../ProducerNavs';
import './ProducerContainer.css';


class ProducerContainer extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: [false, false],
      saveState: false,
    };
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  openSearchAgencyModal = () => {
    var modalFlag = true;
    this.props.switchSearchAgencyModal(modalFlag);
  }

  AddAgency = () => {
    this.props.loadAgency(0);
    this.props.selectTab('1');
  }

  handleSwitchNew = () => {
    this.setState({
        saveState: false,
      });
  }

  render() {
    const { 
      saveState,
    } = this.state;
    const {
      agencyId,
    } = this.props;
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <div className="float-right">
              <Button 
                size="sm" 
                color="primary" 
                className="btn-brand mr-1 mb-1"
                onClick={this.AddAgency}
              >
                <i className="cui-user-follow icons"></i>
                <span>New Agency</span>
              </Button>
              <Button 
                size="sm" 
                color="success" 
                className="btn-brand mr-1 mb-1"
                onClick={this.openSearchAgencyModal}
              >
                <i className="cui-magnifying-glass icons"></i>
                <span>Search Agency</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <ProducerNavs
              agencyId = { agencyId }
              saveState = { saveState }
              handleSwitchNew = { this.handleSwitchNew }
            >
            </ProducerNavs>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  agencyId: state.Producer.agencyId
})

const mapDispatchToProps = dispatch => ({
  loadAgency: (n_PersonInfoId_PK) => dispatch(action.loadAgency(n_PersonInfoId_PK)),
  switchSearchAgencyModal: (modalFlag) => dispatch(action.switchSearchAgencyModal(modalFlag)),
  selectTab: (tabId) => dispatch(action.selectTab(tabId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProducerContainer)
