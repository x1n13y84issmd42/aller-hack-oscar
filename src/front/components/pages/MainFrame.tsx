import { withStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import * as React from "react";
import {  getCurrentImage } from "front/actions/actions";

const styles = theme => createStyles({
	card: {
		display: 'block',
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	content: {
		//flex: '1 0 auto',
	},
	cover: {
		//width: '100%',
		height: '470px'
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
	},
	playIcon: {
		height: 38,
		width: 38,
	},
});


class MainFrame extends React.Component<any, any> {
	onClick = () =>{
		console.log(this.props.project)
		getCurrentImage(this.props.project);
	};

	render(): JSX.Element {
		console.log(this.props);
		const { classes, theme, url } = this.props;
		return (
			<Card className={classes.card}>
				<CardContent className={classes.content}>
					<Typography component="h5" variant="h5">
						Frame Editor
					</Typography>
				</CardContent>
				<div>
				<CardMedia
					className={classes.cover}
					image={url}
					title="Frame editor"
				/>
				</div>
				<div className={classes.details}>
					<div className={classes.controls}>
						<IconButton aria-label="Previous">
							{theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
						</IconButton>
						<IconButton aria-label="Play/pause" onClick={this.onClick}>
							<PlayArrowIcon className={classes.playIcon} />
						</IconButton>
						<IconButton aria-label="Next">
							{theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
						</IconButton>
					</div>
				</div>
			</Card>
		);
	}
}

export default withStyles(styles, { withTheme: true })(MainFrame);
