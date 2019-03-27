import * as React from "react";
import { connect } from 'react-redux';

import TimelineVideo from 'front/components/pages/TimelineVideoVideo';

import { getTimeline } from "front/actions/actions";

import Card from '@material-ui/core/Card';

class TimelinesContainer extends React.Component<any, any> {
	onDragOver = (event) => {
		event.preventDefault();
	}

	onFileDrop = (event) => {
		const jsonDraggedVideoItem = event.dataTransfer.getData('DraggedVideoItem');
		const draggedVideoItem = JSON.parse(jsonDraggedVideoItem);
		getTimeline(draggedVideoItem);
	}

	renderTimelines = (timelines) => {
		return timelines.map((tl) => <TimelineVideo video={tl.video} frames={tl.frames} />)
	};

	render(): JSX.Element {
		const { timelines } = this.props
		return (
			<div className="timelines-container" onDrop={this.onFileDrop} onDragOver={this.onDragOver}>
				{(!timelines || !timelines.length) ?
					(
						<h4 className="timelines-empty">Dude, I want some video item... Drag to me.</h4>
					)
					: (
						<Card>
							{this.renderTimelines(timelines)}
						</Card>
					)
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		timelines: state.frames.getIn(['timelines'], [])
	};
}

const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TimelinesContainer)
