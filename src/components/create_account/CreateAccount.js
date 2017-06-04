import React, { Component } from 'react';


class CreateAccount extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
			<h1 className="centered">Create a New Account</h1>
					
				<div className="row">
					<div className="col-md-2 col-md-offset-5">
						<div className="form-group">
							<h3 className="centered">Select Type of Account</h3>
							<select className="form-control" name="selectType" id="show-form">
								<option value="">Select Type</option>
								<option value="doctor">Doctor</option>
								<option value="user">General User</option>
							</select>
						</div>
					</div>
				</div>		
		

				{/*Doctor Signup*/}
				<div id="doctor-signup" className="margin-top">
					<h4 className="centered">Create New Doctor Account</h4>					
					<form action="">
						<div className="margin-top">
							<div className="row">	
								<div className="col-md-2 col-md-offset-4">
									<div className="form-group">
										<label for="">First Name</label>
										<input className="form-control" type="text" placeholder="First Name" />
									</div>
								</div>
								<div className="col-md-2">
									<div className="form-group">
										<label for="">Last Name</label>
										<input className="form-control" type="text" placeholder="Last Name" />
									</div>
								</div>
							</div>
						</div>
						<div className="row">	
							<div className="col-md-2 col-md-offset-4">
								<div className="form-group">
									<label for="">User Name</label>
									<input className="form-control" type="text" placeholder="User Name" />
								</div>
							</div>
							<div className="col-md-2">
								<div className="form-group">
									<label for="">Email</label>
									<input className="form-control" type="email" placeholder="Email" />
								</div>
							</div>
						</div>
						<div className="row">	
							<div className="col-md-2 col-md-offset-4">
								<div className="form-group">
									<label for="">Type of Practitioner</label>
									<input className="form-control" type="text" placeholder="Practitioner Type" />
								</div>
							</div>
							<div className="col-md-2">
								<div className="form-group">
									<label for="">License Number</label>
									<input className="form-control" type="text" placeholder="License Number" />
								</div>
							</div>
						</div>
						<div className="row">	
							<div className="col-md-2 col-md-offset-4">
								<div className="form-group">
									<label for="">Password</label>
									<input className="form-control" type="password" placeholder="Password" />
								</div>
							</div>
							<div className="col-md-2">
								<div className="form-group">
									<label for="">Re-enter Password</label>
									<input className="form-control" type="password" placeholder="Re-enter Password" />
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-2 col-md-offset-5 margin-top">
								<input type="submit" className="form-control styled-button" value="Submit" name="submit-doctor" />
							</div>
						</div>
					</form>
				</div>
				{/*Doctor Signup*/}
				
				
				{/*General User Signup*/}
				<div id="general-user-signup" className="margin-top">
					<h4 className="centered">Create New General User Account</h4>
					<form action="">
						<div className="margin-top">
							<div className="row">	
								<div className="col-md-2 col-md-offset-5">
									<div className="form-group">
										<label for="">Username</label>
										<input className="form-control" type="text" placeholder="Username" />
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-2 col-md-offset-5">
									<div className="form-group">
										<label for="">Email</label>
										<input className="form-control" type="email" placeholder="Email" />
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-2 col-md-offset-5">
									<div className="form-group">
										<label for="">Password</label>
										<input className="form-control" type="password" placeholder="Password" />
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-2 col-md-offset-5">
									<div className="form-group">
										<label for="">Re-enter Password</label>
										<input className="form-control" type="text" placeholder="Re-enter Password" />
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col-md-2 col-md-offset-5 margin-top">
									<input type="submit" className="form-control styled-button" value="Submit" name="submit-general-user" />
								</div>
							</div>

						</div>
					</form>
				</div>
				{/*General User Signup*/}
			</div>
		);
	}
}

export default CreateAccount;