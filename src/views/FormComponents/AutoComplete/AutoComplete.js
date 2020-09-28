import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: props.value || '',
      change: false
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value && !prevState.change) {
      return {
        userInput: nextProps.value,
      };
    }
    return prevState
  }
  onChange = (e) => {
    const { options, search } = this.props;
    const userInput = e.currentTarget.value;
    const filteredOptions = options && options.filter(
      (option) => (option[this.props.name] || '').toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    this.setState({
      activeOption: 0,
      filteredOptions: filteredOptions,
      showOptions: true,
      userInput,
      change: true
    });
    search(userInput);
  };
  onClick = (val) => {
    this.setState({
      activeOption: 0,
      filteredOption: [],
      showOptions: false,
      userInput: val[this.props.name]
    });
    this.props.selection(val)
  };
  onKeyDown = (e) => {
    const { activeOption, filteredOptions } = this.state;
    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showSuggestions: false,
        userInput: filteredOptions[activeOption]
      });
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption - 1 === filteredOptions.length) {
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };
  render() {
    const {
      onChange,
      onKeyDown,
      onClick,
      state: { activeOption, filteredOptions, showOptions, userInput },
      props
    } = this;
    let optionList;
    if (showOptions) {
    if (filteredOptions && filteredOptions.length) {
        optionList = (
          <div className="auto-complete">
            <ul>
              {filteredOptions.map((val, index) => {
                let className;
                if (index === activeOption) {
                  className = 'option-active';
                }
                return (
                  <li className={className} key={val[props.name]} onClick={() => onClick(val)}>
                    {val[props.name]}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      } else {
        optionList = (
          <div className="auto-complete">
           {props.link ? <Link to={props.link}>{props.linkText}</Link> : <em>No Option!</em>} 
          </div>
        );
      }
    }
    return (
      <React.Fragment>
        <div className="search">
          <input
            type="text"
            autoComplete="off"
            className="form-control"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
            onFocus={onChange}
            placeholder={props.placeholder}
          />
          {optionList}
        </div>
      </React.Fragment>
    );
  }
}

Autocomplete.propTypes = {
  options: PropTypes.array.isRequired,
  selection: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  link: PropTypes.string,
  linkText: PropTypes.string
};

Autocomplete.defaultProps = {
  search: () => false,
  value: '',
  name: '',
  placeholder: 'Enter Value',
  link: '',
  linkText: ''
};

export default Autocomplete;
