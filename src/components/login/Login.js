import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import { signinUser } from '../../actions/auth';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';





class Login extends Component {

	constructor(props) {
		super(props);

		this.state = {
			formValues: {
				'email': '',
				'password': ''
			},
			formValidation: {
				'isEmailValidated': null,
				'isPasswordValidated': null
			},
			errorMessage: ""
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);



	}

	/**
	 * Handles validating inputs by user for email and password
	 * @param  {[string]} name    [pass the name of the input]
	 * @param  {[string]} value [pass the value of the input]
	 * @return {[type]}          [used to validate input fields]
	 */
	handleValidation(name, value) {
		var isEmailValidated    = false;
		var isPasswordValidated = false;
		var formValidation      = this.state.formValidation;


		if( name === 'email' ) {
			if( validator.isEmail(value) ) {
				isEmailValidated = true;
			}
			this.setState({
				formValidation: {
					...formValidation,
					isEmailValidated
				}
			},  () => {console.log( formValidation );});
		}

		if ( name === 'password' ) {
			if( !validator.isAlpha(value) && validator.isLength(value, {min: 6, max: 40}) ) {
				isPasswordValidated = true;
			}

			this.setState({
				formValidation: {
					...formValidation,
					isPasswordValidated
				}
			}, () => {console.log( formValidation );});
		}
	}



	//handles submitting the form.
	handleSubmit() {
		var email    = this.state.formValues.email;
		var password = this.state.formValues.password;
		//use this to redirect - this.props.history.push('/')
		var history  = this.props.history;
		//launch action
		console.log( "***************************************************" );
		this.props.signinUser( email, password, history );
	}


	/*
		Update state with values from input elements.
	 */
	handleInputChange(event) {
		const target     = event.target;
		const value      = target.type === 'checkbox' ? target.checked : target.value;
		const name       = target.name;


		this.setState({
			formValues:{
				...this.state.formValues,
				[name]: value
			}
		},() => {
			this.handleValidation( name, value);
		});
	}

	/*
		Enable/disable submit based on validation of email/password
	 */
	disableButton() {
		if( this.state.formValidation.isEmailValidated && this.state.formValidation.isPasswordValidated ) {
			return "";
		} else {
			return "disabled";
		}
	}

	/*
		Error login message
	 */
	renderErrorMessage() {
		const error = this.props.signinError;
		if( error ) {
			return <h5 className="bg-danger error-response-text">{error}</h5>;
		} else {
			return <h5></h5>;
		}
	}



	render() {

	
		return (
			<div>
				<div className="row">
					<div className="col-md-6 col-md-offset-3">
						<h3 className="centered">Login</h3>
						<div className="row">
							<div className="col-md-6 col-md-offset-3">
								{this.renderErrorMessage()}

								<form action="">
									<label htmlFor="email">Email</label>
									<input name="email" type="email" className="form-control" onChange={ this.handleInputChange } value={this.state.formValues.email}/>
									<label htmlFor="password">Password</label>
									<input name="password" type="password" className="form-control" onChange={ this.handleInputChange } value={this.state.formValues.password}/>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6 col-md-offset-3">
						<p className="centered"><Link to="/password">Forgot Password?</Link></p>
						<div className="row">
							<div className="row">
								<div className="col-md-4 col-md-offset-4">
									<input disabled={this.disableButton()} className="form-control styled-button" type="submit" value="Submit" name="submit" onClick={ this.handleSubmit } />
								</div>
							</div>
							
							<div className="row">
								<div className="centered margin-top-sm">
									OR
								</div>
							</div>
							
							<div className="row">
								<div className="col-md-4 col-md-offset-4 margin-top-sm">
									<input className="form-control styled-button" type="submit" value="Create Account" name="account" />
								</div>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		);
	}
}


//maps the state into our class above.
function mapStateToProps(state) {
	return {
		signinError: state.auth.signinError
	};
}


//in our render method we can now call the action creators
function mapDispatchToProps(dispatch) {
	return bindActionCreators({ signinUser }, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(Login);