import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import ReeValidate from 'ree-validate';
// import AuthService from '../../../services';
import Http from '../../../Http';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
  Dropdown, 
  Nav, NavItem, 
  NavLink, 
  Table, 
  Pagination, 
  PaginationItem, 
  PaginationLink 
} from 'reactstrap';

class AUserProduct extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const {
      isDetailLoading,
      AUserDetail_arr,
      ruleType_arr,
      state_arr,
      authType_arr,
      employee_arr,
      productType_arr,
    } = this.props;
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>UserProducts</strong>
            <Button
              size="sm" 
              className="btn-linkedin btn-brand mr-1 mb-1 float-right"
              onClick={this.props.handleAddDetailRow}
            >
              <span>Add Row</span>
            </Button>
          </CardHeader>
          <CardBody>
            {isDetailLoading 
            ?
              <div className="sk-double-bounce">
                <div className="sk-child sk-double-bounce1"></div>
                <div className="sk-child sk-double-bounce2"></div>
              </div>
            :
              <Table hover bordered striped responsive size="sm">
                <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>RULE</th>
                  <th>STATE</th>
                  <th>REPRESENTATIVE</th>
                  <th>U/W ASSIGNED</th>
                  <th>LICENSE #</th>
                  <th>AUTHORIZATION</th>
                  <th>ACTIONS</th>
                </tr>
                </thead>
              
                <tbody>
                {AUserDetail_arr&&
                  AUserDetail_arr.map((AUserDetail, index) =>{ 
                  return (
                    <tr key={AUserDetail.n_UserProduct_PK}>
                      <td>
                        <Input 
                          type="select" 
                          name="n_Product_FK"
                          id="n_Product_FK"
                          value={AUserDetail.n_Product_FK}
                          bsSize="sm"
                          onChange={(e) => this.props.handleDetailChange(index, 'n_Product_FK', e.target.value)} 
                          invalid = {AUserDetail.n_Product_FK == 0 ? true:false} 
                        >
                          <option value="">Select Product</option>
                          {productType_arr.map((product, idx) => (
                            <option key={idx} value={product.n_ProductId_PK}>
                              {product.s_ProductName}
                            </option>
                          ))}
                        </Input>

                      </td>
                      
                      <td>
                        <Input 
                          type="select" 
                          name="n_PrValidationRuleGroupMasters_FK"
                          id="n_PrValidationRuleGroupMasters_FK"
                          value={AUserDetail.n_PrValidationRuleGroupMasters_FK}
                          bsSize="sm"
                          onChange={(e) => this.props.handleDetailChange(index, 'n_PrValidationRuleGroupMasters_FK', e.target.value)} 
                          invalid = {AUserDetail.n_PrValidationRuleGroupMasters_FK == 0 ? true:false} 
                        >
                          {ruleType_arr.map((ruleType, idx) => (
                            ruleType.n_Product_FK == AUserDetail.n_Product_FK
                              ?
                              <option key={idx} value={ruleType.n_PrValidationRuleGroupMasters_PK}>
                                {ruleType.s_RuleCode}
                              </option>
                              :
                              null                       
                          ))}
                        </Input>
                      </td>
                      <td>
                        <Input 
                          type="select" 
                          name="s_StateCode"
                          id="s_StateCode"
                          value={parseInt(AUserDetail.s_StateCode)} 
                          bsSize="sm"
                          onChange={(e) => this.props.handleDetailChange(index, 's_StateCode', e.target.value)} 
                          invalid = {AUserDetail.s_StateCode == "" ? true:false} 
                        >
                          <option value="">Select State</option>
                          {state_arr.map((state, idx) => (
                            <option key={idx} value={state.n_stateId_PK}>
                              {state.s_StateName}
                            </option>
                          ))}
                          
                        </Input>
                      </td>
                      <td>
                        <Input 
                          type="select" 
                          name="n_ServiceRep"
                          id="n_ServiceRep"
                          value={AUserDetail.n_ServiceRep}
                          bsSize="sm"
                          onChange={(e) => this.props.handleDetailChange(index, 'n_ServiceRep', e.target.value)} 
                          disabled = {AUserDetail.n_UserProduct_PK != 0 ? true:false}
                          invalid = {AUserDetail.n_ServiceRep == 0 ? true:false} 
                        >
                          <option value="">Select Representative</option>
                          {employee_arr.map((employee, idx) => (
                            <option key={idx} value={employee.Admin_ID}>
                              {employee.s_ScreenName}
                            </option>
                          ))}
                          
                        </Input>
                      </td>
                      <td>
                        <Input 
                          type="select"
                          name="n_UWAssigned"
                          id="n_UWAssigned" 
                          value={AUserDetail.n_UWAssigned} 
                          bsSize="sm"
                          onChange={(e) => this.props.handleDetailChange(index, 'n_UWAssigned', e.target.value)} 
                          disabled = {AUserDetail.n_UserProduct_PK != 0 ? true:false}
                          invalid = {AUserDetail.n_UWAssigned == 0 ? true:false} 
                        >
                          <option value="">Select U/W Assigned</option>
                          {employee_arr.map((employee, idx) => (
                            <option key={idx} value={employee.Admin_ID}>
                              {employee.s_ScreenName}
                            </option>
                          ))}
                        </Input>
                      </td>
                      
                      <td>
                        <Input 
                          bsSize="sm" 
                          type="text" 
                          name="n_LicenseNo"
                          value={AUserDetail.n_LicenseNo}
                          className="input-sm" 
                          placeholder=""
                          onChange={(e) => this.props.handleDetailChange(index, 'n_LicenseNo', e.target.value)} 
                          invalid = {AUserDetail.n_LicenseNo == "" ? true:false} 
                          required 
                        />
                      </td>
                      <td>
                        <Input 
                          type="select" 
                          value={AUserDetail.s_AuthorizationCode} 
                          bsSize="sm"
                          onChange={(e) => this.props.handleDetailChange(index, 's_AuthorizationCode', e.target.value)} 
                          invalid = {AUserDetail.s_AuthorizationCode == "" ? true:false}
                        >
                          <option value="">Select</option>
                          {authType_arr.map((authType, idx) => (
                            <option key={idx} value={authType.s_AppCodeName}>
                              {authType.s_AppCodeNameForDisplay}
                            </option>
                          ))}
                        </Input>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          color="danger"
                          className="btn-pill"
                          onClick={(e) => this.props.handleRemoveDetailRow(e, index)}
                        >
                          <i className="icon-close icons d-block pt-1"></i>
                        </Button>
                      </td>
                    
                    </tr>
                  )
                })}
                </tbody>
              </Table>
            }
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // AUserDetail_arr: state.Producer.AUserDetail_arr,
  // ruleType_arr: state.Producer.ruleType_arr,
  // state_arr: state.Producer.state_arr,
  // authType_arr: state.Producer.authType_arr,
  // employee_arr: state.Producer.employee_arr,
  // productType_arr: state.Producer.productType_arr,
});

export default connect(mapStateToProps)(AUserProduct);