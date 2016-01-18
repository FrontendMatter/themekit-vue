# themekit-vue

Vue.js components for rapid development.

### Pre-release notice

> **Work in progress!** For the moment, themekit-vue is to be considered in heavy development towards an inital release. After the initial release (which is TBA), we'll be in Beta for the foreseeable future, which means the API might change without notice. If you'd like to use themekit-vue in production, keep that in mind.

### Beta release roadmap

- [ ] online documentation
- [ ] online demos
- [ ] unit testing
- [ ] end to end testing
- [ ] setup CI & coverage

## Build

> Until the initial release is ready, you can build themekit-vue yourself.

### Prerequisites

Our build tool of choice is Webpack. You should have webpack installed globally:

	npm install -g webpack

And the build dependencies:

	npm install && bower install
	
### Build

> Any of the following will create the files dist/themekit.js and dist/themekit.css.

#### Production build

Includes minification and several optimizations:

	npm run build

#### Development build

A faster build suited for development, with no optimizations and without minification:

	npm run build-dev
	
### Watch

Start an initial development build and then FAST continuous incremental builds:

	npm run dev
	
## Demos

> **Work in progress!** More demos will be available as soon as possible.

### Prerequisites

> The demos are using dist/themekit.css and dist/themekit.js. Before building the demos, make sure you make a static build first (dev or production - see above) in order to create the required files.

### Build demos

#### Production build demos

Includes minification and several optimizations:

	npm run demos-build

#### Development build demos

A faster build suited for development, with no optimizations and without minification:

	npm run demos-build-dev
	
### Demos development server

> You can start a development server on http://localhost:8082 specifically for the demos, with FAST incremental builds and HOT reloading (using webpack-dev-server). 

#### Prerequisites

	npm install -g webpack-dev-server
	
#### Start server

	npm run demos-dev
	
### Demos static server

> You can also start a simple HTTP server on http://localhost:8081. Note this will NOT build anyting! Before starting this server, make sure you make a static build first (dev or production - see above):

	npm run demos-serve
	
## Documentation

> **Work in progress!** A proper documentation will be available as soon as possible. Meanwhile, run the demos and see [examples](examples/) for basic usage.