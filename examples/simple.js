var Chain = require('../package/index');

var steps = ['limit', 'skip'];
var defaults = {limit: 10, skip: 0};

var chain = new Chain(steps, defaults);

chain.onExec(function (data) {
    console.log(data);
});

chain
    .limit(20)
    .exec();
