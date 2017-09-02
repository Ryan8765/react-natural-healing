import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import "./styles.css";


class Comment extends Component {

	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			usercomment: props.usercomment,
			userID: props.userID,
			treatmentID: props.treatmentID,
			commentID: props.commentID,
			likes: props.likes,
			updateCommentText: null,
			reallyDeleteShowing: false
		};

		this.likeComment         = this.likeComment.bind(this);
		this.hasUserLikedComment = this.hasUserLikedComment.bind(this);
		this.updateEditState     = this.updateEditState.bind(this);
		this.updateComment       = this.updateComment.bind(this);
		this.editComment         = this.editComment.bind(this);
		this.editCancel          = this.editCancel.bind(this);
		this.showReallyDelete    = this.showReallyDelete.bind(this);
		this.deleteComment       = this.deleteComment.bind(this);
	}

	/*
		Checks whether current user has liked a comment.  If so - returns true.
	 */
	hasUserLikedComment( likes, userID ) {
		var currentUserLikes = likes.filter((like) => {
			return like.relatedUser === userID;
		});

		if( currentUserLikes.length > 0 ) {
			return true;
		} else {
			return false;
		}
	}

	/*
		This is used because the constructor function state above is set by "props" - example from constructor - "usercomment: props.usercomment".  In order for props to get updated via the parents state - we must use "componentWillReceiveProps" to tell this component to update its props after the state update in the parent component.
	 */
	componentWillReceiveProps(nextProps) {
		this.setState({ 
			usercomment: nextProps.usercomment,
			userID: nextProps.userID,
			treatmentID: nextProps.treatmentID,
			commentID: nextProps.commentID,
			likes: nextProps.likes 
		});  
	}

	/*
		Using function passed down from treatment - adds a liked comment and updates comment state in parent component. 
	 */
	likeComment( event ) {
		const { commentID, treatmentID } = this.state;
		this.props.likeComment( commentID, treatmentID );
	}


	/*
		Using function passed down from treatment - updates a comment and updates comment state in parent component. 
	 */
	updateComment( event ) {
		const { commentID, treatmentID, updateCommentText } = this.state;

		if( updateCommentText ) {
			this.props.updateComment( commentID, treatmentID, updateCommentText );
		}
		this.setState({
			edit: false
		});
		
	}

	/*
		Delete Comment.  Using function passed dwon from treatment - deletes a comment and updates comment state in parent componet.
	 */
	deleteComment( event ) {
		const { commentID, treatmentID } = this.state;
		this.props.deleteComment( commentID, treatmentID );
	}

	/*
		Handles updating edit state
	 */
	updateEditState( event ) {
		if( this.state.edit ) {
			this.setState({
				updateCommentText: event.target.value
			});
		}
	}

	/*
		Make comment editable when edit button is clicked
	 */
	editComment( event ) {
		this.setState({edit: true});
	}

	/*
		Cancel edit comment.
	 */
	editCancel( event ) {
		this.setState({edit: false});
	}

	/*
		Really delete functionality.  Hides/shows really delete text
	 */
	showReallyDelete( event ) {
		this.setState({
			reallyDeleteShowing:true
		},() => {
			setTimeout(()=>{
				this.setState({
					reallyDeleteShowing: false
				});
			}, 4000);
		});
	}

	/*
		Renders really delete text or trashcan.
	 */
	renderReallyDeleteText() {
		const {reallyDeleteShowing} = this.state;

		if( reallyDeleteShowing ) {
			return (
				<span className="really-delete-text" onClick={ this.deleteComment }>Really Delete?</span>
			);
		} else {
			return (
				<span title="Delete Comment" onClick={this.showReallyDelete}><i className="fa fa-trash trash_icon" aria-hidden="true"></i></span>
			);
		}
	}

	renderLinks() {
		var {usercomment, userID, likes} = this.state;
		var authenticated = this.props.authenticated;

		//if user isn't authenticated - don't show any buttons.
		if(!authenticated){
			return (<p></p>);
		}

		if( usercomment.relatedUser === userID ) {
			return (
				<p>
					<span title="Edit Comment" onClick={this.editComment}><i className="fa fa-pencil-square edit_icon" aria-hidden="true"></i></span> {this.renderReallyDeleteText()}
				</p>
			);
		} else {
			if( !this.hasUserLikedComment( likes, userID ) ) {
				return (
					<p>
						<span onClick={ this.likeComment }><i className="fa fa-thumbs-up comment_icon" aria-hidden="true"></i></span>
					</p>
				);
			} else {
				return (<p></p>);
			}
		}
	}


	render() {
		var { date_created, username, likes, comment } = this.state.usercomment;
		var { edit }      = this.state;
		var numberOfLikes = likes.length;

		if( edit ) {
			return (
				<div className="media comment-item">
					<p className="pull-right"><small>{ date_created }</small>
					</p>
					
					<div className="media-body">
						<h4 className="media-heading user_name">{ username }</h4> 
						<br/>
						<textarea cols="30" rows="5" className="form-control" onChange={this.updateEditState}>{ comment }</textarea>
						<p>
							<span title="Save" className="save-icon" onClick={ this.updateComment }><i className="fa fa-check-square" aria-hidden="true"></i></span><span className="cancel-icon" title="Cancel" onClick={this.editCancel}><i className="fa fa-times" aria-hidden="true"></i></span>
						</p>
						
						<p><span className="user-likes"><small>{ numberOfLikes } Likes</small></span></p>
					</div>
				</div>
			);
		} else {
			return (
				<div className="media comment-item">
					<p className="pull-right"><small>{ date_created }</small>
					</p>
					
					<div className="media-body">
						<h4 className="media-heading user_name">{ username }</h4> 
						<br/>
						{ comment }
						<br/><br/>
						{this.renderLinks()}
						<p><span className="user-likes"><small>{ numberOfLikes } Likes</small></span></p>
					</div>
				</div>
			);			
		}
	}//end render
}

//hello
export default Comment; 