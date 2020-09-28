import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  FormGroup,
  Button,
  Input,
  Label
} from "reactstrap";
import * as moduleManageServicesObj from "../../../../services/moduleManageServices";
import { loadingTrueAddBtnMngmodule ,reloadModulemngModuleList} from "../../../../store/actions/administrationAction";

class AddProcess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      loading: true,
      formElmentsCollection: [],
      pageTemp: this.props.pageTemp,
      sizePerPageTemp: this.props.sizePerPageTemp,
      //-----------------
      addEditFormModuleName: props.addEditFormModuleName,
      addEditFormModuleCode: props.addEditFormModuleCode,
      addEditFormModuleCode_isDisabled: false,
      addEditFormModuleRecPK: props.addEditFormModuleRecPK
    };

    this.onClickBtnFormSubmitHandle = this.onClickBtnFormSubmitHandle.bind(
      this
    );
  }

  addEditFormSubmitHandler(params) {
    this.props.dispatch(moduleManageServicesObj.loadDataTable(params));
  }
  onClickBtnFormSubmitHandle(e) {
    e.preventDefault();
    this.props.dispatch(loadingTrueAddBtnMngmodule());
    const SessionData = JSON.parse(sessionStorage.getItem("user"));
    let formSubmitedData = new FormData(e.target);
    formSubmitedData.append("Admin_ID", SessionData.Admin_ID);
    this.props
      .dispatch(moduleManageServicesObj.addNewRecord(formSubmitedData))
      .then(() => {
        
        this.setState({
          addEditFormModuleName: "",
          addEditFormModuleCode: "",          
          addEditFormModuleRecPK: ""
        });
        this.props.dispatch(reloadModulemngModuleList());
      });
  }

  toInputUppercase = event => {
    let CurrentTargatedValue = event.target.value;
    CurrentTargatedValue = CurrentTargatedValue.replace(/\s+/g, "_");
    CurrentTargatedValue = CurrentTargatedValue.replace(/-/g, "_");
    event.target.value = ("" + CurrentTargatedValue).toUpperCase();
  };

  handleChange = (fieldStateRef, event) => {
    switch (fieldStateRef) {
      case "addEditFormModuleName":
        this.setState({ addEditFormModuleName: event.target.value });
        return true;
      case "addEditFormModuleCode":
        this.setState({ addEditFormModuleCode: event.target.value });        
        return true;
      default:
        return true;
    }
  };

  handleResetForm = () => {
    this.props.dispatch(moduleManageServicesObj.resetformModel());
    this.setState({
      addEditFormModuleName: "",
      addEditFormModuleCode: "",          
      addEditFormModuleRecPK: ""
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.addEditFormModuleName !== this.props.addEditFormModuleName) {
      this.setState({
        addEditFormModuleName: this.props.addEditFormModuleName
      });
    }
    if (prevProps.addEditFormModuleCode !== this.props.addEditFormModuleCode) {
      this.setState({
        addEditFormModuleCode: this.props.addEditFormModuleCode,
        addEditFormModuleCode_isDisabled: this.props.addEditFormModuleCode !== '' ? true : false,

      });
    }
    if (
      prevProps.addEditFormModuleRecPK !== this.props.addEditFormModuleRecPK
    ) {
      this.setState({
        addEditFormModuleRecPK: this.props.addEditFormModuleRecPK
      });
    }
  }
  render() {
    const {
      addEditFormModuleName,
      addEditFormModuleCode,
      addEditFormModuleCode_isDisabled,
      addEditFormModuleRecPK
    } = this.state;

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>User Module</strong> Add/Edit Form
          </CardHeader>
          <CardBody>
            <Form
              id="formToSubmitModuleMng"
              ref="formToSubmitModuleMng"
              onSubmit={this.onClickBtnFormSubmitHandle}
              method="post"
              inline
            >
              <FormGroup className="pr-5">
                <Label htmlFor="exampleInputName2" className="pr-1 ">
                  Module Name{" "}
                </Label>
                <Input
                  type="text"
                  id="Module_Name"
                  name="Module_Name"
                  ref="Module_Name"
                  className="input-m"
                  placeholder=""
                  required
                  value={addEditFormModuleName}
                  onChange={e => this.handleChange("addEditFormModuleName", e)}
                />
              </FormGroup>
              <FormGroup className="pr-5">
                <Label htmlFor="exampleInputName2" className="pr-1">
                  Module Code{" "}
                </Label>
                <Input
                  type="text"
                  id="Module_Code"
                  name="Module_Code"
                  ref="Module_Code"
                  className="input-m text-uppercase"
                  placeholder=""
                  required
                  value={addEditFormModuleCode}
                  onChange={e => this.handleChange("addEditFormModuleCode", e)}
                  onInput={this.toInputUppercase.bind(this)}
                  readOnly={addEditFormModuleCode_isDisabled}
                />
                <Input
                  type="hidden"
                  id="RowPK"
                  name="RowPK"
                  ref="RowPK"
                  value={addEditFormModuleRecPK}
                />
              </FormGroup>
            </Form>
          </CardBody>
          <CardFooter>
            <Button
              type="submit"
              form="formToSubmitModuleMng"
              size="m"
              color="primary"
              className="float-right"
              disabled={this.props.isLoadingAddBtnMngmodule ? true : false}
            >
              <i className="fa fa-dot-circle-o"></i>
              {this.props.isLoadingAddBtnMngmodule ? " Saving..." : " Submit"}
            </Button>
            <Button
              type="reset"
              form="formToSubmitModuleMng"
              size="m"
              color="secondary"
              className="float-left"
              onClick={e => this.handleResetForm(e)}
            >
              <i className="fa fa-ban"></i> Reset
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

AddProcess.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoadingAddBtnMngmodule: state.moduleManageProcess.isLoadingAddBtnMngmodule,
  pageTemp: state.moduleManageProcess.pageTemp,
  sizePerPageTemp: state.moduleManageProcess.sizePerPageTemp,
  addEditFormModuleName:
    state.moduleManageProcess.addEditFormFieldValues.s_UserModuleName,
  addEditFormModuleCode:
    state.moduleManageProcess.addEditFormFieldValues.s_UserModuleCode,
  addEditFormModuleRecPK:
    state.moduleManageProcess.addEditFormFieldValues.n_UserModule_PK
});
export default connect(mapStateToProps)(AddProcess);
