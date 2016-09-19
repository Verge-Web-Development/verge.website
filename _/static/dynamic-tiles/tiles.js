var pathname = window.location.pathname;

if ( pathname === '/' || pathname === '/portfolio') {(function(){
	function setDefaults () {
		var tilesGroup = document.querySelector('.tilesGroup');
		var tileWrap = document.querySelectorAll('.tileWrap');
		var tile = document.querySelectorAll('.tile');
		var back = document.querySelectorAll('.back');
		var front = document.querySelectorAll('.front');
		var i = 0;

		//Add click flip listener
		for (i; i < tile.length; i++) {
			tile[i].addEventListener('click', function () {
				resetTileClasses();
				this.className = 'tile activeTile';
			});
			tileWrap[i].addEventListener('mouseover', function () {
				this.children[0].className = 'tile activeTile';
			});
			tileWrap[i].addEventListener('mouseout', function () {
				this.children[0].className = 'tile';
			});
		}

		//Reset if it is not clicked Tile
		document.body.addEventListener('click', function(e) {
			if (e.target.parentElement.parentElement.className != 'tile activeTile') resetTileClasses();
		});

		//Reset tile Class to tile
		function resetTileClasses () {
			var i = 0;

			for (i; i < tile.length; i++) {
				tile[i].className = 'tile';
			}
		}

		//After done loading make it visible
		tilesGroup.style.visibility = 'visible';
	}

	window.addEventListener('DOMContentLoaded', setDefaults);
})();}
