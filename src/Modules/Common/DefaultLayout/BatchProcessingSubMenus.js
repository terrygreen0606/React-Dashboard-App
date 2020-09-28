import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
// import './trbg.css';
export default class BatchProcessingSubMenus extends React.Component {
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
      <React.Fragment>
        <Dropdown group className="d-inline-block" tab="DropdownItem" onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle className="trbg nav-bt">
            Batch Processing
        </DropdownToggle>
          <DropdownMenu className="dropdwnright">
            <DropdownItem tag={NavLink} to="/batchTransEntry">Batch Transaction Entry</DropdownItem>
            <DropdownItem tag={NavLink} to="/batchInvoice">Batch Invoice</DropdownItem>
            <DropdownItem tag={NavLink} to="/generateCommission">Generate Commission</DropdownItem>
            <DropdownItem tag={NavLink} to="/lockBoxImportBOA">LockBox Import BOA</DropdownItem>
            <DropdownItem>LockBox Import BU</DropdownItem>
            <DropdownItem>Renewal Remind Notice</DropdownItem>
            <DropdownItem>BOA Reconciliations</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    );
  }

}