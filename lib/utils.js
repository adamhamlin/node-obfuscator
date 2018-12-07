
'use strict';

var uglifyjs = require('terser');
var merge = require('util')._extend;

/**
 * Uglify the given `js` with `opts`
 *
 * @api private
 * @param {String} js
 * @param {Object} [opts]
 * @param {Function} cb
 */

exports.uglify = function (js, opts, cb) {

  /**
   * Minify
   *
   * @api private
   * @param {Code} js
   */

  function minify(js) {
    var result = uglifyjs.minify(js);
    if (result.error) return cb(result.error);

    if (opts.strings) {
      // ast = mangleStrings(ast);
      // // disable uglify's string escaping to prevent
      // // double escaping our hex
      // stream.print_string = function (str) {
      //   return this.print('"' + str + '"');
      // };
    }

    // ast.print(stream);
    return cb(null, result.code);
  }

  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }
  minify(js);
};