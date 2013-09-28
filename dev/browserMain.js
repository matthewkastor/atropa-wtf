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
