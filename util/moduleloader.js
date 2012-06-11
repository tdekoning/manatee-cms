/*
 * Custom moduleloader that can load npm-defined modules or custom component modules.
 */
var exceptions = require('../util/exceptions')

/*
 * Load a build in module that matches the given name.
 */
function loadBuildIn( modulename ) {
	try {
		return require( modulename );
	} catch( exception ) {
		// There is no npm-module defined.
		return undefined;
	}
}

/*
 * Loads a component module that matches the given name.
 */
function loadComponentModule( modulename ) {
	try {
		return require('../components/' + modulename + '/module.js');
	} catch( exception ) {
		// There is no component module defined.
		throw new exceptions.ModuleNotFoundException( modulename );
	}
}

/*
 * Loads the given modulename.
 */
function loadModule( modulename ) {
	var module = loadBuildIn( modulename );
	if( module == undefined ) {
		module = loadComponentModule( modulename );
	}

	return module;
}

module.exports = loadModule;