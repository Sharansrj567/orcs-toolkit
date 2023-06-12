import React from 'react';
import { Form, Field } from 'react-final-form';

const AuthForm = (props) => {
	const renderError = ({ error, touched }) => {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	};

	const renderInput = ({ input, label, meta }) => {
		const errorInput = `field ${meta.error && meta.touched ? 'error' : ''}`;

		return (
			<div className={errorInput}>
				<label>{label}</label>
				<input {...input} autoComplete="off" type="text" />
				{renderError(meta)}
			</div>
		);
	};

	const onSubmit = (formValues) => {
		props.onSubmit(formValues);
	};

	return (
		<Form
			initialValues={props.initialValues}
			onSubmit={onSubmit}
			validate={(formValues) => {
				const errors = {};

				if (!formValues.email) {
					errors.title = 'You must provide a title';
				}

				if (!formValues.password) {
					errors.title = 'Password cannot be empty';
				}

				return errors;
			}}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit} className="ui form error">
					<Field name="email" component={renderInput} label="Enter Email" />
					<Field
						name="password"
						component={renderInput}
						label="Enter Password"
					/>
					<button className="ui button primary">Submit</button>
				</form>
			)}
		></Form>
	);
};

export default AuthForm;
