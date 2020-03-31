// Main app
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

// app config
mongoose.connect('mongodb://localhost:27017/blog-app', {useNewUrlParser: true, useUnifiedTopology: true});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// mongo config
var blogSchema = new mongoose.Schema({
    title: String,
    blogType: String,
    abstract: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});
var Blog = mongoose.model("Blog", blogSchema);

app.get('/', function (req, res) {
    // console.log(new Date().toLocaleTimeString() + ': A GET request asked for "Index" page');
    res.render('index');
    // res.sendFile('views/pattern.html');
});

app.get('/notes-catalogue', function (req, res) {
    // console.log(new Date().toLocaleTimeString() + ': A GET request asked for "Notes  Catalogue" page');
    Blog.find({}, function (err, blogs) {
        if (err) {
            res.render('error', {
                err: err
            });
        } else {
            res.render('notes-catalogue', {
                blogs: blogs
            });
        }
    });
});

app.get('/new', function (req, res) {
    // console.log(new Date().toLocaleTimeString() + ': A GET request asked for "New" page');
    res.render('new');
});

app.post('/new', function (req, res) {
    Blog.create(req.body.blog, function (err, newBlog) {
        if (err) {
            res.render('new');
        } else {
            if (req.body.blog.blogType == 'note') {
                res.redirect('/notes-catalogue');
            } else {
                res.redirect('/gossip');
            }

        }
    });
});

app.listen(3000, function () {
    console.log('Listening -- Sever has started at http://localhost:3000/');
});
