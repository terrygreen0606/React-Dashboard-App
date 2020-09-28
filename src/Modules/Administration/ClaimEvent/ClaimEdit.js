import React, { Component } from 'react';
import Select from 'react-select';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
// import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import { claimEventService } from "../../../services/claimEventService";
import { convertDateMMDDYYYY } from "../../../services/commanServices";
import { connect } from 'react-redux';
import LoadingSpinner from './loading';
import ReactDOM from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';
import AddClaim from "./AddClaim";
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
    Table,
    Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';

class ClaimEdit extends Component {
    constructor(props) {
    super(props);
    this.apiService = new claimEventService();
    this.options = {
        sortIndicator: true,
        hideSizePerPage: true,
        hidePageListOnlyOnePage: true,
        alwaysShowAllBtns: false,
        withFirstAndLast: false,
        paginationSize: 10,
        sizePerPageList: [
            { text: '10', value: 10 },
            { text: '20', value: 20 },
            { text: '25', value: 25 },
            { text: '30', value: 30 },
            { text: '50', value: 50 }
          ],
        pageStartIndex: 1,
        paginationShowsTotal: true,
  }
  this.toggle = this.toggle.bind(this);
  this.claimList = this.claimList.bind(this);
  this.selectActions = this.selectActions.bind(this);
  
  
    this.state = {
        loading: false,
        loadingOnButton: false,
        isModalOpen: false,
        isEdit:false,
        isEditModalOpen: false,
        tableData:[],
        errors: {},
        isEdit:false,
        response: {
            error: false,
            message: '',
            },
        appCodePk:'',
        pageTemp: 1,
        editData:{},
        defaultPage: 1,

    };
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

    claimList() {
        this.setState({
            loading:true
        }) 
        this.props.dispatch(this.apiService.getClaimEventData())
        .then((res) => {
            this.setState({
                loading:false
            })
        });
    }

    componentWillMount() {
        this.claimList();
    }

    submit(credentials) {
        
        let error = 'N';
        let msg = '';
        let id = '';
        
    }

    toggle() {
            this.setState({ isModalOpen: !this.state.isModalOpen ,
                isEdit:false
            });
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
    };

    changeDate(cell, row){
       return convertDateMMDDYYYY(cell,'MM-DD-YYYY');
    };

    toggleEdit = (cell, row) => {
        this.setState({
             isModalOpen: !this.state.isModalOpen,
             editData: row,
             isEdit:true
             
         });
    }

    render() {
        this.table = this.props.claimEventData;
        const { loading } = this.state;
        const modelHeadarText = this.state.isEdit ? 'Edit Claim' : 'Add Claim';

        const options = {
            page: this.state.pageTemp,
            sizePerPageList: [
                { text: '10', value: 10},
                { text: '25', value: 25},
                { text: '50', value: 50},
                { text: '100', value: 100}
            ],
            pageStartIndex: 1,
            paginationShowsTotal: true,
          };
         return (
            <div className="animated fadeIn">
                <Card>
                    <CardHeader><h1>Add / Edit Claim Event</h1></CardHeader>
                </Card>
                
                    <Card>
                        <CardHeader><strong>Event View</strong>
                            <Button size="sm" className="btn-linkedin btn-brand mr-1 mb-1 float-right" onClick={this.toggle} >  <span>Add</span></Button>
                        </CardHeader>
                        {loading ? <LoadingSpinner /> :
                            <CardBody>
                                <BootstrapTable data={this.table} version="4" striped hover search pagination={ true } options={options}>
                                <TableHeaderColumn dataField="s_ClaimTypeCode" isKey dataSort >EVENT TYPE</TableHeaderColumn>
                                <TableHeaderColumn dataField="s_ClaimEventCode" dataSort >EVENT CODE</TableHeaderColumn>
                                <TableHeaderColumn dataField="s_ClaimEventName" dataSort >EVENT NAME</TableHeaderColumn>
                                <TableHeaderColumn dataField="s_ClaimEventDesc" dataSort >EVENT DESC</TableHeaderColumn>
                                <TableHeaderColumn dataField='d_StartDate' dataFormat={this.changeDate} dataSort >EVENT START</TableHeaderColumn>
                                <TableHeaderColumn dataField='d_EndDate' dataFormat={this.changeDate} dataSort >EVENT END</TableHeaderColumn>
                                <TableHeaderColumn dataField="" dataFormat={this.selectActions} >ACTION</TableHeaderColumn>
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
                            <AddClaim  props={this.state.isModalOpen} claimData={this.claimList} isEdit={this.state.isEdit} editData={this.state.editData} dropdown={this.props.claimEventDropdown} toggle = {this.toggle}/>
                        </ModalBody>
                    </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
   claimEventData: state.Administration.claimEventData,
   claimEventDropdown: state.Administration.claimEventDropdown,
  });
  
  
  export default connect(mapStateToProps)(ClaimEdit);