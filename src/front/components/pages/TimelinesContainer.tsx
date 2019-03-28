import * as React from "react";
import { connect } from 'react-redux';

import TimelineVideo from 'front/components/pages/TimelineVideo';

import { addTimeline } from "front/actions/actions";

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

class TimelinesContainer extends React.Component<any, any> {
	onDragOver = (event) => {
		event.preventDefault();
	}

	onFileDrop = (event) => {
		try {
			const jsonDraggedVideoItem = event.dataTransfer.getData('DraggedVideoItem');
			if (jsonDraggedVideoItem) {
				const draggedVideoItem = JSON.parse(jsonDraggedVideoItem);
				addTimeline(draggedVideoItem);
			}
		} catch (error) {
			console.error(`_OnFileDrop_Error_`, error);
		}
	}

	renderTimelines = (timelines) => {
		return timelines.map((tl, index) => <TimelineVideo
			key={index}
			position={index}
			video={tl.video}
			frames={tl.frames}
		/>)
	};

	render(): JSX.Element {
		const { timelines } = this.props;
		return (
			<div
				className="timelines-container"
				onDrop={this.onFileDrop}
				onDragOver={this.onDragOver}
			>
				{(!timelines || !timelines.length) ?
					(
						<Card className="timelines-empty">
							<Typography component="h5" variant="h5">
								Dude, I want some video item... Drag to me.
							</Typography>
						</Card>
					)
					: (
						<Card>
							{this.renderTimelines(timelines)}
						</Card>
					)
				}
				<Card>
					<TimelineVideo />
				</Card>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		//
	};
}

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps,mapDispatchToProps)(TimelinesContainer)
