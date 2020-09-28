import React, { Component, useState, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { gMapService } from "../../../services/gMapService";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { Polygon, GoogleMap, LoadScript, DrawingManager } from '@react-google-maps/api';
import './Polygon.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
const url = window.location.href.split("/");
const id = url[url.length - 1];
const mapContainerStyle = {
  height: "575px",
  width: "100%"
}

const center = {
  lat: 37.614231,
  lng: 261.509557
}

let lat_lang = '';
let googleObj = '';

const GoogleMapsComponent = props => {
  // Store Polygon path in state
  const [path, setPath] = useState(props.cordinates);

  function getPaths(polygon) {
    lat_lang = '';
    let polygonBounds = polygon.getPath();
    var bounds = [];
    for (let i = 0; i < polygonBounds.length; i++) {
      if (1 == (polygonBounds.length - i)) {
        lat_lang += '(' + polygonBounds.getAt(i).lat() + ',' + polygonBounds.getAt(i).lng() + ')';
      } else {
        lat_lang += '(' + polygonBounds.getAt(i).lat() + ',' + polygonBounds.getAt(i).lng() + '),';
      }
      bounds.push({ lat: polygonBounds.getAt(i).lat(), lng: polygonBounds.getAt(i).lng() });
    }
    setPath(bounds);
  }

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);

  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map(latLng => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });

      if (nextPath.length && isNaN(id) == false) {
        lat_lang = '';
        nextPath.map((value, index) => {
          if (nextPath.length == (index + 1)) {
            lat_lang += '(' + value.lat + ',' + value.lng + ')';
          } else {
            lat_lang += '(' + value.lat + ',' + value.lng + '),';
          }
        });
      }

      setPath(nextPath);
    }
  }, [setPath]);

  // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    polygon => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach(lis => lis.remove());
    polygonRef.current = null;
  }, []);


  function onMapLoad() {
    if (window.google) {
      googleObj = window.google;
    } else {
      googleObj = false;
    }
  }

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      libraries={["drawing"]}
    >
      <GoogleMap id="drawing-manager-example"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        onLoad={onMapLoad}
      >
        <Polygon
          path={path}
          options={{
            fillColor: `#FF0000`,
            fillOpacity: 0.5,
            strokeColor: "#FF0000",
            strokeWeight: 2,
            clickable: false,
            zIndex: 1
          }}
          // Make the Polygon editable / draggable
          editable
          draggable
          // Event used when manipulating and adding points
          onMouseUp={onEdit}
          // Event used when dragging the whole Polygon
          onDragEnd={onEdit}
          onLoad={onLoad}
          onUnmount={onUnmount}
        />
        <DrawingManager
          onPolygonComplete={newPolygon => getPaths(newPolygon)}
          options={{
            drawingControl: true,
            drawingControlOptions: {
              position: 2,
              drawingModes: ["polygon"],
            },
            polygonOptions: {
              fillColor: `#FF0000`,
              fillOpacity: 0.5,
              strokeColor: "#FF0000",
              strokeWeight: 2,
              clickable: false,
              editable: true,
              zIndex: 1
            }
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
}

class GoogleMapsPolygone extends Component {
  constructor(props) {
    super(props);
    this.apiService = new gMapService();
    this.state = {
      mapzoneData: [],
      zoneName: '',
      zoneDesc: '',
      effFrom: '',
      effTo: '',
      n_MapZoneMasterId_PK: '',
      vertices: '',
      cordinates: [],
      checkurl: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
  }

  componentWillMount() {
    if (isNaN(id) == false) {
      this.renderMapCordinates();
    }
  };

  renderMapCordinates() {
    this.props.dispatch(this.apiService.getMapZoneData(id)).then((resp) => {
      this.setState({ cordinates: this.props.mapzoneData.data.cords });
    });
  }

  componentDidMount() {
    if (isNaN(id) == false) {
      this.props.dispatch(this.apiService.getMapZoneData(id)).then((resp) => {
        this.setState({
          zoneName: this.props.mapzoneData.data.s_MapZoneName,
          zoneDesc: this.props.mapzoneData.data.s_MapZoneDesc,
          effFrom: this.props.mapzoneData.data.d_EffectiveDateFrom,
          effTo: this.props.mapzoneData.data.d_EffectiveDateTo,
          n_MapZoneMasterId_PK: this.props.mapzoneData.data.n_MapZoneMasterId_PK,
          vertices: this.props.mapzoneData.data.vertices,
        });
      });
    }
  }

  success(msg) {
    return toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  error(msg) {
    return toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (lat_lang == '') {
      lat_lang = this.state.vertices;
    } else {
      this.setState({
        vertices: lat_lang
      })
    }

    document.getElementById('vertices').value = this.state.vertices;

    const input = new FormData(event.target);

    if (lat_lang == '') {
      document.getElementById('effToError').textContent = 'Please create a polygon before submit.';
    } else {
      document.getElementById('effToError').textContent = '';

      var postData = {
        n_MapZoneMasterId_PK: input.get('n_MapZoneMasterId_PK'),
        vertices: lat_lang,
        zoneName: input.get('zoneName'),
        zoneDesc: input.get('zoneDesc'),
        effFrom: input.get('effFrom'),
        effTo: input.get('effTo')
      };

      this.props.dispatch(this.apiService.saveGmapZone(postData)).then((resp) => {
        if (this.props.saveResponse.code == 200) {
          this.success(this.props.saveResponse.message);
        } else {
          this.error('Error in saving mapzone.');
        }
      });
    }
  }

  render() {
    const containerStyle = {
      zIndex: 1999
    };

    if (this.state.cordinates.length == 0 && isNaN(id) == false) {
      return <div className="animated fadeIn pt-1 text-center">Loading...</div>;
    } else {
      return (
        <div className="row">
          <div className="animated fadeIn col-md-8">
            <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
            <Card>
              <CardBody>
                <GoogleMapsComponent cordinates={this.state.cordinates.length ? this.state.cordinates : []} />
              </CardBody>
            </Card>
          </div>
          <div>
            <div className="col-md-4 zone_form">
              <Card>
                <CardHeader>
                  <strong>Details</strong>
                </CardHeader>
                <form onSubmit={this.handleSubmit}>
                  <Input type="hidden" id="n_MapZoneMasterId_PK" name="n_MapZoneMasterId_PK" value={this.state.n_MapZoneMasterId_PK} />
                  <Input type="hidden" id="vertices" name="vertices" value={this.state.vertices} onChange={e => this.setState({ vertices: e.target.value })} />
                  <CardBody>
                    <FormGroup>
                      <Label htmlFor="zoneName">Zone Name</Label>
                      <Input type="text" id="zoneName" name="zoneName" placeholder="Enter zone name" value={this.state.zoneName} onChange={e => this.setState({ zoneName: e.target.value })} required />
                      <span className="text-danger" id="zoneNameError"></span>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="zoneDesc">Zone Desc</Label>
                      <Input type="textarea" id="zoneDesc" name="zoneDesc" value={this.state.zoneDesc} onChange={e => this.setState({ zoneDesc: e.target.value })} required />
                      <span className="text-danger" id="zoneDescError"></span>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="effFrom">Eff From</Label>
                      <Input type="date" id="effFrom" name="effFrom" placeholder="Eff from" value={this.state.effFrom} onChange={e => this.setState({ effFrom: e.target.effFrom })} required />
                      <span className="text-danger" id="effFromError"></span>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="effTo">Eff To</Label>
                      <Input type="date" id="effTo" name="effTo" placeholder="Eff to" value={this.state.effTo} onChange={e => this.setState({ effTo: e.target.effTo })} required />
                      <span className="text-danger" id="effToError"></span>
                    </FormGroup>
                  </CardBody>
                  <CardFooter>
                    <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                    <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  mapzoneData: state.Administration.getMapZoneData,
  saveResponse: state.Administration.saveGmapZone
});


export default connect(mapStateToProps)(GoogleMapsPolygone);
