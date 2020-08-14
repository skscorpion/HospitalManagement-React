import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './component/Login';
import Home from './component/Home';
import PatientForm from './component/form/PatientForm';
import Layout from './component/layout';
import Page404 from './component/Page404';

const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/Login' component={Login} />
				<Route exact path='/Home' component={Home} />
				<Route exact path='/Add' component={PatientForm} />
				<Route exact path='/Edit' component={PatientForm} />
				<Route exact path='/View' component={PatientForm} />
				<Route exact path='/Layout' component={Layout} />
				<Route component={Page404} />
			</Switch>
		</BrowserRouter>
	);
};

export default Router;
