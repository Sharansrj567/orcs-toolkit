import React from 'react';
import { Container, Row, Col } from 'shards-react';

class NetworkInfo extends React.Component {
	render() {
		const netInfo = this.props.networkInterfaces;

		if (!this.props.isActive) {
			return <div>Loading...</div>;
		}

		const renderTableBody = () => {
			return netInfo.map((i) => {
				return (
					<tr key={i.iface}>
						<th className="col-3">{i.iface}</th>
						<td className="col-3">{String(i.dhcp)}</td>
						<td className="col-3">{String(i.internal)}</td>
						<td className="col-3">{i.ip4}</td>
						<td className="col-3">{i.operstate}</td>
						<td className="col-3">{i.type}</td>
					</tr>
				);
			});
		};

		const renderTable = () => {
			return (
				<div className="container-fluid">
					<div className="table-responsive">
						<table className="table table-fixed">
							<thead className="thead-dark">
								<tr>
									<th scope="col" className="col-3">
										Interface
									</th>
									<th scope="col" className="col-3">
										DHCP
									</th>
									<th scope="col" className="col-3">
										Internal Interface
									</th>
									<th scope="col" className="col-3">
										IPv4
									</th>
									<th scope="col" className="col-3">
										Operating State
									</th>
									<th scope="col" className="col-3">
										Connection Type
									</th>
								</tr>
							</thead>
							<tbody>{renderTableBody()}</tbody>
						</table>
					</div>
				</div>
			);
		};

		return (
			<Container>
				<Row>
					<Col className="mb-4">
						<div className="card">
							<div className="card-body">
								<h3 className="card-title">Network Interfaces</h3>
								<h6 className="card-subtitle mb-2 text-muted">
									System Connections
								</h6>
								{renderTable()}
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default NetworkInfo;
