import React, { Component } from "react";
import AddComplex from "./AddComplex";
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
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Table,
} from "reactstrap";
import * as CommonServices from '../../services/commanServices';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getComplexSearch } from "../../services/complexService";
import PropTypes from 'prop-types';
import LoadingSpinner from './loading';
import { connect } from 'react-redux';

class SearchResults extends Component {
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

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      loading: false,
      isModalOpen: false,
      fadeIn: true,
      timeout: 300,

      s_Zip: "",
      s_CondoName: "",
      tableData:[],
      copy: "",
      isEdit:false,
      Edit_ComplexFormData:{},
      Edit_ComplexIndex:'',
      pageTemp: 1,
      sizePerPageTemp: 10,
      defaultPage: 1,
    };
    this.complexDetailsCount = 0;

  }

  actionsButtons(cell, row, enumObject, rowIndex) {
    let linkBtn = null;
    linkBtn = (
            <React.Fragment>
                <a href="#" onClick={(e) => { e.preventDefault(); this.onClickComplexSelected(row, rowIndex)}}>
                    Copy
                </a>
                </React.Fragment>
        );
    return (
        <React.Fragment>
            {linkBtn}
        </React.Fragment>
    )
}

onClickComplexSelected = (row, rowIndex) => 
    {
      this.setState({ Edit_ComplexIndex: rowIndex, Edit_ComplexFormData: row, isEdit:true, isModalOpen:true });
    }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  componentDidMount(){
    const { s_Zip, s_CondoName, pageTemp, sizePerPageTemp } = this.state;
    const params = {
      s_CondoName,
      s_Zip,
      pageTemp,
      sizePerPageTemp
    };
      this.searchSubmit(params);      
  }
  filterData = (e) =>{
    e.preventDefault();
    this.setState(
      {pageTemp: this.state.defaultPage}, () => {
        const { s_Zip, s_CondoName, pageTemp, sizePerPageTemp } = this.state;
        const params = {
          s_CondoName,
          s_Zip,
          pageTemp,
          sizePerPageTemp
        };
        this.searchSubmit(params);
      });

  }
  searchSubmit = (params) => {
    
    this.setState({ loading: true });
    this.props
      .dispatch(getComplexSearch(params))
      .then((res) => {
        if(res.Person != null){
          this.setState({tableData: res.Person});
          this.complexDetailsCount = res.returnCount;
        }
        this.setState({ loading: false });
      })
      .catch((err) => {
        const errors = Object.values(err.errors);
        console.log(params);
        errors.join(" ");
        const response = {
          error: true,
          message: errors,
        };

        this.setState({ response });
      });
  };

  sizePerPageListChange(sizePerPage){
    this.setState({ sizePerPageTemp: sizePerPage}, () => {
      const { s_Zip, s_CondoName, pageTemp} = this.state
      const sizePerPageTemp = this.state.sizePerPageTemp;
      const params = {
        s_CondoName,
        s_Zip,
        sizePerPageTemp,
        pageTemp
      }
      this.searchSubmit(params);
    });
  }

  onPageChange(page,sizePerPage){
    this.setState({ pageTemp: page}, () => {
      const { s_CondoName, s_Zip, sizePerPageTemp } = this.state;
      const pageTemp = this.state.pageTemp;
      const params = {
        s_CondoName,
        s_Zip,
        pageTemp,
        sizePerPageTemp
      }
      this.searchSubmit(params);
    })
  }

  toggle() {
    this.setState({ isModalOpen: !this.state.isModalOpen, isEdit: false });
    
  }
  toggleFade() {
    this.setState((prevState) => {
      return { fadeIn: !prevState };
    });
  }
  render() {

    const { loading } = this.state;

    const options = {
      page: this.state.pageTemp,
      sizePerPageList: [
        { text: '10', value: 10},
        { text: '20', value: 20},
        { text: 'All', value: 0}
      ],
      pageStartIndex: 1,
      paginationShowsTotal: true,
      onPageChange: this.onPageChange.bind(this),
      onSizePerPageList: this.sizePerPageListChange.bind(this)
    };
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <h1>Policy</h1>
          </CardHeader>
          <CardBody>
            <Row className="mt-2">
              <Col xs="12" sm="12">
                <Card>
                  <CardHeader>
                    <h4>Search Complex</h4>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12" sm="1">
                        <InputGroup className="input-prepend">
                          <Label id="s_Zip" className="">
                            Zip
                          </Label>
                        </InputGroup>
                        <Input
                          type="text"
                          name="s_Zip"
                          id="s_Zip"
                          placeholder="Zip Code"
                          onChange={this.handleChange}
                        />
                      </Col>
                      <Col xs="12" sm="4">
                        <InputGroup className="input-prepend">
                          <Label id="s_CondoName" className="">
                            Complex Name
                          </Label>
                        </InputGroup>
                        <Input
                          type="text"
                          name="s_CondoName"
                          id="s_CondoName"
                          placeholder="Complex Name"
                          onChange={this.handleChange}
                        />
                      </Col>
                      <Col xs="12" sm="1" className="mt-4">
                        <Button
                          type="submit"
                          size=""
                          color="success"
                          className="pull-left btn-md"
                          onClick={this.filterData}
                        >
                          <i className="fa fa-Search"></i>&nbsp;Search
                        </Button>
                      </Col>
                      <Col xs="12" sm="2" className="mt-4">
                        <Button
                          color="success"
                          onClick={this.toggle}
                          className={"mb-1"}
                          id="toggleCollapse1"
                        >
                          Add Complex
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs="12" sm="12">
              <div className="animated">
                    { loading ? <LoadingSpinner /> :
                <Card>
                  <CardHeader>
                    <h4>Search Result</h4>
                  </CardHeader>
                  <CardBody>
                                <BootstrapTable data={this.state.tableData} remote={true} striped hover pagination={true} page={this.state.pageTemp} search options={options} fetchInfo={{ dataTotalSize: this.complexDetailsCount}}>
                                    <TableHeaderColumn isKey dataField="s_ProjectNumber" dataSort>Project Number</TableHeaderColumn>
                                    <TableHeaderColumn dataField="s_Type" dataSort>Type</TableHeaderColumn>
                                    <TableHeaderColumn dataField="s_CondoName" dataSort>Complex Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField="s_ManagingEntityName" dataSort dataFormat={this.nameFormat} >Managing Entity Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField="s_Zip" dataSort>ZIP</TableHeaderColumn>
                                    <TableHeaderColumn dataFormat={this.actionsButtons.bind(this)}>Action</TableHeaderColumn>
                                  </BootstrapTable>
                            </CardBody>
                </Card>
  }
  </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Modal isOpen={this.state.isModalOpen} className={"modal-lg"} >
          <ModalHeader className="p-2 mt-3">
            Add Complex &nbsp;&nbsp;
            <i className="fa fa-times" onClick={this.toggle}></i>
          </ModalHeader>
          <ModalBody>
            <AddComplex searchComplex={this.filterData}  props={this.state.isModalOpen} isEdit={this.state.isEdit} Edit_ComplexFormData={this.state.Edit_ComplexFormData} Edit_ComplexIndex={this.state.Edit_ComplexIndex} copy_pk={this.state.copy} toggle = {this.toggle}/>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
SearchResults.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
});
export default connect(mapStateToProps)(SearchResults);
