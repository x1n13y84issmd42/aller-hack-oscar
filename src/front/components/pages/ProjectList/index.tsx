import * as React from 'react';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import ProjectItem from './parts/ProjectItem';

const ProjectsListStyles = (theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
});

const ProjectsList = ({ projects, classes, handleOnClick }) => (
	<div className={classes.root}>
		<List component="nav">
			{projects.map((pj, index) => <ProjectItem key={index} project={pj} handleOnClick={handleOnClick} />)}
		</List>
	</div>
);

const StyledProjectsList = withStyles(ProjectsListStyles)(ProjectsList)
export default StyledProjectsList;
