import React from 'react';
import { Col, Table } from 'reactstrap';
import { useSelector } from 'react-redux';
import { getNumberFormat } from '../../CommonComponents/methods';


export default () =>
{
    const { accounting } = useSelector(state => state);
    const {credit, debit} = accounting;
    return(
        <Col xs="11">
            <Table>
            <thead>
                <tr>
                    <th width="390px" align="right">Total</th>
                    <th align="left" width="210px">{getNumberFormat(debit.reduce((total, d) => {
                        if(d) total+=Number(d);
                        return total;
                        }, 0))}</th>
                    <th align="left">{getNumberFormat(credit.reduce((total, d) => {
                        if(d) total+=Number(d);
                        return total;
                        }, 0))}</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            </Table> 
            </Col> 
    )
}