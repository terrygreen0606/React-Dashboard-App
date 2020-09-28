import React from "react";

// Email Routes
const Inbox = React.lazy(() => import("./Inbox"));
const Sent = React.lazy(() => import("./Sent"));
const Trash = React.lazy(() => import("./Trash"));
const Drafts = React.lazy(() => import("./Drafts"));
const Compose = React.lazy(() => import("./Compose"));

const routes = [
  {
    path: "/crm",
    exact: true,
    name: "Inbox",
    component: Inbox,
  },
  {
    path: "/crm/emails/sent",
    exact: true,
    name: "Sent",
    component: Sent,
  },
  {
    path: "/crm/emails/trash",
    exact: true,
    name: "Trash",
    component: Trash,
  },
  {
    path: "/crm/emails/drafts",
    exact: true,
    name: "EmailDrafts",
    component: Drafts,
  },
  {
    path: "/crm/compose/:id",
    exact: true,
    name: "ComposeOne",
    component: Compose,
  },
  {
    path: "/crm/compose",
    exact: true,
    name: "Compose",
    component: Compose,
  },
  {
    path: "/crm/messages",
    exact: true,
    name: "MessageInbox",
    component: Inbox,
  },
  {
    path: "/crm/messages/sent",
    exact: true,
    name: "MessageSent",
    component: Sent,
  },
  {
    path: "/crm/messages/trash",
    exact: true,
    name: "MessageTrash",
    component: Trash,
  },
  {
    path: "/crm/messages/drafts",
    exact: true,
    name: "MessageDrafts",
    component: Drafts,
  },
];

export default routes;
