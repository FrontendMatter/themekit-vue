# themekit-vue

Vue.js components for rapid development & prototyping. Easily create layouts, sidebars and much more.

## Demos & Documentation

> **Work in progress!**

## Build

> You can build themekit-vue yourself.

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