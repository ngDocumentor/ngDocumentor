
## Installation and Usage


The repository needs [NodeJS](https://nodejs.org/) and [Angular CLI](https://cli.angular.io/) to be installed. This version was developed using the Angular CLI version 7.3.x.

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


Run the command `ng serve` in the root of the project folder to run your dev server. Navigate to `http://localhost:4200/` in the browser. 

Note: The app will automatically reload if you change any of the source files, when the development server is running.


## Enabling Service Worker (Support for offline viewing of website)


Offline viewing requires keeping track of our assets in the service worker configuration file. This is done by associating file hashes in a service worker configuration file. To do this, we have to enable service workers and then creating a custom build for your distribution. 

#### Enable Service Worker Support / PWA application configuration

Enabing service workers/pwa support can be done in the `.angular.json` file (within the root folder of the git repositiory). Edit the `.angular.json` section `"serviceWorker": false,` to `"serviceWorker": true,`. If this section is not there then add the key `"serviceWorker": true,` like below:


```json

      "vendorChunk": false,
      "buildOptimizer": true,
      "serviceWorker": true, // Add key 'serviceWorker' with value 'true' for PWA support
      "ngswConfigPath": "ngsw-config.json",

```

This will create a distribution with all your assets supported with offline viewing, when you build the project. In most cases, this setting should be true. The repository keeps this feature enabled or disabled as per need of the current version's build.

#### Create Service Worker Configuration

Now run the build command using the steps in the `Creating a Build` section. 


## Creating a Build


After enabling service worker configuration in `angular.json`, run `ng build --prod --sourcemaps=false --base-href='/' --vendor-chunk=true --extract-css=true --delete-output-path=true --aot --build-optimizer=true` from project's root folder in the command prompt. 


```sh

ng build --prod --source-map=false --base-href='/' --vendor-chunk=true --extract-css=true --delete-output-path=true --aot --build-optimizer=true

``` 


The built artifacts will be stored in the `dist/` directory. Use can use this build folder (your site build) to push to production.

