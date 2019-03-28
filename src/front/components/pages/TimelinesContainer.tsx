import * as React from "react";
import { connect } from 'react-redux';

import TimelineVideo from 'front/components/pages/TimelineVideo';

import { getTimeline } from "front/actions/actions";

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

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
		return timelines.map((tl, index) => <TimelineVideo key={index} video={tl.video} frames={tl.frames} />)
	};

	render(): JSX.Element {
		const { timelines } = this.props;
		return (
			<div className="timelines-container" onDrop={this.onFileDrop} onDragOver={this.onDragOver}>
				<Card  className="timelines-empty">
					<Typography component="h5" variant="h5">
						Dude, I want some video item... Drag to me.
					</Typography>
				</Card>
				{ timelines && timelines.length &&
						<Card>
							{this.renderTimelines(timelines)}
						</Card>
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
