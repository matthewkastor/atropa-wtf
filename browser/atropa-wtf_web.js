(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"../src/atropa-wtf.js":16}],2:[function(require,module,exports){
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


},{}],3:[function(require,module,exports){
module.exports=require(2)
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
 * Container for regex functions.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @namespace Container for regex functions.
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

},{"atropa-header":3}],5:[function(require,module,exports){
module.exports=require(2)
},{}],6:[function(require,module,exports){
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

},{"atropa-header":5}],7:[function(require,module,exports){
module.exports=require(2)
},{}],8:[function(require,module,exports){
module.exports=require(2)
},{}],9:[function(require,module,exports){
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

},{"atropa-header":8}],10:[function(require,module,exports){
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

},{"atropa-header":7,"atropa-inquire":9}],11:[function(require,module,exports){
module.exports=require(2)
},{}],12:[function(require,module,exports){
module.exports=require(2)
},{}],13:[function(require,module,exports){
module.exports=require(4)
},{"atropa-header":12}],14:[function(require,module,exports){
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

},{"atropa-arrays":10,"atropa-header":11,"atropa-regex":13}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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
     /*jslint unparam: true*/
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

},{"./atropa-wtf-dictionary.json":15,"atropa-header":2,"atropa-regex":4,"atropa-setAsOptionalArg":6,"atropa-string":14}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGthc3RvclxcRG9jdW1lbnRzXFxHaXRIdWJcXGF0cm9wYS13dGZcXG5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9HaXRIdWIvYXRyb3BhLXd0Zi9kZXYvYnJvd3Nlck1haW4uanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL0dpdEh1Yi9hdHJvcGEtd3RmL25vZGVfbW9kdWxlcy9hdHJvcGEtaGVhZGVyL3NyYy9hdHJvcGEtaGVhZGVyLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9HaXRIdWIvYXRyb3BhLXd0Zi9ub2RlX21vZHVsZXMvYXRyb3BhLXJlZ2V4L3NyYy9hdHJvcGEtcmVnZXguanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL0dpdEh1Yi9hdHJvcGEtd3RmL25vZGVfbW9kdWxlcy9hdHJvcGEtc2V0QXNPcHRpb25hbEFyZy9zcmMvYXRyb3BhLXNldEFzT3B0aW9uYWxBcmcuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL0dpdEh1Yi9hdHJvcGEtd3RmL25vZGVfbW9kdWxlcy9hdHJvcGEtc3RyaW5nL25vZGVfbW9kdWxlcy9hdHJvcGEtYXJyYXlzL25vZGVfbW9kdWxlcy9hdHJvcGEtaW5xdWlyZS9zcmMvYXRyb3BhLWlucXVpcmUuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL0dpdEh1Yi9hdHJvcGEtd3RmL25vZGVfbW9kdWxlcy9hdHJvcGEtc3RyaW5nL25vZGVfbW9kdWxlcy9hdHJvcGEtYXJyYXlzL3NyYy9hdHJvcGEtYXJyYXlzLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9HaXRIdWIvYXRyb3BhLXd0Zi9ub2RlX21vZHVsZXMvYXRyb3BhLXN0cmluZy9zcmMvYXRyb3BhLXN0cmluZy5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvR2l0SHViL2F0cm9wYS13dGYvc3JjL2F0cm9wYS13dGYtZGljdGlvbmFyeS5qc29uIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9HaXRIdWIvYXRyb3BhLXd0Zi9zcmMvYXRyb3BhLXd0Zi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzVhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgd3RmID0gcmVxdWlyZSgnLi4vc3JjL2F0cm9wYS13dGYuanMnKTtcclxuXHJcbnRyeSB7XHJcbiAgICBPYmplY3Qua2V5cyh3dGYpLmZvckVhY2goXHJcbiAgICAgICAgZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICAgICAgaWYoIWF0cm9wYVtwcm9wXSkge1xyXG4gICAgICAgICAgICAgICAgYXRyb3BhW3Byb3BdID0gd3RmW3Byb3BdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufSBjYXRjaCAoaWdub3JlKSB7XHJcbiAgICBhdHJvcGEgPSByZXF1aXJlKCcuLi9zcmMvYXRyb3BhLXd0Zi5qcycpO1xyXG59XHJcblxyXG5PYmplY3Qua2V5cyh3dGYuZGF0YSkuZmlsdGVyKFxyXG4gICAgZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICByZXR1cm4gcHJvcCAhPT0gJ3JlcXVpcmVtZW50cyc7XHJcbiAgICB9XHJcbikuZm9yRWFjaChcclxuICAgIGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgICAgYXRyb3BhLmRhdGFbcHJvcF0gPSB3dGYuZGF0YVtwcm9wXTtcclxuICAgIH1cclxuKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWVcbiovXG4vKmdsb2JhbCBYUGF0aFJlc3VsdCAqL1xuLy8gZW5kIGhlYWRlclxuXG4vKipcbiAqIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXG4gKi9cbnZhciBhdHJvcGEgPSB7fTtcbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgdGhpcyBjbGFzcyBoYXMgYmVlbiBtYXJrZWQgYXMgdW5zdXBwb3J0ZWQgYW5kIHRocm93cyBhbiBcbiAqICBlcnJvciBpZiBpdCBoYXMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAzMDhcbiAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWUgVGhlIG5hbWUgb2YgdGhlIGNsYXNzLlxuICogQHBhcmFtIHtTdHJpbmd9IGVycm9yTWVzc2FnZSBPcHRpb25hbC4gQSBjdXN0b20gZXJyb3IgbWVzc2FnZS4gRGVmYXVsdHMgdG9cbiAqICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLmVycm9yXG4gKi9cbmF0cm9wYS5zdXBwb3J0Q2hlY2sgPSBmdW5jdGlvbiAoY2xhc3NOYW1lLCBlcnJvck1lc3NhZ2UpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBjbGFzc05hbWUgPSBTdHJpbmcoY2xhc3NOYW1lKTtcbiAgICBlcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2UgfHwgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5lcnJvcjtcbiAgICBlcnJvck1lc3NhZ2UgPSBTdHJpbmcoZXJyb3JNZXNzYWdlKTtcbiAgICBcbiAgICBpZihhdHJvcGEuZGF0YVtjbGFzc05hbWVdLnN1cHBvcnQgPT09ICd1bnN1cHBvcnRlZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgfVxufTtcbi8qKlxuICogUHVzaGVzIGEgcmVxdWlyZW1lbnQgY2hlY2sgaW50byBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMuIFRoZSB0ZXN0XG4gKiAgdGVzdHMgd2hldGhlciB0aGUgY2xhc3MgaXMgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuIFNldHNcbiAqICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdJ3Mgc3VwcG9ydCB0byB1bnN1cHBvcnRlZCBhbmQgZXJyb3IgdG8gZXJyb3JNZXNzYWdlXG4gKiAgaWYgdGhlIHJlcXVpcmVtZW50Rm4gcmV0dXJucyBmYWxzZS4gVGhlIHJlcXVpcmVtZW50IGNoZWNrcyB3aWxsIGFsbCBiZSBydW5cbiAqICBhZnRlciB0aGUgbGlicmFyeSBoYXMgbG9hZGVkLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMzA4XG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lIFRoZSBuYW1lIG9mIHRoZSBjbGFzcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlcXVpcmVtZW50Rm4gQSBmdW5jdGlvbiB0byB0ZXN0IHdoZXRoZXIgb3Igbm90IHRoZSBjbGFzc1xuICogIGlzIHN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50LiBJZiBzdXBwb3J0ZWQsIHJldHVybnMgdHJ1ZSBvdGhlcndpc2VcbiAqICByZXR1cm4gZmFsc2UuXG4gKiBAcGFyYW0ge1N0cmluZ30gZXJyb3JNZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlIHRvIHVzZSB3aGVuIHRoaXMgY2xhc3Mgb3IgaXRzXG4gKiAgbWV0aG9kcyBhcmUgY2FsbGVkIGluIHVuc3VwcG9ydGVkIGVudmlyb25tZW50cy4gRGVmYXVsdHMgdG86XG4gKiAgJ1RoZSBhdHJvcGEuJyArIGNsYXNzTmFtZSArICcgY2xhc3MgaXMgdW5zdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4nO1xuICovXG5hdHJvcGEucmVxdWlyZXMgPSBmdW5jdGlvbiAoY2xhc3NOYW1lLCByZXF1aXJlbWVudEZuLCBlcnJvck1lc3NhZ2UpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgY2hlY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0ZXN0ID0gZmFsc2U7XG4gICAgICAgIGlmKHR5cGVvZiBjbGFzc05hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2F0cm9wYS5yZXF1aXJlcyByZXF1aXJlcyB0aGUgY2xhc3MgbmFtZSB0byBiZSAnICtcbiAgICAgICAgICAgICAgICAnc3BlY2lmaWVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXSA9IHt9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZih0eXBlb2YgcmVxdWlyZW1lbnRGbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJlcXVpcmVtZW50Rm4gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZSB8fCAnVGhlIGF0cm9wYS4nICsgY2xhc3NOYW1lICtcbiAgICAgICAgICAgICAgICAgICAgJyBjbGFzcyBpcyB1bnN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50Lic7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRlc3QgPSByZXF1aXJlbWVudEZuKCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgdGVzdCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLmVycm9yID0gZXJyb3JNZXNzYWdlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZih0ZXN0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uc3VwcG9ydCA9ICd1bnN1cHBvcnRlZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wdXNoKGNoZWNrKTtcbn07XG4vKipcbiAqIENvbnRhaW5lciBmb3IgZ29iYWwgZGF0YSByZWxhdGVkIHRvIHRoZSBjbGFzc2VzIGFuZCBmdW5jdGlvbnMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGdvYmFsIGRhdGEgcmVsYXRlZCB0byB0aGUgY2xhc3NlcyBhbmQgZnVuY3Rpb25zLlxuICovXG5hdHJvcGEuZGF0YSA9IHt9O1xuXG5hdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMgPSBbXTtcblxuYXRyb3BhLm5vcCA9IGZ1bmN0aW9uIG5vcCAoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgcmV0dXJuIG51bGw7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG5cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuLypqc2xpbnRcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG4vKipcbiAqIENvbnRhaW5lciBmb3IgcmVnZXggZnVuY3Rpb25zLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgcmVnZXggZnVuY3Rpb25zLlxuICovXG5hdHJvcGEucmVnZXggPSB7fTtcbi8qKlxuICogUmVnZXggcGF0dGVybnMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQG5hbWVzcGFjZSBSZWdleCBwYXR0ZXJucy5cbiAqL1xuYXRyb3BhLnJlZ2V4LnBhdHRlcm5zID0ge1xuICAgIC8qKiBmaW5kcyByZXBlYXRlZCB3b3JkcyBhbmQgcGhyYXNlcyAqL1xuICAgIHJlcGVhdGVkV29yZHMgOiAvKFxcYi57Myx9XFxiKVxccyooXFwxKS9nLFxuICAgIC8qKiBmaW5kcyBwYXJhZ3JhcGggYnJlYWtzICovXG4gICAgcGFyYWdyYXBoQnJlYWtzIDogLyhcXHJcXG5cXHJcXG58XFxuXFxufFxcclxccikvZyxcbiAgICAvKiogZmluZHMgbGluZSBicmVha3MgKi9cbiAgICBsaW5lQnJlYWtzIDogLyhcXHJcXG58XFxyfFxcbikvZ1xufTtcbi8qKlxuICogQXBwZW5kcyBjb21tb24gcHJlZml4LCBzdWZmaXgsIGFuZCB3b3JkIGJvdW5kYXJ5IHJlZ2V4IHN0cmluZ3MgdG9cbiAqIHRoZSBzdXBwbGllZCB3b3JkLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMTEwXG4gKiBAcGFyYW0ge1N0cmluZ30gd29yZCBUaGUgd29yZCB0byBhcHBlbmQgcHJlZml4IGFuZCBzdWZmaXggdG9cbiAqIEBwYXJhbSB7SW50ZWdlcn0gdGhyZXNob2xkIFRoZSB3b3JkLmxlbmd0aCBhdCB3aGljaCBpdCBkb2VzIG5vdFxuICogbWFrZSBzZW5zZSB0byBhcHBlbmQgcHJlZml4IGFuZCBzdWZmaXguIERlZmF1bHRzIHRvIDMuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBzdXBwbGllZCB3b3JkIHdpdGggcHJlZml4LCBzdWZmaXgsXG4gKiBhbmQgd29yZCBib3VuZGFyaWVzIGF0dGFjaGVkLiBJZiB0aGUgd29yZC5sZW5ndGggd2FzIG5vdCBncmVhdGVyXG4gKiB0aGFuIHRoZSB0aHJlc2hvbGQsIG9ubHkgd29yZCBib3VuZGFyaWVzIGFyZSBhdHRhY2hlZC4gVGhlIHN0cmluZ1xuICogcmVwcmVzZW50cyBhIFJlZ0V4IHdoaWNoIHNob3VsZCBwaWNrIG91dCBtb3N0IGZvcm1zIG9mIHJlZ3VsYXJcbiAqIHdvcmRzLlxuICovXG5hdHJvcGEucmVnZXguYXBwZW5kUHJlZml4ZXNBbmRTdWZmaXhlcyA9IGZ1bmN0aW9uICh3b3JkLCB0aHJlc2hvbGQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgcHJlZml4ZXMsXG4gICAgc3VmZml4ZXM7XG4gICAgcHJlZml4ZXMgPSAnKHByZXx1bnxyZSk/JztcbiAgICBzdWZmaXhlcyA9ICcoaWZpY2F0aW9ufCcgK1xuICAgICAgICAgICAgICAgICd0aW9uYWxseXwnICtcbiAgICAgICAgICAgICAgICAnaWNhdGlvbnwnICtcbiAgICAgICAgICAgICAgICAnaWZpZWR8aXN0aWN8aW5lc3N8JyArXG4gICAgICAgICAgICAgICAgJ2ZhcmV8dGlvbnxhbmNlfGVuY2V8bGVzc3xhbGx5fGFibGV8bmVzc3xpemVkfGlzZWR8JyArXG4gICAgICAgICAgICAgICAgJ291c3xpZnl8aW5nfGl0eXxmdWx8YW50fGF0ZXxlc3R8aXNtfGl6bXxpc3R8JyArXG4gICAgICAgICAgICAgICAgJ2ljfGFsfGVkfGVyfGV0fGx5fHJzfGlufCcgK1xuICAgICAgICAgICAgICAgICd5fHN8cnxkKT8nO1xuICAgIFxuICAgIHRocmVzaG9sZCA9IHRocmVzaG9sZCA9PT0gdW5kZWZpbmVkID8gMyA6IHRocmVzaG9sZDtcbiAgICBcbiAgICBpZiAod29yZC5sZW5ndGggPiB0aHJlc2hvbGQpIHtcbiAgICAgICAgd29yZCA9ICdcXFxcYicgKyBwcmVmaXhlcyArIHdvcmQgKyBzdWZmaXhlcyArICdcXFxcYic7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgd29yZCA9ICdcXFxcYigpJyArIHdvcmQgKyAnKClcXFxcYic7XG4gICAgfVxuICAgIHJldHVybiB3b3JkO1xufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG5cbi8qKlxuICogU2V0IGRlZmF1bHQgdmFsdWVzIGZvciBvcHRpb25hbCBmdW5jdGlvbiBwYXJhbWV0ZXJzLlxuICogQGV4YW1wbGVcbiAqIDxwcmU+XG4gKiAgIC8vIFRvIHNldCBhIGRlZmF1bHQgdmFsdWUgZm9yIGFuIG9wdGlvbmFsIHBhcmFtZXRlclxuICogICBmdW5jdGlvbihvcHRpb25hbEFyZykge1xuICogICAgICAgdmFyIGRlZmF1bHRWYWwgPSAnaGVsbG8gdGhlcmUhJztcbiAqICAgICAgIG9wdGlvbmFsQXJnID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoZGVmYXVsdFZhbCwgb3B0aW9uYWxBcmcpO1xuICogICAgICAgcmV0dXJuIG9wdGlvbmFsQXJnO1xuICogICB9XG4gKiA8L3ByZT5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQHBhcmFtIHtNaXhlZH0gZGVmYXVsdFZhbCBUaGUgZGVmYXVsdCB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0ge01peGVkfSBvcHRpb25hbEFyZyBBIHJlZmVyZW5jZSB0byB0aGUgb3B0aW9uYWwgYXJndW1lbnQuXG4gKiBAcmV0dXJucyB7TWl4ZWR9IFJldHVybnMgdGhlIGRlZmF1bHQgdmFsdWUgc3VwcGxpZWQgd2hlbiB0aGUgb3B0aW9uYWxcbiAqIGFyZ3VtZW50IGlzIHVuZGVmaW5lZCBvciBudWxsLiBPdGhlcndpc2UsIHRoZSBzdXBwbGllZCBvcHRpb25hbCBhcmd1bWVudFxuICogaXMgcmV0dXJuZWQuXG4gKi9cbmF0cm9wYS5zZXRBc09wdGlvbmFsQXJnID0gZnVuY3Rpb24gKGRlZmF1bHRWYWwsIG9wdGlvbmFsQXJnKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaWYgKG9wdGlvbmFsQXJnID09PSB1bmRlZmluZWQgfHwgb3B0aW9uYWxBcmcgPT09IG51bGwpIHtcbiAgICAgICAgb3B0aW9uYWxBcmcgPSBkZWZhdWx0VmFsO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9uYWxBcmc7XG59O1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWVcbiovXG4vKmdsb2JhbCBhdHJvcGEgKi9cbi8vIGVuZCBoZWFkZXJcblxuLyoqXG4gKiBDb250YWluZXIgZm9yIGZ1bmN0aW9ucyB0aGF0IHRlc3QgdGhlIHN0YXRlIG9mIGlucHV0cy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGZ1bmN0aW9ucyB0aGF0IHRlc3QgdGhlIHN0YXRlIG9mIGlucHV0cy5cbiAqL1xuYXRyb3BhLmlucXVpcmUgPSB7fTtcbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IGlzIG51bGwuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBwYXJhbSB7TWl4ZWR9IHggQW55IGlucHV0IHRoYXQgbWF5IG9yIG1heSBub3QgYmUgbnVsbC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgeCA9PT0gbnVsbC5cbiAqL1xuYXRyb3BhLmlucXVpcmUuaXNOdWxsID0gZnVuY3Rpb24gKHgpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICByZXR1cm4gKHggPT09IG51bGwpO1xufTtcbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IGlzIGFuIG9iamVjdC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQHBhcmFtIHtNaXhlZH0geCBBbnkgaW5wdXQgdGhhdCBtYXkgb3IgbWF5IG5vdCBiZSBhbiBvYmplY3QuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHR5cGVvZih4KSA9PT0gJ29iamVjdCcuXG4gKi9cbmF0cm9wYS5pbnF1aXJlLmlzT2JqZWN0ID0gZnVuY3Rpb24gKHgpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICByZXR1cm4gKHR5cGVvZiB4ID09PSAnb2JqZWN0Jyk7XG59O1xuLyoqXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgaXMgYm90aCBhbiBvYmplY3QgYW5kIG5vdCBudWxsLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gKiBAcGFyYW0ge01peGVkfSB4IEFueSBpbnB1dCB0aGF0IG1heSBvciBtYXkgbm90IGJlIGJvdGggYW5cbiAqIG9iamVjdCBhbmQgbnVsbC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgeCBpcyBib3RoIGFuIG9iamVjdCBhbmRcbiAqIG5vdCBudWxsLiAobnVsbCBpcyBhbiBvYmplY3QpLlxuICovXG5hdHJvcGEuaW5xdWlyZS5pc09iamVjdE5vdE51bGwgPSBmdW5jdGlvbiAoeCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHJldHVybiBhdHJvcGEuaW5xdWlyZS5pc09iamVjdCh4KSAmJiAoIWF0cm9wYS5pbnF1aXJlLmlzTnVsbCh4KSk7XG59O1xuLyoqXG4gKiBDaGVja3MgYW4gb2JqZWN0IGZvciB0aGUgZXhpc3RlbmNlIG9mIGEgcHJvcGVydHlcbiAqIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGUgcHJvcGVydHkgd2FzIGluaGVyaXRlZFxuICogb3Igbm90LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIEFuIG9iamVjdCB3aGljaCBtYXkgb3IgbWF5IG5vdFxuICogaGF2ZSB0aGUgcHJvcGVydHkgaWRlbnRpZmllZCBieSBwcm9wLlxuICogQHBhcmFtIHtTdHJpbmd9IHByb3AgQSBzdHJpbmcgdmFsdWUgcmVwcmVzZW50aW5nIHRoZVxuICogbmFtZSBvZiB0aGUgcHJvcGVydHkuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIG9iai5wcm9wIGV4aXN0cyxcbiAqIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlLlxuICovXG5hdHJvcGEuaW5xdWlyZS5oYXNQcm9wZXJ0eSA9IGZ1bmN0aW9uIChvYmosIHByb3ApIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpZiAoYXRyb3BhLmlucXVpcmUuaXNPYmplY3ROb3ROdWxsKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIChwcm9wIGluIG9iaik7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBhbiBlbXB0eSBzdHJpbmcuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAxMThcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyB5b3Ugd2FudCB0byBrbm93IGFib3V0XG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHN0ciBpcyBhbiBlbXB0eSBzdHJpbmcsXG4gKiAgb3RoZXJ3aXNlIHJldHVybnMgZmFsc2UuXG4gKi9cbmF0cm9wYS5pbnF1aXJlLmlzRW1wdHlTdHJpbmcgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIG91dCA9IGZhbHNlO1xuICAgIGlmICgnJyA9PT0gc3RyKSB7XG4gICAgICAgIG91dCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59O1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcbmF0cm9wYS5pbnF1aXJlID0gcmVxdWlyZSgnYXRyb3BhLWlucXVpcmUnKS5pbnF1aXJlO1xuLypqc2xpbnRcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG4vKipcbiAqIFV0aWxpdGllcyBmb3IgaGFuZGxpbmcgYXJyYXlzLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMjIxXG4gKiBAbmFtZXNwYWNlIFV0aWxpdGllcyBmb3IgaGFuZGxpbmcgYXJyYXlzLlxuICovXG5hdHJvcGEuYXJyYXlzID0ge307XG4vKipcbiAqIENvbXBhcmVzIHR3byBhcnJheXMgYmFzZWQgb24gc2l6ZSwgY29udGVudHMsIGFuZCBlbGVtZW50IG9yZGVyLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTEgT25lIGFycmF5IHlvdSB3YW50IGNvbXBhcmVkIHRvIGFub3RoZXIuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTIgVGhlIG90aGVyIGFycmF5LlxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBvciBmYWxzZSBkZXBlbmRpbmcgb25cbiAqICB3aGV0aGVyIG9yIG5vdCB0aGUgYXJyYXlzIG1hdGNoZWQgaW4gc2l6ZSwgY29tcG9zaXRpb24sIGFuZFxuICogIGVsZW1lbnQgb3JkZXIuXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwyXTtcbiAqIHZhciB5ID0gWzEsMSwzXTtcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcbiAqIC8vIHJldHVybnMgZmFsc2VcbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsxLDJdO1xuICogdmFyIHkgPSBbMSwyXTtcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcbiAqIC8vIHJldHVybnMgdHJ1ZVxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWzEsMl07XG4gKiB2YXIgeSA9IFsyLDFdO1xuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xuICogLy8gcmV0dXJucyBmYWxzZSBiZWNhdXNlIHRoZSBlbGVtZW50cyBhcmUgbm90IGluIHRoZSBzYW1lIG9yZGVyLlxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWzEseydhUHJvcCcgOiAnYVZhbHVlJ31dO1xuICogdmFyIHkgPSBbMSx7J2FQcm9wJyA6ICdhVmFsdWUnfV07XG4gKiBhdHJvcGEuYXJyYXlzLm1hdGNoKHgseSk7XG4gKiAvLyByZXR1cm5zIGZhbHNlIGJlY2F1c2UgZXZlbiB0aG91Z2ggdGhlIG9iamVjdCBsb29rcyB0aGUgc2FtZSwgdGhlXG4gKiAvLyB0d28gb2JqZWN0cyBhcmUgaW4gZmFjdCBkaXN0aW5jdCBvYmplY3RzLlxuICogQGV4YW1wbGVcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsdWUnfTtcbiAqIHZhciB4ID0gWzEsb2JqXTtcbiAqIHZhciB5ID0gWzEsb2JqXTtcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcbiAqIC8vIHJldHVybnMgdHJ1ZSBiZWNhdXNlIHRoZSBvYmplY3RzIHJlZmVyZW5jZWQgaW4gdGhlIGFycmF5cyBhcmVcbiAqIC8vIGluIGZhY3QgdGhlIHNhbWUgb2JqZWN0LlxuICovXG5hdHJvcGEuYXJyYXlzLm1hdGNoID0gZnVuY3Rpb24gYXJyYXlzTWF0Y2goYXJyYXkxLCBhcnJheTIpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgeCxcbiAgICBsO1xuICAgIGlmIChhcnJheTEubGVuZ3RoICE9PSBhcnJheTIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbCA9IGFycmF5MS5sZW5ndGg7XG4gICAgZm9yICh4ID0gMDsgeCA8IGw7IHggKz0gMSkge1xuICAgICAgICBpZiAoYXJyYXkxW3hdICE9PSBhcnJheTJbeF0pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG4vKipcbiAqIFN1YnRyYWN0cyBvbmUgYXJyYXkgZnJvbSBhbm90aGVyIGFycmF5IGJhc2VkIG9uIHRoZSB1bmlxdWUgdmFsdWVzIGluIGJvdGhcbiAqICBzZXRzLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMTEyXG4gKiBAcGFyYW0ge0FycmF5fSBhIChzdWJ0cmFoZW5kKSBUaGUgYXJyYXkgdG8gc3VidHJhY3QuXG4gKiBAcGFyYW0ge0FycmF5fSAobWludWVuZCkgZnJvbUIgVGhlIGFycmF5IHdpdGggZWxlbWVudHMgZHVwbGljYXRlZCBpbiA8Y29kZT5hPC9jb2RlPlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IGNvbnRhaW5pbmcgb25seSB0aGUgdW5pcXVlXG4gKiAgdmFsdWVzIGZvdW5kIGluIDxjb2RlPmZyb21CPC9jb2RlPiB0aGF0IGFyZSBub3QgcHJlc2VudCBpbiA8Y29kZT5hPC9jb2RlPlxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWzEsMl07XG4gKiB2YXIgeSA9IFsxLDEsM107XG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XG4gKiAvLyByZXR1cm5zIFszXVxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWzEsM107XG4gKiB2YXIgeSA9IFszLDFdO1xuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbXVxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWzEsM107XG4gKiB2YXIgeSA9IFszLDEsMSw5XTtcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcbiAqIC8vIHJldHVybnMgWzldXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV07XG4gKiB2YXIgeSA9IFszLDEseydhUHJvcCcgOiAnYVZhbCd9XTtcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcbiAqIC8vIHJldHVybnMgW3snYVByb3AnIDogJ2FWYWwnfV0gXG4gKiAvLyBiZWNhdXNlIHRoZSB0d28gb2JqZWN0cyBhcmUgbm90IHRoZSBzYW1lIG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9O1xuICogdmFyIHggPSBbMSwzLG9ial07XG4gKiB2YXIgeSA9IFszLDEseydhUHJvcCcgOiAnYVZhbCd9XTtcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcbiAqIC8vIHJldHVybnMgW3snYVByb3AnIDogJ2FWYWwnfV0gXG4gKiAvLyBiZWNhdXNlIHRoZSB0d28gb2JqZWN0cyBhcmUgbm90IHRoZSBzYW1lIG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9XG4gKiB2YXIgeCA9IFsxLDMsb2JqXTtcbiAqIHZhciB5ID0gWzMsMSxvYmpdO1xuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbXSBcbiAqIC8vIGJlY2F1c2UgdGhlIG9iamVjdHMgcmVmZXJlbmNlZCBpbiB0aGUgYXJyYXlzIGFyZSB0aGUgc2FtZSBvYmplY3QuXG4gKi9cbmF0cm9wYS5hcnJheXMuc3VidHJhY3QgPSBmdW5jdGlvbihhLCBmcm9tQikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciB0aGUgPSB7fTtcbiAgICB0aGUucmVzdWx0ID0gW107XG4gICAgZnJvbUIuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgdGhlLm1hcmsgPSBmYWxzZTtcbiAgICAgICAgYS5mb3JFYWNoKGZ1bmN0aW9uKHJtKXtcbiAgICAgICAgICAgIGlmKGl0ZW0gPT09IHJtKSB7XG4gICAgICAgICAgICAgICAgdGhlLm1hcmsgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYodGhlLm1hcmsgIT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoZS5yZXN1bHQucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGUucmVzdWx0O1xufTtcbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSBvZiB2YWx1ZXMgZm91bmQgaW4gYm90aCBvZiB0aGUgZ2l2ZW4gYXJyYXlzLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMTEyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTEgQW4gYXJyYXkuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTIgQW5vdGhlciBhcnJheS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiB2YWx1ZXMgZm91bmQgaW4gYm90aCBvZiB0aGUgZ2l2ZW5cbiAqICBhcnJheXMuXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwzLDRdO1xuICogdmFyIHkgPSBbMywxLDVdO1xuICogYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QoeCx5KTtcbiAqIC8vIHJldHVybnMgWzEsM11cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsxLDEsMyw0XTtcbiAqIHZhciB5ID0gWzMsMSwxLDVdO1xuICogYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QoeCx5KTtcbiAqIC8vIHJldHVybnMgWzEsMSwzXVxuICogQGV4YW1wbGVcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ307XG4gKiB2YXIgeCA9IFsxLDMsb2JqXTtcbiAqIHZhciB5ID0gWzMsMSxvYmpdO1xuICogYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QoeCx5KTtcbiAqIC8vIHJldHVybnMgWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dXG4gKiBAZXhhbXBsZVxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfTtcbiAqIHZhciB4ID0gWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dO1xuICogdmFyIHkgPSBbMywxLG9ial07XG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbMSwzXSBiZWNhdXNlIHRoZSB0d28gb2JqZWN0cyBhcmUgbm90IHRoZSBzYW1lIG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XTtcbiAqIHZhciB5ID0gWzMsMSx7J2FQcm9wJyA6ICdhVmFsJ31dO1xuICogYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QoeCx5KTtcbiAqIC8vIHJldHVybnMgWzEsM10gYmVjYXVzZSB0aGUgdHdvIG9iamVjdHMgYXJlIG5vdCB0aGUgc2FtZSBvYmplY3QuXG4gKi9cbmF0cm9wYS5hcnJheXMuaW50ZXJzZWN0ID0gZnVuY3Rpb24gaW50ZXJzZWN0KGFycmF5MSwgYXJyYXkyKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIHNtYWxsQXJyYXksIGxhcmdlQXJyYXksIGludGVyc2VjdGlvbiA9IFtdO1xuICAgIGlmKGFycmF5MS5sZW5ndGggPiBhcnJheTIubGVuZ3RoKSB7XG4gICAgICAgIGxhcmdlQXJyYXkgPSBhcnJheTEuc3BsaWNlKDApO1xuICAgICAgICBzbWFsbEFycmF5ID0gYXJyYXkyLnNwbGljZSgwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsYXJnZUFycmF5ID0gYXJyYXkyLnNwbGljZSgwKTtcbiAgICAgICAgc21hbGxBcnJheSA9IGFycmF5MS5zcGxpY2UoMCk7XG4gICAgfVxuICAgIHNtYWxsQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICB2YXIgaWR4SW5MYXJnZUFycmF5ID0gbGFyZ2VBcnJheS5pbmRleE9mKGl0ZW0pO1xuICAgICAgICBpZiAoMCA8PSBpZHhJbkxhcmdlQXJyYXkpIHsgLy8gaGFzIHdvcmRcbiAgICAgICAgICAgIGludGVyc2VjdGlvbi5wdXNoKGxhcmdlQXJyYXkuc3BsaWNlKGlkeEluTGFyZ2VBcnJheSwgMSlbMF0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGludGVyc2VjdGlvbjtcbn07XG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGZyZXF1ZW5jeSBvZiBpdGVtcyBvY2N1cnJpbmcgaW4gYW4gYXJyYXkuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAxMThcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgdG8gY2FsY3VsYXRlIGZyZXF1ZW5jaWVzIGZyb20uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCB3aG9zZSBrZXlzIGFyZSBlYWNoIHVuaXF1ZVxuICogIGVsZW1lbnRzIGZyb20gdGhlIGFycmF5IGFuZCB0aGVpciB2YWx1ZSBpcyB0aGVpciBmcmVxdWVuY3kgb2ZcbiAqICBvY2N1cnJlbmNlIHdpdGhpbiB0aGUgYXJyYXkuIEJlIGNhcmVmdWwgdGhhdCB5b3VyIGFycmF5IGRvZXNcbiAqICBub3QgY29udGFpbiB2YWx1ZXMgbWF0Y2hpbmcgb2JqZWN0IGluc3RhbmNlIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWzEsMSwxLDEsMSwzLDNdO1xuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XG4gKiAvLyByZXR1cm5zIHtcbiAqIC8vICAgICBcIjFcIjogNSxcbiAqIC8vICAgICBcIjNcIjogMlxuICogLy8gfVxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gW1wiYmlsbFwiLCBcImZyZWRcIiwgXCJmcmVkXCIsIFwiamFuZVwiXTtcbiAqIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHgpO1xuICogLy8gcmV0dXJucyB7XG4gKiAvLyAgICAgXCJiaWxsXCI6IDEsXG4gKiAvLyAgICAgXCJmcmVkXCI6IDIsXG4gKiAvLyAgICAgXCJqYW5lXCI6IDFcbiAqIC8vIH1cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XTtcbiAqIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHgpO1xuICogLy8gcmV0dXJucyB7XG4gKiAvLyAgICAgXCIxXCI6IDEsXG4gKiAvLyAgICAgXCIzXCI6IDEsXG4gKiAvLyAgICAgXCJbb2JqZWN0IE9iamVjdF1cIjogMVxuICogLy8gfVxuICogQGV4YW1wbGVcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ307XG4gKiB2YXIgb3RoZXJPYmogPSB7fTtcbiAqIHZhciB4ID0gWzEsMyxvYmosb3RoZXJPYmoseydhRG91Z2hudXQnIDogJ3Nwcmlua2xlcyd9XTtcbiAqIGF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5KHgpO1xuICogLy8gcmV0dXJucyB7XG4gKiAvLyAgICAgXCIxXCI6IDEsXG4gKiAvLyAgICAgXCIzXCI6IDEsXG4gKiAvLyAgICAgXCJbb2JqZWN0IE9iamVjdF1cIjogM1xuICogLy8gfVxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWzEsMyxcInRvU3RyaW5nXCJdO1xuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XG4gKiAvLyByZXR1cm5zIHtcbiAqIC8vICAgICBcIjFcIjogMSxcbiAqIC8vICAgICBcIjNcIjogMSxcbiAqIC8vICAgICBcInRvU3RyaW5nXCI6IFwiZnVuY3Rpb24gdG9TdHJpbmcoKSB7XFxuICAgIFtuYXRpdmUgY29kZV1cXG59MVwiXG4gKiAvLyB9XG4gKi9cbmF0cm9wYS5hcnJheXMuZ2V0RnJlcXVlbmN5ID0gZnVuY3Rpb24gKGFycikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBvdXQgPSBhcnIucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGN1cnIpIHtcbiAgICAgICAgaWYgKGFjY1tjdXJyXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhY2NbY3Vycl0gPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWNjW2N1cnJdICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG4gICAgcmV0dXJuIG91dDtcbn07XG4vKipcbiAqIEdldHMgVW5pcXVlIHZhbHVlcyBmcm9tIGFuIGFycmF5LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XG4gKiBAcGFyYW0ge0FycmF5fSBsYXJnZUFycmF5IFRoZSBhcnJheSB3aXRoIGR1cGxpY2F0ZSB2YWx1ZXMgaW4gaXQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgY29udGFpbmluZyBvbmx5IHRoZSB1bmlxdWVcbiAqICB2YWx1ZXMgZm91bmQgaW4gdGhlIGxhcmdlQXJyYXkuXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwxLDEsNCw0LDMsNl07XG4gKiBhdHJvcGEuYXJyYXlzLmdldFVuaXF1ZSh4KTtcbiAqIC8vIHJldHVybnMgWyBcIjFcIiwgXCI0XCIsIFwiM1wiLCBcIjZcIiBdXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbXCJiaWxsXCIsIFwiZnJlZFwiLCBcImphbmVcIiwgXCJmcmVkXCJdO1xuICogYXRyb3BhLmFycmF5cy5nZXRVbmlxdWUoeCk7XG4gKiAvLyByZXR1cm5zIFtcImJpbGxcIiwgXCJmcmVkXCIsIFwiamFuZVwiXVxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWyBcbiAqICAgICBcImJpbGxcIixcbiAqICAgICB7XCJhUHJvcFwiIDogXCJhVmFsdWVcIn0sXG4gKiAgICAge1wiYUd1eVwiIDogXCJmcmVkXCJ9LFxuICogICAgIHtcImFMYWR5XCIgOiBcImphbmVcIn1cbiAqIF07XG4gKiBhdHJvcGEuYXJyYXlzLmdldFVuaXF1ZSh4KTtcbiAqIC8vIHJldHVybnMgWyBcImJpbGxcIiwgXCJbb2JqZWN0IE9iamVjdF1cIiBdXG4gKi9cbmF0cm9wYS5hcnJheXMuZ2V0VW5pcXVlID0gZnVuY3Rpb24gKGxhcmdlQXJyYXkpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3kobGFyZ2VBcnJheSkpLnNvcnQoKTtcbn07XG4vKipcbiAqIFJlbW92ZXMgZW1wdHkgc3RyaW5ncyBmcm9tIHRoZSBnaXZlbiBhcnJheS5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxuICogQHBhcmFtIHtBcnJheX0gYXJyYXlXaXRoRW1wdHlFbGVtZW50cyBUaGUgYXJyYXkgd2l0aCBlbXB0eSBzdHJpbmdzIGluIGl0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IHdpdGggZW1wdHkgc3RyaW5ncyByZW1vdmVkLlxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWyAxMCwgLCA1LCBcIlwiLCAnJywgNyBdO1xuICogY29uc29sZS5sb2coJ3N0YXJ0aW5nIGxlbmd0aCAnICsgeC5sZW5ndGgpO1xuICogY29uc29sZS5sb2coeCk7XG4gKiB4ID0gYXRyb3BhLmFycmF5cy5yZW1vdmVFbXB0eUVsZW1lbnRzKHgpO1xuICogY29uc29sZS5sb2coJ2VuZGluZyBsZW5ndGggJyArIHgubGVuZ3RoKTtcbiAqIGNvbnNvbGUubG9nKHgpO1xuICogLy8gZGlzcGxheXMgdGhlIGZvbGxvd2luZ1xuICogLy8gc3RhcnRpbmcgbGVuZ3RoIDZcbiAqIC8vIFsxMCwgdW5kZWZpbmVkLCA1LCBcIlwiLCBcIlwiLCA3XVxuICogLy8gZW5kaW5nIGxlbmd0aCAzXG4gKiAvLyBbMTAsIDUsIDddXG4gKi9cbmF0cm9wYS5hcnJheXMucmVtb3ZlRW1wdHlFbGVtZW50cyA9IGZ1bmN0aW9uIChhcnJheVdpdGhFbXB0eUVsZW1lbnRzKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgcmV0dXJuIGFycmF5V2l0aEVtcHR5RWxlbWVudHMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiAhYXRyb3BhLmlucXVpcmUuaXNFbXB0eVN0cmluZyhpdGVtKTtcbiAgICB9KTtcbn07XG4vKipcbiAqIFJlaW5kZXhlcyBhbiBhcnJheS5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheSB3aXRoIGRpc2NvbnRpbnVvdXMga2V5cy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSB3aXRoIGNvbnRpbnVvdXMga2V5cy5cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsgXCJhXCIsIFwiYlwiLCBcImNcIiwgdW5kZWZpbmVkIF07XG4gKiBjb25zb2xlLmxvZyh4KTsgLy8gWyBcImFcIiwgXCJiXCIsIFwiY1wiLCB1bmRlZmluZWQgXVxuICogY29uc29sZS5sb2coeC5sZW5ndGgpOyAvLyA0XG4gKiBcbiAqIGRlbGV0ZSB4WzFdOyAvLyBkZWxldGVzIHRoZSBrZXkgZnJvbSB0aGUgYXJyYXkgYnV0XG4gKiAgICAgICAgICAgICAgLy8gdGhlIGFycmF5IGxlbmd0aCByZW1haW5zIHRoZSBzYW1lXG4gKiAgICAgICAgICAgICAgLy8gYXQgdGhpcyBwb2ludCB0aGUgYXJyYXlzIGtleXMgYXJlIDAsIDIsIGFuZCAzXG4gKiBjb25zb2xlLmxvZyh4KTsgLy8gWyBcImFcIiwgdW5kZWZpbmVkLCBcImNcIiwgdW5kZWZpbmVkIF1cbiAqIGNvbnNvbGUubG9nKHgubGVuZ3RoKTsgLy8gNFxuICogXG4gKiB4ID0gYXRyb3BhLmFycmF5cy5yZWluZGV4KHgpO1xuICogY29uc29sZS5sb2coeCk7IC8vICBbIFwiYVwiLCBcImNcIiwgdW5kZWZpbmVkIF1cbiAqICAgIC8vIG5vdGUgdGhhdCB0aGUgbGFzdCBlbGVtZW50IGV4aXN0ZWQgaW4gdGhlIGFycmF5LCBpdHMgdmFsdWUgd2FzXG4gKiAgICAvLyB1bmRlZmluZWQgYnV0IGl0IGRpZCBoYXZlIGEga2V5IHNvIHRoZSBlbGVtZW50IHJlbWFpbnMgaW4gdGhlIGFycmF5LlxuICogICAgLy9cbiAqICAgIC8vIFRoZSBkZWxldGVkIGVsZW1lbnQgd2FzIGluIGZhY3QgZGVsZXRlZCBmcm9tIHRoZSBhcnJheSBzbyB0aGVyZSB3YXMgbm9cbiAqICAgIC8vIGtleSB4WzFdIGF0IGFsbCwgd2hlbiB0cnlpbmcgdG8gYWNjZXNzIHRoaXMgbm9uIGV4aXN0aW5nIGVsZW1lbnQgdGhlXG4gKiAgICAvLyB2YWx1ZSBvZiB1bmRlZmluZWQgd2FzIHJldHVybmVkLiBUaGlzIGJlaGF2aW9yIGlzIGNvbmZ1c2luZyB1bmxlc3MgeW91XG4gKiAgICAvLyB0aGluayBhYm91dCB0aGUgYXJyYXlhcyBhbiBvYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhcmUgbmFtZWQgYnlcbiAqICAgIC8vIG51bWJlcnMuIEFjY2Vzc2luZyBhbiB1bmRlZmluZWQgcHJvcGVydHkgcmV0dXJucyB1bmRlZmluZWQgcmVnYXJkbGVzc1xuICogICAgLy8gb2Ygd2hldGhlciB0aGUgcHJvcGVydHkgZXhpc3RlZCBpbiB0aGUgcGFzdCBvciBub3QuXG4gKiBjb25zb2xlLmxvZyh4Lmxlbmd0aCk7IC8vIDNcbiAqL1xuYXRyb3BhLmFycmF5cy5yZWluZGV4ID0gZnVuY3Rpb24gcmVpbmRleChhcnIpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgaWR4LCBvdXQ7XG4gICAgb3V0ID0gW107XG4gICAgZm9yKGlkeCBpbiBhcnIpIHtcbiAgICAgICAgaWYoYXJyLmhhc093blByb3BlcnR5KGlkeCkpIHtcbiAgICAgICAgICAgIG91dC5wdXNoKGFycltpZHhdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0O1xufTtcbi8qKlxuICogU29ydHMgYW4gYXJyYXkncyBlbGVtZW50cyBudW1lcmljYWxseS5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDEyMFxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheSB0byBzb3J0LiBBbGwgZWxlbWVudHMgb2YgdGhlIGFycmF5IG11c3QgYmVcbiAqICBudW1iZXItaXNoLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IHdob3NlIGVsZW1lbnRzIGFyZSBpbiBudW1lcmljIG9yZGVyLlxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWzMsIDIsIDksIDI2LCAxMCwgMSwgOTksIDE1XTtcbiAqIGNvbnNvbGUubG9nKCBhdHJvcGEuYXJyYXlzLnNvcnROdW1lcmljYWxseSh4KSApO1xuICogLy8gbG9ncyBbMSwgMiwgMywgOSwgMTAsIDE1LCAyNiwgOTldXG4gKi9cbmF0cm9wYS5hcnJheXMuc29ydE51bWVyaWNhbGx5ID0gZnVuY3Rpb24gc29ydE51bWVyaWNhbGx5KGFycikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHJldHVybiBhcnIuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gKGEgLSBiKTtcbiAgICB9KTtcbn07XG4vKipcbiAqIFRocm93cyBhbiBlcnJvciwgPGNvZGU+U3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlPC9jb2RlPiBpcyBub3QgXG4gKiAgc3RhbmRhcmRpemVkLlxuICogXG4gKiAgWWVzLCBsb2NhbGVDb21wYXJlIGlzIGluIHRoZSBzdGFuZGFyZCBidXQsIGF0IHRoaXMgdGltZSB0aGUgYWN0dWFsXG4gKiAgY29tcGFyaXNvbiBpcyBpbXBsZW1lbnRhdGlvbiBkZXBlbmRhbnQuIFRoaXMgbWVhbnMgdGhhdCBcImFscGhhYmV0aWNhbCBvcmRlclwiXG4gKiAgY2FuIGJlIGRpZmZlcmVudCBvbiBkaWZmZXJlbnQgcGxhdGZvcm1zLiBXaGF0IEkgZm91bmQgd2FzIHRoYXQgaW4gbm9kZSB0aGVcbiAqICBhcnJheSBvZiA8Y29kZT5bJ2EnLCdaJywnQScsJ3onXTwvY29kZT4gd291bGQgYmUgc29ydGVkIHRvXG4gKiAgPGNvZGU+WydBJywnWicsJ2EnLCd6XCJdPC9jb2RlPiwgd2hpbGUgb25cbiAqICBmaXJlZm94IGl0IHdvdWxkIGJlIHNvcnRlZCB0byA8Y29kZT5bJ2EnLCdBJywneicsJ1onXTwvY29kZT4uIFdobyBrbm93cyBpZlxuICogIGFub3RoZXIgaW1wbGVtZW50b3Igd291bGQgc29ydCBpdCA8Y29kZT5bJ0EnLCdhJywnWicsJ3onXTwvY29kZT4/XG4gKiBcbiAqIEluIG9yZGVyIHRvIHByb3ZpZGUgYSByZWxpYWJsZSBpbXBsZW1lbnRhdGlvbiBJIHdvdWxkIGhhdmUgdG8gY3JlYXRlIG15IG93blxuICogIGltcGxlbWVudGF0aW9uIG9mIDxjb2RlPlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZTwvY29kZT4gYW5kIHRoYXQnc1xuICogIGp1c3QgdG9vIG11Y2ggd29yayBmb3IgbWUgdG8gZG8gYWxvbmUuXG4gKiBAdGhyb3dzIHtFcnJvcn0gXCJTdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmUgaXMgbm90IHN0YW5kYXJkaXplZFwiXG4gKi9cbmF0cm9wYS5hcnJheXMuc29ydEFscGhhYmV0aWNhbGx5ID0gZnVuY3Rpb24gc29ydEFscGhhYmV0aWNhbGx5KGFycikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHRocm93IG5ldyBFcnJvcihcIlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZSBpcyBub3Qgc3RhbmRhcmRpemVkXCIpO1xufTtcbi8qKlxuICogRGVsZXRlcyB0aGUgZ2l2ZW4gZWxlbWVudCBmcm9tIHRoZSBhcnJheSBhdCB0aGUgZ2l2ZW4gaW5kZXguIEl0IGJhc2ljYWxseVxuICogIGRvZXMgd2hhdCB5b3Ugd291bGQgZXhwZWN0IHRoZSBkZWxldGUgb3BlcmF0b3IgdG8gZG8sIGV4Y2VwdCB0aGUgZGVsZXRlXG4gKiAgb3BlcmF0b3IgZG9lc24ndCBkbyB3aGF0IHlvdSB3b3VsZCBleHBlY3QuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5LlxuICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCB0byBkZWxldGUuXG4gKiBAcmV0dXJucyBSZXR1cm5zIGFuIGFycmF5IHdpdGggdGhlIGVsZW1lbnQgcmVtb3ZlZCwgY29udGlndW91cyBrZXlzLCBhbmRcbiAqICB3aG9zZSBsZW5ndGggaXMgMSBsZXNzIHRoYW4gdGhlIGlucHV0IGFycmF5LlxuICovXG5hdHJvcGEuYXJyYXlzLmRlbGV0ZUVsZW1lbnQgPSBmdW5jdGlvbiAoYXJyLCBpbmRleCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGRlbGV0ZSBhcnJbaW5kZXhdO1xuICAgIHJldHVybiBhdHJvcGEuYXJyYXlzLnJlaW5kZXgoYXJyKTtcbn07XG5cblxuXG5cbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuYXRyb3BhLnJlZ2V4ID0gcmVxdWlyZSgnYXRyb3BhLXJlZ2V4JykucmVnZXg7XG5hdHJvcGEuYXJyYXlzID0gcmVxdWlyZSgnYXRyb3BhLWFycmF5cycpLmFycmF5cztcbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWVcbiovXG4vKmdsb2JhbCBhdHJvcGEgKi9cbi8vIGVuZCBoZWFkZXJcblxuLyoqXG4gKiBBIGZldyB1dGlsaXRpZXMgZm9yIG1hbmlwdWxhdGluZyBzdHJpbmdzLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEBuYW1lc3BhY2UgQSBmZXcgdXRpbGl0aWVzIGZvciBtYW5pcHVsYXRpbmcgc3RyaW5ncy5cbiAqIEByZXF1aXJlcyBhdHJvcGEucmVnZXgucGF0dGVybnNcbiAqL1xuYXRyb3BhLnN0cmluZyA9IHt9O1xuLyoqXG4gKiBSZXBsYWNlcyByZXBlYXRlZCB3b3JkcyBhbmQgcGhyYXNlcyB3aXRoIGEgc2luZ2xlIHdvcmQgb3IgcGhyYXNlLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwNzAxXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gcmVtb3ZlIHJlcGVhdGVkIHdvcmRzIGZyb20uXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBnaXZlbiBzdHJpbmcgd2l0aCByZXBlYXRlZCB3b3JkcyBhbmRcbiAqICBwaHJhc2VzIHJlbW92ZWQuXG4gKi9cbmF0cm9wYS5zdHJpbmcucmVtb3ZlUmVwZWF0ZWRXb3JkID0gZnVuY3Rpb24gcmVtb3ZlUmVwZWF0ZWRXb3JkIChzdHJpbmcpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoYXRyb3BhLnJlZ2V4LnBhdHRlcm5zLnJlcGVhdGVkV29yZHMsICckMScpO1xufTtcbi8qKlxuICogQ3JlYXRlcyBwYXJhZ3JhcGggYnJlYWtzIGF0IGV2ZXJ5IG9jY3VycmVuY2Ugb2YgdHdvIGNvbnNlY3V0aXZlIGxpbmUgYnJlYWtzLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwNzAxXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gaW5zZXJ0IHBhcmFncmFwaCB0YWdzIGludG8uXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBnaXZlbiBzdHJpbmcgd2l0aCBwYXJhZ3JhcGggYnJlYWtzIGluc2VydGVkLlxuICovXG5hdHJvcGEuc3RyaW5nLmxpbmVCcmVha3NUb1BhcmFncmFwaFRhZ3MgPSBmdW5jdGlvbiBsaW5lQnJlYWtzVG9QYXJhZ3JhcGhUYWdzIChzdHJpbmcpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgb3V0ID0gc3RyaW5nLnJlcGxhY2UoYXRyb3BhLnJlZ2V4LnBhdHRlcm5zLnBhcmFncmFwaEJyZWFrcywgJzwvcD48cD4nKTtcbiAgICBvdXQgPSAnPHA+JyArIG91dC50cmltKCkgKyAnPC9wPic7XG4gICAgb3V0ID0gb3V0LnJlcGxhY2UoL1xccys8XFwvKHB8YnIpPi9nLCAnPC8kMT4nKTtcbiAgICByZXR1cm4gb3V0O1xufTtcbi8qKlxuICogQ3JlYXRlcyBicmVhayB0YWdzIGF0IGV2ZXJ5IGxpbmUgYnJlYWsuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzA3MDFcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBpbnNlcnQgYnJlYWsgdGFncyBpbnRvLlxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgZ2l2ZW4gc3RyaW5nIHdpdGggYnJlYWsgdGFncyBpbnNlcnRlZC5cbiAqL1xuYXRyb3BhLnN0cmluZy5saW5lQnJlYWtzVG9CcmVha1RhZ3MgPSBmdW5jdGlvbiBsaW5lQnJlYWtzVG9CcmVha1RhZ3MgKHN0cmluZykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShhdHJvcGEucmVnZXgucGF0dGVybnMubGluZUJyZWFrcywgJzxicj4nKTtcbn07XG4vKipcbiAqIE5vcm1hbGl6ZXMgbGluZSBicmVha3MgdG8gYFxcbmAuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzA3MDFcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBub3JtYWxpemUuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBnaXZlbiBzdHJpbmcgd2l0aCBub3JtYWxpemVkIGxpbmUgYnJlYWtzLlxuICovXG5hdHJvcGEuc3RyaW5nLm5vcm1hbGl6ZUVvbCA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUVvbCAoc3RyaW5nKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGF0cm9wYS5yZWdleC5wYXR0ZXJucy5saW5lQnJlYWtzLCAnXFxuJyk7XG59O1xuLyoqXG4gKiBDb252ZXJ0cyB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIGEgZ2l2ZW4gc3RyaW5nIHRvXG4gKiB1cHBlcmNhc2UuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyBmb3Igd2hpY2ggeW91IHdhbnQgdGhlXG4gKiBmaXJzdCBsZXR0ZXIgdG8gYmUgaW4gdXBwZXIgY2FzZS5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBnaXZlbiBzdHJpbmcgd2l0aCBpdCdzIGZpcnN0IGxldHRlciBjYXBpdGFsaXplZC5cbiAqL1xuYXRyb3BhLnN0cmluZy51Y0ZpcnN0ID0gZnVuY3Rpb24gdWNGaXJzdChzdHJpbmcpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBzdHJpbmcgPSBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG4gICAgcmV0dXJuIHN0cmluZztcbn07XG4vKipcbiAqIENvbnZlcnRzIHRoZSBnaXZlbiBzdHJpbmcgdG8gY2FtZWwgY2FzZS5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDgyM1xuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNhbWVsaXplLlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIGNhbWVsaXplZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICogIGF0cm9wYS5zdHJpbmcuY2FtZWxpemUoJ2dldCBpdCB0b2dldGhlcicpO1xuICogIC8vIHJldHVybnMgXCJnZXRJdFRvZ2V0aGVyXCJcbiAqL1xuYXRyb3BhLnN0cmluZy5jYW1lbGl6ZSA9IGZ1bmN0aW9uIGNhbWVsaXplIChzdHIpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgYXJyLCBvdXQ7XG4gICAgYXJyID0gc3RyLnNwbGl0KCcgJyk7XG4gICAgb3V0ID0gYXJyLnNoaWZ0KCk7XG4gICAgYXJyID0gYXJyLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gYXRyb3BhLnN0cmluZy51Y0ZpcnN0KGl0ZW0pO1xuICAgIH0pO1xuICAgIG91dCArPSBhcnIuam9pbignJyk7XG4gICAgcmV0dXJuIG91dDtcbn07XG4vKipcbiAqIENvdW50cyB3b3Jkcy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDMxM1xuICogQHBhcmFtIHtTdHJpbmd9IHNvbWVUZXh0IFBsYWluIHRleHQuXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFJldHVybnMgdGhlIGNvdW50IG9mIHdvcmRzIGluIHNvbWVUZXh0LlxuICovXG5hdHJvcGEuc3RyaW5nLmNvdW50V29yZHMgPSBmdW5jdGlvbiBjb3VudFdvcmRzKHNvbWVUZXh0KSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIHdvcmRDb3VudCwgcmUsIGxlbiA9IDA7XG4gICAgaWYoc29tZVRleHQgIT09IHVuZGVmaW5lZCAmJiBzb21lVGV4dCAhPT0gbnVsbCkge1xuICAgICAgICBzb21lVGV4dCA9IHNvbWVUZXh0LnRyaW0oKTtcbiAgICAgICAgaWYoc29tZVRleHQgIT09ICcnKSB7XG4gICAgICAgICAgICB3b3JkQ291bnQgPSAwO1xuICAgICAgICAgICAgcmUgPSAvXFxzKy9naTtcbiAgICAgICAgICAgIHdvcmRDb3VudCA9IHNvbWVUZXh0LnNwbGl0KHJlKTtcbiAgICAgICAgICAgIGxlbiA9IHdvcmRDb3VudC5sZW5ndGg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxlbjtcbn07XG4vKipcbiAqIENvbnZlcnRzIGVuZCBvZiBsaW5lIG1hcmtlcnMgaW50byB3aGF0ZXZlciB5b3Ugd2FudC4gXG4gKiBBdXRvbWF0aWNhbGx5IGRldGVjdHMgYW55IG9mIFxcclxcbiwgXFxuLCBvciBcXHIgYW5kIFxuICogcmVwbGFjZXMgaXQgd2l0aCB0aGUgdXNlciBzcGVjaWZpZWQgRU9MIG1hcmtlci5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCB5b3Ugd2FudCBwcm9jZXNzZWQuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmV3RU9MIFRoZSByZXBsYWNlbWVudCBmb3IgdGhlIGN1cnJlbnQgRU9MIG1hcmtzLlxuICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgcHJvY2Vzc2VkIHRleHQuXG4gKi9cbmF0cm9wYS5zdHJpbmcuY29udmVydEVvbCA9IGZ1bmN0aW9uIGNvbnZlcnRFT0wodGV4dCwgbmV3RU9MKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoYXRyb3BhLnJlZ2V4LnBhdHRlcm5zLmxpbmVCcmVha3MsIG5ld0VPTCk7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgYSBxdWFudGl0eSBvZiBsZWFkaW5nIHNwYWNlcyBzcGVjaWZpZWQgYnkgb2Zmc2V0LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIHByb2Nlc3MuXG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0IFRoZSBhbW91bnQgb2Ygc3BhY2VzIHlvdSB3YW50IHJlbW92ZWQgXG4gKiBmcm9tIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHRleHQuXG4gKiBAcmV0dXJucyBSZXR1cm5zIHRoZSBwcm9jZXNzZWQgdGV4dC5cbiAqL1xuYXRyb3BhLnN0cmluZy5vZmZzZXRXaGl0ZVNwYWNlID0gZnVuY3Rpb24gb2Zmc2V0V2hpdGVTcGFjZSh0ZXh0LCBvZmZzZXQpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyIHJlZ3g7XG4gICAgcmVneCA9IG5ldyBSZWdFeHAoJ14geycgKyBvZmZzZXQgKyAnfScpO1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UocmVneCwgJycpO1xuICAgIHJldHVybiB0ZXh0O1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhbGwgdGFicyBpbiBsZWFkaW5nIHdoaXRlc3BhY2UgaW50byBmb3VyIHNwYWNlcy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCB0byBwcm9jZXNzXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBwcm9jZXNzZWQgdGV4dC5cbiAqL1xuYXRyb3BhLnN0cmluZy5ub3JtYWxpemVXaGl0ZVNwYWNlUHJlZml4ID0gZnVuY3Rpb24gbm9ybWFsaXplV2hpdGVTcGFjZVByZWZpeChcbiAgICB0ZXh0XG4pIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyIHByZWZpeCA9IHRleHQubWF0Y2goL15cXHMqLyk7XG4gICAgaWYocHJlZml4KSB7XG4gICAgICAgIHByZWZpeCA9IHByZWZpeFswXTtcbiAgICAgICAgcHJlZml4ID0gcHJlZml4LnJlcGxhY2UoL1xcdC9nLCAnICAgICcpO1xuICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9eXFxzKi8sIHByZWZpeCk7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0O1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhbGwgdGFicyBpbnRvIGZvdXIgc3BhY2VzLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIHByb2Nlc3NcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIHByb2Nlc3NlZCB0ZXh0LlxuICovXG5hdHJvcGEuc3RyaW5nLm5vcm1hbGl6ZVdoaXRlU3BhY2UgPSBmdW5jdGlvbiBub3JtYWxpemVXaGl0ZVNwYWNlKHRleHQpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFx0L2csICcgICAgJyk7XG4gICAgcmV0dXJuIHRleHQ7XG59O1xuXG4vKipcbiAqIENvdW50cyB0aGUgbnVtYmVyIG9mIGxlYWRpbmcgc3BhY2Ugb3IgdGFiIGNoYXJhY3RlcnMgYnV0IG5vdCBib3RoLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIGFuYWx5emUuXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIHRoZSBxdWFudGl0eSBvZiBsZWFkaW5nIHNwYWNlcyBvciB0YWJzLlxuICovXG5hdHJvcGEuc3RyaW5nLmdldE9mZnNldCA9IGZ1bmN0aW9uIGdldE9mZnNldCh0ZXh0KSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBvZmZzZXQgPSAwLFxuICAgICAgICBsZWFkaW5nQ2hhciA9IHRleHQuY2hhckF0KDApO1xuICAgICAgICBcbiAgICBpZiggbGVhZGluZ0NoYXIgPT09ICcgJyB8fCBsZWFkaW5nQ2hhciA9PT0gJ1xcdCcpIHtcbiAgICAgICAgd2hpbGUodGV4dC5jaGFyQXQob2Zmc2V0KSA9PT0gbGVhZGluZ0NoYXIgJiYgb2Zmc2V0IDwgdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgIG9mZnNldCsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvZmZzZXQ7XG59O1xuLyoqXG4gKiBCcmVha3MgYSBzdHJpbmcgaW50byBhbiBhcnJheSBvZiB3b3Jkcy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxuICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGhlIHRleHQgdG8gYW5hbHl6ZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiB0aGUgd29yZHMgaW5cbiAqICB0aGUgZ2l2ZW4gdGV4dC5cbiAqIEByZXF1aXJlcyBhdHJvcGEuYXJyYXlzLnJlbW92ZUVtcHR5RWxlbWVudHNcbiAqL1xuYXRyb3BhLnN0cmluZy5nZXRXb3JkcyA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIG91dCA9IFtdO1xuICAgIGZ1bmN0aW9uIGludmFsaWRDaGFycyhlbGVtZW50KSB7XG4gICAgICAgIHZhciBtYXRjaGVkID0gL15bXFwtJ+KAmWBdKyQvLnRlc3QoZWxlbWVudCk7XG4gICAgICAgIC8vIGludmVydCB0aGUgcmVzdWx0IG9mIHRlc3QuIHRocm93IG91dCBlbGVtZW50cyB0aGF0IG1hdGNoLlxuICAgICAgICByZXR1cm4gIW1hdGNoZWQ7XG4gICAgfVxuICAgIG91dCA9IGF0cm9wYS5hcnJheXMucmVtb3ZlRW1wdHlFbGVtZW50cyhcbiAgICAgICAgdGV4dC5zcGxpdCgvW15BLVphLXpcXC0n4oCZYF0rL2dpKVxuICAgICk7XG4gICAgb3V0ID0gb3V0LmZpbHRlcihpbnZhbGlkQ2hhcnMpO1xuICAgIHJldHVybiBvdXQ7XG59O1xuLyoqXG4gKiBFc2NhcGVzIDxjb2RlPkNEQVRBPC9jb2RlPiBzZWN0aW9ucyBpbiB0ZXh0XG4gKiAgc28gdGhhdCB0aGUgdGV4dCBtYXkgYmUgZW1iZWRkZWQgaW50byBhIFxuICogIDxjb2RlPkNEQVRBPC9jb2RlPiBzZWN0aW9uLiBUaGlzIHNob3VsZCBiZSBydW5cbiAqICBvbiBhbnkgdGV4dCB3aGljaCBtYXkgY29udGFpbiB0aGUgc3RyaW5nIFxuICogIDxjb2RlPl1dPjwvY29kZT4gc2luY2Ugc2FpZCBzdHJpbmcgd2lsbCBlZmZlY3RpdmVseVxuICogIGVuZCB0aGUgPGNvZGU+Q0RBVEE8L2NvZGU+IHNlY3Rpb24gcHJlbWF0dXJlbHkuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAxMThcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IGNvbnRhaW5pbmcgXG4gKiAgPGNvZGU+Q0RBVEE8L2NvZGU+IHNlY3Rpb25zIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIHN0cmluZyB3aXRoIGVzY2FwZWRcbiAqICA8Y29kZT5DREFUQTwvY29kZT4gc2VjdGlvbnMuXG4gKiBAc2VlIDxhIGhyZWY9XCJodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NEQVRBI05lc3RpbmdcIj5cbiAqICBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NEQVRBI05lc3Rpbmc8L2E+XG4gKiBAc2VlIDxhIGhyZWY9XCJodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD05ODE2OFwiPlxuICogIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTk4MTY4PC9hPlxuICovXG5hdHJvcGEuc3RyaW5nLmVzY2FwZUNkYXRhID0gZnVuY3Rpb24gZXNjYXBlQ2RhdGEodGV4dCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHJldHVybiBTdHJpbmcodGV4dCkucmVwbGFjZSgvXFxdXFxdPi9nLCAnXV1dXT48IVtDREFUQVs+Jyk7XG59O1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCJtb2R1bGUuZXhwb3J0cz17XHJcbiAgICBcIm5vdmVsdHkgcXVpY2tseSB3ZWFycyBvZmZcIjogXCJkdW1iIHNoaXQgZ2l0cyBvbGQgZmFzdFwiLFxyXG4gICAgXCJ0aGUgd2F5IGl0IGlzXCI6IFwiaG93IGl0IGJlXCIsXHJcbiAgICBcInB1dCB1cCB3aXRoXCI6IFwibWFuaGFuZGxlXCIsXHJcbiAgICBcInlldFwiOiBcImltbWVkaWF0ZWx5XCIsXHJcbiAgICBcImxvc2VcIjogXCJzaGFrZVwiLFxyXG4gICAgXCJmb3Igbm8gcmVhc29uXCI6IFwibWFpYWNhbGx5XCIsXHJcbiAgICBcImdpdmVuIGEgY2hvaWNlXCI6IFwiZXh0b3J0ZWRcIixcclxuICAgIFwibm90IHN0cm9uZyBlbm91Z2hcIjogXCJhaW4ndCBnb3QgdGhlIG51dHNcIixcclxuICAgIFwibm93IGF0IGFuIGVuZFwiOiBcImJyYW5kIHNwYW5raW4gbmV3XCIsXHJcbiAgICBcImJlIHRvZ2V0aGVyXCI6IFwibWFzaCB1cFwiLFxyXG4gICAgXCJhcG9jYWx5cHNlXCI6IFwicGFydHkgdGltZVwiLFxyXG4gICAgXCJub3RoaW5nIGlzIGFzc3VyZWRcIjogXCJ3ZSBsaXZlIHRvIGRlbGl2ZXJcIixcclxuICAgIFwidG8gbm8gYXZhaWxcIjogXCJmb3IgZ3JlYXQgZ29vZFwiLFxyXG4gICAgXCJ0b28gZ29vZCB0byBiZSB0cnVlXCI6IFwiZnVja2luZyBmYW50YXN0aWNcIixcclxuICAgIFwiZ3Jvd2luZyBhcGFydFwiOiBcImZ1Y2tpbmcgb3RoZXIgcGVvcGxlXCIsXHJcbiAgICBcInJlc3QgaW4gcGVhY2VcIjogXCJwYXJ0eSBsaWtlIGl0J3MgMTk5OVwiLFxyXG4gICAgXCJiYWNrIHN0YWJcIjogXCJydW1wIHNoYWtlXCIsXHJcbiAgICBcImJhY2sgc3RhYmJcIjogXCJydW1wIHNoYWtlXCIsXHJcbiAgICBcImxvb2sgaW50byB0aGVpciBleWVzXCI6IFwiZ2l2ZSB0aGVtIEFJRFNcIixcclxuICAgIFwibG9vayBpbnRvIGhlciBleWVzXCI6IFwiZ2l2ZSBoZXIgQUlEU1wiLFxyXG4gICAgXCJsb29rIGludG8gaGlzIGV5ZXNcIjogXCJnaXZlIGhpbSBBSURTXCIsXHJcbiAgICBcImNhbid0IGxpdmUgd2l0aG91dFwiOiBcInRvdWNoIG15c2VsZiBhYm91dFwiLFxyXG4gICAgXCJjYW4ndCBiZSB3aXRob3V0XCI6IFwidG91Y2ggbXlzZWxmIGFib3V0XCIsXHJcbiAgICBcImNvdWxkIG5ldmVyIGJlIHdpdGhvdXRcIjogXCJjYW4ndCB3b3JrIGFuYWwgYmVhZHMgd2l0aG91dFwiLFxyXG4gICAgXCJubyBtYXR0ZXJcIjogXCJpcnJlZ2FyZGxlc3Mgb2ZcIixcclxuICAgIFwid2lsbCBiZSB0aGVyZVwiOiBcInN0aWNrIGxpa2Ugc2hpdFwiLFxyXG4gICAgXCJ3aWxsIGFsd2F5cyBiZSB0aGVyZVwiOiBcInN0aWNrIGxpa2Ugd2V0IHNoaXRcIixcclxuICAgIFwiaG9sZGluZyB0aGVtIGNsb3NlIHRvXCI6IFwiaGFuZGN1ZmZpbmcgdGhlbSB0b1wiLFxyXG4gICAgXCJieSB5b3VyIHNpZGVcIjogXCJvbiB5b3VyIGFzc1wiLFxyXG4gICAgXCJieSBteSBzaWRlXCI6IFwib24gbXkgYXNzXCIsXHJcbiAgICBcImJ5IGhpcyBzaWRlXCI6IFwib24gaGlzIGFzc1wiLFxyXG4gICAgXCJieSBoZXIgc2lkZVwiOiBcIm9uIGhlciBhc3NcIixcclxuICAgIFwibGVhdmUgeW91ciBzaWRlXCI6IFwiZ2V0IG9mZiB5b3VyIGFzc1wiLFxyXG4gICAgXCJsZWF2ZSBteSBzaWRlXCI6IFwiZ2V0IG9mZiBteSBhc3NcIixcclxuICAgIFwibGVhdmUgaGlzIHNpZGVcIjogXCJnZXQgb2ZmIGhpcyBhc3NcIixcclxuICAgIFwibGVhdmUgaGVyIHNpZGVcIjogXCJnZXQgb2ZmIGhlciBhc3NcIixcclxuICAgIFwiZG9lc24ndCBoYXBwZW4gb3ZlclwiOiBcImNhcnR3aGVlbHMgc3RyYWlnaHQgYWNyb3NzXCIsXHJcbiAgICBcIm1lYW5zIG1hbnkgdGhpbmdzXCI6IFwiaXMgYmVzdCBkZXNjcmliZWQgd2l0aCBsaWVzXCIsXHJcbiAgICBcImxheWluZyBpbiBiZWRcIjogXCJ0YWtpbmcgYSBzaGl0XCIsXHJcbiAgICBcInByb21pc2VcIjogXCJsaWVcIixcclxuICAgIFwibGlhclwiOiBcImZpYmJlclwiLFxyXG4gICAgXCJsaWVcIjogXCJmaWJcIixcclxuICAgIFwibGllc1wiOiBcImZpYnNcIixcclxuICAgIFwid2hhdCdzIHRoZSBwb2ludFwiOiBcInRoZSBmdWNrcyB0aGlzIG1lYW5cIixcclxuICAgIFwiaXQgbXVzdCBiZSB0cnVlXCI6IFwiZm9yIHJlYWwgJ24nIHNoaXRcIixcclxuICAgIFwid2hhdCBwZW9wbGUgc2F5XCI6IFwibXV0aGFwaHVra2FzIGJlIHRhbGtpblwiLFxyXG4gICAgXCJldGNoZWRcIjogXCJncm91bmRcIixcclxuICAgIFwiZG9uJ3QgaGF2ZSBhIGNsdWVcIjogXCJnb3Qgc2hpdCB0d2lzdGVkXCIsXHJcbiAgICBcInZpc2Npb3VzIGN5Y2xlXCI6IFwiY2x1c3RlcmZ1Y2tcIixcclxuICAgIFwiZG9uJ3QgbmVlZFwiOiBcImNvdWxkIGdpdmUgYSBmdWNrIGFib3V0XCIsXHJcbiAgICBcInJhdmVuXCI6IFwicGlnZW9uXCIsXHJcbiAgICBcInRvIGdldCBhd2F5XCI6IFwidG8gZnVja2luZyBydW5cIixcclxuICAgIFwidG8gYSBiZXR0ZXJcIjogXCJmb3Igc29tZSBnbGl0dGVyZWRcIixcclxuICAgIFwiYmVhdXRpZnVsIGZhY2VcIjogXCJlbm9ybW91cyB0aXRzXCIsXHJcbiAgICBcIm1pZ2h0IGFzIHdlbGxcIjogXCJvaCBmdWNrIEkgb3VnaHR0YVwiLFxyXG4gICAgXCJ0aGUgZmlyc3QgbW9tZW50XCI6IFwic3RyYWlnaHRhd2F5XCIsXHJcbiAgICBcImFzIHdlbGxcIjogXCJhbHNvXCIsXHJcbiAgICBcInNvIGdvb2RcIjogXCJuZWF0b1wiLFxyXG4gICAgXCJjb3VsZCBkbyBhbnl0aGluZ1wiOiBcImlzIGZ1Y2tpbmcgaW5zYW5lXCIsXHJcbiAgICBcInNldCB0aGUgbW9vZFwiOiBcIndoaXAgaXQgb3V0XCIsXHJcbiAgICBcImJhYnkgaWZcIjogXCJsb29rIGJpdGNoLFwiLFxyXG4gICAgXCJ0aHJvdWdoIHlvdXIgaGFpclwiOiBcInVwc2lkZSB5b3VyIGhlYWRcIixcclxuICAgIFwiZW50ZXJlZCB0aGUgaG91c2Ugb2ZcIjogXCJnb3QgdXAgaW4gdGhlIGJhcm4gZm9yXCIsXHJcbiAgICBcImFsd2F5cyBsb3ZlIHlvdSB0aGUgc2FtZVwiOiBcImFsd2F5cyBsb3ZlIHlvdSBsaWtlIG15IG90aGVyIHN1Y2tlcnNcIixcclxuICAgIFwia2lzc2luZyBvdGhlclwiOiBcImdvaW5nIGRvd24gb25cIixcclxuICAgIFwibmV2ZXIgdGhvdWdodCB5b3Ugd291bGQgZG8gdGhhdFwiOiBcImdvdCB0dXJuZWQgb3V0IGxpa2UgYSBkdW1iIGZ1Y2tcIixcclxuICAgIFwibGF5aW5nIG9uIHRoZSBmbG9vclwiOiBcImJlZ2dpbmcgZm9yIGl0XCIsXHJcbiAgICBcImZpcnN0IGxhaWQgZXllcyBvblwiOiBcImZpcnN0IHRyaWVkIGdyb3BpbmdcIixcclxuICAgIFwibW9zdCBwZW9wbGUgY2FuIG9ubHlcIjogXCJtb3N0IGZyZWFrcyBhbmQgZG9wZSBmaWVuZHNcIixcclxuICAgIFwieW91IHdlcmUgdGhlIG9uZVwiOiBcInlvdSB3ZXJlIG15IHRhcmdldFwiLFxyXG4gICAgXCJzdGFuZGluZyBvdXQgZnJvbSB0aGUgY3Jvd2RcIjogXCJ3b2JibGluZyBsaWtlIGFuIGVsZXBoYW50IG9uIGEgYmljeWNsZVwiLFxyXG4gICAgXCJzdG9vZCBvdXQgZnJvbSB0aGUgY3Jvd2RcIjogXCJqaWdnbGVkIGxpa2UgYSBqZWxsbyBTYW50YVwiLFxyXG4gICAgXCJzdGFuZCBvdXQgZnJvbSB0aGUgY3Jvd2RcIjogXCJsb29rIGxpa2UgYSBqYWNrYXNzXCIsXHJcbiAgICBcInN0YW5kcyBvdXQgZnJvbSB0aGUgY3Jvd2RcIjogXCJzbWVsbHMgbGlrZSBvbGQgZGlja1wiLFxyXG4gICAgXCJpJ3ZlIG5ldmVyIGZlbHQgdGhpcyB3YXlcIjogXCJpJ3ZlIGRvbmUgdGhpc1wiLFxyXG4gICAgXCJ3aXRoIGV2ZXJ5IGZpYmVyXCI6IFwiZnJvbSBwaXRoeSBwaXRzXCIsXHJcbiAgICBcIndhbmRlclwiOiBcInN0dW1ibGVcIixcclxuICAgIFwiaGF1bnRcIjogXCJzdGFsa1wiLFxyXG4gICAgXCJtYXNrXCI6IFwidHJhc2hiYWdcIixcclxuICAgIFwiZGVtb25pYyBhbmdlbFwiOiBcImFzcyBwaXJhdGVcIixcclxuICAgIFwiYW5nZWxpYyBkZW1vblwiOiBcImFzcyBwaXJhdGVcIixcclxuICAgIFwiY3VubmluZ1wiOiBcImRlc3BlcmF0ZVwiLFxyXG4gICAgXCJkYW5nZXJvdXNcIjogXCJjb2NrIGNhdGNoaW5nXCIsXHJcbiAgICBcImRlbWktZ29kXCI6IFwicHVuayBiaXRjaFwiLFxyXG4gICAgXCJkZW1pZ29kXCI6IFwicHVuayBiaXRjaFwiLFxyXG4gICAgXCJtb3J0YWxcIjogXCJxdWVlclwiLFxyXG4gICAgXCJpbW1vcnRhbFwiOiBcIndoaW55XCIsXHJcbiAgICBcImJldHJheWFsXCI6IFwiZ2FtZVwiLFxyXG4gICAgXCJiZXRyYXlcIjogXCJzY3Jld1wiLFxyXG4gICAgXCJnYXZlIHVwIG9uXCI6IFwiZG9uJ3QgZ2l2ZSBhIGZ1Y2sgYWJvdXRcIixcclxuICAgIFwiZ2l2ZSB1cCBvblwiOiBcIndvbid0IGdpdmUgYSBmdWNrIGFib3V0XCIsXHJcbiAgICBcImdpdmVuIHVwIG9uXCI6IFwiZG9uJ3QgZ2l2ZSBhIGZ1Y2sgYWJvdXRcIixcclxuICAgIFwiZ2l2aW5nIHVwIG9uXCI6IFwiYWluJ3QgZ2l2aW4gYSBmdWNrIGFib3V0XCIsXHJcbiAgICBcImNvZmZpblwiOiBcInRvYm9nYW5cIixcclxuICAgIFwiYmVhdXRpZnVsXCI6IFwiZ2F1ZHlcIixcclxuICAgIFwidGhlIGJlc3RcIjogXCJ0aGUgYmFkZGVzdFwiLFxyXG4gICAgXCJzZWxmaXNoXCI6IFwidGhpZXZpbmdcIixcclxuICAgIFwid2Fsa2VkIG91dFwiOiBcIm5hcnJvd2x5IGVzY2FwZWRcIixcclxuICAgIFwid2FsayBvdXRcIjogXCJuYXJyb3dseSBlc2NhcGVcIixcclxuICAgIFwid2Fsa2luZyBvdXRcIjogXCJuYXJyb3dseSBlc2NhcGluZ1wiLFxyXG4gICAgXCJnb3QgaW4geW91ciB3YXlcIjogXCJnb3QgYWxsIHVwIGluIHlvdXIgc2hpdFwiLFxyXG4gICAgXCJ0cnlcIjogXCJzaG9vdFwiLFxyXG4gICAgXCJ0aGUgcG9pbnQgb2Ygbm8gcmV0dXJuXCI6IFwidGhlIGZhdCBnaXJscyBiZWRyb29vbSBkb29yXCIsXHJcbiAgICBcIm9ubHkgd2FudGVkXCI6IFwiYmVnZ2VkIGZvclwiLFxyXG4gICAgXCJndWVzcyBpdCBkb2Vzbid0IG1hdHRlclwiOiBcImtub3cgdGhpcyBzaGl0IGlzIHBvaW50bGVzc1wiLFxyXG4gICAgXCJsb29rIGJhY2tcIjogXCJsaWNrIHdpbmRvd3NcIixcclxuICAgIFwicGF0aFwiOiBcInNpZGV3YWxrXCIsXHJcbiAgICBcInNoaW5lXCI6IFwiYmxpbmdcIixcclxuICAgIFwiaW4gdGhlIG1pZGRsZSBvZlwiOiBcImFsbCB1cCBpblwiLFxyXG4gICAgXCJkZWVwIGRvd24gaW5zaWRlXCI6IFwiaW4gdGhlIGJvdHRvbSBvZiB0aGUgdGFua1wiLFxyXG4gICAgXCJwaWVjZSBieSBwaWVjZVwiOiBcIm9uZSBoYW5kam9iIGF0IGEgdGltZVwiLFxyXG4gICAgXCJhdXJhXCI6IFwic3RlbmNoXCIsXHJcbiAgICBcImNhbmRsZVwiOiBcImdsb3dzdGlja1wiLFxyXG4gICAgXCJmb3IgaGVyXCI6IFwidG8gdGhhdCBicm9hZHNcIixcclxuICAgIFwiZm9yIHNoZVwiOiBcIidjYXVzZSB0aGUgY3VudFwiLFxyXG4gICAgXCJmb3IgaGVcIjogXCJ0aGlzIGR1bWIgbW90aGVyIGZ1Y2tlclwiLFxyXG4gICAgXCJmb3Jlc3RcIjogXCJjYW1wZ3JvdW5kXCIsXHJcbiAgICBcImhhbmQgaW4gaGFuZFwiOiBcImNvY2sgdG8gamF3XCIsXHJcbiAgICBcImhhbmQgdG8gaG9sZFwiOiBcIm51dHMgdG8gZ3JpcFwiLFxyXG4gICAgXCJnaXJsIG1lZXRzIGJveVwiOiBcImhvcm55IGtpZHMgaG9vayB1cFwiLFxyXG4gICAgXCJib3kgbWVldHMgZ2lybFwiOiBcImhvcm55IGtpZHMgaG9vayB1cFwiLFxyXG4gICAgXCJzdW5ueVwiOiBcInN3ZWx0ZXJpbmdcIixcclxuICAgIFwic28gbmVydm91c1wiOiBcInNvIGZ1Y2tpbmcgZHJ1bmtcIixcclxuICAgIFwia2lzc1wiOiBcInNsYXBcIixcclxuICAgIFwiZmluZ2VydGlwc1wiOiBcImNoaWNrZW4gbnVnZ2V0c1wiLFxyXG4gICAgXCJ0ZWxsIHlvdSBpJ20gZmluZVwiOiBcInNjcmVtIEknTSBGVUNLSU4gT0tcIixcclxuICAgIFwid3JpdGVcIjogXCJzY3Jhd2xcIixcclxuICAgIFwid3JpdHRlblwiOiBcInNjcmF3bGVkXCIsXHJcbiAgICBcIndyb3RlXCI6IFwic2NyYXdsZWRcIixcclxuICAgIFwiZmlyc3Qgb2YgYWxsXCI6IFwibW0ta2F5XCIsXHJcbiAgICBcImJyaW5nIGZvcnRoXCI6IFwid2hpcCBvdXRcIixcclxuICAgIFwiaW50byB0aGUgbGlnaHRcIjogXCJvbiB0byB0aGUgbGlnaHRcIixcclxuICAgIFwidGhlIG9ubHkgb25lXCI6IFwiZnVja2luZyBzdHVwaWRcIixcclxuICAgIFwidG8gdGhlIGxpZ2h0XCI6IFwib3V0IGluIHB1YmxpY1wiLFxyXG4gICAgXCJ0YWxrXCI6IFwiY3Vzc1wiLFxyXG4gICAgXCJmdWxsIG9mIGxpZmVcIjogXCJmdWxsIG9mIHNoaXRcIixcclxuICAgIFwiY2FuJ3QgZmluZCB0aGUgd29yZHMgdG8gc2F5XCI6IFwiY291bGQgYmx1cnQgb3V0IHNvbWUgZHVtYiBzaGl0XCIsXHJcbiAgICBcImNvbnN1bWVcIjogXCJzdWNrXCIsXHJcbiAgICBcImNvbnN1bWluZ1wiOiBcInN1Y2tpbmdcIixcclxuICAgIFwicGlsbG93XCI6IFwic3RvbmVcIixcclxuICAgIFwiYWR2aWNlXCI6IFwiYnVsbHNoaXRcIixcclxuICAgIFwidW5pdmVyc2VcIjogXCJ0b2lsZXQgYm93bFwiLFxyXG4gICAgXCJlbGRlclwiOiBcIm9sZCBmb2xrXCIsXHJcbiAgICBcIm1hZ2lja1wiOiBcImRlbHVzaW9uXCIsXHJcbiAgICBcIm1hZ2ljXCI6IFwiaG9wZVwiLFxyXG4gICAgXCJhcmNhbmVcIjogXCJmb29saXNoXCIsXHJcbiAgICBcInNwZWFrIG9mXCI6IFwidGFsayBhYm91dFwiLFxyXG4gICAgXCJzaGFsbFwiOiBcInNob3VsZC13aWxsXCIsXHJcbiAgICBcIm9idGFpblwiOiBcImdldFwiLFxyXG4gICAgXCJiYXR0bGVcIjogXCJzcXVhYmJsZVwiLFxyXG4gICAgXCJtaWRuaWdodFwiOiBcImRheWJyZWFrXCIsXHJcbiAgICBcInNvcnJvd1wiOiBcIndoaW1wZXJcIixcclxuICAgIFwiY3JpbXNvblwiOiBcImF6dXJlXCIsXHJcbiAgICBcImJsYWNrXCI6IFwieWVsbG93XCIsXHJcbiAgICBcIndvbid0IG1ha2UgaXQgdGhyb3VnaFwiOiBcImNvdWxkIHNoaW1teSBwYXN0XCIsXHJcbiAgICBcIm5pZ2h0XCI6IFwiYmVkdGltZVwiLFxyXG4gICAgXCJkYXlcIjogXCJtb3JuaW5nXCIsXHJcbiAgICBcImZyYWdpbGVcIjogXCJzdHVyZHlcIixcclxuICAgIFwiY3JhY2tcIjogXCJtZW5kXCIsXHJcbiAgICBcInNvbGl0dWRlXCI6IFwiYW1iaWFuY2VcIixcclxuICAgIFwidG9ybWVudFwiOiBcInRpY2tsZVwiLFxyXG4gICAgXCJpbmNhbnRhdGlvblwiOiBcIm11Y2ggeWFtbWVyaW5nXCIsXHJcbiAgICBcImhvcGVsZXNzXCI6IFwicGl0aWZ1bFwiLFxyXG4gICAgXCJkZXByZXNzaW5nXCI6IFwiaW5lYnJpYXRpbmdcIixcclxuICAgIFwiZGVwcmVzc2VkXCI6IFwiZHJ1bmtcIixcclxuICAgIFwiZGVwcmVzc2lvblwiOiBcInNvIG11Y2ggYm9vemVcIixcclxuICAgIFwic2FkZGVuZWRcIjogXCJtYWRlIGZsYWNjaWRcIixcclxuICAgIFwic2FkbmVzc1wiOiBcImltcG90ZW5jZVwiLFxyXG4gICAgXCJuZXZlcmVuZGluZ1wiOiBcIm5ldmVyIGVuZGluZ1wiLFxyXG4gICAgXCJuZXZlciBlbmRpbmdcIjogXCJyZWxlbnRsZXNzXCIsXHJcbiAgICBcIm5ldmVyIGdvaW5nXCI6IFwiZnVja2VkIGZvciB0cnlpbmdcIixcclxuICAgIFwiY2hhbmdlIG9uZSB0aGluZ1wiOiBcImZ1Y2sgc29tZSduIHVwXCIsXHJcbiAgICBcIm5ldmVyIGVuZFwiOiBcImRyYWcgb25cIixcclxuICAgIFwid2lsbCBub3QgaGVhbFwiOiBcImZlc3RlcnNcIixcclxuICAgIFwib3V0d2FyZCBhcHBlYXJhbmNlXCI6IFwiZmFjYWRlXCIsXHJcbiAgICBcImVtb1wiOiBcImNsb3NldCBob21vXCIsXHJcbiAgICBcImJsYWNrZW5lZCB3YWxsc1wiOiBcImZpbHRoeSByb29tc1wiLFxyXG4gICAgXCJmYXJld2VsbFwiOiBcImFkaW9zXCIsXHJcbiAgICBcIm1lZXQgYWdhaW5cIjogXCJoYXZlIGFub3RoZXIgZ28tcm91bmRcIixcclxuICAgIFwic2FkZFwiOiBcImZsYWNjaWRcIixcclxuICAgIFwic2FkXCI6IFwiaW1wb3RlbnRcIixcclxuICAgIFwiYW1pZHN0XCI6IFwiYWxsIHVwIGluXCIsXHJcbiAgICBcIm1pZHN0XCI6IFwicGFudHNcIixcclxuICAgIFwia25vd2xlZGdlXCI6IFwidHJpdmlhXCIsXHJcbiAgICBcImtub3duXCI6IFwiZ290XCIsXHJcbiAgICBcImtub3dcIjogXCJnZXRcIixcclxuICAgIFwia25ld1wiOiBcImdvdFwiLFxyXG4gICAgXCJwYXNzaW9uYXRlXCI6IFwiZGVsaXJpb3VzXCIsXHJcbiAgICBcInBhc3Npb25cIjogXCJkZWxpcml1bVwiLFxyXG4gICAgXCJvJ1wiOiBcInVoXCIsXHJcbiAgICBcIm9cIjogXCJ1aFwiLFxyXG4gICAgXCJmYW5nXCI6IFwiZGVudHVyZVwiLFxyXG4gICAgXCJjdXJzZVwiOiBcInN0YWluXCIsXHJcbiAgICBcImxvdmVcIjogXCJjb25mdXNlXCIsXHJcbiAgICBcInZhbXBpcmljXCI6IFwicGVkb3BoaWxpY1wiLFxyXG4gICAgXCJ2YW1weXJlXCI6IFwicGVkb3BoeWxlXCIsXHJcbiAgICBcInZhbXBpcmVcIjogXCJwZWRvcGhpbGVcIixcclxuICAgIFwicHJvYmxlbVwiOiBcInVzZWxlc3MgY29uY2VyblwiLFxyXG4gICAgXCJmZWVsXCI6IFwiZm9uZGxlXCIsXHJcbiAgICBcIndvZVwiOiBcImNobGFteWRpYVwiLFxyXG4gICAgXCJlbXB0eVwiOiBcImJsb2F0ZWRcIixcclxuICAgIFwiaGF0cmVkXCI6IFwib2RpdW1cIixcclxuICAgIFwiaGF0ZVwiOiBcImRpc2xpa2VcIixcclxuICAgIFwic2NhcnJlZFwiOiBcInN0cmlhdGVkXCIsXHJcbiAgICBcInNjYXJzXCI6IFwic3RyaWFlXCIsXHJcbiAgICBcInNjYXJlXCI6IFwidGlja2xlXCIsXHJcbiAgICBcInNjYXJ5XCI6IFwidGlja2x5XCIsXHJcbiAgICBcInNjYXJcIjogXCJzdHJpYVwiLFxyXG4gICAgXCJ3b3VuZFwiOiBcIm91Y2hpZVwiLFxyXG4gICAgXCJzbGl0XCI6IFwiY3JldmljZVwiLFxyXG4gICAgXCJzbGljZVwiOiBcInBldFwiLFxyXG4gICAgXCJ0d2FzXCI6IFwiaXQgd2FzXCIsXHJcbiAgICBcImJpZyBicm90aGVyXCI6IFwibXkgcGFyYW5vaWFcIixcclxuICAgIFwiZXRlcm5pdHlcIjogXCJhd2hpbGVcIixcclxuICAgIFwiZXRlcm5hbGx5XCI6IFwiZm9yIGEgYml0XCIsXHJcbiAgICBcImV0ZXJuYWxcIjogXCJpbWFnaW5lZFwiLFxyXG4gICAgXCJwcm9waGV0XCI6IFwiaW5zb21uaWFjXCIsXHJcbiAgICBcInByb3BoZWNpZXNcIjogXCJ3aXZlcyB0YWxlc1wiLFxyXG4gICAgXCJwcm9waGVjeVwiOiBcIndpdmVzIHRhbGVcIixcclxuICAgIFwic29sZGllclwiOiBcIm1hbmlhY1wiLFxyXG4gICAgXCJtaWxpdGlhXCI6IFwiZ2FuZ1wiLFxyXG4gICAgXCJtaWxpdGFyeVwiOiBcImdhbmdzdGVyXCIsXHJcbiAgICBcIm1pbGl0YW50XCI6IFwibWFuaWFjYWxcIixcclxuICAgIFwiZ29kZGVzc1wiOiBcIkt5bGVlIFN0cnV0dFwiLFxyXG4gICAgXCJoaWdoZXIgcG93ZXJcIjogXCJjcnVzdHkgc29ja1wiLFxyXG4gICAgXCJkYXJrXCI6IFwiZWZmZXJ2ZXNjZW50XCIsXHJcbiAgICBcImFuY2llbnRcIjogXCJlbGRlcmx5XCIsXHJcbiAgICBcInF1ZXN0XCI6IFwic3Ryb2xsXCIsXHJcbiAgICBcImhlYXJ0YmVhdFwiOiBcImNvY2sgYmVhdFwiLFxyXG4gICAgXCJoZWFydFwiOiBcImNvY2tcIixcclxuICAgIFwiYmxvb2RcIjogXCJncmVhc2VcIixcclxuICAgIFwiYmxlZWRcIjogXCJ3aGluZVwiLFxyXG4gICAgXCJjdXRcIjogXCJtdXRpbGF0ZVwiLFxyXG4gICAgXCJzbGFzaFwiOiBcIm11dGlsYXRlXCIsXHJcbiAgICBcIm1vb25saWdodFwiOiBcIm1vb25zaGluZVwiLFxyXG4gICAgXCJtb29uXCI6IFwibmlnaHQgbGlnaHRcIixcclxuICAgIFwic3RlZWxcIjogXCJsYXRleFwiLFxyXG4gICAgXCJrbmlmZVwiOiBcImRpbGRvXCIsXHJcbiAgICBcInJhem9yYmxhZGVcIjogXCJidXR0IHBsdWdcIixcclxuICAgIFwicmF6b3JcIjogXCJkaWxkb1wiLFxyXG4gICAgXCJibGFkZVwiOiBcImhhbmRsZVwiLFxyXG4gICAgXCJwYWluXCI6IFwiaG90IHNleFwiLFxyXG4gICAgXCJlbW90aW9uYWxcIjogXCJjaGlsZGlzaFwiLFxyXG4gICAgXCJlbW90aW9uXCI6IFwibHVicmljYW50XCIsXHJcbiAgICBcInRlYXJkcm9wXCI6IFwidGVhciBkcm9wXCIsXHJcbiAgICBcInRlYXJcIjogXCJzcGVybWVcIixcclxuICAgIFwiY2FzdGxlXCI6IFwiY2hhdGVhdVwiLFxyXG4gICAgXCJ3b3JsZFwiOiBcImhhbmQgdG93ZWxcIixcclxuICAgIFwiZGVhZFwiOiBcImluZXJ0XCIsXHJcbiAgICBcImdvb2RieWVcIjogXCJwZWFjZSB5J2FsbFwiLFxyXG4gICAgXCJnb29kLWJ5ZVwiOiBcImdldCB0aGUgZnVjayBvdXRcIixcclxuICAgIFwiZ29vZCBieWVcIjogXCJmdWNrIG9mZlwiLFxyXG4gICAgXCJkZWF0aFwiOiBcIlNhbnRhXCIsXHJcbiAgICBcInBhbGVcIjogXCJzZXh5XCIsXHJcbiAgICBcImRyaWZ0XCI6IFwiaGltLWhhd1wiLFxyXG4gICAgXCJmYWRlXCI6IFwiaGltLWhhd1wiLFxyXG4gICAgXCJmbGVzaFwiOiBcInR3aW5raWVcIixcclxuICAgIFwiY29ycHNlXCI6IFwibWFubmVxdWluXCIsXHJcbiAgICBcInNraW5cIjogXCJ0d2lua2llc1wiLFxyXG4gICAgXCJwdXRyaWRcIjogXCJwbGVhc2FudFwiLFxyXG4gICAgXCJicmVhdGhlXCI6IFwicGF1c2UgYXdrd2FyZGx5XCIsXHJcbiAgICBcImJyZWF0aFwiOiBcImF3a3dhcmQgcGF1c2VcIixcclxuICAgIFwic3RvcHBcIjogXCJwdXNoXCIsXHJcbiAgICBcInN0b3BcIjogXCJwdXNoXCIsXHJcbiAgICBcInNjcmVhbVwiOiBcImdydW50XCIsXHJcbiAgICBcInRoaW5rXCI6IFwic2NoZW1lXCIsXHJcbiAgICBcInNwaXJpdHVhbFwiOiBcImJhbmFuYSBjcmF2aW5nXCIsXHJcbiAgICBcInNwaXJpdFwiOiBcImJhbmFuYVwiLFxyXG4gICAgXCJzb3VsXCI6IFwiYmFuYW5hXCIsXHJcbiAgICBcImdob3N0XCI6IFwiaW1hZ2luYXJ5IGZyaWVuZFwiLFxyXG4gICAgXCJtb25zdGVyXCI6IFwiZGlzbGV4aWMgbG92ZXJcIixcclxuICAgIFwiYmVhc3RcIjogXCJlcmVjdGlvblwiLFxyXG4gICAgXCJkZW1vblwiOiBcImhhcmQtb25cIixcclxuICAgIFwiYW5nZWxcIjogXCJwb3JuIHN0YXJcIixcclxuICAgIFwic2hvb3Rpbmcgc3RhclwiOiBcInN3aWZ0IG1pc3NpbGVcIixcclxuICAgIFwic3RhclwiOiBcIm1pc3NpbGVcIixcclxuICAgIFwibG9zdFwiOiBcImFyb3VzZWRcIixcclxuICAgIFwidGltZVwiOiBcInRocm9iYmluZ1wiLFxyXG4gICAgXCJjaGVla1wiOiBcInJ1bXBcIixcclxuICAgIFwiZmluZ2Vyc1wiOiBcInNhdXNhZ2VcIixcclxuICAgIFwiZGF5ZHJlYW1cIjogXCJmYW50YXNpemVcIixcclxuICAgIFwidGhlIHNwcmluZ1wiOiBcInR1YmUgc29ja1wiLFxyXG4gICAgXCJzcHJpbmdcIjogXCJ0dWJlIHNvY2tzXCIsXHJcbiAgICBcImlsbHVzaW9uXCI6IFwiZHJ1bmtlbiBtaXN0YWtlXCIsXHJcbiAgICBcImxvbmVsaW5lc3NcIjogXCJhcm91c2FsXCIsXHJcbiAgICBcImxvbmVseVwiOiBcImhvcm55XCIsXHJcbiAgICBcImFsb25lXCI6IFwiZWNzdGF0aWNcIixcclxuICAgIFwibG9uZVwiOiBcInNpbmdsZVwiLFxyXG4gICAgXCJwZXJmZWN0XCI6IFwiZnVja2VkXCIsXHJcbiAgICBcImhpZGRlblwiOiBcInN0YXNoZWRcIixcclxuICAgIFwibXlzdGVyeVwiOiBcIm5lb24gc2lnblwiLFxyXG4gICAgXCJteXN0ZXJpZXNcIjogXCJuZW9uIHNpZ25zXCIsXHJcbiAgICBcInJvc2VcIjogXCJidXR0IGhvbGVcIixcclxuICAgIFwicGV0YWxcIjogXCJkaW5nbGViZXJyeVwiLFxyXG4gICAgXCJkaWZmZXJlbnRcIjogXCJhd2t3YXJkXCIsXHJcbiAgICBcIndyb25nXCI6IFwiYnV6emluZ1wiLFxyXG4gICAgXCJmYXRlXCI6IFwiY29pbmNpZGVuY2VcIixcclxuICAgIFwiY29sZFwiOiBcImZ1enp5XCIsXHJcbiAgICBcImhlbGxmaXJlXCI6IFwiaGVsbCBmaXJlXCIsXHJcbiAgICBcImhlbGxcIjogXCJteSBjb2NrJ3NcIixcclxuICAgIFwiY3J5c3RhbFwiOiBcImJlZGF6bGVyXCIsXHJcbiAgICBcInJhaW5ib3dcIjogXCJwaXp6YXp6XCIsXHJcbiAgICBcInJhaW5cIjogXCJqaXp6dW1cIixcclxuICAgIFwic3Rvcm1cIjogXCJvcmd5XCIsXHJcbiAgICBcIndpbmRcIjogXCJibG93XCIsXHJcbiAgICBcImJyZWV6ZVwiOiBcImRyYWZ0XCIsXHJcbiAgICBcImJyaWxsaWFuY2VcIjogXCJzaGlueW5lc3NcIixcclxuICAgIFwiYnJpbGxpYW50XCI6IFwic2hpbnlcIixcclxuICAgIFwiZHJlYW1sYW5kXCI6IFwib2JzZXNzaW9uIGlzbGFuZFwiLFxyXG4gICAgXCJkcmVhbXNcIjogXCJvYnNlc3Npb25zXCIsXHJcbiAgICBcImRyZWFtXCI6IFwib2JzZXNzXCIsXHJcbiAgICBcInByaXNvblwiOiBcIm91dGhvdXNlXCIsXHJcbiAgICBcImdvbGRlbiByYXlcIjogXCJnYXVkeSBzY3JpYmJsZVwiLFxyXG4gICAgXCJyYXlcIjogXCJzY3JpYmJsZVwiLFxyXG4gICAgXCJkZWFkbHlcIjogXCJmZXJ0aWxlXCIsXHJcbiAgICBcInRydXRoXCI6IFwidHJpdmlhXCIsXHJcbiAgICBcInN1blwiOiBcInllbGxvdyBkaXNrXCIsXHJcbiAgICBcImNydWVsXCI6IFwiaGFwaGF6YXJkXCIsXHJcbiAgICBcImNsb3VkXCI6IFwiYmFsbG9vblwiLFxyXG4gICAgXCJ0d2lua2xlXCI6IFwic3Ryb2JlXCIsXHJcbiAgICBcInR3aW5rbGluZ1wiOiBcInN0cm9iaW5nXCIsXHJcbiAgICBcImVzY2FwZVwiOiBcInNudWdnbGVcIixcclxuICAgIFwidW5kZXJzdGFuZFwiOiBcInN0cm9rZSBteSBlZ29cIixcclxuICAgIFwicmVtZW1iZXJcIjogXCJtdW1ibGVcIixcclxuICAgIFwiaWxsdW1pbmF0aW9uXCI6IFwibXVtYm8ganVtYm9cIixcclxuICAgIFwicmVhbGl0eVwiOiBcInRvaWxldCBib3dsXCIsXHJcbiAgICBcImJpbmRcIjogXCJjb2RkbGVcIixcclxuICAgIFwiYm91bmRcIjogXCJjb2RkbGVkXCIsXHJcbiAgICBcInRvcm5cIjogXCJodWdnbGVkXCIsXHJcbiAgICBcImRpZWRcIjogXCJtYWRlIG1hcnNobWFsbG93c1wiLFxyXG4gICAgXCJkaWVzXCI6IFwibWFrZXMgbWFyc2htYWxsb3dzXCIsXHJcbiAgICBcImRpZVwiOiBcIm1ha2UgbWFyc2htYWxsb3dzXCIsXHJcbiAgICBcImR5aW5nXCI6IFwibWFraW5nIG1hcnNobWFsbG93c1wiLFxyXG4gICAgXCJib2R5XCI6IFwiamlnZ2xpbmcgY2x1bXBcIixcclxuICAgIFwiYm9kaWVzXCI6IFwiamlnZ2xpbmcgcGlsZXNcIixcclxuICAgIFwid2FyZmFyZVwiOiBcImNoaWxkcmVuIGxhdWdoaW5nXCIsXHJcbiAgICBcImRlYnV0YW50ZXNcIjogXCJob29rZXJzXCIsXHJcbiAgICBcInNsYXZlXCI6IFwiZ2ltcFwiLFxyXG4gICAgXCJwb2V0aWNcIjogXCJmbGF0dWxlbnRcIixcclxuICAgIFwicG9ldHJ5XCI6IFwiYmFkIGdhc1wiLFxyXG4gICAgXCJwb2V0XCI6IFwiaG9ib1wiLFxyXG4gICAgXCJwb2VtXCI6IFwic2NyaWJibGVcIixcclxuICAgIFwiY291bnRyeVwiOiBcImJhdGhyb29tXCIsXHJcbiAgICBcIm5ha2VkXCI6IFwidW5zaGF2ZWRcIixcclxuICAgIFwiamVzdXMgY2hyaXN0XCI6IFwiamltIGJvYiBqclwiLFxyXG4gICAgXCJjaHJpc3RcIjogXCJqaW0gYm9iIGpyXCIsXHJcbiAgICBcImplc3VzXCI6IFwiamltIGJvYiBqclwiLFxyXG4gICAgXCJoZWFsZXJcIjogXCJmb25kbGVyXCIsXHJcbiAgICBcImdvZHNcIjogXCJqaW0gYm9iIHNyIGV0IGFsLlwiLFxyXG4gICAgXCJnb2RcIjogXCJqaW0gYm9iIHNyXCIsXHJcbiAgICBcIndlYXBvblwiOiBcInBvY2tldCBwdXNzeVwiLFxyXG4gICAgXCJleGlzdGVuY2VcIjogXCJ3aGF0ZXZlclwiLFxyXG4gICAgXCJtaW5pb25cIjogXCJob3JueSBwaXJhdGVcIixcclxuICAgIFwicmFwaW5nXCI6IFwid2hhdFwiLFxyXG4gICAgXCJyYXBlXCI6IFwid2hhdFwiLFxyXG4gICAgXCJncmF2ZXN0b25lXCI6IFwibWlsZSBtYXJrZXJcIixcclxuICAgIFwiZ3JhdmVcIjogXCJwZXJzb25hbCBzcGFjZVwiLFxyXG4gICAgXCJpbmZpbml0ZVwiOiBcImFic3RyYWN0XCIsXHJcbiAgICBcInN1aWNpZGVcIjogXCJtdXJkZXJcIixcclxuICAgIFwiYnJpbmtcIjogXCJib3JkZXJcIixcclxuICAgIFwiY3JpZWRcIjogXCJjYW1lXCIsXHJcbiAgICBcImNyaWVzXCI6IFwic2tlZXRzXCIsXHJcbiAgICBcImNyeWluZ1wiOiBcImN1bW1pbmdcIixcclxuICAgIFwiaGFkIGRvbmVcIjogXCJkb25lIGRpZFwiLFxyXG4gICAgXCJjcnlcIjogXCJjdW1cIixcclxuICAgIFwiY3J5cHRpY1wiOiBcImRydW5rZW5cIixcclxuICAgIFwiY3J5cHRcIjogXCJ1cmluYWxcIixcclxuICAgIFwibXlzdGljXCI6IFwidHJhbnNleHVhbFwiLFxyXG4gICAgXCJiYWxhbmNlZCBpbmRpdmlkdWFsXCI6IFwicHN5Y2hvXCIsXHJcbiAgICBcImJhbGFuY2VkIHBlcnNvblwiOiBcInBzeWNob1wiLFxyXG4gICAgXCJiYWxhbmNlZCBtYW5cIjogXCJwc3ljaG9cIixcclxuICAgIFwiYmFsYW5jZWQgd29tYW5cIjogXCJwc3ljaG9cIixcclxuICAgIFwid2lzZG9tXCI6IFwiYnVsbCBzaGl0XCIsXHJcbiAgICBcIndpc2VcIjogXCJidWxsIHNoaXR0aW5nXCIsXHJcbiAgICBcImJsZXNzZWQgYmVcIjogXCJzdWNrIGVnZ3NcIixcclxuICAgIFwiZW5lcmd5XCI6IFwianVpY2VcIixcclxuICAgIFwicmlkZGxlXCI6IFwicG9sa2EgZG90XCIsXHJcbiAgICBcIm15IGxvcmRcIjogXCJzd2VldCBwYWxtXCIsXHJcbiAgICBcInNvIG1vdGUgaXQgYmVcIjogXCJpdCdzIHJlYWwgaW4gbXkgaGVhZFwiLFxyXG4gICAgXCJwcmF5XCI6IFwibXVybXVyXCIsXHJcbiAgICBcIm5vbWFkXCI6IFwiZHJ1bmsgaG9ib1wiLFxyXG4gICAgXCJkZXN0aW55XCI6IFwidGF4ZXNcIixcclxuICAgIFwic3dvcmRcIjogXCJkaWxkb1wiLFxyXG4gICAgXCJ2b2lkXCI6IFwiYnVja2V0XCIsXHJcbiAgICBcImp1c3RcIjogXCJzdXJlXCIsXHJcbiAgICBcInZlbmdlYW5jZVwiOiBcInNsYXAgaGFwcGluZXNzXCIsXHJcbiAgICBcImF2ZW5nZVwiOiBcImdpdCByb3dkeSBmb3JcIixcclxuICAgIFwidmVuZ2VcIjogXCItcm93ZHktXCIsXHJcbiAgICBcImhlYXZlbnNcIjogXCJza2llc1wiLFxyXG4gICAgXCJoZWF2ZW5cIjogXCJza3lcIixcclxuICAgIFwiZW5kbGVzc1wiOiBcInJlYWwgbG9uZ1wiLFxyXG4gICAgXCJ2YWxsZXlcIjogXCJkaXRjaFwiLFxyXG4gICAgXCJhcmR1b3VzXCI6IFwibm90IGVhc3lcIixcclxuICAgIFwidG91Y2hcIjogXCJncm9wZVwiLFxyXG4gICAgXCJ3cmV0Y2hlZFwiOiBcInNrZWV6eVwiLFxyXG4gICAgXCJ3cmV0Y2hcIjogXCJza2VlemVcIixcclxuICAgIFwiYXdlXCI6IFwiZmVhcmZ1bCByZXZlcmVuY2VcIixcclxuICAgIFwicml0dWFsXCI6IFwiYmFuYW5hIGRhbmNlXCIsXHJcbiAgICBcImJlaG9sZFwiOiBcIm9vZ2xlXCIsXHJcbiAgICBcInZlaWxcIjogXCJkaXNndWlzZVwiLFxyXG4gICAgXCJ2aXN0YVwiOiBcInNjZW5lXCIsXHJcbiAgICBcImFsd2F5c1wiOiBcInVzdWFsbHlcIixcclxuICAgIFwiYmVsaWV2ZVwiOiBcImJ1eVwiLFxyXG4gICAgXCJ3aXNoXCI6IFwid2FudFwiLFxyXG4gICAgXCJmZWxsXCI6IFwiZmxvcHBlZFwiLFxyXG4gICAgXCJmYWxsXCI6IFwiZmxvcFwiLFxyXG4gICAgXCJyaWdodGVvdXNcIjogXCJhcnJvZ2FudFwiLFxyXG4gICAgXCJ3YXJyaW9yXCI6IFwia2l0dGVuXCIsXHJcbiAgICBcInVuY2FyaW5nXCI6IFwicHJpY2tpc2hcIixcclxuICAgIFwiY2FyZSB0byBnaXZlXCI6IFwic2hpdCB0byBnaXZlXCIsXHJcbiAgICBcInRha2UgY2FyZSBvZlwiOiBcImRlY2ltYXRlXCIsXHJcbiAgICBcInRha2luZyBjYXJlXCI6IFwiZm9yZ2V0aW5nXCIsXHJcbiAgICBcInRha2VzIGNhcmVcIjogXCJmb3JnZXRzXCIsXHJcbiAgICBcInRha2UgY2FyZVwiOiBcImZvcmdldFwiLFxyXG4gICAgXCJmb3JnZXRcIjogXCJkaXNyZW1lbWJlclwiLFxyXG4gICAgXCJjYXJpbmdcIjogXCJnaXZpbmcgYSBzaGl0XCIsXHJcbiAgICBcImNhcmVkXCI6IFwiZ2F2ZSBhIHNoaXRcIixcclxuICAgIFwiY2FyZVwiOiBcImdpdmUgYSBzaGl0XCIsXHJcbiAgICBcIndpZWxkXCI6IFwiamVya1wiLFxyXG4gICAgXCJvY2VhblwiOiBcInNld2VyXCIsXHJcbiAgICBcInNlYVwiOiBcImJhdGhcIixcclxuICAgIFwiYmF5XCI6IFwic2lua1wiLFxyXG4gICAgXCJ0d2lsaWdodFwiOiBcIm1vb25zaGluZVwiLFxyXG4gICAgXCJicm9rZW5cIjogXCJiZWF0ZW5cIixcclxuICAgIFwiYnJva2VcIjogXCJiZWF0XCIsXHJcbiAgICBcImJyZWFrXCI6IFwiYmVhdFwiLFxyXG4gICAgXCJmb3JldmVyXCI6IFwic28gdmVyeVwiLFxyXG4gICAgXCJodW1hbiByYWNlXCI6IFwiZ2VyYmlsIGVtcGlyZVwiLFxyXG4gICAgXCJuaWdodG1hcmVcIjogXCJ0YW50cnVtXCIsXHJcbiAgICBcInN1ZmZlclwiOiBcInBpcm91ZXR0ZVwiLFxyXG4gICAgXCJteXNlbGZcIjogXCJteSBtdWNobmVzc1wiLFxyXG4gICAgXCJtZVwiOiBcImlcIixcclxuICAgIFwibXlcIjogXCJpJ3MgXCIsXHJcbiAgICBcIm1pbmVcIjogXCJpJ3NcIixcclxuICAgIFwid2FzIGlcIjogXCJ3ZXJlIGlcIixcclxuICAgIFwiYW0gaVwiOiBcImFyZSBpXCIsXHJcbiAgICBcImltXCI6IFwiaSdtXCIsXHJcbiAgICBcImknbVwiOiBcImkgYXJlXCIsXHJcbiAgICBcImkndmVcIjogXCJpIGhhdmVcIixcclxuICAgIFwiaSdsbFwiOiBcImkgd2lsbFwiLFxyXG4gICAgXCJpIGFtXCI6IFwiaSBhcmVcIixcclxuICAgIFwieW91cnNlbGZcIjogXCJ5b3UncyBtdWNobmVzc1wiLFxyXG4gICAgXCJ5b3Vyc1wiOiBcInlvdSdzXCIsXHJcbiAgICBcInlvdXJcIjogXCJ5b3Unc1wiLFxyXG4gICAgXCJ5b3UgYWxsXCI6IFwiYWxsIHlvdVwiLFxyXG4gICAgXCJ5b3UnbGxcIjogXCJ5b3Ugd2lsbFwiLFxyXG4gICAgXCJ5b3UndmVcIjogXCJ5b3UgaGFzXCIsXHJcbiAgICBcInlvdSdyZVwiOiBcInlvdSBpc1wiLFxyXG4gICAgXCJ0aGVlXCI6IFwieW91XCIsXHJcbiAgICBcInRoaW5lXCI6IFwieW91J3NcIixcclxuICAgIFwidGhvdVwiOiBcInlvdVwiLFxyXG4gICAgXCJ3ZVwiOiBcInRoZXlcIixcclxuICAgIFwidXNcIjogXCJ0aGVtXCIsXHJcbiAgICBcIm91clwiOiBcInRoZWlyXCIsXHJcbiAgICBcIm91cnNcIjogXCJ0aGVpcnNcIixcclxuICAgIFwiaVwiOiBcIktldmluXCIsXHJcbiAgICBcInlvdVwiOiBcIlJldGFyZHNcIlxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbi8qanNsaW50XHJcbiAgICBub2RlOiB0cnVlXHJcbiovXHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbmF0cm9wYS5yZWdleCA9IHJlcXVpcmUoJ2F0cm9wYS1yZWdleCcpLnJlZ2V4O1xyXG5hdHJvcGEuc3RyaW5nID0gcmVxdWlyZSgnYXRyb3BhLXN0cmluZycpLnN0cmluZztcclxuYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcgPSByZXF1aXJlKCdhdHJvcGEtc2V0QXNPcHRpb25hbEFyZycpLnNldEFzT3B0aW9uYWxBcmc7XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZSxcclxuICAgIHZhcnM6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnJlcXVpcmVzKFxyXG4gICAgICAgICd3dGYnLFxyXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHN1cHBvcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBhdHJvcGEucmVnZXgsXHJcbiAgICAgICAgICAgICAgICBhdHJvcGEuc3RyaW5nLmNvdW50V29yZHMsXHJcbiAgICAgICAgICAgICAgICBhdHJvcGEuc2V0QXNPcHRpb25hbEFyZ1xyXG4gICAgICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKHByZXJlcXVpc2l0ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYocHJlcmVxdWlzaXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufSgpKTtcclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGF0cm9wYS5yZXF1aXJlcyhcclxuICAgICAgICAnd3RmSHRtbEVsZW1lbnQnLFxyXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHN1cHBvcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICB3aW5kb3dcclxuICAgICAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChwcmVyZXF1aXNpdGUpIHtcclxuICAgICAgICAgICAgICAgIGlmKHByZXJlcXVpc2l0ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwcG9ydGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydGVkO1xyXG4gICAgICAgIH1cclxuICAgICk7XHJcbn0oKSk7XHJcblxyXG4vKipcclxuICogQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgV1RGaWZpZXIgcmVsYXRlZCBmdW5jdGlvbnMgYW5kIHN1Y2guXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIFdURmlmaWVyIHJlbGF0ZWQgZnVuY3Rpb25zIGFuZCBzdWNoLlxyXG4gKiBAcmVxdWlyZXMgYXRyb3BhLnJlZ2V4XHJcbiAqIEByZXF1aXJlcyBhdHJvcGEud3RmLmRpY3Rpb25hcnlcclxuICovXHJcbmF0cm9wYS53dGYgPSB7fTtcclxuLyoqXHJcbiAqIFRoZSBHbG9yaW91cyBXVEZpZmljYXRpb24gRGljdGlvbmFyeTogVHVybmluZyBTaGl0XHJcbiAqIEludG8gUG9saXNoZWQgVHVyZHMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDExMFxyXG4gKi9cclxuYXRyb3BhLnd0Zi5kaWN0aW9uYXJ5ID0gcmVxdWlyZSgnLi9hdHJvcGEtd3RmLWRpY3Rpb25hcnkuanNvbicpO1xyXG4vKipcclxuICogQWNjZXB0cyBwbGFpbiB0ZXh0IGlucHV0IGFuZCBHbG9yaW91c2x5IFdURmlmaWVzIGl0LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMTBcclxuICogQHBhcmFtIHtTdHJpbmd9IHRhcmdldCBUaGUgdGV4dCB0byBXVEZpZnkuXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb3V0cHV0SFRNTCBTcGVjaWZpZXMgaWYgeW91IHdhbnQgdGhlIG91dHB1dFxyXG4gKiAgaW4gSFRNTCBmb3JtYXQuIElmIGZhbHNlLCB3aWxsIG91dHB1dCBwbGFpbiB0ZXh0LiBEZWZhdWx0c1xyXG4gKiAgdG8gZmFsc2UuXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gUmV0dXJucyBHZW51aW5lIFdURmlmaWVkIHRleHQuXHJcbiAqL1xyXG5hdHJvcGEud3RmLnd0ZmlmeSA9IGZ1bmN0aW9uICh0YXJnZXQsIG91dHB1dEhUTUwpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygnd3RmJyk7XHJcbiAgICBcclxuICAgIHZhciByZWdleFZhbHVlLFxyXG4gICAgICAgIHJlcGxhY2VtZW50VGV4dCxcclxuICAgICAgICBvbGRXb3JkLFxyXG4gICAgICAgIHd0ZkNvdW50LFxyXG4gICAgICAgIHdvcmRDb3VudCxcclxuICAgICAgICByZXQsXHJcbiAgICAgICAgd29yZDtcclxuICAgIFxyXG4gICAgaWYodHJ1ZSAhPT0gb3V0cHV0SFRNTCkge1xyXG4gICAgICAgIG91dHB1dEhUTUwgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldCA9IHt9O1xyXG4gICAgd3RmQ291bnQgPSAwO1xyXG4gICAgdGFyZ2V0ID0gdGFyZ2V0LnRyaW0oKTtcclxuICAgIHdvcmRDb3VudCA9IGF0cm9wYS5zdHJpbmcuY291bnRXb3Jkcyh0YXJnZXQpO1xyXG4gICAgaWYodHJ1ZSA9PT0gb3V0cHV0SFRNTCkge1xyXG4gICAgICAgIHRhcmdldCA9IHRhcmdldC5yZXBsYWNlKFxyXG4gICAgICAgICAgICAvKFxcLiA/KXsyLH0vZ2ksXHJcbiAgICAgICAgICAgICc8c3BhbiBzdHlsZT1cImNvbG9yIDogYnJvd24gO1wiPiBbc2hpdCB0YWNvXSA8L3NwYW4+J1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGFyZ2V0ID0gJzxwPiAnICsgdGFyZ2V0LnJlcGxhY2UoLyhcXHJcXG58XFxyfFxcbikvZywnIDxici8+ICcpICsgJyA8L3A+JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnJlcGxhY2UoLyhcXC4gPyl7Mix9L2dpLCAnIFtzaGl0IHRhY29dICcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBBY2NlcHRzIHBsYWluIHRleHQgaW5wdXQgYW5kIEdsb3Jpb3VzbHkgV1RGaWZpZXMgaXQuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMzAxMTJcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEud3RmLnd0ZmlmeS1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbSBGaXJzdCBtYXRjaGVkIHBhdHRlcm4gaW4gc3RyaW5nIHNlYXJjaGVkLlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN1YjEgRmlyc3QgbWF0Y2hlZCBzdWJwYXR0ZXJuIGluIHN0cmluZyBzZWFyY2hlZC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdWIyIFNlY29uZCBtYXRjaGVkIHN1YnBhdHRlcm4gaW4gc3RyaW5nIHNlYXJjaGVkLlxyXG4gICAgICovXHJcbiAgICAgLypqc2xpbnQgdW5wYXJhbTogdHJ1ZSovXHJcbiAgICByZXBsYWNlbWVudFRleHQgPSBmdW5jdGlvbiAobSwgc3ViMSwgc3ViMikge1xyXG4gICAgICAgIHd0ZkNvdW50Kys7XHJcbiAgICAgICAgc3ViMSA9IGF0cm9wYS5zZXRBc09wdGlvbmFsQXJnKCcnLCBzdWIxKTtcclxuICAgICAgICBzdWIyID0gYXRyb3BhLnNldEFzT3B0aW9uYWxBcmcoJycsIHN1YjIpO1xyXG4gICAgICAgIHZhciBvdXQ7XHJcbiAgICAgICAgaWYodHJ1ZSA9PT0gb3V0cHV0SFRNTCkge1xyXG4gICAgICAgICAgICBvdXQgPSAnPHNwYW4gc3R5bGU9XCJjb2xvciA6IHJlZCA7XCI+JyArXHJcbiAgICAgICAgICAgICAgICBzdWIxICsgYXRyb3BhLnd0Zi5kaWN0aW9uYXJ5W3dvcmRdICsgc3ViMiArXHJcbiAgICAgICAgICAgICAgICAnPC9zcGFuPic7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3V0ID0gc3ViMSArIGF0cm9wYS53dGYuZGljdGlvbmFyeVt3b3JkXSArIHN1YjI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9O1xyXG4gICAgLypqc2xpbnQgdW5wYXJhbTogZmFsc2UqL1xyXG4gICAgLy8gd29yZCBpcyBkZWZpbmVkIGluIHRoZSBjb250YWluaW5nIHNjb3BlIGFuZFxyXG4gICAgLy8gaXMgbm90IGdsb2JhbCwganNoaW50IGlzIHdyb25nXHJcbiAgICBmb3IgKHdvcmQgaW4gYXRyb3BhLnd0Zi5kaWN0aW9uYXJ5KSB7XHJcbiAgICAgICAgaWYgKGF0cm9wYS53dGYuZGljdGlvbmFyeS5oYXNPd25Qcm9wZXJ0eSh3b3JkKSkge1xyXG4gICAgICAgICAgICBvbGRXb3JkID0gYXRyb3BhLnJlZ2V4LmFwcGVuZFByZWZpeGVzQW5kU3VmZml4ZXMod29yZCk7XHJcbiAgICAgICAgICAgIHJlZ2V4VmFsdWUgPSBuZXcgUmVnRXhwKG9sZFdvcmQsICdnaScpO1xyXG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQucmVwbGFjZShyZWdleFZhbHVlLCByZXBsYWNlbWVudFRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldC53dGZDb3VudCA9IHd0ZkNvdW50O1xyXG4gICAgcmV0LndvcmRDb3VudCA9IHdvcmRDb3VudDtcclxuICAgIHJldC5zY29yZSA9IHd0ZkNvdW50IC8gd29yZENvdW50O1xyXG4gICAgcmV0LnR4dCA9IHRhcmdldDtcclxuICAgIHJldHVybiByZXQ7XHJcbn07XHJcbi8qKlxyXG4gKiBXVEZpZmllcyB0aGUgPGNvZGU+dGV4dENvbnRlbnQ8L2NvZGU+IG9yIDxjb2RlPnZhbHVlPC9jb2RlPiBvZiB0aGVcclxuICogIGdpdmVuIGVsZW1lbnQgYW5kIHJlcGxhY2VzIHRoZSBlbGVtZW50J3MgaW5uZXJIVE1MIHdpdGggYSBwcmUgYmxvY2tcclxuICogIGNvbnRhaW5pbmcgdGhlIHJlc3VsdHMgb2YgV1RGaWZpY2F0aW9uLlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50UmVmZXJlbmNlIEEgcmVmZXJlbmNlIHRvIGFuIEhUTUwgRWxlbWVudC5cclxuICogQHJldHVybnMge0hUTUxFbGVtZW50fSBSZXR1cm5zIHRoZSBnaXZlbiBlbGVtZW50IGFmdGVyIHd0ZmlmaWNhdGlvbi5cclxuICogQHZlcnNpb24gMjAxMzAzMTNcclxuICovXHJcbmF0cm9wYS53dGYuaHRtbEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudFJlZmVyZW5jZSkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBhdHJvcGEuc3VwcG9ydENoZWNrKCd3dGZIdG1sRWxlbWVudCcpO1xyXG4gICAgXHJcbiAgICB2YXIgd3RmaWZpZWQsIHR4dDtcclxuICAgIGVsZW1lbnRSZWZlcmVuY2UuaW5uZXJIVE1MID0gZWxlbWVudFJlZmVyZW5jZS5pbm5lckhUTUwucmVwbGFjZShcclxuICAgICAgICAvPGJyPihcXHMrKT8oXFxyXFxufFxccnxcXG4pPy9nLCAnXFxyXFxuJyk7XHJcbiAgICB0eHQgPSBlbGVtZW50UmVmZXJlbmNlLnZhbHVlIHx8IGVsZW1lbnRSZWZlcmVuY2UudGV4dENvbnRlbnQ7XHJcbiAgICB3dGZpZmllZCA9IGF0cm9wYS53dGYud3RmaWZ5KHR4dCwgdHJ1ZSk7XHJcbiAgICBlbGVtZW50UmVmZXJlbmNlLmlubmVySFRNTCA9XHJcbiAgICAgICAgJzxwcmUgc3R5bGU9XCJjb2xvcjpibGFjazsgYmFja2dyb3VuZDp3aGl0ZTsgd2hpdGUtc3BhY2U6cHJlLXdyYXA7XCI+JyArXHJcbiAgICAgICAgd3RmaWZpZWQudHh0ICtcclxuICAgICAgICAnPC9wcmU+JztcclxuICAgIHJldHVybiBlbGVtZW50UmVmZXJlbmNlO1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iXX0=
