import React from 'react';
import {Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col} from 'reactstrap';



const DailyClaimCount = (props) => {

    const claimCount = props.fetchedClaims.claimCount;
    const claimList = props.fetchedClaims.claimList;
    let content = <><i className="fa fa-spinner fa-spin"></i><span style={{paddingLeft:'15px'}}>Loading data...</span></>;

    if (claimCount > 0 && claimList.length ) {
        content = (
            <>
                <div>
                    { claimList.map((claim) => {
                        return (
                            <>
                            <Link
                                to={`/claims/${claim.ClaimId_PK}`}>
                                    { claim.Claim_No }
                            </Link><br/>
                            </>
                        );
                    }) }
                </div>
                <>
                <div>
                    <h1>{ claimCount }</h1>
                </div>
                </>
            </>
        );
    } else {
        content = <p>Could not fetch any data.</p>;
    }

        return (
            <Col xs="12" sm="12" lg="6" className=" input-search-fields d-flex justify-content-center mt-4">
                <div className="last-trans d-flex align-items-center" style={{width:"60%"}}>
                    <Card className="w-100 border-primary" >
                        <CardHeader className="bg-white border-bottom ">
                            <h4 className="text-dark"> Todays claim count</h4>
                        </CardHeader>
                        <CardBody className="d-flex justify-content-around align-items-center">
                            { content }
                        </CardBody>
                    </Card>
                </div>
            </Col>
        );
}

export default DailyClaimCount;
