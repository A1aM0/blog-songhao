// Main app
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var mongoose = require('mongoose');
var marked = require('marked');
var multer = require('multer');
var path = require('path');
var fs = require('fs');

// app config
mongoose.connect('mongodb://localhost:27017/blog-app', {useNewUrlParser: true, useUnifiedTopology: true});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
var upload = multer({dest: 'uploads/'});
app.use(upload.any());

// mongo config
var blogSchema = new mongoose.Schema({
    title: String,
    blogType: String,
    abstract: String,
    filePath: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});
var Blog = mongoose.model("Blog", blogSchema);

app.get('/', function (req, res) {
    // console.log(new Date().toLocaleTimeString() + ': A GET request asked for "Index" page');
    // res.render('home');
    Blog.find({}, function (err, blogs) {
        if (err) {
            res.render('error', {
                err: err
            });
        } else {
            res.render('home', {
                blogs: blogs
            });
        }
    });
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

app.get('/gossip', function (req, res) {
    // console.log(new Date().toLocaleTimeString() + ': A GET request asked for "Gossips  Catalogue" page');
    Blog.find({}, function (err, blogs) {
        if (err) {
            res.render('error', {
                err: err
            });
        } else {
            res.render('gossip', {
                blogs: blogs
            });
        }
    });
});

app.get('/notes-catalogue/:id', function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            res.redirect('/notes-catalogue');
        } else {
            res.render('show', {
                blog: foundBlog
            });
        }
    });
});

app.get('/notes-catalogue/:id/edit', function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            res.redirect('/notes-catalogue/' + req.params.id)
        } else {
            res.render('edit', {
                blog: foundBlog
            });
        }
    });
});

app.put('/notes-catalogue/:id', function (req, res) {
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updateBlog) {
        if (err) {
            res.redirect('/notes-catalogue');
        } else {
            res.redirect('/notes-catalogue/' + req.params.id);
        }
   });
});

app.delete('/notes-catalogue/:id', function (req, res) {
    Blog.findByIdAndRemove(req.params.id, function (err, updateBlog) {
        if (err) {
            res.redirect('/notes-catalogue/');
        } else {
            res.redirect('/notes-catalogue/');
        }
    });
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.post('/upload', (req, res, next) => {
    // console.log(req.body, req.files);
    const newName = req.files[0].path.slice(0, 8) + req.files[0].originalname;
    fs.rename(req.files[0].path, newName, (err) => {
        if (err) {
            res.send('upload failed, return and re-upload');
        } else {
            var html = fs.readFileSync(newName);
            html = marked(html.toString());
            var newBlog = new Blog({
                title: req.body.blog.title,
                abstract: req.body.blog.abstract,
                filePath: newName,
                blogType: req.body.blog.blogType,
                body: html
            });
            newBlog.save(function(err,ret){
                if(err){
                    alert('保存失败');
                }
                if (req.body.blog.blogType == 'note') {
                    res.redirect('/notes-catalogue');
                } else {
                    res.redirect('/gossip');
                }
            });
        }
    });
});

app.get('/upload', (req, res) => {
    res.render('upload');
});

app.get('/*', function (req, res) {
    res.send('Page you searched is not existed, please go back!');
});

app.listen(3000, function () {
    console.log('Listening -- Sever has started at http://localhost:3000/');
});
