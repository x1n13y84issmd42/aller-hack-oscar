# UI
User interface serves two main purposes:
* it generates & configures `preset` data
* it operates `renderer`

Keep in mind that we are not making a professional video editing software, instead we're aiming at casual users coming from Instagram, FB and alikes. So the UI must be simple to grasp, sleek and natural to operate.

Screen layout is supposed to have a preview of the video frame taking most of the screen area, and a timeline on the bottom where `clips` and `fx` are displayed. There can be multiple timelines stacked on top of each other like layers in Photoshop.

Users can pick arbitrary `clips` and `fx` from their library and put them on `timelines`. `Clips` and `fx` have some simple settings, different `fx` have different ones as defined by the `fx` developer.

It must be possible to `live preview` the video playing, probably with lower LOD for better performance. Static frame previews probably should render in full quality. See [RenderingCore](doc/RenderingCore.md) for details.