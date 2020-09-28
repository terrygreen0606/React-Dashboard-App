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
  Col,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { policyValidationRule } from "../../../../services/policyValidationRuleService";
import './CreateRule.css';
import ReactDOM from 'react-dom';

const url = window.location.href.split("/");
var id = url[url.length - 1];

class PolicyValidationRuleCreate extends Component {
  constructor(props) {
    super(props);
    this.apiService = new policyValidationRule();
    this.state = {
      isFetching: false,
      formOptions: [],
      products: [],
      rulesApplyOn: [],
      ruleForOptions: [],
      mathMaticSymbols: [],
      editRuleData: [],
      ruleForElements: [],
      dropDownTrShowHide: [],
      dropDownTrToShowHide: [],
      textTrShowHide: [],
      textTrToShowHide: [],
      radioTrShowHide: [],
      dynamicDropDownOptions: [],
      dynamicDropDownOptionsSecond: [],
    };

    this.addRow = this.addRow.bind(this);
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeRuleFor = this.onChangeRuleFor.bind(this);
    this.onChangeFormulaExp = this.onChangeFormulaExp.bind(this);
    //generate dynamic unique key for dropdown options
    this.generateKey = this.generateKey.bind(this);

    //array for saving ref
    this.input = [];
    this.div = [];

    if (isNaN(id) == true) {
      id = '';
    }
  }

  generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  }

  componentDidMount() {
    this.renderMyData();

    // on edit fill for with data
    if (id != '' && isNaN(id) == false) {
      var thisRefrence = this;
      thisRefrence.props.dispatch(thisRefrence.apiService.fetchInnerPolicyRule(id))
        .then((resp) => {
          setTimeout(function () {
            let innerRulesData = thisRefrence.props.innerRules.data.innerRules;
            for (let i = 0; i < innerRulesData.length; i++) {
              var RowId = innerRulesData[i].n_PrValidationRuleDetail_PK;

              thisRefrence.state.ruleForElements.push(RowId);
              thisRefrence.setState({
                ruleForElements: thisRefrence.state.ruleForElements,
              })

              //For React 16 and React >=15.6 Value Setter and Change event fire
              var nativeSelectValueSetter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, "value").set;
              var manualChanageEvent = new Event('change', { bubbles: true });

              ReactDOM.findDOMNode(thisRefrence.input['TableRowIncrementNo']).value = RowId;
              nativeSelectValueSetter.call(ReactDOM.findDOMNode(thisRefrence.input['n_PrValidationCodeMasters_FK_' + RowId]), innerRulesData[i].n_PrValidationCodeMasters_FK);
              ReactDOM.findDOMNode(thisRefrence.input['n_PrValidationCodeMasters_FK_' + RowId]).dispatchEvent(manualChanageEvent);
              nativeSelectValueSetter.call(ReactDOM.findDOMNode(thisRefrence.input['s_FormulaExpression_' + RowId]), innerRulesData[i].s_FormulaExpression);
              ReactDOM.findDOMNode(thisRefrence.input['s_FormulaExpression_' + RowId]).dispatchEvent(manualChanageEvent);
              ReactDOM.findDOMNode(thisRefrence.input['s_ConditionBetween_' + RowId]).value = innerRulesData[i].s_ConditionBetween;
              ReactDOM.findDOMNode(thisRefrence.input['s_CompareValueDB_' + RowId]).value = innerRulesData[i].s_CompareValue;
              ReactDOM.findDOMNode(thisRefrence.input['s_CompareValueBetweenDB_' + RowId]).value = innerRulesData[i].s_CompareValueBetween;
              ReactDOM.findDOMNode(thisRefrence.input['n_PrValidationRuleDetail_PK_' + RowId]).value = innerRulesData[i].n_PrValidationRuleDetail_PK;
            }
          }, 1500);
        }).catch((error) => { // catch
          this.error('Error in fetching validation inner rules.');
        });
    }
  }

  renderMyData() {
    //fetch data of dropdowns etc.
    this.props.dispatch(this.apiService.fetchPolicyValidationFormOptions(id))
      .then((resp) => {
        this.setState({
          isFetching: true,
        });

        let productsData = this.props.formOptions.data.n_Product_FKData;
        let productsOptions = [];
        for (let i = 0; i < productsData.length; i++) {
          productsOptions.push(<option key={this.generateKey(productsData[i].n_ProductId_PK)} value={productsData[i].n_ProductId_PK}>{productsData[i].s_ProductName}</option>);
        }

        let rulesData = this.props.formOptions.data.s_RuleApplyOnData.POLICYRULEAPPLYON;
        let rulesOptions = [];
        for (let i = 0; i < rulesData.length; i++) {
          rulesOptions.push(<option key={this.generateKey(rulesData[i].s_AppCodeName)} value={rulesData[i].s_AppCodeName}>{rulesData[i].s_AppCodeNameForDisplay}</option>);
        }

        this.setState({
          formOptions: this.props.formOptions.data,
          products: productsOptions,
          rulesApplyOn: rulesOptions,
          isFetching: false,
          editRuleData: this.props.formOptions.data.n_PrValidationRuleMaster_PKData,
        });

      }).catch((error) => { // catch
        this.error('Error in fetching validation rules products.');
      });

    this.props.dispatch(this.apiService.fetchPolicyRuleForOptions())
      .then((resp) => {
        this.setState({
          isFetching: true,
        });

        let rulesForOptionsArr = this.props.ruleForOptions.data.ValidationCodeDD;
        let rulesForOptions = [];
        for (let i = 0; i < rulesForOptionsArr.length; i++) {
          rulesForOptions.push(<option key={this.generateKey(rulesForOptionsArr[i].n_PrValidationCodeMaster_PK)} value={rulesForOptionsArr[i].n_PrValidationCodeMaster_PK}>{rulesForOptionsArr[i].s_FieldScreenLabel}</option>);
        }

        let numberSignArr = this.props.ruleForOptions.data.numberSign;
        let numberSign = [];
        for (let i = 0; i < numberSignArr.length; i++) {
          var part = numberSignArr[i].split(":");
          numberSign.push(<option key={this.generateKey(part[0])} value={part[0]}>{part[1]}</option>);
        }

        this.setState({
          ruleForOptions: rulesForOptions,
          mathMaticSymbols: numberSign,
          isFetching: false,
        });
      }).catch((error) => { // catch
        this.error('Error in fetching validation rules row data.');
      });

  }

  componentDidUpdate() {
    //on edit fill form with data
    if (id != '' && isNaN(id) == false) {
      if (this.state.products.length > 0 && this.state.editRuleData.length > 0) {
        ReactDOM.findDOMNode(this.input['s_RuleCode']).value = this.state.editRuleData[0].s_RuleCode;
        ReactDOM.findDOMNode(this.input['s_Description']).value = this.state.editRuleData[0].s_Description;
        ReactDOM.findDOMNode(this.input['n_Product_FK']).value = this.state.editRuleData[0].n_Product_FK;
        ReactDOM.findDOMNode(this.input['s_ScreenErrorMsg']).value = this.state.editRuleData[0].s_ScreenErrorMsg;
        ReactDOM.findDOMNode(this.input['s_RuleApplyOn']).value = this.state.editRuleData[0].s_RuleApplyOn;
        ReactDOM.findDOMNode(this.input['s_CanRate']).value = this.state.editRuleData[0].s_CanRate;
        ReactDOM.findDOMNode(this.input['s_CanPrintQuote']).value = this.state.editRuleData[0].s_CanPrintQuote;
        ReactDOM.findDOMNode(this.input['s_CanPrintApp']).value = this.state.editRuleData[0].s_CanPrintApp;
        ReactDOM.findDOMNode(this.input['s_CanBindApp']).value = this.state.editRuleData[0].s_CanBindApp;
        ReactDOM.findDOMNode(this.input['s_CanUnBoundApp']).value = this.state.editRuleData[0].s_CanUnBoundApp;
        ReactDOM.findDOMNode(this.input['s_CanIssue']).value = this.state.editRuleData[0].s_CanIssue;
        ReactDOM.findDOMNode(this.input['s_RuleStatus']).value = this.state.editRuleData[0].s_RuleStatus;
        ReactDOM.findDOMNode(this.input['d_EffectiveDateFrom']).value = this.state.editRuleData[0].d_EffectiveDateFrom;
        ReactDOM.findDOMNode(this.input['d_EffectiveDateTo']).value = this.state.editRuleData[0].d_EffectiveDateTo;
        ReactDOM.findDOMNode(this.input['n_PrValidationRuleMaster_PK']).value = id;
      }
    }
  }

  //add rule for row
  addRow() {
    //append function
    var count = 0;

    //get count by class
    count = document.querySelectorAll('.ruleForDiv').length;

    this.state.ruleForElements.push(count);
    this.state.dropDownTrShowHide.push("none");
    this.state.dropDownTrToShowHide.push("none");
    this.state.textTrShowHide.push("none");
    this.state.textTrToShowHide.push("none");
    this.state.radioTrShowHide.push("none");

    this.setState({
      ruleForElements: this.state.ruleForElements,
      dropDownTrShowHide: this.state.dropDownTrShowHide,
      dropDownTrToShowHide: this.state.dropDownTrToShowHide,
      textTrShowHide: this.state.textTrShowHide,
      textTrToShowHide: this.state.textTrToShowHide,
      radioTrShowHide: this.state.radioTrShowHide,
    })

    ReactDOM.findDOMNode(this.input['TableRowIncrementNo']).value = (count + 1);
  }

  //on change rule for option perform actions
  onChangeRuleFor(event) {
    var getId = event.target.id;
    var RowId = getId.match(/\d+/)[0];

    this.props.dispatch(this.apiService.fetchPolicyRuleForData({ 'n_Product_FK': ReactDOM.findDOMNode(this.input['n_Product_FK']).value, 'n_PrValidationCodeMasters_FK': event.target.value })).then((resp) => {
      var data = this.props.ruleForData.data;
      ReactDOM.findDOMNode(this.input['element_to_display_' + RowId]).value = data.type;
      var oldTrDropDowns = this.state.dropDownTrShowHide.slice();
      var oldTrToDropDowns = this.state.dropDownTrToShowHide.slice();
      var oldTextTr = this.state.textTrShowHide.slice();
      var oldTextTrTo = this.state.textTrToShowHide.slice();
      var oldRadioTr = this.state.radioTrShowHide.slice();

      oldTrDropDowns[RowId] = "none";
      oldTrToDropDowns[RowId] = "none";
      oldTextTr[RowId] = "none";
      oldTextTrTo[RowId] = "none";
      oldRadioTr[RowId] = "none";

      this.setState({
        dropDownTrShowHide: oldTrDropDowns,
        dropDownTrToShowHide: oldTrToDropDowns,
        textTrShowHide: oldTextTr,
        textTrToShowHide: oldTextTrTo,
        radioTrShowHide: oldRadioTr
      });

      if (data.Status == "Y" && data.type == 'DROPDOWN') {
        if (ReactDOM.findDOMNode(this.input['s_FormulaExpression_' + RowId]).value == 8801 || ReactDOM.findDOMNode(this.input['s_FormulaExpression_' + RowId]).value == 8802) {
          oldTrToDropDowns[RowId] = "";
          this.setState({
            dropDownTrToShowHide: oldTrToDropDowns
          });
        }

        oldTrDropDowns[RowId] = "";

        this.setState({
          dropDownTrShowHide: oldTrDropDowns,
        });

        var s_CompareValueDD = ReactDOM.findDOMNode(this.input['s_CompareValueDD_' + RowId]);
        var s_CompareValueBetweenDD = ReactDOM.findDOMNode(this.input['s_CompareValueBetweenDD_' + RowId]);
        var length = s_CompareValueDD.options.length;
        for (var i = length - 1; i >= 0; i--) {
          s_CompareValueDD.options[i].remove();
          s_CompareValueBetweenDD.options[i].remove();
        }

        var array_lenght = Object.keys(data.dropDownValue).length;
        var array_keys = Object.keys(data.dropDownValue);
        var array_values = Object.values(data.dropDownValue);

        for (var i = 0; i < array_lenght; i++) {
          this.state.dynamicDropDownOptions.push(<option key={this.generateKey('first_' + array_keys[i])} value={array_keys[i]}>{array_values[i]}</option>);
          this.state.dynamicDropDownOptionsSecond.push(<option key={this.generateKey('second_' + array_keys[i])} value={array_keys[i]}>{array_values[i]}</option>);
        }

        this.setState({
          dynamicDropDownOptions: this.state.dynamicDropDownOptions,
          dynamicDropDownOptionsSecond: this.state.dynamicDropDownOptionsSecond
        });
      }

      if (data.Status == "Y" && data.type == 'TEXT') {
        oldTrDropDowns[RowId] = "none";
        oldTrToDropDowns[RowId] = "none";
        oldTextTr[RowId] = "";
        oldTextTrTo[RowId] = "none";
        oldRadioTr[RowId] = "none";

        this.setState({
          dropDownTrShowHide: oldTrDropDowns,
          dropDownTrToShowHide: oldTrToDropDowns,
          textTrShowHide: oldTextTr,
          textTrToShowHide: oldTextTrTo,
          radioTrShowHide: oldRadioTr
        });

        if (ReactDOM.findDOMNode(this.input['s_FormulaExpression_' + RowId]).value == 8801 || ReactDOM.findDOMNode(this.input['s_FormulaExpression_' + RowId]).value == 8802) {
          oldTextTrTo[RowId] = "";
          this.setState({
            textTrToShowHide: oldTextTrTo,
          });
        }
      }

      if (data.Status == "Y" && data.type == 'RADIO') {
        oldTrDropDowns[RowId] = "none";
        oldTrToDropDowns[RowId] = "none";
        oldTextTr[RowId] = "none";
        oldTextTrTo[RowId] = "none";
        oldRadioTr[RowId] = "";

        this.setState({
          dropDownTrShowHide: oldTrDropDowns,
          dropDownTrToShowHide: oldTrToDropDowns,
          textTrShowHide: oldTextTr,
          textTrToShowHide: oldTextTrTo,
          radioTrShowHide: oldRadioTr
        });
      }

      //run if id is numeric (on edit)
      if (id != '' && isNaN(id) == false) {
        if (ReactDOM.findDOMNode(this.input['element_to_display_' + RowId]).value == 'DROPDOWN' && ReactDOM.findDOMNode(this.input['s_FormulaExpression_' + RowId]).value == 8801 || ReactDOM.findDOMNode(this.input['s_FormulaExpression_' + RowId]).value == 8802) {
          ReactDOM.findDOMNode(this.input['s_CompareValueDD_' + RowId]).value = ReactDOM.findDOMNode(this.input['s_CompareValueDB_' + RowId]).value
          ReactDOM.findDOMNode(this.input['s_CompareValueBetweenDD_' + RowId]).value = ReactDOM.findDOMNode(this.input['s_CompareValueBetweenDB_' + RowId]).value
        } else if (ReactDOM.findDOMNode(this.input['element_to_display_' + RowId]).value == 'DROPDOWN') {
          ReactDOM.findDOMNode(this.input['s_CompareValueDD_' + RowId]).value = ReactDOM.findDOMNode(this.input['s_CompareValueDB_' + RowId]).value
        } else if (ReactDOM.findDOMNode(this.input['element_to_display_' + RowId]).value == 'TEXT' && ReactDOM.findDOMNode(this.input['s_FormulaExpression_' + RowId]).value == 8801 || ReactDOM.findDOMNode(this.input['s_FormulaExpression_' + RowId]).value == 8802) {
          ReactDOM.findDOMNode(this.input['s_CompareValueText_' + RowId]).value = ReactDOM.findDOMNode(this.input['s_CompareValueDB_' + RowId]).value;
          ReactDOM.findDOMNode(this.input['s_CompareValueBetweenText_' + RowId]).value = ReactDOM.findDOMNode(this.input['s_CompareValueBetweenDB_' + RowId]).value;
        } else if (ReactDOM.findDOMNode(this.input['element_to_display_' + RowId]).value == 'TEXT') {
          ReactDOM.findDOMNode(this.input['s_CompareValueText_' + RowId]).value = ReactDOM.findDOMNode(this.input['s_CompareValueDB_' + RowId]).value;
        }
        else if (ReactDOM.findDOMNode(this.input['element_to_display_' + RowId]).value == 'RADIO') {
          if (ReactDOM.findDOMNode(this.input['s_CompareValueDB_' + RowId]).value == 'Yes') {
            ReactDOM.findDOMNode(this.input['RadioYes_' + RowId]).setAttribute('checked', true);
          } else if (ReactDOM.findDOMNode(this.input['s_CompareValueDB_' + RowId]).value == 'No') {
            ReactDOM.findDOMNode(this.input['RadioNo_' + RowId]).setAttribute('checked', true);
          }
        }
      }
    }).catch((error) => { // catch
      this.error('Error in fetching data according to rules.');
    });
  }


  //on change formulas perform action
  onChangeFormulaExp(event) {

    var getId = event.target.id;
    var RowId = getId.match(/\d+/)[0];
    var oldTrDropDowns = this.state.dropDownTrShowHide.slice();
    var oldTrToDropDowns = this.state.dropDownTrToShowHide.slice();
    var oldTextTr = this.state.textTrShowHide.slice();
    var oldTextTrTo = this.state.textTrToShowHide.slice();
    var oldRadioTr = this.state.radioTrShowHide.slice();

    if (ReactDOM.findDOMNode(this.input['element_to_display_' + RowId]).value == 'DROPDOWN') {
      oldTextTr[RowId] = "none";
      oldTextTrTo[RowId] = "none";
      oldRadioTr[RowId] = "none";
      this.setState({
        textTrShowHide: oldTextTr,
        textTrToShowHide: oldTextTrTo,
        radioTrShowHide: oldRadioTr
      });
      if (ReactDOM.findDOMNode(this.input['s_FormulaExpression_' + RowId]).value == 8801 || ReactDOM.findDOMNode(this.input['s_FormulaExpression_' + RowId]).value == 8802) {
        oldTrToDropDowns[RowId] = "";
        this.setState({
          dropDownTrToShowHide: oldTrToDropDowns,
        });
        //React error : Function components cannot be given refs.
        //for solving this used js to get element by id.
        document.getElementById('valueLabelDropdownTr_' + RowId).innerHTML = 'Value From:';
      } else {
        oldTrToDropDowns[RowId] = "none";
        this.setState({
          dropDownTrToShowHide: oldTrToDropDowns,
        });
        //React error : Function components cannot be given refs.
        //for solving this used js to get element by id.
        document.getElementById('valueLabelDropdownTr_' + RowId).innerHTML = 'Value:';
      }
    }
    else if (ReactDOM.findDOMNode(this.input['element_to_display_' + RowId]).value == 'TEXT') {
      oldTrDropDowns[RowId] = "none";
      oldTrToDropDowns[RowId] = "none";
      oldRadioTr[RowId] = "none";
      this.setState({
        dropDownTrShowHide: oldTrDropDowns,
        dropDownTrToShowHide: oldTrToDropDowns,
        radioTrShowHide: oldRadioTr,
      });
      if (ReactDOM.findDOMNode(this.input['s_FormulaExpression_' + RowId]).value == 8801 || ReactDOM.findDOMNode(this.input['s_FormulaExpression_' + RowId]).value == 8802) {
        oldTextTrTo[RowId] = "";
        this.setState({
          textTrToShowHide: oldTextTrTo
        });
        //React error : Function components cannot be given refs.
        //for solving this used js to get element by id.
        document.getElementById('valueLableTextTr_' + RowId).innerHTML = 'Value From:';
      } else {
        oldTextTrTo[RowId] = "none";
        this.setState({
          textTrToShowHide: oldTextTrTo
        });
        document.getElementById('valueLableTextTr_' + RowId).innerHTML = 'Value:';
      }
    }
    else if (ReactDOM.findDOMNode(this.input['element_to_display_' + RowId]).value == 'RADIO') {
      oldTextTr[RowId] = "none";
      oldTextTrTo[RowId] = "none";
      oldTrDropDowns[RowId] = "none";
      oldTrToDropDowns[RowId] = "none";

      this.setState({
        textTrShowHide: oldTextTr,
        textTrToShowHide: oldTextTrTo,
        dropDownTrShowHide: oldTrDropDowns,
        dropDownTrToShowHide: oldTrToDropDowns
      });
    }
  }

  //submit form function
  onSubmit(event) {
    event.preventDefault();

    if (ReactDOM.findDOMNode(this.input['s_RuleCode']).value == '') {
      alert('Please Enter Rule Code!');
      ReactDOM.findDOMNode(this.input['s_RuleCode']).focus();
      return false;
    }

    if (ReactDOM.findDOMNode(this.input['s_Description']).value == '') {
      alert('Please Enter Description!');
      ReactDOM.findDOMNode(this.input['s_Description']).focus();
      return false;
    }

    if (ReactDOM.findDOMNode(this.input['n_Product_FK']).value == '') {
      alert('Please Select Product!');
      ReactDOM.findDOMNode(this.input['n_Product_FK']).focus();
      return false;
    }

    if (ReactDOM.findDOMNode(this.input['s_ScreenErrorMsg']).value == '') {
      alert('Please Enter Screen Error Msg.!');
      ReactDOM.findDOMNode(this.input['s_ScreenErrorMsg']).focus();
      return false;
    }

    if (ReactDOM.findDOMNode(this.input['s_RuleApplyOn']).value == '') {
      alert('Please Select Rule Apply On.!');
      ReactDOM.findDOMNode(this.input['s_RuleApplyOn']).focus();
      return false;
    }

    if (ReactDOM.findDOMNode(this.input['d_EffectiveDateFrom']).value == '') {
      alert('Please Enter Start Date.!');
      ReactDOM.findDOMNode(this.input['d_EffectiveDateFrom']).focus();
      return false;
    }

    if (ReactDOM.findDOMNode(this.input['d_EffectiveDateTo']).value == '') {
      alert('Please Enter End Date.!');
      ReactDOM.findDOMNode(this.input['d_EffectiveDateTo']).focus();
      return false;
    }

    let formData = {};

    //gather form data
    for (const field in this.input) {
      if (field.indexOf('RadioYes') !== -1 || field.indexOf('RadioNo') !== -1) {
        if (ReactDOM.findDOMNode(this.input[field]).checked) {
          formData[ReactDOM.findDOMNode(this.input[field]).name] = ReactDOM.findDOMNode(this.input[field]).value;
        }
      } else {
        formData[ReactDOM.findDOMNode(this.input[field]).name] = ReactDOM.findDOMNode(this.input[field]).value;
      }
    }

    //create data encoded string
    formData = Object.keys(formData).map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(formData[k])).join('&')

    this.props.dispatch(this.apiService.savePolicyRuleValidation(formData)).then((resp) => {
      if (this.props.saveResponse.code == 200) {
        this.success(this.props.saveResponse.message);
        ReactDOM.findDOMNode(this.refs.ruleForm).reset();
        setTimeout(function () {
          window.location = '/administration/policy/list-validation-rule';
        }, 5000);
      }
    }).catch((error) => { // catch
      this.error('Error in saving validation rule.');
    });
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


  render() {
    const containerStyle = {
      zIndex: 1999
    };

    if (this.state.products.length == 0) {
      return <div className="animated fadeIn pt-1 text-center">Loading...</div>;
    } else {
      return (
        <div className="row">
          <div className="animated fadeIn col-md-12">
            <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
            <Card>
              <form id="ruleForm" ref={'ruleForm'}>
                <CardHeader id="formHeader">Create Rule</CardHeader>
                <CardBody>
                  <FormGroup>
                    <div className="row">
                      <Label htmlFor="s_RuleCode" className="col-md-3">Rule Code:</Label>
                      <Input type="text" className="col-md-7 text-uppercase" id="s_RuleCode" ref={(ref) => this.input['s_RuleCode'] = ref} name="s_RuleCode" placeholder="Enter Rule Code" maxlength="15" required />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="row">
                      <Label htmlFor="s_Description" className="col-md-3">Description Of Rule:</Label>
                      <Input type="textarea" className="col-md-7" id="s_Description" ref={(ref) => this.input['s_Description'] = ref} name="s_Description" required />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="row">
                      <Label htmlFor="n_Product_FK" className="col-md-3">Select Product:</Label>
                      <Input type="select" className="col-md-7" id="n_Product_FK" ref={(ref) => this.input['n_Product_FK'] = ref} name="n_Product_FK" required>
                        <option value="">Select Product</option>
                        {this.state.products}
                      </Input>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="row">
                      <Label htmlFor="s_ScreenErrorMsg" className="col-md-3">Screen Error Msg:</Label>
                      <Input type="text" className="col-md-7" id="s_ScreenErrorMsg" ref={(ref) => this.input['s_ScreenErrorMsg'] = ref} name="s_ScreenErrorMsg" required />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="row">
                      <Label htmlFor="s_RuleApplyOn" className="col-md-3">Rule Apply On:</Label>
                      <Input type="select" className="col-md-7" id="s_RuleApplyOn" ref={(ref) => this.input['s_RuleApplyOn'] = ref} name="s_RuleApplyOn" required>
                        <option value="">Select Rule Apply On</option>
                        {this.state.rulesApplyOn}
                      </Input>
                    </div>
                  </FormGroup>
                  <FormGroup className="add_row">
                    <Button type="button" className="btn-sm pull-right" color="success" onClick={this.addRow}>Add Row</Button>
                    <Input type="hidden" id="TableRowIncrementNo" name="TableRowIncrementNo" ref={(ref) => this.input['TableRowIncrementNo'] = ref} value="0"></Input>
                  </FormGroup>

                  {this.state.ruleForElements.map((count) => {
                    return (
                      <div className="ruleForDiv" key={count}>
                        <FormGroup>
                          <div className="row">
                            <Label htmlFor={'n_PrValidationCodeMasters_FK_' + count} className="col-md-3">Select Rule For:</Label>
                            <Input type="select" className="col-md-6 n_PrValidationCodeMasters_FK" name={'TbPrvalidationruledetail[' + count + '][n_PrValidationCodeMasters_FK]'} id={'n_PrValidationCodeMasters_FK_' + count}
                              ref={(ref) => this.input['n_PrValidationCodeMasters_FK_' + count] = ref} onChange={this.onChangeRuleFor} required>
                              <option value="">Select Rule For</option>
                              {this.state.ruleForOptions}
                            </Input>
                          </div>
                        </FormGroup>
                        <FormGroup>
                          <div className="row">
                            <Label htmlFor={'s_FormulaExpression_' + count} className="col-md-3">Select Formula Expression:</Label>
                            <Input type="select" className="col-md-6 s_FormulaExpression" id={'s_FormulaExpression_' + count} name={'TbPrvalidationruledetail[' + count + '][s_FormulaExpression]'} required
                              ref={(ref) => this.input['s_FormulaExpression_' + count] = ref}
                              onChange={this.onChangeFormulaExp}>
                              <option value="">Select Formula Expression</option>
                              {this.state.mathMaticSymbols}
                            </Input>
                          </div>
                        </FormGroup>
                        <FormGroup>
                          <div className="row" id={'dropDownTr_' + count} ref={(ref) => this.div['dropDownTr_' + count] = ref} style={{ display: this.state.dropDownTrShowHide[count] }}>
                            <Label htmlFor={'s_CompareValueDD_' + count} id={'valueLabelDropdownTr_' + count} className="col-md-3">Value:</Label>
                            <Input type="select" className="col-md-6" id={'s_CompareValueDD_' + count} name={'TbPrvalidationruledetail[' + count + '][s_CompareValueDD]'} required
                              ref={(ref) => this.input['s_CompareValueDD_' + count] = ref}
                            >
                              {this.state.dynamicDropDownOptions}
                            </Input>
                          </div>
                        </FormGroup>
                        <FormGroup>
                          <div className="row" id={'dropDownTrTo_' + count} ref={(ref) => this.div['dropDownTrTo_' + count] = ref} style={{ display: this.state.dropDownTrToShowHide[count] }}>
                            <Label htmlFor={'s_CompareValueBetweenDD_' + count} className="col-md-3">Value To:</Label>
                            <Input type="select" className="col-md-6" id={'s_CompareValueBetweenDD_' + count} name={'TbPrvalidationruledetail[' + count + '][s_CompareValueBetweenDD]'} required
                              ref={(ref) => this.input['s_CompareValueBetweenDD_' + count] = ref}
                            >
                              {this.state.dynamicDropDownOptionsSecond}
                            </Input>
                          </div>
                        </FormGroup>
                        <FormGroup>
                          <div className="row" id={'textTr_' + count} ref={(ref) => this.div['textTr_' + count] = ref} style={{ display: this.state.textTrShowHide[count] }}>
                            <Label htmlFor={'s_CompareValueText_' + count} id={'valueLableTextTr_' + count} className="col-md-3">Value:</Label>
                            <Input type="text" className="col-md-6" id={'s_CompareValueText_' + count} name={'TbPrvalidationruledetail[' + count + '][s_CompareValueText]'} required
                              ref={(ref) => this.input['s_CompareValueText_' + count] = ref}
                            />
                          </div>
                        </FormGroup>
                        <FormGroup>
                          <div className="row" id={'textTrTo_' + count} ref={(ref) => this.div['textTrTo_' + count] = ref} style={{ display: this.state.textTrToShowHide[count] }}>
                            <Label htmlFor={'s_CompareValueBetweenText_' + count} className="col-md-3">Value To:</Label>
                            <Input type="text" className="col-md-6" id={'s_CompareValueBetweenText_' + count} name={'TbPrvalidationruledetail[' + count + '][s_CompareValueBetweenText]'} required
                              ref={(ref) => this.input['s_CompareValueBetweenText_' + count] = ref}
                            />
                          </div>
                        </FormGroup>
                        <FormGroup>
                          <div className="row" id={'RadioTr_' + count} ref={(ref) => this.div['RadioTr_' + count] = ref} style={{ display: this.state.radioTrShowHide[count] }}>
                            <Col md="3">
                              <Label>Select Value:</Label>
                            </Col>
                            <Col md="9">
                              <FormGroup check inline>
                                <Input className="form-check-input" type="radio" id={'RadioYes_' + count} name={'TbPrvalidationruledetail[' + count + '][s_CompareValueRadio]'} value="Yes"
                                  ref={(ref) => this.input['RadioYes_' + count] = ref}
                                />
                                <Label className="form-check-label" check htmlFor={'RadioYes_' + count}>Yes</Label>
                              </FormGroup>
                              <FormGroup check inline>
                                <Input className="form-check-input" type="radio" id={'RadioNo_' + count} name={'TbPrvalidationruledetail[' + count + '][s_CompareValueRadio]'} value="No"
                                  ref={(ref) => this.input['RadioNo_' + count] = ref}
                                />
                                <Label className="form-check-label" check htmlFor={'RadioNo_' + count}>No</Label>
                              </FormGroup>
                            </Col>
                          </div>
                        </FormGroup>
                        <FormGroup>
                          <div className="row">
                            <Label htmlFor={'s_ConditionBetween_' + count} className="col-md-3">Select Condition Between:</Label>
                            <Input type="select" className="col-md-6 s_ConditionBetween" id={'s_ConditionBetween_' + count} name={'TbPrvalidationruledetail[' + count + '][s_ConditionBetween]'} required
                              ref={(ref) => this.input['s_ConditionBetween_' + count] = ref}
                            >
                              <option value="AND">And</option>
                              <option value="OR">Or</option>
                            </Input>
                          </div>
                        </FormGroup>
                        <Input type="hidden" id={'element_to_display_' + count} name={'element_to_display_[' + count + ']'}
                          ref={(ref) => this.input['element_to_display_' + count] = ref}
                        />
                        <Input type="hidden" id={'s_CompareValueDB_' + count} name={'s_CompareValueDB_[' + count + ']'}
                          ref={(ref) => this.input['s_CompareValueDB_' + count] = ref}
                        />
                        <Input type="hidden" id={'s_CompareValueBetweenDB_' + count} name={'s_CompareValueBetweenDB_[' + count + ']'}
                          ref={(ref) => this.input['s_CompareValueBetweenDB_' + count] = ref}
                        />
                        <Input type="hidden" id={'n_PrValidationRuleDetail_PK_' + count} name={'TbPrvalidationruledetail[' + count + '][n_PrValidationRuleDetail_PK]'}
                          ref={(ref) => this.input['n_PrValidationRuleDetail_PK_' + count] = ref}
                        />
                      </div>
                    )
                  })}

                  <FormGroup>
                    <div className="row">
                      <Label htmlFor="s_CanRate" className="col-md-3">Can Rate Policy:</Label>
                      <Input type="select" className="col-md-7" id="s_CanRate" ref={(ref) => this.input['s_CanRate'] = ref} name="s_CanRate" required>
                        <option value="Y">Yes</option>
                        <option value="N">NO</option>
                      </Input>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="row">
                      <Label htmlFor="s_CanPrintQuote" className="col-md-3">Can Print Quote:</Label>
                      <Input type="select" className="col-md-7" id="s_CanPrintQuote" ref={(ref) => this.input['s_CanPrintQuote'] = ref} name="s_CanPrintQuote" required>
                        <option value="Y">Yes</option>
                        <option value="N">NO</option>
                      </Input>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="row">
                      <Label htmlFor="s_CanPrintQuote" className="col-md-3">Can Print Application:</Label>
                      <Input type="select" className="col-md-7" id="s_CanPrintApp" ref={(ref) => this.input['s_CanPrintApp'] = ref} name="s_CanPrintApp" required>
                        <option value="Y">Yes</option>
                        <option value="N">NO</option>
                      </Input>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="row">
                      <Label htmlFor="s_CanBindApp" className="col-md-3">Can Bind Application:</Label>
                      <Input type="select" className="col-md-7" id="s_CanBindApp" ref={(ref) => this.input['s_CanBindApp'] = ref} name="s_CanBindApp" required>
                        <option value="Y">Yes</option>
                        <option value="N">NO</option>
                      </Input>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="row">
                      <Label htmlFor="s_CanUnBoundApp" className="col-md-3">Can Submit Un Bound Application:</Label>
                      <Input type="select" className="col-md-7" id="s_CanUnBoundApp" ref={(ref) => this.input['s_CanUnBoundApp'] = ref} name="s_CanUnBoundApp" required>
                        <option value="Y">Yes</option>
                        <option value="N">NO</option>
                      </Input>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="row">
                      <Label htmlFor="s_CanIssue" className="col-md-3">Can Issue Policy:</Label>
                      <Input type="select" className="col-md-7" id="s_CanIssue" ref={(ref) => this.input['s_CanIssue'] = ref} name="s_CanIssue" required>
                        <option value="Y">Yes</option>
                        <option value="N">NO</option>
                      </Input>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="row">
                      <Label htmlFor="d_EffectiveDateFrom" className="col-md-3">Rule Start Dt.</Label>
                      <Input type="date" className="col-md-7" id="d_EffectiveDateFrom" ref={(ref) => this.input['d_EffectiveDateFrom'] = ref} name="d_EffectiveDateFrom" placeholder="Rule Start Dt." required />
                      <span className="text-danger" id="d_EffectiveDateFrom_Error"></span>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="row">
                      <Label htmlFor="d_EffectiveDateTo" className="col-md-3">Rule End Dt.</Label>
                      <Input type="date" className="col-md-7" id="d_EffectiveDateTo" ref={(ref) => this.input['d_EffectiveDateTo'] = ref} name="d_EffectiveDateTo" placeholder="Rule End Dt." required />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="row">
                      <Label htmlFor="s_RuleStatus" className="col-md-3">Rule Status:</Label>
                      <Input type="select" className="col-md-7" id="s_RuleStatus" ref={(ref) => this.input['s_RuleStatus'] = ref} name="s_RuleStatus" required>
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">InActive</option>
                      </Input>
                    </div>
                    <Input type="hidden" id="n_PrValidationRuleMaster_PK" ref={(ref) => this.input['n_PrValidationRuleMaster_PK'] = ref} name="n_PrValidationRuleMaster_PK" />
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <div className="text-right">
                    <Button type="submit" id="ruleFormSubmit" ref={(ref) => this.input['ruleFormSubmit'] = ref} color="primary" onClick={this.onSubmit}><i className="fa fa-dot-circle-o"></i> Submit</Button>
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
  formOptions: state.Administration.fetchPolicyValidationFormOptions,
  ruleForOptions: state.Administration.fetchPolicyRuleForOptions,
  ruleForData: state.Administration.fetchPolicyRuleForData,
  saveResponse: state.Administration.savePolicyRuleValidation,
  innerRules: state.Administration.fetchInnerPolicyRule
});


export default connect(mapStateToProps)(PolicyValidationRuleCreate);