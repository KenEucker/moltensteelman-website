const PORT=8080; 

var /// *Libraries*
    /// Powers our app 
    express = require('express'),
    /// For collection utilities
    _ = require('lodash'),
    /// To output console messages
    chalk = require('chalk'),
    /// So we can read files from the filesystem
    fs = require('fs'),
    /// To get relative and ultimate paths
    path = require('path'),
    exists = require('fs-exists-sync'),
    /// Enables us to use static folders alongside routed paths
    //redirect = require("express-redirect"),
    
    // *Application Data*
    staticRoutes = require('./static.json'),
    routes = require('./routes.json'),
    routeKeys = _.map(routes, 'route'),

    // *Main application*
    app = express();

/// Serves template files and files from the static routes
function servePageOrFile(req, res) {
    // DEBUG console.log(chalk.yellow('receiving ' + req.url));
    var lastSlashLocation = (req.url.indexOf('?') == -1) ? req.url.length -1 : req.url.indexOf('?') - 1;

    if(req.url[lastSlashLocation] != '/') {
        var redirect = req.url.substring(0, lastSlashLocation + 1) + '/' + req.url.substring(lastSlashLocation + 1);
        console.log(chalk.bgBlack('redirecting to ' + redirect));
        res.redirect(redirect);
    }
    var url = req.path.substring(0, req.path.length - 1);
        routeIndex = routeKeys.indexOf(url);
    
    console.log(chalk.yellow('receiving ' + url));

    if(routeIndex !== -1) {
        servePage(routes[routeIndex], req, res);
    }
    else {
        serveFile(req.path, req, res);
    }
}

function servePage(route, req, res) {
    console.log(chalk.magenta('page ' + req.url + ' requested'));
    console.log(chalk.green('route:', JSON.stringify(route, null, 2)));
    var html = path.join(__dirname, 'templates/', route.template, '/index.html'), 
        content = path.join(__dirname, route.content);
    
    try {
        // Get the html template
        html = fs.readFileSync(html, "utf8");
    } catch(e) {
        console.log(chalk.red('Error reading html template: ' + e));
        res.status(404).send('Not today Sonny boy');
        return;
    }

    try {
        // Get the page data to use in templating
        content = fs.readFileSync(content, "utf8");
    } catch(e) {
        console.log(chalk.red('Error reading content for template: ' + e));
    }
    // Insert our page data
    html = html.replace('<script src="./sample.js"></script>','<script>window.page.content=' + content + ';</script>');

    // Send the html to the browser
    res.write(html);
    res.end();
}

function serveFile(route, req, res) {        
    console.log(chalk.blue("serving static file at " + route + req.url));
    var file = req.url = (req.url.indexOf('?') != -1) ? req.url.substring(0, req.url.indexOf('?')) : req.url;
    res.sendFile(path.join(__dirname, route, req.url));
}

// Turn on pretty formatted errors
app.locals.pretty = true;

// Add the redirect middleware that enables us to use static folders alongside routed paths
//redirect(app);

// Use the first route as the landing for the site
app.get("", function(req, res) {
    res.redirect(routeKeys[0] + '/');
});

_.forEach(routes, function(route) {
    app.get(route.route, servePageOrFile); 
    // Include the template folder
    app.use(route.route, function(req, res) {
        serveFile('templates/' + route.template, req, res);
    }); 
});

_.forEach(staticRoutes, function(route) {
    // Honestly I cannot figure this out
    // Use static middleware without defined route
    app.use(express.static(path.join(__dirname, route)));
    // Define route and use sendFile on the requested path
    app.use(route, function(req, res) {
        serveFile(route, req, res);
    });    
});

// Start the app and give success message
app.listen(PORT, function () {
    console.log(chalk.green("Server listening on: http://localhost:", PORT));
});