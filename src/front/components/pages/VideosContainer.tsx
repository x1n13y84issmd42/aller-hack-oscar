import * as React from "react";
import { connect } from 'react-redux';
import { getVideos } from 'front/actions/actions';

class VideosContainer extends React.Component<any, any> {
	componentDidMount(){
		getVideos();
	}

	renderVideosList (videos){
			return videos.map ((video, key) => {
				if (video){
					return (
						<li key={video.id} data-id={video.id}>
							<span>{video.title}</span> <span> {video.length}</span>
						</li>
					)
				}
			})
	}

	render(): JSX.Element {
		return (
			<div>
				<h3> Uploaded videos </h3>
				<ul>
					{this.renderVideosList(this.props.videos)}
				</ul>
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