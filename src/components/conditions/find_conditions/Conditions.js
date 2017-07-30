import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { BASE_SERVER_URL } from '../../../config';
import axios from 'axios';




import './styles/react-bootstrap-table-all.min.css';
import './styles/styles.css';



class Conditions extends Component {
	

	constructor(props) {
		super(props);

		this.state = {
			conditions: [
			{
				_id: "",
				condition: ""
			}]
		};

		this.onChangeRoutes = this.onChangeRoutes.bind(this);
	}

	componentDidMount() {
		//get all conditions and populate state.
		// if( this.state.conditions.length < 1 ) {
		// 	this.getConditions();
		// }
		this.getConditions();
		
	}

	onChangeRoutes(id) {
		this.props.history.push(`condition/${id}/treatments`);
	}


	getConditions() {
		axios({
			method: 'get',
			url: `${BASE_SERVER_URL}/conditions`
		})
		.then((res) => {
			console.log( res );
			this.setState({
				conditions: res.data
			});
		})
		.catch((err) => {
			console.log( err );
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

		return (
			<div>
				<div className="row">
					<h3 className="centered">Select Condition</h3>
					<div className="margin-top"></div>
					<div id="table-container">
						<div className="col-md-4 col-md-offset-4">
							<BootstrapTable data={this.state.conditions} hover pagination options={ options } keyField="_id">
						      	<TableHeaderColumn 
						      			dataField='condition' 
						      			dataAlign='center' 
						      			filter={ { type: 'TextFilter', delay: 250 ,placeholder:"Search for condition"} } 
						      			dataSort={ true }>Search Conditions
						      	</TableHeaderColumn>
						  	</BootstrapTable>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Conditions;	