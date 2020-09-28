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
import * as levelManageServicesObj from "../../../../services/levelManageServices";
import {
  loadingTrueAddBtn,
  reloadLevelmngLevelList
} from "../../../../store/actions/administrationAction";

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
      addEditFormLevelName: this.props.addEditFormLevelName,
      addEditFormLevelCode: this.props.addEditFormLevelCode,      
      addEditFormLevelCode_isDisabled:false,
      addEditFormLevelMainCode: this.props.addEditFormLevelMainCode,
      addEditFormLevelRecPK: this.props.addEditFormLevelRecPK
    };

    this.onClickBtnFormSubmitHandle = this.onClickBtnFormSubmitHandle.bind(
      this
    );
  }

  addEditFormSubmitHandler(params) {
    this.props.dispatch(levelManageServicesObj.loadLevelDataTable(params));
  }
  onClickBtnFormSubmitHandle(e) {
    e.preventDefault();
    this.props.dispatch(loadingTrueAddBtn());
    const SessionData = JSON.parse(sessionStorage.getItem("user"));
    let formSubmitedData = new FormData(e.target);
    formSubmitedData.append("Admin_ID", SessionData.Admin_ID);
    this.props
      .dispatch(levelManageServicesObj.addNewLevel(formSubmitedData))
      .then(() => {
        /*const { pageTemp, sizePerPageTemp } = this.state;
        const params = {
          pageTemp,
          sizePerPageTemp
        };
        this.props.dispatch(levelManageServicesObj.loadLevelDataTable(params));
        */
        this.setState({
          addEditFormLevelName: "",
          addEditFormLevelCode: "",
          addEditFormLevelMainCode: "",
          addEditFormLevelRecPK: ""
        });
        this.props.dispatch(reloadLevelmngLevelList());
      });
  }

  toInputUppercase = event => {
    let CurrentTargatedValue = event.target.value;
    CurrentTargatedValue = CurrentTargatedValue.replace(/\s+/g, "_");
    CurrentTargatedValue = CurrentTargatedValue.replace(/-/g, "_");
    event.target.value = ("" + CurrentTargatedValue).toUpperCase();
  };
  handleChangeLevel = (fieldStateRef, event) => {
    switch (fieldStateRef) {
      case "addEditFormLevelName":
        this.setState({ addEditFormLevelName: event.target.value });
        return true;
      case "addEditFormLevelCode":
        this.setState({ addEditFormLevelCode: event.target.value });
        return true;
      case "addEditFormLevelMainCode":
        this.setState({ addEditFormLevelMainCode: event.target.value });
        return true;
      case "addEditFormLevelRecPK":
        this.setState({ addEditFormLevelRecPK: event.target.value });
        return true;
      default:
        return true;
    }
  };

  handleResetForm = () => {    
    this.props.dispatch(levelManageServicesObj.resetformLevel());
    this.setState({
      addEditFormLevelName: "",
      addEditFormLevelCode: "",      
      addEditFormLevelMainCode: "",
      addEditFormLevelRecPK: ""
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {}
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.addEditFormLevelName !== this.props.addEditFormLevelName) {
      this.setState({
        addEditFormLevelName: this.props.addEditFormLevelName
      });
    }

    if (prevProps.addEditFormLevelCode !== this.props.addEditFormLevelCode) {
      this.setState({
        addEditFormLevelCode: this.props.addEditFormLevelCode,
        addEditFormLevelCode_isDisabled: this.props.addEditFormLevelCode !== '' ? true : false,
      });
    }

    if (
      prevProps.addEditFormLevelMainCode !== this.props.addEditFormLevelMainCode
    ) {
      this.setState({
        addEditFormLevelMainCode: this.props.addEditFormLevelMainCode
      });
    }
    if (prevProps.addEditFormLevelRecPK !== this.props.addEditFormLevelRecPK) {
      this.setState({
        addEditFormLevelRecPK: this.props.addEditFormLevelRecPK
      });
    }
  }

  render() {
    const {
      addEditFormLevelName,
      addEditFormLevelCode,
      addEditFormLevelCode_isDisabled,
      addEditFormLevelMainCode,
      addEditFormLevelRecPK
    } = this.state;



    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>User Level</strong> Add/Edit Form
          </CardHeader>
          <CardBody>
            <Form
              id="formToSubmit"
              ref="formToSubmit"
              onSubmit={this.onClickBtnFormSubmitHandle}
              method="post"
              inline
            >
              <FormGroup className="pr-5">
                <Label htmlFor="exampleInputName2" className="pr-1 ">
                  Level Name{" "}
                </Label>
                <Input
                  type="text"
                  id="Level_Name"
                  name="Level_Name"
                  ref="Level_Name"
                  className="input-m"
                  placeholder=""
                  required
                  onChange={e =>
                    this.handleChangeLevel("addEditFormLevelName", e)
                  }
                  value={addEditFormLevelName}
                />
              </FormGroup>
              <FormGroup className="pr-5">
                <Label htmlFor="exampleInputName2" className="pr-1">
                  Level Code{" "}
                </Label>
                <Input
                  type="text"
                  id="Level_Code"
                  name="Level_Code"
                  ref="Level_Code"
                  className="input-m text-uppercase"
                  placeholder=""
                  required
                  onChange={e =>
                    this.handleChangeLevel("addEditFormLevelCode", e)
                  }
                  onInput={this.toInputUppercase.bind(this)}
                  value={addEditFormLevelCode}
                  readOnly={addEditFormLevelCode_isDisabled}
                />
              </FormGroup>
              <FormGroup className="pr-5">
                <Label htmlFor="exampleInputName2" className="pr-1">
                  Main Level Code{" "}
                </Label>
                <Input
                  type="select"
                  id="Main_Level_Code"
                  name="Main_Level_Code"
                  ref="Main_Level_Code"
                  value={addEditFormLevelMainCode || ""}
                  onChange={e =>
                    this.handleChangeLevel("addEditFormLevelMainCode", e)
                  }
                >
                  <option value="EMPLOYEE">Employee</option>
                  <option value="AGENT">Agent</option>
                </Input>
                <Input
                  type="hidden"
                  id="RowPK"
                  name="RowPK"
                  ref="RowPK"
                  value={addEditFormLevelRecPK}
                />
              </FormGroup>
            </Form>
          </CardBody>
          <CardFooter>
            <Button
              type="submit"
              form="formToSubmit"
              size="m"
              color="primary"
              className="float-right"
              disabled={this.props.isLoadingAddBtn ? true : false}
            >
              <i className="fa fa-dot-circle-o"></i>
              {this.props.isLoadingAddBtn ? " Saving..." : " Submit"}
            </Button>
            <Button
              type="reset"
              form="formToSubmit"
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
  isLoadingAddBtn: state.levelManageProcess.isLoadingAddBtn,
  pageTemp: state.levelManageProcess.pageTemp,
  sizePerPageTemp: state.levelManageProcess.sizePerPageTemp,
  addEditFormLevelName:
    state.levelManageProcess.addEditFormFieldValues.UserLevel_Name,
  addEditFormLevelCode:
    state.levelManageProcess.addEditFormFieldValues.s_UserLevelCode,
  addEditFormLevelMainCode:
    state.levelManageProcess.addEditFormFieldValues.s_UserLevelMainCode,
  addEditFormLevelRecPK:
    state.levelManageProcess.addEditFormFieldValues.UserLevel_ID
});

export default connect(mapStateToProps)(AddProcess);
