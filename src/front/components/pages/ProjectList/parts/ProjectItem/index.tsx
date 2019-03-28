import * as React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const PorjectItem = ({ project, handleOnClick }) => {
	const onItemClick = (e) => {
		e.stopPropagation();
		handleOnClick(project);
	}

	return (
		<ListItem button onClick={onItemClick}>
			<ListItemText primary={project.title} />
		</ListItem>
	)
};

export default PorjectItem;