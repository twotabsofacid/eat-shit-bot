'use strict';

var merge = require('lodash/merge');

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
	this.options = merge({}, EatShitBot.DEFAULTS, options);
	console.log('hello');
}

EatShitBot.DEFAULTS = {};

module.exports = EatShitBot;

/**
 * [description]
 * @function
 *
 * @param {number} tick - Description of tick parameter
 * @return {object} Description of returned value
 */
EatShitBot.prototype.public = function (tick) {
	return {tock: tick};
};

/**
 * [description]
 * @function
 *
 * @private
 * @return {boolean} Description of return value
 */
EatShitBot.prototype._private = function () {
	return true;
};
