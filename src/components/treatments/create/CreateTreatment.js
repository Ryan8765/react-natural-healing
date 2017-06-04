import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import './styles.css';


class CreateTreatment extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		var treatmentItems = [
			{
				id: '1',
				name: 'Charcoal',
				brandName: 'Natures Way',
				dosage: '3/day',
				notes: 'Write something here.',
				cost: '$256.00'
			},
			{
				id: '2',
				name: 'Charcoal',
				brandName: 'Natures Way',
				dosage: '3/day',
				notes: 'Write something here.',
				cost: '$256.00'
			},
			{
				id: '3',
				name: 'Charcoal',
				brandName: 'Natures Way',
				dosage: '3/day',
				notes: 'Write something here.',
				cost: '$256.00'
			},
			{
				id: '4',
				name: 'Charcoal',
				brandName: 'Natures Way',
				dosage: '3/day',
				notes: 'Write something here.',
				cost: '$256.00'
			},
			{
				id: '5',
				name: 'Charcoal',
				brandName: 'Natures Way',
				dosage: '3/day',
				notes: 'Write something here.',
				cost: '$256.00'
			}
		];

		return (
			<div>

				<div className="row">	
					<h3 className="centered">Create Treatment</h3>

					<div className="col-md-4 col-md-offset-4">
						<div className="form-group">
							<h4>Description of Treatment</h4>
							<textarea className="form-control" name="" id="" cols="30" rows="10"></textarea>
						</div>
						<div className="form-group">
							<h4>Precautions/Side Effects Noted</h4>
							<textarea className="form-control" name="" id="" cols="30" rows="10"></textarea>
						</div>
						<div className="form-group">
							<h4 className="margin-top">Add Treatment Items</h4>
							<div className="row">
								<div className="col-md-6">
									<label for="">Name</label>
									<input className="form-control treatment-item" type="text" placeholder="Name" />
								</div>
								<div className="col-md-6">
									<label for="">Brand Name</label>
									<input className="form-control treatment-item" type="text" placeholder="Brand Name" />
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<label for="">Dosage/Frequency</label>
									<input className="form-control treatment-item" type="text" placeholder="Dosage/Frequency" />
								</div>
								<div className="col-md-6">
									<label for="">Cost</label>
									<input className="form-control treatment-item" type="number" placeholder="Cost" min="0" />
								</div>
							</div>
							<div className="row">
								<div className="col-md-12">
									<label for="">Miscellaneous Notes</label>
									<input className="form-control treatment-item" type="text" placeholder="Misc" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-2 col-md-offset-5 margin-top-sm">
						<input id="add-item" type="submit" className="form-control styled-button" value="Add Item" name="submit-doctor" />
					</div>
				</div>
				<div className="row">
					<div className="col-md-6 col-md-offset-3">
						<h4 className="centered margin-top">Treatment Items</h4>
						<div className="row">
							<span title="Delete Selected Treatment Items">
								<i className="fa fa-trash delete-row" aria-hidden="true"></i>
							</span>
						</div>
						<BootstrapTable className="margin-top-sm" selectRow={ selectRowProp } data={ treatmentItems } hover pagination keyField="id">
							<TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
							<TableHeaderColumn dataField='brandName' dataSort={ true }>Brand Name</TableHeaderColumn>
							<TableHeaderColumn dataField='dosage' dataSort={ true }>Dosage/Frequency</TableHeaderColumn>
							<TableHeaderColumn dataField='notes' dataSort={ true }>Notes</TableHeaderColumn>
							<TableHeaderColumn dataField='cost' dataSort={ true }>Cost</TableHeaderColumn>
					    </BootstrapTable>
					</div>
					<div className="row">
						<div className="col-md-2 col-md-offset-5">
							<input type="submit" className="form-control styled-button margin-top" value="Submit Treatment" />
						</div>
					</div>

				</div>

			</div>
		);
	}

}



const selectRowProp = {
	mode: 'checkbox'
};






export default CreateTreatment;