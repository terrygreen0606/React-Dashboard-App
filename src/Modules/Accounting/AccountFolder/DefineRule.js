import React from 'react';
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
import Select from 'react-select';

const DefineRule = props => {

    const [actionList, setActionList] = React.useState([]);
    const [action, setAction] = React.useState('');
    const [visible, setVisible] = React.useState(false);
    const [alert, setAlert] = React.useState('success');
    const [msg, setMsg] = React.useState([]);
    const [ruleList, setRuleList] = React.useState([]);
    const [selectedRule,setRule] = React.useState('');
    const [holdingCompArray, setHoldingCompArray] = React.useState([]);
    const [selectedHoldComp, setSelectedHoldComp] = React.useState({});
    const [HoldComp, changeHoldComp] = React.useState('');
    const [CompArray, setCompArray] = React.useState([]);
    const [selectedComp, setSelectedComp] = React.useState({});
    const [Comp, changeComp] = React.useState('');
    const [LOBArray, setLOBArray] = React.useState([]);
    const [selectedLOB, setSelectedLOB] = React.useState({});
    const [LOB, changeLOB] = React.useState('');
    const [ProductArray, setProductArray] = React.useState([]);
    const [selectedProduct, setSelectedProduct] = React.useState({ 'n_ProductId_PK': 0, 's_ProductName': 'Select Product' });
    const [Product, changeProduct] = React.useState('');
    const [AccCatArray, setAccCatArray] = React.useState([]);
    const [GfsSubAccArray, setGfsSubAccArray] = React.useState([]);
    const [EntryTypeArray, setEntryTypeArray] = React.useState([]);
    const [addEditList, setAddEditList] = React.useState([]);
    const [extraRows, setExtraRows] = React.useState(0);
    const [extraRowsArray, setExtraRowsArray] = React.useState([]);
    const [buttonStatus, setButtonStatus] = React.useState(true);
    const [ddStatus, setddStatus] = React.useState(false);
    const [edit, setEdit] = React.useState('N');
    const [tb_pol_acc_cat_type,setTb_pol_acc_cat_type] = React.useState([]);
    const [tb_pol_acc_cat_name,setTb_pol_acc_cat_name] = React.useState([]);
    const [tb_pol_acc_cat_entry,setTb_pol_acc_cat_entry] = React.useState([]);
    const [predefinedRows, setPredifinedRows] = React.useState([]);
    React.useEffect(() => {
        getActionList();
        getHoldingCompany();
        getCompany();
        getPolAccCatType();
        getGfsSubAcc();
        getEntryType();
    }, []);

    const getActionList = async () => {
        let actions = await AccountFolderService.getAccountingAction();
        setActionList(actions.data);
    }

    const getHoldingCompany = async () => {
        let actions = await AccountFolderService.getHoldingCompany();
        setHoldingCompArray(actions.data);
        let data = actions.data;
        if (actions.data.length == 1) {
            let selectedData = data[0];
            setSelectedHoldComp(selectedData);
        }
    }

    const getCompany = async () => {
        let actions = await AccountFolderService.getCompany();
        setCompArray(actions.data);
        let data = actions.data;
        let selectedData = data[0];
        setSelectedComp(selectedData);
        let lob = await AccountFolderService.getLOB(selectedData.n_CompanyId_PK);
        setLOBArray(lob.data);
        let lobdata = lob.data;
        let selectedLOBData = lobdata[0];
        setSelectedLOB(selectedLOBData);
        let product = await AccountFolderService.getProduct(selectedLOBData.n_LineOfBusinessId_PK);
        setProductArray(product.data);
    }

    const getPolAccCatType = async () => {
        let result = await AccountFolderService.getPolAccCatType();
        setAccCatArray(result.data);
    }

    const getGfsSubAcc = async () => {
        let result = await AccountFolderService.getGfsSubAcc(0);
        setGfsSubAccArray(result.data);
    }

    const getEntryType = async () => {
        let result = await AccountFolderService.getEntryType();
        setEntryTypeArray(result.data);
    }

    const getDefinedRule = async (ActionPK) => {
        const param = {
            ActionPK
        }
        setAction(ActionPK);
        let actions = await AccountFolderService.getDefinedRule(param);
        setRuleList(actions.data);
        setButtonStatus(false);
        setddStatus(false);
        setSelectedProduct('');
        if (edit != 'N') {
            setAddEditList([]);
            let AddedRows = [];
            let rows = 0;
            AddedRows[rows] = '';
            setAddEditList(AddedRows);
            rows = rows + 1;
            setExtraRows(rows);
            setEdit('N');
        }else{
            let rows = extraRows;
            if(rows != 1){
                addExtraRows();
            }
        }
    }

    const renderTableRow = (rowData, index) => {
        return (
            <>
                <tr >
                    <td><a href="#" onClick={() => getDefinedRule(rowData.n_PAActionCode_PK)}>{rowData.s_TranTypeScreenName}</a></td>
                </tr>
            </>
        )
    }

    const renderRuleTable = (rowData, index) => {
        return (
            <>
                <tr >
                    <td>{rowData.tb_company[0].s_CompanyName}</td>
                    <td><a href="#" onClick={() => getAddEditData(rowData)}>{rowData.tb_product[0].s_ProductName}</a></td>
                </tr>
            </>
        )
    }

    const getAddEditData = async (data) => {
        let policyActionData = data;
        let productData = policyActionData.tb_product[0];
        let policyActionPk = data.n_PolicyActionRule_PK;
        setRule(policyActionPk);
        let actions = await AccountFolderService.getAddEditRulesList(policyActionPk);
        let addEditList = actions.data;
        setAddEditList(addEditList['tb_pol_action_acc']);
        let addEditListArray = addEditList['tb_pol_action_acc'];
        addEditListArray.map((item, index) => {
            if (item != null && item != '') {
                let tbpolacccattype = item.tb_pol_acc_cat_type[0];
                let s_ScreenName = tbpolacccattype.s_ScreenName;
                let n_CategoryTypeid_PK = tbpolacccattype.n_CategoryTypeid_PK;
                tb_pol_acc_cat_type[index] = {
                    s_ScreenName,
                    n_CategoryTypeid_PK
                }
                let tbpolacccatname = item.tb_gfs_sub_acct[0];
                let SubAccount_Name = tbpolacccatname.SubAccount_Name;
                let SubAccount_ID = tbpolacccatname.SubAccount_ID;
                tb_pol_acc_cat_name[index] = {
                    SubAccount_Name,
                    SubAccount_ID
                }
                let tbpolacccatentry = item.s_AccountEntryType;
                let Label = tbpolacccatentry;
                let Value = tbpolacccatentry;
                tb_pol_acc_cat_entry[index] = {
                    Label,
                    Value
                }
            }
        })
        setSelectedProduct(productData);
        setddStatus(true);
        setEdit('Y');
    }

    const addExtraRows = () => {
        let rows = addEditList.length;
        if(rows != 0){
            setEdit('Y');
        }
        let AddedRows = [];
        AddedRows = addEditList;
        AddedRows[rows] = '';
        setAddEditList(AddedRows);
        rows = rows + 1;
        setExtraRows(rows);
    }

    const getAddEditTableRow = (rowData, index) => {
        let id = '';
        if(rowData != ''){
            id =  rowData.n_PolicyActionAccount_PK
        }
        return <tr >
            <td><Select
                name="index"
                value={tb_pol_acc_cat_type[index]}
                options={AccCatArray != null ? AccCatArray : ''}
                getOptionLabel={(option) => option.s_ScreenName}
                getOptionValue={(option) => option.n_CategoryTypeid_PK}
                onChange={(value) => setCatTypeDD(value,index,id)}
            /> </td>
            <td></td>
            <td><Select
                name="index"
                value={tb_pol_acc_cat_name[index]}
                options={GfsSubAccArray != null ? GfsSubAccArray : ''}
                getOptionLabel={(option) => option.SubAccount_Name}
                getOptionValue={(option) => option.SubAccount_ID}
                onChange={(value) => setSubAccDD(value,index,id)}
            /> </td>
            <td></td>
            <td><Select
                name="index"
                value={tb_pol_acc_cat_entry[index]}
                options={EntryTypeArray != null ? EntryTypeArray : ''}
                getOptionLabel={(option) => option.Label}
                getOptionValue={(option) => option.Value}
                onChange={(value) => setEntryTypeDD(value,index,id)}
            /> </td>
            <td></td>
        </tr>;
    }

    const saveData = async () => {
        const params = {
            action,
            selectedHoldComp,
            selectedComp,
            selectedLOB,
            selectedProduct,
            selectedRule,
            addEditList
        }
        let actions = await AccountFolderService.saveUpdateRule(params);
        let result = actions.data;
        let Status = result.Status;
        if(Status == 'N'){
            setAlert('danger');
        }
        setMsg(result.Msg);
        setVisible(true);
        setRule('');
        setAddEditList('');
        //let AddedRows = [];
        let rows = 0;
        //AddedRows[rows] = '';
        //setAddEditList(AddedRows);
        setExtraRows(rows);
        setEdit('N');
        setSelectedProduct('');
        setRuleList([]);
    }

    const setCatTypeDD = (value,index,id) => {
        tb_pol_acc_cat_type[index] = value;
        let rows = extraRows;
        rows = rows + 1;
        setExtraRows(rows);
        if(id == ''){
            let n_PolicyActionAccount_PK = id;
            let edit = 'Y';
            let n_CategoryTypeid_PK = value.n_CategoryTypeid_PK;
            let s_ScreenName = value.s_ScreenName;
            let tb_pol_acc_cat_type = [{
                n_CategoryTypeid_PK,
                s_ScreenName
            }]
            let tb_gfs_sub_acct = [];
            let s_AccountEntryType = '';
            if(addEditList != ''){
                if(addEditList[index].tb_gfs_sub_acct != ''){
                    tb_gfs_sub_acct =  addEditList[index].tb_gfs_sub_acct;
                }
                if(addEditList[index].s_AccountEntryType != ''){
                    s_AccountEntryType = addEditList[index].s_AccountEntryType
                }
            }
            
            let NewArray = {
                edit,
                n_PolicyActionAccount_PK,
                tb_pol_acc_cat_type,
                tb_gfs_sub_acct,
                s_AccountEntryType
            };
            addEditList[index] = NewArray;
        }else{
            addEditList[index].edit = 'Y';
            addEditList[index].tb_pol_acc_cat_type[0].n_CategoryTypeid_PK = value.n_CategoryTypeid_PK;
            addEditList[index].tb_pol_acc_cat_type[0].s_ScreenName = value.s_ScreenName;
        }
    }

    const setSubAccDD = (value,index,id) => {
        tb_pol_acc_cat_name[index] = value;
        let rows = extraRows;
        rows = rows + 1;
        setExtraRows(rows);
        if(id == ''){
            let n_PolicyActionAccount_PK = id;
            let edit = 'Y';
            let SubAccount_ID = value.SubAccount_ID;
            let SubAccount_Name = value.SubAccount_Name;
            let tb_gfs_sub_acct = [{
                SubAccount_ID,
                SubAccount_Name
            }]
            let tb_pol_acc_cat_type = [];
            let s_AccountEntryType = '';
            if(addEditList != ''){
                if(addEditList[index].tb_pol_acc_cat_type != ''){
                    tb_pol_acc_cat_type =  addEditList[index].tb_pol_acc_cat_type;
                }
                if(addEditList[index].s_AccountEntryType != ''){
                    s_AccountEntryType = addEditList[index].s_AccountEntryType
                }
            }
            let NewArray = {
                edit,
                n_PolicyActionAccount_PK,
                tb_gfs_sub_acct,
                tb_pol_acc_cat_type,
                s_AccountEntryType
            };
            addEditList[index] = NewArray;
        }else{
            addEditList[index].edit = 'Y';
            addEditList[index].tb_gfs_sub_acct[0].SubAccount_ID = value.SubAccount_ID;
            addEditList[index].tb_gfs_sub_acct[0].SubAccount_Name = value.SubAccount_Name;
        }
    }

    const setEntryTypeDD = (value,index,id) => {
        tb_pol_acc_cat_entry[index] = value;
        let rows = extraRows;
        rows = rows + 1;
        setExtraRows(rows);
        if(id == ''){
            let n_PolicyActionAccount_PK = id;
            let edit = 'Y';
            let s_AccountEntryType = value.Value;
            let tb_pol_acc_cat_type = [];
            let tb_gfs_sub_acct = [];
            if(addEditList != ''){
                if(addEditList[index].tb_pol_acc_cat_type != ''){
                    tb_pol_acc_cat_type =  addEditList[index].tb_pol_acc_cat_type;
                }
                if(addEditList[index].tb_gfs_sub_acct != ''){
                    tb_gfs_sub_acct =  addEditList[index].tb_gfs_sub_acct;
                }
            }
            let NewArray = {
                edit,
                n_PolicyActionAccount_PK,
                s_AccountEntryType,
                tb_pol_acc_cat_type,
                tb_gfs_sub_acct
            };
            addEditList[index] = NewArray;
        }else{
            addEditList[index].edit = 'Y';
            addEditList[index].s_AccountEntryType = value.Value;
        }
    }

    

    return (
        <div className="animated">
            <Alert color={alert} isOpen={visible} toggle={() => setVisible(false)}>
                {
                    msg != '' ? msg.map((item, index) => {
                        return <ul>{item}</ul>
                    }) : ''
                }
            </Alert>
            <Row>
                <Col xs="12" md="4">
                    <Card>
                        <CardHeader>
                            <i className="icon-menu"></i>Action Name
                        </CardHeader>
                        <CardBody style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            <Table size="sm">
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
                <Col xs="12" md="8">
                    <Card>
                        <CardHeader>
                            <i className="icon-menu"></i>List Of Defined Rule
                        </CardHeader>
                        <CardBody style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            <Table size="sm">
                                <thead>
                                    <tr className="main-row-table" style={{ backgroundColor: "#A2EEE7" }}>
                                        <th style={{ borderTop: "none" }}>COMPANY NAME </th>
                                        <th style={{ borderTop: "none" }}>PRODUCT NAME </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ruleList != '' ? ruleList.map((item, index) => {
                                            return renderRuleTable(item, index)
                                        }) : <b>No Data Available</b>
                                    }
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xs="12" md="12">
                    <Card>
                        <CardHeader>
                            <i className="icon-menu"></i>Add/Edit Panel
                        </CardHeader>
                        <CardBody >
                            <Row>
                                <Col xs="12" md="3">
                                    <Label>Holding Company</Label>
                                    <Select
                                        name="holdingComp"
                                        value={selectedHoldComp}
                                        options={holdingCompArray != null ? holdingCompArray : ''}
                                        getOptionLabel={(option) => option.s_HoldingCompanyName}
                                        getOptionValue={(option) => option.n_HoldingCompanyId_PK}
                                        onChange={(value) => setSelectedHoldComp(value)}
                                        isDisabled={ddStatus}
                                    />
                                </Col>
                                <Col xs="12" md="3">
                                    <Label>Company</Label>
                                    <Select
                                        name="Comp"
                                        value={selectedComp}
                                        options={CompArray != null ? CompArray : ''}
                                        getOptionLabel={(option) => option.s_CompanyName}
                                        getOptionValue={(option) => option.n_CompanyId_PK}
                                        onChange={(value) => setSelectedComp(value)}
                                        isDisabled={ddStatus}
                                    />
                                </Col>
                                <Col xs="12" md="3">
                                    <Label>Line Of Buisness</Label>
                                    <Select
                                        name="LOB"
                                        value={selectedLOB}
                                        options={LOBArray != null ? LOBArray : ''}
                                        getOptionLabel={(option) => option.s_LineOfBusinessName}
                                        getOptionValue={(option) => option.n_LineOfBusinessId_PK}
                                        onChange={(value) => setSelectedLOB(value)}
                                        isDisabled={ddStatus}
                                    />
                                </Col>
                                <Col xs="12" md="3">
                                    <Label>Product</Label>
                                    <Select
                                        name="Product"
                                        value={selectedProduct}
                                        options={ProductArray != null ? ProductArray : ''}
                                        getOptionLabel={(option) => option.s_ProductName}
                                        getOptionValue={(option) => option.n_ProductId_PK}
                                        onChange={(value) => setSelectedProduct(value)}
                                        isDisabled={ddStatus}
                                    />
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '10px' }}>
                                <Col xs="12" md="12" >
                                    <Table size="sm" >
                                        <thead>
                                            <tr className="main-row-table" style={{ backgroundColor: "#A2EEE7" }}>
                                                <th style={{ borderTop: "none", width: "20%" }}>TYPE</th>
                                                <th style={{ borderTop: "none", width: "15%" }}></th>
                                                <th style={{ borderTop: "none", width: "20%" }}>ACCOUNT NAME </th>
                                                <th style={{ borderTop: "none", width: "15%" }}></th>
                                                <th style={{ borderTop: "none", width: "20%" }}>ENTRY TYPE </th>
                                                <th style={{ borderTop: "none", width: "10%" }}></th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {
                                                extraRows != 0 ? addEditList.map((item, index) => {
                                                    return getAddEditTableRow(item, index)
                                                }) : ''
                                            }
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <Button type="button" size="sm" color="primary" className="pull-right mr-1 " hidden={buttonStatus} onClick={() => saveData()}><i className="fa fa-check"></i>&nbsp;&nbsp;Save</Button>
                            <Button type="button" size="sm" color="primary" className="pull-right mr-1 " onClick={() => addExtraRows()} hidden={buttonStatus}><i className="fa fa-plus"></i>&nbsp;&nbsp;Add Rows</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </div>

    );
}

export default DefineRule;
