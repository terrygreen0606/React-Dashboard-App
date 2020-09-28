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

class AgencyLicense extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const {
      licManager_arr,
      state_arr,
    } = this.props;
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>License Information</strong>
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
                <th>LICENSE TYPE</th>
                <th>LICENSE NO.</th>
                <th>STATE</th>
                <th>APPOINTED</th>
                <th>ISSUE DATE</th>
                <th>EXP.DATE</th>
                <th>APP.DATE</th>
                <th>ACTIONS</th>
              </tr>
              </thead>
              <tbody>
              {licManager_arr.map((licManager, index) =>{ 
                return (
                  <tr key={index}>
                    <td>
                      <Input 
                        type="select" 
                        value={licManager.n_LicenseType} 
                        bsSize="sm"
                        onChange={(e) => this.props.handleChange(index, 'n_LicenseType', e.target.value)} 
                      >
                        <option value="">Select Type</option>
                        <option value="111">Active</option>
                        <option value="112">Closed</option>
                      </Input>
                    </td>
                    <td>
                      <Input 
                        bsSize="sm" 
                        type="text" 
                        value={licManager.s_LicenseNo}
                        className="input-sm" 
                        placeholder=""
                        onChange={(e) => this.props.handleChange(index, 's_LicenseNo', e.target.value)}  
                        required 
                        />
                    </td>
                    <td>
                      <Input 
                        type="select" 
                        value={licManager.n_StateId_FK} 
                        bsSize="sm"
                        onChange={(e) => this.props.handleChange(index, 'n_StateId_FK', e.target.value)} 
                      >
                        <option value="">Select State</option>
                        {state_arr.map(state => (
                          <option value={state.n_StateId_PK}>
                            {state.s_StateName}
                          </option>
                        ))}
                        
                      </Input>
                    </td>
                    <td>
                      <Input 
                        type="select" 
                        value={licManager.n_appointyType} 
                        bsSize="sm"
                        onChange={(e) => this.props.handleChange(index, 'n_appointyType', e.target.value)} 
                      >
                        <option value="">Select Appointed</option>
                        <option value="769" selected="selected">AVATAR APPOINTED</option>
                        <option value="770">LSA</option>
                        <option value="771">NOT APPOINTED</option>
                      </Input>
                    </td>
                    <td>
                      <Input 
                        bsSize="sm" 
                        type="date" 
                        placeholder="date" 
                        value={licManager.d_IssueDate}
                        onChange={(e) => this.props.handleChange(index, 'd_IssueDate', e.target.value)} 
                      />
                    </td>
                    <td>
                      <Input 
                        bsSize="sm" 
                        type="date" 
                        placeholder="date" 
                        value={licManager.d_ExpireDate}
                        onChange={(e) => this.props.handleChange(index, 'd_ExpireDate', e.target.value)} 
                      />
                    </td>
                    <td>
                      <Input 
                        bsSize="sm" 
                        type="date" 
                        placeholder="date" 
                        value={licManager.d_AppDate}
                        onChange={(e) => this.props.handleChange(index, 'd_AppDate', e.target.value)} 
                      />
                    </td>
                    <td>
                      <Button 
                        size="sm" 
                        color="danger" 
                        className="btn-pill"
                        onClick={(e) => this.props.handleRemoveSpecificRow(e, index)}
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

export default connect(mapStateToProps)(AgencyLicense);