import React from 'react';
import Moment from 'react-moment';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {
    claimReviewStatusCodeOptions,
    claimReviewSubStatusCodeOptions
} from '../../../services/claimService';

export const ClaimReviews = ({claim}) => {
    
    const reviewsTable = claim.reviews ? Object.keys(claim.reviews).map(transId => ({
        transId: transId,
        reviewSubStatuses: claim.reviews[transId].map(r=>claimReviewSubStatusCodeOptions[r.s_ReviewSubCode]).join(','),
        reviewDate: claim.reviews[transId][0].d_ReviewedDate,
        reviewStatusCode: claimReviewStatusCodeOptions[claim.reviews[transId][0].s_ReviewMainCode],
    })) : [];
    
    return (
      <BootstrapTable data={reviewsTable} version="4" striped hover pagination className="table-sm">
            <TableHeaderColumn dataField="transId" isKey={true} dataSort={true} >Transaction</TableHeaderColumn>
            <TableHeaderColumn dataField="reviewStatusCode" dataSort={true} >Review Status</TableHeaderColumn>
            <TableHeaderColumn dataField="reviewSubStatuses" dataSort={true} >Review Sub-Statuses</TableHeaderColumn>
            <TableHeaderColumn dataField="reviewDate" dataFormat={d=><Moment date={d} format="MM/DD/YYYY"/>} dataSort={true} >Review Date</TableHeaderColumn>
      </BootstrapTable>
)}