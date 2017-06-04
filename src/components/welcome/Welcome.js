import React, { Component } from 'react';

import './styles.css';
import grass from './img/grass.jpg';


class Welcome extends Component {


	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div id="homepage-welcome">
					<h1>Welcome To <span className="logo-color">Natural Healing Reviews</span></h1>
					<h2>Explore Natural Alternatives for Common Health Problems</h2>
				</div>

				<img className="green-grass" src={grass} alt="Green Grass" />
			</div>
		);
	}


}


export default Welcome;