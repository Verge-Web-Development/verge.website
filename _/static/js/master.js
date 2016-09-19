'use strict';

/*
	globals
*/
var pathname = window.location.pathname;
var section = document.querySelectorAll('section');
var wh = window.innerHeight;


/*
	Sets section elements to match window hieght
*/
// for (var i = 0; i < section.length; i++) {
// 	if (section[i].getBoundingClientRect().height < wh) {
// 		section[i].setAttribute('style', 'height:'+ wh +'px');
// 	}
// }

if (pathname === '/' || pathname === '/about' || pathname === '/portfolio') {(function(){ 'use strict';
	function changeBellColor() {
		var bellObject = document.querySelector('.bell-object').contentDocument;
		var dot = bellObject.querySelector('#dot');
		var top = bellObject.querySelector('#top');
		var bottom = bellObject.querySelector('#bottom');

		if (pathname === '/about' ) {
			dot.style.fill = '#43C3B1';
			top.style.stroke = '#43C3B1';
			bottom.style.stroke = '#43C3B1';
		}
		if (pathname === '/portfolio') {
			dot.style.fill = '#2973A8';
			top.style.stroke = '#2973A8';
			bottom.style.stroke = '#2973A8';
		}
	}
	window.addEventListener('load', changeBellColor);
})();}


/*
	scroll control
*/
if (pathname === '/') {

	(function(){'use strict';
		var hintWrap = document.querySelector('#hintWrap');
		var scrollTimeout;

		function scrollControl () {

			if (section.length > 1) {

				if (section[0].getBoundingClientRect().height > wh) {
					hintWrap.style.display = 'none';
				}

				//Return the current section based on the relative top or relative bottom position
				//This function requires option for either the the up arrow or down arrow
				var getCurrentsection = function (option) {
					var windowRelativeTop = window.pageYOffset;
					var windowRelativeBottom = window.pageYOffset+window.innerHeight;
					var sectionTop;
					var sectionBottom;
					var i = 0;

					if (option === 'up') {
						for (i; i < section.length; i++) {
							sectionTop = section[i].offsetTop;
							sectionBottom = section[i].offsetTop + section[i].offsetHeight;

							if ( (windowRelativeBottom <= sectionBottom) && (windowRelativeBottom >= sectionTop) ) {
								return i;
							}
						}
					}

					if (option === 'down') {
						for (i; i < section.length; i++) {
							sectionTop = section[i].offsetTop;
							sectionBottom = section[i].offsetTop + section[i].offsetHeight;

							if ( (windowRelativeTop >= sectionTop) && (windowRelativeTop <= sectionBottom) ) {
								return i;
							}
						}
					}
				};

				var toElement = function (sectionNumber, yValue) {
					var destinationsectionTop = section[sectionNumber].offsetTop;
					var destinationsectionBottom = section[sectionNumber].offsetTop + section[sectionNumber].offsetHeight;

					if ( (window.pageYOffset === destinationsectionTop || window.pageYOffset <= destinationsectionTop) && yValue < 0 ) {
						//Going UP
						clearTimeout(scrollTimeout);
					} else if ( (window.pageYOffset+window.innerHeight === destinationsectionBottom || window.pageYOffset+window.innerHeight >= destinationsectionBottom) && yValue > 0 ) {
						//Going DOWN
						clearTimeout(scrollTimeout);
					} else {
						scrollTimeout = setTimeout(function() { window.scrollBy(0, yValue); toElement(sectionNumber, yValue); }, 1);
					}
				};

				var hideHintMessage = function () {
					if (document.querySelector('#hintWrap') !== null) {
						document.querySelector('#hintWrap').style.display = 'none';
					}
				};

				window.addEventListener('keydown', function(e)
				{
					if (window.pageYOffset != window.document.body.offsetTop) {
						var currentsection = getCurrentsection('up');
						var previoussection = currentsection - 1;

						if (e.keyCode === 38) {
							toElement(previoussection, -6);
						} else if (e.type === "click") {
							toElement(previoussection, -6);
						}
					}
				});

				window.addEventListener('keydown', function(e) {
					hideHintMessage();

					if ( (window.pageYOffset + window.innerHeight) != window.document.body.offsetHeight) {
						var currentsection = getCurrentsection('down');
						var nextsection = currentsection + 1;

						if (e.keyCode === 40) {
							toElement(nextsection, 6);
						} else if(e.type === "click") {
							toElement(nextsection, 6);
						}
					}
				});
			}
		}
		window.addEventListener('load', scrollControl);
	})();
}


/*
	Async forms request
*/
function asyncSubmit (sendButton) {
	var responseText = document.querySelector('.responseText');
	var form = sendButton.parentElement;
	var isFormValid = form.checkValidity();

	const originalSendBackground = sendButton.style.background;
	const originalSendColor = sendButton.style.color;
	console.log(originalSendBackground);

	if (!isFormValid) { sendButton.style.background = '#AB5A55'; sendButton.style.color = '#FFF'; sendButton.value = 'Email Is Required'; return; }

	sendButton.value = 'Sending......';
	sendButton.style.background = '#2973A8';
	sendButton.style.color = '#43C3B1';

	var action = form.getAttribute('data-action');
	var method = form.getAttribute('data-method');
	var xhr = new XMLHttpRequest();
	var children = form.children;
	var l = children.length;
	var i = 1;
	var payload = {};

	for (i; i < l; i++) {
		if (children[i].name) payload[children[i].name] = children[i].value;
	}

	payload = JSON.stringify(payload);

	xhr.open(method, action, true);
	xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			responseText.innerText = xhr.responseText;
			sendButton.value = 'SENT';
		}
	};

	xhr.send(payload);
}
