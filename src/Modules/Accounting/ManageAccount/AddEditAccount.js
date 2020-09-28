import React, { useEffect, useState } from 'react';
import { LocalForm, Control, Errors, actions } from 'react-redux-form';
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
} from 'reactstrap';
import Switch from "react-switch";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import AccountService from '../../../services/accounting';
import { required } from '../../../utilities/regex';
import Message from '../../../utilities/message';
import {STYLE} from '../../../utilities/constants';
import BackButton from '../../CommonComponents/BackButton';
import {getDateFormat, formatDate} from "../../CommonComponents/methods";

export default ({ history }) => {
  let myFormRef = React.createRef();
  const dispatch = useDispatch();
  const { accounting, loader } = useSelector(state => state);
  const data = accounting.accounts && accounting.accounts.find(account => account.Account_ID.toString() === accounting.edit_row_id.toString()) || {};
  const [accountType, setAccountType] = useState(data["Account_Type_ID"] || "");
  const [inActiveAcc, setInActiveAcc] = useState(data["Account_Status"] !== "Active");
  const [date, setDate] = useState(data &&  data.InActive_Date && data.InActive_Date !== '0000-00-00' ? new Date(formatDate(data, 'InActive_Date')) : null); 
  const [transactionDate, setTransactionDate] = useState(null);


  useEffect(() => {
    dispatch(AccountService.accountTypeList());
    if((accountType == "11" || accountType == "14" || accounting.edit_row_id)){
      dispatch(AccountService.accountTaxLine());
      }
    if(accounting.edit_row_id){
      dispatch(AccountService.getTransactionDate({id: accounting.edit_row_id}, res=>{
        if(res && res.length){
          setTransactionDate(res[0].Transaction_Date);
        }
      }));
    }    
  }, [accountType]);

  useEffect(() => {
    setData();
  },[accounting.accountTypes,accounting.taxLine])

  /***********Set data for edit************/

  const setData = () => {
    const obj = { ...data };
    Object.keys(obj).forEach(key => {
      myFormRef && myFormRef.dispatch(actions.change(`account.${key}`, obj[key]));
  });
  };
  
  const handleDateChange = (dateTime) => {
    if(!dateTime){
      setInActiveAcc(false)
    }else{ setInActiveAcc(true) }
    setDate(dateTime);
      
  };

  /************ Account Number formatting ***********/
  const formatAccNumber = (value) => {
    value = value.trim().replace(/-/g, "");
      if (value.length > 2 && value.length < 5)
        value = !isNaN(value) ? value.slice(0, 2) + "-" + value.slice(2) : '';
      else if (value.length >= 5 && value.length < 7)
        value = !isNaN(value) ? value.slice(0, 2) + "-" + value.slice(2,4) + "-" + value.slice(4,6) : '';
      else if (value.length >= 7)
        value = !isNaN(value) ? value.slice(0, 2) + "-" + value.slice(2,4) + "-" + value.slice(4,6) +"-" + value.slice(6) : '';
      if (value.length > 10)
        value = value.slice(0, 13);
    myFormRef.dispatch(actions.change(`account.Account_No`, value));
  }

  const handleSubmit = (values) => {
    const account = values.Account_No.split("-");
    const object = {
      ...values,
      Account_Description: values['Account_Description'] || "--",
      Company_Name: account[0],
      Account_No: values.Account_No,
      Territory: account[1] || '',
      LOB: account[2] || '',
      Bank_Account_Number: Object.values(values.Account_No).join(""),
      Currency_transaction: values["Currency_transaction"] || "USD",
      taxfldname: values['taxfldname'] || '',
      Account_Status: "Active"
    };
    if (accounting.edit_row_id) {
      dispatch(AccountService.editAccount({
        ...object, 
        id: accounting.edit_row_id,  
        Account_Status: inActiveAcc ? "Inactive" : "Active",        
        InActive_Date: values.InActive_Date ? getDateFormat(values.InActive_Date) : undefined,
      }))
        .then(() => {
          history.push("/manage-account")
        });
    } else {
      dispatch(AccountService.addAccount(object))
        .then(() => {
          history.push("/manage-account")
        });
    }
  };

 
  /************** Reset form values ************/
  const resetForm = () => {
    ['account.Account_Type_ID', 'account.Account_Name', 'account.Partner_Account', 'account.Account_No', 'account.Cash_Account', 'account.Accrued_Account', 'account.Account_Description', 'account.taxfldname', 'account.Account_Status'].map(key =>
      myFormRef.dispatch(actions.change(key, ''))
    );
  };
  const buttonName = accounting.edit_row_id ? "Update & Close" : "Save & Close";
  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" md="8">
          <Card>
            <LocalForm
              onSubmit={(values) => handleSubmit(values)}
              model="account"
              className="form-horizontal"
              //initialState={{ ...data, InActive_Date: data &&  data.InActive_Date ? new Date(formatDate(data, 'InActive_Date')): null }}
              ref={(el) => myFormRef = el}
            >
              <CardHeader>
                <BackButton history={history} text={!accounting.edit_row_id ? "ADD NEW ACCOUNT": "EDIT ACCOUNT"} />
              </CardHeader>
              <CardBody>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Account Type:*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Control
                      model=".Account_Type_ID"
                      onChange={(e) => setAccountType(e.target.value)}
                      component={props => <Input {...props} type="select" name="Account_Type_ID" id="select">
                        <option value="" key="empty">Select Account Type</option>
                        {accounting.accountTypes.map((row, index) =>
                          <option key={index} value={row.Account_Type_ID}>{row.Account_Type_Name}</option>)
                        }

                      </Input>}
                      validators={{ required }}
                    />
                    <Errors
                      model=".Account_Type_ID"
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
                    <Label htmlFor="text-input">Account Name:*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Control
                      model=".Account_Name"
                      component={props => <Input {...props} type="text" id="text-input" name="text-input" />}
                      validators={{ required }}
                    />
                    <Errors
                      model=".Account_Name"
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
                    <Label htmlFor="email-input">Account no:* </Label>
                  </Col> 
                  <Col xs="12" md="9">
                  <Control
                      model=".Account_No"                      
                      onKeyUp={(e) => formatAccNumber(e.target.value)}
                      component={props => <Input {...props} type="text" id="Account-name-show" placeholder="XX-XX-XX-XXXX" />}
                      validators={{ required }}
                  />
                   <Errors
                      model=".Account_No"
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
                    <Label htmlFor="Optional">Optional</Label>
                  </Col>
                </FormGroup>
                  <hr/>                
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Description:</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Control
                      model=".Account_Description"
                      component={props => <Input {...props} type="textarea" name="textarea-input" id="textarea-input" rows="5"
                        placeholder="Description..." />}
                    />
                  </Col>
                </FormGroup>                
                {(accountType == "11" || accountType == "14") &&
                  <>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="select">Cash Account</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Control
                          model=".Cash_Account"
                          component={props => <Input {...props} type="select" name="Cash_Account" id="select">
                             <option value="" key="empty">Select Cash Account</option>
                            { accounting.taxLine.cash_account && accounting.taxLine.cash_account.map((row, index) =>
                          <option key={index} value={row.Account_ID}>{row.Account_Name}</option>)
                        }
                          </Input>}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="select">Accrued Interest Account</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Control
                          model=".Accrued_Account"
                          component={props => <Input {...props} type="select" name="Accrued_Account" id="select" >
                             <option value="" key="empty">Select Accrued Interest Account</option>
                            { accounting.taxLine.accrued_account && accounting.taxLine.accrued_account.map((row, index) =>
                          <option key={index} value={row.Account_ID}>{row.Account_Name}</option>)
                          }
                          </Input>}
                        />
                      </Col>
                    </FormGroup>
                  </>
                }                
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Tax-Line Mapping </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Control
                      model=".taxfldname"
                      component={props => <Input {...props} type="select" name="taxfldname" id="select">
                       <option value="" key="empty">Select Tax-Line Mapping</option>
                       <option value="f1_27" key="f1_27">Part 3-1,Ordinary business income(loss)</option>
                       <option value="f1_29" key="f1_29">Part 3-2,Net rental real estate income (loss)</option>
                       <option value="f1_31" key="f1_31">Part 3-3,Other net rental income (loss)</option>
                       <option value="f1_23" key="f1_23">Part 3-4,Guaranteed payments</option>
                       <option value="f1_24" key="f1_24">Part 3-5,Interest income</option>
                       <option value="f1_37" key="f1_37">Part 3-6a,Ordinary dividends</option>
                       <option value="f1_39" key="f1_39">Part 3-6b,Qualified dividends</option>
                       <option value="f1_41" key="f1_41">Part 3-7,Royalties</option>
                       <option value="f1_43" key="f1_43">Part 3-8,Net short-term capital gain (loss)</option>
                       <option value="f1_45" key="f1_45">Part 3-9a,Net long-term capital gain (loss)</option>
                       <option value="f1_47" key="f1_47">Part 3-9b,Collectibles (28%) gain (loss)</option>
                       <option value="f1_49" key="f1_49">Part 3-9c,Unrecaptured section 1250 gain</option>
                       <option value="f1_51" key="f1_51">Part 3-10,Net section 1231 gain (loss)</option>
                       <option value="f1_53" key="f1_53">Part 3-11,Other income (loss)</option>
                       <option value="f1_59" key="f1_59">Part 3-12,Section 179 deduction</option>
                       <option value="f1_61" key="f1_61">Part 3-13,Other deductions</option>
                       <option value="f1_67" key="f1_67">Part 3-14,Self-employment earnings (loss)</option>
                       <option value="f1_71" key="f1_71">Part 3-15,Credits</option>
                       <option value="f1_75" key="f1_75">Part 3-16,Foreign Transactions</option>
                       <option value="f1_89" key="f1_89">Part 3-17,Alternative minimum tax item</option>
                       <option value="f1_95" key="f1_95">Part 3-18,Tax Exempt income and nondiductible expenses</option>
                       <option value="f1_101" key="f1_101">Part 3-19,Distribution</option>
                       <option value="f1_105" key="f1_105">Part 3-20,Other Information</option>
                      </Input>}
                    />

                  </Col>
                </FormGroup>
                {
                  accounting.edit_row_id &&
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="switch"></Label>
                    </Col>
                    <Col xs="12" md="9">
                    <Switch onColor="#080" offColor="#888" checked={date ? true :inActiveAcc} onChange={() => date ? setInActiveAcc(!inActiveAcc): false} height={15} width={30} disabled={date==null || date ? true :false}/> Account is inactive 
                        DATE <Control
                          model=".InActive_Date"
                          className="form-control"
                          onChange={(edate) => handleDateChange(edate)}
                          selected={date}
                          component={props => <DatePicker  {...props} minDate={new Date(formatDate({transactionDate}, 'transactionDate'))} isClearable={true}/>}
                      />
                    </Col>
                  </FormGroup>
                }                
              </CardBody>
              <CardFooter>
                <Button type="submit" disabled={loader.isLoading} size="sm" color="primary" style={{marginRight: STYLE.marginRight25}}><i className="fa fa-dot-circle-o"></i> {loader.isLoading ? `${buttonName}...` : buttonName}</Button>
                {!accounting.edit_row_id ? <Button type="reset" size="sm" color="danger" onClick={() => resetForm()}><i className="fa fa-ban"></i> Cancel</Button> :
                  <Button type="reset" size="sm" color="danger" onClick={() => history.goBack()}><i className="fa fa-ban"></i> Close</Button>}
              </CardFooter>
            </LocalForm>
          </Card>
        </Col>
      </Row>
    </div>
  )
}