'use strict';

let eatShitBot = require('./src/eat-shit-bot/eat-shit-bot');

let App = (function() {

	let Bot;
	const phrase = 'get bent';

	const disallowedLeadWords = [];
	const disallowedFollowWords = [];

	let initialize = function() {
		Bot = new eatShitBot({
			disallowedLeadWords,
			disallowedFollowWords
		});
	};

	let stream = function() {
		Bot.getStream(phrase);
	};

	let get = function() {
		Bot.getTweets(phrase, 5);
	};

	let streamAndRetweet = function() {
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
App.streamAndRetweet();
//App.get();
