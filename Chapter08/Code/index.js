var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    MongoClient = require('mongodb').MongoClient,
    mongoUrl = 'mongodb://sander:sander@ciserver:27017/webshop',
    commandLineArgs = require('command-line-args'),
    app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));
app.use(function(req, res, next) {
    res.locals.authenticated = req.session.authenticated;
    res.locals.username = req.session.username;
    next();
});

app.use('/node_modules/bootstrap/dist/fonts', express.static('node_modules/bootstrap/dist/fonts'));
app.use('/node_modules/bootstrap/dist/css/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.css'));
app.use('/node_modules/bootstrap/dist/css/bootstrap.min.css', express.static('node_modules/bootstrap/dist/css/bootstrap.min.css'));
app.use('/css', express.static('css'));

app.use('/node_modules/angular/angular.js', express.static('node_modules/angular/angular.js'));
app.use('/node_modules/angular/angular.min.js', express.static('node_modules/angular/angular.min.js'));
app.use('/node_modules/jquery/dist/jquery.js', express.static('node_modules/jquery/dist/jquery.js'));
app.use('/node_modules/jquery/dist/jquery.min.js', express.static('node_modules/jquery/dist/jquery.min.js'));
app.use('/node_modules/bootstrap/dist/js/bootstrap.js', express.static('node_modules/bootstrap/dist/js/bootstrap.js'));
app.use('/node_modules/bootstrap/dist/js/bootstrap.min.js', express.static('node_modules/bootstrap/dist/js/bootstrap.min.js'));
app.use('/scripts', express.static('scripts'));
app.use('/scripts/bundles', express.static('scripts/bundles'));

function handleErr (err, res) {
    if (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

app.get(['/', '/index.html'], function (req, res) {
   res.render('index');
});
app.get('/login.html', function (req, res) {
   res.render('login');
});
app.get('/product.html', function (req, res) {
   res.render('product');
});
app.get('/search.html', function (req, res) {
   res.render('search');
});
app.get('/shopping-cart.html', function (req, res) {
   res.render('shopping-cart');
});
app.post('/login', function (req, res) {
	if (req.body.username && req.body.password) {
        MongoClient.connect(mongoUrl, function (err, db) {
            if (err) {
                handleErr(err, res);
            } else {
                db.collection('user').findOne({
                    username: req.body.username,
                    password: req.body.password
                }, function (err, user) {
                    if (err) {
                        handleErr(err, res);
                    }
                    if (user) {
                        req.session.authenticated = true;
                        req.session.username = req.body.username;
                        res.json({success: true});
                    } else {
                        res.json({success: false});
                    }
                });
            }
        });
	} else {
		res.json({success: false});
	}
});
app.get('/logout.html', function (req, res) {
    if (req.session) {
        req.session.destroy();
    }
	res.redirect('/');
});
app.post('/searchProducts', function (req, res) {
    if (req.body.q) {
        MongoClient.connect(mongoUrl, function (err, db) {
            if (err) {
                handleErr(err, res);
            } else {
                db.collection('product').find({
                    name: new RegExp(req.body.q, 'i')
                }).toArray(function (err, products) {
                    if (err) {
                        handleErr(err, res);
                    } else {
                        res.json(products);
                    }
                });
            }
        });
    } else {
        res.json([]);
    }
});
app.post('/getTopProducts', function (req, res) {
    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) {
            handleErr(err, res);
        } else {
            db.collection('product').find().limit(3)
                .toArray(function (err, products) {
                if (err) {
                    handleErr(err, res);
                } else {
                    res.json(products);
                }
            });
        }
    });
});
app.post('/getProduct', function (req, res) {
    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) {
            handleErr(err, res);
        } else {
            db.collection('product').findOne({
                id: req.body.id
            }, function (err, product) {
                if (err) {
                    handleErr(err, res);
                } else {
                    res.json(product);
                }
            });
        }
    });
});
app.post('/getCart', function (req, res) {
    if (req.session && req.session.authenticated) {
        MongoClient.connect(mongoUrl, function (err, db) {
            if (err) {
                handleErr(err, res);
            } else {
                db.collection('user').findOne({
                    username: req.session.username
                }, { shoppingCart: [] }, function (err, user) {
                    if (err) {
                        handleErr(err, res);
                    } else {
                        res.json({
                            authenticated: true,
                            shoppingCart: user.shoppingCart || []
                        });
                    }
                });
            }
        });
    } else {
        res.json({authenticated: false});
    }
});
app.post('/addProductToCart', function (req, res) {
    if (req.session && req.session.authenticated && req.body.product) {
        MongoClient.connect(mongoUrl, function (err, db) {
            if (err) {
                handleErr(err, res);
            } else {
                db.collection('user').findOneAndUpdate({
                    username: req.session.username
                }, {
                    $addToSet: {
                        shoppingCart: {
                            product: req.body.product,
                            number: 1
                        }
                    }
                }, function (err) {
                    if (err) {
                        handleErr(err, res);
                    } else {
                        res.json({authenticated: true});
                    }
                });
            }
        });
    } else {
        res.json({authenticated: false});
    }
});
app.post('/removeProductFromCart', function (req, res) {
    if (req.session && req.session.authenticated && req.body.product) {
        MongoClient.connect(mongoUrl, function (err, db) {
            if (err) {
                handleErr(err, res);
            } else {
                db.collection('user').findOneAndUpdate({
                    username: req.session.username
                }, {
                    $pull: {
                        shoppingCart: {
                            product: req.body.product
                        }
                    }
                }, function (err) {
                    if (err) {
                        handleErr(err, res);
                    } else {
                        res.json({authenticated: true});
                    }
                });
            }
        });
    } else {
        res.json({authenticated: false});
    }
});
app.get('*', function (req, res) {
   res.writeHead(404, {'Content-Type': 'text/html'});
   res.end('<h1>404 - Page not found!</h1><p>What were you even trying to do...?</p>'); 
});

var options = commandLineArgs({ name: 'port', defaultValue: 80 });
var server = app.listen(options.port, '127.0.0.1');
console.log('Server running at http://127.0.0.1:' + options.port);
