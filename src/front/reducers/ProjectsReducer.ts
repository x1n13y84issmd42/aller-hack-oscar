import { handleActions } from 'redux-actions';
import * as Immutable from 'seamless-immutable';

import { Project } from 'lib/render/Types';

import Constants from 'front/constants';

export interface ProjectsInterface {
	projects: Project[],
	selectedProject: Project,
}

const initialStateProjects = Immutable.from<ProjectsInterface>({
	projects: [],
	selectedProject: null,
});

const ProjectsReducer = handleActions({
	[Constants.ADD_PROJECT]: (state, action) => {
		const projects = state.getIn(['projects']);
		const project = action.payload as Project;
		return state.set('projects', [...projects, project]);
	},
	[Constants.ADD_VIDEO]: (state, action) => {
		const projects = state.getIn(['projects']);

		const project = action.payload;

		return state.set('timelines', [...projects, project]);
	},
	[Constants.ADD_TIMELINE]: (state, action) => {
		const selectedProject = state.getIn(['selectedProject']) as Project;
		selectedProject.timelines.push(action.payload);

		return state.set('selectedProject', selectedProject);
	},
	[Constants.ADD_EFFECT]: (state, action) => {
		const selectedProject = state.getIn(['selectedProject']) as Project;
		const { effect, entityIndex, timelineIndex } = action.payload;
		selectedProject.timelines[timelineIndex].entities[entityIndex].effects.push(effect);
		return state.set('selectedProject', selectedProject);
	},
	[Constants.SELECT_PROJECT]: (state, action) => {
		const project = { ...action.payload };
		return state.set('selectedProject', project);
	},
}, initialStateProjects);

export default ProjectsReducer;
