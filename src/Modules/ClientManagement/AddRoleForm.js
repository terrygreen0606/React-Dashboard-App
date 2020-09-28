import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import ReeValidate from 'ree-validate';
import * as actions from '../../store/actions';
import { ToastContainer, toast } from "react-toastify";
import {
  Badge,
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

class AddRoleForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
        n_PersonRoleId_PK:'',
        s_PersonRoleType : '',
        s_isActiveYN : '',
        errors: {},
            response: {
                error: false,
                message: '',
            },
            roleRowIndex:null,
    };

  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  error(msg) {
    return toast.error(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {n_PersonRoleId_PK, s_PersonRoleType, s_isActiveYN,roleRowIndex} = this.state;
    const credentials = [{
        n_PersonRoleId_PK,
        s_PersonRoleType,
        s_isActiveYN,
        roleRowIndex,
    }];
    if( this.props.isEdit == "N")
    {
      if(s_PersonRoleType == null)
      {
        this.error("Person Role type not selected");
      }
      if(s_isActiveYN == null)
      {
        this.error("Status not selected");
      }
      else{
        this.setState({ response: { error: false, message: '' } });
        this.props.dispatch(actions.saveRole(credentials));
        {this.props.formSubmitRole()}
      }
    }
    else{
      this.setState({ response: { error: false, message: '' } });
      this.props.dispatch(actions.saveRole(credentials));
      {this.props.formSubmitRole()}
    }
}

componentDidMount(){
        this.setState({
            n_PersonRoleId_PK : this.props.Edit_RoleFormData.n_PersonRoleId_PK,
            s_PersonRoleType : this.props.Edit_RoleFormData.s_PersonRoleType,
            s_isActiveYN : this.props.Edit_RoleFormData.s_isActiveYN,
            roleRowIndex :this.props.rowIndex,
        });
}

  render() {
    const containerStyle = {
      zIndex: 1999,
    };
    let SYSTEMROLE = this.props.SYSTEMROLE;
    let Role_options = SYSTEMROLE.length > 0
    	&& SYSTEMROLE.map((item, i) => {
      return (
        <option key={i} value={item.s_AppCodeName}>{item.s_AppCodeNameForDisplay}</option>
      )
    }, this);

    return (
      <div className="animated fadeIn">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          style={containerStyle}
        />
            <Form method="POST" onSubmit={this.handleSubmit} className="form-horizontal">
            <Row>
                <Col md="6">
                    <Row>
                        <Col xs="12" md="4">
                        <Label size="sm" htmlFor="s_PersonRoleType">Role Type:</Label>
                        </Col>
                        <Col xs="12" md="8">
                        <Input type="select" name="s_PersonRoleType" id="s_PersonRoleType" bsSize="sm" onChange={this.handleChange} value={this.state.s_PersonRoleType}>
                            <option value="">Select Role Type</option>
                            {Role_options}
                            </Input>
                        </Col>
                    </Row>
                </Col>
                <Col md="6">
                    <Row>
                        <Col xs="12" md="4">
                        <Label size="sm" htmlFor="s_isActiveYN">Status:</Label>
                        </Col>
                        <Col xs="12" md="8">
                        <Input type="select" name="s_isActiveYN" id="s_isActiveYN" bsSize="sm" onChange={this.handleChange} value={this.state.s_isActiveYN}>
                            <option value="">Select</option>
                            <option value="Y">YES</option>
                            <option value="N">NO</option>
                            </Input>
                            <Input bsSize="sm" type="hidden" id="n_PersonRoleId_PK" name="n_PersonRoleId_PK" className="input-sm" placeholder="" onChange={this.handleChange} value={this.state.n_PersonRoleId_PK}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            
            <div xs="12" className="text-center">
                <Button type="submit" size="md" color="primary">Save</Button>
            </div>
            </Form>
            
      </div>
    );
  }
}

AddRoleForm.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(AddRoleForm);
