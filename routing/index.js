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
    var db = database.db('datamaster');

    router.get('/data', function (req, res) {
        db.collection('data').find().toArray(function (err, data) {
            for (var i = 0; i < data.length; i++) {
                data[i].id = data[i]._id;
                delete data[i]._id;
            }

            res.send(data);
        });
    });

    router.post('/data', function (req, res) {
        db.collection('data').insert(req.body, function (err, record) {
            if (err) return res.send({ status: "error" });
            res.send({ newid: req.body._id });
        });
    });

    router.put('/data/:id', function (req, res) {
        var details = { '_id': new ObjectID(req.params.id) };
        db.collection('data').update(details, req.body, function (err, result) {
            if (err) return res.send({ status: "error" });
            res.send({});
        });
    });

    router.delete('/data/:id', function (req, res) {
        var details = { '_id': new ObjectID(req.params.id) };
        db.collection('data').remove(details, function (err) {
            if (err) return res.send({ status: "error" });
            res.send({});
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