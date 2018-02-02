# closest-azure

![npm badge](https://img.shields.io/npm/dw/closest-azure.svg)

Finds the closest azure region :cloud: :earth_americas:

![readme logo](./readme_logo.gif)

> This module relies on [CNAME](https://en.wikipedia.org/wiki/CNAME_record) conventions :sparkles:

Determine the closest [Azure](https://azure.com) region, by issuing dns queries. Install with `npm install closest-azure`.

```
const closestAzure = require('closest-azure')

closestAzure().then((regionNameStr) => {
    console.log(`you are closest to ${regionNameStr}`)
})
```

As you can see, `closest-azure` is a function, that returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). That promise resolves to a `string` - the name of an azure region.

## License

MIT