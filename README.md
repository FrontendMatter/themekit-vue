# themekit-vue

Vue.js components for rapid development.

### Pre-release notes

> **Work in progress!** For the moment, themekit-vue is to be considered in heavy development towards an inital release. After the initial release (which is TBA), we'll be in Beta for the foreseeable future, which means the API might change without notice. If you'd like to use themekit-vue in production, keep that in mind.

## Build

> Until the initial release is ready, you can build themekit-vue yourself:

### Prerequisites

> Our build tool of choice is Webpack. You should have webpack installed globally:

	npm install -g webpack

> And the build dependencies:

	npm install && bower install
	
### Build

> Any of the following will create the files dist/themekit.js and dist/themekit.css

#### Production build

> Includes minification and several optimizations:

	npm run build

#### Development build

> A faster build suited for development, with no optimizations and without minification:

	npm run build-dev
	
### Watch

> Will start an initial development build and then FAST continuous incremental builds:

	npm run dev
	
## Demos

> **Work in progress!** More demos will be available as soon as possible.

### Prerequisites

> The demos are using dist/themekit.css and dist/themekit.js so a static build (dev or production) is required first. Se above.

### Build

#### Production build

> Includes minification and several optimizations:

	npm run demos-build

#### Development build

> A faster build suited for development, with no optimizations and without minification:

	npm run demos-build-dev
	
### Development server

> You can start a development server on http://localhost:8082 with FAST incremental builds and HOT reloading using webpack-dev-server. 

#### Prerequisites

	npm install -g webpack-dev-server
	
#### Start server

	npm run demos-dev
	
### Static server

> You can also start a simple HTTP server on http://localhost:8081. Note this will NOT build anyting! Before starting this server, make sure you make a static build first (dev or production - see above):

	npm run demos-serve
	
## Documentation

> **Work in progress!** A proper documentation will be available as soon as possible.