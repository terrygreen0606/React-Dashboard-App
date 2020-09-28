import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import ReeValidate from 'ree-validate';
import AuthService from '../../../services';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {
  constructor() {
    super();

    this.validator = new ReeValidate({
      Username: 'required|min:4',
      Password: 'required|min:6',
    });

    this.state = {
      loading: false,
      Username: '',
      Password: '',
      errors: {},
      response: {
        error: false,
        message: '',
      },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });

    // If a field has a validation error, we'll clear it when corrected.
    const { errors } = this.state;
    if (name in errors) {
      const validation = this.validator.errors;
      this.validator.validate(name, value).then(() => {
        if (!validation.has(name)) {
          delete errors[name];
          this.setState({ errors });
        }
      });
    }
  }

  handleBlur = (e) => {
    const { name, value } = e.target;

    // Avoid validation until input has a value.
    if (value === '') {
      return;
    }

    const validation = this.validator.errors;
    this.validator.validate(name, value).then(() => {
      if (validation.has(name)) {
        const { errors } = this.state;
        errors[name] = validation.first(name);
        this.setState({ errors });
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { Username, Password } = this.state;
    const credentials = {
      Username,
      Password,
    };

    // Set response state back to default.
    this.setState({ response: { error: false, message: '' } });

    this.validator.validateAll(credentials)
      .then((success) => {
        if (success) {
          this.setState({ loading: true });
          this.submit(credentials);
        }
      });
  }

  submit(credentials) {
    this.props.dispatch(AuthService.login(credentials))
      .catch((err) => {
        var errors = Object.values(err.errors);
        errors = errors.join(' ');
        const response = {
          error: true,
          message: errors,
        };
        this.setState({ response });
        this.setState({ loading: false });
      });
  }

  render() {
    // If user is already authenticated we redirect to entry location.
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return (
        <Redirect to={from} />
      );
    }

    const { response, errors, loading } = this.state;
  
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form method="POST" onSubmit={this.handleSubmit} ref={(el) => { this.loginForm = el; }}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      {response.error &&
	                    <div className="alert alert-danger text-center" role="alert">
	                      Credentials were incorrect. Try again!
	                    </div>
	                  }
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                        	type="text" 
                        	id="email" 
                        	name="Username" 
                        	placeholder="Username" 
                        	autoComplete="Username" 
                        	className={classNames('form-control', {
	                            'is-invalid': ('Username' in errors),
	                          })}
                        	required
                        	onChange={this.handleChange}
                          	onBlur={this.handleBlur}
                          	disabled={loading}
                        />
                        {('Username' in errors) &&
                        <div className="invalid-feedback">{ errors.Username }</div>
                        }
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                        	type="password" 
                        	id="password"
                        	name="Password"
                        	className={classNames('form-control', {
	                            'is-invalid': ('Password' in errors),
							            })}
                        	placeholder="Password" 
                        	autoComplete="current-password"
                        	required
                        	onChange={this.handleChange}
                        	onBlur={this.handleBlur}
                        	disabled={loading}
                        />
                        {('Password' in errors) &&
                        <div className="invalid-feedback">{ errors.Password }</div>
                        }
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button 
                          	color="primary"
                          	type="submit" 
                          	className={classNames('btn btn-primary px-4', {
	                            'btn-loading': loading,
                          	})}>
                          		Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot Password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Login.defaultProps = {
  location: {
    state: {
      pathname: '/',
    },
  },
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  // location: PropTypes.shape({
  //   state: {
  //     pathname: PropTypes.string,
  //   },
  // }),
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(Login);
