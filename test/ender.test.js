var language = require('./data.js').language;

describe('ender plugin', function () {
    var mockEnder;

    beforeEach(function () {
        var methods = {};
        mockEnder = {
            ender: function (obj, isProto) {
                Object.assign(methods, obj);
            },
            methods: methods
        };

        global.document = {};
        global.ender = mockEnder;

        // Reset module cache to ensure clean cache inside lib/ender.js
        jest.resetModules();
        require('../lib/ender');
    });

    afterEach(function () {
        delete global.document;
        delete global.ender;
    });

    it('should register language and hyphenate elements', function () {
        var lang = Object.assign({ id: 'en-us' }, language);
        mockEnder.methods.registerHyphenationLanguage(lang);

        var node = {
            childNodes: [
                {
                    nodeType: 3,
                    nodeValue: 'something'
                }
            ]
        };

        var context = [node];
        mockEnder.methods.hyphenate.call(context, 'en-us');

        expect(node.childNodes[0].nodeValue).toBe('some\u00ADthing');
    });

    it('should safely handle inherited Object.prototype properties without throwing TypeError', function () {
        var node = {
            childNodes: [
                {
                    nodeType: 3,
                    nodeValue: 'something'
                }
            ]
        };

        var context = [node];

        expect(function () {
            mockEnder.methods.hyphenate.call(context, 'toString');
        }).not.toThrow();

        expect(function () {
            mockEnder.methods.hyphenate.call(context, 'hasOwnProperty');
        }).not.toThrow();

        expect(node.childNodes[0].nodeValue).toBe('something');
    });
});
