import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as aclManageServicesObj from "../../../../services/aclManageServices";
import { populateAclMngLevelDDSelected } from "../../../../store/actions/administrationAction";
import Select from "react-select";
//import "react-select/dist/react-select.min.css";

class AddProcessSelectLevelComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levelDD: [],
      levelDDSelected: [props.levelDDSelected],
      reloadLevelmngLevelList: props.reloadLevelmngLevelList
    };
    this.handleChange = this.handleChange.bind(this);
  }

  loadModuleDD() {
    this.props.dispatch(aclManageServicesObj.ddLevels()).then(res => {
      this.setState({ levelDD: this.props.levelDD }, () => {
        //--------
      });
    });
  }
  componentDidMount() {
    this.loadModuleDD();
  }

  handleChange(value) {
    //console.log(value.value);
    //this.setState({ moduleDDSelectedNew: value == null ? value : value.value  });
    this.setState({ levelDDSelected: value == null ? value : value.value }, levelDDSelected => {
      this.props.dispatch(
        populateAclMngLevelDDSelected(this.state.levelDDSelected)
      );
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.moduleDDSelected !== this.props.moduleDDSelected) {
      this.setState({
        levelDDSelected: this.props.moduleDDSelected || ""
      });
    }

    if (
      prevProps.reloadLevelmngLevelList !== this.props.reloadLevelmngLevelList
    ) {
      this.setState(
        {
          reloadLevelmngLevelList: this.props.reloadLevelmngLevelList
        },
        () => {
          this.loadModuleDD();
        }
      );
    }
  }

  render() {
    const { levelDD, levelDDSelected } = this.state;
    const optionItems = levelDD;

    return (
      <div style={{width:200}}>
      <Select
        id="Module_Name_DD"
        name="Module_Name_DD"
        ref="Module_Name_DD"
        value={levelDDSelected || ""}
        options={optionItems}
        onChange={this.handleChange}
        required={`required`}
      />
      </div>
    );
  }
}

AddProcessSelectLevelComp.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  levelDD: state.aclManageProcess.levelDD,
  levelDDSelected: state.aclManageProcess.levelDDSelected,
  reloadLevelmngLevelList: state.levelManageProcess.reloadLevelmngLevelList
});

export default connect(mapStateToProps)(AddProcessSelectLevelComp);
