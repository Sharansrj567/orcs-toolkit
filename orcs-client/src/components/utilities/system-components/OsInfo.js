import React from 'react';
import { Container, Row, Col } from 'shards-react';

class OSInfo extends React.Component {
	render() {
		const { osType, systemInformation, isActive } = this.props;

		if (!isActive) {
			return <div>Loading...</div>;
		}

		return (
			<Container>
				<Row>
					<Col className="mb-4">
						<div className="card">
							<div className="card-body">
								<h3 className="card-title">System Info</h3>
								<h6 className="card-subtitle mb-2 text-muted">
									{osType.distro}
								</h6>
								<ul>
									<li>
										<span style={{ fontWeight: 'bold' }}>Manufacturer:</span>{' '}
										{systemInformation.baseboard.manufacturer}
									</li>

									<li>
										<span style={{ fontWeight: 'bold' }}>System Model:</span>{' '}
										{systemInformation.system.model}
									</li>

									<li>
										<span style={{ fontWeight: 'bold' }}>
											Basedboard Model:
										</span>{' '}
										{systemInformation.baseboard.model}
									</li>

									<li>
										<span style={{ fontWeight: 'bold' }}>Kernel:</span>{' '}
										{osType.kernel}
									</li>

									<li>
										<span style={{ fontWeight: 'bold' }}>Release:</span>{' '}
										{osType.release}
									</li>

									<li>
										<span style={{ fontWeight: 'bold' }}>Arch:</span>{' '}
										{osType.arch}
									</li>
								</ul>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default OSInfo;
