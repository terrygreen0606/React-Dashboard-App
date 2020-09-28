import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toastAction } from '../../../store/actions/toast-actions';
import Moment from 'moment';

import {
    Modal, ModalHeader, ModalBody, Row, Col, Label, Input, Button
} from 'reactstrap';

const PriorLossesInfo = props => {
    const [isSetData, isSetDataFun] = useState(false);
    const [lossDate, setLossDate] = useState(null);
    const [lossType, setLossType] = useState("");
    const [lossDesc, setLossDesc] = useState("");
    const [lossCatNo, setLossCatNo] = useState("");
    const [amout, setAmout] = useState("");
    const [priorLossHistoryPK, setPriorLossHistoryPK] = useState("");

    const setAllData = () => {
        setLossDate(new Date(Moment(props.editData.lossDate)));
        setLossType(props.editData.lossType);
        setLossDesc(props.editData.lossDesc);
        setLossCatNo(props.editData.lossCatNo);
        setAmout(props.editData.amout);
        setPriorLossHistoryPK(props.editData.priorLossHistoryPK);
        isSetDataFun(true);
    }

    useEffect(() => {
        if (props.editData != null && !isSetData) {
            setAllData();
        }
    });

    const saveHasPriorLossInfo = () => {
        var msg = [];
        if (lossDate == null || lossType == '' || lossDesc == '' || amout == '') {
            toastAction(false, 'Please fill all details!');
            return false;
        } else {
            var params = { lossDate, lossType, lossDesc, lossCatNo, amout, priorLossHistoryPK }
            props.addPriorLossesList(params);
            clearForm();
        }
    }

    const clearForm = () => {
        setLossDate('')
        setLossType('')
        setLossDesc('')
        setLossCatNo('')
        setAmout('')
        setPriorLossHistoryPK('')
        isSetDataFun(false)
        props.setIsModalOpen();
    }

    return (
        <Modal isOpen={props.isModalOpen} style={{ "width": "400px" }}>
            <ModalHeader className="p-2" >Has Prior Losses Info</ModalHeader>
            <ModalBody>
                <Row className="mt-4">
                    <Col md="4"><Label>Date:</Label></Col>
                    <Col md="5"><DatePicker className="form-control form-control-sm" name="data[TbPorisklosshistorie][d_LossDate]" selected={lossDate} onChange={(date) => setLossDate(date)} disabled={props.isLoading} /></Col>
                </Row>
                <Row>
                    <Col md="4"><Label>Loss Type:</Label></Col>
                    <Col md="5">
                        <Input type="select" bsSize="sm" name="data[TbPorisklosshistorie][s_LossType]" value={lossType} onChange={(e) => setLossType(e.target.value)} disabled={props.isLoading}>
                            <option value="">Select</option>
                            <option value="LIABILITY">Liability</option>
                            <option value="PROPERTY">Property</option>
                        </Input>
                    </Col>
                </Row>
                <Row>
                    <Col md="4"><Label>Loss Desc.:</Label></Col>
                    <Col md="8">
                        <Input type="text" bsSize="sm" name="data[TbPorisklosshistorie][s_LossDescription]" value={lossDesc} onChange={(e) => setLossDesc(e.target.value)} disabled={props.isLoading} />
                    </Col>
                </Row>
                <Row>
                    <Col md="4"><Label>CAT NO.:</Label></Col>
                    <Col md="5">
                        <Input type="text" bsSize="sm" name="data[TbPorisklosshistorie][s_LossCatNo]" value={lossCatNo} onChange={(e) => setLossCatNo(e.target.value)} disabled={props.isLoading} />
                    </Col>
                </Row>
                <Row>
                    <Col md="4"><Label>Amount:</Label></Col>
                    <Col md="5">
                        <Input type="text" bsSize="sm" name="data[TbPorisklosshistorie][n_LossAmount]" value={amout} onChange={(e) => setAmout(e.target.value)} disabled={props.isLoading} />
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col md="12" className="text-center">
                        <Button type="button" size="sm" color="primary" onClick={() => saveHasPriorLossInfo()} disabled={props.isLoading}>Add</Button>
                        <Button type="button" size="sm" color="danger" className="ml-1" onClick={() => clearForm()} disabled={props.isLoading}>Exit</Button>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    );
}

const mapStateToProps = state => ({
    isLoading: state.QuoteEntry.isLoading,
});

export default connect(mapStateToProps)(PriorLossesInfo);