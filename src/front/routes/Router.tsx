import * as React from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { connect } from 'react-redux';

import ProjectsContainer from 'front/components/pages/ProjectsContainer';
import EditorPage from 'front/components/pages/EditorPage';

class Router extends React.Component<any, any> {
	render(): JSX.Element {
		return (
			<Switch>
				<Route exact path="/" component={ProjectsContainer} />
				<Route exact path="/editor/:projectIndex" component={EditorPage} />
			</Switch>

		)
	}
}


const mapStateToProps = state => ({});

const mapDispatchToProps = () => ({});


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Router));
