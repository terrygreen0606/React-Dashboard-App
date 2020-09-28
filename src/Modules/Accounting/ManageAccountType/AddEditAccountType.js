import React from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import AccountService from '../../../services/accounting';
import { required, maxLength } from '../../../utilities/regex';
import Message from '../../../utilities/message';
import BackButton from '../../CommonComponents/BackButton';

export default ({ history }) => {
  let myFormRef = React.createRef();
  const { accounting, loader } = useSelector(state => state);
  const data = accounting.accountTypes.find(account => account.Account_Type_ID.toString() === accounting.edit_row_id.toString()) || {};
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    if (accounting.edit_row_id) {
      dispatch(AccountService.updateAccountType({ id: accounting.edit_row_id, ...values }))
        .then(() => {
          history.push("/manage-account-type")
        });
    } else {
      dispatch(AccountService.accountType(values))
        .then(() => {
          history.push("/manage-account-type")
        });
    }

  }
  const attachDispatch = (_dispatch) => {
    _dispatch(actions.change(data));
  };
  /************** Reset form values ************/
  const resetForm = () => {
    ['account.Account_Type_Name', 'account.Account_Type_No', 'account.Account_Type_Class', 'account.Account_Type_Status'].map(key =>
      myFormRef.dispatch(actions.change(key, ''))
    );
  };
  const buttonName = accounting.edit_row_id ? "Update" : "Submit";
  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" md="8">
          <Card>
            <LocalForm
              onSubmit={(values) => handleSubmit(values)}
              model="account"
              className="form-horizontal"
              initialState={{ ...data }}
              getDispatch={(_dispatch) => attachDispatch(_dispatch)}
              ref={(el) => myFormRef = el}
            >
              <CardHeader>
                <BackButton history={history} text="ACCOUNT TYPE INFORMATION" />
              </CardHeader>
              <CardBody>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Account Type:*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Control
                      model=".Account_Type_Name"
                      component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="Account Type" />}
                      validators={{ required }}
                    />
                    <Errors
                      model=".Account_Type_Name"
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
                    <Label htmlFor="email-input">Account Type No:</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Control
                      model=".Account_Type_No"
                      component={props => <Input {...props} type="text" id="Account-Type-No" name="Account-Type-No-input" placeholder="Account Type No" />}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Class:*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Control
                      model=".Account_Type_Class"
                      component={props => <Input {...props} type="select" name="select" id="select">
                        <option value="">Select Class</option>
                        <option value="Assets">Assets</option>
                        <option value="Liabilities">Liabilities</option>
                        <option value="Equity">Equity</option>
                        <option value="Revenues">Revenues</option>
                        <option value="Expenses">Expenses</option>
                        <option value="Gain-Loss">Gain-Loss</option>
                      </Input>}
                      validators={{ required }}
                    />
                    <Errors
                      model=".Account_Type_Class"
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
                      model=".Account_Type_Status"
                      component={props => <Input {...props} type="select" name="select" id="select">
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </Input>}
                      validators={{ required }}
                    />
                    <Errors
                      model=".Account_Type_Status"
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
                  disabled={loader.isLoading}
                ><i className="fa fa-dot-circle-o"></i> {loader.isLoading ? `${buttonName}...` : buttonName}</Button>
                {!accounting.edit_row_id ? <Button type="reset" size="sm" color="danger" onClick={() => resetForm()}><i className="fa fa-ban"></i> Reset</Button> :
                  <Button type="reset" size="sm" color="danger" onClick={() => history.goBack()}><i className="fa fa-ban"></i> Close</Button>}
              </CardFooter>
            </LocalForm>
          </Card>
        </Col>
      </Row>
    </div>
  )
}