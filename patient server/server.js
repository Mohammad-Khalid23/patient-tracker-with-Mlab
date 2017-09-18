const http = require('http');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
const express = require('express');
var mongo = require('mongodb').MongoClient
var objectId = require('mongodb').ObjectID
var assert = require('assert')

//setup server
const app = express();
var URL = "mongodb://localhost:27017/test";

//server listen on 8000 port
app.listen(8000, function () {
  console.log("running on 8000")
});

//parsing post data
app.use(bodyParser.json(), function (err, req, res, next) {
  if (err) {
    return res.status(500).json({ error: err })
  }
  next();
});
app.use(bodyParser.urlencoded({ extended: true }))


//user schema
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://patient-tracker2:patient123@ds139984.mlab.com:39984/khalid-projects', {
  useMongoClient: true
})

var patientSchema = mongoose.Schema({
  name: { type: String, required: true },
  disease: { type: String, required: true },
  doctorName: { type: String, required: true },
  date: { type: String, required: true }
}, { collection: "patients" })

var model = mongoose.model("patients", patientSchema);

var cors = require('cors')
cors({ credentials: true, origin: true })
app.use(cors())

app.post('/patient', (request, response) => {
  response.header('Access-Control-Allow-Origin', "*");
  response.send("hello baby")
  console.log(request.body, "My Name")
  var patientdata = {
    name: request.body.name,
    disease: request.body.disease,
    doctorName: request.body.doctorName,
    date: request.body.date
  }

  // mongo.connect(URL, function (err, db) {
  //   assert.equal(null, err);
  //   db.collection("patient-data").insertOne(patientdata, function (err, result) {
  //     assert.equal(null, err);
  //     console.log("added successfully")
  //     db.close();
  //   })
  // })
  var saveData = new model(patientdata);
  saveData.save((err, data) => {
    if (err) {
      console.error(err, "error on post")
    } else {
      console.log(data, "data in post")
    }
  })

})

//delete patient
app.post('/deletePatient', (request, response) => {
  response.header('Access-Control-Allow-Origin', "*");
  response.send("deleting")
  console.log(request.body.removePatient, "deleteiiiiiiiiiiiiiiiiiii")

  model.findByIdAndRemove(request.body.removePatient).exec()
    .then(function (err, res) {
      if (err) {
        console.log(err, "error in deleting")
      }else{
        console.log(res,"deleted")
      }

    });
  // mongo.connect(URL, function (err, db) {
  //   assert.equal(null, err);
  //   db.collection("patient-data").deleteOne({ "_id": objectId(request.body.removePatient) }, function (err, result) {
  //     assert.equal(null, err);
  //     console.log("deleted successfully")
  //     db.close();
  //   })
  // })

})
app.get('/patientdata', (request, response) => {
  var newarray = [];
  response.header('Access-Control-Allow-Origin', "*");

  var alldata = model.find().then(function (docs) {
    console.log(docs)
    response.send(docs)
  })
  console.log(alldata, "all data from db")
})



// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ');
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

app.listen(3000, function () {
  console.log("Server run on port 3000")
});
