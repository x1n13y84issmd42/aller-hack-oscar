import {Component} from 'react';
import * as React from 'react';
import Dropzone from 'react-dropzone';

import { addVideo } from 'front/actions/actions';

class VideoUploader extends React.Component<any, any> {
	constructor(props) {
		super(props);
		this.state = {
			files: [],
			filesToUpload: [],

		};
	}
	onDrop = (files) => {
		//this.setState({files});
		let formData = new FormData();
		files.forEach(file => {
			formData.append('video', file, file.name)
		});
		addVideo(formData);
	};

	render() {
		/*const files = this.state.files.map(file => (
			<li key={file.name}>
				{file.name} - {file.size} bytes
			</li>
		));*/

		return (
			<>
			<Dropzone onDrop={this.onDrop}>
				{({getRootProps, getInputProps, isDragActive}) => (
					<section >
						<div className={'uploader ' + (isDragActive ? 'active' : 'inactive')} {...getRootProps()}>
							<input name="video" {...getInputProps()} />
							<p className="text-center">Drag 'n' drop some files here, or click to select files</p>
						</div>
					</section>
				)}
			</Dropzone>
				</>
		);
	}
}

export default VideoUploader;

/*
<aside>
			<h4>Files</h4>
		<ul>{files}</ul>
		</aside>
 */