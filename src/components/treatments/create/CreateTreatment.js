import React, { Component } from 'react';
import CreateTreatmentForm from './CreateTreatmentForm';
import SuccessItemSubmit from '../../global_components/item_submit/SuccessItemSubmit';


import './styles.css';


class CreateTreatment extends Component {

	constructor(props) {
		super(props); 
		this.state = {
			submitted: false,
		}

		this.handleSubmit  = this.handleSubmit.bind(this);
		
	}

	handleSubmit( submitted ) {
		this.setState({
			submitted
		});
	}


	renderContent() {

		//pass the history to the child component.  History is only avail on react router at parent router level.
		var history = this.props.history;

		if( !this.state.submitted ) {
			return <CreateTreatmentForm submit={this.handleSubmit} conditionID={this.props.match.params.conditionID} history={history} />;
		} else {
			return <SuccessItemSubmit itemName={'treatment'} />;
		}
	}
	

	render() {

		return (
			<div>
				{this.renderContent()}
			</div>
		);
	}

}






export default CreateTreatment;