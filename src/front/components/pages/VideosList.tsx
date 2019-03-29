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
	onVideoItemDragStart = (event, videoItem) => {
		const jsonVideoItem = JSON.stringify(videoItem);
		event.dataTransfer.setData('DraggedVideoItem', jsonVideoItem);
	}

	renderVideosList = (videos) => {
		return videos.map((video) => {
			if (video) {
				return (
					<ListItem
						data-id={video._id|| video.id}
						key={video._id || video.id}
						alignItems="flex-start"
						onDragStart={(e) => this.onVideoItemDragStart(e, video)}
						draggable
						className="video-item">
						<Avatar>
							<ImageIcon />
						</Avatar>
						<ListItemText primary={video.name} secondary={video.length} />
					</ListItem>
				)
			}
		})
	}

	render(): JSX.Element {
		const { classes, videos } = this.props;
		return (
			<List className={classes.root}>
				{this.renderVideosList(videos)}
			</List>
		);
	}
}


export default withStyles(styles)(VideosList);