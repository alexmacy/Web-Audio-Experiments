function importAudio(url, audioCtx, callback) {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
    	audioCtx.decodeAudioData(request.response, function(buffer) {
    		return callback(buffer);
    	},
    	function(){alert("Error decoding audio data")}
    	);
    }
    request.send();
}

function compressWave(waveData) {
    const resolution = Math.floor(waveData.length/(innerWidth*10));
    const Avgs = []
  
    while (waveData.length > 0) {
        const newSlice = waveData.splice(0,resolution);
        const newVal = newSlice.reduce((p, c) => p + c, 0 )/resolution;
        Avgs.push(newVal);
    }    

    return Avgs
}

function playSound(buffer, offset, audioCtx, callback) {
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start();
    source.onended = function() {
        return callback(buffer, offset)
    }
}

function phase(audioData, offset = 0, rate, callback) {
    offset = (offset + Math.round(rate * audioData.length)) % audioData.length;
    for (let i=0; i<audioData.length; i++) {
        audioData.getChannelData(1)[i] = audioData.getChannelData(0)[(i+offset) % audioData.length]
    }
    callback(audioData, offset);
}

export {
    importAudio,
    compressWave,
    playSound,
    phase
};
