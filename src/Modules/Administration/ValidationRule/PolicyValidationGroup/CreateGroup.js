import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { policyValidationRule } from "../../../../services/policyValidationRuleService";
import ReactDOM from 'react-dom';

const url = window.location.href.split("/");
var id = url[url.length - 1];

class PolicyValidationGroupCreate extends Component {
  constructor(props) {
    super(props);
    this.apiService = new policyValidationRule();
    this.state = {
      isFetching: false,
      getProductDD: [],
      getvalidationRuleLoad: [],
      getvalidationRuleLoadCombo: [],
      editFormData: [],
      editDataLoaded: false,
      editSeletedValues: false,
    };

    this.input = [];
    this.selectedValue = {};
    this.fromSubmit = this.fromSubmit.bind(this);
    this.onChangeProduct = this.onChangeProduct.bind(this);
    //generate dynamic unique key for dropdown options
    this.generateKey = this.generateKey.bind(this);
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);

    if (isNaN(id) == true) {
      id = '';
    }
  }

  componentDidMount() {
    this.renderMyData();
  }

  renderMyData() {
    //fetch data of dropdowns etc.
    this.props.dispatch(this.apiService.fetchPolicyValidationGetProductDD(id))
      .then((resp) => {
        this.setState({
          isFetching: true,
        });

        let editFormDataArr = this.props.getProductDD.data.data;
        let productsData = this.props.getProductDD.data.getProductDD;
        let productsOptions = [];

        for (let i = 0; i < productsData.length; i++) {
          productsOptions.push(<option key={productsData[i].n_ProductId_PK} value={productsData[i].n_ProductId_PK}>{productsData[i].s_ProductName}</option>);
        }

        this.setState({
          editFormData: editFormDataArr,
          getProductDD: productsOptions,
          isFetching: false,
        });
      }).catch((error) => { // catch
        this.error('Error in fetching validation rule group products.');
      });
  }

  componentDidUpdate() {
    if (typeof this.state.editFormData !== 'undefined' && Object.keys(this.state.editFormData).length > 0 && this.state.editDataLoaded == false) {
      this.setState({
        editDataLoaded: true
      });
      ReactDOM.findDOMNode(this.refs['n_PrValidationRuleGroupMasters_PK']).value = this.state.editFormData.n_PrValidationRuleGroupMasters_PK;
      ReactDOM.findDOMNode(this.refs['s_RuleCode']).value = this.state.editFormData.s_RuleCode;
      ReactDOM.findDOMNode(this.refs['s_RuleDesc']).value = this.state.editFormData.s_RuleDesc;
      //For React 16 and React >=15.6 Value Setter and Change event fire
      var nativeSelectValueSetter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, "value").set;
      var manualChanageEvent = new Event('change', { bubbles: true });
      nativeSelectValueSetter.call(ReactDOM.findDOMNode(this.refs['n_Product_FK']), this.state.editFormData.n_Product_FK);
      ReactDOM.findDOMNode(this.refs['n_Product_FK']).dispatchEvent(manualChanageEvent);
    }
  }

  success(msg) {
    return toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  error(msg) {
    return toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  }

  fromSubmit(event) {
    event.preventDefault();

    if (ReactDOM.findDOMNode(this.refs['s_RuleCode']).value == '') {
      alert('Please Enter Group Rule Code.');
      ReactDOM.findDOMNode(this.refs['s_RuleCode']).focus();
      return false;
    }

    if (ReactDOM.findDOMNode(this.refs['s_RuleDesc']).value == '') {
      alert('Please Enter Description Of Group Rule.');
      ReactDOM.findDOMNode(this.refs['s_RuleDesc']).focus();
      return false;
    }

    if (ReactDOM.findDOMNode(this.refs['n_Product_FK']).value == '') {
      alert('Please Select Product.');
      ReactDOM.findDOMNode(this.refs['n_Product_FK']).focus();
      return false;
    }

    //remove null object
    Object.keys(this.input).forEach((key) => (this.input[key] == null) && delete this.input[key]);
    let formData = {};

    //gather form data
    for (const field in this.input) {
      formData[ReactDOM.findDOMNode(this.input[field]).name] = ReactDOM.findDOMNode(this.input[field]).value;
    }

    for (const field in this.refs) {
      formData[ReactDOM.findDOMNode(this.refs[field]).name] = ReactDOM.findDOMNode(this.refs[field]).value;
    }

    //create data encoded string
    formData = Object.keys(formData).map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(formData[k])).join('&')

    this.props.dispatch(this.apiService.savePolicyRuleGroup(formData)).then((resp) => {
      if (this.props.saveResponse.code == 200) {
        this.success(this.props.saveResponse.message);
        ReactDOM.findDOMNode(this.refs.groupForm).reset();
        setTimeout(function () {
          window.location = '/administration/policy/view-validation-group';
        }, 5000);
      }
    }).catch((error) => { // catch
      this.error('Error in saving validation rule group.');
    });
  }

  onChangeProduct() {
    let formData = { "n_Product_FK": ReactDOM.findDOMNode(this.refs.n_Product_FK).value, "n_PrValidationRuleGroupMasters_PK": ReactDOM.findDOMNode(this.refs.n_PrValidationRuleGroupMasters_PK).value };

    this.props.dispatch(this.apiService.fetchPolicyValidationRuleLoad(formData))
      .then((resp) => {
        let vadliatoinRuleLoad = this.props.getvalidationRuleLoad.data;
        let vadliatoinRuleLoadArr = [];
        //generate select
        for (let i = 0; i < vadliatoinRuleLoad.data.length; i++) {

          //generate options
          let is_object = vadliatoinRuleLoad.validationRuleGroupDD[vadliatoinRuleLoad.data[i].n_PrValidationCodeMaster_PK]
          let options = [];
          if (typeof is_object.value === 'object' && is_object.value !== null) {
            for (let j = 0; j < is_object.value.length; j++) {
              if (typeof is_object.selected[j] !== 'undefined' && is_object.selected[j] !== "") {
                this.selectedValue['nPrValidationRulesFK_' + vadliatoinRuleLoad.data[i].n_PrValidationCodeMaster_PK] = is_object.value[j];
                options.push(<option key={this.generateKey(is_object.value[j])} value={is_object.value[j]}>{is_object.s_RuleCode[j]}</option>);
              } else {
                options.push(<option key={this.generateKey(is_object.value[j])} value={is_object.value[j]}>{is_object.s_RuleCode[j]}</option>);
              }
            }
          }

          //push select and options in single array to generate a element
          vadliatoinRuleLoadArr.push(
            <FormGroup key={'div_vadliatoinRuleLoad_' + vadliatoinRuleLoad.data[i].n_PrValidationCodeMaster_PK}>
              <div className="row">
                <Label htmlFor={'nPrValidationRulesFK_' + vadliatoinRuleLoad.data[i].n_PrValidationCodeMaster_PK} className="col-md-3">{vadliatoinRuleLoad.data[i].s_FieldScreenLabel + ':'}</Label>
                <Input type="select" className="col-md-7" id={'nPrValidationRulesFK_' + vadliatoinRuleLoad.data[i].n_PrValidationCodeMaster_PK} ref={(ref) => this.input['nPrValidationRulesFK_' + vadliatoinRuleLoad.data[i].n_PrValidationCodeMaster_PK] = ref} name={'TbPrvalidationrulegroupDetail[' + vadliatoinRuleLoad.data[i].n_PrValidationCodeMaster_PK + '][nPrValidationRulesFK]'}>
                  {options}
                </Input>
              </div>
            </FormGroup>
          );
        }
        this.setState({
          getvalidationRuleLoad: vadliatoinRuleLoadArr
        });
      }).catch((error) => { // catch
        this.error('Error in fetching validation rule load data.');
      });

    this.props.dispatch(this.apiService.fetchPolicyValidationRuleLoadCombo(formData))
      .then((resp) => {
        let vadliatoinRuleLoadCombo = this.props.getvalidationRuleLoadCombo.data;
        let vadliatoinRuleLoadComboArr = [];
        //generate select
        for (let i = 0; i < vadliatoinRuleLoadCombo.data.length; i++) {

          //generate options
          let is_object = vadliatoinRuleLoadCombo.validationRuleGroupComboDD[vadliatoinRuleLoadCombo.data[i].n_PrValidationRuleMaster_PK]
          let options = [];
          if (typeof is_object.value === 'object' && is_object.value !== null) {
            for (let j = 0; j < is_object.value.length; j++) {
              if (typeof is_object.selected[j] !== 'undefined' && is_object.selected[j] !== "") {
                this.selectedValue['n_PrValidationCodeMasters_FK_' + vadliatoinRuleLoadCombo.data[i].n_PrValidationCodeMasters_FK] = is_object.value[j];
                options.push(<option key={this.generateKey(is_object.value[j])} value={is_object.value[j]}>{is_object.s_RuleCode[j]}</option>);
              } else {
                options.push(<option key={this.generateKey(is_object.value[j])} value={is_object.value[j]}>{is_object.s_RuleCode[j]}</option>);
              }
            }
          }

          //push select and options in single array to generate a element
          vadliatoinRuleLoadComboArr.push(
            <FormGroup key={'div_vadliatoinRuleLoadCombo_' + vadliatoinRuleLoadCombo.data[i].n_PrValidationCodeMasters_FK}>
              <div className="row">
                <Label htmlFor={'n_PrValidationCodeMasters_FK_' + vadliatoinRuleLoadCombo.data[i].n_PrValidationCodeMasters_FK} className="col-md-3">{vadliatoinRuleLoadCombo.data[i].s_FieldScreenLabel + ':'}</Label>
                <Input type="select" className="col-md-7" id={'n_PrValidationCodeMasters_FK_' + vadliatoinRuleLoadCombo.data[i].n_PrValidationCodeMasters_FK} ref={(ref) => this.input['n_PrValidationCodeMasters_FK_' + vadliatoinRuleLoadCombo.data[i].n_PrValidationCodeMasters_FK] = ref}
                  name={'TbPrvalidationrulegroupDetail[' + vadliatoinRuleLoadCombo.data[i].n_PrValidationCodeMasters_FK + '][nPrValidationRulesFK]'}>
                  {options}
                </Input>
              </div>
            </FormGroup>
          );
        }

        this.setState({
          getvalidationRuleLoadCombo: vadliatoinRuleLoadComboArr
        });
      }).catch((error) => { // catch
        this.error('Error in fetching validation rule load combo data.');
      });

    //In Edit Select Previous Value (Selected Value)
    var selectedValueArr = this.selectedValue;
    var dropDownInputs = this.input;
    var thisRefrence = this;
    setTimeout(function () {
      if (Object.keys(selectedValueArr).length > 0 && thisRefrence.state.editSeletedValues == false) {
        for (var key in selectedValueArr) {
          ReactDOM.findDOMNode(dropDownInputs[key]).value = selectedValueArr[key];
          ReactDOM.findDOMNode(dropDownInputs[key]).setAttribute('selected', 'selected');
        }

        thisRefrence.setState({
          editSeletedValues: true
        });
      }
    }, 1200);

  }

  render() {
    const containerStyle = {
      zIndex: 1999
    };

    if (this.state.getProductDD.length == 0) {
      return <div className="animated fadeIn pt-1 text-center">Loading...</div>;
    } else {
      return (
        <div className="row">
          <div className="animated fadeIn col-md-12">
            <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
            <Card>
              <form id="groupForm" onSubmit={this.fromSubmit} ref={'groupForm'}>
                <CardHeader id="formHeader">Create Group</CardHeader>
                <CardBody>
                  <Input type="hidden" id="n_PrValidationRuleGroupMasters_PK" ref={'n_PrValidationRuleGroupMasters_PK'} name="n_PrValidationRuleGroupMasters_PK" />
                  <FormGroup>
                    <div className="row">
                      <Label htmlFor="s_RuleCode" className="col-md-3">Group Rule Code:</Label>
                      <Input type="text" className="col-md-7 text-uppercase" id="s_RuleCode" ref={'s_RuleCode'} name="s_RuleCode" placeholder="Enter Group Rule Code" required />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="row">
                      <Label htmlFor="s_RuleDesc" className="col-md-3">Description Of Group Rule:</Label>
                      <Input type="textarea" className="col-md-7" id="s_RuleDesc" ref="s_RuleDesc" name="s_RuleDesc" required />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="row">
                      <Label htmlFor="n_Product_FK" className="col-md-3">Select Product:</Label>
                      <Input type="select" className="col-md-7" id="n_Product_FK" ref="n_Product_FK" name="n_Product_FK" onChange={this.onChangeProduct} required>
                        <option value="">Select Product</option>
                        {this.state.getProductDD}
                      </Input>
                    </div>
                  </FormGroup>
                  {this.state.getvalidationRuleLoad}
                  {this.state.getvalidationRuleLoadCombo}
                </CardBody>
                <CardFooter>
                  <div className="text-right">
                    <Button type="submit" id="ruleFormSubmit" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                    <Button type="reset" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  getProductDD: state.Administration.fetchPolicyValidationGetProductDD,
  getvalidationRuleLoad: state.Administration.fetchPolicyValidationRuleLoad,
  getvalidationRuleLoadCombo: state.Administration.fetchPolicyValidationRuleLoadCombo,
  saveResponse: state.Administration.savePolicyRuleGroup,
});


export default connect(mapStateToProps)(PolicyValidationGroupCreate);