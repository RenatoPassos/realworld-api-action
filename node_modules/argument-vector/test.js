/* globals describe,it */
'use strict';

var parser = require('./')();
var assert = require('assert');

describe('Parser', function(){
  it('should parse some arguments', function() {
    var argv = parser.parse('curl http://example.com --keepalive-time 5 --cookie msg="String with spaces" -XPOST');

    assert.equal(argv.length, 7);
    assert.equal(argv[5], 'msg="String with spaces"');
  });

  it('should parse quoted strings', function() {
    var argv = parser.parse('echo "String with spaces"');

    assert.equal(argv.length, 2);
    assert.equal(argv[1], '"String with spaces"');
  });

  it('should parse multiple quotes', function() {
    var argv = parser.parse('curl http://example.com --data \'{"url": "http://example.com"}\'');

    assert.equal(argv.length, 4);
    assert.equal(argv[3], '\'{"url": "http://example.com"}\'');
  });

  it('should parse escaped quotes', function() {
    var argv = parser.parse('curl --data "{\\"url\\": \\"http://example.com\\"}"');

    assert.equal(argv.length, 3);
    assert.equal(argv[2], '"{\\"url\\": \\"http://example.com\\"}"');
  });

  it('should parse escaped newlines', function() {
    var argv = parser.parse('date \\\n --r 5');

    assert.equal(argv.length, 3);
  });

});