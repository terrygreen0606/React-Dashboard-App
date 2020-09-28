import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal, ModalBody } from "reactstrap";
import * as docHandlerServicesObj from "../../../services/documentHandlerServices";
import OverloadingBlockHp from "../UserProfile/ManageLevel/OverloadingBlockHp";
import DocumentlistAddnewDT from "./DocumentlistAddnewDT";

class DocumentlistAddnew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      primary: this.props.doHideShowAddnewdocDilogStatus,
      doHideShowAddnewdocDilogStatus: this.props.doHideShowAddnewdocDilogStatus,
      forceReloadDocumentAddnewDataTable: this.props
        .forceReloadDocumentAddnewDataTable,
    };
    //-----------
    this.toggle = this.toggle.bind(this); //for model dilogue
    this.togglePrimary = this.togglePrimary.bind(this); //for model dilogue
    this.toggleAddNewDocModel = this.toggleAddNewDocModel.bind(this);
    this.doForcefullyUpdate = this.doForcefullyUpdate.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  togglePrimary() {
    this.setState({
      primary: !this.state.primary,
    });
  }

  toggleAddNewDocModel = (e) => {
    const NewTogleStatus = false;
    this.props.dispatch(
      docHandlerServicesObj.doHideShowAddnewdocDilogServices(NewTogleStatus)
    ); //do false the status of model
    this.props.dispatch(
      docHandlerServicesObj.doEmptySelectedItemRowIDActionServices(
        "documnetAddnewDT"
      )
    ); //do clear the selected documents on close
  };

  doForcefullyUpdate = (e) => {
    this.props.dispatch(
      docHandlerServicesObj.doForcefullyUpdateServices("documnetAddnewDT")
    );
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.doHideShowAddnewdocDilogStatus !==
      prevState.doHideShowAddnewdocDilogStatus
    ) {
      return {
        doHideShowAddnewdocDilogStatus:
          nextProps.doHideShowAddnewdocDilogStatus,
      };
    } else return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.doHideShowAddnewdocDilogStatus !==
      this.props.doHideShowAddnewdocDilogStatus
    ) {
      this.setState({
        primary: this.props.doHideShowAddnewdocDilogStatus,
        doHideShowAddnewdocDilogStatus: this.props
          .doHideShowAddnewdocDilogStatus,
      });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Modal
          isOpen={this.state.primary}
          toggle={this.togglePrimary}
          className={"modal-primary " + this.props.className}
          //dialogClassName="modal-90w"
          //aria-labelledby="example-custom-modal-styling-title"

          size="xl"
          aria-labelledby="example-modal-sizes-title-xl"
          keyboard={false} //restrict hide on escape button
          backdrop={"static"} //restrict hide on clidk of outside model body
          onOpened={this.doForcefullyUpdate}
          onClosed={this.toggleAddNewDocModel}
        >
          {/* <ModalHeader toggle={this.togglePrimary}>Modal title</ModalHeader> */}
          <ModalBody>
            <OverloadingBlockHp
              loadingStateKey={"loadingLayerDocumentDataTable"}
              centerContent={
                <DocumentlistAddnewDT
                  togglePrimary={this.togglePrimary.bind(this)}
                />
              }
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

DocumentlistAddnew.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  doHideShowAddnewdocDilogStatus:
    state.docHandlerProcess.doHideShowAddnewdocDilogStatus,
  forceReloadDocumentAddnewDataTable:
    state.docHandlerProcess.forceReloadDocumentAddnewDataTable,
});

export default connect(mapStateToProps)(DocumentlistAddnew);
