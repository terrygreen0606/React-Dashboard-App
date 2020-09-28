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
import * as submoduleManageServicesObj from "../../../../services/submoduleManageServices";
import { loadingTrueAddBtnMngmodule } from "../../../../store/actions/administrationAction";
import OverloadingBlockHp from "../ManageLevel/OverloadingBlockHp";
import AddProcessSelectModuleComp from "./AddProcessSelectModuleComp";

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
    this.props.dispatch(submoduleManageServicesObj.loadDataTable(params));
  }
  onClickBtnFormSubmitHandle(e) {
    e.preventDefault();
    this.props.dispatch(loadingTrueAddBtnMngmodule());
    const SessionData = JSON.parse(sessionStorage.getItem("user"));
    let formSubmitedData = new FormData(e.target);
    formSubmitedData.append("Admin_ID", SessionData.Admin_ID);
    this.props
      .dispatch(submoduleManageServicesObj.addNewRecord(formSubmitedData))
      .then(() => {
        const { pageTemp, sizePerPageTemp } = this.state;
        const searchKey = "";
        const params = {
          pageTemp,
          sizePerPageTemp,
          searchKey
        };
        this.props.dispatch(submoduleManageServicesObj.loadDataTable(params));
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
    this.props.dispatch(submoduleManageServicesObj.resetformSubmodel());
    this.setState({
      addEditFormModuleName: "",
      addEditFormModuleCode: "",
      addEditFormModuleCode_isDisabled: false,
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
        addEditFormModuleCode_isDisabled:
          this.props.addEditFormModuleCode !== "" ? true : false
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
              id="formToSubmitSubModuleMng"
              ref="formToSubmitSubModuleMng"
              onSubmit={this.onClickBtnFormSubmitHandle}
              method="post"
              inline
            >
              <FormGroup className="pr-5">
                <Label htmlFor="exampleInputName2" className="pr-1 ">
                  Select Module{" "}
                </Label>
                <OverloadingBlockHp
                  loadingStateKey={"loadingSubModuleAddProcssModuleDD"}
                  centerContent={<AddProcessSelectModuleComp />}
                  selectedIndex={
                    this.props.addEditFormFieldValues.ModuleDDSelected
                  }
                />
              </FormGroup>

              <FormGroup className="pr-5">
                <Label htmlFor="exampleInputName2" className="pr-1 ">
                  Sub Module Name{" "}
                </Label>
                <Input
                  type="text"
                  id="Module_Name"
                  name="Module_Name"
                  ref="addEditFormModuleName"
                  className="input-m"
                  placeholder=""
                  required
                  onChange={e => this.handleChange("addEditFormModuleName", e)}
                  value={addEditFormModuleName}
                />
              </FormGroup>
              <FormGroup className="pr-5">
                <Label htmlFor="exampleInputName2" className="pr-1">
                  Sub Module Code{" "}
                </Label>
                <Input
                  type="text"
                  id="Module_Code"
                  name="Module_Code"
                  ref="addEditFormModuleCode"
                  className="input-m text-uppercase"
                  placeholder=""
                  required
                  onChange={e => this.handleChange("addEditFormModuleCode", e)}
                  onInput={this.toInputUppercase.bind(this)}
                  value={addEditFormModuleCode}
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
              form="formToSubmitSubModuleMng"
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
              form="formToSubmitSubModuleMng"
              size="m"
              color={"secondary"}
              className={"float-left"}
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
  isLoadingAddBtnMngmodule:
    state.submoduleManageProcess.isLoadingAddBtnMngmodule,
  pageTemp: state.submoduleManageProcess.pageTemp,
  sizePerPageTemp: state.submoduleManageProcess.sizePerPageTemp,
  addEditFormFieldValues: state.submoduleManageProcess.addEditFormFieldValues,
  addEditFormModuleName:
    state.submoduleManageProcess.addEditFormFieldValues.s_UserSubModuleName,
  addEditFormModuleCode:
    state.submoduleManageProcess.addEditFormFieldValues.s_UserSubModuleCode,
  addEditFormModuleRecPK:
    state.submoduleManageProcess.addEditFormFieldValues.n_UserSubModule_PK
});

export default connect(mapStateToProps)(AddProcess);
