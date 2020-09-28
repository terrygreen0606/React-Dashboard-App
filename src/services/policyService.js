import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export class policyService {
  checkPermission(data) {
    return axios.post(baseUrl + '/api/v1/check_permission', data);
  }

  getUserSessionData() {
    return new Promise((resolve, reject) => {
      axios.get(baseUrl + '/api/v1/getUserSessionData')
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  getDeductibleDiscount(data) {

    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/getDeductibleDiscount', data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  getCommonData() {
    return axios.post(baseUrl + '/api/v1/getQuoteBaseData');
  }

  getPolicyBaseData() {
    return new Promise((resolve, reject) => {
      axios.get(baseUrl + '/api/v1/getQuoteBaseData')
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  getPriorLossGridData() {
    return new Promise((resolve, reject) => {
      axios.get(baseUrl + '/api/v1/getPriorLossGridData')
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  priorLossInfoSave(data) {
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/priorLossInfoSave', data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  getUserDetailsByAgency(data) {
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/quote/getUserDetailsByAgency', data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }
  searchPolicy(data) {
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/policy', data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  checkZipCode(data) {
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/Common/CheckZipCode', data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  getCoverageLimit(data) {
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/quote/getCoverageLimit', data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  checkLimit(data) {
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/quote/checkLimit', data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }
  getProductDropDown() {
    return new Promise((resolve, reject) => {
      axios.get(baseUrl + '/api/v1/quote/getProductDropDown')
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }
  quoteEntry(data){

    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/quoteEPIC/quoteEntry',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  getPolicyAllBatches(data) {
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/BPC/getAllBatches', data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res);
          }
        })
    })
  }

  getPolicyHeaderData(data){
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/policyHeaderInformation',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  getTermDropDown(data) {
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/getTermDropdown',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  getTransDropDown(data) {
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/getTransactionDropdown',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  getBasicCoverages(data) {
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/coveragebasic',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  getOptionalCoverages(data) {
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/coverageoptional',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  getCoverageDiscount(data) {
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/coveragediscount',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  getPropertyData(data) {
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/propertyinfo',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  getAdditionalData(data) {
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/getadditional',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  getMortgageeData(data) {
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/getmortagee',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  getHouseHoldData(data) {
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/gethousehold',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  getAddInerestData(data) {
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/getaddinterest',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  getLossHistoryData(data) {
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/getlosshistory',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  getBillingAccViewData(data){
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/billingacc',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  getBillingRecViewData(data){
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/billingrec',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  getBillingInvData(data){
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/billinginvoice',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  getBillingSubLedgData(data){
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/billingsubled',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }

  getAgencyData(data){
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/applicant',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }
  getNewTransDDData(){
    return new Promise((resolve, reject) => {
      axios.get(baseUrl + '/api/v1/newTransaction')
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }
  getTransSubTypeDDData(data){
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/getTransSubTypeDD',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }
  saveNewTrans(data){
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/saveTransaction',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }
  getPolPk(data){
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/getPolPk',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }
  getAppDD(data){
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/getAppDD',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }
  saveEndorse(data){
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/saveEndorse',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }
  editCvg(data){
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/editCvg',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }
  cancelCvg(data){
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/cancelCvg',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }
  getAccDetailData(data){
    return new Promise((resolve, reject) => {
      axios.get(baseUrl + '/api/v1/accountDetail/' + data )
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }
  getInvDetailData(data){
    return new Promise((resolve, reject) => {
      axios.get(baseUrl + '/api/v1/invoiceDetail/' + data )
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }
  getFormData(data){
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/api/v1/getForms',data)
        .then(res => {
          if (res.status === 200) {
            resolve(res);
          } else {
            reject(res)
          }
        })
    })
  }
}

export class policyCommonService {
  siteURLJs = 'http://54.208.205.255/';

  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  makeUppercase(e) {
    e.target.value = e.target.value.toUpperCase();
  }

  ChangeLimitOfCoverage(obj, changeID) {
    let Policy_No_Header_SimpleSolve = document.getElementById('Policy_No_Header_SimpleSolve');
    if (typeof Policy_No_Header_SimpleSolve == 'undefined') {
      Policy_No_Header_SimpleSolve = '';
    }
    if (!Policy_No_Header_SimpleSolve) return false;
    if (Policy_No_Header_SimpleSolve.trim() !== '') return false;
    const txtname = document.getElementById('hdnService').value.split("|");
    const coverageA = txtname[0];
    let coverageA_value = document.getElementById(coverageA).value;
    coverageA_value = this.splitValue(coverageA_value);
    document.getElementById(changeID).value = parseInt(coverageA_value * (obj.target.value) / 100);
    document.getElementById(changeID).value = this.MilOrder(document.getElementById(changeID).value);
  }

  splitValue(str) {
    let val2 = "";
    val2 = str.split(',');
    let val1 = "";
    for (let i = 0; i < val2.length; i++) {
      if (val2.length === 1) {
        val1 = str.trim();
        break;
      } else {
        if (!val1) {
          val1 = val2[i].trim()
        } else {
          val1 = val1.trim() + val2[i].trim()
        }
      }
    }
    return val1;
  }

  MilOrder(str) {
    let strNew = '';
    let k = 0;
    //alert(str.length);
    for (let i = str.length; i > 0; i--) {
      k++;
      if (k % 3 == 0)
        if (k == str.length)
          strNew = str.charAt(i - 1) + strNew;
        else
          strNew = "," + str.charAt(i - 1) + strNew;
      else
        strNew = str.charAt(i - 1) + strNew;
    }

    return strNew;
  }

  MyNumeric(event) {

  }
}
