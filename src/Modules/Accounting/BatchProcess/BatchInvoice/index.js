import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Col, Row, Card,
    CardBody,
    CardHeader, Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Button
} from 'reactstrap';

class index extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            issueComp: '',
            scheduleDate: ''
        }
    }
    
    componentWillMount(){
        
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12" className="mb-4">
                        <Card className="card-accent-primary">
                            <CardHeader>
                                <strong>Batch Invoice</strong>
                            </CardHeader>
                            <CardBody>
                                <Form method="POST" onSubmit={this.handleSubmit}>
                                    <Row>
                                        <Col md="4">
                                            <FormGroup>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>Issue Company</InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input type="select" name="issueComp" id="issueComp" onChange={this.handleChange} value={this.state.issueComp} disabled={this.state.calledApi}>
                                                        <option key="" value="">Select Company</option>
                                                        {this.compDD = this.props.compDD.map((comp, i) => {
                                                            return (
                                                                <option key={i} value={comp.n_CompanyId_PK}>{comp.s_CompanyName}</option>
                                                            );
                                                        })}
                                                    </Input>
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                        <Col md="3">
                                            <FormGroup>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>Schedule Date</InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input type="date" id="scheduleDate" name="scheduleDate" onChange={this.handleChange} />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                        <Col md="3">
                                            <Button type="submit" size="md" color="primary"><i className="fa fa-search"></i> Retrieve</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

index.propTypes = {
    dispatch: PropTypes.func.isRequired,
    compDD: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    compDD: state.BatchProcess.compDD,
});

export default connect(mapStateToProps)(index);