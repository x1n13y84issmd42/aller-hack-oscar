import * as React from "react";
import { connect } from 'react-redux';
import * as types from 'lib/render/types';
import * as render from 'lib/render/index';
import { Three } from 'lib/render/API/3'
import { APIFramesExtractor } from '../../APIFramesExtractor'

let machine: render.TheMachine;

class TheMachine extends React.Component<any, any> {
	componentDidMount() {
		let project: types.Project = {
			settings: {
				title: 'A Failure',
				width: 800,
				height: 600,
				FPS: 30,
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

		let canvas = document.getElementById(`frame-preview`) as HTMLCanvasElement;
		
		machine = new render.TheMachine(
			project,
			new APIFramesExtractor(project),
			new Three(project, canvas.getContext('3d') as WebGLRenderingContext),
		);

	}
	
	doRender() {
		machine.renderFrame(0, 0);
	}

	render(): JSX.Element {
		return (<div>
				<canvas id="frame-preview"/>
				<a href="javascript:void(0)" onClick={this.doRender}>TEST</a>
		</div>);
	}
}

const mapStateToProps = ({  }) => ({});

const mapDispatchToProps = () => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TheMachine);
