import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import ReeValidate from 'ree-validate';
import classNames from 'classnames';
import AuthService from '../../../services';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Register extends Component {
  constructor() {
    super();

    this.validator = new ReeValidate({
      name: 'required|min:4',
      email: 'required|email',
      password: 'required|min:6',
      password_confirmation: 'required|min:6',
    });

    this.state = {
      loading: false,
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: {},
      response: {
        error: false,
        message: '',
      },
      success: false,
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
    const validation = this.validator.errors;

    // Avoid validation until input has a value.
    if (value === '') {
      return;
    }

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
    const {
      name, email, password, password_confirmation,
    } = this.state;
    const credentials = {
      name,
      email,
      password,
      password_confirmation,
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
    this.props.dispatch(AuthService.register(credentials))
      .then(() => {
        // this.registrationForm.reset();
        this.setState({ loading: false, success: true });
      })
      .catch((err) => {
        const errors = Object.values(err.errors);
        errors.join(' ');
        const response = {
          error: true,
          message: errors,
        };
        this.setState({ response });
        this.setState({ loading: false });
      });
  }
  render() {
    // If user is already authenticated we redirect to dashboard.
    if (this.props.isAuthenticated) {
      return <Redirect to="/" replace />;
    }

    const { response, errors, loading } = this.state;

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">

                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  {response.error &&
                  <div className="alert alert-danger text-center" role="alert">
                    { response.message }
                  </div>
                  }
                  {this.state.success &&
                  <div className="alert alert-success text-center" role="alert">
                    Registration successful.<br />
                    <Link to="/" href="/">Please log in with your new email and password.</Link>
                  </div>
                  }

                  {!this.state.success &&
                  <Form method="POST" onSubmit={this.handleSubmit} ref={(el) => { this.registrationForm = el; }}>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        autoComplete="name"
                        id="name"
                        type="name"
                        name="name"
                        className={classNames('form-control', {
                          'is-invalid': ('name' in errors),
                        })}
                        placeholder="Enter name"
                        required
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        disabled={loading}
                      />
                      {('name' in errors) &&
                      <div className="invalid-feedback">{ errors.name }</div>
                      }
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        className={classNames('form-control', {
                          'is-invalid': ('email' in errors),
                        })}
                        placeholder="Enter email"
                        required
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        disabled={loading}
                        placeholder="Email"
                        autoComplete="email" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="password"
                        type="password"
                        className={classNames('form-control', {
                          'is-invalid': ('password' in errors),
                        })}
                        name="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        required
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        disabled={loading}
                      />
                      {('password' in errors) &&
                      <div className="invalid-feedback">{ errors.password }</div>
                      }
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        autoComplete="confirm-password"
                        id="password_confirmation"
                        type="password"
                        className={classNames('form-control', {
                          'is-invalid': ('password_confirmation' in errors),
                        })}
                        name="password_confirmation"
                        placeholder="Confirm password"
                        required
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        disabled={loading}
                      />
                      {('password_confirmation' in errors) &&
                      <div className="invalid-feedback">{ errors.password_confirmation }</div>
                      }
                    </InputGroup>
                    <Button
                      color="success"
                      block
                      type="submit"
                      className={classNames('btn btn-success', {
                        'btn-loading': loading,
                      })}
                    >
                      Register
                    </Button>
                  </Form>
                  }
                  <Row>
                    {!this.state.success &&
                    <Col xs="12">
                      <div className="py-1 password-reset-link text-center">
                        <Link to="/" href="/">
                          Already registered? Log in.
                        </Link>
                      </div>
                    </Col>
                    }
                  </Row>
                </CardBody>
                {/* 
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(Register);

// export default Register;
