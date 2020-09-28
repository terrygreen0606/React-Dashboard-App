import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
  NavLink
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { gMapService } from "../../../../services/gMapService";

const url = window.location.href.split("/");
const id = url[url.length - 1];

class Group extends Component {
  constructor(props) {
    super(props);
    this.apiService = new gMapService();
    this.state = {
      mapZones: [],
      groupsData: [],
      n_MapZoneMasterId_PK: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset;
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
  }

  componentWillMount() {
    if (isNaN(id)) {
      this.props.dispatch(this.apiService.fetchGroups(0))
        .then((resp) => {
          this.setState({ mapZones: this.props.groupData.data.mapzoneMasters });
        });
    } else {
      this.props.dispatch(this.apiService.fetchGroups(id))
        .then((resp) => {
          this.setState({ mapZones: this.props.groupData.data.mapzoneMasters, groupsData: this.props.groupData.data.mapzoneGroupMasters[0] });
        });
    }
  }


  updateMapzonePk(e, value) {
    if (e.target.checked) {
      //append to array
      this.setState({
        n_MapZoneMasterId_PK: this.state.n_MapZoneMasterId_PK.concat([value])
      })
    } else {
      //remove from array
      this.setState({
        n_MapZoneMasterId_PK: this.state.n_MapZoneMasterId_PK.filter(function (val) { return val != value })
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const input = new FormData(event.target);
    const data = {
      groupCode: input.get('groupCode'),
      groupDescription: input.get('groupDescription'),
      n_MapZoneMasterId_PK: this.state.n_MapZoneMasterId_PK,
    };

    this.props.dispatch(this.apiService.saveGroup(data))
      .then((resp) => {
        if (this.props.saveGroupResponse.code == 200) {
          this.success(this.props.saveGroupResponse.message);
          this.handleReset();
        } else {
          this.error('Error in saving group.');
        }
      });
  }

  handleReset() {
    document.getElementById('groupForm').reset();
  }

  success(msg) {
    return toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  error(msg) {
    return toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  componentDidUpdate() {
    if (this.state.n_MapZoneMasterId_PK.length == 0) {
      if (Object.keys(this.state.groupsData).length) {
        var tempData = [];
        document.getElementById('groupCode').value = this.state.groupsData.s_GroupCode;
        document.getElementById('groupDescription').value = this.state.groupsData.s_GroupDesc;
        for (var i = 0; i < this.state.groupsData.group_detail.length; i++) {
          tempData.push(this.state.groupsData.group_detail[i].n_MapZoneMasterId_FK);
          document.getElementById('rule_' + this.state.groupsData.group_detail[i].n_MapZoneMasterId_FK).setAttribute('checked', 'checked');
        }
        this.setState({ n_MapZoneMasterId_PK: tempData });
      }
    }
  }

  render() {
    const containerStyle = {
      zIndex: 1999
    };

    if (Object.keys(this.state.groupsData).length == 0 && isNaN(id) == false) {
      return <div className="animated fadeIn pt-1 text-center">Loading...</div>;
    } else {
      return (
        <div className="row">
          <div className="animated fadeIn col-md-12">
            <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
            <Card>
              <form onSubmit={this.handleSubmit} id="groupForm">
                <CardHeader id="formHeader">Create Group</CardHeader>
                <CardBody>
                  <FormGroup>
                    <div className="row">
                      <Label htmlFor="groupCode" className="col-md-3">Group Code:</Label>
                      <Input type="text" className="col-md-7 text-uppercase" id="groupCode" name="groupCode" placeholder="Enter Group Code" required />
                      <span className="text-danger" id="groupCodeError"></span>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="row">
                      <Label htmlFor="groupDescription" className="col-md-3">Group Description:</Label>
                      <Input type="textarea" className="col-md-7" id="groupDescription" name="groupDescription" required />
                      <span className="text-danger" id="groupDescriptionError"></span>
                    </div>
                  </FormGroup>
                  {this.state.mapZones.map(function (value, index) {
                    return (
                      <FormGroup>
                        <div className="row">
                          <Label className="col-md-3">{value.s_MapZoneName}:</Label>
                          <Input type="checkbox" className="col-md-9" id={'rule_' + value.n_MapZoneMasterId_PK} name="n_MapZoneMasterId_PK" value={value.n_MapZoneMasterId_PK} onClick={(e) => this.updateMapzonePk(e, value.n_MapZoneMasterId_PK)} />
                        </div>
                      </FormGroup>
                    )
                  }, this)}
                </CardBody>
                <CardFooter>
                  <div className="text-right">
                    <Button type="submit" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                    <Button type="reset" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  groupData: state.Administration.fetchGroups,
  saveGroupResponse: state.Administration.saveGroup,
});


export default connect(mapStateToProps)(Group);