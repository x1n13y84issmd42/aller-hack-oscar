import * as React from "react";
import { connect } from 'react-redux';
import ImageContainer from 'front/components/pages/ImageContainer'
import {getClips} from "../../actions/actions";
//const vis = require('vis');
import Timeline from 'react-visjs-timeline';

class TimelineVideo extends React.Component<any, any> {
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
		const options = {
			width: '100%',
			height: '200px',
			stack: false,
			showMajorLabels: true,
			showCurrentTime: false,
			//zoomMin: 1000000,
			//type: 'background',
			format: {
				//minorLabels: {
				//	minute: 'h:mma',
				//	hour: 'ha'
				//},
				majorLabels: {
					//millisecond: 'HH:mm:ss',
					//second: 'D MMMM HH:mm',
					minute: 'mm:ss'
				}
			}
		};
		//[, hours [, minutes [, seconds [, milliseconds]]]]
		const items = [
		{
			start: new Date(2010, 7, 15, 1, 1, 15,0).getTime(),
			end: new Date(2010, 7, 15,1,1,15, 200).getTime(),  // end is optional
			content: '<img src="/static/images/clip_mock.jpg" width=100 height=100/>',
		},
			{
				start: new Date(2010, 7, 15, 1, 1, 15,200).getTime(),
				end: new Date(2010, 7, 15,1,1,15, 400).getTime(),  // end is optional
				content: '<img src="/static/images/clip_mock.jpg" width=100 height=100/>',
			},
			{
				start: new Date(2010, 7, 15, 1, 1, 15,400).getTime(),
				end: new Date(2010, 7, 15,1,1,15, 600).getTime(),  // end is optional
				content: '<img src="/static/images/clip_mock.jpg" width=100 height=100/>',
			},
			{
				start: new Date(2010, 7, 15, 1, 1, 15,600).getTime(),
				end: new Date(2010, 7, 15,1,1,15, 800).getTime(),  // end is optional
				content: '<img src="/static/images/clip_mock.jpg" width=100 height=100/>',
			},
			{
				start: new Date(2010, 7, 15, 1, 1, 15,800).getTime(),
				end: new Date(2010, 7, 15,1,1,15, 1000).getTime(),  // end is optional
				content: '<img src="/static/images/clip_mock.jpg" width=100 height=100/>',
			},
		{
			start: new Date(2010, 7, 15, 1, 1, 16, 0).getTime(),
			end: new Date(2010, 7, 15,1,1,16,1000).getTime(),  // end is optional
			content: '<img src="/static/images/clip_mock.jpg" width=100 height=100/>',
		}
		]
		return (
			<div className="timelines-item">
				<Timeline options={options} items={items}/>
			</div>
		);
	}
}

const mapStateToProps = ({  }) => ({});

const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TimelineVideo)