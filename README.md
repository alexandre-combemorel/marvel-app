# marvel-app

> A Vue.js project

## Methodologies used
- SCSS is used with BEM on each component
- Airbnb linter is also used for code writting

## Dependencies / Libraries
- Axios => used for API calls
- Lodash => use for filtering and Obj management
- VueX => Store of Vue to share data between component

## Project structure

- `component` folder: contains all the components of the project, the sub folder `widgets` has minor elements which can be reused in different components
- `config` folder: has a config fill with the different API information requiered (url / PUBLIC key) and a CONST files (which could definitely be breakdown). But at least no magical string throught the app
- `css` folder: which contains the reset file and the variables and the genral main css rules of the App
- `router` folder: Contains the files with the different route to navigate through the App
- `services` folder: the apiMapper file return the different Promise needed for the component API calls
- `store` folder: this is where we share the data through different components, also use to store API request and reuse them (Well not really currently, but didn't have enough time :( )

## Improvement

- Review the router structure to load 2 differents components when we want to load single view or a listing
- breakdown the structure of a Tile component to split with characters and comic
- create some animation when the content load to make the navigation smoother
- Create a pagination for the listing
- Make properly work the single view when the store has the data for single view and not trigger an API request
- Make links in the related characters of a comic and vise versa point to a single view. As an other entry point
- Merge the procedure of API call to don’t duplicate code. Now the code look the same again and again, it's not nice at all
- Make error handling better, improve the type of error display
- Create a error page in case the user access to an unexisting page

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).