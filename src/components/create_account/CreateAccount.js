import React, { Component } from 'react';
import validator from 'validator';
import DoctorForm from './DoctorForm';
import GenUserForm from './GenUserForm';
import './styles.css';



class CreateAccount extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			accountType: "notSelected",
		};

		this.handleSelectUserType    = this.handleSelectUserType.bind(this);

	}

	
	handleSelectUserType( event ) {
		this.setState({ accountType: event.target.value });
	}


	renderForm( showAccountForm ) {
		if( showAccountForm === "doctor" ){
			return (
				<DoctorForm />
			);
		} else if ( showAccountForm === "user" ) {
			return (
				<GenUserForm history={this.props.history}/>
			);
		}//end if
	}


	render() {

		return(
			<div>
			<h1 className="centered">Create a New Account</h1>
					
				<div className="row">
					<div className="col-md-2 col-md-offset-5">
						<div className="form-group">
							<h3 className="centered">Select Type of Account</h3>
							<select 
								className="form-control" 
								name="selectType" 
								id="show-form"
								onChange={this.handleSelectUserType}>
									<option value="">Select Type</option>
									<option value="doctor">Doctor</option>
									<option value="user">General User</option>
							</select>
						</div>
					</div>
				</div>					
				{this.renderForm(this.state.accountType)}
			</div>
		);
	}
}

export default CreateAccount;