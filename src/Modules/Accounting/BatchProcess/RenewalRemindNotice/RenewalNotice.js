import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { DateMMDDYYYY , addDaysToDate , convertDateMMDDYYYY} from '../../../../services/commanServices';
import AccountService from '../../../../services/accounting';
import LoadingSpinner from '../../loading';
import { AppSwitch } from '@coreui/react';
import DatePicker from "react-datepicker";
import { TextMask, InputAdapter } from 'react-text-mask-hoc';
import { convertAmount } from "../../../../services/commanServices";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment';
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


const propTypes = {};

const defaultProps = {};

/**
 * 
 */
class RenewalNotice extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        asofDate:'',
        noofDays:'7',
        toggleSwitch:false,
        forSelectAll: 0,
        loading: false,
        printButton:false,
        pageTemp: 1,
        asofDate: new Date(Moment(new Date())),
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectActions = this.selectActions.bind(this);
    this.convertAmounts = this.convertAmounts.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.handledate = this.handledate.bind(this);
    this.openPrintNotice = this.openPrintNotice.bind(this);
    this.noticePolicyList = this.noticePolicyList.bind(this);
    
}

handleSubmit = (e) => {
    e.preventDefault();
    this.noticePolicyList();
}

noticePolicyList() {
    let error = 'N';
    let msg = '';
    let{asofDate} = this.state;
    asofDate = convertDateMMDDYYYY(asofDate,'YYYY-MM-DD');
    const { noofDays } = this.state;
    const credentials = {
        asofDate,
        noofDays
    };
    if (credentials.noofDays == '') {
        error = 'Y';
        msg = 'Please Enter No Of Days';
    }
    if (credentials.asofDate == '') {
        error = 'Y';
        msg = 'Please Enter No Of Days';
    }

    if (error == 'Y') {
        this.error(msg);
    } else {
        this.submit(credentials);
    }
}

submit(credentials) {
    this.setState({loading:true});
    this.props.dispatch(AccountService.getRenewalNoticeList(credentials))
    .then((res) => {
        this.setState({loading:false});
        if(this.props.noticeListData.length > 0){
            this.setState({
                printButton : true
            })
        }else{
            this.setState({
                printButton : false
            })
        }
    })
}

error(msg) {
    return toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT
    });
}

openPrintNotice(){
    this.props.dispatch(AccountService.printRenewalNotice(this.state.SelectedPolicy))
    .then((res) => {
        window.open(res.docUrl);
        this.noticePolicyList();
        });
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

convertAmounts(cell, row){
    return convertAmount(cell);
};


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
    if (this.state.SelectedPolicy.indexOf(row.n_potransaction_PK) > -1) {
        this.state.SelectedPolicy.splice(this.state.SelectedPolicy.indexOf(row.n_potransaction_PK), 1);
    } else {
        this.state.SelectedPolicy.push(row.n_potransaction_PK);
    }
};


handledate = (date) => {
    this.setState({
      asofDate: new Date(Moment(new Date(date)))
    });
  };

handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

    render() {
        this.table = this.props.noticeListData;
        
        const toggleSwitch = this.state.toggleSwitch
        const { loading } = this.state;

        return (
        <div className="animated fadeIn">
                <Card className="mt-2">
                    <CardHeader><h1>Accounting</h1></CardHeader>
                        <CardBody>
                            <Form method="POST" onSubmit={this.handleSubmit}>
                                <Row className="mt-2" >
                                    <Col md = "3">
                                        <InputGroup>
                                            <Label sm="5" >As of Date:&nbsp;&nbsp;</Label>
                                            <DatePicker 
                                                customInput={
                                                    <TextMask mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]} Component={InputAdapter}
                                                    />
                                                }
                                                className="form-control form-control-md" name="asofDate" onChange={(date) => this.handledate(date)} selected={this.state.asofDate}  />
                                        </InputGroup>
                                    </Col>
                                    <Col md = "3">
                                        <InputGroup>
                                            <Label sm="5">No of Days :&nbsp;&nbsp;</Label>
                                                <Input type="text" id="days" defaultValue={this.state.noofDays} name="noofDays" onChange={this.handleChange} placeholder="" />
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Button type="submit" size="sm" color="primary">Generate</Button>&nbsp;&nbsp;
                                    </Col>
                                </Row>    
                            </Form>
                    

                <Card className="mt-4">
                    <CardHeader><strong>Renewal Policies</strong>
                    </CardHeader>
                    {loading ? <LoadingSpinner /> :
                        <CardBody>
                            <BootstrapTable data={this.table} version="4" striped hover>
                            <TableHeaderColumn dataField="" dataFormat={this.selectActions}><AppSwitch className={'mx-1'} onClick={this.selectAll} checked={toggleSwitch ? true : false} variant={'pill'} color={'info'} /></TableHeaderColumn>
                            <TableHeaderColumn dataField="Policy_No" isKey dataSort >POLICY NO</TableHeaderColumn>
                            <TableHeaderColumn dataField="s_FullLegalName" dataSort >INSURED NAME</TableHeaderColumn>
                            <TableHeaderColumn dataField="termStartDate" dataSort >TERM START DATE</TableHeaderColumn>
                            <TableHeaderColumn dataField="n_potransaction_PK" hidden={true} dataSort >PK</TableHeaderColumn>
                            <TableHeaderColumn dataField="termEndDate" dataSort >TERM END DATE</TableHeaderColumn>
                            <TableHeaderColumn dataField="invoice" dataFormat={this.convertAmounts} dataSort >INVOICE AMT</TableHeaderColumn>
                            </BootstrapTable>
                        </CardBody>
                    }   
                    {loading ? '':  
                    <CardFooter>
                    <Col md="12">
                        {this.state.printButton ? 
                            <Button size="sm" color="primary" className="btn-linkedin btn-brand mr-1 mb-1 float-right" onClick={this.openPrintNotice}>Print Notice</Button> : ''
                        }
                    </Col>
                    </CardFooter>   
                    }       
                </Card>
                    </CardBody>
            </Card>
            </div>
        );
    }
}

RenewalNotice.propTypes = propTypes;
RenewalNotice.defaultProps = defaultProps;
// #endregion

const mapStateToProps = state => ({
    noticeListData: state.accounting.noticeList,
   });
export default connect(mapStateToProps)(RenewalNotice);