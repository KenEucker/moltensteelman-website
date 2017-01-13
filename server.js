'use strict';

const PORT = process.env.PORT ? process.env.PORT : 8080; 

var /* * Libraries * */
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
    message = require('./vendor/message/'),
    /// To send emails using nodemailer
    nodemailer = require('./vendor/nodemailer/'),
    /// For user authentication
    passport = require('passport'),
    /// For authenticating Google account users
    GoogleOauthJWTStrategy = require('passport-google-oauth-jwt').GoogleOauthJWTStrategy,
    /// For using cookies with express
    cookieParser = require('cookie-parser'),
    /// Simple session middleware for express
    session = require('express-session'),
    
    /* * Application Data * */
    config = require("./config"),
    routeKeys = _.map(config.routes, 'route'),

    /* * Main application * */
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
    
    if(routeIndex !== -1) {
        servePage(config.routes[routeIndex], req, res);
    }
    else {
        serveFile(req.path, req, res);
    }
}

function servePage(route, req, res) {
    message.logUpdate('page requested: ' + req.url);
    message.logSuccess('route matched:', route.route);
    var page = route.page != "" ? route.page : "index.html",
        html = path.join(__dirname, 'templates/', route.template, '/', page), 
        contentPath = path.join(__dirname, route.content),
        content;

    /// TODO: add serverside PUREjs templating for the <head> of the document
    /// TODO: Cachebusting - append the version of the app to the resource tags (css,js)

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
        content = fs.readFileSync(contentPath, "utf8");
    } catch(e) {
        message.logError('Error reading content for template at ' + contentPath + ': ' + e);
        content = "''";
    }
    // Insert our page data
    html = html.replace('<script src="./sample.js"></script>','<script>window.page.content=' + content + ';</script>');

    // Send the html to the browser
    res.write(html);
    res.end();
}

function serveFile(route, req, res) {        
    message.logNotice("static file requested: " + route + req.url);
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

// route middleware to make sure a user is authenticated
function ensureAuthenticated(req, res, next) {

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

/********** Set up application and routes **********/

// Turn on pretty formatted errors
app.locals.pretty = true;

// Configure sessions and set authentication keys for each authentication method
_.forEach(config.auth, function(authentication) {
    app.use(session({
        secret: authentication.session,
        resave: false,
        saveUninitialized: false
    }));
    switch(authentication.name) {
        case "google": 
            passport.use(new GoogleOauthJWTStrategy({
                clientId: authentication.clientID,
                clientSecret: authentication.clientSecret
            }, function verify(token, info, refreshToken, done) {
                _.find(config.users, function(user) {
                    if(user.id == info.email) {
                        message.logInfo("User " + info.email + " Authenticted using google");
                        done(null, { email: info.email });
                    }
                });
            }));
            break;
    }
});
app.use(bodyparser.json());
app.use(passport.initialize());
app.use(passport.session());

/// TODO: put route in configuration
app.post('/admin/save', ensureAuthenticated, function(req, res){
    saveFile(JSON.stringify(req.body, null, 2), "content/" + req.query.location);
});

// Use the first route as the landing for the site
app.get("", function(req, res) {
    res.redirect(routeKeys[0] + '/');
});

// Configure routes
_.forEach(config.routes, function(route) {
    var type = "dynamic";

    // If the route is static
    if(route.static === true) {
        /// TODO: should static routes be protectable?
        // Honestly I cannot figure this out
        // Use static middleware without defined route
        app.use(express.static(path.join(__dirname, route.route)));
        // Define route and use sendFile on the requested path
        app.use(route.route, function(req, res) {
            serveFile(route.route, req, res);
        });   
        type = "static";
    }
    // If the user must be authenticated for this route
    else if(route.protected === true) {
        // servePageOrFile at this route with authentication
        app.get(route.route, ensureAuthenticated, servePageOrFile); 
        // Include the template folder
        app.use(route.route, ensureAuthenticated, function(req, res) {
            serveFile('templates/' + route.template, req, res);
        }); 
        type += "-protected";
    }
    else {
        // servePageOrFile at this route
        app.get(route.route, servePageOrFile); 
        // Include the template folder as static route
        app.use(route.route, function(req, res) {
            serveFile('templates/' + route.template, req, res);
        }); 
    }
    message.logInfo("Configured " + type + " route: " + route.route);
});

// Configure authentication routes
_.forEach(config.auth, function(authentication) {
    message.logInfo("Configuring authentication: " + authentication.name);

    // request google login
    app.get( authentication.authRoute, passport.authenticate( authentication.session, 
        { callbackUrl: authentication.callbackURL, scope: authentication.scope }));

    // handle google callback
    app.get( authentication.callbackRoute, 
    passport.authenticate( authentication.session, { callbackUrl: authentication.callbackURL}),
    function(req, res) {
        var redirectTo = req.session.redirectTo;
        delete req.session.redirectTo;
        res.redirect(redirectTo);
    });
});

message.logSuccess("Configuration Successful");
// Start the app and give success message
app.listen(PORT, function () {
    message.logSuccess("App listening on: http://localhost:" + PORT);
});