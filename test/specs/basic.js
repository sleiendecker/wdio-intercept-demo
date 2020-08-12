const fs = require('fs');
const path = require('path');
const appRoot = path.join(__dirname, '..', '..');
const callsDir = path.join(appRoot, 'calls');

const baseUrl = 'https://reqres.in';
const BROWSER_TIMEOUT_MS = 5000;
const INTERVAL_MS = 250;

describe('wdio intercept service', () => {


  before('open page', () => {
    browser.url(baseUrl);
  });


  it(`tests endpoints`, () => {
    endpoints = $$('.endpoints li');
    let requests, targetReq;
    browser.setupInterceptor();
    endpoints.forEach((endpoint, index) => {
      const endpointLabel = endpoint.getText()
      const formattedFileName = endpointLabel.split(' ').join('_');
      console.log('endpointLabel', endpointLabel);
      endpoint.$('a').click();
      browser.waitUntil(() => {
        const attr = endpoint.getAttribute('class');
        requests = browser.getRequest();
        targetReq = requests[index]
        return attr === 'active' && (requests.length === index + 1);
      }, BROWSER_TIMEOUT_MS,
      `${endpointLabel} timed out after ${BROWSER_TIMEOUT_MS}`,
        INTERVAL_MS
      );
      
      const targetPath = path.join(callsDir, `${formattedFileName}.json`);
      fs.writeFileSync(targetPath, JSON.stringify(targetReq, null, 2));
    });
    
  });
  
});