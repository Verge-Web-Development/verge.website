
exports.default = function (req, res) {
	if (!req.response.isBoom) return res.continue();

	var data = {
		tabTitle: 'Error',
		title: 'Error',
		subTitle: 'Oops',
		message: (req.response.output.statusCode === 404) ? 'The page you are looking for does not exists' : req.response.message,
		includeName: '../errors/error.marko'
	};

	return res.view('template', data);
};
