var Chain = require('../package/index');

var steps = {
    limit: function (data, value) {

        if (value < 0) {
            value = 10;
        }

        return value;

    },
    skip: null,
    sort: function (data, field, direction) {
        if (!data.sort) {
            data.sort = {};
        }

        data.sort[field] = direction;
    }
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
    .sort('name', 'asc')
    .exec()
    .then(() => {
        console.log(chain.getData());
    });
