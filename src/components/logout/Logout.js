import React, { Component } from 'react';

import leavesDrops from './img/leaves-drops.jpg';




class Logout extends Component {
	constructor(props) {
		super(props);
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


export default Logout;