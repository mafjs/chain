process.env.NODE_PATH = require('path').resolve(__dirname + '/../package');
require('module').Module._initPaths();


process.on('uncaughtException', (error) => {
    var stack = error.stack;

    if (typeof error.getFullStack === 'function') {
        stack = error.getFullStack();
    }

    console.log('!!! uncaughtException !!!');
    console.log(stack);
});

process.on('unhandledRejection', (reason, p) => {
    console.log('!!! unhandledRejection !!!');
    console.log(reason);
    console.log(p);
});
