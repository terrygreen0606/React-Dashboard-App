import React, { Component, useState } from 'react';
import Select from 'react-select';
import { TextMask, InputAdapter } from 'react-text-mask-hoc';
import { AppSwitch } from '@coreui/react';
import Switch from "react-switch";
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { transferBookService } from "../../../services/transferBookService";
import PropTypes from "prop-types";
import LoadingSpinner from './loading';
import { ToastContainer, toast } from 'react-toastify';
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
} from 'reactstrap';

    class TransferBookHeader extends Component {
    constructor(props) {
        super(props);

        this.options = {
            sortIndicator: true,
            hideSizePerPage: true,
            paginationSize: 10,
            hidePageListOnlyOnePage: true,
            clearSearch: true,
            alwaysShowAllBtns: false,
            withFirstAndLast: false
        }

        this.apiService = new transferBookService();
        this.change = this.change.bind(this);
        this.agentChange = this.agentChange.bind(this);
        this.changeNewAgency = this.changeNewAgency.bind(this);
        this.changeNewAgent = this.changeNewAgent.bind(this);
        this.changeReason = this.changeReason.bind(this);
        this.selectActions = this.selectActions.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleIfNotChange = this.handleIfNotChange.bind(this);
        this.setValue = this.setValue.bind(this);
        this.handleagentSelection = this.handleagentSelection.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNewAgent = this.handleNewAgent.bind(this);
        this.setNewAgentValue = this.setNewAgentValue.bind(this);
        this.filterTable = this.filterTable.bind(this);
        this.success = this.success.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleList = this.handleList.bind(this);
        this.callGetTransferBookListApi = this.callGetTransferBookListApi.bind(this);
        this.state = {
          agencyData: [],
          agencyCodeData:[],
          Agency_Code: [],
          AgentPersonId: [],
          AgencyDropDown: [],
          agentValue: [],
          NewAgencyDropDown:[],
          NewAgentDropDown:[],
          SelectedAgentId:[],
          ReasonCode:[],
          transferReason:[],
          sessionData: {},
          productsData: [],
          Value: '',
          agencyError:'',
          toggleSwitch:false,
          searchParams: {
            AppStatus: ''
          },
          forSelectAll:0,
          acknowledgeStatus:0,
          agencyTransferReason:[],
          value: [],
          optionsAgent:[],
          valueNewAgent: [],
          optNewAgent:[],
          SelectedPolicy:[],
          checkedAcknowledge:false,
          loading: false,
          pageTemp: 1,
          sizePerPageTemp: 10,
          errors: {},
            response: {
                error: false,
                message: '',
            },
          isDataFetched: true
        };
        this.tableData = [];
    }

      setValue = value => {
        this.setState(prevState => ({
            ...prevState.select,
            value
        }));
      };

      handleagentSelection = value => {
        this.setValue(value);
      };

       handleNewAgent = valueNewAgent => {
        this.setNewAgentValue(valueNewAgent);
      };

      setNewAgentValue = valueNewAgent => {
        this.setState(prevState => ({
            ...prevState.select,
            valueNewAgent
        }));
      };

      success(msg) {
        // add type: 'success' to options
        // positioning: https://github.com/fkhadra/react-toastify#positioning-toast
        return toast.success(msg, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    handleSubmit(e){
        e.preventDefault();
        let NewAgent = this.state.valueNewAgent['value'];
        let SelectedAgent = this.state.value['value'];
        this.state.NewAgentDropDown = NewAgent;
        this.state.SelectedAgentId = SelectedAgent;
        const { NewAgencyDropDown, SelectedPolicy,AgencyDropDown,ReasonCode,NewAgentDropDown,SelectedAgentId,checkedAcknowledge } = this.state;
        const credentials = {
            NewAgencyDropDown,
            SelectedPolicy,
            AgencyDropDown,
            ReasonCode,
            NewAgentDropDown,
            SelectedAgentId,
            checkedAcknowledge
        };
        this.setState({ response: { error: false, message: '' }, forSelectAll : 0,toggleSwitch : false , SelectedPolicy : [] });
        this.filterTable(credentials);
    };
      
    filterTable(credentials) {
        let error = 'N';
        let msg = '';
        if (credentials.checkedAcknowledge == false) {
            error = 'Y';
            msg = 'Please check acknowledgement';
        }
        if (credentials.SelectedPolicy.length == 0) {
            error = 'Y';
            msg = 'Please select atleast one policy';
        }
        if (error == 'Y') {
            this.error(msg);
        } else {
            this.setState({loading:true});
            this.props.dispatch(this.apiService.transferBook(credentials))
            .then((res) => {
                this.success('Transfered Agency Successfully');
                this.setState({ loading: false , checkedAcknowledge: false });
                this.callGetTransferBookListApi();
                
            })
            .catch((err) => {
                const errors = Object.values(err.errors);
                errors.join(' ');
                const response = {
                    error: true,
                    message: errors,
                };
                this.setState({ response });
            });
        }
 
    }

    callGetTransferBookListApi() {
        let AgentPersonId = this.state.value['value'];
        const { AgencyDropDown, Agency_Code,SelectedAgentId,NewAgencyDropDown,ReasonCode } = this.state;
        const credentials = {
            AgencyDropDown,
            Agency_Code,
            SelectedAgentId,
            NewAgencyDropDown,
            AgentPersonId,
            ReasonCode
        };
        this.setState({ response: { error: false, message: '' } });
        this.filterListTable(credentials);
    }


    handleList(e)  {
        e.preventDefault();
        this.callGetTransferBookListApi();
    };

    filterListTable(credentials) {
        let error = 'N';
        let msg = '';
            if (credentials.ReasonCode == "") {
                error = 'Y';
                msg = "Please Select Reason";
            }
            if (credentials.NewAgencyDropDown == "") {
                error = 'Y';
                msg = "Please Select New Agency";
            }
            if (credentials.AgencyDropDown == "") {
                error = 'Y';
                msg = "Please Select Agency";
            }
        
        if (error == 'Y') {
            this.error(msg);
        } else {
            this.setState({ loading: true });
            this.props.dispatch(this.apiService.getSearchPolicyForTransferBook(credentials))
            .then((res) => {
                this.setState({loading:false});
            })
        }
    }   

    error(msg) {
        return toast.error(msg, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    async componentWillMount() {
        this.props.dispatch(this.apiService.getTransfrBookReason())
        if (this.props.agencyData == null) {
            this.props.dispatch(this.apiService.getAgencyDropdown())
            .then((res) => {
     
            });
        }
    }
      
    change(event){
        const params = event.value;
        this.props.dispatch(this.apiService.getAgentDropdown(params));
        if (this.props.agencyCodeData != '') {
            this.props.dispatch(this.apiService.getAgencyCode(params));
        }
        this.setState({
            AgencyDropDown: params,
        });
    }

    agentChange(event){
        const agentValue = event.value;
        this.setState({
            agentValue: agentValue
          });
    }
    
    changeNewAgent(event){
        const newAgent = event.value;
        this.setState({
            newAgent: newAgent
          });
    }
    changeReason(event){
        const ReasonCode = event.value;
        this.setState({
            ReasonCode: ReasonCode
          });
    }

    changeNewAgency(event){
        const params = event.value;
        this.filterAgentData(params);
        this.setState({
            NewAgencyDropDown: params,
            forSelectAll : 0
        });
    }

    filterAgentData(params) {
        this.props.dispatch(this.apiService.getNewAgentDropdown(params))
    }


    componentWillReceiveProps(props) {
        if (props.agencyCodeData != null) {    
            let agencyCodeData = props.agencyCodeData;
            this.setState({
                Agency_Code: agencyCodeData.s_PersonUniqueId,
            });
        }
        
        if ((props.agentData != null) && (props.agentData.length > 0)) {
                    let agentDatas = props.agentData
                    if(agentDatas[0]['value']!= ''){
                        agentDatas.unshift({value :'',label : "All"});
                        this.setState({
                        value : agentDatas[0], 
                        optionsAgent: agentDatas
                        });
                    }
        }

        if (props.transferReason != null) {
            this.state.agencyTransferReason = props.transferReason.map(({ s_AppCodeNameForDisplay: label,s_AppCodeName:value, ...rest }) => ({ label,value, ...rest }));
        }

        if (props.newAgentData != null) {
            this.setState({
                valueNewAgent : props.newAgentData[0], 
                optNewAgent: props.newAgentData
            });
        }
    }

    selectActions(cell, row){
            if((this.state.forSelectAll == 1)){
                this.cellClicked(cell, row)
            }else{
                this.state.SelectedPolicy = [];
                this.state.toggleSwitch = false;
            }
        return <label>
            <AppSwitch 
                className={'mx-1'}
                checked={this.state.toggleSwitch ? true : false} 
                onClick={() =>
                    this.cellClicked(cell, row)}
                variant={'pill'}
                color={'info'} 
                />
        </label>
    };
    handleIfNotChange(row){
        this.state.SelectedPolicy = [];
    }

    handleChange(row){
        if (this.state.SelectedPolicy.indexOf(row.s_POAppNo) > -1) {
            this.state.SelectedPolicy.splice(this.state.SelectedPolicy.indexOf(row.s_POAppNo), 1);
        } else {
            this.state.SelectedPolicy.push(row.s_POAppNo);
        }
    }

    selectAll(){
        this.setState({
            toggleSwitch: !this.state.toggleSwitch,
        });
        this.state.forSelectAll = 0
        if(this.state.toggleSwitch == false){
            this.setState({
                forSelectAll : 1
            });
        }
        this.selectActions()
        

    }

    cellClicked = (cell, row) => {
        if (this.state.SelectedPolicy.indexOf(row.s_POAppNo) > -1) {
            this.state.SelectedPolicy.splice(this.state.SelectedPolicy.indexOf(row.s_POAppNo), 1);
        } else {
            this.state.SelectedPolicy.push(row.s_POAppNo);
        }
    };

    handleCheck() {
        this.setState({
            checkedAcknowledge: !this.state.checkedAcknowledge,
            acknowledgeStatus: 1,//to stop rendering on change 
        });
      };
        
    
    
    render() {
        this.table = this.props.policyData;
        const toggleSwitch = this.state.toggleSwitch 
        const { loading } = this.state;
        return (
            <Form method="POST">
                <div className="animated fadeIn">
                    <Row>
                        <Col xs="12" sm="3">
                            <FormGroup>
                                <InputGroup className="input-prepend">
                                    <Label id='' className="">Select Agency</Label>
                                </InputGroup>
                                <Select
                                name="AgencyDropDown"
                                id="AgencyDropDown"
                                options={this.props.agencyData != null? this.props.agencyData : null}
                                onChange={this.change}
                                multi
                                />
                            </FormGroup>
                        </Col>

                        <Col xs="12" sm="3">
                            <InputGroup className="input-prepend">
                                <Label id='QuoteNo' className="">Select Agent</Label>
                            </InputGroup>
                            <Select
                                name="AgentDropDown"
                                id="AgentDropDown"
                                value={this.state.value}
                                options={this.state.optionsAgent}
                                onChange={this.handleagentSelection}
                                multi
                            />
                        </Col>

                        <Col xs="12" sm="3" >
                            <InputGroup className="input-prepend">
                                <Label id='QuoteNo' className="">Select New Agency</Label>
                            </InputGroup>
                            <Select
                                name="NewAgencyDropDown"
                                id="NewAgencyDropDown"
                                options={this.props.agencyData != null? this.props.agencyData : null}
                                onChange={this.changeNewAgency}
                                multi
                                />
                        </Col>
                        <Col xs="12" sm="3">
                            <InputGroup className="input-prepend">
                                <Label id='QuoteNo' className="">Select New Agent</Label>
                            </InputGroup>
                            <Select
                                name="NewAgentDropDown"
                                id="NewAgentDropDown"
                                value={this.state.valueNewAgent}
                                options={this.state.optNewAgent}
                                onChange={this.handleNewAgent}
                                multi
                            />
                        </Col>
                        <Col xs="12" sm="3">
                            <InputGroup className="input-prepend">
                                <Label id='QuoteNo' className="">Select Reason</Label>
                            </InputGroup>
                            <Select
                                name="TRANSFERBOBREASON"
                                id="TRANSFERBOBREASON"
                                options={this.state.agencyTransferReason != null? this.state.agencyTransferReason : null}
                                onChange={this.changeReason}
                                multi
                            />
                        </Col>
                        <Col xs="3" sm="2" className='mt-4'></Col>
                        <Col xs="2" sm="2" className='mt-4'>
                            <Button type="submit" size="" color="success" onClick={this.handleList} className="pull-left btn-md">List Policy</Button>
                        </Col>
                    </Row>
                    {loading ? <LoadingSpinner /> :
                        <Card>
                            <CardHeader><h4>Search Result</h4></CardHeader>
                            <CardBody>

                            <BootstrapTable data={this.table} height='300px' remote={true} striped hover options={this.options} pagination={true}>
                            <TableHeaderColumn dataField="" dataFormat={this.selectActions}><AppSwitch className={'mx-1'} onClick={this.selectAll} checked={toggleSwitch ? true : false} variant={'pill'} color={'info'} /></TableHeaderColumn>
                                <TableHeaderColumn isKey dataField="s_ProductName" dataSort={true}>Policy Type</TableHeaderColumn>
                                <TableHeaderColumn dataField="s_POAppNo" dataSort>Policy No</TableHeaderColumn>
                                <TableHeaderColumn dataField="InsuredName" dataSort>Insured Name</TableHeaderColumn>
                                <TableHeaderColumn dataField="s_AppStatus" dataSort width="90">Status</TableHeaderColumn>
                                <TableHeaderColumn dataField="s_AppCodeNameForDisplay" headerAlign='left' dataAlign='right' dataSort>Remark</TableHeaderColumn>
                                <TableHeaderColumn dataField="AgentName" dataSort>Agent</TableHeaderColumn>
                                <TableHeaderColumn dataField="AgencyName" dataSort>Agency</TableHeaderColumn>
                            </BootstrapTable>
                            </CardBody>
                        </Card>
                    }
                    <Card>
                        <CardBody>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td><AppSwitch className={'mx-1'} variant={'pill'} color={'info'} onChange={() => {this.state.checkedAcknowledge = !this.state.checkedAcknowledge}} checked={this.state.checkedAcknowledge} /></td>
                                        <td><p className='text-danger'> I acknowledge that I have collected all the required documents related to Book of Business Transfer and attached to the system.</p>
                                        <Button type="submit" size="" color="success" onClick={this.handleSubmit} className="pull-left btn-md">Transfer Policy</Button></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </div>
            </Form>
        );
    }
}


const mapStateToProps = state => ({
    agencyData: state.common.agencyDropdown,
    agentData: state.common.agentDropdown,
    newAgentData: state.common.newAgentDropdown,
    policyData: state.common.searchPolicy,
    transferReason: state.common.reasonDropdown,
    agencyCodeData: state.common.agencyCode,
    transferStatusData: state.common.transferStatus
  });
  
  export default connect(mapStateToProps)(TransferBookHeader);

// export default TransferBookHeader;
