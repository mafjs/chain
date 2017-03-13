# maf-chain

data chain object for node.js and browser

[![bitHound Overall Score](https://www.bithound.io/github/mafjs/chain/badges/score.svg)](https://www.bithound.io/github/mafjs/chain)
[![bitHound Dependencies](https://www.bithound.io/github/mafjs/chain/badges/dependencies.svg)](https://www.bithound.io/github/mafjs/chain/master/dependencies/npm)
[![Build Status](https://travis-ci.org/mafjs/chain.svg?branch=master)](https://travis-ci.org/mafjs/chain)
[![Coverage Status](https://coveralls.io/repos/github/mafjs/chain/badge.svg?branch=master)](https://coveralls.io/github/mafjs/chain?branch=master)

[![NPM](https://nodei.co/npm/maf-chain.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/maf-chain/)

# install

```
npm install --save maf-chain
```

# usage

```js
var Chain = require('maf-chain');

var steps = {
    limit: null,
    skip: null,
    sort: function (data, field, direction) {
        data['sort'] = {
            field: 'direction'
        }
    }
};

var defaults = {
    limit: 10,
    skip: 0
}

var chain = new Chain(steps, defaults);

chain.onExec(function (data) {

    // data =
    {
        limit: 20,
        skip: 0,
        sort: {
            name: 'desc'
        }
    }

    return new Promise((resolve, reject) => {
        // ...
    });

});

chain
    .limit(20)
    .sort('name', 'desc')
    .exec()
    // here return Promise from onExec callback
    .then(() => {

    })
```

# API

see [docs/api.md](docs/api.md)

# LICENSE

MIT
