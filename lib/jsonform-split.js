/**
 * @fileoverview The JSON Form "split" library exposes a "split" method
 * that can be used to divide a JSON Form object into two disjoint
 * JSON Form objects:
 * - the first one includes the schema and layout of the form that
 * contains the list of keys given as parameters as well as keys that
 * cannot be separated from them (typically because they belong to the
 * same array in the layout)
 * - the second one includes the schema and layout of a form that does not
 * contain the list of keys given as parameters.
 */

(function (serverside, global, _) {
  if (serverside) {
    _ = require('underscore');
  }

  /**
   * Splits a JSON Form object into two autonomous JSON Form objects,
   * one that includes the provided list of schema keys as well as keys
   * that are tightly coupled to these keys, and the other that does not
   * include these keys.
   *
   * The function operates on the "schema", "form", and "value" properties
   * of the initial JSON Form object. It copies over the other properties
   * to the resulting JSON Form objects.
   *
   * @function
   * @param {Object} jsonform JSON Form object with a "schema" and "form"
   * @param {Array(String)} keys Schema keys used to split the form. Each
   *  key must reference a schema key at the first level in the schema
   *  (in other words, the keys cannot include "." or "[]")
   * @return {Object} An object with an "included" property whose value is
   *  the JSON Form object that includes the keys and an "excluded" property
   *  whose value is the JSON Form object that does not contain any of the
   *  keys. These objects may be empty.
   */
  var split = function (jsonform, keys) {
    if (!jsonform || !keys) return {
      included: {},
      excluded: {}
    };

    if (_.isString(keys)) {
      keys = [keys];
    }

    // TODO: proper deep clone (note there may be event handlers, so
    // JSON.parse(JSON.stringify()) cannot be used here)
    var result = {
      included: _.clone(jsonform),
      excluded: _.clone(jsonform)
    };

    result.included.schema = { properties: {} };
    result.included.form = [];
    result.excluded.schema = { properties: {} };
    result.excluded.form = [];

    if (!jsonform) return result;
    if (!jsonform.form) return result;
    // TODO: support for '*'

    // Helper function that checks the given form field definition
    // and returns true when the definition contains a reference to
    // one of the keys given as parameter.
    var includeFormField = function (formField) {
      var key = null;
      if (_.isString(formField)) {
        // Direct reference to a key in the schema
        return _.include(keys, formField) ||
          !!_.find(keys, function (key) {
            return (formField.indexOf(key + '.') === 0) ||
              (formField.indexOf(key + '[]') === 0);
          });
      }

      if (formField.key) {
        if (_.include(keys, formField.key) ||
          _.find(keys, function (key) {
            return (formField.key.indexOf(key + '.') === 0) ||
              (formField.key.indexOf(key + '[]') === 0);
          })
        ) {
          return true;
        }
      }

      return !!_.some(formField.items, function (item) {
        return includeFormField(item);
      });
    };

    // Helper function that checks the given schema key definition
    // and returns true when the definition is referenced in the
    // given form field definition
    var includeSchemaKey = function (formField, schemaKey) {
      if (!formField) return false;
      if (!schemaKey) return false;

      if (_.isString(formField)) {
        // Direct reference to a key in the schema
        return (formField === schemaKey) ||
          (formField.indexOf(schemaKey + '.') === 0) ||
          (formField.indexOf(schemaKey + '[]') === 0);
      }

      if (formField.key) {
        if ((formField.key === schemaKey) ||
          (formField.key.indexOf(schemaKey + '.') === 0) ||
          (formField.key.indexOf(schemaKey + '[]') === 0)
        ) {
          return true;
        }
      }

      return !!_.some(formField.items, function (item) {
        return includeSchemaKey(item, schemaKey);
      });
    };

    // Split the form into two forms
    _.each(jsonform.form, function (formField) {
      if (includeFormField(formField)) {
        result.included.form.push(formField);
      }
      else {
        result.excluded.form.push(formField);
      }
    });

    // Split the schema into two schemas.
    // (note that the "excluded" JSON Form object may contain keys that
    // are never referenced in the initial JSON Form layout. That's normal)
    var schemaProperties = jsonform.schema;
    if (schemaProperties.properties) {
      schemaProperties = schemaProperties.properties;
    }
    _.each(schemaProperties, function (schemaDefinition, schemaKey) {
      if (_.some(result.included.form, function (formField) {
        return includeSchemaKey(formField, schemaKey);
      })) {
        result.included.schema.properties[schemaKey] = schemaDefinition;
      }
      else {
        result.excluded.schema.properties[schemaKey] = schemaDefinition;
      }
    });

    return result;
  };

  global.JSONForm = global.JSONForm || {};
  global.JSONForm.split = split;

})((typeof exports !== 'undefined'),
  ((typeof exports !== 'undefined') ? exports : window),
  ((typeof _ !== 'undefined') ? _ : null));