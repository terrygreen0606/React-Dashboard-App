import React, {useState, useEffect} from 'react';

import { formatMoney } from '../../../../services/commanServices';

const IDetailRow = props => {

    return  <tr>
        <td>{props.data.s_AccountingDate} </td>
        <td>{props.data.Policy_No} </td>
        <td>{props.data.s_TranTypeScreenName} </td>
        <td>{formatMoney(props.data.n_PremiumAmount)} </td>
        <td>{formatMoney(props.data.n_DetailAmt)} </td>
    </tr>
}
export default IDetailRow;