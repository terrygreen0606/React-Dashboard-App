import React, {Component} from 'react';
import {Row, Col, Modal, ModalBody, Button, Input, Card, CardHeader, CardBody, CardFooter, InputGroup, Label, Table,NavLink} from 'reactstrap';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, Circle } from 'react-google-maps';


const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const defaultZoom = 8;
const defaultMapTypeId = "satellite";
const defaultRadius = 80467.2;

class MarkerList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return this.props.locations.map((location, index) => {
        let formatedLoation = {};

        formatedLoation.lat = location.Location.lat*1;
        formatedLoation.lng = location.Location.lng*1;
        formatedLoation.draggable = false;
        formatedLoation.data = location;

        return (
          <MarkerWithInfoWindow selectAllocateToFromMap={this.props.selectAllocateToFromMap} key={index.toString()} location={formatedLoation}/>
        )
      }
    );
  }
}

class MarkerWithInfoWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isAllocateToAdjustOpen: false,
      location: { name: props.location.data.Name, adjuster_id: props.location.data.userId, address_id_pk:props.location.data.PersonAddressesId_PK}
    };
    this.toggle = this.toggle.bind(this);
    this.toggleAllocateToAdjustOpen = this.toggleAllocateToAdjustOpen.bind(this);    
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleAllocateToAdjustOpen() {
    this.setState({
      isAllocateToAdjustOpen: !this.state.isAllocateToAdjustOpen
    });
  }

  setAllocateToAdjust(){
    this.toggleAllocateToAdjustOpen();
    this.props.selectAllocateToFromMap(this.state.location.adjuster_id, this.state.location.address_id_pk);
  }

  selectAdjuster(e){   
    this.toggleAllocateToAdjustOpen();
  }

  render() {
    const {location} = this.props;

    return (
      <>
      <Marker onClick= {(e) => {this.selectAdjuster(e)}} onMouseOver={this.toggle} onMouseOut={this.toggle} position={location}>
        {this.state.isOpen &&
        <InfoWindow onCloseClick={this.toggle}>
        <Row className="" style={{marginRight:'0px'}}>
            <Col className="">
              <div id="Adjusters_marker_{location.data.id}">
                  <div style={{float:"left"}}>
                    <img src="{{location.data.userDpImageUrl}}" style={{verticalAlign:'middle',borderRadius:'50%',width:50+'px',height:50+'px'}} />
                  </div>
                  <h4>{location.data.Name}</h4>
                  <p>{location.data.userPhone}
                  <br/><b>Total Assigned Claim (weekly): </b>{location.data.totalClaimAssignmentCount}
                  <br/><b>OPEN INSPECTION: </b>{location.data.openCount}
                  <br/><b>PENDING INSPECTION: </b>{location.data.pendingCount}
                  <br/><b>CLOSE INSPECTION: </b>{location.data.closeCount}</p>
              </div>
            </Col>
        </Row>
        </InfoWindow>}
      </Marker>
      <Modal isOpen={this.state.isAllocateToAdjustOpen} toggle={this.toggleAllocateToAdjustOpen} className="modal-l">
        <ModalBody>
            <Card>
                <CardHeader>
                    Claim Allocate To Adjuster
                </CardHeader>
                <CardBody>
                    Are you sure want to assign this claim to {this.state.location.name}?
                </CardBody>
                <CardFooter>
                  <Button size="sm" color="primary" className="float-right" onClick={() => this.setAllocateToAdjust()}>Assign</Button>
                  <Button size="sm" color="primary" className="float-right" onClick={() => this.toggleAllocateToAdjustOpen()}>Cancel</Button>
                </CardFooter>
            </Card>
        </ModalBody>  
      </Modal>
      </>
    )
  }
}

const GoogleMapsComponent = withScriptjs(withGoogleMap((props) => {
    return (
      <GoogleMap defaultMapTypeId={defaultMapTypeId} defaultZoom={defaultZoom} defaultCenter={props.mapCenter}>
        {<MarkerList locations={props.locations} selectAllocateToFromMap={props.selectAllocateToFromMap}/>}
        {<Circle
                  defaultCenter={props.mapCenter}
                  radius={defaultRadius}
                  options={{fillColor: '#AA0000'}}/>}
      </GoogleMap>
    );
  }
));

class AssignClaimAllocaedToUsingMapModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="modal-xl">
        <ModalBody>
          	<Card>
  	            <CardHeader>
                		<i className="icon-map"></i> Claim Allocate To Adjuster
  	            </CardHeader>                  
  	            <CardBody>
                  <div className="animated fadeIn">
  				          <GoogleMapsComponent
                      locations = {this.props.fieldAdjusters}
                      mapCenter = {this.props.mapCenter}
                      selectAllocateToFromMap = {this.props.selectAllocateToFromMap}
  				            key="map"
  				            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`}
  				            loadingElement={<div style={{height: `100%`}}/>}
  				            containerElement={<div style={{height: `400px`}}/>}
  				            mapElement={<div style={{height: `100%`}}/>}
  				          />
                  </div>
                </CardBody>
  				      <CardFooter>
  	            	<Button size="sm" color="primary" className="float-right" onClick={() => this.props.toggle()}>Cancel</Button>
                </CardFooter>
  			      </Card>
          </ModalBody>
     	</Modal>
    )
  }
}

export default AssignClaimAllocaedToUsingMapModal;