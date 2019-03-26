import * as React from "react";
import { connect } from 'react-redux';
import ImageContainer from 'front/components/pages/ImageContainer'

class Timeline extends React.Component<any, any> {
	render(): JSX.Element {

		return (
			<div>
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