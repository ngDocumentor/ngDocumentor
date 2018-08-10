
## Installation and Usage


The repository needs [NodeJS](https://nodejs.org/) and [Angular CLI](https://cli.angular.io/) to be installed. NodeJS installation steps using binary or source is available [here](https://nodejs.org/en/download/). Angular CLI can be installed using the command `npm install @angular/cli -g`. Please note Angular CLI is a NodeJS package and needs NodeJS to be installed in your system. This version was developed using the Angular CLI version 6.0.0. Once NodeJS and Angular CLI are installed, choose one of the following steps for your respective activity.


## Add your documentation


Just add your .md assets in the `src/assets/docs` folder. Now create your own cofigurations for topnav, sidebar, and footer. Finally, run the server to view your site / create your own build.


## Running Development server


After `Add your documentation` section steps, run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Enabling Service Worker (Support for offline viewing of website)


Offline viewing requires hashing for each of our assets to be kept track of. This can be achieved easily using a configuration definition change in the `.angular.json` file within the root folder of the repositiory. This will create a distribution with all your assets supported with offline viewing. To achieve this - edit the .angular.json to change the section `"serviceWorker": false,` as `"serviceWorker": true,`. In most cases, you wont need to do this since the development repository has been kept with service worker enabled. If this section is not there, then add the key `"serviceWorker": true,` like below:


```json

      "vendorChunk": false,
      "buildOptimizer": true,
      "serviceWorker": true, // Add key 'serviceWorker' with value 'true' for PWA support
      "ngswConfigPath": "ngsw-config.json",

```


Now run the build command using the steps in the `Creating a Build` section below to create a production build. In most cases this should be true. The repo keeps this feature enabled or disabled as per need of the current version's build.


## Creating a Build


After `Add your documentation` section steps and `Enabling Service Worker (Support for offline viewing of website)` (if you want offline viewing support / service workers enabled), in the command prompt / CLI, run the command below in the project's folder to build the project.


```sh

ng build --prod --source-map=false --base-href='/' --vendor-chunk=true --extract-css=true --delete-output-path=true --aot --build-optimizer=true

``` 


The built artifacts will be stored in the `dist/` directory. Use the `dist/` directory as your documentation site. You can use this build directly and push to production.


## Further help - Angular CLI


To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
