'use strict';

const PORT=8080; 

var /// *Libraries*
    /// Powers our app 
    express = require('express'),
    /// For receiving and processing post data
    bodyparser = require('body-parser'),
    /// For collection utilities
    _ = require('lodash'),
    /// So we can read files from the filesystem
    fs = require('fs'),
    /// To get relative and ultimate paths
    path = require('path'),
    /// To output console messages
    message = require('./message'),
    /// For user authentication
    passport = require('passport'),
    /// For authenticating Google account users
    GoogleOauthJWTStrategy = require('passport-google-oauth-jwt').GoogleOauthJWTStrategy,
    /// For using cookies with express
    cookieParser = require('cookie-parser'),
    /// Simple session middleware for express
    session = require('express-session'),
    
    // *Application Data*
    config = require("./config"),
    routeKeys = _.map(config.routes, 'route'),

    // *Main application*
    app = express();

/// Serves template files and files from the static routes
function servePageOrFile(req, res) {
    // DEBUG console.log(chalk.yellow('receiving ' + req.url));
    var lastSlashLocation = (req.url.indexOf('?') == -1) ? req.url.length -1 : req.url.indexOf('?') - 1;

    if(req.url[lastSlashLocation] != '/') {
        var redirect = req.url.substring(0, lastSlashLocation + 1) + '/' + req.url.substring(lastSlashLocation + 1);
        message.logUpdate('redirecting to ' + redirect);
        return res.redirect(redirect);
    }
    var url = req.path.substring(0, req.path.length - 1),
        routeIndex = routeKeys.indexOf(url);
    
    message.logStatus('receiving ' + url);

    if(routeIndex !== -1) {
        servePage(config.routes[routeIndex], req, res);
    }
    else {
        serveFile(req.path, req, res);
    }
}

function servePage(route, req, res) {
    message.logUpdate('page ' + req.url + ' requested');
    message.logSuccess('route:', JSON.stringify(route, null, 2));
    var html = path.join(__dirname, 'templates/', route.template, '/index.html'), 
        content = path.join(__dirname, route.content);
    
    try {
        // Get the html template
        html = fs.readFileSync(html, "utf8");
    } catch(e) {
        message.logError('Error reading html template: ' + e);
        res.status(404).send('Not today Sonny boy');
        return;
    }

    try {
        // Get the page data to use in templating
        content = fs.readFileSync(content, "utf8");
    } catch(e) {
        message.logError('Error reading content for template: ' + e);
    }
    // Insert our page data
    html = html.replace('<script src="./sample.js"></script>','<script>window.page.content=' + content + ';</script>');

    // Send the html to the browser
    res.write(html);
    res.end();
}

function serveFile(route, req, res) {        
    message.logNotice("serving static file at " + route + req.url);
    var file = req.url = (req.url.indexOf('?') != -1) ? req.url.substring(0, req.url.indexOf('?')) : req.url;
    res.sendFile(path.join(__dirname, route, req.url));
}

function backupFile(target) {
    var backup = target + ".bak";
    
    fs.writeFileSync(backup, fs.readFileSync(target));
}

function saveFile(contents, target) {
    backupFile(target);
    
    fs.writeFile(target, contents, function(err) {
        if(err) {
            message.logError(err);
        }

        message.logSuccess("Successfully saved file to " + target);
    }); 
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the login page
    message.logNotice("saving " + req.url + " to redirect to after authentication");
    req.session.redirectTo = req.url;
    res.redirect('/login');
}

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleOauthJWTStrategy({
	clientId: config.auth.google.clientID,
	clientSecret: config.auth.google.clientSecret
}, function verify(token, info, refreshToken, done) {
	_.find(config.users, function(user) {
           if(user.id == info.email) {
               message.logInfo("User " + info.email + " Authenticted using google");
               done(null, { email: info.email });
           }
       });
}));

/********** Set up application and routes **********/

// Turn on pretty formatted errors
app.locals.pretty = true;

app.use(bodyparser.json());
app.use(session({
	secret: 'google-oauth-jwt',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/admin/save', isLoggedIn, function(req, res){
    saveFile(JSON.stringify(req.body, null, 2), "content/" + req.query.location);
});

// Use the first route as the landing for the site
app.get("", function(req, res) {
    res.redirect(routeKeys[0] + '/');
});

_.forEach(config.routes, function(route) {
    /// If the user must be authenticated
    if(route.permissions == "private") {
        app.get(route.route, isLoggedIn, servePageOrFile); 
        // Include the template folder
        app.use(route.route, isLoggedIn, function(req, res) {
            serveFile('templates/' + route.template, req, res);
        }); 
    }
    else {
        app.get(route.route, servePageOrFile); 
        // Include the template folder
        app.use(route.route, function(req, res) {
            serveFile('templates/' + route.template, req, res);
        }); 
    }
});

_.forEach(config.static, function(route) {
    // Honestly I cannot figure this out
    // Use static middleware without defined route
    app.use(express.static(path.join(__dirname, route)));
    // Define route and use sendFile on the requested path
    app.use(route, function(req, res) {
        serveFile(route, req, res);
    });    
});

// request google login
app.get('/auth/google', passport.authenticate('google-oauth-jwt', {
    callbackUrl: config.auth.google.callbackURL, scope: ['email']}));

// handle google callback
app.get('/auth/google/callback', 
  passport.authenticate('google-oauth-jwt', { callbackUrl: config.auth.google.callbackURL}),
  function(req, res) {
      var redirectTo = req.session.redirectTo;
      delete req.session.redirectTo;
      res.redirect(redirectTo);
  });

// Start the app and give success message
app.listen(PORT, function () {
    message.logSuccess("Server listening on: http://localhost:" + PORT);
});