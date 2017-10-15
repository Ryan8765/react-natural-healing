import React, {Component} from 'react';
import axios from 'axios';
import validator from 'validator';

import { BASE_SERVER_URL } from '../../../config';
import SuccessItemSubmit from './item_submit/SuccessItemSubmit';



class Reset extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: "",
            inputsTouched: {
                newpw: false,
                verifypw: false
            },
            inputValidation: {
                newpw: false,
                verifypw: false
            },
            inputData: {
                newpw: false,
                verifypw: false
            },
            apiError: null,
            successPwReset: null
        };


        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit      = this.handleSubmit.bind(this);
    }



    /**
     * Handles validating the passwords to make sure they are validated
     * @param  {string} name  name used on the form
     * @param  {string} value the value of the input elements
     */
    handleValidation(name, value) {
		var inputValidation    = this.state.inputValidation;

		var validation = {
			newpw: inputValidation.newpw,
			verifypw: inputValidation.verifypw
		}

		var inputsTouched = this.state.inputsTouched;
		switch (name){
			case 'newpw':
				if( !validator.isAlpha(value) && validator.isLength(value, {min: 6, max: 40}) ) {
                    console.log('hello');
					validation.newpw = true;

				} else {
					validation.newpw = false;
				}
				break;
			case 'verifypw':
				if( validator.equals(value, this.state.inputData.newpw) ) {

					validation.verifypw = true;

				} else {
					validation.verifypw = false;
				}
				break;
		}

		this.setState({
			inputValidation: validation
		});
	}

    /**
     * Submits the form data to the backend
     * @param  {event object} event - Even object from form submittal
     */
    handleSubmit( event ) {
        event.preventDefault();
        var { email, pwtoken } = this.props.match.params;

        var data = {
            email,
            pwtoken,
            newpw: this.state.inputData.newpw
        };

        axios({
            method: 'post',
            url: `${BASE_SERVER_URL}/reset`,
            data
        })
        .then((res) => {
            console.log( res );
            this.setState({
                successPwReset: true
            });
        })
        .catch((err) => {
            console.log( err );
            this.setState({apiError: err.response.data.error});
        });
    }

    /**
     * When inputs are changed on the form - update the corresponding input state.
     * @param  {object} event - the event object for corresponding input element.
     */
    handleInputChange( event ) {
		const target     = event.target;
		const value      = target.type === 'checkbox' ? target.checked : target.value;
		const name       = target.name;


		this.setState({
			inputData:{
				...this.state.inputData,
				[name]: value
			}
		},() => {
			this.handleValidation( name, value);
		});
	}


    /**
     * Updates state based on which input elements have been touched.
     * @param  {string} field - Name of the input element being touched.
     */
	handleBlur = (field) => (evt) => {
		this.setState({
			inputsTouched: {
                ...this.state.inputsTouched,
                [field]: true
            }
		},() => {

		});
	}

    /**
     * If error on API call, show error to user.
     * @return {HTML Object} HTML to show user.
     */
    showApiError() {
        const { apiError } = this.state;
        if( apiError ) {
            return (
                <div className="centered">
                    <span className="validation-error-text">There was an error processing your request.  Please open the link sent to you in your email and try again.  If this problem persists, contact support.</span>
                </div>
            );
        }
    }


    /**
     * Show validation error on screen for a particular input element.
     * @param  {string} name - name of the input element
     * @return {[html element]} - returns html element validation error.
     */
	showValidationError( name ) {
		const touched   = this.state.inputsTouched;
		const validated = this.state.inputValidation;

		if( name === 'newpw' ) {
			if( touched.newpw && !validated.newpw ) {
				return (<span className="validation-error-text">Must have 6 characters.<br/>Must contain numbers and letters.</span>);
			}
		} else if (name === 'verifypw') {
			if( touched.verifypw && !validated.verifypw ) {
				return (<span className="validation-error-text">Does not match!</span>);
			}
		}
	}


    /**
     * Determines if the form is validated
     */
    isFormValidated() {
		var validations = this.state.inputValidation;

		if( validations.newpw && validations.verifypw ) {
			return true;
		}

		return false;
	}

    /**
     * Handles disabling the submit button
     */
    disableButton() {
		if( !this.isFormValidated() ) {
			return "disabled";
		}
	}

    renderContent() {
        if( this.state.successPwReset ) {
            return (
                <div>
                    <SuccessItemSubmit />
                </div>
            );
        } else {
            return (
                <div className="row">
                    <div className="col-md-4 col-md-offset-4 centered">
                        <h3>Password Reset</h3>
                    </div>
                    <div className="row">
                        <div className="col-md-2 col-md-offset-5 margin-top-sm">
                            <form onSubmit={this.handleSubmit}>
                                <label htmlFor="newpw">Enter New Password</label>
                                <input
                                    name="newpw"
                                    type="password"
                                    className="form-control"
                                    onChange={ this.handleInputChange }
                                    onBlur={this.handleBlur('newpw')}/>
                                {this.showValidationError('newpw')}
                                <label className="margin-top-sm" htmlFor="verifypw">Reenter Password</label>
                                <input
                                    name="verifypw"
                                    type="password"
                                    className="form-control"
                                    onChange={ this.handleInputChange }
                                    onBlur={this.handleBlur('verifypw')}/>
                                {this.showValidationError('verifypw')}

                                <input
                                    className="styled-button form-control margin-top-sm" type="submit"
                                    value="submit"
                                    name="submit"
                                    disabled={this.disableButton()}/>
                                {this.showApiError()}

                            </form>
                        </div>
                    </div>
                </div>
            );
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

export default Reset;
