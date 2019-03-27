import * as React from "react";
import { connect } from 'react-redux';
import TimelineVideo from 'front/components/pages/Timeline';
import Card from '@material-ui/core/Card';

class TimelinesContainer extends React.Component<any, any> {
	render(): JSX.Element {

		return (

			<div className="timelines-container">
				<Card>
				<TimelineVideo/>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = ({ }) => ({});

const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TimelinesContainer)