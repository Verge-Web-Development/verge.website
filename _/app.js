var PreResponse = require('./pre-response').default;
var Registers = require('./registers');
var Routes = require('./routes');
var Marko = require('marko');
var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({ port: process.env.alive_port });
server.register(Registers, function(error){ if(error){ console.log(error); }});

server.views({
	engines: {
		marko: {
			compile: function (src, options) {
				var template = Marko.load(options.filename, src);

				return function (context) {
					return template.renderSync(context);
				};
			}
		}
	},
	path: __dirname + '/templates'
});

server.ext('onPreResponse', PreResponse);
server.route(Routes);

server.start(function () {
	console.log('Running at:', server.info.uri);
});
