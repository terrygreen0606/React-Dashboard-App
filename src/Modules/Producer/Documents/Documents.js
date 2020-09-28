import React, { Component } from 'react';
import { connect } from 'react-redux'
import ProducerService from '../../../services/Producer';

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

import DocumentList from '../DocumentList';
import DocumentForm from '../DocumentForm';
// import AgencyDetail from '../AgencyDetail';

class Documents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      agencyId: this.props.agencyId,
      
    };
    //rest api endpoint
    this.api = process.env.REACT_APP_API_URL+'/api/v1/agency';
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.tabId !== prevProps.tabId) {
      if(this.props.tabId == '3'){
        this.getDocumentData();
      }
    }
  }

  getDocumentData = () => {
    const {agencyId} = this.state;
    var url = `${this.api}/${agencyId}/showDocuments`;
    this.setState({isLoading:true});
    this.props.showDocumentsRequest(url)
    .then(() => {
      this.setState({ isLoading: false});  
    })
    .catch((err) => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    const {
      isLoading
    } = this.state;
    return (
      <div className="animated fadeIn">
        {isLoading
        ?
          <div className="sk-double-bounce">
            <div className="sk-child sk-double-bounce1"></div>
            <div className="sk-child sk-double-bounce2"></div>
          </div>
        :
          <Card>
            <CardBody>
              <Row>
                <Col xs="12" sm="8">
                  <DocumentList
                    agencyId = {this.props.agencyId}
                    isLoading = {this.state.isLoading}
                  >
                  </DocumentList>
                </Col>
                <Col xs="12" sm="4">
                  <DocumentForm
                    agencyId = {this.props.agencyId}
                    isLoading = {this.state.isLoading}
                  >
                  </DocumentForm>
                </Col>
              </Row>
            </CardBody>
          </Card>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  agencyId: state.Producer.agencyId,
  tabId: state.Producer.tabId,
})

const mapDispatchToProps = dispatch => ({//
  showDocumentsRequest: (url) => dispatch(ProducerService.showDocumentsRequest(url))//Origin
});

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
