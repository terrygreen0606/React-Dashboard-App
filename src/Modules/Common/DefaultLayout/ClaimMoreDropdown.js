import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// import './trbg.css';
export default class ClaimMoreDropdown extends React.Component {
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
          More
        </DropdownToggle>
        <DropdownMenu className="dropdwnright">
          <DropdownItem>Manage Truck</DropdownItem>
          <DropdownItem>Claim Manager Mapping</DropdownItem>
          <DropdownItem>Claim Emails List</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}