var pageUtil = require('../util/pageUtil')

/*
 * GET home page.
 */
exports.index = function(req, res){
	res.render('index', { title: 'Express' })
};

/*
 * GET cms page.
 */
exports.pages = function( pageId, req, res ) {
	pageUtil( pageId, req, res );
}