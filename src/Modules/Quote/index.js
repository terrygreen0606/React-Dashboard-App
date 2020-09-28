import React, { Component } from 'react'
import {
    Button,
    Col,
    Row,
    Card,
    CardBody,
    CardHeader,
} from 'reactstrap';
export default class index extends Component {

    onclickRoute = (e) => {
        console.log(e.currentTarget.value);
        switch (e.currentTarget.value) {
            case '13':
                return this.props.history.push('/quoteEntry/ho3Daimond');
            case '15':
                return this.props.history.push('/quoteEntry/epicH03Sel');
            case '16':
                return this.props.history.push('/quoteEntry/epicH06Sel');
            case '5':
                return this.props.history.push('/quoteEntry/mhoDirect');
            case '6':
                return this.props.history.push('/quoteEntry/mdpDirect');
            case '1':
                return this.props.history.push('/quoteEntry/ho3Homeowners');
            case '2':
                return this.props.history.push('/quoteEntry/ho6Homeowners');
            default:
                return this.props.history.push('/quoteEntry/ho3Daimond');
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="animated fadeIn">
                    <Row className='mt-5'>
                        <Col xs="12" sm="6" lg="3">
                            <Button block outline color="success" style={{ boxShadow: "2px 5px 9px 2px #9E9E9E" }} value={13} onClick={this.onclickRoute}><h3><span><i className="fa fa-home fa-lg" style={{'fontSize':'105px'}}></i></span><br/><span>HO3 Diamond</span></h3></Button>
                        </Col>
                        <Col sm="6" xs="12" lg="3">
                            <Button block outline color="success" style={{ boxShadow: "2px 5px 9px 2px #9E9E9E" }} value={15} onClick={this.onclickRoute}><h3><span><i className="fa fa-bank" style={{'fontSize':'80px'}}></i></span><br/><span>Elements HO3 Select</span></h3></Button>
                        </Col>
                        <Col sm="6" xs="12" lg="3">
                            <Button block outline color="success" style={{ boxShadow: "2px 5px 9px 2px #9E9E9E" }} value={16} onClick={this.onclickRoute}><h3><span><i className="fa fa-building" style={{'fontSize':'80px'}}></i></span><br/><span>Elements HO6 Select</span></h3></Button>
                        </Col>
                        <Col sm="6" xs="12" lg="3">
                            <Button block outline color="success" style={{ boxShadow: "2px 5px 9px 2px #9E9E9E" }} value={6} onClick={this.onclickRoute}><h3><span><i className="fa fa-reorder" style={{'fontSize':'80px'}}></i></span><br/><span>MDP Direct</span></h3></Button>
                        </Col>
                        <Col sm="6" xs="12" lg="3" className="mt-4">
                            <Button block outline color="success" style={{ boxShadow: "2px 5px 9px 2px #9E9E9E" }} value={5} onClick={this.onclickRoute}><h3><span><i className="fa fa-bank" style={{'fontSize':'80px'}}></i></span><br/><span>MHO Direct</span></h3></Button>
                        </Col>
                        <Col sm="6" xs="12" lg="3" className="mt-4">
                            <Button block outline color="success" style={{ boxShadow: "2px 5px 9px 2px #9E9E9E" }} value={1} onClick={this.onclickRoute}><h3><span><i className="fa fa-umbrella" style={{'fontSize':'80px'}}></i></span><br/><span>HO3 Homeowners</span></h3></Button>
                        </Col>
                        <Col sm="6" xs="12" lg="3" className="mt-4">
                            <Button block outline color="success" style={{ boxShadow: "2px 5px 9px 2px #9E9E9E" }} value={2} onClick={this.onclickRoute}><h3><span><i className="fa fa-hospital-o" style={{'fontSize':'80px'}}></i></span><br/><span>HO6 Homeowners</span></h3></Button>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}
