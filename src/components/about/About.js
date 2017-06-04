import React, { Component } from 'react';

import './styles.css';
import grass from './img/grass.jpg';


class About extends Component {


	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div id="homepage-welcome">
					<h1>About</h1>
					<p className="centered margin-top"><span className="logo-color">Natural Healing Reviews</span> is a free resource for pooling information involving natural alternatives for health problems.</p>
					<p>The goal of this site is to aggregate treatment options for various natural alternatives utilizing both ordinary citizen and healthcare professional reviews.</p>
				</div>
				<img className="green-grass" src={grass} alt="Green Grass" />
			</div>
		);
	}


}


export default About;