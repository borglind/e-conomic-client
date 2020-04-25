const soap = require('soap');
const SoapCookie = require('soap-cookie');

class Client {
  constructor(options) {
    this.soapEndpoint = options.soapEndpoint || 'https://restapi.e-conomic.com';
    this.restEndpoint =
      options.restEndpoint ||
      'https://api.e-conomic.com/secure/api1/EconomicWebService.asmx?WSDL';
    this.token = options.token;
    this.secret = options.secret;
    this.fetch = options.fetch || fetch;
  }

  /**
   * Rest wrapper
   * @param {String} path
   * @param {Object} options fetch options
   * @return {Promise}
   */
  rest(path = '/', options = {}) {
    // strip slash from path
    if (path.charAt(0) === '/') path = path.substr(1);

    let body = options.body;

    options = {
      method: 'get',
      ...options,
      headers: {
        'X-AppSecretToken': this.secret,
        'X-AgreementGrantToken': this.token,
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    if (body) {
      // if body was passed as an object, stringify it
      if (typeof body === 'object') body = JSON.stringify(body);
      options.body = body;
    }

    return this.fetch(`${this.restEndpoint}/${path}`, options);
  }

  /**
   * Wrapper function for SOAP protocol with cookies auth
   * @param  {String} func the name of the soap function
   * @param  {Object} args the arguments for the soap function
   * @return {Promise}
   */
  soap(func, args) {
    const { soapEndpoint, token, secret } = this;

    // create a promise as response
    return new Promise((resolve, reject) => {
      // create the client
      soap.createClient(soapEndpoint, function (err, client) {
        if (err) reject(err);
        // use the token endpoint to authenticate
        client.ConnectWithToken(
          { token: token, appToken: secret },
          (err, result) => {
            if (err) reject(err);
            // the result will be a token that has to be set as a cookie for further requests
            // set the cookie
            client.setSecurity(new SoapCookie(client.lastResponseHeaders));
            // and do the actual request immidatly
            client[func](args, (err, result) => {
              if (err) reject(err);
              // resolve the promise
              resolve(result);
            });
          }
        );
      });
    });
  }
}

module.exports = Client;
