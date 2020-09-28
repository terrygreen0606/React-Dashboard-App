import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./index.css";
import {
  Col, Row
} from 'reactstrap';

import Search from './Component/Search';
import BasicInfo from './Component/BasicInfo';
import MoreInfo from './Component/MoreInfo';
import RightSide from './Component/RightSide';
import NewTransaction from './Component/NewTransaction';
import LogModal from './Component/LogModal';
import AttachmentModal from './Component/AttachmentModal';
import { policyService } from "../../../services/policyService";
import { getPolicyBatchData, setParamForIssuedScr } from '../../../store/actions/policy';
import LoadingSpinner from './loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Component/Header';

class Applicant extends Component {
  constructor(props) {
    super(props);
    this.apiService = new policyService();
    this.toggleNewTransaction = this.toggleNewTransaction.bind(this);
    this.toggleLogModal = this.toggleLogModal.bind(this);
    this.toggleAttachmentModal = this.toggleAttachmentModal.bind(this);
    this.setTransactionDD = this.setTransactionDD.bind(this);
    this.onChangeTransDD = this.onChangeTransDD.bind(this);
    this.saveNewTrans = this.saveNewTrans.bind(this);
    this.setToEdit = this.setToEdit.bind(this);
    this.inputChangedHandler = this.inputChangedHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputChangedHandlerRR = this.inputChangedHandlerRR.bind(this);
    this.state = {
      loading: true,
      isNewTransOpen: false,
      isLogModalOpen: false,
      isAttachmentModalOpen: false,
      filter: {
        batchNo: "",
        fromDate: "",
        toDate: "",
        batchStatus: "PENDING",
        pageTemp: 1,
        sizePerPageTemp: 10
      },
      termDDDataArray: [],
      TransDDDataArray: [],
      PolicyNo_PK: '',
      PolicyNo: '',
      MaxTermMasterPK: '',
      MaxPoTransactionPK: '',
      termChange: 'N',
      FirstRender: 'N',
      MaxTransactionEffDate: '',
      MaxTransCreatedBy: '',
      MaxTransDate: '',
      MaxTranTypeScreenName: '',
      msg: '',
      save: '',
      edit: false,
      showNewTrans: false,
      showSetToEdit: false,
      showSave: false,
      Compare: '',
      inputParamsRAI: {},
      inputParamsRRT: {},
    }
  }

  async componentDidMount() {
    this.setState({
      loading: true
    });
    let PolicyNo_PK = this.props.n_POPolicyMasterFK;
    let PolicyNo = this.props.policy_No;
    if (Object.keys(this.props.match.params).length > 0) {
      PolicyNo = this.props.match.params.polNo;
      const data = {
        PolicyNo
      }
      let PolicyNo_PKArray = await this.apiService.getPolPk(data);
      PolicyNo_PK = PolicyNo_PKArray.data;
    }
    let MaxTermMasterPK = this.props.TermMasterPK;
    let MaxPoTransactionPK = this.props.n_potransaction_PK;
    if (PolicyNo_PK != '' && MaxTermMasterPK == '') {
      let PolicyPK = PolicyNo_PK;
      const param = {
        PolicyPK
      }
      let termDDData = await this.apiService.getTermDropDown(param);
      let termDD = termDDData.data;
      let TermMasterPKArray = termDD[0];
      const { n_TermMaster_PK: TermMasterPK } = TermMasterPKArray;
      MaxTermMasterPK = TermMasterPK;
      const param1 = {
        TermMasterPK
      }
      let TransDDData = await this.apiService.getTransDropDown(param1);
      let TransDD = TransDDData.data;
      let TransPKArray = TransDD[0];
      const { n_potransaction_PK: TransPK } = TransPKArray;
      let transPkByTerm = TransPK;
      if (MaxPoTransactionPK == '') {
        MaxPoTransactionPK = transPkByTerm;
      }
      const { s_TransactionCycleCode: cycleCode } = TransPKArray;
      if (cycleCode == 'ISSUED') {
        this.setState({
          showNewTrans: true,
          compare: transPkByTerm,
        });
      }
      if (cycleCode == 'QUOTE') {
        this.setState({
          showSetToEdit: true,
        });
      }
      this.setState({
        termDDDataArray: termDDData.data,
        TransDDDataArray: TransDDData.data,
        PolicyNo_PK: PolicyNo_PK,
        PolicyNo: PolicyNo,
        MaxTermMasterPK: MaxTermMasterPK,
        MaxPoTransactionPK: MaxPoTransactionPK,
        FirstRender: 'Y',
      });
    }

    let n_POPolicyMasterFK = PolicyNo_PK;
    let policy_No = PolicyNo;
    let TermMasterPK = MaxTermMasterPK;
    let n_potransaction_PK = MaxPoTransactionPK;
    const params = {
      n_POPolicyMasterFK,
      policy_No,
      TermMasterPK,
      n_potransaction_PK
    };
    this.props.setParams(params);
    this.setState({
      loading: false
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      MaxTranTypeScreenName: props.MaxTranTypeScreenName,
      MaxTransCreatedBy: props.MaxTransCreatedBy,
      MaxTransDate: props.MaxTransDate,
      MaxTransactionEffDate: props.MaxTransactionEffDate,
    });
  }

  toggleNewTransaction() {
    this.setState({
      isNewTransOpen: !this.state.isNewTransOpen
    });
  }
  toggleLogModal() {
    this.setState({
      isLogModalOpen: !this.state.isLogModalOpen
    });
  }
  toggleAttachmentModal() {
    this.setState({
      isAttachmentModalOpen: !this.state.isAttachmentModalOpen
    });
  }
  async getTransDD(value) {
    this.setState({
      loading: true,
    });
    let PolicyNo_PK = this.props.n_POPolicyMasterFK;
    let PolicyNo = this.props.policy_No;
    if (Object.keys(this.props.match.params).length > 0) {
      PolicyNo = this.props.match.params.polNo;
    }
    let MaxTermMasterPK = value;
    let MaxPoTransactionPK = '';
    let TermMasterPK = MaxTermMasterPK;
    let param1 = {
      TermMasterPK
    }
    if (value == '') {
      let PolicyPK = PolicyNo_PK;
      const param = {
        PolicyPK
      }
      let termDDData = await this.apiService.getTermDropDown(param);
      let termDD = termDDData.data;
      let TermMasterPKArray = termDD[0];
      const { n_TermMaster_PK: TermMasterPKRENEW } = TermMasterPKArray;
      TermMasterPK = TermMasterPKRENEW;
      MaxTermMasterPK = TermMasterPK;
      param1 = {
        TermMasterPK
      }
      this.setState({
        termDDDataArray: termDDData.data,
      });
    }
    let TransDDData = await this.apiService.getTransDropDown(param1);
    let TransDD = TransDDData.data;
    let TransPKArray = TransDD[0];
    const { n_potransaction_PK: TransPK } = TransPKArray;
    let transPkByTerm = TransPK;
    if (MaxPoTransactionPK == '') {
      MaxPoTransactionPK = transPkByTerm;
    }
    const { s_TransactionCycleCode: cycleCode } = TransPKArray;
    if (cycleCode == 'ISSUED') {
      this.setState({
        showNewTrans: true,
        compare: transPkByTerm,
        showSave: false,
        showSetToEdit: false,
      });
    }
    if (cycleCode == 'QUOTE') {
      this.setState({
        showNewTrans: false,
        showSetToEdit: true,
        showSave: false,
      });
    }
    this.setState({
      FirstRender: 'N',
      TransDDDataArray: TransDDData.data,
      PolicyNo_PK: PolicyNo_PK,
      PolicyNo: PolicyNo,
      MaxTermMasterPK: MaxTermMasterPK,
      MaxPoTransactionPK: MaxPoTransactionPK,
      isNewTransOpen: !this.state.isNewTransOpen,
      edit: false,
    });
    let n_POPolicyMasterFK = this.props.n_POPolicyMasterFK;
    let policy_No = this.props.policy_No;
    //let TermMasterPK = MaxTermMasterPK;
    let n_potransaction_PK = MaxPoTransactionPK;
    const params = {
      n_POPolicyMasterFK,
      policy_No,
      TermMasterPK,
      n_potransaction_PK
    };
    this.props.setParams(params);
    this.setState({
      loading: false,
      isNewTransOpen: !this.state.isNewTransOpen,
    });
    if (this.state.isNewTransOpen == true) {
      this.setState({
        isNewTransOpen: false,
      });
    }
  }

  setTransactionDD(e, key) {
    const value = e.target.value;
    this.getTransDD(value);
  }

  async onChangeTransDD(e, key) {
    const value = e.target.value;
    this.setState({
      loading: true,
      showNewTrans: false,
      showSetToEdit: false,
    });
    let n_POPolicyMasterFK = this.props.n_POPolicyMasterFK;
    let policy_No = this.props.policy_No;
    if (Object.keys(this.props.match.params).length > 0) {
      policy_No = this.props.match.params.polNo;
    }
    let TermMasterPK = this.props.TermMasterPK;
    let n_potransaction_PK = value;
    const param1 = {
      TermMasterPK
    }
    let TransDDData = await this.apiService.getTransDropDown(param1);
    let TransDD = TransDDData.data;
    let TransPKArray = TransDD[0];
    if (value == this.state.compare) {
      this.setState({
        showNewTrans: true,
        showSave: false,
      });
    }
    const { s_TransactionCycleCode: cycleCode } = TransPKArray;
    TransDD.map((product) => {
      if (product.s_TransactionCycleCode == 'QUOTE') {
        let CompareForSTE = product.n_potransaction_PK;
        if (CompareForSTE == value) {
          this.setState({
            showSetToEdit: true,
            showSave: false,
          });
        }
      }
    });
    this.setState({
      FirstRender: 'N',
      TransDDDataArray: TransDDData.data,
      PolicyNo_PK: n_POPolicyMasterFK,
      PolicyNo: policy_No,
      MaxTermMasterPK: TermMasterPK,
      MaxPoTransactionPK: value,
      showSave: false,
      edit: false,
    });
    const params = {
      n_POPolicyMasterFK,
      policy_No,
      TermMasterPK,
      n_potransaction_PK
    };
    this.props.setParams(params);
    this.setState({
      loading: false,
    });
  }

  async saveNewTrans(params) {
    this.setState({
      loading: true,
    });
    let newTransStatus = await this.apiService.saveNewTrans(params);
    if (newTransStatus.data.Status == 0) {
      let TermMasterPK = this.props.TermMasterPK;
      if (params.s_PRTranTypeCode == 'RENEW') {
        TermMasterPK = '';
      }
      this.getTransDD(TermMasterPK);
      this.success('Transaction Created Successfully');
    }
  }

  success(msg) {
    return toast.success(msg, {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  error(msg) {
    return toast.error(msg, {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  setToEdit() {
    this.setState({
      edit: true,
      showSave: true,
    });
  }

  inputChangedHandler(e, key, id) {
    const value = e.target.value;
    const { inputParamsRAI, inputParamsRRT } = this.state;
    if (id == 'TbPoriskadditionalinfo') {
      inputParamsRAI[key] = value;
      this.setState({ inputParamsRAI });
    } else {
      inputParamsRRT[key] = value;
      this.setState({ inputParamsRRT });
    }
  }

  inputChangedHandlerRR(key, value, id) {
    const { inputParamsRAI, inputParamsRRT } = this.state;
    if (id == 'TbPoriskadditionalinfo') {
      inputParamsRAI[key] = value;
      this.setState({ inputParamsRAI });
    } else {
      inputParamsRRT[key] = value;
      this.setState({ inputParamsRRT });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    let which = e.target.textContent;
    const TbPoriskadditionalinfo = this.state.inputParamsRAI;
    const TbPoriskrenovationtypes = this.state.inputParamsRRT;
    const MaxPoTransactionPK = this.state.MaxPoTransactionPK;
    const params = {
      TbPoriskadditionalinfo,
      TbPoriskrenovationtypes,
      MaxPoTransactionPK,
      which
    }
    let Status = await this.apiService.saveEndorse(params);
    if (Status.data.Status == 'Y') { 
    this.setState({
      edit: false,
    });
    let TermMasterPK = this.props.TermMasterPK;
    this.getTransDD(TermMasterPK);
    this.success('Policy Updated Successfully');
  }
};

render() {
  const containerStyle = {
    zIndex: 1999
  };
  const { loading, MaxTranTypeScreenName, MaxTransDate, MaxTransCreatedBy, edit, showNewTrans, showSetToEdit, showSave } = this.state;
  const { termDDDataArray, TransDDDataArray, PolicyNo_PK, PolicyNo, MaxTermMasterPK, MaxPoTransactionPK, FirstRender, MaxTransactionEffDate } = this.state;
  if (loading == true) {
    return <LoadingSpinner />
  }
  return (
    <div className="animated fadeIn">
      <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
      <Row>
        <Col xs="12" sm="6" lg="12" className="pr-2">
          <Header
            openNewTrans={this.toggleNewTransaction}
            setToEdit={this.setToEdit}
            showNewTrans={showNewTrans}
            showSetToEdit={showSetToEdit}
            showSave={showSave}
            handleSubmit={this.handleSubmit}
            MaxPoTransactionPK={MaxPoTransactionPK}
          />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs="12" sm="6" lg="9" className="pr-2">
          <BasicInfo
            PolicyNo_PK={PolicyNo_PK}
            PolicyNo={PolicyNo}
            MaxTermMasterPK={MaxTermMasterPK}
            MaxPoTransactionPK={MaxPoTransactionPK}
            termDDData={termDDDataArray}
            TransDDData={TransDDDataArray}
            FirstRender={FirstRender}
          />
          <MoreInfo openNewTrans={this.toggleNewTransaction} isEdit={edit} inputChangedHandler={this.inputChangedHandler} inputChangedHandlerRR={this.inputChangedHandlerRR} />
        </Col>
        <Col xs="12" sm="12" lg="3" className="pr-2">
          <RightSide
            openNewTrans={this.toggleNewTransaction}
            openLog={this.toggleLogModal}
            openAttachment={this.toggleAttachmentModal}
            termDDData={termDDDataArray}
            TransDDData={TransDDDataArray}
            PolicyNo_PK={PolicyNo_PK}
            PolicyNo={PolicyNo}
            MaxTermMasterPK={MaxTermMasterPK}
            MaxPoTransactionPK={MaxPoTransactionPK}
            OnchangeTermDD={this.setTransactionDD}
            onChangeTransDD={this.onChangeTransDD}
            setToEdit={this.setToEdit}
            showNewTrans={showNewTrans}
            showSetToEdit={showSetToEdit}
            showSave={showSave}
            handleSubmit={this.handleSubmit}
          />
        </Col>
      </Row>
      <NewTransaction isOpen={this.state.isNewTransOpen} toggle={this.toggleNewTransaction}
        PolicyNo_PK={PolicyNo_PK}
        PolicyNo={PolicyNo}
        MaxTermMasterPK={MaxTermMasterPK}
        MaxPoTransactionPK={MaxPoTransactionPK}
        saveNewTrans={this.saveNewTrans}
      />
      <LogModal isOpen={this.state.isLogModalOpen} toggle={this.toggleLogModal} />
      <AttachmentModal isOpen={this.state.isAttachmentModalOpen} toggle={this.toggleAttachmentModal} />
    </div>
  );
}
}


const mapStateToProps = (state) => ({
  policy_No: state.Policy.policy_No,
  n_POPolicyMasterFK: state.Policy.n_POPolicyMasterFK,
  TermMasterPK: state.Policy.TermMasterPK,
  n_potransaction_PK: state.Policy.n_potransaction_PK,
  MaxTransactionEffDate: state.Policy.MaxTransactionEffDate,
  MaxTranTypeScreenName: state.Policy.MaxTranTypeScreenName,
  MaxTransCreatedBy: state.Policy.MaxTransCreatedBy,
  MaxTransDate: state.Policy.MaxTransDate,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getPolicyData: (data) => dispatch(getPolicyBatchData(data)),
    setParams: (data) => dispatch(setParamForIssuedScr(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Applicant);
