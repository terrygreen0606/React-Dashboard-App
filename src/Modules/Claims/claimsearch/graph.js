import React, { Component } from 'react';

import {Col} from 'reactstrap';
import {  Doughnut  } from 'react-chartjs-2';


const doughnut = {
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
                '#A5E65A',
                '#00A6C0',
                '#32D9CB',
            ],
            
        }
    ],
    labels: [
        'Closed',
        'Re-open',
        'Open'
    ]
};
class claimgraph extends Component {
    render() {
        return (
            <Col xs="12" sm="12" lg="6" className=" input-search-fields mt-4">
                <div>
                    <h2 className="text-center mb-3">Claim status count 20976
                    </h2>
                    <Doughnut data={doughnut} />
                </div>
            </Col>
        );
    }
}

export default claimgraph;
