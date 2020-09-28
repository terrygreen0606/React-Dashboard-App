import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
  currentComponent: PropTypes.string
};

const defaultProps = {};

class DefaultAside extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
      </React.Fragment>
    );
    
  }
}

DefaultAside.propTypes = propTypes;
DefaultAside.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  currentComponent: state.common.component
})

export default connect(mapStateToProps)(DefaultAside);
