import {assert} from 'chai';

import Chain from 'Chain';


describe('#add', function () {

    it('should add new steps and defaults after creation', function () {

        var steps = {
            limit: null,
            skip: null
        };

        var defaults = {
            limit: 10,
            skip: 0
        };

        var chain = new Chain(steps, defaults);

        var newSteps = {
            sort: function (data, value) {
                data.sort = value;
            },
            active: null
        };

        var newDefaults = {
            sort: null,
            active: true
        };

        chain.add(newSteps, newDefaults);

        var data = chain
            .skip(1)
            .sort('name')
            .exec();


        assert.deepEqual(data, {
            limit: 10,
            skip: 1,
            sort: 'name',
            active: true
        });

    });

});
