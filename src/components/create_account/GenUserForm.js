import React, { Component } from 'react';
import validator from 'validator';
import axios from 'axios';
import { BASE_SERVER_URL } from '../../config';


class GenUserForm extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			error: "",
			inputsTouched: {
				email: false, 
				password: false,
				passwordconfirm: false,
				username: false,
			}, 
			inputValidation: {
				email: false, 
				password: false,
				passwordconfirm: false,
				username: false,
			},
			inputData: {
				email: "", 
				password: "",
				passwordconfirm: "",
				username: "",
			} 
		};


		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit      = this.handleSubmit.bind(this);

	}




	isFormValidated() {
		var validations = this.state.inputValidation;

		if( validations.email && validations.password && validations.passwordconfirm && validations.username ) {
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
			email: inputValidation.email, 
			password: inputValidation.password,
			passwordconfirm: inputValidation.passwordconfirm,
			username: inputValidation.username,
		}

		var inputsTouched = this.state.inputsTouched;

		switch (name){
			case 'email':
				if( validator.isEmail(value) ) {
					validation.email = true;
				} else {
					validation.email = false;
				}
				break;
			case 'password':
				if( !validator.isAlpha(value) && validator.isLength(value, {min: 6, max: 40}) ) {

					validation.password = true;

				} else {
					validation.password = false;
				}
				break;
			case 'passwordconfirm':
				if( validator.equals(value, this.state.inputData.password) ) {

					validation.passwordconfirm = true;

				} else {
					validation.passwordconfirm = false;
				}
				break;
			case 'username':
				if( !validator.isEmpty(value) ) {
					validation.username = true;
				} else {
					validation.username = false;
				}
				break;
		}

		this.setState({
			inputValidation: validation
		},() => {
		});
	}


	/**
	 * Handles the form submit.
	 */
	handleSubmit( event ) {
		event.preventDefault();
		var data = this.state.inputData;

		axios({
			method: 'post',
			url: `${BASE_SERVER_URL}/signup/genUser`,
			data
		})
		.then((res) => {
			console.log( res );
			//note - react only adds this history to the parent component - "history" was passed down from the CreateAccount component.
			this.props.history.push('/welcome');
		})
		.catch((err) => {
			console.log( err );
			this.setState({error: err.response.data.error});
		});
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

		if( name === 'email' ) {
			if( touched.email && !validated.email ) {
				return (<span className="validation-error-text">Must be a valid email address.</span>);
			}
		} else if (name === 'password') {
			if( touched.password && !validated.password ) {
				console.log( "Password Ran" );
				return (<span className="validation-error-text">Must have 6 characters.<br/>Must contain numbers and letters.</span>);
			}
		} else if ( name === 'passwordconfirm' ) {
			if( touched.passwordconfirm && !validated.passwordconfirm ) {
				return (<span className="validation-error-text">Must match password.</span>);
			}
		} else if ( name === 'username' ) {
			if( touched.username && !validated.username ) {
				return (<span className="validation-error-text">Required field</span>);
			}
		}
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


	//logs which form elements have been blurred. 
	handleBlur = (field) => (evt) => {
		this.setState({
			inputsTouched: { ...this.state.inputsTouched, [field]: true }
		},() => {

		});
	}



	render() {
		return (
			<div id="general-user-signup" className="margin-top-sm">
				<h4 className="centered">Create New General User Account</h4>
				<form onSubmit={this.handleSubmit}>
					<div className="margin-top-sm">
						<div className="row">	
							<div className="col-md-2 col-md-offset-5">
								<div className="form-group">
									<label htmlFor="">Username</label>
									<input 
										className={ this.renderErrorClass ('username') } 
										type="text" 
										placeholder="Username"
										name="username"
										onChange={ this.handleInputChange } 
										onBlur={this.handleBlur('username')}/>
										{this.showValidationError('username')}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-2 col-md-offset-5">
								<div className="form-group">
									<label htmlFor="">Email</label>
									<input 
										className={ this.renderErrorClass ('email') }
										type="email" 
										placeholder="Email" 
										name="email"
										onChange={ this.handleInputChange }
										onBlur={this.handleBlur('email')}/>
										{this.showValidationError('email')}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-2 col-md-offset-5">
								<div className="form-group">
									<label htmlFor="">Password</label>
									<input 
										className={ this.renderErrorClass ('password') } 
										type="password" 
										placeholder="Password" 
										name="password"
										onChange={ this.handleInputChange }
										onBlur={this.handleBlur('password')}/>
										{this.showValidationError('password')}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-2 col-md-offset-5">
								<div className="form-group">
									<label htmlFor="">Re-enter Password</label>
									<input 
										className={ this.renderErrorClass ('passwordconfirm') }
										type="password" 
										placeholder="Re-enter Password" 
										name="passwordconfirm"
										onChange={ this.handleInputChange }
										onBlur={this.handleBlur('passwordconfirm')}/>
										{this.showValidationError('passwordconfirm')}
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-md-2 col-md-offset-5 margin-top">
								{this.showErrorMessage()}
								<input type="submit" className="form-control styled-button margin-bottom" value="Submit" name="submit-general-user" disabled={this.disableButton()} />
								
							</div>
						</div>

					</div>
				</form>
			</div>
		);
	}
}


export default GenUserForm;