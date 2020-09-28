import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

import SearchResult from './SearchResult';

import { formatMoney,convertDateMMDDYYYY } from '../../../../services/commanServices';
import { policyService } from "../../../../services/policyService";
import { getPolicyHeaderData, setMaxTransData } from '../../../../store/actions/policy';

class BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.dateFormatter = this.dateFormatter.bind(this);
    this.apiService = new policyService();
    this.state = {
      headerData: [],
      PolicyData: [],
      TermData: [],
      PremTransData: [],
      PolicyNo: '',
      HolderName: '',
      Address: '',
      TermStartDate: '',
      TermEndDate: '',
      TransactionEffDate: '',
      TransactionExpDate: '',
      TransactionType: '',
      LastUpdatedBy: '',
      Premium: '',
      PremiumChange: '',
      TotalPremium: '',
      BillTo: '',
      PaymentPlan: '',
      EquityDay: '',
      ServRep: '',
      U_writer: '',
      ProductName: '',
      termDDData: [],
      TransDDData: [],
      termDD: [],
      PolicyNo_PK : '',
      Policy_No :'',
      MaxTermMasterPK :'',
      MaxPoTransactionPK :'',
      term_select : '',
      transaction_select : '',
      MaxTransactionEffDate:'',
      MaxTranTypeScreenName:'',
      MaxTransCreatedBy :'',
      MaxTransDate : '',
      Note : '',
      TotalClaim:'',
    };
  }

  componentDidMount() {
    let PolicyNo_PK = this.props.PolicyNo_PK;
    let PolicyNo = this.props.PolicyNo;
    let MaxTermMasterPK = this.props.MaxTermMasterPK;
    let MaxPoTransactionPK = this.props.MaxPoTransactionPK;
    const param = {
      PolicyNo_PK,
      PolicyNo,
      MaxTermMasterPK,
      MaxPoTransactionPK
    }
    this.props.getPolicyData(param);
    this.setState({
      termDDData: this.props.termDDData,
      TransDDData: this.props.TransDDData,
      PolicyNo_PK : this.props.PolicyNo_PK,
      Policy_No :this.props.PolicyNo,
      MaxTermMasterPK :this.props.MaxTermMasterPK,
      MaxPoTransactionPK :this.props.MaxPoTransactionPK,
      term_select : this.props.MaxTermMasterPK,
      transaction_select : this.props.MaxPoTransactionPK,
      MaxTransactionEffDate :this.state.MaxTransactionEffDate,
    });
  }
  
  componentWillReceiveProps(props) {
    if (props.HeaderPolicyData.length > 0) {
      if(props.FirstRender == 'Y'){
         let MaxTransactionEffDate = props.HeaderPolicyData[0].d_TransEffectiveFrom;
         let MaxTranTypeScreenName  = props.HeaderPolicyData[0].s_TranTypeScreenName;
         let  MaxTransCreatedBy  = props.HeaderPolicyData[0].s_ScreenName;
         let MaxTransDate  = props.HeaderPolicyData[0].UpdatedDate;
        const params = {
          MaxTransactionEffDate,
          MaxTranTypeScreenName,
          MaxTransCreatedBy,
          MaxTransDate
        };
        props.setParams(params);
      }
      this.setState({
        PolicyNo: props.HeaderPolicyData[0].Policy_No,
        HolderName: props.HeaderPolicyData[0].s_FullLegalName,
        TermStartDate: props.HeaderPolicyData[0].d_TermStartDate,
        TermEndDate: props.HeaderPolicyData[0].d_TermEndDate,
        TransactionEffDate: props.HeaderPolicyData[0].d_TransEffectiveFrom,
        TransactionExpDate: props.HeaderPolicyData[0].d_TransEffectiveTo,
        TransactionType: props.HeaderPolicyData[0].s_PRTranTypeCode,
        LastUpdatedBy: props.HeaderPolicyData[0].UpdatedDate,
        Premium: props.HeaderPolicyData[0].n_NetPremium,
        PremiumChange: props.HeaderPolicyData[0].n_PremiumChange,
        TotalPremium: props.HeaderPolicyData[0].n_NetPremium + parseInt(props.HeaderPremData[0].PremiumTax),
        EquityDay: props.HeaderTermData[0].d_EquityDate,
        ProductName: props.HeaderPolicyData[0].s_ProductName,
        Pol_No: props.PolicyNo,
        PolicyNo_PK: props.PolicyNo_PK,
        SelTermMasterPK: props.MaxTermMasterPK,
        SelPoTransactionPK: props.MaxPoTransactionPK,
        Note : props.HeaderPolicyData[0].s_Note,
        BillTo:props.HeaderBillToData[0].s_BillToType,
        PaymentPlan:props.HeaderBillToData[0].s_PayPlanScreenName,
        ServRep:props.HeaderSerRepData[0].ServiceRep,
        U_writer:props.HeaderSerRepData[0].Uwriter,
        TotalClaim:props.HeaderClaimData.totalClaim,
      });
      if (props.HeaderSerRepData.length > 0){
        this.setState({
          ServRep:props.HeaderSerRepData[0].ServiceRep,
          U_writer:props.HeaderSerRepData[0].Uwriter,
        });
      }
      if (props.HeaderBillToData.length > 0){
        this.setState({
          BillTo:props.HeaderBillToData[0].s_BillToType,
          PaymentPlan:props.HeaderBillToData[0].s_PayPlanScreenName,
        });
      }
      if (props.HeaderClaimData.length > 0){
        this.setState({
          TotalClaim:props.HeaderClaimData.totalClaim,
        });
      }
      if(props.HeaderAddrData.length > 0){
        this.setState({
          Address : props.HeaderAddrData[0].s_AddressLine1 + ',' + props.HeaderAddrData[0].s_CityName + ',' + props.HeaderAddrData[0].s_CountyName + ',' +props.HeaderAddrData[0].s_PostalCode 
        });
      }
    }
  }

  dateFormatter(date) {
    return convertDateMMDDYYYY(date, 'MM-DD-YYYY') // Converting Date into MM/DD/YYYY
  }

  render() {
    return (
      <>
        <div className="policy-view-main">
          <h3>
            {this.state.PolicyNo} / {this.state.HolderName}<br />
          </h3>
          <h4>
              {this.state.Address}
          </h4>
        </div >
        <div className="d-flex ">
          {/*<h4>Applicant</h4>*/}
          <p className="mb-0 d-flex align-items-center fw-700" style={{ fontSize: "15px" }}>Renew indicator&nbsp;: &nbsp; <a href="#">&nbsp;BATCH RENEWAL</a></p>
        </div>
        <div className="table-policy-view">
          <Table responsive>
            <tbody>
              <tr>
                <td><b>Term Start Date :</b></td>
                <td>{this.dateFormatter(this.state.TermStartDate)}</td>
                <td><b>Transaction Eff. Dt. :</b></td>
                <td>{this.dateFormatter(this.state.TransactionEffDate)}</td>
                <td><b>Transaction Type :</b></td>
                <td>{this.state.TransactionType}</td>
              </tr>
              <tr>
                <td><b>Term End Date :</b></td>
                <td>{this.dateFormatter(this.state.TermEndDate)}</td>
                <td><b>Transaction Exp. Dt. :</b></td>
                <td>{this.dateFormatter(this.state.TransactionExpDate)}</td>
                <td><b>last Updated Date :</b></td>
                <td>{this.state.LastUpdatedBy}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="table-policy-view1 mb-1 mt-1">
          <Table responsive>
            <tbody>
              <tr className="differ-color">
                <td className="no-border">Total Claim  </td>
                <td className="no-border">{this.state.TotalClaim}</td>
                <td className="no-border"><a href="#">PolicyHolder Copy</a></td>
                <td className="no-border"><a href="#">Agent Copy</a></td>
                <td className="no-border"></td>
                <td className="no-border"></td>
                <td className="no-border"></td>
                <td className="no-border"></td>
                <td className="no-border"></td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="table-policy-view">
          <Table responsive>
            <tbody>
              <tr>
                <td><b>Premium :</b></td>
                <td>{formatMoney(this.state.Premium)}</td>
                <td><b>Bill To :</b></td>
                <td>{this.state.BillTo}</td>
                <td><b>Serv Rep :</b></td>
                <td>{this.state.ServRep}</td>
              </tr>
              <tr>
                <td><b>Premium Change :</b></td>
                <td>{formatMoney(this.state.PremiumChange)}</td>
                <td><b>Payment Plan :</b></td>
                <td>{this.state.PaymentPlan}</td>
                <td><b>U/writer :</b></td>
                <td>{this.state.U_writer}</td>
              </tr>
              <tr>
                <td><b>Total Premium :</b></td>
                <td>{formatMoney(this.state.TotalPremium)}</td>
                <td><b>Equity date :</b></td>
                <td>{this.dateFormatter(this.state.EnquityDay) != 'Invalid date' ? this.dateFormatter(this.state.EnquityDay) : ''}</td>
                <td><b>Product Name :</b></td>
                <td>{this.state.ProductName}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  basicInfo: state.Policy.policyData.BasicInfo,
  HeaderPolicyData: state.Policy.HeaderPolicyData,
  HeaderTermData: state.Policy.HeaderTermData,
  HeaderPremData: state.Policy.HeaderPremData,
  HeaderClaimData:state.Policy.HeaderClaimData,
  HeaderSerRepData:state.Policy.HeaderSerRepData,
  HeaderBillToData:state.Policy.HeaderBillToData,
  HeaderAddrData:state.Policy.HeaderAddrData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getPolicyData: (data) => dispatch(getPolicyHeaderData(data)),
    setParams: (data) => dispatch(setMaxTransData(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);
