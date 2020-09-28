import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Row,
  Col,
  InputGroup,
  Label,
  Form,
  Button,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';

import {connect} from 'react-redux';
import LoadingDiv from "./LoadingDiv";
import * as commissionTerritoryServiceObj from "../../../../services/commissionTerritoryService";

class TerritoryModal extends Component {
  constructor (props) {
    super(props);
    
    this.countryChangeHandle = this.countryChangeHandle.bind(this);
    this.stateChangeHandle = this.stateChangeHandle.bind(this);
    this.countyChangeHandle = this.countyChangeHandle.bind(this);
    this.zipcodeChangeHandle = this.zipcodeChangeHandle.bind(this);
    this.codeChangeHandle = this.codeChangeHandle.bind(this);
    this.nameChangeHandle = this.nameChangeHandle.bind(this);
    this.submitFormHandle = this.submitFormHandle.bind(this);

    this.state = {
      territoryCode: '',
      territoryName: '',
      a_countries: [],
      a_states: [],
      a_counties: [],
      a_zipcodes: [],

      t_countries: [],
      t_states: [],
      t_counties: [],
      t_zipcodes: [],
      isFirst: false,
      isEdit: false,
      isLoading: false,
      index: -1,
    }
  }
  componentDidMount() {
    this.props.dispatch(commissionTerritoryServiceObj.loadCountry());
    this.setState({
      index: this.props.match.params.id != null ? this.props.match.params.id : -1
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.index != prevState.index && this.state.index != -1) {
      this.setState({
        isEdit: true,
        isLoading: true,
        a_countries: [],
        a_states: [],
        a_counties: [],
        a_zipcodes: [],
      });
      this.props.dispatch(commissionTerritoryServiceObj.loadTerritoryData(this.state.index));
    }
    if (prevProps.individual.n_TerritoryId_PK !== this.props.individual.n_TerritoryId_PK) {
      const individual = this.props.individual;
      console.log(individual);
      const details = individual.details ? individual.details : [];
      let f_countries = new Array(), f_states = new Array(), f_counties = new Array(), f_zipcodes = new Array();
      for (var i = 0; i < details.length; i ++) {
        var detail  = details[i];
        if (f_countries.indexOf(detail.n_CountryId_FK) == -1) {
          f_countries.push(detail.n_CountryId_FK);
        }
        if (f_states.indexOf(detail.n_StateId_FK) == -1) {
          f_states.push(detail.n_StateId_FK);
        }
        if (f_counties.indexOf(detail.s_CountyCode) == -1) {
          f_counties.push(detail.s_CountyCode);
        }
        if (f_zipcodes.indexOf(detail.s_ZipCode) == -1) {
          f_zipcodes.push(detail.s_ZipCode);
        }
      }
      this.setState({
        territoryCode: individual.s_TerritoryCode,
        territoryName: individual.s_TerritoryName,
        a_countries: f_countries,

        t_countries: f_countries,
        t_states: f_states,
        t_counties: f_counties,
        t_zipcodes: f_zipcodes,

        isFirst: true,
        isLoading: false
      });
    }
    if (JSON.stringify(prevState.a_countries) !== JSON.stringify(this.state.a_countries) ) {
      this.props.dispatch(commissionTerritoryServiceObj.loadStates({countries: this.state.a_countries}))
        .then(() => {
          if (this.state.isFirst == true) {
            this.setState({
              a_states: this.state.t_states
            })
          }
        });
    }
    if (JSON.stringify(prevState.a_states) !== JSON.stringify(this.state.a_states) ) {
      this.props.dispatch(commissionTerritoryServiceObj.loadCounty({states: this.state.a_states}))
        .then(() => {
          if (this.state.isFirst == true) {
            this.setState({
              a_counties: this.state.t_counties
            })
          }
        });
    }
    if (JSON.stringify(prevState.a_counties) !== JSON.stringify(this.state.a_counties) ) {
      this.props.dispatch(commissionTerritoryServiceObj.loadZipcodes({counties: this.state.a_counties, states: this.state.a_states, countries: this.state.a_countries}))
        .then(() => {
          if (this.state.isFirst == true) {
            this.setState({
              a_zipcodes: this.state.t_zipcodes,
              isFirst: false
            })
          }
        });
    }
  }
  countryChangeHandle(e) {
    const options = e.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      a_countries: value,
      a_states: [],
      a_counties: [],
      a_zipcodes: []
    });

  }
  stateChangeHandle(e) {
    const options = e.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      a_states: value,
      a_counties: [],
      a_zipcodes: []
    });
    
  }
  countyChangeHandle(e) {
    const options = e.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      a_counties: value,
      a_zipcodes: []
    });
  }
  zipcodeChangeHandle(e) {
    const options = e.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      a_zipcodes: value
    });
  }
  codeChangeHandle(e) {
    const value = e.target.value;
    this.setState({
      territoryCode: value
    })
  }
  nameChangeHandle(e) {
    const value = e.target.value;
    this.setState({
      territoryName: value
    })
  }
  submitFormHandle(e) {
    e.preventDefault();
    let formSubmitedData = new FormData(e.target);
    if (this.state.isEdit) {
      this.props.dispatch(commissionTerritoryServiceObj.updateRecord(this.state.index, formSubmitedData))
      .then(() => {
        alert('Successfully Updated');
      }).catch((error) => {
        alert(error);
      });
    } else {
      this.props.dispatch(commissionTerritoryServiceObj.addNewRecord(formSubmitedData))
      .then(() => {
        alert('Successfully Created');
      }).catch((error) => {
        alert(error);
      });
    }
  }
  render () {
    const {isLoadingMap, isLoadingAddBtn,  counties, countries, states, zipcodes} = this.props;
    const {territoryCode, territoryName, a_counties, a_countries, a_states, a_zipcodes, isEdit, isLoading} = this.state;
    return (
      // <Modal isOpen = {isOpen} toggle = {toggle} size='xl'>
      <div className="animated fadeIn mt-3">
        <Card>
          <CardHeader>
            {
              isEdit == true ? 'Edit Territory' : 'Add Territory'
            }
          </CardHeader>
          <CardBody>
            {
              isLoading == true ? (
                <LoadingDiv />
              ) : (
                <Form method='post' ref='territoryForm' id='territoryForm' onSubmit={this.submitFormHandle} >
                  {
                    isEdit == true && 
                    <Input type='hidden' value='PUT' name='_method' />
                  }
                  <Row>
                    <Col>
                      <InputGroup>
                        <Label for='s_TerritoryCode' className="pr-2">Territory Code</Label>
                        <Input id='s_TerritoryCode' name='s_TerritoryCode' value={territoryCode} onChange={this.codeChangeHandle} bsSize='sm' required />
                      </InputGroup>
                    </Col>
                    <Col>
                      <InputGroup>
                        <Label for='s_TerritoryName' className="pr-2">Territory Name</Label>
                        <Input id='s_TerritoryName' name='s_TerritoryName' value={territoryName} onChange={this.nameChangeHandle} bsSize='sm' required />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>Country</Col>
                    <Col>State</Col>
                    <Col>County</Col>
                    <Col>ZipCode</Col>
                  </Row>
                  {
                    isLoadingMap == true ? (
                      <LoadingDiv />
                    ) : (
                      <Row>
                        <Col>
                          <Input type='select' multiple value={a_countries} onChange={this.countryChangeHandle} className="height-300">
                            {
                              countries && countries.map((country, index) => (
                                <option key={index} value={country.n_CountryId_PK}>{country.s_CountryName}</option>
                              ))
                            }
                          </Input>
                        </Col>
                        <Col>
                          <Input type='select' multiple value={a_states} onChange={this.stateChangeHandle} className="height-300">
                            {
                              states && states.map((state, index) => (
                                <option key={index} value={state.n_StateId_PK}>{state.s_StateName}</option>
                              ))
                            }
                          </Input>
                        </Col>
                        <Col>
                          <Input type='select' multiple value={a_counties} onChange={this.countyChangeHandle} className="height-300">
                          {
                              counties && counties.map((county, index) => (
                                <option key={index} value={county.s_CountyCode}>{county.s_CountyName}</option>
                              ))
                            }
                          </Input>
                        </Col>
                        <Col>
                          <Input type='select' multiple value={a_zipcodes} onChange={this.zipcodeChangeHandle} name="details[]" className="height-300" required>
                            {
                              zipcodes && zipcodes.map((zipcode, index) => (
                                <option key={index} value={zipcode.s_ZipCode}>{zipcode.s_ZipCode}</option>
                              ))
                            }
                          </Input>
                        </Col>
                      </Row>
                    )
                  }
                  <Row className="mt-3">
                    <Col>
                      <Button
                        type="submit"
                        size="sm"
                        color="primary"
                        className="float-right"
                        form="territoryForm"
                        disabled={isLoadingAddBtn ? true : false}
                      >
                        <i className="fa fa-dot-circle-o"></i>
                        {isLoadingAddBtn ? " Saving..." : " Submit"}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )
            }
          </CardBody>
        </Card>
      </div>
    )
  }
}

TerritoryModal.propTypes = {
  dispatch: PropTypes.func.isRequired,  
};


const mapStateToProp = (state) => ({
  individual: state.territoryManageProcess.individual,
  countries: state.territoryManageProcess.countries,
  states: state.territoryManageProcess.states,
  counties: state.territoryManageProcess.counties,
  zipcodes: state.territoryManageProcess.zipcodes,
  isLoadingIndividual: state.territoryManageProcess.isLoadingIndividual,
  isLoadingMap: state.territoryManageProcess.isLoadingMap,
  isLoadingAddBtn: state.territoryManageProcess.isLoadingAddBtn,
});

export default connect(mapStateToProp)(TerritoryModal);
