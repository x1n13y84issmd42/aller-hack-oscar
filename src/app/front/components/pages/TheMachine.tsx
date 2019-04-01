import * as React from "react";
import { connect } from 'react-redux';
import * as types from 'lib/render/types';

class TheMachine extends React.Component<any, any> {
	componentDidMount() {
		let v: types.ClipDesc = {
			"videoId": "23434",
			"timelinePosition": undefined,
			"clipping": {
				"start": 123,
				"end": 125,
			},

			"effects": undefined,
		};

		console.log(`The `);
	}

	render(): JSX.Element {

		return (
			<div>The Machine works</div>
		);
	}
}

const mapStateToProps = ({  }) => ({});

const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TheMachine);
