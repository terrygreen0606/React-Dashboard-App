import React, { Component } from "react";
import { connect } from "react-redux";

// include Loader
import { LoadingOverlay, Loader } from "react-overlay-loader";
import "react-overlay-loader/styles.css";

class OverloadingBlockHp extends Component {
  constructor(props) {
    super(props);
    this.loadingVariableOfProps = this.props.loadingStateKey;
    this.state = {};
  }

  render() {
    let loaderBar = <Loader loading={this.props.loadingAddProcss} />;
    if (this.loadingVariableOfProps === "loadingListProcss") {
      loaderBar = <Loader loading={this.props.loadingListProcss} />;
    }else if (this.loadingVariableOfProps === "loadingModuleAddProcss") {
      loaderBar = <Loader loading={this.props.loadingModuleAddProcss} />;
    }else if (this.loadingVariableOfProps === "loadingModuleListProcss") {
      loaderBar = <Loader loading={this.props.loadingModuleListProcss} />;
    }else if (this.loadingVariableOfProps === "loadingSubModuleAddProcss") {
      loaderBar = <Loader loading={this.props.loadingSubModuleAddProcss} />;
    }else if (this.loadingVariableOfProps === "loadingSubModuleListProcss") {
      loaderBar = <Loader loading={this.props.loadingSubModuleListProcss} />;
    }else if (this.loadingVariableOfProps === "loadingSubModuleAddProcssModuleDD") {
      loaderBar = <Loader loading={this.props.loadingSubModuleAddProcssModuleDD} />;
    }else if (this.loadingVariableOfProps === "loadingLayerDoctypeDD") {
      loaderBar = <Loader loading={this.props.loadingLayerDoctypeDD} />;
    }else if (this.loadingVariableOfProps === "loadingAclmngLevelDD") {
      loaderBar = <Loader loading={this.props.loadingAclmngLevelDD} />;
    }else if (this.loadingVariableOfProps === "loadingAclmngDeniedDetatable") {
      loaderBar = <Loader loading={this.props.loadingAclmngDeniedDetatable} />;
    }else if (this.loadingVariableOfProps === "loadingAclmngAppliedDetatable") {
      loaderBar = <Loader loading={this.props.loadingAclmngAppliedDetatable} />;
    }else if (this.loadingVariableOfProps === "loadingAclmngSubmoduleDetatable") {
      loaderBar = <Loader loading={this.props.loadingAclmngSubmoduleDetatable} />;
    }else if (this.loadingVariableOfProps === "loadingLayerProductDataTable") {
      loaderBar = <Loader loading={this.props.loadingLayerProductDataTable} />;
    }else if (this.loadingVariableOfProps === "loadingLayerDoctypeDataTable") {
      loaderBar = <Loader loading={this.props.loadingLayerDoctypeDataTable} />;
    }else if (this.loadingVariableOfProps === "loadingLayerFormnameDataTable") {
      loaderBar = <Loader loading={this.props.loadingLayerFormnameDataTable} />;
    }else if (this.loadingVariableOfProps === "loadingLayerDocumentDataTable") {
      loaderBar = <Loader loading={this.props.loadingLayerDocumentDataTable} />;
    }else if (this.loadingVariableOfProps === "loadingLayerDocumentAddnewDataTable") {
      loaderBar = <Loader loading={this.props.loadingLayerDocumentAddnewDataTable} />;
    }else if (this.loadingVariableOfProps === "loadingLayerDocumentuploaderDataTable") {
      loaderBar = <Loader loading={this.props.loadingLayerDocumentuploaderDataTable} />;
    }
    
    
    return (
      <div>
        <LoadingOverlay style={{ backgroundColor: "papayawhip" }}>          
          {loaderBar}
          <div>{this.props.centerContent}</div>
        </LoadingOverlay>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loadingAddProcss: state.levelManageProcess.loadingAddProcss,
  loadingListProcss: state.levelManageProcess.loadingListProcss,

  loadingModuleAddProcss: state.moduleManageProcess.loadingAddProcss,
  loadingModuleListProcss: state.moduleManageProcess.loadingListProcss,

  loadingSubModuleAddProcss: state.submoduleManageProcess.loadingAddProcss,
  loadingSubModuleListProcss: state.submoduleManageProcess.loadingListProcss,
  loadingSubModuleAddProcssModuleDD: state.submoduleManageProcess.loadingAddProcssModuleDD,

  loadingAclmngLevelDD: state.aclManageProcess.loadingAclmngLevelDD,
  loadingAclmngDeniedDetatable: state.aclManageProcess.loadingAclmngDeniedDetatable,
  loadingAclmngAppliedDetatable: state.aclManageProcess.loadingAclmngAppliedDetatable,

  loadingAclmngSubmoduleDetatable: state.aclManageProcess.loadingAclmngSubmoduleDetatable,

  loadingLayerProductDataTable: state.docHandlerProcess.loadingLayerProductDataTable,
  loadingLayerDoctypeDataTable: state.docHandlerProcess.loadingLayerDoctypeDataTable,
  loadingLayerDoctypeDD: state.docHandlerProcess.loadingLayerDoctypeDD,
  loadingLayerFormnameDataTable: state.docHandlerProcess.loadingLayerFormnameDataTable,
  loadingLayerDocumentDataTable: state.docHandlerProcess.loadingLayerDocumentDataTable,
  loadingLayerDocumentAddnewDataTable: state.docHandlerProcess.loadingLayerDocumentAddnewDataTable,

  loadingLayerDocumentuploaderDataTable: state.docHandlerProcess.loadingLayerDocumentuploaderDataTable,


});

export default connect(mapStateToProps)(OverloadingBlockHp);
