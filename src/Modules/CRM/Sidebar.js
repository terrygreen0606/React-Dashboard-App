import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Nav, NavItem, Badge } from "reactstrap";
import { emailService } from "../../services/crm/emailService";

const Sidebar = () => {
  const [apiService] = useState(new emailService());

  const [counts, setCounts] = useState({});

  useEffect(() => {
    apiService
      .getCounts()
      .then(
        ({
          email_inbox,
          email_sent,
          email_deleted,
          email_draft,
          message_inbox,
          message_sent,
          message_deleted,
          message_draft,
        }) => {
          setCounts({
            email_inbox: email_inbox.length,
            email_inbox_unread: email_inbox.filter(
              (email) => email.is_checked !== 1
            ).length,
            email_sent: email_sent.length,
            email_deleted: email_deleted.length,
            email_draft: email_draft.length,
            message_inbox: message_inbox.length,
            message_inbox_unread: message_inbox.filter(
              (message) => message.is_checked !== 1
            ).length,
            message_sent: message_sent.length,
            message_deleted: message_deleted.length,
            message_draft: message_draft.length,
          });
        }
      )
      .catch((err) => {});
  }, [apiService]);

  return (
    <nav>
      <Link to="/crm/compose" className="btn btn-danger btn-block">
        <i className="fa fa-plus"></i> Compose New
      </Link>
      <h5 className="text-center">Emails</h5>
      <Nav>
        <NavItem>
          <NavLink to="/crm" className="nav-link">
            <i className="fa fa-inbox"></i> Inbox{" "}
            {counts.email_inbox_unread !== undefined &&
              counts.email_inbox !== undefined && (
                <Badge color="success">
                  {counts.email_inbox_unread + " / " + counts.email_inbox}
                </Badge>
              )}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/crm/emails/sent" className="nav-link">
            <i className="fa fa-rocket"></i> Sent
            <Badge color="info">{counts.email_sent}</Badge>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/crm/emails/trash" className="nav-link">
            <i className="fa fa-trash-o"></i> Trash
            <Badge color="danger">{counts.email_deleted}</Badge>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/crm/emails/drafts" className="nav-link">
            <i className="fa fa-edit"></i> Drafts
            <Badge color="warning">{counts.email_draft}</Badge>
          </NavLink>
        </NavItem>
      </Nav>

      <h5 className="text-center mt-3">Messages</h5>
      <Nav>
        <NavItem>
          <NavLink to="/crm/messages" className="nav-link">
            <i className="fa fa-inbox"></i> Inbox{" "}
            {counts.message_inbox_unread !== undefined &&
              counts.message_inbox !== undefined && (
                <Badge color="success">
                  {counts.message_inbox_unread + " / " + counts.message_inbox}
                </Badge>
              )}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/crm/messages/sent" className="nav-link">
            <i className="fa fa-rocket"></i> Sent
            <Badge color="info">{counts.message_sent}</Badge>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/crm/messages/trash" className="nav-link">
            <i className="fa fa-trash-o"></i> Trash
            <Badge color="danger">{counts.message_deleted}</Badge>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/crm/messages/drafts" className="nav-link">
            <i className="fa fa-edit"></i> Drafts
            <Badge color="warning">{counts.message_draft}</Badge>
          </NavLink>
        </NavItem>
      </Nav>
    </nav>
  );
};

export default Sidebar;
