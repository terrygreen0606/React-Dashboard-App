import React from 'react';

import {Col} from 'reactstrap';
import {  Doughnut  } from 'react-chartjs-2';

const ClaimStatusDoughnut = (props) => {
        return (
            <Col xs="12" sm="12" lg="6" className=" input-search-fields mt-4">
                <div>
                    <h2 className="text-center mb-3">Claim status count { props.totalCount }
                    </h2>
                    <Doughnut data={ props.doughnut} />
                </div>
            </Col>
        );
}

export default ClaimStatusDoughnut;
