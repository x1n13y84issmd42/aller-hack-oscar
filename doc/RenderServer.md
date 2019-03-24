# Render Server
Also a storage & transcoding server. It has three main duties:
* file storage
* transcoding
* rendering
* libraries

### File storage
Source Video files are uploaded here.

### Transcoding & Frame API
The server should serve frames from the uploaded files on UIs demand.
The Frame API might look like `/api/frames/[VIDEO_ID]/[T1]-[T2]` where `T1` && `T2` are timestamps.
It's response might be something along the lines of
```
[
	{
		't': 134127653445,
		'URL': 'http://oscar.app/frames/[VIDEO_ID]_134127653445.jpg'
	},
	{
		't': ...
		'URL': '...'
	},
	...
]
```

#### TODO
Cache frames

### Rendering
The most important mission for the server. To recap, the final result is made of a `preset`, which references `clips` & `effects` with their user-defined configuration. So need to take all that and render it for good. See [RenderingCore](doc/RenderingCore.md) for details. 

### Libraries
Every user has their own library of uploaded videos, as well as clips made from those videos.

Also there is a global library of built-in effects.

Both libs are available for the user in UI.