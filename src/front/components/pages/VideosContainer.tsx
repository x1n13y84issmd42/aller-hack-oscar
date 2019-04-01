import * as React from "react";
import { connect } from 'react-redux';
import { getVideos } from 'front/actions/actions';
import VideosList from 'front/components/pages/VideosList';
import Typography from '@material-ui/core/Typography';

class VideosContainer extends React.Component<any, any> {
	componentDidMount(){
		getVideos();
	}


	render(): JSX.Element {
		const {videos} = this.props;
		return (
			<div className="videos-list">
				<Typography component="h5" variant="h5" className="text-center">
					Uploaded video
				</Typography>
				<VideosList videos={videos}/>
			</div>
		);
	}
}

const mapStateToProps = state =>
	({
		videos: state.videos.getIn(['videos'], [])
	});


const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VideosContainer)