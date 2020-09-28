import React, {useState, useEffect} from 'react';

import { formatMoney } from '../../../../services/commanServices';

const BsRow = props => {
    return  <tr>
        <td>{props.data.s_SubtypeScreenName} </td>
        <td>{formatMoney(props.data.n_Unallocatedamount)} </td>
        <td>{formatMoney(props.data.n_Amount)} </td>
        <td>{formatMoney(0)} </td>
        <td>{props.data.s_AccountID} </td>
    </tr>
}
export default BsRow;