import React, { Component } from "react";


class OverloadingBlockHp extends Component {
  constructor(props) {
    super(props);
    this.loadingVariableOfProps = this.props.loadingStateKey;    
  }

  render() {
    
    return (
      <div>
        <Loader loading={this.props.loadingVariableOfProps} />
      </div>
    );
  }
}

export default OverloadingBlockHp;
