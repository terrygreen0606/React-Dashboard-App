import React from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// import './trbg.css';
export default class DefaultPolicyDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  onMouseEnter() {
    this.setState({ dropdownOpen: true });
  }

  onMouseLeave() {
    this.setState({ dropdownOpen: false });
  }

  render() {
    return (
      <Dropdown className="d-inline-block" onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle className="trbg nav-bt">
          Policy
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem tag={NavLink} to="/policy/search">Search Quote/Policy</DropdownItem>
          <DropdownItem>Create New Quote/Bind</DropdownItem>
          <DropdownItem>Inspection Quote/Policy</DropdownItem>
          <DropdownItem>Audit Quote/Policy</DropdownItem>
          <DropdownItem>Complex Management Quote/Policy</DropdownItem>
          <DropdownItem>Transfer Book Of Buisness</DropdownItem>
          <DropdownItem tag={NavLink} to="/creatquote">New Quote</DropdownItem>
          <DropdownItem tag={NavLink} to="/policy/applicant">Applicant</DropdownItem>
          <DropdownItem tag={NavLink} to="/quoteEntryView">Quote Entry</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
