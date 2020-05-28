import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "redux/store";

import Navbar from "components/Navbar";
import Authroute from "components/AuthRoute"
import Home from "pages/Home";
import Register from "pages/Register";
import LogIn from "pages/Login";
import Profile from "pages/Profile";
import OtherProfile from "pages/OtherProfile";



const App = () => {

  return (
    <>
    <Router>
          <div>
            <Provider store={store}>

              <Navbar />

              <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={LogIn} />

                <Authroute path="/user/:userSlug" component={OtherProfile} />
                <Authroute path="/profile" component={Profile} />
                <Authroute path="/" component={Home} />
              </Switch>

            </Provider>
          </div>
        </Router>
    </>
  );
};
export default App;