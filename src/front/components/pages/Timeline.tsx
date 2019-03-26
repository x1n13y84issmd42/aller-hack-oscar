import * as React from "react";
import { connect } from 'react-redux';
import ImageContainer from 'front/components/pages/ImageContainer'
import {getClips} from "../../actions/actions";

class Timeline extends React.Component<any, any> {
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
			<div className="timelines-item">
				timeline
				<ImageContainer/>
			</div>
		);
	}
}

const mapStateToProps = ({ PersonalData, UI }) => ({});

const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Timeline)