import React, { Component } from 'react';
import { BASE_SERVER_URL } from '../../../config';
import axios from 'axios';
import currencyFormatter from 'currency-formatter';


import './styles.css';

class Treatment extends Component {
	constructor(props) {
		super(props);

		this.state = {
			treatment: {
				name: "",
				treatmentComponents: []
			}
		}
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		axios({
		    method: 'get',
		    url: `${BASE_SERVER_URL}/treatments/${id}`
		})
		.then((res) => {
			var treatment = res.data.treatment;
		 	this.setState({
		 		treatment
		 	});
		})
		.catch((err) => {
		});		
	}

	render() {
		var { name, cost, precautions, treatmentComponents, description } = this.state.treatment;

		//capitalize name
		name = name.replace(/\b\w/g, l => l.toUpperCase());

		var componentsHTML = treatmentComponents.map((component) => {
			return (
				<tr key={component.id}>
					<td>{component.name}</td>
					<td>{component.brandName}</td>
					<td>{component.dosage}</td>
					<td>{component.notes}</td>
					<td>{currencyFormatter.format(Number(component.cost), { code: 'USD' })}</td>
				</tr>
			);
		});

		return(
			<div>
				<div className="row">
					<div className="centered">
						<h2>{name} Treatment</h2>
						<div className="row">
							<div className="col-md-6 col-md-offset-3">
								<div className="centered">
									<span className="rating-icon" title="Doctor Rating"><i className="fa fa-user-md" aria-hidden="true"></i></span>
									 - <span className="rating-review">9.8</span> <span className="num-reviews"> out of 5000 Reviews</span><br/>
									<span className="rating-icon" title="User Rating"><i className="fa fa-user" aria-hidden="true"></i></span>
									 - <span className="rating-review">6.5</span><span className="num-reviews"> out of 200 Reviews</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="centered">
						<div className="col-md-2 col-md-offset-5">
							<h4 className="margin-top-sm">Your Rating</h4>
							<div className="row">
								<div className="col-md-6 col-md-offset-3">
									<select name="" id="" className="form-control">
										<option value="select">Select</option>
										<option value="0">0</option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
										<option value="6">6</option>
										<option value="7">7</option>
										<option value="8">8</option>
										<option value="9">9</option>
										<option value="10">10</option>
									</select>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div>
						<div className="col-md-6 col-md-offset-3">
							<h3 className="margin-top centered">Description of Treatment</h3>
							<p>{description}</p>
							<h3 className="margin-top centered">Noted Side Effects/Precautions</h3>
							<p>{precautions}</p>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-6 col-md-offset-3">
						<h3 className="centered margin-top">Supplements/Equipment</h3>
						<table className="table table-bordered table-style">
							<thead>
								<tr>
									<th>Name</th>
									<th>Brand Name</th>
									<th>Dosage/Frequency</th>
									<th>Misc Notes</th>
									<th>Cost</th>
								</tr>
							</thead>
							
							<tbody id="append">
								{componentsHTML}

							</tbody>
						</table>
					</div>
				</div>


				
				
				{/*Comments*/}
				<div className="row">
					<div className="col-md-6 col-md-offset-3">
						<h3 className="margin-top centered">User Comments</h3>
						<div className="row">
							<div className="col-md-4 col-md-offset-4 centered margin-top-sm">
								<label htmlFor="">Sort By</label>
								<select className="form-control" name="" id="">
									<option value="">Date Created</option>
									<option value="">Most Likes</option>
								</select>
							</div>
						</div>
						<div>
							<h3><small className="pull-right">45 comments</small> Comments </h3>
						</div>
						<div className="comments-list">
							<div className="media comment-item">
								<p className="pull-right"><small>5 days ago</small>
								</p>
								
								<div className="media-body">

									<h4 className="media-heading user_name">Baltej Singh</h4> Wow! this is really great.

									<p><small><a href="">Like</a></small>
									<br/><span className="user-likes"><small>2345 Likes</small></span></p>
								</div>
							</div>
							<div className="media comment-item">
								<p className="pull-right"><small>5 days ago</small>
								</p>
								
								<div className="media-body">

									<h4 className="media-heading user_name">Baltej Singh</h4> Wow! this is really great.

									<p><small><a href="">Like</a> - <a href="">Share</a></small>
									<br/></p>
								</div>
							</div>
							<div className="media comment-item">
								<p className="pull-right"><small>5 days ago</small>
								</p>
								
								<div className="media-body">

									<h4 className="media-heading user_name">Baltej Singh</h4> Wow! this is really great.

									<p><small><a href="">Like</a> - <a href="">Share</a></small>
									<br/><span className="user-likes"><small>2345 Likes</small></span></p>
								</div>
							</div>
							<div className="media comment-item">
								<p className="pull-right"><small>5 days ago</small>
								</p>
								
								<div className="media-body">

									<h4 className="media-heading user_name">Baltej Singh</h4> Wow! this is really great.

									<p><small><a href="">Like</a> - <a href="">Share</a></small>
									<br/><span className="user-likes"><small>2345 Likes</small></span></p>
								</div>
							</div>
							<div className="media comment-item">
								<p className="pull-right"><small>5 days ago</small>
								</p>
								
								<div className="media-body">

									<h4 className="media-heading user_name">Baltej Singh</h4> Wow! this is really great.

									<p><small><a href="">Like</a> - <a href="">Share</a></small>
									<br/><span className="user-likes"><small>2345 Likes</small></span></p>
								</div>
							</div>
							<div className="media comment-item">
								<p className="pull-right"><small>5 days ago</small>
								</p>
								
								<div className="media-body">

									<h4 className="media-heading user_name">Baltej Singh</h4> Wow! this is really great.

									<p><small><a href="">Like</a> - <a href="">Share</a></small>
									<br/><span className="user-likes"><small>2345 Likes</small></span></p>
								</div>
							</div>
							<div className="media comment-item">
								<p className="pull-right"><small>5 days ago</small>
								</p>
								
								<div className="media-body">

									<h4 className="media-heading user_name">Baltej Singh</h4> Wow! this is really great.

									<p><small><a href="">Like</a> - <a href="">Share</a></small>
									<br/><span className="user-likes"><small>2345 Likes</small></span></p>
								</div>
							</div>
							<div className="media comment-item">
								<p className="pull-right"><small>5 days ago</small>
								</p>
								
								<div className="media-body">

									<h4 className="media-heading user_name">Baltej Singh</h4> Wow! this is really great.

									<p><small><a href="">Like</a> - <a href="">Share</a></small>
									<br/><span className="user-likes"><small>2345 Likes</small></span></p>
								</div>
							</div>
							<div className="media comment-item">
								<p className="pull-right"><small>5 days ago</small>
								</p>
								
								<div className="media-body">

									<h4 className="media-heading user_name">Baltej Singh</h4> Wow! this is really great.

									<p><small><a href="">Like</a> - <a href="">Share</a></small>
									<br/><span className="user-likes"><small>2345 Likes</small></span></p>
								</div>
							</div>
							<div className="media comment-item">
								<p className="pull-right"><small>5 days ago</small>
								</p>
								
								<div className="media-body">

									<h4 className="media-heading user_name">Baltej Singh</h4> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam dolore ad incidunt nihil praesentium impedit unde voluptatem, sequi inventore ipsa vitae perferendis aspernatur voluptates dolores libero, at aperiam exercitationem neque.

									<p><small><a href="">Like</a> - <a href="">Share</a></small>
									<br/><span className="user-likes"><small>2345 Likes</small></span></p>
								</div>
							</div>
						</div>
					{/*End Comment List*/}

						<div className="margin-top">
							<button className="form-control styled-button">Load More Comments</button>
						</div>
					</div>
				</div>
				{/*Comments*/}
			</div>
		);
	}
}

export default Treatment;