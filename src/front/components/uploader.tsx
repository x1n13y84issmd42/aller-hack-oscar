import {Component} from 'react';
import * as React from 'react';
import Dropzone from 'react-dropzone';


class VideoUploader extends React.Component<any, any> {
	constructor(props) {
		super(props);
		this.state = {
			files: []
		};
	}
	onDrop = (files) => {
		this.setState({files})
	};

	render() {
		const files = this.state.files.map(file => (
			<li key={file.name}>
				{file.name} - {file.size} bytes
			</li>
		));

		return (
			<Dropzone onDrop={this.onDrop}>
				{({getRootProps, getInputProps}) => (
					<section>
						<div {...getRootProps()}>
							<input {...getInputProps()} />
							<p>Drag 'n' drop some files here, or click to select files</p>
						</div>
						<aside>
							<h4>Files</h4>
							<ul>{files}</ul>
						</aside>
					</section>
				)}
			</Dropzone>
		);
	}
}

export default VideoUploader;