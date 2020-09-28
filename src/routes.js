import React from "react";
import Epcic from "./Modules/Policy/Epcic/Epcic";
import SearchPolicy from "./Modules/Policy/SearchPolicy/SearchPolicy";
import { Polygon } from "react-google-maps";
import {
  NEWCLAIM,
  CUSTOMER,
  ACCOUNTING,
  UNDERWRITING,
  LEGAL,
} from "./utilities/dashboard";

const GenerateCommission = React.lazy(() =>
  import("./Modules/Accounting/BatchProcess/GenerateCommission")
);
const Applicant = React.lazy(() => import("./Modules/Policy/Applicant"));
const CodeEditors = React.lazy(() => import("./views/Editors/CodeEditors"));
const TextEditors = React.lazy(() => import("./views/Editors/TextEditors"));

const Compose = React.lazy(() => import("./views/Apps/Email/Compose"));
const Inbox = React.lazy(() => import("./views/Apps/Email/Inbox"));
const Message = React.lazy(() => import("./views/Apps/Email/Message"));
const Invoice = React.lazy(() => import("./views/Apps/Invoicing/Invoice"));

const AdvancedForms = React.lazy(() => import("./views/Forms/AdvancedForms"));
const BasicForms = React.lazy(() => import("./views/Forms/BasicForms"));
const ValidationForms = React.lazy(() =>
  import("./views/Forms/ValidationForms")
);
const GoogleMaps = React.lazy(() => import("./views/GoogleMaps"));
const Toastr = React.lazy(() => import("./views/Notifications/Toastr"));
const Calendar = React.lazy(() => import("./views/Plugins/Calendar"));
const Draggable = React.lazy(() => import("./views/Plugins/Draggable"));
const Spinners = React.lazy(() => import("./views/Plugins/Spinners"));
const DataTable = React.lazy(() => import("./views/Tables/DataTable"));
const Tables = React.lazy(() => import("./views/Tables/Tables"));
const LoadingButtons = React.lazy(() =>
  import("./views/Buttons/LoadingButtons")
);

const Breadcrumbs = React.lazy(() => import("./views/Base/Breadcrumbs"));
const Cards = React.lazy(() => import("./views/Base/Cards"));
const Carousels = React.lazy(() => import("./views/Base/Carousels"));
const Collapses = React.lazy(() => import("./views/Base/Collapses"));
const Dropdowns = React.lazy(() => import("./views/Base/Dropdowns"));

const Jumbotrons = React.lazy(() => import("./views/Base/Jumbotrons"));
const ListGroups = React.lazy(() => import("./views/Base/ListGroups"));
const Navbars = React.lazy(() => import("./views/Base/Navbars"));
const Navs = React.lazy(() => import("./views/Base/Navs"));
const Paginations = React.lazy(() => import("./views/Base/Paginations"));
const Popovers = React.lazy(() => import("./views/Base/Popovers"));
const ProgressBar = React.lazy(() => import("./views/Base/ProgressBar"));
const SpinnersB4 = React.lazy(() => import("./views/Base/Spinners"));
const Switches = React.lazy(() => import("./views/Base/Switches"));

const Tabs = React.lazy(() => import("./views/Base/Tabs"));
const Tooltips = React.lazy(() => import("./views/Base/Tooltips"));
const BrandButtons = React.lazy(() => import("./views/Buttons/BrandButtons"));
const ButtonDropdowns = React.lazy(() =>
  import("./views/Buttons/ButtonDropdowns")
);
const ButtonGroups = React.lazy(() => import("./views/Buttons/ButtonGroups"));
const Buttons = React.lazy(() => import("./views/Buttons/Buttons"));
const Charts = React.lazy(() => import("./views/Charts"));
const CoreUIIcons = React.lazy(() => import("./views/Icons/CoreUIIcons"));
const Flags = React.lazy(() => import("./views/Icons/Flags"));
const FontAwesome = React.lazy(() => import("./views/Icons/FontAwesome"));
const SimpleLineIcons = React.lazy(() =>
  import("./views/Icons/SimpleLineIcons")
);
const Alerts = React.lazy(() => import("./views/Notifications/Alerts"));
const Badges = React.lazy(() => import("./views/Notifications/Badges"));
const Modals = React.lazy(() => import("./views/Notifications/Modals"));
const Colors = React.lazy(() => import("./views/Theme/Colors"));
const Typography = React.lazy(() => import("./views/Theme/Typography"));
const Widgets = React.lazy(() => import("./views/Widgets/Widgets"));
const Users = React.lazy(() => import("./views/Users/Users"));
const User = React.lazy(() => import("./views/Users/User"));
////// Avatar Insurance System //////
const Dashboard = React.lazy(() => import("./Modules/Dashboard"));

const ProducerContainer = React.lazy(() =>
  import("./Modules/Producer/ProducerContainer")
);
const ProducerViewContainer = React.lazy(() =>
  import("./Modules/Producer_View/ProducerContainer")
);
const AddEditAccountType = React.lazy(() =>
  import("./Modules/Accounting/ManageAccountType/AddEditAccountType")
);
const AccountTypeList = React.lazy(() =>
  import("./Modules/Accounting/ManageAccountType")
);
const AddEditAccount = React.lazy(() =>
  import("./Modules/Accounting/ManageAccount/AddEditAccount")
);
const AccountsList = React.lazy(() =>
  import("./Modules/Accounting/ManageAccount")
);
const AccountsLedger = React.lazy(() =>
  import("./Modules/Accounting/ManageAccount/AccountLedger")
);
const AddEditVendor = React.lazy(() =>
  import("./Modules/Accounting/ManageVender/AddEditVender")
);
const VendorList = React.lazy(() =>
  import("./Modules/Accounting/ManageVender")
);
const InvoiceList = React.lazy(() =>
  import("./Modules/Accounting/ManageVender/invoiceList")
);
const SaveInvoice = React.lazy(() =>
  import("./Modules/Accounting/ManageVender/invoice")
);
const Credit = React.lazy(() =>
  import("./Modules/Accounting/ManageVender/credit")
);
const PayBill = React.lazy(() =>
  import("./Modules/Accounting/ManageVender/BillPayment")
);
const BankingList = React.lazy(() => import("./Modules/Accounting/Banking"));
const MakeDeposits = React.lazy(() =>
  import("./Modules/Accounting/Banking/MakeDeposits")
);
const TransferFunds = React.lazy(() =>
  import("./Modules/Accounting/Banking/TransferFunds")
);
const WriteCheck = React.lazy(() =>
  import("./Modules/Accounting/Banking/WriteCheck")
);
const Reconcile = React.lazy(() =>
  import("./Modules/Accounting/Banking/Reconcile")
);
const ReconcileBank = React.lazy(() =>
  import("./Modules/Accounting/Banking/ReconcileBank")
);
const Transactions = React.lazy(() =>
  import("./Modules/Accounting/ManageVender/transactions")
);
const GeneralEntry = React.lazy(() =>
  import("./Modules/Accounting/ManageAccount/GeneralEntry")
);
const SearchTransaction = React.lazy(() =>
  import("./Modules/Accounting/ManageAccount/SearchTransaction")
);
const PrintCheck = React.lazy(() =>
  import("./Modules/Accounting/Banking/PrintCheck")
);
const AccountingDashboard = React.lazy(() =>
  import("./Modules/Accounting/AccountingDashboard")
);
// const Commission = React.lazy(() => import('./Modules/Producer/Commission'));
// const Logs = React.lazy(() => import('./Modules/Producer/Logs'));
// const UpdatedLogs = React.lazy(() => import('./Modules/Producer/UpdatedLogs'));
// const AgencyVisitReview = React.lazy(() => import('./Modules/Producer/AgencyVisitReview'));
// const Association = React.lazy(() => import('./Modules/Producer/Association'));

const Claims = React.lazy(() => import("./Modules/Claims/Claims"));
const Claimsearch = React.lazy(() => import("./Modules/Claims/claimsearch"));
const Claimview = React.lazy(() => import("./Modules/Claims/claimview"));
const ClaimAdd = React.lazy(() => import("./Modules/Claims/ClaimAdd"));
const Claim = React.lazy(() => import("./Modules/Claims/Claim"));
const ClaimIntake = React.lazy(() => import("./Modules/Claims/ClaimIntake"));
const Questionnaires = React.lazy(() =>
  import("./Modules/Questionnaires/Questionnaires")
);
const Questionnaire = React.lazy(() =>
  import("./Modules/Questionnaires/Questionnaire")
);

//Search Client
const SearchClient = React.lazy(() =>
  import("./Modules/ClientManagement/SearchClient")
);
const AddClient = React.lazy(() =>
  import("./Modules/ClientManagement/AddClient")
);

//FormStyle -- Santosh
const FormStyle = React.lazy(() => import("./views/Forms/FormStyle"));
const CreatQuote = React.lazy(() => import("./Modules/Centauri/CreatQuote"));

// Accounting Batch Process
const BatchTransEntry = React.lazy(() =>
  import("./Modules/Accounting/BatchProcess/BatchTransEntry/BatchTransEntry")
);
const BatchInvoice = React.lazy(() =>
  import("./Modules/Accounting/BatchProcess/BatchInvoice")
);
const LockBoxImportBOA = React.lazy(() =>
  import("./Modules/Accounting/BatchProcess/LockBoxImportBOA")
);
const RenewalNotice = React.lazy(() =>
  import(
    "./Modules/Accounting/BatchProcess/RenewalRemindNotice/RenewalNotice.js"
  )
);

/**
 * Administration Module
 */
const Admindashboard = React.lazy(() =>
  import("./Modules/Administration/Admindashboard")
);
const UserProfileNavs = React.lazy(() =>
  import("./Modules/Administration/UserProfile/UserProfileNavs")
);
const PaymentPlan = React.lazy(() =>
  import("./Modules/Administration/PaymentPlan")
);
const DocumentHandler = React.lazy(() =>
  import("./Modules/Administration/DocumentHandler")
);
const DocumentUploader = React.lazy(() =>
  import("./Modules/Administration/DocumentUploader")
);
const GmapViewRule = React.lazy(() =>
  import("./Modules/Administration/GMapPolygon/Rule/ViewRule")
);
const GMapPolygon = React.lazy(() =>
  import("./Modules/Administration/GMapPolygon")
);
const CreateGroup = React.lazy(() =>
  import("./Modules/Administration/GMapPolygon/Group/CreateGroup")
);
const EditGroup = React.lazy(() =>
  import("./Modules/Administration/GMapPolygon/Group/EditGroup")
);

const PolicyValidationRule = React.lazy(() =>
  import(
    "./Modules/Administration/ValidationRule/PolicyValidationRule/ViewRule"
  )
);
const CreatePolicyValidationRule = React.lazy(() =>
  import(
    "./Modules/Administration/ValidationRule/PolicyValidationRule/CreateRule"
  )
);
const EditPolicyValidationRule = React.lazy(() =>
  import(
    "./Modules/Administration/ValidationRule/PolicyValidationRule/CreateRule"
  )
);
const CreatePolicyValidationGroup = React.lazy(() =>
  import(
    "./Modules/Administration/ValidationRule/PolicyValidationGroup/CreateGroup"
  )
);
const ViewPolicyValidationGroup = React.lazy(() =>
  import(
    "./Modules/Administration/ValidationRule/PolicyValidationGroup/ViewGroup"
  )
);

const ViewTerritory = React.lazy(() =>
  import("./Modules/Administration/Commission/Territory/ViewTerritory")
);
const DetailTerritory = React.lazy(() =>
  import("./Modules/Administration/Commission/Territory/TerritoryModal")
);
const ViewRule = React.lazy(() =>
  import("./Modules/Administration/Commission/Rule/ViewRule")
);
const DetailRule = React.lazy(() =>
  import("./Modules/Administration/Commission/Rule/RuleModal")
);
const ViewGroup = React.lazy(() =>
  import("./Modules/Administration/Commission/Group/ViewGroup")
);
const DetailGroup = React.lazy(() =>
  import("./Modules/Administration/Commission/Group/GroupModal")
);
const ClaimEdit = React.lazy(() =>
  import("./Modules/Administration/ClaimEvent/ClaimEdit.js")
);

// Quote Entry
const QuoteEntry = React.lazy(() => import("./Modules/Quote"));
const HO3 = React.lazy(() => import("./Modules/Quote/HO3/Quoteview"));
const HO3Sel = React.lazy(() => import("./Modules/Quote/HO3Sel/Quoteview"));
const HO6Sel = React.lazy(() => import("./Modules/Quote/HO6Sel/Quoteview"));
const MDPD = React.lazy(() => import("./Modules/Quote/MDPDirect/Quoteview"));
const MHOD = React.lazy(() => import("./Modules/Quote/MHODirect/Quoteview"));
const HO3H = React.lazy(() =>
  import("./Modules/Quote/HO3Homeowners/Quoteview")
);
const HO6H = React.lazy(() =>
  import("./Modules/Quote/HO6Homeowners/Quoteview")
);

/******************* Investments routers *********************/
const Investments = React.lazy(() => import("./Modules/investment"));
const ViewSecurity = React.lazy(() =>
  import("./Modules/investment/ViewSecurity")
);
const EditSecurity = React.lazy(() =>
  import("./Modules/investment/EditSecurity")
);
const Brokers = React.lazy(() => import("./Modules/investment/Brokers"));
const AddEditBroker = React.lazy(() =>
  import("./Modules/investment/Brokers/AddEditBroker")
);
const Price = React.lazy(() => import("./Modules/investment/Price"));
const HistoricalPrice = React.lazy(() =>
  import("./Modules/investment/Price/HistoricalPrice")
);
const Coupons = React.lazy(() => import("./Modules/investment/Coupons"));
const HistoricalCoupons = React.lazy(() =>
  import("./Modules/investment/Coupons/HistoricalCoupons")
);
const ComplexManagementView = React.lazy(() =>
  import("./Modules/ComplexManagement/SearchResults")
);
const Transaction = React.lazy(() =>
  import("./Modules/investment/Transaction")
);
const AddEditTransaction = React.lazy(() =>
  import("./Modules/investment/Transaction/addEditTransaction")
);
const MonthlyPosting = React.lazy(() =>
  import("./Modules/investment/MonthlyPosting")
);
const TransferSecurity = React.lazy(() =>
  import("./Modules/investment/TransferSecurity")
);
/******************* Investments routers *********************/

const TransferBookView = React.lazy(() =>
  import("./Modules/Policy/TransferBook/TransferBookView")
);
const SystemDropdown = React.lazy(() =>
  import("./Modules/Administration/SystemDropdown/SystemDropdown")
);

/******************* Accounting Folder **********************/
const ClaimInvoice = React.lazy(() =>
  import("./Modules/Accounting/AccountingFolder/ClaimInvoice")
);
const AddActionAccounting = React.lazy(() =>
  import("./Modules/Accounting/AccountFolder/AddAction")
);
const DefineRuleAccounting = React.lazy(() =>
  import("./Modules/Accounting/AccountFolder/DefineRule")
);

/* CRM */
const CRMEmails = React.lazy(() => import("./Modules/CRM"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },

  {
    path: "/producer",
    name: "Producer",
    component: ProducerContainer,
    exact: true,
  },
  {
    path: "/producer_view",
    name: "Producer_view",
    component: ProducerViewContainer,
    exact: true,
  },
  // { path: '/producer/agency', name: 'Agency', component: Agency },
  // { path: '/producer/agency-users', name: 'Agency Users', component: AgencyUsers },
  // { path: '/producer/documents', name: 'Documents', component: Documents },
  // { path: '/producer/commission', name: 'Commission', component: Commission },
  // { path: '/producer/logs', name: 'Logs', component: Logs },
  // { path: '/producer/updated-logs', name: 'Updated Logs', component: UpdatedLogs },
  // { path: '/producer/agency-visit-review', name: 'Agency Visit Review', component: AgencyVisitReview },
  // { path: '/producer/association', name: 'Association', component: Association },
  { path: "/claims", exact: true, name: "Claims", component: Claims },
  {
    path: "/claimsearch",
    exact: true,
    name: "Claimsearch",
    component: Claimsearch,
  },
  { path: "/claimview", exact: true, name: "Claimview", component: Claimview },
  { path: "/claims/:id", exact: true, name: "Claim Details", component: Claim },
  { path: "/claim-intake", exact: true, name: "ClaimAdd", component: ClaimAdd },
  {
    path: "/claims/intake/:id/:claimId?",
    exact: true,
    name: "Claim Intake",
    component: ClaimIntake,
  },
  {
    path: "/questionnaires",
    exact: true,
    name: "Questionnaires",
    component: Questionnaires,
  },
  {
    path: "/questionnaires/:id",
    exact: true,
    name: "Questionnaire",
    component: Questionnaire,
  },
  { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
  {
    path: "/dashboard/" + NEWCLAIM.url,
    exact: true,
    name: "ClaimDashboard",
    component: Dashboard,
  },
  {
    path: "/dashboard/" + CUSTOMER.url,
    exact: true,
    name: "CustomerDashboard",
    component: Dashboard,
  },
  {
    path: "/dashboard/" + ACCOUNTING.url,
    exact: true,
    name: "AccountingDashboard",
    component: Dashboard,
  },
  {
    path: "/dashboard/" + UNDERWRITING.url,
    exact: true,
    name: "UnderwritingDashboard",
    component: Dashboard,
  },
  {
    path: "/dashboard/" + LEGAL.url,
    exact: true,
    name: "LegalDashboard",
    component: Dashboard,
  },
  {
    path: "/add-account-type",
    name: "Add Account Type",
    component: AddEditAccountType,
  },
  {
    path: "/edit-account-type",
    name: "Edit Account Type",
    component: AddEditAccountType,
  },
  {
    path: "/manage-account-type",
    name: "Manage Account Type",
    component: AccountTypeList,
    exact: true,
  },
  { path: "/add-account", name: "Add Account", component: AddEditAccount },
  { path: "/edit-account", name: "Edit Account", component: AddEditAccount },
  {
    path: "/manage-account",
    name: "Manage Account",
    component: AccountsList,
    exact: true,
  },
  {
    path: "/manage-account-ledger",
    name: "Account Ledger",
    component: AccountsLedger,
  },
  { path: "/add-vendor", name: "Add Vendor", component: AddEditVendor },
  { path: "/edit-vendor", name: "Edit Vendor", component: AddEditVendor },
  {
    path: "/manage-vendor",
    name: "Manage Vendor",
    component: VendorList,
    exact: true,
  },
  { path: "/invoice", name: "Invoice", component: InvoiceList, exact: true },
  { path: "/add-invoice", name: "Add Invoice", component: SaveInvoice },
  { path: "/edit-invoice", name: "Edit Invoice", component: SaveInvoice },
  { path: "/credit", name: "Credit", component: Credit, exact: true },
  { path: "/pay-bill", name: "Pay Bill", component: PayBill, exact: true },
  { path: "/theme", name: "Theme", component: Colors, exact: true },
  { path: "/theme/colors", name: "Colors", component: Colors },
  { path: "/theme/typography", name: "Typography", component: Typography },
  { path: "/base", name: "Base", component: Cards, exact: true },
  { path: "/base/breadcrumbs", name: "Breadcrumbs", component: Breadcrumbs },
  { path: "/base/cards", name: "Cards", component: Cards },
  { path: "/base/carousels", name: "Carousel", component: Carousels },
  { path: "/base/collapses", name: "Collapse", component: Collapses },
  { path: "/base/dropdowns", name: "Dropdowns", component: Dropdowns },
  { path: "/base/jumbotrons", name: "Jumbotrons", component: Jumbotrons },
  { path: "/base/list-groups", name: "List Groups", component: ListGroups },
  { path: "/base/navbars", name: "Navbars", component: Navbars },
  { path: "/base/navs", name: "Navs", component: Navs },
  { path: "/base/paginations", name: "Paginations", component: Paginations },
  { path: "/base/popovers", name: "Popovers", component: Popovers },
  { path: "/base/progress-bar", name: "Progress Bar", component: ProgressBar },
  { path: "/base/spinners", name: "Spinners", component: SpinnersB4 },
  { path: "/base/switches", name: "Switches", component: Switches },
  { path: "/base/tabs", name: "Tabs", component: Tabs },
  { path: "/base/tooltips", name: "Tooltips", component: Tooltips },
  { path: "/buttons", name: "Buttons", component: Buttons, exact: true },
  { path: "/buttons/buttons", name: "Buttons", component: Buttons },
  {
    path: "/buttons/button-dropdowns",
    name: "Dropdowns",
    component: ButtonDropdowns,
  },
  {
    path: "/buttons/button-groups",
    name: "Button Groups",
    component: ButtonGroups,
  },
  {
    path: "/buttons/brand-buttons",
    name: "Brand Buttons",
    component: BrandButtons,
  },
  {
    path: "/buttons/loading-buttons",
    name: "Loading Buttons",
    component: LoadingButtons,
  },
  { path: "/charts", name: "Charts", component: Charts },
  { path: "/editors", name: "Editors", component: CodeEditors, exact: true },
  {
    path: "/editors/code-editors",
    name: "Code Editors",
    component: CodeEditors,
  },
  {
    path: "/editors/text-editors",
    name: "Text Editors",
    component: TextEditors,
  },
  { path: "/forms", name: "Forms", component: BasicForms, exact: true },
  {
    path: "/forms/advanced-forms",
    name: "Advanced Forms",
    component: AdvancedForms,
  },
  { path: "/forms/basic-forms", name: "Basic Forms", component: BasicForms },
  {
    path: "/forms/validation-forms",
    name: "Form Validation",
    component: ValidationForms,
  },
  { path: "/google-maps", name: "Google Maps", component: GoogleMaps },
  { path: "/icons", exact: true, name: "Icons", component: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", component: CoreUIIcons },
  { path: "/icons/flags", name: "Flags", component: Flags },
  { path: "/icons/font-awesome", name: "Font Awesome", component: FontAwesome },
  {
    path: "/icons/simple-line-icons",
    name: "Simple Line Icons",
    component: SimpleLineIcons,
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: Alerts,
    exact: true,
  },
  { path: "/notifications/alerts", name: "Alerts", component: Alerts },
  { path: "/notifications/badges", name: "Badges", component: Badges },
  { path: "/notifications/modals", name: "Modals", component: Modals },
  { path: "/notifications/toastr", name: "Toastr", component: Toastr },
  { path: "/plugins", name: "Plugins", component: Calendar, exact: true },
  { path: "/plugins/calendar", name: "Calendar", component: Calendar },
  { path: "/plugins/draggable", name: "Draggable Cards", component: Draggable },
  { path: "/plugins/spinners", name: "Spinners", component: Spinners },
  { path: "/tables", name: "Tables", component: Tables, exact: true },
  { path: "/tables/data-table", name: "Data Table", component: DataTable },
  //{ path: '/tables/tables', name: 'Tables', component: Tables },
  { path: "/widgets", name: "Widgets", component: Widgets },
  { path: "/policy/epic", name: "Epcic", component: Epcic },
  { path: "/policy/search", name: "Search Policy", component: SearchPolicy },
  {
    path: "/policy/applicant",
    exact: true,
    name: "Applicant Policy",
    component: Applicant,
  },
  { path: "/apps", name: "Apps", component: Compose, exact: true },
  { path: "/apps/email", name: "Email", component: Compose, exact: true },
  { path: "/apps/email/compose", name: "Compose", component: Compose },
  { path: "/apps/email/inbox", name: "Inbox", component: Inbox },
  { path: "/apps/email/message", name: "Message", component: Message },
  { path: "/apps/invoicing", name: "Invoice", component: Invoice, exact: true },
  { path: "/apps/invoicing/invoice", name: "Invoice", component: Invoice },
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },
  {
    path: "/banking-center",
    name: "Banking Center",
    component: BankingList,
    exact: true,
  },
  {
    path: "/make-deposits",
    name: "Make Deposits",
    component: MakeDeposits,
    exact: true,
  },
  {
    path: "/transfer-funds",
    name: "Transfer Funds",
    component: TransferFunds,
    exact: true,
  },
  {
    path: "/write-check",
    name: "Write Check",
    component: WriteCheck,
    exact: true,
  },
  { path: "/reconcile", name: "Reconcile", component: Reconcile, exact: true },
  {
    path: "/reconcile-bank",
    name: "Reconcile Bank",
    component: ReconcileBank,
    exact: true,
  },
  {
    path: "/transactions",
    name: "Vendor Transactions",
    component: Transactions,
    exact: true,
  },
  {
    path: "/general-entry",
    name: "General Entry",
    component: GeneralEntry,
    exact: true,
  },
  {
    path: "/search-transaction",
    name: "Search Transaction",
    component: SearchTransaction,
    exact: true,
  },
  {
    path: "/print-check",
    name: "Print Check",
    component: PrintCheck,
    exact: true,
  },
  {
    path: "/policy/applicant/:polNo",
    exact: true,
    name: "Applicant Policy",
    component: Applicant,
  },
  //Search Client

  { path: "/searchClient", name: "SearchClient", component: SearchClient },
  { path: "/addClient", name: "AddClient", component: AddClient },

  //FormStyle -- Santosh
  { path: "/formstyle", name: "Form Style", component: FormStyle },
  { path: "/creatquote", name: "Creat Quote", component: CreatQuote },

  // Accounting Batch Process
  {
    path: "/batchTransEntry",
    exact: true,
    name: "Accounting",
    component: BatchTransEntry,
  },
  {
    path: "/batchInvoice",
    exact: true,
    name: "Accounting",
    component: BatchInvoice,
  },
  {
    path: "/generateCommission",
    exact: true,
    name: "Accounting",
    component: GenerateCommission,
  },
  {
    path: "/lockBoxImportBOA",
    exact: true,
    name: "Accounting",
    component: LockBoxImportBOA,
  },
  {
    path: "/AccountDashboard",
    exact: true,
    name: "Accounting",
    component: AccountingDashboard,
  },
  {
    path: "/generateRenewalNotice",
    name: "RenewalNotice",
    component: RenewalNotice,
  },

  /**
   * Administration Module
   *  */
  {
    path: "/administration",
    exact: true,
    name: "Administration",
    component: Admindashboard,
  },
  {
    path: "/UserProfile",
    exact: true,
    name: "UserProfile",
    component: UserProfileNavs,
  },
  {
    path: "/PaymentPlan",
    exact: true,
    name: "PaymentPlan",
    component: PaymentPlan,
  },
  {
    path: "/territory",
    exact: true,
    name: "Territory",
    component: ViewTerritory,
  },
  {
    path: "/territory/:id",
    exact: true,
    name: "Territory",
    component: DetailTerritory,
  },
  {
    path: "/createTerritory",
    exact: true,
    name: "Territory",
    component: DetailTerritory,
  },
  { path: "/rule", exact: true, name: "Rule", component: ViewRule },
  { path: "/rule/:id", exact: true, name: "Rule", component: DetailRule },
  { path: "/createRule", exact: true, name: "Rule", component: DetailRule },
  { path: "/ruleGroup", exact: true, name: "group", component: ViewGroup },
  {
    path: "/ruleGroup/:id",
    exact: true,
    name: "group",
    component: DetailGroup,
  },
  {
    path: "/createRuleGroup",
    exact: true,
    name: "group",
    component: DetailGroup,
  },
  {
    path: "/administration/gmap-rule",
    name: "GmapViewRule",
    component: GmapViewRule,
  },
  {
    path: "/administration/gmap-polygon",
    name: "GMapPolygon",
    component: GMapPolygon,
  },
  {
    path: "/administration/create-group",
    name: "CreateGroup",
    component: CreateGroup,
  },
  {
    path: "/administration/edit-group",
    name: "EditGroup",
    component: EditGroup,
  },
  {
    path: "/administration/ClaimEvent/ClaimEdit",
    name: "System Dropdown",
    component: ClaimEdit,
  },
  {
    path: "/administration/policy/list-validation-rule",
    name: "PolicyValidationRule",
    component: PolicyValidationRule,
  },
  {
    path: "/administration/policy/create-validation-rule",
    name: "CreatePolicyValidationRule",
    component: CreatePolicyValidationRule,
  },
  {
    path: "/administration/policy/edit-validation-rule",
    name: "EditPolicyValidationRule",
    component: EditPolicyValidationRule,
  },
  {
    path: "/administration/policy/create-validation-group",
    name: "CreatePolicyValidationGroup",
    component: CreatePolicyValidationGroup,
  },
  {
    path: "/administration/policy/view-validation-group",
    name: "ViewPolicyValidationGroup",
    component: ViewPolicyValidationGroup,
  },
  {
    path: "/administration/policy/edit-validation-group",
    name: "EditPolicyValidationGroup",
    component: CreatePolicyValidationGroup,
  },

  // Quote Entry
  { path: "/quoteEntry", exact: true, name: "group", component: QuoteEntry },
  {
    path: "/quoteEntry/ho3Daimond",
    exact: true,
    name: "group",
    component: HO3,
  },
  {
    path: "/quoteEntry/ho3Daimond/:poTransPK",
    exact: true,
    name: "group",
    component: HO3,
  },
  {
    path: "/quoteEntry/epicH03Sel",
    exact: true,
    name: "group",
    component: HO3Sel,
  },
  {
    path: "/quoteEntry/epicH03Sel/:poTransPK",
    exact: true,
    name: "group",
    component: HO3Sel,
  },
  {
    path: "/quoteEntry/epicH06Sel",
    exact: true,
    name: "group",
    component: HO6Sel,
  },
  {
    path: "/quoteEntry/epicH06Sel/:poTransPK",
    exact: true,
    name: "group",
    component: HO6Sel,
  },
  {
    path: "/quoteEntry/mdpDirect",
    exact: true,
    name: "group",
    component: MDPD,
  },
  {
    path: "/quoteEntry/mdpDirect/:poTransPK",
    exact: true,
    name: "group",
    component: MDPD,
  },
  {
    path: "/quoteEntry/mhoDirect",
    exact: true,
    name: "group",
    component: MHOD,
  },
  {
    path: "/quoteEntry/mhoDirect/:poTransPK",
    exact: true,
    name: "group",
    component: MHOD,
  },
  {
    path: "/quoteEntry/ho3Homeowners",
    exact: true,
    name: "group",
    component: HO3H,
  },
  {
    path: "/quoteEntry/ho3Homeowners/:poTransPK",
    exact: true,
    name: "group",
    component: HO3H,
  },
  {
    path: "/quoteEntry/ho6Homeowners",
    exact: true,
    name: "group",
    component: HO6H,
  },
  {
    path: "/quoteEntry/ho6Homeowners/:poTransPK",
    exact: true,
    name: "group",
    component: HO6H,
  },

  /*************** Investment modules ****************/
  {
    path: "/investments-security",
    exact: true,
    name: "Investments",
    component: Investments,
  },
  {
    path: "/view-security",
    exact: true,
    name: "View Security",
    component: ViewSecurity,
  },
  {
    path: "/add-security",
    exact: true,
    name: "Add Security",
    component: EditSecurity,
  },
  {
    path: "/edit-security",
    exact: true,
    name: "Edit Security",
    component: EditSecurity,
  },
  { path: "/brokers", exact: true, name: "Brokers", component: Brokers },
  {
    path: "/add-broker",
    exact: true,
    name: "Add Broker",
    component: AddEditBroker,
  },
  {
    path: "/edit-broker",
    exact: true,
    name: "Edit Broker",
    component: AddEditBroker,
  },
  // { path: '/price', exact: true, name: 'Price', component: Price },
  { path: "/add-price", exact: true, name: "Add Price", component: Price },
  { path: "/edit-price", exact: true, name: "Edit Price", component: Price },
  { path: "/view-price", exact: true, name: "View Price", component: Price },
  {
    path: "/historical-price",
    exact: true,
    name: "Historical Price",
    component: HistoricalPrice,
  },
  { path: "/coupons", exact: true, name: "Coupons", component: Coupons },
  { path: "/add-coupon", exact: true, name: "Add Coupon", component: Coupons },
  {
    path: "/edit-coupon",
    exact: true,
    name: "Edit Coupon",
    component: Coupons,
  },
  {
    path: "/historical-coupon",
    exact: true,
    name: "Historical Coupon",
    component: HistoricalCoupons,
  },
  {
    path: "/DocumentHandler",
    exact: true,
    name: "DocumentHandler",
    component: DocumentHandler,
  },
  {
    path: "/ComplexManagementView",
    name: "Complex Management",
    component: ComplexManagementView,
  },
  {
    path: "/transaction",
    exact: true,
    name: "Transaction",
    component: Transaction,
  },
  {
    path: "/add-transaction",
    exact: true,
    name: "Add Transaction",
    component: AddEditTransaction,
  },
  {
    path: "/edit-transaction",
    exact: true,
    name: "Add Transaction",
    component: AddEditTransaction,
  },
  {
    path: "/monthly-posting",
    exact: true,
    name: "Monthly Posting",
    component: MonthlyPosting,
  },
  {
    path: "/edit-posting",
    exact: true,
    name: "Monthly Posting",
    component: MonthlyPosting,
  },
  {
    path: "/transfer-security",
    exact: true,
    name: "Transfer Security",
    component: TransferSecurity,
  },
  {
    path: "/policy/TransferBookView",
    name: "Transfer Book View",
    component: TransferBookView,
  },

  {
    path: "/administration/SystemDropdown",
    name: "System Dropdown",
    component: SystemDropdown,
  },

  //Accounting Account Folder
  {
    path: "/ClaimInvoice",
    exact: true,
    name: "Accounting",
    component: ClaimInvoice,
  },
  {
    path: "/DocumentUploader",
    exact: true,
    name: "DocumentUploader",
    component: DocumentUploader,
  },
  {
    path: "/addActionAccounting",
    name: "Add Action",
    component: AddActionAccounting,
    exact: true,
  },
  {
    path: "/defineRuleAccounting",
    name: "Define Rule",
    component: DefineRuleAccounting,
    exact: true,
  },
  /* CRM */
  { path: "/crm", exact: false, name: "Emails", component: CRMEmails },
];

export default routes;
