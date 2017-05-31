import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import './styles/react-bootstrap-table-all.min.css';
import './styles/styles.css';



class Conditions extends Component {
	constructor() {
		super();
	}

	render() {

		//handles onclick row events for table
		const options = {
			onRowClick: function(row) {
				alert(`You clicked row id: ${row.id}`);
			},
			onRowDoubleClick: function(row) {
				alert(`You double clicked row id: ${row.id}`);
			}
		};

		var treatments = [
			{
				id: 1,
				name: "Acne"
			},
			{
				id: 2,
				name: "Bruises"
			},
			{
				id: 3,
				name: "Burn"
			},
			{
				id: 4,
				name: "CFS"
			},
			{
				id: 5,
				name: "Headache"
			},
			{
				id: 6,
				name: "Heart Disease"
			},
			{
				id: 3,
				name: "Burn"
			},
			{
				id: 4,
				name: "CFS"
			},
			{
				id: 5,
				name: "Headache"
			},
			{
				id: 6,
				name: "Heart Disease"
			},
			{
				id: 3,
				name: "Burn"
			},
			{
				id: 4,
				name: "CFS"
			},
			{
				id: 5,
				name: "Headache"
			},
			{
				id: 6,
				name: "Heart Disease"
			}

		];

		return (
			<div>
				<div className="row">
					<h3 className="centered">Search Conditions</h3>
					<div className="margin-top"></div>
					<div id="table-container">
						<div className="col-md-4 col-md-offset-4">
							<BootstrapTable data={treatments} hover pagination options={ options } keyField="id">
						      	<TableHeaderColumn 
						      			dataField='name' 
						      			dataAlign='center' 
						      			filter={ { type: 'TextFilter', delay: 250 ,placeholder:"Search for condition"} } 
						      			dataSort={ true }>Conditions
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