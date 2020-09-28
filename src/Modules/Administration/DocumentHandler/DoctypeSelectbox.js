import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as docHandlerServicesObj from "../../../services/documentHandlerServices";
import Select from "react-select";
//import "react-select/dist/react-select.min.css";

class DoctypeSelectbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctypeDD: [],
      doctypeDDSelected: props.doctypeDDSelected,    
      doctypeDDSelectedNew: [props.doctypeDDSelected],  
    };
    this.handleChange = this.handleChange.bind(this);
  }

  loadDoctypeDD() {
    this.props.dispatch(docHandlerServicesObj.loadDocHandlerDoctypeDD()).then(res => {
      this.setState({ doctypeDD: this.props.doctypeDD }, () => {
        //--------        
      });
    });
  }
  componentDidMount() {
    this.loadDoctypeDD();
  }
  handleChange(value) {

    //console.log("value=>"+value);
    this.setState({ doctypeDDSelectedNew: `${value.value == ''}` ? value : value.value  });
    //this.setState({ doctypeDDSelectedNew: value == null ? value : value.value  });

    this.props.dispatch(
      docHandlerServicesObj.getSelectedDoctypeIDFromSelectBox_Services(value)
    );


  }

  

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.doctypeDDSelected !== this.props.doctypeDDSelected) {
      this.setState({              
        doctypeDDSelected: this.props.moduleDDSelected,
        doctypeDDSelectedNew: this.props.doctypeDDSelected || ''        
      });      
    }   
  }  
  render() {
    const { doctypeDD, doctypeDDSelectedNew } = this.state;
    const optionItems = doctypeDD;    
    console.log("inside"+doctypeDDSelectedNew);
    
    return (
      <Select
        
        id="Doctype_Name_DD1"
        name="Doctype_Name_DD1"
        ref="Doctype_Name_DD1"
        value={doctypeDDSelectedNew || ""}
        options={optionItems}
        onChange={this.handleChange}
        style={{ width: "200px" }}
        required={`required`}
      />
    );
  }
}

DoctypeSelectbox.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  doctypeDD: state.docHandlerProcess.DataSet_DoctypeDD,    
  doctypeDDSelected: state.docHandlerProcess.selected_DoctypePK_SelectBox,     
  reloadDoctypeDD: state.docHandlerProcess.reloadDoctypeDD ,
});

export default connect(mapStateToProps)(DoctypeSelectbox);
