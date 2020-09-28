import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Dropzone from "./Dropzone/Dropzone";
import "./Upload.css";
import Progress from "./Progress/Progress";
import Http from "../../../Http";
import { toastAction } from "../../../store/actions/toast-actions";
import * as docUploaderServicesObj from "../../../services/documentUploaderServices";

class UploadHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

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
      await Promise.all(promises);
      console.log('Finally ho gaya'+promises);
      this.setState({ successfullUploaded: true, uploading: false });
      
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      console.log('Finally ho gaya cat=cge'+e);
      this.setState({ successfullUploaded: true, uploading: false });
    }
  }

  sendRequest(file) {
    return new Promise((resolve, reject) => {

      const apiUrl = process.env.REACT_APP_API_URL;
      const formData = new FormData();
      formData.append("file", file, file.name);
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
          return resolve(res);
        })
        .catch((err) => {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = { state: "error", percentage: 0 };
          this.setState({ uploadProgress: copy });          
          return reject(err);
        });
    });
  }

  sendRequest_demoWorking(file) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file, file.name);
      const apiUrl = process.env.REACT_APP_API_URL;
      console.log(apiUrl);
      console.log(formData);

      /*const req = Http.post(`${apiUrl}/api/v1/uploadDocumentUploader`, formData);
      req.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100,
          };
          this.setState({ uploadProgress: copy });
        }        
      });

      req.upload.addEventListener("load", (event) => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
        
      });

      req.upload.addEventListener("error", (event) => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });
      */

      const options = {
        onUploadProgress: (event) => {
          if (event.lengthComputable) {
            const copy = { ...this.state.uploadProgress };
            copy[file.name] = {
              state: "pending",
              percentage: (event.loaded / event.total) * 100,
            };
            this.setState({ uploadProgress: copy });
            //console.log(copy);
          }
        },
      };
      Http.post(`${apiUrl}/api/v1/uploadDocumentUploader`, formData, options)
        .then((res) => {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = { state: "done", percentage: 100 };
          this.setState({ uploadProgress: copy });
          console.log("inside Then" + copy);
          return resolve(res);
        })
        .catch((err) => {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = { state: "error", percentage: 0 };
          this.setState({ uploadProgress: copy });
          console.log("inside eRoor" + err);
          return reject(err);
        });
    });
  }

  sendRequest_Old(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", (event) => {
        // if (event.lengthComputable) {
        //   const copy = { ...this.state.uploadProgress };
        //   copy[file.name] = {
        //     state: "pending",
        //     percentage: (event.loaded / event.total) * 100,
        //   };
        //   this.setState({ uploadProgress: copy });
        // }
        console.log("ProgressWas");
      });

      req.upload.addEventListener("load", (event) => {
        // const copy = { ...this.state.uploadProgress };
        // copy[file.name] = { state: "done", percentage: 100 };
        // this.setState({ uploadProgress: copy });
        // resolve(req.response);

        console.log("Load Event");
      });

      req.upload.addEventListener("error", (event) => {
        // const copy = { ...this.state.uploadProgress };
        // copy[file.name] = { state: "error", percentage: 0 };
        // this.setState({ uploadProgress: copy });
        // reject(req.response);

        console.log("Error Event");
      });

      const formData = new FormData();
      formData.append("file", file, file.name);

      const apiUrl = process.env.REACT_APP_API_URL;
      console.log(apiUrl);
      console.log(formData);
      //req.open("POST", `${apiUrl}/api/v1/uploadDocumentUploader`);
      //req.send(formData);

      Http.post(`${apiUrl}/api/v1/uploadDocumentUploader`, formData)
        .then((res) => {
          //toastAction(true, res.data.message);
          //return res;

          Http.upload.addEventListener("load", (event) => {
            const copy = { ...this.state.uploadProgress };
            copy[file.name] = { state: "done", percentage: 100 };
            this.setState({ uploadProgress: copy });
            resolve(req.response);
          });
        })
        .catch((err) => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors,
          };
          //toastAction(false, errors);
          return reject(false);
        });
    });
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="assets/img/check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
              
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button
          onClick={() =>
            this.setState({ files: [], successfullUploaded: false })
          }
        >
          Clear
        </button>
      );
    } else {
      return (
        <button
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          Upload
        </button>
      );
    }
  }

  render() {
    return (
      <div className="Upload">
        <span className="Title">Upload Files</span>
        <div className="Content">
          <div>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
            />
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
        </div>
        <div className="Actions">{this.renderActions()}</div>
      </div>
    );
  }
}

UploadHome.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoadingAddBtnMngmodule: "",
});

export default connect(mapStateToProps)(UploadHome);
