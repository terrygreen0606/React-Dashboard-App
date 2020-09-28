import React, { Component } from 'react';

import { connect } from 'react-redux';

import Http from '../../../Http';

import {
  Col,
  Form,
  Row,
  Button,
} from 'reactstrap';

import AgencyNewMain from '../AgencyNewMain/AgencyNewMain';
import AgencyNewMailingAddress from '../AgencyNewMailingAddress/AgencyNewMailingAddress';
import AgencyNewLocationAddress from '../AgencyNewLocationAddress/AgencyNewLocationAddress';
import AgencyNewDetail from '../AgencyNewDetail/AgencyNewDetail';
import AgencyNewLicense from '../AgencyNewLicense/AgencyNewLicense';
import AgencyNewProduct from '../AgencyNewProduct/AgencyNewProduct';

import { setAsideComponent } from '../../../store/actions/common';
import * as AsideTypes from '../../../services/asideService';
import ProducerModal from '../ProducerModal/ProducerModal';

class AgencyNew extends Component {
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
      licManager_arr: [
        {
          n_LicenseManagersId_PK: "",
          n_PersonInfoId_FK: "",
          n_LicenseType: "",
          s_LicenseNo: "",
          n_StateId_FK: "",
          d_IssueDate: "",
          d_ExpireDate: "",
          d_AppDate: "",
          n_appointyType: 0,
          s_PersonLicenseType: "",
          s_PersonLicenseSubType: "",
          Is_PersonLicenseActive_YN: "",
          n_CreatedUser: "",
          d_CreatedDate: "",
          n_UpdatedUser: "",
          d_UpdatedDate: "",
          n_EditVersion: "",
        }
      ],
      employee_arr: [],
      docGroup_arr: [],
      deposit_arr: [],
      product_arr: [],
      state_arr: [],
      commRGM_arr: [],
      zipDetail_arr: [],
      error: false,
      isLoading: false,
      modal:false,
      addrType: '',
      copyLocAddrFlag: false,
      isOpenModal: false,
    };
    //rest api endpoint
    this.api = process.env.REACT_APP_API_URL+'/api/v1/agency';

  }

  componentDidMount() {
    if (this.props.agencyId > 0) {
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
        })
        .catch(() => {
          this.setState({
            isLoading: false,
            error: 'Unable to fetch data.',
          });
        });
    }
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleModal() {
    this.setState({ isOpenModal: !this.state.isOpenModal })
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { agencyInfo } = this.state;
    // this.addAgency(agencyInfo);
  }
  
  selectAddress = (index) => {
    var { zipDetail_arr, agencyInfo, addrType, copyLocAddrFlag } = this.state;
    // zipDetail_arr[index].
    if(addrType == 'mail'){
      agencyInfo.mail_s_CityName = zipDetail_arr[index].s_CityName;
      agencyInfo.mail_s_CountyName = zipDetail_arr[index].s_CountyCode;
      // agencyInfo.mail_s_PostalCode =
      agencyInfo.mail_s_StateName = zipDetail_arr[index].s_StateCode;
      agencyInfo.mail_n_CityId_FK = zipDetail_arr[index].n_CountryId_FK;
      agencyInfo.mail_n_CountryId_FK = zipDetail_arr[index].n_CountryId_FK;
      agencyInfo.mail_n_StateId_FK = zipDetail_arr[index].n_StateId_PK;
    }

    if( addrType == 'location'){
      agencyInfo.loc_s_CityName = zipDetail_arr[index].s_CityName;
      agencyInfo.loc_s_CountyName = zipDetail_arr[index].s_CountyCode;
      // agencyInfo.loc_s_PostalCode = agencyInfo.loc_s_PostalCode;
      agencyInfo.loc_s_StateName = zipDetail_arr[index].s_StateCode;
      agencyInfo.loc_n_CityId_FK = zipDetail_arr[index].s_StateCode;
      agencyInfo.loc_n_CountryId_FK = zipDetail_arr[index].n_CountryId_FK;
      agencyInfo.loc_n_StateId_FK = zipDetail_arr[index].n_StateId_PK;
    }
    
    this.handleCopyLocFromMail(copyLocAddrFlag);

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
    var {agencyInfo} = this.state;

    agencyInfo.loc_n_CityId_FK = (value ? agencyInfo.mail_n_CityId_FK : agencyInfo.loc_n_CityId_FK);
    agencyInfo.loc_n_CountryId_FK = (value? agencyInfo.mail_n_CountryId_FK : agencyInfo.loc_n_CountryId_FK);
    agencyInfo.loc_n_CountyId_FK = (value ? agencyInfo.mail_n_CountyId_FK : agencyInfo.loc_n_CountyId_FK);
    agencyInfo.loc_n_StateId_FK = (value ? agencyInfo.mail_n_StateId_FK : agencyInfo.loc_n_StateId_FK);
    agencyInfo.loc_s_AddressLine1 = (value ? agencyInfo.mail_s_AddressLine1 : agencyInfo.loc_s_AddressLine1);
    agencyInfo.loc_s_AddressLine2 = (value ? agencyInfo.mail_s_AddressLine2 : agencyInfo.loc_s_AddressLine2);
    agencyInfo.loc_s_AddressLine3 = (value ? agencyInfo.mail_s_AddressLine3 : agencyInfo.loc_s_AddressLine3);
    agencyInfo.loc_s_CityName = (value ? agencyInfo.mail_s_CityName : agencyInfo.loc_s_CityName);
    agencyInfo.loc_s_CountyName = (value ? agencyInfo.mail_s_CountyName : agencyInfo.loc_s_CountyName);
    agencyInfo.loc_s_PostalCode = (value ? agencyInfo.mail_s_PostalCode : agencyInfo.loc_s_PostalCode);
    agencyInfo.loc_s_StateName = (value ? agencyInfo.mail_s_StateName : agencyInfo.loc_s_StateName);

    this.setState({
      agencyInfo: agencyInfo,
      copyLocAddrFlag: value,
    });
  }

  //save
  saveAgency = () => {
      
    const {
      agencyId,
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

    this.setState({isLoading: true});
    Http.post(`${this.api}/${this.props.agencyId}/updateAll`, 
      { agencyInfo, 
        commRate_arr, 
        licManager_arr,
        employee_arr,
        docGroup_arr,
        deposit_arr,
        product_arr,
        state_arr,
        commRGM_arr,
      })
      .then(({ data }) => {
        // const newItem = {
        //   id: data.admin_id,
        //   value: agencyInfo,
        // };
        // const allAgencies = [newItem, ...this.state.data];
        // this.setState({ data: allAgencies, agencyInfo: null });
        //this.agencyForm.reset();
        console.log(data);
        this.setState({
          error: 'Sorry, there was an error saving your to do.',
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          error: 'Sorry, there was an error saving your to do.',
          isLoading: false,
        });
      });
  }

  //product add new row
  handleProductAddRow = () => {
    const item = {
      d_CreatedDate: "",
      d_LicenseEffectiveDate: "",
      d_LicenseExpiryDate: "",
      d_RateEffectiveDate: "",
      d_RateExpireDate: "",
      d_UpdatedDate: "",
      d_RateExpireDate: "",
      n_CommRateId_PK: 0,
      n_CommRuleGroupMasters_FK: 0,
      n_EditVersion: "",
      n_PersonInfoId_FK: "",
      n_ProductId_FK: "",
      n_SplTerm1RatePc: "",
      n_SplTerm2RatePc: "",
      n_StateId_FK: "",
      n_Term1RatePc: "",
      n_Term2RatePc: "",
      n_UpdatedUser: "",
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
      n_LicenseManagersId_PK: "",
      n_PersonInfoId_FK: "",
      n_LicenseType: "",
      s_LicenseNo: "",
      n_StateId_FK: "",
      d_IssueDate: "",
      d_ExpireDate: "",
      d_AppDate: "",
      n_appointyType: 0,
      s_PersonLicenseType: "",
      s_PersonLicenseSubType: "",
      Is_PersonLicenseActive_YN: "",
      n_CreatedUser: "",
      d_CreatedDate: "",
      n_UpdatedUser: "",
      d_UpdatedDate: "",
      n_EditVersion: "",
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
    Http.get(`${this.api}/${zipCode}/zipDetail`)
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

  handleModal = (asideType) => {
    const { setAsideComponent } = this.props;
    setAsideComponent(asideType);
    this.toggleModal();
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
              <AgencyNewMain
                docGroup_arr = { docGroup_arr }
                employee_arr = { employee_arr }
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col sm="12" md="9">
              <AgencyNewMailingAddress />
              <AgencyNewLocationAddress />
              <AgencyNewDetail
                deposit_arr = { deposit_arr }
              />
              <AgencyNewLicense 
                licManager_arr = { licManager_arr }
                handleChange = { this.handleLicenseChange }
                handleAddRow = { this.handleLicenseAddRow }
                handleRemoveSpecificRow = { this.handleLicenseRemoveSpecificRow }
              />
              <AgencyNewProduct />
              <Row className="mt-2">
                <Col className="text-center">
                  <Button color="primary" className="font-weight-bold">Save Agency</Button>
                </Col>
              </Row>
            </Col>
            <Col xs="12" sm="3">
              <Row>
                <Col xs={{size: 10, offset: 1}}>
                  <Button size="lg" onClick={() => this.handleModal(AsideTypes.AgencyUsers)} color="primary" className="w-100 font-weight-bold mb-1">Agency Users</Button>
                  <Button size="lg" onClick={() => this.handleModal(AsideTypes.ProducerDocument)} color="primary" className="w-100 font-weight-bold mb-1">Documents</Button>
                  <Button size="lg" onClick={() => this.handleModal(AsideTypes.Commission)} color="primary" className="w-100 font-weight-bold mb-1">Commission</Button>
                  <Button size="lg" onClick={() => this.handleModal(AsideTypes.UpdatedLogs)} color="primary" className="w-100 font-weight-bold mb-1">Updated Logs</Button>
                  <Button size="lg" onClick={() => this.handleModal(AsideTypes.AgencyVisitReview)} color="primary" className="w-100 font-weight-bold mb-1">Agency Visit Review</Button>
                  <Button size="lg" onClick={() => this.handleModal(AsideTypes.AgencyProduct)} color="primary" className="w-100 font-weight-bold mb-1">Products</Button>
                </Col>
              </Row>
            </Col>
          </Row>
          
          <ProducerModal 
            isOpen = {this.state.isOpenModal}
            toggle = {this.toggleModal}
            commRGM_arr = {commRGM_arr}
            commRate_arr = {commRate_arr}
            product_arr = {product_arr}
          />
        </Form>
      }
      </div>
    );
  }
}


const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setAsideComponent: (component) => dispatch(setAsideComponent(component))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgencyNew);