import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Col, Row, Card,
    CardBody,
    CardHeader, Button, Label
} from 'reactstrap';
import * as BatchProcessService from '../../../../services/batchProcessService';
import 'react-dropzone-uploader/dist/styles.css';
import DropzoneComponent from 'react-dropzone-component';
import "dropzone/dist/dropzone.css";
import "react-dropzone-component/styles/filepicker.css";
import { toastAction } from '../../../../store/actions/toast-actions';
import { convertAmount } from '../../../../services/commanServices';
import Helmet from 'react-helmet';


class index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            files: [],
            noOfTrans: '',
            totalAmt: '',
            fileUrl: null,
            loaderLabel: '',
            calledApi: false,
            importLockBox: true
        }

        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: ".dat",
            autoProcessQueue: false,
            maxFiles: 1,
        };

        this.componentConfig = {
            iconFiletypes: ['.dat'],
            showFiletypeIcon: true,
            postUrl: 'no-url'
        };

        this.dropzone = null;
    }

    handleSubmit = (files, allFiles) => {
        if (this.state.files.length > 0) {
            this.formData = new FormData();
            this.state.files.map(data => this.formData.append('boaUpload[]', data))
            this.setState({ loaderLabel: 'Uploading Image ...', calledApi: true }, () => {
                this.props.dispatch(BatchProcessService.uploadBOA(this.formData))
                    .then((res) => {
                        if (res.status == 'Y') {
                            toastAction(true, res.msg);
                            this.setState({ files: [], noOfTrans: res.transCount, totalAmt: convertAmount(res.totalAmt), fileUrl: res.url, calledApi: false, importLockBox: false });
                        } else {
                            toastAction(false, res.msg);
                            this.setState({ files: [], loaderLabel: '', calledApi: false });
                        }
                    });
            });
        } else {
            toastAction(false, 'Please add .dat file!');
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

    importLockBoxData = () => {
        const { fileUrl } = this.state
        const params = { // marge together as params
            fileUrl
        }
        this.setState({ loaderLabel: 'Improting Data ...', calledApi: true }, () => {
            this.props.dispatch(BatchProcessService.saveLockBoxData(params))
                .then((res) => {
                    if (res.status == 'Y') {
                        toastAction(true, res.msg);
                    } else {
                        toastAction(false, res.msg);
                    }
                    this.setState({ fileUrl: null, noOfTrans: '', totalAmt: '', loaderLabel: '', importLockBox: true, calledApi: false });
                });
        });
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
                    <Row className="p-2" hidden={this.state.importLockBox}>
                        <Col md="12">
                            <strong><Label>Number of Transaction: {this.state.noOfTrans}</Label></strong>
                        </Col>
                        <Col md="12">
                            <strong><Label>Total Amount: {this.state.totalAmt}</Label></strong>
                        </Col>
                        <Col md="12"><Button color="primary" size="sm" onClick={this.importLockBoxData}>Import Lockbox Data</Button></Col>
                    </Row>
                </React.Fragment>
            )
        }


        return (
            <React.Fragment>
                <Helmet>
                    <title>Avatar Insurance - LockBox Import BOA</title>
                </Helmet>
                <div className="animated fadeIn mt-2">
                    <Row>
                        <Col xs="12" md="12" className="mb-4">
                            <Card className="card-accent-primary">
                                <CardHeader>
                                    <strong>BOA Upload</strong>
                                </CardHeader>
                                <CardBody>
                                    {dropzoneComp}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}

index.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(index);