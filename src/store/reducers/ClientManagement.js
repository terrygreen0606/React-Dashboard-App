import * as ActionTypes from '../action-types';
import Http from '../../Http';

const initialState = {
  clients : [],
  view: 'Dashboard',
  BUSINESSTYPE: [],
  ADDRESSTYPE: [],
  SYSTEMROLE: [],
  Entity_Type: [],
  s_1099: [],
  AddressInfo:[],
  EmailINfo:[],
  FaxInfo:[],
  PersonInfo:[],
  PhoneInfo:[],
  RoleInfo:[],
  WebInfo:[],
  AddrFormData1:[],
  AddrFormData:[],
  Default_Errror : 'N',
  Default_Addr_RowIndex : '',
  RoleFormData1:[],
  RoleFormData:[],
  ClientPk: "",
  PersonFormData1:[],
  isMortgagee : "N",
  isMailing : "N",
  showMortTab : false,
  policyData : [],
  MailingInfo :[],
};

const searchClient = (state, payload) => {

    const {data:clients} = payload;
    //sessionStorage.setItem('clients', JSON.stringify(clients));
    const stateObj = Object.assign({}, state, {
      //loading : false,
      clients,
    });
    return stateObj;

};

const getClient = (state, payload) => {

  console.log(payload);

  if(payload.MortgageeCount > 0){
    state.isMortgagee = 'Y';
    state.showMortTab = true;
  }else{
    state.isMortgagee = "N";
    state.showMortTab = false;
  }

  if(payload.MailingInfo.length > 0){
    state.isMailing = 'Y';
  }else{
    state.isMailing = "N";
  }

  /*const PersonFormData1 = state.PersonFormData1;
  PersonFormData1.push(payload.PersonInfo[0]);*/

   
  const {BUSINESSTYPE:BUSINESSTYPE} = payload.dropdownData;
  const {ADDRESSTYPE:ADDRESSTYPE} = payload.dropdownData;
  const {SYSTEMROLE:SYSTEMROLE} = payload.dropdownData;
  const {Entity_Type:Entity_Type} = payload;
  const {s_1099:s_1099} = payload;
  const {AddressInfo:AddrFormData1} = payload;
  const {EmailInfo:EmailINfo} = payload;
  const {FaxInfo:FaxInfo} = payload;
  const {PersonInfo:PersonInfo} = payload;
  const {PhoneInfo:PhoneInfo} = payload;
  const {RoleInfo:RoleFormData1} = payload;
  const {WebInfo:WebInfo} = payload;
  const{policyData:policyData} = payload;
  const stateObj = Object.assign({}, state, {
    BUSINESSTYPE,
    ADDRESSTYPE,
    SYSTEMROLE,
    Entity_Type,
    s_1099,
    AddrFormData1,
    EmailINfo,
    FaxInfo,
    PersonInfo,
    PhoneInfo,
    RoleFormData1,
    WebInfo,
    ClientPk: "",
    clients:[],
    policyData,
  });
  return stateObj;

};


const saveAddr = (state, payload) => {

  const AddrFormData1 = state.AddrFormData1;
  const AddrFormData = payload;
  if(AddrFormData[0].s_AddressTypeCode == "Mailing"){
      state.isMailing = "Y";
  }else{
    state.isMailing = "N";
  }
  const rowIndex = AddrFormData[0].rowIndex;
  if(String(rowIndex) == ''){
    AddrFormData1.push(AddrFormData[0]);
  }else{
    AddrFormData1[rowIndex] = AddrFormData[0];
  }
  

  if(payload[0].s_IsDefaultAddress == "Y"){
      const  stateObj = Object.assign({}, state, {
        AddrFormData,
        AddrFormData1,
        Default_Addr_RowIndex : rowIndex,
      });
      return stateObj;
  }else{
       if(AddrFormData[0].Default_RowIndex == "Y"){
          const  stateObj = Object.assign({}, state, {
          AddrFormData,
          AddrFormData1,
          });
          return stateObj;
       }else{
          const  stateObj = Object.assign({}, state, {
          AddrFormData,
          AddrFormData1,
          });
          return stateObj;
       }
      
  }
};

const saveClientForm = (state, payload) => {
  const PersonPk = payload.n_PersonInfoId_PK;
  const stateObj = Object.assign({}, state, {
    PersonPk,
   PersonInfo : [],
   RoleFormData1 : [],
   AddrFormData1 : [],
  });
  return stateObj;
};

const saveRole = (state, payload) => {

  const RoleFormData1 = state.RoleFormData1;
  const RoleFormData = payload;
  if(RoleFormData[0].s_PersonRoleType == 'MORTGAGEE' && RoleFormData[0].s_isActiveYN == 'Y'){
     state.isMortgagee = "Y";
  }else{
    state.isMortgagee = "N";
  }
  const isMortgagee = state.isMortgagee;
  const rowIndex = RoleFormData[0].roleRowIndex;
  if(String(rowIndex) == ''){
    RoleFormData1.push(RoleFormData[0]);
  }else{
    RoleFormData1[rowIndex] = RoleFormData[0];
  }
  const stateObj = Object.assign({}, state, {
    RoleFormData1,
   });
   return stateObj;
};

const setClientPk = (state, payload) => {
  const stateObj = Object.assign({}, state, {
    ClientPk : payload,
    showMortTab : false,
  });
  return stateObj;
}



const Client = (state = initialState, { type, payload = null }) => {
    switch (type) {
      case ActionTypes.SEARCH_CLIENT:
        return searchClient(state, payload);
      case ActionTypes.ADD_CLIENT:
      return getClient(state, payload);
      case ActionTypes.SAVE_ADDR:
      return saveAddr(state, payload);
      case ActionTypes.SAVE_CLIENT_FORM:
      return saveClientForm(state, payload);
      case ActionTypes.SAVE_ROLE:
      return saveRole(state, payload);
      case ActionTypes.SET_CLIENTPK:
      return setClientPk(state, payload);
      default:
        return state;
    }
};
  
  export default Client;
