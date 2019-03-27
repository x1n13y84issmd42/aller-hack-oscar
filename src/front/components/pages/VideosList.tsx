import * as React from "react";
import { withStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

const styles = theme => createStyles({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
});

class VideosList extends React.Component<any, any> {

	renderVideosList(videos) {
		return videos.map((video, key) => {
			if (video) {
				return (
					<ListItem key={video._id} alignItems="flex-start">
						<Avatar>
							<ImageIcon/>
						</Avatar>
						<ListItemText primary={video.name} secondary={video.length}/>
					</ListItem>
				)
			}
		})
	}

	render(): JSX.Element {
		const {classes, videos} = this.props;
		return (
			<List className={classes.root}>
				{this.renderVideosList(videos)}
			</List>
		);
	}
}


export default withStyles(styles)(VideosList);