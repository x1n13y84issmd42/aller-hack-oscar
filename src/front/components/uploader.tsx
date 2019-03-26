import {Component} from 'react';
import * as React from 'react';
import Dropzone from 'react-dropzone';
import { sendVideo } from 'front/actions/actions';


class VideoUploader extends React.Component<any, any> {
	constructor(props) {
		super(props);
		this.state = {
			files: [],
			filesToUpload: [],

		};
	}
	onDrop = (files) => {
		this.setState({files});
		let formData = new FormData();
		files.forEach(file => {
			formData.append(file.name, file)});
		sendVideo(formData);
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