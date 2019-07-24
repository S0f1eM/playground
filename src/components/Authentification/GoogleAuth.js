import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions/auth';

class GoogleAuth extends React.Component {
	
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			//.init return a promise
			window.gapi.client.init({
				clientId: '855486433945-dhu58untohgv855iebfa1ejglm1730f5.apps.googleusercontent.com',
				scope: 'email'
			}).then( () => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.onAuthChange(this.auth.isSignedIn.get());
					this.auth.isSignedIn.listen( this.onAuthChange );
			})
		});
	}

	onAuthChange = isSignedIn => {
		if (isSignedIn) {
			this.props.signIn(this.auth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	};

	onSignInClick = () => {
		this.auth.signIn();
	}

	onSignOutClick = () => {
		this.auth.signOut();
	}


	renderAuthButton() {

		// if (this.props.isSignedIn === null) { 
		// 	return null;

		// } 

		// else 
			if (this.props.isSignedIn) {
			
			return (
				
				<button onClick={this.onSignOutClick} className="ui red google button">
					<i className="google icon" />
					Sign Out
				</button>
				//
			) 	

		} 
		else {

			return (

			<button onClick={this.onSignInClick} className="ui red google button">
				<i className="google icon" />
				Sign In with Google
			</button>
			)
		}
	}

	render() {

		return (

			<div>{this.renderAuthButton()}</div>
		)
	}
}

const mapStateToProps = state => {
	return { 
		isSignedIn: state.auth.isSignedIn,
		isSignedOut: state.auth.isSignedOut
	};
}
export default connect ( mapStateToProps, { signIn, signOut } )(GoogleAuth);