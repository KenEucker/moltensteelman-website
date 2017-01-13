# moltensteelman-website
A website for moltensteelman.com

# Framework
This site uses the QUASI framework (WIP and originally inspired by the need for this site)

## Start it up
1. install nodejs
2. run `npm install`
3. run `bin/start`

## Development
Themes can be developed statically, as the paths are translated between served and unserved content
The flow for developing a theme is to add a few items, including the templating, to get started.

# QUASI configuration
The QUASI framework uses three configuration files for it's simple setup:
* auth.json - defines the authentication methods to use when configuring 'protected' routes.
~~~~ 
{
    "name": "AUTHENTICATION NAME",
    "clientID": "AUTHENTICATION CLIENT ID",
    "clientSecret": "AUTHENTICATION CLIENT SECRET",
    "authRoute": "THE ROUTE TO USE FOR AUTHENTICATION",
    "callbackRoute": "THE ROUTE TO USE FOR AUTHENTICATION CALLBACK",
    "callbackURL": "THE FULLY QUALIFIED PATH TO BE USED WHEN CONFIGURING AUTHENTICATION",
    "session": "THE NAME TO USE FOR THE AUTHENTICATION SESSION",
    "scope": [] - THE SCOPES TO USE WHEN CONFIGURING AUTHENTICATION
} 
~~~~
* routes.json - defines the routes to use for the application.
~~~~ 
{
    "route": "THE PATH OF THE ROUTE TO RESPOND TO",
    "template": "THE NAME OF THE TEMPLATE WITHIN THE /template/ PATH",
    "page": "RELATIVE PATH TO template TO USE FOR THE PAGE (default: index.html)",
    "content": "PATH TO CONTENT .json OBJECT",
    "protected": bool - whether or not to require authentication for this route
    "static": bool - if it is not a dynamic route, and to simply serve the path as is
}
~~~~ 
* users.json - defines the users of the application that will determine who is allowed to be authenticated.
~~~~ 
{
    "id": "EMAIL ADDRESS OF USER TO AUTHENTICATE",
    "role": "CURRENTLY UNUSED"
}
~~~~ 


# Using PUREjs templating with the files in the /templates folder
The idea is that you can develop a theme without any of the server tech running with a text editor and verify your work by opening your html files in the browser. 
\* This assumes that there is no server calls required for your templates.
* There is a vendor folder in the root for sitewide libraries that encourage the use of supported libraries that would be maintained and updated (specifically excluding things like jQuery)
* Other libraries that are more specific to smaller aspects of a template can remain in that template's folder
* Static assets that are only used for a specific template may remain in that template's folder. Templates using static assets only specific to that template are expected to use a relative path specific to that template's folder structure.
* Assets that are specific to site content would go into the /assets folder to be used between different templates. Assets that are used between templates are expected to use a path that goes the required levels out of the /templates folder 

## Testing
There is a temporary godaddy endpoint here: http://132.148.65.203/

## Vendors that make this possible
* purejs
* express
* passport
* foundation
* font-awesome

