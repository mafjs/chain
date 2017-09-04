import Chain from 'Chain';

import {assert} from 'chai';

describe('simple steps', function () {

    it('should use function step type', function () {

        var steps = {

            page: function (data, limit, skip) {
                data['limit'] = limit;
                data['skip'] = skip;
            }


        };

        var chain = new Chain(steps);

        let data = chain
            .page(100, 200)
            .exec();

        assert.deepEqual(data, {
            limit: 100,
            skip: 200
        });

    });

    it('should set returned value to data', function () {

        var steps = {

            page: function (data, page) {
                return page;
            }


        };

        var chain = new Chain(steps);

        let data = chain
            .page(10)
            .exec();

        assert.deepEqual(data, {
            page: 10
        });

    });


});
