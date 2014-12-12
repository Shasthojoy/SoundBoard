'use strict';

/* global define:true*/
define(['jquery',
    'knockout',
    'lodash'
    ], function ($, ko, _) {
  return function () {
    var self = this;

    // Example observable
    self.status = ko.observable('active');
    self.oscillators = ko.observableArray();
    self.audioContext;
    self.addOscillator = function(){

    };
    self.play = function(){
    	console.log("Play");
    	_.forEach(self.oscillators(), function(osc)
    		{     
    			console.log("Playing oscillators");
    			osc.start(0);
    			osc.stop(10);
    		})
    };
    self.init = function(){
    	window.AudioContext = window.AudioContext || window.webkitAudioContext;
		self.audioContext = new window.AudioContext();


		var compressor = self.audioContext.createDynamicsCompressor();
		compressor.connect(self.audioContext.destination);

		for (var i = 0; i < 3; i++) {
		    var osc = self.audioContext.createOscillator();
		    osc.frequency.setValueAtTime(200 + Math.random() * 200, 0);
		    osc.detune.setValueAtTime(Math.random() * 20 - 10, 0);
		    osc.type = "sawtooth";

		    for (var t = 0; t < 5; t++) {
		        if (Math.random() < 0.1) {
		            osc.frequency.exponentialRampToValueAtTime(200 + Math.random() * 200, t * 2 + Math.random());
		        }
		    }

		    osc.frequency.exponentialRampToValueAtTime(75 * Math.floor(Math.random() * Math.random() * 3 + 1), 18);

		    for (var t = 0; t < 15; t++) {
		        osc.detune.setValueAtTime(Math.random() * 30 - 15, t * 2 + Math.random());
		    }

		    var filter = self.audioContext.createBiquadFilter();
		    filter.type = "lowpass";
		    filter.frequency.value = 3000 + Math.random() * 2000;
		    filter.Q.value = Math.random() * 2;

		    var amp = self.audioContext.createGain();
		    amp.gain.setValueAtTime(0, 0);
		    amp.gain.linearRampToValueAtTime(1, 5 + Math.random() * 5);
		    amp.gain.setValueAtTime(1, 22);
		    amp.gain.linearRampToValueAtTime(0, 30);

		    var panner = self.audioContext.createPanner();
		    panner.setPosition(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);

		    osc.connect(filter);
		    filter.connect(amp);
		    amp.connect(panner);
		    panner.connect(compressor);

		    self.oscillators.push(osc);
		}
   	}
	self.init();
  };
});
