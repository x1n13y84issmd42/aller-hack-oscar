import { handleActions } from 'redux-actions';
import * as Immutable from 'seamless-immutable';

import { Project } from 'lib/render/Types';

import Constants from 'front/constants';

export interface ProjectsInterface {
	projects: Project[],
}

const initialStateProjects = Immutable.from<ProjectsInterface>({
	projects: []
});

const ProjectsReducer = handleActions({
	[Constants.ADD_PROJECT]: (state, action) => {
		const projects = state.getIn(['projects']);

		const project = action.payload;

		return state.set('projects', [...projects, project]);
	},
	[Constants.ADD_TIMELINE]: (state, action) => {
		const projects = state.getIn(['projects']);

		const project = action.payload;

		return state.set('timelines', [...projects, project]);
	},
	[Constants.ADD_EFFECT]: (state, action) => {
		const projects = state.getIn(['projects']);

		const payload = action.payload;

		return state.set('timelines', [...projects, payload]);
	},
}, initialStateProjects);

export default ProjectsReducer;
