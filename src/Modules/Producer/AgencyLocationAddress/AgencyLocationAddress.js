import React, { Component } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CustomInput,
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

class AgencyLocationAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      // agencyInfo: []
    };
  }

  componentDidMount() {
    // var agencyMailInfo = agencyAddrInfo[0];
    // this.setState({agencyInfo: this.props.agencyInfo});
  }

  // componentDidUpdate(prevProps, prevState){
  //   if (this.props.agencyInfo !== prevProps.agencyInfo) {
  //     this.setState({
  //       agencyInfo: [],          
  //     });
  //   }
  // }
  
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <strong>Agency Location Address</strong>
            <FormGroup check className="checkbox float-right">
              <CustomInput
                type="checkbox"
                id="checkCopy"
                value="checked"
                label="Copy as mailing Address."
                onChange={(e) => this.props.handleCopyLocFromMail(e.target.checked) }
                
                >
              </CustomInput>
            </FormGroup>
            <hr/> 
            <div >
              <Row>
                <Col md="3">
                  <Label size="sm" htmlFor="loc_s_AddressLine1">Address 1</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    
                    type="text"
                    id="loc_s_AddressLine1"
                    name="loc_s_AddressLine1"
                    className="input-sm"
                    placeholder=""
                    value={this.props.agencyInfo.loc_s_AddressLine1} 
                    onChange={this.props.handleChange}
                    onBlur={this.handleBlur}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col md="3">
                  <Label size="sm" htmlFor="loc_s_AddressLine2">Address 2</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input 
                    
                    type="text" 
                    id="loc_s_AddressLine2" 
                    name="loc_s_AddressLine2" 
                    className="input-sm" 
                    placeholder="" 
                    value={this.props.agencyInfo.loc_s_AddressLine2} 
                    onChange={this.props.handleChange}
                    onBlur={this.handleBlur}
                    required 
                  />
                </Col>
              </Row>
              <Row>
                <Col md="3">
                  <Label size="sm" htmlFor="loc_s_AddressLine3">Address 3</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input 
                    
                    type="text" 
                    id="loc_s_AddressLine3" 
                    name="loc_s_AddressLine3" 
                    className="input-sm" 
                    placeholder="" 
                    value={this.props.agencyInfo.loc_s_AddressLine3} 
                    onChange={this.props.handleChange}
                    onBlur={this.handleBlur}
                    required />
                </Col>
              </Row>
              <Row>
                <Col md="3">
                  <Label size="sm" htmlFor="loc_s_PostalCode">Zip</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input 
                    
                    type="text" 
                    id="loc_s_PostalCode" 
                    name="loc_s_PostalCode" 
                    className="input-sm" 
                    placeholder="" 
                    value={this.props.agencyInfo.loc_s_PostalCode} 
                    onChange={this.props.handleChange}
                    onBlur={ (e) => this.props.getCityInfo(e, 'location')}
                    required 
                  />
                </Col>
              </Row>
              <Row>
                <Col md="3">
                  <Label size="sm" htmlFor="loc_s_CityName">City</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input 
                    
                    type="text" 
                    id="loc_s_CityName" 
                    name="loc_s_CityName" 
                    className="input-sm" 
                    placeholder="" 
                    value={this.props.agencyInfo.loc_s_CityName} 
                    onChange={this.props.handleChange}
                    onBlur={this.handleBlur}
                    required 
                    readOnly
                  />
                </Col>
              </Row>
              <Row>
                <Col md="3">
                  <Label size="sm" htmlFor="loc_s_StateName">State</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input 
                    
                    type="text" 
                    id="loc_s_StateName" 
                    name="loc_s_StateName" 
                    className="input-sm" 
                    placeholder="" 
                    value={this.props.agencyInfo.loc_s_StateName} 
                    onChange={this.props.handleChange}
                    onBlur={this.handleBlur}
                    required 
                    readOnly
                  />
                </Col>
              </Row>
              <Row>
                <Col md="3">
                  <Label size="sm" htmlFor="loc_s_CountyName">County</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input 
                    
                    type="text" 
                    id="loc_s_CountyName" 
                    name="loc_s_CountyName" 
                    className="input-sm" 
                    placeholder=""
                    value={this.props.agencyInfo.loc_s_CountyName} 
                    onChange={this.props.handleChange}
                    onBlur={this.handleBlur} 
                    required 
                    readOnly
                  />
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default AgencyLocationAddress;
