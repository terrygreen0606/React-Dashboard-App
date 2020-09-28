import React, { useEffect, useState, useCallback } from 'react';
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
import Select from "react-select";
//import "react-select/dist/react-select.min.css";
import Switch from "react-switch";
import DatePicker from "react-datepicker";
import * as VendorService from '../../../services/accounting/VendorService';
import * as Territory from '../../../services/territory';
import { required } from '../../../utilities/regex';
import Message from '../../../utilities/message';
import {STYLE} from '../../../utilities/constants';
import BackButton from '../../CommonComponents/BackButton';
import {getDateFormat, formatDate} from "../../CommonComponents/methods";


let myFormRef = React.createRef({});
export default ({ history, match }) => {
  const { accounting, loader, territory } = useSelector(state => state);
  let data = accounting.edit_row_id && accounting.vendors.find(account => account.vend_id.toString() === accounting.edit_row_id.toString()) || {};
  const countries = territory.countries.find(row => row.n_CountryId_PK == data.n_CountryId_FK);
  const states = territory.states.find(row => row.n_StateId_PK == data.n_StateId_FK);
  const counties = territory.counties.find(row => row.s_CountyCode == data.n_CountyId_FK);
  const cities = territory.cities.find(row => row.s_CityCode == data.n_CityId_FK);
  const [status, setStatus] = useState(data['vend_1099'] ? true : false);
  const [inActiveAcc, setInActiveAcc] = useState(data["Account_Status"] !== "Active");
  const [date, setDate] = useState(data &&  data.InActive_Date && data.InActive_Date !== '0000-00-00' ? new Date(formatDate(data, 'InActive_Date')) : null); 
  const [firstName, setFirstName] = useState('');
  const [type, setType] = useState("1");
  const [btnType, setBtnType] = useState('');
  const [transactionDate, setTransactionDate] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.s_EntityType === "ORGANISATION") {
      setType("2");
    }
    if (match.path === "/edit-vendor" && !accounting.edit_row_id) {
      return history.push('/manage-vendor');
    }
    dispatch(Territory.getCountry());
    if (accounting.edit_row_id) {
      dispatch(Territory.getState({
        "countries": [{
          "n_CountryId_FK": data.n_CountryId_FK
        }]
      })).then(() => dispatch(Territory.getCounty({
        "states": [{
          "n_StateId_FK": data.n_StateId_FK
        }]
      }))).then(() =>
        dispatch(Territory.getCity({
          "counties": [{
            "s_CountyCode": data.n_CountyId_FK
          }]
        }))
      ).then(() => dispatch(Territory.getZipCode({
        "counties": [{
          "s_CountyCode": data.n_CountyId_FK
        }]
      })));
    }
  }, []);

  useEffect(() => {
    resetFormValues();
  }, [counties, cities]);

  const resetFormValues = useCallback(() => {
    data = {
      ...data,
      s_LastOrganizationName: data['vend_name'],
      first_name: data['s_FirstName'],
      last_name: data['s_FirstName'] ? data['s_LastOrganizationName'] : '',
      vend_Country: countries ? { value: countries.n_CountryId_PK, label: countries.s_CountryName } : null,
      vend_state: states ? { value: states.n_StateId_PK, label: states.s_StateName } : null,
      vend_city: cities ? { value: cities.s_CityCode, label: cities.s_CityName } : null,
      CountyId: counties ? { value: counties.s_CountyCode, label: counties.s_CountyName } : null,
      vend_zip: data['s_PostalCode'] ? { value: data['s_PostalCode'], label: data['s_PostalCode'] } : null,
      vend_print_name: data.s_DBAName
    };
    Object.keys(data).forEach(key => {
      myFormRef.dispatch(actions.change(`vendor.${key}`, data[key]));
    });
  }, [counties, cities]);

  const handleSubmit = (values) => {
    const country = values.vend_Country;
    const state = values.vend_state;
    const city = values.vend_city;
    const CountyId = values.CountyId;
    if (accounting.edit_row_id) {
      const payload = {
        "personal":
        {
          "n_PersonInfoId_FK": data ? data['n_PersonInfoId_PK'] : undefined,
          "s_PrefixTitle": "mr",
          "s_FirstName": values.first_name || values.s_LastOrganizationName,
          "s_LastOrganizationName": values.last_name || values.s_LastOrganizationName,
          "s_SSNNo": values.s_SSNNo,
          "s_1099Flag": status ? "Y" : "N",
          "s_DBAName": values.vend_print_name
        },
        "vendor":
        {
          "vend_print_name": values.vend_print_name,
          "Vendor_Type": type,
          "vend_id": accounting.edit_row_id,
          "vend_name": values.first_name ? `${values.first_name} ${values.last_name}` : values.s_LastOrganizationName,
          "vend_address": values.vend_address,
          "vend_city": city.label,
          "vend_state": state.label,
          "vend_zip": values.vend_zip.label,
          "vend_Country": country.label,
          "vend_contact": values.vend_phone,
          "vend_phone": values.vend_phone,
          "vend_1099": status ? "1" : "0",
          "vend_tax_id": values.vend_tax_id,
          ///extra key active inactive vender
          "status": inActiveAcc ? "Inactive" : "Active",        
          "In_Active_Date": values.InActive_Date ? getDateFormat(values.InActive_Date) : undefined,
        },
        "personalAdd": {
          "s_AddressLine1": values.vend_address,
          "Country": country.value,
          "State": state.value,
          "CountyId": CountyId.value,
          "City": city.value,
          "Zip": values.vend_zip.value,          
          "s_CountryName": country.label,
		      "s_CityName": city.label,
		      "s_StateName": state.label,
          "n_PersonAddressesId_PK": data ? data.n_PersonAddressesId_PK : undefined
        }
      }
      dispatch(VendorService.updateVendor({ ...payload }))
        .then(() => {
          history.push("/manage-vendor")
        });
    } else {
      const payload = {
        "personal":
        {
          "s_PrefixTitle": "mr",
          "s_FirstName": values.first_name || values.s_LastOrganizationName,
          "s_LastOrganizationName": values.last_name || values.s_LastOrganizationName,
          "s_SSNNo": values.s_SSNNo,
          "s_1099Flag": status ? "Y" : "N",
          "s_DBAName": values.vend_print_name
        },
        "vendor":
        {
          "Vendor_Type": type,
          "vend_name": values.first_name ? `${values.first_name} ${values.last_name}` : values.s_LastOrganizationName,
          "vend_address": values.vend_address,
          "vend_city": city.label,
          "vend_state": state.label,
          "vend_zip": values.vend_zip.label,
          "vend_Country": country.label,
          "vend_contact": values.vend_phone,
          "vend_phone": values.vend_phone,
          "vend_1099": status ? "1" : "0",
          "vend_print_name": values.vend_print_name,
          "vend_tax_id": values.vend_tax_id
        },
        "personalAdd": {
          "s_AddressLine1": values.vend_address,
          "Country": country.value,
          "State": state.value,
          "CountyId": CountyId.value,
          "City": city.value,
          "Zip": values.vend_zip.value,
          "s_CountryName": country.label,
		      "s_CityName": city.label,
		      "s_StateName": state.label
        }
      };
      dispatch(VendorService.addVendor(payload))
        .then(() => {
          if(btnType === 'new') {
            resetForm();
            setBtnType('')
          } else {
          history.push("/manage-vendor")
          }
        });
    }
  }
  /************ Phone number formatting *********/
  const formatPhoneText = (value) => {   
    value = value.trim().replace(/-/g, "");
    if (value.length > 3 && value.length <= 6)
      value = !isNaN(value) ? value.slice(0, 3) + "-" + value.slice(3) : '';
    else if (value.length > 6)
      value = !isNaN(value) ? value.slice(0, 3) + "-" + value.slice(3, 6) + "-" + value.slice(6) : '';
    if (value.length > 12)
      value = value.slice(0, 12);
    myFormRef.dispatch(actions.change(`vendor.vend_phone`, value));
  }
  /************ Tax id formatting ***********/
  const formatTaxId = (value) => {
    value = value.trim().replace(/-/g, "");
    if (type === "2") {
      if (value.length > 2 && value.length <= 10)
        value = value.slice(0, 2) + "-" + value.slice(2);
      if (value.length > 10)
        value = value.slice(0, 10);
    } else {
      if (value.length > 3 && value.length <= 6)
        value = value.slice(0, 3) + "-" + value.slice(3);
      else if (value.length > 6)
        value = value.slice(0, 3) + "-" + value.slice(3, 5) + "-" + value.slice(5);
      if (value.length > 11)
        value = value.slice(0, 11);
    }
    myFormRef.dispatch(actions.change(`vendor.vend_tax_id`, value));
  }

  const handleChange = () => {
    setStatus(!status);
  }

  /************** Handel inactive date change******************/
  const handleDateChange = (dateTime) => {
    if(!dateTime){
      setInActiveAcc(false)
    }else{ setInActiveAcc(true) }
    setDate(dateTime);
  };

  /************** Reset form values ************/
  const resetForm = () => {
    myFormRef && ['vendor.s_LastOrganizationName', 'vendor.first_name', 'vendor.last_name', 'vendor.vend_phone', 'vendor.vend_print_name', 'vendor.vend_tax_id', 'vendor.vend_address', 'vendor.ssn', 'vendor.vend_Country', 'vendor.vend_state', 'vendor.CountyId', 'vendor.vend_city', 'vendor.vend_zip'].map(key =>
      myFormRef.dispatch(actions.change(key, ''))
    );
    setType("1");
  };
  /************ Populate print check value ***********/
  const changePrintName = (key, value) => {
    let name = '';
    if (key === "s_LastOrganizationName") {
      name = value;
    } else if (key === "first_name" || key === "last_name") {
      if (key === "first_name") {
        setFirstName(value);
      }
      name = key === "last_name" ? firstName + ' ' + value : firstName;
    }
    myFormRef.dispatch(actions.change('vendor.vend_print_name', name));
  }

  const buttonName = accounting.edit_row_id ? "Update & Close" : "Save & Close";

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" md="8">
          <Card>
            <LocalForm
              onSubmit={(values) => handleSubmit(values)}
              model="vendor"
              className="form-horizontal"
              initialState={{ ...data }}
              ref={(el) => myFormRef = el}
            >
              <CardHeader>
                <BackButton history={history} text={accounting.edit_row_id ? "Edit Vendor" : "Add Vendor"} />
              </CardHeader>
              <CardBody>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Vendor Type:</Label>
                  </Col>
                  <Col xs="12" md="5">
                    <Col md="4" style={{ float: "right" }}>
                      <Label htmlFor="text-input">Company</Label>
                      <Control
                        model=".Vendor_Type"
                        onChange={() => setType("2")}
                        component={props => <Input {...props} type="radio" className="ml-2" checked={type === "2"} value="2" />}
                      />
                    </Col>
                    <Col md="4">
                      <Label htmlFor="text-input">Individual</Label>
                      <Control
                        model=".Vendor_Type"
                        onChange={() => setType("1")}
                        component={props => <Input {...props} type="radio" className="ml-2" checked={type === "1"} value="1" />}
                      />
                    </Col>
                  </Col>
                </FormGroup>
                <FormGroup row></FormGroup>
                {type === "2" ?
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Company Name:</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Control
                        model=".s_LastOrganizationName"
                        onBlur={e => changePrintName('s_LastOrganizationName', e.target.value)}
                        component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="Company Name" />}
                      />
                    </Col>
                  </FormGroup>
                  : <>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Full Name:*</Label>
                      </Col>
                      <Col xs="12" md="4">
                        <Control
                          model=".first_name"
                          onBlur={e => changePrintName('first_name', e.target.value)}
                          component={props => <Input {...props} type="text" name="Account-Type-No-input" placeholder="First Name" />}
                          validators={{ required }}
                          />
                          <Errors
                            model=".first_name"
                            show={(field) => field.touched && !field.focus}
                            className="error"
                            messages={{
                              required: Message.required
                            }}
                          />
                      </Col>
                      <Col xs="12" md="4">
                        <Control
                          model=".last_name"
                          onBlur={e => changePrintName('last_name', e.target.value)}
                          component={props => <Input {...props} type="text" name="Account-Type-No-input" placeholder="Last Name" />}
                          validators={{ required }}
                          />
                          <Errors
                            model=".last_name"
                            show={(field) => field.touched && !field.focus}
                            className="error"
                            messages={{
                              required: Message.required
                            }}
                          />
                      </Col>
                    </FormGroup>
                  </>
                }
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Phone:*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Control
                      model=".vend_phone"
                      onKeyUp={(e) => formatPhoneText(e.target.value)}
                      component={props => <Input {...props} type="text" id="phone" name="text-input" placeholder="XXX-XXX-XXXX" />}
                      validators={{ required }}
                    />
                    <Errors
                      model=".vend_phone"
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
                    <Label htmlFor="select">Print Name On Check As:*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Control
                      model=".vend_print_name"
                      component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="Print name on check as" />}
                      validators={{ required }}
                    />
                    <Errors
                      model=".vend_print_name"
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
                    <Label htmlFor="select">Vendor Tax Id:*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Control
                      model=".vend_tax_id"
                      onKeyUp={(e) => formatTaxId(e.target.value)}
                      component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder={type === "2" ? "XX-XXXXXXX" : "XXX-XX-XXXX"} />}
                      validators={{ required }}
                    />
                    <Errors
                      model=".vend_tax_id"
                      show={(field) => field.touched && !field.focus}
                      className="error"
                      messages={{
                        required: Message.required
                      }}
                    />
                    <Input type="checkbox" checked={status} onChange={(e) => handleChange()} />{' '}
                    Vendor Eligible for 1099
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Country:*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Control
                      model=".vend_Country"
                      onChange={(row) => {
                        if (row) {
                          dispatch(Territory.getState({
                            "countries": [{
                              "n_CountryId_FK": row.value
                            }]
                          }))
                        }
                        ['vend_state', 'CountyId', 'vend_city', 'vend_zip'].map(key => myFormRef.dispatch(actions.change(`vendor.${key}`, null)));
                      }}
                      component={props => <Select
                        {...props}
                        options={territory.countries.map(row => ({ value: row.n_CountryId_PK, label: row.s_CountryName }))}

                      />}
                      placeholder="Select Country"
                      validators={{ required }}
                    />
                    <Errors
                      model=".vend_Country"
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
                    <Label htmlFor="select">State:*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Control
                      model=".vend_state"
                      onChange={(row) => {
                        if (row)
                          dispatch(Territory.getCounty({
                            "states": [{
                              "n_StateId_FK": row.value
                            }]
                          }))
                      }}
                      component={props => <Select
                        {...props}
                        options={territory.states.map(row => ({ value: row.n_StateId_PK, label: row.s_StateName }))}

                      />}
                      placeholder="Select State"
                      validators={{ required }}
                    />
                    <Errors
                      model=".vend_state"
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
                    <Label htmlFor="select">County:*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Control
                      model=".CountyId"
                      onChange={(row) => {
                        if (row) {
                          dispatch(Territory.getCity({
                            "counties": [{
                              "s_CountyCode": row.value
                            }]
                          }));
                          dispatch(Territory.getZipCode({
                            "counties": [{
                              "s_CountyCode": row.label
                            }]
                          }));
                        }
                      }}
                      component={props => <Select
                        {...props}
                        options={territory.counties.map(row => ({ value: row.s_CountyCode, label: row.s_CountyName }))}

                      />}
                      placeholder="Select County"
                      validators={{ required }}
                    />
                    <Errors
                      model=".CountyId"
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
                    <Label htmlFor="select">City:*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Control
                      model=".vend_city"
                      component={props => <Select
                        {...props}
                        options={territory.cities.map(row => ({ value: row.s_CityCode, label: row.s_CityName }))}

                      />}
                      placeholder="Select City"
                      validators={{ required }}
                    />
                    <Errors
                      model=".vend_city"
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
                    <Label htmlFor="select">Zip Code:*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Control
                      model=".vend_zip"
                      component={props => <Select
                        {...props}
                        options={territory.zipCodes.map(row => ({ value: row.s_ZipCode, label: row.s_ZipCode }))}

                      />}
                      placeholder="Select Zip Code"
                      validators={{ required }}
                    />
                    <Errors
                      model=".vend_zip"
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
                    <Label htmlFor="select">Address line:*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Control
                      model=".vend_address"
                      component={props => <Input {...props} type="textarea" name="textarea-input" id="textarea-input" rows="5"
                        placeholder="Address Detail" />}
                      validators={{ required }}
                    />
                    <Errors
                      model=".vend_address"
                      show={(field) => field.touched && !field.focus}
                      className="error"
                      messages={{
                        required: Message.required
                      }}
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
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">SSN:</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Control
                      model=".s_SSNNo"
                      component={props => <Input {...props} type="text" id="text-input" name="text-input" placeholder="SSN" />}
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
                  style={{marginRight:STYLE.marginRight10}}
                ><i className="fa fa-dot-circle-o"></i> {loader.isLoading ? `${buttonName}...` : buttonName}</Button>
                {!accounting.edit_row_id ? <> <Button type="submit"   disabled={loader.isLoading} size="sm" color="primary"  onClick={() => setBtnType('new')}   style={{marginRight:STYLE.marginRight10}}><i className="fa fa-dot-circle-o"></i> {loader.isLoading ? `Save & New...` : 'Save & New'} </Button>
                      <Button type="reset" size="sm" color="danger" onClick={() => history.goBack()}><i className="fa fa-ban"></i> Cancel</Button> </> :
                  <Button type="reset" size="sm" color="danger" onClick={() => history.goBack()}><i className="fa fa-ban"></i> Cancel</Button>}
              </CardFooter>
            </LocalForm>
          </Card>
        </Col>
      </Row>
    </div>
  )
}