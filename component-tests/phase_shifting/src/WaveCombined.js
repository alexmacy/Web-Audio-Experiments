import React, { Component } from 'react';

import * as d3 from 'd3';

class WaveContainer extends Component {
  render() {
    const x = d3.scaleLinear()
      .range([0, this.props.width])
      .domain([0, this.props.data[0].length]);

    const y = d3.scaleLinear()
      .range([0, this.props.height/3])
      .domain(d3.extent(this.props.data[0]))
    
    const wave = d3.line()
        .curve(d3.curveMonotoneX)
        .x((d, i) => x(i))
        .y(d => y(d))

    const waveHeight = (this.props.height/3) + 20;
    
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        >
        {(this.props.data).map((d, i) => 
          <g
            key={"wave_" + i} 
            style={{transform: `translateY(${20 + i * waveHeight}px)`}}
            >
            {drawWave(wave(d), i)}
          </g>
        )}
      </svg>
    );
  }
}

function drawWave(waveShape, waveNum) {
  return <path className="Wave" id={"wave_" + waveNum} d={waveShape} />;
}

export default WaveContainer;
