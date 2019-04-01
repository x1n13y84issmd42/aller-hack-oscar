import * as React from "react";
import { connect } from 'react-redux';
import {getClips} from "../../actions/actions";

class VideoClipsContainer extends React.Component<any, any> {
	componentDidMount(){
		getClips();
	}

	renderClipsList (clips){
		return clips.map ((clip, key) => {
			if (clip){
				return (
					<li key={clip.id} data-id={clip.id}>
						<div>
							<img width="100" height="100" src={clip.URL}/>
						</div>
						<div>
							<span>{clip.videoID}</span>
							<span>{clip.t1}</span>
							<span>{clip.t2}</span>
						</div>
					</li>
				)
			}
		})
	}
	render(): JSX.Element {

		return (
			<div>
				<h3> Clips </h3>
				<ul>
					{this.renderClipsList(this.props.clips)}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state =>
	({
		clips: state.clips.getIn(['clips'], [])
	});


const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VideoClipsContainer)