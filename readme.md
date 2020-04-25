# E-conomic client

A simple wrapper for E-conomic's REST and SOAP APIs.

### Usage:

Create a client:

```js
import Client from 'visma-client';

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
const products = client.soap();
```

### Options

| key            | required | type     | default                                                              | description                                       |
| -------------- | -------- | -------- | -------------------------------------------------------------------- | ------------------------------------------------- |
| `soapEndpoint` | no       | string   | `https://api.e-conomic.com/secure/api1/EconomicWebService.asmx?WSDL` |                                                   |
| `restEndpoint` | no       | string   | `https://restapi.e-conomic.com`                                      |                                                   |
| `token`        | yes      | string   | N/A                                                                  | Your visma API token                              |
| `secret`       | yes      | string   | N/A                                                                  | Your visma API secret                             |
| `fetch`        | no       | function | global fetch                                                         | Provide a fetch function eg. `isomorphic unfetch` |

### Methods

#### rest(path, options)

#### soap(func, args)
