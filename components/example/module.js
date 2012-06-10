var   fs = require('fs')
	, jade = require('jade')

/*
 * Standard component class.
 */
var Component = function( config ) {
	var template = 'components/example/template.jade';
	var data = {};
	this.init = function() {
	}
	this.render = function() {
		var content = fs.readFileSync( template );
		return jade.compile( content )( config );
	}
}

module.exports = Component;