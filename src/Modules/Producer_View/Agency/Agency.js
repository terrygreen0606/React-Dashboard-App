import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import * as action from '../../../store/actions/producer';
import ProducerService from '../../../services/Producer';
import Http from '../../../Http';

import {
  Col,
  Form,
  Row,
  Button, Modal, ModalHeader, ModalBody, NavLink, Container,
} from 'reactstrap';

import AgencyMain from '../AgencyMain';
import AgencyMailingAddress from '../AgencyMailingAddress';
import AgencyLocationAddress from '../AgencyLocationAddress';
import AgencyDetail from '../AgencyDetail';
import AgencyProduct from '../AgencyProduct';
import AgencyLicense from '../AgencyLicense';
import AgencySearch from '../AgencySearch';
import Logs from '../Logs';
import Association from '../Association';

import { setAsideComponent } from '../../../store/actions/common';
import * as AsideTypes from '../../../services/asideService';
import ProducerModal from '../ProducerModal/ProducerModal';

class Agency extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
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
      modal: false,
      addrType: '',
      copyLocAddrFlag: false,
      isOpenModal: false,
      showBankDetail: true,
    };
    //rest api endpoint
    this.api = process.env.REACT_APP_API_URL + '/api/v1/agency';

  }

  componentDidMount() {
    this.getAgencyData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.agencyId !== prevProps.agencyId) {

      if (this.props.agencyId == 0) {
        this.newAgency();
      } else {
        this.getAgencyData();
      }
    }

    if (this.props.saveSync !== prevProps.saveSync) {
      this.saveAgency();
    }
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleModal() {
    this.setState({ isOpenModal: !this.state.isOpenModal })
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState } });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { agencyInfo } = this.state;
  }

  selectAddress = (index) => {
    var { zipDetail_arr, agencyInfo, addrType, copyLocAddrFlag } = this.state;
    if (addrType == 'mail') {
      agencyInfo.mail_s_CityName = zipDetail_arr[index].s_CityName;
      agencyInfo.mail_s_CountyName = zipDetail_arr[index].s_CountyCode;
      agencyInfo.mail_s_StateName = zipDetail_arr[index].s_StateCode;
      agencyInfo.mail_n_CountyId_FK = zipDetail_arr[index].n_CountyId_FK;
      agencyInfo.mail_n_CityId_FK = zipDetail_arr[index].n_CityId_PK;
      agencyInfo.mail_n_CountryId_FK = zipDetail_arr[index].n_CountryId_FK;
      agencyInfo.mail_n_StateId_FK = zipDetail_arr[index].n_StateId_PK;
      if (copyLocAddrFlag) {
        this.handleCopyLocFromMail(copyLocAddrFlag);
      }
    }

    if (addrType == 'location') {
      agencyInfo.loc_s_CityName = zipDetail_arr[index].s_CityName;
      agencyInfo.loc_s_CountyName = zipDetail_arr[index].s_CountyCode;
      agencyInfo.loc_s_StateName = zipDetail_arr[index].s_StateCode;
      agencyInfo.loc_n_CountyId_FK = zipDetail_arr[index].n_CountyId_FK;
      agencyInfo.loc_n_CityId_FK = zipDetail_arr[index].n_CityId_PK;
      agencyInfo.loc_n_CountryId_FK = zipDetail_arr[index].n_CountryId_FK;
      agencyInfo.loc_n_StateId_FK = zipDetail_arr[index].n_StateId_PK;
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
    this.setState({ agencyInfo: agencyInfo });
    this.backuplocAddressInfo();
    if (name == 'acc_n_AccountCode1') {
      if (value == 'DIRDEPOT') {
        this.setState({
          showBankDetail: false
        });
      } else {
        this.setState({
          showBankDetail: true
        });
      }
    }
  }

  handleClick = (e) => {
    const { name, value } = e.target;
    const agencyInfo = this.state.agencyInfo;
    agencyInfo.s_DBAName = value == '' ? agencyInfo.s_LastOrganizationName : agencyInfo.s_DBAName;
    this.setState({
      agencyInfo
    });
  }

  handleClick = (e) => {
    const { name, value } = e.target;
    const agencyInfo = this.state.agencyInfo;
    agencyInfo.s_DBAName = value == '' ? agencyInfo.s_LastOrganizationName : agencyInfo.s_DBAName;
    this.setState({
      agencyInfo
    });
  }
  //for select2 tag
  handleServiceRepChange = selectedOption => {
    const agencyInfo = this.state.agencyInfo
    agencyInfo.role_n_ServiceRep = selectedOption === null ? 0 : selectedOption.value;
    this.setState({
      agencyInfo
    });
  }
  //for select2 tag
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
        if (dataType == 'n_ProductId_FK') {
          for (var i = commRGM_arr.length - 1; i >= 0; i--) {
            if (commRGM_arr[i].n_Product_FK == value) {
              productVal = commRGM_arr[i].n_CommRuleGroupMasters_PK;
            }
          }
          return { ...item, [dataType]: value, [productType]: productVal };
        } else {
          return { ...item, [dataType]: value };
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
        return { ...item, [dataType]: value };
      }
      return item;
    });

    this.setState({
      licManager_arr: licManager_arr
    });
  }

  //locaiton check box event
  handleCopyLocFromMail = (value) => {
    var { agencyInfo, tempAddressInfo } = this.state;

    agencyInfo.loc_n_CityId_FK = (value ? agencyInfo.mail_n_CityId_FK : tempAddressInfo.loc_n_CityId_FK);
    agencyInfo.loc_n_CountryId_FK = (value ? agencyInfo.mail_n_CountryId_FK : tempAddressInfo.loc_n_CountryId_FK);
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

  backuplocAddressInfo = () => {
    var { tempAddressInfo, agencyInfo } = this.state;

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

  //get Agency
  getAgencyData = () => {
    this.setState({ isLoading: true });
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
  //new agency
  newAgency = () => {
    var { agencyInfo } = this.state;
    agencyInfo = Object.fromEntries(Object.keys(agencyInfo).map(key => [key, ""]));
    this.setState({
      agencyId: this.props.agencyId,
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
    if (agencyInfo.s_PersonUniqueId == '' || agencyInfo.s_PersonUniqueId == null) {
      toast.error('Please Enter Unique No!');
    } else if (agencyInfo.s_LastOrganizationName == '' || agencyInfo.s_LastOrganizationName == null) {
      toast.error('Please Enter Agency Name');
    } else if (agencyInfo.s_DBAName == '' || agencyInfo.s_DBAName == null) {
      toast.error('Please Enter Agency DBA Name');
    } else if (agencyInfo.s_SSNNo == '' || agencyInfo.s_SSNNo == null) {
      toast.error('Please FEIN Number');
    } else if (agencyInfo.mail_s_AddressLine1 == '' || agencyInfo.mail_s_AddressLine1 == null) {
      toast.error('Please Enter Agency Address');
    } else if (agencyInfo.mail_s_PostalCode == '' || agencyInfo.mail_s_PostalCode == null) {
      toast.error('Please Enter Agency Zipcode');
    } else if (agencyInfo.phone_s_PhoneNumber == '' || agencyInfo.phone_s_PhoneNumber == null) {
      toast.error('Please Enter Agency Phone');
    } else if (agencyInfo.fax_s_FaxNumber == '' || agencyInfo.fax_s_FaxNumber == null) {
      toast.error('Please Enter Agency Fax');
    } else if (agencyInfo.contact_s_ContactName == '' || agencyInfo.contact_s_ContactName == null) {
      toast.error('Please Enter Principle Name');
    } else if (agencyInfo.contact_s_PhoneNumber == '' || agencyInfo.contact_s_PhoneNumber == null) {
      toast.error('Please Enter Principle Phone');
    } else if (agencyInfo.contact_s_Email == '' || agencyInfo.contact_s_Email == null) {
      toast.error('Please Enter Principle Email');
    } else {
      this.setState({ isLoading: true });

      if (this.props.agencyId != 0) {//edit
        Http.put(`${this.api}/${this.props.agencyId}`,
          {
            agencyInfo,
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
      } else {//add
        Http.post(`${this.api}`,
          {
            agencyInfo,
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
    const name = e.target.name;
    const { agencyId } = this.state;
    var agencyInfo = this.state.agencyInfo;
    var msg = '';
    Http.get(`${this.api}/${agencyId}/zipDetail/${zipCode}`)
      .then((response) => {
        const { data } = response.data;
        this.setState({
          zipDetail_arr: data,
          addrType: addrType,
          error: false,
        });
        //if length == 1 then fill without open modal
        if (data.length == 1) {
          this.selectAddress(0);
        } else if (data.length == 0) {
          agencyInfo[name] = '';
          if (addrType == 'location') {
            agencyInfo['loc_s_CityName'] = '';
            agencyInfo['loc_s_StateName'] = '';
            agencyInfo['loc_s_CountyName'] = '';
            msg = 'Location Zip code is not valid!';
          } else {
            agencyInfo['mail_s_CityName'] = '';
            agencyInfo['mail_s_StateName'] = '';
            agencyInfo['mail_s_CountyName'] = '';
            msg = 'Mailing Zip code is not valid!'
          }
          this.setState({ agencyInfo: agencyInfo });
          toast.error(msg);
        } else {
          this.setState({
            modal: !this.state.modal
          });
        }
      })
      .catch(() => {
        this.setState({
          error: 'Unable to fetch data.',
          //modal: !this.state.modal
        });
        toast.error('Unable to fetch data!');
      });
  }

  handleModal = (asideType) => {
    const { setAsideComponent } = this.props;
    setAsideComponent(asideType);
    this.toggleModal();
  }

  validateFields = (e) => {
    var msg;
    const target_array = e.currentTarget.id.split('_');
    const target = target_array[2];
    const { name, value } = e.target;
    var agencyInfo = this.state.agencyInfo;
    if (target == 'EmailAddress') {
      const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!regEx.test(e.currentTarget.value)) {
        msg = 'Please enter valid email address!';
        toast.error(msg);
        agencyInfo[name] = '';
      }
    } else if (target == 'PhoneNumber') {
      var temp = e.currentTarget.value.replace(/[- )(_]/g, '');
      if (temp.length != 10) {
        msg = 'Please enter valid phone number!';
        toast.error(msg);
        agencyInfo[name] = '';
      }
    } else if (target == 'FaxNumber') {
      var temp = e.currentTarget.value.replace(/[- )(_]/g, '');
      if (temp.length != 10) {
        msg = 'Please enter valid Fax number!';
        toast.error(msg);
        agencyInfo[name] = '';
      }
    }
    this.setState({ agencyInfo: agencyInfo });
  }

  render() {
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
      showBankDetail,
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
          <Form action="" method="post" onSubmit={this.handleSubmit} ref={(el) => { this.agencyForm = el; }} >
            <Row>
              <Col xs="12">
                <AgencyMain
                  agencyId={this.props.agencyId}
                  agencyInfo={agencyInfo}
                  handleChange={this.handleChange}
                  handleClick={this.handleClick}
                  docGroup_arr={docGroup_arr}
                  employee_arr={employee_arr}
                  handleServiceRepChange={this.handleServiceRepChange}
                  handleUWAssignedChange={this.handleUWAssignedChange}
                />
              </Col>
            </Row>
            <Container>
              <Modal size='sm' isOpen={this.state.modal} toggle={this.modalSwitch}>
                <ModalHeader toggle={this.modalSwitch}>
                  City
              </ModalHeader>
                <ModalBody>
                  {zipDetail_arr.length ? '' : 'Zip code is not valid!'}
                  {zipDetail_arr.map((zipDetail, index) => {
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
            <Row className="mt-5">
              <Col sm="12" md="9">
                <AgencyMailingAddress
                  agencyInfo={agencyInfo}
                  handleChange={this.handleChange}
                  getCityInfo={this.getCityInfo}
                />
                <AgencyLocationAddress
                  agencyInfo={agencyInfo}
                  handleCopyLocFromMail={this.handleCopyLocFromMail}
                  handleChange={this.handleChange}
                  getCityInfo={this.getCityInfo}
                />
                <AgencyDetail
                  agencyInfo={agencyInfo}
                  employee_arr={employee_arr}
                  docGroup_arr={docGroup_arr}
                  deposit_arr={deposit_arr}
                  handleChange={this.handleChange}
                  showBankDetail={showBankDetail}
                  validateFields={this.validateFields}
                />
                <AgencyLicense
                  licManager_arr={licManager_arr}
                  state_arr={state_arr}
                  handleChange={this.handleLicenseChange}
                  handleAddRow={this.handleLicenseAddRow}
                  handleRemoveSpecificRow={this.handleLicenseRemoveSpecificRow}
                />
                {this.props.agencyId !== 0 &&
                  <Logs
                  />
                }
              </Col>
              <Col xs="12" sm="3">
                <Row>
                  <Col xs={{ size: 10, offset: 1 }}>
                    <Button disabled={this.props.agencyId === 0 ? true : false} size="lg" onClick={() => this.handleModal(AsideTypes.AgencyUsers)} color="primary" className="w-100 font-weight-bold mb-1">Agency Users</Button>
                    <Button disabled={this.props.agencyId === 0 ? true : false} size="lg" onClick={() => this.handleModal(AsideTypes.ProducerDocument)} color="primary" className="w-100 font-weight-bold mb-1">Documents</Button>
                    <Button disabled={this.props.agencyId === 0 ? true : false} size="lg" onClick={() => this.handleModal(AsideTypes.Commission)} color="primary" className="w-100 font-weight-bold mb-1">Commission</Button>
                    <Button disabled={this.props.agencyId === 0 ? true : false} size="lg" onClick={() => this.handleModal(AsideTypes.UpdatedLogs)} color="primary" className="w-100 font-weight-bold mb-1">Updated Logs</Button>
                    <Button disabled={this.props.agencyId === 0 ? true : false} size="lg" onClick={() => this.handleModal(AsideTypes.AgencyVisitReview)} color="primary" className="w-100 font-weight-bold mb-1">Agency Visit Review</Button>
                    <Button size="lg" onClick={() => this.handleModal(AsideTypes.AgencyProduct)} color="primary" className="w-100 font-weight-bold mb-1">Products</Button>
                  </Col>
                </Row>
                {this.props.agencyId !== 0 && !isLoading &&
                  <Association
                  />
                }
              </Col>
            </Row>
            <ProducerModal
              isOpen={this.state.isOpenModal}
              toggle={this.toggleModal}
              commRGM_arr={commRGM_arr}
              commRate_arr={commRate_arr}
              product_arr={product_arr}
              handleChange={this.handleProductChange}
              handleAddRow={this.handleProductAddRow}
              handleRemoveSpecificRow={this.handleProductRemoveSpecificRow}
            />
          </Form>
        }
      </div>
    );
  }
}


const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  agencyId: state.Producer.agencyId,
  tabId: state.Producer.tabId
});

const mapDispatchToProps = (dispatch) => {
  return {
    setAsideComponent: (component) => dispatch(setAsideComponent(component)),
    loadAgency: (n_PersonInfoId_PK) => dispatch(action.loadAgency(n_PersonInfoId_PK)),//Origin
    switchSearchAgencyModal: (modalFlag) => dispatch(action.switchSearchAgencyModal(modalFlag))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Agency);
