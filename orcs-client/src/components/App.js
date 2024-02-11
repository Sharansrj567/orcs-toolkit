import { Route, Switch, HashRouter } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import SessionDashboard from './SessionDashboard';

function App() {
	return (
		<div>
			<HashRouter>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/session" component={SessionDashboard} />
				</Switch>
			</HashRouter>
		</div>
	);
}

export default App;
