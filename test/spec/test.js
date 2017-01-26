/* global describe, it, assert, EatShitBot */
'use strict';

/**
 * EatShitBot mocha test spec - https://mochajs.org/
 * @param {Object} EatShitBot - EatShitBot unit tests
 */
describe('EatShitBot', function () {
	it('should be a function', function () {
		assert.equal(typeof EatShitBot, 'function');
	});

	var bot = new EatShitBot();

	console.log(bot);

	console.log(bot.getMostRecentMagaTweet());
});
