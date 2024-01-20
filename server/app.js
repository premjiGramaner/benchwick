const express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    path = require('path'),
    dotenv = require('dotenv').config(),
    indexRouter = require('./routes/index'),
    app = express(),
    cors = require('cors'),
    fileUpload = require('express-fileupload');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());

app.use('/api', indexRouter);

app.use(express.static(path.join(__dirname, '../build')));
// app.use(express.static(path.join(__dirname, '../src')));


app.use('/varients-images', express.static(__dirname + '/varients-images')); // giving public access
app.use('/varients-generated', express.static(__dirname + '/varients-generated')); // giving public access

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
});

app.get('*', function (request, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
});

module.exports = app;