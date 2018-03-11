# chaingear-form
Chaingear-form is a new web-interface for cyber•Fund ICO radar listing applications. It hides all of the inner proccesses under the clean interface and therefore allows to make data collection process simple and user-friendly both for end-users and administrators

Demo: http://188.166.87.208/#/

## User guide
You can see the whole guide about using chaingear-form [here](https://github.com/cyberFund/chaingear-form/wiki/Add-project-to-ICO-Radar)

## Current fuctionality
* Currently chaingear-form allows to collect data through multi-page form, which can be accessed [here](http://188.166.87.208/#/add_info). After submitting an application, chaingear-form makes an HTTP request to the chaingear-backend which stores an application in MongoDB 

* Also, chaingear-form allows to see all active applications through [this page](http://188.166.87.208/#/applications)

## Development
Chaingear-form is written in Vue.js and Express.js. The first is responsible for UI, the second serves static files, including HTML and js files bundled by Webpack

### Installation
In order to start chaingear-form you will need to follow this steps:

1. Clone this repo
2. Run `yarn install` in project root directory
3. Cd to `views` folder and run `yarn install`
4. In views/src directory open `config.js` file and specify an address which will be used to acess an API

### Run for development
1. In `views` folder run `npm run dev`

### Run for production
1. In `views` folder run `npm run build`
2. Cd to the project root directory and run `pm2 start server.js --name chaingear-form`

