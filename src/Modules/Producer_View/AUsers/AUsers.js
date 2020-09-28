import React, { Component } from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import classNames from 'classnames';
import ReeValidate from 'ree-validate';
import ProducerService from '../../../services/Producer';
import Http from '../../../Http';

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

import AUserList from '../AUserList';
import AUserForm from '../AUserForm';
import AUserProduct from '../AUserProduct';

class AUsers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isDetailLoading: false,
      AUserData_arr: [],
      agentData: {},
      AUserDetail_arr: [],
      userLevel_arr: [],
      ruleType_arr: [],
      state_arr: [],
      employee_arr: [],
      authType_arr: [],
      productType_arr: [],
      newPassword : '',
      msg:'',
      First_Name:'',
      s_MiddleName:'',
      Last_Name : '',
      s_ScreenName:''
    };
    //rest api endpoint
    this.api = process.env.REACT_APP_API_URL+'/api/v1/agency';
    this.list = React.createRef();
    this.divTag = React.createRef();
  }
  componentDidMount() {
    this.getAuserData();
  }

  //redux
  /*
  getAuserData = () => {
    const {agencyId} = this.props;
    var url = `${this.api}/${agencyId}/showAUsers`;
    this.setState({isLoading:true});
    this.props.showAUsersRequest(url)
    .then(() => {
      this.setState({ isLoading: false});
    })
    .catch((err) => {
      this.setState({ isLoading: false });
    });
  }
  */
  handleChangeDataList = () => {
    // this.list.current.reloadAUserTable();fadeIn
    console.log(this.list);

  }

  getAuserData = () => {
    this.setState({isLoading: true});
    const {agencyId} = this.props;
    Http.get(`${this.api}/${this.props.agencyId}/showAUsers`)
      .then((response) => {
        const { data } = response.data;
        this.setState({
          agentId: 0,
          isLoading: false,
          isDetailLoading: false,
          AUserData_arr: data.AUserData_arr,
          userLevel_arr: data.userLevel_arr,
          state_arr: data.state_arr,
          employee_arr: data.employee_arr,
          ruleType_arr: data.ruleType_arr,
          authType_arr: data.authType_arr,
          productType_arr: data.productType_arr,
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

  getAUserDetailsData = (n_PersonInfoId_FK) => {
    this.setState({isDetailLoading: true});
    const {agencyId} = this.props;
    Http.get(`${this.api}/${this.props.agencyId}/showAUserDetails/${n_PersonInfoId_FK}`)
      .then((response) => {
        const { data } = response.data;
        this.setState({
          isDetailLoading: false,
          agentId: n_PersonInfoId_FK,
          agentData: data.agentData,
          AUserDetail_arr: data.AUserDetail_arr,
          error: false,
        });
      })
      .catch(() => {
        this.setState({
          isDetailLoading: false,
          error: 'Unable to fetch data.',
        });
      });
  }

  //product add new row
  handleAddDetailRow = () => {
    const item = {
      n_UserProduct_PK: 0,
      n_UserPersoninfo_FK: 0,
      n_Product_FK: 0,
      s_StateCode: "49",
      n_PremiumLimit: 0,
      n_LicenseNo: "0",
      n_UWAssigned: 0,
      n_ServiceRep: 0,
      s_AuthorizationCode: "",
      n_PrValidationRuleGroupMasters_FK: 0,
      n_CreatedUser: 0,
      d_CreatedDate: "",
      n_UpdatedUser: 0,
      d_UpdatedDate: "",
      n_EditVersion: 0,
    };
    this.setState({
      AUserDetail_arr: [...this.state.AUserDetail_arr, item]
    });
  }


  handleChange = (e) => {
    const { name, value } = e.target;
    var {userLevel_arr, agentData} = this.state;
    if(name == 'Level'){
      var item = userLevel_arr.find(item => item.UserLevel_ID === parseInt(value));
      agentData = {...agentData, UserLevel_Name: item.UserLevel_Name, s_UserLevelCode: item.s_UserLevelCode};
      agentData.UserLevel_Name = item.UserLevel_Name;
      agentData.s_UserLevelCode = item.s_UserLevelCode;
    }
    if(name == 'First_Name'){
      let s_ScreenName = value +' '+ this.state.s_MiddleName +' '+ this.state.Last_Name;
      this.setState({
        First_Name : value,
        s_ScreenName : s_ScreenName
      });
      agentData = {...agentData, s_ScreenName: s_ScreenName};
      agentData.s_ScreenName = s_ScreenName;
    }
    if(name == 's_MiddleName'){
      let s_ScreenName = this.state.First_Name +' '+ value +' '+ this.state.Last_Name;
      this.setState({
        s_MiddleName : value,
        s_ScreenName : s_ScreenName
      });
      agentData = {...agentData, s_ScreenName: s_ScreenName};
      agentData.s_ScreenName = s_ScreenName;
    }
    if(name == 'Last_Name'){
      let s_ScreenName = this.state.First_Name +' '+ this.state.s_MiddleName +' '+ value;
      this.setState({
        Last_Name : value,
        s_ScreenName:s_ScreenName
      });
      agentData = {...agentData, s_ScreenName: s_ScreenName};
      agentData.s_ScreenName = s_ScreenName;
    }
    if(name == 's_ScreenName'){
      this.setState({
        s_ScreenName:value
      });
      agentData = {...agentData, s_ScreenName: value};
      agentData.s_ScreenName = value;
    }
    this.setState(prevState => ({
      agentData: {...agentData,  [name] : value}
    }));
    
  }

  //product change
  handleDetailChange = (index, dataType, value) => {
    const AUserDetail_arr = this.state.AUserDetail_arr.map((item, i) => {
      if (i == index) {
        const productType = 'n_PrValidationRuleGroupMasters_FK';
        if(dataType == 'n_Product_FK'){
          var productVal = 0;
          const ruleType_arr = this.state.ruleType_arr;
          for (var i = 0; i < ruleType_arr.length; i++) {
            if(ruleType_arr[i].n_Product_FK == value){
              productVal = ruleType_arr[i].n_PrValidationRuleGroupMasters_PK;
              break;
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
      AUserDetail_arr
    });
  }

  handleRemoveDetailRow = (e, idx) => {
    e.preventDefault();
    const AUserDetail_arr = [...this.state.AUserDetail_arr];
    AUserDetail_arr.splice(idx, 1);
    this.setState({ AUserDetail_arr });
  }

  saveAgencyUser = () => {
    const {
      agentId,
      agentData,
      AUserDetail_arr,
      userLevel_arr,
      AUserData_arr
    } = this.state;
    const { agencyId } = this.props;
    this.setState({ isDetailLoading: true });
    if (agentId == 0) {//add
      var url = `${this.api}/${agencyId}/storeAUser/${agentId}`;
      Http.post(url,
        {
          agentData,
          AUserDetail_arr,
        })
        .then(({ data }) => {
          this.setState({
            error: 'Success!',
            isDetailLoading: false,
          });
          //success toastr
          // toast.info('Success!');
          if(data.data.id == ''){
            toast.error('User Already Exists!');
          }else{

          this.getAUserDetailsData(data.data.id);
          var addedData = {
            Admin_ID:           data.data.Admin_ID,
            s_ScreenName:       agentData.s_ScreenName,
            Level:              agentData.Level,
            UserLevel_Name:     agentData.UserLevel_Name,
            Username:           agentData.Username,
            n_PersonInfoId_FK:  data.data.id,
            s_AppCodeName:      parseInt(agentData.s_UserStatus) == 111 ? "Active" : "Closed",
            s_UserLevelCode:    agentData.s_UserLevelCode,
            s_UserStatus:       agentData.s_UserStatus
          };

          const newArr = [...AUserData_arr, addedData];
          this.setState({
            AUserData_arr: newArr,
          });
         }
        })
        .catch(() => {
          this.setState({
            error: 'Error!',
            isDetailLoading: false,
          });
          //success toastr
          // toast.error('Error!');

        });
    }else{//edit
      var url = `${this.api}/${agencyId}/updateAUser/${agentId}`;
      Http.put(url,
        {
          agentData,
          AUserDetail_arr,
        })
        .then(({ data }) => {
          this.setState({
            error: 'Success!',
            isDetailLoading: false,
          });
          if(data.data.id == ''){
            toast.error('UserID Already Exists!');
          }else{
          // success toastr
          // toast.info('Success!');

          // edit data in AUserData_arr
          this.getAUserDetailsData(agentId);
          var editedData = {
            Admin_ID:       agentData.Admin_ID,
            s_ScreenName:   agentData.s_ScreenName,
            Level:          agentData.Level,
            UserLevel_Name: agentData.UserLevel_Name,
            Username:       agentData.Username,
            n_PersonInfoId_FK: agentId,
            s_AppCodeName:  parseInt(agentData.s_UserStatus) == 111 ? "Active" : "Closed",
            s_UserLevelCode: agentData.s_UserLevelCode,
            s_UserStatus:   agentData.s_UserStatus
          };

          const index = AUserData_arr.findIndex(item => parseInt(item.n_PersonInfoId_FK, 10) === parseInt(agentId, 10));
          AUserData_arr[index] = editedData;
          this.setState({
            AUserData_arr: AUserData_arr,
          });
         }
        })
        .catch(() => {
          this.setState({
            error: 'Error!',
            isDetailLoading: false,
          });
          //success toastr
          // toast.error('Error!');
        });
    }
  }

  //new agency
  newAgencyUser = () => {
    var { agentData } = this.state;
    agentData = Object.fromEntries(Object.keys(agentData).map(key => [key, ""]));
    this.setState({
      agentId : 0,
      agentData,
      AUserDetail_arr: []
    });
  }

  //set Password
  setNewPassword = (value) => {
    this.setState({
      newPassword : value
    });
    const {
      agentId,
    } = this.state;
    const { agencyId } = this.props;
    this.setState({ isDetailLoading: true });
    var url = `${this.api}/${agencyId}/updateAUserPassword/${agentId}`;
      Http.put(url,
        {
          value,
        })
        .then(({ data }) => {
          this.setState({
            error: 'Success!',
            isDetailLoading: false,
            msg:'Password Reset Successfully'
          });
        })
        .catch(() => {
          this.setState({
            error: 'Error!',
            isDetailLoading: false,
            msg:'Error While Reseting Password'
          });
        });
  }

  render() {
    const containerStyle = {
      zIndex: 1999
    };
    const {
      isLoading,
      isDetailLoading,
      agentId,
      AUserData_arr,
      agentData,
      AUserDetail_arr,
      userLevel_arr,
      ruleType_arr,
      state_arr,
      employee_arr,
      authType_arr,
      productType_arr,
      msg,
      s_ScreenName
    } = this.state;
    return (
      <div className="animated fadeIn" ref={this.divTag}>
        <ToastContainer position="top-right" autoClose={5000} style={containerStyle}/>
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
                  <Col xs="12" sm="6" >
                    <AUserList
                      ref={ref => this.list = ref }
                      setClick={click => this.handleChangeDataList = click}
                      AUserData_arr = {AUserData_arr}
                      getAUserDetailsData = {this.getAUserDetailsData}
                    />
                  </Col>
                  <Col xs="12" sm="6">
                    <AUserForm
                      agentId = {agentId}
                      isDetailLoading = {isDetailLoading}
                      agentData = {agentData}
                      userLevel_arr = {userLevel_arr}
                      handleChange = {this.handleChange}
                      setNewPassword = {this.setNewPassword}
                      msg={msg}
                      s_ScreenName={s_ScreenName}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <AUserProduct
              isDetailLoading = {isDetailLoading}
              AUserDetail_arr = {AUserDetail_arr}
              userLevel_arr = {userLevel_arr}
              ruleType_arr = {ruleType_arr}
              state_arr = {state_arr}
              employee_arr = {employee_arr}
              authType_arr = {authType_arr}
              productType_arr = {productType_arr}

              handleDetailChange = {this.handleDetailChange}
              handleRemoveDetailRow = {this.handleRemoveDetailRow}
              handleAddDetailRow = {this.handleAddDetailRow}
            />

            <div className="text-center">
              <Button color="info" className="btn-xing btn-brand mr-1 mb-1" onClick={this.saveAgencyUser}>
                <span>{agentId == 0 ? 'Save Agency User' : 'Update Agency User'}</span>
              </Button>
              <Button color="info" className="btn-xing btn-brand mr-1 mb-1" onClick={() => this.newAgencyUser()}><span>New Agency User</span></Button>
            </div>
          </>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  agencyId: state.Producer.agencyId,
  tabId: state.Producer.tabId,
})

const mapDispatchToProps = dispatch => ({
  showAUsersRequest: (url) => dispatch(ProducerService.showAUsersRequest(url))//Origin
});
export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef : true})(AUsers);
