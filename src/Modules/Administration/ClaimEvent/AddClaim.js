import React, { Component } from "react";
import { claimEventService } from "../../../services/claimEventService";
import Select from 'react-select';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  InputGroup,
  Label,
  Col,
  Collapse,
  Form,
  FormGroup,
  Table,
  Fade,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';

class AddClaim extends Component {
  constructor(props) {
    super(props);    
    this.apiService = new claimEventService();
    this.state = {
      isModalOpen: false,
      dropDownData:[],
      s_ClaimTypeCode:'',
      s_ClaimEventCode:'',
      s_ClaimEventName:'',
      s_ClaimEventDesc:'',
      d_StartDate:'',
      d_EndDate:'',
      n_ClaimEventsId_PK:'',
      test:'',
      loadingOnButton: false,

      valueDropDown: [],
      optDropDown:[],

    };
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({loadingOnButton:true});
    let error = 'N';
    let msg = '';

    const { s_ClaimTypeCode,s_ClaimEventCode, s_ClaimEventName, s_ClaimEventDesc, d_StartDate , d_EndDate , n_ClaimEventsId_PK } = this.state;
    const credentials = {
        s_ClaimTypeCode,
        s_ClaimEventCode,
        s_ClaimEventName,
        s_ClaimEventDesc,
        d_StartDate,
        d_EndDate,
        n_ClaimEventsId_PK

    };

    if (credentials.d_EndDate == '') {
        error = 'Y';
        msg = 'Please Enter End Date';
    }
    if (credentials.d_StartDate == '') {
        error = 'Y';
        msg = 'Please Enter Start Date';
    }

    if (credentials.s_ClaimEventDesc == '') {
        error = 'Y';
        msg = 'Please Enter Event Description';
    }

    if (credentials.s_ClaimEventName == '') {
        error = 'Y';
        msg = 'Please Enter Event Name';
    }

    if (credentials.s_ClaimEventCode == '') {
        error = 'Y';
        msg = 'Please Enter Event Code';
    }

    if (credentials.s_ClaimTypeCode == '') {
        error = 'Y';
        msg = 'Please Select Event Type';
    }

    if (error == 'Y') {
        this.error(msg);
        this.setState({
            loadingOnButton:false,
        })
    } else {
        this.submit(credentials);
    }
}   

submit(credentials) {
    let error = 'N';
    let msg = '';
    let id = '';
    this.props.dispatch(this.apiService.eventClaimSave(credentials))
    .then((res) => {
        if(this.props.claimEventSaveData.Status == "N"){
            this.error(this.props.claimEventSaveData.Msg)
            this.setState({
                loadingOnButton:false,
            })
        }else if(this.props.claimEventSaveData.Status == "Update"){
            this.success(this.props.claimEventSaveData.Msg);
            this.props.toggle();
            this.props.claimData();
            this.setState({
                loadingOnButton:false,
            })
        }else{
            this.success(this.props.claimEventSaveData.Msg)
            this.props.toggle();
            this.props.claimData();
            this.setState({
                loadingOnButton:false,
            })
        }
    })
}

    error(msg) {
        return toast.error(msg, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    success(msg) {
        return toast.success(msg, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

  componentDidMount = () =>{
        if (this.props.dropdown != null) {
            this.state.dropDownData = this.props.dropdown.map(({ s_AppCodeNameForDisplay: label,s_AppCodeName:value, ...rest }) => ({ label,value, ...rest }));
        }
        
        if(this.props.isEdit == true){
            this.setState({
                s_ClaimTypeCode:this.props.editData.s_ClaimTypeCode,
                s_ClaimEventCode:this.props.editData.s_ClaimEventCode,
                s_ClaimEventName:this.props.editData.s_ClaimEventName,
                s_ClaimEventDesc:this.props.editData.s_ClaimEventDesc,
                d_StartDate:this.props.editData.d_StartDate,
                d_EndDate:this.props.editData.d_EndDate,
                n_ClaimEventsId_PK:this.props.editData.n_ClaimEventsId_PK,
            })
        }else{
            this.setState({
                
                s_ClaimTypeCode:'' ,
                s_ClaimEventCode:'',
                s_ClaimEventName:'',
                s_ClaimEventDesc:'',
                d_StartDate:'',
                d_EndDate:'',
                n_ClaimEventsId_PK:''
            })
        } 
        
        if (this.state.dropDownData != null && this.props.isEdit == true) {
            let allData = this.state.dropDownData
            let editValueCode = this.props.editData.s_ClaimTypeCode
            var index = allData.findIndex(p => p.value == editValueCode);
            this.setState({
                valueDropDown : this.state.dropDownData[index], 
            });
        }
    }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

handleChangeSelect = valueDropDown => {
    this.setState({s_ClaimTypeCode:valueDropDown.value})
    this.setState(prevState => ({
        ...prevState.select,
        valueDropDown
    }));
  };


  render() {
    const toInputUppercase = e => {
        e.target.value = ("" + e.target.value).toUpperCase();
        };
    const { loadingOnButton } = this.state;
    const buttonText = this.props.isEdit ? 'Update' : 'Save';
    const buttonTextOnClick = this.props.isEdit ? 'Updating' : 'Saving';
    
    return (
        <div>
            <Form onSubmit={this.handleSubmit}>
                <Row className="mt-2">
                    <Col xs="12" sm="4" className="">
                        <InputGroup className="input-prepend">
                            <Label id="s_ClaimTypeCodeLabel" className=""> Event Type: </Label>
                        </InputGroup>
                    </Col>
                    <Col xs="12" sm="6" className="">
                        <Select
                                    name="s_ClaimTypeCode"
                                    id="s_ClaimTypeCode"
                                    options={this.state.dropDownData}
                                    onChange={this.handleChangeSelect}
                                    value={this.state.valueDropDown}
                                    multi
                                />
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col xs="12" sm="4" className="">
                        <InputGroup className="input-prepend">
                            <Label id="s_ClaimEventCodeLabel" className=""> Event Code: </Label>
                        </InputGroup>
                    </Col>
                    <Col xs="12" sm="6" className="">
                        <Input type="text" name="s_ClaimEventCode" readOnly={this.props.isEdit} id="s_ClaimEventCode" onInput={toInputUppercase} defaultValue={this.state.s_ClaimEventCode} onChange={this.handleChange} />
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col xs="12" sm="4" className="">
                        <InputGroup className="input-prepend">
                            <Label id="s_ClaimEventNameLabel" className=""> Event Name: </Label>
                        </InputGroup>
                    </Col>
                    <Col xs="12" sm="6" className="">
                        <Input type="text" name="s_ClaimEventName" id="s_ClaimEventName" onInput={toInputUppercase} defaultValue={this.state.s_ClaimEventName} onChange={this.handleChange} />
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col xs="12" sm="4" className="">
                        <InputGroup className="input-prepend">
                            <Label id="EventDescLabel" className=""> Event Description: </Label>
                        </InputGroup>
                    </Col>
                    <Col xs="12" sm="6" className="">
                        <Input type="textarea" name="s_ClaimEventDesc" id="s_ClaimEventDesc" defaultValue={this.state.s_ClaimEventDesc} rows="4" onChange={this.handleChange} />
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col xs="12" sm="4" className="">
                        <InputGroup className="input-prepend">
                            <Label id="d_StartDateLabel" className=""> Event Start Date </Label>
                        </InputGroup>
                    </Col>
                    <Col xs="12" sm="6" className="">
                        <Input type="date"  id="d_StartDate" name="d_StartDate" onChange={this.handleChange} defaultValue={this.state.d_StartDate}  />
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col xs="12" sm="4" className="">
                        <InputGroup className="input-prepend">
                            <Label id="d_EndDateLabel" className=""> Event End Date </Label>
                        </InputGroup>
                    </Col>
                    <Col xs="12" sm="6" className="">
                        <Input type="date" id="d_EndDate" name="d_EndDate" onChange={this.handleChange} defaultValue={this.state.d_EndDate} placeholder="date" />
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col xs="12" sm="5" className=""></Col>
                    <Col xs="12" sm="4" className="">
                        <Button type="submit" size="" color="success" disabled={loadingOnButton} className="pull-left btn-md" >
                            { loadingOnButton ? 
                                <><i className="fa fa-spinner fa-spin"></i>&nbsp;{buttonTextOnClick}</>:
                                <><i className="fa fa-check"></i>&nbsp;{buttonText}</> 
                            } 
                        </Button>
                    </Col>
                </Row>
            </Form>
            
        </div>
    )
}
  
  };

const mapStateToProps = (state) => ({
    claimEventDropdown: state.Administration.claimEventDropdown,
    claimEventSaveData: state.Administration.claimEventSave
});

export default connect(mapStateToProps)(AddClaim);
