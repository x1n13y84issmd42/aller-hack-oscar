<img align=left src="doc/oscar.png">

# Oscar
Out contribution to the Aller Hackathon 2019.
A video filtering & post-processing for social networks. Think super-advanced Instagram filters but for video, or, the other way round, a super-retarded Adobe After Effects in browser/on mobile.

Since we're limited in many ways, from screen real estate to users' proficiency in video editing, the app must be as automatic as possible.

A typical usage scenario: a user uploads few videos they took with their camera, selects a `preset`, makes minor adjustments, the app renders the resulting video and uploads it to a social network of choice.

# The Crew
* [**Eugene S. Merkoulov**](https://github.com/x1n13y84issmd42) - [transcoding](https://github.com/x1n13y84issmd42/aller-hack-oscar/tree/render/front/src/app/lib/streams) & [rendering engine](https://github.com/x1n13y84issmd42/aller-hack-oscar/tree/render/front/src/app/lib/render);
* [**Maxim Sorokin**](https://github.com/Ziqul) - [rendering engine](https://github.com/x1n13y84issmd42/aller-hack-oscar/tree/render/front/src/app/lib/render) & [FX](https://github.com/x1n13y84issmd42/aller-hack-oscar/tree/render/repos-effects/src/app/lib/render/effects) development;
* **Natalia Kulychyk** - [user interface](https://github.com/x1n13y84issmd42/aller-hack-oscar/tree/render/repos-effects/src/front);
* [**Daniel Morozov**](https://github.com/hameltomor) - all around guy, from [auth](https://github.com/x1n13y84issmd42/aller-hack-oscar/blob/master/src/app/lib/auth/index.ts) to [back-end APIs](https://github.com/x1n13y84issmd42/aller-hack-oscar/blob/master/src/app/HTTP/controllers/FrameController.ts) to [social media publishing](https://github.com/x1n13y84issmd42/aller-hack-oscar/blob/master/src/app/HTTP/controllers/FacebookController.ts) to [fron-end](https://github.com/x1n13y84issmd42/aller-hack-oscar/commit/467b36b2e22123161056e64fc7fe2471221ff18e), the real MVP.

## Main components
Lucky us, we have the exact number of people we need to parallelize the development.

### Render Server
This is where videos are uploaded and transcoded. It stores video files, it has `ffmpeg` & `OpenGL` installed, it has few API endpoints to upload videos, request frames from them for UI and request final rendering. See [RenderServer](doc/RenderServer.md) for details.

### Rendering Engine & FX framework
The engine exists on both ends for obvious reasons, and requires some extra thought on design. See [RenderingCore](doc/RenderingCore.md) for details.

### UI
Nata you go! See [UI](doc/UI.md) for details.

### FX & Preset Libraries
When the FX framework is ready it's time to implement the actual effeects. See [FX](doc/FX.md) for details


### Dev notes
#### CLI for testing
`run/app rt [PATH TO VIDEO FILE] [OPERATION] [OP ARGS]`

*OPERATIONS*
* pixels - outputs raw RGB24 output from `ffmpeg`
* frames - outputs JPG frames