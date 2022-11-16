(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var wtf = require('../src/atropa-wtf.js');

try {
    Object.keys(wtf).forEach(
        function (prop) {
            if(!atropa[prop]) {
                atropa[prop] = wtf[prop];
            }
        }
    );
} catch (ignore) {
    atropa = require('../src/atropa-wtf.js');
}

Object.keys(wtf.data).filter(
    function (prop) {
        return prop !== 'requirements';
    }
).forEach(
    function (prop) {
        atropa.data[prop] = wtf.data[prop];
    }
);

},{"../src/atropa-wtf.js":9}],2:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
atropa.inquire = require('atropa-inquire').inquire;
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header

/**
 * Utilities for handling arrays.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130221
 * @namespace Utilities for handling arrays.
 */
atropa.arrays = {};
/**
 * Compares two arrays based on size, contents, and element order.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Array} array1 One array you want compared to another.
 * @param {Array} array2 The other array.
 * @returns {Boolean} Returns true or false depending on
 *  whether or not the arrays matched in size, composition, and
 *  element order.
 * @example
 * var x = [1,2];
 * var y = [1,1,3];
 * atropa.arrays.match(x,y);
 * // returns false
 * @example
 * var x = [1,2];
 * var y = [1,2];
 * atropa.arrays.match(x,y);
 * // returns true
 * @example
 * var x = [1,2];
 * var y = [2,1];
 * atropa.arrays.match(x,y);
 * // returns false because the elements are not in the same order.
 * @example
 * var x = [1,{'aProp' : 'aValue'}];
 * var y = [1,{'aProp' : 'aValue'}];
 * atropa.arrays.match(x,y);
 * // returns false because even though the object looks the same, the
 * // two objects are in fact distinct objects.
 * @example
 * var obj = {'aProp' : 'aValue'};
 * var x = [1,obj];
 * var y = [1,obj];
 * atropa.arrays.match(x,y);
 * // returns true because the objects referenced in the arrays are
 * // in fact the same object.
 */
atropa.arrays.match = function arraysMatch(array1, array2) {
    "use strict";
    var x,
    l;
    if (array1.length !== array2.length) {
        return false;
    }
    l = array1.length;
    for (x = 0; x < l; x += 1) {
        if (array1[x] !== array2[x]) {
            return false;
        }
    }
    return true;
};
/**
 * Subtracts one array from another array based on the unique values in both
 *  sets.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130112
 * @param {Array} a (subtrahend) The array to subtract.
 * @param {Array} fromB (minuend) The array with elements duplicated in <code>a</code>
 * @returns {Array} Returns a new array containing only the unique
 *  values found in <code>fromB</code> that are not present in <code>a</code>
 * @example
 * var x = [1,2];
 * var y = [1,1,3];
 * atropa.arrays.subtract(x,y);
 * // returns [3]
 * @example
 * var x = [1,3];
 * var y = [3,1];
 * atropa.arrays.subtract(x,y);
 * // returns []
 * @example
 * var x = [1,3];
 * var y = [3,1,1,9];
 * atropa.arrays.subtract(x,y);
 * // returns [9]
 * @example
 * var x = [1,3,{'aProp' : 'aVal'}];
 * var y = [3,1,{'aProp' : 'aVal'}];
 * atropa.arrays.subtract(x,y);
 * // returns [{'aProp' : 'aVal'}] 
 * // because the two objects are not the same object.
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var x = [1,3,obj];
 * var y = [3,1,{'aProp' : 'aVal'}];
 * atropa.arrays.subtract(x,y);
 * // returns [{'aProp' : 'aVal'}] 
 * // because the two objects are not the same object.
 * @example
 * var obj = {'aProp' : 'aVal'}
 * var x = [1,3,obj];
 * var y = [3,1,obj];
 * atropa.arrays.subtract(x,y);
 * // returns [] 
 * // because the objects referenced in the arrays are the same object.
 */
atropa.arrays.subtract = function(a, fromB) {
    "use strict";
    var the = {};
    the.result = [];
    fromB.forEach(function(item){
        the.mark = false;
        a.forEach(function(rm){
            if(item === rm) {
                the.mark = true;
            }
        });
        if(the.mark !== true) {
            the.result.push(item);
        }
    });
    return the.result;
};
/**
 * Returns an array of values found in both of the given arrays.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130112
 * @param {Array} array1 An array.
 * @param {Array} array2 Another array.
 * @returns {Array} Returns an array of values found in both of the given
 *  arrays.
 * @example
 * var x = [1,3,4];
 * var y = [3,1,5];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3]
 * @example
 * var x = [1,1,3,4];
 * var y = [3,1,1,5];
 * atropa.arrays.intersect(x,y);
 * // returns [1,1,3]
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var x = [1,3,obj];
 * var y = [3,1,obj];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3,{'aProp' : 'aVal'}]
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var x = [1,3,{'aProp' : 'aVal'}];
 * var y = [3,1,obj];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3] because the two objects are not the same object.
 * @example
 * var x = [1,3,{'aProp' : 'aVal'}];
 * var y = [3,1,{'aProp' : 'aVal'}];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3] because the two objects are not the same object.
 */
atropa.arrays.intersect = function intersect(array1, array2) {
    "use strict";
    var smallArray, largeArray, intersection = [];
    if(array1.length > array2.length) {
        largeArray = array1.splice(0);
        smallArray = array2.splice(0);
    } else {
        largeArray = array2.splice(0);
        smallArray = array1.splice(0);
    }
    smallArray.forEach(function (item) {
        var idxInLargeArray = largeArray.indexOf(item);
        if (0 <= idxInLargeArray) { // has word
            intersection.push(largeArray.splice(idxInLargeArray, 1)[0]);
        }
    });
    return intersection;
};
/**
 * Calculates the frequency of items occurring in an array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} arr The array to calculate frequencies from.
 * @returns {Object} Returns an object whose keys are each unique
 *  elements from the array and their value is their frequency of
 *  occurrence within the array. Be careful that your array does
 *  not contain values matching object instance property names.
 * @example
 * var x = [1,1,1,1,1,3,3];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 5,
 * //     "3": 2
 * // }
 * @example
 * var x = ["bill", "fred", "fred", "jane"];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "bill": 1,
 * //     "fred": 2,
 * //     "jane": 1
 * // }
 * @example
 * var x = [1,3,{'aProp' : 'aVal'}];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 1,
 * //     "3": 1,
 * //     "[object Object]": 1
 * // }
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var otherObj = {};
 * var x = [1,3,obj,otherObj,{'aDoughnut' : 'sprinkles'}];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 1,
 * //     "3": 1,
 * //     "[object Object]": 3
 * // }
 * @example
 * var x = [1,3,"toString"];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 1,
 * //     "3": 1,
 * //     "toString": "function toString() {\n    [native code]\n}1"
 * // }
 */
atropa.arrays.getFrequency = function (arr) {
    "use strict";
    var out = arr.reduce(function (acc, curr) {
        if (acc[curr] === undefined) {
            acc[curr] = 1;
        } else {
            acc[curr] += 1;
        }
        return acc;
    }, {});
    return out;
};
/**
 * Gets Unique values from an array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} largeArray The array with duplicate values in it.
 * @returns {Array} Returns a new array containing only the unique
 *  values found in the largeArray.
 * @example
 * var x = [1,1,1,4,4,3,6];
 * atropa.arrays.getUnique(x);
 * // returns [ "1", "4", "3", "6" ]
 * @example
 * var x = ["bill", "fred", "jane", "fred"];
 * atropa.arrays.getUnique(x);
 * // returns ["bill", "fred", "jane"]
 * @example
 * var x = [ 
 *     "bill",
 *     {"aProp" : "aValue"},
 *     {"aGuy" : "fred"},
 *     {"aLady" : "jane"}
 * ];
 * atropa.arrays.getUnique(x);
 * // returns [ "bill", "[object Object]" ]
 */
atropa.arrays.getUnique = function (largeArray) {
    "use strict";
    return Object.keys(atropa.arrays.getFrequency(largeArray)).sort();
};
/**
 * Removes empty strings from the given array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} arrayWithEmptyElements The array with empty strings in it.
 * @returns {Array} Returns a new array with empty strings removed.
 * @example
 * var x = [ 10, , 5, "", '', 7 ];
 * console.log('starting length ' + x.length);
 * console.log(x);
 * x = atropa.arrays.removeEmptyElements(x);
 * console.log('ending length ' + x.length);
 * console.log(x);
 * // displays the following
 * // starting length 6
 * // [10, undefined, 5, "", "", 7]
 * // ending length 3
 * // [10, 5, 7]
 */
atropa.arrays.removeEmptyElements = function (arrayWithEmptyElements) {
    "use strict";
    return arrayWithEmptyElements.filter(function (item) {
        return !atropa.inquire.isEmptyString(item);
    });
};
/**
 * Reindexes an array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} arr The array with discontinuous keys.
 * @returns {Array} Returns an array with continuous keys.
 * @example
 * var x = [ "a", "b", "c", undefined ];
 * console.log(x); // [ "a", "b", "c", undefined ]
 * console.log(x.length); // 4
 * 
 * delete x[1]; // deletes the key from the array but
 *              // the array length remains the same
 *              // at this point the arrays keys are 0, 2, and 3
 * console.log(x); // [ "a", undefined, "c", undefined ]
 * console.log(x.length); // 4
 * 
 * x = atropa.arrays.reindex(x);
 * console.log(x); //  [ "a", "c", undefined ]
 *    // note that the last element existed in the array, its value was
 *    // undefined but it did have a key so the element remains in the array.
 *    //
 *    // The deleted element was in fact deleted from the array so there was no
 *    // key x[1] at all, when trying to access this non existing element the
 *    // value of undefined was returned. This behavior is confusing unless you
 *    // think about the arrayas an object whose properties are named by
 *    // numbers. Accessing an undefined property returns undefined regardless
 *    // of whether the property existed in the past or not.
 * console.log(x.length); // 3
 */
atropa.arrays.reindex = function reindex(arr) {
    "use strict";
    var idx, out;
    out = [];
    for(idx in arr) {
        if(arr.hasOwnProperty(idx)) {
            out.push(arr[idx]);
        }
    }
    return out;
};
/**
 * Sorts an array's elements numerically.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130120
 * @param {Array} arr The array to sort. All elements of the array must be
 *  number-ish.
 * @returns {Array} Returns an array whose elements are in numeric order.
 * @example
 * var x = [3, 2, 9, 26, 10, 1, 99, 15];
 * console.log( atropa.arrays.sortNumerically(x) );
 * // logs [1, 2, 3, 9, 10, 15, 26, 99]
 */
atropa.arrays.sortNumerically = function sortNumerically(arr) {
    "use strict";
    return arr.sort(function (a, b) {
        return (a - b);
    });
};
/**
 * Throws an error, <code>String.prototype.localeCompare</code> is not 
 *  standardized.
 * 
 *  Yes, localeCompare is in the standard but, at this time the actual
 *  comparison is implementation dependant. This means that "alphabetical order"
 *  can be different on different platforms. What I found was that in node the
 *  array of <code>['a','Z','A','z']</code> would be sorted to
 *  <code>['A','Z','a','z"]</code>, while on
 *  firefox it would be sorted to <code>['a','A','z','Z']</code>. Who knows if
 *  another implementor would sort it <code>['A','a','Z','z']</code>?
 * 
 * In order to provide a reliable implementation I would have to create my own
 *  implementation of <code>String.prototype.localeCompare</code> and that's
 *  just too much work for me to do alone.
 * @throws {Error} "String.prototype.localeCompare is not standardized"
 */
atropa.arrays.sortAlphabetically = function sortAlphabetically(arr) {
    "use strict";
    throw new Error("String.prototype.localeCompare is not standardized");
};
/**
 * Deletes the given element from the array at the given index. It basically
 *  does what you would expect the delete operator to do, except the delete
 *  operator doesn't do what you would expect.
 * @param {Array} arr The array.
 * @param {Number} index The index of the element to delete.
 * @returns Returns an array with the element removed, contiguous keys, and
 *  whose length is 1 less than the input array.
 */
atropa.arrays.deleteElement = function (arr, index) {
    "use strict";
    delete arr[index];
    return atropa.arrays.reindex(arr);
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":3,"atropa-inquire":4}],3:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global XPathResult */
// end header

/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = {};
/**
 * Checks whether this class has been marked as unsupported and throws an 
 *  error if it has.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130308
 * @param {String} className The name of the class.
 * @param {String} errorMessage Optional. A custom error message. Defaults to
 *  atropa.data[className].error
 */
atropa.supportCheck = function (className, errorMessage) {
    "use strict";
    className = String(className);
    errorMessage = errorMessage || atropa.data[className].error;
    errorMessage = String(errorMessage);
    
    if(atropa.data[className].support === 'unsupported') {
        throw new Error(errorMessage);
    }
};
/**
 * Pushes a requirement check into atropa.data.requirements. The test
 *  tests whether the class is supported in this environment. Sets
 *  atropa.data[className]'s support to unsupported and error to errorMessage
 *  if the requirementFn returns false. The requirement checks will all be run
 *  after the library has loaded.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130308
 * @param {String} className The name of the class.
 * @param {Function} requirementFn A function to test whether or not the class
 *  is supported in this environment. If supported, returns true otherwise
 *  return false.
 * @param {String} errorMessage The error message to use when this class or its
 *  methods are called in unsupported environments. Defaults to:
 *  'The atropa.' + className + ' class is unsupported in this environment.';
 */
atropa.requires = function (className, requirementFn, errorMessage) {
    "use strict";
    var check = function () {
        var test = false;
        if(typeof className !== 'string') {
            throw new Error('atropa.requires requires the class name to be ' +
                'specified');
        }
        
        if(atropa.data[className] === undefined) {
            atropa.data[className] = {};
            
            if(typeof requirementFn !== 'function') {
                requirementFn = false;
            }
            errorMessage = errorMessage || 'The atropa.' + className +
                    ' class is unsupported in this environment.';
            try {
                test = requirementFn();
            } catch (e) {
                test = false;
            }
            
            atropa.data[className].error = errorMessage;
            
            if(test === false) {
                atropa.data[className].support = 'unsupported';
            }
        }
    };
    
    atropa.data.requirements.push(check);
};
/**
 * Container for gobal data related to the classes and functions.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for gobal data related to the classes and functions.
 */
atropa.data = {};

atropa.data.requirements = [];

atropa.nop = function nop () {
    "use strict";
    return null;
};
module.exports = atropa;


},{}],4:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header

/**
 * Container for functions that test the state of inputs.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @namespace Container for functions that test the state of inputs.
 */
atropa.inquire = {};
/**
 * Checks whether the input is null.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} x Any input that may or may not be null.
 * @returns {Boolean} Returns true if x === null.
 */
atropa.inquire.isNull = function (x) {
    "use strict";
    return (x === null);
};
/**
 * Checks whether the input is an object.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} x Any input that may or may not be an object.
 * @returns {Boolean} Returns true if typeof(x) === 'object'.
 */
atropa.inquire.isObject = function (x) {
    "use strict";
    return (typeof x === 'object');
};
/**
 * Checks whether the input is both an object and not null.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} x Any input that may or may not be both an
 * object and null.
 * @returns {Boolean} Returns true if x is both an object and
 * not null. (null is an object).
 */
atropa.inquire.isObjectNotNull = function (x) {
    "use strict";
    return atropa.inquire.isObject(x) && (!atropa.inquire.isNull(x));
};
/**
 * Checks an object for the existence of a property
 * regardless of whether the property was inherited
 * or not.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Object} obj An object which may or may not
 * have the property identified by prop.
 * @param {String} prop A string value representing the
 * name of the property.
 * @returns {Boolean} Returns true if obj.prop exists,
 * otherwise returns false.
 */
atropa.inquire.hasProperty = function (obj, prop) {
    "use strict";
    if (atropa.inquire.isObjectNotNull(obj)) {
        return (prop in obj);
    }
    return false;
};
/**
 * Checks whether the input is an empty string.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {String} str The string you want to know about
 * @returns {Boolean} Returns true if str is an empty string,
 *  otherwise returns false.
 */
atropa.inquire.isEmptyString = function (str) {
    "use strict";
    var out = false;
    if ('' === str) {
        out = true;
    }
    return out;
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":3}],5:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header

/**
 * Container for regex functions.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @namespace Container for regex functions.
 */
atropa.regex = {};
/**
 * Regex patterns
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Regex patterns.
 */
atropa.regex.patterns = {
    /**
     * finds repeated words and phrases
     * @type RegExp
     */
    repeatedWords : /(\b.{3,}\b)\s*(\1)/g,
    /**
     * finds paragraph breaks
     * @type RegExp
     */
    paragraphBreaks : /(\r\n\r\n|\n\n|\r\r)/g,
    /**
     * finds line breaks
     * @type RegExp
     */
    lineBreaks : /(\r\n|\r|\n)/g
};
/**
 * Appends common prefix, suffix, and word boundary regex strings to
 * the supplied word.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130110
 * @param {String} word The word to append prefix and suffix to
 * @param {Integer} threshold The word.length at which it does not
 * make sense to append prefix and suffix. Defaults to 3.
 * @returns {String} Returns the supplied word with prefix, suffix,
 * and word boundaries attached. If the word.length was not greater
 * than the threshold, only word boundaries are attached. The string
 * represents a RegEx which should pick out most forms of regular
 * words.
 */
atropa.regex.appendPrefixesAndSuffixes = function (word, threshold) {
    "use strict";
    var prefixes,
    suffixes;
    prefixes = '(pre|un|re)?';
    suffixes = '(ification|' +
                'tionally|' +
                'ication|' +
                'ified|istic|iness|' +
                'fare|tion|ance|ence|less|ally|able|ness|ized|ised|' +
                'ous|ify|ing|ity|ful|ant|ate|est|ism|izm|ist|' +
                'ic|al|ed|er|et|ly|rs|in|' +
                'y|s|r|d)?';
    
    threshold = threshold === undefined ? 3 : threshold;
    
    if (word.length > threshold) {
        word = '\\b' + prefixes + word + suffixes + '\\b';
    } else {
        word = '\\b()' + word + '()\\b';
    }
    return word;
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":3}],6:[function(require,module,exports){
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header

/**
 * Set default values for optional function parameters.
 * @example
 * <pre>
 *   // To set a default value for an optional parameter
 *   function(optionalArg) {
 *       var defaultVal = 'hello there!';
 *       optionalArg = atropa.setAsOptionalArg(defaultVal, optionalArg);
 *       return optionalArg;
 *   }
 * </pre>
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} defaultVal The default value to set.
 * @param {Mixed} optionalArg A reference to the optional argument.
 * @returns {Mixed} Returns the default value supplied when the optional
 * argument is undefined or null. Otherwise, the supplied optional argument
 * is returned.
 */
atropa.setAsOptionalArg = function (defaultVal, optionalArg) {
    "use strict";
    if (optionalArg === undefined || optionalArg === null) {
        optionalArg = defaultVal;
    }
    return optionalArg;
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":3}],7:[function(require,module,exports){
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
atropa.regex = require('atropa-regex').regex;
atropa.arrays = require('atropa-arrays').arrays;
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header

/**
 * A few utilities for manipulating strings.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace A few utilities for manipulating strings.
 * @requires atropa.regex.patterns
 */
atropa.string = {};
/**
 * Replaces repeated words and phrases with a single word or phrase.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130701
 * @param {String} string The string to remove repeated words from.
 * @returns {String} Returns the given string with repeated words and
 *  phrases removed.
 */
atropa.string.removeRepeatedWord = function removeRepeatedWord (string) {
    "use strict";
    return string.replace(atropa.regex.patterns.repeatedWords, '$1');
};
/**
 * Creates paragraph breaks at every occurrence of two consecutive line breaks.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130701
 * @param {String} string The string to insert paragraph tags into.
 * @returns {String} Returns the given string with paragraph breaks inserted.
 */
atropa.string.lineBreaksToParagraphTags = function lineBreaksToParagraphTags (string) {
    "use strict";
    var out = string.replace(atropa.regex.patterns.paragraphBreaks, '</p><p>');
    out = '<p>' + out.trim() + '</p>';
    out = out.replace(/\s+<\/(p|br)>/g, '</$1>');
    return out;
};
/**
 * Creates break tags at every line break.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130701
 * @param {String} string The string to insert break tags into.
 * @returns {String} Returns the given string with break tags inserted.
 */
atropa.string.lineBreaksToBreakTags = function lineBreaksToBreakTags (string) {
    "use strict";
    return string.replace(atropa.regex.patterns.lineBreaks, '<br>');
};
/**
 * Normalizes line breaks to `\n`.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130701
 * @param {String} string The string to normalize.
 * @returns {String} Returns the given string with normalized line breaks.
 */
atropa.string.normalizeEol = function normalizeEol (string) {
    "use strict";
    return string.replace(atropa.regex.patterns.lineBreaks, '\n');
};
/**
 * Converts the first character of a given string to
 * uppercase.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {String} string The string for which you want the
 * first letter to be in upper case.
 * @returns {String} The given string with it's first letter capitalized.
 */
atropa.string.ucFirst = function ucFirst(string) {
    "use strict";
    string = string.charAt(0).toUpperCase() + string.slice(1);
    return string;
};
/**
 * Converts the given string to camel case.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130823
 * @param {String} string The string to camelize.
 * @returns {String} The camelized string.
 * @example
 *  atropa.string.camelize('get it together');
 *  // returns "getItTogether"
 */
atropa.string.camelize = function camelize (str) {
    "use strict";
    var arr, out;
    arr = str.split(' ');
    out = arr.shift();
    arr = arr.map(function (item) {
        return atropa.string.ucFirst(item);
    });
    out += arr.join('');
    return out;
};
/**
 * Counts words.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130313
 * @param {String} someText Plain text.
 * @return {Number} Returns the count of words in someText.
 */
atropa.string.countWords = function countWords(someText) {
    "use strict";
    var wordCount, re, len = 0;
    if(someText !== undefined && someText !== null) {
        someText = someText.trim();
        if(someText !== '') {
            wordCount = 0;
            re = /\s+/gi;
            wordCount = someText.split(re);
            len = wordCount.length;
        }
    }
    return len;
};
/**
 * Converts end of line markers into whatever you want. 
 * Automatically detects any of \r\n, \n, or \r and 
 * replaces it with the user specified EOL marker.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {String} text The text you want processed.
 * @param {String} newEOL The replacement for the current EOL marks.
 * @returns {String} Returns the processed text.
 */
atropa.string.convertEol = function convertEOL(text, newEOL) {
    'use strict';
    return text.replace(atropa.regex.patterns.lineBreaks, newEOL);
};

/**
 * Removes a quantity of leading spaces specified by offset.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {String} text The text to process.
 * @param {Number} offset The amount of spaces you want removed 
 * from the beginning of the text.
 * @returns Returns the processed text.
 */
atropa.string.offsetWhiteSpace = function offsetWhiteSpace(text, offset) {
    'use strict';
    var regx;
    regx = new RegExp('^ {' + offset + '}');
    text = text.replace(regx, '');
    return text;
};

/**
 * Converts all tabs in leading whitespace into four spaces.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {String} text The text to process
 * @returns {String} Returns the processed text.
 */
atropa.string.normalizeWhiteSpacePrefix = function normalizeWhiteSpacePrefix(
    text
) {
    'use strict';
    var prefix = text.match(/^\s*/);
    if(prefix) {
        prefix = prefix[0];
        prefix = prefix.replace(/\t/g, '    ');
        text = text.replace(/^\s*/, prefix);
    }
    return text;
};

/**
 * Converts all tabs into four spaces.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {String} text The text to process
 * @returns {String} Returns the processed text.
 */
atropa.string.normalizeWhiteSpace = function normalizeWhiteSpace(text) {
    'use strict';
    text = text.replace(/\t/g, '    ');
    return text;
};

/**
 * Counts the number of leading space or tab characters but not both.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {String} text The text to analyze.
 * @returns {Number} Returns the quantity of leading spaces or tabs.
 */
atropa.string.getOffset = function getOffset(text) {
    'use strict';
    var offset = 0,
        leadingChar = text.charAt(0);
        
    if( leadingChar === ' ' || leadingChar === '\t') {
        while(text.charAt(offset) === leadingChar && offset < text.length) {
            offset++;
        }
    }
    return offset;
};
/**
 * Breaks a string into an array of words.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {String} text The text to analyze.
 * @returns {Array} Returns an array of the words in
 *  the given text.
 * @requires atropa.arrays.removeEmptyElements
 */
atropa.string.getWords = function (text) {
    "use strict";
    var out = [];
    function invalidChars(element) {
        var matched = /^[\-'’`]+$/.test(element);
        // invert the result of test. throw out elements that match.
        return !matched;
    }
    out = atropa.arrays.removeEmptyElements(
        text.split(/[^A-Za-z\-'’`]+/gi)
    );
    out = out.filter(invalidChars);
    return out;
};
/**
 * Escapes <code>CDATA</code> sections in text
 *  so that the text may be embedded into a 
 *  <code>CDATA</code> section. This should be run
 *  on any text which may contain the string 
 *  <code>]]></code> since said string will effectively
 *  end the <code>CDATA</code> section prematurely.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {String} text The text containing 
 *  <code>CDATA</code> sections to escape.
 * @returns {Array} Returns a string with escaped
 *  <code>CDATA</code> sections.
 * @see <a href="http://en.wikipedia.org/wiki/CDATA#Nesting">
 *  http://en.wikipedia.org/wiki/CDATA#Nesting</a>
 * @see <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=98168">
 *  https://bugzilla.mozilla.org/show_bug.cgi?id=98168</a>
 */
atropa.string.escapeCdata = function escapeCdata(text) {
    "use strict";
    return String(text).replace(/\]\]>/g, ']]]]><![CDATA[>');
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-arrays":2,"atropa-header":3,"atropa-regex":5}],8:[function(require,module,exports){
module.exports={
  "adapt": "adopt",
  "adaptation": "adaption",
  "adapted": "adopted",
  "administer": "minister",
  "admittance": "admission",
  "advice": "bullshit",
  "aesthetic": "ascetic",
  "affect": "effect",
  "agreement": "agreeance",
  "aid": "aide",
  "aide": "aid",
  "air": "err",
  "aisle": "isle",
  "all": "ball",
  "allowed": "aloud",
  "allude": "refer",
  "alone": "ecstatic",
  "aloud": "allowed",
  "alternate": "alternative",
  "always love you the same": "always love you like my other suckers",
  "always": "usually",
  "am i": "are i",
  "ambiguous": "ambivalent",
  "amidst": "all up in",
  "amongst": "among",
  "analysis": "analyzation",
  "ancient": "elderly",
  "anecdote": "antidote",
  "angel": "wrestler",
  "angelic demon": "villanous wrestler",
  "ant": "aunt",
  "anyways": "anywise",
  "apocalypse": "party time",
  "appraise": "apprise",
  "apropos": "appropriate",
  "arc": "ark",
  "arcane": "foolish",
  "arduous": "not easy",
  "ark": "arc",
  "as well": "also",
  "asphixiate": "finixiate",
  "assure": "ensure",
  "astigmatism": "stigmatism",
  "ate": "eight",
  "attached": "attacked",
  "attic": "anus",
  "audition": "auction",
  "aunt": "ant",
  "aura": "stench",
  "avenge": "git rowdy for",
  "awe": "fearful reverence",
  "baby if": "look bitch,",
  "back stab": "rump shake",
  "back stabb": "rump shake",
  "bad": "mad",
  "badly": "poorly",
  "bagel": "baby",
  "bah": "bag",
  "balanced individual": "psycho",
  "balanced man": "psycho",
  "balanced person": "psycho",
  "balanced woman": "psycho",
  "ball": "all",
  "ballad": "salad",
  "banners": "manners",
  "bare": "bear",
  "base": "bass",
  "bass": "base",
  "battle": "squabble",
  "bay": "sink",
  "be together": "mash up",
  "be": "bee",
  "beach": "beech",
  "beans": "jeans",
  "bear": "bare",
  "beast": "erection",
  "beat": "beet",
  "beaurocrats": "beaurocraps",
  "beautiful face": "enormous feet",
  "beautiful": "gaudy",
  "bedding": "wedding",
  "bee": "be",
  "beech": "beach",
  "beet": "beat",
  "behold": "oogle",
  "believe": "buy",
  "bells": "wells",
  "belly": "jelly",
  "berry": "bury",
  "berth": "birth",
  "best": "adequate",
  "betray": "catfish",
  "betrayal": "game",
  "big brother": "my paranoia",
  "bind": "coddle",
  "bionic": "bisontonical",
  "birth": "berth",
  "bite": "byte",
  "black": "yellow",
  "blackened walls": "filthy rooms",
  "blade": "handle",
  "bleed": "whine",
  "blessed be": "suck eggs",
  "blew": "blue",
  "blood": "grease",
  "blow": "crow",
  "blue": "blew",
  "blushing": "crushing",
  "boar": "bre",
  "bodies": "jiggling piles",
  "body": "jiggling clump",
  "bore": "boar",
  "bough": "bow",
  "bought": "boughten",
  "bound": "coddled",
  "bowel": "foul",
  "bowl": "soul",
  "boy meets girl": "rubber meets road",
  "brake": "break",
  "bread": "bred",
  "break": "beat",
  "breath": "awkward pause",
  "breathe": "pause awkwardly",
  "breeze": "draft",
  "brilliance": "shinyness",
  "brilliant": "shiny",
  "bring forth": "whip out",
  "brink": "border",
  "broach": "brooch",
  "broke": "beat",
  "broken": "beaten",
  "brows": "browse",
  "bubbling": "babbling",
  "bunny": "money",
  "buoy": "boy",
  "burrow": "burro",
  "bury": "berry",
  "busy": "dizzy",
  "butterfly": "flutter by",
  "buy": "by",
  "by her side": "on her back",
  "by his side": "on his back",
  "by my side": "on my back",
  "by your side": "on your back",
  "bye": "eye",
  "byte": "bite",
  "can't be without": "touch myself about",
  "can't find the words to say": "could blurt out some dumb shit",
  "can't live without": "touch myself about",
  "candle": "glowstick",
  "capture": "captivate",
  "care to give": "shit to give",
  "care": "give a shit",
  "cared": "gave a shit",
  "careen": "career",
  "caring": "giving a shit",
  "castle": "chateau",
  "caustic": "crastic",
  "cell": "sell",
  "cent": "sent",
  "cereal": "serial",
  "change one thing": "ruin everything",
  "cheek": "rump",
  "chili": "chilly",
  "chinese": "children",
  "chip": "flip",
  "chord": "cord",
  "christ": "John Doe jr",
  "chromosomes": "kromo-stones",
  "cite": "site",
  "civic": "civil",
  "classic": "classical",
  "cliff-hanger": "cliff-dweller",
  "close": "clothes",
  "cloud": "balloon",
  "coffin": "tobogan",
  "cold": "fuzzy",
  "collaborate": "corroborate",
  "collected": "collective",
  "college": "collage",
  "comedic": "comical",
  "commentate": "comment",
  "complement": "compliment",
  "comprehension": "apprehension",
  "comprised": "composed",
  "concentration": "consecration",
  "confiscate": "confisticate",
  "conscientious": "conscious",
  "consume": "suck",
  "consuming": "sucking",
  "control": "patrol",
  "converse": "conversate",
  "coop": "coupe",
  "cop porn": "popcorn",
  "corpse": "mannequin",
  "corpuscles": "corpsuckels",
  "correct": "catrectal",
  "could do anything": "embracing mania",
  "could never be without": "can't function without",
  "council": "counsel",
  "country": "bathroom",
  "coupe": "coop",
  "coupon": "puke on",
  "crack": "mend",
  "creak": "creek",
  "credible": "credulous",
  "cremated": "incremented",
  "crews": "cruise",
  "cried": "came",
  "cries": "comes",
  "crimson": "azure",
  "critique": "criticize",
  "crock": "crack",
  "crow": "blow",
  "cruel": "haphazard",
  "crushing": "blushing",
  "cry": "coming",
  "crying": "coming",
  "crypt": "urinal",
  "cryptic": "drunken",
  "crystal": "bedazler",
  "cunning": "desperate",
  "curse": "stain",
  "cut": "mutilate",
  "damn": "donut",
  "damp": "stamp",
  "dangerous": "con catching",
  "dark": "effervescent",
  "day": "morning",
  "daydream": "fantasize",
  "dead": "inert",
  "deadly": "fertile",
  "dealer": "stealer",
  "dear": "schmuck",
  "death": "Santa",
  "debutantes": "posh ladies",
  "deep down inside": "in the bottom of the tank",
  "demi-god": "mad plumber",
  "demigod": "mad plumber",
  "demon": "hard-on",
  "demonic angel": "bad contradiction",
  "depreciate": "deprecate",
  "depressed": "drunk",
  "depressing": "inebriating",
  "depression": "so much booze",
  "derogatory": "suppository",
  "destiny": "taxes",
  "deterrent": "detergent",
  "die": "make marshmallows",
  "died": "made marshmallows",
  "dies": "makes marshmallows",
  "different": "awkward",
  "disinterested": "uninterested",
  "disney": "divorce",
  "dissension": "dysentery",
  "dissenting": "descending",
  "distinguished": "extinguished",
  "dizzy": "busy",
  "do": "dew",
  "doctoral": "doctorial",
  "doe": "dough",
  "doesn't happen over": "cartwheels straight across",
  "don't have a clue": "got shit twisted",
  "don't need": "could give a fuck about",
  "dramatic": "dramatical",
  "dream": "obsess",
  "dreamland": "obsession island",
  "dreams": "obsessions",
  "dribble": "drivel",
  "drift": "him-haw",
  "dual": "duel",
  "dude": "doodie",
  "dying": "making marshmallows",
  "dysentery": "dissension",
  "ears": "tears",
  "ease": "tease",
  "ecology": "ecrology",
  "effect": "affect",
  "egoist": "egotist",
  "eight": "ate",
  "elder": "old folk",
  "elective": "electoral",
  "eleviate": "elebate",
  "emotion": "lubricant",
  "emotional": "childish",
  "empathy": "sympathy",
  "empty": "bloated",
  "endless": "real long",
  "energy": "juice",
  "enormity": "immensity",
  "ensure": "insure",
  "entered the house of": "got up in the barn for",
  "entrepreneur": "entramanore",
  "erogenous": "geronimous",
  "err": "air",
  "escape": "snuggle",
  "etched": "ground",
  "eternal": "imagined",
  "eternally": "for a bit",
  "eternity": "awhile",
  "ewe": "you",
  "existence": "whatever",
  "eye": "bye",
  "face": "race",
  "fade": "him-haw",
  "fair": "fare",
  "fairy": "ferry",
  "fall on deaf ears": "fall on death ears",
  "fall": "flop",
  "fanatic": "phonetic",
  "fang": "denture",
  "farewell": "adios",
  "farther": "further",
  "fate": "coincidence",
  "faze": "phase",
  "feast": "beast",
  "feat": "feet",
  "feel": "fondle",
  "fell": "flopped",
  "feminine": "femine",
  "fight in your race": "right in your face",
  "fight": "right",
  "fingers": "sausage",
  "fingertips": "chicken nuggets",
  "fir": "fur",
  "first laid eyes on": "first tried groping",
  "first of all": "mm-kay",
  "fish": "wish",
  "flags": "hags",
  "flammable": "inflammable",
  "flaunt": "flout",
  "flea": "flee",
  "flesh": "twinkie",
  "fleshout": "flushout",
  "flew": "flu",
  "flip": "chip",
  "flounder": "founder",
  "flour": "flower",
  "flung": "hung",
  "flutter by": "butterfly",
  "for all intents and purposes": "for all intensive purposes",
  "for he": "this dumb mother fucker",
  "for no reason": "maiacally",
  "for she": "'cause the cunt",
  "for": "four",
  "foreplay": "floorplay",
  "forest": "campground",
  "forever": "so very",
  "forget": "disremember",
  "form": "warm",
  "formally": "formerly",
  "forth": "fourth",
  "fortuitous": "fortunate",
  "foul": "bowel",
  "fragile": "sturdy",
  "frustrated": "flustrated",
  "fuck": "fridge",
  "full of life": "full of shit",
  "funeral": "venereal",
  "gall": "garlic",
  "gangster": "hamster",
  "gansta": "hamsta",
  "garage": "grave",
  "gave up on": "don't give a fuck about",
  "gentle": "genital",
  "ghost": "imaginary friend",
  "girl meets boy": "adolescent mistakes",
  "give up on": "won't give a fuck about",
  "given a choice": "extorted",
  "given up on": "don't give a fuck about",
  "giving up on": "ain't givin a fuck about",
  "god": "John Doe sr",
  "goddess": "Jane Doe",
  "gods": "John Doe sr et al.",
  "golden ray": "gaudy scribble",
  "good bye": "fuck off",
  "good": "well",
  "good-bye": "fuck off",
  "goodbye": "fuck off",
  "gorilla": "guerrilla",
  "got in your way": "tried to trap you",
  "grave": "personal space",
  "gravestone": "mile marker",
  "growing apart": "getting bored",
  "guess it doesn't matter": "know this shit is pointless",
  "gynecologist": "groinacologist",
  "had done": "done did",
  "hags": "flags",
  "hair": "hare",
  "hall": "haul",
  "halve": "have",
  "hand in hand": "foot in shoe",
  "hand to hold": "steak to eat",
  "hate": "dislike",
  "hatred": "odium",
  "haunt": "stalk",
  "hay": "hey",
  "heal": "heel",
  "healer": "fondler",
  "hearing": "earring",
  "heart": "crotch",
  "heartbeat": "crotch fire",
  "heaven": "sky",
  "heavens": "skies",
  "hell": "Antarctica",
  "hellfire": "hemorrhoid",
  "hi": "high",
  "hick": "sick",
  "hidden": "stashed",
  "higher power": "crusty sock",
  "hiss and lear": "listen here",
  "hissed": "missed",
  "historic": "historical",
  "history": "mystery",
  "hoarse": "horse",
  "holding them close to": "handcuffing them to",
  "hole": "whole",
  "holey": "holy",
  "honein": "homein",
  "hopeless": "pitiful",
  "horizontal": "Vertizontal",
  "horses": "hornets",
  "hottie": "hogtie",
  "hour": "our",
  "house": "tent",
  "human race": "gerbil empire",
  "hung": "flung",
  "hungry": "horny",
  "hypodemic needle": "hypodermic nurdle",
  "hysterical": "hilarious",
  "i am": "i are",
  "I couldn't care less": "I could care less",
  "i": "Kevin",
  "i'll": "i will",
  "i'm": "i are",
  "i've never felt this way": "i've done this",
  "i've": "i have",
  "illumination": "mumbo jumbo",
  "illusion": "drunken mistake",
  "im": "i'm",
  "immortal": "whiny",
  "imply": "infer",
  "in the middle of": "all up in",
  "incantation": "much yammering",
  "incense": "incest",
  "incidents": "instance",
  "infinite": "abstract",
  "ingenuous": "ingenious",
  "insensible": "insensitive",
  "install": "instill",
  "insulation": "installation",
  "intense": "intensive",
  "interior": "inferior",
  "interment": "internment",
  "interpret": "interpretate",
  "intimate": "iminent",
  "into the light": "on to the light",
  "intuition": "intermission",
  "invite": "knife",
  "isle": "aisle",
  "it must be true": "for real 'n' shit",
  "it's a dog-eat-dog world": "it's a doggy dog world",
  "jeans": "beans",
  "jelly beans": "belly jeans",
  "jelly": "belly",
  "jesus christ": "John Doe jr",
  "jesus": "John Doe jr",
  "jetlag": "jetlock",
  "jump": "dump",
  "just": "sure",
  "kiss": "slap",
  "kissing other": "going down on",
  "knead": "need",
  "knew": "got",
  "knife": "dildo",
  "knight": "night",
  "knot": "not",
  "know": "get",
  "knowledge": "trivia",
  "known": "got",
  "lack": "pack",
  "later": "latter",
  "lay": "lie",
  "laying in bed": "taking a shit",
  "laying on the floor": "begging for it",
  "lead": "speed",
  "leave her side": "get off her ass",
  "leave his side": "get off his ass",
  "leave my side": "get off my ass",
  "leave your side": "get off your ass",
  "leave": "let",
  "leopard": "shepherd",
  "lessen": "lesson",
  "liar": "fibber",
  "liberation": "lubrication",
  "lie": "fib",
  "lies": "fibs",
  "light": "spite",
  "lighted": "lit",
  "listen here": "hiss and lear",
  "loan": "lone",
  "lone": "single",
  "loneliness": "arousal",
  "lonely": "horny",
  "look back": "lick windows",
  "look into her eyes": "give her diseases",
  "look into his eyes": "give him diseases",
  "look into their eyes": "give them diseases",
  "loose": "lose",
  "lose": "shake",
  "lost": "aroused",
  "love": "confuse",
  "loving": "shoving",
  "luxuriant": "luxurious",
  "mad": "bad",
  "made": "maid",
  "magic": "hope",
  "magick": "delusion",
  "manners": "banners",
  "marry": "merry",
  "martial": "marshal",
  "mask": "trashbag",
  "massacres": "mascaras",
  "masseuse": "masseur",
  "mazeltov": "molotov",
  "me": "i",
  "means many things": "is best described with lies",
  "meat": "meet",
  "median": "medium",
  "meditate": "menstruate",
  "medium": "median",
  "meet again": "have another go-round",
  "melting": "smelting",
  "memorial": "memorium",
  "memoriam": "memorial",
  "mend": "send",
  "mescaline": "masculine",
  "midnight": "daybreak",
  "midst": "pants",
  "might as well": "oh fuck I oughtta",
  "militant": "maniacal",
  "military": "gangster",
  "militia": "gang",
  "mine": "i's",
  "minion": "horny pirate",
  "minorities": "minororities",
  "minors": "miners",
  "minstrel": "menstrual",
  "mischievous": "mischievious",
  "missed": "hissed",
  "money": "bunny",
  "monster": "dislexic lover",
  "moon": "night light",
  "moonlight": "moonshine",
  "mortal": "queer",
  "most people can only": "most freaks and dope fiends",
  "mustered": "mustard",
  "my lord": "sweet palm",
  "my": "i's ",
  "myself": "my muchness",
  "mysteries": "neon signs",
  "mystery": "neon sign",
  "mystic": "alcoholic",
  "nails": "tails",
  "naked": "unshaved",
  "needle": "nurdle",
  "never end": "drag on",
  "never ending": "relentless",
  "never going": "fucked for trying",
  "never thought you would do that": "got turned out like a dumb fuck",
  "neverending": "never ending",
  "nick": "pick",
  "night": "bedtime",
  "nightmare": "tantrum",
  "no matter": "irregardless of",
  "no tails": "toe nails",
  "nomad": "drunk hobo",
  "none": "nun",
  "not strong enough": "ain't got the nuts",
  "nothing is assured": "we live to deliver",
  "novelty quickly wears off": "dumb shit gits old fast",
  "now at an end": "brand spankin new",
  "o": "uh",
  "o'": "uh",
  "obtain": "get",
  "ocean": "sewer",
  "oh": "owe",
  "one": "won",
  "only wanted": "begged for",
  "oppress": "repress",
  "orient": "orientate",
  "ostensibly": "ostensively",
  "our": "their",
  "ours": "theirs",
  "out": "shout",
  "outward appearance": "facade",
  "overdo": "overdue",
  "oversee": "overlook",
  "pack": "lack",
  "paid": "laid",
  "pail": "pale",
  "pain": "lethargy",
  "pale": "sexy",
  "paralysis": "paralyzation",
  "parameters": "perimeters",
  "passion": "delirium",
  "passionate": "delirious",
  "path": "sidewalk",
  "peace": "piece",
  "peak": "peek",
  "pen": "penis",
  "perfect": "fucked",
  "persecute": "execute",
  "perspective": "prospective",
  "perspire": "expire",
  "pervert": "orevert",
  "petal": "dingleberry",
  "phone": "thong",
  "piece by piece": "chortle by chortle",
  "pillow": "stone",
  "plain": "plane",
  "poem": "scribble",
  "poet": "hobo",
  "poetic": "flatulent",
  "poetry": "bad gas",
  "pole": "poll",
  "poor": "pour",
  "popcorn": "cop porn",
  "practical": "practicle",
  "practice": "practise",
  "pray": "murmur",
  "pre-marital": "premartial",
  "prearranged": "prederranged",
  "precede": "proceed",
  "precipitate": "precipitous",
  "prescribe": "proscribe",
  "principal": "principle",
  "prison": "outhouse",
  "problem": "useless concern",
  "promise": "lie",
  "prophecies": "wives tales",
  "prophecy": "wives tale",
  "prophet": "insomniac",
  "prostate": "prostrate",
  "puke on": "coupon",
  "put up with": "manhandle",
  "putrid": "pleasant",
  "qualifications": "qualifidations",
  "quest": "stroll",
  "quiet": "quite",
  "race": "face",
  "rain": "spunk",
  "rainbow": "pizzazz",
  "rap": "wrap",
  "rape": "what",
  "raping": "what",
  "rare": "rarified",
  "rationale": "rationalization",
  "ravaging": "ravishing",
  "raven": "pigeon",
  "ravishing": "ravenous",
  "ray": "scribble",
  "razor": "dildo",
  "razorblade": "butt plug",
  "reactionary": "reactive",
  "real": "reel",
  "reality": "toilet bowl",
  "rebelling": "revolting",
  "rebut": "refute",
  "reckless": "wreckless",
  "refute": "refudiate",
  "regardless": "irregardless",
  "regretfully": "regrettably",
  "regurgitate": "detergerate",
  "rehabilitate": "debilitate",
  "releave": "relive",
  "remember": "mumble",
  "repel": "repulse",
  "repute": "refute",
  "rest in peace": "party like it's 1999",
  "riddle": "polka dot",
  "right": "fight",
  "righteous": "arrogant",
  "ring": "wring",
  "ritual": "banana dance",
  "role": "roll",
  "rose": "anus",
  "sad": "impotent",
  "sadd": "flaccid",
  "saddened": "made flaccid",
  "sadness": "impotence",
  "sail": "sale",
  "salad": "ballad",
  "salient": "saline",
  "sanitarium": "saniquarium",
  "save": "wave",
  "scapegoat": "escape goat",
  "scar": "stria",
  "scare": "tickle",
  "scarred": "striated",
  "scars": "striae",
  "scary": "tickly",
  "scene": "seen",
  "scream": "grunt",
  "sea": "bath",
  "seal": "heal",
  "seam": "seem",
  "segue": "segway",
  "self esteem": "self of steam",
  "self-depreciating": "self-deficating",
  "selfish": "thieving",
  "send": "mend",
  "sense": "since",
  "set the mood": "whip it out",
  "shake": "take",
  "shall": "should-will",
  "shelled": "unshelled",
  "shepherd": "leopard",
  "shine": "bling",
  "shooting star": "swift missile",
  "shout": "out",
  "shoving": "loving",
  "shower": "tower",
  "sick": "hick",
  "since": "sense",
  "site": "sight",
  "skin": "biscuits",
  "slash": "mutilate",
  "slave": "gimp",
  "slice": "pet",
  "slit": "crevice",
  "so good": "neato",
  "so mote it be": "it's real in my head",
  "so nervous": "so fucking drunk",
  "so": "sew",
  "soar": "sore",
  "social": "societal",
  "soil": "toil",
  "soldier": "maniac",
  "sole": "soul",
  "solitude": "ambiance",
  "some": "sum",
  "sons": "tons",
  "soon": "slutty",
  "sorrow": "whimper",
  "soul": "banana",
  "speak of": "talk about",
  "specially": "especially",
  "speed": "lead",
  "spirit": "banana",
  "spiritual": "banana craving",
  "spite": "light",
  "spread": "sores",
  "spring": "tube socks",
  "stamp": "damp",
  "stand out from the crowd": "look like a jackass",
  "standing out from the crowd": "wobbling like an elephant on a bicycle",
  "stands out from the crowd": "smells like old dick",
  "star": "missile",
  "stature": "statue",
  "steal": "steel",
  "stealer": "dealer",
  "steel": "latex",
  "stood out from the crowd": "jiggled like a jello Santa",
  "stop": "push",
  "stopp": "push",
  "storm": "orgy",
  "strategies": "tragedies",
  "studying": "studding",
  "substantial": "substantive",
  "suffer": "pirouette",
  "suicide": "murder",
  "sun": "yellow disk",
  "sunny": "sweltering",
  "supposedly": "supposably",
  "sweat": "fart",
  "sword": "dildo",
  "synchronize": "sympathize",
  "tail": "tale",
  "take care of": "decimate",
  "take care": "forget",
  "take": "shake",
  "takes care": "forgets",
  "taking care": "forgeting",
  "talk": "cuss",
  "taste": "waste",
  "taunt": "taut",
  "tear": "spunk",
  "teardrop": "tear drop",
  "tears": "ears",
  "tease": "ease",
  "tell you i'm fine": "screm I'M FUCKIN OK",
  "tenant": "tenet",
  "tenets": "tenants",
  "term": "worm",
  "testament": "tentacle",
  "the best": "the baddest",
  "the first moment": "straightaway",
  "the only one": "fucking stupid",
  "the point of no return": "the stranger's sex dungeon",
  "the spring": "tube sock",
  "the way it is": "how it be",
  "thee": "you",
  "their": "there",
  "therefor": "therefore",
  "thine": "you's",
  "think": "scheme",
  "thorough": "thoroughgoing",
  "thou": "you",
  "throne": "throb",
  "through your hair": "upside your head",
  "thusly": "thus",
  "time": "throbbing",
  "to a better": "for some glittered",
  "to get away": "to fucking run",
  "to no avail": "for great good",
  "to the light": "out in public",
  "toe": "tow",
  "toil": "soil",
  "toilet": "terlit",
  "tons": "sons",
  "too good to be true": "fucking fantastic",
  "torment": "tickle",
  "torn": "huggled",
  "tornado": "tomato",
  "touch": "grope",
  "tout": "taut",
  "toward": "towards",
  "tower": "shower",
  "tragedies": "strategies",
  "trampoline": "trampaloon",
  "truth": "trivia",
  "try": "shoot",
  "tupperware": "underwear",
  "twas": "it was",
  "twilight": "moonshine",
  "twinkle": "strobe",
  "twinkling": "strobing",
  "ulterior": "alterior",
  "uncaring": "prickish",
  "unconscious": "unconscience",
  "understand": "stroke my ego",
  "uniform": "unicorn",
  "united": "untied",
  "universe": "toilet bowl",
  "unparalled": "unparalyzed",
  "unparalleled": "unparalyzed",
  "untied": "united",
  "upmost": "utmost",
  "upped the ante": "upped the annie",
  "us": "them",
  "usage": "use",
  "utilize": "use",
  "vacation": "vocation",
  "valley": "ditch",
  "vampire": "pedophile",
  "vampiric": "pedophilic",
  "vampyre": "pedophyle",
  "vary": "very",
  "veil": "disguise",
  "venge": "-rowdy-",
  "vengeance": "slap happiness",
  "verbiage": "verbage",
  "vericose": "very close",
  "vice versa": "ipso fatso",
  "viola": "voila",
  "violence": "violins",
  "virtue": "virgin",
  "viscious cycle": "clusterfuck",
  "viscous circle": "vicious cycle",
  "vista": "scene",
  "void": "bucket",
  "voluptuous": "volumptuous",
  "wail": "whale",
  "waist": "waste",
  "wait": "weight",
  "walk out": "narrowly escape",
  "walked out": "narrowly escaped",
  "walking out": "narrowly escaping",
  "wander": "stumble",
  "war": "wore",
  "warfare": "children laughing",
  "warm": "form",
  "warn": "worn",
  "warrantee": "warranty",
  "warrior": "kitten",
  "wary": "weary",
  "was i": "were i",
  "waste": "taste",
  "wave": "save",
  "way": "weigh",
  "wayside": "wasteside",
  "we": "they",
  "weak": "week",
  "weapon": "cap gun",
  "weary": "leery",
  "weather": "whether",
  "wedding": "bedding",
  "week": "weed",
  "wells": "bells",
  "werewolf": "weirdwolf",
  "whales": "sails",
  "what people say": "muthaphukkas be talkin",
  "what's the point": "the fucks this mean",
  "which": "witch",
  "wield": "jerk",
  "will always be there": "stick like wet shit",
  "will be there": "stick like shit",
  "will not heal": "festers",
  "wind": "blow",
  "wisdom": "bull shit",
  "wise": "bull shitting",
  "wish": "want",
  "with every fiber": "from pithy pits",
  "woe": "chlamydia",
  "won't make it through": "could shimmy past",
  "world": "hand towel",
  "worm": "term",
  "worse comes to worst": "worst comes to worst",
  "worthwhile": "worthwild",
  "wound": "ouchie",
  "wretch": "skeeze",
  "wretched": "skeezy",
  "write": "scrawl",
  "written": "scrawled",
  "wrong": "buzzing",
  "wrote": "scrawled",
  "yet": "immediately",
  "you all": "all you",
  "you were the one": "you were my target",
  "you": "Dummie's",
  "you'll": "you will",
  "you're": "you is",
  "you've": "you has",
  "your": "you's",
  "yours": "you's",
  "yourself": "you's muchness",
  "zebras": "zeberellas",
  "zucchini": "cuisini"
}

},{}],9:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
/*jslint
    node: true
*/
var atropa = require('atropa-header');
atropa.regex = require('atropa-regex').regex;
atropa.string = require('atropa-string').string;
atropa.setAsOptionalArg = require('atropa-setAsOptionalArg').setAsOptionalArg;
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true,
    vars: true
*/
/*global atropa */
// end header
(function () {
    'use strict';
    atropa.requires('wtf', function () {
        var supported = true;
        [
            atropa.regex,
            atropa.string.countWords,
            atropa.setAsOptionalArg
        ].forEach(function (prerequisite) {
            if (prerequisite === undefined) {
                supported = false;
            }
        });
        return supported;
    });
}());
(function () {
    'use strict';
    atropa.requires('wtfHtmlElement', function () {
        var supported = true;
        [window].forEach(function (prerequisite) {
            if (prerequisite === undefined) {
                supported = false;
            }
        });
        return supported;
    });
}());
/**
 * Container for all Glorious WTFifier related functions and such.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @namespace Container for all Glorious WTFifier related functions and such.
 * @requires atropa.regex
 * @requires atropa.wtf.dictionary
 */
atropa.wtf = {};
/**
 * The Glorious WTFification Dictionary: Turning Shit
 * Into Polished Turds.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130110
 */
atropa.wtf.dictionary = require('./atropa-wtf-dictionary.json');
/**
 * Accepts plain text input and Gloriously WTFifies it.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130110
 * @param {String} target The text to WTFify.
 * @param {Boolean} outputHTML Specifies if you want the output
 *  in HTML format. If false, will output plain text. Defaults
 *  to false.
 * @return {String} Returns Genuine WTFified text.
 */
atropa.wtf.wtfify = function (target, outputHTML) {
    'use strict';
    atropa.supportCheck('wtf');
    var regexValue, replacementText, oldWord, wtfCount, wordCount, ret, word;
    if (true !== outputHTML) {
        outputHTML = false;
    }
    ret = {};
    wtfCount = 0;
    target = target.trim();
    wordCount = atropa.string.countWords(target);
    if (true === outputHTML) {
        target = target.replace(/(\. ?){2,}/gi, '<span style="color : brown ;"> [shit taco] </span>');
        target = '<p> ' + target.replace(/(\r\n|\r|\n)/g, ' <br/> ') + ' </p>';
    } else {
        target = target.replace(/(\. ?){2,}/gi, ' [shit taco] ');
    }
    /**
     * Accepts plain text input and Gloriously WTFifies it.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130112
     * @methodOf atropa.wtf.wtfify-
     * @private
     * @param {String} m First matched pattern in string searched.
     * @param {String} sub1 First matched subpattern in string searched.
     * @param {String} sub2 Second matched subpattern in string searched.
     */
    /*jslint unparam: true*/
    replacementText = function (m, sub1, sub2) {
        wtfCount++;
        sub1 = atropa.setAsOptionalArg('', sub1);
        sub2 = atropa.setAsOptionalArg('', sub2);
        var out;
        if (true === outputHTML) {
            out = '<span style="color : red ;">' + sub1 + atropa.wtf.dictionary[word] + sub2 + '</span>';
        } else {
            out = sub1 + atropa.wtf.dictionary[word] + sub2;
        }
        return out;
    };
    /*jslint unparam: false*/
    // word is defined in the containing scope and
    // is not global, jshint is wrong
    for (word in atropa.wtf.dictionary) {
        if (atropa.wtf.dictionary.hasOwnProperty(word)) {
            oldWord = atropa.regex.appendPrefixesAndSuffixes(word);
            regexValue = new RegExp(oldWord, 'gi');
            target = target.replace(regexValue, replacementText);
        }
    }
    ret.wtfCount = wtfCount;
    ret.wordCount = wordCount;
    ret.score = wtfCount / wordCount;
    ret.txt = target;
    return ret;
};
/**
 * WTFifies the <code>textContent</code> or <code>value</code> of the
 *  given element and replaces the element's innerHTML with a pre block
 *  containing the results of WTFification.
 * @param {HTMLElement} elementReference A reference to an HTML Element.
 * @returns {HTMLElement} Returns the given element after wtfification.
 * @version 20130313
 */
atropa.wtf.htmlElement = function (elementReference) {
    'use strict';
    atropa.supportCheck('wtfHtmlElement');
    var wtfified, txt;
    elementReference.innerHTML = elementReference.innerHTML.replace(/<br>(\s+)?(\r\n|\r|\n)?/g, '\r\n');
    txt = elementReference.value || elementReference.textContent;
    wtfified = atropa.wtf.wtfify(txt, true);
    elementReference.innerHTML = '<pre style="color:black; background:white; white-space:pre-wrap;">' + wtfified.txt + '</pre>';
    return elementReference;
};
while (atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;
},{"./atropa-wtf-dictionary.json":8,"atropa-header":3,"atropa-regex":5,"atropa-setAsOptionalArg":6,"atropa-string":7}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvYnJvd3Nlck1haW4uanMiLCJub2RlX21vZHVsZXMvYXRyb3BhLWFycmF5cy9zcmMvYXRyb3BhLWFycmF5cy5qcyIsIm5vZGVfbW9kdWxlcy9hdHJvcGEtaGVhZGVyL3NyYy9hdHJvcGEtaGVhZGVyLmpzIiwibm9kZV9tb2R1bGVzL2F0cm9wYS1pbnF1aXJlL3NyYy9hdHJvcGEtaW5xdWlyZS5qcyIsIm5vZGVfbW9kdWxlcy9hdHJvcGEtcmVnZXgvc3JjL2F0cm9wYS1yZWdleC5qcyIsIm5vZGVfbW9kdWxlcy9hdHJvcGEtc2V0QXNPcHRpb25hbEFyZy9zcmMvYXRyb3BhLXNldEFzT3B0aW9uYWxBcmcuanMiLCJub2RlX21vZHVsZXMvYXRyb3BhLXN0cmluZy9zcmMvYXRyb3BhLXN0cmluZy5qcyIsInNyYy9hdHJvcGEtd3RmLWRpY3Rpb25hcnkuanNvbiIsInNyYy9hdHJvcGEtd3RmLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNzZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsInZhciB3dGYgPSByZXF1aXJlKCcuLi9zcmMvYXRyb3BhLXd0Zi5qcycpO1xyXG5cclxudHJ5IHtcclxuICAgIE9iamVjdC5rZXlzKHd0ZikuZm9yRWFjaChcclxuICAgICAgICBmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICAgICAgICBpZighYXRyb3BhW3Byb3BdKSB7XHJcbiAgICAgICAgICAgICAgICBhdHJvcGFbcHJvcF0gPSB3dGZbcHJvcF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICApO1xyXG59IGNhdGNoIChpZ25vcmUpIHtcclxuICAgIGF0cm9wYSA9IHJlcXVpcmUoJy4uL3NyYy9hdHJvcGEtd3RmLmpzJyk7XHJcbn1cclxuXHJcbk9iamVjdC5rZXlzKHd0Zi5kYXRhKS5maWx0ZXIoXHJcbiAgICBmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICAgIHJldHVybiBwcm9wICE9PSAncmVxdWlyZW1lbnRzJztcclxuICAgIH1cclxuKS5mb3JFYWNoKFxyXG4gICAgZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICBhdHJvcGEuZGF0YVtwcm9wXSA9IHd0Zi5kYXRhW3Byb3BdO1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG5hdHJvcGEuaW5xdWlyZSA9IHJlcXVpcmUoJ2F0cm9wYS1pbnF1aXJlJykuaW5xdWlyZTtcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogVXRpbGl0aWVzIGZvciBoYW5kbGluZyBhcnJheXMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDIyMVxyXG4gKiBAbmFtZXNwYWNlIFV0aWxpdGllcyBmb3IgaGFuZGxpbmcgYXJyYXlzLlxyXG4gKi9cclxuYXRyb3BhLmFycmF5cyA9IHt9O1xyXG4vKipcclxuICogQ29tcGFyZXMgdHdvIGFycmF5cyBiYXNlZCBvbiBzaXplLCBjb250ZW50cywgYW5kIGVsZW1lbnQgb3JkZXIuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTEgT25lIGFycmF5IHlvdSB3YW50IGNvbXBhcmVkIHRvIGFub3RoZXIuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MiBUaGUgb3RoZXIgYXJyYXkuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgb3IgZmFsc2UgZGVwZW5kaW5nIG9uXHJcbiAqICB3aGV0aGVyIG9yIG5vdCB0aGUgYXJyYXlzIG1hdGNoZWQgaW4gc2l6ZSwgY29tcG9zaXRpb24sIGFuZFxyXG4gKiAgZWxlbWVudCBvcmRlci5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwyXTtcclxuICogdmFyIHkgPSBbMSwxLDNdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLm1hdGNoKHgseSk7XHJcbiAqIC8vIHJldHVybnMgZmFsc2VcclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwyXTtcclxuICogdmFyIHkgPSBbMSwyXTtcclxuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIHRydWVcclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwyXTtcclxuICogdmFyIHkgPSBbMiwxXTtcclxuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIGZhbHNlIGJlY2F1c2UgdGhlIGVsZW1lbnRzIGFyZSBub3QgaW4gdGhlIHNhbWUgb3JkZXIuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEseydhUHJvcCcgOiAnYVZhbHVlJ31dO1xyXG4gKiB2YXIgeSA9IFsxLHsnYVByb3AnIDogJ2FWYWx1ZSd9XTtcclxuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIGZhbHNlIGJlY2F1c2UgZXZlbiB0aG91Z2ggdGhlIG9iamVjdCBsb29rcyB0aGUgc2FtZSwgdGhlXHJcbiAqIC8vIHR3byBvYmplY3RzIGFyZSBpbiBmYWN0IGRpc3RpbmN0IG9iamVjdHMuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsdWUnfTtcclxuICogdmFyIHggPSBbMSxvYmpdO1xyXG4gKiB2YXIgeSA9IFsxLG9ial07XHJcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcclxuICogLy8gcmV0dXJucyB0cnVlIGJlY2F1c2UgdGhlIG9iamVjdHMgcmVmZXJlbmNlZCBpbiB0aGUgYXJyYXlzIGFyZVxyXG4gKiAvLyBpbiBmYWN0IHRoZSBzYW1lIG9iamVjdC5cclxuICovXHJcbmF0cm9wYS5hcnJheXMubWF0Y2ggPSBmdW5jdGlvbiBhcnJheXNNYXRjaChhcnJheTEsIGFycmF5Mikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgeCxcclxuICAgIGw7XHJcbiAgICBpZiAoYXJyYXkxLmxlbmd0aCAhPT0gYXJyYXkyLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGwgPSBhcnJheTEubGVuZ3RoO1xyXG4gICAgZm9yICh4ID0gMDsgeCA8IGw7IHggKz0gMSkge1xyXG4gICAgICAgIGlmIChhcnJheTFbeF0gIT09IGFycmF5Mlt4XSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcbi8qKlxyXG4gKiBTdWJ0cmFjdHMgb25lIGFycmF5IGZyb20gYW5vdGhlciBhcnJheSBiYXNlZCBvbiB0aGUgdW5pcXVlIHZhbHVlcyBpbiBib3RoXHJcbiAqICBzZXRzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMTJcclxuICogQHBhcmFtIHtBcnJheX0gYSAoc3VidHJhaGVuZCkgVGhlIGFycmF5IHRvIHN1YnRyYWN0LlxyXG4gKiBAcGFyYW0ge0FycmF5fSBmcm9tQiAobWludWVuZCkgVGhlIGFycmF5IHdpdGggZWxlbWVudHMgZHVwbGljYXRlZCBpbiA8Y29kZT5hPC9jb2RlPlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgY29udGFpbmluZyBvbmx5IHRoZSB1bmlxdWVcclxuICogIHZhbHVlcyBmb3VuZCBpbiA8Y29kZT5mcm9tQjwvY29kZT4gdGhhdCBhcmUgbm90IHByZXNlbnQgaW4gPGNvZGU+YTwvY29kZT5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwyXTtcclxuICogdmFyIHkgPSBbMSwxLDNdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzNdXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsM107XHJcbiAqIHZhciB5ID0gWzMsMV07XHJcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDNdO1xyXG4gKiB2YXIgeSA9IFszLDEsMSw5XTtcclxuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFs5XVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogdmFyIHkgPSBbMywxLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbeydhUHJvcCcgOiAnYVZhbCd9XSBcclxuICogLy8gYmVjYXVzZSB0aGUgdHdvIG9iamVjdHMgYXJlIG5vdCB0aGUgc2FtZSBvYmplY3QuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ307XHJcbiAqIHZhciB4ID0gWzEsMyxvYmpdO1xyXG4gKiB2YXIgeSA9IFszLDEseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFt7J2FQcm9wJyA6ICdhVmFsJ31dIFxyXG4gKiAvLyBiZWNhdXNlIHRoZSB0d28gb2JqZWN0cyBhcmUgbm90IHRoZSBzYW1lIG9iamVjdC5cclxuICogQGV4YW1wbGVcclxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfVxyXG4gKiB2YXIgeCA9IFsxLDMsb2JqXTtcclxuICogdmFyIHkgPSBbMywxLG9ial07XHJcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbXSBcclxuICogLy8gYmVjYXVzZSB0aGUgb2JqZWN0cyByZWZlcmVuY2VkIGluIHRoZSBhcnJheXMgYXJlIHRoZSBzYW1lIG9iamVjdC5cclxuICovXHJcbmF0cm9wYS5hcnJheXMuc3VidHJhY3QgPSBmdW5jdGlvbihhLCBmcm9tQikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgdGhlID0ge307XHJcbiAgICB0aGUucmVzdWx0ID0gW107XHJcbiAgICBmcm9tQi5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgIHRoZS5tYXJrID0gZmFsc2U7XHJcbiAgICAgICAgYS5mb3JFYWNoKGZ1bmN0aW9uKHJtKXtcclxuICAgICAgICAgICAgaWYoaXRlbSA9PT0gcm0pIHtcclxuICAgICAgICAgICAgICAgIHRoZS5tYXJrID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKHRoZS5tYXJrICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoZS5yZXN1bHQucHVzaChpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0aGUucmVzdWx0O1xyXG59O1xyXG4vKipcclxuICogUmV0dXJucyBhbiBhcnJheSBvZiB2YWx1ZXMgZm91bmQgaW4gYm90aCBvZiB0aGUgZ2l2ZW4gYXJyYXlzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMTJcclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkxIEFuIGFycmF5LlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTIgQW5vdGhlciBhcnJheS5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIHZhbHVlcyBmb3VuZCBpbiBib3RoIG9mIHRoZSBnaXZlblxyXG4gKiAgYXJyYXlzLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDMsNF07XHJcbiAqIHZhciB5ID0gWzMsMSw1XTtcclxuICogYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbMSwzXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDEsMyw0XTtcclxuICogdmFyIHkgPSBbMywxLDEsNV07XHJcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzEsMSwzXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9O1xyXG4gKiB2YXIgeCA9IFsxLDMsb2JqXTtcclxuICogdmFyIHkgPSBbMywxLG9ial07XHJcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ307XHJcbiAqIHZhciB4ID0gWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiB2YXIgeSA9IFszLDEsb2JqXTtcclxuICogYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbMSwzXSBiZWNhdXNlIHRoZSB0d28gb2JqZWN0cyBhcmUgbm90IHRoZSBzYW1lIG9iamVjdC5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIHZhciB5ID0gWzMsMSx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFsxLDNdIGJlY2F1c2UgdGhlIHR3byBvYmplY3RzIGFyZSBub3QgdGhlIHNhbWUgb2JqZWN0LlxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QgPSBmdW5jdGlvbiBpbnRlcnNlY3QoYXJyYXkxLCBhcnJheTIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHNtYWxsQXJyYXksIGxhcmdlQXJyYXksIGludGVyc2VjdGlvbiA9IFtdO1xyXG4gICAgaWYoYXJyYXkxLmxlbmd0aCA+IGFycmF5Mi5sZW5ndGgpIHtcclxuICAgICAgICBsYXJnZUFycmF5ID0gYXJyYXkxLnNwbGljZSgwKTtcclxuICAgICAgICBzbWFsbEFycmF5ID0gYXJyYXkyLnNwbGljZSgwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGFyZ2VBcnJheSA9IGFycmF5Mi5zcGxpY2UoMCk7XHJcbiAgICAgICAgc21hbGxBcnJheSA9IGFycmF5MS5zcGxpY2UoMCk7XHJcbiAgICB9XHJcbiAgICBzbWFsbEFycmF5LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICB2YXIgaWR4SW5MYXJnZUFycmF5ID0gbGFyZ2VBcnJheS5pbmRleE9mKGl0ZW0pO1xyXG4gICAgICAgIGlmICgwIDw9IGlkeEluTGFyZ2VBcnJheSkgeyAvLyBoYXMgd29yZFxyXG4gICAgICAgICAgICBpbnRlcnNlY3Rpb24ucHVzaChsYXJnZUFycmF5LnNwbGljZShpZHhJbkxhcmdlQXJyYXksIDEpWzBdKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpbnRlcnNlY3Rpb247XHJcbn07XHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBmcmVxdWVuY3kgb2YgaXRlbXMgb2NjdXJyaW5nIGluIGFuIGFycmF5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMThcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheSB0byBjYWxjdWxhdGUgZnJlcXVlbmNpZXMgZnJvbS5cclxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBhbiBvYmplY3Qgd2hvc2Uga2V5cyBhcmUgZWFjaCB1bmlxdWVcclxuICogIGVsZW1lbnRzIGZyb20gdGhlIGFycmF5IGFuZCB0aGVpciB2YWx1ZSBpcyB0aGVpciBmcmVxdWVuY3kgb2ZcclxuICogIG9jY3VycmVuY2Ugd2l0aGluIHRoZSBhcnJheS4gQmUgY2FyZWZ1bCB0aGF0IHlvdXIgYXJyYXkgZG9lc1xyXG4gKiAgbm90IGNvbnRhaW4gdmFsdWVzIG1hdGNoaW5nIG9iamVjdCBpbnN0YW5jZSBwcm9wZXJ0eSBuYW1lcy5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwxLDEsMSwxLDMsM107XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHgpO1xyXG4gKiAvLyByZXR1cm5zIHtcclxuICogLy8gICAgIFwiMVwiOiA1LFxyXG4gKiAvLyAgICAgXCIzXCI6IDJcclxuICogLy8gfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFtcImJpbGxcIiwgXCJmcmVkXCIsIFwiZnJlZFwiLCBcImphbmVcIl07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHgpO1xyXG4gKiAvLyByZXR1cm5zIHtcclxuICogLy8gICAgIFwiYmlsbFwiOiAxLFxyXG4gKiAvLyAgICAgXCJmcmVkXCI6IDIsXHJcbiAqIC8vICAgICBcImphbmVcIjogMVxyXG4gKiAvLyB9XHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcclxuICogLy8gcmV0dXJucyB7XHJcbiAqIC8vICAgICBcIjFcIjogMSxcclxuICogLy8gICAgIFwiM1wiOiAxLFxyXG4gKiAvLyAgICAgXCJbb2JqZWN0IE9iamVjdF1cIjogMVxyXG4gKiAvLyB9XHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ307XHJcbiAqIHZhciBvdGhlck9iaiA9IHt9O1xyXG4gKiB2YXIgeCA9IFsxLDMsb2JqLG90aGVyT2JqLHsnYURvdWdobnV0JyA6ICdzcHJpbmtsZXMnfV07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHgpO1xyXG4gKiAvLyByZXR1cm5zIHtcclxuICogLy8gICAgIFwiMVwiOiAxLFxyXG4gKiAvLyAgICAgXCIzXCI6IDEsXHJcbiAqIC8vICAgICBcIltvYmplY3QgT2JqZWN0XVwiOiAzXHJcbiAqIC8vIH1cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzLFwidG9TdHJpbmdcIl07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHgpO1xyXG4gKiAvLyByZXR1cm5zIHtcclxuICogLy8gICAgIFwiMVwiOiAxLFxyXG4gKiAvLyAgICAgXCIzXCI6IDEsXHJcbiAqIC8vICAgICBcInRvU3RyaW5nXCI6IFwiZnVuY3Rpb24gdG9TdHJpbmcoKSB7XFxuICAgIFtuYXRpdmUgY29kZV1cXG59MVwiXHJcbiAqIC8vIH1cclxuICovXHJcbmF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5ID0gZnVuY3Rpb24gKGFycikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgb3V0ID0gYXJyLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBjdXJyKSB7XHJcbiAgICAgICAgaWYgKGFjY1tjdXJyXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGFjY1tjdXJyXSA9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWNjW2N1cnJdICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9LCB7fSk7XHJcbiAgICByZXR1cm4gb3V0O1xyXG59O1xyXG4vKipcclxuICogR2V0cyBVbmlxdWUgdmFsdWVzIGZyb20gYW4gYXJyYXkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxyXG4gKiBAcGFyYW0ge0FycmF5fSBsYXJnZUFycmF5IFRoZSBhcnJheSB3aXRoIGR1cGxpY2F0ZSB2YWx1ZXMgaW4gaXQuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBjb250YWluaW5nIG9ubHkgdGhlIHVuaXF1ZVxyXG4gKiAgdmFsdWVzIGZvdW5kIGluIHRoZSBsYXJnZUFycmF5LlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDEsMSw0LDQsMyw2XTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRVbmlxdWUoeCk7XHJcbiAqIC8vIHJldHVybnMgWyBcIjFcIiwgXCI0XCIsIFwiM1wiLCBcIjZcIiBdXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gW1wiYmlsbFwiLCBcImZyZWRcIiwgXCJqYW5lXCIsIFwiZnJlZFwiXTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRVbmlxdWUoeCk7XHJcbiAqIC8vIHJldHVybnMgW1wiYmlsbFwiLCBcImZyZWRcIiwgXCJqYW5lXCJdXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWyBcclxuICogICAgIFwiYmlsbFwiLFxyXG4gKiAgICAge1wiYVByb3BcIiA6IFwiYVZhbHVlXCJ9LFxyXG4gKiAgICAge1wiYUd1eVwiIDogXCJmcmVkXCJ9LFxyXG4gKiAgICAge1wiYUxhZHlcIiA6IFwiamFuZVwifVxyXG4gKiBdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldFVuaXF1ZSh4KTtcclxuICogLy8gcmV0dXJucyBbIFwiYmlsbFwiLCBcIltvYmplY3QgT2JqZWN0XVwiIF1cclxuICovXHJcbmF0cm9wYS5hcnJheXMuZ2V0VW5pcXVlID0gZnVuY3Rpb24gKGxhcmdlQXJyYXkpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KGxhcmdlQXJyYXkpKS5zb3J0KCk7XHJcbn07XHJcbi8qKlxyXG4gKiBSZW1vdmVzIGVtcHR5IHN0cmluZ3MgZnJvbSB0aGUgZ2l2ZW4gYXJyYXkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheVdpdGhFbXB0eUVsZW1lbnRzIFRoZSBhcnJheSB3aXRoIGVtcHR5IHN0cmluZ3MgaW4gaXQuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSB3aXRoIGVtcHR5IHN0cmluZ3MgcmVtb3ZlZC5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbIDEwLCAsIDUsIFwiXCIsICcnLCA3IF07XHJcbiAqIGNvbnNvbGUubG9nKCdzdGFydGluZyBsZW5ndGggJyArIHgubGVuZ3RoKTtcclxuICogY29uc29sZS5sb2coeCk7XHJcbiAqIHggPSBhdHJvcGEuYXJyYXlzLnJlbW92ZUVtcHR5RWxlbWVudHMoeCk7XHJcbiAqIGNvbnNvbGUubG9nKCdlbmRpbmcgbGVuZ3RoICcgKyB4Lmxlbmd0aCk7XHJcbiAqIGNvbnNvbGUubG9nKHgpO1xyXG4gKiAvLyBkaXNwbGF5cyB0aGUgZm9sbG93aW5nXHJcbiAqIC8vIHN0YXJ0aW5nIGxlbmd0aCA2XHJcbiAqIC8vIFsxMCwgdW5kZWZpbmVkLCA1LCBcIlwiLCBcIlwiLCA3XVxyXG4gKiAvLyBlbmRpbmcgbGVuZ3RoIDNcclxuICogLy8gWzEwLCA1LCA3XVxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5yZW1vdmVFbXB0eUVsZW1lbnRzID0gZnVuY3Rpb24gKGFycmF5V2l0aEVtcHR5RWxlbWVudHMpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIGFycmF5V2l0aEVtcHR5RWxlbWVudHMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuICFhdHJvcGEuaW5xdWlyZS5pc0VtcHR5U3RyaW5nKGl0ZW0pO1xyXG4gICAgfSk7XHJcbn07XHJcbi8qKlxyXG4gKiBSZWluZGV4ZXMgYW4gYXJyYXkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHdpdGggZGlzY29udGludW91cyBrZXlzLlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgd2l0aCBjb250aW51b3VzIGtleXMuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWyBcImFcIiwgXCJiXCIsIFwiY1wiLCB1bmRlZmluZWQgXTtcclxuICogY29uc29sZS5sb2coeCk7IC8vIFsgXCJhXCIsIFwiYlwiLCBcImNcIiwgdW5kZWZpbmVkIF1cclxuICogY29uc29sZS5sb2coeC5sZW5ndGgpOyAvLyA0XHJcbiAqIFxyXG4gKiBkZWxldGUgeFsxXTsgLy8gZGVsZXRlcyB0aGUga2V5IGZyb20gdGhlIGFycmF5IGJ1dFxyXG4gKiAgICAgICAgICAgICAgLy8gdGhlIGFycmF5IGxlbmd0aCByZW1haW5zIHRoZSBzYW1lXHJcbiAqICAgICAgICAgICAgICAvLyBhdCB0aGlzIHBvaW50IHRoZSBhcnJheXMga2V5cyBhcmUgMCwgMiwgYW5kIDNcclxuICogY29uc29sZS5sb2coeCk7IC8vIFsgXCJhXCIsIHVuZGVmaW5lZCwgXCJjXCIsIHVuZGVmaW5lZCBdXHJcbiAqIGNvbnNvbGUubG9nKHgubGVuZ3RoKTsgLy8gNFxyXG4gKiBcclxuICogeCA9IGF0cm9wYS5hcnJheXMucmVpbmRleCh4KTtcclxuICogY29uc29sZS5sb2coeCk7IC8vICBbIFwiYVwiLCBcImNcIiwgdW5kZWZpbmVkIF1cclxuICogICAgLy8gbm90ZSB0aGF0IHRoZSBsYXN0IGVsZW1lbnQgZXhpc3RlZCBpbiB0aGUgYXJyYXksIGl0cyB2YWx1ZSB3YXNcclxuICogICAgLy8gdW5kZWZpbmVkIGJ1dCBpdCBkaWQgaGF2ZSBhIGtleSBzbyB0aGUgZWxlbWVudCByZW1haW5zIGluIHRoZSBhcnJheS5cclxuICogICAgLy9cclxuICogICAgLy8gVGhlIGRlbGV0ZWQgZWxlbWVudCB3YXMgaW4gZmFjdCBkZWxldGVkIGZyb20gdGhlIGFycmF5IHNvIHRoZXJlIHdhcyBub1xyXG4gKiAgICAvLyBrZXkgeFsxXSBhdCBhbGwsIHdoZW4gdHJ5aW5nIHRvIGFjY2VzcyB0aGlzIG5vbiBleGlzdGluZyBlbGVtZW50IHRoZVxyXG4gKiAgICAvLyB2YWx1ZSBvZiB1bmRlZmluZWQgd2FzIHJldHVybmVkLiBUaGlzIGJlaGF2aW9yIGlzIGNvbmZ1c2luZyB1bmxlc3MgeW91XHJcbiAqICAgIC8vIHRoaW5rIGFib3V0IHRoZSBhcnJheWFzIGFuIG9iamVjdCB3aG9zZSBwcm9wZXJ0aWVzIGFyZSBuYW1lZCBieVxyXG4gKiAgICAvLyBudW1iZXJzLiBBY2Nlc3NpbmcgYW4gdW5kZWZpbmVkIHByb3BlcnR5IHJldHVybnMgdW5kZWZpbmVkIHJlZ2FyZGxlc3NcclxuICogICAgLy8gb2Ygd2hldGhlciB0aGUgcHJvcGVydHkgZXhpc3RlZCBpbiB0aGUgcGFzdCBvciBub3QuXHJcbiAqIGNvbnNvbGUubG9nKHgubGVuZ3RoKTsgLy8gM1xyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5yZWluZGV4ID0gZnVuY3Rpb24gcmVpbmRleChhcnIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIGlkeCwgb3V0O1xyXG4gICAgb3V0ID0gW107XHJcbiAgICBmb3IoaWR4IGluIGFycikge1xyXG4gICAgICAgIGlmKGFyci5oYXNPd25Qcm9wZXJ0eShpZHgpKSB7XHJcbiAgICAgICAgICAgIG91dC5wdXNoKGFycltpZHhdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0O1xyXG59O1xyXG4vKipcclxuICogU29ydHMgYW4gYXJyYXkncyBlbGVtZW50cyBudW1lcmljYWxseS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTIwXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgdG8gc29ydC4gQWxsIGVsZW1lbnRzIG9mIHRoZSBhcnJheSBtdXN0IGJlXHJcbiAqICBudW1iZXItaXNoLlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgd2hvc2UgZWxlbWVudHMgYXJlIGluIG51bWVyaWMgb3JkZXIuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzMsIDIsIDksIDI2LCAxMCwgMSwgOTksIDE1XTtcclxuICogY29uc29sZS5sb2coIGF0cm9wYS5hcnJheXMuc29ydE51bWVyaWNhbGx5KHgpICk7XHJcbiAqIC8vIGxvZ3MgWzEsIDIsIDMsIDksIDEwLCAxNSwgMjYsIDk5XVxyXG4gKi9cclxuYXRyb3BhLmFycmF5cy5zb3J0TnVtZXJpY2FsbHkgPSBmdW5jdGlvbiBzb3J0TnVtZXJpY2FsbHkoYXJyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBhcnIuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgIHJldHVybiAoYSAtIGIpO1xyXG4gICAgfSk7XHJcbn07XHJcbi8qKlxyXG4gKiBUaHJvd3MgYW4gZXJyb3IsIDxjb2RlPlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZTwvY29kZT4gaXMgbm90IFxyXG4gKiAgc3RhbmRhcmRpemVkLlxyXG4gKiBcclxuICogIFllcywgbG9jYWxlQ29tcGFyZSBpcyBpbiB0aGUgc3RhbmRhcmQgYnV0LCBhdCB0aGlzIHRpbWUgdGhlIGFjdHVhbFxyXG4gKiAgY29tcGFyaXNvbiBpcyBpbXBsZW1lbnRhdGlvbiBkZXBlbmRhbnQuIFRoaXMgbWVhbnMgdGhhdCBcImFscGhhYmV0aWNhbCBvcmRlclwiXHJcbiAqICBjYW4gYmUgZGlmZmVyZW50IG9uIGRpZmZlcmVudCBwbGF0Zm9ybXMuIFdoYXQgSSBmb3VuZCB3YXMgdGhhdCBpbiBub2RlIHRoZVxyXG4gKiAgYXJyYXkgb2YgPGNvZGU+WydhJywnWicsJ0EnLCd6J108L2NvZGU+IHdvdWxkIGJlIHNvcnRlZCB0b1xyXG4gKiAgPGNvZGU+WydBJywnWicsJ2EnLCd6XCJdPC9jb2RlPiwgd2hpbGUgb25cclxuICogIGZpcmVmb3ggaXQgd291bGQgYmUgc29ydGVkIHRvIDxjb2RlPlsnYScsJ0EnLCd6JywnWiddPC9jb2RlPi4gV2hvIGtub3dzIGlmXHJcbiAqICBhbm90aGVyIGltcGxlbWVudG9yIHdvdWxkIHNvcnQgaXQgPGNvZGU+WydBJywnYScsJ1onLCd6J108L2NvZGU+P1xyXG4gKiBcclxuICogSW4gb3JkZXIgdG8gcHJvdmlkZSBhIHJlbGlhYmxlIGltcGxlbWVudGF0aW9uIEkgd291bGQgaGF2ZSB0byBjcmVhdGUgbXkgb3duXHJcbiAqICBpbXBsZW1lbnRhdGlvbiBvZiA8Y29kZT5TdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmU8L2NvZGU+IGFuZCB0aGF0J3NcclxuICogIGp1c3QgdG9vIG11Y2ggd29yayBmb3IgbWUgdG8gZG8gYWxvbmUuXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBcIlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZSBpcyBub3Qgc3RhbmRhcmRpemVkXCJcclxuICovXHJcbmF0cm9wYS5hcnJheXMuc29ydEFscGhhYmV0aWNhbGx5ID0gZnVuY3Rpb24gc29ydEFscGhhYmV0aWNhbGx5KGFycikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmUgaXMgbm90IHN0YW5kYXJkaXplZFwiKTtcclxufTtcclxuLyoqXHJcbiAqIERlbGV0ZXMgdGhlIGdpdmVuIGVsZW1lbnQgZnJvbSB0aGUgYXJyYXkgYXQgdGhlIGdpdmVuIGluZGV4LiBJdCBiYXNpY2FsbHlcclxuICogIGRvZXMgd2hhdCB5b3Ugd291bGQgZXhwZWN0IHRoZSBkZWxldGUgb3BlcmF0b3IgdG8gZG8sIGV4Y2VwdCB0aGUgZGVsZXRlXHJcbiAqICBvcGVyYXRvciBkb2Vzbid0IGRvIHdoYXQgeW91IHdvdWxkIGV4cGVjdC5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheS5cclxuICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCB0byBkZWxldGUuXHJcbiAqIEByZXR1cm5zIFJldHVybnMgYW4gYXJyYXkgd2l0aCB0aGUgZWxlbWVudCByZW1vdmVkLCBjb250aWd1b3VzIGtleXMsIGFuZFxyXG4gKiAgd2hvc2UgbGVuZ3RoIGlzIDEgbGVzcyB0aGFuIHRoZSBpbnB1dCBhcnJheS5cclxuICovXHJcbmF0cm9wYS5hcnJheXMuZGVsZXRlRWxlbWVudCA9IGZ1bmN0aW9uIChhcnIsIGluZGV4KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGRlbGV0ZSBhcnJbaW5kZXhdO1xyXG4gICAgcmV0dXJuIGF0cm9wYS5hcnJheXMucmVpbmRleChhcnIpO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgWFBhdGhSZXN1bHQgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuLyoqXHJcbiAqIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICovXHJcbnZhciBhdHJvcGEgPSB7fTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHRoaXMgY2xhc3MgaGFzIGJlZW4gbWFya2VkIGFzIHVuc3VwcG9ydGVkIGFuZCB0aHJvd3MgYW4gXHJcbiAqICBlcnJvciBpZiBpdCBoYXMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDMwOFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lIFRoZSBuYW1lIG9mIHRoZSBjbGFzcy5cclxuICogQHBhcmFtIHtTdHJpbmd9IGVycm9yTWVzc2FnZSBPcHRpb25hbC4gQSBjdXN0b20gZXJyb3IgbWVzc2FnZS4gRGVmYXVsdHMgdG9cclxuICogIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uZXJyb3JcclxuICovXHJcbmF0cm9wYS5zdXBwb3J0Q2hlY2sgPSBmdW5jdGlvbiAoY2xhc3NOYW1lLCBlcnJvck1lc3NhZ2UpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgY2xhc3NOYW1lID0gU3RyaW5nKGNsYXNzTmFtZSk7XHJcbiAgICBlcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2UgfHwgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5lcnJvcjtcclxuICAgIGVycm9yTWVzc2FnZSA9IFN0cmluZyhlcnJvck1lc3NhZ2UpO1xyXG4gICAgXHJcbiAgICBpZihhdHJvcGEuZGF0YVtjbGFzc05hbWVdLnN1cHBvcnQgPT09ICd1bnN1cHBvcnRlZCcpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgIH1cclxufTtcclxuLyoqXHJcbiAqIFB1c2hlcyBhIHJlcXVpcmVtZW50IGNoZWNrIGludG8gYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLiBUaGUgdGVzdFxyXG4gKiAgdGVzdHMgd2hldGhlciB0aGUgY2xhc3MgaXMgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuIFNldHNcclxuICogIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0ncyBzdXBwb3J0IHRvIHVuc3VwcG9ydGVkIGFuZCBlcnJvciB0byBlcnJvck1lc3NhZ2VcclxuICogIGlmIHRoZSByZXF1aXJlbWVudEZuIHJldHVybnMgZmFsc2UuIFRoZSByZXF1aXJlbWVudCBjaGVja3Mgd2lsbCBhbGwgYmUgcnVuXHJcbiAqICBhZnRlciB0aGUgbGlicmFyeSBoYXMgbG9hZGVkLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMDhcclxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZSBUaGUgbmFtZSBvZiB0aGUgY2xhc3MuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlcXVpcmVtZW50Rm4gQSBmdW5jdGlvbiB0byB0ZXN0IHdoZXRoZXIgb3Igbm90IHRoZSBjbGFzc1xyXG4gKiAgaXMgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuIElmIHN1cHBvcnRlZCwgcmV0dXJucyB0cnVlIG90aGVyd2lzZVxyXG4gKiAgcmV0dXJuIGZhbHNlLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXJyb3JNZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlIHRvIHVzZSB3aGVuIHRoaXMgY2xhc3Mgb3IgaXRzXHJcbiAqICBtZXRob2RzIGFyZSBjYWxsZWQgaW4gdW5zdXBwb3J0ZWQgZW52aXJvbm1lbnRzLiBEZWZhdWx0cyB0bzpcclxuICogICdUaGUgYXRyb3BhLicgKyBjbGFzc05hbWUgKyAnIGNsYXNzIGlzIHVuc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuJztcclxuICovXHJcbmF0cm9wYS5yZXF1aXJlcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUsIHJlcXVpcmVtZW50Rm4sIGVycm9yTWVzc2FnZSkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgY2hlY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRlc3QgPSBmYWxzZTtcclxuICAgICAgICBpZih0eXBlb2YgY2xhc3NOYW1lICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2F0cm9wYS5yZXF1aXJlcyByZXF1aXJlcyB0aGUgY2xhc3MgbmFtZSB0byBiZSAnICtcclxuICAgICAgICAgICAgICAgICdzcGVjaWZpZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoYXRyb3BhLmRhdGFbY2xhc3NOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0gPSB7fTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiByZXF1aXJlbWVudEZuICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlbWVudEZuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlIHx8ICdUaGUgYXRyb3BhLicgKyBjbGFzc05hbWUgK1xyXG4gICAgICAgICAgICAgICAgICAgICcgY2xhc3MgaXMgdW5zdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4nO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGVzdCA9IHJlcXVpcmVtZW50Rm4oKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGVzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLmVycm9yID0gZXJyb3JNZXNzYWdlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodGVzdCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uc3VwcG9ydCA9ICd1bnN1cHBvcnRlZCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucHVzaChjaGVjayk7XHJcbn07XHJcbi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGdvYmFsIGRhdGEgcmVsYXRlZCB0byB0aGUgY2xhc3NlcyBhbmQgZnVuY3Rpb25zLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGdvYmFsIGRhdGEgcmVsYXRlZCB0byB0aGUgY2xhc3NlcyBhbmQgZnVuY3Rpb25zLlxyXG4gKi9cclxuYXRyb3BhLmRhdGEgPSB7fTtcclxuXHJcbmF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cyA9IFtdO1xyXG5cclxuYXRyb3BhLm5vcCA9IGZ1bmN0aW9uIG5vcCAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuXHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuLyoqXHJcbiAqIENvbnRhaW5lciBmb3IgZnVuY3Rpb25zIHRoYXQgdGVzdCB0aGUgc3RhdGUgb2YgaW5wdXRzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGZ1bmN0aW9ucyB0aGF0IHRlc3QgdGhlIHN0YXRlIG9mIGlucHV0cy5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlID0ge307XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgaXMgbnVsbC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7TWl4ZWR9IHggQW55IGlucHV0IHRoYXQgbWF5IG9yIG1heSBub3QgYmUgbnVsbC5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB4ID09PSBudWxsLlxyXG4gKi9cclxuYXRyb3BhLmlucXVpcmUuaXNOdWxsID0gZnVuY3Rpb24gKHgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuICh4ID09PSBudWxsKTtcclxufTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBhbiBvYmplY3QuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge01peGVkfSB4IEFueSBpbnB1dCB0aGF0IG1heSBvciBtYXkgbm90IGJlIGFuIG9iamVjdC5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0eXBlb2YoeCkgPT09ICdvYmplY3QnLlxyXG4gKi9cclxuYXRyb3BhLmlucXVpcmUuaXNPYmplY3QgPSBmdW5jdGlvbiAoeCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gKHR5cGVvZiB4ID09PSAnb2JqZWN0Jyk7XHJcbn07XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgaXMgYm90aCBhbiBvYmplY3QgYW5kIG5vdCBudWxsLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtNaXhlZH0geCBBbnkgaW5wdXQgdGhhdCBtYXkgb3IgbWF5IG5vdCBiZSBib3RoIGFuXHJcbiAqIG9iamVjdCBhbmQgbnVsbC5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB4IGlzIGJvdGggYW4gb2JqZWN0IGFuZFxyXG4gKiBub3QgbnVsbC4gKG51bGwgaXMgYW4gb2JqZWN0KS5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlLmlzT2JqZWN0Tm90TnVsbCA9IGZ1bmN0aW9uICh4KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBhdHJvcGEuaW5xdWlyZS5pc09iamVjdCh4KSAmJiAoIWF0cm9wYS5pbnF1aXJlLmlzTnVsbCh4KSk7XHJcbn07XHJcbi8qKlxyXG4gKiBDaGVja3MgYW4gb2JqZWN0IGZvciB0aGUgZXhpc3RlbmNlIG9mIGEgcHJvcGVydHlcclxuICogcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoZSBwcm9wZXJ0eSB3YXMgaW5oZXJpdGVkXHJcbiAqIG9yIG5vdC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQW4gb2JqZWN0IHdoaWNoIG1heSBvciBtYXkgbm90XHJcbiAqIGhhdmUgdGhlIHByb3BlcnR5IGlkZW50aWZpZWQgYnkgcHJvcC5cclxuICogQHBhcmFtIHtTdHJpbmd9IHByb3AgQSBzdHJpbmcgdmFsdWUgcmVwcmVzZW50aW5nIHRoZVxyXG4gKiBuYW1lIG9mIHRoZSBwcm9wZXJ0eS5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBvYmoucHJvcCBleGlzdHMsXHJcbiAqIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlLlxyXG4gKi9cclxuYXRyb3BhLmlucXVpcmUuaGFzUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqLCBwcm9wKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGlmIChhdHJvcGEuaW5xdWlyZS5pc09iamVjdE5vdE51bGwob2JqKSkge1xyXG4gICAgICAgIHJldHVybiAocHJvcCBpbiBvYmopO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IGlzIGFuIGVtcHR5IHN0cmluZy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyB5b3Ugd2FudCB0byBrbm93IGFib3V0XHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgc3RyIGlzIGFuIGVtcHR5IHN0cmluZyxcclxuICogIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlLlxyXG4gKi9cclxuYXRyb3BhLmlucXVpcmUuaXNFbXB0eVN0cmluZyA9IGZ1bmN0aW9uIChzdHIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIG91dCA9IGZhbHNlO1xyXG4gICAgaWYgKCcnID09PSBzdHIpIHtcclxuICAgICAgICBvdXQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dDtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogQ29udGFpbmVyIGZvciByZWdleCBmdW5jdGlvbnMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgcmVnZXggZnVuY3Rpb25zLlxyXG4gKi9cclxuYXRyb3BhLnJlZ2V4ID0ge307XHJcbi8qKlxyXG4gKiBSZWdleCBwYXR0ZXJuc1xyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBSZWdleCBwYXR0ZXJucy5cclxuICovXHJcbmF0cm9wYS5yZWdleC5wYXR0ZXJucyA9IHtcclxuICAgIC8qKlxyXG4gICAgICogZmluZHMgcmVwZWF0ZWQgd29yZHMgYW5kIHBocmFzZXNcclxuICAgICAqIEB0eXBlIFJlZ0V4cFxyXG4gICAgICovXHJcbiAgICByZXBlYXRlZFdvcmRzIDogLyhcXGIuezMsfVxcYilcXHMqKFxcMSkvZyxcclxuICAgIC8qKlxyXG4gICAgICogZmluZHMgcGFyYWdyYXBoIGJyZWFrc1xyXG4gICAgICogQHR5cGUgUmVnRXhwXHJcbiAgICAgKi9cclxuICAgIHBhcmFncmFwaEJyZWFrcyA6IC8oXFxyXFxuXFxyXFxufFxcblxcbnxcXHJcXHIpL2csXHJcbiAgICAvKipcclxuICAgICAqIGZpbmRzIGxpbmUgYnJlYWtzXHJcbiAgICAgKiBAdHlwZSBSZWdFeHBcclxuICAgICAqL1xyXG4gICAgbGluZUJyZWFrcyA6IC8oXFxyXFxufFxccnxcXG4pL2dcclxufTtcclxuLyoqXHJcbiAqIEFwcGVuZHMgY29tbW9uIHByZWZpeCwgc3VmZml4LCBhbmQgd29yZCBib3VuZGFyeSByZWdleCBzdHJpbmdzIHRvXHJcbiAqIHRoZSBzdXBwbGllZCB3b3JkLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMTBcclxuICogQHBhcmFtIHtTdHJpbmd9IHdvcmQgVGhlIHdvcmQgdG8gYXBwZW5kIHByZWZpeCBhbmQgc3VmZml4IHRvXHJcbiAqIEBwYXJhbSB7SW50ZWdlcn0gdGhyZXNob2xkIFRoZSB3b3JkLmxlbmd0aCBhdCB3aGljaCBpdCBkb2VzIG5vdFxyXG4gKiBtYWtlIHNlbnNlIHRvIGFwcGVuZCBwcmVmaXggYW5kIHN1ZmZpeC4gRGVmYXVsdHMgdG8gMy5cclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgc3VwcGxpZWQgd29yZCB3aXRoIHByZWZpeCwgc3VmZml4LFxyXG4gKiBhbmQgd29yZCBib3VuZGFyaWVzIGF0dGFjaGVkLiBJZiB0aGUgd29yZC5sZW5ndGggd2FzIG5vdCBncmVhdGVyXHJcbiAqIHRoYW4gdGhlIHRocmVzaG9sZCwgb25seSB3b3JkIGJvdW5kYXJpZXMgYXJlIGF0dGFjaGVkLiBUaGUgc3RyaW5nXHJcbiAqIHJlcHJlc2VudHMgYSBSZWdFeCB3aGljaCBzaG91bGQgcGljayBvdXQgbW9zdCBmb3JtcyBvZiByZWd1bGFyXHJcbiAqIHdvcmRzLlxyXG4gKi9cclxuYXRyb3BhLnJlZ2V4LmFwcGVuZFByZWZpeGVzQW5kU3VmZml4ZXMgPSBmdW5jdGlvbiAod29yZCwgdGhyZXNob2xkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBwcmVmaXhlcyxcclxuICAgIHN1ZmZpeGVzO1xyXG4gICAgcHJlZml4ZXMgPSAnKHByZXx1bnxyZSk/JztcclxuICAgIHN1ZmZpeGVzID0gJyhpZmljYXRpb258JyArXHJcbiAgICAgICAgICAgICAgICAndGlvbmFsbHl8JyArXHJcbiAgICAgICAgICAgICAgICAnaWNhdGlvbnwnICtcclxuICAgICAgICAgICAgICAgICdpZmllZHxpc3RpY3xpbmVzc3wnICtcclxuICAgICAgICAgICAgICAgICdmYXJlfHRpb258YW5jZXxlbmNlfGxlc3N8YWxseXxhYmxlfG5lc3N8aXplZHxpc2VkfCcgK1xyXG4gICAgICAgICAgICAgICAgJ291c3xpZnl8aW5nfGl0eXxmdWx8YW50fGF0ZXxlc3R8aXNtfGl6bXxpc3R8JyArXHJcbiAgICAgICAgICAgICAgICAnaWN8YWx8ZWR8ZXJ8ZXR8bHl8cnN8aW58JyArXHJcbiAgICAgICAgICAgICAgICAneXxzfHJ8ZCk/JztcclxuICAgIFxyXG4gICAgdGhyZXNob2xkID0gdGhyZXNob2xkID09PSB1bmRlZmluZWQgPyAzIDogdGhyZXNob2xkO1xyXG4gICAgXHJcbiAgICBpZiAod29yZC5sZW5ndGggPiB0aHJlc2hvbGQpIHtcclxuICAgICAgICB3b3JkID0gJ1xcXFxiJyArIHByZWZpeGVzICsgd29yZCArIHN1ZmZpeGVzICsgJ1xcXFxiJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgd29yZCA9ICdcXFxcYigpJyArIHdvcmQgKyAnKClcXFxcYic7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gd29yZDtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogU2V0IGRlZmF1bHQgdmFsdWVzIGZvciBvcHRpb25hbCBmdW5jdGlvbiBwYXJhbWV0ZXJzLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiA8cHJlPlxyXG4gKiAgIC8vIFRvIHNldCBhIGRlZmF1bHQgdmFsdWUgZm9yIGFuIG9wdGlvbmFsIHBhcmFtZXRlclxyXG4gKiAgIGZ1bmN0aW9uKG9wdGlvbmFsQXJnKSB7XHJcbiAqICAgICAgIHZhciBkZWZhdWx0VmFsID0gJ2hlbGxvIHRoZXJlISc7XHJcbiAqICAgICAgIG9wdGlvbmFsQXJnID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoZGVmYXVsdFZhbCwgb3B0aW9uYWxBcmcpO1xyXG4gKiAgICAgICByZXR1cm4gb3B0aW9uYWxBcmc7XHJcbiAqICAgfVxyXG4gKiA8L3ByZT5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7TWl4ZWR9IGRlZmF1bHRWYWwgVGhlIGRlZmF1bHQgdmFsdWUgdG8gc2V0LlxyXG4gKiBAcGFyYW0ge01peGVkfSBvcHRpb25hbEFyZyBBIHJlZmVyZW5jZSB0byB0aGUgb3B0aW9uYWwgYXJndW1lbnQuXHJcbiAqIEByZXR1cm5zIHtNaXhlZH0gUmV0dXJucyB0aGUgZGVmYXVsdCB2YWx1ZSBzdXBwbGllZCB3aGVuIHRoZSBvcHRpb25hbFxyXG4gKiBhcmd1bWVudCBpcyB1bmRlZmluZWQgb3IgbnVsbC4gT3RoZXJ3aXNlLCB0aGUgc3VwcGxpZWQgb3B0aW9uYWwgYXJndW1lbnRcclxuICogaXMgcmV0dXJuZWQuXHJcbiAqL1xyXG5hdHJvcGEuc2V0QXNPcHRpb25hbEFyZyA9IGZ1bmN0aW9uIChkZWZhdWx0VmFsLCBvcHRpb25hbEFyZykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBpZiAob3B0aW9uYWxBcmcgPT09IHVuZGVmaW5lZCB8fCBvcHRpb25hbEFyZyA9PT0gbnVsbCkge1xyXG4gICAgICAgIG9wdGlvbmFsQXJnID0gZGVmYXVsdFZhbDtcclxuICAgIH1cclxuICAgIHJldHVybiBvcHRpb25hbEFyZztcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuYXRyb3BhLnJlZ2V4ID0gcmVxdWlyZSgnYXRyb3BhLXJlZ2V4JykucmVnZXg7XHJcbmF0cm9wYS5hcnJheXMgPSByZXF1aXJlKCdhdHJvcGEtYXJyYXlzJykuYXJyYXlzO1xyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBBIGZldyB1dGlsaXRpZXMgZm9yIG1hbmlwdWxhdGluZyBzdHJpbmdzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBBIGZldyB1dGlsaXRpZXMgZm9yIG1hbmlwdWxhdGluZyBzdHJpbmdzLlxyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLnJlZ2V4LnBhdHRlcm5zXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nID0ge307XHJcbi8qKlxyXG4gKiBSZXBsYWNlcyByZXBlYXRlZCB3b3JkcyBhbmQgcGhyYXNlcyB3aXRoIGEgc2luZ2xlIHdvcmQgb3IgcGhyYXNlLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzA3MDFcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIHJlbW92ZSByZXBlYXRlZCB3b3JkcyBmcm9tLlxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBnaXZlbiBzdHJpbmcgd2l0aCByZXBlYXRlZCB3b3JkcyBhbmRcclxuICogIHBocmFzZXMgcmVtb3ZlZC5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcucmVtb3ZlUmVwZWF0ZWRXb3JkID0gZnVuY3Rpb24gcmVtb3ZlUmVwZWF0ZWRXb3JkIChzdHJpbmcpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGF0cm9wYS5yZWdleC5wYXR0ZXJucy5yZXBlYXRlZFdvcmRzLCAnJDEnKTtcclxufTtcclxuLyoqXHJcbiAqIENyZWF0ZXMgcGFyYWdyYXBoIGJyZWFrcyBhdCBldmVyeSBvY2N1cnJlbmNlIG9mIHR3byBjb25zZWN1dGl2ZSBsaW5lIGJyZWFrcy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwNzAxXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBpbnNlcnQgcGFyYWdyYXBoIHRhZ3MgaW50by5cclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgZ2l2ZW4gc3RyaW5nIHdpdGggcGFyYWdyYXBoIGJyZWFrcyBpbnNlcnRlZC5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcubGluZUJyZWFrc1RvUGFyYWdyYXBoVGFncyA9IGZ1bmN0aW9uIGxpbmVCcmVha3NUb1BhcmFncmFwaFRhZ3MgKHN0cmluZykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgb3V0ID0gc3RyaW5nLnJlcGxhY2UoYXRyb3BhLnJlZ2V4LnBhdHRlcm5zLnBhcmFncmFwaEJyZWFrcywgJzwvcD48cD4nKTtcclxuICAgIG91dCA9ICc8cD4nICsgb3V0LnRyaW0oKSArICc8L3A+JztcclxuICAgIG91dCA9IG91dC5yZXBsYWNlKC9cXHMrPFxcLyhwfGJyKT4vZywgJzwvJDE+Jyk7XHJcbiAgICByZXR1cm4gb3V0O1xyXG59O1xyXG4vKipcclxuICogQ3JlYXRlcyBicmVhayB0YWdzIGF0IGV2ZXJ5IGxpbmUgYnJlYWsuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDcwMVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gaW5zZXJ0IGJyZWFrIHRhZ3MgaW50by5cclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgZ2l2ZW4gc3RyaW5nIHdpdGggYnJlYWsgdGFncyBpbnNlcnRlZC5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcubGluZUJyZWFrc1RvQnJlYWtUYWdzID0gZnVuY3Rpb24gbGluZUJyZWFrc1RvQnJlYWtUYWdzIChzdHJpbmcpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGF0cm9wYS5yZWdleC5wYXR0ZXJucy5saW5lQnJlYWtzLCAnPGJyPicpO1xyXG59O1xyXG4vKipcclxuICogTm9ybWFsaXplcyBsaW5lIGJyZWFrcyB0byBgXFxuYC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwNzAxXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBub3JtYWxpemUuXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIGdpdmVuIHN0cmluZyB3aXRoIG5vcm1hbGl6ZWQgbGluZSBicmVha3MuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLm5vcm1hbGl6ZUVvbCA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUVvbCAoc3RyaW5nKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShhdHJvcGEucmVnZXgucGF0dGVybnMubGluZUJyZWFrcywgJ1xcbicpO1xyXG59O1xyXG4vKipcclxuICogQ29udmVydHMgdGhlIGZpcnN0IGNoYXJhY3RlciBvZiBhIGdpdmVuIHN0cmluZyB0b1xyXG4gKiB1cHBlcmNhc2UuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgZm9yIHdoaWNoIHlvdSB3YW50IHRoZVxyXG4gKiBmaXJzdCBsZXR0ZXIgdG8gYmUgaW4gdXBwZXIgY2FzZS5cclxuICogQHJldHVybnMge1N0cmluZ30gVGhlIGdpdmVuIHN0cmluZyB3aXRoIGl0J3MgZmlyc3QgbGV0dGVyIGNhcGl0YWxpemVkLlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy51Y0ZpcnN0ID0gZnVuY3Rpb24gdWNGaXJzdChzdHJpbmcpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgc3RyaW5nID0gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xyXG4gICAgcmV0dXJuIHN0cmluZztcclxufTtcclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoZSBnaXZlbiBzdHJpbmcgdG8gY2FtZWwgY2FzZS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwODIzXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBjYW1lbGl6ZS5cclxuICogQHJldHVybnMge1N0cmluZ30gVGhlIGNhbWVsaXplZCBzdHJpbmcuXHJcbiAqIEBleGFtcGxlXHJcbiAqICBhdHJvcGEuc3RyaW5nLmNhbWVsaXplKCdnZXQgaXQgdG9nZXRoZXInKTtcclxuICogIC8vIHJldHVybnMgXCJnZXRJdFRvZ2V0aGVyXCJcclxuICovXHJcbmF0cm9wYS5zdHJpbmcuY2FtZWxpemUgPSBmdW5jdGlvbiBjYW1lbGl6ZSAoc3RyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBhcnIsIG91dDtcclxuICAgIGFyciA9IHN0ci5zcGxpdCgnICcpO1xyXG4gICAgb3V0ID0gYXJyLnNoaWZ0KCk7XHJcbiAgICBhcnIgPSBhcnIubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuIGF0cm9wYS5zdHJpbmcudWNGaXJzdChpdGVtKTtcclxuICAgIH0pO1xyXG4gICAgb3V0ICs9IGFyci5qb2luKCcnKTtcclxuICAgIHJldHVybiBvdXQ7XHJcbn07XHJcbi8qKlxyXG4gKiBDb3VudHMgd29yZHMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDMxM1xyXG4gKiBAcGFyYW0ge1N0cmluZ30gc29tZVRleHQgUGxhaW4gdGV4dC5cclxuICogQHJldHVybiB7TnVtYmVyfSBSZXR1cm5zIHRoZSBjb3VudCBvZiB3b3JkcyBpbiBzb21lVGV4dC5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcuY291bnRXb3JkcyA9IGZ1bmN0aW9uIGNvdW50V29yZHMoc29tZVRleHQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHdvcmRDb3VudCwgcmUsIGxlbiA9IDA7XHJcbiAgICBpZihzb21lVGV4dCAhPT0gdW5kZWZpbmVkICYmIHNvbWVUZXh0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgc29tZVRleHQgPSBzb21lVGV4dC50cmltKCk7XHJcbiAgICAgICAgaWYoc29tZVRleHQgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHdvcmRDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHJlID0gL1xccysvZ2k7XHJcbiAgICAgICAgICAgIHdvcmRDb3VudCA9IHNvbWVUZXh0LnNwbGl0KHJlKTtcclxuICAgICAgICAgICAgbGVuID0gd29yZENvdW50Lmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGVuO1xyXG59O1xyXG4vKipcclxuICogQ29udmVydHMgZW5kIG9mIGxpbmUgbWFya2VycyBpbnRvIHdoYXRldmVyIHlvdSB3YW50LiBcclxuICogQXV0b21hdGljYWxseSBkZXRlY3RzIGFueSBvZiBcXHJcXG4sIFxcbiwgb3IgXFxyIGFuZCBcclxuICogcmVwbGFjZXMgaXQgd2l0aCB0aGUgdXNlciBzcGVjaWZpZWQgRU9MIG1hcmtlci5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHlvdSB3YW50IHByb2Nlc3NlZC5cclxuICogQHBhcmFtIHtTdHJpbmd9IG5ld0VPTCBUaGUgcmVwbGFjZW1lbnQgZm9yIHRoZSBjdXJyZW50IEVPTCBtYXJrcy5cclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgcHJvY2Vzc2VkIHRleHQuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLmNvbnZlcnRFb2wgPSBmdW5jdGlvbiBjb252ZXJ0RU9MKHRleHQsIG5ld0VPTCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgcmV0dXJuIHRleHQucmVwbGFjZShhdHJvcGEucmVnZXgucGF0dGVybnMubGluZUJyZWFrcywgbmV3RU9MKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGEgcXVhbnRpdHkgb2YgbGVhZGluZyBzcGFjZXMgc3BlY2lmaWVkIGJ5IG9mZnNldC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIHByb2Nlc3MuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXQgVGhlIGFtb3VudCBvZiBzcGFjZXMgeW91IHdhbnQgcmVtb3ZlZCBcclxuICogZnJvbSB0aGUgYmVnaW5uaW5nIG9mIHRoZSB0ZXh0LlxyXG4gKiBAcmV0dXJucyBSZXR1cm5zIHRoZSBwcm9jZXNzZWQgdGV4dC5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcub2Zmc2V0V2hpdGVTcGFjZSA9IGZ1bmN0aW9uIG9mZnNldFdoaXRlU3BhY2UodGV4dCwgb2Zmc2V0KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB2YXIgcmVneDtcclxuICAgIHJlZ3ggPSBuZXcgUmVnRXhwKCdeIHsnICsgb2Zmc2V0ICsgJ30nKTtcclxuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UocmVneCwgJycpO1xyXG4gICAgcmV0dXJuIHRleHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgYWxsIHRhYnMgaW4gbGVhZGluZyB3aGl0ZXNwYWNlIGludG8gZm91ciBzcGFjZXMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCB0byBwcm9jZXNzXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIHByb2Nlc3NlZCB0ZXh0LlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5ub3JtYWxpemVXaGl0ZVNwYWNlUHJlZml4ID0gZnVuY3Rpb24gbm9ybWFsaXplV2hpdGVTcGFjZVByZWZpeChcclxuICAgIHRleHRcclxuKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB2YXIgcHJlZml4ID0gdGV4dC5tYXRjaCgvXlxccyovKTtcclxuICAgIGlmKHByZWZpeCkge1xyXG4gICAgICAgIHByZWZpeCA9IHByZWZpeFswXTtcclxuICAgICAgICBwcmVmaXggPSBwcmVmaXgucmVwbGFjZSgvXFx0L2csICcgICAgJyk7XHJcbiAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXlxccyovLCBwcmVmaXgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRleHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydHMgYWxsIHRhYnMgaW50byBmb3VyIHNwYWNlcy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIHByb2Nlc3NcclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgcHJvY2Vzc2VkIHRleHQuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLm5vcm1hbGl6ZVdoaXRlU3BhY2UgPSBmdW5jdGlvbiBub3JtYWxpemVXaGl0ZVNwYWNlKHRleHQpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcdC9nLCAnICAgICcpO1xyXG4gICAgcmV0dXJuIHRleHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogQ291bnRzIHRoZSBudW1iZXIgb2YgbGVhZGluZyBzcGFjZSBvciB0YWIgY2hhcmFjdGVycyBidXQgbm90IGJvdGguXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCB0byBhbmFseXplLlxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIHRoZSBxdWFudGl0eSBvZiBsZWFkaW5nIHNwYWNlcyBvciB0YWJzLlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5nZXRPZmZzZXQgPSBmdW5jdGlvbiBnZXRPZmZzZXQodGV4dCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgdmFyIG9mZnNldCA9IDAsXHJcbiAgICAgICAgbGVhZGluZ0NoYXIgPSB0ZXh0LmNoYXJBdCgwKTtcclxuICAgICAgICBcclxuICAgIGlmKCBsZWFkaW5nQ2hhciA9PT0gJyAnIHx8IGxlYWRpbmdDaGFyID09PSAnXFx0Jykge1xyXG4gICAgICAgIHdoaWxlKHRleHQuY2hhckF0KG9mZnNldCkgPT09IGxlYWRpbmdDaGFyICYmIG9mZnNldCA8IHRleHQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIG9mZnNldCsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvZmZzZXQ7XHJcbn07XHJcbi8qKlxyXG4gKiBCcmVha3MgYSBzdHJpbmcgaW50byBhbiBhcnJheSBvZiB3b3Jkcy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIGFuYWx5emUuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiB0aGUgd29yZHMgaW5cclxuICogIHRoZSBnaXZlbiB0ZXh0LlxyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLmFycmF5cy5yZW1vdmVFbXB0eUVsZW1lbnRzXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLmdldFdvcmRzID0gZnVuY3Rpb24gKHRleHQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIG91dCA9IFtdO1xyXG4gICAgZnVuY3Rpb24gaW52YWxpZENoYXJzKGVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgbWF0Y2hlZCA9IC9eW1xcLSfigJlgXSskLy50ZXN0KGVsZW1lbnQpO1xyXG4gICAgICAgIC8vIGludmVydCB0aGUgcmVzdWx0IG9mIHRlc3QuIHRocm93IG91dCBlbGVtZW50cyB0aGF0IG1hdGNoLlxyXG4gICAgICAgIHJldHVybiAhbWF0Y2hlZDtcclxuICAgIH1cclxuICAgIG91dCA9IGF0cm9wYS5hcnJheXMucmVtb3ZlRW1wdHlFbGVtZW50cyhcclxuICAgICAgICB0ZXh0LnNwbGl0KC9bXkEtWmEtelxcLSfigJlgXSsvZ2kpXHJcbiAgICApO1xyXG4gICAgb3V0ID0gb3V0LmZpbHRlcihpbnZhbGlkQ2hhcnMpO1xyXG4gICAgcmV0dXJuIG91dDtcclxufTtcclxuLyoqXHJcbiAqIEVzY2FwZXMgPGNvZGU+Q0RBVEE8L2NvZGU+IHNlY3Rpb25zIGluIHRleHRcclxuICogIHNvIHRoYXQgdGhlIHRleHQgbWF5IGJlIGVtYmVkZGVkIGludG8gYSBcclxuICogIDxjb2RlPkNEQVRBPC9jb2RlPiBzZWN0aW9uLiBUaGlzIHNob3VsZCBiZSBydW5cclxuICogIG9uIGFueSB0ZXh0IHdoaWNoIG1heSBjb250YWluIHRoZSBzdHJpbmcgXHJcbiAqICA8Y29kZT5dXT48L2NvZGU+IHNpbmNlIHNhaWQgc3RyaW5nIHdpbGwgZWZmZWN0aXZlbHlcclxuICogIGVuZCB0aGUgPGNvZGU+Q0RBVEE8L2NvZGU+IHNlY3Rpb24gcHJlbWF0dXJlbHkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCBjb250YWluaW5nIFxyXG4gKiAgPGNvZGU+Q0RBVEE8L2NvZGU+IHNlY3Rpb25zIHRvIGVzY2FwZS5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgc3RyaW5nIHdpdGggZXNjYXBlZFxyXG4gKiAgPGNvZGU+Q0RBVEE8L2NvZGU+IHNlY3Rpb25zLlxyXG4gKiBAc2VlIDxhIGhyZWY9XCJodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NEQVRBI05lc3RpbmdcIj5cclxuICogIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ0RBVEEjTmVzdGluZzwvYT5cclxuICogQHNlZSA8YSBocmVmPVwiaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9OTgxNjhcIj5cclxuICogIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTk4MTY4PC9hPlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5lc2NhcGVDZGF0YSA9IGZ1bmN0aW9uIGVzY2FwZUNkYXRhKHRleHQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIFN0cmluZyh0ZXh0KS5yZXBsYWNlKC9cXF1cXF0+L2csICddXV1dPjwhW0NEQVRBWz4nKTtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwibW9kdWxlLmV4cG9ydHM9e1xyXG4gIFwiYWRhcHRcIjogXCJhZG9wdFwiLFxyXG4gIFwiYWRhcHRhdGlvblwiOiBcImFkYXB0aW9uXCIsXHJcbiAgXCJhZGFwdGVkXCI6IFwiYWRvcHRlZFwiLFxyXG4gIFwiYWRtaW5pc3RlclwiOiBcIm1pbmlzdGVyXCIsXHJcbiAgXCJhZG1pdHRhbmNlXCI6IFwiYWRtaXNzaW9uXCIsXHJcbiAgXCJhZHZpY2VcIjogXCJidWxsc2hpdFwiLFxyXG4gIFwiYWVzdGhldGljXCI6IFwiYXNjZXRpY1wiLFxyXG4gIFwiYWZmZWN0XCI6IFwiZWZmZWN0XCIsXHJcbiAgXCJhZ3JlZW1lbnRcIjogXCJhZ3JlZWFuY2VcIixcclxuICBcImFpZFwiOiBcImFpZGVcIixcclxuICBcImFpZGVcIjogXCJhaWRcIixcclxuICBcImFpclwiOiBcImVyclwiLFxyXG4gIFwiYWlzbGVcIjogXCJpc2xlXCIsXHJcbiAgXCJhbGxcIjogXCJiYWxsXCIsXHJcbiAgXCJhbGxvd2VkXCI6IFwiYWxvdWRcIixcclxuICBcImFsbHVkZVwiOiBcInJlZmVyXCIsXHJcbiAgXCJhbG9uZVwiOiBcImVjc3RhdGljXCIsXHJcbiAgXCJhbG91ZFwiOiBcImFsbG93ZWRcIixcclxuICBcImFsdGVybmF0ZVwiOiBcImFsdGVybmF0aXZlXCIsXHJcbiAgXCJhbHdheXMgbG92ZSB5b3UgdGhlIHNhbWVcIjogXCJhbHdheXMgbG92ZSB5b3UgbGlrZSBteSBvdGhlciBzdWNrZXJzXCIsXHJcbiAgXCJhbHdheXNcIjogXCJ1c3VhbGx5XCIsXHJcbiAgXCJhbSBpXCI6IFwiYXJlIGlcIixcclxuICBcImFtYmlndW91c1wiOiBcImFtYml2YWxlbnRcIixcclxuICBcImFtaWRzdFwiOiBcImFsbCB1cCBpblwiLFxyXG4gIFwiYW1vbmdzdFwiOiBcImFtb25nXCIsXHJcbiAgXCJhbmFseXNpc1wiOiBcImFuYWx5emF0aW9uXCIsXHJcbiAgXCJhbmNpZW50XCI6IFwiZWxkZXJseVwiLFxyXG4gIFwiYW5lY2RvdGVcIjogXCJhbnRpZG90ZVwiLFxyXG4gIFwiYW5nZWxcIjogXCJ3cmVzdGxlclwiLFxyXG4gIFwiYW5nZWxpYyBkZW1vblwiOiBcInZpbGxhbm91cyB3cmVzdGxlclwiLFxyXG4gIFwiYW50XCI6IFwiYXVudFwiLFxyXG4gIFwiYW55d2F5c1wiOiBcImFueXdpc2VcIixcclxuICBcImFwb2NhbHlwc2VcIjogXCJwYXJ0eSB0aW1lXCIsXHJcbiAgXCJhcHByYWlzZVwiOiBcImFwcHJpc2VcIixcclxuICBcImFwcm9wb3NcIjogXCJhcHByb3ByaWF0ZVwiLFxyXG4gIFwiYXJjXCI6IFwiYXJrXCIsXHJcbiAgXCJhcmNhbmVcIjogXCJmb29saXNoXCIsXHJcbiAgXCJhcmR1b3VzXCI6IFwibm90IGVhc3lcIixcclxuICBcImFya1wiOiBcImFyY1wiLFxyXG4gIFwiYXMgd2VsbFwiOiBcImFsc29cIixcclxuICBcImFzcGhpeGlhdGVcIjogXCJmaW5peGlhdGVcIixcclxuICBcImFzc3VyZVwiOiBcImVuc3VyZVwiLFxyXG4gIFwiYXN0aWdtYXRpc21cIjogXCJzdGlnbWF0aXNtXCIsXHJcbiAgXCJhdGVcIjogXCJlaWdodFwiLFxyXG4gIFwiYXR0YWNoZWRcIjogXCJhdHRhY2tlZFwiLFxyXG4gIFwiYXR0aWNcIjogXCJhbnVzXCIsXHJcbiAgXCJhdWRpdGlvblwiOiBcImF1Y3Rpb25cIixcclxuICBcImF1bnRcIjogXCJhbnRcIixcclxuICBcImF1cmFcIjogXCJzdGVuY2hcIixcclxuICBcImF2ZW5nZVwiOiBcImdpdCByb3dkeSBmb3JcIixcclxuICBcImF3ZVwiOiBcImZlYXJmdWwgcmV2ZXJlbmNlXCIsXHJcbiAgXCJiYWJ5IGlmXCI6IFwibG9vayBiaXRjaCxcIixcclxuICBcImJhY2sgc3RhYlwiOiBcInJ1bXAgc2hha2VcIixcclxuICBcImJhY2sgc3RhYmJcIjogXCJydW1wIHNoYWtlXCIsXHJcbiAgXCJiYWRcIjogXCJtYWRcIixcclxuICBcImJhZGx5XCI6IFwicG9vcmx5XCIsXHJcbiAgXCJiYWdlbFwiOiBcImJhYnlcIixcclxuICBcImJhaFwiOiBcImJhZ1wiLFxyXG4gIFwiYmFsYW5jZWQgaW5kaXZpZHVhbFwiOiBcInBzeWNob1wiLFxyXG4gIFwiYmFsYW5jZWQgbWFuXCI6IFwicHN5Y2hvXCIsXHJcbiAgXCJiYWxhbmNlZCBwZXJzb25cIjogXCJwc3ljaG9cIixcclxuICBcImJhbGFuY2VkIHdvbWFuXCI6IFwicHN5Y2hvXCIsXHJcbiAgXCJiYWxsXCI6IFwiYWxsXCIsXHJcbiAgXCJiYWxsYWRcIjogXCJzYWxhZFwiLFxyXG4gIFwiYmFubmVyc1wiOiBcIm1hbm5lcnNcIixcclxuICBcImJhcmVcIjogXCJiZWFyXCIsXHJcbiAgXCJiYXNlXCI6IFwiYmFzc1wiLFxyXG4gIFwiYmFzc1wiOiBcImJhc2VcIixcclxuICBcImJhdHRsZVwiOiBcInNxdWFiYmxlXCIsXHJcbiAgXCJiYXlcIjogXCJzaW5rXCIsXHJcbiAgXCJiZSB0b2dldGhlclwiOiBcIm1hc2ggdXBcIixcclxuICBcImJlXCI6IFwiYmVlXCIsXHJcbiAgXCJiZWFjaFwiOiBcImJlZWNoXCIsXHJcbiAgXCJiZWFuc1wiOiBcImplYW5zXCIsXHJcbiAgXCJiZWFyXCI6IFwiYmFyZVwiLFxyXG4gIFwiYmVhc3RcIjogXCJlcmVjdGlvblwiLFxyXG4gIFwiYmVhdFwiOiBcImJlZXRcIixcclxuICBcImJlYXVyb2NyYXRzXCI6IFwiYmVhdXJvY3JhcHNcIixcclxuICBcImJlYXV0aWZ1bCBmYWNlXCI6IFwiZW5vcm1vdXMgZmVldFwiLFxyXG4gIFwiYmVhdXRpZnVsXCI6IFwiZ2F1ZHlcIixcclxuICBcImJlZGRpbmdcIjogXCJ3ZWRkaW5nXCIsXHJcbiAgXCJiZWVcIjogXCJiZVwiLFxyXG4gIFwiYmVlY2hcIjogXCJiZWFjaFwiLFxyXG4gIFwiYmVldFwiOiBcImJlYXRcIixcclxuICBcImJlaG9sZFwiOiBcIm9vZ2xlXCIsXHJcbiAgXCJiZWxpZXZlXCI6IFwiYnV5XCIsXHJcbiAgXCJiZWxsc1wiOiBcIndlbGxzXCIsXHJcbiAgXCJiZWxseVwiOiBcImplbGx5XCIsXHJcbiAgXCJiZXJyeVwiOiBcImJ1cnlcIixcclxuICBcImJlcnRoXCI6IFwiYmlydGhcIixcclxuICBcImJlc3RcIjogXCJhZGVxdWF0ZVwiLFxyXG4gIFwiYmV0cmF5XCI6IFwiY2F0ZmlzaFwiLFxyXG4gIFwiYmV0cmF5YWxcIjogXCJnYW1lXCIsXHJcbiAgXCJiaWcgYnJvdGhlclwiOiBcIm15IHBhcmFub2lhXCIsXHJcbiAgXCJiaW5kXCI6IFwiY29kZGxlXCIsXHJcbiAgXCJiaW9uaWNcIjogXCJiaXNvbnRvbmljYWxcIixcclxuICBcImJpcnRoXCI6IFwiYmVydGhcIixcclxuICBcImJpdGVcIjogXCJieXRlXCIsXHJcbiAgXCJibGFja1wiOiBcInllbGxvd1wiLFxyXG4gIFwiYmxhY2tlbmVkIHdhbGxzXCI6IFwiZmlsdGh5IHJvb21zXCIsXHJcbiAgXCJibGFkZVwiOiBcImhhbmRsZVwiLFxyXG4gIFwiYmxlZWRcIjogXCJ3aGluZVwiLFxyXG4gIFwiYmxlc3NlZCBiZVwiOiBcInN1Y2sgZWdnc1wiLFxyXG4gIFwiYmxld1wiOiBcImJsdWVcIixcclxuICBcImJsb29kXCI6IFwiZ3JlYXNlXCIsXHJcbiAgXCJibG93XCI6IFwiY3Jvd1wiLFxyXG4gIFwiYmx1ZVwiOiBcImJsZXdcIixcclxuICBcImJsdXNoaW5nXCI6IFwiY3J1c2hpbmdcIixcclxuICBcImJvYXJcIjogXCJicmVcIixcclxuICBcImJvZGllc1wiOiBcImppZ2dsaW5nIHBpbGVzXCIsXHJcbiAgXCJib2R5XCI6IFwiamlnZ2xpbmcgY2x1bXBcIixcclxuICBcImJvcmVcIjogXCJib2FyXCIsXHJcbiAgXCJib3VnaFwiOiBcImJvd1wiLFxyXG4gIFwiYm91Z2h0XCI6IFwiYm91Z2h0ZW5cIixcclxuICBcImJvdW5kXCI6IFwiY29kZGxlZFwiLFxyXG4gIFwiYm93ZWxcIjogXCJmb3VsXCIsXHJcbiAgXCJib3dsXCI6IFwic291bFwiLFxyXG4gIFwiYm95IG1lZXRzIGdpcmxcIjogXCJydWJiZXIgbWVldHMgcm9hZFwiLFxyXG4gIFwiYnJha2VcIjogXCJicmVha1wiLFxyXG4gIFwiYnJlYWRcIjogXCJicmVkXCIsXHJcbiAgXCJicmVha1wiOiBcImJlYXRcIixcclxuICBcImJyZWF0aFwiOiBcImF3a3dhcmQgcGF1c2VcIixcclxuICBcImJyZWF0aGVcIjogXCJwYXVzZSBhd2t3YXJkbHlcIixcclxuICBcImJyZWV6ZVwiOiBcImRyYWZ0XCIsXHJcbiAgXCJicmlsbGlhbmNlXCI6IFwic2hpbnluZXNzXCIsXHJcbiAgXCJicmlsbGlhbnRcIjogXCJzaGlueVwiLFxyXG4gIFwiYnJpbmcgZm9ydGhcIjogXCJ3aGlwIG91dFwiLFxyXG4gIFwiYnJpbmtcIjogXCJib3JkZXJcIixcclxuICBcImJyb2FjaFwiOiBcImJyb29jaFwiLFxyXG4gIFwiYnJva2VcIjogXCJiZWF0XCIsXHJcbiAgXCJicm9rZW5cIjogXCJiZWF0ZW5cIixcclxuICBcImJyb3dzXCI6IFwiYnJvd3NlXCIsXHJcbiAgXCJidWJibGluZ1wiOiBcImJhYmJsaW5nXCIsXHJcbiAgXCJidW5ueVwiOiBcIm1vbmV5XCIsXHJcbiAgXCJidW95XCI6IFwiYm95XCIsXHJcbiAgXCJidXJyb3dcIjogXCJidXJyb1wiLFxyXG4gIFwiYnVyeVwiOiBcImJlcnJ5XCIsXHJcbiAgXCJidXN5XCI6IFwiZGl6enlcIixcclxuICBcImJ1dHRlcmZseVwiOiBcImZsdXR0ZXIgYnlcIixcclxuICBcImJ1eVwiOiBcImJ5XCIsXHJcbiAgXCJieSBoZXIgc2lkZVwiOiBcIm9uIGhlciBiYWNrXCIsXHJcbiAgXCJieSBoaXMgc2lkZVwiOiBcIm9uIGhpcyBiYWNrXCIsXHJcbiAgXCJieSBteSBzaWRlXCI6IFwib24gbXkgYmFja1wiLFxyXG4gIFwiYnkgeW91ciBzaWRlXCI6IFwib24geW91ciBiYWNrXCIsXHJcbiAgXCJieWVcIjogXCJleWVcIixcclxuICBcImJ5dGVcIjogXCJiaXRlXCIsXHJcbiAgXCJjYW4ndCBiZSB3aXRob3V0XCI6IFwidG91Y2ggbXlzZWxmIGFib3V0XCIsXHJcbiAgXCJjYW4ndCBmaW5kIHRoZSB3b3JkcyB0byBzYXlcIjogXCJjb3VsZCBibHVydCBvdXQgc29tZSBkdW1iIHNoaXRcIixcclxuICBcImNhbid0IGxpdmUgd2l0aG91dFwiOiBcInRvdWNoIG15c2VsZiBhYm91dFwiLFxyXG4gIFwiY2FuZGxlXCI6IFwiZ2xvd3N0aWNrXCIsXHJcbiAgXCJjYXB0dXJlXCI6IFwiY2FwdGl2YXRlXCIsXHJcbiAgXCJjYXJlIHRvIGdpdmVcIjogXCJzaGl0IHRvIGdpdmVcIixcclxuICBcImNhcmVcIjogXCJnaXZlIGEgc2hpdFwiLFxyXG4gIFwiY2FyZWRcIjogXCJnYXZlIGEgc2hpdFwiLFxyXG4gIFwiY2FyZWVuXCI6IFwiY2FyZWVyXCIsXHJcbiAgXCJjYXJpbmdcIjogXCJnaXZpbmcgYSBzaGl0XCIsXHJcbiAgXCJjYXN0bGVcIjogXCJjaGF0ZWF1XCIsXHJcbiAgXCJjYXVzdGljXCI6IFwiY3Jhc3RpY1wiLFxyXG4gIFwiY2VsbFwiOiBcInNlbGxcIixcclxuICBcImNlbnRcIjogXCJzZW50XCIsXHJcbiAgXCJjZXJlYWxcIjogXCJzZXJpYWxcIixcclxuICBcImNoYW5nZSBvbmUgdGhpbmdcIjogXCJydWluIGV2ZXJ5dGhpbmdcIixcclxuICBcImNoZWVrXCI6IFwicnVtcFwiLFxyXG4gIFwiY2hpbGlcIjogXCJjaGlsbHlcIixcclxuICBcImNoaW5lc2VcIjogXCJjaGlsZHJlblwiLFxyXG4gIFwiY2hpcFwiOiBcImZsaXBcIixcclxuICBcImNob3JkXCI6IFwiY29yZFwiLFxyXG4gIFwiY2hyaXN0XCI6IFwiSm9obiBEb2UganJcIixcclxuICBcImNocm9tb3NvbWVzXCI6IFwia3JvbW8tc3RvbmVzXCIsXHJcbiAgXCJjaXRlXCI6IFwic2l0ZVwiLFxyXG4gIFwiY2l2aWNcIjogXCJjaXZpbFwiLFxyXG4gIFwiY2xhc3NpY1wiOiBcImNsYXNzaWNhbFwiLFxyXG4gIFwiY2xpZmYtaGFuZ2VyXCI6IFwiY2xpZmYtZHdlbGxlclwiLFxyXG4gIFwiY2xvc2VcIjogXCJjbG90aGVzXCIsXHJcbiAgXCJjbG91ZFwiOiBcImJhbGxvb25cIixcclxuICBcImNvZmZpblwiOiBcInRvYm9nYW5cIixcclxuICBcImNvbGRcIjogXCJmdXp6eVwiLFxyXG4gIFwiY29sbGFib3JhdGVcIjogXCJjb3Jyb2JvcmF0ZVwiLFxyXG4gIFwiY29sbGVjdGVkXCI6IFwiY29sbGVjdGl2ZVwiLFxyXG4gIFwiY29sbGVnZVwiOiBcImNvbGxhZ2VcIixcclxuICBcImNvbWVkaWNcIjogXCJjb21pY2FsXCIsXHJcbiAgXCJjb21tZW50YXRlXCI6IFwiY29tbWVudFwiLFxyXG4gIFwiY29tcGxlbWVudFwiOiBcImNvbXBsaW1lbnRcIixcclxuICBcImNvbXByZWhlbnNpb25cIjogXCJhcHByZWhlbnNpb25cIixcclxuICBcImNvbXByaXNlZFwiOiBcImNvbXBvc2VkXCIsXHJcbiAgXCJjb25jZW50cmF0aW9uXCI6IFwiY29uc2VjcmF0aW9uXCIsXHJcbiAgXCJjb25maXNjYXRlXCI6IFwiY29uZmlzdGljYXRlXCIsXHJcbiAgXCJjb25zY2llbnRpb3VzXCI6IFwiY29uc2Npb3VzXCIsXHJcbiAgXCJjb25zdW1lXCI6IFwic3Vja1wiLFxyXG4gIFwiY29uc3VtaW5nXCI6IFwic3Vja2luZ1wiLFxyXG4gIFwiY29udHJvbFwiOiBcInBhdHJvbFwiLFxyXG4gIFwiY29udmVyc2VcIjogXCJjb252ZXJzYXRlXCIsXHJcbiAgXCJjb29wXCI6IFwiY291cGVcIixcclxuICBcImNvcCBwb3JuXCI6IFwicG9wY29yblwiLFxyXG4gIFwiY29ycHNlXCI6IFwibWFubmVxdWluXCIsXHJcbiAgXCJjb3JwdXNjbGVzXCI6IFwiY29ycHN1Y2tlbHNcIixcclxuICBcImNvcnJlY3RcIjogXCJjYXRyZWN0YWxcIixcclxuICBcImNvdWxkIGRvIGFueXRoaW5nXCI6IFwiZW1icmFjaW5nIG1hbmlhXCIsXHJcbiAgXCJjb3VsZCBuZXZlciBiZSB3aXRob3V0XCI6IFwiY2FuJ3QgZnVuY3Rpb24gd2l0aG91dFwiLFxyXG4gIFwiY291bmNpbFwiOiBcImNvdW5zZWxcIixcclxuICBcImNvdW50cnlcIjogXCJiYXRocm9vbVwiLFxyXG4gIFwiY291cGVcIjogXCJjb29wXCIsXHJcbiAgXCJjb3Vwb25cIjogXCJwdWtlIG9uXCIsXHJcbiAgXCJjcmFja1wiOiBcIm1lbmRcIixcclxuICBcImNyZWFrXCI6IFwiY3JlZWtcIixcclxuICBcImNyZWRpYmxlXCI6IFwiY3JlZHVsb3VzXCIsXHJcbiAgXCJjcmVtYXRlZFwiOiBcImluY3JlbWVudGVkXCIsXHJcbiAgXCJjcmV3c1wiOiBcImNydWlzZVwiLFxyXG4gIFwiY3JpZWRcIjogXCJjYW1lXCIsXHJcbiAgXCJjcmllc1wiOiBcImNvbWVzXCIsXHJcbiAgXCJjcmltc29uXCI6IFwiYXp1cmVcIixcclxuICBcImNyaXRpcXVlXCI6IFwiY3JpdGljaXplXCIsXHJcbiAgXCJjcm9ja1wiOiBcImNyYWNrXCIsXHJcbiAgXCJjcm93XCI6IFwiYmxvd1wiLFxyXG4gIFwiY3J1ZWxcIjogXCJoYXBoYXphcmRcIixcclxuICBcImNydXNoaW5nXCI6IFwiYmx1c2hpbmdcIixcclxuICBcImNyeVwiOiBcImNvbWluZ1wiLFxyXG4gIFwiY3J5aW5nXCI6IFwiY29taW5nXCIsXHJcbiAgXCJjcnlwdFwiOiBcInVyaW5hbFwiLFxyXG4gIFwiY3J5cHRpY1wiOiBcImRydW5rZW5cIixcclxuICBcImNyeXN0YWxcIjogXCJiZWRhemxlclwiLFxyXG4gIFwiY3VubmluZ1wiOiBcImRlc3BlcmF0ZVwiLFxyXG4gIFwiY3Vyc2VcIjogXCJzdGFpblwiLFxyXG4gIFwiY3V0XCI6IFwibXV0aWxhdGVcIixcclxuICBcImRhbW5cIjogXCJkb251dFwiLFxyXG4gIFwiZGFtcFwiOiBcInN0YW1wXCIsXHJcbiAgXCJkYW5nZXJvdXNcIjogXCJjb24gY2F0Y2hpbmdcIixcclxuICBcImRhcmtcIjogXCJlZmZlcnZlc2NlbnRcIixcclxuICBcImRheVwiOiBcIm1vcm5pbmdcIixcclxuICBcImRheWRyZWFtXCI6IFwiZmFudGFzaXplXCIsXHJcbiAgXCJkZWFkXCI6IFwiaW5lcnRcIixcclxuICBcImRlYWRseVwiOiBcImZlcnRpbGVcIixcclxuICBcImRlYWxlclwiOiBcInN0ZWFsZXJcIixcclxuICBcImRlYXJcIjogXCJzY2htdWNrXCIsXHJcbiAgXCJkZWF0aFwiOiBcIlNhbnRhXCIsXHJcbiAgXCJkZWJ1dGFudGVzXCI6IFwicG9zaCBsYWRpZXNcIixcclxuICBcImRlZXAgZG93biBpbnNpZGVcIjogXCJpbiB0aGUgYm90dG9tIG9mIHRoZSB0YW5rXCIsXHJcbiAgXCJkZW1pLWdvZFwiOiBcIm1hZCBwbHVtYmVyXCIsXHJcbiAgXCJkZW1pZ29kXCI6IFwibWFkIHBsdW1iZXJcIixcclxuICBcImRlbW9uXCI6IFwiaGFyZC1vblwiLFxyXG4gIFwiZGVtb25pYyBhbmdlbFwiOiBcImJhZCBjb250cmFkaWN0aW9uXCIsXHJcbiAgXCJkZXByZWNpYXRlXCI6IFwiZGVwcmVjYXRlXCIsXHJcbiAgXCJkZXByZXNzZWRcIjogXCJkcnVua1wiLFxyXG4gIFwiZGVwcmVzc2luZ1wiOiBcImluZWJyaWF0aW5nXCIsXHJcbiAgXCJkZXByZXNzaW9uXCI6IFwic28gbXVjaCBib296ZVwiLFxyXG4gIFwiZGVyb2dhdG9yeVwiOiBcInN1cHBvc2l0b3J5XCIsXHJcbiAgXCJkZXN0aW55XCI6IFwidGF4ZXNcIixcclxuICBcImRldGVycmVudFwiOiBcImRldGVyZ2VudFwiLFxyXG4gIFwiZGllXCI6IFwibWFrZSBtYXJzaG1hbGxvd3NcIixcclxuICBcImRpZWRcIjogXCJtYWRlIG1hcnNobWFsbG93c1wiLFxyXG4gIFwiZGllc1wiOiBcIm1ha2VzIG1hcnNobWFsbG93c1wiLFxyXG4gIFwiZGlmZmVyZW50XCI6IFwiYXdrd2FyZFwiLFxyXG4gIFwiZGlzaW50ZXJlc3RlZFwiOiBcInVuaW50ZXJlc3RlZFwiLFxyXG4gIFwiZGlzbmV5XCI6IFwiZGl2b3JjZVwiLFxyXG4gIFwiZGlzc2Vuc2lvblwiOiBcImR5c2VudGVyeVwiLFxyXG4gIFwiZGlzc2VudGluZ1wiOiBcImRlc2NlbmRpbmdcIixcclxuICBcImRpc3Rpbmd1aXNoZWRcIjogXCJleHRpbmd1aXNoZWRcIixcclxuICBcImRpenp5XCI6IFwiYnVzeVwiLFxyXG4gIFwiZG9cIjogXCJkZXdcIixcclxuICBcImRvY3RvcmFsXCI6IFwiZG9jdG9yaWFsXCIsXHJcbiAgXCJkb2VcIjogXCJkb3VnaFwiLFxyXG4gIFwiZG9lc24ndCBoYXBwZW4gb3ZlclwiOiBcImNhcnR3aGVlbHMgc3RyYWlnaHQgYWNyb3NzXCIsXHJcbiAgXCJkb24ndCBoYXZlIGEgY2x1ZVwiOiBcImdvdCBzaGl0IHR3aXN0ZWRcIixcclxuICBcImRvbid0IG5lZWRcIjogXCJjb3VsZCBnaXZlIGEgZnVjayBhYm91dFwiLFxyXG4gIFwiZHJhbWF0aWNcIjogXCJkcmFtYXRpY2FsXCIsXHJcbiAgXCJkcmVhbVwiOiBcIm9ic2Vzc1wiLFxyXG4gIFwiZHJlYW1sYW5kXCI6IFwib2JzZXNzaW9uIGlzbGFuZFwiLFxyXG4gIFwiZHJlYW1zXCI6IFwib2JzZXNzaW9uc1wiLFxyXG4gIFwiZHJpYmJsZVwiOiBcImRyaXZlbFwiLFxyXG4gIFwiZHJpZnRcIjogXCJoaW0taGF3XCIsXHJcbiAgXCJkdWFsXCI6IFwiZHVlbFwiLFxyXG4gIFwiZHVkZVwiOiBcImRvb2RpZVwiLFxyXG4gIFwiZHlpbmdcIjogXCJtYWtpbmcgbWFyc2htYWxsb3dzXCIsXHJcbiAgXCJkeXNlbnRlcnlcIjogXCJkaXNzZW5zaW9uXCIsXHJcbiAgXCJlYXJzXCI6IFwidGVhcnNcIixcclxuICBcImVhc2VcIjogXCJ0ZWFzZVwiLFxyXG4gIFwiZWNvbG9neVwiOiBcImVjcm9sb2d5XCIsXHJcbiAgXCJlZmZlY3RcIjogXCJhZmZlY3RcIixcclxuICBcImVnb2lzdFwiOiBcImVnb3Rpc3RcIixcclxuICBcImVpZ2h0XCI6IFwiYXRlXCIsXHJcbiAgXCJlbGRlclwiOiBcIm9sZCBmb2xrXCIsXHJcbiAgXCJlbGVjdGl2ZVwiOiBcImVsZWN0b3JhbFwiLFxyXG4gIFwiZWxldmlhdGVcIjogXCJlbGViYXRlXCIsXHJcbiAgXCJlbW90aW9uXCI6IFwibHVicmljYW50XCIsXHJcbiAgXCJlbW90aW9uYWxcIjogXCJjaGlsZGlzaFwiLFxyXG4gIFwiZW1wYXRoeVwiOiBcInN5bXBhdGh5XCIsXHJcbiAgXCJlbXB0eVwiOiBcImJsb2F0ZWRcIixcclxuICBcImVuZGxlc3NcIjogXCJyZWFsIGxvbmdcIixcclxuICBcImVuZXJneVwiOiBcImp1aWNlXCIsXHJcbiAgXCJlbm9ybWl0eVwiOiBcImltbWVuc2l0eVwiLFxyXG4gIFwiZW5zdXJlXCI6IFwiaW5zdXJlXCIsXHJcbiAgXCJlbnRlcmVkIHRoZSBob3VzZSBvZlwiOiBcImdvdCB1cCBpbiB0aGUgYmFybiBmb3JcIixcclxuICBcImVudHJlcHJlbmV1clwiOiBcImVudHJhbWFub3JlXCIsXHJcbiAgXCJlcm9nZW5vdXNcIjogXCJnZXJvbmltb3VzXCIsXHJcbiAgXCJlcnJcIjogXCJhaXJcIixcclxuICBcImVzY2FwZVwiOiBcInNudWdnbGVcIixcclxuICBcImV0Y2hlZFwiOiBcImdyb3VuZFwiLFxyXG4gIFwiZXRlcm5hbFwiOiBcImltYWdpbmVkXCIsXHJcbiAgXCJldGVybmFsbHlcIjogXCJmb3IgYSBiaXRcIixcclxuICBcImV0ZXJuaXR5XCI6IFwiYXdoaWxlXCIsXHJcbiAgXCJld2VcIjogXCJ5b3VcIixcclxuICBcImV4aXN0ZW5jZVwiOiBcIndoYXRldmVyXCIsXHJcbiAgXCJleWVcIjogXCJieWVcIixcclxuICBcImZhY2VcIjogXCJyYWNlXCIsXHJcbiAgXCJmYWRlXCI6IFwiaGltLWhhd1wiLFxyXG4gIFwiZmFpclwiOiBcImZhcmVcIixcclxuICBcImZhaXJ5XCI6IFwiZmVycnlcIixcclxuICBcImZhbGwgb24gZGVhZiBlYXJzXCI6IFwiZmFsbCBvbiBkZWF0aCBlYXJzXCIsXHJcbiAgXCJmYWxsXCI6IFwiZmxvcFwiLFxyXG4gIFwiZmFuYXRpY1wiOiBcInBob25ldGljXCIsXHJcbiAgXCJmYW5nXCI6IFwiZGVudHVyZVwiLFxyXG4gIFwiZmFyZXdlbGxcIjogXCJhZGlvc1wiLFxyXG4gIFwiZmFydGhlclwiOiBcImZ1cnRoZXJcIixcclxuICBcImZhdGVcIjogXCJjb2luY2lkZW5jZVwiLFxyXG4gIFwiZmF6ZVwiOiBcInBoYXNlXCIsXHJcbiAgXCJmZWFzdFwiOiBcImJlYXN0XCIsXHJcbiAgXCJmZWF0XCI6IFwiZmVldFwiLFxyXG4gIFwiZmVlbFwiOiBcImZvbmRsZVwiLFxyXG4gIFwiZmVsbFwiOiBcImZsb3BwZWRcIixcclxuICBcImZlbWluaW5lXCI6IFwiZmVtaW5lXCIsXHJcbiAgXCJmaWdodCBpbiB5b3VyIHJhY2VcIjogXCJyaWdodCBpbiB5b3VyIGZhY2VcIixcclxuICBcImZpZ2h0XCI6IFwicmlnaHRcIixcclxuICBcImZpbmdlcnNcIjogXCJzYXVzYWdlXCIsXHJcbiAgXCJmaW5nZXJ0aXBzXCI6IFwiY2hpY2tlbiBudWdnZXRzXCIsXHJcbiAgXCJmaXJcIjogXCJmdXJcIixcclxuICBcImZpcnN0IGxhaWQgZXllcyBvblwiOiBcImZpcnN0IHRyaWVkIGdyb3BpbmdcIixcclxuICBcImZpcnN0IG9mIGFsbFwiOiBcIm1tLWtheVwiLFxyXG4gIFwiZmlzaFwiOiBcIndpc2hcIixcclxuICBcImZsYWdzXCI6IFwiaGFnc1wiLFxyXG4gIFwiZmxhbW1hYmxlXCI6IFwiaW5mbGFtbWFibGVcIixcclxuICBcImZsYXVudFwiOiBcImZsb3V0XCIsXHJcbiAgXCJmbGVhXCI6IFwiZmxlZVwiLFxyXG4gIFwiZmxlc2hcIjogXCJ0d2lua2llXCIsXHJcbiAgXCJmbGVzaG91dFwiOiBcImZsdXNob3V0XCIsXHJcbiAgXCJmbGV3XCI6IFwiZmx1XCIsXHJcbiAgXCJmbGlwXCI6IFwiY2hpcFwiLFxyXG4gIFwiZmxvdW5kZXJcIjogXCJmb3VuZGVyXCIsXHJcbiAgXCJmbG91clwiOiBcImZsb3dlclwiLFxyXG4gIFwiZmx1bmdcIjogXCJodW5nXCIsXHJcbiAgXCJmbHV0dGVyIGJ5XCI6IFwiYnV0dGVyZmx5XCIsXHJcbiAgXCJmb3IgYWxsIGludGVudHMgYW5kIHB1cnBvc2VzXCI6IFwiZm9yIGFsbCBpbnRlbnNpdmUgcHVycG9zZXNcIixcclxuICBcImZvciBoZVwiOiBcInRoaXMgZHVtYiBtb3RoZXIgZnVja2VyXCIsXHJcbiAgXCJmb3Igbm8gcmVhc29uXCI6IFwibWFpYWNhbGx5XCIsXHJcbiAgXCJmb3Igc2hlXCI6IFwiJ2NhdXNlIHRoZSBjdW50XCIsXHJcbiAgXCJmb3JcIjogXCJmb3VyXCIsXHJcbiAgXCJmb3JlcGxheVwiOiBcImZsb29ycGxheVwiLFxyXG4gIFwiZm9yZXN0XCI6IFwiY2FtcGdyb3VuZFwiLFxyXG4gIFwiZm9yZXZlclwiOiBcInNvIHZlcnlcIixcclxuICBcImZvcmdldFwiOiBcImRpc3JlbWVtYmVyXCIsXHJcbiAgXCJmb3JtXCI6IFwid2FybVwiLFxyXG4gIFwiZm9ybWFsbHlcIjogXCJmb3JtZXJseVwiLFxyXG4gIFwiZm9ydGhcIjogXCJmb3VydGhcIixcclxuICBcImZvcnR1aXRvdXNcIjogXCJmb3J0dW5hdGVcIixcclxuICBcImZvdWxcIjogXCJib3dlbFwiLFxyXG4gIFwiZnJhZ2lsZVwiOiBcInN0dXJkeVwiLFxyXG4gIFwiZnJ1c3RyYXRlZFwiOiBcImZsdXN0cmF0ZWRcIixcclxuICBcImZ1Y2tcIjogXCJmcmlkZ2VcIixcclxuICBcImZ1bGwgb2YgbGlmZVwiOiBcImZ1bGwgb2Ygc2hpdFwiLFxyXG4gIFwiZnVuZXJhbFwiOiBcInZlbmVyZWFsXCIsXHJcbiAgXCJnYWxsXCI6IFwiZ2FybGljXCIsXHJcbiAgXCJnYW5nc3RlclwiOiBcImhhbXN0ZXJcIixcclxuICBcImdhbnN0YVwiOiBcImhhbXN0YVwiLFxyXG4gIFwiZ2FyYWdlXCI6IFwiZ3JhdmVcIixcclxuICBcImdhdmUgdXAgb25cIjogXCJkb24ndCBnaXZlIGEgZnVjayBhYm91dFwiLFxyXG4gIFwiZ2VudGxlXCI6IFwiZ2VuaXRhbFwiLFxyXG4gIFwiZ2hvc3RcIjogXCJpbWFnaW5hcnkgZnJpZW5kXCIsXHJcbiAgXCJnaXJsIG1lZXRzIGJveVwiOiBcImFkb2xlc2NlbnQgbWlzdGFrZXNcIixcclxuICBcImdpdmUgdXAgb25cIjogXCJ3b24ndCBnaXZlIGEgZnVjayBhYm91dFwiLFxyXG4gIFwiZ2l2ZW4gYSBjaG9pY2VcIjogXCJleHRvcnRlZFwiLFxyXG4gIFwiZ2l2ZW4gdXAgb25cIjogXCJkb24ndCBnaXZlIGEgZnVjayBhYm91dFwiLFxyXG4gIFwiZ2l2aW5nIHVwIG9uXCI6IFwiYWluJ3QgZ2l2aW4gYSBmdWNrIGFib3V0XCIsXHJcbiAgXCJnb2RcIjogXCJKb2huIERvZSBzclwiLFxyXG4gIFwiZ29kZGVzc1wiOiBcIkphbmUgRG9lXCIsXHJcbiAgXCJnb2RzXCI6IFwiSm9obiBEb2Ugc3IgZXQgYWwuXCIsXHJcbiAgXCJnb2xkZW4gcmF5XCI6IFwiZ2F1ZHkgc2NyaWJibGVcIixcclxuICBcImdvb2QgYnllXCI6IFwiZnVjayBvZmZcIixcclxuICBcImdvb2RcIjogXCJ3ZWxsXCIsXHJcbiAgXCJnb29kLWJ5ZVwiOiBcImZ1Y2sgb2ZmXCIsXHJcbiAgXCJnb29kYnllXCI6IFwiZnVjayBvZmZcIixcclxuICBcImdvcmlsbGFcIjogXCJndWVycmlsbGFcIixcclxuICBcImdvdCBpbiB5b3VyIHdheVwiOiBcInRyaWVkIHRvIHRyYXAgeW91XCIsXHJcbiAgXCJncmF2ZVwiOiBcInBlcnNvbmFsIHNwYWNlXCIsXHJcbiAgXCJncmF2ZXN0b25lXCI6IFwibWlsZSBtYXJrZXJcIixcclxuICBcImdyb3dpbmcgYXBhcnRcIjogXCJnZXR0aW5nIGJvcmVkXCIsXHJcbiAgXCJndWVzcyBpdCBkb2Vzbid0IG1hdHRlclwiOiBcImtub3cgdGhpcyBzaGl0IGlzIHBvaW50bGVzc1wiLFxyXG4gIFwiZ3luZWNvbG9naXN0XCI6IFwiZ3JvaW5hY29sb2dpc3RcIixcclxuICBcImhhZCBkb25lXCI6IFwiZG9uZSBkaWRcIixcclxuICBcImhhZ3NcIjogXCJmbGFnc1wiLFxyXG4gIFwiaGFpclwiOiBcImhhcmVcIixcclxuICBcImhhbGxcIjogXCJoYXVsXCIsXHJcbiAgXCJoYWx2ZVwiOiBcImhhdmVcIixcclxuICBcImhhbmQgaW4gaGFuZFwiOiBcImZvb3QgaW4gc2hvZVwiLFxyXG4gIFwiaGFuZCB0byBob2xkXCI6IFwic3RlYWsgdG8gZWF0XCIsXHJcbiAgXCJoYXRlXCI6IFwiZGlzbGlrZVwiLFxyXG4gIFwiaGF0cmVkXCI6IFwib2RpdW1cIixcclxuICBcImhhdW50XCI6IFwic3RhbGtcIixcclxuICBcImhheVwiOiBcImhleVwiLFxyXG4gIFwiaGVhbFwiOiBcImhlZWxcIixcclxuICBcImhlYWxlclwiOiBcImZvbmRsZXJcIixcclxuICBcImhlYXJpbmdcIjogXCJlYXJyaW5nXCIsXHJcbiAgXCJoZWFydFwiOiBcImNyb3RjaFwiLFxyXG4gIFwiaGVhcnRiZWF0XCI6IFwiY3JvdGNoIGZpcmVcIixcclxuICBcImhlYXZlblwiOiBcInNreVwiLFxyXG4gIFwiaGVhdmVuc1wiOiBcInNraWVzXCIsXHJcbiAgXCJoZWxsXCI6IFwiQW50YXJjdGljYVwiLFxyXG4gIFwiaGVsbGZpcmVcIjogXCJoZW1vcnJob2lkXCIsXHJcbiAgXCJoaVwiOiBcImhpZ2hcIixcclxuICBcImhpY2tcIjogXCJzaWNrXCIsXHJcbiAgXCJoaWRkZW5cIjogXCJzdGFzaGVkXCIsXHJcbiAgXCJoaWdoZXIgcG93ZXJcIjogXCJjcnVzdHkgc29ja1wiLFxyXG4gIFwiaGlzcyBhbmQgbGVhclwiOiBcImxpc3RlbiBoZXJlXCIsXHJcbiAgXCJoaXNzZWRcIjogXCJtaXNzZWRcIixcclxuICBcImhpc3RvcmljXCI6IFwiaGlzdG9yaWNhbFwiLFxyXG4gIFwiaGlzdG9yeVwiOiBcIm15c3RlcnlcIixcclxuICBcImhvYXJzZVwiOiBcImhvcnNlXCIsXHJcbiAgXCJob2xkaW5nIHRoZW0gY2xvc2UgdG9cIjogXCJoYW5kY3VmZmluZyB0aGVtIHRvXCIsXHJcbiAgXCJob2xlXCI6IFwid2hvbGVcIixcclxuICBcImhvbGV5XCI6IFwiaG9seVwiLFxyXG4gIFwiaG9uZWluXCI6IFwiaG9tZWluXCIsXHJcbiAgXCJob3BlbGVzc1wiOiBcInBpdGlmdWxcIixcclxuICBcImhvcml6b250YWxcIjogXCJWZXJ0aXpvbnRhbFwiLFxyXG4gIFwiaG9yc2VzXCI6IFwiaG9ybmV0c1wiLFxyXG4gIFwiaG90dGllXCI6IFwiaG9ndGllXCIsXHJcbiAgXCJob3VyXCI6IFwib3VyXCIsXHJcbiAgXCJob3VzZVwiOiBcInRlbnRcIixcclxuICBcImh1bWFuIHJhY2VcIjogXCJnZXJiaWwgZW1waXJlXCIsXHJcbiAgXCJodW5nXCI6IFwiZmx1bmdcIixcclxuICBcImh1bmdyeVwiOiBcImhvcm55XCIsXHJcbiAgXCJoeXBvZGVtaWMgbmVlZGxlXCI6IFwiaHlwb2Rlcm1pYyBudXJkbGVcIixcclxuICBcImh5c3RlcmljYWxcIjogXCJoaWxhcmlvdXNcIixcclxuICBcImkgYW1cIjogXCJpIGFyZVwiLFxyXG4gIFwiSSBjb3VsZG4ndCBjYXJlIGxlc3NcIjogXCJJIGNvdWxkIGNhcmUgbGVzc1wiLFxyXG4gIFwiaVwiOiBcIktldmluXCIsXHJcbiAgXCJpJ2xsXCI6IFwiaSB3aWxsXCIsXHJcbiAgXCJpJ21cIjogXCJpIGFyZVwiLFxyXG4gIFwiaSd2ZSBuZXZlciBmZWx0IHRoaXMgd2F5XCI6IFwiaSd2ZSBkb25lIHRoaXNcIixcclxuICBcImkndmVcIjogXCJpIGhhdmVcIixcclxuICBcImlsbHVtaW5hdGlvblwiOiBcIm11bWJvIGp1bWJvXCIsXHJcbiAgXCJpbGx1c2lvblwiOiBcImRydW5rZW4gbWlzdGFrZVwiLFxyXG4gIFwiaW1cIjogXCJpJ21cIixcclxuICBcImltbW9ydGFsXCI6IFwid2hpbnlcIixcclxuICBcImltcGx5XCI6IFwiaW5mZXJcIixcclxuICBcImluIHRoZSBtaWRkbGUgb2ZcIjogXCJhbGwgdXAgaW5cIixcclxuICBcImluY2FudGF0aW9uXCI6IFwibXVjaCB5YW1tZXJpbmdcIixcclxuICBcImluY2Vuc2VcIjogXCJpbmNlc3RcIixcclxuICBcImluY2lkZW50c1wiOiBcImluc3RhbmNlXCIsXHJcbiAgXCJpbmZpbml0ZVwiOiBcImFic3RyYWN0XCIsXHJcbiAgXCJpbmdlbnVvdXNcIjogXCJpbmdlbmlvdXNcIixcclxuICBcImluc2Vuc2libGVcIjogXCJpbnNlbnNpdGl2ZVwiLFxyXG4gIFwiaW5zdGFsbFwiOiBcImluc3RpbGxcIixcclxuICBcImluc3VsYXRpb25cIjogXCJpbnN0YWxsYXRpb25cIixcclxuICBcImludGVuc2VcIjogXCJpbnRlbnNpdmVcIixcclxuICBcImludGVyaW9yXCI6IFwiaW5mZXJpb3JcIixcclxuICBcImludGVybWVudFwiOiBcImludGVybm1lbnRcIixcclxuICBcImludGVycHJldFwiOiBcImludGVycHJldGF0ZVwiLFxyXG4gIFwiaW50aW1hdGVcIjogXCJpbWluZW50XCIsXHJcbiAgXCJpbnRvIHRoZSBsaWdodFwiOiBcIm9uIHRvIHRoZSBsaWdodFwiLFxyXG4gIFwiaW50dWl0aW9uXCI6IFwiaW50ZXJtaXNzaW9uXCIsXHJcbiAgXCJpbnZpdGVcIjogXCJrbmlmZVwiLFxyXG4gIFwiaXNsZVwiOiBcImFpc2xlXCIsXHJcbiAgXCJpdCBtdXN0IGJlIHRydWVcIjogXCJmb3IgcmVhbCAnbicgc2hpdFwiLFxyXG4gIFwiaXQncyBhIGRvZy1lYXQtZG9nIHdvcmxkXCI6IFwiaXQncyBhIGRvZ2d5IGRvZyB3b3JsZFwiLFxyXG4gIFwiamVhbnNcIjogXCJiZWFuc1wiLFxyXG4gIFwiamVsbHkgYmVhbnNcIjogXCJiZWxseSBqZWFuc1wiLFxyXG4gIFwiamVsbHlcIjogXCJiZWxseVwiLFxyXG4gIFwiamVzdXMgY2hyaXN0XCI6IFwiSm9obiBEb2UganJcIixcclxuICBcImplc3VzXCI6IFwiSm9obiBEb2UganJcIixcclxuICBcImpldGxhZ1wiOiBcImpldGxvY2tcIixcclxuICBcImp1bXBcIjogXCJkdW1wXCIsXHJcbiAgXCJqdXN0XCI6IFwic3VyZVwiLFxyXG4gIFwia2lzc1wiOiBcInNsYXBcIixcclxuICBcImtpc3Npbmcgb3RoZXJcIjogXCJnb2luZyBkb3duIG9uXCIsXHJcbiAgXCJrbmVhZFwiOiBcIm5lZWRcIixcclxuICBcImtuZXdcIjogXCJnb3RcIixcclxuICBcImtuaWZlXCI6IFwiZGlsZG9cIixcclxuICBcImtuaWdodFwiOiBcIm5pZ2h0XCIsXHJcbiAgXCJrbm90XCI6IFwibm90XCIsXHJcbiAgXCJrbm93XCI6IFwiZ2V0XCIsXHJcbiAgXCJrbm93bGVkZ2VcIjogXCJ0cml2aWFcIixcclxuICBcImtub3duXCI6IFwiZ290XCIsXHJcbiAgXCJsYWNrXCI6IFwicGFja1wiLFxyXG4gIFwibGF0ZXJcIjogXCJsYXR0ZXJcIixcclxuICBcImxheVwiOiBcImxpZVwiLFxyXG4gIFwibGF5aW5nIGluIGJlZFwiOiBcInRha2luZyBhIHNoaXRcIixcclxuICBcImxheWluZyBvbiB0aGUgZmxvb3JcIjogXCJiZWdnaW5nIGZvciBpdFwiLFxyXG4gIFwibGVhZFwiOiBcInNwZWVkXCIsXHJcbiAgXCJsZWF2ZSBoZXIgc2lkZVwiOiBcImdldCBvZmYgaGVyIGFzc1wiLFxyXG4gIFwibGVhdmUgaGlzIHNpZGVcIjogXCJnZXQgb2ZmIGhpcyBhc3NcIixcclxuICBcImxlYXZlIG15IHNpZGVcIjogXCJnZXQgb2ZmIG15IGFzc1wiLFxyXG4gIFwibGVhdmUgeW91ciBzaWRlXCI6IFwiZ2V0IG9mZiB5b3VyIGFzc1wiLFxyXG4gIFwibGVhdmVcIjogXCJsZXRcIixcclxuICBcImxlb3BhcmRcIjogXCJzaGVwaGVyZFwiLFxyXG4gIFwibGVzc2VuXCI6IFwibGVzc29uXCIsXHJcbiAgXCJsaWFyXCI6IFwiZmliYmVyXCIsXHJcbiAgXCJsaWJlcmF0aW9uXCI6IFwibHVicmljYXRpb25cIixcclxuICBcImxpZVwiOiBcImZpYlwiLFxyXG4gIFwibGllc1wiOiBcImZpYnNcIixcclxuICBcImxpZ2h0XCI6IFwic3BpdGVcIixcclxuICBcImxpZ2h0ZWRcIjogXCJsaXRcIixcclxuICBcImxpc3RlbiBoZXJlXCI6IFwiaGlzcyBhbmQgbGVhclwiLFxyXG4gIFwibG9hblwiOiBcImxvbmVcIixcclxuICBcImxvbmVcIjogXCJzaW5nbGVcIixcclxuICBcImxvbmVsaW5lc3NcIjogXCJhcm91c2FsXCIsXHJcbiAgXCJsb25lbHlcIjogXCJob3JueVwiLFxyXG4gIFwibG9vayBiYWNrXCI6IFwibGljayB3aW5kb3dzXCIsXHJcbiAgXCJsb29rIGludG8gaGVyIGV5ZXNcIjogXCJnaXZlIGhlciBkaXNlYXNlc1wiLFxyXG4gIFwibG9vayBpbnRvIGhpcyBleWVzXCI6IFwiZ2l2ZSBoaW0gZGlzZWFzZXNcIixcclxuICBcImxvb2sgaW50byB0aGVpciBleWVzXCI6IFwiZ2l2ZSB0aGVtIGRpc2Vhc2VzXCIsXHJcbiAgXCJsb29zZVwiOiBcImxvc2VcIixcclxuICBcImxvc2VcIjogXCJzaGFrZVwiLFxyXG4gIFwibG9zdFwiOiBcImFyb3VzZWRcIixcclxuICBcImxvdmVcIjogXCJjb25mdXNlXCIsXHJcbiAgXCJsb3ZpbmdcIjogXCJzaG92aW5nXCIsXHJcbiAgXCJsdXh1cmlhbnRcIjogXCJsdXh1cmlvdXNcIixcclxuICBcIm1hZFwiOiBcImJhZFwiLFxyXG4gIFwibWFkZVwiOiBcIm1haWRcIixcclxuICBcIm1hZ2ljXCI6IFwiaG9wZVwiLFxyXG4gIFwibWFnaWNrXCI6IFwiZGVsdXNpb25cIixcclxuICBcIm1hbm5lcnNcIjogXCJiYW5uZXJzXCIsXHJcbiAgXCJtYXJyeVwiOiBcIm1lcnJ5XCIsXHJcbiAgXCJtYXJ0aWFsXCI6IFwibWFyc2hhbFwiLFxyXG4gIFwibWFza1wiOiBcInRyYXNoYmFnXCIsXHJcbiAgXCJtYXNzYWNyZXNcIjogXCJtYXNjYXJhc1wiLFxyXG4gIFwibWFzc2V1c2VcIjogXCJtYXNzZXVyXCIsXHJcbiAgXCJtYXplbHRvdlwiOiBcIm1vbG90b3ZcIixcclxuICBcIm1lXCI6IFwiaVwiLFxyXG4gIFwibWVhbnMgbWFueSB0aGluZ3NcIjogXCJpcyBiZXN0IGRlc2NyaWJlZCB3aXRoIGxpZXNcIixcclxuICBcIm1lYXRcIjogXCJtZWV0XCIsXHJcbiAgXCJtZWRpYW5cIjogXCJtZWRpdW1cIixcclxuICBcIm1lZGl0YXRlXCI6IFwibWVuc3RydWF0ZVwiLFxyXG4gIFwibWVkaXVtXCI6IFwibWVkaWFuXCIsXHJcbiAgXCJtZWV0IGFnYWluXCI6IFwiaGF2ZSBhbm90aGVyIGdvLXJvdW5kXCIsXHJcbiAgXCJtZWx0aW5nXCI6IFwic21lbHRpbmdcIixcclxuICBcIm1lbW9yaWFsXCI6IFwibWVtb3JpdW1cIixcclxuICBcIm1lbW9yaWFtXCI6IFwibWVtb3JpYWxcIixcclxuICBcIm1lbmRcIjogXCJzZW5kXCIsXHJcbiAgXCJtZXNjYWxpbmVcIjogXCJtYXNjdWxpbmVcIixcclxuICBcIm1pZG5pZ2h0XCI6IFwiZGF5YnJlYWtcIixcclxuICBcIm1pZHN0XCI6IFwicGFudHNcIixcclxuICBcIm1pZ2h0IGFzIHdlbGxcIjogXCJvaCBmdWNrIEkgb3VnaHR0YVwiLFxyXG4gIFwibWlsaXRhbnRcIjogXCJtYW5pYWNhbFwiLFxyXG4gIFwibWlsaXRhcnlcIjogXCJnYW5nc3RlclwiLFxyXG4gIFwibWlsaXRpYVwiOiBcImdhbmdcIixcclxuICBcIm1pbmVcIjogXCJpJ3NcIixcclxuICBcIm1pbmlvblwiOiBcImhvcm55IHBpcmF0ZVwiLFxyXG4gIFwibWlub3JpdGllc1wiOiBcIm1pbm9yb3JpdGllc1wiLFxyXG4gIFwibWlub3JzXCI6IFwibWluZXJzXCIsXHJcbiAgXCJtaW5zdHJlbFwiOiBcIm1lbnN0cnVhbFwiLFxyXG4gIFwibWlzY2hpZXZvdXNcIjogXCJtaXNjaGlldmlvdXNcIixcclxuICBcIm1pc3NlZFwiOiBcImhpc3NlZFwiLFxyXG4gIFwibW9uZXlcIjogXCJidW5ueVwiLFxyXG4gIFwibW9uc3RlclwiOiBcImRpc2xleGljIGxvdmVyXCIsXHJcbiAgXCJtb29uXCI6IFwibmlnaHQgbGlnaHRcIixcclxuICBcIm1vb25saWdodFwiOiBcIm1vb25zaGluZVwiLFxyXG4gIFwibW9ydGFsXCI6IFwicXVlZXJcIixcclxuICBcIm1vc3QgcGVvcGxlIGNhbiBvbmx5XCI6IFwibW9zdCBmcmVha3MgYW5kIGRvcGUgZmllbmRzXCIsXHJcbiAgXCJtdXN0ZXJlZFwiOiBcIm11c3RhcmRcIixcclxuICBcIm15IGxvcmRcIjogXCJzd2VldCBwYWxtXCIsXHJcbiAgXCJteVwiOiBcImkncyBcIixcclxuICBcIm15c2VsZlwiOiBcIm15IG11Y2huZXNzXCIsXHJcbiAgXCJteXN0ZXJpZXNcIjogXCJuZW9uIHNpZ25zXCIsXHJcbiAgXCJteXN0ZXJ5XCI6IFwibmVvbiBzaWduXCIsXHJcbiAgXCJteXN0aWNcIjogXCJhbGNvaG9saWNcIixcclxuICBcIm5haWxzXCI6IFwidGFpbHNcIixcclxuICBcIm5ha2VkXCI6IFwidW5zaGF2ZWRcIixcclxuICBcIm5lZWRsZVwiOiBcIm51cmRsZVwiLFxyXG4gIFwibmV2ZXIgZW5kXCI6IFwiZHJhZyBvblwiLFxyXG4gIFwibmV2ZXIgZW5kaW5nXCI6IFwicmVsZW50bGVzc1wiLFxyXG4gIFwibmV2ZXIgZ29pbmdcIjogXCJmdWNrZWQgZm9yIHRyeWluZ1wiLFxyXG4gIFwibmV2ZXIgdGhvdWdodCB5b3Ugd291bGQgZG8gdGhhdFwiOiBcImdvdCB0dXJuZWQgb3V0IGxpa2UgYSBkdW1iIGZ1Y2tcIixcclxuICBcIm5ldmVyZW5kaW5nXCI6IFwibmV2ZXIgZW5kaW5nXCIsXHJcbiAgXCJuaWNrXCI6IFwicGlja1wiLFxyXG4gIFwibmlnaHRcIjogXCJiZWR0aW1lXCIsXHJcbiAgXCJuaWdodG1hcmVcIjogXCJ0YW50cnVtXCIsXHJcbiAgXCJubyBtYXR0ZXJcIjogXCJpcnJlZ2FyZGxlc3Mgb2ZcIixcclxuICBcIm5vIHRhaWxzXCI6IFwidG9lIG5haWxzXCIsXHJcbiAgXCJub21hZFwiOiBcImRydW5rIGhvYm9cIixcclxuICBcIm5vbmVcIjogXCJudW5cIixcclxuICBcIm5vdCBzdHJvbmcgZW5vdWdoXCI6IFwiYWluJ3QgZ290IHRoZSBudXRzXCIsXHJcbiAgXCJub3RoaW5nIGlzIGFzc3VyZWRcIjogXCJ3ZSBsaXZlIHRvIGRlbGl2ZXJcIixcclxuICBcIm5vdmVsdHkgcXVpY2tseSB3ZWFycyBvZmZcIjogXCJkdW1iIHNoaXQgZ2l0cyBvbGQgZmFzdFwiLFxyXG4gIFwibm93IGF0IGFuIGVuZFwiOiBcImJyYW5kIHNwYW5raW4gbmV3XCIsXHJcbiAgXCJvXCI6IFwidWhcIixcclxuICBcIm8nXCI6IFwidWhcIixcclxuICBcIm9idGFpblwiOiBcImdldFwiLFxyXG4gIFwib2NlYW5cIjogXCJzZXdlclwiLFxyXG4gIFwib2hcIjogXCJvd2VcIixcclxuICBcIm9uZVwiOiBcIndvblwiLFxyXG4gIFwib25seSB3YW50ZWRcIjogXCJiZWdnZWQgZm9yXCIsXHJcbiAgXCJvcHByZXNzXCI6IFwicmVwcmVzc1wiLFxyXG4gIFwib3JpZW50XCI6IFwib3JpZW50YXRlXCIsXHJcbiAgXCJvc3RlbnNpYmx5XCI6IFwib3N0ZW5zaXZlbHlcIixcclxuICBcIm91clwiOiBcInRoZWlyXCIsXHJcbiAgXCJvdXJzXCI6IFwidGhlaXJzXCIsXHJcbiAgXCJvdXRcIjogXCJzaG91dFwiLFxyXG4gIFwib3V0d2FyZCBhcHBlYXJhbmNlXCI6IFwiZmFjYWRlXCIsXHJcbiAgXCJvdmVyZG9cIjogXCJvdmVyZHVlXCIsXHJcbiAgXCJvdmVyc2VlXCI6IFwib3Zlcmxvb2tcIixcclxuICBcInBhY2tcIjogXCJsYWNrXCIsXHJcbiAgXCJwYWlkXCI6IFwibGFpZFwiLFxyXG4gIFwicGFpbFwiOiBcInBhbGVcIixcclxuICBcInBhaW5cIjogXCJsZXRoYXJneVwiLFxyXG4gIFwicGFsZVwiOiBcInNleHlcIixcclxuICBcInBhcmFseXNpc1wiOiBcInBhcmFseXphdGlvblwiLFxyXG4gIFwicGFyYW1ldGVyc1wiOiBcInBlcmltZXRlcnNcIixcclxuICBcInBhc3Npb25cIjogXCJkZWxpcml1bVwiLFxyXG4gIFwicGFzc2lvbmF0ZVwiOiBcImRlbGlyaW91c1wiLFxyXG4gIFwicGF0aFwiOiBcInNpZGV3YWxrXCIsXHJcbiAgXCJwZWFjZVwiOiBcInBpZWNlXCIsXHJcbiAgXCJwZWFrXCI6IFwicGVla1wiLFxyXG4gIFwicGVuXCI6IFwicGVuaXNcIixcclxuICBcInBlcmZlY3RcIjogXCJmdWNrZWRcIixcclxuICBcInBlcnNlY3V0ZVwiOiBcImV4ZWN1dGVcIixcclxuICBcInBlcnNwZWN0aXZlXCI6IFwicHJvc3BlY3RpdmVcIixcclxuICBcInBlcnNwaXJlXCI6IFwiZXhwaXJlXCIsXHJcbiAgXCJwZXJ2ZXJ0XCI6IFwib3JldmVydFwiLFxyXG4gIFwicGV0YWxcIjogXCJkaW5nbGViZXJyeVwiLFxyXG4gIFwicGhvbmVcIjogXCJ0aG9uZ1wiLFxyXG4gIFwicGllY2UgYnkgcGllY2VcIjogXCJjaG9ydGxlIGJ5IGNob3J0bGVcIixcclxuICBcInBpbGxvd1wiOiBcInN0b25lXCIsXHJcbiAgXCJwbGFpblwiOiBcInBsYW5lXCIsXHJcbiAgXCJwb2VtXCI6IFwic2NyaWJibGVcIixcclxuICBcInBvZXRcIjogXCJob2JvXCIsXHJcbiAgXCJwb2V0aWNcIjogXCJmbGF0dWxlbnRcIixcclxuICBcInBvZXRyeVwiOiBcImJhZCBnYXNcIixcclxuICBcInBvbGVcIjogXCJwb2xsXCIsXHJcbiAgXCJwb29yXCI6IFwicG91clwiLFxyXG4gIFwicG9wY29yblwiOiBcImNvcCBwb3JuXCIsXHJcbiAgXCJwcmFjdGljYWxcIjogXCJwcmFjdGljbGVcIixcclxuICBcInByYWN0aWNlXCI6IFwicHJhY3Rpc2VcIixcclxuICBcInByYXlcIjogXCJtdXJtdXJcIixcclxuICBcInByZS1tYXJpdGFsXCI6IFwicHJlbWFydGlhbFwiLFxyXG4gIFwicHJlYXJyYW5nZWRcIjogXCJwcmVkZXJyYW5nZWRcIixcclxuICBcInByZWNlZGVcIjogXCJwcm9jZWVkXCIsXHJcbiAgXCJwcmVjaXBpdGF0ZVwiOiBcInByZWNpcGl0b3VzXCIsXHJcbiAgXCJwcmVzY3JpYmVcIjogXCJwcm9zY3JpYmVcIixcclxuICBcInByaW5jaXBhbFwiOiBcInByaW5jaXBsZVwiLFxyXG4gIFwicHJpc29uXCI6IFwib3V0aG91c2VcIixcclxuICBcInByb2JsZW1cIjogXCJ1c2VsZXNzIGNvbmNlcm5cIixcclxuICBcInByb21pc2VcIjogXCJsaWVcIixcclxuICBcInByb3BoZWNpZXNcIjogXCJ3aXZlcyB0YWxlc1wiLFxyXG4gIFwicHJvcGhlY3lcIjogXCJ3aXZlcyB0YWxlXCIsXHJcbiAgXCJwcm9waGV0XCI6IFwiaW5zb21uaWFjXCIsXHJcbiAgXCJwcm9zdGF0ZVwiOiBcInByb3N0cmF0ZVwiLFxyXG4gIFwicHVrZSBvblwiOiBcImNvdXBvblwiLFxyXG4gIFwicHV0IHVwIHdpdGhcIjogXCJtYW5oYW5kbGVcIixcclxuICBcInB1dHJpZFwiOiBcInBsZWFzYW50XCIsXHJcbiAgXCJxdWFsaWZpY2F0aW9uc1wiOiBcInF1YWxpZmlkYXRpb25zXCIsXHJcbiAgXCJxdWVzdFwiOiBcInN0cm9sbFwiLFxyXG4gIFwicXVpZXRcIjogXCJxdWl0ZVwiLFxyXG4gIFwicmFjZVwiOiBcImZhY2VcIixcclxuICBcInJhaW5cIjogXCJzcHVua1wiLFxyXG4gIFwicmFpbmJvd1wiOiBcInBpenphenpcIixcclxuICBcInJhcFwiOiBcIndyYXBcIixcclxuICBcInJhcGVcIjogXCJ3aGF0XCIsXHJcbiAgXCJyYXBpbmdcIjogXCJ3aGF0XCIsXHJcbiAgXCJyYXJlXCI6IFwicmFyaWZpZWRcIixcclxuICBcInJhdGlvbmFsZVwiOiBcInJhdGlvbmFsaXphdGlvblwiLFxyXG4gIFwicmF2YWdpbmdcIjogXCJyYXZpc2hpbmdcIixcclxuICBcInJhdmVuXCI6IFwicGlnZW9uXCIsXHJcbiAgXCJyYXZpc2hpbmdcIjogXCJyYXZlbm91c1wiLFxyXG4gIFwicmF5XCI6IFwic2NyaWJibGVcIixcclxuICBcInJhem9yXCI6IFwiZGlsZG9cIixcclxuICBcInJhem9yYmxhZGVcIjogXCJidXR0IHBsdWdcIixcclxuICBcInJlYWN0aW9uYXJ5XCI6IFwicmVhY3RpdmVcIixcclxuICBcInJlYWxcIjogXCJyZWVsXCIsXHJcbiAgXCJyZWFsaXR5XCI6IFwidG9pbGV0IGJvd2xcIixcclxuICBcInJlYmVsbGluZ1wiOiBcInJldm9sdGluZ1wiLFxyXG4gIFwicmVidXRcIjogXCJyZWZ1dGVcIixcclxuICBcInJlY2tsZXNzXCI6IFwid3JlY2tsZXNzXCIsXHJcbiAgXCJyZWZ1dGVcIjogXCJyZWZ1ZGlhdGVcIixcclxuICBcInJlZ2FyZGxlc3NcIjogXCJpcnJlZ2FyZGxlc3NcIixcclxuICBcInJlZ3JldGZ1bGx5XCI6IFwicmVncmV0dGFibHlcIixcclxuICBcInJlZ3VyZ2l0YXRlXCI6IFwiZGV0ZXJnZXJhdGVcIixcclxuICBcInJlaGFiaWxpdGF0ZVwiOiBcImRlYmlsaXRhdGVcIixcclxuICBcInJlbGVhdmVcIjogXCJyZWxpdmVcIixcclxuICBcInJlbWVtYmVyXCI6IFwibXVtYmxlXCIsXHJcbiAgXCJyZXBlbFwiOiBcInJlcHVsc2VcIixcclxuICBcInJlcHV0ZVwiOiBcInJlZnV0ZVwiLFxyXG4gIFwicmVzdCBpbiBwZWFjZVwiOiBcInBhcnR5IGxpa2UgaXQncyAxOTk5XCIsXHJcbiAgXCJyaWRkbGVcIjogXCJwb2xrYSBkb3RcIixcclxuICBcInJpZ2h0XCI6IFwiZmlnaHRcIixcclxuICBcInJpZ2h0ZW91c1wiOiBcImFycm9nYW50XCIsXHJcbiAgXCJyaW5nXCI6IFwid3JpbmdcIixcclxuICBcInJpdHVhbFwiOiBcImJhbmFuYSBkYW5jZVwiLFxyXG4gIFwicm9sZVwiOiBcInJvbGxcIixcclxuICBcInJvc2VcIjogXCJhbnVzXCIsXHJcbiAgXCJzYWRcIjogXCJpbXBvdGVudFwiLFxyXG4gIFwic2FkZFwiOiBcImZsYWNjaWRcIixcclxuICBcInNhZGRlbmVkXCI6IFwibWFkZSBmbGFjY2lkXCIsXHJcbiAgXCJzYWRuZXNzXCI6IFwiaW1wb3RlbmNlXCIsXHJcbiAgXCJzYWlsXCI6IFwic2FsZVwiLFxyXG4gIFwic2FsYWRcIjogXCJiYWxsYWRcIixcclxuICBcInNhbGllbnRcIjogXCJzYWxpbmVcIixcclxuICBcInNhbml0YXJpdW1cIjogXCJzYW5pcXVhcml1bVwiLFxyXG4gIFwic2F2ZVwiOiBcIndhdmVcIixcclxuICBcInNjYXBlZ29hdFwiOiBcImVzY2FwZSBnb2F0XCIsXHJcbiAgXCJzY2FyXCI6IFwic3RyaWFcIixcclxuICBcInNjYXJlXCI6IFwidGlja2xlXCIsXHJcbiAgXCJzY2FycmVkXCI6IFwic3RyaWF0ZWRcIixcclxuICBcInNjYXJzXCI6IFwic3RyaWFlXCIsXHJcbiAgXCJzY2FyeVwiOiBcInRpY2tseVwiLFxyXG4gIFwic2NlbmVcIjogXCJzZWVuXCIsXHJcbiAgXCJzY3JlYW1cIjogXCJncnVudFwiLFxyXG4gIFwic2VhXCI6IFwiYmF0aFwiLFxyXG4gIFwic2VhbFwiOiBcImhlYWxcIixcclxuICBcInNlYW1cIjogXCJzZWVtXCIsXHJcbiAgXCJzZWd1ZVwiOiBcInNlZ3dheVwiLFxyXG4gIFwic2VsZiBlc3RlZW1cIjogXCJzZWxmIG9mIHN0ZWFtXCIsXHJcbiAgXCJzZWxmLWRlcHJlY2lhdGluZ1wiOiBcInNlbGYtZGVmaWNhdGluZ1wiLFxyXG4gIFwic2VsZmlzaFwiOiBcInRoaWV2aW5nXCIsXHJcbiAgXCJzZW5kXCI6IFwibWVuZFwiLFxyXG4gIFwic2Vuc2VcIjogXCJzaW5jZVwiLFxyXG4gIFwic2V0IHRoZSBtb29kXCI6IFwid2hpcCBpdCBvdXRcIixcclxuICBcInNoYWtlXCI6IFwidGFrZVwiLFxyXG4gIFwic2hhbGxcIjogXCJzaG91bGQtd2lsbFwiLFxyXG4gIFwic2hlbGxlZFwiOiBcInVuc2hlbGxlZFwiLFxyXG4gIFwic2hlcGhlcmRcIjogXCJsZW9wYXJkXCIsXHJcbiAgXCJzaGluZVwiOiBcImJsaW5nXCIsXHJcbiAgXCJzaG9vdGluZyBzdGFyXCI6IFwic3dpZnQgbWlzc2lsZVwiLFxyXG4gIFwic2hvdXRcIjogXCJvdXRcIixcclxuICBcInNob3ZpbmdcIjogXCJsb3ZpbmdcIixcclxuICBcInNob3dlclwiOiBcInRvd2VyXCIsXHJcbiAgXCJzaWNrXCI6IFwiaGlja1wiLFxyXG4gIFwic2luY2VcIjogXCJzZW5zZVwiLFxyXG4gIFwic2l0ZVwiOiBcInNpZ2h0XCIsXHJcbiAgXCJza2luXCI6IFwiYmlzY3VpdHNcIixcclxuICBcInNsYXNoXCI6IFwibXV0aWxhdGVcIixcclxuICBcInNsYXZlXCI6IFwiZ2ltcFwiLFxyXG4gIFwic2xpY2VcIjogXCJwZXRcIixcclxuICBcInNsaXRcIjogXCJjcmV2aWNlXCIsXHJcbiAgXCJzbyBnb29kXCI6IFwibmVhdG9cIixcclxuICBcInNvIG1vdGUgaXQgYmVcIjogXCJpdCdzIHJlYWwgaW4gbXkgaGVhZFwiLFxyXG4gIFwic28gbmVydm91c1wiOiBcInNvIGZ1Y2tpbmcgZHJ1bmtcIixcclxuICBcInNvXCI6IFwic2V3XCIsXHJcbiAgXCJzb2FyXCI6IFwic29yZVwiLFxyXG4gIFwic29jaWFsXCI6IFwic29jaWV0YWxcIixcclxuICBcInNvaWxcIjogXCJ0b2lsXCIsXHJcbiAgXCJzb2xkaWVyXCI6IFwibWFuaWFjXCIsXHJcbiAgXCJzb2xlXCI6IFwic291bFwiLFxyXG4gIFwic29saXR1ZGVcIjogXCJhbWJpYW5jZVwiLFxyXG4gIFwic29tZVwiOiBcInN1bVwiLFxyXG4gIFwic29uc1wiOiBcInRvbnNcIixcclxuICBcInNvb25cIjogXCJzbHV0dHlcIixcclxuICBcInNvcnJvd1wiOiBcIndoaW1wZXJcIixcclxuICBcInNvdWxcIjogXCJiYW5hbmFcIixcclxuICBcInNwZWFrIG9mXCI6IFwidGFsayBhYm91dFwiLFxyXG4gIFwic3BlY2lhbGx5XCI6IFwiZXNwZWNpYWxseVwiLFxyXG4gIFwic3BlZWRcIjogXCJsZWFkXCIsXHJcbiAgXCJzcGlyaXRcIjogXCJiYW5hbmFcIixcclxuICBcInNwaXJpdHVhbFwiOiBcImJhbmFuYSBjcmF2aW5nXCIsXHJcbiAgXCJzcGl0ZVwiOiBcImxpZ2h0XCIsXHJcbiAgXCJzcHJlYWRcIjogXCJzb3Jlc1wiLFxyXG4gIFwic3ByaW5nXCI6IFwidHViZSBzb2Nrc1wiLFxyXG4gIFwic3RhbXBcIjogXCJkYW1wXCIsXHJcbiAgXCJzdGFuZCBvdXQgZnJvbSB0aGUgY3Jvd2RcIjogXCJsb29rIGxpa2UgYSBqYWNrYXNzXCIsXHJcbiAgXCJzdGFuZGluZyBvdXQgZnJvbSB0aGUgY3Jvd2RcIjogXCJ3b2JibGluZyBsaWtlIGFuIGVsZXBoYW50IG9uIGEgYmljeWNsZVwiLFxyXG4gIFwic3RhbmRzIG91dCBmcm9tIHRoZSBjcm93ZFwiOiBcInNtZWxscyBsaWtlIG9sZCBkaWNrXCIsXHJcbiAgXCJzdGFyXCI6IFwibWlzc2lsZVwiLFxyXG4gIFwic3RhdHVyZVwiOiBcInN0YXR1ZVwiLFxyXG4gIFwic3RlYWxcIjogXCJzdGVlbFwiLFxyXG4gIFwic3RlYWxlclwiOiBcImRlYWxlclwiLFxyXG4gIFwic3RlZWxcIjogXCJsYXRleFwiLFxyXG4gIFwic3Rvb2Qgb3V0IGZyb20gdGhlIGNyb3dkXCI6IFwiamlnZ2xlZCBsaWtlIGEgamVsbG8gU2FudGFcIixcclxuICBcInN0b3BcIjogXCJwdXNoXCIsXHJcbiAgXCJzdG9wcFwiOiBcInB1c2hcIixcclxuICBcInN0b3JtXCI6IFwib3JneVwiLFxyXG4gIFwic3RyYXRlZ2llc1wiOiBcInRyYWdlZGllc1wiLFxyXG4gIFwic3R1ZHlpbmdcIjogXCJzdHVkZGluZ1wiLFxyXG4gIFwic3Vic3RhbnRpYWxcIjogXCJzdWJzdGFudGl2ZVwiLFxyXG4gIFwic3VmZmVyXCI6IFwicGlyb3VldHRlXCIsXHJcbiAgXCJzdWljaWRlXCI6IFwibXVyZGVyXCIsXHJcbiAgXCJzdW5cIjogXCJ5ZWxsb3cgZGlza1wiLFxyXG4gIFwic3VubnlcIjogXCJzd2VsdGVyaW5nXCIsXHJcbiAgXCJzdXBwb3NlZGx5XCI6IFwic3VwcG9zYWJseVwiLFxyXG4gIFwic3dlYXRcIjogXCJmYXJ0XCIsXHJcbiAgXCJzd29yZFwiOiBcImRpbGRvXCIsXHJcbiAgXCJzeW5jaHJvbml6ZVwiOiBcInN5bXBhdGhpemVcIixcclxuICBcInRhaWxcIjogXCJ0YWxlXCIsXHJcbiAgXCJ0YWtlIGNhcmUgb2ZcIjogXCJkZWNpbWF0ZVwiLFxyXG4gIFwidGFrZSBjYXJlXCI6IFwiZm9yZ2V0XCIsXHJcbiAgXCJ0YWtlXCI6IFwic2hha2VcIixcclxuICBcInRha2VzIGNhcmVcIjogXCJmb3JnZXRzXCIsXHJcbiAgXCJ0YWtpbmcgY2FyZVwiOiBcImZvcmdldGluZ1wiLFxyXG4gIFwidGFsa1wiOiBcImN1c3NcIixcclxuICBcInRhc3RlXCI6IFwid2FzdGVcIixcclxuICBcInRhdW50XCI6IFwidGF1dFwiLFxyXG4gIFwidGVhclwiOiBcInNwdW5rXCIsXHJcbiAgXCJ0ZWFyZHJvcFwiOiBcInRlYXIgZHJvcFwiLFxyXG4gIFwidGVhcnNcIjogXCJlYXJzXCIsXHJcbiAgXCJ0ZWFzZVwiOiBcImVhc2VcIixcclxuICBcInRlbGwgeW91IGknbSBmaW5lXCI6IFwic2NyZW0gSSdNIEZVQ0tJTiBPS1wiLFxyXG4gIFwidGVuYW50XCI6IFwidGVuZXRcIixcclxuICBcInRlbmV0c1wiOiBcInRlbmFudHNcIixcclxuICBcInRlcm1cIjogXCJ3b3JtXCIsXHJcbiAgXCJ0ZXN0YW1lbnRcIjogXCJ0ZW50YWNsZVwiLFxyXG4gIFwidGhlIGJlc3RcIjogXCJ0aGUgYmFkZGVzdFwiLFxyXG4gIFwidGhlIGZpcnN0IG1vbWVudFwiOiBcInN0cmFpZ2h0YXdheVwiLFxyXG4gIFwidGhlIG9ubHkgb25lXCI6IFwiZnVja2luZyBzdHVwaWRcIixcclxuICBcInRoZSBwb2ludCBvZiBubyByZXR1cm5cIjogXCJ0aGUgc3RyYW5nZXIncyBzZXggZHVuZ2VvblwiLFxyXG4gIFwidGhlIHNwcmluZ1wiOiBcInR1YmUgc29ja1wiLFxyXG4gIFwidGhlIHdheSBpdCBpc1wiOiBcImhvdyBpdCBiZVwiLFxyXG4gIFwidGhlZVwiOiBcInlvdVwiLFxyXG4gIFwidGhlaXJcIjogXCJ0aGVyZVwiLFxyXG4gIFwidGhlcmVmb3JcIjogXCJ0aGVyZWZvcmVcIixcclxuICBcInRoaW5lXCI6IFwieW91J3NcIixcclxuICBcInRoaW5rXCI6IFwic2NoZW1lXCIsXHJcbiAgXCJ0aG9yb3VnaFwiOiBcInRob3JvdWdoZ29pbmdcIixcclxuICBcInRob3VcIjogXCJ5b3VcIixcclxuICBcInRocm9uZVwiOiBcInRocm9iXCIsXHJcbiAgXCJ0aHJvdWdoIHlvdXIgaGFpclwiOiBcInVwc2lkZSB5b3VyIGhlYWRcIixcclxuICBcInRodXNseVwiOiBcInRodXNcIixcclxuICBcInRpbWVcIjogXCJ0aHJvYmJpbmdcIixcclxuICBcInRvIGEgYmV0dGVyXCI6IFwiZm9yIHNvbWUgZ2xpdHRlcmVkXCIsXHJcbiAgXCJ0byBnZXQgYXdheVwiOiBcInRvIGZ1Y2tpbmcgcnVuXCIsXHJcbiAgXCJ0byBubyBhdmFpbFwiOiBcImZvciBncmVhdCBnb29kXCIsXHJcbiAgXCJ0byB0aGUgbGlnaHRcIjogXCJvdXQgaW4gcHVibGljXCIsXHJcbiAgXCJ0b2VcIjogXCJ0b3dcIixcclxuICBcInRvaWxcIjogXCJzb2lsXCIsXHJcbiAgXCJ0b2lsZXRcIjogXCJ0ZXJsaXRcIixcclxuICBcInRvbnNcIjogXCJzb25zXCIsXHJcbiAgXCJ0b28gZ29vZCB0byBiZSB0cnVlXCI6IFwiZnVja2luZyBmYW50YXN0aWNcIixcclxuICBcInRvcm1lbnRcIjogXCJ0aWNrbGVcIixcclxuICBcInRvcm5cIjogXCJodWdnbGVkXCIsXHJcbiAgXCJ0b3JuYWRvXCI6IFwidG9tYXRvXCIsXHJcbiAgXCJ0b3VjaFwiOiBcImdyb3BlXCIsXHJcbiAgXCJ0b3V0XCI6IFwidGF1dFwiLFxyXG4gIFwidG93YXJkXCI6IFwidG93YXJkc1wiLFxyXG4gIFwidG93ZXJcIjogXCJzaG93ZXJcIixcclxuICBcInRyYWdlZGllc1wiOiBcInN0cmF0ZWdpZXNcIixcclxuICBcInRyYW1wb2xpbmVcIjogXCJ0cmFtcGFsb29uXCIsXHJcbiAgXCJ0cnV0aFwiOiBcInRyaXZpYVwiLFxyXG4gIFwidHJ5XCI6IFwic2hvb3RcIixcclxuICBcInR1cHBlcndhcmVcIjogXCJ1bmRlcndlYXJcIixcclxuICBcInR3YXNcIjogXCJpdCB3YXNcIixcclxuICBcInR3aWxpZ2h0XCI6IFwibW9vbnNoaW5lXCIsXHJcbiAgXCJ0d2lua2xlXCI6IFwic3Ryb2JlXCIsXHJcbiAgXCJ0d2lua2xpbmdcIjogXCJzdHJvYmluZ1wiLFxyXG4gIFwidWx0ZXJpb3JcIjogXCJhbHRlcmlvclwiLFxyXG4gIFwidW5jYXJpbmdcIjogXCJwcmlja2lzaFwiLFxyXG4gIFwidW5jb25zY2lvdXNcIjogXCJ1bmNvbnNjaWVuY2VcIixcclxuICBcInVuZGVyc3RhbmRcIjogXCJzdHJva2UgbXkgZWdvXCIsXHJcbiAgXCJ1bmlmb3JtXCI6IFwidW5pY29yblwiLFxyXG4gIFwidW5pdGVkXCI6IFwidW50aWVkXCIsXHJcbiAgXCJ1bml2ZXJzZVwiOiBcInRvaWxldCBib3dsXCIsXHJcbiAgXCJ1bnBhcmFsbGVkXCI6IFwidW5wYXJhbHl6ZWRcIixcclxuICBcInVucGFyYWxsZWxlZFwiOiBcInVucGFyYWx5emVkXCIsXHJcbiAgXCJ1bnRpZWRcIjogXCJ1bml0ZWRcIixcclxuICBcInVwbW9zdFwiOiBcInV0bW9zdFwiLFxyXG4gIFwidXBwZWQgdGhlIGFudGVcIjogXCJ1cHBlZCB0aGUgYW5uaWVcIixcclxuICBcInVzXCI6IFwidGhlbVwiLFxyXG4gIFwidXNhZ2VcIjogXCJ1c2VcIixcclxuICBcInV0aWxpemVcIjogXCJ1c2VcIixcclxuICBcInZhY2F0aW9uXCI6IFwidm9jYXRpb25cIixcclxuICBcInZhbGxleVwiOiBcImRpdGNoXCIsXHJcbiAgXCJ2YW1waXJlXCI6IFwicGVkb3BoaWxlXCIsXHJcbiAgXCJ2YW1waXJpY1wiOiBcInBlZG9waGlsaWNcIixcclxuICBcInZhbXB5cmVcIjogXCJwZWRvcGh5bGVcIixcclxuICBcInZhcnlcIjogXCJ2ZXJ5XCIsXHJcbiAgXCJ2ZWlsXCI6IFwiZGlzZ3Vpc2VcIixcclxuICBcInZlbmdlXCI6IFwiLXJvd2R5LVwiLFxyXG4gIFwidmVuZ2VhbmNlXCI6IFwic2xhcCBoYXBwaW5lc3NcIixcclxuICBcInZlcmJpYWdlXCI6IFwidmVyYmFnZVwiLFxyXG4gIFwidmVyaWNvc2VcIjogXCJ2ZXJ5IGNsb3NlXCIsXHJcbiAgXCJ2aWNlIHZlcnNhXCI6IFwiaXBzbyBmYXRzb1wiLFxyXG4gIFwidmlvbGFcIjogXCJ2b2lsYVwiLFxyXG4gIFwidmlvbGVuY2VcIjogXCJ2aW9saW5zXCIsXHJcbiAgXCJ2aXJ0dWVcIjogXCJ2aXJnaW5cIixcclxuICBcInZpc2Npb3VzIGN5Y2xlXCI6IFwiY2x1c3RlcmZ1Y2tcIixcclxuICBcInZpc2NvdXMgY2lyY2xlXCI6IFwidmljaW91cyBjeWNsZVwiLFxyXG4gIFwidmlzdGFcIjogXCJzY2VuZVwiLFxyXG4gIFwidm9pZFwiOiBcImJ1Y2tldFwiLFxyXG4gIFwidm9sdXB0dW91c1wiOiBcInZvbHVtcHR1b3VzXCIsXHJcbiAgXCJ3YWlsXCI6IFwid2hhbGVcIixcclxuICBcIndhaXN0XCI6IFwid2FzdGVcIixcclxuICBcIndhaXRcIjogXCJ3ZWlnaHRcIixcclxuICBcIndhbGsgb3V0XCI6IFwibmFycm93bHkgZXNjYXBlXCIsXHJcbiAgXCJ3YWxrZWQgb3V0XCI6IFwibmFycm93bHkgZXNjYXBlZFwiLFxyXG4gIFwid2Fsa2luZyBvdXRcIjogXCJuYXJyb3dseSBlc2NhcGluZ1wiLFxyXG4gIFwid2FuZGVyXCI6IFwic3R1bWJsZVwiLFxyXG4gIFwid2FyXCI6IFwid29yZVwiLFxyXG4gIFwid2FyZmFyZVwiOiBcImNoaWxkcmVuIGxhdWdoaW5nXCIsXHJcbiAgXCJ3YXJtXCI6IFwiZm9ybVwiLFxyXG4gIFwid2FyblwiOiBcIndvcm5cIixcclxuICBcIndhcnJhbnRlZVwiOiBcIndhcnJhbnR5XCIsXHJcbiAgXCJ3YXJyaW9yXCI6IFwia2l0dGVuXCIsXHJcbiAgXCJ3YXJ5XCI6IFwid2VhcnlcIixcclxuICBcIndhcyBpXCI6IFwid2VyZSBpXCIsXHJcbiAgXCJ3YXN0ZVwiOiBcInRhc3RlXCIsXHJcbiAgXCJ3YXZlXCI6IFwic2F2ZVwiLFxyXG4gIFwid2F5XCI6IFwid2VpZ2hcIixcclxuICBcIndheXNpZGVcIjogXCJ3YXN0ZXNpZGVcIixcclxuICBcIndlXCI6IFwidGhleVwiLFxyXG4gIFwid2Vha1wiOiBcIndlZWtcIixcclxuICBcIndlYXBvblwiOiBcImNhcCBndW5cIixcclxuICBcIndlYXJ5XCI6IFwibGVlcnlcIixcclxuICBcIndlYXRoZXJcIjogXCJ3aGV0aGVyXCIsXHJcbiAgXCJ3ZWRkaW5nXCI6IFwiYmVkZGluZ1wiLFxyXG4gIFwid2Vla1wiOiBcIndlZWRcIixcclxuICBcIndlbGxzXCI6IFwiYmVsbHNcIixcclxuICBcIndlcmV3b2xmXCI6IFwid2VpcmR3b2xmXCIsXHJcbiAgXCJ3aGFsZXNcIjogXCJzYWlsc1wiLFxyXG4gIFwid2hhdCBwZW9wbGUgc2F5XCI6IFwibXV0aGFwaHVra2FzIGJlIHRhbGtpblwiLFxyXG4gIFwid2hhdCdzIHRoZSBwb2ludFwiOiBcInRoZSBmdWNrcyB0aGlzIG1lYW5cIixcclxuICBcIndoaWNoXCI6IFwid2l0Y2hcIixcclxuICBcIndpZWxkXCI6IFwiamVya1wiLFxyXG4gIFwid2lsbCBhbHdheXMgYmUgdGhlcmVcIjogXCJzdGljayBsaWtlIHdldCBzaGl0XCIsXHJcbiAgXCJ3aWxsIGJlIHRoZXJlXCI6IFwic3RpY2sgbGlrZSBzaGl0XCIsXHJcbiAgXCJ3aWxsIG5vdCBoZWFsXCI6IFwiZmVzdGVyc1wiLFxyXG4gIFwid2luZFwiOiBcImJsb3dcIixcclxuICBcIndpc2RvbVwiOiBcImJ1bGwgc2hpdFwiLFxyXG4gIFwid2lzZVwiOiBcImJ1bGwgc2hpdHRpbmdcIixcclxuICBcIndpc2hcIjogXCJ3YW50XCIsXHJcbiAgXCJ3aXRoIGV2ZXJ5IGZpYmVyXCI6IFwiZnJvbSBwaXRoeSBwaXRzXCIsXHJcbiAgXCJ3b2VcIjogXCJjaGxhbXlkaWFcIixcclxuICBcIndvbid0IG1ha2UgaXQgdGhyb3VnaFwiOiBcImNvdWxkIHNoaW1teSBwYXN0XCIsXHJcbiAgXCJ3b3JsZFwiOiBcImhhbmQgdG93ZWxcIixcclxuICBcIndvcm1cIjogXCJ0ZXJtXCIsXHJcbiAgXCJ3b3JzZSBjb21lcyB0byB3b3JzdFwiOiBcIndvcnN0IGNvbWVzIHRvIHdvcnN0XCIsXHJcbiAgXCJ3b3J0aHdoaWxlXCI6IFwid29ydGh3aWxkXCIsXHJcbiAgXCJ3b3VuZFwiOiBcIm91Y2hpZVwiLFxyXG4gIFwid3JldGNoXCI6IFwic2tlZXplXCIsXHJcbiAgXCJ3cmV0Y2hlZFwiOiBcInNrZWV6eVwiLFxyXG4gIFwid3JpdGVcIjogXCJzY3Jhd2xcIixcclxuICBcIndyaXR0ZW5cIjogXCJzY3Jhd2xlZFwiLFxyXG4gIFwid3JvbmdcIjogXCJidXp6aW5nXCIsXHJcbiAgXCJ3cm90ZVwiOiBcInNjcmF3bGVkXCIsXHJcbiAgXCJ5ZXRcIjogXCJpbW1lZGlhdGVseVwiLFxyXG4gIFwieW91IGFsbFwiOiBcImFsbCB5b3VcIixcclxuICBcInlvdSB3ZXJlIHRoZSBvbmVcIjogXCJ5b3Ugd2VyZSBteSB0YXJnZXRcIixcclxuICBcInlvdVwiOiBcIkR1bW1pZSdzXCIsXHJcbiAgXCJ5b3UnbGxcIjogXCJ5b3Ugd2lsbFwiLFxyXG4gIFwieW91J3JlXCI6IFwieW91IGlzXCIsXHJcbiAgXCJ5b3UndmVcIjogXCJ5b3UgaGFzXCIsXHJcbiAgXCJ5b3VyXCI6IFwieW91J3NcIixcclxuICBcInlvdXJzXCI6IFwieW91J3NcIixcclxuICBcInlvdXJzZWxmXCI6IFwieW91J3MgbXVjaG5lc3NcIixcclxuICBcInplYnJhc1wiOiBcInplYmVyZWxsYXNcIixcclxuICBcInp1Y2NoaW5pXCI6IFwiY3Vpc2luaVwiXHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxuLypqc2xpbnRcclxuICAgIG5vZGU6IHRydWVcclxuKi9cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuYXRyb3BhLnJlZ2V4ID0gcmVxdWlyZSgnYXRyb3BhLXJlZ2V4JykucmVnZXg7XHJcbmF0cm9wYS5zdHJpbmcgPSByZXF1aXJlKCdhdHJvcGEtc3RyaW5nJykuc3RyaW5nO1xyXG5hdHJvcGEuc2V0QXNPcHRpb25hbEFyZyA9IHJlcXVpcmUoJ2F0cm9wYS1zZXRBc09wdGlvbmFsQXJnJykuc2V0QXNPcHRpb25hbEFyZztcclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlLFxyXG4gICAgdmFyczogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgYXRyb3BhLnJlcXVpcmVzKCd3dGYnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHN1cHBvcnRlZCA9IHRydWU7XHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBhdHJvcGEucmVnZXgsXHJcbiAgICAgICAgICAgIGF0cm9wYS5zdHJpbmcuY291bnRXb3JkcyxcclxuICAgICAgICAgICAgYXRyb3BhLnNldEFzT3B0aW9uYWxBcmdcclxuICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKHByZXJlcXVpc2l0ZSkge1xyXG4gICAgICAgICAgICBpZiAocHJlcmVxdWlzaXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcclxuICAgIH0pO1xyXG59KCkpO1xyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgYXRyb3BhLnJlcXVpcmVzKCd3dGZIdG1sRWxlbWVudCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc3VwcG9ydGVkID0gdHJ1ZTtcclxuICAgICAgICBbd2luZG93XS5mb3JFYWNoKGZ1bmN0aW9uIChwcmVyZXF1aXNpdGUpIHtcclxuICAgICAgICAgICAgaWYgKHByZXJlcXVpc2l0ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XHJcbiAgICB9KTtcclxufSgpKTtcclxuLyoqXHJcbiAqIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIFdURmlmaWVyIHJlbGF0ZWQgZnVuY3Rpb25zIGFuZCBzdWNoLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBXVEZpZmllciByZWxhdGVkIGZ1bmN0aW9ucyBhbmQgc3VjaC5cclxuICogQHJlcXVpcmVzIGF0cm9wYS5yZWdleFxyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLnd0Zi5kaWN0aW9uYXJ5XHJcbiAqL1xyXG5hdHJvcGEud3RmID0ge307XHJcbi8qKlxyXG4gKiBUaGUgR2xvcmlvdXMgV1RGaWZpY2F0aW9uIERpY3Rpb25hcnk6IFR1cm5pbmcgU2hpdFxyXG4gKiBJbnRvIFBvbGlzaGVkIFR1cmRzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMTBcclxuICovXHJcbmF0cm9wYS53dGYuZGljdGlvbmFyeSA9IHJlcXVpcmUoJy4vYXRyb3BhLXd0Zi1kaWN0aW9uYXJ5Lmpzb24nKTtcclxuLyoqXHJcbiAqIEFjY2VwdHMgcGxhaW4gdGV4dCBpbnB1dCBhbmQgR2xvcmlvdXNseSBXVEZpZmllcyBpdC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTEwXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0YXJnZXQgVGhlIHRleHQgdG8gV1RGaWZ5LlxyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG91dHB1dEhUTUwgU3BlY2lmaWVzIGlmIHlvdSB3YW50IHRoZSBvdXRwdXRcclxuICogIGluIEhUTUwgZm9ybWF0LiBJZiBmYWxzZSwgd2lsbCBvdXRwdXQgcGxhaW4gdGV4dC4gRGVmYXVsdHNcclxuICogIHRvIGZhbHNlLlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFJldHVybnMgR2VudWluZSBXVEZpZmllZCB0ZXh0LlxyXG4gKi9cclxuYXRyb3BhLnd0Zi53dGZpZnkgPSBmdW5jdGlvbiAodGFyZ2V0LCBvdXRwdXRIVE1MKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCd3dGYnKTtcclxuICAgIHZhciByZWdleFZhbHVlLCByZXBsYWNlbWVudFRleHQsIG9sZFdvcmQsIHd0ZkNvdW50LCB3b3JkQ291bnQsIHJldCwgd29yZDtcclxuICAgIGlmICh0cnVlICE9PSBvdXRwdXRIVE1MKSB7XHJcbiAgICAgICAgb3V0cHV0SFRNTCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0ID0ge307XHJcbiAgICB3dGZDb3VudCA9IDA7XHJcbiAgICB0YXJnZXQgPSB0YXJnZXQudHJpbSgpO1xyXG4gICAgd29yZENvdW50ID0gYXRyb3BhLnN0cmluZy5jb3VudFdvcmRzKHRhcmdldCk7XHJcbiAgICBpZiAodHJ1ZSA9PT0gb3V0cHV0SFRNTCkge1xyXG4gICAgICAgIHRhcmdldCA9IHRhcmdldC5yZXBsYWNlKC8oXFwuID8pezIsfS9naSwgJzxzcGFuIHN0eWxlPVwiY29sb3IgOiBicm93biA7XCI+IFtzaGl0IHRhY29dIDwvc3Bhbj4nKTtcclxuICAgICAgICB0YXJnZXQgPSAnPHA+ICcgKyB0YXJnZXQucmVwbGFjZSgvKFxcclxcbnxcXHJ8XFxuKS9nLCAnIDxici8+ICcpICsgJyA8L3A+JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnJlcGxhY2UoLyhcXC4gPyl7Mix9L2dpLCAnIFtzaGl0IHRhY29dICcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBBY2NlcHRzIHBsYWluIHRleHQgaW5wdXQgYW5kIEdsb3Jpb3VzbHkgV1RGaWZpZXMgaXQuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMzAxMTJcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEud3RmLnd0ZmlmeS1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbSBGaXJzdCBtYXRjaGVkIHBhdHRlcm4gaW4gc3RyaW5nIHNlYXJjaGVkLlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN1YjEgRmlyc3QgbWF0Y2hlZCBzdWJwYXR0ZXJuIGluIHN0cmluZyBzZWFyY2hlZC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdWIyIFNlY29uZCBtYXRjaGVkIHN1YnBhdHRlcm4gaW4gc3RyaW5nIHNlYXJjaGVkLlxyXG4gICAgICovXHJcbiAgICAvKmpzbGludCB1bnBhcmFtOiB0cnVlKi9cclxuICAgIHJlcGxhY2VtZW50VGV4dCA9IGZ1bmN0aW9uIChtLCBzdWIxLCBzdWIyKSB7XHJcbiAgICAgICAgd3RmQ291bnQrKztcclxuICAgICAgICBzdWIxID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoJycsIHN1YjEpO1xyXG4gICAgICAgIHN1YjIgPSBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZygnJywgc3ViMik7XHJcbiAgICAgICAgdmFyIG91dDtcclxuICAgICAgICBpZiAodHJ1ZSA9PT0gb3V0cHV0SFRNTCkge1xyXG4gICAgICAgICAgICBvdXQgPSAnPHNwYW4gc3R5bGU9XCJjb2xvciA6IHJlZCA7XCI+JyArIHN1YjEgKyBhdHJvcGEud3RmLmRpY3Rpb25hcnlbd29yZF0gKyBzdWIyICsgJzwvc3Bhbj4nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG91dCA9IHN1YjEgKyBhdHJvcGEud3RmLmRpY3Rpb25hcnlbd29yZF0gKyBzdWIyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfTtcclxuICAgIC8qanNsaW50IHVucGFyYW06IGZhbHNlKi9cclxuICAgIC8vIHdvcmQgaXMgZGVmaW5lZCBpbiB0aGUgY29udGFpbmluZyBzY29wZSBhbmRcclxuICAgIC8vIGlzIG5vdCBnbG9iYWwsIGpzaGludCBpcyB3cm9uZ1xyXG4gICAgZm9yICh3b3JkIGluIGF0cm9wYS53dGYuZGljdGlvbmFyeSkge1xyXG4gICAgICAgIGlmIChhdHJvcGEud3RmLmRpY3Rpb25hcnkuaGFzT3duUHJvcGVydHkod29yZCkpIHtcclxuICAgICAgICAgICAgb2xkV29yZCA9IGF0cm9wYS5yZWdleC5hcHBlbmRQcmVmaXhlc0FuZFN1ZmZpeGVzKHdvcmQpO1xyXG4gICAgICAgICAgICByZWdleFZhbHVlID0gbmV3IFJlZ0V4cChvbGRXb3JkLCAnZ2knKTtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnJlcGxhY2UocmVnZXhWYWx1ZSwgcmVwbGFjZW1lbnRUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXQud3RmQ291bnQgPSB3dGZDb3VudDtcclxuICAgIHJldC53b3JkQ291bnQgPSB3b3JkQ291bnQ7XHJcbiAgICByZXQuc2NvcmUgPSB3dGZDb3VudCAvIHdvcmRDb3VudDtcclxuICAgIHJldC50eHQgPSB0YXJnZXQ7XHJcbiAgICByZXR1cm4gcmV0O1xyXG59O1xyXG4vKipcclxuICogV1RGaWZpZXMgdGhlIDxjb2RlPnRleHRDb250ZW50PC9jb2RlPiBvciA8Y29kZT52YWx1ZTwvY29kZT4gb2YgdGhlXHJcbiAqICBnaXZlbiBlbGVtZW50IGFuZCByZXBsYWNlcyB0aGUgZWxlbWVudCdzIGlubmVySFRNTCB3aXRoIGEgcHJlIGJsb2NrXHJcbiAqICBjb250YWluaW5nIHRoZSByZXN1bHRzIG9mIFdURmlmaWNhdGlvbi5cclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFJlZmVyZW5jZSBBIHJlZmVyZW5jZSB0byBhbiBIVE1MIEVsZW1lbnQuXHJcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gUmV0dXJucyB0aGUgZ2l2ZW4gZWxlbWVudCBhZnRlciB3dGZpZmljYXRpb24uXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMzEzXHJcbiAqL1xyXG5hdHJvcGEud3RmLmh0bWxFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnRSZWZlcmVuY2UpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ3d0Zkh0bWxFbGVtZW50Jyk7XHJcbiAgICB2YXIgd3RmaWZpZWQsIHR4dDtcclxuICAgIGVsZW1lbnRSZWZlcmVuY2UuaW5uZXJIVE1MID0gZWxlbWVudFJlZmVyZW5jZS5pbm5lckhUTUwucmVwbGFjZSgvPGJyPihcXHMrKT8oXFxyXFxufFxccnxcXG4pPy9nLCAnXFxyXFxuJyk7XHJcbiAgICB0eHQgPSBlbGVtZW50UmVmZXJlbmNlLnZhbHVlIHx8IGVsZW1lbnRSZWZlcmVuY2UudGV4dENvbnRlbnQ7XHJcbiAgICB3dGZpZmllZCA9IGF0cm9wYS53dGYud3RmaWZ5KHR4dCwgdHJ1ZSk7XHJcbiAgICBlbGVtZW50UmVmZXJlbmNlLmlubmVySFRNTCA9ICc8cHJlIHN0eWxlPVwiY29sb3I6YmxhY2s7IGJhY2tncm91bmQ6d2hpdGU7IHdoaXRlLXNwYWNlOnByZS13cmFwO1wiPicgKyB3dGZpZmllZC50eHQgKyAnPC9wcmU+JztcclxuICAgIHJldHVybiBlbGVtZW50UmVmZXJlbmNlO1xyXG59O1xyXG53aGlsZSAoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhOyJdfQ==
