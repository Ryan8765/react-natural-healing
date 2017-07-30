import React, { Component } from 'react';
import validator from 'validator';



class DoctorForm extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			accountType: "notSelected",
			doctorInputsTouched: {
				email: false, 
				firstname: false,
				lastname: false,
				password: false,
				passwordconfirm: false,
				licensenumber: false,
				username: false,
				practitionertype: false
			}, 
			doctorInputValidation: {
				email: false, 
				firstname: false,
				lastname: false,
				password: false,
				passwordconfirm: false,
				licensenumber: false,
				username: false,
				practitionertype: false
			},
			doctorInputData: {
				email: "", 
				firstname: "",
				lastname: "",
				password: "",
				passwordconfirm: "",
				licensenumber: "",
				username: "",
				practitionertype: ""
			} 
		};
		this.handleDoctorInputChange = this.handleDoctorInputChange.bind(this);
	}



	isDoctorFormValidated() {
		var validations = this.state.doctorInputValidation;

		if( validations.email && validations.firstname && validations.lastname && validations.licensenumber && validations.password && validations.passwordconfirm && validations.username && validations.practitionertype ) {
			return true;
		}

		return false;
	}

	doctorDisableButton() {
		if( !this.isDoctorFormValidated() ) {
			return "disabled";
		}
	}

	handleDoctorInputChange( event ) {
		const target     = event.target;
		const value      = target.type === 'checkbox' ? target.checked : target.value;
		const name       = target.name;


		this.setState({
			doctorInputData:{
				...this.state.doctorInputData,
				[name]: value
			}
		},() => {
			this.handleDoctorValidation( name, value);
		});
	}

	handleDoctorValidation(name, value) {
		var doctorInputValidation    = this.state.doctorInputValidation;

		var doctorValidation = {
			email: doctorInputValidation.email, 
			firstname: doctorInputValidation.firstname,
			lastname: doctorInputValidation.lastname,
			password: doctorInputValidation.password,
			passwordconfirm: doctorInputValidation.passwordconfirm,
			licensenumber: doctorInputValidation.licensenumber,
			username: doctorInputValidation.username,
			practitionertype: doctorInputValidation.practitionertype
		}

		var doctorInputsTouched = this.state.doctorInputsTouched;

		switch (name){
			case 'email':
				if( validator.isEmail(value) ) {
					doctorValidation.email = true;
				} else {
					doctorValidation.email = false;
				}
				break;
			case 'password':
				if( !validator.isAlpha(value) && validator.isLength(value, {min: 6, max: 40}) ) {

					doctorValidation.password = true;

				} else {
					doctorValidation.password = false;
				}
				break;
			case 'passwordconfirm':
				if( validator.equals(value, this.state.doctorInputData.password) ) {

					doctorValidation.passwordconfirm = true;

				} else {
					doctorValidation.passwordconfirm = false;
				}
				break;
			case 'lastname':
				if( !validator.isEmpty(value) ) {
					doctorValidation.lastname = true;
				} else {
					doctorValidation.lastname = false;
				}
				break;
			case 'firstname':
				if( !validator.isEmpty(value) ) {
					doctorValidation.firstname = true;
				} else {
					doctorValidation.firstname = false;
				}
				break;
			case 'username':
				if( !validator.isEmpty(value) ) {
					doctorValidation.username = true;
				} else {
					doctorValidation.username = false;
				}
				break;
			case 'practitionertype':
				if( !validator.isEmpty(value) ) {
					doctorValidation.practitionertype = true;
				} else {
					doctorValidation.practitionertype = false;
				}
				break;
			case 'licensenumber':
				if( !validator.isEmpty(value) ) {
					doctorValidation.licensenumber = true;
				} else {
					doctorValidation.licensenumber = false;
				}
				break;
		}

		this.setState({
			doctorInputValidation: doctorValidation
		},() => {
		});
	}

	


	/**
	 * Show validation errors on the screen
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	showDoctorValidationError( name ) {
		const touched   = this.state.doctorInputsTouched;
		const validated = this.state.doctorInputValidation;

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
		} else if ( name === 'lastname') {
			if( touched.lastname && !validated.lastname ) {
				return (<span className="validation-error-text">Required field</span>);
			}
		} else if ( name === 'firstname' ) {
			if( touched.firstname && !validated.firstname ) {
				return (<span className="validation-error-text">Required field</span>);
			}
		} else if ( name === 'username' ) {
			if( touched.username && !validated.username ) {
				return (<span className="validation-error-text">Required field</span>);
			}
		} else if ( name === 'practitionertype' ) {
			if( touched.practitionertype && !validated.practitionertype ) {
				return (<span className="validation-error-text">Required field</span>);
			}
		} else if ( name === 'licensenumber' ) {
			if( touched.licensenumber && !validated.licensenumber ) {
				return (<span className="validation-error-text">Required field</span>);
			}
		}
	}


	renderErrorClass (name) {
		var validated = this.state.doctorInputValidation[name];
		var touched = this.state.doctorInputsTouched[name];
		if( !validated && touched ) {
			return "val-error form-control";
		} else {
			return 'form-control';
		}
	}


	//logs which form elements have been blurred. 
	handleDoctorBlur = (field) => (evt) => {
		this.setState({
			doctorInputsTouched: { ...this.state.doctorInputsTouched, [field]: true }
		},() => {

		});
	}

	render() {
		return (
			<div id="doctor-signup" className="margin-top-sm">
				<h4 className="centered">Create New Doctor Account</h4>
					<form action="">
					<div className="margin-top-sm">
						<div className="row">	
							<div className="col-md-2 col-md-offset-4">
								<div className="form-group">
									<label htmlFor="">First Name</label>
									
									<input 
										name="firstname"
										onChange={ this.handleDoctorInputChange }
										className={ this.renderErrorClass ('firstname') }
										type="text" 
										placeholder="First Name" 
										onBlur={this.handleDoctorBlur('firstname')}/>
										{this.showDoctorValidationError('firstname')}
								</div>
							</div>
							<div className="col-md-2">
								<div className="form-group">
									<label htmlFor="">Last Name</label>
									<input 
										className={ this.renderErrorClass ('lastname') } 
										name="lastname"
										onChange={ this.handleDoctorInputChange }
										type="text" 
										placeholder="Last Name" 
										onBlur={this.handleDoctorBlur('lastname')}/>
										{this.showDoctorValidationError('lastname')}
								</div>
							</div>
						</div>
					</div>
					<div className="row">	
						<div className="col-md-2 col-md-offset-4">
							<div className="form-group">
								<label htmlFor="">User Name</label>
								<input 
									className={ this.renderErrorClass ('username') }
									name="username"
									onChange={ this.handleDoctorInputChange } 
									type="text" 
									placeholder="User Name"
									onBlur={this.handleDoctorBlur('username')} />
									{this.showDoctorValidationError('username')}
							</div>
						</div>
						<div className="col-md-2">
							<div className="form-group">
								<label htmlFor="">Email</label>
								<input 
									className={ this.renderErrorClass ('email') }
									name="email"
									onChange={ this.handleDoctorInputChange }
									type="email" 
									placeholder="Email" 
									onBlur={this.handleDoctorBlur('email')}/>
									{this.showDoctorValidationError('email')}
							</div>
						</div>
					</div>
					<div className="row">	
						<div className="col-md-2 col-md-offset-4">
							<div className="form-group">
								<label htmlFor="">Type of Practitioner</label>
								<input 
									className={ this.renderErrorClass ('practitionertype') }
									name="practitionertype"
									onChange={ this.handleDoctorInputChange } 
									type="text" 
									placeholder="Practitioner Type" 
									onBlur={this.handleDoctorBlur('practitionertype')}/>
									{this.showDoctorValidationError('practitionertype')}
							</div>
						</div>
						<div className="col-md-2">
							<div className="form-group">
								<label htmlFor="">License Number</label>
								<input 
									className={ this.renderErrorClass ('licensenumber') }
									name="licensenumber"
									onChange={ this.handleDoctorInputChange }
									type="text" 
									placeholder="License Number" 
									onBlur={this.handleDoctorBlur('licensenumber')}/>
									{this.showDoctorValidationError('licensenumber')}
							</div>
						</div>
					</div>
					<div className="row">	
						<div className="col-md-2 col-md-offset-4">
							<div className="form-group">
								<label htmlFor="">Password</label>
								<input 
									className={ this.renderErrorClass ('password') }
									name="password"
									onChange={ this.handleDoctorInputChange }
									type="password" 
									placeholder="Password" 
									onBlur={this.handleDoctorBlur('password')}/>
									{this.showDoctorValidationError('password')}
							</div>
						</div>
						<div className="col-md-2">
							<div className="form-group">
								<label htmlFor="">Re-enter Password</label>
								<input 
									className={ this.renderErrorClass ('passwordconfirm') }
									type="password" 
									name="passwordconfirm"
									onChange={ this.handleDoctorInputChange }
									placeholder="Re-enter Password" 
									onBlur={this.handleDoctorBlur('passwordconfirm')}/>
									{this.showDoctorValidationError('passwordconfirm')}
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-2 col-md-offset-5 margin-top">
							<input type="submit" className="form-control styled-button margin-bottom" value="Submit" name="submit-doctor" disabled={ this.doctorDisableButton() } />
						</div>
					</div>
				</form>
			</div>

		);
	}
}

export default DoctorForm;