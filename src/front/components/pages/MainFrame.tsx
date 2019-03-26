import * as React from "react";
import { connect } from 'react-redux';

class MainFrame extends React.Component<any, any> {
	render(): JSX.Element {

		return (
			<div>
			Mainframe
			</div>
		);
	}
}

const mapStateToProps = ({ PersonalData, UI }) => ({});

const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainFrame);