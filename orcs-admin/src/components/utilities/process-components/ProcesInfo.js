import { Component } from 'react';
import { Container } from 'shards-react';
import { TailSpin } from 'react-loader-spinner';
import ProcessDetails from './ProcessDetails';

class ProcessInfo extends Component {
	render() {
		const { processData, isActive } = this.props;

		if (!isActive) {
			return (
				<div
					style={{
						textAlign: 'center',
						justifyContent: 'center',
						display: 'flex',
					}}
				>
					<TailSpin
						height="70"
						width="100"
						color="#2596be"
						arialLabel="loading"
					/>
				</div>
			);
		}

		return (
			<div>
				<Container>
					<div className="card">
						<div className="card-body">
							<h3 className="card-title">Process Info</h3>
							<h6 className="card-subtitle mb-2 text-muted">
								Cumulative Process Information
							</h6>
							<ul>
								<li>
									<span style={{ fontWeight: 'bold' }}>
										Total number of processes:{' '}
									</span>
									{processData.all}
								</li>

								<li>
									<span style={{ fontWeight: 'bold' }}>
										Blocked processes:{' '}
									</span>
									{processData.blocked}
								</li>

								<li>
									<span style={{ fontWeight: 'bold' }}>Active processes: </span>
									{processData.running}
								</li>

								<li>
									<span style={{ fontWeight: 'bold' }}>Unkown processes: </span>
									{processData.unknown}
								</li>
							</ul>
						</div>
					</div>
				</Container>
				<br />
				<ProcessDetails />
			</div>
		);
	}
}

export default ProcessInfo;
