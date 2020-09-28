import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Col, Row, Card,
    CardBody,
    CardHeader, Button, Label
} from 'reactstrap';
import * as ClaimInvoiceUploadService from '../../../../services/claimInvoiceUploadService';
import 'react-dropzone-uploader/dist/styles.css';
import DropzoneComponent from 'react-dropzone-component';
import "dropzone/dist/dropzone.css";
import "react-dropzone-component/styles/filepicker.css";
import { toastAction } from '../../../../store/actions/toast-actions';
import { convertAmount } from '../../../../services/commanServices';

class claimInvoice extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            files: [],
            fileUrl: null,
            loaderLabel: '',
            calledApi: false,
            claimInvoiceFileUpload: true
        }


        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: ".csv",
            autoProcessQueue: false,
            maxFiles: 1,
        };

        this.componentConfig = {
            iconFiletypes: ['.csv'],
            showFiletypeIcon: true,
            postUrl: 'no-url'
        };

        this.dropzone = null;
    }


    handleSubmit = (files, allFiles) => {
        if(this.state.files.length > 0){
            this.formData = new FormData();
            this.state.files.map(data => this.formData.append('claimInvoiceUpload[]', data))
            this.setState({ loaderLabel: 'Uploading CSV ...', calledApi: true }, () => {
                this.props.dispatch(ClaimInvoiceUploadService.claimInvoiceUpload(this.formData))
                    .then((res) => {
                        console.log(res);
                        if (res.Status == 'Y') {
                            toastAction(true, res.Msg);
                            this.setState({ files: [], fileUrl: res.url, calledApi: false});
                        } else {
                            toastAction(false, res.Msg);
                            this.setState({ files: [], loaderLabel: '', calledApi: false });
                        }
                    });
            });
        }else{
            toastAction(false, 'Please add .csv file!');
        }
    }


    handleFileAdded(file) {
        this.state.files.push(file)
    }

    handleFileRemove(file) {
        var fileIndex = this.state.files.indexOf(file);
        this.state.files.splice(fileIndex, 1)
    }

    handleErrorFile(file, message) {
        this.dropzone.removeFile(file);
        toastAction(false, message);
    }

    handleMaxFileExceed(file) {
        this.dropzone.removeAllFiles();
        this.dropzone.addFile(file);
    }

    render() {

        const eventHandlers = {
            init: dz => this.dropzone = dz,
            addedfile: this.handleFileAdded.bind(this),
            removedfile: this.handleFileRemove.bind(this),
            error: this.handleErrorFile.bind(this),
            maxfilesexceeded: this.handleMaxFileExceed.bind(this)
        }
        
        var dropzoneComp;
        if (this.state.calledApi == true) {
            dropzoneComp = (
                <div className="sk-three-bounce">
                    <div className="sk-child sk-bounce1"></div>
                    <div className="sk-child sk-bounce2"></div>
                    <div className="sk-child sk-bounce3"></div>
                    <h6><strong>{this.state.loaderLabel}</strong></h6>
                </div>
            );
        } else {
            dropzoneComp = (
                <React.Fragment>
                    <Row>
                        <Col md="12">
                            <DropzoneComponent config={this.componentConfig} eventHandlers={eventHandlers}
                                djsConfig={this.djsConfig}
                            />
                        </Col>
                    </Row>
                    <Row className="p-2">
                        <Col md="12" className="text-center">
                            <Button color="primary" onClick={this.handleSubmit}>Upload</Button>
                        </Col>
                    </Row>
                </React.Fragment>
            )
        }


        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12" className="mb-4">
                        <Card className="card-accent-primary">
                            <CardHeader>
                                <strong>Claim Invoice Upload</strong>
                            </CardHeader>
                            <CardBody>
                                {dropzoneComp}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

claimInvoice.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({

});
export default connect(mapStateToProps)(claimInvoice);
