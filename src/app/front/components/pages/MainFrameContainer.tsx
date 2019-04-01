import * as React from "react";
import { connect } from 'react-redux';
import MainFrame from 'front/components/pages/MainFrame'

class MainFrameContainer extends React.Component<any, any> {
	render(): JSX.Element {

		return (
			<div>
				<div className="main-frame-container">
					<MainFrame url="/static/images/clip_mock.jpg"/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({  }) => ({});

const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainFrameContainer);
