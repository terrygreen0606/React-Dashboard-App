import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProducerService from '../../../services/Producer';
import Http from '../../../Http';
import {
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ModalFooter,
  Col,
  Collapse,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  CustomInput,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
  Dropdown, 
  Nav, NavItem, 
  NavLink, 
  Table, 
  Pagination, 
  PaginationItem, 
  PaginationLink 
} from 'reactstrap';

class AVReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isSaving: false,
      agencyId: this.props.agencyId,
      fadeIn: true,
      timeout: 300,
      modalState: false,
      agencyData: [],
      AVReview_arr: [],
      AVReview: {
        n_AgencyVisitReviews_Id_PK: 0,
        s_AgencyVisit: "N",
        d_AgencyVisitDate: "",
        s_PhoneReview: "N",
        d_PhoneReviewDate: "",
        s_PreVisitNote: "",
        s_StaffNotes: "",
        s_AgentRequests: "",
        s_VisitReviewNotes: "",
        d_UpdatedDate: "",
        n_UpdatedUser: this.props.agencyId,
        UpdatedUser: sessionStorage.getItem('First_Name'),
      },
      feedBack: {
        s_PreVisitNote: 200,
        s_StaffNotes: 200,
        s_AgentRequests: 200,
        s_VisitReviewNotes: 200,
      },
    };
    //rest api endpoint
    this.api = process.env.REACT_APP_API_URL+'/api/v1/agency';
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.tabId !== prevProps.tabId) {
      if(this.props.tabId == '7'){
        this.getAVReviewData();
      }
    }
  }

  getAVReviewData = () => {
    this.setState({isLoading: true});
    const {
      agencyId
    } = this.props;

    Http.get(`${this.api}/${agencyId}/showAVReview`)
      .then((response) => {
        const { data } = response.data;
        this.setState({
          isLoading: false,
          agencyData: data.agencyData,          
          AVReview_arr: data.AVReview_arr,
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

  modalSwitch = () => {
    this.setState({
      modalState: !this.state.modalState
    });
  }

  onChangeCheckDate = (e) => {
    const { name, checked } = e.target;
    var { AVReview } = this.state; 

     AVReview[name] = checked ? 'Y' : 'N';

     this.setState({AVReview});
  }

  onChangeDatePicker = (e) => {
    const { name, value } = e.target;
    var { AVReview } = this.state; 
    if(name == 'd_AgencyVisitDate'){
      AVReview.s_AgencyVisit = 'Y';
    }else{
      AVReview.s_PhoneReview = 'Y';
    }
    AVReview[name] = value;
    this.setState({
      AVReview
    });
  }

  onChangeContent = (e) => {
    var { name, value } = e.target;
    var { AVReview, feedBack } = this.state; 

    if(value.length > 200){
      return;
    }else{
      feedBack[name] = 200 - value.length;
    }

    AVReview[name] = value;
    this.setState({
      AVReview,
      feedBack
    });
  }

  handleAddAVReview = () => {
    var AVReview = {
        n_AgencyVisitReviews_Id_PK: 0,
        s_AgencyVisit: "N",
        d_AgencyVisitDate: "",
        s_PhoneReview: "N",
        d_PhoneReviewDate: "",
        s_PreVisitNote: "",
        s_StaffNotes: "",
        s_AgentRequests: "",
        s_VisitReviewNotes: "",
        d_UpdatedDate: "",
        n_UpdatedUser: this.props.agencyId,
        UpdatedUser: sessionStorage.getItem('First_Name'),
      };
    var feedBack = {
      s_PreVisitNote: 200,
      s_StaffNotes: 200,
      s_AgentRequests: 200,
      s_VisitReviewNotes: 200,
    };

    this.setState({
      AVReview,
      feedBack,
      modalState: !this.state.modalState
    });
  }
  
  handleEditAVReview = (index) => {
    var { AVReview_arr, feedBack} = this.state;
    var AVReview = JSON.parse(JSON.stringify(AVReview_arr[index]));
    
    feedBack.s_PreVisitNote = AVReview.s_PreVisitNote != '' ? 200 - AVReview.s_PreVisitNote.length : 200;
    feedBack.s_StaffNotes = AVReview.s_StaffNotes != '' ? 200 - AVReview.s_StaffNotes.length : 200;
    feedBack.s_AgentRequests = AVReview.s_AgentRequests != '' ? 200 - AVReview.s_AgentRequests.length : 200;
    feedBack.s_VisitReviewNotes = AVReview.s_VisitReviewNotes != '' ? 200 - AVReview.s_VisitReviewNotes.length : 200;
    
    this.setState({
      AVReview,
      feedBack,
      modalState: !this.state.modalState
    });
  }
  handleSubmit = (el) => {
    el.preventDefault();
    this.saveAVReview();
  }
  //save
  saveAVReview = () => {
      
    const {
      AVReview,
      AVReview_arr,
    } = this.state;

    this.setState({isSaving: true});
    Http.post(`${this.api}/${this.props.agencyId}/saveAVReview`, 
    { 
      AVReview
    })
    .then((response) => {
      const {data} = response.data;
      const {n_AgencyVisitReviews_Id_PK} = data.n_AgencyVisitReviews_Id_PK;
      
      const index = AVReview_arr.findIndex(item => parseInt(item.n_AgencyVisitReviews_Id_PK, 10) === parseInt(data.n_AgencyVisitReviews_Id_PK, 10));
      
      if(index < 0){//add
        const newArr = [data, ...AVReview_arr];
        this.setState({ 
          AVReview_arr: newArr,
        });
      }else{//edit
        AVReview_arr[index] = data;
        this.setState({ 
          AVReview_arr: AVReview_arr,
        });
      }

      this.setState({
        error: '',
        isSaving: false,
        modalState: !this.state.modalState
      });
    })
    .catch(() => {
      this.setState({
        error: 'Sorry, there was an error saving your to do.',
        isSaving: false,
      });
    });
  }

  render() {
    const {
      isLoading, 
      isSaving, 
      agencyData,
      AVReview,
      AVReview_arr,
      feedBack,
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
              <strong>Agency Visit Reviews</strong>
              <Button 
                size="sm" 
                className="btn-linkedin btn-brand mr-1 mb-1 float-right"
                onClick={() => this.handleAddAVReview()}
              >
                <span>Add Log</span>
              </Button>
            </CardHeader>
            <CardBody>
              <Row>
                  <Container>
                    {isSaving
                      ?
                        <Modal style={{width:"0px", height:"0px", dispaly: "none"}} isOpen={this.state.isSaving} toggle={this.modalSwitch} backdrop="static">
                          <ModalBody style={{width:"0px", height:"0px", dispaly: "none"}}>
                            <div className="sk-double-bounce">
                              <div className="sk-child sk-double-bounce1"></div>
                              <div className="sk-child sk-double-bounce2"></div>
                            </div>
                          </ModalBody>
                        </Modal>
                      :       
                        null
                    }
                    <Modal size='xl' isOpen={this.state.modalState} toggle={this.modalSwitch} backdrop="static">
                      <ModalHeader toggle={this.modalSwitch}>
                        Agency Visit Reviews
                      </ModalHeader>
                      <Form action="" method="post" onSubmit={this.handleSubmit} ref={(el) => { this.avrForm = el; }} >
                        <ModalBody>
                          <Row className="float-center">
                            <Col lg="2" className="pt-1">
                              <CustomInput
                                type="checkbox"
                                id="s_AgencyVisit"
                                name="s_AgencyVisit"
                                checked = {AVReview.s_AgencyVisit=='Y'? true : false}
                                label="Agency Visit"                              
                                onChange={(e) => this.onChangeCheckDate(e)}
                              >
                              </CustomInput>
                            </Col>
                            <Col style={{display: "flex"}}>
                              <Label lg="6" size="sm" htmlFor="d_AgencyVisitDate">Agency Visit Date</Label>
                              <Input 
                                bsSize="sm" 
                                lg="3"
                                type="date"
                                id="d_AgencyVisitDate" 
                                name="d_AgencyVisitDate"
                                value={AVReview.d_AgencyVisitDate}
                                onChange={(e) => this.onChangeDatePicker(e)}
                              />
                            </Col>
                            <Col lg="2" className="pt-1">
                              <CustomInput
                                type="checkbox"
                                id="s_PhoneReview"
                                name="s_PhoneReview"
                                checked = {AVReview.s_PhoneReview=='Y'? true : false}
                                label="Phone Review"
                                onChange={(e) => this.onChangeCheckDate(e)}
                                >
                              </CustomInput>
                            </Col>
                            <Col  style={{display: "flex"}}>
                              <Label lg="6" size="sm" htmlFor="d_PhoneReviewDate">Phone Review Date</Label>
                              <Input 
                                bsSize="sm"
                                type="date"
                                id="d_PhoneReviewDate" 
                                name="d_PhoneReviewDate" 
                                value={AVReview.d_PhoneReviewDate}
                                onChange={(e) => this.onChangeDatePicker(e)}
                                placeholder="date" 
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <Label style={{display: "flex"}} size="sm" htmlFor="s_FullLegalName" className="pr-1">Agency Name</Label>
                              <Input 
                                bsSize="sm" 
                                type="text" 
                                id="s_FullLegalName" 
                                name="s_FullLegalName" 
                                value={agencyData.s_FullLegalName}
                                className="input-sm" 
                                placeholder="" 
                                required 
                                readOnly 
                              />
                            </Col>
                            <Col md="6">
                              <Label size="sm" htmlFor="s_ContactName" className="pr-1">Agency Contact</Label>
                              <Input 
                                bsSize="sm" 
                                type="text" 
                                id="s_ContactName" 
                                name="s_ContactName"
                                value={agencyData.s_ContactName} 
                                className="input-sm" 
                                placeholder="" 
                                required 
                                readOnly 
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col  md="6">
                              <Label size="sm" htmlFor="s_PhoneNumber" className="pr-1">Phone</Label>
                              <Input 
                                bsSize="sm" 
                                type="text" 
                                id="s_PhoneNumber" 
                                name="s_PhoneNumber"
                                value={agencyData.s_PhoneNumber} 
                                className="input-sm" 
                                placeholder="" 
                                required 
                                readOnly 
                              />
                            </Col>
                            <Col md="6">
                              <Label size="sm" htmlFor="s_EmailAddress" className="pr-1">Email</Label>
                              <Input 
                                bsSize="sm" 
                                type="text" 
                                id="s_EmailAddress" 
                                name="s_EmailAddress" 
                                value={agencyData.s_EmailAddress}
                                className="input-sm" 
                                placeholder="" 
                                required 
                                readOnly 
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md="5">
                              <Label size="sm" htmlFor="s_AddressLine1" className="pr-1">Address</Label>
                              <Input 
                                bsSize="sm" 
                                type="text" 
                                id="s_AddressLine1" 
                                name="s_AddressLine1" 
                                value={agencyData.s_AddressLine1}
                                className="input-sm" 
                                placeholder="" 
                                required 
                                readOnly 
                              />
                            </Col>
                            <Col md="3">
                              <Label size="sm" htmlFor="s_CityName" className="pr-1">City</Label>
                              <Input 
                                bsSize="sm" 
                                type="text" 
                                id="s_CityName" 
                                name="s_CityName" 
                                value={agencyData.s_CityName}
                                className="input-sm" 
                                placeholder="" 
                                required 
                                readOnly 
                              />
                            </Col>
                            <Col md="3">
                              <Label size="sm" htmlFor="s_StateName" className="pr-1">State</Label>
                              <Input 
                                bsSize="sm" 
                                type="text" 
                                id="s_StateName" 
                                name="s_StateName" 
                                value={agencyData.s_StateName}
                                className="input-sm" 
                                placeholder="" 
                                required 
                                readOnly 
                              />
                            </Col>
                            <Col md="1">
                              <Label size="sm" htmlFor="s_PostalCode" className="pr-1">Zip</Label>
                              <Input 
                                bsSize="sm" 
                                type="text" 
                                id="s_PostalCode" 
                                name="s_PostalCode" 
                                value={agencyData.s_PostalCode}
                                className="input-sm" 
                                placeholder="" 
                                required 
                                readOnly 
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <FormGroup>
                              <Label style={{display: "flex"}} size="sm" htmlFor="s_PreVisitNote" className="pr-1">Pre Visit Note</Label>
                              <Input 
                                type="textarea" 
                                name="s_PreVisitNote" 
                                id="s_PreVisitNote" 
                                value={AVReview.s_PreVisitNote}
                                rows="3"
                                placeholder="Content..." 
                                onChange={(e) => this.onChangeContent(e)}
                                required
                              />
                              </FormGroup>
                            </Col>
                            <Col md="3">
                              <span style={{fontSize: "12px", bottom:"0", position: "absolute"}}>
                                <label style={{color: "red", marginBottom: "0px"}}>(Maximum characters: 200).</label>
                                <div>You have {feedBack.s_PreVisitNote} characters left.</div>
                              </span>  
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Label style={{display: "flex"}} size="sm" htmlFor="s_StaffNotes" className="pr-1">Staff Notes</Label>
                              <Input 
                                type="textarea" 
                                name="s_StaffNotes" 
                                id="s_StaffNotes" 
                                value={AVReview.s_StaffNotes}
                                rows="3"
                                placeholder="Content..." 
                                onChange={(e) => this.onChangeContent(e)}
                                required
                              />
                            </Col>
                            <Col md="3">
                              <span style={{fontSize: "12px", bottom:"0", position: "absolute"}}>
                                <label style={{color: "red", marginBottom: "0px"}}>(Maximum characters: 200).</label>
                                <div>You have {feedBack.s_StaffNotes} characters left.</div>
                              </span> 
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Label style={{display: "flex"}} size="sm" htmlFor="s_AgentRequests" className="pr-1">Agent Requests/To Do List</Label>
                              <Input 
                                type="textarea" 
                                name="s_AgentRequests" 
                                id="s_AgentRequests" 
                                value={AVReview.s_AgentRequests}
                                rows="3"
                                placeholder="Content..." 
                                onChange={(e) => this.onChangeContent(e)}
                                required
                              />
                            </Col>
                            <Col md="3">
                              <span style={{fontSize: "12px", bottom:"0", position: "absolute"}}>
                                <label style={{color: "red", marginBottom: "0px"}}>(Maximum characters: 200).</label>
                                <div>You have {feedBack.s_AgentRequests} characters left.</div>
                              </span> 
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Label style={{display: "flex"}} size="sm" htmlFor="s_DBAName" className="pr-1">Visit Review Notes</Label>
                              <Input 
                                type="textarea" 
                                name="s_VisitReviewNotes" 
                                id="s_VisitReviewNotes" 
                                value={AVReview.s_VisitReviewNotes}
                                rows="3"
                                placeholder="Content..." 
                                onChange={(e) => this.onChangeContent(e)}
                                required
                              />
                            </Col>
                            <Col md="3">
                              <span style={{fontSize: "12px", bottom:"0", position: "absolute"}}>
                                <label style={{color: "red", marginBottom: "0px"}}>(Maximum characters: 200).</label>
                                <div>You have {feedBack.s_VisitReviewNotes} characters left.</div>
                              </span> 
                            </Col>
                          </Row>
                        </ModalBody>
                        <ModalFooter>
                          <Button 
                            type="submit" 
                            size="sm" 
                            color="primary"
                            disabled={isSaving}
                          >
                            <i className="fa fa-dot-circle-o"></i> Submit
                          </Button>
                        </ModalFooter>
                      </Form>
                    </Modal>
                  </Container>
                </Row>
              <Table hover bordered striped responsive size="sm">
                <thead>
                <tr>
                  <th>VISIT REVIEW NOTES</th>
                  <th>VISIT DATE</th>
                  <th>UPDATE USER</th>
                  <th>UPDATED DATE</th>
                  <th>ACTION</th>
                </tr>
                </thead>
                <tbody>
                {AVReview_arr.map((AVReviewData, index) =>{ 
                  return (
                    <tr key={index}>
                      <td>
                        {AVReviewData.s_VisitReviewNotes}
                      </td>
                      <td>
                        {AVReviewData.d_AgencyVisitDate}
                      </td>
                      <td>
                        {AVReviewData.UpdatedUser}
                      </td>
                      <td>
                        {AVReviewData.d_UpdatedDate}
                      </td>
                      <td>
                        <Button 
                          size="sm" 
                          color="success" 
                          className="btn-pill"
                          onClick={() => this.handleEditAVReview(index)}
                        >
                          <i className="fa fa-edit fa-lg pt-1"></i>
                        </Button>
                      </td>
                    </tr>
                  )
                })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  agencyId: state.Producer.agencyId,
  tabId: state.Producer.tabId,
})

const mapDispatchToProps = dispatch => ({
    showAUsersRequest: (url) => dispatch(ProducerService.showAUsersRequest(url))//Origin
});
export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef : true})(AVReview);