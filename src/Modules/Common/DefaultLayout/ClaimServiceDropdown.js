import React from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ClaimMoreDropdown from './ClaimMoreDropdown';
// import './trbg.css';
export default class ClaimServiceDropdown extends React.Component {
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
          Claim
        </DropdownToggle>
        <DropdownMenu>          
          <DropdownItem tag={NavLink} to="/claims">Search Claim</DropdownItem>
          <DropdownItem>Search EPIC Claim</DropdownItem>
          <DropdownItem>Search AvatarIns Claim</DropdownItem>
          <DropdownItem>Approve Payment</DropdownItem>
          <DropdownItem>Review Claim</DropdownItem>
          <DropdownItem>Claim Estimation</DropdownItem>
          <DropdownItem>Claim Bonus</DropdownItem>
          <DropdownItem>Claim Inspection</DropdownItem>
          <DropdownItem>Contractor  Inspection</DropdownItem>
          <DropdownItem>Legal</DropdownItem>
          <DropdownItem tag={NavLink} to="/claimintake">Claim Intake</DropdownItem>
          <DropdownItem tag={NavLink} to="/claimview">Claim View</DropdownItem>
          <DropdownItem tag={NavLink} to="/claimsearch">New Search Claim</DropdownItem>
          <ClaimMoreDropdown/>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
