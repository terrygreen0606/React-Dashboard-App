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

class AgencyProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
    };
    //rest api endpoint
    this.api = process.env.REACT_APP_API_URL+'/api/v1/agency';

  }

  render() {
    const {
      agencyInfo,
      commRate_arr,
      licManager_arr,
      employee_arr,
      docGroup_arr,
      deposit_arr,
      product_arr,
      commRGM_arr,
    } = this.props;
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Products and Commission Rates</strong>
            <Button 
              size="sm" 
              className="btn-linkedin btn-brand mr-1 mb-1 float-right"
              onClick={this.props.handleAddRow}
            >
                <span>Add Row</span>
            </Button>
          </CardHeader>
          <CardBody>
            <Table hover bordered striped responsive size="sm">
              <thead>
              <tr>
                <th>POLICY PRODUCT</th>
                <th>COMM.GROUP</th>
                <th>ACTIONS</th>
              </tr>
              </thead>
              <tbody>
              {commRate_arr.map((commRate, index) =>{ 
                return (
                  <tr key={index}>
                    <td>
                      <Input 
                        type="select" 
                        
                        value={commRate.n_ProductId_FK} 
                        bsSize="sm"
                        onChange={(e) => this.props.handleChange(index, 'n_ProductId_FK', e.target.value)} 
                      >
                        <option value="">Select Product</option>
                        {product_arr.map(product => (
                          <option value={product.n_ProductId_PK}>
                            {product.s_ProductName}
                          </option>
                        ))}
                      </Input>
                    </td>
                    <td>
                      <Input 
                        type="select" 
                        name="n_StateId_FK" 
                        id="n_StateId_FK" 
                        value={commRate.n_CommRuleGroupMasters_FK} 
                        bsSize="sm"
                        onChange={(e) => this.props.handleChange(index, 'n_CommRuleGroupMasters_FK', e.target.value)} 
                      >
                        <option value="">Select Product</option>
                        {commRGM_arr.map(commRGM => (
                          commRate.n_CommRuleGroupMasters_FK == commRGM.n_CommRuleGroupMasters_PK
                            ?
                            <option value={commRGM.n_CommRuleGroupMasters_PK}>
                              {commRGM.s_RuleCode}
                            </option>
                            :
                            null                       
                        ))}
                      </Input>
                    </td>
                    <td>
                      <Button 
                        size="sm" 
                        color="danger" 
                        className="btn-pill" 
                        onClick={ (e) => this.props.handleRemoveSpecificRow(e, index) }
                      >
                        <i className="icon-close icons d-block pt-1"></i>
                      </Button>
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </Table>
          </CardBody>
          </Card>
      </div>
    );
  }
}

// export default Agency;

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  // agencyInfo: state.agencyInfo,
  // handleChange: state.handleChange,
  // user: state.Auth.user,
});

// Agency.defaultProps = {
//   agency: 'Default header',
//   agencyInfo: 'Default contentTitle',
//   agencyDetail: 'Default contentBody'
// };

export default connect(mapStateToProps)(AgencyProduct);