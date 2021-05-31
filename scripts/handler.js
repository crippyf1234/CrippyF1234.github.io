var CONTACT_ADDRESS = 'me@company.com';
var querystring = require('querystring');

var mailer = require('nodemailer').createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  }
});

module.exports.contact = (event, context, callback) => {
  var body = querystring.parse(event.body);
  mailer.sendMail({
    from: body.from,
    to: [CONTACT_ADDRESS],
    subject: body.subject || '[No subject]',
    html: body.message || '[No message]',
  }, function(err, info) {
    if (err) return callback(err);
    callback(null, {statusCode: 200, body: "Success!"});
  });
};