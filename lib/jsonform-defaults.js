/**
 * @fileoverview The JSON Form "defaults" library exposes a setDefaultValues
 * method that extends the object passed as argument so that it includes
 * values for all required fields of the JSON schema it is to follow that
 * define a default value.
 *
 * The library is called to complete the configuration settings of a template in
 * the Factory and to complete datasource settings.
 *
 * The library is useless if the settings have already been validated against the
 * schema using the JSON schema validator (typically, provided the validator is
 * loaded, submitting the form created from the schema will raise an error when
 * required properties are missing).
 *
 * Note the library does not validate the created object, it merely sets missing
 * values to the default values specified in the schema. All other values may
 * be invalid.
 *
 * IMPORTANT: The code is the same as datajslib!jsonform-default in data-joshfire,
 * except the code is exported in window.JSONForm.setDefaultValues.
 *
 * TODO: import this code in data-joshfire instead of duplicating it.
 */

(function (global) {

  /**
   * Sets default values for the datasource, ensuring that fields defined as
   * "required". If missing, the hierarchy that leads to a required key is
   * automatically created.
   *
   * @function
   * @param {Object} obj The object to complete with default values according
   *  to the schema
   * @param {Object} schema The JSON schema that the object follows
   * @return {Object} The completed object (same instance as obj)
   */
  var setDefaultValues = function (obj, schema) {
    if (!obj || !schema) return obj;

    // Inner function that parses the schema recursively to build a flat
    // list of defaults
    var defaults = {};
    var extractDefaultValues = function (schemaItem, path) {
      var properties = null;
      var child = null;

      if (!schemaItem || (schemaItem !== Object(schemaItem))) return null;

      if (schemaItem.required) {
        // Item is required
        if (schemaItem['default']) {
          // Item defines a default value, let's use it,
          // no need to continue in that case, we have the default value
          // for the whole subtree starting at schemaItem.
          defaults[path] = schemaItem['default'];
          return;
        }
        else if ((schemaItem.type === 'object') || schemaItem.properties) {
          // Item is a required object
          defaults[path] = {};
        }
        else if ((schemaItem.type === 'array') || schemaItem.items) {
          // Item is a required array
          defaults[path] = [];
        }
      }

      // Parse schema item's properties recursively
      properties = schemaItem.properties;
      if (properties) {
        for (var key in properties) {
          if (properties.hasOwnProperty(key)) {
            extractDefaultValues(properties[key], path + '.' + key);
          }
        }
      }

      // Parse schema item's children recursively
      if (schemaItem.items) {
        // Items may be a single item or an array composed of only one item
        child = schemaItem.items;
        if (_isArray(child)) {
          child = child[0];
        }

        extractDefaultValues(child, path + '[]');
      }
    };

    // Build a flat list of default values
    extractDefaultValues(schema, '');

    // Ensure the object's default values are correctly set
    for (var key in defaults) {
      if (defaults.hasOwnProperty(key)) {
        setObjKey(obj, key, defaults[key]);
      }
    }
  };
  

  /**
   * Sets the key identified by a path selector to the given value.
   *
   * Levels in the path are separated by a dot. Array items are marked
   * with []. For instance:
   *  foo.bar[].baz
   *
   * The hierarchy is automatically created if it does not exist yet.
   *
   * Default values are added to all array items. Array items are not
   * automatically created if they do not exist (in particular, the
   * minItems constraint is not enforced)
   *
   * @function
   * @param {Object} obj The object to build
   * @param {String} key The path to the key to set where each level
   *  is separated by a dot, and array items are flagged with [x].
   * @param {Object} value The value to set, may be of any type.
   */
  var setObjKey = function (obj, key, value) {
    var keyparts = key.split('.');

    // Recursive version of setObjKey
    var recSetObjKey = function (obj, keyparts, value) {
      var arrayMatch = null;
      var reArray = /\[([0-9]*)\]$/;
      var subkey = keyparts.shift();
      var idx = 0;

      if (keyparts.length > 0) {
        // Not the end yet, build the hierarchy
        arrayMatch = subkey.match(reArray);
        if (arrayMatch) {
          // Subkey is part of an array, check all existing array items
          // (no array item created if they do not exist)
          subkey = subkey.replace(reArray, '');
          obj = obj[subkey];
          if (!obj || !_isArray(obj)) {
            return;
          }
          for (var k = 0; k < obj.length; k++) {
            recSetObjKey(obj[k], keyparts, value);
          }
          return;
        }
        else {
          // "Normal" subkey
          if (typeof obj[subkey] !== 'object') {
            obj[subkey] = {};
          }
          obj = obj[subkey];
          recSetObjKey(obj, keyparts, value);
        }
      }
      else {
        // Last key, time to set the value, unless already defined
        arrayMatch = subkey.match(reArray);
        if (arrayMatch) {
          subkey = subkey.replace(reArray, '');
          if (!_isArray(obj[subkey])) {
            obj[subkey] = [];
          }
          idx = parseInt(arrayMatch[1], 10);
          if (!obj[subkey][idx]) {
            obj[subkey][idx] = value;
          }
        }
        else if (!obj[subkey]) {
          obj[subkey] = value;
        }
      }
    };

    // Skip first item if empty (key starts with a '.')
    if (!keyparts[0]) {
      keyparts.shift();
    }
    recSetObjKey(obj, keyparts, value);
  };

  // Taken from Underscore.js (not included to save bytes)
  var _isArray = Array.isArray || function (obj) {
    return Object.prototype.toString.call(obj) == '[object Array]';
  };

  // Expose the setDefaultValues to the external world
  global.JSONForm = global.JSONForm || {};
  global.JSONForm.setDefaultValues = setDefaultValues;

})(window);