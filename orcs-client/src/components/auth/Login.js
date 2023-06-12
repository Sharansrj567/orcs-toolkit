import { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';
import AuthForm from './AuthForm';

class LoginUser extends Component {
	onSubmit = (formValues) => {
		console.log(formValues);
		this.props.loginUser(formValues);
	};

	render() {
		console.log(this.props.auth);
		return (
			<div>
				<h3>Login</h3>
				<AuthForm onSubmit={this.onSubmit} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps, { loginUser })(LoginUser);
