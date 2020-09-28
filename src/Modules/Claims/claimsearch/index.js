import React, { Component } from 'react';
import { Row} from 'reactstrap';



import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import Searchfields from "./searchfields.js"
import Datatable from "./datatable.js"
import Dailyclaimcount from "./dailyclaimcount.js"
import ClaimGraph from "./graph.js"


class Claimsearch extends Component {

    render() {
        return (
            <div className="animated fadeIn claimsearchdif">
                <Searchfields/>
                <Datatable/>
                <Row>
                    <Dailyclaimcount/>
                    <ClaimGraph/>
                </Row>

            </div>
        );
    }
}

export default Claimsearch;
