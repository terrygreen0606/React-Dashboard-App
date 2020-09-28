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
import { TextMask, InputAdapter } from 'react-text-mask-hoc';
import Select from 'react-select';
//import 'react-select/dist/react-select.min.css';


class AgencyDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
    };
  }
  componentDidUpdate(prevProps, prevState){
    if (this.props.agencyInfo !== prevProps.agencyInfo) {
      // this.setState({
      //   agencyInfo: [],          
      // });
    }
  }

  render() {
    const {
      employee_arr,
      docGroup_arr,
      deposit_arr,
    } = this.props;
    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <Row>
            <Col md="6">
              <Row>
                <Col md="4">
                  <Label size="sm" htmlFor="web_s_WebsiteURL">Web</Label>
                </Col>
                <Col xs="12" md="8">
                  <Input
                    
                    type="text" 
                    id="web_s_WebsiteURL" 
                    name="web_s_WebsiteURL" 
                    value={this.props.agencyInfo.web_s_WebsiteURL} 
                    className="input-sm" 
                    placeholder="" 
                    onChange={this.props.handleChange}
                    onBlur={this.handleBlur}
                    required 
                  />
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Label size="sm" htmlFor="phone_s_PhoneNumber">Agency Phone</Label>
                </Col>
                <Col xs="12" md="8">
                  <TextMask
                    mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', 'e', 'x', 't', ' ', /\d/, /\d/, /\d/, /\d/, /\d/]}
                    Component={InputAdapter}
                    className="form-control"
                    type="text" 
                    id="phone_s_PhoneNumber" 
                    name="phone_s_PhoneNumber" 
                    value={this.props.agencyInfo.phone_s_PhoneNumber} 
                    placeholder="" 
                    onChange={this.props.handleChange}
                    required 
                  />
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Label size="sm" htmlFor="fax_s_FaxNumber">Agency Fax</Label>
                </Col>
                <Col xs="12" md="8">
                  <TextMask
                    mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                    Component={InputAdapter}
                    className="form-control"
                    type="text" 
                    id="fax_s_FaxNumber" 
                    name="fax_s_FaxNumber" 
                    value={this.props.agencyInfo.fax_s_FaxNumber} 
                    placeholder="" 
                    onChange={this.props.handleChange}
                    required 
                  />
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Label size="sm" htmlFor="manager_s_FirstName">Manager Name</Label>
                </Col>
                <Col xs="12" md="8">
                  <Input 
                    
                    type="text" 
                    id="manager_s_FirstName" 
                    name="manager_s_FirstName" 
                    value={this.props.agencyInfo.manager_s_FirstName} 
                    className="input-sm" 
                    placeholder="" 
                    onChange={this.props.handleChange}
                    onBlur={this.handleBlur}
                    required 
                  />

                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Label size="sm" htmlFor="manager_s_PhoneNumber">Manager Phone</Label>
                </Col>
                <Col xs="12" md="8">
                  <TextMask
                    mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', 'e', 'x', 't', ' ', /\d/, /\d/, /\d/, /\d/, /\d/]}
                    Component={InputAdapter}
                    className="form-control"
                    type="text" 
                    id="manager_s_PhoneNumber" 
                    name="manager_s_PhoneNumber" 
                    value={this.props.agencyInfo.manager_s_PhoneNumber} 
                    placeholder="" 
                    onChange={this.props.handleChange}
                    required 
                  />
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Label size="sm" htmlFor="manager_s_EmailAddress">Manager Email</Label>
                </Col>
                <Col xs="12" md="8">
                  <Input 
                    
                    type="text" 
                    id="manager_s_EmailAddress" 
                    name="manager_s_EmailAddress" 
                    value={this.props.agencyInfo.manager_s_EmailAddress} 
                    className="input-sm" 
                    placeholder="" 
                    onChange={this.props.handleChange}
                    onBlur={this.handleBlur}
                    required 
                  />
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Label size="sm" htmlFor="contact_s_ContactName">Principal Name</Label>
                </Col>
                <Col xs="12" md="8">
                  <Input 
                    
                    type="text" 
                    id="contact_s_ContactName" 
                    name="contact_s_ContactName" 
                    value={this.props.agencyInfo.contact_s_ContactName} 
                    className="input-sm" 
                    placeholder="" 
                    onChange={this.props.handleChange}
                    onBlur={this.handleBlur}
                    required 
                  />
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Label size="sm" htmlFor="contact_s_PhoneNumber">Principal Phone</Label>
                </Col>
                <Col xs="12" md="8">
                  <TextMask
                    mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', 'e', 'x', 't', ' ', /\d/, /\d/, /\d/, /\d/, /\d/]}
                    Component={InputAdapter}
                    className="form-control"
                    type="text" 
                    id="contact_s_PhoneNumber" 
                    name="contact_s_PhoneNumber" 
                    value={this.props.agencyInfo.contact_s_PhoneNumber} 
                    placeholder="" 
                    onChange={this.props.handleChange}
                    required 
                  />
                </Col>             
              </Row>
              <Row>
                <Col md="4">
                  <Label size="sm" htmlFor="contact_s_Email">Principal Email</Label>
                </Col>
                <Col xs="12" md="8">
                  <Input 
                    
                    type="text" 
                    id="contact_s_Email" 
                    name="contact_s_Email"
                    value={this.props.agencyInfo.contact_s_Email} 
                    className="input-sm" 
                    placeholder="" 
                    onChange={this.props.handleChange}
                    onBlur={this.handleBlur}
                    required 
                  />
                </Col>
              </Row>
            </Col>
            <Col md="6">  
              <Row>
                <Col md="4">
                  <Label size="sm" htmlFor="doc_n_docgroupId_FK">Select Group</Label>
                </Col>
                <Col xs="12" md="8">
                  <Input 
                    type="select" 
                    name="doc_n_docgroupId_FK" 
                    id="doc_n_docgroupId_FK" 
                    
                    onChange={this.props.handleChange}
                    onBlur={this.handleBlur}
                    value={this.props.agencyInfo.doc_n_docgroupId_FK}
                  >
                    <option value="">Select Group</option>
                    {docGroup_arr.map(docGroup => (
                      <option value={docGroup.n_docgroupname_PK}>
                        {docGroup.s_docgroupname}
                      </option>
                    ))}
                  </Input>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Label size="sm" htmlFor="s_SSNNo">FEIN Number</Label>
                </Col>
                <Col xs="12" md="8">
                  <TextMask
                    mask={[/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                    Component={InputAdapter}
                    className="form-control"
                    type="text" 
                    id="s_SSNNo" 
                    name="s_SSNNo" 
                    value={this.props.agencyInfo.s_SSNNo} 
                    placeholder="" 
                    onChange={this.props.handleChange}
                    required 
                  />
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Label size="sm" htmlFor="acc_n_AccountCode1">Direct Deposit</Label>
                </Col>
                <Col xs="12" md="8">
                  <Input 
                    type="select" 
                    name="acc_n_AccountCode1" 
                    id="acc_n_AccountCode1" 
                    
                    value={this.props.agencyInfo.acc_n_AccountCode1}
                    onChange={this.props.handleChange}
                    onBlur={this.handleBlur}
                  >
                    <option value="">Select Direct Deposit</option>
                    {deposit_arr.map(deposit => (
                      <option value={deposit.s_DepositKey}>
                        {deposit.s_DepositName}
                      </option>
                    ))}
                  </Input>
                </Col>
              </Row>
              {this.props.agencyInfo.acc_n_AccountCode1 !="" &&
              <>
                <Row>
                  <Col md="4">
                    <Label size="sm" htmlFor="acc_s_BankAccountNO">Bank Acc No</Label>
                  </Col>
                  <Col xs="12" md="8">
                    <Input 
                      
                      type="text" 
                      id="acc_s_BankAccountNO" 
                      name="acc_s_BankAccountNO" 
                      value={this.props.agencyInfo.acc_s_BankAccountNO} 
                      className="input-sm" 
                      placeholder="" 
                      onChange={this.props.handleChange}
                      onBlur={this.handleBlur}
                      required 
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <Label size="sm" htmlFor="acc_s_BankName">Bank Name</Label>
                  </Col>
                  <Col xs="12" md="8">
                    <Input 
                      
                      type="text" 
                      id="acc_s_BankName" 
                      name="acc_s_BankName" 
                      value={this.props.agencyInfo.acc_s_BankName} 
                      className="input-sm" 
                      placeholder="" 
                      onChange={this.props.handleChange}
                      onBlur={this.handleBlur}
                      required 
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <Label size="sm" htmlFor="acc_s_RoutingNO">Routing No</Label>
                  </Col>
                  <Col xs="12" md="8">
                    <Input 
                      type="text" 
                      id="acc_s_RoutingNO" 
                      name="acc_s_RoutingNO" 
                      value={this.props.agencyInfo.acc_s_RoutingNO} 
                      className="input-sm" 
                      placeholder="" 
                      onChange={this.props.handleChange}
                      onBlur={this.handleBlur}
                      required 
                    />
                  </Col>
                </Row>
              </> 
              } 
              <Row>
                <Col md="4">
                  <Label size="sm" htmlFor="role_n_UWAssigned">U/W Assign</Label>
                </Col>
                <Col style ={{ position: 'relative', zIndex: 20 }} xs="12" md="8">
                  
                  <Select
                    name="role_n_UWAssigned"
                    id="role_n_UWAssigned"
                    placeholder="Select U/W"
                    value={this.props.agencyInfo.role_n_UWAssigned}
                    options={(employee_arr ? employee_arr : []).map((item,key)=> ({
                      key: key,
                      value: item.Admin_ID,
                      label: item.s_ScreenName,
                    }))}
                    menuContainerStyle={{ zIndex: 5 }} 
                    onChange={this.props.handleUWAssignedChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Label size="sm" htmlFor="role_n_ServiceRep">Service Rep</Label>
                </Col>
                <Col style ={{ position: 'relative', zIndex: 10 }} xs="12" md="8"
                >
                  <Select
                    name="role_n_ServiceRep"
                    id="role_n_ServiceRep"
                    placeholder="Select Service Rep"
                    value={this.props.agencyInfo.role_n_ServiceRep}
                    options={(employee_arr ? employee_arr : []).map((item,key)=> ({
                      key: key,
                      value: item.Admin_ID,
                      label: item.s_ScreenName,
                    }))}
                    onChange={this.props.handleServiceRepChange}
                  />
                </Col>
              </Row>
            </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default AgencyDetail;
