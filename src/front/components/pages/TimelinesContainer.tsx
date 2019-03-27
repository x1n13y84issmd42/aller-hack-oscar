import * as React from "react";
import { connect } from 'react-redux';
import Timeline from 'front/components/pages/Timeline';
import Card from '@material-ui/core/Card';

class TimelinesContainer extends React.Component<any, any> {
	render(): JSX.Element {

		return (

			<div className="timelines-container">
				<Card>
				<Timeline/>
				<Timeline/>
				<Timeline/>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = ({ PersonalData, UI }) => ({});

const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TimelinesContainer)