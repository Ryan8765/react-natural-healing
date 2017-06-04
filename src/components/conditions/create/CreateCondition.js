import React, { Component } from 'react';

class CreateCondition extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(

			<div className="row">	
				<h3 className="centered">Submit New Condition</h3>

				<div className="col-md-4 col-md-offset-4">
					<div className="row">
						<div className="centered margin-top-sm">Haven't found the condition you're looking for?  Submit a new one!  If the condition hasn't been listed yet, it will be added.</div>
					</div>
					
					<form className="margin-top-sm" method="POST">
						<div className="form-group">	
							<label for="name">Condition Name</label>
							<input className="form-control" placeholder="Enter condition name..." required="required" />
						</div>
						<div className="form-group">	
							<label for="name">Condition Description</label>
							<textarea path="description" className="form-control" placeholder="Enter condition description..." cols="30" rows="10" required="required" />
						</div>
						<div className="row">	
							<input type="submit" className="form-control styled-button" value="Submit" name="submit-doctor" />
						</div>
					</form>		
				</div>
			</div>
		);
	}
}


export default CreateCondition;
