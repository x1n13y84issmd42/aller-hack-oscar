import * as React from "react";
import { connect } from 'react-redux';

class ImageContainer extends React.Component<any, any> {
	render(): JSX.Element {

		return (
			<div>
				image
			</div>
		);
	}
}

const mapStateToProps = ({ PersonalData, UI }) => ({});

const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ImageContainer)