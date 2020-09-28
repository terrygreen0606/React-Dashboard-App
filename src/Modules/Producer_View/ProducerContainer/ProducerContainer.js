import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux'
import * as action from '../../../store/actions/producer';
import ProducerService from '../../../services/Producer';
import {
  Button,
} from 'reactstrap';

import Agency from '../Agency';
//import AgencyNew from '../AgencyNew/AgencyNew';
import ProducerModal from '../ProducerModal/ProducerModal';

import { setAsideComponent } from '../../../store/actions/common';
import * as AsideTypes from '../../../services/asideService';

class ProducerContainer extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.openSearch = this.openSearch.bind(this);
    this.state = {
      dropdownOpen: [false, false],
      agencyId: 1,
      saveSync: 1,
      isOpen: false,
    };
  }

  toggleModal() {
    this.setState({isOpen: !this.state.isOpen});
  }

  openSearch() {
    this.props.setAsideComponent(AsideTypes.AgencySearch);
    this.toggleModal();
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  AddNewAgency = () => {
    this.props.loadAgency(0);
  }

  saveAgency = () => {
    var { saveSync } = this.state;
    saveSync = saveSync === 1 ? 0:1;
    this.setState({
      saveSync: saveSync
    });
  }

  render() {
    const {
      agencyId,
    } = this.props;
    return (
      <div className="animated fadeIn mt-4">
        <div className="producer-head mb-1 mt-2">
          <Button
            size="sm"
            color="primary"
            className="btn-brand mr-1 mb-1"
            onClick={this.saveAgency}
          >
            {agencyId == 0 ? 'Save Agency' : 'Update Agency'}
          </Button>

          <Button
            size="sm"
            color="primary"
            className="btn-brand mr-1 mb-1 float-right"
            onClick={this.openSearch}
          >
            Search Agency
          </Button>

          <Button
            size="sm"
            color="primary"
            className="btn-brand mr-1 mb-1 float-right"
            onClick={this.AddNewAgency}
          >
            Add Agency&nbsp;<span className="text-white">+</span>
          </Button>
        </div>
        <div className="p-1 mt-1">
          <Agency
            agencyId = {agencyId}
            saveSync = {this.state.saveSync}
          />
        </div>
        <ProducerModal toggle = {this.toggleModal} isOpen = {this.state.isOpen} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  agencyId: state.Producer.agencyId
});

const mapDispatchToProps = (dispatch) => {
  return {
    setAsideComponent: (component) => dispatch(setAsideComponent(component)),
    loadAgency: (n_PersonInfoId_PK) => dispatch(action.loadAgency(n_PersonInfoId_PK)),
    switchSearchAgencyModal: (modalFlag) => dispatch(action.switchSearchAgencyModal(modalFlag)),
    selectTab: (tabId) => dispatch(action.selectTab(tabId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProducerContainer);
