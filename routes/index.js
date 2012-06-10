var pageService = require('../util/dbconnect').page
	, moduleloader = require('../util/moduleloader')
	, menuModule = moduleloader('menu')

var menu = new menuModule();
menu.init();

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
		res.render('index', {menu: menu.render(), title: page[0].title, pageId: page[0].pid});
	});

}