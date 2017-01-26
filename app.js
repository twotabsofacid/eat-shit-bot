'use strict';

var eatShitBot = require('./src/eat-shit-bot/eat-shit-bot');

var App = (function() {

	var Bot;
	var phrase = 'I am so lonely';

	var initialize = function() {
		Bot = new eatShitBot();
	};

	var stream = function() {
		Bot.getStream(phrase);
	};

	var get = function() {
		Bot.getTweets(phrase, 5);
	};

	var streamAndRetweet = function() {
		Bot.streamAndRetweet(phrase);
	};

	return {
		init: function() {
			initialize();
		},
		stream: function() {
			stream();
		},
		get: function() {
			get();
		},
		streamAndRetweet: function() {
			streamAndRetweet();
		}
	}

}());

App.init();
//App.streamAndRetweet();
App.get();
