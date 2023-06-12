import React from 'react';
import { Container, Row, Col } from 'shards-react';
import { TailSpin } from 'react-loader-spinner';

import socket from '../socket/socketInit';
import OsInfo from './utilities/system-components/OsInfo';
import CpuInfo from './utilities/system-components/CpuInfo';
import MemInfo from './utilities/system-components/MemInfo';
import NetworkInfo from './utilities/system-components/NetworkInfo';

class Dashboard extends React.Component {
	constructor() {
		super();
		this.state = {
			perfData: {},
		};
	}

	componentDidMount() {
		this._fetchData = true;

		if (this._fetchData) {
			socket.on('data', (data) => {
				var currentState = { ...this.state.perfData };
				currentState[data.macA] = data;
				this.setState({
					perfData: currentState,
				});
			});
		}
	}

	componentWillUnmount() {
		this._fetchData = false;
	}

	render() {
		const {
			isActive,
			osType,
			systemInformation,
			cpu,
			cpuTemp,
			mem,
			networkInterfaces,
		} = this.state.perfData;

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

		if (!osType) {
			return (
				<div
					style={{ backgroundColor: 'rgb(255, 250, 250)' }}
					className="jumbotron card jumbotron-fluid"
				>
					<h2 className="card-title">System Offline...</h2>
					<p className="card-text">Oops! Lost connection to the system. 🚫</p>
				</div>
			);
		}
		// console.log(this.props.sysInfo);
		return (
			<Container fluid className="main-content-container px-4">
				<Row>
					<Col className="col-lg mb-4">
						<div
							style={{
								backgroundColor: 'rgb(255, 250, 250)',
							}}
							className="jumbotron card jumbotron-fluid"
						>
							<h2>
								<span style={{ fontWeight: 'bold' }}>ORCS</span> - Open Resource
								Control And Surveillance Toolkit
							</h2>
						</div>
					</Col>
				</Row>
				<Row>
					<Col className="col-lg-4 mb-2">
						<OsInfo
							isActive={isActive}
							osType={osType}
							systemInformation={systemInformation}
						/>
					</Col>
					<Col className="col-lg-4 mb-2">
						<CpuInfo isActive={isActive} cpu={cpu} cpuTemp={cpuTemp} />
					</Col>
					<Col className="col-lg-4 mb-2">
						<MemInfo isActive={isActive} mem={mem} />
					</Col>
					<Col className="col-lg-12 mb-2">
						<NetworkInfo
							isActive={isActive}
							networkInterfaces={networkInterfaces}
						/>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Dashboard;
