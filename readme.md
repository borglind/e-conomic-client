# E-conomic client

A simple wrapper for E-conomic's REST and SOAP APIs.

### Usage:

Create a client:

```js
import Client from 'e-conomic-client';

const client = new Client({
  // settings
});
```

Then either use REST:

```js
const fetchProducts = client.rest('/products');
```

or SOAP:

```js
const inventory = await client.soap('Product_GetInventoryLocationStatus', {
  productHandle: {
    Number: 102
  }
});
```

### Options

| name           | required | type     | default                                                              | description                                       |
| -------------- | -------- | -------- | -------------------------------------------------------------------- | ------------------------------------------------- |
| `soapEndpoint` | no       | string   | `https://api.e-conomic.com/secure/api1/EconomicWebService.asmx?WSDL` |                                                   |
| `restEndpoint` | no       | string   | `https://restapi.e-conomic.com`                                      |                                                   |
| `token`        | yes      | string   | N/A                                                                  | Your visma API token                              |
| `secret`       | yes      | string   | N/A                                                                  | Your visma API secret                             |
| `fetch`        | no       | function | global fetch                                                         | Provide a fetch function eg. `isomorphic unfetch` |

### Methods

#### rest(path, options)

Calls the e-conomic REST API ([docs](https://restdocs.e-conomic.com/)).  
Returns a Promise that resolve into a fetch request.

| name      | required | type   | default | description          |
| --------- | -------- | ------ | ------- | -------------------- |
| `path`    | yes      | string | N/A     | path to the resource |
| `options` | no       | object | N/A     | fetch options        |

#### soap(func, args)

Calls the e-conomic SOAP API ([docs](https://api.e-conomic.com/secure/api1/EconomicWebService.asmx)).  
Returns a Promise that resolves into an object.

| name   | required | type   | default | description               |
| ------ | -------- | ------ | ------- | ------------------------- |
| `func` | yes      | string | N/A     | name of the SOAP function |
| `args` | no       | object | N/A     | argument for the request  |

returns an object
