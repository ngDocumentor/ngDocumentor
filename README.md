# ngDocumentor


A simple site to serve .md files and gets you up and running in 10 minutes. 
Pass brand name, top navigation menus, and sidebar navigation links using .json configuration files.

* Works well for any documentation site documented using .md files. Also works with HTML only sites like Github pages where you do not have access to URL Rewrites due to security reasons
* Edit the [ngDocumentor Angular source](https://github.com/ngDocumentor/ngDocumentor), if you need to extend.
* Documentation available in this site.
* This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.
* Has Angular Service Workers enabled (basic PWA support)


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `ng build --target=production --environment=prod --sourcemaps=false --base-href='/' --vendor-chunk=true --extract-css=true --delete-output-path=true --aot --build-optimizer=true` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## TODO / Plans

* REDUCE code size. P4 (Create beta with Ivy renderer P2, Change ng/cli to latest version P3)
* ADD Search Capability for site or .md files without loss in performance P4
* ADD Tests P4
* Move to Observable based routing P2
* Check possibility of removing `#/` for .md file's internal linking inside ngDocumentor

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
