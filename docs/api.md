# maf-chain 0.x API



### `constructor (steps, [defaults])`

- `steps` - Object|Array. Steps can be simple or function
- `[defaults]` - Object. Optional. Set default data values

in steps you set chain method names and data names, if steps - Array

```js
var chain = new Chain(['limit', 'skip']);

chain.limit(10).skip(0);

// chain.data =
{
    limit: 10,
    skip: 0
}

```

if steps - Object, you can set function for processing value or values

```js
var chain = new Chain({

    skip: null,

    limit: function (data, value) {
        if (value < 0) {
            value = 10;
        }

        return value;
        // value set to data with name 'limit'
    },

    sort: fucntion (data, field, direction) {
        data['sort'] = {field: direction};

        // if undefined return - you set data manually
    }

});

chain.skip(20).limit(-100).sort('name', 'asc');

//chain.data =
{
    skip: 20,
    limit: 10,
    sort: {
        name: 'asc'
    }
}
```

### `getData ()`

get collected data

return `Object`


### `mapToChain (data)`

map object to chain, exec all steps by names

return `this`

### `onExec (fn)`

- `fn` - Function. callback for exec call

return `this`

### `exec ()`

call exec callback and return result of callback

if no callback setted, data returned

### `done ()`

alias for `exec`


## ChainError

`NO_METHOD` -
