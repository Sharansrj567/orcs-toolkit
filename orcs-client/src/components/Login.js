import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../services/api';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const history = useHistory();

	async function handleSubmit(evt) {
		evt.preventDefault();
		const payload = {
			email,
			password,
		};

		try {
			const { data } = await api.post('/auth/login', payload);
			if (data.success === true) {
				window.localStorage.setItem('jwt', data.token);
				history.push('/session');
			}
		} catch (err) {
			setErrorMessage('Invalid Credentials');
		}
	}

	return (
		<section className="vh-100" style={{ backgroundColor: '#eee' }}>
			<div className="container h-100">
				<div className="row justify-content-center align-items-center h-100">
					<div className="col-lg-12 col-xl-11">
						<div className="card text-black" style={{ borderRadius: '25px' }}>
							<div className="card-body p-md-5">
								<div className="row justify-content-center">
									<div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
										<p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
											Login
										</p>

										<form onSubmit={handleSubmit} className="mx-1 mx-md-4">
											<div className="d-flex flex-row align-items-center mb-4">
												<i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
												<div className="form-outline flex-fill mb-0">
													<input
														type="text"
														id="email"
														className="form-control"
														value={email}
														onChange={(e) => setEmail(e.target.value)}
													/>
													<label className="form-label" htmlFor="email">
														Email
													</label>
												</div>
											</div>

											<div className="d-flex flex-row align-items-center mb-4">
												<i className="fas fa-lock fa-lg me-3 fa-fw"></i>
												<div className="form-outline flex-fill mb-0">
													<input
														type="password"
														id="password"
														className="form-control"
														value={password}
														onChange={(e) => setPassword(e.target.value)}
													/>
													<label className="form-label" htmlFor="password">
														Password
													</label>
												</div>
											</div>

											{errorMessage && (
												<div className="alert alert-danger" role="alert">
													{errorMessage}
												</div>
											)}

											<div style={{ marginTop: '10px' }} className="mb-4">
												Not a member? &nbsp;
												<Link to="/register">Guest Login here!</Link>
											</div>

											<div className="d-flex mb-lg-4">
												<button
													type="submit"
													className="btn btn-primary btn-lg"
												>
													Login
												</button>
											</div>
										</form>
									</div>
									<div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
										<input
											type="image"
											src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
											className="img-fluid"
											alt="Sample image"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
