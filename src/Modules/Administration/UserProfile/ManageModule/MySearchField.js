import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";



class MySearchField extends Component {
  constructor(props) {
    super(props);    
    this.state = {     
        searchKeyFieldValue: this.props.searchKey     
    };    
  }

  // It's necessary to implement getValue
  getValue() {
      //console.log(this.findDOMNode(this).value)
    //return this.findDOMNode(this).value;
  }

  // It's necessary to implement setValue
  setValue(value) {
    //this.findDOMNode(this).value = value;
  }

  render() {
    console.log("Props inside SearchField:-")
    // console.log(this.props)
    // console.log(this.state)
    const {searchKeyFieldValue} = this.state;
    return (
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Search Text" aria-label="Search Text" aria-describedby="basic-addon2"
            name={this.props.searchFieldName}
            //onKeyUp={this.props.searchHandler}
            // onChange={this.props.searchHandler}
            value={searchKeyFieldValue}
             />
            <div class="input-group-append">
                <button class="btn btn-outline-warning" type="button" name="commonClearButton" 
                onClick={this.props.clearSearchHandler}>Clear Search</button>
            </div>
        </div>
      
    );
  }
}

const mapStateToProps = state => ({
    searchKeyFieldValue: state.moduleManageProcess.searchKey,    
  });
  
  export default MySearchField;//connect(mapStateToProps)(MySearchField);

{/* <input
        className={`form-control`}
        type="text"
        defaultValue={this.props.defaultValue}
        placeholder={this.props.placeholder}
        onKeyUp={this.props.search}
      /> */}
