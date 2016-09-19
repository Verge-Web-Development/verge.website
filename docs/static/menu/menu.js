window.addEventListener('load', function() {
	var blurWrap = document.querySelector('.blur-wrap');
	var menu = document.querySelector('.menu');

	var iconWrap = document.createElement('div');
	var icon = document.createElement('div');

	iconWrap.setAttribute('class', 'icon-wrap');
	icon.setAttribute('class', 'icon');

	for (var i = 0; i < 3; i++) iconWrap.appendChild(icon.cloneNode(false));

	iconWrap.addEventListener('click', function () {
		var isActive = menu.classList.toggle('active');
		blurWrap.classList.toggle('blur');

		if (isActive) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = 'visible';
	});

	menu.insertBefore(iconWrap, menu.firstElementChild);

});
