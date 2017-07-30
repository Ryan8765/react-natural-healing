import React, { Component } from 'react';
import validator from 'validator';
import axios from 'axios';
import { BASE_SERVER_URL } from '../../../config';


class ConditionForm extends Component {

	constructor(props) {
		super(props);

		this.state = { 
			error: "",
			inputsTouched: {
				condition: false, 
				description: false
			}, 
			inputValidation: {
				condition: false, 
				description: false
			},
			inputData: {
				condition: "", 
				description: ""
			}
		};

		this.handleSubmit      = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}


	handleSubmit( event ) {

		event.preventDefault();

		var data = this.state.inputData;


		axios({
			method: 'post',
			url: `${BASE_SERVER_URL}/condition`,
			headers: {
				authorization: localStorage.getItem('token')
			},
			data
		})
		.then((res) => {
			this.props.submit(true);
			//update the state in the parent component to hide form and show success components.
		})
		.catch((err) => {
			console.log( err );
			this.setState({error: err.response.data.error});
		});

	}




	isFormValidated() {
		var validations = this.state.inputValidation;

		if( validations.condition && validations.description ) {
			return true;
		}

		return false;
	}


	disableButton() {
		if( !this.isFormValidated() ) {
			return "disabled";
		}
	}


	handleInputChange( event ) {
		const target     = event.target;
		const value      = target.type === 'checkbox' ? target.checked : target.value;
		const name       = target.name;


		this.setState({
			inputData:{
				...this.state.inputData,
				[name]: value
			}
		},() => {
			this.handleValidation( name, value);
		});
	}


	handleValidation(name, value) {
		var inputValidation    = this.state.inputValidation;

		var validation = {
			condition: inputValidation.condition, 
			description: inputValidation.description
		}

		var inputsTouched = this.state.inputsTouched;

		switch (name){
			case 'condition':
				if( !validator.isEmpty(value) ) {
					validation.condition = true;
				} else {
					validation.condition = false;
				}
				break;
			case 'description':
				if( !validator.isEmpty(value) ) {
					validation.description = true;
				} else {
					validation.description = false;
				}
				break;
		}

		this.setState({
			inputValidation: validation
		},() => {
		});
	}

	renderErrorClass (name) {
		var validated = this.state.inputValidation[name];
		var touched = this.state.inputsTouched[name];
		if( !validated && touched ) {
			return "val-error form-control";
		} else {
			return 'form-control';
		}
	}


	showErrorMessage() {
		var error = this.state.error;

		if( error ) {
			return (
				<div className="validation-error-text">{error}</div>
			);
		}
	}

	


	/**
	 * Show validation errors on the screen
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	showValidationError( name ) {
		const touched   = this.state.inputsTouched;
		const validated = this.state.inputValidation;

		if ( name === 'condition' ) {
			if( touched.condition && !validated.condition ) {
				return (<span className="validation-error-text">Required field</span>);
			}
		} else if ( name === 'description' ) {

			if( touched.description && !validated.description ) {
				return (<span className="validation-error-text">Required field</span>);
			}
		}
	}

	//logs which form elements have been blurred. 
	handleBlur = (field) => (evt) => {
		this.setState({
			inputsTouched: { ...this.state.inputsTouched, [field]: true }
		},() => {

		});
	}


	render() {
		return(

			<div className="row">	
				<h3 className="centered">Submit New Condition</h3>

				<div className="col-md-4 col-md-offset-4">
					<div className="row">
						<div className="centered margin-top-sm">Haven't found the condition you're looking for?  Submit a new one!  If the condition hasn't been listed yet, it will be added.</div>
					</div>
					
					<form className="margin-top-sm" onSubmit={this.handleSubmit}>
						<div className="form-group">	
							<label htmlFor="name">Condition Name</label>
							<input 
								className={ this.renderErrorClass ('condition') } 
								placeholder="Enter condition name..." 
								name="condition" 
								onChange={ this.handleInputChange }
								onBlur={this.handleBlur('condition')}/>
								{this.showValidationError('condition')}
						</div>
						<div className="form-group">	
							<label htmlFor="name">Condition Description</label>
							<textarea 
								className={ this.renderErrorClass ('description') } 
								placeholder="Enter condition description..." 
								cols="30" 
								rows="10" 
								name="description" 
								onChange={ this.handleInputChange }
								onBlur={this.handleBlur('description')}/>
								{this.showValidationError('description')}
						</div>
						<div className="row">
							{this.showErrorMessage()}	
							<input type="submit" className="form-control styled-button" value="Submit" name="submit-doctor" disabled={this.disableButton()}/>
						</div>
					</form>		
				</div>
			</div>
		);
	}
}


export default ConditionForm;