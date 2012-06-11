var pageDbService = require('../util/pageDbService')

var websocket = function ( socket ) {

	socket.on('savePage', function( page ) {
		console.log('save page: ', page);
		pageDbService.updatePage( page );
	});

	socket.on('getPages', function() {
		pageDbService.getPages({}, function( err, pages ) {
			socket.emit('returnPages', pages);
		});
	});

}


module.exports = websocket;