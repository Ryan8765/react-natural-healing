import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//styles
import './styles.css';


class Navigation extends Component {
	constructor(props) {
		super(props)
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
					        <li><a href="#about">About</a></li>
					        <li className="dropdown">
								<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Conditions <span className="caret"></span></a>
								<ul className="dropdown-menu">
									<li><Link to="/conditions">Find Conditions</Link>
									</li>
									<li><a href="#">Create Condition</a>
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
					      </ul>
					    </div>
					  </div>
					</div>
				</nav>
			</div>
		);
	}
}


export default Navigation;