import React, {Component} from 'react';
import validator from 'validator';
import axios from 'axios';

import { BASE_SERVER_URL } from '../../../config';
import Submitted from './submitted_ui/SuccessItemSubmit'



class PasswordReset extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: null,
			emailIsValid: false,
			//flag for form submission.
			submitted: false
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	/*
		Disables button if email is not valid.
	 */
	disableButton() {
		if( !this.state.emailIsValid ) {
			return "disabled";
		}
	}

	/*
		If email is valid - updates that email.
	 */
	updateEmailValidationState( email ) {
		if( validator.isEmail( email ) ) {
			this.setState({
				emailIsValid: true
			});
		} else {
			this.setState({
				emailIsValid: false
			});
		}
	}


	/*
		Handle's submitting of the form
	 */
	handleSubmit( event ) {
		event.preventDefault();
		var email = this.state.email;

		// make call to the backend
		axios({
			method: 'post',
			url: `${BASE_SERVER_URL}/sendPasswordReset`,
			data: {
				email
			}
		})
		.then((res) => {
			this.setState({
				email: "",
				submitted: true
			},()=>{
				this.updateEmailValidationState( this.state.email );
			});
		})
		.catch((err) => {
			this.setState({
				email: "",
				submitted: true
			},()=>{
				this.updateEmailValidationState( this.state.email );
			});
		});
	}

	/*
		Updates email state
	 */
	handleChange( event ) {
		var email = event.target.value;

		this.setState({
			email
		},()=>{
			this.updateEmailValidationState( this.state.email );
		});
	}


	/*
		Rendering the content to conditionally show form/submit success
	 */
	renderContent( submitted ) {
		if( submitted ) {
			return (
				<Submitted/>
			);
		} else {
			return (
				<div className="row">
					<div className="col-md-6 col-md-offset-3 centered">
						<h3>Enter Email</h3>
						<p className="margin-top-sm">To request a new password, enter your email address below.  After completed, check your email and follow the necessary directions.</p>
					</div>
					<div className="row">
						<div className="col-md-2 col-md-offset-5">
							<form onSubmit={ this.handleSubmit }>
								<input type="text" className="form-control margin-top-sm" onChange={ this.handleChange } value={ this.state.email }/>
								<input
									className="styled-button form-control margin-top-sm" type="submit"
									value="submit"
									name="submit"
									disabled={this.disableButton()} />
							</form>
						</div>
					</div>
				</div>
			);
		}
	}



	render() {
		return (
			<div>
				{ this.renderContent( this.state.submitted ) }
			</div>
		);
	}
}


export default PasswordReset;
