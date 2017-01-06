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

# Using PUREjs templating with the files in the /templates folder
The idea is that you can develop a theme without any of the server tech running with a text editor and verify your work by opening your html files in the browser. 
\* This assumes that there is no server calls required for your templates.
* There is a vendor folder in the root for sitewide libraries that encourage the use of supported libraries that would be maintained and updated (specifically excluding things like jQuery)
* Other libraries that are more specific to smaller aspects of a template can remain in that template's folder
* Static assets that are only used for a specific template may remain in that template's folder. Templates using static assets only specific to that template are expected to use a relative path specific to that template's folder structure.
* Assets that are specific to site content would go into the /assets folder to be used between different templates. Assets that are used between templates are expected to use a path that goes the required levels out of the /templates folder 

## Testing
We have a test site, using Xervo as a hosting provider, up at http://moltensteelman-94980.app.xervo.io/

## Vendors that make this possible
* purejs
* express
* foundation
* font-awesome

