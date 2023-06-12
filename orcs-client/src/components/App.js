import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'shards-react';

import Header from './Header';
import Dashboard from './Dashboard';
import ProcessApp from './ProcessApp';
import Login from './auth/Login';

class App extends React.Component {
	render() {
		return (
			<div>
				<BrowserRouter>
					<Header />
					<br />
					<Container fluid className="main-content-container px-4">
						<Switch>
							<Route path="/process">
								<ProcessApp />
							</Route>
							<Route path="/login">
								<Login />
							</Route>
							<Route exact path="/">
								<Dashboard />
							</Route>
						</Switch>
					</Container>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
