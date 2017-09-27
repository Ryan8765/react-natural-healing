import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import validator from 'validator';
import { getAuthToken_h, unauth_redirect_h } from "../../../helpers/auth";
import axios from 'axios';
import { BASE_SERVER_URL } from '../../../config';


class CreateTreatmentForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			error: "",
			validated: false, 
			formTreatmentData: {
				treatmentName: '',
				description: '',
				precautions: '',
				name: '',
				brandName: '',
				dosage: '',
				cost: '',
				notes: '',
				selected: false
			},
			showTrashCan: false,
			treatmentComponents: [
				
			] 
		};

		this.handleInputChange          = this.handleInputChange.bind(this);
		this.handleAddTreatmentComponent     = this.handleAddTreatmentComponent.bind(this);
		this.handleSelectClick          = this.handleSelectClick.bind(this);
		this.handleDeleteTreatmentComponents = this.handleDeleteTreatmentComponents.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	/*
		Is the form validated to allow submission.
	 */
	isFormValidated() {
		var treatmentName = this.state.formTreatmentData.treatmentName;
		if( treatmentName && this.state.treatmentComponents.length > 0 ) {
			return true;
		}

		return false;
	}

	/*
		Is treatment item validated
	 */
	isTreatmentItemValidated() {
		var { name, brandName, dosage, cost, notes } = this.state.formTreatmentData;
		if( validator.isEmpty(name) && validator.isEmpty(brandName) && validator.isEmpty(dosage) && validator.isEmpty(cost) && validator.isEmpty(notes)) {
			return false;
		} 
		return true;
	}

	/*
		Disable submit button if not validated.
	 */
	disableSubmitButton() {
		if( !this.isFormValidated() ) {
			return "disabled";
		}
	}

	/*
		Disable add item if nothing filled in.
	 */
	disableAddItemButton() {
		if( !this.isTreatmentItemValidated() ) {
			return "disabled";
		}
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			formTreatmentData:{
				...this.state.formTreatmentData,
				[name]: value
			}
		},() => {
			if( this.isFormValidated() ) {
				this.setState({validated: true});
			}
		});

	}

	/**
	 * Hides/shows trashcan based on weather a user has a treatment item row selected
	 * @param {[array]} treatmentComponents [array of objects of treatment items state]
	 */
	setTrashCanState( treatmentComponents ) {
		var numSelectedItems = 0;
		treatmentComponents.forEach((treatment) => {
			if( treatment.selected === true ) {
				numSelectedItems++;
			}
		});

		//conditionally hide/show trashcan if a user has selected 
		if( numSelectedItems > 0 ) {
			this.setState({
				showTrashCan: true
			});
		} else {
			this.setState({
				showTrashCan: false
			})
		}
	}

	/**
	 * When select box is clicked - checks/unchecks it.
	 * @param  {[type]} id [description]
	 * @return {[type]}    [description]
	 */
	handleSelectClick( id ) {
		var treatmentComponents = [...this.state.treatmentComponents];
		var updatedTreatmentComponents = treatmentComponents.map((treatment) => {
			if( treatment.id == id ) {
				treatment.selected = !treatment.selected;
			}
			return treatment;
		});

		this.setState({
			treatmentComponents: updatedTreatmentComponents
		});

		//hide/show trashcan based on whether a user has selected a row.
		this.setTrashCanState( updatedTreatmentComponents );
		
	}


	handleDeleteTreatmentComponents(e) {
		var treatmentComponents = [...this.state.treatmentComponents];
		var updatedTreatmentComponents = treatmentComponents.filter((treatment) => {
			return treatment.selected === false;
		});

		this.setState({
			treatmentComponents: updatedTreatmentComponents
		});

		this.setTrashCanState( updatedTreatmentComponents );
	}


	handleAddTreatmentComponent() {
		const { name, brandName, dosage, cost, notes } = this.state.formTreatmentData;
		var id = 0;
		const treatmentComponents = this.state.treatmentComponents;

		//find highest key for components.
		treatmentComponents.forEach(function(component) {
			var componentID = component.id;
			if( componentID > id ) {
				id = componentID;
			}
		});

		//add one to ID for a unique key.
		id += 1;
		//give the treatmentItem an ID for the key to be used in the component when iterating over the <tr>'s.
		const newItem = {
			name,
			brandName,
			dosage,
			cost,
			notes,
			id,
			//get related condition from parent component.
			relatedCondition: this.props.conditionID,
			selected: false
		}

		this.setState({
			treatmentComponents: [
				...this.state.treatmentComponents,
				newItem
			]

		});

		this.setState({
			formTreatmentData: {
				...this.state.formTreatmentData,
				name: '',
				brandName: '',
				dosage: '',
				cost: '',
				notes: '',
				selected: false
			}
		});

	}


	//if error from the db - show it.
	showErrorMessage() {
		var error = this.state.error;

		if( error ) {
			return (
				<div className="validation-error-text">{error}</div>
			);
		}
	}


	handleSubmit() {
		const { treatmentName, description, precautions } = this.state.formTreatmentData;
		const treatmentComponents = this.state.treatmentComponents;

		var data = {
			name: treatmentName,
			description,
			precautions,
			conditionID: this.props.conditionID,
			treatmentComponents: treatmentComponents.map(function(item) {
				var newItem = {
					name: item.name,
					brandName: item.brandName,
					cost: item.cost,
					dosage: item.dosage,
					notes: item.notes
				}
				return newItem;
			})
		};


		axios({
			method: 'post',
			url: `${BASE_SERVER_URL}/treatment`,
			headers: {
				authorization: getAuthToken_h()
			},
			data
		})
		.then((res) => {
			//change state of submit - show confirmation page.
			this.props.submit(true);
		})
		.catch((err) => {
			var history = this.props.history;
			
			//if user was unauthorized - redirect to login page.			
			unauth_redirect_h( err, history );

			if( err.response.data.error ) {
				this.setState({error: err.response.data.error});
			} else {
				this.setState({error: 'An error occurred, please try again.  If the problem persists, please contact us.'});
			}
		});
		
	}

	render() {

		var formTreatmentData = this.state.formTreatmentData;
		var treatmentComponents    = this.state.treatmentComponents;


		const tableRows = treatmentComponents.map((treatment) => 
			<tr key={treatment.id}>
				<td className="select-cell"><input type="checkbox" checked={treatment.selected} onClick={ () => this.handleSelectClick(treatment.id) }/></td>
				<td>{treatment.name}</td>
				<td>{treatment.brandName}</td>
				<td>{treatment.dosage}</td>
				<td>{treatment.notes}</td>
				<td>{treatment.cost}</td>
			</tr>
		);

		const showTrashCan = () => {
			if( this.state.showTrashCan ) {
				return (
					<div className="row">
						<span className="delete-row" title="Delete Selected Treatment Items" onClick={this.handleDeleteTreatmentComponents}>
							<i className="fa fa-trash" aria-hidden="true"></i>
						</span>
					</div>
				);
			}
		};


		return(
			<div>
				<div className="row">	
					<h3 className="centered">Create Treatment</h3>
					<h5 className="centered required-text">* Required Fields</h5>


					<div className="col-md-4 col-md-offset-4">
						<div className="form-group">
							<h4><span className="required-field"> * </span>Treatment Name</h4>
							<input type="text" className="form-control" name="treatmentName" onChange={this.handleInputChange} />
						</div>
						<div className="form-group">
							<h4>Description of Treatment</h4>
							<textarea className="form-control" name="description" id="" cols="30" rows="10" onChange={this.handleInputChange} value={formTreatmentData.description}></textarea>
						</div>
						<div className="form-group">
							<h4>Precautions/Side Effects Noted</h4>
							<textarea className="form-control" name="precautions" id="" cols="30" rows="10" onChange={this.handleInputChange} value={formTreatmentData.precautions}></textarea>
						</div>
						<div className="form-group">
							<h4 className="margin-top">Create Treatment Component</h4>
							<div className="row">
								<div className="col-md-6">
									<label htmlFor="">Supplement/Item Name</label>
									<input className="form-control treatment-item" type="text" placeholder="Name" name="name" onChange={this.handleInputChange} value={formTreatmentData.name}/>
								</div>
								<div className="col-md-6">
									<label htmlFor="">Brand Name</label>
									<input className="form-control treatment-item" type="text" placeholder="Brand Name" name="brandName"  onChange={this.handleInputChange} value={formTreatmentData.brandName}/>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<label htmlFor="">Dosage/Frequency</label>
									<input className="form-control treatment-item" type="text" placeholder="Dosage/Frequency" name="dosage" onChange={this.handleInputChange} value={formTreatmentData.dosage}/>
								</div>
								<div className="col-md-6">
									<label htmlFor="">Cost</label>
									<input className="form-control treatment-item" type="number" placeholder="Cost" min="0" name="cost"  onChange={this.handleInputChange} value={formTreatmentData.cost}/>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12">
									<label htmlFor="">Notes</label>
									<input className="form-control treatment-item" type="text" placeholder="Misc" name="notes" onChange={this.handleInputChange} value={formTreatmentData.notes}/>
								</div>
							</div>
							<input type="hidden" placeholder="Misc" name="selected" onChange={this.handleInputChange} value={formTreatmentData.selected}/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-2 col-md-offset-5 margin-top-sm">
						<input id="add-item" type="submit" className="form-control styled-button" value="Add Treatment Component" onClick={this.handleAddTreatmentComponent} disabled={this.disableAddItemButton()}/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6 col-md-offset-3">
						<h4 className="centered margin-top"><span className="required-field"> * </span>Treatment Components</h4>
						<div className="trash-container">
							{showTrashCan()}
						</div>
						<table className="table table-bordered">
							<thead>
								<tr>
									<td>
									 	
									 </td>
									<td>Name</td>
									<td>Brand Name</td>
									<td>Dosage/Frequency</td>
									<td>Notes</td>
									<td>Cost</td>
								</tr>
							</thead>
							<tbody>
								{tableRows}
							</tbody>
						</table>
						
					</div>
					<div className="row">
						<div className="col-md-2 col-md-offset-5">
							{this.showErrorMessage()}
							<input 
								type="submit" 
								className="submit-button form-control styled-button" 
								value="Submit Treatment" 
								disabled={this.disableSubmitButton()}
								onClick={this.handleSubmit}/>
						</div>
					</div>

				</div>

			</div>
		);
	}
}




function renderTableBody( tableData ) {
		const tableRows = tableData.map((treatment) => 
			<tr key={treatment.id}>
				<td className="select-cell"><input type="checkbox" checked={treatment.selected} onClick={ () => this.handleSelectClick(treatment.id) }/></td>
				<td>{treatment.name}</td>
				<td>{treatment.brandName}</td>
				<td>{treatment.dosage}</td>
				<td>{treatment.notes}</td>
				<td>{treatment.cost}</td>
			</tr>
		);
	
	return (

			<tbody>
				{tableRows}
			</tbody>
	);
}





const selectRowProp = {
	mode: 'checkbox'
};



export default CreateTreatmentForm;