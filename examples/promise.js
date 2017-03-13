var Chain = require('../package/index');

var steps = {
    limit: function (data, value) {

        if (value < 0) {
            value = 10;
        }

        return value;

    },
    skip: null
};

var defaults = {
    limit: 10,
    skip: 0
};

var chain = new Chain(steps, defaults);

chain.onExec(function (data) {

    return new Promise(function (resolve) {
        resolve(data);
    });

});

chain
    .limit(-20)
    .skip(1)
    .exec()
    .then((data) => {
        console.log(data);
    });
