
# Prismic demo

This demo app is based on [Ueno’s starter-kit](https://github.com/ueno-llc/starter-kit-universally/) for React projects. For more documentation about the general structure, check out that projects readme.

For content, this app connects to a [demo prismic.io setup](https://ueno-starter-kit-universally-test.prismic.io/).

## Setup

1. Setup the latest version of [NodeJS](https://nodejs.org/en/) (8.8 at the time of writing)
2. Setup [git](https://git-scm.com/downloads) to clone this repo, or optionally download the code to your machine and skip the git step

### Clone git repo

After setting up git, open a console (`cmd` on Windows, `terminal` on Mac) and change to a directory that will contain the project:

```bash
> cd /my/project/dir
> git clone https://github.com/ueno-llc/demo-prismic.git
Cloning into 'demo-prismic'..
...
Checking connectivity... done.
> cd demo-prismic
```

You should now have the project on you machine. To start it, do the following while in the `demo-prismic` directory:

```bash
> npm install
...
added 1830 packages in 96.725s
> npm run dev
...
Server listening on http://localhost:3000
```

The console should now be running the development server. To view the project open up http://localhost:3000

## Project structure

All of the UI for the project is inside the `shared/` directory. Both the client and server (since this project uses server-side rendering) share components, routes and stores.

* **Components** are the building blocks that make up each route, by using them we can  encapsulate features and behavior, re-use previously written components and structure things in a nice way. Each component has its own code and styles, e.g. the button component lives inside `shared/components/button` and has `Button.js` and `Button.scss`.
* **Routes** answer to specific URLs and display a page which in turn is made up of many components, e.g. `shared/routes/about/About.js` displays the `/about` page. Defining the relationship between a route and a URL is done in `shared/MainApp.js`
* **Stores** take care of our state, e.g. `shared/store/Prismic.js` for fetching data from prismic (via a proxy, see below) and passing them along to our routes, which then pass the relevant data to each component

The project also has a server API that takes care of connecting to prismic.io, both for the client and server. We use the store when we need to get data and that takes care of sending the request correctly to the API. This API is defined under `server/api`.

## Deployment

To build the project for deployment without all development tools running, open a console and navigate to the project directory:

```bash
> npm run build
...
==> Creating an optimised bundle configuration for the "client"
==> Creating an optimised bundle configuration for the "server"
...
✨  Done in 23.95s.
> npm start
...
Server listening on http://localhost:3000
```
