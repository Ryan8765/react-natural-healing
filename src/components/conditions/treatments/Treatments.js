import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './styles/react-bootstrap-table-all.min.css';
import './styles/styles.css';
import { BASE_SERVER_URL } from '../../../config';
import axios from 'axios';
import currencyFormatter from 'currency-formatter';
import {Link} from 'react-router-dom';






class Treatments extends Component {
	constructor(props) {
		super(props);

		this.state = {
			treatments: null,
			conditionName: null
		}

		this.onChangeRoutes = this.onChangeRoutes.bind(this);
	}


	onChangeRoutes(id) {
		this.props.history.push(`/treatment/${id}`);
	}



	componentDidMount() {
		console.log( "mounted" );
		//get URL parameter
		var id = this.props.match.params.id;

		axios({
		    method: 'get',
		    url: `${BASE_SERVER_URL}/condition/${id}/treatments`
		})
		.then((res) => {
			var treatmentData = res.data.treatments;
			var conditionName = res.data.condition;
			var id = res.data._id;
			if( treatmentData.length > 0 ) {
				var treatments = treatmentData.map((treatment) => {
					if( !treatment.rating ) {
						treatment.rating = null;
					}
					return {
						_id: treatment._id,
						cost: currencyFormatter.format(Number(treatment.cost), { code: 'USD' }),
						name: treatment.name,
						rating: treatment.rating
					};
				});

				this.setState({
					conditionName,
					treatments
				});

			} else {
				this.setState({
					error: "There are no treatments associated with this condition yet."
				});
			}	
	
		})
		.catch((err) => {
		    
		});
		
	}

	render() {
		//handles onclick row events for table
		const options = {
			onRowClick: (row) => {
				// alert(`You clicked row id: ${row.id}`);
				this.onChangeRoutes( row._id );
			},
			onRowDoubleClick: (row) => {
				this.onChangeRoutes( row._id );
			}
		};


		const createTreatmentURl = () => {
			var id = this.props.match.params.id;

			return `/treatments/create/${id}`;
		}



		return (
			<div className="row">
				<div className="centered">
					<h3 className="centered">Treatments for {this.state.conditionName}</h3>
					<Link to={createTreatmentURl()}>&#43;Submit New Treatment</Link>
				</div>
				<div id="table-container">
					<div className="row">
						<div className="margin-top"></div>
						<div className="col-md-6 col-md-offset-3">
							<BootstrapTable data={this.state.treatments} hover pagination options={ options } keyField="_id">
						      <TableHeaderColumn dataField='name' dataSort={ true } filter={ { type: 'TextFilter', delay: 250 } }>Treatment Title</TableHeaderColumn>
						    
						      <TableHeaderColumn dataField='rating' dataSort={ true }>Patient Rating</TableHeaderColumn>
						      <TableHeaderColumn dataField='cost' dataSort={ true }>Cost</TableHeaderColumn>
						    </BootstrapTable>
						</div>
					</div>
				</div>
			</div>

		);
	}
}

export default Treatments;