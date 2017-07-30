import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


//styles
import './styles.css';


class Navigation extends Component {
	constructor(props) {
		super(props)
	}


	renderSigninLink() {
		console.log( "authenticated " + this.props.authenticated );
		if( !this.props.authenticated ) {
			return (
				<li><Link to="/create-account">Signup</Link></li>
			);
		}
	}


	render() {
		return (
			<div className="row desktop-nav">
				<nav>
					<div className="navbar navbar-inverse">
					  <div className="container">
					    <div className="navbar-header">
					      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					        <span className="icon-bar"></span>
					        <span className="icon-bar"></span>
					        <span className="icon-bar"></span>
					      </button>
					     
					    </div>
					    <div className="collapse navbar-collapse">
					      <ul className="nav navbar-nav">
					        <li className="active"><Link to="/welcome">Home</Link></li>
					        <li><Link to="/about">About</Link></li>
					        <li className="dropdown">
								<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Conditions <span className="caret"></span></a>
								<ul className="dropdown-menu">
									<li><Link to="/conditions">Find Conditions</Link>
									</li>
									<li><Link to="/create-condition">Create Condition</Link>
									</li>
								</ul>
							</li>
					        <li className="dropdown">
								<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Treatments <span className="caret"></span></a>
								<ul className="dropdown-menu">
									<li><Link to="/conditions">Find Treatment</Link>
									</li>
									<li><Link to="/treatments/create">Create Treatment</Link>
									</li>
								</ul>
							</li>
							{ this.renderSigninLink() }
					      </ul>
					    </div>
					  </div>
					</div>
				</nav>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	};
}

export default connect(mapStateToProps, null)(Navigation);