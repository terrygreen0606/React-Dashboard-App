import React, { Component } from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import ReeValidate from 'ree-validate';
import Http from '../../../Http';
import * as action from '../../../store/actions/producer';
import ProducerService from '../../../services/Producer';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  Container,
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
  PaginationLink ,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';


import AgencyMain from '../AgencyMain';
import AgencyMailingAddress from '../AgencyMailingAddress';
import AgencyLocationAddress from '../AgencyLocationAddress';
import AgencyDetail from '../AgencyDetail';
import AgencyProduct from '../AgencyProduct';
import AgencyLicense from '../AgencyLicense';
import AgencySearchForm from '../AgencySearchForm';

class Agency extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: JSON.parse(sessionStorage.getItem('user')),
      saveType: 'update',
      collapse: true,
      fadeIn: true,
      timeout: 300,
      agencyInfo: [],
      commRate_arr: [],
      licManager_arr: [],
      employee_arr: [],
      docGroup_arr: [],
      deposit_arr: [],
      product_arr: [],
      state_arr: [],
      commRGM_arr: [],
      zipDetail_arr: [],
      tempAddressInfo: {},
      error: false,
      isLoading: false,
      modal:false,
      addrType: '',
      copyLocAddrFlag: false,
    };
    //rest api endpoint
    this.api = process.env.REACT_APP_API_URL+'/api/v1/agency';

  }

  componentDidMount() {
    this.getAgencyData();
  }

  static getDerivedStateFromProps(nextProps, prevState){
    // this.props.setClick(this.reloadAUserTable);
    if(nextProps.tabId !== prevState.tabId){
      return null
    }else{
      return null;
    }
  }

//**
  componentDidUpdate(prevProps, prevState){
    if (this.props.agencyId !== prevProps.agencyId) {

      if(this.props.agencyId == 0){
        this.newAgency();
        this.props.handleSwitchNew();
      }else if(this.props.tabId == '1'){

        this.getAgencyData();
      }
    }
    if (this.props.tabId !== prevProps.tabId) {
      if(this.props.tabId == '1'){
        this.getAgencyData();
      }
    }
  }
//**
  //get Agency
  getAgencyData = () => {
    this.setState({isLoading: true});
    Http.get(`${this.api}/${this.props.agencyId}`)
      .then((response) => {
        const { data } = response.data;
        this.setState({
          isLoading: false,
          agencyInfo: data.main,
          commRate_arr: data.commRate_arr,
          licManager_arr: data.licManager_arr,
          employee_arr: data.employee_arr,
          docGroup_arr: data.docGroup_arr,
          deposit_arr: data.deposit_arr,
          product_arr: data.product_arr,
          state_arr: data.state_arr,
          commRGM_arr: data.commRGM_arr,
          error: false,
        });
        this.backuplocAddressInfo();
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          error: 'Unable to fetch data.',
        });
      });
  }

  //new agency
  handleNewAgency = (e) => {
    e.preventDefault();
    this.newAgency();
    this.props.handleSwitchNew();
  }

  selectAddress = (index) => {
    var { zipDetail_arr, agencyInfo, addrType, copyLocAddrFlag } = this.state;
    if(addrType == 'mail'){
      agencyInfo.mail_s_CityName    = zipDetail_arr[index].s_CityName;
      agencyInfo.mail_s_CountyName  = zipDetail_arr[index].s_CountyCode;
      agencyInfo.mail_s_StateName   = zipDetail_arr[index].s_StateCode;
      agencyInfo.mail_n_CountyId_FK = zipDetail_arr[index].n_CountyId_FK;
      agencyInfo.mail_n_CityId_FK   = zipDetail_arr[index].n_CityId_PK;
      agencyInfo.mail_n_CountryId_FK = zipDetail_arr[index].n_CountryId_FK;
      agencyInfo.mail_n_StateId_FK  = zipDetail_arr[index].n_StateId_PK;
      if(copyLocAddrFlag){
        this.handleCopyLocFromMail(copyLocAddrFlag);
      }
    }

    if( addrType == 'location'){
      agencyInfo.loc_s_CityName     = zipDetail_arr[index].s_CityName;
      agencyInfo.loc_s_CountyName   = zipDetail_arr[index].s_CountyCode;
      agencyInfo.loc_s_StateName    = zipDetail_arr[index].s_StateCode;
      agencyInfo.loc_n_CountyId_FK  = zipDetail_arr[index].n_CountyId_FK;
      agencyInfo.loc_n_CityId_FK    = zipDetail_arr[index].n_CityId_PK;
      agencyInfo.loc_n_CountryId_FK = zipDetail_arr[index].n_CountryId_FK;
      agencyInfo.loc_n_StateId_FK   = zipDetail_arr[index].n_StateId_PK;
    }


    this.setState({
      modal: false,
      agencyInfo: agencyInfo,
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    var agencyInfo = this.state.agencyInfo;
    agencyInfo[name] = value;
    this.setState({agencyInfo: agencyInfo});
    this.backuplocAddressInfo();
  }

  handleServiceRepChange = selectedOption => {
    const agencyInfo = this.state.agencyInfo
    agencyInfo.role_n_ServiceRep = selectedOption === null ? 0 : selectedOption.value;
    this.setState({
      agencyInfo
    });
  }

  handleUWAssignedChange = selectedOption => {
    const agencyInfo = this.state.agencyInfo
    agencyInfo.role_n_UWAssigned = selectedOption === null ? 0 : selectedOption.value;
    this.setState({
      agencyInfo
    });
  }

  //product change
  handleProductChange = (index, dataType, value) => {
    const commRGM_arr = this.state.commRGM_arr;
    const commRate_arr = this.state.commRate_arr.map((item, i) => {
      if (i == index) {
        const productType = 'n_CommRuleGroupMasters_FK';
        var productVal = 0;
        if(dataType == 'n_ProductId_FK'){
          for (var i = commRGM_arr.length - 1; i >= 0; i--) {
            if(commRGM_arr[i].n_Product_FK == value){
              productVal = commRGM_arr[i].n_CommRuleGroupMasters_PK;
            }
          }
          return {...item, [dataType]: value, [productType]: productVal};
        }else{
          return {...item, [dataType]: value};
        }
      }
      return item;
    });

    this.setState({
       commRate_arr: commRate_arr
    });
  }

  handleLicenseChange = (index, dataType, value) => {
    const licManager_arr = this.state.licManager_arr.map((item, i) => {
      if (i == index) {
        return {...item, [dataType]: value};
      }
      return item;
    });

    this.setState({
       licManager_arr: licManager_arr
    });
  }

  //locaiton check box event
  handleCopyLocFromMail = (value) => {
    var {agencyInfo, tempAddressInfo} = this.state;

    agencyInfo.loc_n_CityId_FK = (value ? agencyInfo.mail_n_CityId_FK : tempAddressInfo.loc_n_CityId_FK);
    agencyInfo.loc_n_CountryId_FK = (value? agencyInfo.mail_n_CountryId_FK : tempAddressInfo.loc_n_CountryId_FK);
    agencyInfo.loc_n_CountyId_FK = (value ? agencyInfo.mail_n_CountyId_FK : tempAddressInfo.loc_n_CountyId_FK);
    agencyInfo.loc_n_StateId_FK = (value ? agencyInfo.mail_n_StateId_FK : tempAddressInfo.loc_n_StateId_FK);
    agencyInfo.loc_s_AddressLine1 = (value ? agencyInfo.mail_s_AddressLine1 : tempAddressInfo.loc_s_AddressLine1);
    agencyInfo.loc_s_AddressLine2 = (value ? agencyInfo.mail_s_AddressLine2 : tempAddressInfo.loc_s_AddressLine2);
    agencyInfo.loc_s_AddressLine3 = (value ? agencyInfo.mail_s_AddressLine3 : tempAddressInfo.loc_s_AddressLine3);
    agencyInfo.loc_s_CityName = (value ? agencyInfo.mail_s_CityName : tempAddressInfo.loc_s_CityName);
    agencyInfo.loc_s_CountyName = (value ? agencyInfo.mail_s_CountyName : tempAddressInfo.loc_s_CountyName);
    agencyInfo.loc_s_PostalCode = (value ? agencyInfo.mail_s_PostalCode : tempAddressInfo.loc_s_PostalCode);
    agencyInfo.loc_s_StateName = (value ? agencyInfo.mail_s_StateName : tempAddressInfo.loc_s_StateName);

    this.setState({
      agencyInfo: agencyInfo,
      copyLocAddrFlag: value,
    });
  }

  backuplocAddressInfo = () =>{
    var {tempAddressInfo, agencyInfo} = this.state;

    tempAddressInfo.loc_n_CityId_FK = agencyInfo.loc_n_CityId_FK;
    tempAddressInfo.loc_n_CountryId_FK = agencyInfo.loc_n_CountryId_FK;
    tempAddressInfo.loc_n_CountyId_FK = agencyInfo.loc_n_CountyId_FK;
    tempAddressInfo.loc_n_StateId_FK = agencyInfo.loc_n_StateId_FK;
    tempAddressInfo.loc_s_AddressLine1 = agencyInfo.loc_s_AddressLine1;
    tempAddressInfo.loc_s_AddressLine2 = agencyInfo.loc_s_AddressLine2;
    tempAddressInfo.loc_s_AddressLine3 = agencyInfo.loc_s_AddressLine3;
    tempAddressInfo.loc_s_CityName = agencyInfo.loc_s_CityName;
    tempAddressInfo.loc_s_CountyName = agencyInfo.loc_s_CountyName;
    tempAddressInfo.loc_s_PostalCode = agencyInfo.loc_s_PostalCode;
    tempAddressInfo.loc_s_StateName = agencyInfo.loc_s_StateName;

    this.setState({
      tempAddressInfo: tempAddressInfo,
    });
  }

  //new agency
  newAgency = () => {

    var { agencyInfo } = this.state;
    agencyInfo = Object.fromEntries(Object.keys(agencyInfo).map(key => [key, ""]));
    this.setState({
      agencyId : this.props.agencyId,
      agencyInfo,
      commRate_arr: [],
      licManager_arr: []
    });
  }

  //save
  saveAgency = () => {

    const {
      agencyInfo,
      commRate_arr,
      licManager_arr,
      employee_arr,
      docGroup_arr,
      deposit_arr,
      product_arr,
      state_arr,
      commRGM_arr,
      zipDetail_arr,
    } = this.state;
    const userData = JSON.parse(sessionStorage.getItem('user'));
    this.setState({isLoading: true});

    if(this.props.agencyId != 0){//edit
      Http.put(`${this.api}/${this.props.agencyId}/`,
        { agencyInfo,
          commRate_arr,
          licManager_arr,
          userData,
        })
        .then(({ data }) => {

          this.setState({
            error: 'Success!',
            isLoading: false,
          });
          //success toastr
          toast.info('Success!');
        })
        .catch(() => {
          this.setState({
            error: 'Error!',
            isLoading: false,
          });
          //success toastr
          toast.error('Error!');
        });
    }else{//add
      Http.post(`${this.api}`,
        { agencyInfo,
          commRate_arr,
          licManager_arr,
          userData,
        })
        .then(({ data }) => {
          this.setState({
            error: 'Success!',
            isLoading: false,
          });
          this.props.loadAgency(data.id);
          //success toastr
          // toast.info('Success!');
        })
        .catch(() => {
          this.setState({
            error: 'Error!',
            isLoading: false,
          });
          //success toastr
          toast.error('Error!');
        });
    }
  }

  //product add new row
  handleProductAddRow = () => {
    const item = {
      d_CreatedDate: "",
      d_LicenseEffectiveDate: "",
      d_LicenseExpiryDate: "",
      d_RateEffectiveDate: "",
      d_UpdatedDate: "",
      d_RateExpireDate: "",
      n_CommRateId_PK: 0,
      n_CommRuleGroupMasters_FK: 0,
      n_EditVersion: 0,
      n_PersonInfoId_FK: 0,
      n_ProductId_FK: 0,
      n_SplTerm1RatePc: 0,
      n_SplTerm2RatePc: 0,
      n_StateId_FK: 0,
      n_Term1RatePc: 0,
      n_Term2RatePc: 0,
      n_UpdatedUser: 0,
      s_IsDiscontinued: "",
      s_LicenseNo: ""
    };
    this.setState({
      commRate_arr: [...this.state.commRate_arr, item]
    });
  }

  handleProductRemoveSpecificRow = (e, idx) => {
    e.preventDefault();
    const commRate_arr = [...this.state.commRate_arr];
    commRate_arr.splice(idx, 1);
    this.setState({ commRate_arr });
  }

  handleLicenseAddRow = () => {
    const item = {
      n_LicenseManagersId_PK: 0,
      n_PersonInfoId_FK: 0,
      n_LicenseType: 0,
      s_LicenseNo: "",
      n_StateId_FK: 0,
      d_IssueDate: "",
      d_ExpireDate: "",
      d_AppDate: "",
      n_appointyType: 0,
      s_PersonLicenseType: "",
      s_PersonLicenseSubType: "",
      Is_PersonLicenseActive_YN: "",
      n_CreatedUser: 0,
      d_CreatedDate: "",
      n_UpdatedUser: 0,
      d_UpdatedDate: "",
      n_EditVersion: 0,
    };
    this.setState({
      licManager_arr: [...this.state.licManager_arr, item]
    });
  }

  handleLicenseRemoveSpecificRow = (e, idx) => {
    e.preventDefault();
    const licManager_arr = [...this.state.licManager_arr];
    licManager_arr.splice(idx, 1);
    this.setState({ licManager_arr });
  }

  modalSwitch = (addType) => {
    this.setState({
      modal: !this.state.modal
    });
  }

  getCityInfo = (e, addrType) => {

    const zipCode = e.target.value;
    const {agencyId} = this.state;
    Http.get(`${this.api}/${agencyId}/zipDetail/${zipCode}`)
      .then((response) => {
        const { data } = response.data;
        this.setState({
          zipDetail_arr: data,
          addrType: addrType,
          error: false,
        });
        //if length == 1 then fill without open modal
        if(data.length == 1){
          this.selectAddress(0);
        }else{
          this.setState({
            modal: !this.state.modal
          });
        }
      })
      .catch(() => {
        this.setState({
          error: 'Unable to fetch data.',
          modal: !this.state.modal
        });
      });
  }
  render() {
    const containerStyle = {
      zIndex: 1999
    };
    const {
      isLoading,
      agencyInfo,
      commRate_arr,
      licManager_arr,
      employee_arr,
      docGroup_arr,
      deposit_arr,
      product_arr,
      state_arr,
      commRGM_arr,
      zipDetail_arr,
      error,
    } = this.state;
    return (
      <div className="animated fadeIn">
        <ToastContainer position="top-right" autoClose={5000} style={containerStyle}/>
        <AgencySearchForm
          agencyId = { this.props.agencyId }
        />
      {isLoading
        ?
        <div className="sk-double-bounce">
          <div className="sk-child sk-double-bounce1"></div>
          <div className="sk-child sk-double-bounce2"></div>
        </div>
        :
        <Form action="" method="post" onSubmit={this.handleSubmit} ref={(el) => { this.agencyForm = el; }} >
          <Card>
            <CardBody>
              <Row>
                <Container>
                 <Modal size='sm' isOpen={this.state.modal} toggle={this.modalSwitch}>
                   <ModalHeader toggle={this.modalSwitch}>
                    City
                   </ModalHeader>
                   <ModalBody>
                    {zipDetail_arr.length ? '':'Zip code is not valid!'}
                    {zipDetail_arr.map((zipDetail, index) =>{
                      return (
                        <Row key={index}>
                          <Col xs="1">
                            {index}{')'}
                          </Col>
                          <Col xs="6" className="px-0">
                            <NavLink href="#" style={{ padding: "0px" }} onClick={() => this.selectAddress(index)}>
                              {zipDetail.s_CityName}
                            </NavLink>
                          </Col>
                          <Col xs="4" className="px-0">
                            {zipDetail.s_ZipCounty}
                          </Col>
                        </Row>
                      )
                    })}
                   </ModalBody>
                  </Modal>
                </Container>
              </Row>
              <Row>
                <Col xs="12">
                  <AgencyMain
                    agencyInfo = { agencyInfo }
                    agencyId = { this.props.agencyId }
                    handleChange = { this.handleChange }
                  />
                </Col>
              </Row>
              <Row>
                <Col xs="12" sm="3">
                  <AgencyMailingAddress
                    agencyInfo = { agencyInfo }
                    handleChange = { this.handleChange }
                    getCityInfo = { this.getCityInfo }
                  />
                </Col>
                <Col xs="12" sm="3">
                 <AgencyLocationAddress
                    agencyInfo = { agencyInfo }
                    handleCopyLocFromMail = { this.handleCopyLocFromMail }
                    handleChange = { this.handleChange }
                    getCityInfo = { this.getCityInfo }
                  />
                </Col>
                <Col xs="12" sm="6">
                  <AgencyDetail
                    agencyInfo = { agencyInfo }
                    employee_arr = { employee_arr }
                    docGroup_arr = { docGroup_arr }
                    deposit_arr = { deposit_arr }
                    handleChange = { this.handleChange }
                    handleServiceRepChange = {this.handleServiceRepChange}
                    handleUWAssignedChange = {this.handleUWAssignedChange}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
          <AgencyProduct
            commRate_arr = { commRate_arr }
            commRGM_arr = { commRGM_arr }
            product_arr = { product_arr }
            handleChange = { this.handleProductChange }
            handleAddRow = { this.handleProductAddRow }
            handleRemoveSpecificRow = { this.handleProductRemoveSpecificRow }
          />
          <AgencyLicense
            licManager_arr = { licManager_arr }
            state_arr = { state_arr }
            handleChange = { this.handleLicenseChange }
            handleAddRow = { this.handleLicenseAddRow }
            handleRemoveSpecificRow = { this.handleLicenseRemoveSpecificRow }
          />
          <div className="text-center">
            <Button color="info" className="btn-xing btn-brand mr-1 mb-1" onClick={this.saveAgency}>
              <span>{this.props.agencyId == 0 ? 'Save Agency' : 'Update Agency'}</span>
            </Button>
            <Button color="info" className="btn-xing btn-brand mr-1 mb-1" onClick={() => this.props.loadAgency(0)}><span>New Agency</span></Button>
          </div>
        </Form>
      }
      </div>
    );
  }
}


const mapStateToProps = state => ({
  agencyId: state.Producer.agencyId,
  tabId: state.Producer.tabId
})

const mapDispatchToProps = dispatch => ({
  loadAgency: (n_PersonInfoId_PK) => dispatch(action.loadAgency(n_PersonInfoId_PK)),//Origin
  switchSearchAgencyModal: (modalFlag) => dispatch(action.switchSearchAgencyModal(modalFlag))
})

export default connect(mapStateToProps, mapDispatchToProps)(Agency);
