# wdio-intercept-demo
This demo uses WebdriverIO to launch [reqres.in](https://reqres.in) and interacts with the page to call the provided APIs. The WDIO Intercept Service is used to capture requests + responses on the page and writes them to JSON files.

## Setup
Fork the repo and install dependencies:
```unix
$ git clone https://github.com/sleiendecker/wdio-intercept-demo.git
$ cd wdio-intercept-demo
$ npm i
```

Follow the [getting started](https://webdriver.io/docs/gettingstarted.html) page if you run into any issues setting up WebdriverIO and/or the wdio CLI.

## Start the testrunner
```unix
$ npx wdio wdio.conf.js
```

JSON files for each call will be stored in the calls directors in the app root.