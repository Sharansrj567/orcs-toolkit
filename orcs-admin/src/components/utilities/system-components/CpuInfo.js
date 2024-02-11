import React from 'react';
import { Container, Row, Col } from 'shards-react';

class CpuInfo extends React.Component {
	render() {
		const { cpu, cpuTemp, isActive } = this.props;

		if (!isActive) {
			return <div>Loading...</div>;
		}

		return (
			<Container>
				<Row>
					<Col className="mb-4">
						<div className="card">
							<div className="card-body">
								<h3 className="card-title">CPU Info</h3>
								<h6 className="card-subtitle mb-2 text-muted">{cpu.brand}</h6>
								<ul>
									<li>
										<span style={{ fontWeight: 'bold' }}>Manufacturer:</span>{' '}
										{cpu.manufacturer}
									</li>
									<li>
										<span style={{ fontWeight: 'bold' }}>Cores:</span>{' '}
										{cpu.cores}
									</li>

									<li>
										<span style={{ fontWeight: 'bold' }}>CPU Temperature:</span>{' '}
										{cpuTemp.main},{' '}
									</li>
									<li>
										<span style={{ fontWeight: 'bold' }}>
											Max Temperature:{' '}
										</span>{' '}
										{cpuTemp.max}
									</li>
									<li>
										<span style={{ fontWeight: 'bold' }}>
											Supports CPU Virtualization:
										</span>{' '}
										{String(cpu.virtualization)}
									</li>
									<li>
										<span style={{ fontWeight: 'bold' }}>
											Cores Temperature:{' '}
										</span>{' '}
										<ul>
											<li>
												{cpuTemp.cores.map((data, index) => {
													return (
														<span key={index}>
															{' '}
															[{data}]{''}
														</span>
													);
												})}
											</li>
										</ul>
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

export default CpuInfo;
