import React from 'react'
import Moment from 'moment';
import * as Action from '../store/actions';
import Http from '../Http';


const apiUrl = process.env.REACT_APP_API_URL;

// Converting Date into MM/DD/YYYY
export function convertDateMMDDYYYY(paramsDate, dateFormat) {
  const date = new Date(paramsDate);
  return Moment(date).format(dateFormat);
  //return new Intl.DateTimeFormat('en-US').format(date);
}

export function convertAmount(amount) {
  var amt = 0;
  let amountFloat = parseFloat(amount);
  if (amountFloat >= 0) {
    amt = '$' + amountFloat.toFixed(2);
    if (amountFloat == 0 || amountFloat == null) {
      amt = '$(0.00)';
    }
  } else {
    amt = <span style={{ color: 'red' }}>{'$(' + Math.abs(amountFloat).toFixed(2) + ')'}</span>;
  }
  return amt;
}
// DataTable Paging Showing Start, To and Total Data Text
export function showDataTableTotalText(start, to, total) {
  return (
    <p style={{ color: 'blue' }}>
      From {start} to {to}, totals is {total}.
    </p>
  );
}

export function makeDataTableActionLink(cell, row) {
  return <a href="#" >{cell}</a>;
}

export function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    var amt = amount ? amount : 0;
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amt < 0 ? "-" : "";

    let i = parseInt(amt = Math.abs(Number(amt) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return '$' + negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amt - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
}

export function DateMMDDYYYY(dateFormat) {
  const date = new Date();
  return Moment(date).format(dateFormat);
}

export function addDaysToDate(paramsDate){
  const date = new Date(paramsDate);
  date.setDate(date.getDate() + 365);
  return date;
}

export function checkPermission(moduleName)
{
  return dispatch => (
    new Promise((resolve, reject) =>{
      if(moduleName!='')
      {
        Http.get(apiUrl + `/api/v1/checkPermission/${moduleName}`)
          .then((res) => {
            if(res.data.status == 'Y')
            {
              dispatch(Action.checkPermission(res.data));
              return resolve(res.data);
            }
          })
      }
    })
  )
}