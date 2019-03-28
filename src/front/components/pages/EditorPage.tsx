import * as React from 'react';
import { connect } from 'react-redux';

import { Project } from 'lib/render/Types';

import VideoUploader from 'front/components/pages/VideoUploader';
import MainFrameContainer from 'front/components/pages/MainFrameContainer';
import TimelinesContainer from 'front/components/pages/TimelinesContainer';
import VideoEffectsContainer from 'front/components/pages/VideoEffectsContainer';
import VideosContainer from 'front/components/pages/VideosContainer';

class EditorPage extends React.Component<any, any> {
	render(): JSX.Element {
		const { selectedProject } = this.props;

		if (!selectedProject) {
			<h6>Loading...</h6>
		}

		const { timelines } = (selectedProject as Project);

		return (
			<>
				<div className="main-container">
					<div className="main-item">
						<VideoUploader/>
						<VideosContainer/>
					</div>
					<div className="main-item video-frame">
						<MainFrameContainer/>
					</div>
					<div className="main-item">
						<VideoEffectsContainer/>
					</div>
				</div>
				<div>
					<TimelinesContainer timelines={timelines} />
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		selectedProject: state.projects.getIn(['selectedProject'], null),
	};
}

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);
