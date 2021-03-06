import React from 'react';
import { sampleMD } from './sampleMD'; 
import marked from 'marked';


class Markdown extends React.Component {

	state = { 
		text: sampleMD
	};

	componentWillMount() {
		const localStorageText = localStorage.getItem('text');

		if (localStorageText) {
			this.setState({
				text: localStorageText
			});
		}
	}


	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem('text', nextState.text );
	}


	editText = event => {
		const text =  event.target.value;
		this.setState({ text });
	}

	renderText = text => {
		const renderText = marked(text, { sanitize: true });

		return { __html: renderText };
	}

	render() {
		return(
		<div className="ui container" style={{margin:"4em 0"}}>

			<div className="ui two column stackable grid">

				<div className="ui row">

					<div className="column eight wide ui form">
					  <div className="field">
						<textarea 
							value={this.state.text}
							rows="35"
							onChange={ (e) => this.editText(e) } 
						/>
						</div>
					</div>

					<div className="column six wide">
						<div dangerouslySetInnerHTML={this.renderText(this.state.text)} />
					</div>

				</div>

			</div>
		</div>

		)
	}
}


export default Markdown;