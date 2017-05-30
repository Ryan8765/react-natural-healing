import React, { Component } from 'react';


class CreateTreatment extends Component {

	constructor(props) {
		super(props);
	}

	render() {
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
						<table id="treatment-item-table" className="table table-bordered table-style">
							<thead>
								<tr>
									<th>Name</th>
									<th>Brand Name</th>
									<th>Dosage/Frequency</th>
									<th>Misc Notes</th>
									<th>Cost</th>
								</tr>
							</thead>
							
							<tbody id="append">
								<tr>
									<td>Charcoal</td>
									<td>Natures Way</td>
									<td>3/day</td>
									<td>Write something</td>
									<td>256$</td>
									<td><span title="Remove" className="delete-treatment-item"><i className="fa fa-times-circle" aria-hidden="true"></i></span></td>
								</tr>
								<tr>
									<td>Charcoal</td>
									<td>Natures Way</td>
									<td>3/day</td>
									<td>Write something</td>
									<td>256$</td>
									<td><span title="Remove" className="delete-treatment-item"><i className="fa fa-times-circle" aria-hidden="true"></i></span></td>
								</tr>
								<tr>
									<td>Charcoal</td>
									<td>Natures Way</td>
									<td>3/day</td>
									<td>Write something</td>
									<td>256$</td>
									<td><span title="Remove" className="delete-treatment-item"><i className="fa fa-times-circle" aria-hidden="true"></i></span></td>
								</tr>
								<tr>
									<td>Charcoal</td>
									<td>Natures Way</td>
									<td>3/day</td>
									<td>Write something</td>
									<td>256$</td>
									<td><span title="Remove" className="delete-treatment-item"><i className="fa fa-times-circle" aria-hidden="true"></i></span></td>
								</tr>

							</tbody>
						</table>
					</div>
					<div className="row">
						<div className="col-md-2 col-md-offset-5">
							
							<input type="submit" className="form-control styled-button" value="Submit Treatment" />
							
						</div>
					</div>

				</div>

			</div>
		);
	}

}


export default CreateTreatment;