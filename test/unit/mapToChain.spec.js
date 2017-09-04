import Chain from 'Chain';

import {assert} from 'chai';

describe('mapToChain', function () {

    it('should map object to chain', function () {

        var steps = {
            limit: function (data, value) {
                if (value < 0) {
                    return Math.abs(value);
                }

                return value;
            },
            skip: null
        };

        var chain = new Chain(steps);

        let data = chain.mapToChain({limit: -10, skip: 20}).exec();

        assert.deepEqual(data, {
            limit: 10,
            skip: 20
        });
    });

    it('should throw error if no chain method', function () {
        var steps = {
            limit: function (data, value) {
                if (value < 0) {
                    return Math.abs(value);
                }

                return value;
            },
            skip: null
        };

        var chain = new Chain(steps);

        try {
            chain.mapToChain({someMethod: -10, skip: 20}).exec();
            throw new Error('should throw error');
        } catch (error) {
            assert.equal(error.code, chain.Error.CODES.NO_METHOD);
        }

    });

});
