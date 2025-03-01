Had tried nodemon watch for ts files and then run tsc then node app.js - slow since tsc takes time
Had tried running tsc -w and nodemon as separate scripts good but little hectic to run two scripts
Did not try concurrently yet or nodemon with delay
But tsc-watch works great since it uses tsc -w and gives an event on success
