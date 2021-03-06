import * as React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';

import VideoUploader from 'front/components/pages/VideoUploader';
import MainFrameContainer from 'front/components/pages/MainFrameContainer';
import TimelinesContainer from 'front/components/pages/TimelinesContainer';
import VideoEffectsContainer from 'front/components/pages/VideoEffectsContainer';
import VideosContainer from 'front/components/pages/VideosContainer';
import VideoClipsContainer from 'front/components/pages/VideoClipsContainer';

class MainPage extends React.Component<any, any> {
	render(): JSX.Element {

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
					<TimelinesContainer/>
				</div>
			</>
		);
	}
}

const mapStateToProps = ({ PersonalData, UI }) => ({});

const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainPage);
