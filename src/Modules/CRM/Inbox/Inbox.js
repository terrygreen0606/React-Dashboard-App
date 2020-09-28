import React, { Component } from "react";
import { Button, ButtonGroup, Tooltip } from "reactstrap";
import parse from "html-react-parser";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toastAction } from "../../../store/actions/toast-actions";
import { emailService } from "../../../services/crm/emailService";

class Inbox extends Component {
  constructor(props) {
    super(props);

    this.apiService = new emailService();

    this.state = {
      loading: true,
      inbox: [],
      trashingAll: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const status = this.props.location.pathname.includes("messages")
        ? "message_inbox"
        : "email_inbox";
      const inbox = await this.apiService.get(status);
      this.setState({ inbox });
    } catch (err) {
      // toastAction(false, "Something unexpected happened");
    }
    this.setState({ loading: false });
  }

  toggle = (target) => {
    this.setState({ ...this.state, [target]: !this.state[target] });
  };

  trashMessages = async (id) => {
    id
      ? this.setState({ [id]: !this.state[id] })
      : this.setState({ trashingAll: true });
    try {
      const response = await this.apiService.trashMessages(id, 1);
      id
        ? this.setState({
            inbox: this.state.inbox.filter((email) => email.id !== id),
          })
        : this.setState({ inbox: [] });
      toastAction(response.success, response.message);
    } catch (err) {
      toastAction(false, "Something unexpected happened");
    }
    id
      ? this.setState({ [id]: !this.state[id] })
      : this.setState({ trashingAll: false });
  };

  toggleRead = async (id) => {
    try {
      const response = await this.apiService.toggleRead(id);
      toastAction(response.success, response.message);
    } catch (err) {
      toastAction(false, "Something unexpected happened");
    }
  };

  confirmDelete = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h4>Are you sure?</h4>
            <p>You are about to delete {id ? "this" : "all"}.</p>
            <button
              className="badge badge-red"
              onClick={() => {
                this.trashMessages(id);
                onClose();
              }}
            >
              Yes
            </button>
            <button className="badge badge-blue" onClick={onClose}>
              No
            </button>
          </div>
        );
      },
    });
  };

  render() {
    const loading = (
      <div className="animated fadeIn pt-1 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
      </div>
    );
    return (
      <div className="animated fadeIn" style={{ width: "100%" }}>
        {this.state.loading ? (
          loading
        ) : (
          <main className="inbox">
            <div className="toolbar d-flex justify-content-between">
              <h3>
                {this.props.location.pathname.includes("messages")
                  ? "Message"
                  : "Email"}{" "}
                Inbox
              </h3>
              <ButtonGroup>
                <Button
                  color="light"
                  onClick={() => this.confirmDelete()}
                  disabled={this.state.trashingAll || !this.state.inbox.length}
                >
                  <span className="fa fa-trash-o"></span>{" "}
                  {this.state.trashingAll ? "Deleting..." : "Empty Inbox"}
                </Button>
              </ButtonGroup>
            </div>

            <ul className="messages">
              {this.state.inbox.map((email) => (
                <li
                  className={email.is_checked ? "message" : "message unread"}
                  key={email.id}
                >
                  <div className="header">
                    <span className="from">From: {email.from_user_name}</span>
                    <span className="date">
                      <ButtonGroup>
                        <Button
                          color="light"
                          id={`trash-${email.id}`}
                          onClick={() => this.confirmDelete(email.id)}
                          disabled={this.state[email.id]}
                        >
                          <span
                            className={
                              this.state[email.id]
                                ? "fa fa-spinner"
                                : "fa fa-trash-o"
                            }
                          ></span>
                        </Button>
                        <Button
                          color="light"
                          id={`unread-${email.id}`}
                          onClick={() => this.toggleRead(email.id)}
                        >
                          <span className="fa fa-envelope-o"></span>
                        </Button>
                      </ButtonGroup>
                      {"   "}
                      {moment(email.updated_at).format("MMMM Do YYYY, h:mm:ss")}
                    </span>
                    <Tooltip
                      placement="bottom"
                      isOpen={this.state[`trash-${email.id}`]}
                      target={`trash-${email.id}`}
                      toggle={() => this.toggle(`trash-${email.id}`)}
                    >
                      Delete
                    </Tooltip>
                    <Tooltip
                      placement="bottom"
                      isOpen={this.state[`unread-${email.id}`]}
                      target={`unread-${email.id}`}
                      toggle={() => this.toggle(`unread-${email.id}`)}
                    >
                      Mark As {email.is_checked ? "Unread" : "Read"}
                    </Tooltip>
                  </div>
                  <div className="title">{email.subject}</div>
                  <div className="description">{parse(email.content)}</div>
                </li>
              ))}
            </ul>
          </main>
        )}
      </div>
    );
  }
}

export default Inbox;
