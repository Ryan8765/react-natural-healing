import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Login extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className="row">
					<div className="col-md-6 col-md-offset-3">
						<h3 className="centered">Login</h3>
						<div className="row">
							<div className="col-md-6 col-md-offset-3 margin-top-sm">
								<form action="">
									<label htmlFor="email">Email</label>
									<input type="email" className="form-control" />
									<label htmlFor="password">Password</label>
									<input type="password" className="form-control" />
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
									<input className="form-control styled-button" type="submit" value="Submit" name="submit" />
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


export default Login;