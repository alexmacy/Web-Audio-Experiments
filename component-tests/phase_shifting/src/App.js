import React, { Component } from 'react';
import WaveContainer from './WaveCombined';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        Phase offset:  
        <select id="offset-select" defaultValue={.005}>
            <option value={.001}>1 millisecond</option>
            <option value={.005}>5 milliseconds</option>
            <option value={.01}>10 milliseconds</option>
            <option value={.05}>50 milliseconds</option>
            <option value={.1}>100 milliseconds</option>
        </select>
        <button id="start-stop">Stop</button>
        <input type="checkbox" id="loop-check"/> Keep looping
        <WaveContainer 
          height={innerHeight - 10} 
          width={innerWidth - 10}
          data={this.props.data}
          />
      </div>
    );
  }
}

export default App;
