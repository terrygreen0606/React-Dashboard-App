import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export function getAccountingAction(){
  return new Promise((resolve, reject) => {
    axios.get(baseUrl + '/api/v1/accountingActions')
      .then(res => {
        if (res.status === 200) {
          resolve(res);
        } else {
          reject(res)
        }
      })
  })
}

export function saveAccountingAction(data){
  return new Promise((resolve, reject) => {
    axios.post(baseUrl + '/api/v1/accountingActions',data)
      .then(res => {
        if (res.status === 200) {
          resolve(res);
        } else {
          reject(res)
        }
      })
  })
}

export function getDefinedRule(data){
  return new Promise((resolve, reject) => {
    axios.post(baseUrl + '/api/v1/getDefinedRule',data)
      .then(res => {
        if (res.status === 200) {
          resolve(res);
        } else {
          reject(res)
        }
      })
  })
}

export function getHoldingCompany(){
  return new Promise((resolve, reject) => {
    axios.get(baseUrl + '/api/v1/getHoldingComp')
      .then(res => {
        if (res.status === 200) {
          resolve(res);
        } else {
          reject(res)
        }
      })
  })
}

export function getCompany(){
  return new Promise((resolve, reject) => {
    axios.get(baseUrl + '/api/v1/getComp')
      .then(res => {
        if (res.status === 200) {
          resolve(res);
        } else {
          reject(res)
        }
      })
  })
}

export function getLOB(compID){
  return new Promise((resolve, reject) => {
    axios.get(baseUrl + '/api/v1/getLOB/'+ compID)
      .then(res => {
        if (res.status === 200) {
          resolve(res);
        } else {
          reject(res)
        }
      })
  })
}

export function getProduct(lobID){
  return new Promise((resolve, reject) => {
    axios.get(baseUrl + '/api/v1/getProduct/'+ lobID)
      .then(res => {
        if (res.status === 200) {
          resolve(res);
        } else {
          reject(res)
        }
      })
  })
}

export function getPolAccCatType(){
  return new Promise((resolve, reject) => {
    axios.get(baseUrl + '/api/v1/getPolAccCat')
      .then(res => {
        if (res.status === 200) {
          resolve(res);
        } else {
          reject(res)
        }
      })
  })
}

export function getGfsSubAcc(productPk){
  return new Promise((resolve, reject) => {
    axios.get(baseUrl + '/api/v1/getGfsSubAcc/'+ productPk)
      .then(res => {
        if (res.status === 200) {
          resolve(res);
        } else {
          reject(res)
        }
      })
  })
}

export function getEntryType(){
  return new Promise((resolve, reject) => {
    axios.get(baseUrl + '/api/v1/getEntryType')
      .then(res => {
        if (res.status === 200) {
          resolve(res);
        } else {
          reject(res)
        }
      })
  })
}

export function getAddEditRulesList(actionRulePk){
  return new Promise((resolve, reject) => {
    axios.get(baseUrl + '/api/v1/getAddEditRuleList/' + actionRulePk)
      .then(res => {
        if (res.status === 200) {
          resolve(res);
        } else {
          reject(res)
        }
      })
  })
}

export function saveUpdateRule(data){
  return new Promise((resolve, reject) => {
    axios.post(baseUrl + '/api/v1/saveUpdateActionRule',data)
      .then(res => {
        if (res.status === 200) {
          resolve(res);
        } else {
          reject(res)
        }
      })
  })
}
