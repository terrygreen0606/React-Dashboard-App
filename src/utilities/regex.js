/*
 * @file: Regex.js
 * @description: Regex used for validation in application
 * */

const Regex = {
    required: val => {
        return val && val.toString().trim().length;
    },
    maxLength: (val, length) => {
        return !val || (val && val.trim().length <= length);
    },
    requiredDate: val => {
        return val && val.toString().trim().length;
    },
    validateEmail: function (val) {
        // eslint-disable-next-line
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            val
        );
    },
    validateMultipleEmail: function (val) {
        // eslint-disable-next-line
        return /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;,.](([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/.test(
            val
        );
    },
    validateMobile: function (val) {
        // eslint-disable-next-line
        return /^\+?\d{9,12}$/.test(val);
    },
    validName: function (val) {
        // eslint-disable-next-line
        return /^([a-zA-Z_ ]){1,15}$/.test(val);
    },
    validateFreeSpace: function (val) {
        // eslint-disable-next-line
        return /^$|^[^\s]+(\s+[^\s]+)*$/.test(val);
    },
    validateMobileWithoutCC: function (val) {
        // eslint-disable-next-line
        return /^\+(?:[0-9] ?){6,14}[0-9]$/.test(val);
    },
    validateString: function (val) {
        // eslint-disable-next-line
        return /^([a-zA-Z ]){0,30}$/.test(val);
    },
    validatePassword: function (val) {
        // eslint-disable-next-line
        return /^(?=.*[A-Za-z])(?=.*[0-9_-])[A-Za-z0-9@_-]{6,12}$/.test(val);
    },
    validateNumbers: function (val) {
        // eslint-disable-next-line
        return /^[0-9]{1,}$/.test(val);
    },
    validateInteger: function (val) {
        // eslint-disable-next-line
        return /^\d*[1-9]\d*$/.test(val);
    },
    validateMessage: function (val) {
        // eslint-disable-next-line
        return /^[A-Za-z 0-9 @!,:]{1,100}$/.test(val);
    },
    validateURL: function (url) {
        // eslint-disable-next-line
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
            url
        );
    },
    validatePrice(val) {
        // eslint-disable-next-line
        return /^(\d*([.,](?=\d{1}))?\d+)?$/.test(val);
    },
    validateTwoDecimalPlaces(val) {
        // eslint-disable-next-line
        return /^(?:\d*\.\d{1,2}|\d+)$/.test(val);
    },
    validateAlphaNumberic(val) {
        // eslint-disable-next-line
        return /^[a-zA-Z0-9 ]{0,30}$/.test(val);
    },
    validateAlphaNumbericWithoutSpace(val) {
        // eslint-disable-next-line
        return /^[a-zA-Z0-9]{0,30}$/.test(val);
    },
    validateRoutingNumber(val) {
        // eslint-disable-next-line
        return /^[0-9]{6}$/.test(val);
    },
    validateAccountNumber(val) {
        // eslint-disable-next-line
        return /^[0-9]{7,8}$/.test(val);
    },
    getNumbericValuesFromString(val) {
        // eslint-disable-next-line
        return val.match(/^\d+|\d+\b|\d+(?=\w)/g);
    }
};

module.exports = Regex;