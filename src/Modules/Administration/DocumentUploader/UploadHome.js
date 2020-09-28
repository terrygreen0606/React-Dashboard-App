import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Row,
  Col,
  FormText,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  FormGroup,
  Button,
  Input,
  Label,
} from "reactstrap";
import Dropzone from "./Dropzone/Dropzone";
import "./Upload.css";
import Progress from "./Progress/Progress";
import Http from "../../../Http";
import { toastAction } from "../../../store/actions/toast-actions";
import * as docUploaderServicesObj from "../../../services/documentUploaderServices";
import * as docHandlerServicesObj from "../../../services/documentHandlerServices";
import OverloadingBlockHp from "../UserProfile/ManageLevel/OverloadingBlockHp";
import AddProcessSelectModuleComp from "../UserProfile/ManageSubModule/AddProcessSelectModuleComp";
import DoctypeSelectbox from "../DocumentHandler/DoctypeSelectbox";

class UploadHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleSelected:'',
      doctypeSelected:props.doctypeDDSelected,
      doctypeDDSelectedNew: [props.doctypeDDSelected],
      moduleDDSelected: props.moduleDDSelected,
      moduleDDSelectedNew: [props.moduleDDSelected],
      description:'',
      uploadDate:'',

      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,      
    };

    

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
    //let reload document list 
    this.doForcefullyUpdate = this.doForcefullyUpdate.bind(this);
  }

  handleChangeDocUploader = (fieldStateRef, event) => {
    switch (fieldStateRef) {
      case "uploadDate":
        this.setState({ uploadDate: event.target.value });
        return true;
      case "description":
        this.setState({ description: event.target.value });
        return true;
      default:
        return true;
    }
  };


  onFilesAdded(files) {
    this.setState((prevState) => ({
      files: prevState.files.concat(files),
    }));
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach((file) => {
      promises.push(this.sendRequest(file));
    });
    try {
      //await Promise.all(promises);
      await Promise.allSettled(promises);
      console.log("Ho gaya" + promises);
      this.setState({ successfullUploaded: true, uploading: false });     
      //finally reload the document datatable
      this.props.dispatch(
        docHandlerServicesObj.doForcefullyUpdateServices("docUploaderdocumnetListDT")
      );
      
      

    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      console.log("Got Error" + e);
      console.log(e.message);
      this.setState({ successfullUploaded: true, uploading: false });
    }

    


  }
//https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const apiUrl = process.env.REACT_APP_API_URL;
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("moduleSelected", this.state.moduleDDSelectedNew.value);
      formData.append("doctypeSelected", this.state.doctypeDDSelectedNew.value);
      formData.append("description", this.state.description);
      formData.append("uploadDate", this.state.uploadDate);
      //console.log(this.state.moduleDDSelectedNew.value);
      //console.log(this.state.doctypeDDSelectedNew.value);
      // if(typeof this.state.moduleDDSelectedNew.value == 'undefined'){
      //   toastAction(false, "Module Selection is Mandatory!");
      //   this.setState({ uploading: false });
      //   return false;
      // }
      // if(typeof this.state.doctypeDDSelectedNew.value == 'undefined'){
      //   toastAction(false, "Document Type Selection is Mandatory!");
      //   this.setState({ uploading: false });
      //   return false;
      // }
      // if(this.state.description == ''){
      //   toastAction(false, "Description Can't be blank!");
      //   this.setState({ uploading: false });
      //   return false;
      // }
      // if(this.state.uploadDate == ''){
      //   toastAction(false, "Date Can't be blank!");
      //   this.setState({ uploading: false });
      //   return false;
      // }


      const options = {
        onUploadProgress: (event) => {
          if (event.lengthComputable) {
            const copy = { ...this.state.uploadProgress };
            copy[file.name] = {
              state: "pending",
              percentage: (event.loaded / event.total) * 100,
            };
            this.setState({ uploadProgress: copy });
          }
        },
      };
      Http.post(`${apiUrl}/api/v1/uploadDocumentUploader`, formData, options)
        .then((res) => {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = { state: "done", percentage: 100 };
          this.setState({ uploadProgress: copy });
          //return resolve(res);
          resolve(res);
        })
        .catch((err) => {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = { state: "error", percentage: 0 };
          this.setState({ uploadProgress: copy });
          //return reject(err);
          reject(err);
        });
    });
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <div className="CheckIcon">
          <img            
            alt="done"
            src="assets/img/check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
          </div>
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <Button
          type="reset"
          size="m"
          color={"warning"}
          onClick={() =>
            this.setState({ files: [], successfullUploaded: false })
          }
        >
          <i className="fa fa-ban"></i> Clean
        </Button>
      );
    } else {
      return (
        <Button
          size="m"
          color="primary"
          className="float-right"
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          <i className="fa fa-dot-circle-o"></i> Upload
        </Button>
      );
    }
  }


  doForcefullyUpdate = (e) => {
    this.props.dispatch(
      docHandlerServicesObj.doForcefullyUpdateServices("docUploaderdocumnetListDT")
    );
  };

  componentDidUpdate(prevProps, prevState) {

  if (prevProps.doctypeDDSelected !== this.props.doctypeDDSelected) {
    this.setState({              
      doctypeDDSelected: this.props.moduleDDSelected,
      doctypeDDSelectedNew: this.props.doctypeDDSelected || ''        
    });  

    //console.log(this.state.doctypeDDSelectedNew.value);    
  }   

  if (prevProps.moduleDDSelected !== this.props.moduleDDSelected) {
    this.setState({
      moduleDDSelected: this.props.moduleDDSelected,
      moduleDDSelectedNew: this.props.moduleDDSelected || ''
    });
  }



}

  render() {
    return (
      <Card>
        <CardHeader>
          <strong>Upload </strong> Files
        </CardHeader>
        <CardBody>
        <Row>
          <Col xs="4">
          <Form id='fileUploadinfoForm' action="" method="post" className="form-horizontal">
            <FormGroup row>
              <Col md="3">
                <Label >Module</Label>
              </Col>
              <Col xs="12" md="9">
                <OverloadingBlockHp
                  loadingStateKey={"loadingSubModuleAddProcssModuleDD"}
                  centerContent={<AddProcessSelectModuleComp />}                  
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label >Doc Type</Label>
              </Col>
              <Col xs="12" md="9">
                <OverloadingBlockHp
                  loadingStateKey={"loadingLayerDoctypeDD"}
                  centerContent={<DoctypeSelectbox /> }
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label >Description</Label>
              </Col>
              <Col xs="12" md="9">
              <Input type="textarea" name="description" id="description"

                onChange={e =>
                    this.handleChangeDocUploader("description", e)
                  }

                value={this.state.description} 
              
                rows="5" placeholder="Content..." />  
                
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label >Date</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="date" id="uploadDate" name="uploadDate" placeholder="date" 
                onChange={e =>
                    this.handleChangeDocUploader("uploadDate", e)
                  }
                value={this.state.uploadDate} />                
              </Col>
            </FormGroup>
            </Form>
          </Col>
          <Col xs="8">
            <Form action="" method="post" className="form-horizontal">
              <FormGroup row>
                <Col xs="12">
                  <div className="Upload">
                    <div className="Content">
                      <div style={{'width':'100%'}}>
                        <Dropzone
                          onFilesAdded={this.onFilesAdded}
                          disabled={
                            this.state.uploading || this.state.successfullUploaded
                          }
                        />
                      </div>
                      
                    </div>
                  </div>
                  <div className="Files">
                        {this.state.files.map((file) => {
                          return (
                            <div key={file.name} className="Row">
                              <span className="Filename">{file.name}</span>
                              {this.renderProgress(file)}
                            </div>
                          );
                        })}
                      </div>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        </CardBody>
        <CardFooter>
          <div className="Actions" style={{}}>
            {this.renderActions()}
          </div>
        </CardFooter>
      </Card>
    );
  }
}

UploadHome.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  addEditFormFieldValues: state.submoduleManageProcess.addEditFormFieldValues,
  doctypeDDSelected: state.docHandlerProcess.selected_DoctypePK_SelectBox,  
  moduleDDSelected: state.docHandlerProcess.selected_ModulePK_SelectBox,  
});

export default connect(mapStateToProps)(UploadHome);
