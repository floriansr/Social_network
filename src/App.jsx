import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "redux/store";

import Navbar from "components/Navbar";
import Authroute from "components/AuthRoute"
import Home from "pages/Home";
import Register from "pages/Register";


const App = () => {

	return (
		<>
		<Router>
					<div>
						<Provider store={store}>

							<Navbar />

							<Switch>
								<Route path="/register" component={Register} />
								<Authroute path="/" component={Home} />
							</Switch>

						</Provider>
					</div>
				</Router>
		</>
	);
};

export default App;
