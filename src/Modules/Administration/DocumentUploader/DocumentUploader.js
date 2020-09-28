import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
  Form,
  FormGroup,
  Button,
  Input,
  Label,
} from "reactstrap";

import OverloadingBlockHp from "../UserProfile/ManageLevel/OverloadingBlockHp";
import UploadHome from "./UploadHome";
import DocumentList from "./DocumentList";


class DocumentUploader extends Component {
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
            <strong>Document </strong> Uploader
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="12">
                {/* <OverloadingBlockHp
                  loadingStateKey={"loadingLayerUploadProcess"}
                  centerContent={<UploadProcess />}
                /> */}
                <UploadHome />
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

DocumentUploader.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  // user: state.Auth.user,
});

export default connect(mapStateToProps)(DocumentUploader);
