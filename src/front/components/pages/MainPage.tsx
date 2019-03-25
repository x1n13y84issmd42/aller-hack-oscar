import * as React from 'react';
import { connect } from 'react-redux';
import VideoUploader from "../uploader";

class MainPage extends React.Component<any, any> {
	render(): JSX.Element {

		return (
			<VideoUploader/>
		);
	}
}

const mapStateToProps = ({ PersonalData, UI }) => ({});

const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainPage);
