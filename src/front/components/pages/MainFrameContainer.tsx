import * as React from "react";
import { connect } from 'react-redux';
import MainFrame from 'front/components/pages/MainFrame'

class MainFrameContainer extends React.Component<any, any> {
	render(): JSX.Element {
		const { currentImage, project } = this.props;
		return (
			<div>
				<div className="main-frame-container">
					<MainFrame url={currentImage} project={project} />
				</div>
			</div>
		);
	}
}


const mapStateToProps = state =>
	({
		currentImage: state.projects.getIn(['currentImage'], ''),
		project: state.projects.getIn(['selectedProject'], null)
	});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MainFrameContainer);
