import React, {Component} from 'react';
//images
import logo from './img/leaves.png';
//styles
import './styles.css';

class Header extends Component {

	constructor(props) {
		super(props);
	}



	render() {
		return (

			
			<div id="header">

				{/*Logout*/}
				<div id="logout-button">
					<a href="#logout"><span title="Logout"><i className="fa fa-sign-out" aria-hidden="true"></i></span></a>
				</div>
				{/*Logout*/}
				
				{/*login*/}
				<div id="login-button">
					<a href="#login"><span title="Login"><i className="fa fa-sign-in" aria-hidden="true"></i></span></a>
				</div>
				{/*login*/}

				{/*My Account*/}
				<div id="my-account">
					<a href="#myAccount" title="My Account"><i className="fa fa-user" aria-hidden="true"></i></a>
				</div>
				{/*My Account*/}

				

				<div className="row assorted">
					<div id="assorted-colors">
						<div className="assorted-colors assorted-light"></div>
						<div className="assorted-colors assorted-md-light"></div>
						<div className="assorted-colors assorted-md-dark"></div>
						<div className="assorted-colors assorted-dark"></div>
						<div className="assorted-colors assorted-long"></div>
					</div>
				</div>

				<div className="row">
					<div className="title-text">
						<img className="healing-leaves" src={logo} alt="Healing Leaves"/>
						<span id="heading-text">Natural Healing Reviews</span>
					</div>
				</div>
			</div>
			

		);
	}

}


export default Header;