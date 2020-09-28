import ReactDOM from "react-dom";
import { toastAction } from '../../../store/actions/toast-actions';
import { isEmpty } from "lodash";

export function validate(formData)
{
    var result = { 'status': true };
    var error = [];
    var errorFields = [];
    var enityType = '';
    console.log(formData)
    var AddressFormData = formData.AddressFormData;
    var ApplicantFormData = Object.entries(formData.ApplicantFormData)
    var RoleFormData = formData.RoleFormData;
    
    for (var pairValues of ApplicantFormData)
    {
        // check validate fields empty
        var returnData = checkEmptyValues(pairValues);
        if (returnData.status) {
            error.push(returnData.errorDescription)
            errorFields.push(pairValues[0]);
        }
        if(pairValues[0] == 's_EntityType' && pairValues[1] != '')
        {
            enityType = pairValues[1];
        }
        if(enityType == 'PERSON' || enityType == '')
        {
            if(pairValues[0] == 's_FirstName' && pairValues[1] == '')
            {
                error.push('First Name can not be empty')
                errorFields.push(pairValues[0]);
            }
        }

        if (pairValues[0] == 's_EmailAddress' && pairValues[1].trim() != '') {
            var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!regEx.test(pairValues[1])) {
                error.push('Invalid Email');
                errorFields.push(pairValues[0]);
            }
        }
    }

    if(isEmpty(AddressFormData))
    {
        error.push('Address Information is empty')
    }

    if(isEmpty(RoleFormData))
    {
        error.push('Role Information is Empty')
    }

        
    if (error.length > 0) {
        result = { 'status': false, 'errorMsg': error, 'errorFields': errorFields }
    }
    return result;
}


function checkEmptyValues(params) {
    var returnData = getValidateApplicantField(params[0]);
    if (returnData.status && params[1].trim() == '') {
        return { 'status': true, 'errorDescription': returnData.errorDescription }
    }
    return { 'status': false }
}



function getValidateApplicantField(fieldName) {
    switch (fieldName) {
        case 's_EntityType':
            return { 'status': true, 'errorDescription': 'Entity Type not selected' }
        case 's_LastOrganizationName':
            return { 'status': true, 'errorDescription': 'Last Name can not be empty' }
        case 's_PhoneNumber':
            return { 'status': true, 'errorDescription': 'Phone Number can not be empty' }
        case 's_EmailAddress':
            return { 'status': true, 'errorDescription': 'Email Address can not be empty' }
        
        
        default:
            return { 'status': false }
    }
}