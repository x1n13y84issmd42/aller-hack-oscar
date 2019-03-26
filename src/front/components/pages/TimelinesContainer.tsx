import * as React from "react";
import { connect } from 'react-redux';
import Timeline from 'front/components/pages/Timeline';

class TimelinesContainer extends React.Component<any, any> {
	render(): JSX.Element {

		return (
			<div>
				<Timeline/>
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