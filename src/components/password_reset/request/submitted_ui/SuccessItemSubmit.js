import React, {Component} from 'react';
import img from './arrow.png';
import grass from './grass.jpg';
import './styles.css';

export default (props)=>{
	return (
		<div className="margin-top">
			<div className="row">
				<div className="col-md-4 col-md-offset-4">
					<div className="centered">
						<img src={ img } alt="Checkmark" height="50" width="50"/>
					</div>
					<p className="centered margin-top">Your request is being processed.  You have been sent an email to complete this process.</p>
				</div>
			</div>
			<img className="green-grass" src={grass} alt="Green Grass" />
		</div>
	);
}
