import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../services/api';

export default function Register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState('guest');

	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();
		const payload = {
			name,
			email,
			password,
			role,
		};
		console.log(payload);

		try {
			const { data } = await api.post('/auth/register', payload);
			if (data.success === true) {
				window.localStorage.setItem('jwt', data.token);
				history.push('/session');
			}
		} catch (err) {
			console.log(err);
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
											Register
										</p>

										<form onSubmit={handleSubmit} className="mx-1 mx-md-4">
											<div className="d-flex flex-row align-items-center mb-4">
												<i className="fas fa-user fa-lg me-3 fa-fw"></i>
												<div className="form-outline flex-fill mb-0">
													<input
														type="text"
														id="form3Example1c"
														className="form-control"
														value={name}
														onChange={(e) => setName(e.target.value)}
													/>
													<label
														className="form-label"
														htmlFor="form3Example1c"
													>
														Your Name
													</label>
												</div>
											</div>

											<div className="d-flex flex-row align-items-center mb-4">
												<i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
												<div className="form-outline flex-fill mb-0">
													<input
														type="email"
														id="form3Example3c"
														className="form-control"
														value={email}
														onChange={(e) => setEmail(e.target.value)}
													/>
													<label
														className="form-label"
														htmlFor="form3Example3c"
													>
														Your Email
													</label>
												</div>
											</div>

											<div className="d-flex flex-row align-items-center mb-4">
												<i className="fas fa-lock fa-lg me-3 fa-fw"></i>
												<div className="form-outline flex-fill mb-0">
													<input
														type="password"
														id="form3Example4c"
														className="form-control"
														value={password}
														onChange={(e) => setPassword(e.target.value)}
													/>
													<label
														className="form-label"
														htmlFor="form3Example4c"
													>
														Password
													</label>
												</div>
											</div>

											<div className="form-floating">
												<select
													className="form-select"
													id="roleSelect"
													onChange={(e) => setRole(e.target.value)}
												>
													<option value="guest">Guest</option>
												</select>
												<label htmlFor="roleSelect">Select your role</label>
											</div>

											<div>
												<div className="form-check d-flex justify-content-center mb-5">
													<label
														className="form-check-label"
														htmlFor="form2Example3"
													>
														Already Registered?{' '}
														<Link to="/login" style={{ color: '#336EFF' }}>
															Sign in!
														</Link>
													</label>
												</div>

												<div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
													<button
														type="submit"
														className="btn btn-primary btn-lg"
													>
														Register
													</button>
												</div>
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
