import * as React from "react";
import { connect } from 'react-redux';
import MainFrame from 'front/components/pages/MainFrame'

class MainFrameContainer extends React.Component<any, any> {

	render(): JSX.Element {
		return (
			<div>
				<div className="main-frame-container">
					<MainFrame url={this.props.currentImage} project={this.props.project}/>
				</div>
			</div>
		);
	}
}


const mapStateToProps = state =>
	({
		currentImage: state.projects.getIn(['currentImage'], '',),
		project: state.projects.getIn(['selectedProject'], [])
	});

const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainFrameContainer);