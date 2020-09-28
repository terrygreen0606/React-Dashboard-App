import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import RootReducer from './reducers';
export const history = createBrowserHistory();
const store = createStore(
  RootReducer,
  process.env.NODE_ENV === 'production' ? compose(applyMiddleware(ReduxThunk, routerMiddleware(history))) : composeWithDevTools(applyMiddleware(ReduxThunk, routerMiddleware(history))),
);

persistStore(store);
export default store;
