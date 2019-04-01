import * as React from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router';
import {connect} from 'react-redux';
import MainPage from '../components/pages/MainPage';



class Router extends React.Component<any, any> {
	render(): JSX.Element {
		return (
			<Switch>
				<Route exact path="/" component={MainPage}/>
			</Switch>

		)
	}
}


const mapStateToProps = state => ({});

const mapDispatchToProps = () => ({});

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Router));