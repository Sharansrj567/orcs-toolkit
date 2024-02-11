import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import nodeApi from '../services/nodeApi';

export default function Home() {
	const [user, setUser] = useState({});
	const [policy, setPolicy] = useState([]);
	const [showList, setShowList] = useState(false);

	useEffect(() => {
		(async () => {
			const { data } = await nodeApi.get('/currentuser');
			setUser(data.user);
		})();
	}, []);

	async function fetchPolicy(e) {
		e.preventDefault();

		const { data } = await api.get(`/policy/getRolePolicy/${user.role}`);

		if (!data.policy) {
			return;
		}

		setPolicy(data.policy);
		console.log(policy);
	}

	function getPolicyList() {
		if (
			policy === undefined ||
			policy.length === 0 ||
			policy.banList.length === 0
		) {
			return <p className="list-group-item h5">No policies set</p>;
		}

		return policy.banList.map((i) => {
			return (
				<li key={i} className="list-group-item">
					{i}
				</li>
			);
		});
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
											ORCS
										</p>

										<Link
											to="/register"
											className="card text-white bg-secondary p-md-3"
											style={{ alignItems: 'center' }}
										>
											<h1>Register</h1>
										</Link>

										<br />

										<Link
											to="/login"
											className="card text-white bg-dark p-md-3"
											style={{ alignItems: 'center' }}
										>
											<h1>Login</h1>
										</Link>
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

						<br />

						<div className="row">
							<div className="col">
								<div className="card">
									<div className="card-body">
										<p>
											<span className="h4">
												Your current role is: {user.role}
											</span>
											<br />
											Click here to know what you cannot use
										</p>

										<button
											onClick={(e) => {
												fetchPolicy(e);
												setShowList(true);
											}}
											type="submit"
											className="btn btn-secondary btn-lg"
										>
											Fetch Policy
										</button>
										{showList && (
											<div className="card-text">
												<ul
													className="list-group list-group-flush list-group-numbered"
													style={{
														maxHeight: '200px',
														marginBottom: '10px',
														overflowY: 'scroll',
														WebkitOverflowScrolling: 'touch',
													}}
												>
													{getPolicyList()}
												</ul>
											</div>
										)}
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
