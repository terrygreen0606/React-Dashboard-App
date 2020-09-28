import React from 'react';
import { LocalForm, Control, Errors } from 'react-redux-form';
import * as AccountFolderService from "../../../services/accounting/accountFolderService";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
    Table,
    Alert
} from 'reactstrap';
import { required } from '../../../utilities/regex';
import Message from '../../../utilities/message';

const AddAction = props => {

    const [actionList, setActionList] = React.useState([]);
    const [visible, setVisible] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    React.useEffect(() => {
        getActionList();
    }, []);

    const handleSubmit = async (values) => {
        let result = await AccountFolderService.saveAccountingAction(values);
        let data = result.data;
        setMsg(data.msg);
        setVisible(true);
        getActionList();
    }

    const getActionList = async () => {
        let actions = await AccountFolderService.getAccountingAction();
        setActionList(actions.data);
    }

    const renderTableRow = (rowData, index) => {
        return (
            <>
                <tr >
                    <td>{rowData.s_PATranTypeCode}</td>
                    <td>{rowData.s_TranTypeScreenName}</td>
                </tr>
            </>
        )
    }


    return (
        <div className="animated">
            <Alert color="danger" isOpen={visible} toggle={() => setVisible(false)}>
                {msg}
            </Alert>
            <Row>
                <Col xs="12" md="4">
                    <Card>
                        <LocalForm
                            onSubmit={(values) => handleSubmit(values)}
                            model="account"
                            className="form-horizontal"
                        >
                            <CardHeader>
                                <i className="icon-menu"></i>Add Actions
                        </CardHeader>
                            <CardBody>
                                <CardBody>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="text-input">Action Name:*</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Control
                                                model=".s_TranTypeScreenName"
                                                component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="Account Type" />}
                                                validators={{ required }}
                                            />
                                            <Errors
                                                model=".s_TranTypeScreenName"
                                                show={(field) => field.touched && !field.focus}
                                                className="error"
                                                messages={{
                                                    required: Message.required
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="select">Status:*</Label>
                                        </Col>
                                        <Col xs="12" md="9">

                                            <Control
                                                model=".s_AllocationCode"
                                                component={props => <Input {...props} type="select" name="select" id="select">
                                                    <option value="">Select Status</option>
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </Input>}
                                                validators={{ required }}
                                            />
                                            <Errors
                                                model=".s_AllocationCode"
                                                show={(field) => field.touched && !field.focus}
                                                className="error"
                                                messages={{
                                                    required: Message.required
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>
                                </CardBody>
                                <CardFooter>
                                    <Button
                                        type="submit"
                                        size="sm"
                                        color="primary"
                                    ><i className="fa fa-dot-circle-o"></i> Save </Button>
                                </CardFooter>
                            </CardBody>
                        </LocalForm>
                    </Card>
                </Col>
                <Col xs="12" md="8">
                    <Card style={{ height: '60%', overflowY: 'auto', overflowX: 'hidden' }}>
                        <CardHeader>
                            <i className="icon-menu"></i>Action List
                        </CardHeader>
                        <CardBody>
                            <Table size="sm">
                                <thead>
                                    <tr className="main-row-table" style={{ backgroundColor: "#A2EEE7" }}>
                                        <th style={{ borderTop: "none" }}>ACTION CODE </th>
                                        <th style={{ borderTop: "none" }}>ACTION NAME </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        actionList != '' ? actionList.map((item, index) => {
                                            return renderTableRow(item, index)
                                        }) : <b>No Data Available</b>
                                    }
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
export default AddAction;
