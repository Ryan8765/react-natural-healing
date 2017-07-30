import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signOutUser } from '../../actions/auth';


import leavesDrops from './img/leaves-drops.jpg';




class Logout extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		if( this.props.authenticated ) {
			//dispatch an action to unauthenticate the user
			this.props.signOutUser();
		}
	}

	render() {
		return (
			<div className="margin-top">
				<div className="row">
					<h2 className="centered">You have successfully logged out.<br />Come visit us again soon!</h2>
					<div className="margin-top centered">
						<img id="leaves-drops" src={leavesDrops} alt="Green Grass"/>
					</div>
				</div>
			</div>
		);
	}
}



//in our render method we can now call the action creators
function mapDispatchToProps(dispatch) {
	return bindActionCreators({ signOutUser }, dispatch);
}


function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);