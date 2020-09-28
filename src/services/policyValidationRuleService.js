import axios from 'axios';
import Http from '../Http';
import * as action from '../store/actions/administrationAction';
const apiUrl = process.env.REACT_APP_API_URL;

export class policyValidationRule {

    fetchPolicyValidationRuleListing() {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.get(apiUrl + 'api/v1/policyValidationRuleView')
                    .then((res) => {
                        if (res.status === 200) {
                            dispatch(action.fetchPolicyValidationRuleListing(res.data));
                            return resolve();
                        } else {
                            reject()
                        }
                    }).catch(function (error) { // catch
                        reject(error);
                    });
            })
        );
    }

    fetchPolicyValidationFormOptions(id) {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.get(apiUrl + 'api/v1/policyValidationRule',
                    {
                        params: {
                            rule_Pk: id,
                        }
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            dispatch(action.fetchPolicyValidationFormOptions(res.data));
                            return resolve();
                        } else {
                            reject()
                        }
                    }).catch(function (error) { // catch
                        reject(error);
                    });
            })
        );
    }

    fetchPolicyRuleForOptions() {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.get(apiUrl + 'api/v1/hpWriteElement',
                    {
                        params: {
                            flag: 'rule'
                        }
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            dispatch(action.fetchPolicyRuleForOptions(res.data));
                            return resolve();
                        } else {
                            reject()
                        }
                    }).catch(function (error) { // catch
                        reject(error);
                    });
            })
        );
    }

    fetchPolicyRuleForData(data) {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.post(apiUrl + 'api/v1/loadDataAccordingToCode', data)
                    .then((res) => {
                        if (res.status === 200) {
                            dispatch(action.fetchPolicyRuleForData(res.data));
                            return resolve();
                        } else {
                            reject()
                        }
                    }).catch(function (error) { // catch
                        reject(error);
                    });
            })
        );
    }

    savePolicyRuleValidation(data) {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.post(apiUrl + 'api/v1/policyValidationRuleSave', data)
                    .then((res) => {
                        if (res.status === 200) {
                            dispatch(action.savePolicyRuleValidation(res.data));
                            return resolve();
                        } else {
                            reject()
                        }
                    }).catch(function (error) { // catch
                        reject(error);
                    });
            })
        );
    }

    fetchInnerPolicyRule(id) {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.get(apiUrl + 'api/v1/ruleInnerLoad',
                    {
                        params: {
                            n_PrValidationRuleMaster_PK: id
                        }
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            dispatch(action.fetchInnerPolicyRule(res.data));
                            return resolve();
                        } else {
                            reject()
                        }
                    }).catch(function (error) { // catch
                        reject(error);
                    });
            })
        );
    }

    fetchPolicyValidationGetProductDD(id) {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.get(apiUrl + 'api/v1/validationRuleGroup',
                    {
                        params: {
                            rule_Pk: id
                        }
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            dispatch(action.fetchPolicyValidationGetProductDD(res.data));
                            return resolve();
                        } else {
                            reject()
                        }
                    }).catch(function (error) { // catch
                        reject(error);
                    });
            })
        );
    }

    fetchPolicyValidationRuleLoad(data) {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.post(apiUrl + 'api/v1/validationRuleLoad', data)
                    .then((res) => {
                        if (res.status === 200) {
                            dispatch(action.fetchPolicyValidationRuleLoad(res.data));
                            return resolve();
                        } else {
                            reject()
                        }
                    }).catch(function (error) { // catch
                        reject(error);
                    });
            })
        );
    }

    fetchPolicyValidationRuleLoadCombo(data) {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.post(apiUrl + 'api/v1/validationRuleLoadCombo', data)
                    .then((res) => {
                        if (res.status === 200) {
                            dispatch(action.fetchPolicyValidationRuleLoadCombo(res.data));
                            return resolve();
                        } else {
                            reject()
                        }
                    }).catch(function (error) { // catch
                        reject(error);
                    });
            })
        );
    }

    savePolicyRuleGroup(data) {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.post(apiUrl + 'api/v1/validationRuleGroupSave', data)
                    .then((res) => {
                        if (res.status === 200) {
                            dispatch(action.savePolicyRuleGroup(res.data));
                            return resolve();
                        } else {
                            reject()
                        }
                    }).catch(function (error) { // catch
                        reject(error);
                    });
            })
        );
    }

    fetchPolicyValidationRuleGroupListing() {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.get(apiUrl + 'api/v1/validationRuleGroupView')
                    .then((res) => {
                        if (res.status === 200) {
                            dispatch(action.fetchPolicyValidationRuleGroupListing(res.data));
                            return resolve();
                        } else {
                            reject()
                        }
                    }).catch(function (error) { // catch
                        reject(error);
                    });
            })
        );
    }
}