var pageService = require('../util/dbconnect').page


/*
 * GET home page.
 */
exports.index = function(req, res){
	res.render('index', { title: 'Express' })
};

/*
 * GET cms page.
 */
exports.pages = function( pageId, res ) {
	var page = pageService.getpages({ pid: pageId }, function( err, page ) {
		res.render('index', {title: page[0].title, pageId: page[0].pid});
	});

}