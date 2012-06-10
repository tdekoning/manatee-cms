/*
 * Custom moduleloader that can load npm-defined modules or custom component modules.
 */


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
	return require('../components/' + modulename + '/module.js');
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