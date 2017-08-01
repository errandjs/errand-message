var kue = require('kue');
var queue = kue.createQueue();
var MongoClient = require('mongodb').MongoClient;
var _ = require('underscore');
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
var handlebars = require('express-handlebars');

var MONGODB_URL = process.env['ERRAND_MONGODB_URL'] ? process.env['ERRAND_MONGODB_URL'] : "mongodb://localhost:27017";

var transporter = nodemailer.createTransport({
  service: ERRAND_NODEMAILER_SERVICE = process.env['ERRAND_NODEMAILER_SERVICE'] ? process.env['ERRAND_NODEMAILER_SERVICE'] : "",
  auth: {
    user: ERRAND_NODEMAILER_SERVICE_USER = process.env['ERRAND_NODEMAILER_SERVICE_USER'] ? process.env['ERRAND_NODEMAILER_SERVICE_USER'] : "",
    pass: ERRAND_NODEMAILER_SERVICE_PASS = process.env['ERRAND_NODEMAILER_SERVICE_PASS'] ? process.env['ERRAND_NODEMAILER_SERVICE_PASS'] : ""
  }
});

function graceful() {
  process.exit(0);
}

process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);

queue.process('errand-message', function(job, done){

  MongoClient.connect( MONGODB_URL + "/" + job.data.request.database, function(err, db) {  	

    var collection = db.collection( job.data.request.collection );

    collection.find({}).toArray( function(err, docs) {

      job.data.request.parameters.context.docs = docs;

      transporter.use('compile', hbs({
        viewEngine: handlebars.create({}),
        viewPath: job.data.context.dirname
      }));
      transporter.sendMail({
        from: job.data.request.parameters.from,
        to: job.data.request.parameters.to,
        subject: job.data.request.parameters.subject,
        template: job.data.request.parameters.template,
        context: job.data.request.parameters.context,
      }, function(error, info){
        if (error) {
          console.log(error);
        } 
        console.log('Email sent: ' + info.response);
        db.close();
        done();

      });

    }) 

  });

});
