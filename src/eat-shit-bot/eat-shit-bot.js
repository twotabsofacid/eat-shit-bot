'use strict';

var _ = require('lodash');
var merge = require('lodash/merge');
var Twit = require('twit');
var credentials = require('./../../credentials');

/**
 * EatShitBot constructor description
 *
 * @class EatShitBot
 * @classdesc EatShitBot class description
 *
 * @param {object} options - Instance instantiation object
 * @param {string} options.example - Example options property
 */
function EatShitBot(options) {
	this.twitBot;
	this.twitterBot;
	this.stream;
	this.options = merge({}, EatShitBot.DEFAULTS, options);
	this.createTwitterConnection();
}

EatShitBot.DEFAULTS = {};

module.exports = EatShitBot;

EatShitBot.prototype.createTwitterConnection = function() {
	this.twitBot = new Twit({
		consumer_key:         credentials.consumer_key,
		consumer_secret:      credentials.consumer_secret,
		access_token:         credentials.access_token,
		access_token_secret:  credentials.access_token_secret
	});
};

EatShitBot.prototype.getStream = function(string) {
	this.stream = this.twitBot.stream('statuses/filter', {
		track: string
	});
	this.stream.on('tweet', function(tweet) {
		this.logTweet(tweet["text"], tweet["user"]["screen_name"]);
	}.bind(this));
};

EatShitBot.prototype.getTweets = function(string, count) {
	var statuses, i;
	this.twitBot.get('search/tweets', {
		q: '' + string + '',
		count: count
	}, function(error, data, response) {
		if (data) {
			statuses = data.statuses;
			i = statuses.length;
			while (i--) {
				this.logTweet(statuses[i]["text"], statuses[i]["user"]["screen_name"]);
			}
		} else {
			console.log(error);
		}
	}.bind(this));
};

EatShitBot.prototype.streamAndRetweet = function(string) {
	this.stream = this.twitBot.stream('statuses/filter', {
		track: string
	});
	this.stream.on('tweet', function(tweet) {
		console.log('we got a tweet:', tweet["text"]);
		if (tweet["text"].toLowerCase().indexOf(string.toLowerCase()) !== -1) {
			console.log('we retweet:', tweet["text"]);
			this.retweet(tweet.id_str);
		}
	}.bind(this));
};

EatShitBot.prototype.retweet = function(tweetId) {
	this.twitBot.post('statuses/retweet/' + tweetId, function(error, tweet, response) {
		if (!error) {
			this.logTweet(tweet["text"], tweet["user"]["screen_name"]);
		};
	}.bind(this));
};

EatShitBot.prototype.logTweet = function(tweet, screenName) {
	console.log(`${tweet}\n${screenName}\n\n`)
};
