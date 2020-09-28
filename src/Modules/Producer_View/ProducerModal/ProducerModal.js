import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import AVReview from '../AVReview/AVReview';
import ULogs from '../ULogs/ULogs';
import AUsers from '../AUsers/AUsers';
import Documents from '../Documents/Documents';
import Commission from '../Commission/Commission';
import AgencyProduct from '../AgencyProduct/AgencyProduct';
import AgencySearch from '../AgencySearch/AgencySearch';

import * as AsideComponent from '../../../services/asideService';

class ProducerModal extends Component {
  render() {
    // eslint-disable-next-line
    const { children, currentComponent, commRGM_arr, commRate_arr, product_arr, ...attributes } = this.props;
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} size='xl' backdrop="static">
        <ModalHeader  toggle={this.props.toggle}>
          {currentComponent}
        </ModalHeader>
        <ModalBody >
          {
            currentComponent == AsideComponent.AgencyUsers ? (
              <AUsers
              />
            ) : currentComponent == AsideComponent.ProducerDocument ? (
              <Documents
              />
            ) : currentComponent == AsideComponent.AgencyVisitReview ? (
              <AVReview
              />
            ) : currentComponent == AsideComponent.Commission ? (
              <Commission
              />
            ) : currentComponent == AsideComponent.UpdatedLogs ? (
              <ULogs
              />
            ) : currentComponent == AsideComponent.AgencyProduct ? (
              <AgencyProduct
                commRGM_arr = {commRGM_arr}
                commRate_arr = {commRate_arr}
                product_arr = {product_arr}
                handleChange = { this.props.handleChange }
                handleAddRow = { this.props.handleAddRow }
                handleRemoveSpecificRow = { this.props.handleRemoveSpecificRow }
              />
            ) : (
              <AgencySearch toggle={this.props.toggle} />
            )
          }
        </ModalBody>
        {
          currentComponent != AsideComponent.AgencySearch && (
            <ModalFooter>
              <Button color="primary" size="sm" className="float-right font-weight-blod" onClick={this.props.toggle}>CLOSE</Button>
            </ModalFooter>
          )
        }
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  currentComponent: state.common.component,
  agencySearchModalState: state.Producer.agencySearchModalState
})

export default connect(mapStateToProps)(ProducerModal);
