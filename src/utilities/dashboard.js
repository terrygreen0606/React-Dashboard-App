import { Bar, Line } from "react-chartjs-2";

// Roles
export const ADMIN = {
  roleTemplate: 1,
  role: "NEWADMIN",
  url: "claimDashboard",
};

export const NEWCLAIM = {
  roleTemplate: 1,
  role: "CLAIM",
  url: "claimDashboard",
};

export const CUSTOMER = {
  roleTemplate: 2,
  role: "CUSTOMER",
  url: "customerDashboard",
};

export const ACCOUNTING = {
  roleTemplate: 3,
  role: "ACCOUNTING",
  url: "accountingDashboard",
};

export const UNDERWRITING = {
  roleTemplate: 4,
  role: "UW",
  url: "underwritingDashboard",
};

export const LEGAL = { roleTemplate: 5, role: "LEGAL", url: "legalDashboard" };

const roles = [ADMIN, NEWCLAIM, CUSTOMER, ACCOUNTING, UNDERWRITING, LEGAL];

export const checkAdmin = (role) => {
  return ADMIN.role === role;
};

export const matchRole = (role) => {
  return roles.find((i) => i.role === role) || roles[0];
};

export const matchUrl = (url) => {
  return roles.find((i) => i.url === url) || roles[0];
};

// Card Chart Variables
export const matchCards = (roleTemplate) => {
  const claimLegalCard = [
    {
      id: 1,
      title: "Performance Score",
      key: "performanceScore",
      color: "info",
      component: Line,
    },
    { id: 2, title: "Notes", key: "note", color: "primary", component: Line },
    {
      id: 3,
      title: "Payouts",
      key: "payout",
      color: "warning",
      component: Line,
    },
    {
      id: 4,
      title: "Deductibles",
      key: "deductible",
      color: "danger",
      component: Bar,
    },
  ];

  const customerCard = [
    { id: 1, title: "Answered Calls", key: "answeredCalls", color: "info" },
    { id: 2, title: "Missed Calls", key: "missedCalls", color: "primary" },
    { id: 3, title: "Outbound Calls", key: "outBountCalls", color: "warning" },
    {
      id: 4,
      title: "Total Time on the Phones",
      key: "totalTime",
      color: "danger",
    },
  ];

  const accountingCard = [
    {
      id: 1,
      title: "New Payments Received",
      key: "newPayments",
      color: "info",
    },
    {
      id: 2,
      title: "Pending Payments",
      key: "pendingPayments",
      color: "primary",
    },
    {
      id: 3,
      title: "Printed Payments",
      key: "printedPayments",
      color: "warning",
    },
    {
      id: 4,
      title: "Total Printed Payments",
      key: "totalPrinted",
      color: "danger",
    },
  ];

  const underwritingCard = [
    {
      id: 1,
      title: "Performance Score",
      key: "performanceScore",
      color: "info",
      component: Line,
    },
    {
      id: 2,
      title: "Claims Req",
      key: "claimsReq",
      color: "primary",
      component: Line,
    },
    {
      id: 3,
      title: "New Business",
      key: "newBusiness",
      color: "warning",
      component: Line,
    },
    {
      id: 4,
      title: "Inforce",
      key: "inforce",
      color: "danger",
      component: Bar,
    },
  ];

  const cards = {
    [NEWCLAIM.roleTemplate]: claimLegalCard,
    [CUSTOMER.roleTemplate]: customerCard,
    [ACCOUNTING.roleTemplate]: accountingCard,
    [UNDERWRITING.roleTemplate]: underwritingCard,
    [LEGAL.roleTemplate]: claimLegalCard,
  };

  return cards[roleTemplate];
};

// Metrics Plain Chart Variables
export const matchMetrics = (roleTemplate) => {
  const claimLegal = {
    url: "closureDisplay",
    types: [
      { title: "This Year", key: "thisYearCount", color: "success" },
      { title: "This Quarter", key: "thisQuarterCount", color: "primary" },
      { title: "This Month", key: "thisMonthCount", color: "warning" },
      { title: "Last Week", key: "lastWeekCount", color: "danger" },
      { title: "This Week", key: "thisWeekCount", color: "info" },
    ],
  };

  const customer = {
    url: "",
    types: [
      { title: "Pending Renewals", key: "pendingRenewals", color: "success" },
      {
        title: "Pending Return Mail",
        key: "pendingReturnMail",
        color: "primary",
      },
      { title: "Pending Permits", key: "pendingPermits", color: "warning" },
      {
        title: "Pending Non Pay Calls",
        key: "pendingNonPayCalls",
        color: "danger",
      },
      {
        title: "Pending Short Pay Calls",
        key: "pendingShortPayCalls",
        color: "info",
      },
    ],
  };

  const accounting = {
    url: "",
    types: [
      { title: "Claims Expense", key: "claimsExpense", color: "success" },
      { title: "GAE", key: "gae", color: "primary" },
      { title: "Legal Expense", key: "legalExpense", color: "warning" },
      { title: "Other Legal", key: "otherLegal", color: "danger" },
      { title: "Mitigation", key: "mitigation", color: "info" },
    ],
  };

  const underwriting = {
    url: "",
    types: [
      { title: "Renewals", key: "renewals", color: "success" },
      { title: "Permits", key: "permits", color: "primary" },
      { title: "Mortgage Changes", key: "mortgageChanges", color: "warning" },
      { title: "BOA", key: "boa", color: "danger" },
      { title: "Total", key: "total", color: "info" },
    ],
  };

  const metrics = {
    [NEWCLAIM.roleTemplate]: claimLegal,
    [CUSTOMER.roleTemplate]: customer,
    [ACCOUNTING.roleTemplate]: accounting,
    [UNDERWRITING.roleTemplate]: underwriting,
    [LEGAL.roleTemplate]: claimLegal,
  };

  return metrics[roleTemplate];
};

// Identify url and variables for DataTable Pagination
export const identify = (identifier) => {
  // If identifier === 1, Call Recorder
  const callRecorderHeaders = {
    url: "claimsHealth",
    fields: {
      ClaimId_PK: "Claim No",
      description: "Description",
      s_PhoneNumber: "Phone Number",
      last_viewed: "Last Viewed",
      white_glove_service: "White Glove Service",
      last_documented: "Last Documented",
      last_called_on: "Last Called On",
    },
  };

  // If identifier === 2, Contact Recorder
  const contactRecorderHeaders = {
    url: "",
    fields: {
      policyNo: "Policy Number",
      policyType: "Policy Type",
      agencyName: "Agency Name",
      agencyPhone: "Agency Phone",
      last_viewed: "Last Viewed",
      policyStatus: "Policy Status",
      agencyStatus: "Agency Status",
      last_documented: "Last Documented",
      lastCalledAgency: "Last Called Agency",
    },
  };

  // If identifier === 3, Claim Payments
  const claimPaymentsHeaders = {
    url: "",
    fields: {
      claimNo: "Claim No",
      transType: "Trans Type",
      transSubType: "Trans Sub Type",
      date: "Date",
      plus: "+",
      minus: "-",
      insertedUser: "Inserted User",
      status: "Status",
    },
  };

  // If identifier === 4, Policy Expense
  const policyExpenseHeaders = {
    url: "",
    fields: {
      policyNo: "Policy No",
      transType: "Trans Type",
      transSubType: "Trans Sub Type",
      date: "Date",
      plus: "+",
      minus: "-",
      insuredName: "Insured Name",
      status: "Status",
    },
  };

  // If identifier === 5, Litigation Health
  const litigationHealthHeaders = {
    url: "litigationHealth",
    fields: {
      Claim_No: "Claim No",
      claimType: "Claim Type",
      caseType: "Type of Case",
      complaintDate: "Complaint Date",
      lastViewed: "Last Viewed",
      lastDocumented: "Last Documented",
      ocPhoneNumber: "OC Phone Number",
      last_called_on: "Last Called On",
    },
  };

  // If identifier === 6, General Legal
  const legalFilesHeaders = {
    url: "generalLegal",
    fields: {
      Claim_No: "Claim No",
      claimType: "Type of Claim",
      caseType: "Type of Case",
      complaintDate: "Complaint Date",
      lastViewed: "Last Viewed",
      lastDocumented: "Last Documented",
      defenseCounsel: "Defense Counsel",
      dcPhoneNumber: "DC Phone Number",
    },
  };

  // If identifier === 7, Quality History
  const qualityHistoryHeaders = {
    url: "",
    fields: {
      performedBy: "Performed By",
      score: "Score",
      date: "Date",
      successAreas: "Areas of Success",
      improveAreas: "Areas of Improvement",
    },
  };

  // 1: CallRecorder, 2: ContactRecorder, 3: Claim Payments, 4: Policy Expense, 5: Litigation Health, 6: Legal Files, 7: Quality History
  const headers = {
    1: callRecorderHeaders,
    2: contactRecorderHeaders,
    3: claimPaymentsHeaders,
    4: policyExpenseHeaders,
    5: litigationHealthHeaders,
    6: legalFilesHeaders,
    7: qualityHistoryHeaders,
  };

  return headers[identifier];
};
