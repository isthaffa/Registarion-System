import React from "react";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import PageNotFound from '../containers/404/PageNotFound';
import Home from '../containers/home/components/Home';
import ProtectedRoute from '../auth/ProtectedRoute';
import ForgotPassword from '../containers/User/forgot_password/ForgotPassword';
import ResetPassword from '../containers/User/resetPassword/ResetPassword';
import EditPassword from '../containers/User/edit-password/EditPassword';
import Login from '../containers/User/login/Login';
import Registration from '../containers/User/registration/Registration';
import EditForm from "../containers/home/components/EditForm";
const Routes = () => {
  return (
    <div>
      <Router>
        <div className="container">
          <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute
              exact
              path="/edit-password"
              component={EditPassword}
            />
            <ProtectedRoute
              exact
              path="/edit-member/:id"
              component={EditForm}
            />

            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Registration} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route
              exact
              path="/reset-password/:resetToken"
              component={ResetPassword}
            />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Routes;
