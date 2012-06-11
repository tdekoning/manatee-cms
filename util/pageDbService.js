var   mongoose = require('mongoose')
	, Schema = mongoose.Schema

var PageSchema = new Schema();
var component = new Schema();

component.add({
	name: String
	, title: String
	, content: String
});

PageSchema.add({
	pid: String
	, title: String
	, content: String
	, template: String
	, components: [component]
});

var pageModel = mongoose.model('pages', PageSchema);

var pagePrototype = {
	pid: undefined
	, title: undefined
	, content: undefined
};

/*
 * Create a new page
 */
function createpage( page ) {
	var tmpPage = new pageModel( page );
	tmpPage.save();
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