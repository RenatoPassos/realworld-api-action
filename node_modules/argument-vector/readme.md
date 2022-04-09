# argument-vector 
[![Build Status](https://travis-ci.org/cmilhench/argument-vector.svg?branch=master)](https://travis-ci.org/cmilhench/argument-vector)

Split a string of command line options into and argv(argument vector) array.

This is perticularly handy for passing arguments to require('child_process').spawn

## Install

```
$ npm install argument-vector --save
```


## Usage

```js
var parser = require('argument-vector')();
var argv = parser.parse('curl http://example.com --keepalive-time 5 --cookie msg="String with spaces" -XPOST');
//=> ['curl', 'http://example.com', '--keepalive-time', '5', '--cookie', 'msg="String with spaces"', '-XPOST']
```

## License

MIT © [Colin Milhench](http://milhen.ch)
