import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


class Layout extends React.Component<any, any> {

	render(): JSX.Element {
		return (
			<>
				{this.props.children}
			</>
		)
	};
}

const mapStateToProps = state => ({});

const mapDispatchToProps = () => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));