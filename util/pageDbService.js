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
function createpage( page ) {
	new pageModel( page ).save();
}

/*
 * Delete the given page
 */
function deletepage( page ) {
	pageModel.find( page ).remove();
}

/*
 * Modify page properties
 */
function updatepage( page ) {
	pageModel.find( { pid: page.pid } ).put( page );
}

/*
 * Retrieve the pages
 */
function getpages( page, callback ) {
	pageModel.find(page, callback);
}

/*
 * Public API
 */
module.exports = {
	getpages: getpages
	, updatepage: updatepage
	, deletepage : deletepage
	, model : pageModel
	, createpage : createpage
}