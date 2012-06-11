/*
 * This file contains the logic of performing CRUD on the cms-pages.
 */

var   mongoose = require('mongoose')
	, Schema = mongoose.Schema

var PageSchema = new Schema();

// Defined the page attributes.
PageSchema.add({
	pid: String
	, title: String
	, content: String
	, template: String
	, components: [{}]
});

var pageModel = mongoose.model('pages', PageSchema);

/*
 * Create a new page
 */
function createPage( page ) {
	new pageModel( page ).save();
}

/*
 * Delete the given page
 */
function deletePage( page ) {
	pageModel.find( { _id: page._id } ).remove();
}

/*
 * Modify page properties
 */
function updatePage( page ) {
	delete page._id;
	pageModel.update( { pid: page.pid }, page, function( err, bla ) {
		console.log(err, bla);
	});
}

/*
 * Retrieve the pages
 */
function getPages( page, callback ) {
	pageModel.find(page, callback);
}

/*
 * Public API
 */
module.exports = {
	getPages: getPages
	, updatePage: updatePage
	, deletePage : deletePage
	, model : pageModel
	, createPage : createPage
}