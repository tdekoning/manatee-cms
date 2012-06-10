var   fs = require('fs')
	, jade = require('jade')
	, pageService = require('../../util/dbconnect').page

/*
 * Standard component class.
 */
var Component = function( res, config ) {
	var template = 'components/menu/template.jade';
	var data = {};
	this.init = function() {
		pageService.getpages(function( err, pages ) {
			data = pages;
		});
	}
	this.render = function() {
		var content = fs.readFileSync( template );
		return jade.compile( content )( {pages: data} );
	}
}

module.exports = Component;