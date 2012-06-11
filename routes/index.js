var pageUtil = require('../util/pageUtil')
	, pageDbService = require('../util/pageDbService')

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

/*
 * GET admin page.
 */
exports.admin = function( page, req, res ) {
	pageDbService.getpages({}, function( err, pages ) {
		res.render('../admin/views/' + page + '.jade', { pages: pages });
	});
}