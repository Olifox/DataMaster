var express = require('express');
var router = express.Router();
var path = __dirname;
var url = 'mongodb://localhost:27017';
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

router.get('/', function (req, res) {
    var fileName = path + req.url + 'index.html';
    res.set('Content-Type', 'text/html');
    sendFile(res, fileName);
});

router.get(/\.css$/, function (req, res) {
    var fileName = path + req.url;
    res.set('Content-Type', 'text/css');
    sendFile(res, fileName);
});

router.get(/\.js$/, function (req, res) {
    var fileName = path + req.url;
    res.set('Content-Type', 'application/javascript');
    sendFile(res, fileName);
});

router.get(/\.woff$/, function (req, res) {
    var fileName = path + req.url;
    fileName = fileName.split('?')[0];
    res.set('Content-Type', 'application/font-woff');
    sendFile(res, fileName);
});

router.get(/\.jpg$/, function (req, res) {
    var fileName = path + req.url;
    res.set('Content-Type', 'image/jpg');
    sendFile(res, fileName);
});

MongoClient.connect(url, (err, database) => {
    if (err) return console.log(err)

    router.get('/data', function (req, res) {
        var db = database.db('datamaster');
        var details = {
            '_id': new ObjectID('5b1d1b63eba3073740e9f072')
        };
        db.collection('data').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });
});

function sendFile(res, fileName) {
    res.sendFile(fileName, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
}
module.exports = router;