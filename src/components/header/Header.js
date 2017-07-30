import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
//images
import logo from './img/leaves.png';
//styles
import './styles.css';

class Header extends Component {

	constructor(props) {
		super(props);
	}


	renderLoginLogout() {
		const authenticated = this.props.authenticated;

		if( authenticated ) {
			return [
				
				<div key="1" id="logout-button">
					<Link to="/logout"><span title="Logout"><i className="fa fa-sign-out" aria-hidden="true"></i></span></Link>
				</div>,
				<div key="2" id="my-account">
					<a href="#myAccount" title="My Account"><i className="fa fa-user" aria-hidden="true"></i></a>
				</div>
				
			];
		} else {
			return (
				<div id="login-button">
					<Link to="/login"><span title="Login"><i className="fa fa-sign-in" aria-hidden="true"></i></span></Link>
				</div>
			);
		}
	}


	render() {
		return (

			
			<div id="header">

				{this.renderLoginLogout()}

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


function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	};
}

export default connect(mapStateToProps, null)(Header);
