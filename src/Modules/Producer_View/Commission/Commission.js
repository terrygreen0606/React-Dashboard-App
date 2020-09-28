import React, { Component } from 'react';
import { connect } from 'react-redux'
import Http from '../../../Http';
import ProducerService from '../../../services/Producer';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
} from 'reactstrap';

import CommissionAccView from '../CommissionAccView';
import CommissionStatement from '../CommissionStatement';
import CommissionDue from '../CommissionDue';


class Commission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      agencyId: this.props.agencyId,
      accView_arr: [],
      statement_arr: [],
      due_arr: [],
      subTabIndex: 0,
    };
    //rest api endpoint
    this.api = process.env.REACT_APP_API_URL+'/api/v1/agency';
  }
  componentDidMount() {
    this.getCommissionData();
  }

  getCommissionData = () =>{
    const { dispatch } = this.props;
    var pageNumber  = 1;
    const {agencyId} = this.state;
    var url = `${this.api}/${agencyId}/showCommissions`;
    this.setState({isLoading:true});
    // dispatch(ProducerService.showCommAccViewRequest({pageNumber, url}))
    this.props.showCommissionsRequest({pageNumber, url})
      .then(() => {
        this.setState({ isLoading: false});
      })
      .catch((err) => {
        this.setState({ isLoading: false });
      });
  }

  // getCommAccViewRate = () =>{
  //   var pageNumber  = 1;
  //   const {agencyId} = this.state;
  //   var url = `${this.api}/${agencyId}/showCommAccViews`;
  //   this.setState({isLoading:true});
  //   this.props.showCommAccViewRequest({pageNumber, url})
  //   .then(() => {

  //     this.setState({ isLoading: false});
  //   })
  //   .catch((err) => {

  //     this.setState({ isLoading: false });
  //   });
  // }

  showContent = (tabIndex) => {
    this.setState({
      subTabIndex: tabIndex
    });
  }

  render() {
    const {
      isLoading,
      subTabIndex
    } = this.state;
    return (
      <div className="animated fadeIn">

        <Card>
          <CardHeader>
            <Row className="text-center">
              <Col className="offset-3 col-5 text-center">
                <Button
                  size="sm"
                  style={{
                    backgroundColor: subTabIndex == 0 ? "darkblue" : "",
                    color: subTabIndex == 0 ? "white" : ""
                  }}
                  className="btn-linkedin btn-brand ml-1 mb-1 text-center"
                  onClick={(tabIndex) => this.showContent(0)}
                >
                  <span>Commission Account View</span>
                </Button>
                <Button
                  size="sm"
                  style={{
                    backgroundColor: subTabIndex == 1 ? "darkblue" : "",
                    color: subTabIndex == 1 ? "white" : ""
                  }}
                  className="btn-linkedin btn-brand ml-1 mb-1 text-center"
                  onClick={(tabIndex) => this.showContent(1)}
                >
                  <span>Commission Statement</span>
                </Button>
                <Button
                  size="sm"
                  style={{
                    backgroundColor: subTabIndex == 2 ? "darkblue" : "",
                    color: subTabIndex == 2 ? "white" : ""
                  }}
                  className="btn-linkedin btn-brand ml-1 mb-1 text-center"
                  onClick={(tabIndex) => this.showContent(2)}
                >
                  <span>Commission Due</span>
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            {subTabIndex == 0 &&
            <CommissionAccView
              agencyId = {this.props.agencyId}
              isLoading = {this.state.isLoading}
            />
            }
            {subTabIndex == 1 &&
            <CommissionStatement
              agencyId = {this.props.agencyId}
              isLoading = {this.state.isLoading}
            />
            }
            {subTabIndex == 2 &&
            <CommissionDue
              agencyId = {this.props.agencyId}
              isLoading = {this.state.isLoading}
            />
            }
          </CardBody>
        </Card>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  agencyId: state.Producer.agencyId,
  tabId: state.Producer.tabId,
})

const mapDispatchToProps = dispatch => ({//accountledger
  // showCommAccViewRequest: bindActionCreators(ProducerService.showCommAccViewRequest, dispatch),//using bindActionCreators
  // showCommAccViewRequest: bindActionCreators(showCommAccViewRequest, dispatch)//call reducer function without service
  // showCommStatementRequest: (pageNumber, url) => dispatch(ProducerService.showCommStatementRequest(pageNumber, url))//Origin
  showCommissionsRequest: (pageNumber, url) => dispatch(ProducerService.showCommissionsRequest(pageNumber, url))//Origin
});
export default connect(mapStateToProps, mapDispatchToProps)(Commission)
