# maf-chain

chain object

# install

```
npm install --save maf-chain
```

# usage

```js
var Chain = require('maf-chain');

var chain = new Chain(['limit', 'skip'], {limit: 10, skip: 0});

chain.onExec(function (data) {

    // data =
    {
        limit: 20,
        skip: 0
    }

    return new Promise((resolve, reject) => {
        // ...
    });

});

chain
    .limit(20)
    .exec()
    .then(() => {

    })
```

# API

see [docs/api.md](docs/api.md)

# LICENSE

MIT
