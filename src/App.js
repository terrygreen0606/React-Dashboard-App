
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import store from './store';
import * as action from './store/actions';
import { Helmet } from 'react-helmet';
import './App.scss';
export const history = createBrowserHistory();

const loading = () =>
  <div className="animated fadeIn pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>;

// Containers
// const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));
const DefaultLayout = React.lazy(() => import('./Modules/Common/DefaultLayout'));

// const Login = React.lazy(() => import('./views/Pages/Login'));
const Login = React.lazy(() => import('./Modules/Auth/Login'));
const Register = React.lazy(() => import('./Modules/Auth/Register'));
// const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

store.dispatch(action.authCheck());

class App extends Component {

  render() {
    return (    
      <Provider store={store}>
        <ConnectedRouter history={history}>
        <ToastContainer />
            <React.Suspense fallback={loading()}>
              <Helmet>
                <title>Avatar Insurance</title>
                <meta charSet="utf-8" />
                <meta name="description" content="Property & Casualty Insurance Company Protector of Your Assets" />
              </Helmet>
              <Switch>
                <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
                <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
                {/*<Route exact path="/policy/epcic" name="Quote EPCIC Page" render={props => <Epcic {...props}/>}/>*/}
                <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
                <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
                <Route auth="true" path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
              </Switch>
            </React.Suspense>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
