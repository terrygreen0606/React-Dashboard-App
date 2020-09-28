import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import Auth from './Auth';
import persistStore from './persistStore';
import Policy from './policy';
//const RootReducer = combineReducers({Auth, persistStore, Policy});
import loader from './loader';
import accounting from './accounting';

import Client from './ClientManagement';
import BatchProcess from './BatchProcessReducer';
import Administration from './Administration';
import Producer from './Producer';
import levelManageProcess from './LevelManageProcessReducer';
import moduleManageProcess from './ModuleManageProcessReducer';
import submoduleManageProcess from './SubModuleManageProcessReducer';
import territoryManageProcess from './TerritoryReducer';
import ruleManageProcess from './RuleReducer';
import groupManageProcess from './GroupReducer';
import aclManageProcess from "./AclManageProcessReducer";
import commissionProcess from './commissionProcessRedurcer';
import territory from "./territory";
import investment from "./investment";
import docHandlerProcess from "./DocumentHandlerProcessReducer";
import QuoteEntry from './QuoteEntryReducer';
import paymentPlans from './paymentPlansReducer';
import claim from './claim';

import common from './common';

export const history = createBrowserHistory();
const RootReducer = combineReducers({
  router: connectRouter(history),
  Auth,
  persistStore,
  loader,
  accounting,
  Policy,
  Client,
  BatchProcess,
  Administration,
  Producer,
  levelManageProcess,
  moduleManageProcess,
  submoduleManageProcess,
  aclManageProcess,
  territory,
  common,
  territoryManageProcess,
  ruleManageProcess,
  groupManageProcess,
  commissionProcess,
  investment,
  docHandlerProcess,
  QuoteEntry,
  paymentPlans,
  claim
});

export default RootReducer;
