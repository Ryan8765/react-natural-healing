import React, {Component} from 'react';
import gif from './loader.gif';
import axios from 'axios';
import { BASE_SERVER_URL } from '../../config';

class Verify extends Component {
	constructor(props) {
		super(props);

		this.state = {
			verified: null
		};
	}


	componentDidMount() {
		var { email, secret } = this.props.match.params;

		setTimeout(()=>{ 
			axios({
			method: 'post',
			url: `${BASE_SERVER_URL}/verify/${secret}/${email}`
			})
			.then((res) => {
				console.log( res );
				
				if( res.data.success ) {
					this.setState({ verified: true });
				} else {
					this.setState({ verified: false });
				}
			})
			.catch((err) => {
				console.log( err );
				this.setState({error: err.response.data.error});
				this.setState({ verified: false });
			});
		}, 1000);
	}

	renderReponse() {

		var { verified } = this.state;

		if( verified === true ) {
			return [
				<h3 className="centered" key="1">Email Verification Successful!</h3>,
				<p className="margin-top-sm" key="2">Your email has been verified.  You can now log in.</p>
			];
		} else if ( verified === null ) {
			return [
				<h3 className="centered" key="1">Verifying User...</h3>,
				<img className="margin-top" src={gif} alt="Loading Gif" key="2"/>
			];
		} else if ( verified === false ) {
			return [
				<h3 className="centered" key="1">Error Validating User!</h3>,
				<p className="margin-top-sm" key="2">Your request could not be processed.  Please check the URL link or email support if the problem persists.</p>
			];
		}

	}


	render() {
		return(
			<div className="row">
				<div className="col-md-6 col-md-offset-3 centered">
					{this.renderReponse()}
				</div>
			</div>
		);
	}
}


export default Verify;