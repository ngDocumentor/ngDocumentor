# ngDocumentor


A simple site to serve .md files and gets you up and running in 10 minutes. 
Pass brand name, top navigation menus, and sidebar navigation links single using .json configuration file.

* Works well for any documentation site documented using .md files. Also works with HTML only sites like Github pages where you do not have access to URL Rewrites due to security reasons
* Edit the [ngDocumentor Angular source](https://github.com/ngDocumentor/ngDocumentor), if you need to extend.
* Documentation available in this site.
* This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.x.x.
* Has Angular Service Workers enabled (basic PWA support). You will have to use the [developement repository](https://github.com/ngDocumentor/ngDocumentor) to achieve that. Disabled by default (service worker config file generation needed).


## Installation and Usage

The repository needs [NodeJS](https://nodejs.org/) and [Angular CLI](https://cli.angular.io/) to be installed. NodeJS installation steps using binary or source is available [here](https://nodejs.org/en/download/). Angular CLI can be installed using the command `npm install @angular/cli -g`. Please note Angular CLI is a NodeJS package and needs NodeJS to be installed in your system. This version was developed using the Angular CLI version 6.x.x. Once NodeJS and Angular CLI are installed, choose one of the following steps for your respective activity.


## Add your documentation

Just add your .md assets in the `src/assets/docs` folder. Now create your own cofigurations for topnav, sidebar, and footer. Finally, run the server to view your site / create your own build.


## Running Development server

After `Add your documentation` section steps, run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Enabling Service Worker (Support for offline viewing of website)

Offline viewing requires hashing for each of our assets to be kept track of. This can be achieved easily using a configuration definition change in the `.angular-cli.json` file within the root folder of the repositiory. This will create a distribution with all your assets supported with offline viewing. To achieve this - edit the .angular-cli.json to change the section `"serviceWorker": false,` as `"serviceWorker": true,`. If this section is not there, then add the key `"serviceWorker": true,` like below:


```json

      "tsconfig": "tsconfig.app.json",
      "testTsconfig": "tsconfig.spec.json",
      "serviceWorker": true,
      "prefix": "app",

```


Now run the build command using the steps in the `Creating a Build` section to create a production build. In most cases this should be true. The repo keeps this feature enabled or disabled as per need of the current version's build.


## Creating a Build

After `Add your documentation` section steps and `Enabling Service Worker (Support for offline viewing of website)` (if you want offline viewing support / service workers enabled), in the command prompt / CLI, run `ng build --prod --sourcemaps=false --base-href='/' --vendor-chunk=true --extract-css=true --delete-output-path=true --aot --build-optimizer=true` in the project's folder to build the project. The built artifacts will be stored in the `dist/` directory. Use the `dist/` directory as your documentation site. Use can use this build to push to production.


## TODO / Plans

* REDUCE code size. P4 (Create beta with Ivy renderer P2, Change ng/cli to latest version P3)
* ADD Search Capability for site or .md files without loss in performance P4 (Partially done)
* ADD Tests P2
* Move to Observable based routing P2
* Check possibility of removing `#/` for .md file's internal linking inside ngDocumentor
* Bookmarks functionality (Partially done)
* Add settings support using .yaml, .xml P3

## Further help - Angular CLI

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
