import React, { Component } from 'react';
import { BASE_SERVER_URL } from '../../../config';
import axios from 'axios';
import currencyFormatter from 'currency-formatter';
import Comment from '../../comments/Comment';
import { connect } from 'react-redux';
import validator from 'validator';
import { getAuthToken_h, unauth_redirect_h, getUserId_h } from "../../../helpers/auth";



import './styles.css';

class Treatment extends Component {
	constructor(props) {
		super(props);

		this.state = {
			treatment: {
				name: "",
				treatmentComponents: []
			},
			newComment: "",
			comments: [],
			userID: null,
			ratingsAverage: null,
			numRatings: null,
			treatmentID: this.props.match.params.id
		}

		this.handleCommentChange    = this.handleCommentChange.bind(this);
		this.handleCommentSubmit    = this.handleCommentSubmit.bind(this);
		this.handleAddCommentLike   = this.handleAddCommentLike.bind(this);
		this.handleUpdateComment    = this.handleUpdateComment.bind(this);
		this.handleDeleteComment    = this.handleDeleteComment.bind(this);
		this.handleUserSelectRating = this.handleUserSelectRating.bind(this);
	}

	/*
		Validate whether user has comment content.
	 */
	isCommentValidated() {
		if( !this.state.newComment ) {
			return false;
		}

		return true;
	}

	/*
		Handle updating state for user typing into comment box
	 */
	handleCommentChange( event ) {
		var value = event.target.value;

		this.setState({
			newComment: value
		},() => {
			
		});
	}

	/*
		Disable add comment button unless validated.
	 */
	commentDisableButton() {
		if( !this.isCommentValidated() ) {
			return "disabled";
		}
	}

	/*
		Handle submitting like.  Used in comment child component to add a like to a comment.
	 */
	handleAddCommentLike( relatedComment, relatedTreatment ) {

		var data = {
			relatedTreatment,
			relatedComment
		};

		axios({
			method: 'post',
			url: `${BASE_SERVER_URL}/like`,
			headers: {
				authorization: getAuthToken_h()
			},
			data
		})
		.then((res) => {
			//get all comments again.
			this.setState({
				comments: res.data.comments
			});
		})
		.catch((err) => {
			var history = this.props.history;
			
			//if user was unauthorized - redirect to login page.			
			unauth_redirect_h( err, history );

			if( err.response.data.error ) {
				this.setState({error: err.response.data.error});
			} else {
				this.setState({error: 'An error occurred, please try again.  If the problem persists, please contact us.'});
			}
		});

	}




	/*
		Handle deleting comment.  Used in comment child component.
	 */
	handleDeleteComment( relatedComment, relatedTreatment ) {

		var data = {
			relatedTreatment,
			relatedComment
		};

		axios({
			method: 'delete',
			url: `${BASE_SERVER_URL}/comment`,
			headers: {
				authorization: getAuthToken_h()
			},
			data
		})
		.then((res) => {
			//get all comments again.
			this.setState({
				comments: res.data.comments
			});
		})
		.catch((err) => {
			var history = this.props.history;
			
			//if user was unauthorized - redirect to login page.			
			unauth_redirect_h( err, history );

			if( err.response.data.error ) {
				this.setState({error: err.response.data.error});
			} else {
				this.setState({error: 'An error occurred, please try again.  If the problem persists, please contact us.'});
			}
		});

	}


	/*
		Handle submitting like.  Used in comment child component to add a like to a comment.
	 */
	handleUpdateComment( relatedComment, relatedTreatment, updatedComment ) {
		var data = {
			relatedTreatment,
			relatedComment,
			updatedComment
		};

		axios({
			method: 'patch',
			url: `${BASE_SERVER_URL}/comment`,
			headers: {
				authorization: getAuthToken_h()
			},
			data
		})
		.then((res) => {
			//get all comments again.
			this.setState({
				comments: res.data.comments
			});
		})
		.catch((err) => {
			console.log( "error ", err );

			var history = this.props.history;
			
			//if user was unauthorized - redirect to login page.			
			unauth_redirect_h( err, history );

			if( err.response.data.error ) {
				this.setState({error: err.response.data.error});
			} else {
				this.setState({error: 'An error occurred, please try again.  If the problem persists, please contact us.'});
			}
		});

	}
	

	/*
		Handle user submitting comment
	 */
	handleCommentSubmit() {
		const relatedTreatment = this.state.treatmentID;
		const comment = this.state.newComment;
		var data = {
			relatedTreatment,
			comment
		};

		axios({
			method: 'post',
			url: `${BASE_SERVER_URL}/comment`,
			headers: {
				authorization: getAuthToken_h()
			},
			data
		})
		.then((res) => {
			//get all comments again.
			this.setState({
				comments: res.data.comments,
				newComment: ""
			});
		})
		.catch((err) => {
			var history = this.props.history;
			
			//if user was unauthorized - redirect to login page.			
			unauth_redirect_h( err, history );

			if( err.response.data.error ) {
				this.setState({error: err.response.data.error});
			} else {
				this.setState({error: 'An error occurred, please try again.  If the problem persists, please contact us.'});
			}
		});

	}

	/*
		Get and set treatment state data. 
	 */
	componentDidMount() {
		const id = this.state.treatmentID;
		var { authenticated } = this.props;
		var userID = getUserId_h();

		axios({
		    method: 'get',
		    url: `${BASE_SERVER_URL}/treatments/${id}`
		})
		.then((res) => {
			var treatment = res.data.treatment;
			var rating = null;
			var userID = getUserId_h();

			//if authenticated - set the current users rating
			if( authenticated && userID ) {
				var userRating = treatment.ratings.filter((rating) => {
					return rating.relatedUser === userID;
				});

				if( userRating.length > 0 ) {
					var rating = userRating[0].rating;
				}
			}

		 	this.setState({
		 		treatment,
		 		rating,
		 		ratingsAverage: treatment.ratingsAverage,
		 		numRatings: treatment.numRatings,
		 		comments: treatment.comments
		 	});
		})
		.catch((err) => {
		});	


		//if authenticated and userID is present - set userID to state
		if( authenticated && userID ) {
			this.setState({
				userID
			});
		}	
	}


	/*
		When a user selects a rating - updates the database based on that rating - along with the state for average rating and number of ratings.
	 */
	handleUserSelectRating( event ) {


		var { authenticated } = this.props;
		var { treatmentID } = this.state;


		//check if user authenticated - if not return false
		if( !authenticated ) {
			return false;
		}

		//new user selected rating
		var rating = event.target.value;
		rating = Number(rating);
		console.log( rating );

		var data = {
			rating,
			relatedTreatment: treatmentID 
		};

		axios({
			method: 'post',
			url: `${BASE_SERVER_URL}/rating`,
			headers: {
				authorization: getAuthToken_h()
			},
			data
		})
		.then((res) => {
			var { ratingsAverage, numRatings } = res.data;
			//get all comments again.
			this.setState({
				ratingsAverage,
				numRatings,
				//update user rating
				rating
			});
		})
		.catch((err) => {
			var history = this.props.history;
			
			//if user was unauthorized - redirect to login page.			
			unauth_redirect_h( err, history );

			if( err.response.data.error ) {
				this.setState({error: err.response.data.error});
			} else {
				this.setState({error: 'An error occurred, please try again.  If the problem persists, please contact us.'});
			}
		});

	}


	/*
		Conditionally shows/hides comments based on whether a user is signed in.
	 */
	renderAddCommentHTML() {
		var {authenticated} = this.props;

		if( authenticated ) {
			return (
				<div className="row">
					<div className="col-md-8 col-md-offset-2">
						<textarea className="form-control" rows="3" placeholder="Add your comment here..." onChange={ this.handleCommentChange } value={this.state.newComment}></textarea>
						<div className="centered margin-top-sm">
							<button onClick={this.handleCommentSubmit} type="button" className="btn btn-default" disabled={this.commentDisableButton()}>Add Comment</button>
						</div>
					</div>
				</div>
			);
		}
	}

	/*
		Shows ratings if there are ratings - and modifies HTML if there are no ratings.
	 */
	renderRatings() {
		var { ratingsAverage, numRatings } = this.state;
		if( ratingsAverage && numRatings ) {
			return (
				<div className="rating-content">
					<span className="rating-review">{ ratingsAverage }</span><span className="num-reviews"> out of { numRatings } Reviews</span>
				</div>
			);
		} else {
			return (
				<div className="rating-content">
					<span className="num-reviews">Treatment has not been rated.</span>
				</div>
			);
		}
	}


	/*
		Renders the select option for a user to rate this particular treatment.
	 */
	renderUserRatingSelect() {
		var { rating } = this.state;
		if( rating !== undefined && rating !== null && rating !== false && rating >= 0 && rating <= 10 ) {
			return (
				<div className="col-md-6 col-md-offset-3">
					<select name="" id="" className="form-control" value={ rating } onChange={this.handleUserSelectRating}>
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
			);
		} else {
			return(
				<div className="col-md-6 col-md-offset-3">
					<select name="" id="" className="form-control" onChange={this.handleUserSelectRating}>
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
			);
		}
	}


	render() {
		var { name, cost, precautions, treatmentComponents, description } = this.state.treatment;
		var { comments } = this.state;
		var numComments = comments.length;
		var {authenticated} = this.props;

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

		/*
			Get all comments.  Passes function to handle liking comments as well.  
		 */
		var allComments = this.state.comments.map((comment) => {
			return <Comment 
					key={ comment._id } 
					usercomment={ comment } 
					userID={ this.state.userID } 
					authenticated={authenticated} 
					commentID={comment._id} 
					treatmentID={this.state.treatmentID} 
					likeComment={ this.handleAddCommentLike } 
					likes={comment.likes}
					updateComment={ this.handleUpdateComment }
					deleteComment={ this.handleDeleteComment }/>;
		});


		return(
			<div>
				<div className="row">
					<div className="centered">
						<h2>{name} Treatment</h2>
						<div className="row">
							<div className="col-md-6 col-md-offset-3">
								<div className="centered">
									{/*<span className="rating-icon" title="Doctor Rating"><i className="fa fa-user-md" aria-hidden="true"></i></span>
									 - <span className="rating-review">9.8</span> <span className="num-reviews"> out of 5000 Reviews</span><br/>*/}
									<span className="rating-icon" title="User Rating"><i className="fa fa-user" aria-hidden="true"></i></span>
									 - { this.renderRatings() }
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
								{this.renderUserRatingSelect()}
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
						{this.renderAddCommentHTML()}
						<div className="row">
							<div className="col-md-4 col-md-offset-4 centered margin-top">
								<label htmlFor="">Sort By</label>
								<select className="form-control" name="" id="">
									<option value="">Date Created</option>
									<option value="">Most Likes</option>
								</select>
							</div>
						</div>
						<div>
							<h3><small className="pull-right">{numComments} comments</small> Comments </h3>
						</div>
						<div className="comments-list">
							{ allComments }
							
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

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	};
}

export default connect(mapStateToProps, null)(Treatment);