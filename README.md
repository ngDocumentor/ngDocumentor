# ngDocumentor


A simple site to serve .md files and gets you up and running in 10 minutes. 
Pass brand name, top navigation menus, and sidebar navigation links settings using .json configuration file.

* Works well for any documentation site documented using .md files. Also works with HTML only sites like Github pages where you do not have access to URL Rewrites due to security reasons
* Edit the [ngDocumentor Angular source](https://github.com/ngDocumentor/ngDocumentor), if you need to extend.
* Documentation available in this site.
* This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.x.
* Has Angular Service Workers support capability (basic PWA support). You will have to use the [developement repository](https://github.com/ngDocumentor/ngDocumentor) to achieve that. This feature is disabled by default (service worker config file generation needed).


## Installation and Usage


The repository needs [NodeJS](https://nodejs.org/) and [Angular CLI](https://cli.angular.io/) to be installed. This version was developed using the Angular CLI version 9.0.x.

#### Install Node.js

NodeJS installation steps using binary or source is available in the site [https://nodejs.org/en/download/](https://nodejs.org/en/download/). 

#### Install Angular/CLI

Once NodeJS is installed, Angular CLI can be installed using the command `npm install @angular/cli -g`. Details of steps to install Angular cli can be found in the site - [https://cli.angular.io/](https://cli.angular.io/).

#### Further help - Angular CLI

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

Once NodeJS and Angular CLI are installed, follow the steps below.


## Add your documentation


Just add your .md file documentation/assets in the `src/assets/docs` folder. Now, create your own configurations for [topnav, sidebar, and footer](https://github.com/ganeshkbhat/ngDocumentor/blob/master/src/assets/docs/config.md). Finally, run the server using the steps below to view your site / create your own build.


## Running Development server


Run the command `ng serve --open` in the root of the project folder to run your dev server. Navigate to `http://localhost:4200/` in the browser. 

Note: The app will automatically reload if you change any of the source files, when the development server is running.


## Enabling Service Worker (Support for offline viewing of website)


Offline viewing requires keeping track of our assets in the service worker configuration file. This is done by associating file hashes in a service worker configuration file. To do this, we have to enable service workers and then creating a custom build for your distribution. 

#### Enable Service Worker Support / PWA application configuration

Enabing service workers/pwa support can be done in the `.angular.json` file (within the root folder of the git repositiory). Edit the `.angular.json` section `"serviceWorker": false,` to `"serviceWorker": true,`. If this section is not there then add the key `"serviceWorker": true,` like below:


```json

      "tsconfig": "tsconfig.app.json",
      "testTsconfig": "tsconfig.spec.json",
      "serviceWorker": true,
      "prefix": "app",

```

This will create a distribution with all your assets supported with offline viewing, when you build the project. In most cases, this setting should be true. The repository keeps this feature enabled or disabled as per need of the current version's build.

#### Create Service Worker Configuration

Now run the build command using the steps in the `Creating a Build` section. 


## Creating a Build


After enabling service worker configuration in `angular.json`, run `ng build --prod` from project's root folder in the command prompt. The built artifacts will be stored in the `dist/` directory. Use can use this build folder (your site build) to push to production.


## TODO / Plans


* ADD Keyword Search Capability for site or .md files without loss in performance P2
* REDUCE code size. P4 (Create beta with Ivy renderer P2, Change ng/cli to latest version P3)
* ~ADD Tests P2~ Consider later
* ~Move to Observable based routing P2~ Moved to Angular hash based routing.
* ~Check possibility of removing `#/` for .md file's internal linking inside ngDocumentor~ Not possible without event based or single component system, which will be complicated.
* Bookmarks functionality - P4
* Add settings support using .yaml, .xml P4
* Add support for .rst and other documentation file types P4


