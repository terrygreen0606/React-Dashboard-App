import React, { Component } from 'react';
import Http from '../../../Http';
import { articleListRequest, articleUpdateRequest, articleRemoveRequest } from '../../../services/Producer';

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

import LogList from '../LogList';
import LogForm from '../LogForm';
// import AgencyDetail from '../AgencyDetail';

class Logs extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      isLoading: false,
      agencyId: this.props.agencyId,
      collapse: true,
      fadeIn: true,
      timeout: 300,
      Log_arr: []
    };
    //rest api endpoint
    this.api = process.env.REACT_APP_API_URL+'/api/v1/agency';
  }


  componentDidMount() {
    // this.setState({isLoading: true});
    // const {
    //   agencyId
    // } = this.state;

    // Http.get(`${this.api}/${agencyId}/showLogs/AGENCYLOG,AGENCYCLOSELOG`,
    // { 
    //   logType:"AGENCYLOG,AGENCYCLOSELOG"
    // })
    //   .then((response) => {
    //     const { data } = response.data;
    //     this.setState({
    //       isLoading: false,
    //       Log_arr: data,
    //       error: false,
    //     });
    //   })
    //   .catch(() => {
    //     this.setState({
    //       isLoading: false,
    //       error: 'Unable to fetch data.',
    //     });
    //   });

  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    const {
      isLoading, 
      Log_arr,
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
      <>      
        <Card>
          <CardBody>
            <Row>
              <Col xs="12" sm="12">
                <LogForm 
                  agencyId = {this.props.agencyId}
                >
                </LogForm>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Row>
              <Col xs="12" sm="12">
                <LogList
                  
                  agencyId = {this.props.agencyId}
                >
                </LogList>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </>
      }    
      </div>
    );
  }
}

export default Logs;
