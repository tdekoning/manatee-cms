(function($) {

	var pages = [];

	function WebSocket() {
		var socket = io.connect( window.location.origin );

		this.getPages = function() {
			socket.emit('getPages');
		}
		this.savePage = function( page ) {
			getPageById(  )
			socket.emit('savePage', page);
		}

		/*
		 * Response of getPages.
		 */
		socket.on('returnPages', function( tmpPages ) {
			pages = tmpPages;
		});

		this.getPages();
	}

	var websocket = new WebSocket();


	/*
	 * This function returns the proper page that matches the given pid.
	 */
	function getPageById( pid ) {
		for( var i in pages ) {
			if( pages[i].pid == pid ) {
				return pages[i];
			}
		}
		return undefined;
	}

	/*
	 * Savebutton listener.
	 */
	$('.savepage').click(function() {
		var page = getPageById( $('.currentpage').data('pid') );
		page.title = $('.pagecontent').val();
		websocket.savePage( page );
	});

	/*
	 * Page clicklistener, activates the clicked page so it can be edited.
	 */
	$('.pages li').click(function() {
		var page = getPageById( $(this).data('pid') );
		$('.currentpage').data('pid', page.pid);
		$('.currentpage .title').text(page.title);
		$('.currentpage .pagecontent').val( page.title );
	});

})( jQuery )

