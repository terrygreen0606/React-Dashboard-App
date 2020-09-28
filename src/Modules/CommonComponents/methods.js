/*
* Common function/methods for components
*/

/*********** Date format **********/
export const getDateFormat = date => {
    let day = new Date(date).getDate();
    let month = new Date(date).getMonth() + 1;
    if (Number(day) < 10) {
        day = `0${day}`;
    }
    if (Number(month) < 10) {
        month = `0${month}`;
    }
    return `${new Date(date).getFullYear()}${month}${day}`;
}
/********** Make Date format ************/
export const formatDate = (row, key) => {
    let value = row[key] ? row[key].toString().replace(/\-/g, '').trim() : '';
    if (value.length === 6)
        value = "0" + value.slice(4, 5) + "/" + "0" + value.slice(5, 6) + "/" + value.slice(0, 4);
    else if (value.length === 7)
        if (Number(value.slice(4, 6)) > 12) {
            value = "0" + value.slice(4, 5) + "/" + value.slice(5, 7) + "/" + value.slice(0, 4);
        } else {
            value = value.slice(4, 6) + "/" + "0" + value.slice(6, 7) + "/" + value.slice(0, 4);
        }
    else if (value.length > 7)
        value = value.slice(4, 6) + "/" + value.slice(6, 8) + "/" + value.slice(0, 4);
    return value;
}

/*********** number format **********/
export const getNumberFormat = (number = 0 , decimal = 2) => {
    let num = Number(number).toFixed(decimal);  
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    
}
