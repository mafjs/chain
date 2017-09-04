import Chain from 'Chain';

import {assert} from 'chai';

describe('simple steps', function () {

    it('should empty data if no steps called', function () {

        var steps = {
            limit: null,
            skip: null
        };

        var chain = new Chain(steps);

        let data = chain.exec();

        assert.deepEqual(data, {});
    });

    it('should return data if steps called', function () {

        var steps = {
            limit: null,
            skip: null
        };

        var chain = new Chain(steps);

        let data = chain
            .limit(100)
            .skip(200)
            .exec();

        assert.deepEqual(data, {
            limit: 100,
            skip: 200
        });

    });

    it('should set defaults', function () {
        var steps = {
            limit: null,
            skip: null,
            search: null
        };

        var defaults = {
            limit: 10,
            skip: 0,
            search: 'one'
        };

        var chain = new Chain(steps, defaults);

        let data = chain
            .limit()
            .search('test')
            .done();

        assert.deepEqual(data, {
            search: 'test',
            limit: 10,
            skip: 0
        });

    });

    it('should call exec callback', function () {
        var steps = {
            limit: null,
            skip: null,
            search: null
        };

        var defaults = {
            limit: 10,
            skip: 0,
            search: 'one'
        };

        var chain = new Chain(steps, defaults);

        chain
            .limit()
            .search('test')
            .onExec(function (data) {
                return data;
            });

        let data = chain.exec();

        assert.deepEqual(data, {
            search: 'test',
            limit: 10,
            skip: 0
        });
    });

    it('should transform steps array to object', function () {
        var steps = ['limit', 'skip', 'search'];

        var defaults = {
            limit: 10,
            skip: 0,
            search: 'one'
        };

        var chain = new Chain(steps, defaults);

        chain
            .limit()
            .search('test')
            .onExec(function (data) {
                return data;
            });

        let data = chain.exec();

        assert.deepEqual(data, {
            search: 'test',
            limit: 10,
            skip: 0
        });
    });

});
