import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import Button from '@material-ui/core/Button';

import { addProject, selectProject } from 'front/actions/actions';

import ProjectList from './ProjectList';

const ProjectStyles = theme => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
		width: '240px',
		margin: '20px auto',
	},
	formControl: {
		margin: theme.spacing.unit,
	},
});

class ProjectContainer extends React.Component<any, any> {
	state = {
		name: '',
	};

	get projectList() {
		const { projects } = this.props;

		if (!projects || !projects.length) {
			return <h5>You don't have projects.</h5>
		}

		return <ProjectList projects={projects} handleOnClick={this.selectProject} />
	}

	get redirectToHome() {
		const { selectedProject } = this.props;
		if (!selectedProject) {
			return null;
		}
		return <Redirect to={`editor/${selectedProject.id}`} />
	}

	selectProject = (project) => {
		selectProject(project);
	}

	createProject = () => {
		const { name } = this.state;
		addProject(name);
		this.setState({ name: '' });
	}

	handleChangeName = (event) => {
		this.setState({ name: event.target.value });
	}

	render() {
		const { classes } = this.props;
		const { name } = this.state;
		return (
			<div className="project-setup">
				{this.redirectToHome}
				<Paper className={classes.root} elevation={1}>
					<Typography variant="h5" component="h3">
						List of your projects:
					</Typography>
					{this.projectList}
				</Paper>
				<Paper className={classes.root} elevation={1}>
					<Typography variant="h5" component="h3">
						Create a new project
					</Typography>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="component-simple">Project Name</InputLabel>
						<Input id="component-simple" value={name} onChange={this.handleChangeName} />
					</FormControl>
					<Button variant="contained" color="primary" onClick={this.createProject}>
						Create Project
					</Button>
				</Paper>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		projects: state.projects.getIn(['projects'], []),
		selectedProject: state.projects.getIn(['selectedProject'], null),
	};
}

const mapDispatchToProps = () => ({});

const StyledProjectContainer = withStyles(ProjectStyles)(ProjectContainer);
export default connect(mapStateToProps, mapDispatchToProps)(StyledProjectContainer);
