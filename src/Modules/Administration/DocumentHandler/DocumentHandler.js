import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from "reactstrap";

import OverloadingBlockHp from "../UserProfile/ManageLevel/OverloadingBlockHp";
import ProductList from "./ProductList";
import DoctypeList from "./DoctypeList";
import DocumentList from "./DocumentList";

class DocumentHandler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
    };
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>Document </strong> filter
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="6">
                <OverloadingBlockHp
                  loadingStateKey={"loadingLayerProductDataTable"}
                  centerContent={<ProductList />}
                />
              </Col>
              <Col xs="6">
                <OverloadingBlockHp
                  loadingStateKey={"loadingLayerDoctypeDataTable"}
                  centerContent={<DoctypeList />}
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <OverloadingBlockHp
                  loadingStateKey={"loadingLayerDocumentDataTable"}
                  centerContent={<DocumentList />}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

// export default Agency;

DocumentHandler.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  // user: state.Auth.user,
});

export default connect(mapStateToProps)(DocumentHandler);
