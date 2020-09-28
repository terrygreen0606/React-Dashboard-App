import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Table, 
} from 'reactstrap';


class AgencyNewLicense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      licManager_arr: [],
      state_arr: [],
      error: false,
      isLoading: false,
    };
    //rest api endpoint
    this.api = process.env.REACT_APP_API_URL+'/api/v1/agency';

  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { agencyInfo } = this.state;
    // this.addAgency(agencyInfo);

  }

  render() {
    const {
      isLoading, 
      state_arr,
      error,
    } = this.state;
    const {
      licManager_arr
    } = this.props;
    return (
      <div className="animated fadeIn license-information">
        <Card className="border-0 bb-1-green">
          <CardHeader>
            <strong>License Information</strong>
            <Button 
              size="sm"
              color="primary"
              className="btn-linkedin btn-brand float-right"
              onClick={this.props.handleAddRow}
            >
              <span>Add Row</span>
            </Button>
          </CardHeader>
          <CardBody>
            <Table hover responsive size="sm">
              <thead>
              <tr>
                <th>LICENSE TYPE</th>
                <th>LICENSE NO.</th>
                <th>STATE</th>
                <th>APPOINTED</th>
                <th>ISSUE DATE</th>
                <th>EXP.DATE</th>
                <th>APP.DATE</th>
                <th>ACTIONS</th>
              </tr>
              </thead>
              <tbody>
              {licManager_arr.length > 0 && licManager_arr.map((licManager, index) =>{ 
                return (
                  <tr key={index}>
                    <td>
                      <Input 
                        type="select" 
                        value={licManager.n_LicenseType} 
                        bsSize="sm"
                        onChange={(e) => this.props.handleChange(index, 'n_LicenseType', e.target.value)} 
                      >
                        <option value="">Select Type</option>
                        <option value="111">Active</option>
                        <option value="112">Closed</option>
                      </Input>
                    </td>
                    <td>
                      <Input 
                        bsSize="sm" 
                        type="text" 
                        value={licManager.s_LicenseNo}
                        className="input-sm" 
                        placeholder=""
                        onChange={(e) => this.props.handleChange(index, 's_LicenseNo', e.target.value)}  
                        required 
                        />
                    </td>
                    <td>
                      <Input 
                        type="select" 
                        value={licManager.n_StateId_FK} 
                        bsSize="sm"
                        onChange={(e) => this.props.handleChange(index, 'n_StateId_FK', e.target.value)} 
                      >
                        <option value="">Select State</option>
                        {state_arr.map((state, index) => (
                          <option key={index} value={state.n_StateId_PK}>
                            {state.s_StateName}
                          </option>
                        ))}
                        
                      </Input>
                    </td>
                    <td>
                      <Input 
                        type="select" 
                        value={licManager.n_appointyType} 
                        bsSize="sm"
                        onChange={(e) => this.props.handleChange(index, 'n_appointyType', e.target.value)} 
                      >
                        <option value="">Select Appointed</option>
                        <option value="769" selected="selected">AVATAR APPOINTED</option>
                        <option value="770">LSA</option>
                        <option value="771">NOT APPOINTED</option>
                      </Input>
                    </td>
                    <td>
                      <Input 
                        bsSize="sm" 
                        type="date" 
                        placeholder="date" 
                        value={licManager.d_IssueDate}
                        onChange={(e) => this.props.handleChange(index, 'd_IssueDate', e.target.value)} 
                      />
                    </td>
                    <td>
                      <Input 
                        bsSize="sm" 
                        type="date" 
                        placeholder="date" 
                        value={licManager.d_ExpireDate}
                        onChange={(e) => this.props.handleChange(index, 'd_ExpireDate', e.target.value)} 
                      />
                    </td>
                    <td>
                      <Input 
                        bsSize="sm" 
                        type="date" 
                        placeholder="date" 
                        value={licManager.d_AppDate}
                        onChange={(e) => this.props.handleChange(index, 'd_AppDate', e.target.value)} 
                      />
                    </td>
                    <td>
                      <Button 
                        size="sm" 
                        color="danger" 
                        className="btn-pill"
                        onClick={(e) => this.props.handleRemoveSpecificRow(e, index)}
                      >
                        <i className="icon-close icons d-block pt-1"></i>
                      </Button>
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  }
}

// export default Agency;

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(AgencyNewLicense);