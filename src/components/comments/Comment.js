import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import "./styles.css";


class Comment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			usercomment: props.usercomment
		};
	}


	render() {
		var { commentDate, username, likes, comment } = this.state.usercomment;

		return (
			<div className="media comment-item">
				<p className="pull-right"><small>{ commentDate }</small>
				</p>
				
				<div className="media-body">
					<h4 className="media-heading user_name">{ username }</h4> { comment }

					<p><small><a href="">Edit</a> - <a href="">Like</a> - <a href="">Share</a></small>
					<br/></p>
					<br/><p><span className="user-likes"><small>{ likes } Likes</small></span></p>
				</div>
			</div>
		);
	}
}

//hello
export default Comment; 