import * as React from "react";
import { connect } from 'react-redux';

class MainFrame extends React.Component<any, any> {
	render(): JSX.Element {

		return (
			<div>
				<div className="main-frame-container">
					<img className="main-frame-image" src="/static/images/clip_mock.jpg"/>
				</div>
				<div>
					<button><i className="fas fa-play"></i></button>
					<button><i className="fas fa-pause"></i></button>
					<button><i className="fas fa-stop"></i></button>
					<button><i className="fas fa-step-forward"></i></button>
					<button><i className="fas fa-step-backward"></i></button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ PersonalData, UI }) => ({});

const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainFrame);