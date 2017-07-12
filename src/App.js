import React, { Component } from 'react';
import logo from './logo.svg';
import TrackableVideo from 'components/TrackableVideo';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TrackableVideo
          src="https://player.vimeo.com/video/196683500"
          onReady={() => console.log('vimeo:ready')}
          onStart={() => console.log('vimeo:started')}
          onPause={() => console.log('vimeo:paused')}
          onProgress={(progress) => console.log('vimeo:progress', progress)}
          onFinish={() => console.log('vimeo:finished!')}
        />
      </div>
    );
  }
}

export default App;
