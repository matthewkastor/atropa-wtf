;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
atropa.inquire = require('atropa-inquire').inquire;
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
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
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.arrays">tests</a>
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
 * @param {Array} (minuend) fromB The array with elements duplicated in <code>a</code>
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

},{"atropa-header":2,"atropa-inquire":3}],2:[function(require,module,exports){
var atropa = {};

/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>

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
var atropa;
atropa = {};
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


},{}],3:[function(require,module,exports){
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
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
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.inquire">tests</a>
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

},{"atropa-header":2}],4:[function(require,module,exports){
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
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
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.regex">tests</a>
 */
atropa.regex = {};
/**
 * Regex patterns.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Regex patterns.
 */
atropa.regex.patterns = {
    /** finds repeated words and phrases */
    repeatedWords : /(\b.{3,}\b)\s*(\1)/g,
    /** finds paragraph breaks */
    paragraphBreaks : /(\r\n\r\n|\n\n|\r\r)/g,
    /** finds line breaks */
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

},{"atropa-header":2}],5:[function(require,module,exports){
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
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
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.setAsOptionalArg">tests</a>
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

},{"atropa-header":2}],6:[function(require,module,exports){
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
atropa.regex = require('atropa-regex').regex;
atropa.arrays = require('atropa-arrays').arrays;
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
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
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.string">tests</a>
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

},{"atropa-arrays":1,"atropa-header":2,"atropa-regex":4}],7:[function(require,module,exports){
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

},{"../src/atropa-wtf.js":8}],8:[function(require,module,exports){
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
atropa.regex = require('atropa-regex').regex;
atropa.string = require('atropa-string').string;
atropa.setAsOptionalArg = require('atropa-setAsOptionalArg').setAsOptionalArg;
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
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
    "use strict";
    atropa.requires(
        'wtf',
        function () {
            var supported = true;
            
            [
                atropa.regex,
                atropa.string.countWords,
                atropa.setAsOptionalArg
            ].forEach(function (prerequisite) {
                if(prerequisite === undefined) {
                    supported = false;
                }
            });
            return supported;
        }
    );
}());

(function () {
    "use strict";
    atropa.requires(
        'wtfHtmlElement',
        function () {
            var supported = true;
            
            [
                window
            ].forEach(function (prerequisite) {
                if(prerequisite === undefined) {
                    supported = false;
                }
            });
            return supported;
        }
    );
}());

/**
 * Container for all Glorious WTFifier related functions and such.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @namespace Container for all Glorious WTFifier related functions and such.
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.wtf">tests</a>
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
atropa.wtf.dictionary = {
    "novelty quickly wears off" : "dumb shit gits old fast",
    "the way it is" : "how it be",
    "put up with" : "manhandle",
    "yet" : "immediately",
    "lose" : "shake",
    "for no reason" : "maiacally",
    "given a choice" : "extorted",
    "not strong enough" : "ain't got the nuts",
    "now at an end" : "brand spankin new",
    "be together" : "mash up",
    "apocalypse" : "party time",
    "nothing is assured" : "we live to deliver",
    "to no avail" : "for great good",
    "too good to be true" : "fucking fantastic",
    "growing apart" : "fucking other people",
    "rest in peace" : "party like it's 1999",
    "back stab" : "rump shake",
    "back stabb" : "rump shake",
    "look into their eyes" : "give them AIDS",
    "look into her eyes" : "give her AIDS",
    "look into his eyes" : "give him AIDS",
    "can't live without" : "touch myself about",
    "can't be without" : "touch myself about",
    "could never be without" : "can't work anal beads without",
    "no matter" : "irregardless of",
    "will be there" : "stick like shit",
    "will always be there" : "stick like wet shit",
    "holding them close to" : "handcuffing them to",
    "by your side" : "on your ass",
    "by my side" : "on my ass",
    "by his side" : "on his ass",
    "by her side" : "on her ass",
    "leave your side" : "get off your ass",
    "leave my side"   : "get off my ass",
    "leave his side"  : "get off his ass",
    "leave her side"  : "get off her ass",
    "doesn't happen over" : "cartwheels straight across",
    "means many things" : "is best described with lies",
    "laying in bed" : "taking a shit",
    "promise" : "lie",
    "liar" : "fibber",
    "lie" : "fib",
    "lies" : "fibs",
    "what's the point" : "the fucks this mean",
    "it must be true" : "for real 'n' shit",
    "what people say" : "muthaphukkas be talkin",
    "etched" : "ground",
    "don't have a clue" : "got shit twisted",
    "viscious cycle" : "clusterfuck",
    "don't need" : "could give a fuck about",
    "raven" : "pigeon",
    "to get away" : "to fucking run",
    "to a better" : "for some glittered",
    "beautiful face" : "enormous tits",
    "might as well" : "oh fuck I oughtta",
    "the first moment" : "straightaway",
    "as well" : "also",
    "so good" : "neato",
    "could do anything" : "is fucking insane",
    "set the mood" : "whip it out",
    "baby if" : "look bitch,",
    "through your hair" : "upside your head",
    "entered the house of" : "got up in the barn for",
    "always love you the same" : "always love you like my other suckers",
    "kissing other" : "going down on",
    "never thought you would do that" : "got turned out like a dumb fuck",
    "laying on the floor" : "begging for it",
    "first laid eyes on" : "first tried groping",
    "most people can only" : "most freaks and dope fiends",
    "you were the one" : "you were my target",
    "standing out from the crowd" : "wobbling like an elephant on a bicycle",
    "stood out from the crowd" : "jiggled like a jello Santa",
    "stand out from the crowd" : "look like a jackass",
    "stands out from the crowd" : "smells like old dick",
    "i've never felt this way" : "i've done this",
    "with every fiber" : "from pithy pits",
    "wander" : "stumble",
    "haunt" : "stalk",
    "mask" : "trashbag",
    "demonic angel" : "ass pirate",
    "angelic demon" : "ass pirate",
    "cunning" : "desperate",
    "dangerous" : "cock catching",
    "demi-god" : "punk bitch",
    "demigod" : "punk bitch",
    "mortal" : "queer",
    "immortal" : "whiny",
    "betrayal" : "game",
    "betray" : "screw",
    "gave up on" : "don't give a fuck about",
    "give up on" : "won't give a fuck about",
    "given up on" : "don't give a fuck about",
    "giving up on" : "ain't givin a fuck about",
    "coffin" : "tobogan",
    "beautiful" : "gaudy",
    "the best" : "the baddest",
    "selfish" : "thieving",
    "walked out" : "narrowly escaped",
    "walk out" : "narrowly escape",
    "walking out" : "narrowly escaping",
    "got in your way" : "got all up in your shit",
    "try" : "shoot",
    "the point of no return" : "the fat girls bedrooom door",
    "only wanted" : "begged for",
    "guess it doesn't matter" : "know this shit is pointless",
    "look back" : "lick windows",
    "path" : "sidewalk",
    "shine" : "bling",
    "in the middle of" : "all up in",
    "deep down inside" : "in the bottom of the tank",
    "piece by piece" : "one handjob at a time",
    "aura" : "stench",
    "candle" : "glowstick",
    "for her" : "to that broads",
    "for she" : "'cause the cunt",
    "for he" : "this dumb mother fucker",
    "forest" : "campground",
    "hand in hand" : "cock to jaw",
    "hand to hold" : "nuts to grip",
    "girl meets boy" : "horny kids hook up",
    "boy meets girl" : "horny kids hook up",
    "sunny" : "sweltering",
    "so nervous" : "so fucking drunk",
    "kiss" : "slap",
    "fingertips" : "chicken nuggets",
    "tell you i'm fine" : "screm I'M FUCKIN OK",
    "write" : "scrawl",
    "written" : "scrawled",
    "wrote" : "scrawled",
    "first of all" : "mm-kay",
    "bring forth" : "whip out",
    "into the light" : "on to the light",
    "the only one" : "fucking stupid",
    "to the light" : "out in public",
    "talk" : "cuss",
    "full of life" : "full of shit",
    "can't find the words to say" : "could blurt out some dumb shit",
    "consume" : "suck",
    "consuming" : "sucking",
    "pillow" : "stone",
    "advice" : "bullshit",
    "universe" : "toilet bowl",
    "elder" : "old folk",
    "magick" : "delusion",
    "magic" : "hope",
    "arcane" : "foolish",
    "speak of" : "talk about",
    "shall" : "should-will",
    "obtain" : "get",
    "battle" : "squabble",
    "midnight" : "daybreak",
    "sorrow" : "whimper",
    "crimson" : "azure",
    "black" : "yellow",
    "won't make it through" : "could shimmy past",
    "night" : "bedtime",
    "day" : "morning",
    "fragile" : "sturdy",
    "crack" : "mend",
    "solitude" : "ambiance",
    "torment" : "tickle",
    "incantation" : "much yammering",
    "hopeless" : "pitiful",
    "depressing" : "inebriating",
    "depressed" : "drunk",
    "depression" : "so much booze",
    "saddened" : "made flaccid",
    "sadness" : "impotence",
    "neverending" : "never ending",
    "never ending" : "relentless",
    "never going" : "fucked for trying",
    "change one thing" : "fuck some'n up",
    "never end" : "drag on",
    "will not heal" : "festers",
    "outward appearance" : "facade",
    "emo" : "closet homo",
    "blackened walls" : "filthy rooms",
    "farewell" : "adios",
    "meet again" : "have another go-round",
    "sadd" : "flaccid",
    "sad" : "impotent",
    "amidst" : "all up in",
    "midst" : "pants",
    "knowledge" : "trivia",
    "known" : "got",
    "know" : "get",
    "knew" : "got",
    "passionate" : "delirious",
    "passion" : "delirium",
    "o'" : "uh",
    "o" : "uh",
    "fang" : "denture",
    "curse" : "stain",
    "love" : "confuse",
    "vampiric" : "pedophilic",
    "vampyre" : "pedophyle",
    "vampire" : "pedophile",
    "problem" : "useless concern",
    "feel" : "fondle",
    "woe" : "chlamydia",
    "empty" : "bloated",
    "hatred" : "odium",
    "hate" : "dislike",
    "scarred" : "striated",
    "scars" : "striae",
    "scare" : "tickle",
    "scary" : "tickly",
    "scar" : "stria",
    "wound" : "ouchie",
    "slit" : "crevice",
    "slice" : "pet",
    "twas" : "it was",
    "big brother" : "my paranoia",
    "eternity" : "awhile",
    "eternally" : "for a bit",
    "eternal" : "imagined",
    "prophet" : "insomniac",
    "prophecies" : "wives tales",
    "prophecy" : "wives tale",
    "soldier" : "maniac",
    "militia" : "gang",
    "military" : "gangster",
    "militant" : "maniacal",
    "goddess" : "Kylee Strutt",
    "higher power" : "crusty sock",
    "dark" : "effervescent",
    "ancient" : "elderly",
    "quest" : "stroll",
    "heartbeat" : "cock beat",
    "heart" : "cock",
    "blood" : "grease",
    "bleed" : "whine",
    "cut" : "mutilate",
    "slash" : "mutilate",
    "moonlight" : "moonshine",
    "moon" : "night light",
    "steel" : "latex",
    "knife" : "dildo",
    "razorblade" : "butt plug",
    "razor" : "dildo",
    "blade" : "handle",
    "pain" : "hot sex",
    "emotional" : "childish",
    "emotion" : "lubricant",
    "teardrop" : "tear drop",
    "tear" : "sperme",
    "castle" : "chateau",
    "world" : "hand towel",
    "dead" : "inert",
    "goodbye" : "peace y'all",
    "good-bye" : "get the fuck out",
    "good bye" : "fuck off",
    "death" : "Santa",
    "pale" : "sexy",
    "drift" : "him-haw",
    "fade" : "him-haw",
    "flesh" : "twinkie",
    "corpse" : "mannequin",
    "skin" : "twinkies",
    "putrid" : "pleasant",
    "breathe" : "pause awkwardly",
    "breath" : "awkward pause",
    "stopp" : "push",
    "stop" : "push",
    "scream" : "grunt",
    "think" : "scheme",
    "spiritual" : "banana craving",
    "spirit" : "banana",
    "soul" : "banana",
    "ghost" : "imaginary friend",
    "monster" : "dislexic lover",
    "beast" : "erection",
    "demon" : "hard-on",
    "angel" : "porn star",
    "shooting star" : "swift missile",
    "star" : "missile",
    "lost" : "aroused",
    "time" : "throbbing",
    "cheek" : "rump",
    "fingers" : "sausage",
    "daydream" : "fantasize",
    "the spring" : "tube sock",
    "spring" : "tube socks",
    "illusion" : "drunken mistake",
    "loneliness" : "arousal",
    "lonely" : "horny",
    "alone" : "ecstatic",
    "lone" : "single",
    "perfect" : "fucked",
    "hidden" : "stashed",
    "mystery" : "neon sign",
    "mysteries" : "neon signs",
    "rose" : "butt hole",
    "petal" : "dingleberry",
    "different" : "awkward",
    "wrong" : "buzzing",
    "fate" : "coincidence",
    "cold" : "fuzzy",
    "hellfire" : "hell fire",
    "hell" : "my cock's",
    "crystal" : "bedazler",
    "rainbow" : "pizzazz",
    "rain" : "jizzum",
    "storm" : "orgy",
    "wind" : "blow",
    "breeze" : "draft",
    "brilliance" : "shinyness",
    "brilliant" : "shiny",
    "dreamland" : "obsession island",
    "dreams" : "obsessions",
    "dream" : "obsess",
    "prison" : "outhouse",
    "golden ray" : "gaudy scribble",
    "ray" : "scribble",
    "deadly" : "fertile",
    "truth" : "trivia",
    "sun" : "yellow disk",
    "cruel" : "haphazard",
    "cloud" : "balloon",
    "twinkle" : "strobe",
    "twinkling" : "strobing",
    "escape" : "snuggle",
    "understand" : "stroke my ego",
    "remember" : "mumble",
    "illumination" : "mumbo jumbo",
    "reality" : "toilet bowl",
    "bind" : "coddle",
    "bound" : "coddled",
    "torn" : "huggled",
    "died" : "made marshmallows",
    "dies" : "makes marshmallows",
    "die" : "make marshmallows",
    "dying" : "making marshmallows",
    "body" : "jiggling clump",
    "bodies" : "jiggling piles",
    "warfare" : "children laughing",
    "debutantes" : "hookers",
    "slave" : "gimp",
    "poetic" : "flatulent",
    "poetry" : "bad gas",
    "poet" : "hobo",
    "poem" : "scribble",
    "country" : "bathroom",
    "naked" : "unshaved",
    "jesus christ" : "jim bob jr",
    "christ" : "jim bob jr",
    "jesus" : "jim bob jr",
    "healer" : "fondler",
    "gods" : "jim bob sr et al.",
    "god" : "jim bob sr",
    "weapon" : "pocket pussy",
    "existence" : "whatever",
    "minion" : "horny pirate",
    "raping" : "what",
    "rape" : "what",
    "gravestone" : "mile marker",
    "grave" : "personal space",
    "infinite" : "abstract",
    "suicide" : "murder",
    "brink" : "border",
    "cried" : "came",
    "cries" : "skeets",
    "crying" : "cumming",
    "had done" : "done did",
    "cry" : "cum",
    "cryptic" : "drunken",
    "crypt" : "urinal",
    "mystic" : "transexual",
    "balanced individual" : "psycho",
    "balanced person" : "psycho",
    "balanced man" : "psycho",
    "balanced woman" : "psycho",
    "wisdom" : "bull shit",
    "wise" : "bull shitting",
    "blessed be" : "suck eggs",
    "energy" : "juice",
    "riddle" : "polka dot",
    "my lord" : "sweet palm",
    "so mote it be" : "it's real in my head",
    "pray" : "murmur",
    "nomad" : "drunk hobo",
    "destiny" : "taxes",
    "sword" : "dildo",
    "void" : "bucket",
    "just" : "sure",
    "vengeance" : "slap happiness",
    "avenge" : "git rowdy for",
    "venge" : "-rowdy-",
    "heavens" : "skies",
    "heaven" : "sky",
    "endless" : "real long",
    "valley" : "ditch",
    "arduous" : "not easy",
    "touch" : "grope",
    "wretched" : "skeezy",
    "wretch" : "skeeze",
    "awe" : "fearful reverence",
    "ritual" : "banana dance",
    "behold" : "oogle",
    "veil" : "disguise",
    "vista" : "scene",
    "always" : "usually",
    "believe" : "buy",
    "wish" : "want",
    "fell" : "flopped",
    "fall" : "flop",
    "righteous" : "arrogant",
    "warrior" : "kitten",
    "uncaring" : "prickish",
    "care to give" : "shit to give",
    "take care of" : "decimate",
    "taking care" : "forgeting",
    "takes care" : "forgets",
    "take care" : "forget",
    "forget" : "disremember",
    "caring" : "giving a shit",
    "cared" : "gave a shit",
    "care" : "give a shit",
    "wield" : "jerk",
    "ocean" : "sewer",
    "sea" : "bath",
    "bay" : "sink",
    "twilight" : "moonshine",
    "broken" : "beaten",
    "broke" : "beat",
    "break" : "beat",
    "forever" : "so very",
    "human race" : "gerbil empire",
    "nightmare" : "tantrum",
    "suffer" : "pirouette",
    "myself" : "my muchness",
    "me" : "i",
    "my" : "i's ",
    "mine" : "i's",
    "was i" : "were i",
    "am i" : "are i",
    "im" : "i'm",
    "i'm" : "i are",
    "i've" : "i have",
    "i'll" : "i will",
    "i am" : "i are",
    "yourself" : "you's muchness",
    "yours" : "you's",
    "your" : "you's",
    "you all" : "all you",
    "you'll" : "you will",
    "you've" : "you has",
    "you're" : "you is",
    "thee" : "you",
    "thine" : "you's",
    "thou" : "you",
    "we" : "they",
    "us" : "them",
    "our" : "their",
    "ours" : "theirs",
    "i" : "Kevin",
    "you" : "Retards"
};
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
    "use strict";
    atropa.supportCheck('wtf');
    
    var regexValue,
        replacementText,
        oldWord,
        wtfCount,
        wordCount,
        ret,
        word;
    
    if(true !== outputHTML) {
        outputHTML = false;
    }
    ret = {};
    wtfCount = 0;
    target = target.trim();
    wordCount = atropa.string.countWords(target);
    if(true === outputHTML) {
        target = target.replace(
            /(\. ?){2,}/gi,
            '<span style="color : brown ;"> [shit taco] </span>'
        );
        target = '<p> ' + target.replace(/(\r\n|\r|\n)/g,' <br/> ') + ' </p>';
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
    replacementText = function (m, sub1, sub2) {
        wtfCount++;
        sub1 = atropa.setAsOptionalArg('', sub1);
        sub2 = atropa.setAsOptionalArg('', sub2);
        var out;
        if(true === outputHTML) {
            out = '<span style="color : red ;">' +
                sub1 + atropa.wtf.dictionary[word] + sub2 +
                '</span>';
        } else {
            out = sub1 + atropa.wtf.dictionary[word] + sub2;
        }
        return out;
    };
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
    "use strict";
    atropa.supportCheck('wtfHtmlElement');
    
    var wtfified, txt;
    elementReference.innerHTML = elementReference.innerHTML.replace(
        /<br>(\s+)?(\r\n|\r|\n)?/g, '\r\n');
    txt = elementReference.value || elementReference.textContent;
    wtfified = atropa.wtf.wtfify(txt, true);
    elementReference.innerHTML =
        '<pre style="color:black; background:white; white-space:pre-wrap;">' +
        wtfified.txt +
        '</pre>';
    return elementReference;
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":2,"atropa-regex":4,"atropa-setAsOptionalArg":5,"atropa-string":6}]},{},[7])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGthc3RvclxcRGVza3RvcFxcZXhwZXJpbWVudHNcXGF0cm9wYS1jb21wb25lbnRzXFxub2RlX21vZHVsZXNcXGF0cm9wYS1hcnJheXNcXHNyY1xcYXRyb3BhLWFycmF5cy5qcyIsIkM6XFxVc2Vyc1xca2FzdG9yXFxEZXNrdG9wXFxleHBlcmltZW50c1xcYXRyb3BhLWNvbXBvbmVudHNcXG5vZGVfbW9kdWxlc1xcYXRyb3BhLWhlYWRlclxcc3JjXFxhdHJvcGEtaGVhZGVyLmpzIiwiQzpcXFVzZXJzXFxrYXN0b3JcXERlc2t0b3BcXGV4cGVyaW1lbnRzXFxhdHJvcGEtY29tcG9uZW50c1xcbm9kZV9tb2R1bGVzXFxhdHJvcGEtaW5xdWlyZVxcc3JjXFxhdHJvcGEtaW5xdWlyZS5qcyIsIkM6XFxVc2Vyc1xca2FzdG9yXFxEZXNrdG9wXFxleHBlcmltZW50c1xcYXRyb3BhLWNvbXBvbmVudHNcXG5vZGVfbW9kdWxlc1xcYXRyb3BhLXJlZ2V4XFxzcmNcXGF0cm9wYS1yZWdleC5qcyIsIkM6XFxVc2Vyc1xca2FzdG9yXFxEZXNrdG9wXFxleHBlcmltZW50c1xcYXRyb3BhLWNvbXBvbmVudHNcXG5vZGVfbW9kdWxlc1xcYXRyb3BhLXNldEFzT3B0aW9uYWxBcmdcXHNyY1xcYXRyb3BhLXNldEFzT3B0aW9uYWxBcmcuanMiLCJDOlxcVXNlcnNcXGthc3RvclxcRGVza3RvcFxcZXhwZXJpbWVudHNcXGF0cm9wYS1jb21wb25lbnRzXFxub2RlX21vZHVsZXNcXGF0cm9wYS1zdHJpbmdcXHNyY1xcYXRyb3BhLXN0cmluZy5qcyIsIkM6XFxVc2Vyc1xca2FzdG9yXFxEZXNrdG9wXFxleHBlcmltZW50c1xcYXRyb3BhLWNvbXBvbmVudHNcXG5vZGVfbW9kdWxlc1xcYXRyb3BhLXd0ZlxcZGV2XFxicm93c2VyTWFpbi5qcyIsIkM6XFxVc2Vyc1xca2FzdG9yXFxEZXNrdG9wXFxleHBlcmltZW50c1xcYXRyb3BhLWNvbXBvbmVudHNcXG5vZGVfbW9kdWxlc1xcYXRyb3BhLXd0Zlxcc3JjXFxhdHJvcGEtd3RmLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqL1xyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG5hdHJvcGEuaW5xdWlyZSA9IHJlcXVpcmUoJ2F0cm9wYS1pbnF1aXJlJykuaW5xdWlyZTtcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogVXRpbGl0aWVzIGZvciBoYW5kbGluZyBhcnJheXMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDIyMVxyXG4gKiBAbmFtZXNwYWNlIFV0aWxpdGllcyBmb3IgaGFuZGxpbmcgYXJyYXlzLlxyXG4gKiBAc2VlIDxhIGhyZWY9XCIuLi8uLi8uLi9BdHJvcGFUb29sYm94VGVzdHMuaHRtbD9zcGVjPWF0cm9wYS5hcnJheXNcIj50ZXN0czwvYT5cclxuICovXHJcbmF0cm9wYS5hcnJheXMgPSB7fTtcclxuLyoqXHJcbiAqIENvbXBhcmVzIHR3byBhcnJheXMgYmFzZWQgb24gc2l6ZSwgY29udGVudHMsIGFuZCBlbGVtZW50IG9yZGVyLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkxIE9uZSBhcnJheSB5b3Ugd2FudCBjb21wYXJlZCB0byBhbm90aGVyLlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTIgVGhlIG90aGVyIGFycmF5LlxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIG9yIGZhbHNlIGRlcGVuZGluZyBvblxyXG4gKiAgd2hldGhlciBvciBub3QgdGhlIGFycmF5cyBtYXRjaGVkIGluIHNpemUsIGNvbXBvc2l0aW9uLCBhbmRcclxuICogIGVsZW1lbnQgb3JkZXIuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMl07XHJcbiAqIHZhciB5ID0gWzEsMSwzXTtcclxuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIGZhbHNlXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMl07XHJcbiAqIHZhciB5ID0gWzEsMl07XHJcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcclxuICogLy8gcmV0dXJucyB0cnVlXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMl07XHJcbiAqIHZhciB5ID0gWzIsMV07XHJcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcclxuICogLy8gcmV0dXJucyBmYWxzZSBiZWNhdXNlIHRoZSBlbGVtZW50cyBhcmUgbm90IGluIHRoZSBzYW1lIG9yZGVyLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLHsnYVByb3AnIDogJ2FWYWx1ZSd9XTtcclxuICogdmFyIHkgPSBbMSx7J2FQcm9wJyA6ICdhVmFsdWUnfV07XHJcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcclxuICogLy8gcmV0dXJucyBmYWxzZSBiZWNhdXNlIGV2ZW4gdGhvdWdoIHRoZSBvYmplY3QgbG9va3MgdGhlIHNhbWUsIHRoZVxyXG4gKiAvLyB0d28gb2JqZWN0cyBhcmUgaW4gZmFjdCBkaXN0aW5jdCBvYmplY3RzLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbHVlJ307XHJcbiAqIHZhciB4ID0gWzEsb2JqXTtcclxuICogdmFyIHkgPSBbMSxvYmpdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLm1hdGNoKHgseSk7XHJcbiAqIC8vIHJldHVybnMgdHJ1ZSBiZWNhdXNlIHRoZSBvYmplY3RzIHJlZmVyZW5jZWQgaW4gdGhlIGFycmF5cyBhcmVcclxuICogLy8gaW4gZmFjdCB0aGUgc2FtZSBvYmplY3QuXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLm1hdGNoID0gZnVuY3Rpb24gYXJyYXlzTWF0Y2goYXJyYXkxLCBhcnJheTIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHgsXHJcbiAgICBsO1xyXG4gICAgaWYgKGFycmF5MS5sZW5ndGggIT09IGFycmF5Mi5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBsID0gYXJyYXkxLmxlbmd0aDtcclxuICAgIGZvciAoeCA9IDA7IHggPCBsOyB4ICs9IDEpIHtcclxuICAgICAgICBpZiAoYXJyYXkxW3hdICE9PSBhcnJheTJbeF0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59O1xyXG4vKipcclxuICogU3VidHJhY3RzIG9uZSBhcnJheSBmcm9tIGFub3RoZXIgYXJyYXkgYmFzZWQgb24gdGhlIHVuaXF1ZSB2YWx1ZXMgaW4gYm90aFxyXG4gKiAgc2V0cy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTEyXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGEgKHN1YnRyYWhlbmQpIFRoZSBhcnJheSB0byBzdWJ0cmFjdC5cclxuICogQHBhcmFtIHtBcnJheX0gKG1pbnVlbmQpIGZyb21CIFRoZSBhcnJheSB3aXRoIGVsZW1lbnRzIGR1cGxpY2F0ZWQgaW4gPGNvZGU+YTwvY29kZT5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IGNvbnRhaW5pbmcgb25seSB0aGUgdW5pcXVlXHJcbiAqICB2YWx1ZXMgZm91bmQgaW4gPGNvZGU+ZnJvbUI8L2NvZGU+IHRoYXQgYXJlIG5vdCBwcmVzZW50IGluIDxjb2RlPmE8L2NvZGU+XHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMl07XHJcbiAqIHZhciB5ID0gWzEsMSwzXTtcclxuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFszXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDNdO1xyXG4gKiB2YXIgeSA9IFszLDFdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgW11cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzXTtcclxuICogdmFyIHkgPSBbMywxLDEsOV07XHJcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbOV1cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIHZhciB5ID0gWzMsMSx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgW3snYVByb3AnIDogJ2FWYWwnfV0gXHJcbiAqIC8vIGJlY2F1c2UgdGhlIHR3byBvYmplY3RzIGFyZSBub3QgdGhlIHNhbWUgb2JqZWN0LlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9O1xyXG4gKiB2YXIgeCA9IFsxLDMsb2JqXTtcclxuICogdmFyIHkgPSBbMywxLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbeydhUHJvcCcgOiAnYVZhbCd9XSBcclxuICogLy8gYmVjYXVzZSB0aGUgdHdvIG9iamVjdHMgYXJlIG5vdCB0aGUgc2FtZSBvYmplY3QuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ31cclxuICogdmFyIHggPSBbMSwzLG9ial07XHJcbiAqIHZhciB5ID0gWzMsMSxvYmpdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgW10gXHJcbiAqIC8vIGJlY2F1c2UgdGhlIG9iamVjdHMgcmVmZXJlbmNlZCBpbiB0aGUgYXJyYXlzIGFyZSB0aGUgc2FtZSBvYmplY3QuXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLnN1YnRyYWN0ID0gZnVuY3Rpb24oYSwgZnJvbUIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHRoZSA9IHt9O1xyXG4gICAgdGhlLnJlc3VsdCA9IFtdO1xyXG4gICAgZnJvbUIuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICB0aGUubWFyayA9IGZhbHNlO1xyXG4gICAgICAgIGEuZm9yRWFjaChmdW5jdGlvbihybSl7XHJcbiAgICAgICAgICAgIGlmKGl0ZW0gPT09IHJtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGUubWFyayA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZih0aGUubWFyayAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGUucmVzdWx0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdGhlLnJlc3VsdDtcclxufTtcclxuLyoqXHJcbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgdmFsdWVzIGZvdW5kIGluIGJvdGggb2YgdGhlIGdpdmVuIGFycmF5cy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTEyXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MSBBbiBhcnJheS5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkyIEFub3RoZXIgYXJyYXkuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiB2YWx1ZXMgZm91bmQgaW4gYm90aCBvZiB0aGUgZ2l2ZW5cclxuICogIGFycmF5cy5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzLDRdO1xyXG4gKiB2YXIgeSA9IFszLDEsNV07XHJcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzEsM11cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwxLDMsNF07XHJcbiAqIHZhciB5ID0gWzMsMSwxLDVdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFsxLDEsM11cclxuICogQGV4YW1wbGVcclxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfTtcclxuICogdmFyIHggPSBbMSwzLG9ial07XHJcbiAqIHZhciB5ID0gWzMsMSxvYmpdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9O1xyXG4gKiB2YXIgeCA9IFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogdmFyIHkgPSBbMywxLG9ial07XHJcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzEsM10gYmVjYXVzZSB0aGUgdHdvIG9iamVjdHMgYXJlIG5vdCB0aGUgc2FtZSBvYmplY3QuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiB2YXIgeSA9IFszLDEseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbMSwzXSBiZWNhdXNlIHRoZSB0d28gb2JqZWN0cyBhcmUgbm90IHRoZSBzYW1lIG9iamVjdC5cclxuICovXHJcbmF0cm9wYS5hcnJheXMuaW50ZXJzZWN0ID0gZnVuY3Rpb24gaW50ZXJzZWN0KGFycmF5MSwgYXJyYXkyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBzbWFsbEFycmF5LCBsYXJnZUFycmF5LCBpbnRlcnNlY3Rpb24gPSBbXTtcclxuICAgIGlmKGFycmF5MS5sZW5ndGggPiBhcnJheTIubGVuZ3RoKSB7XHJcbiAgICAgICAgbGFyZ2VBcnJheSA9IGFycmF5MS5zcGxpY2UoMCk7XHJcbiAgICAgICAgc21hbGxBcnJheSA9IGFycmF5Mi5zcGxpY2UoMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxhcmdlQXJyYXkgPSBhcnJheTIuc3BsaWNlKDApO1xyXG4gICAgICAgIHNtYWxsQXJyYXkgPSBhcnJheTEuc3BsaWNlKDApO1xyXG4gICAgfVxyXG4gICAgc21hbGxBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgdmFyIGlkeEluTGFyZ2VBcnJheSA9IGxhcmdlQXJyYXkuaW5kZXhPZihpdGVtKTtcclxuICAgICAgICBpZiAoMCA8PSBpZHhJbkxhcmdlQXJyYXkpIHsgLy8gaGFzIHdvcmRcclxuICAgICAgICAgICAgaW50ZXJzZWN0aW9uLnB1c2gobGFyZ2VBcnJheS5zcGxpY2UoaWR4SW5MYXJnZUFycmF5LCAxKVswXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaW50ZXJzZWN0aW9uO1xyXG59O1xyXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgZnJlcXVlbmN5IG9mIGl0ZW1zIG9jY3VycmluZyBpbiBhbiBhcnJheS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgdG8gY2FsY3VsYXRlIGZyZXF1ZW5jaWVzIGZyb20uXHJcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IHdob3NlIGtleXMgYXJlIGVhY2ggdW5pcXVlXHJcbiAqICBlbGVtZW50cyBmcm9tIHRoZSBhcnJheSBhbmQgdGhlaXIgdmFsdWUgaXMgdGhlaXIgZnJlcXVlbmN5IG9mXHJcbiAqICBvY2N1cnJlbmNlIHdpdGhpbiB0aGUgYXJyYXkuIEJlIGNhcmVmdWwgdGhhdCB5b3VyIGFycmF5IGRvZXNcclxuICogIG5vdCBjb250YWluIHZhbHVlcyBtYXRjaGluZyBvYmplY3QgaW5zdGFuY2UgcHJvcGVydHkgbmFtZXMuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMSwxLDEsMSwzLDNdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcclxuICogLy8gcmV0dXJucyB7XHJcbiAqIC8vICAgICBcIjFcIjogNSxcclxuICogLy8gICAgIFwiM1wiOiAyXHJcbiAqIC8vIH1cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbXCJiaWxsXCIsIFwiZnJlZFwiLCBcImZyZWRcIiwgXCJqYW5lXCJdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcclxuICogLy8gcmV0dXJucyB7XHJcbiAqIC8vICAgICBcImJpbGxcIjogMSxcclxuICogLy8gICAgIFwiZnJlZFwiOiAyLFxyXG4gKiAvLyAgICAgXCJqYW5lXCI6IDFcclxuICogLy8gfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XHJcbiAqIC8vIHJldHVybnMge1xyXG4gKiAvLyAgICAgXCIxXCI6IDEsXHJcbiAqIC8vICAgICBcIjNcIjogMSxcclxuICogLy8gICAgIFwiW29iamVjdCBPYmplY3RdXCI6IDFcclxuICogLy8gfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9O1xyXG4gKiB2YXIgb3RoZXJPYmogPSB7fTtcclxuICogdmFyIHggPSBbMSwzLG9iaixvdGhlck9iaix7J2FEb3VnaG51dCcgOiAnc3ByaW5rbGVzJ31dO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcclxuICogLy8gcmV0dXJucyB7XHJcbiAqIC8vICAgICBcIjFcIjogMSxcclxuICogLy8gICAgIFwiM1wiOiAxLFxyXG4gKiAvLyAgICAgXCJbb2JqZWN0IE9iamVjdF1cIjogM1xyXG4gKiAvLyB9XHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMyxcInRvU3RyaW5nXCJdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcclxuICogLy8gcmV0dXJucyB7XHJcbiAqIC8vICAgICBcIjFcIjogMSxcclxuICogLy8gICAgIFwiM1wiOiAxLFxyXG4gKiAvLyAgICAgXCJ0b1N0cmluZ1wiOiBcImZ1bmN0aW9uIHRvU3RyaW5nKCkge1xcbiAgICBbbmF0aXZlIGNvZGVdXFxufTFcIlxyXG4gKiAvLyB9XHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIG91dCA9IGFyci5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgY3Vycikge1xyXG4gICAgICAgIGlmIChhY2NbY3Vycl0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBhY2NbY3Vycl0gPSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFjY1tjdXJyXSArPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwge30pO1xyXG4gICAgcmV0dXJuIG91dDtcclxufTtcclxuLyoqXHJcbiAqIEdldHMgVW5pcXVlIHZhbHVlcyBmcm9tIGFuIGFycmF5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMThcclxuICogQHBhcmFtIHtBcnJheX0gbGFyZ2VBcnJheSBUaGUgYXJyYXkgd2l0aCBkdXBsaWNhdGUgdmFsdWVzIGluIGl0LlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgY29udGFpbmluZyBvbmx5IHRoZSB1bmlxdWVcclxuICogIHZhbHVlcyBmb3VuZCBpbiB0aGUgbGFyZ2VBcnJheS5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwxLDEsNCw0LDMsNl07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0VW5pcXVlKHgpO1xyXG4gKiAvLyByZXR1cm5zIFsgXCIxXCIsIFwiNFwiLCBcIjNcIiwgXCI2XCIgXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFtcImJpbGxcIiwgXCJmcmVkXCIsIFwiamFuZVwiLCBcImZyZWRcIl07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0VW5pcXVlKHgpO1xyXG4gKiAvLyByZXR1cm5zIFtcImJpbGxcIiwgXCJmcmVkXCIsIFwiamFuZVwiXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsgXHJcbiAqICAgICBcImJpbGxcIixcclxuICogICAgIHtcImFQcm9wXCIgOiBcImFWYWx1ZVwifSxcclxuICogICAgIHtcImFHdXlcIiA6IFwiZnJlZFwifSxcclxuICogICAgIHtcImFMYWR5XCIgOiBcImphbmVcIn1cclxuICogXTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRVbmlxdWUoeCk7XHJcbiAqIC8vIHJldHVybnMgWyBcImJpbGxcIiwgXCJbb2JqZWN0IE9iamVjdF1cIiBdXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLmdldFVuaXF1ZSA9IGZ1bmN0aW9uIChsYXJnZUFycmF5KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeShsYXJnZUFycmF5KSkuc29ydCgpO1xyXG59O1xyXG4vKipcclxuICogUmVtb3ZlcyBlbXB0eSBzdHJpbmdzIGZyb20gdGhlIGdpdmVuIGFycmF5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMThcclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXlXaXRoRW1wdHlFbGVtZW50cyBUaGUgYXJyYXkgd2l0aCBlbXB0eSBzdHJpbmdzIGluIGl0LlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgd2l0aCBlbXB0eSBzdHJpbmdzIHJlbW92ZWQuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWyAxMCwgLCA1LCBcIlwiLCAnJywgNyBdO1xyXG4gKiBjb25zb2xlLmxvZygnc3RhcnRpbmcgbGVuZ3RoICcgKyB4Lmxlbmd0aCk7XHJcbiAqIGNvbnNvbGUubG9nKHgpO1xyXG4gKiB4ID0gYXRyb3BhLmFycmF5cy5yZW1vdmVFbXB0eUVsZW1lbnRzKHgpO1xyXG4gKiBjb25zb2xlLmxvZygnZW5kaW5nIGxlbmd0aCAnICsgeC5sZW5ndGgpO1xyXG4gKiBjb25zb2xlLmxvZyh4KTtcclxuICogLy8gZGlzcGxheXMgdGhlIGZvbGxvd2luZ1xyXG4gKiAvLyBzdGFydGluZyBsZW5ndGggNlxyXG4gKiAvLyBbMTAsIHVuZGVmaW5lZCwgNSwgXCJcIiwgXCJcIiwgN11cclxuICogLy8gZW5kaW5nIGxlbmd0aCAzXHJcbiAqIC8vIFsxMCwgNSwgN11cclxuICovXHJcbmF0cm9wYS5hcnJheXMucmVtb3ZlRW1wdHlFbGVtZW50cyA9IGZ1bmN0aW9uIChhcnJheVdpdGhFbXB0eUVsZW1lbnRzKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBhcnJheVdpdGhFbXB0eUVsZW1lbnRzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHJldHVybiAhYXRyb3BhLmlucXVpcmUuaXNFbXB0eVN0cmluZyhpdGVtKTtcclxuICAgIH0pO1xyXG59O1xyXG4vKipcclxuICogUmVpbmRleGVzIGFuIGFycmF5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMThcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheSB3aXRoIGRpc2NvbnRpbnVvdXMga2V5cy5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IHdpdGggY29udGludW91cyBrZXlzLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsgXCJhXCIsIFwiYlwiLCBcImNcIiwgdW5kZWZpbmVkIF07XHJcbiAqIGNvbnNvbGUubG9nKHgpOyAvLyBbIFwiYVwiLCBcImJcIiwgXCJjXCIsIHVuZGVmaW5lZCBdXHJcbiAqIGNvbnNvbGUubG9nKHgubGVuZ3RoKTsgLy8gNFxyXG4gKiBcclxuICogZGVsZXRlIHhbMV07IC8vIGRlbGV0ZXMgdGhlIGtleSBmcm9tIHRoZSBhcnJheSBidXRcclxuICogICAgICAgICAgICAgIC8vIHRoZSBhcnJheSBsZW5ndGggcmVtYWlucyB0aGUgc2FtZVxyXG4gKiAgICAgICAgICAgICAgLy8gYXQgdGhpcyBwb2ludCB0aGUgYXJyYXlzIGtleXMgYXJlIDAsIDIsIGFuZCAzXHJcbiAqIGNvbnNvbGUubG9nKHgpOyAvLyBbIFwiYVwiLCB1bmRlZmluZWQsIFwiY1wiLCB1bmRlZmluZWQgXVxyXG4gKiBjb25zb2xlLmxvZyh4Lmxlbmd0aCk7IC8vIDRcclxuICogXHJcbiAqIHggPSBhdHJvcGEuYXJyYXlzLnJlaW5kZXgoeCk7XHJcbiAqIGNvbnNvbGUubG9nKHgpOyAvLyAgWyBcImFcIiwgXCJjXCIsIHVuZGVmaW5lZCBdXHJcbiAqICAgIC8vIG5vdGUgdGhhdCB0aGUgbGFzdCBlbGVtZW50IGV4aXN0ZWQgaW4gdGhlIGFycmF5LCBpdHMgdmFsdWUgd2FzXHJcbiAqICAgIC8vIHVuZGVmaW5lZCBidXQgaXQgZGlkIGhhdmUgYSBrZXkgc28gdGhlIGVsZW1lbnQgcmVtYWlucyBpbiB0aGUgYXJyYXkuXHJcbiAqICAgIC8vXHJcbiAqICAgIC8vIFRoZSBkZWxldGVkIGVsZW1lbnQgd2FzIGluIGZhY3QgZGVsZXRlZCBmcm9tIHRoZSBhcnJheSBzbyB0aGVyZSB3YXMgbm9cclxuICogICAgLy8ga2V5IHhbMV0gYXQgYWxsLCB3aGVuIHRyeWluZyB0byBhY2Nlc3MgdGhpcyBub24gZXhpc3RpbmcgZWxlbWVudCB0aGVcclxuICogICAgLy8gdmFsdWUgb2YgdW5kZWZpbmVkIHdhcyByZXR1cm5lZC4gVGhpcyBiZWhhdmlvciBpcyBjb25mdXNpbmcgdW5sZXNzIHlvdVxyXG4gKiAgICAvLyB0aGluayBhYm91dCB0aGUgYXJyYXlhcyBhbiBvYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhcmUgbmFtZWQgYnlcclxuICogICAgLy8gbnVtYmVycy4gQWNjZXNzaW5nIGFuIHVuZGVmaW5lZCBwcm9wZXJ0eSByZXR1cm5zIHVuZGVmaW5lZCByZWdhcmRsZXNzXHJcbiAqICAgIC8vIG9mIHdoZXRoZXIgdGhlIHByb3BlcnR5IGV4aXN0ZWQgaW4gdGhlIHBhc3Qgb3Igbm90LlxyXG4gKiBjb25zb2xlLmxvZyh4Lmxlbmd0aCk7IC8vIDNcclxuICovXHJcbmF0cm9wYS5hcnJheXMucmVpbmRleCA9IGZ1bmN0aW9uIHJlaW5kZXgoYXJyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBpZHgsIG91dDtcclxuICAgIG91dCA9IFtdO1xyXG4gICAgZm9yKGlkeCBpbiBhcnIpIHtcclxuICAgICAgICBpZihhcnIuaGFzT3duUHJvcGVydHkoaWR4KSkge1xyXG4gICAgICAgICAgICBvdXQucHVzaChhcnJbaWR4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dDtcclxufTtcclxuLyoqXHJcbiAqIFNvcnRzIGFuIGFycmF5J3MgZWxlbWVudHMgbnVtZXJpY2FsbHkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDEyMFxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHRvIHNvcnQuIEFsbCBlbGVtZW50cyBvZiB0aGUgYXJyYXkgbXVzdCBiZVxyXG4gKiAgbnVtYmVyLWlzaC5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IHdob3NlIGVsZW1lbnRzIGFyZSBpbiBudW1lcmljIG9yZGVyLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFszLCAyLCA5LCAyNiwgMTAsIDEsIDk5LCAxNV07XHJcbiAqIGNvbnNvbGUubG9nKCBhdHJvcGEuYXJyYXlzLnNvcnROdW1lcmljYWxseSh4KSApO1xyXG4gKiAvLyBsb2dzIFsxLCAyLCAzLCA5LCAxMCwgMTUsIDI2LCA5OV1cclxuICovXHJcbmF0cm9wYS5hcnJheXMuc29ydE51bWVyaWNhbGx5ID0gZnVuY3Rpb24gc29ydE51bWVyaWNhbGx5KGFycikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gYXJyLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gKGEgLSBiKTtcclxuICAgIH0pO1xyXG59O1xyXG4vKipcclxuICogVGhyb3dzIGFuIGVycm9yLCA8Y29kZT5TdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmU8L2NvZGU+IGlzIG5vdCBcclxuICogIHN0YW5kYXJkaXplZC5cclxuICogXHJcbiAqICBZZXMsIGxvY2FsZUNvbXBhcmUgaXMgaW4gdGhlIHN0YW5kYXJkIGJ1dCwgYXQgdGhpcyB0aW1lIHRoZSBhY3R1YWxcclxuICogIGNvbXBhcmlzb24gaXMgaW1wbGVtZW50YXRpb24gZGVwZW5kYW50LiBUaGlzIG1lYW5zIHRoYXQgXCJhbHBoYWJldGljYWwgb3JkZXJcIlxyXG4gKiAgY2FuIGJlIGRpZmZlcmVudCBvbiBkaWZmZXJlbnQgcGxhdGZvcm1zLiBXaGF0IEkgZm91bmQgd2FzIHRoYXQgaW4gbm9kZSB0aGVcclxuICogIGFycmF5IG9mIDxjb2RlPlsnYScsJ1onLCdBJywneiddPC9jb2RlPiB3b3VsZCBiZSBzb3J0ZWQgdG9cclxuICogIDxjb2RlPlsnQScsJ1onLCdhJywnelwiXTwvY29kZT4sIHdoaWxlIG9uXHJcbiAqICBmaXJlZm94IGl0IHdvdWxkIGJlIHNvcnRlZCB0byA8Y29kZT5bJ2EnLCdBJywneicsJ1onXTwvY29kZT4uIFdobyBrbm93cyBpZlxyXG4gKiAgYW5vdGhlciBpbXBsZW1lbnRvciB3b3VsZCBzb3J0IGl0IDxjb2RlPlsnQScsJ2EnLCdaJywneiddPC9jb2RlPj9cclxuICogXHJcbiAqIEluIG9yZGVyIHRvIHByb3ZpZGUgYSByZWxpYWJsZSBpbXBsZW1lbnRhdGlvbiBJIHdvdWxkIGhhdmUgdG8gY3JlYXRlIG15IG93blxyXG4gKiAgaW1wbGVtZW50YXRpb24gb2YgPGNvZGU+U3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlPC9jb2RlPiBhbmQgdGhhdCdzXHJcbiAqICBqdXN0IHRvbyBtdWNoIHdvcmsgZm9yIG1lIHRvIGRvIGFsb25lLlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gXCJTdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmUgaXMgbm90IHN0YW5kYXJkaXplZFwiXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLnNvcnRBbHBoYWJldGljYWxseSA9IGZ1bmN0aW9uIHNvcnRBbHBoYWJldGljYWxseShhcnIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiU3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlIGlzIG5vdCBzdGFuZGFyZGl6ZWRcIik7XHJcbn07XHJcbi8qKlxyXG4gKiBEZWxldGVzIHRoZSBnaXZlbiBlbGVtZW50IGZyb20gdGhlIGFycmF5IGF0IHRoZSBnaXZlbiBpbmRleC4gSXQgYmFzaWNhbGx5XHJcbiAqICBkb2VzIHdoYXQgeW91IHdvdWxkIGV4cGVjdCB0aGUgZGVsZXRlIG9wZXJhdG9yIHRvIGRvLCBleGNlcHQgdGhlIGRlbGV0ZVxyXG4gKiAgb3BlcmF0b3IgZG9lc24ndCBkbyB3aGF0IHlvdSB3b3VsZCBleHBlY3QuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBUaGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgdG8gZGVsZXRlLlxyXG4gKiBAcmV0dXJucyBSZXR1cm5zIGFuIGFycmF5IHdpdGggdGhlIGVsZW1lbnQgcmVtb3ZlZCwgY29udGlndW91cyBrZXlzLCBhbmRcclxuICogIHdob3NlIGxlbmd0aCBpcyAxIGxlc3MgdGhhbiB0aGUgaW5wdXQgYXJyYXkuXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLmRlbGV0ZUVsZW1lbnQgPSBmdW5jdGlvbiAoYXJyLCBpbmRleCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBkZWxldGUgYXJyW2luZGV4XTtcclxuICAgIHJldHVybiBhdHJvcGEuYXJyYXlzLnJlaW5kZXgoYXJyKTtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwidmFyIGF0cm9wYSA9IHt9O1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxuXHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBYUGF0aFJlc3VsdCAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxyXG4gKi9cclxudmFyIGF0cm9wYTtcclxuYXRyb3BhID0ge307XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciB0aGlzIGNsYXNzIGhhcyBiZWVuIG1hcmtlZCBhcyB1bnN1cHBvcnRlZCBhbmQgdGhyb3dzIGFuIFxyXG4gKiAgZXJyb3IgaWYgaXQgaGFzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMDhcclxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZSBUaGUgbmFtZSBvZiB0aGUgY2xhc3MuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBlcnJvck1lc3NhZ2UgT3B0aW9uYWwuIEEgY3VzdG9tIGVycm9yIG1lc3NhZ2UuIERlZmF1bHRzIHRvXHJcbiAqICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLmVycm9yXHJcbiAqL1xyXG5hdHJvcGEuc3VwcG9ydENoZWNrID0gZnVuY3Rpb24gKGNsYXNzTmFtZSwgZXJyb3JNZXNzYWdlKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGNsYXNzTmFtZSA9IFN0cmluZyhjbGFzc05hbWUpO1xyXG4gICAgZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlIHx8IGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uZXJyb3I7XHJcbiAgICBlcnJvck1lc3NhZ2UgPSBTdHJpbmcoZXJyb3JNZXNzYWdlKTtcclxuICAgIFxyXG4gICAgaWYoYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5zdXBwb3J0ID09PSAndW5zdXBwb3J0ZWQnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XHJcbiAgICB9XHJcbn07XHJcbi8qKlxyXG4gKiBQdXNoZXMgYSByZXF1aXJlbWVudCBjaGVjayBpbnRvIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy4gVGhlIHRlc3RcclxuICogIHRlc3RzIHdoZXRoZXIgdGhlIGNsYXNzIGlzIHN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50LiBTZXRzXHJcbiAqICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdJ3Mgc3VwcG9ydCB0byB1bnN1cHBvcnRlZCBhbmQgZXJyb3IgdG8gZXJyb3JNZXNzYWdlXHJcbiAqICBpZiB0aGUgcmVxdWlyZW1lbnRGbiByZXR1cm5zIGZhbHNlLiBUaGUgcmVxdWlyZW1lbnQgY2hlY2tzIHdpbGwgYWxsIGJlIHJ1blxyXG4gKiAgYWZ0ZXIgdGhlIGxpYnJhcnkgaGFzIGxvYWRlZC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMzA4XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWUgVGhlIG5hbWUgb2YgdGhlIGNsYXNzLlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXF1aXJlbWVudEZuIEEgZnVuY3Rpb24gdG8gdGVzdCB3aGV0aGVyIG9yIG5vdCB0aGUgY2xhc3NcclxuICogIGlzIHN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50LiBJZiBzdXBwb3J0ZWQsIHJldHVybnMgdHJ1ZSBvdGhlcndpc2VcclxuICogIHJldHVybiBmYWxzZS5cclxuICogQHBhcmFtIHtTdHJpbmd9IGVycm9yTWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZSB0byB1c2Ugd2hlbiB0aGlzIGNsYXNzIG9yIGl0c1xyXG4gKiAgbWV0aG9kcyBhcmUgY2FsbGVkIGluIHVuc3VwcG9ydGVkIGVudmlyb25tZW50cy4gRGVmYXVsdHMgdG86XHJcbiAqICAnVGhlIGF0cm9wYS4nICsgY2xhc3NOYW1lICsgJyBjbGFzcyBpcyB1bnN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50Lic7XHJcbiAqL1xyXG5hdHJvcGEucmVxdWlyZXMgPSBmdW5jdGlvbiAoY2xhc3NOYW1lLCByZXF1aXJlbWVudEZuLCBlcnJvck1lc3NhZ2UpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIGNoZWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB0ZXN0ID0gZmFsc2U7XHJcbiAgICAgICAgaWYodHlwZW9mIGNsYXNzTmFtZSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhdHJvcGEucmVxdWlyZXMgcmVxdWlyZXMgdGhlIGNsYXNzIG5hbWUgdG8gYmUgJyArXHJcbiAgICAgICAgICAgICAgICAnc3BlY2lmaWVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdID0ge307XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih0eXBlb2YgcmVxdWlyZW1lbnRGbiAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZW1lbnRGbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZSB8fCAnVGhlIGF0cm9wYS4nICsgY2xhc3NOYW1lICtcclxuICAgICAgICAgICAgICAgICAgICAnIGNsYXNzIGlzIHVuc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuJztcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRlc3QgPSByZXF1aXJlbWVudEZuKCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHRlc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5lcnJvciA9IGVycm9yTWVzc2FnZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRlc3QgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLnN1cHBvcnQgPSAndW5zdXBwb3J0ZWQnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnB1c2goY2hlY2spO1xyXG59O1xyXG4vKipcclxuICogQ29udGFpbmVyIGZvciBnb2JhbCBkYXRhIHJlbGF0ZWQgdG8gdGhlIGNsYXNzZXMgYW5kIGZ1bmN0aW9ucy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBnb2JhbCBkYXRhIHJlbGF0ZWQgdG8gdGhlIGNsYXNzZXMgYW5kIGZ1bmN0aW9ucy5cclxuICovXHJcbmF0cm9wYS5kYXRhID0ge307XHJcblxyXG5hdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMgPSBbXTtcclxuXHJcbmF0cm9wYS5ub3AgPSBmdW5jdGlvbiBub3AgKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcblxyXG4iLCIvKipcclxuICogQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxyXG4gKi9cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogQ29udGFpbmVyIGZvciBmdW5jdGlvbnMgdGhhdCB0ZXN0IHRoZSBzdGF0ZSBvZiBpbnB1dHMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgZnVuY3Rpb25zIHRoYXQgdGVzdCB0aGUgc3RhdGUgb2YgaW5wdXRzLlxyXG4gKiBAc2VlIDxhIGhyZWY9XCIuLi8uLi8uLi9BdHJvcGFUb29sYm94VGVzdHMuaHRtbD9zcGVjPWF0cm9wYS5pbnF1aXJlXCI+dGVzdHM8L2E+XHJcbiAqL1xyXG5hdHJvcGEuaW5xdWlyZSA9IHt9O1xyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IGlzIG51bGwuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge01peGVkfSB4IEFueSBpbnB1dCB0aGF0IG1heSBvciBtYXkgbm90IGJlIG51bGwuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgeCA9PT0gbnVsbC5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlLmlzTnVsbCA9IGZ1bmN0aW9uICh4KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiAoeCA9PT0gbnVsbCk7XHJcbn07XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgaXMgYW4gb2JqZWN0LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtNaXhlZH0geCBBbnkgaW5wdXQgdGhhdCBtYXkgb3IgbWF5IG5vdCBiZSBhbiBvYmplY3QuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgdHlwZW9mKHgpID09PSAnb2JqZWN0Jy5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlLmlzT2JqZWN0ID0gZnVuY3Rpb24gKHgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuICh0eXBlb2YgeCA9PT0gJ29iamVjdCcpO1xyXG59O1xyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IGlzIGJvdGggYW4gb2JqZWN0IGFuZCBub3QgbnVsbC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7TWl4ZWR9IHggQW55IGlucHV0IHRoYXQgbWF5IG9yIG1heSBub3QgYmUgYm90aCBhblxyXG4gKiBvYmplY3QgYW5kIG51bGwuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgeCBpcyBib3RoIGFuIG9iamVjdCBhbmRcclxuICogbm90IG51bGwuIChudWxsIGlzIGFuIG9iamVjdCkuXHJcbiAqL1xyXG5hdHJvcGEuaW5xdWlyZS5pc09iamVjdE5vdE51bGwgPSBmdW5jdGlvbiAoeCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gYXRyb3BhLmlucXVpcmUuaXNPYmplY3QoeCkgJiYgKCFhdHJvcGEuaW5xdWlyZS5pc051bGwoeCkpO1xyXG59O1xyXG4vKipcclxuICogQ2hlY2tzIGFuIG9iamVjdCBmb3IgdGhlIGV4aXN0ZW5jZSBvZiBhIHByb3BlcnR5XHJcbiAqIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGUgcHJvcGVydHkgd2FzIGluaGVyaXRlZFxyXG4gKiBvciBub3QuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIEFuIG9iamVjdCB3aGljaCBtYXkgb3IgbWF5IG5vdFxyXG4gKiBoYXZlIHRoZSBwcm9wZXJ0eSBpZGVudGlmaWVkIGJ5IHByb3AuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wIEEgc3RyaW5nIHZhbHVlIHJlcHJlc2VudGluZyB0aGVcclxuICogbmFtZSBvZiB0aGUgcHJvcGVydHkuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgb2JqLnByb3AgZXhpc3RzLFxyXG4gKiBvdGhlcndpc2UgcmV0dXJucyBmYWxzZS5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlLmhhc1Byb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBpZiAoYXRyb3BhLmlucXVpcmUuaXNPYmplY3ROb3ROdWxsKG9iaikpIHtcclxuICAgICAgICByZXR1cm4gKHByb3AgaW4gb2JqKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBhbiBlbXB0eSBzdHJpbmcuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgeW91IHdhbnQgdG8ga25vdyBhYm91dFxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHN0ciBpcyBhbiBlbXB0eSBzdHJpbmcsXHJcbiAqICBvdGhlcndpc2UgcmV0dXJucyBmYWxzZS5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlLmlzRW1wdHlTdHJpbmcgPSBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBvdXQgPSBmYWxzZTtcclxuICAgIGlmICgnJyA9PT0gc3RyKSB7XHJcbiAgICAgICAgb3V0ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBvdXQ7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqL1xyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBDb250YWluZXIgZm9yIHJlZ2V4IGZ1bmN0aW9ucy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciByZWdleCBmdW5jdGlvbnMuXHJcbiAqIEBzZWUgPGEgaHJlZj1cIi4uLy4uLy4uL0F0cm9wYVRvb2xib3hUZXN0cy5odG1sP3NwZWM9YXRyb3BhLnJlZ2V4XCI+dGVzdHM8L2E+XHJcbiAqL1xyXG5hdHJvcGEucmVnZXggPSB7fTtcclxuLyoqXHJcbiAqIFJlZ2V4IHBhdHRlcm5zLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBSZWdleCBwYXR0ZXJucy5cclxuICovXHJcbmF0cm9wYS5yZWdleC5wYXR0ZXJucyA9IHtcclxuICAgIC8qKiBmaW5kcyByZXBlYXRlZCB3b3JkcyBhbmQgcGhyYXNlcyAqL1xyXG4gICAgcmVwZWF0ZWRXb3JkcyA6IC8oXFxiLnszLH1cXGIpXFxzKihcXDEpL2csXHJcbiAgICAvKiogZmluZHMgcGFyYWdyYXBoIGJyZWFrcyAqL1xyXG4gICAgcGFyYWdyYXBoQnJlYWtzIDogLyhcXHJcXG5cXHJcXG58XFxuXFxufFxcclxccikvZyxcclxuICAgIC8qKiBmaW5kcyBsaW5lIGJyZWFrcyAqL1xyXG4gICAgbGluZUJyZWFrcyA6IC8oXFxyXFxufFxccnxcXG4pL2dcclxufTtcclxuLyoqXHJcbiAqIEFwcGVuZHMgY29tbW9uIHByZWZpeCwgc3VmZml4LCBhbmQgd29yZCBib3VuZGFyeSByZWdleCBzdHJpbmdzIHRvXHJcbiAqIHRoZSBzdXBwbGllZCB3b3JkLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMTBcclxuICogQHBhcmFtIHtTdHJpbmd9IHdvcmQgVGhlIHdvcmQgdG8gYXBwZW5kIHByZWZpeCBhbmQgc3VmZml4IHRvXHJcbiAqIEBwYXJhbSB7SW50ZWdlcn0gdGhyZXNob2xkIFRoZSB3b3JkLmxlbmd0aCBhdCB3aGljaCBpdCBkb2VzIG5vdFxyXG4gKiBtYWtlIHNlbnNlIHRvIGFwcGVuZCBwcmVmaXggYW5kIHN1ZmZpeC4gRGVmYXVsdHMgdG8gMy5cclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgc3VwcGxpZWQgd29yZCB3aXRoIHByZWZpeCwgc3VmZml4LFxyXG4gKiBhbmQgd29yZCBib3VuZGFyaWVzIGF0dGFjaGVkLiBJZiB0aGUgd29yZC5sZW5ndGggd2FzIG5vdCBncmVhdGVyXHJcbiAqIHRoYW4gdGhlIHRocmVzaG9sZCwgb25seSB3b3JkIGJvdW5kYXJpZXMgYXJlIGF0dGFjaGVkLiBUaGUgc3RyaW5nXHJcbiAqIHJlcHJlc2VudHMgYSBSZWdFeCB3aGljaCBzaG91bGQgcGljayBvdXQgbW9zdCBmb3JtcyBvZiByZWd1bGFyXHJcbiAqIHdvcmRzLlxyXG4gKi9cclxuYXRyb3BhLnJlZ2V4LmFwcGVuZFByZWZpeGVzQW5kU3VmZml4ZXMgPSBmdW5jdGlvbiAod29yZCwgdGhyZXNob2xkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBwcmVmaXhlcyxcclxuICAgIHN1ZmZpeGVzO1xyXG4gICAgcHJlZml4ZXMgPSAnKHByZXx1bnxyZSk/JztcclxuICAgIHN1ZmZpeGVzID0gJyhpZmljYXRpb258JyArXHJcbiAgICAgICAgICAgICAgICAndGlvbmFsbHl8JyArXHJcbiAgICAgICAgICAgICAgICAnaWNhdGlvbnwnICtcclxuICAgICAgICAgICAgICAgICdpZmllZHxpc3RpY3xpbmVzc3wnICtcclxuICAgICAgICAgICAgICAgICdmYXJlfHRpb258YW5jZXxlbmNlfGxlc3N8YWxseXxhYmxlfG5lc3N8aXplZHxpc2VkfCcgK1xyXG4gICAgICAgICAgICAgICAgJ291c3xpZnl8aW5nfGl0eXxmdWx8YW50fGF0ZXxlc3R8aXNtfGl6bXxpc3R8JyArXHJcbiAgICAgICAgICAgICAgICAnaWN8YWx8ZWR8ZXJ8ZXR8bHl8cnN8aW58JyArXHJcbiAgICAgICAgICAgICAgICAneXxzfHJ8ZCk/JztcclxuICAgIFxyXG4gICAgdGhyZXNob2xkID0gdGhyZXNob2xkID09PSB1bmRlZmluZWQgPyAzIDogdGhyZXNob2xkO1xyXG4gICAgXHJcbiAgICBpZiAod29yZC5sZW5ndGggPiB0aHJlc2hvbGQpIHtcclxuICAgICAgICB3b3JkID0gJ1xcXFxiJyArIHByZWZpeGVzICsgd29yZCArIHN1ZmZpeGVzICsgJ1xcXFxiJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgd29yZCA9ICdcXFxcYigpJyArIHdvcmQgKyAnKClcXFxcYic7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gd29yZDtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwiLyoqXHJcbiAqIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICovXHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuLyoqXHJcbiAqIFNldCBkZWZhdWx0IHZhbHVlcyBmb3Igb3B0aW9uYWwgZnVuY3Rpb24gcGFyYW1ldGVycy5cclxuICogQGV4YW1wbGVcclxuICogPHByZT5cclxuICogICAvLyBUbyBzZXQgYSBkZWZhdWx0IHZhbHVlIGZvciBhbiBvcHRpb25hbCBwYXJhbWV0ZXJcclxuICogICBmdW5jdGlvbihvcHRpb25hbEFyZykge1xyXG4gKiAgICAgICB2YXIgZGVmYXVsdFZhbCA9ICdoZWxsbyB0aGVyZSEnO1xyXG4gKiAgICAgICBvcHRpb25hbEFyZyA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKGRlZmF1bHRWYWwsIG9wdGlvbmFsQXJnKTtcclxuICogICAgICAgcmV0dXJuIG9wdGlvbmFsQXJnO1xyXG4gKiAgIH1cclxuICogPC9wcmU+XHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge01peGVkfSBkZWZhdWx0VmFsIFRoZSBkZWZhdWx0IHZhbHVlIHRvIHNldC5cclxuICogQHBhcmFtIHtNaXhlZH0gb3B0aW9uYWxBcmcgQSByZWZlcmVuY2UgdG8gdGhlIG9wdGlvbmFsIGFyZ3VtZW50LlxyXG4gKiBAcmV0dXJucyB7TWl4ZWR9IFJldHVybnMgdGhlIGRlZmF1bHQgdmFsdWUgc3VwcGxpZWQgd2hlbiB0aGUgb3B0aW9uYWxcclxuICogYXJndW1lbnQgaXMgdW5kZWZpbmVkIG9yIG51bGwuIE90aGVyd2lzZSwgdGhlIHN1cHBsaWVkIG9wdGlvbmFsIGFyZ3VtZW50XHJcbiAqIGlzIHJldHVybmVkLlxyXG4gKiBAc2VlIDxhIGhyZWY9XCIuLi8uLi8uLi9BdHJvcGFUb29sYm94VGVzdHMuaHRtbD9zcGVjPWF0cm9wYS5zZXRBc09wdGlvbmFsQXJnXCI+dGVzdHM8L2E+XHJcbiAqL1xyXG5hdHJvcGEuc2V0QXNPcHRpb25hbEFyZyA9IGZ1bmN0aW9uIChkZWZhdWx0VmFsLCBvcHRpb25hbEFyZykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBpZiAob3B0aW9uYWxBcmcgPT09IHVuZGVmaW5lZCB8fCBvcHRpb25hbEFyZyA9PT0gbnVsbCkge1xyXG4gICAgICAgIG9wdGlvbmFsQXJnID0gZGVmYXVsdFZhbDtcclxuICAgIH1cclxuICAgIHJldHVybiBvcHRpb25hbEFyZztcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwiLyoqXHJcbiAqIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICovXHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbmF0cm9wYS5yZWdleCA9IHJlcXVpcmUoJ2F0cm9wYS1yZWdleCcpLnJlZ2V4O1xyXG5hdHJvcGEuYXJyYXlzID0gcmVxdWlyZSgnYXRyb3BhLWFycmF5cycpLmFycmF5cztcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogQSBmZXcgdXRpbGl0aWVzIGZvciBtYW5pcHVsYXRpbmcgc3RyaW5ncy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgQSBmZXcgdXRpbGl0aWVzIGZvciBtYW5pcHVsYXRpbmcgc3RyaW5ncy5cclxuICogQHJlcXVpcmVzIGF0cm9wYS5yZWdleC5wYXR0ZXJuc1xyXG4gKiBAc2VlIDxhIGhyZWY9XCIuLi8uLi8uLi9BdHJvcGFUb29sYm94VGVzdHMuaHRtbD9zcGVjPWF0cm9wYS5zdHJpbmdcIj50ZXN0czwvYT5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcgPSB7fTtcclxuLyoqXHJcbiAqIFJlcGxhY2VzIHJlcGVhdGVkIHdvcmRzIGFuZCBwaHJhc2VzIHdpdGggYSBzaW5nbGUgd29yZCBvciBwaHJhc2UuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDcwMVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gcmVtb3ZlIHJlcGVhdGVkIHdvcmRzIGZyb20uXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIGdpdmVuIHN0cmluZyB3aXRoIHJlcGVhdGVkIHdvcmRzIGFuZFxyXG4gKiAgcGhyYXNlcyByZW1vdmVkLlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5yZW1vdmVSZXBlYXRlZFdvcmQgPSBmdW5jdGlvbiByZW1vdmVSZXBlYXRlZFdvcmQgKHN0cmluZykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoYXRyb3BhLnJlZ2V4LnBhdHRlcm5zLnJlcGVhdGVkV29yZHMsICckMScpO1xyXG59O1xyXG4vKipcclxuICogQ3JlYXRlcyBwYXJhZ3JhcGggYnJlYWtzIGF0IGV2ZXJ5IG9jY3VycmVuY2Ugb2YgdHdvIGNvbnNlY3V0aXZlIGxpbmUgYnJlYWtzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzA3MDFcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGluc2VydCBwYXJhZ3JhcGggdGFncyBpbnRvLlxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBnaXZlbiBzdHJpbmcgd2l0aCBwYXJhZ3JhcGggYnJlYWtzIGluc2VydGVkLlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5saW5lQnJlYWtzVG9QYXJhZ3JhcGhUYWdzID0gZnVuY3Rpb24gbGluZUJyZWFrc1RvUGFyYWdyYXBoVGFncyAoc3RyaW5nKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBvdXQgPSBzdHJpbmcucmVwbGFjZShhdHJvcGEucmVnZXgucGF0dGVybnMucGFyYWdyYXBoQnJlYWtzLCAnPC9wPjxwPicpO1xyXG4gICAgb3V0ID0gJzxwPicgKyBvdXQudHJpbSgpICsgJzwvcD4nO1xyXG4gICAgb3V0ID0gb3V0LnJlcGxhY2UoL1xccys8XFwvKHB8YnIpPi9nLCAnPC8kMT4nKTtcclxuICAgIHJldHVybiBvdXQ7XHJcbn07XHJcbi8qKlxyXG4gKiBDcmVhdGVzIGJyZWFrIHRhZ3MgYXQgZXZlcnkgbGluZSBicmVhay5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwNzAxXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBpbnNlcnQgYnJlYWsgdGFncyBpbnRvLlxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBnaXZlbiBzdHJpbmcgd2l0aCBicmVhayB0YWdzIGluc2VydGVkLlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5saW5lQnJlYWtzVG9CcmVha1RhZ3MgPSBmdW5jdGlvbiBsaW5lQnJlYWtzVG9CcmVha1RhZ3MgKHN0cmluZykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoYXRyb3BhLnJlZ2V4LnBhdHRlcm5zLmxpbmVCcmVha3MsICc8YnI+Jyk7XHJcbn07XHJcbi8qKlxyXG4gKiBOb3JtYWxpemVzIGxpbmUgYnJlYWtzIHRvIGBcXG5gLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzA3MDFcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIG5vcm1hbGl6ZS5cclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgZ2l2ZW4gc3RyaW5nIHdpdGggbm9ybWFsaXplZCBsaW5lIGJyZWFrcy5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcubm9ybWFsaXplRW9sID0gZnVuY3Rpb24gbm9ybWFsaXplRW9sIChzdHJpbmcpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGF0cm9wYS5yZWdleC5wYXR0ZXJucy5saW5lQnJlYWtzLCAnXFxuJyk7XHJcbn07XHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIGEgZ2l2ZW4gc3RyaW5nIHRvXHJcbiAqIHVwcGVyY2FzZS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyBmb3Igd2hpY2ggeW91IHdhbnQgdGhlXHJcbiAqIGZpcnN0IGxldHRlciB0byBiZSBpbiB1cHBlciBjYXNlLlxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgZ2l2ZW4gc3RyaW5nIHdpdGggaXQncyBmaXJzdCBsZXR0ZXIgY2FwaXRhbGl6ZWQuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLnVjRmlyc3QgPSBmdW5jdGlvbiB1Y0ZpcnN0KHN0cmluZykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBzdHJpbmcgPSBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XHJcbiAgICByZXR1cm4gc3RyaW5nO1xyXG59O1xyXG4vKipcclxuICogQ29udmVydHMgdGhlIGdpdmVuIHN0cmluZyB0byBjYW1lbCBjYXNlLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzA4MjNcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNhbWVsaXplLlxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgY2FtZWxpemVkIHN0cmluZy5cclxuICogQGV4YW1wbGVcclxuICogIGF0cm9wYS5zdHJpbmcuY2FtZWxpemUoJ2dldCBpdCB0b2dldGhlcicpO1xyXG4gKiAgLy8gcmV0dXJucyBcImdldEl0VG9nZXRoZXJcIlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5jYW1lbGl6ZSA9IGZ1bmN0aW9uIGNhbWVsaXplIChzdHIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIGFyciwgb3V0O1xyXG4gICAgYXJyID0gc3RyLnNwbGl0KCcgJyk7XHJcbiAgICBvdXQgPSBhcnIuc2hpZnQoKTtcclxuICAgIGFyciA9IGFyci5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICByZXR1cm4gYXRyb3BhLnN0cmluZy51Y0ZpcnN0KGl0ZW0pO1xyXG4gICAgfSk7XHJcbiAgICBvdXQgKz0gYXJyLmpvaW4oJycpO1xyXG4gICAgcmV0dXJuIG91dDtcclxufTtcclxuLyoqXHJcbiAqIENvdW50cyB3b3Jkcy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMzEzXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzb21lVGV4dCBQbGFpbiB0ZXh0LlxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFJldHVybnMgdGhlIGNvdW50IG9mIHdvcmRzIGluIHNvbWVUZXh0LlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5jb3VudFdvcmRzID0gZnVuY3Rpb24gY291bnRXb3Jkcyhzb21lVGV4dCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgd29yZENvdW50LCByZSwgbGVuID0gMDtcclxuICAgIGlmKHNvbWVUZXh0ICE9PSB1bmRlZmluZWQgJiYgc29tZVRleHQgIT09IG51bGwpIHtcclxuICAgICAgICBzb21lVGV4dCA9IHNvbWVUZXh0LnRyaW0oKTtcclxuICAgICAgICBpZihzb21lVGV4dCAhPT0gJycpIHtcclxuICAgICAgICAgICAgd29yZENvdW50ID0gMDtcclxuICAgICAgICAgICAgcmUgPSAvXFxzKy9naTtcclxuICAgICAgICAgICAgd29yZENvdW50ID0gc29tZVRleHQuc3BsaXQocmUpO1xyXG4gICAgICAgICAgICBsZW4gPSB3b3JkQ291bnQubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBsZW47XHJcbn07XHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBlbmQgb2YgbGluZSBtYXJrZXJzIGludG8gd2hhdGV2ZXIgeW91IHdhbnQuIFxyXG4gKiBBdXRvbWF0aWNhbGx5IGRldGVjdHMgYW55IG9mIFxcclxcbiwgXFxuLCBvciBcXHIgYW5kIFxyXG4gKiByZXBsYWNlcyBpdCB3aXRoIHRoZSB1c2VyIHNwZWNpZmllZCBFT0wgbWFya2VyLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGhlIHRleHQgeW91IHdhbnQgcHJvY2Vzc2VkLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gbmV3RU9MIFRoZSByZXBsYWNlbWVudCBmb3IgdGhlIGN1cnJlbnQgRU9MIG1hcmtzLlxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBwcm9jZXNzZWQgdGV4dC5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcuY29udmVydEVvbCA9IGZ1bmN0aW9uIGNvbnZlcnRFT0wodGV4dCwgbmV3RU9MKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKGF0cm9wYS5yZWdleC5wYXR0ZXJucy5saW5lQnJlYWtzLCBuZXdFT0wpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYSBxdWFudGl0eSBvZiBsZWFkaW5nIHNwYWNlcyBzcGVjaWZpZWQgYnkgb2Zmc2V0LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGhlIHRleHQgdG8gcHJvY2Vzcy5cclxuICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCBUaGUgYW1vdW50IG9mIHNwYWNlcyB5b3Ugd2FudCByZW1vdmVkIFxyXG4gKiBmcm9tIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHRleHQuXHJcbiAqIEByZXR1cm5zIFJldHVybnMgdGhlIHByb2Nlc3NlZCB0ZXh0LlxyXG4gKi9cclxuYXRyb3BhLnN0cmluZy5vZmZzZXRXaGl0ZVNwYWNlID0gZnVuY3Rpb24gb2Zmc2V0V2hpdGVTcGFjZSh0ZXh0LCBvZmZzZXQpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHZhciByZWd4O1xyXG4gICAgcmVneCA9IG5ldyBSZWdFeHAoJ14geycgKyBvZmZzZXQgKyAnfScpO1xyXG4gICAgdGV4dCA9IHRleHQucmVwbGFjZShyZWd4LCAnJyk7XHJcbiAgICByZXR1cm4gdGV4dDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhbGwgdGFicyBpbiBsZWFkaW5nIHdoaXRlc3BhY2UgaW50byBmb3VyIHNwYWNlcy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIHByb2Nlc3NcclxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgcHJvY2Vzc2VkIHRleHQuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLm5vcm1hbGl6ZVdoaXRlU3BhY2VQcmVmaXggPSBmdW5jdGlvbiBub3JtYWxpemVXaGl0ZVNwYWNlUHJlZml4KFxyXG4gICAgdGV4dFxyXG4pIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHZhciBwcmVmaXggPSB0ZXh0Lm1hdGNoKC9eXFxzKi8pO1xyXG4gICAgaWYocHJlZml4KSB7XHJcbiAgICAgICAgcHJlZml4ID0gcHJlZml4WzBdO1xyXG4gICAgICAgIHByZWZpeCA9IHByZWZpeC5yZXBsYWNlKC9cXHQvZywgJyAgICAnKTtcclxuICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9eXFxzKi8sIHByZWZpeCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGV4dDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhbGwgdGFicyBpbnRvIGZvdXIgc3BhY2VzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGhlIHRleHQgdG8gcHJvY2Vzc1xyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBwcm9jZXNzZWQgdGV4dC5cclxuICovXHJcbmF0cm9wYS5zdHJpbmcubm9ybWFsaXplV2hpdGVTcGFjZSA9IGZ1bmN0aW9uIG5vcm1hbGl6ZVdoaXRlU3BhY2UodGV4dCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFx0L2csICcgICAgJyk7XHJcbiAgICByZXR1cm4gdGV4dDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb3VudHMgdGhlIG51bWJlciBvZiBsZWFkaW5nIHNwYWNlIG9yIHRhYiBjaGFyYWN0ZXJzIGJ1dCBub3QgYm90aC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIGFuYWx5emUuXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgdGhlIHF1YW50aXR5IG9mIGxlYWRpbmcgc3BhY2VzIG9yIHRhYnMuXHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLmdldE9mZnNldCA9IGZ1bmN0aW9uIGdldE9mZnNldCh0ZXh0KSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICB2YXIgb2Zmc2V0ID0gMCxcclxuICAgICAgICBsZWFkaW5nQ2hhciA9IHRleHQuY2hhckF0KDApO1xyXG4gICAgICAgIFxyXG4gICAgaWYoIGxlYWRpbmdDaGFyID09PSAnICcgfHwgbGVhZGluZ0NoYXIgPT09ICdcXHQnKSB7XHJcbiAgICAgICAgd2hpbGUodGV4dC5jaGFyQXQob2Zmc2V0KSA9PT0gbGVhZGluZ0NoYXIgJiYgb2Zmc2V0IDwgdGV4dC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgb2Zmc2V0Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9mZnNldDtcclxufTtcclxuLyoqXHJcbiAqIEJyZWFrcyBhIHN0cmluZyBpbnRvIGFuIGFycmF5IG9mIHdvcmRzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMThcclxuICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGhlIHRleHQgdG8gYW5hbHl6ZS5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIHRoZSB3b3JkcyBpblxyXG4gKiAgdGhlIGdpdmVuIHRleHQuXHJcbiAqIEByZXF1aXJlcyBhdHJvcGEuYXJyYXlzLnJlbW92ZUVtcHR5RWxlbWVudHNcclxuICovXHJcbmF0cm9wYS5zdHJpbmcuZ2V0V29yZHMgPSBmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgb3V0ID0gW107XHJcbiAgICBmdW5jdGlvbiBpbnZhbGlkQ2hhcnMoZWxlbWVudCkge1xyXG4gICAgICAgIHZhciBtYXRjaGVkID0gL15bXFwtJ+KAmWBdKyQvLnRlc3QoZWxlbWVudCk7XHJcbiAgICAgICAgLy8gaW52ZXJ0IHRoZSByZXN1bHQgb2YgdGVzdC4gdGhyb3cgb3V0IGVsZW1lbnRzIHRoYXQgbWF0Y2guXHJcbiAgICAgICAgcmV0dXJuICFtYXRjaGVkO1xyXG4gICAgfVxyXG4gICAgb3V0ID0gYXRyb3BhLmFycmF5cy5yZW1vdmVFbXB0eUVsZW1lbnRzKFxyXG4gICAgICAgIHRleHQuc3BsaXQoL1teQS1aYS16XFwtJ+KAmWBdKy9naSlcclxuICAgICk7XHJcbiAgICBvdXQgPSBvdXQuZmlsdGVyKGludmFsaWRDaGFycyk7XHJcbiAgICByZXR1cm4gb3V0O1xyXG59O1xyXG4vKipcclxuICogRXNjYXBlcyA8Y29kZT5DREFUQTwvY29kZT4gc2VjdGlvbnMgaW4gdGV4dFxyXG4gKiAgc28gdGhhdCB0aGUgdGV4dCBtYXkgYmUgZW1iZWRkZWQgaW50byBhIFxyXG4gKiAgPGNvZGU+Q0RBVEE8L2NvZGU+IHNlY3Rpb24uIFRoaXMgc2hvdWxkIGJlIHJ1blxyXG4gKiAgb24gYW55IHRleHQgd2hpY2ggbWF5IGNvbnRhaW4gdGhlIHN0cmluZyBcclxuICogIDxjb2RlPl1dPjwvY29kZT4gc2luY2Ugc2FpZCBzdHJpbmcgd2lsbCBlZmZlY3RpdmVseVxyXG4gKiAgZW5kIHRoZSA8Y29kZT5DREFUQTwvY29kZT4gc2VjdGlvbiBwcmVtYXR1cmVseS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IGNvbnRhaW5pbmcgXHJcbiAqICA8Y29kZT5DREFUQTwvY29kZT4gc2VjdGlvbnMgdG8gZXNjYXBlLlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBzdHJpbmcgd2l0aCBlc2NhcGVkXHJcbiAqICA8Y29kZT5DREFUQTwvY29kZT4gc2VjdGlvbnMuXHJcbiAqIEBzZWUgPGEgaHJlZj1cImh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ0RBVEEjTmVzdGluZ1wiPlxyXG4gKiAgaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9DREFUQSNOZXN0aW5nPC9hPlxyXG4gKiBAc2VlIDxhIGhyZWY9XCJodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD05ODE2OFwiPlxyXG4gKiAgaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9OTgxNjg8L2E+XHJcbiAqL1xyXG5hdHJvcGEuc3RyaW5nLmVzY2FwZUNkYXRhID0gZnVuY3Rpb24gZXNjYXBlQ2RhdGEodGV4dCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gU3RyaW5nKHRleHQpLnJlcGxhY2UoL1xcXVxcXT4vZywgJ11dXV0+PCFbQ0RBVEFbPicpO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCJ2YXIgd3RmID0gcmVxdWlyZSgnLi4vc3JjL2F0cm9wYS13dGYuanMnKTtcclxuXHJcbnRyeSB7XHJcbiAgICBPYmplY3Qua2V5cyh3dGYpLmZvckVhY2goXHJcbiAgICAgICAgZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICAgICAgaWYoIWF0cm9wYVtwcm9wXSkge1xyXG4gICAgICAgICAgICAgICAgYXRyb3BhW3Byb3BdID0gd3RmW3Byb3BdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufSBjYXRjaCAoaWdub3JlKSB7XHJcbiAgICBhdHJvcGEgPSByZXF1aXJlKCcuLi9zcmMvYXRyb3BhLXd0Zi5qcycpO1xyXG59XHJcblxyXG5PYmplY3Qua2V5cyh3dGYuZGF0YSkuZmlsdGVyKFxyXG4gICAgZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICByZXR1cm4gcHJvcCAhPT0gJ3JlcXVpcmVtZW50cyc7XHJcbiAgICB9XHJcbikuZm9yRWFjaChcclxuICAgIGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgICAgYXRyb3BhLmRhdGFbcHJvcF0gPSB3dGYuZGF0YVtwcm9wXTtcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICovXHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbmF0cm9wYS5yZWdleCA9IHJlcXVpcmUoJ2F0cm9wYS1yZWdleCcpLnJlZ2V4O1xyXG5hdHJvcGEuc3RyaW5nID0gcmVxdWlyZSgnYXRyb3BhLXN0cmluZycpLnN0cmluZztcclxuYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcgPSByZXF1aXJlKCdhdHJvcGEtc2V0QXNPcHRpb25hbEFyZycpLnNldEFzT3B0aW9uYWxBcmc7XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZSxcclxuICAgIHZhcnM6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBhdHJvcGEucmVxdWlyZXMoXHJcbiAgICAgICAgJ3d0ZicsXHJcbiAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc3VwcG9ydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIGF0cm9wYS5yZWdleCxcclxuICAgICAgICAgICAgICAgIGF0cm9wYS5zdHJpbmcuY291bnRXb3JkcyxcclxuICAgICAgICAgICAgICAgIGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnXHJcbiAgICAgICAgICAgIF0uZm9yRWFjaChmdW5jdGlvbiAocHJlcmVxdWlzaXRlKSB7XHJcbiAgICAgICAgICAgICAgICBpZihwcmVyZXF1aXNpdGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcclxuICAgICAgICB9XHJcbiAgICApO1xyXG59KCkpO1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnJlcXVpcmVzKFxyXG4gICAgICAgICd3dGZIdG1sRWxlbWVudCcsXHJcbiAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc3VwcG9ydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgIHdpbmRvd1xyXG4gICAgICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKHByZXJlcXVpc2l0ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYocHJlcmVxdWlzaXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufSgpKTtcclxuXHJcbi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBXVEZpZmllciByZWxhdGVkIGZ1bmN0aW9ucyBhbmQgc3VjaC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgV1RGaWZpZXIgcmVsYXRlZCBmdW5jdGlvbnMgYW5kIHN1Y2guXHJcbiAqIEBzZWUgPGEgaHJlZj1cIi4uLy4uLy4uL0F0cm9wYVRvb2xib3hUZXN0cy5odG1sP3NwZWM9YXRyb3BhLnd0ZlwiPnRlc3RzPC9hPlxyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLnJlZ2V4XHJcbiAqIEByZXF1aXJlcyBhdHJvcGEud3RmLmRpY3Rpb25hcnlcclxuICovXHJcbmF0cm9wYS53dGYgPSB7fTtcclxuLyoqXHJcbiAqIFRoZSBHbG9yaW91cyBXVEZpZmljYXRpb24gRGljdGlvbmFyeTogVHVybmluZyBTaGl0XHJcbiAqIEludG8gUG9saXNoZWQgVHVyZHMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExMFxyXG4gKi9cclxuYXRyb3BhLnd0Zi5kaWN0aW9uYXJ5ID0ge1xyXG4gICAgXCJub3ZlbHR5IHF1aWNrbHkgd2VhcnMgb2ZmXCIgOiBcImR1bWIgc2hpdCBnaXRzIG9sZCBmYXN0XCIsXHJcbiAgICBcInRoZSB3YXkgaXQgaXNcIiA6IFwiaG93IGl0IGJlXCIsXHJcbiAgICBcInB1dCB1cCB3aXRoXCIgOiBcIm1hbmhhbmRsZVwiLFxyXG4gICAgXCJ5ZXRcIiA6IFwiaW1tZWRpYXRlbHlcIixcclxuICAgIFwibG9zZVwiIDogXCJzaGFrZVwiLFxyXG4gICAgXCJmb3Igbm8gcmVhc29uXCIgOiBcIm1haWFjYWxseVwiLFxyXG4gICAgXCJnaXZlbiBhIGNob2ljZVwiIDogXCJleHRvcnRlZFwiLFxyXG4gICAgXCJub3Qgc3Ryb25nIGVub3VnaFwiIDogXCJhaW4ndCBnb3QgdGhlIG51dHNcIixcclxuICAgIFwibm93IGF0IGFuIGVuZFwiIDogXCJicmFuZCBzcGFua2luIG5ld1wiLFxyXG4gICAgXCJiZSB0b2dldGhlclwiIDogXCJtYXNoIHVwXCIsXHJcbiAgICBcImFwb2NhbHlwc2VcIiA6IFwicGFydHkgdGltZVwiLFxyXG4gICAgXCJub3RoaW5nIGlzIGFzc3VyZWRcIiA6IFwid2UgbGl2ZSB0byBkZWxpdmVyXCIsXHJcbiAgICBcInRvIG5vIGF2YWlsXCIgOiBcImZvciBncmVhdCBnb29kXCIsXHJcbiAgICBcInRvbyBnb29kIHRvIGJlIHRydWVcIiA6IFwiZnVja2luZyBmYW50YXN0aWNcIixcclxuICAgIFwiZ3Jvd2luZyBhcGFydFwiIDogXCJmdWNraW5nIG90aGVyIHBlb3BsZVwiLFxyXG4gICAgXCJyZXN0IGluIHBlYWNlXCIgOiBcInBhcnR5IGxpa2UgaXQncyAxOTk5XCIsXHJcbiAgICBcImJhY2sgc3RhYlwiIDogXCJydW1wIHNoYWtlXCIsXHJcbiAgICBcImJhY2sgc3RhYmJcIiA6IFwicnVtcCBzaGFrZVwiLFxyXG4gICAgXCJsb29rIGludG8gdGhlaXIgZXllc1wiIDogXCJnaXZlIHRoZW0gQUlEU1wiLFxyXG4gICAgXCJsb29rIGludG8gaGVyIGV5ZXNcIiA6IFwiZ2l2ZSBoZXIgQUlEU1wiLFxyXG4gICAgXCJsb29rIGludG8gaGlzIGV5ZXNcIiA6IFwiZ2l2ZSBoaW0gQUlEU1wiLFxyXG4gICAgXCJjYW4ndCBsaXZlIHdpdGhvdXRcIiA6IFwidG91Y2ggbXlzZWxmIGFib3V0XCIsXHJcbiAgICBcImNhbid0IGJlIHdpdGhvdXRcIiA6IFwidG91Y2ggbXlzZWxmIGFib3V0XCIsXHJcbiAgICBcImNvdWxkIG5ldmVyIGJlIHdpdGhvdXRcIiA6IFwiY2FuJ3Qgd29yayBhbmFsIGJlYWRzIHdpdGhvdXRcIixcclxuICAgIFwibm8gbWF0dGVyXCIgOiBcImlycmVnYXJkbGVzcyBvZlwiLFxyXG4gICAgXCJ3aWxsIGJlIHRoZXJlXCIgOiBcInN0aWNrIGxpa2Ugc2hpdFwiLFxyXG4gICAgXCJ3aWxsIGFsd2F5cyBiZSB0aGVyZVwiIDogXCJzdGljayBsaWtlIHdldCBzaGl0XCIsXHJcbiAgICBcImhvbGRpbmcgdGhlbSBjbG9zZSB0b1wiIDogXCJoYW5kY3VmZmluZyB0aGVtIHRvXCIsXHJcbiAgICBcImJ5IHlvdXIgc2lkZVwiIDogXCJvbiB5b3VyIGFzc1wiLFxyXG4gICAgXCJieSBteSBzaWRlXCIgOiBcIm9uIG15IGFzc1wiLFxyXG4gICAgXCJieSBoaXMgc2lkZVwiIDogXCJvbiBoaXMgYXNzXCIsXHJcbiAgICBcImJ5IGhlciBzaWRlXCIgOiBcIm9uIGhlciBhc3NcIixcclxuICAgIFwibGVhdmUgeW91ciBzaWRlXCIgOiBcImdldCBvZmYgeW91ciBhc3NcIixcclxuICAgIFwibGVhdmUgbXkgc2lkZVwiICAgOiBcImdldCBvZmYgbXkgYXNzXCIsXHJcbiAgICBcImxlYXZlIGhpcyBzaWRlXCIgIDogXCJnZXQgb2ZmIGhpcyBhc3NcIixcclxuICAgIFwibGVhdmUgaGVyIHNpZGVcIiAgOiBcImdldCBvZmYgaGVyIGFzc1wiLFxyXG4gICAgXCJkb2Vzbid0IGhhcHBlbiBvdmVyXCIgOiBcImNhcnR3aGVlbHMgc3RyYWlnaHQgYWNyb3NzXCIsXHJcbiAgICBcIm1lYW5zIG1hbnkgdGhpbmdzXCIgOiBcImlzIGJlc3QgZGVzY3JpYmVkIHdpdGggbGllc1wiLFxyXG4gICAgXCJsYXlpbmcgaW4gYmVkXCIgOiBcInRha2luZyBhIHNoaXRcIixcclxuICAgIFwicHJvbWlzZVwiIDogXCJsaWVcIixcclxuICAgIFwibGlhclwiIDogXCJmaWJiZXJcIixcclxuICAgIFwibGllXCIgOiBcImZpYlwiLFxyXG4gICAgXCJsaWVzXCIgOiBcImZpYnNcIixcclxuICAgIFwid2hhdCdzIHRoZSBwb2ludFwiIDogXCJ0aGUgZnVja3MgdGhpcyBtZWFuXCIsXHJcbiAgICBcIml0IG11c3QgYmUgdHJ1ZVwiIDogXCJmb3IgcmVhbCAnbicgc2hpdFwiLFxyXG4gICAgXCJ3aGF0IHBlb3BsZSBzYXlcIiA6IFwibXV0aGFwaHVra2FzIGJlIHRhbGtpblwiLFxyXG4gICAgXCJldGNoZWRcIiA6IFwiZ3JvdW5kXCIsXHJcbiAgICBcImRvbid0IGhhdmUgYSBjbHVlXCIgOiBcImdvdCBzaGl0IHR3aXN0ZWRcIixcclxuICAgIFwidmlzY2lvdXMgY3ljbGVcIiA6IFwiY2x1c3RlcmZ1Y2tcIixcclxuICAgIFwiZG9uJ3QgbmVlZFwiIDogXCJjb3VsZCBnaXZlIGEgZnVjayBhYm91dFwiLFxyXG4gICAgXCJyYXZlblwiIDogXCJwaWdlb25cIixcclxuICAgIFwidG8gZ2V0IGF3YXlcIiA6IFwidG8gZnVja2luZyBydW5cIixcclxuICAgIFwidG8gYSBiZXR0ZXJcIiA6IFwiZm9yIHNvbWUgZ2xpdHRlcmVkXCIsXHJcbiAgICBcImJlYXV0aWZ1bCBmYWNlXCIgOiBcImVub3Jtb3VzIHRpdHNcIixcclxuICAgIFwibWlnaHQgYXMgd2VsbFwiIDogXCJvaCBmdWNrIEkgb3VnaHR0YVwiLFxyXG4gICAgXCJ0aGUgZmlyc3QgbW9tZW50XCIgOiBcInN0cmFpZ2h0YXdheVwiLFxyXG4gICAgXCJhcyB3ZWxsXCIgOiBcImFsc29cIixcclxuICAgIFwic28gZ29vZFwiIDogXCJuZWF0b1wiLFxyXG4gICAgXCJjb3VsZCBkbyBhbnl0aGluZ1wiIDogXCJpcyBmdWNraW5nIGluc2FuZVwiLFxyXG4gICAgXCJzZXQgdGhlIG1vb2RcIiA6IFwid2hpcCBpdCBvdXRcIixcclxuICAgIFwiYmFieSBpZlwiIDogXCJsb29rIGJpdGNoLFwiLFxyXG4gICAgXCJ0aHJvdWdoIHlvdXIgaGFpclwiIDogXCJ1cHNpZGUgeW91ciBoZWFkXCIsXHJcbiAgICBcImVudGVyZWQgdGhlIGhvdXNlIG9mXCIgOiBcImdvdCB1cCBpbiB0aGUgYmFybiBmb3JcIixcclxuICAgIFwiYWx3YXlzIGxvdmUgeW91IHRoZSBzYW1lXCIgOiBcImFsd2F5cyBsb3ZlIHlvdSBsaWtlIG15IG90aGVyIHN1Y2tlcnNcIixcclxuICAgIFwia2lzc2luZyBvdGhlclwiIDogXCJnb2luZyBkb3duIG9uXCIsXHJcbiAgICBcIm5ldmVyIHRob3VnaHQgeW91IHdvdWxkIGRvIHRoYXRcIiA6IFwiZ290IHR1cm5lZCBvdXQgbGlrZSBhIGR1bWIgZnVja1wiLFxyXG4gICAgXCJsYXlpbmcgb24gdGhlIGZsb29yXCIgOiBcImJlZ2dpbmcgZm9yIGl0XCIsXHJcbiAgICBcImZpcnN0IGxhaWQgZXllcyBvblwiIDogXCJmaXJzdCB0cmllZCBncm9waW5nXCIsXHJcbiAgICBcIm1vc3QgcGVvcGxlIGNhbiBvbmx5XCIgOiBcIm1vc3QgZnJlYWtzIGFuZCBkb3BlIGZpZW5kc1wiLFxyXG4gICAgXCJ5b3Ugd2VyZSB0aGUgb25lXCIgOiBcInlvdSB3ZXJlIG15IHRhcmdldFwiLFxyXG4gICAgXCJzdGFuZGluZyBvdXQgZnJvbSB0aGUgY3Jvd2RcIiA6IFwid29iYmxpbmcgbGlrZSBhbiBlbGVwaGFudCBvbiBhIGJpY3ljbGVcIixcclxuICAgIFwic3Rvb2Qgb3V0IGZyb20gdGhlIGNyb3dkXCIgOiBcImppZ2dsZWQgbGlrZSBhIGplbGxvIFNhbnRhXCIsXHJcbiAgICBcInN0YW5kIG91dCBmcm9tIHRoZSBjcm93ZFwiIDogXCJsb29rIGxpa2UgYSBqYWNrYXNzXCIsXHJcbiAgICBcInN0YW5kcyBvdXQgZnJvbSB0aGUgY3Jvd2RcIiA6IFwic21lbGxzIGxpa2Ugb2xkIGRpY2tcIixcclxuICAgIFwiaSd2ZSBuZXZlciBmZWx0IHRoaXMgd2F5XCIgOiBcImkndmUgZG9uZSB0aGlzXCIsXHJcbiAgICBcIndpdGggZXZlcnkgZmliZXJcIiA6IFwiZnJvbSBwaXRoeSBwaXRzXCIsXHJcbiAgICBcIndhbmRlclwiIDogXCJzdHVtYmxlXCIsXHJcbiAgICBcImhhdW50XCIgOiBcInN0YWxrXCIsXHJcbiAgICBcIm1hc2tcIiA6IFwidHJhc2hiYWdcIixcclxuICAgIFwiZGVtb25pYyBhbmdlbFwiIDogXCJhc3MgcGlyYXRlXCIsXHJcbiAgICBcImFuZ2VsaWMgZGVtb25cIiA6IFwiYXNzIHBpcmF0ZVwiLFxyXG4gICAgXCJjdW5uaW5nXCIgOiBcImRlc3BlcmF0ZVwiLFxyXG4gICAgXCJkYW5nZXJvdXNcIiA6IFwiY29jayBjYXRjaGluZ1wiLFxyXG4gICAgXCJkZW1pLWdvZFwiIDogXCJwdW5rIGJpdGNoXCIsXHJcbiAgICBcImRlbWlnb2RcIiA6IFwicHVuayBiaXRjaFwiLFxyXG4gICAgXCJtb3J0YWxcIiA6IFwicXVlZXJcIixcclxuICAgIFwiaW1tb3J0YWxcIiA6IFwid2hpbnlcIixcclxuICAgIFwiYmV0cmF5YWxcIiA6IFwiZ2FtZVwiLFxyXG4gICAgXCJiZXRyYXlcIiA6IFwic2NyZXdcIixcclxuICAgIFwiZ2F2ZSB1cCBvblwiIDogXCJkb24ndCBnaXZlIGEgZnVjayBhYm91dFwiLFxyXG4gICAgXCJnaXZlIHVwIG9uXCIgOiBcIndvbid0IGdpdmUgYSBmdWNrIGFib3V0XCIsXHJcbiAgICBcImdpdmVuIHVwIG9uXCIgOiBcImRvbid0IGdpdmUgYSBmdWNrIGFib3V0XCIsXHJcbiAgICBcImdpdmluZyB1cCBvblwiIDogXCJhaW4ndCBnaXZpbiBhIGZ1Y2sgYWJvdXRcIixcclxuICAgIFwiY29mZmluXCIgOiBcInRvYm9nYW5cIixcclxuICAgIFwiYmVhdXRpZnVsXCIgOiBcImdhdWR5XCIsXHJcbiAgICBcInRoZSBiZXN0XCIgOiBcInRoZSBiYWRkZXN0XCIsXHJcbiAgICBcInNlbGZpc2hcIiA6IFwidGhpZXZpbmdcIixcclxuICAgIFwid2Fsa2VkIG91dFwiIDogXCJuYXJyb3dseSBlc2NhcGVkXCIsXHJcbiAgICBcIndhbGsgb3V0XCIgOiBcIm5hcnJvd2x5IGVzY2FwZVwiLFxyXG4gICAgXCJ3YWxraW5nIG91dFwiIDogXCJuYXJyb3dseSBlc2NhcGluZ1wiLFxyXG4gICAgXCJnb3QgaW4geW91ciB3YXlcIiA6IFwiZ290IGFsbCB1cCBpbiB5b3VyIHNoaXRcIixcclxuICAgIFwidHJ5XCIgOiBcInNob290XCIsXHJcbiAgICBcInRoZSBwb2ludCBvZiBubyByZXR1cm5cIiA6IFwidGhlIGZhdCBnaXJscyBiZWRyb29vbSBkb29yXCIsXHJcbiAgICBcIm9ubHkgd2FudGVkXCIgOiBcImJlZ2dlZCBmb3JcIixcclxuICAgIFwiZ3Vlc3MgaXQgZG9lc24ndCBtYXR0ZXJcIiA6IFwia25vdyB0aGlzIHNoaXQgaXMgcG9pbnRsZXNzXCIsXHJcbiAgICBcImxvb2sgYmFja1wiIDogXCJsaWNrIHdpbmRvd3NcIixcclxuICAgIFwicGF0aFwiIDogXCJzaWRld2Fsa1wiLFxyXG4gICAgXCJzaGluZVwiIDogXCJibGluZ1wiLFxyXG4gICAgXCJpbiB0aGUgbWlkZGxlIG9mXCIgOiBcImFsbCB1cCBpblwiLFxyXG4gICAgXCJkZWVwIGRvd24gaW5zaWRlXCIgOiBcImluIHRoZSBib3R0b20gb2YgdGhlIHRhbmtcIixcclxuICAgIFwicGllY2UgYnkgcGllY2VcIiA6IFwib25lIGhhbmRqb2IgYXQgYSB0aW1lXCIsXHJcbiAgICBcImF1cmFcIiA6IFwic3RlbmNoXCIsXHJcbiAgICBcImNhbmRsZVwiIDogXCJnbG93c3RpY2tcIixcclxuICAgIFwiZm9yIGhlclwiIDogXCJ0byB0aGF0IGJyb2Fkc1wiLFxyXG4gICAgXCJmb3Igc2hlXCIgOiBcIidjYXVzZSB0aGUgY3VudFwiLFxyXG4gICAgXCJmb3IgaGVcIiA6IFwidGhpcyBkdW1iIG1vdGhlciBmdWNrZXJcIixcclxuICAgIFwiZm9yZXN0XCIgOiBcImNhbXBncm91bmRcIixcclxuICAgIFwiaGFuZCBpbiBoYW5kXCIgOiBcImNvY2sgdG8gamF3XCIsXHJcbiAgICBcImhhbmQgdG8gaG9sZFwiIDogXCJudXRzIHRvIGdyaXBcIixcclxuICAgIFwiZ2lybCBtZWV0cyBib3lcIiA6IFwiaG9ybnkga2lkcyBob29rIHVwXCIsXHJcbiAgICBcImJveSBtZWV0cyBnaXJsXCIgOiBcImhvcm55IGtpZHMgaG9vayB1cFwiLFxyXG4gICAgXCJzdW5ueVwiIDogXCJzd2VsdGVyaW5nXCIsXHJcbiAgICBcInNvIG5lcnZvdXNcIiA6IFwic28gZnVja2luZyBkcnVua1wiLFxyXG4gICAgXCJraXNzXCIgOiBcInNsYXBcIixcclxuICAgIFwiZmluZ2VydGlwc1wiIDogXCJjaGlja2VuIG51Z2dldHNcIixcclxuICAgIFwidGVsbCB5b3UgaSdtIGZpbmVcIiA6IFwic2NyZW0gSSdNIEZVQ0tJTiBPS1wiLFxyXG4gICAgXCJ3cml0ZVwiIDogXCJzY3Jhd2xcIixcclxuICAgIFwid3JpdHRlblwiIDogXCJzY3Jhd2xlZFwiLFxyXG4gICAgXCJ3cm90ZVwiIDogXCJzY3Jhd2xlZFwiLFxyXG4gICAgXCJmaXJzdCBvZiBhbGxcIiA6IFwibW0ta2F5XCIsXHJcbiAgICBcImJyaW5nIGZvcnRoXCIgOiBcIndoaXAgb3V0XCIsXHJcbiAgICBcImludG8gdGhlIGxpZ2h0XCIgOiBcIm9uIHRvIHRoZSBsaWdodFwiLFxyXG4gICAgXCJ0aGUgb25seSBvbmVcIiA6IFwiZnVja2luZyBzdHVwaWRcIixcclxuICAgIFwidG8gdGhlIGxpZ2h0XCIgOiBcIm91dCBpbiBwdWJsaWNcIixcclxuICAgIFwidGFsa1wiIDogXCJjdXNzXCIsXHJcbiAgICBcImZ1bGwgb2YgbGlmZVwiIDogXCJmdWxsIG9mIHNoaXRcIixcclxuICAgIFwiY2FuJ3QgZmluZCB0aGUgd29yZHMgdG8gc2F5XCIgOiBcImNvdWxkIGJsdXJ0IG91dCBzb21lIGR1bWIgc2hpdFwiLFxyXG4gICAgXCJjb25zdW1lXCIgOiBcInN1Y2tcIixcclxuICAgIFwiY29uc3VtaW5nXCIgOiBcInN1Y2tpbmdcIixcclxuICAgIFwicGlsbG93XCIgOiBcInN0b25lXCIsXHJcbiAgICBcImFkdmljZVwiIDogXCJidWxsc2hpdFwiLFxyXG4gICAgXCJ1bml2ZXJzZVwiIDogXCJ0b2lsZXQgYm93bFwiLFxyXG4gICAgXCJlbGRlclwiIDogXCJvbGQgZm9sa1wiLFxyXG4gICAgXCJtYWdpY2tcIiA6IFwiZGVsdXNpb25cIixcclxuICAgIFwibWFnaWNcIiA6IFwiaG9wZVwiLFxyXG4gICAgXCJhcmNhbmVcIiA6IFwiZm9vbGlzaFwiLFxyXG4gICAgXCJzcGVhayBvZlwiIDogXCJ0YWxrIGFib3V0XCIsXHJcbiAgICBcInNoYWxsXCIgOiBcInNob3VsZC13aWxsXCIsXHJcbiAgICBcIm9idGFpblwiIDogXCJnZXRcIixcclxuICAgIFwiYmF0dGxlXCIgOiBcInNxdWFiYmxlXCIsXHJcbiAgICBcIm1pZG5pZ2h0XCIgOiBcImRheWJyZWFrXCIsXHJcbiAgICBcInNvcnJvd1wiIDogXCJ3aGltcGVyXCIsXHJcbiAgICBcImNyaW1zb25cIiA6IFwiYXp1cmVcIixcclxuICAgIFwiYmxhY2tcIiA6IFwieWVsbG93XCIsXHJcbiAgICBcIndvbid0IG1ha2UgaXQgdGhyb3VnaFwiIDogXCJjb3VsZCBzaGltbXkgcGFzdFwiLFxyXG4gICAgXCJuaWdodFwiIDogXCJiZWR0aW1lXCIsXHJcbiAgICBcImRheVwiIDogXCJtb3JuaW5nXCIsXHJcbiAgICBcImZyYWdpbGVcIiA6IFwic3R1cmR5XCIsXHJcbiAgICBcImNyYWNrXCIgOiBcIm1lbmRcIixcclxuICAgIFwic29saXR1ZGVcIiA6IFwiYW1iaWFuY2VcIixcclxuICAgIFwidG9ybWVudFwiIDogXCJ0aWNrbGVcIixcclxuICAgIFwiaW5jYW50YXRpb25cIiA6IFwibXVjaCB5YW1tZXJpbmdcIixcclxuICAgIFwiaG9wZWxlc3NcIiA6IFwicGl0aWZ1bFwiLFxyXG4gICAgXCJkZXByZXNzaW5nXCIgOiBcImluZWJyaWF0aW5nXCIsXHJcbiAgICBcImRlcHJlc3NlZFwiIDogXCJkcnVua1wiLFxyXG4gICAgXCJkZXByZXNzaW9uXCIgOiBcInNvIG11Y2ggYm9vemVcIixcclxuICAgIFwic2FkZGVuZWRcIiA6IFwibWFkZSBmbGFjY2lkXCIsXHJcbiAgICBcInNhZG5lc3NcIiA6IFwiaW1wb3RlbmNlXCIsXHJcbiAgICBcIm5ldmVyZW5kaW5nXCIgOiBcIm5ldmVyIGVuZGluZ1wiLFxyXG4gICAgXCJuZXZlciBlbmRpbmdcIiA6IFwicmVsZW50bGVzc1wiLFxyXG4gICAgXCJuZXZlciBnb2luZ1wiIDogXCJmdWNrZWQgZm9yIHRyeWluZ1wiLFxyXG4gICAgXCJjaGFuZ2Ugb25lIHRoaW5nXCIgOiBcImZ1Y2sgc29tZSduIHVwXCIsXHJcbiAgICBcIm5ldmVyIGVuZFwiIDogXCJkcmFnIG9uXCIsXHJcbiAgICBcIndpbGwgbm90IGhlYWxcIiA6IFwiZmVzdGVyc1wiLFxyXG4gICAgXCJvdXR3YXJkIGFwcGVhcmFuY2VcIiA6IFwiZmFjYWRlXCIsXHJcbiAgICBcImVtb1wiIDogXCJjbG9zZXQgaG9tb1wiLFxyXG4gICAgXCJibGFja2VuZWQgd2FsbHNcIiA6IFwiZmlsdGh5IHJvb21zXCIsXHJcbiAgICBcImZhcmV3ZWxsXCIgOiBcImFkaW9zXCIsXHJcbiAgICBcIm1lZXQgYWdhaW5cIiA6IFwiaGF2ZSBhbm90aGVyIGdvLXJvdW5kXCIsXHJcbiAgICBcInNhZGRcIiA6IFwiZmxhY2NpZFwiLFxyXG4gICAgXCJzYWRcIiA6IFwiaW1wb3RlbnRcIixcclxuICAgIFwiYW1pZHN0XCIgOiBcImFsbCB1cCBpblwiLFxyXG4gICAgXCJtaWRzdFwiIDogXCJwYW50c1wiLFxyXG4gICAgXCJrbm93bGVkZ2VcIiA6IFwidHJpdmlhXCIsXHJcbiAgICBcImtub3duXCIgOiBcImdvdFwiLFxyXG4gICAgXCJrbm93XCIgOiBcImdldFwiLFxyXG4gICAgXCJrbmV3XCIgOiBcImdvdFwiLFxyXG4gICAgXCJwYXNzaW9uYXRlXCIgOiBcImRlbGlyaW91c1wiLFxyXG4gICAgXCJwYXNzaW9uXCIgOiBcImRlbGlyaXVtXCIsXHJcbiAgICBcIm8nXCIgOiBcInVoXCIsXHJcbiAgICBcIm9cIiA6IFwidWhcIixcclxuICAgIFwiZmFuZ1wiIDogXCJkZW50dXJlXCIsXHJcbiAgICBcImN1cnNlXCIgOiBcInN0YWluXCIsXHJcbiAgICBcImxvdmVcIiA6IFwiY29uZnVzZVwiLFxyXG4gICAgXCJ2YW1waXJpY1wiIDogXCJwZWRvcGhpbGljXCIsXHJcbiAgICBcInZhbXB5cmVcIiA6IFwicGVkb3BoeWxlXCIsXHJcbiAgICBcInZhbXBpcmVcIiA6IFwicGVkb3BoaWxlXCIsXHJcbiAgICBcInByb2JsZW1cIiA6IFwidXNlbGVzcyBjb25jZXJuXCIsXHJcbiAgICBcImZlZWxcIiA6IFwiZm9uZGxlXCIsXHJcbiAgICBcIndvZVwiIDogXCJjaGxhbXlkaWFcIixcclxuICAgIFwiZW1wdHlcIiA6IFwiYmxvYXRlZFwiLFxyXG4gICAgXCJoYXRyZWRcIiA6IFwib2RpdW1cIixcclxuICAgIFwiaGF0ZVwiIDogXCJkaXNsaWtlXCIsXHJcbiAgICBcInNjYXJyZWRcIiA6IFwic3RyaWF0ZWRcIixcclxuICAgIFwic2NhcnNcIiA6IFwic3RyaWFlXCIsXHJcbiAgICBcInNjYXJlXCIgOiBcInRpY2tsZVwiLFxyXG4gICAgXCJzY2FyeVwiIDogXCJ0aWNrbHlcIixcclxuICAgIFwic2NhclwiIDogXCJzdHJpYVwiLFxyXG4gICAgXCJ3b3VuZFwiIDogXCJvdWNoaWVcIixcclxuICAgIFwic2xpdFwiIDogXCJjcmV2aWNlXCIsXHJcbiAgICBcInNsaWNlXCIgOiBcInBldFwiLFxyXG4gICAgXCJ0d2FzXCIgOiBcIml0IHdhc1wiLFxyXG4gICAgXCJiaWcgYnJvdGhlclwiIDogXCJteSBwYXJhbm9pYVwiLFxyXG4gICAgXCJldGVybml0eVwiIDogXCJhd2hpbGVcIixcclxuICAgIFwiZXRlcm5hbGx5XCIgOiBcImZvciBhIGJpdFwiLFxyXG4gICAgXCJldGVybmFsXCIgOiBcImltYWdpbmVkXCIsXHJcbiAgICBcInByb3BoZXRcIiA6IFwiaW5zb21uaWFjXCIsXHJcbiAgICBcInByb3BoZWNpZXNcIiA6IFwid2l2ZXMgdGFsZXNcIixcclxuICAgIFwicHJvcGhlY3lcIiA6IFwid2l2ZXMgdGFsZVwiLFxyXG4gICAgXCJzb2xkaWVyXCIgOiBcIm1hbmlhY1wiLFxyXG4gICAgXCJtaWxpdGlhXCIgOiBcImdhbmdcIixcclxuICAgIFwibWlsaXRhcnlcIiA6IFwiZ2FuZ3N0ZXJcIixcclxuICAgIFwibWlsaXRhbnRcIiA6IFwibWFuaWFjYWxcIixcclxuICAgIFwiZ29kZGVzc1wiIDogXCJLeWxlZSBTdHJ1dHRcIixcclxuICAgIFwiaGlnaGVyIHBvd2VyXCIgOiBcImNydXN0eSBzb2NrXCIsXHJcbiAgICBcImRhcmtcIiA6IFwiZWZmZXJ2ZXNjZW50XCIsXHJcbiAgICBcImFuY2llbnRcIiA6IFwiZWxkZXJseVwiLFxyXG4gICAgXCJxdWVzdFwiIDogXCJzdHJvbGxcIixcclxuICAgIFwiaGVhcnRiZWF0XCIgOiBcImNvY2sgYmVhdFwiLFxyXG4gICAgXCJoZWFydFwiIDogXCJjb2NrXCIsXHJcbiAgICBcImJsb29kXCIgOiBcImdyZWFzZVwiLFxyXG4gICAgXCJibGVlZFwiIDogXCJ3aGluZVwiLFxyXG4gICAgXCJjdXRcIiA6IFwibXV0aWxhdGVcIixcclxuICAgIFwic2xhc2hcIiA6IFwibXV0aWxhdGVcIixcclxuICAgIFwibW9vbmxpZ2h0XCIgOiBcIm1vb25zaGluZVwiLFxyXG4gICAgXCJtb29uXCIgOiBcIm5pZ2h0IGxpZ2h0XCIsXHJcbiAgICBcInN0ZWVsXCIgOiBcImxhdGV4XCIsXHJcbiAgICBcImtuaWZlXCIgOiBcImRpbGRvXCIsXHJcbiAgICBcInJhem9yYmxhZGVcIiA6IFwiYnV0dCBwbHVnXCIsXHJcbiAgICBcInJhem9yXCIgOiBcImRpbGRvXCIsXHJcbiAgICBcImJsYWRlXCIgOiBcImhhbmRsZVwiLFxyXG4gICAgXCJwYWluXCIgOiBcImhvdCBzZXhcIixcclxuICAgIFwiZW1vdGlvbmFsXCIgOiBcImNoaWxkaXNoXCIsXHJcbiAgICBcImVtb3Rpb25cIiA6IFwibHVicmljYW50XCIsXHJcbiAgICBcInRlYXJkcm9wXCIgOiBcInRlYXIgZHJvcFwiLFxyXG4gICAgXCJ0ZWFyXCIgOiBcInNwZXJtZVwiLFxyXG4gICAgXCJjYXN0bGVcIiA6IFwiY2hhdGVhdVwiLFxyXG4gICAgXCJ3b3JsZFwiIDogXCJoYW5kIHRvd2VsXCIsXHJcbiAgICBcImRlYWRcIiA6IFwiaW5lcnRcIixcclxuICAgIFwiZ29vZGJ5ZVwiIDogXCJwZWFjZSB5J2FsbFwiLFxyXG4gICAgXCJnb29kLWJ5ZVwiIDogXCJnZXQgdGhlIGZ1Y2sgb3V0XCIsXHJcbiAgICBcImdvb2QgYnllXCIgOiBcImZ1Y2sgb2ZmXCIsXHJcbiAgICBcImRlYXRoXCIgOiBcIlNhbnRhXCIsXHJcbiAgICBcInBhbGVcIiA6IFwic2V4eVwiLFxyXG4gICAgXCJkcmlmdFwiIDogXCJoaW0taGF3XCIsXHJcbiAgICBcImZhZGVcIiA6IFwiaGltLWhhd1wiLFxyXG4gICAgXCJmbGVzaFwiIDogXCJ0d2lua2llXCIsXHJcbiAgICBcImNvcnBzZVwiIDogXCJtYW5uZXF1aW5cIixcclxuICAgIFwic2tpblwiIDogXCJ0d2lua2llc1wiLFxyXG4gICAgXCJwdXRyaWRcIiA6IFwicGxlYXNhbnRcIixcclxuICAgIFwiYnJlYXRoZVwiIDogXCJwYXVzZSBhd2t3YXJkbHlcIixcclxuICAgIFwiYnJlYXRoXCIgOiBcImF3a3dhcmQgcGF1c2VcIixcclxuICAgIFwic3RvcHBcIiA6IFwicHVzaFwiLFxyXG4gICAgXCJzdG9wXCIgOiBcInB1c2hcIixcclxuICAgIFwic2NyZWFtXCIgOiBcImdydW50XCIsXHJcbiAgICBcInRoaW5rXCIgOiBcInNjaGVtZVwiLFxyXG4gICAgXCJzcGlyaXR1YWxcIiA6IFwiYmFuYW5hIGNyYXZpbmdcIixcclxuICAgIFwic3Bpcml0XCIgOiBcImJhbmFuYVwiLFxyXG4gICAgXCJzb3VsXCIgOiBcImJhbmFuYVwiLFxyXG4gICAgXCJnaG9zdFwiIDogXCJpbWFnaW5hcnkgZnJpZW5kXCIsXHJcbiAgICBcIm1vbnN0ZXJcIiA6IFwiZGlzbGV4aWMgbG92ZXJcIixcclxuICAgIFwiYmVhc3RcIiA6IFwiZXJlY3Rpb25cIixcclxuICAgIFwiZGVtb25cIiA6IFwiaGFyZC1vblwiLFxyXG4gICAgXCJhbmdlbFwiIDogXCJwb3JuIHN0YXJcIixcclxuICAgIFwic2hvb3Rpbmcgc3RhclwiIDogXCJzd2lmdCBtaXNzaWxlXCIsXHJcbiAgICBcInN0YXJcIiA6IFwibWlzc2lsZVwiLFxyXG4gICAgXCJsb3N0XCIgOiBcImFyb3VzZWRcIixcclxuICAgIFwidGltZVwiIDogXCJ0aHJvYmJpbmdcIixcclxuICAgIFwiY2hlZWtcIiA6IFwicnVtcFwiLFxyXG4gICAgXCJmaW5nZXJzXCIgOiBcInNhdXNhZ2VcIixcclxuICAgIFwiZGF5ZHJlYW1cIiA6IFwiZmFudGFzaXplXCIsXHJcbiAgICBcInRoZSBzcHJpbmdcIiA6IFwidHViZSBzb2NrXCIsXHJcbiAgICBcInNwcmluZ1wiIDogXCJ0dWJlIHNvY2tzXCIsXHJcbiAgICBcImlsbHVzaW9uXCIgOiBcImRydW5rZW4gbWlzdGFrZVwiLFxyXG4gICAgXCJsb25lbGluZXNzXCIgOiBcImFyb3VzYWxcIixcclxuICAgIFwibG9uZWx5XCIgOiBcImhvcm55XCIsXHJcbiAgICBcImFsb25lXCIgOiBcImVjc3RhdGljXCIsXHJcbiAgICBcImxvbmVcIiA6IFwic2luZ2xlXCIsXHJcbiAgICBcInBlcmZlY3RcIiA6IFwiZnVja2VkXCIsXHJcbiAgICBcImhpZGRlblwiIDogXCJzdGFzaGVkXCIsXHJcbiAgICBcIm15c3RlcnlcIiA6IFwibmVvbiBzaWduXCIsXHJcbiAgICBcIm15c3Rlcmllc1wiIDogXCJuZW9uIHNpZ25zXCIsXHJcbiAgICBcInJvc2VcIiA6IFwiYnV0dCBob2xlXCIsXHJcbiAgICBcInBldGFsXCIgOiBcImRpbmdsZWJlcnJ5XCIsXHJcbiAgICBcImRpZmZlcmVudFwiIDogXCJhd2t3YXJkXCIsXHJcbiAgICBcIndyb25nXCIgOiBcImJ1enppbmdcIixcclxuICAgIFwiZmF0ZVwiIDogXCJjb2luY2lkZW5jZVwiLFxyXG4gICAgXCJjb2xkXCIgOiBcImZ1enp5XCIsXHJcbiAgICBcImhlbGxmaXJlXCIgOiBcImhlbGwgZmlyZVwiLFxyXG4gICAgXCJoZWxsXCIgOiBcIm15IGNvY2snc1wiLFxyXG4gICAgXCJjcnlzdGFsXCIgOiBcImJlZGF6bGVyXCIsXHJcbiAgICBcInJhaW5ib3dcIiA6IFwicGl6emF6elwiLFxyXG4gICAgXCJyYWluXCIgOiBcImppenp1bVwiLFxyXG4gICAgXCJzdG9ybVwiIDogXCJvcmd5XCIsXHJcbiAgICBcIndpbmRcIiA6IFwiYmxvd1wiLFxyXG4gICAgXCJicmVlemVcIiA6IFwiZHJhZnRcIixcclxuICAgIFwiYnJpbGxpYW5jZVwiIDogXCJzaGlueW5lc3NcIixcclxuICAgIFwiYnJpbGxpYW50XCIgOiBcInNoaW55XCIsXHJcbiAgICBcImRyZWFtbGFuZFwiIDogXCJvYnNlc3Npb24gaXNsYW5kXCIsXHJcbiAgICBcImRyZWFtc1wiIDogXCJvYnNlc3Npb25zXCIsXHJcbiAgICBcImRyZWFtXCIgOiBcIm9ic2Vzc1wiLFxyXG4gICAgXCJwcmlzb25cIiA6IFwib3V0aG91c2VcIixcclxuICAgIFwiZ29sZGVuIHJheVwiIDogXCJnYXVkeSBzY3JpYmJsZVwiLFxyXG4gICAgXCJyYXlcIiA6IFwic2NyaWJibGVcIixcclxuICAgIFwiZGVhZGx5XCIgOiBcImZlcnRpbGVcIixcclxuICAgIFwidHJ1dGhcIiA6IFwidHJpdmlhXCIsXHJcbiAgICBcInN1blwiIDogXCJ5ZWxsb3cgZGlza1wiLFxyXG4gICAgXCJjcnVlbFwiIDogXCJoYXBoYXphcmRcIixcclxuICAgIFwiY2xvdWRcIiA6IFwiYmFsbG9vblwiLFxyXG4gICAgXCJ0d2lua2xlXCIgOiBcInN0cm9iZVwiLFxyXG4gICAgXCJ0d2lua2xpbmdcIiA6IFwic3Ryb2JpbmdcIixcclxuICAgIFwiZXNjYXBlXCIgOiBcInNudWdnbGVcIixcclxuICAgIFwidW5kZXJzdGFuZFwiIDogXCJzdHJva2UgbXkgZWdvXCIsXHJcbiAgICBcInJlbWVtYmVyXCIgOiBcIm11bWJsZVwiLFxyXG4gICAgXCJpbGx1bWluYXRpb25cIiA6IFwibXVtYm8ganVtYm9cIixcclxuICAgIFwicmVhbGl0eVwiIDogXCJ0b2lsZXQgYm93bFwiLFxyXG4gICAgXCJiaW5kXCIgOiBcImNvZGRsZVwiLFxyXG4gICAgXCJib3VuZFwiIDogXCJjb2RkbGVkXCIsXHJcbiAgICBcInRvcm5cIiA6IFwiaHVnZ2xlZFwiLFxyXG4gICAgXCJkaWVkXCIgOiBcIm1hZGUgbWFyc2htYWxsb3dzXCIsXHJcbiAgICBcImRpZXNcIiA6IFwibWFrZXMgbWFyc2htYWxsb3dzXCIsXHJcbiAgICBcImRpZVwiIDogXCJtYWtlIG1hcnNobWFsbG93c1wiLFxyXG4gICAgXCJkeWluZ1wiIDogXCJtYWtpbmcgbWFyc2htYWxsb3dzXCIsXHJcbiAgICBcImJvZHlcIiA6IFwiamlnZ2xpbmcgY2x1bXBcIixcclxuICAgIFwiYm9kaWVzXCIgOiBcImppZ2dsaW5nIHBpbGVzXCIsXHJcbiAgICBcIndhcmZhcmVcIiA6IFwiY2hpbGRyZW4gbGF1Z2hpbmdcIixcclxuICAgIFwiZGVidXRhbnRlc1wiIDogXCJob29rZXJzXCIsXHJcbiAgICBcInNsYXZlXCIgOiBcImdpbXBcIixcclxuICAgIFwicG9ldGljXCIgOiBcImZsYXR1bGVudFwiLFxyXG4gICAgXCJwb2V0cnlcIiA6IFwiYmFkIGdhc1wiLFxyXG4gICAgXCJwb2V0XCIgOiBcImhvYm9cIixcclxuICAgIFwicG9lbVwiIDogXCJzY3JpYmJsZVwiLFxyXG4gICAgXCJjb3VudHJ5XCIgOiBcImJhdGhyb29tXCIsXHJcbiAgICBcIm5ha2VkXCIgOiBcInVuc2hhdmVkXCIsXHJcbiAgICBcImplc3VzIGNocmlzdFwiIDogXCJqaW0gYm9iIGpyXCIsXHJcbiAgICBcImNocmlzdFwiIDogXCJqaW0gYm9iIGpyXCIsXHJcbiAgICBcImplc3VzXCIgOiBcImppbSBib2IganJcIixcclxuICAgIFwiaGVhbGVyXCIgOiBcImZvbmRsZXJcIixcclxuICAgIFwiZ29kc1wiIDogXCJqaW0gYm9iIHNyIGV0IGFsLlwiLFxyXG4gICAgXCJnb2RcIiA6IFwiamltIGJvYiBzclwiLFxyXG4gICAgXCJ3ZWFwb25cIiA6IFwicG9ja2V0IHB1c3N5XCIsXHJcbiAgICBcImV4aXN0ZW5jZVwiIDogXCJ3aGF0ZXZlclwiLFxyXG4gICAgXCJtaW5pb25cIiA6IFwiaG9ybnkgcGlyYXRlXCIsXHJcbiAgICBcInJhcGluZ1wiIDogXCJ3aGF0XCIsXHJcbiAgICBcInJhcGVcIiA6IFwid2hhdFwiLFxyXG4gICAgXCJncmF2ZXN0b25lXCIgOiBcIm1pbGUgbWFya2VyXCIsXHJcbiAgICBcImdyYXZlXCIgOiBcInBlcnNvbmFsIHNwYWNlXCIsXHJcbiAgICBcImluZmluaXRlXCIgOiBcImFic3RyYWN0XCIsXHJcbiAgICBcInN1aWNpZGVcIiA6IFwibXVyZGVyXCIsXHJcbiAgICBcImJyaW5rXCIgOiBcImJvcmRlclwiLFxyXG4gICAgXCJjcmllZFwiIDogXCJjYW1lXCIsXHJcbiAgICBcImNyaWVzXCIgOiBcInNrZWV0c1wiLFxyXG4gICAgXCJjcnlpbmdcIiA6IFwiY3VtbWluZ1wiLFxyXG4gICAgXCJoYWQgZG9uZVwiIDogXCJkb25lIGRpZFwiLFxyXG4gICAgXCJjcnlcIiA6IFwiY3VtXCIsXHJcbiAgICBcImNyeXB0aWNcIiA6IFwiZHJ1bmtlblwiLFxyXG4gICAgXCJjcnlwdFwiIDogXCJ1cmluYWxcIixcclxuICAgIFwibXlzdGljXCIgOiBcInRyYW5zZXh1YWxcIixcclxuICAgIFwiYmFsYW5jZWQgaW5kaXZpZHVhbFwiIDogXCJwc3ljaG9cIixcclxuICAgIFwiYmFsYW5jZWQgcGVyc29uXCIgOiBcInBzeWNob1wiLFxyXG4gICAgXCJiYWxhbmNlZCBtYW5cIiA6IFwicHN5Y2hvXCIsXHJcbiAgICBcImJhbGFuY2VkIHdvbWFuXCIgOiBcInBzeWNob1wiLFxyXG4gICAgXCJ3aXNkb21cIiA6IFwiYnVsbCBzaGl0XCIsXHJcbiAgICBcIndpc2VcIiA6IFwiYnVsbCBzaGl0dGluZ1wiLFxyXG4gICAgXCJibGVzc2VkIGJlXCIgOiBcInN1Y2sgZWdnc1wiLFxyXG4gICAgXCJlbmVyZ3lcIiA6IFwianVpY2VcIixcclxuICAgIFwicmlkZGxlXCIgOiBcInBvbGthIGRvdFwiLFxyXG4gICAgXCJteSBsb3JkXCIgOiBcInN3ZWV0IHBhbG1cIixcclxuICAgIFwic28gbW90ZSBpdCBiZVwiIDogXCJpdCdzIHJlYWwgaW4gbXkgaGVhZFwiLFxyXG4gICAgXCJwcmF5XCIgOiBcIm11cm11clwiLFxyXG4gICAgXCJub21hZFwiIDogXCJkcnVuayBob2JvXCIsXHJcbiAgICBcImRlc3RpbnlcIiA6IFwidGF4ZXNcIixcclxuICAgIFwic3dvcmRcIiA6IFwiZGlsZG9cIixcclxuICAgIFwidm9pZFwiIDogXCJidWNrZXRcIixcclxuICAgIFwianVzdFwiIDogXCJzdXJlXCIsXHJcbiAgICBcInZlbmdlYW5jZVwiIDogXCJzbGFwIGhhcHBpbmVzc1wiLFxyXG4gICAgXCJhdmVuZ2VcIiA6IFwiZ2l0IHJvd2R5IGZvclwiLFxyXG4gICAgXCJ2ZW5nZVwiIDogXCItcm93ZHktXCIsXHJcbiAgICBcImhlYXZlbnNcIiA6IFwic2tpZXNcIixcclxuICAgIFwiaGVhdmVuXCIgOiBcInNreVwiLFxyXG4gICAgXCJlbmRsZXNzXCIgOiBcInJlYWwgbG9uZ1wiLFxyXG4gICAgXCJ2YWxsZXlcIiA6IFwiZGl0Y2hcIixcclxuICAgIFwiYXJkdW91c1wiIDogXCJub3QgZWFzeVwiLFxyXG4gICAgXCJ0b3VjaFwiIDogXCJncm9wZVwiLFxyXG4gICAgXCJ3cmV0Y2hlZFwiIDogXCJza2VlenlcIixcclxuICAgIFwid3JldGNoXCIgOiBcInNrZWV6ZVwiLFxyXG4gICAgXCJhd2VcIiA6IFwiZmVhcmZ1bCByZXZlcmVuY2VcIixcclxuICAgIFwicml0dWFsXCIgOiBcImJhbmFuYSBkYW5jZVwiLFxyXG4gICAgXCJiZWhvbGRcIiA6IFwib29nbGVcIixcclxuICAgIFwidmVpbFwiIDogXCJkaXNndWlzZVwiLFxyXG4gICAgXCJ2aXN0YVwiIDogXCJzY2VuZVwiLFxyXG4gICAgXCJhbHdheXNcIiA6IFwidXN1YWxseVwiLFxyXG4gICAgXCJiZWxpZXZlXCIgOiBcImJ1eVwiLFxyXG4gICAgXCJ3aXNoXCIgOiBcIndhbnRcIixcclxuICAgIFwiZmVsbFwiIDogXCJmbG9wcGVkXCIsXHJcbiAgICBcImZhbGxcIiA6IFwiZmxvcFwiLFxyXG4gICAgXCJyaWdodGVvdXNcIiA6IFwiYXJyb2dhbnRcIixcclxuICAgIFwid2FycmlvclwiIDogXCJraXR0ZW5cIixcclxuICAgIFwidW5jYXJpbmdcIiA6IFwicHJpY2tpc2hcIixcclxuICAgIFwiY2FyZSB0byBnaXZlXCIgOiBcInNoaXQgdG8gZ2l2ZVwiLFxyXG4gICAgXCJ0YWtlIGNhcmUgb2ZcIiA6IFwiZGVjaW1hdGVcIixcclxuICAgIFwidGFraW5nIGNhcmVcIiA6IFwiZm9yZ2V0aW5nXCIsXHJcbiAgICBcInRha2VzIGNhcmVcIiA6IFwiZm9yZ2V0c1wiLFxyXG4gICAgXCJ0YWtlIGNhcmVcIiA6IFwiZm9yZ2V0XCIsXHJcbiAgICBcImZvcmdldFwiIDogXCJkaXNyZW1lbWJlclwiLFxyXG4gICAgXCJjYXJpbmdcIiA6IFwiZ2l2aW5nIGEgc2hpdFwiLFxyXG4gICAgXCJjYXJlZFwiIDogXCJnYXZlIGEgc2hpdFwiLFxyXG4gICAgXCJjYXJlXCIgOiBcImdpdmUgYSBzaGl0XCIsXHJcbiAgICBcIndpZWxkXCIgOiBcImplcmtcIixcclxuICAgIFwib2NlYW5cIiA6IFwic2V3ZXJcIixcclxuICAgIFwic2VhXCIgOiBcImJhdGhcIixcclxuICAgIFwiYmF5XCIgOiBcInNpbmtcIixcclxuICAgIFwidHdpbGlnaHRcIiA6IFwibW9vbnNoaW5lXCIsXHJcbiAgICBcImJyb2tlblwiIDogXCJiZWF0ZW5cIixcclxuICAgIFwiYnJva2VcIiA6IFwiYmVhdFwiLFxyXG4gICAgXCJicmVha1wiIDogXCJiZWF0XCIsXHJcbiAgICBcImZvcmV2ZXJcIiA6IFwic28gdmVyeVwiLFxyXG4gICAgXCJodW1hbiByYWNlXCIgOiBcImdlcmJpbCBlbXBpcmVcIixcclxuICAgIFwibmlnaHRtYXJlXCIgOiBcInRhbnRydW1cIixcclxuICAgIFwic3VmZmVyXCIgOiBcInBpcm91ZXR0ZVwiLFxyXG4gICAgXCJteXNlbGZcIiA6IFwibXkgbXVjaG5lc3NcIixcclxuICAgIFwibWVcIiA6IFwiaVwiLFxyXG4gICAgXCJteVwiIDogXCJpJ3MgXCIsXHJcbiAgICBcIm1pbmVcIiA6IFwiaSdzXCIsXHJcbiAgICBcIndhcyBpXCIgOiBcIndlcmUgaVwiLFxyXG4gICAgXCJhbSBpXCIgOiBcImFyZSBpXCIsXHJcbiAgICBcImltXCIgOiBcImknbVwiLFxyXG4gICAgXCJpJ21cIiA6IFwiaSBhcmVcIixcclxuICAgIFwiaSd2ZVwiIDogXCJpIGhhdmVcIixcclxuICAgIFwiaSdsbFwiIDogXCJpIHdpbGxcIixcclxuICAgIFwiaSBhbVwiIDogXCJpIGFyZVwiLFxyXG4gICAgXCJ5b3Vyc2VsZlwiIDogXCJ5b3UncyBtdWNobmVzc1wiLFxyXG4gICAgXCJ5b3Vyc1wiIDogXCJ5b3Unc1wiLFxyXG4gICAgXCJ5b3VyXCIgOiBcInlvdSdzXCIsXHJcbiAgICBcInlvdSBhbGxcIiA6IFwiYWxsIHlvdVwiLFxyXG4gICAgXCJ5b3UnbGxcIiA6IFwieW91IHdpbGxcIixcclxuICAgIFwieW91J3ZlXCIgOiBcInlvdSBoYXNcIixcclxuICAgIFwieW91J3JlXCIgOiBcInlvdSBpc1wiLFxyXG4gICAgXCJ0aGVlXCIgOiBcInlvdVwiLFxyXG4gICAgXCJ0aGluZVwiIDogXCJ5b3Unc1wiLFxyXG4gICAgXCJ0aG91XCIgOiBcInlvdVwiLFxyXG4gICAgXCJ3ZVwiIDogXCJ0aGV5XCIsXHJcbiAgICBcInVzXCIgOiBcInRoZW1cIixcclxuICAgIFwib3VyXCIgOiBcInRoZWlyXCIsXHJcbiAgICBcIm91cnNcIiA6IFwidGhlaXJzXCIsXHJcbiAgICBcImlcIiA6IFwiS2V2aW5cIixcclxuICAgIFwieW91XCIgOiBcIlJldGFyZHNcIlxyXG59O1xyXG4vKipcclxuICogQWNjZXB0cyBwbGFpbiB0ZXh0IGlucHV0IGFuZCBHbG9yaW91c2x5IFdURmlmaWVzIGl0LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMTBcclxuICogQHBhcmFtIHtTdHJpbmd9IHRhcmdldCBUaGUgdGV4dCB0byBXVEZpZnkuXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb3V0cHV0SFRNTCBTcGVjaWZpZXMgaWYgeW91IHdhbnQgdGhlIG91dHB1dFxyXG4gKiAgaW4gSFRNTCBmb3JtYXQuIElmIGZhbHNlLCB3aWxsIG91dHB1dCBwbGFpbiB0ZXh0LiBEZWZhdWx0c1xyXG4gKiAgdG8gZmFsc2UuXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gUmV0dXJucyBHZW51aW5lIFdURmlmaWVkIHRleHQuXHJcbiAqL1xyXG5hdHJvcGEud3RmLnd0ZmlmeSA9IGZ1bmN0aW9uICh0YXJnZXQsIG91dHB1dEhUTUwpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygnd3RmJyk7XHJcbiAgICBcclxuICAgIHZhciByZWdleFZhbHVlLFxyXG4gICAgICAgIHJlcGxhY2VtZW50VGV4dCxcclxuICAgICAgICBvbGRXb3JkLFxyXG4gICAgICAgIHd0ZkNvdW50LFxyXG4gICAgICAgIHdvcmRDb3VudCxcclxuICAgICAgICByZXQsXHJcbiAgICAgICAgd29yZDtcclxuICAgIFxyXG4gICAgaWYodHJ1ZSAhPT0gb3V0cHV0SFRNTCkge1xyXG4gICAgICAgIG91dHB1dEhUTUwgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldCA9IHt9O1xyXG4gICAgd3RmQ291bnQgPSAwO1xyXG4gICAgdGFyZ2V0ID0gdGFyZ2V0LnRyaW0oKTtcclxuICAgIHdvcmRDb3VudCA9IGF0cm9wYS5zdHJpbmcuY291bnRXb3Jkcyh0YXJnZXQpO1xyXG4gICAgaWYodHJ1ZSA9PT0gb3V0cHV0SFRNTCkge1xyXG4gICAgICAgIHRhcmdldCA9IHRhcmdldC5yZXBsYWNlKFxyXG4gICAgICAgICAgICAvKFxcLiA/KXsyLH0vZ2ksXHJcbiAgICAgICAgICAgICc8c3BhbiBzdHlsZT1cImNvbG9yIDogYnJvd24gO1wiPiBbc2hpdCB0YWNvXSA8L3NwYW4+J1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGFyZ2V0ID0gJzxwPiAnICsgdGFyZ2V0LnJlcGxhY2UoLyhcXHJcXG58XFxyfFxcbikvZywnIDxici8+ICcpICsgJyA8L3A+JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnJlcGxhY2UoLyhcXC4gPyl7Mix9L2dpLCAnIFtzaGl0IHRhY29dICcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBBY2NlcHRzIHBsYWluIHRleHQgaW5wdXQgYW5kIEdsb3Jpb3VzbHkgV1RGaWZpZXMgaXQuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMzAxMTJcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEud3RmLnd0ZmlmeS1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbSBGaXJzdCBtYXRjaGVkIHBhdHRlcm4gaW4gc3RyaW5nIHNlYXJjaGVkLlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN1YjEgRmlyc3QgbWF0Y2hlZCBzdWJwYXR0ZXJuIGluIHN0cmluZyBzZWFyY2hlZC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdWIyIFNlY29uZCBtYXRjaGVkIHN1YnBhdHRlcm4gaW4gc3RyaW5nIHNlYXJjaGVkLlxyXG4gICAgICovXHJcbiAgICByZXBsYWNlbWVudFRleHQgPSBmdW5jdGlvbiAobSwgc3ViMSwgc3ViMikge1xyXG4gICAgICAgIHd0ZkNvdW50Kys7XHJcbiAgICAgICAgc3ViMSA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKCcnLCBzdWIxKTtcclxuICAgICAgICBzdWIyID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoJycsIHN1YjIpO1xyXG4gICAgICAgIHZhciBvdXQ7XHJcbiAgICAgICAgaWYodHJ1ZSA9PT0gb3V0cHV0SFRNTCkge1xyXG4gICAgICAgICAgICBvdXQgPSAnPHNwYW4gc3R5bGU9XCJjb2xvciA6IHJlZCA7XCI+JyArXHJcbiAgICAgICAgICAgICAgICBzdWIxICsgYXRyb3BhLnd0Zi5kaWN0aW9uYXJ5W3dvcmRdICsgc3ViMiArXHJcbiAgICAgICAgICAgICAgICAnPC9zcGFuPic7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3V0ID0gc3ViMSArIGF0cm9wYS53dGYuZGljdGlvbmFyeVt3b3JkXSArIHN1YjI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9O1xyXG4gICAgLy8gd29yZCBpcyBkZWZpbmVkIGluIHRoZSBjb250YWluaW5nIHNjb3BlIGFuZFxyXG4gICAgLy8gaXMgbm90IGdsb2JhbCwganNoaW50IGlzIHdyb25nXHJcbiAgICBmb3IgKHdvcmQgaW4gYXRyb3BhLnd0Zi5kaWN0aW9uYXJ5KSB7XHJcbiAgICAgICAgaWYgKGF0cm9wYS53dGYuZGljdGlvbmFyeS5oYXNPd25Qcm9wZXJ0eSh3b3JkKSkge1xyXG4gICAgICAgICAgICBvbGRXb3JkID0gYXRyb3BhLnJlZ2V4LmFwcGVuZFByZWZpeGVzQW5kU3VmZml4ZXMod29yZCk7XHJcbiAgICAgICAgICAgIHJlZ2V4VmFsdWUgPSBuZXcgUmVnRXhwKG9sZFdvcmQsICdnaScpO1xyXG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQucmVwbGFjZShyZWdleFZhbHVlLCByZXBsYWNlbWVudFRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldC53dGZDb3VudCA9IHd0ZkNvdW50O1xyXG4gICAgcmV0LndvcmRDb3VudCA9IHdvcmRDb3VudDtcclxuICAgIHJldC5zY29yZSA9IHd0ZkNvdW50IC8gd29yZENvdW50O1xyXG4gICAgcmV0LnR4dCA9IHRhcmdldDtcclxuICAgIHJldHVybiByZXQ7XHJcbn07XHJcbi8qKlxyXG4gKiBXVEZpZmllcyB0aGUgPGNvZGU+dGV4dENvbnRlbnQ8L2NvZGU+IG9yIDxjb2RlPnZhbHVlPC9jb2RlPiBvZiB0aGVcclxuICogIGdpdmVuIGVsZW1lbnQgYW5kIHJlcGxhY2VzIHRoZSBlbGVtZW50J3MgaW5uZXJIVE1MIHdpdGggYSBwcmUgYmxvY2tcclxuICogIGNvbnRhaW5pbmcgdGhlIHJlc3VsdHMgb2YgV1RGaWZpY2F0aW9uLlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50UmVmZXJlbmNlIEEgcmVmZXJlbmNlIHRvIGFuIEhUTUwgRWxlbWVudC5cclxuICogQHJldHVybnMge0hUTUxFbGVtZW50fSBSZXR1cm5zIHRoZSBnaXZlbiBlbGVtZW50IGFmdGVyIHd0ZmlmaWNhdGlvbi5cclxuICogQHZlcnNpb24gMjAxMzAzMTNcclxuICovXHJcbmF0cm9wYS53dGYuaHRtbEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudFJlZmVyZW5jZSkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCd3dGZIdG1sRWxlbWVudCcpO1xyXG4gICAgXHJcbiAgICB2YXIgd3RmaWZpZWQsIHR4dDtcclxuICAgIGVsZW1lbnRSZWZlcmVuY2UuaW5uZXJIVE1MID0gZWxlbWVudFJlZmVyZW5jZS5pbm5lckhUTUwucmVwbGFjZShcclxuICAgICAgICAvPGJyPihcXHMrKT8oXFxyXFxufFxccnxcXG4pPy9nLCAnXFxyXFxuJyk7XHJcbiAgICB0eHQgPSBlbGVtZW50UmVmZXJlbmNlLnZhbHVlIHx8IGVsZW1lbnRSZWZlcmVuY2UudGV4dENvbnRlbnQ7XHJcbiAgICB3dGZpZmllZCA9IGF0cm9wYS53dGYud3RmaWZ5KHR4dCwgdHJ1ZSk7XHJcbiAgICBlbGVtZW50UmVmZXJlbmNlLmlubmVySFRNTCA9XHJcbiAgICAgICAgJzxwcmUgc3R5bGU9XCJjb2xvcjpibGFjazsgYmFja2dyb3VuZDp3aGl0ZTsgd2hpdGUtc3BhY2U6cHJlLXdyYXA7XCI+JyArXHJcbiAgICAgICAgd3RmaWZpZWQudHh0ICtcclxuICAgICAgICAnPC9wcmU+JztcclxuICAgIHJldHVybiBlbGVtZW50UmVmZXJlbmNlO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iXX0=
;