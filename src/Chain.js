var ChainError = require('./Error');

/**
 * Data chain object
 */
class Chain {

    /**
     * @param {Object|Array} steps
     * @param {?Object} defaults
     */
    constructor (steps, defaults) {

        this.Error = ChainError;

        this._steps = steps;

        this._defaults = defaults;

        this._execCallback = null;

        this._data = {};

        this._init();

    }

    /**
     * return collected data, cloned value
     *
     * @return {Object}
     */
    getData () {
        return this._clone(this._data);
    }

    /**
     * map data to chain
     *
     * @param {Object} data
     * @return {this}
     */
    mapToChain (data) {

        for (var name in data) {
            if (!this[name]) {
                throw ChainError
                        .createError(ChainError.CODES.NO_METHOD)
                        .bind({method: name});
            }

            this[name](data[name]);
        }

        return this;
    }

    /**
     * set exec callback
     *
     * @param {Function} callback
     * @return {this}
     */
    onExec (callback) {
        this._execCallback = callback;
        return this;
    }

    /**
     * exec onExec callback
     *
     * @return {*}
     */
    exec () {
        if (!this._execCallback) {
            return this.getData();
        }

        return this._execCallback(this._data);
    }

    /**
     * alias for exec
     *
     * @return {*}
     */
    done () {
        return this.exec();
    }

    /**
     * init chain by config
     *
     * @private
     */
    _init () {
        var that = this;

        var makeSimpleStep = function (stepName) {
            return function (value) {
                if (value) {
                    this._data[stepName] = value;
                }

                return this;
            };
        };

        var makeFunctionStep = function (stepName, step) {

            return function () {
                var args = [this._data];

                for (var i in arguments) {
                    args.push(arguments[i]);
                }

                var value = step.apply(this, args);

                if (typeof value !== 'undefined') {
                    this._data[stepName] = value;
                }

                return this;
            };

        };

        if (typeof this._defaults === 'object') {
            this._data = JSON.parse(JSON.stringify(this._defaults));
        }

        var name;

        if (Array.isArray(this._steps)) {
            for (var i in this._steps) {
                name = this._steps[i];
                that[name] = makeSimpleStep(name);
            }
        } else {
            for (name in this._steps) {

                var step = this._steps[name];

                if (typeof step === 'function') {
                    that[name] = makeFunctionStep(name, step);
                } else {
                    that[name] = makeSimpleStep(name);
                }

            }
        }


    }


    /**
     * simple object clone
     *
     * @private
     * @param {Object} value
     * @return {Object}
     */
    _clone (value) {
        return JSON.parse(JSON.stringify(value));
    }

}

module.exports = Chain;
