var   moduleloader = require('../util/moduleloader')
	, should = require('should')
	, exceptions = require('../util/exceptions')

/*
 * Testlogic for the moduleloader.
 */
describe('Moduleloader', function() {

	describe('load internal module', function() {

		// Load an undefined module.
		it('should not be present', function() {
			try {
				moduleloader('nonexistingmodule').should.equal( undefined );
			} catch( exception ) {
				exception.modulename.should.equal('nonexistingmodule');
			}
		});

		// Load a defined internal module.
		it('should be present', function() {
			moduleloader('menu').should.be.a('function');
		});
	});

	describe('load npm module', function() {
		// Load a defined npm-module.
		it('should be present', function() {
			moduleloader('should').should.be.a('function');
		});
	});
});