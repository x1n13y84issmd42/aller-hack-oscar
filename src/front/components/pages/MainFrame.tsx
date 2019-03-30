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
import TheMachine from './TheMachine';

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
	private frameIndex: 0;

	constructor(props) {
		super(props);
		this.state = {
			frameIndex: 10
		};
	}

	componentDidMount() {
		this.setState({
			frameIndex: 0
		})
	}

	nextFrame() {
		this.setState({frameIndex: this.state.frameIndex + 1});
	}
	
	prevFrame() {
		this.setState({frameIndex: Math.max(0, this.state.frameIndex - 1)});
	}

	render(): JSX.Element {
		const { classes, theme, url } = this.props;
		return (
			<Card className={classes.card}>
				<div>

				<TheMachine frameIndex={this.state.frameIndex} playing={this.state.playing}/>
				
				</div>
				<div className={classes.details}>
					<div className={classes.controls}>
						<IconButton aria-label="Previous">
							{theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
						</IconButton>
						<a className='button-a' onClick={()=>{
							this.togglePlayback();
						}} >
							<IconButton aria-label="Play/pause">
								<PlayArrowIcon className={classes.playIcon} />
							</IconButton>
						</a>
						<a className='button-a' onClick={()=>{
							this.nextFrame();
						}} >
							<IconButton aria-label="Next">
								{theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
							</IconButton>
						</a>
					</div>
				</div>
			</Card>
		);
	}
	togglePlayback(): any {
		this.setState({playing: !this.state.playing});
	}
}

export default withStyles(styles, { withTheme: true })(MainFrame);
