# Angular Webpack Starter
## based on the awesome [angular-starter](https://github.com/gdi2290/angular-starter)

> An Angular starter kit featuring [Angular 6](https://angular.io), [Ahead of Time Compile](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html), [Router](https://angular.io/docs/ts/latest/guide/router.html), [Forms](https://angular.io/docs/ts/latest/guide/forms.html),
[Http](https://angular.io/docs/ts/latest/guide/server-communication.html),
[Services](https://gist.github.com/gdi2290/634101fec1671ee12b3e#_follow_@AngularClass_on_twitter),
[Tests](https://angular.io/docs/ts/latest/guide/testing.html), [E2E](https://angular.github.io/protractor/#/faq#what-s-the-difference-between-karma-and-protractor-when-do-i-use-which-)), [Karma](https://karma-runner.github.io/), [Protractor](https://angular.github.io/protractor/), [Jasmine](https://github.com/jasmine/jasmine), [Istanbul](https://github.com/gotwarlost/istanbul), [TypeScript](http://www.typescriptlang.org/), [@types](https://www.npmjs.com/~types), [TsLint](http://palantir.github.io/tslint/), [Codelyzer](https://github.com/mgechev/codelyzer), [Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement-with-webpack.html), and [Webpack](http://webpack.github.io/).

> If you're looking to learn about Webpack and ES6 Build Tools check out [ES6-build-tools](https://github.com/AngularClass/ES6-build-tools)
> If you're looking to learn TypeScript see [TypeStrong/learn-typescript](https://github.com/TypeStrong/learn-typescript)

This seed repo serves as an Angular starter for anyone looking to get up and running with Angular and TypeScript fast. 
> Also it implements the [single-spa](https://single-spa.js.org) logic for an angular application (It has been tested on Angular 6. It should work well on 7 as well).
* [Registered application lifecycle](https://single-spa.js.org/docs/building-applications.html#registered-application-lifecycle)

Using a [Webpack 4](https://webpack.js.org) for building our files and assisting with boilerplate. We're also using Protractor for our end-to-end story and Karma for our unit tests.
* Best practices in file and application organization for Angular.
* Ready to go build system using Webpack for working with TypeScript.
* Angular examples that are ready to go when experimenting with Angular.
* A great Angular seed repo for anyone who wants to start their project.
* Ahead of Time (AoT) compile for rapid page loads of your production builds.
* Tree shaking to automatically remove unused code from your production bundle.
* Testing Angular code with Jasmine and Karma.
* Coverage with Istanbul and Karma
* End-to-end Angular app testing using Protractor.
* Type manager with @types
* Hot Module Replacement with Webpack and [@gdi2290/hmr](https://github.com/gdi2290/angular-hmr) and [@gdi2290/hmr-loader](https://github.com/gdi2290/angular-hmr-loader)

### Quick start
**Make sure you have Node version >= 8.0 and (NPM >= 5 or [Yarn](https://yarnpkg.com) )**
> Clone/Download the repo then edit `app.component.ts` inside [`/src/app/app.component.ts`](/src/app/app.component.ts)

```bash
# clone our repo
# --depth 1 removes all but one .git commit history
git clone --depth 1 https://github.com/valeriopisapia/angular6-boilerplate.git

# change directory to our repo
cd angular6-boilerplate

# install the repo with npm
npm install

# start the server
npm start

# use Hot Module Replacement
npm run server:dev:hmr

# if you're in China use cnpm
# https://github.com/cnpm/cnpm
```
go to [http://0.0.0.0:3000](http://0.0.0.0:3000) or [http://localhost:3000](http://localhost:3000) in your browser

# Table of Contents
* [File Structure](#file-structure)
* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Single Spa Configuration](#single-spa-configuration)
    * [Running the app](#running-the-app)
* [Configuration](#configuration)
* [AoT Don'ts](#aot-donts)
* [External Stylesheets](#external-stylesheets)
* [Contributing](#contributing)
* [TypeScript](#typescript)
* [@Types](#types)
* [Frequently asked questions](#frequently-asked-questions)
* [Support, Questions, or Feedback](#support-questions-or-feedback)
* [Deployment](#deployment)
* [License](#license)


## File Structure
We use the component approach in our starter. This is the new standard for developing Angular apps and a great way to ensure maintainable code by encapsulation of our behavior logic. A component is basically a self contained app usually in a single file or a folder with each concern as a file: style, template, specs, e2e, and component class. Here's how it looks:
```
angular-starter/
 ├──config/                        * our configuration
 |   ├──build-utils.js             * common config and shared functions for prod and dev
 |   ├──config.common.json         * config for both environments prod and dev such title and description of index.html
 |   ├──config.dev.json            * config for devevlopment environment
 |   ├──config.prod.json           * config for production environment 
 │   │                              (note: you can load your own config file, just set the evn ANGULAR_CONF_FILE with the path of your own file)
 |   ├──helpers.js                 * helper functions for our configuration files
 |   ├──spec-bundle.js             * ignore this magic that sets up our Angular testing environment
 |   ├──karma.conf.js              * karma config for our unit tests
 |   ├──protractor.conf.js         * protractor config for our end-to-end tests
 │   ├──webpack.common.js          * common tasks for webpack build process shared for dev and prod
 │   ├──webpack.dev.js             * our development webpack config
     ├──webpack.singlespa.dev.js   * our development webpack config for single-spa
 │   ├──webpack.prod.js            * our production webpack config for single-spa
     ├──webpack.singlespa.prod.js  * our production webpack config
 │   └──webpack.test.js            * our testing webpack config
 │
 ├──src/                           * our source files that will be compiled to javascript
 |   ├──main.browser.ts            * our entry file for our browser environment
 │   │
 |   ├──index.html                 * Index.html: where we generate our index page
 │   │
 |   ├──polyfills.ts               * our polyfills file
 │   │
 │   ├──app/                       * WebApp: folder
 │   │   ├──app.component.spec.ts  * a simple test of components in app.component.ts
 │   │   ├──app.e2e.ts             * a simple end-to-end test for /
 │   │   └──app.component.ts       * a simple version of our App component components
 │   │
 │   └──assets/                    * static assets are served here
 │       ├──icon/                  * our list of icons from www.favicon-generator.org
 │       ├──service-worker.js      * ignore this. Web App service worker that's not complete yet
 │       ├──robots.txt             * for search engines to crawl your website
 │       └──humans.txt             * for humans to know who the developers are
 │
 │
 ├──tslint.json                    * typescript lint config
 ├──typedoc.json                   * typescript documentation generator
 ├──tsconfig.json                  * typescript config used outside webpack
 ├──tsconfig.webpack.json          * config that webpack uses for typescript
 ├──package.json                   * what npm uses to manage its dependencies
 └──webpack.config.js              * webpack main configuration file

```

# Getting Started
## Dependencies
What you need to run this app:
* `node` and `npm` (`brew install node`)
* Ensure you're running the latest versions Node `v8.x.x`+ (or `v9.x.x`) and NPM `5.x.x`+

> If you have `nvm` installed, which is highly recommended (`brew install nvm`) you can do a `nvm install --lts && nvm use` in `$` to run with the latest Node LTS. You can also have this `zsh` done for you [automatically](https://github.com/creationix/nvm#calling-nvm-use-automatically-in-a-directory-with-a-nvmrc-file)

Once you have those, you should install these globals with `npm install --global`:
* `webpack` (`npm install --global webpack`)
* `webpack-dev-server` (`npm install --global webpack-dev-server`)
* `karma` (`npm install --global karma-cli`)
* `protractor` (`npm install --global protractor`)
* `typescript` (`npm install --global typescript`)
* `tslint` (`npm install --global tslint@4.5.1`)

## Installing
* `fork` this repo
* `clone` your fork
* `npm install webpack-dev-server rimraf webpack -g` to install required global dependencies
* `npm install` to install all dependencies or `yarn`
* `npm run server` to start the dev server in another tab

## Single Spa Configuration
TODO
## Running the app
After you have installed all dependencies you can now run the app. Run `npm run server` to start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://0.0.0.0:3000` (or if you prefer IPv6, if you're using `express` server, then it's `http://[::1]:3000/`).

### server
```bash
# development
npm run server
# production
npm run build:prod
npm run server:prod
```

## Single Spa commands
``` bash
# start the server - development
npm run start:single-spa-dev

# build files for development
npm run build:single-spa:dev

# build files for production
npm run build:single-spa:prod

```

## Other commands

### build files
```bash
# development
npm run build:dev
# production (jit)
npm run build:prod
# AoT
npm run build:aot
```

### hot module replacement
```bash
npm run server:dev:hmr
```

### watch and build files
```bash
npm run watch
```

### run unit tests
```bash
npm run test
```

### watch and run our tests
```bash
npm run watch:test
```

### run end-to-end tests
```bash
# update Webdriver (optional, done automatically by postinstall script)
npm run webdriver:update
# this will start a test server and launch Protractor
npm run e2e
```

### continuous integration (run unit tests and e2e tests together)
```bash
# this will test both your JIT and AoT builds
npm run ci
```

### run Protractor's elementExplorer (for end-to-end)
```bash
npm run e2e:live
```

### build Docker
```bash
npm run build:docker
```

# Configuration
Configuration files live in `config/` we are currently using webpack, karma, and protractor for different stages of your application

# AoT Don'ts
The following are some things that will make AoT compile fail.

- Don’t use require statements for your templates or styles, use styleUrls and templateUrls, the angular2-template-loader plugin will change it to require at build time.
- Don’t use default exports.
- Don’t use `form.controls.controlName`, use `form.get(‘controlName’)`
- Don’t use `control.errors?.someError`, use `control.hasError(‘someError’)`
- Don’t use functions in your providers, routes or declarations, export a function and then reference that function name
- @Inputs, @Outputs, View or Content Child(ren), Hostbindings, and any field you use from the template or annotate for Angular should be public

For more detailed guide on AoT's Do's and Don'ts refer to https://github.com/rangle/angular-2-aot-sandbox

# External Stylesheets
Any stylesheets (Sass or CSS) placed in the `src/styles` directory and imported into your project will automatically be compiled into an external `.css` and embedded in your production builds.

For example to use Bootstrap as an external stylesheet:
1) Create a `styles.scss` file (name doesn't matter) in the `src/styles` directory.
2) `npm install` the version of Boostrap you want.
3) In `styles.scss` add `@import '~bootstrap/scss/bootstrap.scss';`
4) In `src/app/app.module.ts` add underneath the other import statements: `import '../styles/styles.scss';`

# Contributing
You can include more examples as components but they must introduce a new concept such as `Home` component (separate folders), and Todo (services). I'll accept pretty much everything so feel free to open a Pull-Request

# TypeScript
> To take full advantage of TypeScript with autocomplete you would have to install it globally and use an editor with the correct TypeScript plugins.

## Use latest TypeScript compiler
TypeScript 2.7.x includes everything you need. Make sure to upgrade, even if you installed TypeScript previously.

```
npm install --global typescript
```

## Use a TypeScript-aware editor
We have good experience using these editors:

* [Visual Studio Code](https://code.visualstudio.com/)
* [Webstorm 2018.1](https://www.jetbrains.com/webstorm/download/)
* [Atom](https://atom.io/) with [TypeScript plugin](https://atom.io/packages/atom-typescript)
* [Sublime Text](http://www.sublimetext.com/3) with [Typescript-Sublime-Plugin](https://github.com/Microsoft/Typescript-Sublime-plugin#installation)

### Visual Studio Code + Debugger for Chrome
> Install [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) and see docs for instructions to launch Chrome

The included `.vscode` automatically connects to the webpack development server on port `3000`.

# Types
> When you include a module that doesn't include Type Definitions inside of the module you can include external Type Definitions with @types

i.e, to have youtube api support, run this command in terminal:
```shell
npm i @types/youtube @types/gapi @types/gapi.youtube
```
In some cases where your code editor doesn't support Typescript 2 yet or these types weren't listed in ```tsconfig.json```, add these to **"src/custom-typings.d.ts"** to make peace with the compile check:
```es6
import '@types/gapi.youtube';
import '@types/gapi';
import '@types/youtube';
```

## Custom Type Definitions
When including 3rd party modules you also need to include the type definition for the module
if they don't provide one within the module. You can try to install it with @types

```
npm install @types/node
npm install @types/lodash
```

If you can't find the type definition in the registry we can make an ambient definition in
this file for now. For example

```typescript
declare module "my-module" {
  export function doesSomething(value: string): string;
}
```


If you're prototyping and you will fix the types later you can also declare it as type any

```typescript
declare var assert: any;
declare var _: any;
declare var $: any;
```

If you're importing a module that uses Node.js modules which are CommonJS you need to import as

```typescript
import * as _ from 'lodash';
```


# Frequently asked questions
* What's the current browser support for Angular?
  * Please view the updated list of [browser support for Angular](https://github.com/gdi2290/awesome-angular#current-browser-support-for-angular)
* Why is my service, aka provider, is not injecting parameter correctly?
  * Please use `@Injectable()` for your service for typescript to correctly attach the metadata (this is a TypeScript problem)
* Where do I write my tests?
  * You can write your tests next to your component files. See [`/src/app/home/home.component.spec.ts`](/src/app/home/home.component.spec.ts)
* How do I start the app when I get `EACCES` and `EADDRINUSE` errors?
  * The `EADDRINUSE` error means the port `3000` is currently being used and `EACCES` is lack of permission for webpack to build files to `./dist/`
* How to use `sass` for css?
 *  * `loaders: ['raw-loader','sass-loader']` and `@Component({ styleUrls: ['./filename.scss'] })` see Wiki page [How to include SCSS in components](https://github.com/gdi2290/angular-starter/wiki/How-to-include-SCSS-in-components), or issue [#136](https://github.com/gdi2290/angular-starter/issues/136) for more information.
* How do I test a Service?  
  * See issue [#130](https://github.com/gdi2290/angular-starter/issues/130#issuecomment-158872648)
* How do I add `vscode-chrome-debug` support?
  * The VS Code chrome debug extension support can be done via `launch.json` see issue [#144](https://github.com/gdi2290/angular-starter/issues/144#issuecomment-164063790)
* How do I make the repo work in a virtual machine?
  * You need to use `0.0.0.0` so revert these changes [#205](https://github.com/gdi2290/angular-starter/pull/205/files)
* What are the naming conventions for Angular?
  * please see issue [#185](https://github.com/gdi2290/angular-starter/issues/185) and PR [196](https://github.com/gdi2290/angular-starter/pull/196)
* How do I include bootstrap or jQuery?
  * please see issue [#215](https://github.com/gdi2290/angular-starter/issues/215) and [#214](https://github.com/gdi2290/angular-starter/issues/214#event-511768416)
* How do I async load a component?
  * see wiki [How-do-I-async-load-a-component-with-AsyncRoute](https://github.com/gdi2290/angular-starter/wiki/How-do-I-async-load-a-component-with-AsyncRoute)
* Error: Cannot find module 'tapable'
  * Remove `node_modules/` and run `npm cache clean` then `npm install`
* How do I turn on Hot Module Replacement
  * Run `npm run server:dev:hmr`
* `RangeError: Maximum call stack size exceeded`
  * This is a problem with minifying Angular and it's recent JIT templates. If you set `mangle` to `false` then you should be good.
* Why is the size of my app larger in development?
  * We are using inline source-maps and hot module replacement which will increase the bundle size.
* If you're in China
  * check out https://github.com/cnpm/cnpm
* node-pre-gyp ERR in npm install (Windows)
  * often happens when you're behind proxy and proxy wasn't configured in the npm as it tries to download binary package from the github and if it fails to do so, it will try to compile node-sass from the source codes
  * install Python x86 version 2.x and on windows see issue [#626](https://github.com/gdi2290/angular-starter/issues/626)
* `Error:Error: Parse tsconfig error [{"messageText":"Unknown compiler option 'lib'.","category":1,"code":5023},{"messageText":"Unknown compiler option 'strictNullChecks'.","category":1,"code":5023},{"messageText":"Unknown compiler option 'baseUrl'.","category":1,"code":5023},{"messageText":"Unknown compiler option 'paths'.","category":1,"code":5023},{"messageText":"Unknown compiler option 'types'.","category":1,"code":5023}]`
  * remove `node_modules/typescript` and run `npm install typescript@beta`. This repo now uses ts 2.0
* "There are multiple modules with names that only differ in casing"
  * change `c:\[path to angular-starter]` to `C:\[path to angular-starter]` see [926#issuecomment-245223547](https://github.com/gdi2290/angular-starter/issues/926#issuecomment-245223547)

# Support, Questions, or Feedback
> Contact us anytime for anything about this repo or Angular

* [Twitter: @Movidastar](https://twitter.com/movidastar)

# Deployment

## Docker

To run project you only need host machine with **operating system** with installed **git** (to clone this repo)
and [docker](https://www.docker.com/) and thats all - any other software is not needed
(other software like node.js etc. will be automatically downloaded and installed inside docker container during build step based on dockerfile).

### Install docker

#### MacOS:

`brew cask install docker`

And run docker by Mac bottom menu> launchpad > docker (on first run docker will ask you about password)

#### Ubuntu:

```
sudo apt-get update
sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
sudo apt-add-repository 'deb https://apt.dockerproject.org/repo ubuntu-xenial main'
sudo apt-get update
apt-cache policy docker-engine
sudo apt-get install -y docker-engine
sudo systemctl status docker  # test: should be ‘active’
```
And add your user to docker group (to avoid `sudo` before using `docker` command in future):
```
sudo usermod -aG docker $(whoami)
```
and logout and login again.

### Build image

Because *node.js* is big memory consumer you need 1-2GB RAM or virtual memory to build docker image
(it was successfully tested on machine with 512MB RAM + 2GB virtual memory - building process take 7min)

Go to main project folder. To build image type:

`docker build -t angular-starter .`

The **angular-starter** name used in above commands is only example image name.
To remove intermediate images created by docker on build process, type:

`docker rmi -f $(docker images -f "dangling=true" -q)`

### Run image

To run created docker image on [localhost:8080](localhost:8080) type (parameter `-p 8080:80` is host:container port mapping)

`docker run --name angular-starter -p 8080:80 angular-starter &`

And that's all, you can open browser and go to [localhost:8080](localhost:8080).

### Build and Run image using docker-compose

To create and run docker image on [localhost:8080](localhost:8080) as part of large project you may use **docker-compose**. Type 

`docker-compose up`

And that's all, you can open browser and go to [localhost:8080](localhost:8080).


### Run image on sub-domain

If you want to run image as virtual-host on sub-domain you must setup [proxy](https://github.com/jwilder/nginx-proxy). You should install proxy and set sub-domain in this way:

 ```
 docker run -d -p 80:80 --name nginx-proxy -v /var/run/docker.sock:/tmp/docker.sock:ro jwilder/nginx-proxy:alpine
 ```

 And in your `/etc/hosts` file (linux) add line: `127.0.0.1 angular-starter.your-domain.com` or in yor hosting add
 folowing DNS record (wildchar `*` is handy because when you add new sub-domain in future, you don't need to touch/add any DNS record)

 ```
 Type: CNAME
 Hostname: *.your-domain.com
 Direct to: your-domain.com
 TTL(sec): 43200
 ```

And now you are ready to run image on subdomain by:

```
docker run -e VIRTUAL_HOST=angular-starter.your-domain.com --name angular-starter angular-starter &
```

### Login into docker container

`docker exec -t -i angular-starter /bin/bash`

## Netlify

You can quickly create a free site to get started using this
starter kit in production on [Netlify](https://www.netlify.com/):

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/AngularClass/angular-starter)

### Optional Integration with SonarQube (for continous code quality)
Assuming you have SonarQube 5.5.6 (LTS) installed
* Setup SonarQube with the [Sonar Typescript plugin](https://github.com/Pablissimo/SonarTsPlugin#installation) and the Generic Test Coverage plugin https://docs.sonarqube.org/display/PLUG/Generic+Test+Coverage
* Install sonar-scanner globally 
```bash
npm install --global sonar-scanner
```
* Install the [Karma plugin for sonarqube](https://www.npmjs.com/package/karma-sonarqube-unit-reporter) as a dev dependency 
```bash
npm install karma-sonarqube-unit-reporter --save-dev
```
* Sonar Host URL configuration:
Update [`sonar-project.properties`](sonar-project.properties) file for the property `sonar.host.url` to point to your SonarQube server. By default this assumes that the SonarQube server is running locally using the default port
```
sonar.host.url=<Sonar Host URL and Port>
```
* Run the unit tests with sonar reporter enabled
```bash
npm run test:sonar
```
* The test results collected in the results folder in the sonar compatible format
* Push results to SonarCube
```bash
sonar-scanner
``` 
* If working with SonarQube 6.x it supports [Generic Test Data](https://docs.sonarqube.org/display/SONAR/Generic+Test+Data)
* Modify the [karma.conf.js](config/karma.config.js) to set the appropriate version of the sonarQube
```es6
sonarQubeUnitReporter: {
  sonarQubeVersion: '6.x',
}
```
___

enjoy :D

___

# License
 [MIT](/LICENSE)
