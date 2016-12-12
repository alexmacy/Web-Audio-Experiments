import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import * as d3 from 'd3';
import * as LoadAudio from './LoadAudio';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const url = "./rain.wav";


LoadAudio.importAudio(url, audioCtx, render)

function play(buffer, offset = 0) {

	d3.select("#start-stop").text("Stop")
		.on("click", startStop)

	function startStop() {
		const playing = d3.select("#start-stop").text() === "Stop";

		if (!playing) {
			play(buffer, offset || 0)
		} else {
			d3.select("#loop-check").property("checked", false)
		}
	}

	d3.select("#loop-check").property("checked", true)


	var xScale = d3.scaleLinear().range([0, innerWidth-10])
		.domain([0, buffer.length])

    LoadAudio.playSound(buffer, offset, audioCtx, function(a, b) {
    	if (d3.select("#loop-check").property("checked") && 
    			d3.select("#start-stop").text() === "Stop") {
    		
    		const rate = +d3.select("#offset-select").property("value"); 

    		document.getElementById("wave_1")
    			.setAttribute("transform",  `translate(-${Math.floor(xScale(b))}, 0)`)

    		return LoadAudio.phase(a, b, rate, function(b, c) {
    			play(buffer, c)
    		});
    	} else {
    		d3.select("#start-stop").text("Start");
    	}
    })
}

function render(buffer) {
    const waveData = [
    	LoadAudio.compressWave([...buffer.getChannelData(0)]),
    	[
    		...LoadAudio.compressWave([...buffer.getChannelData(1)]),
    		...LoadAudio.compressWave([...buffer.getChannelData(1)])
		]
	];

	ReactDOM.render(
		<App data={waveData} />,
		document.getElementById('root')
	);
	play(buffer, 0)
	d3.select("#loop-check").property("checked", true)
}
