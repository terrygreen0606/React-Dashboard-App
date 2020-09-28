import React, { Component } from 'react';
import { connect } from 'react-redux';
import Http from '../../../Http';
import * as action from '../../../store/actions/producer';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  FormGroup,
  CustomInput,
  Input,
  Label,
  Row,
} from 'reactstrap';

class Association extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agencyAssociation_arr: [],
      appCode_arr: [],
      mergedArray: [],
    };
    this.api = process.env.REACT_APP_API_URL+'/api/v1/agency';
  }
  componentDidMount() {
    this.getAssociationData();
  }
  componentDidUpdate(prevProps, prevState){
    if (this.props.agencyId !== prevProps.agencyId) {
      this.getAssociationData();
    }
  }
  getAssociationData = () => {
    this.setState({isLoading: true});
    Http.get(`${this.api}/${this.props.agencyId}/showAssociation`)
      .then((response) => {
        const { data } = response.data;

        const mergedArray = this.mergeArray(data.agencyAssociation, data.appCode);
        this.setState({
          isLoading: false,
          agencyAssociation_arr: data.agencyAssociation,
          appCode_arr: data.appCode,
          mergedArray: mergedArray,
          error: false,
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          error: 'Unable to fetch data.',
        });
      });
  }

  mergeArray = (a1, a2) =>
    a2.map(itm => ({
      ...itm,
      s_IsActive: 'N', s_AssociationCode: itm.s_AppCodeName,
      ...a1.find((item) => (item.s_AssociationCode === itm.s_AppCodeName) && item),
    }));

  handleCheckStatus = (e) => {
    const { name, checked } = e.target;
    var value = checked ? 'Y' : 'N';
    var { appCode_arr, agencyAssociation_arr } = this.state;
    console.log(value);

    var agencyAssociation_temp = agencyAssociation_arr.map((item, i) => {
      if (item.s_AssociationCode == name) {
        return {...item, s_IsActive: value};
      }
      return item;
    });
    // if can't find value , push new row
    if(! agencyAssociation_temp.find((item) => (item.s_AssociationCode === name))){
      var newRow = {s_IsActive: value, s_AssociationCode: name, n_AgencyAssociation_PK: 0};
      agencyAssociation_temp.push(newRow);
    }

    console.log(agencyAssociation_temp);
    var mergedArray = this.mergeArray(agencyAssociation_temp, appCode_arr);
    console.log(mergedArray);
    this.setState({
      agencyAssociation_arr: agencyAssociation_temp,
      mergedArray: mergedArray,
    });
  }

  saveAssociation = () => {

    const {
      agencyAssociation_arr,
    } = this.state;

    this.setState({isLoading: true});
    Http.post(`${this.api}/${this.props.agencyId}/saveAssociation`,
      { agencyAssociation_arr })
      .then(({ response }) => {
        const { data } = response.data.agencyAssociation;
        const {appCode_arr} = this.state;
        const mergedArray = this.mergeArray(data.agencyAssociation, appCode_arr);
        this.setState({
          isLoading: false,
          agencyAssociation_arr: data.agencyAssociation,
          mergedArray: mergedArray,
          error: false,
        });
        console.log(data);
        this.setState({
          error: 'Sorry, there was an error saving your to do.',
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          error: 'Sorry, there was an error saving your to do.',
          isLoading: false,
        });
      });
  }

  render() {
    const {
      isLoading,
      agencyAssociation_arr,
      appCode_arr,
      mergedArray,
      error,
    } = this.state;

    return (
      <div className="animated fadeIn">
        {isLoading
          ?
          <div className="sk-double-bounce">
            <div className="sk-child sk-double-bounce1"></div>
            <div className="sk-child sk-double-bounce2"></div>
          </div>
          :
          <Card>
            <CardHeader>
              <strong>Agency Association</strong>
            </CardHeader>
            <CardBody>
              <FormGroup>
                {mergedArray.map((mergedData, key) => {
                  return(
                    <CustomInput
                      type="checkbox"
                      key = {mergedData.n_AppCodeId_PK}
                      checked = {mergedData.s_IsActive=='Y'? true : false}
                      id={mergedData.n_AppCodeId_PK}
                      name={mergedData.s_AssociationCode}
                      label={mergedData.s_AppCodeNameForDisplay}
                      onChange={(e) => this.handleCheckStatus(e) }
                      required
                    >
                    </CustomInput>
                  )
                })}
              </FormGroup>
              <FormGroup>
                <Button
                  size="sm"
                  color="success"
                  className="btn-linkedin btn-brand mr-1 mb-1 float-right"
                  onClick={this.saveAssociation}
                >
                  <span>Submit</span>
                </Button>
              </FormGroup>
            </CardBody>
          </Card>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  agencyId: state.Producer.agencyId,
  tabId: state.Producer.tabId
})

export default connect(mapStateToProps)(Association);
