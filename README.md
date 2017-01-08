# SEVEN & A HALF game using javascript and nodeJS with require

## Introduction
We are going to implement SEVEN & A HALF. An italian card game (known as Sette e mezzo) commonly played in Spain.
The purpose of the game is to achieve the highest score possible without exceeding 7.5 playing against a dealer.

There are different variants of this game but in this case we are playing with the standar rules:
Cards from ace to 7 are worth as many points as their numeric value, with the ace equaling one point. Face cards are worth half a point.

### Technical notes
We are using nodeJS ecosystem in this project in an unusual way. Mostly focused on client side web development. We use requirejs module very useful in order to architect our project in a more scalable way.

## Run the project
In order to run for first time the project , you should install nodejs and npm in your computer:

1. Run `npm install` in the provided sample code
2. Browserify your code `./node_modules/gulp/bin/gulp.js browserify` this is going to create the only required javascript file on bin/main.js
3. If we are going to change the project regularly it is recommended to launch `./node_modules/gulp/bin/gulp.js watch` .With this task executed on background, every time we do a change on every single script inside javascript folder this will be automatically transpiled to bin/main.js.
4. Launch local server `node backend/index.js` and open [http://localhost:3000]

** Note ** that every time we change any .js and we don't have watch gulp task on execution we should "transpile" manually executing:

`frontend$ ./node_modules/gulp/bin/gulp.js browserify`

Resulting file will be in bin/index.js embedding all project .js

NOTE: Deploy the webapp on a web server. The minimum files required to run the project are:
bin/main.js
images/**
styles/**
index.html

The other files are only required for development purposes