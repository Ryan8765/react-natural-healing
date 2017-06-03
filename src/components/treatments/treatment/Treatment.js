import React, { Component } from 'react';

import './styles.css';

class Treatment extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<div className="row">
					<div className="centered">
						<h2>Acne Wash Treatment</h2>
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
										<option value="select">-</option>
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
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, culpa quasi tempore assumenda, perferendis sunt. Quo consequatur saepe commodi maxime, sit atque veniam blanditiis molestias obcaecati rerum, consectetur odit accusamus.</p>
							<h3 className="margin-top centered">Noted Side Effects/Precautions</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum voluptates, corporis nisi dolores cumque obcaecati perferendis, quisquam, ipsa commodi labore molestias dolor itaque nam cupiditate totam, ea dicta? Sit, asperiores?</p>
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
								<tr>
									<td>Charcoal</td>
									<td>Natures Way</td>
									<td>3/day</td>
									<td>Write something</td>
									<td>256$</td>
								</tr>
								<tr>
									<td>Charcoal</td>
									<td>Natures Way</td>
									<td>3/day</td>
									<td>Write something</td>
									<td>256$</td>
								</tr>
								<tr>
									<td>Charcoal</td>
									<td>Natures Way</td>
									<td>3/day</td>
									<td>Write something</td>
									<td>256$</td>
								</tr>
								<tr>
									<td>Charcoal</td>
									<td>Natures Way</td>
									<td>3/day</td>
									<td>Write something</td>
									<td>256$</td>
								</tr>

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
								<label for="">Sort By</label>
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