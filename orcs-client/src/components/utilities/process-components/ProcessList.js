import './processList.css';
import { Component } from 'react';
import { Container } from 'shards-react';
import { TailSpin } from 'react-loader-spinner';

class ProcessList extends Component {
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

		const renderTableBody = () => {
			return processData.list.map((i) => {
				return (
					<tr key={i.pid}>
						<th className="col-3">{i.name}</th>
						<td className="col-3">{i.user}</td>
						<td className="col-3">{Number(i.mem).toFixed(3)}</td>
						<td className="col-3">{Number(i.cpu).toFixed(3)}</td>
						<td className="col-3">
							<button
								className="btn btn-dark btn-sm"
								onClick={() => {
									this.setState({ selectedProcess: i.pid });
								}}
							>
								more info
							</button>
						</td>
					</tr>
				);
			});
		};

		const renderTable = () => {
			return (
				<div className="container-fluid">
					<div className="tableFixHead">
						<table className="table table-hover table-fixed">
							<thead className="thead-dark">
								<tr>
									<th scope="col" className="col-3">
										name
									</th>
									<th scope="col" className="col-3">
										user
									</th>

									<th scope="col" className="col-3">
										memory%
									</th>
									<th scope="col" className="col-3">
										cpu %
									</th>
									<th scope="col" className="col-3">
										stats
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
				<div className="card">
					<div className="card-body">
						<h3 className="card-title">Process List</h3>
						<h6 className="card-subtitle mb-2 text-muted">
							Process Information
						</h6>
						{renderTable()}
					</div>
				</div>
			</Container>
		);
	}
}

export default ProcessList;
