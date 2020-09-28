import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Row,
  Col,
  InputGroup,
  Label,
  Form,
  Button,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';

import {connect} from 'react-redux';
import LoadingDiv from "./LoadingDiv";
import * as commissionGroupServiceObj from "../../../../services/commissionGroupService";

class GroupModal extends Component {
  constructor (props) {
    super(props);
    
    this.productChangeHandle = this.productChangeHandle.bind(this);
    this.codeChangeHandle = this.codeChangeHandle.bind(this);
    this.descChangeHandle = this.descChangeHandle.bind(this);
    this.rulesChangeHandle = this.rulesChangeHandle.bind(this);
    this.submitFormHandle = this.submitFormHandle.bind(this);

    this.state = {
      groupCode: '',
      groupDesc: '',
      product: -1,
      rules: [],
      index: -1,
      isFirst: false,
      isEdit: false,
      isLoading: false,
    }
  }
  componentDidMount() {
    this.props.dispatch(commissionGroupServiceObj.loadProducts());
    this.setState({
      index: this.props.match.params.id != null ? this.props.match.params.id : -1
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.index != prevState.index && this.state.index != -1) {
      this.setState({
        isEdit: true,
        isLoading: true,
      });
      this.props.dispatch(commissionGroupServiceObj.loadGroupData(this.state.index));
    }
    if (prevProps.individual.n_CommRuleGroupMasters_PK !== this.props.individual.n_CommRuleGroupMasters_PK) {
      const individual = this.props.individual;
      console.log(individual);
      const details = individual.details ? individual.details : [];
      let rules = [];
      const product = individual.n_Product_FK
      for (let i = 0; i < details.length; i ++) {
        rules.push(details[i].n_CommRules_FK);
      }
      this.setState({
        product: product,
        groupCode: individual.s_RuleCode,
        groupDesc: individual.s_RuleDesc,
        rules: rules,
        isFirst: true,
        isLoading: false
      });
    }
    if (JSON.stringify(prevState.product) !== JSON.stringify(this.state.product) ) {
      this.props.dispatch(commissionGroupServiceObj.loadRules({product: this.state.product}))
        .then(() => {
          if (this.state.isFirst == true) {
            this.setState({
              a_states: this.state.t_states
            })
          }
        });
    }
    
  }
  productChangeHandle(e) {
    const value = e.target.value;
    this.setState({
      product: value,
      rules: []
    });
  }
  rulesChangeHandle(e) {
    const options = e.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      rules: value,
    });
  }
  codeChangeHandle(e) {
    const value = e.target.value;
    this.setState({
      groupCode: value
    })
  }
  descChangeHandle(e) {
    const value = e.target.value;
    this.setState({
      groupDesc: value
    })
  }
  submitFormHandle(e) {
    e.preventDefault();
    let formSubmitedData = new FormData(e.target);
    if (this.state.isEdit) {
      this.props.dispatch(commissionGroupServiceObj.updateRecord(this.state.index, formSubmitedData))
      .then(() => {
        alert('Successfully Updated');
      }).catch((error) => {
        alert(error);
      })
    } else {
      this.props.dispatch(commissionGroupServiceObj.addNewRecord(formSubmitedData))
      .then(() => {
        alert('Successfully Created');
      }).catch((error) => {
        alert(error);
      })
    }
  }
  render () {
    const {isLoadingOptions, isLoadingAddBtn, products, rulesList} = this.props;
    const {groupCode, groupDesc, product, rules, isEdit, isLoading} = this.state;
    return (
      <div className="animated fadeIn mt-3">
        <Card>
          <CardHeader>
            {
              isEdit == true ? 'Edit Group' : 'Add Group'
            }
          </CardHeader>
          <CardBody>
            {
              isLoading == true ? (
                <LoadingDiv />
              ) : (
                <Form method='post' ref='groupForm' id='groupForm' onSubmit={this.submitFormHandle} >
                  {
                    isEdit == true && 
                    <Input type='hidden' value='PUT' name='_method' />
                  }
                  <Row>
                    <Col>
                      <InputGroup>
                        <Label for='s_RuleCode' className="pr-2">Group Code</Label>
                        <Input id='s_RuleCode' name='s_RuleCode' value={groupCode} onChange={this.codeChangeHandle} bsSize='sm' />
                      </InputGroup>
                    </Col>
                    <Col>
                      <InputGroup>
                        <Label for='s_RuleDesc' className="pr-2">Group Name</Label>
                        <Input id='s_RuleDesc' name='s_RuleDesc' value={groupDesc} onChange={this.descChangeHandle} bsSize='sm' />
                      </InputGroup>
                    </Col>
                    <Col>
                      <InputGroup>
                        <Label for='n_Product_FK' className="pr-2">Product</Label>
                        <Input type="select" id='n_Product_FK' name='n_Product_FK' value={product} onChange={this.productChangeHandle} bsSize='sm'>
                          {
                            products.map((item, index) => (
                              <option key={index} value={item.n_ProductId_PK}>{item.s_ProductName}</option>
                            ))
                          }
                        </Input>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>Rules</Col>
                  </Row>
                  {
                    isLoadingOptions == true ? (
                      <LoadingDiv />
                    ) : (
                      <Input type="select" name="details[]" multiple value={rules} className="height-500" onChange={this.rulesChangeHandle}>
                        {
                          rulesList.map((item, index) => (
                            <option key={index} value={item.n_RuleId_PK}>{item.s_RuleName}</option>
                          ))
                        }
                      </Input>
                    )
                  }
                  <Row className="mt-3">
                    <Col>
                      <Button
                        type="submit"
                        size="sm"
                        color="primary"
                        className="float-right"
                        form="groupForm"
                        disabled={isLoadingAddBtn ? true : false}
                      >
                        <i className="fa fa-dot-circle-o"></i>
                        {isLoadingAddBtn ? " Saving..." : " Submit"}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )
            }
          </CardBody>
        </Card>
      </div>
    )
  }
}

GroupModal.propTypes = {
  dispatch: PropTypes.func.isRequired,  
};


const mapStateToProp = (state) => ({
  individual: state.groupManageProcess.individual,
  products: state.groupManageProcess.products,
  rulesList: state.groupManageProcess.rules,
  isLoadingIndividual: state.groupManageProcess.isLoadingIndividual,
  isLoadingOptions: state.groupManageProcess.isLoadingOptions,
  isLoadingAddBtn: state.groupManageProcess.isLoadingAddBtn,
});

export default connect(mapStateToProp)(GroupModal);
