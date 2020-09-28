import React from 'react';
import {connect} from 'react-redux';
import { Card, CardHeader, CardBody, Button, Row, Col, Input, Form, CardFooter, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';

import { convertAmount } from '../../../services/commanServices';

import LoadingDiv from "./LoadingDiv";

import * as commissionProcessSerivceObj from '../../../services/commissionProcessService';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const GenerateCommission = (props) => {
  const  {
    products,
    generateCommission,
    isPostingCommission,
    isGeneratingCommission,
    commissionDetails,
    isLoadingCommissionDetail,
    dispatch
  } = props;

  const [formData, setFormData] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    dispatch(commissionProcessSerivceObj.loadProducts());
  }, []);

  React.useEffect(() => {
    console.log(generateCommission);
  }, [generateCommission]);

  React.useEffect(() => {
    if (isPostingCommission == "success") {
      toast.success("Post Commission Successfully!", {
        position: toast.POSITION.TOP_RIGHT
      });
      dispatch(commissionProcessSerivceObj.resetPostCommission());
    } else if (isPostingCommission == "failed") {
      toast.error("Post Commission Failed!", {
        position: toast.POSITION.TOP_RIGHT
      });
      dispatch(commissionProcessSerivceObj.resetPostCommission());
    }
    dispatch(commissionProcessSerivceObj.generateCommission(formData));
  }, [isPostingCommission]);

  const submitFormHandle = (e) => {
    e.preventDefault();
    let formSubmitedData = new FormData(e.target);
    setFormData(formSubmitedData);
    dispatch(commissionProcessSerivceObj.generateCommission(formSubmitedData));
  }
  const postCommissionHandle = (e) => {
    e.preventDefault();
    dispatch(commissionProcessSerivceObj.postCommission(formData));
  }

  const showDetailModal = (agencyAccountNo) => {
    setShowModal(true);
    let formDataForModal = formData;
    formDataForModal.append('s_AgencyAccountNo', agencyAccountNo)
    dispatch(commissionProcessSerivceObj.getCommissionDetail(formDataForModal));
  }

  const options = {
    defaultSortName: 'AgencyAccountNo',
    defaultSortOrder: 'asc',
  };
  return (
    <>
      <Card className="border-0">
        <CardHeader className="rounded">
          <Button size="sm" color="primary" className="mr-2">New Agency Statement</Button>
          <Button size="sm" color="secondary">Process Commission Check</Button>
        </CardHeader>
        <CardBody>
          <Card>
            <CardHeader>Agency Selection</CardHeader>
            <Form method='post' id='generateCommissionForm' onSubmit={submitFormHandle}>
              <Row className="my-3">
                <Col className="d-flex align-items-center justify-content-center">As Of Date:</Col>
                <Col className="d-flex align-items-center justify-content-center"><Input type="date" name="d_BatchAccountingDate" size="sm" /></Col>
                <Col className="d-flex align-items-center justify-content-center">Product:</Col>
                <Col className="d-flex align-items-center justify-content-center">
                  <Input type="select" name="ProductPK[]" size="sm" multiple style={{height: '200px'}}>
                    {
                      products.map((item, index) => (
                        <option key={index} value={item.n_ProductId_PK}>{item.s_ProductName}</option>
                      ))
                    }
                  </Input>
                </Col>
                <Col className="d-flex align-items-center justify-content-center">
                  <Button size="sm" color="primary" form="generateCommissionForm" disabled={isGeneratingCommission ? true : false}>Retrieve</Button>
                </Col>
              </Row>
            </Form>
            {
              isPostingCommission == "loading" && (
                <LoadingDiv />
              )
            }
            {
              isGeneratingCommission == false && (
                <>
                <BootstrapTable data={ generateCommission } maxHeight='300px' striped hover options={options}>
                  <TableHeaderColumn isKey dataField="AgencyAccountNo" dataSort >ACCT NO.</TableHeaderColumn>
                  <TableHeaderColumn dataField="AgencyName" dataSort dataFormat={(cell, row) => 
                    <a href="#" onClick={() => showDetailModal(row.AgencyAccountNo)}>{cell}</a>
                  }>AGENCY</TableHeaderColumn>
                  <TableHeaderColumn dataField="StatementDate" dataFormat={(cell) => moment(cell).format("MM-DD-YYYY")} dataSort>STATEMENT DT.</TableHeaderColumn>
                  <TableHeaderColumn dataField="CommissinAmt" dataFormat={(cell) => convertAmount(cell)}>COM.AMT.</TableHeaderColumn>
                  <TableHeaderColumn dataField="PrevBal" dataFormat={(cell) => convertAmount(cell)}>PREV BAL.</TableHeaderColumn>
                  <TableHeaderColumn dataField="PaidCommission" dataFormat={(cell) => convertAmount(cell)}>PMTS/ADJ</TableHeaderColumn>
                  <TableHeaderColumn dataField="PayableAmt" dataFormat={(cell) => convertAmount(cell)}>PAYABLE AMT</TableHeaderColumn>
                </BootstrapTable>
                <div>
                  Total {generateCommission.length} entries
                </div>
                <CardFooter className="text-center">
                  <Button className="mr-2" size="sm" color="primary" disabled={isPostingCommission == "loading" ? true : false} onClick={postCommissionHandle}>Post Statement</Button>
                  <Button className="mr-2" size="sm" color="primary">Print List</Button>
                  <Button size="sm" color="primary">Print Statement</Button>
                </CardFooter>
                </>
              )
            }
            {
              isGeneratingCommission == true && (
                <LoadingDiv />
              )
            }
          </Card>
        </CardBody>
      </Card>
      <Modal isOpen={showModal} toggle={() => setShowModal(false)} size='xl' modalClassName="commission-detail-modal">
        <ModalHeader>Commission Detail</ModalHeader>
        <ModalBody>
          {
            isLoadingCommissionDetail == true ? (
              <LoadingDiv />
            ) : (
              <BootstrapTable data={ commissionDetails } maxHeight='500px' striped hover>
                <TableHeaderColumn isKey dataField="Policy_No" width="14%">ACCT NO.</TableHeaderColumn>
                <TableHeaderColumn dataField="s_FullLegalName" width="18%">INSURED NAME</TableHeaderColumn>
                <TableHeaderColumn dataField="d_TermStartDate" dataFormat={(cell) => moment(cell).format("MM-DD-YYYY")}>TERM ST.</TableHeaderColumn>
                <TableHeaderColumn dataField="d_TermEndDate" dataFormat={(cell) => moment(cell).format("MM-DD-YYYY")}>TERM END</TableHeaderColumn>
                <TableHeaderColumn dataField="s_PRTranTypeCode">TRANSACTION</TableHeaderColumn>
                <TableHeaderColumn dataField="AgencyName" width="18%">AGENCY</TableHeaderColumn>
                <TableHeaderColumn dataField="n_PremiumChange" dataFormat={(cell) => parseFloat("" + cell).toFixed(2)}>TRANS.AMT.</TableHeaderColumn>
                <TableHeaderColumn dataField="n_CommissionRateOriginal" dataFormat={(cell) => parseFloat("" + cell).toFixed(2)}>COMM. RATE</TableHeaderColumn>
                <TableHeaderColumn dataField="n_TransactionCommissionDue" dataFormat={(cell) => convertAmount(-(parseFloat("" + cell)))}>COM. AMT</TableHeaderColumn>
              </BootstrapTable>
            )
          }
        </ModalBody>
      </Modal> 
    </>
  );
}

const mapStateToProps = (state) => ({
  isLoadingProducts: state.commissionProcess.isLoadingProducts,
  isGeneratingCommission: state.commissionProcess.isGeneratingCommission,
  isPostingCommission: state.commissionProcess.isPostingCommission,
  isLoadingCommissionDetail: state.commissionProcess.isLoadingCommissionDetail,
  products: state.commissionProcess.products,
  generateCommission: state.commissionProcess.generateCommission,
  commissionDetails: state.commissionProcess.commissionDetails,
});


export default connect(mapStateToProps)(GenerateCommission);