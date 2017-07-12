# Trackable Video

This is a react component that creates an embedded iframe video, and provides callbacks for various events in the video lifecycle. This is useful if you want to hook in custom analytics, for example.

## Usage

```jsx
  <TrackableVideo
    src="https://player.vimeo.com/video/196683500"
    onReady={() => console.log('vimeo:ready')}
    onStart={() => console.log('vimeo:started')}
    onPause={() => console.log('vimeo:paused')}
    onProgress={(progress) => console.log('vimeo:progress', progress)}
    onFinish={() => console.log('vimeo:finished!')}
  />
```
