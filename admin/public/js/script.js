(function($) {

	var pages = [];

	function Page() {

		return {
			title: ''
			, components: []
			, template: 'index'
			, pid: ''
		}
	}

	function WebSocket() {
		var socket = io.connect( window.location.origin );

		this.getPages = function() {
			socket.emit('getPages');
		}
		this.createPage = function( page ) {
			socket.emit('createPage', page);
		}
		this.savePage = function( page ) {
			socket.emit('savePage', page);
		}
		this.deletePage = function( page ) {
			socket.emit('deletePage', page);
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
		if( page == undefined ) {
			page = new Page();
			page.pid = $('.currentpage .pid').val();
			page.title = $('.title').val();
			page.components = JSON.parse($('.currentpage .components').val());
			websocket.createPage( page );
		} else {
			page.components = JSON.parse($('.currentpage .components').val());
			page.title = $('.title').val();
			websocket.savePage( page );
		}
	});

	$('.deletepage').click(function() {
		var page = getPageById( $('.currentpage').data('pid') );
		websocket.deletePage( page );
	});
	$('.newPage').click(function() {
		// Reset the form.
		$('.currentpage').data('pid', '');
		$('.currentpage input').val('');
	})

	/*
	 * Page clicklistener, activates the clicked page so it can be edited.
	 */
	$('.pages li').click(function() {
		var page = getPageById( $(this).data('pid') );
		$('.currentpage').data('pid', page.pid);
		$('.currentpage .pid').val( page.pid );
		$('.currentpage .components').val( JSON.stringify( page.components ) );
		$('.currentpage .title').text(page.title);
		$('.currentpage .title').val( page.title );
	});

})( jQuery )

