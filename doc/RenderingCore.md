# Oscar Rendering Core

## Architecture overview
Basic idea: use `ffmpeg` to retrieve video frames, use frames as textures in an OpenGL app, render something fun, get funny frames, use `ffmpeg` to encode them back into a video.

#### Streams
The rendering pipeline is based on `streams`. Each stream has its own concern, be it decoding, encoding, format conversion, and they are connected in a chain in the following fashion:
* ffmpeg decoder stream - _produces frames as 2D arrays of RGB24 pixels_
* RGB24 to OpenGL converter - _converts RGB24 pixels to native WebGL texture objects_
* Renderer - _uses the frame textures for rendering_
* OpenGL to RGB24 converter - _converts WebGL textures to 2D arrays of RGB24 pixels_
* ffmpeg encoder stream - _RGB24 pixels are fed to `ffmpeg` for encoding_

The `renderer` stream is where the magic happens. Actualy, there can be arbitrary number of renderer streams, each renders it's own `timeline` (see below).

#### Presets
Since we're limited in many ways, from screen real estate to users' proficiency in video editing, the app must be as automatic as possible. So the idea is to provide users with several different `presets` that describe the process of automated video editing.

A `preset` consists of the following things:
* `Timeline`
* `Clips`
* `Effects`
  * `Clip effects`
  * `Transition effects`

A preset is essentially a description of the rendering process we want to perform. It references all the `clips` and `effects` with their configuration (defined by the user).

#### Timeline
Timeline is container for clips & effects. Any preset can have an arbitrary number of timelines which are composed like layers in Photoshop, and every timeline is rendered by its own `renderer stream`.

#### Clip
A short fragment of a video, the basic building block in the app. Refers to a video file and has timestamps, limiting length of the clip.

#### Effect
Effect is the centerpiece of this software, an algorithm that manipulates video frames with OpenGL. There are two types of effects: clip effect & transition effects. A typical effect has a name and a set of properties, altering its behavior, that users can control from UI. For the sake of simplicity and pleasant user experience the amount of controls each effect has should not be overwhelming.

#### Clip effect
A manipulation of clip contents. Pretty much anything can be done here that can be done with a frame pixel contents in OpenGL.

#### Transition effect
A nice transition between two adjacent clips.

---

## Design challenges
The nature of the application, as well as its design, put some requirements to the design of the rendering system.
### Single frame rendering on demand
It should be possible to fire up rendering of the entire preset at given timestamp to obtain a single frame.
Since the `rendering core` exists within a `renderer stream`, which receives one frame at a time, this should come fo free.
### Control over Level of Detail
It might be needed to have a couple of `quality settings` for the renderer, so it might trade between picture quality and rendering speed. This may be useful in UI to have fast & dirty live previews of effects, as well as a HQ static preview of a single frame.