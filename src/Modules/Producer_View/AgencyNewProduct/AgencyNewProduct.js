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
  CardHeader,
  Input,
  Table,
} from 'reactstrap';

class AgencyNewProduct extends Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      agencyInfo: [],
      commRate_arr: [],
      commRGM_arr: [],
      product_arr: [],
      product_list: [
        {
          product: "",
          rule: "",
          state: "",
          representative: "",
          u_w_assigned: "",
          license: "",
          autherization: "",
        }
      ],
      error: false,
      isLoading: false,
    };
    //rest api endpoint
    this.api = process.env.REACT_APP_API_URL + '/api/v1/agency';

  }

  componentDidMount() {
    this.setState({ commRate_arr: this.props.commRate_arr });
    this.setState({ commRGM_arr: this.props.commRGM_arr });
    this.setState({ product_arr: this.props.product_arr });
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({ commRate_arr: props.commRate_arr })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { agencyInfo } = this.state;
    // this.addAgency(agencyInfo);
  }

  handleAddRow = () => {
    const item = {
      product: "",
      rule: "",
      state: "",
      representative: "",
      u_w_assigned: "",
      license: "",
      autherization: "",
    };
    this.setState({
      product_list: [...this.state.product_list, item]
    });
  }

  handleRemove = (index) => {
    let tproduct_list = [...this.state.product_list];
    tproduct_list.splice(index, 1);
    this.setState({
      product_list: tproduct_list
    });
  } 

  render() {
    const {
      commRate_arr,
      product_arr,
      commRGM_arr,
    } = this.state;
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>Products</strong>
            <Button size="sm" color="primary" className="float-right mr-1" onClick={this.handleAddRow}><span>Add Row</span></Button>
          </CardHeader>
          <Table hover responsive size="sm">
            <thead>
              <tr>
                <th>POLICY PRODUCT</th>
                <th>COMM. GROUP</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.product_list.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Input type="select" name="product" id="product" bsSize="sm">
                        <option value="">Select Product</option>
                        <option value="1">HO3 (Homeowners)</option>
                        <option value="2">HO6 (Homeowners)</option>
                        <option value="3">MH HO3</option>
                        <option value="4">MH Dwelling Program</option>
                        <option value="5">MHO Direct</option>
                        <option value="6">MDP Direct</option>
                        <option value="7">HO3 (Citizens)</option>
                        <option value="8">HO6 (Citizens)</option>
                        <option value="9">HO3 (Clearing House)</option>
                        <option value="10">Flood Program</option>
                        <option value="11">Commercial Program</option>
                        <option value="12">Commercial Non Residential</option>
                        <option value="13">HO3 Diamond</option>
                        <option value="14">Elements DP 3 Diamond</option>
                        <option value="15">Elements HO3 Select</option>
                        <option value="16">Elements HO6 Select</option>
                        <option value="17">Elements DP1 Select</option>
                        <option value="18">Elements DP3 Select</option>
                      </Input>
                    </td>
                    <td>
                      <Input type="select" name="comm_group" id="comm_group" bsSize="sm">
                        <option value="">Select Group</option>
                        <option value="1">HO3 (Homeowners)</option>
                        <option value="2">HO6 (Homeowners)</option>
                        <option value="3">MH HO3</option>
                        <option value="4">MH Dwelling Program</option>
                        <option value="5">MHO Direct</option>
                        <option value="6">MDP Direct</option>
                        <option value="7">HO3 (Citizens)</option>
                        <option value="8">HO6 (Citizens)</option>
                        <option value="9">HO3 (Clearing House)</option>
                        <option value="10">Flood Program</option>
                        <option value="11">Commercial Program</option>
                        <option value="12">Commercial Non Residential</option>
                        <option value="13">HO3 Diamond</option>
                        <option value="14">Elements DP 3 Diamond</option>
                        <option value="15">Elements HO3 Select</option>
                        <option value="16">Elements HO6 Select</option>
                        <option value="17">Elements DP1 Select</option>
                        <option value="18">Elements DP3 Select</option>
                      </Input>
                    </td>
                    <td>
                      <Button size="sm" color="danger" className="btn-pill" onClick={() => this.handleRemove(index)}>
                        <i className="icon-close icons d-block pt-1"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              }
              
            </tbody>
          </Table>
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

export default connect(mapStateToProps)(AgencyNewProduct);