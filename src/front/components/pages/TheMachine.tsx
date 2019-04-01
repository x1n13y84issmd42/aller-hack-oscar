import * as React from "react";
import { connect } from 'react-redux';
import * as types from 'lib/render/types';
import * as render from 'lib/render/index';
import { Three } from 'lib/render/API/3'
import { APIFramesExtractor } from '../../APIFramesExtractor'
import { CachingAPIFramesExtractor } from "front/CachingAPIFramesExtractor";
import { Sink } from "lib/streams";

let machine: render.TheMachine;

export type TheMachineProps = {
	frameIndex: number;
	playing: boolean;
};

const project: types.Project = {
	settings: {
		title: 'A Failure',
		width: 800,
		height: 600,
		FPS: 25,
		length: 1,
	},
	timelines: [
		{
			entities: [
				{
					videoId: "5c9b84e10479733facf2a181",
					clipping: {
						start: 0,
						end: 1
					},		
					timelinePosition: {
						start: 0,
						end: 0,
					},
					effects: []
				}
			]
		}
	]
};

class TheMachine extends React.Component<TheMachineProps, any> {
	componentDidMount() {

		let canvas = document.getElementById(`frame-preview`) as HTMLCanvasElement;
		canvas.style.marginLeft = `-${project.settings.width/2}px`;
		canvas.style.left = `50%`;
		canvas.style.position = `relative`;

		let ctx = canvas.getContext('webgl');
		
		machine = new render.TheMachine(
			project,
			new CachingAPIFramesExtractor(project),
			new Three(project, ctx as WebGLRenderingContext),
		);
		
		machine.renderFrame(0, 0);
		machine.stream.pipe(new Sink);
	}

	componentDidUpdate() {
		this.doRender();

		if (this.props.playing) {
			let frame = 0;
			let animate = async () => {
				await machine.renderFrame(frame++, 0);
				if (frame >= project.settings.FPS * project.settings.length) {
					frame = 0;
				};

				setTimeout(animate, 1000 / project.settings.FPS);
			}
			
			animate();
		}
	}

	doRender() {
		machine.renderFrame(this.props.frameIndex, 0);
	}

	render(): JSX.Element {
		return (<div>
				<canvas id="frame-preview" width='800' height='600'/>
		</div>);
	}
}

const mapStateToProps = ({  }) => ({});

const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TheMachine);
