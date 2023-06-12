import React from 'react';
import { Container, Row, Col } from 'shards-react';

class MenInfo extends React.Component {
	render() {
		const { mem, isActive } = this.props;

		if (!isActive) {
			return <div>Loading...</div>;
		}

		return (
			<Container>
				<Row>
					<Col className="mb-4">
						<div className="card">
							<div className="card-body">
								<h3 className="card-title">Memory Info</h3>
								<h6 className="card-subtitle mb-2 text-muted">
									<span style={{ fontWeight: 'bold' }}>Total: </span>{' '}
									{Number(mem.total / (1024 * 1024 * 1024)).toFixed(2)} GB
								</h6>
								<ul>
									<li>
										<span style={{ fontWeight: 'bold' }}>Active:</span>{' '}
										{Number(mem.active / (1024 * 1024 * 1024)).toFixed(2)} GB
									</li>
									<li>
										<span style={{ fontWeight: 'bold' }}>Available:</span>{' '}
										{Number(mem.available / (1024 * 1024 * 1024)).toFixed(2)} GB
									</li>
									<li>
										<span style={{ fontWeight: 'bold' }}>Buffers:</span>{' '}
										{Number(mem.buffers / (1024 * 1024 * 1024)).toFixed(2)} GB
									</li>
									<li>
										<span style={{ fontWeight: 'bold' }}>Free:</span>{' '}
										{Number(mem.free / (1024 * 1024 * 1024)).toFixed(2)} GB
									</li>
									<li>
										<span style={{ fontWeight: 'bold' }}>Used:</span>{' '}
										{Number(mem.used / (1024 * 1024 * 1024)).toFixed(2)} GB
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

export default MenInfo;
