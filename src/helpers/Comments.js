class Comments {

	constructor( comments ) {
		this.comments = comments;
	}

	getComments() {
		if( this.comments ) {
			return this.comments;
		}

		return false;
	}

	sortComments( sortBy ) {
		if( !this.comments ) {
			return false;
		}

		switch ( sortBy ) {
			case 'date created':
				return this.comments.sort( this.sortByDateNewToOld );
			case 'likes':
				return this.comments.sort( this.sortByLikesHighToLow );
			default: 
				return this.comments;
		}
	}

	/*
		Sorts comments from newest to oldest dates.  Used w/ sort function.
	 */
	sortByDateNewToOld( a, b ) {
		if (a.date_created > b.date_created)
			return -1;
		if (a.date_created < b.date_created)
			return 1;
		return 0;
	}

	/*
		Sort by likes from high to low.
	 */
	sortByLikesHighToLow( a, b ) {
		return b.likes.length - a.likes.length;
	}

}


export default Comments;