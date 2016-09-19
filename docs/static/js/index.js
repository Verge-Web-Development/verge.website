'use strict';

/*
	Async forms request
*/
function asyncSubmit (sendButton) {
	var responseText = document.querySelector('.responseText');
	var form = sendButton.parentElement;
	var isFormValid = form.checkValidity();

	if (!isFormValid) {
		sendButton.style.background = '#AB5A55';
		sendButton.style.color = '#FFF';
		sendButton.value = 'Email Required';
		return null;
	}

	sendButton.value = 'Sending......';
	sendButton.style.color = '#43C3B1';
	sendButton.style.background = '#2973A8';

	var action = form.getAttribute('data-action');
	var method = form.getAttribute('data-method');
	var xhr = new XMLHttpRequest();
	var children = form.children;
	var payload = {};

	for (var i = 0, l = children.length; i < l; i++) {
		if (children[i].name) payload[children[i].name] = children[i].value;
	}

	payload = JSON.stringify(payload);

	xhr.open(method, action, true);
	xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			var res = null;

			try {
				res = JSON.parse(xhr.responseText);
			} catch (e) {
				throw e;
			}

			if (xhr.status === 200) {
				responseText.innerText = res.success.toUpperCase();
				sendButton.value = 'SENT';
			} else {
				responseText.innerText = res.error.toUpperCase();
				sendButton.value = 'ERROR';
				sendButton.style.color = '#FFF';
				sendButton.style.background = '#AB5A55';
			}
		}
	};

	xhr.send(payload);
}
