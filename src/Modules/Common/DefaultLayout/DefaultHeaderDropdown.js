import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
} from "reactstrap";
import { NotificationService } from "../../../services/crm/notificationService";

const propTypes = {
  accnt: PropTypes.bool,
};
const defaultProps = {
  accnt: false,
};

class DefaultHeaderDropdown extends Component {
  constructor(props) {
    super(props);

    this.apiService = new NotificationService();

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      notifications: [],
    };
  }

  async componentDidMount() {
    try {
      const notifications = await this.apiService.get(this.props.userID);
      this.setState({ notifications });
    } catch (err) {}
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  viewNotif = async (id) => {
    try {
      await this.apiService.viewNotif(id);
      this.setState({
        notifications: this.state.notifications.filter(
          (notif) => notif.id !== id
        ),
      });
    } catch (err) {}
  };

  dropNotif() {
    const itemsCount = this.state.notifications.length;
    if (itemsCount) {
      return (
        <Dropdown
          nav
          className="d-md-down-none"
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
        >
          <DropdownToggle nav>
            <i className="icon-bell"></i>
            <Badge pill color="danger">
              {itemsCount}
            </Badge>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem header tag="div" className="text-center">
              <strong>You have {itemsCount} notifications</strong>
            </DropdownItem>
            {this.state.notifications.map((notif) => (
              <DropdownItem
                key={notif.id}
                onClick={() => this.viewNotif(notif.id)}
              >
                <i className="icon-envelope-open text-success"></i>{" "}
                {notif.content + "(" + notif.count + ")"}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      );
    } else return null;
  }

  dropAccnt() {
    return (
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <img
            src={"/assets/img/avatars/6.jpg"}
            className="img-avatar"
            alt="admin@bootstrapmaster.com"
          />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            <i className="fa fa-user"></i> Profile
          </DropdownItem>
          <DropdownItem onClick={this.props.onLogout}>
            <i className="fa fa-lock"></i> Logout
          </DropdownItem>
          {/*<DropdownItem><i className="fa fa-lock"></i> Logout</DropdownItem>*/}
        </DropdownMenu>
      </Dropdown>
    );
  }

  render() {
    const { accnt, notif } = this.props;
    return accnt ? this.dropAccnt() : notif ? this.dropNotif() : null;
  }
}

const mapStateToProps = (state) => ({
  userID: state.Auth.user.Admin_ID,
});

DefaultHeaderDropdown.propTypes = propTypes;
DefaultHeaderDropdown.defaultProps = defaultProps;

export default connect(mapStateToProps)(DefaultHeaderDropdown);
