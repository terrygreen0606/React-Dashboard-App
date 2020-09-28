import React, { Component } from 'react';
import Select from 'react-select';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { systemDropdownService } from "../../../services/systemDropdownService";
import { connect } from 'react-redux';
import LoadingSpinner from './loading';
import { toast } from 'react-toastify';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form, 
    FormGroup,
    Input,
    InputGroup,
    Label,
    Row,
    Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';

class SystemDropdown extends Component {
    constructor(props) {
    super(props);
    this.apiService = new systemDropdownService();
    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 10,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
  }
  this.submit = this.submit.bind(this);
  this.change = this.change.bind(this);
  this.selectActions = this.selectActions.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);

    this.toggle = this.toggle.bind(this);
    //this.toggleEdit = this.toggleEdit.bind(this);
   // this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      loading: false,
      loadingOnButton: false,
      isModalOpen: false,
      isEditModalOpen: false,
      tableData:[],
      dropdownData:[],
      dropdownDataList:[],
      dropdownSaveResult:[],
      s_AppCodeName: '',
      s_AppCodeNameForDisplay: '',
      s_AppCodeDescription: '',
      SystemDropdownId:'',
    //   s_AppCodeDescriptionValue:'',
    //     s_AppCodeNameForDisplayValue:'',
    //     s_AppCodeNameValue:'',
        errors: {},
      response: {
          error: false,
          message: '',
        },
        appCodePk:'',
        appCodeReadOnly:false

    //   fadeIn: true,
    //   timeout: 300,
    };
  }

    toggle() {
        this.setState({
            s_AppCodeNameForDisplay: '',
            s_AppCodeDescription: '',
            s_AppCodeName:'',
            appCodePk: '',
            appCodeReadOnly:false 
        });
        let error = 'N';
        let msg = '';

        if (this.state.SystemDropdownId == '') {
            error = 'Y';
            msg = 'Please Select Dropdown';
        }
        if (error == 'Y') {
            this.error(msg);
        } else {
            this.setState({ isModalOpen: !this.state.isModalOpen });
        }    

    }

    toggleEdit = (cell, row) => {
        this.setState({ isModalOpen: !this.state.isModalOpen });
            if(this.state.isModalOpen == false){
                this.setState({
                    s_AppCodeName: row.s_AppCodeName,
                    s_AppCodeNameForDisplay: row.s_AppCodeNameForDisplay,
                    s_AppCodeDescription: row.s_AppCodeDescription,
                    appCodePk: row.n_AppCodeId_PK,
                    appCodeReadOnly:true  
                });
            }
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

    componentWillMount() {
        if (this.props.dropdownData == null) {
            this.props.dispatch(this.apiService.getSystemDropdown())
            .then((res) => {
     
            });
        }
    }

    change(event){
        let params = '';
        if (event){
            params = event.value;
        }else{
            params = this.state.SystemDropdownId;
        }
        this.setState({loading:true,SystemDropdownId:params});
        this.props.dispatch(this.apiService.getSystemDropdownList(params))
        .then((res) => {
            this.setState({ loading: false});
            
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({loadingOnButton:true});
        let error = 'N';
        let msg = '';
    
        const { s_AppCodeName, s_AppCodeNameForDisplay, s_AppCodeDescription, SystemDropdownId , appCodePk } = this.state;
        const credentials = {
            s_AppCodeName,
            s_AppCodeNameForDisplay,
            s_AppCodeDescription,
            SystemDropdownId,
            appCodePk
        };

        if (credentials.s_AppCodeDescription == '') {
            error = 'Y';
            msg = 'Please Enter AppCode Description';
        }
        if (credentials.s_AppCodeNameForDisplay == '') {
            error = 'Y';
            msg = 'Please Enter AppCode Name For Display';
        }
        if (credentials.s_AppCodeName == '') {
            error = 'Y';
            msg = 'Please Enter AppCode Name';
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
        let id = '';
        if (credentials.appCodePk != '') {
            id = credentials.appCodePk;
            this.props.dispatch(this.apiService.updateDropdownOption(id ,credentials))
            .then((res) => {
                this.setState({
                    isModalOpen:false,
                    loadingOnButton:false,
                    s_AppCodeName:'',
                    s_AppCodeNameForDisplay:'',
                    s_AppCodeDescription:'',

                });
                this.success('Dropdown Option Update Successfull');
                this.change();
            })
        } else {
            this.props.dispatch(this.apiService.systemDropdownSave(credentials))
            .then((res) => {
                if(this.props.dropdownSaveResult.Msg == "Dropdown Option Add Successfully."){
                    this.success('Dropdown Option Add Successfull');
                    this.setState({isModalOpen:false,loadingOnButton:false});
                    this.change();
                } else if(this.props.dropdownSaveResult.Msg == "Some Error Occure."){
                    this.error('Some Error Occure.');
                    this.setState({loadingOnButton:false});
                } else {
                    this.error('AppCode Name is Already Exsist');
                    this.setState({loadingOnButton:false});
                }
            })
        }
    }

    selectActions(cell, row){
    return <label>
        <Button type="button" 
            size="" 
            color="success"  
            onClick={() =>this.toggleEdit(cell, row)}
            >
            &nbsp;Edit 
        </Button>
    </label>
}


    render() {
        this.table = this.props.dropdownDataList;
        const { loading } = this.state;
        const { loadingOnButton } = this.state;
        const toInputUppercase = e => {
        e.target.value = ("" + e.target.value).toUpperCase();
        e.target.value=e.target.value.replace(/ /g,"_");
        };
        const buttonText = this.state.appCodeReadOnly ? 'Update' : 'Save';
        const buttonTextOnClick = this.state.appCodeReadOnly ? 'Updating' : 'Saving';
        const modelHeadarText = this.state.appCodeReadOnly ? 'Update Dropdown Option' : 'Add Dropdown Option';
        return (
            <div className="animated fadeIn">
                <Card>
                    <CardHeader><h1>System Dropdown</h1></CardHeader>
                </Card>
                <Row>
                <Col xs="12" sm="2">
                <InputGroup className="input-prepend">
                    <Label id='' className="">System Dropdowns:</Label>
                </InputGroup>
                </Col>
                    <Col xs="12" sm="3">
                        <FormGroup>
                            
                            <Select
                                name="SystemDropdown"
                                id="SystemDropdown"
                                options={this.props.dropdownData != null? this.props.dropdownData : null}
                                onChange={this.change}
                                multi
                            />
                        </FormGroup>
                    </Col>
                </Row>
                
                    <Card>
                        <CardHeader><strong>Dropdown Option</strong>
                            <Button size="sm" className="btn-linkedin btn-brand mr-1 mb-1 float-right" onClick={this.toggle} >  <span>Add</span></Button>
                        </CardHeader>
                        {loading ? <LoadingSpinner /> :                                
                        <CardBody>
                            <BootstrapTable data={this.table} remote={true} striped hover options={this.options} pagination={true}>
                            <TableHeaderColumn dataField="n_AppCodeIdPk" dataSort hidden={true}>Id</TableHeaderColumn>
                                <TableHeaderColumn dataField='s_AppCodeName' isKey >AppCode Name</TableHeaderColumn>
                                <TableHeaderColumn dataField='s_AppCodeNameForDisplay'>AppCode Name For Display</TableHeaderColumn>
                                <TableHeaderColumn dataField='s_AppCodeDescription'>AppCode Description</TableHeaderColumn>
                                {/* <TableHeaderColumn dataField='add'>AIRMapping</TableHeaderColumn> */}
                                <TableHeaderColumn dataField="" dataFormat={this.selectActions}>Action</TableHeaderColumn>
                            </BootstrapTable>
                        </CardBody>
                        }
                    </Card>
                <Modal isOpen={this.state.isModalOpen} className={"modal-lg"} >
                    <ModalHeader className="p-2 mt-3">
                        {modelHeadarText} &nbsp;&nbsp;
                        <i className="fa fa-times" onClick={this.toggle}></i>
                    </ModalHeader>
                    
                        <ModalBody>
                            <Form onSubmit={this.handleSubmit}>
                            <div className="animated fadeIn">
                                <Row className="mt-2">
                                    <Col xs="12" sm="4" className="">
                                        <InputGroup className="input-prepend">
                                        <Label id="QuoteNo" className="">AppCode Name:</Label>
                                        </InputGroup>
                                    </Col>
                                    <Col xs="12" sm="6" className="">
                                        <Input type="text"  name="s_AppCodeName" id="s_AppCodeName" readOnly={this.state.appCodeReadOnly} onInput={toInputUppercase} onChange={this.handleChange} defaultValue={this.state.s_AppCodeName} />
                                    </Col>
                                </Row>
                                
                                <Row className="mt-2">
                                    <Col xs="12" sm="4" className="">
                                        <InputGroup className="input-prepend">
                                            <Label id="QuoteNo" className=""> AppCode Name For Display: </Label>
                                        </InputGroup>
                                    </Col>
                                    <Col xs="12" sm="6" className="">
                                        <Input type="text" name="s_AppCodeNameForDisplay" id="s_AppCodeNameForDisplay" onChange={this.handleChange} defaultValue={this.state.s_AppCodeNameForDisplay}/>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col xs="12" sm="4" className="">
                                        <InputGroup className="input-prepend">
                                            <Label id="QuoteNo" className=""> AppCode Description:</Label>
                                        </InputGroup>
                                    </Col>
                                    <Col xs="12" sm="6" className="">
                                        <Input type="text" name="s_AppCodeDescription" id="s_AppCodeDescription" onChange={this.handleChange} defaultValue={this.state.s_AppCodeDescription} />
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col xs="12" sm="5" className=""></Col>
                                    <Col xs="12" sm="4" className="">
                                        <Button type="submit" size="" disabled={loadingOnButton} color="success" className="pull-left btn-md" 
                                            >
                                        { loadingOnButton ? 
                                            <><i className="fa fa-spinner fa-spin"></i>&nbsp;{buttonTextOnClick}</>:
                                            <><i className="fa fa-check"></i>&nbsp;{buttonText}</> 
                                        }    
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                            </Form>        
                        </ModalBody>
                    
                </Modal>

                

            </div>
        );
    }
}

const mapStateToProps = state => ({
    dropdownData: state.Administration.systemDropdown,
    dropdownDataList: state.Administration.systemDropdownList,
    dropdownSaveResult: state.Administration.systemDropdownSave
  });
  
  
  export default connect(mapStateToProps)(SystemDropdown);
