import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './styles/react-bootstrap-table-all.min.css';
import './styles/styles.css';

// import './lib/datatables/dataTables.bootstrap.min.css';
// import './lib/datatables/dataTables.bootstrap.min.js';
// import './lib/datatables/dataTables.min.js';

// import $ from 'jquery';
// $.DataTable = require('datatables.net');



class Treatments extends Component {
	constructor(props) {
		super(props);
		this.onChangeRoutes = this.onChangeRoutes.bind(this);
	}

	// createTreatmentLink(cell, row, enumObject) {
	// 	return `<a href="http://wwww.google.com/${cell}"><i class="view-link fa fa-eye" aria-hidden="true"></i></a>`;
	// }
	onChangeRoutes(id) {
		this.props.history.push(`/treatment/${id}`);
	}

	render() {
		//handles onclick row events for table
		const options = {
			onRowClick: (row) => {
				// alert(`You clicked row id: ${row.id}`);
				this.onChangeRoutes( row.id );
			},
			onRowDoubleClick: (row) => {
				this.onChangeRoutes( row.id );
			}
		};

		var treatments = [
			{
				id: 1,
				name: 'Herbal Cleanser',
				docRating: 9.5,
				patientRating: 9,
				cost: "$30.00"
			},
			{
				id: 2,
				name: 'Charcoal Cleanser',
				docRating: 9.5,
				patientRating: 9,
				cost: "$60.00"
			},
			{
				id: 3,
				name: 'Paint Cleanser',
				docRating: 9.5,
				patientRating: 9,
				cost: "$51.00"
			},
			{
				id: 1,
				name: 'Herbal Cleanser',
				docRating: 9.5,
				patientRating: 9,
				cost: "$30.00"
			},
			{
				id: 2,
				name: 'Charcoal Cleanser',
				docRating: 9.5,
				patientRating: 9,
				cost: "$60.00"
			},
			{
				id: 3,
				name: 'Paint Cleanser',
				docRating: 9.5,
				patientRating: 9,
				cost: "$51.00"
			},
			{
				id: 1,
				name: 'Herbal Cleanser',
				docRating: 9.5,
				patientRating: 9,
				cost: "$30.00"
			},
			{
				id: 2,
				name: 'Charcoal Cleanser',
				docRating: 9.5,
				patientRating: 9,
				cost: "$60.00"
			},
			{
				id: 3,
				name: 'Paint Cleanser',
				docRating: 9.5,
				patientRating: 9,
				cost: "$51.00"
			},
			{
				id: 1,
				name: 'Herbal Cleanser',
				docRating: 9.5,
				patientRating: 9,
				cost: "$30.00"
			},
			{
				id: 2,
				name: 'Charcoal Cleanser',
				docRating: 9.5,
				patientRating: 9,
				cost: "$60.00"
			},
			{
				id: 3,
				name: 'Paint Cleanser',
				docRating: 9.5,
				patientRating: 9,
				cost: "$51.00"
			},
			{
				id: 1,
				name: 'Herbal Cleanser',
				docRating: 9.5,
				patientRating: 9,
				cost: "$30.00"
			},
			{
				id: 2,
				name: 'Charcoal Cleanser',
				docRating: 9.5,
				patientRating: 9,
				cost: "$60.00"
			},
			{
				id: 3,
				name: 'Paint Cleanser',
				docRating: 9.5,
				patientRating: 9,
				cost: "$51.00"
			},
			{
				id: 1,
				name: 'Herbal Cleanser',
				docRating: 9.5,
				patientRating: 9,
				cost: "$30.00"
			},
			{
				id: 2,
				name: 'Charcoal Cleanser',
				docRating: 9.5,
				patientRating: 9,
				cost: "$60.00"
			},
			{
				id: 3,
				name: 'Paint Cleanser',
				docRating: 9.5,
				patientRating: 9,
				cost: "$51.00"
			},
			{
				id: 1,
				name: 'Herbal Cleanser',
				docRating: 9.5,
				patientRating: 9,
				cost: "$30.00"
			},
			{
				id: 2,
				name: 'Charcoal Cleanser',
				docRating: 9.5,
				patientRating: 9,
				cost: "$60.00"
			},
			{
				id: 3,
				name: 'Paint Cleanser',
				docRating: 9.5,
				patientRating: 9,
				cost: "$51.00"
			},
			{
				id: 1,
				name: 'Herbal Cleanser',
				docRating: 9.5,
				patientRating: 9,
				cost: "$30.00"
			},
			{
				id: 2,
				name: 'Charcoal Cleanser',
				docRating: 9.5,
				patientRating: 9,
				cost: "$60.00"
			},
			{
				id: 3,
				name: 'Paint Cleanser',
				docRating: 9.5,
				patientRating: 9,
				cost: "$51.00"
			},
			{
				id: 3,
				name: 'Acne',
				docRating: 9.5,
				patientRating: 9,
				cost: "$51.00"
			}
		];



		return (
			<div className="row">
				<div className="centered">
					<h3 className="centered">Acne</h3>
					<a href="#">&#43;Submit New Treatment</a>
				</div>
				<div id="table-container">
					<div className="row">
						<div className="margin-top"></div>
						<div className="col-md-6 col-md-offset-3">
							<BootstrapTable data={treatments} hover pagination options={ options } keyField="id">
						      <TableHeaderColumn dataField='name' dataSort={ true } filter={ { type: 'TextFilter', delay: 250 } }>Treatment Title</TableHeaderColumn>
						      <TableHeaderColumn dataField='docRating' dataSort={ true }>Doctor Rating</TableHeaderColumn>
						      <TableHeaderColumn dataField='patientRating' dataSort={ true }>Patient Rating</TableHeaderColumn>
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