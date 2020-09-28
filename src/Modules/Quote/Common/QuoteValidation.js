import ReactDOM from "react-dom";
import { toastAction } from '../../../store/actions/toast-actions';

/**
 * to validate quick quote saving
 * @param {All Form data array [name, value]} formData 
 * @param {selected product} product
 * Author : Kiran Ivalekar
 */
export function validate(formData, product) {
    var result = { 'status': true };
    var error = [];
    var customError = [];
    var isNewPurchase = false;
    var isWindCvgExclusionCheck = false;
    var selectedEndorsCvg = '';
    var anyClaimLosses = false;
    var errorFields = [];

    // Form data array loop - START
    for (var pairValues of formData) {
        // check product
        if (pairValues[0] == 'ProductPK' && pairValues[1].trim() == '') {
            error.push('1172');
            errorFields.push(pairValues[0]);
        }

        // check validate fields empty
        var returnData = checkEmptyValues(pairValues);
        if (returnData.status) {
            error.push(returnData.errorCode)
            errorFields.push(pairValues[0]);
        }

        // check propertyZone if product : 15
        if (product == '15' && pairValues[0] == 'Propertyzone' && pairValues[1].trim() == '') {
            error.push('1048')
            errorFields.push(pairValues[0]);
        }

        // check email with 
        //regEx : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (pairValues[0] == 'data[TbEmailinfo][s_EmailAddress]' && pairValues[1].trim() != '') {
            var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!regEx.test(pairValues[1])) {
                error.push('3301');
                errorFields.push(pairValues[0]);
            }
        }

        // check year build
        if (pairValues[0] == 'data[yearbuilt]' && pairValues[1].trim() != '') {
            if (pairValues[1].trim() > 2050 || pairValues[1].trim() < 1800) {
                error.push('3081');
                errorFields.push(pairValues[0]);
            }
            if(product == '6'){
                var temp = { 's_ErrorDescription': 'Year Built Should not be less then 1994!' }
                customError.push(temp);
                errorFields.push(pairValues[0]);
            }
        }

        // if product : 2 check NoOfFamily empty
        if (product == '2' && pairValues[0] == 'data[TbPoriskadditionalinfo][n_NoOfFamilies]' && pairValues[1].trim() == '') {
            error.push('4043');
            errorFields.push(pairValues[0]);
        }

        // check is New Purchase
        if (pairValues[0] == 'data[TbPersoninfo][s_IsNewPurchase]' && pairValues[1] == 'Yes') {
            isNewPurchase = true;
        }
        if (isNewPurchase && pairValues[0] == 'data[TbPersonaddressPrior][s_PostalCode]' && pairValues[1] == '') {
            var temp = { 's_ErrorDescription': 'Please Enter Prior or Current Address!' }
            customError.push(temp);
            errorFields.push(pairValues[0]);
        }

        // if dwelling amt not empty check min and max
        if (pairValues[0] == 'txt_basicCVG_1' && (pairValues[1].trim() != '' || pairValues[1].trim() != '$0')) {
            var dwellingMin, dwellingMax, dwellingMinCode, dwellingMaxCode;
            if (product == '1' || product == '13') {
                dwellingMin = 1;
                dwellingMax = 1000000000;
                dwellingMinCode = 2329;
                dwellingMaxCode = 2333;
            }
            if (product == '2') {
                dwellingMin = 100;
                dwellingMax = 250000;
                dwellingMinCode = 4045;
                dwellingMaxCode = 4047;
            }

            // check minimum
            if (pairValues[1].trim() < dwellingMin) {
                error.push(dwellingMinCode);
                errorFields.push(pairValues[0]);
            }
            if (pairValues[1].trim() > dwellingMax) {
                error.push(dwellingMaxCode);
                errorFields.push(pairValues[0]);
            }
        }

        // check Wind Cvg Exclusion check
        if (pairValues[0] == 'chkEndorse_23') {
            isWindCvgExclusionCheck = true;
        }

        // check Deductible Hurricane empty
        if (pairValues[0] == 'ddDeductHurricane' && pairValues[1].trim() == '') {
            if (isWindCvgExclusionCheck == false) {
                error.push('4049');
                errorFields.push(pairValues[0]);
            }
        }

        // check Basic Cvg empty
        var basicCvg = [1, 5, 6, 7]; // 2,3,4 
        for (var cvgPK of basicCvg) {
            if ((pairValues[0] == 'txt_basicCVGSelectedValue_' + cvgPK || pairValues[0] == 'dd_basicCVG_' + cvgPK || pairValues[0] == 'txt_basicCVG_' + cvgPK) && (pairValues[1] == '' || pairValues[1] == '$0')) {
                if (product != '3' && product != '4') {
                    error.push('4050');
                    errorFields.push(pairValues[0]);
                }
            }
        }

        // get selected Endorse Cvg
        if (pairValues[0] == 'hdnService_EndovCVG' && pairValues[1] != '') {
            selectedEndorsCvg = pairValues[1];
        }

        // check last 5 years any losses
        if (pairValues[0] == 'listalllosses' && pairValues[1].trim() == 'Yes') {
            anyClaimLosses = true;
        }
    }
    // Form data array loop - END

    // check endorse cvg empty
    selectedEndorsCvg = selectedEndorsCvg.split('|');
    for (var pairValues of formData) {
        var tempArray = [];
        tempArray = pairValues[0].split('_');
        if ((tempArray[0] == 'txtCvgLimitAmt' || tempArray[0] == 'ddCvgLimitAmt') && (selectedEndorsCvg.indexOf(tempArray[1]) > -1)) {
            if (pairValues[1] == '') {
                error.push('3174');
                errorFields.push(pairValues[0]);
            }
        }

        // if claim losses true then check insuredLivingDate
        if (anyClaimLosses && pairValues[0] == 'data[TbPolicy][d_InsuredLivingDate]' && (pairValues[1].trim() == '' || pairValues[1].trim() == '0000-00')) {
            error.push('4059');
            errorFields.push(pairValues[0]);
        }
    }

    // check variable length
    if (error.length > 0) {
        result = { 'status': false, 'errorMsg': error, 'customError': customError, 'errorFields': errorFields }
    }
    return result;
}

/**
 * To check empty values of specific filed
 * @param {each params array from Form Data Array} params 
 * Author : Kiran Ivalekar
 */
function checkEmptyValues(params) {
    var returnData = getValidateField(params[0]);
    if (returnData.status && params[1].trim() == '') {
        return { 'status': true, 'errorCode': returnData.errorCode }
    } else if (returnData.status && (params[1] == '' || params[1].trim() == '$0')) {
        return { 'status': true, 'errorCode': returnData.errorCode }
    }
    return { 'status': false }
}

/**
 * Here we specifies required fields only to check validation
 * @param {each Form field name} fieldName 
 * Author : Kiran Ivalekar
 */
function getValidateField(fieldName) {
    switch (fieldName) {
        case 'data[TbPotermmaster][d_TermStartDate]':
            return { 'status': true, 'errorCode': '3013' }
        case 'data[TbPotermmaster][d_TermEndDate]':
            return { 'status': true, 'errorCode': '3014' }
        case 'AgencyDropDown':
            return { 'status': true, 'errorCode': '3223' }
        case 'data[TbPersoninfo][s_FirstName]':
            return { 'status': true, 'errorCode': '3049' }
        case 'data[TbPersoninfo][s_LastOrganizationName]':
            return { 'status': true, 'errorCode': '3050' }
        case 'data[TbPersonaddress][s_HouseNo]':
            return { 'status': true, 'errorCode': '3489' }
        case 'data[TbPersonaddress][s_PostalCode]':
            return { 'status': true, 'errorCode': '3052' }
        case 'data[TbPersonaddress][n_CountyId_FK]':
            return { 'status': true, 'errorCode': '1045' }
        case 'data[TbPersonaddress][n_CityId_FK]':
            return { 'status': true, 'errorCode': '1065' }
        case 'data[TbPersonaddress][n_StateId_FK]':
            return { 'status': true, 'errorCode': '1066' }
        case 'data[PROTECTIONCLS]':
            return { 'status': true, 'errorCode': '3320' }
        case 'data[HOBCEGCODE]':
            return { 'status': true, 'errorCode': '4040' }
        case 'data[yearbuilt]':
            return { 'status': true, 'errorCode': '2223' }
        case 'data[CONSTRTYPE]':
            return { 'status': true, 'errorCode': '4042' }
        case 'txt_basicCVG_1':
            return { 'status': true, 'errorCode': '3321' }
        case 'ddDeductNonHurricane':
            return { 'status': true, 'errorCode': '4048' }
        default:
            return { 'status': false }
    }
}

/**
 * to validate email/phone onBlur
 * @param {current changed element} e 
 * @author Kiran Ivalekar
 */
export function validateFields(e) {
    var msg;
    if (e.currentTarget.id == 's_EmailAddress') {
        const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!regEx.test(e.currentTarget.value)) {
            msg = 'Please enter valid email address!';
        }
    } else if (e.currentTarget.id == 's_PhoneNumber') {
        var temp = e.currentTarget.value.replace(/[- )(_]/g, '');
        if (temp.length != 10) {
            msg = 'Please enter valid phone number!';
        }
    }
    toastAction(false, msg);
}

/**
     * To prevent future date
     * @param {current changed element} e 
     * @author Kiran Ivalekar
     */
export function validateYearBuild (e) {
    // Commented By Kiran - Year Build can be future date till 2050, No need to Validate
    /*if (e.currentTarget.value > new Date().getFullYear()) {
        toastAction(false, 'You cannot enter future date for year built!');
        ReactDOM.findDOMNode(e.currentTarget).classList.add('is-invalid');
    }else{
        ReactDOM.findDOMNode(e.currentTarget).classList.remove('is-invalid');
    }*/
}

/**
 * On Input change check whether is empty or not and class respectively
 * @param {current changed element} e 
 * @author Kiran Ivalekar
 */
export function onInputChange(e) {
    if (e.currentTarget.value == '' || e.currentTarget.value == '$0') {
        ReactDOM.findDOMNode(e.currentTarget).classList.add('is-invalid');
    } else {
        ReactDOM.findDOMNode(e.currentTarget).classList.remove('is-invalid');
    }
}