import React from 'react';
import { Container, Row, Col } from 'shards-react';

import ProcesInfo from './utilities/process-components/ProcesInfo';
import ProcessList from './utilities/process-components/ProcessList';

class ProcessApp extends React.Component {
	constructor() {
		super();
		this.state = {
			perfData: {},
		};
	}

	componentDidMount() {
		this._fetchData = true;

		if (this._fetchData) {
			window.api.receive('sysInfo:fetch', (data, event) => {
				this.setState({
					perfData: data,
				});
			});
		}
	}

	componentWillUnmount() {
		this._fetchData = false;
	}

	render() {
		const { processData, isActive } = this.state.perfData;

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
					<Col className="col-lg-8">
						<ProcessList isActive={isActive} processData={processData} />
					</Col>
					<Col className="col-lg-4">
						<ProcesInfo isActive={isActive} processData={processData} />
					</Col>
				</Row>
			</Container>
		);
	}
}

export default ProcessApp;
