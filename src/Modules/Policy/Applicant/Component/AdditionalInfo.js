import React, {Component} from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Card, CardBody, CardHeader, Table,Button } from 'reactstrap';
import MortgageesForm from './MortgageesForm';
import { showDataTableTotalText } from "../../../../services/commanServices";
import * as QuoteEntryService from '../../../../services/quoteEntryService';
import SweetAlert from 'react-bootstrap-sweetalert';
import { policyService } from "../../../../services/policyService";

class AdditionalInfo extends Component {
  constructor (props) {
    super(props);
    this.setMortAddr = this.setMortAddr.bind(this);
    this.apiService = new policyService();
    this.state = {
      pageTemp: 1,
      sizePerPageTemp: 10,
      isDataFetched: true,
      ClaimInfo : {},
      PriorCoverage : {},
      editData:null,
      isModalOpen:false,
      gridData:[],
      editRowIndex:null,
      isSetSavedData:false,
      deleteAlert:null,
      MORTGAGEETYPE:[],
      n_PORiskMaster_PK:'',
      MortInfo:[]
    }
  }

  async componentWillReceiveProps(props) {
    this.setState({
      ClaimInfo : props.AdditionalInfo.ClaimInfo,
      PriorCoverage : props.AdditionalInfo.PriorCoverage,
      n_PORiskMaster_PK:props.AdditionalInfo.n_PORiskMaster_PK
    });
    if(props.MortInfo.length > 0){
      this.setState({
        MortInfo:props.MortInfo
      });
    }
    if(props.isEdit){
      let list = "MORTGAGEETYPE";
      const param = {
        list
      }
      let DropDownData = await this.apiService.getAppDD(param);
      this.setState({
        MORTGAGEETYPE : DropDownData.data.MORTGAGEETYPE,
      });
    }
  }

  _setTableOption() {
    if (this.state.isDataFetched) {
      return "No data available in table";
    } else {
      return (
        <div className="animated fadeIn pt-1 text-center">Loading...</div>
      );
    }
  }

  renderShowsTotal(start, to, total) {
    return showDataTableTotalText(start, to, total);
  }

  sizePerPageListChange(sizePerPage) {
    this.setState({ sizePerPageTemp: sizePerPage }, () => {
      const params = this.getSearchParams();
      this.filterTable(params);
    });
  }


  onPageChange(page, sizePerPage) {
    this.setState({ pageTemp: page, sizePerPage }, () => {
      const params = this.getSearchParams();
      this.filterTable(params);
    });
  }

  setMortAddr(cell, row){
    return row.s_AddressLine1 +','+ row.s_CityName +','+ row.s_CountyName +','+ row.s_StateCode +','+ row.s_PostalCode;
  }

  setEditData(rowData){
    this.setState({
      editData:rowData,
    });
  }

  setEditRowIndex(rowIndex){
    this.setState({
      editRowIndex:rowIndex,
    });
  }

  setIsModalOpen(value){
    this.setState({
      isModalOpen:value,
    });
  }

  getAlert(rowData, rowIndex){
    const getAlert = () => (
      <SweetAlert warning title="Delete Confirmation" showCancel confirmBtnText="Yes, delete it!" confirmBtnBsStyle="danger" cancelBtnBsStyle="info"
        onConfirm={() => this.deleteExisingData(rowData, rowIndex)}
        onCancel={() => this.setDeleteAlert(null ,null,null)}
        focusCancelBtn
        btnSize="sm"
      >
        Do you really want to delete the selected row?
      </SweetAlert>);
      return getAlert;
  }

  setDeleteAlert(rowData, rowIndex,value){
      let getAlert = this.getAlert(rowData, rowIndex);
      if(value == null ){
        getAlert = null;
      } 
      this.setState({
        deleteAlert:getAlert,
      });
  }

  deleteExisingData(rowData, rowIndex){
    this.props.dispatch(QuoteEntryService.deleteInformations(rowData.priorLossHistoryPK, 'MORTGAGEE'))
      .then((res) => {
        var tempArray = [...this.state.MortInfo];
        tempArray.splice(rowIndex, 1)
        this.setGridData(tempArray);
        this.setDeleteAlert(null ,null,null);
      });
  }

  setGridData(value){
    this.setState({
      gridData:value,
      MortInfo:value
    });
  }

  createGridObject(girdData){
    var tempArray = [...this.state.MortInfo];
    if (this.state.editRowIndex != null) {
      tempArray.splice(this.state.editRowIndex, 1)
    }
    tempArray.push(girdData)
    this.setGridData(tempArray);
    this.clearedSetData();
  }

  clearedSetData(){
    this.setEditData(null);
    this.setEditRowIndex(null)
    this.setIsModalOpen(false);
  }

  render () {
    const options = {
      noDataText: this._setTableOption(),
    };
    const options_full = {
      page: this.state.pageTemp,  // which page you want to show as default
      sizePerPageList: [
        { text: '10', value: 10 },
        { text: '20', value: 20 },
        { text: '25', value: 25 },
        { text: '30', value: 30 },
        { text: '50', value: 50 }
      ], // you can change the dropdown list for size per page
      sizePerPage: this.state.sizePerPageTemp,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      onPageChange: this.onPageChange.bind(this),
      onSizePerPageList: this.sizePerPageListChange.bind(this),
      noDataText: this._setTableOption(),
    };

    const actionsButton = (cell, row, enumObject, rowIndex) => {
      return (
        <React.Fragment>
          {this.props.isEdit ?
            <React.Fragment>
              <a href="#" style={{ padding: "0px" }} onClick={(e) => { e.preventDefault(); editGridData(row, rowIndex) }}>Edit</a>
              &nbsp;|&nbsp;
            </React.Fragment>
            : null}
            {this.props.isEdit ?
          <a href="#" style={{ padding: "0px", color: "red" }} onClick={(e) => { e.preventDefault(); deleteGridData(row, rowIndex) }}>
            Delete
          </a>
          : null}
        </React.Fragment>
      );
    }

    const editGridData = (rowData, rowIndex) => {
      this.setEditData(rowData)
      this.setEditRowIndex(rowIndex)
      this.setIsModalOpen(true);
    }

    const deleteGridData = (rowData, rowIndex) => {
      this.setDeleteAlert(rowData, rowIndex,'alert');
    }

    const{ClaimInfo,PriorCoverage,n_PORiskMaster_PK,MortInfo} = this.state;
    const {poTransaction_PK} = this.props;
    const { ClaimInfomation, PriorInsuranceInformation, MortgageesInformation, HouseHoldMembers, AdditionalInterest, ListAllLoos5Year } = this.props.additionalInfo;
    return (
      <div className="height-300 overflow-y-auto overflow-x-hidden">
        <Card className="mb-2 no-border">
          <CardHeader className="headingOne">
            Claim Information
          </CardHeader>
          <CardBody className="p-0">
            <Table responsive>
              <tbody>
                <tr className="odd">
                  <td>Total Claim</td>
                  <td>{ClaimInfo==null ? '' :ClaimInfo.TotalClaim }</td>
                  <td>Total Payment</td>
                  <td>{ClaimInfo==null ? '' :ClaimInfo.TotalPayment}</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
        <Card className="mb-2 no-border">
          <CardHeader className="headingOne">
            Prior Insurance Information
          </CardHeader>
          <CardBody className="p-0">
            <Table responsive>
              <tbody>
                <tr className="odd">
                  <td>Prior Carrier Name</td>
                  <td>{PriorCoverage == null ? '' :PriorCoverage.s_PriorCarrierName}</td>
                  <td>Prior Policy No</td>
                  <td>{PriorCoverage == null ? '' :PriorCoverage.s_PriorPolicyNo}</td>
                  <td>Prior Exp. Date</td>
                  <td>{PriorCoverage == null ? '' :PriorCoverage.d_PolicyExpirationDate}</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
        <Card className="mb-0 no-border">
          <CardHeader className="headingOne">
            Mortgagees Information
            {this.props.isEdit ?
            <Button type="button" size="sm" color="success" className="pl-1 pr-1 pull-right" onClick={() => this.setIsModalOpen(true)}>Add Row</Button>
              : '' }
            </CardHeader>
          <CardBody className="p-0">
            <BootstrapTable data={MortInfo} remote={true} striped hover options={options} pagination={false} fetchInfo={{ dataTotalSize: this.props.MortInfo.length }}>
              <TableHeaderColumn isKey dataField="s_PoMortgageeTypeCode" width="10%" dataSort={true}>TYPE</TableHeaderColumn>
              <TableHeaderColumn dataField="s_PersonUniqueId" width="15%" dataSort>CLIENT ID</TableHeaderColumn>
              <TableHeaderColumn dataField="s_FullLegalName"  width="25%" dataSort>MORTGAGEES NAME</TableHeaderColumn>
              <TableHeaderColumn dataFormat={this.setMortAddr} width="30%" dataSort>MORTGAGEES ADDRESS</TableHeaderColumn>
              <TableHeaderColumn dataField="s_LoanNumber" width="10%" dataSort>LOAN#</TableHeaderColumn>
              <TableHeaderColumn dataField="Action" width="10%" dataFormat={actionsButton} dataSort>ACTION</TableHeaderColumn>
            </BootstrapTable>
          </CardBody>
        </Card>
        <Card className="mb-0 no-border">
          <CardHeader className="headingOne">
            Household Members
          </CardHeader>
          <CardBody className="p-0">
            <BootstrapTable data={this.props.HouseHoldInfo} remote={true} striped hover options={options_full} pagination={false} fetchInfo={{ dataTotalSize: this.props.HouseHoldInfo.length }}>
              <TableHeaderColumn isKey dataField="s_POApplicantTypeCode" dataSort={true}>RELATION</TableHeaderColumn>
              <TableHeaderColumn dataField="s_PersonRoleType" dataSort>TYPE</TableHeaderColumn>
              <TableHeaderColumn dataField="s_FirstName" dataSort>FIRST</TableHeaderColumn>
              <TableHeaderColumn dataField="s_LastOrganizationName" dataSort>LAST</TableHeaderColumn>
              <TableHeaderColumn dataField="Action" dataSort>ACTION</TableHeaderColumn>
            </BootstrapTable>
          </CardBody>
        </Card>
        <Card className="mb-0 no-border">
          <CardHeader className="headingOne">
            Additional Interest (Not Mortgagees)
          </CardHeader>
          <CardBody className="p-0">
            <BootstrapTable data={this.props.AddIntrestInfo} remote={true} striped hover options={options_full} pagination={false} fetchInfo={{ dataTotalSize: this.props.AddIntrestInfo.length }}>
              <TableHeaderColumn isKey dataField="s_PartyInterestCode" dataSort={true}>INTEREST</TableHeaderColumn>
              <TableHeaderColumn dataField="s_FullLegalName" dataSort>INTEREST NAME</TableHeaderColumn>
              <TableHeaderColumn dataField="Action" dataSort>ACTION</TableHeaderColumn>
            </BootstrapTable>
          </CardBody>
        </Card>
        <Card className="mb-0 no-border">
          <CardHeader className="headingOne">
            LIST ALL LOSSES IN THE LAST 5 YEARS FOR ALL MEMBERS OF THE HOUSEHOLD AT ANY LOCATION:
          </CardHeader>
          <CardBody className="p-0">
            <BootstrapTable data={this.props.LossHistoryInfo} remote={true} striped hover options={options_full} pagination={false} fetchInfo={{ dataTotalSize: this.props.LossHistoryInfo.length }}>
              <TableHeaderColumn isKey dataField="d_LossDate" dataSort={true}>LOSS DATE</TableHeaderColumn>
              <TableHeaderColumn dataField="s_LossType" dataSort>LOSS TYPE</TableHeaderColumn>
              <TableHeaderColumn dataField="s_LossDescription" dataSort>LOSS CARD</TableHeaderColumn>
              <TableHeaderColumn dataField="s_LossCatNo" dataSort>LOSS CATNO</TableHeaderColumn>
              <TableHeaderColumn dataField="n_LossAmount" dataSort>LOSS AMT</TableHeaderColumn>
              <TableHeaderColumn dataField="Action" dataSort>ACTION</TableHeaderColumn>
            </BootstrapTable>
          </CardBody>
        </Card>
        <MortgageesForm createGridObject={(data) => this.createGridObject(data)} isModalOpen={this.state.isModalOpen} clearedSetData={() => this.clearedSetData()} editData={this.state.editData} MORTGAGEETYPE={this.state.MORTGAGEETYPE} poTransaction_PK={poTransaction_PK} n_PORiskMaster_PK={n_PORiskMaster_PK}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  additionalInfo: state.Policy.policyData.AdditionalInfo
})

export default connect(mapStateToProps)(AdditionalInfo);