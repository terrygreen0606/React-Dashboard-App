import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as submoduleManageServicesObj from "../../../../services/submoduleManageServices";
import Select from "react-select";
//import "react-select/dist/react-select.min.css";

class AddProcessSelectModuleComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleDD: [],
      moduleDDSelected: props.moduleDDSelected,
      moduleDDSelectedNew: [props.moduleDDSelected],
      reloadModulemngModuleList: props.reloadModulemngModuleList
    };
    this.handleChange = this.handleChange.bind(this);
  }

  loadModuleDD() {
    this.props.dispatch(submoduleManageServicesObj.ddModules()).then(res => {
      this.setState({ moduleDD: this.props.moduleDD }, () => {
        //--------
      });
    });
  }
  componentDidMount() {
    this.loadModuleDD();
  }
  handleChange(value) {
    //console.log("value=>"+value);
    //this.setState({ moduleDDSelectedNew: `${value.value == ''}` ? value : value.value  });
    this.setState({ moduleDDSelectedNew: value == null ? value : value.value  });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.moduleDDSelected !== this.props.moduleDDSelected) {
      this.setState({
        moduleDDSelected: this.props.moduleDDSelected,
        moduleDDSelectedNew: this.props.moduleDDSelected || ''
      });
    }

    if (
      prevProps.reloadModulemngModuleList !==
      this.props.reloadModulemngModuleList
    ) {
      this.setState(
        {
          reloadModulemngModuleList: this.props.reloadModulemngModuleList
        },
        () => {
          this.loadModuleDD();
        }
      );
    }
  }

  render() {
    const { moduleDD, moduleDDSelectedNew } = this.state;
    const optionItems = moduleDD;
    return (
      <Select
        
          id="Module_Name_DD1"
        name="Module_Name_DD1"
        ref="Module_Name_DD1"
        value={moduleDDSelectedNew || ""}
        options={optionItems}
        onChange={this.handleChange}
        style={{ width: "200px" }}
        required={`required`}
      />
    );
  }
}

AddProcessSelectModuleComp.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  moduleDD: state.submoduleManageProcess.moduleDD,
  addEditFormFieldValues: state.submoduleManageProcess.addEditFormFieldValues,
  moduleDDSelected:
    state.submoduleManageProcess.addEditFormFieldValues.n_UserModule_FK,
  reloadModulemngModuleList: state.moduleManageProcess.reloadModulemngModuleList
});

export default connect(mapStateToProps)(AddProcessSelectModuleComp);
