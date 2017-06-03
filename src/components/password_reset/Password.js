import React, {Component} from 'react';

class PasswordReset extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="row">
				<div className="col-md-6 col-md-offset-3 centered">
					<h3>Enter Email</h3>
					<p className="margin-top-sm">To request a new password, enter your email address below.  After completed, check your email and follow the necessary directions.</p>
				</div>
				<div className="row">
					<div className="col-md-2 col-md-offset-5">
						<input type="email" className="form-control margin-top-sm" />
						<input className="styled-button form-control margin-top-sm" type="submit" value="Submit" name="submit" />
					</div>
				</div>
			</div>
		);
	}
}


export default PasswordReset;