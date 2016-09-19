var SendGridTransport = require('nodemailer-sendgrid-transport');
var Nodemailer = require('nodemailer');

module.exports = [
	{
		/*
			Serves static directory
		*/
		method: 'GET',
		path: '/static/{path*}',
		handler: { directory:{ path: 'static' } }
	},
	{
		method: 'GET',
		path: '/',
		handler: function(req, res){
			return res.view('template' , {
				tabTitle: 'Verge | Web Development, Design, & SEO Located In Tucson Arizona',
				title: 'Verge',
				subTitle: 'Web Development',
				includeName: '../includes/index.marko'
			});
		}
	},
	{
		method: 'GET',
		path: '/about',
		handler: function(req, res){
			return res.view('template' , {
				tabTitle: 'About | Web Development, Design, & SEO Located In Tucson Arizona',
				title: 'About',
				subTitle: '<span class="blueText">Custom,</span> <span class="greenText">creative,</span> <span class="redText">performance</span><br/>is a necessity.',
				includeName: '../includes/about.marko'
			});
		}
	},
	{
		method: 'GET',
		path: '/portfolio',
		handler: function(req, res){
			return res.view('template' , {
				tabTitle: 'Portfolio | Web Development, Design, & SEO Located In Tucson Arizona',
				title: 'Portfolio',
				subTitle: '<span class="greenText">Previous</span> <span class="redText">Work</span>',
				includeName: '../includes/portfolio.marko'
			});
		}
	},
	{
		method: 'GET',
		path: '/contact',
		handler: function(req, res){
			return res.view('template' , {
				tabTitle: 'Contact | Web Development, Design, & SEO Located In Tucson Arizona',
		            title: 'Contact',
				subTitle: '',
				includeName: '../includes/contact.marko'
			});
		}
	},
	{
		method: 'POST',
		path: '/send',
		handler: function(req, res){
			var payload = req.payload;

			var options = {
				auth: {
					api_key: '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'
				}
			}

			var email = {
				from: 'Verge <contact.form@verge.website>',
				to: 'vergewd@gmail.com',
				subject: 'Verge Inquiry',
				html: 'First Name: '+ payload.firstname+'<br>'+'Last Name: ' + payload.lastname + '<br>' + 'Phone: ' + payload.phone + '<br>' + 'Email: ' + payload.email + '<br>'+'Message: ' + payload.message
			};

			var transport = Nodemailer.createTransport(SendGridTransport(options));

			transport.sendMail(email, function (error, info) {
		            if (error) {
					console.log(error);
					return res(error);
				} else {
					console.log(info);
					return res('Your Inquiry Was Sent');
				}
		      });
		}
	}
];
