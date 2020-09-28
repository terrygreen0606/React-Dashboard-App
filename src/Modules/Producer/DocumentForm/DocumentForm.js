import React, { Component } from 'react';
import { connect } from 'react-redux'
import ProducerService from '../../../services/Producer';
import FineUploaderTraditional from 'fine-uploader-wrappers'
import FineUploaderS3, { qq } from 'fine-uploader-wrappers/s3'



import Gallery from 'react-fine-uploader'
import 'react-fine-uploader/gallery/gallery.css'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  Row,
} from 'reactstrap';

// const uploader = new FineUploaderTraditional({
//     options: {
//         chunking: {
//             enabled: true
//         },
//         deleteFile: {
//             enabled: true,
//             endpoint: '/uploads'
//         },
//         request: {
//             endpoint: '/uploads'
//         },
//         retry: {
//             enableAuto: true
//         }
//     }
// })

// const uploader = new FineUploaderS3({ ... })
// const queuedFileStatus = qq.status.QUEUED
const uploader = new FineUploaderS3({
    options: {
        request: {
            endpoint: "http://fineuploadertest.s3.amazonaws.com",
            accessKey: "AKIAIXVR6TANOGNBGANQ"
        },
        signature: {
            endpoint: "/vendor/fineuploader/php-s3-server/endpoint.php"
        }
    }
})

class DocumentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSaving: false,
      s_UserFileName: "",
      n_docfileId_FK: 0,
      fileDocument: ''
    };
    //rest api endpoint
    this.api = process.env.REACT_APP_API_URL+'/api/v1/agency';
  }

  //save
  handleSaveDocument = () => {

      const {
        s_UserFileName,
        n_docfileId_FK,
        fileDocument,
      } = this.state;

    const data = new FormData();
    data.append('fileDocument', fileDocument);
    data.append('s_UserFileName', s_UserFileName);
    data.append('n_docfileId_FK', n_docfileId_FK);

    const formData = {fileDocument: fileDocument, s_UserFileName: s_UserFileName, n_docfileId_FK: n_docfileId_FK}
    const {agencyId} = this.props;

    var url = `${this.api}/${agencyId}/saveDocument`;
    this.setState({isSaving:true});
    this.props.saveDocumentRequest(data, url)
    .then(() => {
      this.setState({
        isSaving: false,
        s_UserFileName: "",
        n_docfileId_FK: 0,
        fileDocument: "",
      });
    })
    .catch((err) => {
      this.setState({ isSaving: false });
    });
  }

  onChange = (e) => {
    // let files = e.target.files || e.dataTransfer.files;
    // if (!files.length)
    //       return;
    // this.createFile(files[0]);
    this.setState({
      fileDocument: e.target.files[0]
    });
  }

  onChangeData = (e) => {
    const { name, value } = e.target;
    this.setState({[name]: value});
  }

  // createFile = (file) => {
  //   let reader = new FileReader();
  //   reader.onload = (e) => {
  //     this.setState({
  //       fileDocument: e.target.result
  //     })
  //   };
  //   reader.readAsDataURL(file);
  // }

  render() {
    const {
      fileName_arr
    } = this.props;
    const {
      isSaving,
      s_UserFileName,
      n_docfileId_FK,
    } = this.state;
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Document Form</strong>
          </CardHeader>
          <CardBody>
            <Form action="" method="post" >
              <Row>
                <Col md="4">
                  <Label size="sm" htmlFor="s_UserFileName" className="pr-1">File Name</Label>
                </Col>
                <Col xs="12" md="8">
                  <Input
                    value={s_UserFileName}
                    bsSize="sm"
                    type="text"
                    id="s_UserFileName"
                    name="s_UserFileName"
                    className="input-sm"
                    placeholder=""
                    required
                    onChange={(e) => this.onChangeData(e)}
                    disabled={isSaving}
                  />
                </Col>
              </Row>

              <Row>
                <Col md="4">
                  <Label size="sm" htmlFor="n_docfileId_FK" className="pr-1">Select File Type</Label>
                </Col>
                <Col xs="12" md="8">
                  <Input
                    type="select"
                    name="n_docfileId_FK"
                    id="n_docfileId_FK"
                    bsSize="sm"
                    disabled={isSaving}
                    value={n_docfileId_FK}
                    onChange={(e) => this.onChangeData(e)}
                  >
                    <option value="">Select File Type</option>
                    {fileName_arr&&
                    fileName_arr.map(fileName => (
                      <option value={fileName.n_docgroupfilename_PK}>
                        {fileName.s_docgroupfilename}
                      </option>
                    ))}
                  </Input>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Label htmlFor="fileDocument">File input</Label>
                </Col>
                <Col xs="12" md="8">
                  <Input type="file" id="fileDocument" name="fileDocument" onChange={this.onChange} />
                </Col>
              </Row>
              <Row>
                <Gallery uploader={ uploader } className="" />
              </Row>
              <Row >
                <Col className="text-center">
                  <Button
                    size="sm"
                    color="primary"
                    onClick={this.handleSaveDocument}
                  >
                    <i className="fa fa-dot-circle-o"></i> Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  fileName_arr: state.Producer.docData_arr.fileName_list
})
const mapDispatchToProps = dispatch => ({
    saveDocumentRequest: (formData, url) => dispatch(ProducerService.saveDocumentRequest(formData, url))//Origin
});
export default connect(mapStateToProps, mapDispatchToProps)(DocumentForm);
