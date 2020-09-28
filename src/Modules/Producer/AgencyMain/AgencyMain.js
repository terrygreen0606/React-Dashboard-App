import React, { Component } from 'react';
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

class AgencyMain extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      // agencyInfo: [],
    };

  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.agencyInfo !== prevProps.agencyInfo) {
      // this.setState({
      //   agencyInfo: this.props.agencyInfo,          
      // });
    }
  }
  
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  handleBlur = (e) => {

  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <Row className="float-center">
              <Col className="pr-1">
                <Label size="sm" htmlFor="s_PersonUniqueId" className="pr-1">Agency Code</Label>
                <Input 
                  
                  type="text" 
                  id="s_PersonUniqueId" 
                  name="s_PersonUniqueId" 
                  value={this.props.agencyInfo.s_PersonUniqueId}
                  className="input-sm"
                  placeholder=""
                  onChange={this.props.handleChange}
                  onBlur={this.handleBlur}
                  required 
                  readOnly = {this.props.agencyId != 0 ? true:false}
                />
              </Col>
              <Col className="pr-1">
                <Label size="sm" htmlFor="s_LastOrganizationName" className="pr-1">Agency Name</Label>
                <Input 
                  
                  type="text" 
                  id="s_LastOrganizationName" 
                  name="s_LastOrganizationName" 
                  value={this.props.agencyInfo.s_LastOrganizationName} 
                  className="input-sm" 
                  placeholder="" 
                  onChange={this.props.handleChange}
                  onBlur={this.handleBlur}
                  required 
                />
              </Col>
              <Col className="pr-1">
                <Label size="sm" htmlFor="s_DBAName" className="pr-1">DBA Name</Label>
                <Input 
                  
                  type="text" 
                  id="s_DBAName" 
                  name="s_DBAName" 
                  value={this.props.agencyInfo.s_DBAName} 
                  className="input-sm" 
                  placeholder="" 
                  onChange={this.props.handleChange}
                  onBlur={this.handleBlur}
                  required 
                />
              </Col>
              <Col className="pr-1">
                <Label size="sm" htmlFor="select_group">Agency Status</Label>
                <Input 
                  type="select" 
                  name="s_PersonStatusCode" 
                  id="s_PersonStatusCode" 
                  
                  onChange={this.props.handleChange}
                  onBlur={this.handleBlur}
                  value = {this.props.agencyInfo.s_PersonStatusCode} 
                  required 
                >
                  <option value="">-Select-</option>
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                </Input>
              </Col>
              <Col className="pr-1">
                <Label size="sm" htmlFor="s_PayeeName" className="pr-1">EFT Payee Name</Label>
                <Input 
                  
                  type="text" 
                  id="s_PayeeName" 
                  name="s_PayeeName" 
                  value={this.props.agencyInfo.s_PayeeName} 
                  className="input-sm" 
                  placeholder="" 
                  onChange={this.props.handleChange}
                  onBlur={this.handleBlur}
                  required 
                />
              </Col>
              {this.props.agencyInfo.s_PersonStatusCode =="Closed" &&
                <Col className="pr-1">
                  <Label size="sm" htmlFor="s_PaActivityLogNotes" className="pr-1">Closed Reason</Label>
                  <Input
                    
                    type="text"
                    id="s_PaActivityLogNotes"
                    name="s_PaActivityLogNotes"
                    value={this.props.agencyInfo.s_PaActivityLogNotes} 
                    className="input-sm"
                    placeholder="" 
                    onChange={this.props.handleChange}
                    required
                  />
                </Col>
              }  
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default AgencyMain;
