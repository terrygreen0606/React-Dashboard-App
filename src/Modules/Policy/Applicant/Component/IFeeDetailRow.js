import React, {useState, useEffect} from 'react';

import { formatMoney } from '../../../../services/commanServices';

const IFeeDetailRow = props => {

    return  <tr>
        <td>{props.data.s_SubtypeScreenName} </td>
        <td>{props.data.s_PercentOrAmount} </td>
        <td>{props.data.n_PercentAmtValue} </td>
        <td>{formatMoney(props.data.n_DetailAmt)} </td>
    </tr>
}
export default IFeeDetailRow;