import React, { Component } from 'react';
import validator from 'validator';
import axios from 'axios';
import { BASE_SERVER_URL } from '../../../config';
import ConditionForm from './ConditionForm';
import SuccessItemSubmit from '../../global_components/item_submit/SuccessItemSubmit';


class CreateCondition extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			submitted: false 
		};

		this.handleSubmit  = this.handleSubmit.bind(this);
		this.createContent = this.createContent.bind(this);

	}


	handleSubmit( submitted ) {
		this.setState({
			submitted
		});
	}

	createContent() {
		const submitted = this.state.submitted;
		if( submitted ) {
			return (
				<SuccessItemSubmit itemName={'condition'} />
			);
		} else {
			return (
				<ConditionForm submit={this.handleSubmit}/>
			);
		}
	}

	render() {
		return (
			<div>
				{this.createContent()}
			</div>
		);
	}
}


export default CreateCondition;
