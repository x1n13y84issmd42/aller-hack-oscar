import * as React from "react";
import { connect } from 'react-redux';
import Timeline from 'react-visjs-timeline';

import { addEffect } from "front/actions/actions";

class TimelineVideo extends React.Component<any, any> {
	private timelineWrapperRef = React.createRef<HTMLDivElement>();
	constructor(props) {
		super(props);
		//const start = Date.now();
		//const start = new Date(0);
		//const start = new Date(Date.UTC(0, 0, 0));
		this.state = {
			time1: -7200000,
			//time2: start+80,
			start: -7200000
		};
	}

	onDragOver = (event) => {
		event.preventDefault();
	};

	onEffectDrop = (event) => {
		try {
			const jsonDraggedEffectItem = event.dataTransfer.getData('DraggedEffectItem');
			if (jsonDraggedEffectItem) {
				const draggedEffectItem = JSON.parse(jsonDraggedEffectItem);
				addEffect(0, 0, draggedEffectItem);
			}
		} catch (error) {
			console.error(`_OnEffectDrop_Error_`, error);
		}
	}

	frameGenerator = ()=> {
		const { start } = this.state;
		//const { video } = this.props;
		let video = 1000;
		/*const { video, frames } = this.props;
		const { start } = this.state;
		let i=0;
		//frameDuration is counted like 25 frame oer second, 1 sec = 1000 msec
		const frameDuration = 1000/25;
		const framesOfTimeline = [];
		frames.forEach((frame) => {
			const item = {
				start: start + frameDuration * i,
				end: start + frameDuration *(i+1),
				content: '',
				id: i};
			i++;
			framesOfTimeline.push(item)
		})
		console.log(framesOfTimeline)
		return framesOfTimeline;*/
		//}
		const items =[];
		const item = {
			start: start,
			end: start + video,
			content: '',
			id: 0};

		//}
		items.push(item);
		return items;
	}

	clickHandler = (props) => {
		console.log(this)
		console.log(props)
	};

	rangeChangeHandler = (props)=>{
	};


	timechangeHandler = (props) => {
	}

	timechangedHandler = (props) => {
		this.setState({ [props.id]: new Date(props.time).getTime() });
		console.log(this.state);
		let { time1, time2 } = this.state;
		if (time1 > time2) {
			let temp = time2;
			time2 = time1;
			time1 = temp
		}
		const v = this.timelineWrapperRef.current;
		const items = v['$el'].itemsData._data;
		const selectedItems = [];
		Object.keys(items).forEach((key, index) => {
			let itemStart = new Date(items[key].start).getTime();
			let itemEnd = new Date(items[key].end).getTime();
			if (((itemStart <= time1 && itemEnd >= time1) || (itemStart >= time1 && itemEnd >= time1))
				&& ((itemStart <= time2 && itemEnd >= time2) || (itemStart <= time2 && itemEnd <= time2))) {
				selectedItems.push(key)
			}
		})
		console.log(selectedItems);

		selectedItems.forEach((id) => {
			const el = document.querySelectorAll("[data-id='" + id + "']");
			if ((' ' + el[0].className + ' ').indexOf(' ' + 'vis-selected' + ' ') < 0) {
				el[0].className += ' ' + 'vis-selected';
			}
		})
	};

	render(): JSX.Element {
		const {start} = this.state;
		const options = {
			width: '100%',
			height: '200px',
			stack: false,
			selectable: true,
			showCurrentTime: false,
			//zoomMin: 10000,
			//zoomMax: 1000000,
			type: 'range',
			format: {
				minorLabels: {
					second: 'ss',
				},
				majorLabels: {
					minute: 'mm'
				}
			},
			start: start,
			end: start + 1000,
			dataAttributes: 'all',
			editable: true
		};
		const customTimes = {
			time1: start,
			//time2: start + 80
		};
		const items = this.frameGenerator();
		console.log(items);
		//const items = [
		//{
		//	start: new Date(2010, 7, 15, 1, 1, 16),
		//	end: new Date(2010, 7, 15,1,1,17,),  // end is optional
		//	content: '',
		//	id: 0
		//},
	//]
	/*	{
			start: new Date(2010, 7, 15, 1, 1, 17),
			end: new Date(2010, 7, 15,1,1,18),  // end is optional
			content: '<img src="/static/images/clip_mock.jpg" width=100 height=100/>',
			id: 1
		},
		{
			start: new Date(2010, 7, 15, 1, 1, 18),
			end: new Date(2010, 7, 15,1,1,19),  // end is optional
			content: '<img src="/static/images/clip_mock.jpg" width=100 height=100/>',
			id: 2
		},
		{
			start: new Date(2010, 7, 15, 1, 1, 19),
			end: new Date(2010, 7, 15,1,1,20),  // end is optional
			content: '<img src="/static/images/clip_mock.jpg" width=100 height=100/>',
			id: 3
		},
		{
			start: new Date(2010, 7, 15, 1, 1, 20),
			end: new Date(2010, 7, 15,1,1,21),  // end is optional
			content: '<img src="/static/images/clip_mock.jpg" width=100 height=100/>',
			id: 4
		},
		{
			start: new Date(2010, 7, 15, 1, 1, 21),
			end: new Date(2010, 7, 15,1,1,22),  // end is optional
			content: '<img src="/static/images/clip_mock.jpg" width=100 height=100/>',
			id: 5
		}
		];*/

		customTimes.time1 = this.state.time1;
		//customTimes.time2 = this.state.time2;

		//const customTimes: any = {
		//	time1: new Date(2010, 7, 15, 1, 1, 16),
		//	time2: new Date(2010, 7, 15, 1, 1, 22)
		//};

		/*const items = [
			{
				start: new Date(2010, 7, 15, 1, 1, 16),
				end: new Date(2010, 7, 15, 1, 1, 17),  // end is optional
				content: '<img src="/static/images/clip_mock.jpg" width=100 height=100/>',
				id: 0
			},
			{
				start: new Date(2010, 7, 15, 1, 1, 17),
				end: new Date(2010, 7, 15, 1, 1, 18),  // end is optional
				content: '<img src="/static/images/clip_mock.jpg" width=100 height=100/>',
				id: 1
			},
			{
				start: new Date(2010, 7, 15, 1, 1, 18),
				end: new Date(2010, 7, 15, 1, 1, 19),  // end is optional
				content: '<img src="/static/images/clip_mock.jpg" width=100 height=100/>',
				id: 2
			},
			{
				start: new Date(2010, 7, 15, 1, 1, 19),
				end: new Date(2010, 7, 15, 1, 1, 20),  // end is optional
				content: '<img src="/static/images/clip_mock.jpg" width=100 height=100/>',
				id: 3
			},
			{
				start: new Date(2010, 7, 15, 1, 1, 20),
				end: new Date(2010, 7, 15, 1, 1, 21),  // end is optional
				content: '<img src="/static/images/clip_mock.jpg" width=100 height=100/>',
				id: 4
			},
			{
				start: new Date(2010, 7, 15, 1, 1, 21),
				end: new Date(2010, 7, 15, 1, 1, 22),  // end is optional
				content: '<img src="/static/images/clip_mock.jpg" width=100 height=100/>',
				id: 5
			}
		];*/

		//customTimes.time1 = this.state.time1;
		//customTimes.time2 = this.state.time2;

		return (
			<div
				className="timelines-item"
				onDrop={this.onEffectDrop}
				onDragOver={this.onDragOver}
			>
				<Timeline
					options={options}
					items={items}
					customTimes={customTimes}
					clickHandler={this.clickHandler}
					rangechangeHandler={this.rangeChangeHandler}
					timechangeHandler={this.rangeChangeHandler}
					timechangedHandler={this.timechangedHandler}
					ref={this.timelineWrapperRef}
				/>
			</div>
		);
	}
}

const mapStateToProps = ({ }) => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TimelineVideo)
